import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import stream from "./stream/stream.js";
import match from "./processing/match.js";

import { env } from "./config/index.js";
import { extract } from "./processing/url.js";
import { Green, Cyan, Bright } from "./misc/console-text.js";
import { hashHmac } from "./security/secrets.js";
import { verifyStream } from "./stream/manage.js";
import { createResponse, normalizeRequest, getIP } from "./processing/request.js";
import { setupTunnelHandler } from "./core/itunnel.js";
import { convertImage, uploadImage } from './tools/image-converter.js';
import { convertMedia, uploadMedia } from './tools/media-converter.js';
import { redirectShortLink, shortenLink } from './tools/link-shortener.js';
import { inspectMusic } from './media/music-info.js';
import { trackAction, getStats } from './telemetry/stats.js';

const app = express();

const fail = (res, code, context) => {
    const { status, body } = createResponse("error", { code, context });
    res.status(status).json(body);
};

setupTunnelHandler();

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
}));

app.disable("x-powered-by");

app.use((req, res, next) => {
    if (req.headers['content-length'] && parseInt(req.headers['content-length']) > 210 * 1024 * 1024) {
        return res.status(413).json({ error: "Payload muito grande." });
    }
    next();
});

const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    standardHeaders: "draft-6",
    legacyHeaders: false,
    keyGenerator: (req) => getIP(req),
    handler: (_, res) => res.status(429).json({ error: "Muitas requisições. Aguarde." }),
});
app.use(globalLimiter);

const burstLimiter = rateLimit({
    windowMs: 5 * 1000,
    limit: 10,
    standardHeaders: false,
    legacyHeaders: false,
    keyGenerator: (req) => getIP(req),
    handler: (_, res) => res.status(429).json({ error: "Calma aí. Muitas requisições em sequência." }),
});
app.use("/", burstLimiter);
app.use("/tools", burstLimiter);

app.use(cors({
    origin: true,
    methods: ["GET", "POST"],
    exposedHeaders: [
        "Ratelimit-Limit",
        "Ratelimit-Policy",
        "Ratelimit-Remaining",
        "Ratelimit-Reset",
        "Estimated-Content-Length",
        "Content-Disposition",
    ],
}));

const apiLimiter = rateLimit({
    windowMs: env.rateLimitWindow * 1000,
    limit: env.rateLimitMax,
    standardHeaders: "draft-6",
    legacyHeaders: false,
    keyGenerator: (req) => hashHmac(getIP(req), "rate").toString("base64url"),
});

const tunnelLimiter = rateLimit({
    windowMs: env.tunnelRateLimitWindow * 1000,
    limit: env.tunnelRateLimitMax,
    standardHeaders: "draft-6",
    legacyHeaders: false,
    keyGenerator: (req) => hashHmac(getIP(req), "rate").toString("base64url"),
});

app.set("trust proxy", ["loopback", "uniquelocal"]);
app.use(express.json({ limit: 1024 }));

app.post('/tools/image-converter', apiLimiter, uploadImage, async (req, res) => {
    const originalSend = res.send.bind(res);
    res.send = function(data) {
        if (res.statusCode === 200) {
            const from = req.file?.mimetype?.split('/')[1] || 'unknown';
            const to = req.body.format || 'unknown';
            trackAction('conversion', 'image', `${from}→${to}`);
        }
        return originalSend(data);
    };
    return convertImage(req, res);
});

app.post('/tools/media-converter', apiLimiter, uploadMedia, async (req, res) => {
    const originalSend = res.send.bind(res);
    res.send = function(data) {
        if (res.statusCode === 200) {
            const mode = req.body.mode || 'convert';
            const format = req.body.format || 'unknown';
            trackAction('conversion', 'media', `${mode}→${format}`);
        }
        return originalSend(data);
    };
    return convertMedia(req, res);
});

app.post('/tools/link-shortener', apiLimiter, shortenLink);
app.post('/media/inspect', apiLimiter, inspectMusic);
app.get('/s/:slug', redirectShortLink);

app.get('/stats', (_req, res) => {
    res.json(getStats());
});

app.get("/", (_req, res) => {
    res.json({
        shappire: {
            version: "11.7.1",
            url: env.apiURL,
            startTime: `${Date.now()}`,
            services: [...env.enabledServices],
        },
    });
});

app.post("/", apiLimiter, async (req, res) => {
    const request = req.body;

    if (!request.url) {
        return fail(res, "error.api.link.missing");
    }

    const { success, data: normalizedRequest } = await normalizeRequest(request);
    if (!success) {
        return fail(res, "error.api.invalid_body");
    }

    const parsed = extract(normalizedRequest.url);

    if (!parsed) {
        return fail(res, "error.api.link.invalid");
    }

    if ("error" in parsed) {
        let context;
        if (parsed?.context) {
            context = parsed.context;
        }
        return fail(res, `error.api.${parsed.error}`, context);
    }

    try {
        const result = await match({
            host: parsed.host,
            patternMatch: parsed.patternMatch,
            params: normalizedRequest,
            authType: "none",
        });

        if (result.status === 200) {
            trackAction('download', parsed.host, normalizedRequest.downloadMode || 'auto');
        }

        const overrideMeta = req.body?.overrideMetadata;
        if (result.status === 200 && overrideMeta && result.body?.filename) {
            const title = overrideMeta.title || '';
            const artist = overrideMeta.artist || '';
            if (title || artist) {
                const ext = result.body.filename.split('.').pop() || 'mp3';
                const parts = [artist, title].filter(Boolean);
                result.body.filename = `${parts.join(' - ')}.${ext}`;
            }
        }

        res.status(result.status).json(result.body);
    } catch (e) {
        console.error("[download] erro:", e);
        fail(res, "error.api.generic");
    }
});

app.get("/tunnel", tunnelLimiter, async (req, res) => {
    const id = String(req.query.id);
    const exp = String(req.query.exp);
    const sig = String(req.query.sig);
    const sec = String(req.query.sec);
    const iv = String(req.query.iv);

    const checkQueries = id && exp && sig && sec && iv;
    const checkBaseLength = id.length === 21 && exp.length === 13;
    const checkSafeLength = sig.length === 43 && sec.length === 43 && iv.length === 22;

    if (!checkQueries || !checkBaseLength || !checkSafeLength) {
        return res.status(400).end();
    }

    if (req.query.p) {
        return res.status(200).end();
    }

    const streamInfo = await verifyStream(id, sig, exp, sec, iv);
    if (!streamInfo?.service) {
        return res.status(streamInfo.status).end();
    }

    if (streamInfo.type === "proxy") {
        streamInfo.range = req.headers["range"];
    }

    return stream(res, streamInfo);
});

app.listen(env.apiPort, '0.0.0.0', () => {
    console.log(`\n  ${Green('[✓]')} ${Bright('Shappire Backend')} rodando!`);
    console.log(`  ${Cyan('Porta:')} ${env.apiPort}`);
    console.log(`  ${Cyan('Host:')} 0.0.0.0`);
    console.log(`  ${Cyan('Servicos:')} ${[...env.enabledServices].join(', ')}\n`);
});
