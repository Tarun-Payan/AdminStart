import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../config/env.js";

export interface JwtPayload {
    sub: number;
}

export function generateToken(payload: JwtPayload): string {
    const options = {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN as unknown as SignOptions["expiresIn"],
    } as SignOptions;

    return jwt.sign(payload, env.JWT_SECRET, options);
}