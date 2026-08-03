import { createHmac, randomBytes } from "crypto";

const secret = process.env.HMAC_SECRET || randomBytes(32).toString('hex');

export function hashHmac(data, salt) {
    return createHmac("sha256", `${secret}:${salt}`).update(data).digest();
}
