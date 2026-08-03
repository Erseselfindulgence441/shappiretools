import "dotenv/config";

const browserUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";

const enabledServices = new Set([
    "twitter", "tiktok", "instagram",
    "bilibili", "pinterest", "streamable", "twitch", "vimeo",
    "soundcloud", "rutube", "dailymotion", "snapchat", "loom",
    "facebook", "bsky", "ok", "vk", "tumblr", "newgrounds"
]);

const env = {
    apiURL: process.env.API_URL || "http://localhost:3001",
    apiPort: parseInt(process.env.PORT || "3001", 10),
    tunnelPort: parseInt(process.env.PORT || "3001", 10),

    corsWildcard: true,
    corsURL: process.env.FRONTEND_URL || "http://localhost:5173",

    cookiePath: process.env.COOKIE_PATH || null,

    rateLimitWindow: 60,
    rateLimitMax: 30,
    googleLensImageTtlSeconds: parseInt(process.env.GOOGLE_LENS_IMAGE_TTL_SECONDS || '180', 10),
    googleLensRateLimitMax: parseInt(process.env.GOOGLE_LENS_RATE_LIMIT_MAX || '10', 10),
    googleLensRateLimitWindowMs: parseInt(process.env.GOOGLE_LENS_RATE_LIMIT_WINDOW_MS || '3600000', 10),
    googleLensMaxFileMb: parseInt(process.env.GOOGLE_LENS_MAX_FILE_MB || '10', 10),
    googleLensMaxPixels: parseInt(process.env.GOOGLE_LENS_MAX_PIXELS || '25000000', 10),
    tunnelRateLimitWindow: 60,
    tunnelRateLimitMax: 60,
    sessionRateLimitWindow: 60,
    sessionRateLimit: 10,

    durationLimit: parseInt(process.env.DURATION_LIMIT || "10800", 10),
    streamLifespan: 90,

    freebindCIDR: false,
    processingPriority: false,
    externalProxy: undefined,

    sessionEnabled: false,
    turnstileSitekey: undefined,
    turnstileSecret: undefined,
    jwtSecret: undefined,
    jwtLifetime: 120,

    apiKeyURL: undefined,
    authRequired: false,
    redisURL: undefined,
    instanceCount: 1,
    keyReloadInterval: 900,

    enabledServices,
    allServices: enabledServices,

    customInnertubeClient: undefined,
    ytSessionServer: undefined,
    ytSessionReloadInterval: 300,
    ytSessionInnertubeClient: undefined,
    ytAllowBetterAudio: true,
    ytPlayerIds: undefined,

    forceLocalProcessing: "never",
    enableDeprecatedYoutubeHls: "never",

    envFile: undefined,
    envRemoteReloadInterval: 300,

    subscribe: () => {},
};

const isCluster = false;
const canonicalEnv = Object.freeze(structuredClone(process.env));
const setTunnelPort = (port) => { env.tunnelPort = port; };
const updateEnv = () => [];

export {
    env,
    canonicalEnv,
    isCluster,
    browserUserAgent,
    setTunnelPort,
    updateEnv,
};
