import stream from "../stream/stream.js";
import { getInternalTunnel } from "../stream/manage.js";
import { setTunnelPort } from "../config.js";
import { Green } from "../misc/console-text.js";
import express from "express";

const streamTunnel = (req, res) => {
    if (String(req.query.id).length !== 21) {
        return res.sendStatus(400);
    }

    const streamInfo = getInternalTunnel(req.query.id);
    if (!streamInfo) {
        return res.sendStatus(404);
    }

    streamInfo.headers = new Map([
        ...(streamInfo.headers || []),
        ...Object.entries(req.headers)
    ]);

    return stream(res, { type: 'internal', data: streamInfo });
}

export const setupTunnelHandler = () => {
    const tunnelHandler = express();

    tunnelHandler.get('/itunnel', streamTunnel);
    tunnelHandler.use((_, res) => res.sendStatus(400));
    tunnelHandler.use((_, __, res, ____) => res.socket.end());

    const server = tunnelHandler.listen({
        port: 0,
        host: '127.0.0.1',
        exclusive: true
    }, () => {
        const { port } = server.address();
        console.log(`${Green('[✓]')} internal tunnel on 127.0.0.1:${port}`);
        setTunnelPort(port);
    });
}
