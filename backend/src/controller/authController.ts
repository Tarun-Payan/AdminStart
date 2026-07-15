import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../services/responseService.js";
import { register as registerUser, login as loginUser } from "../services/authService.js";
import type { LoginInput, RegisterInput } from "../schemas/auth.js";

async function register(req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction) {
    try {
        const body = req.body;
        const result = await registerUser(body);

        return successResponse(res, result, "Successfully registered", 201);
    } catch (error) {
        next(error);
    }
}

async function login(req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) {
    try {
        const body = req.body;
        const result = await loginUser(body);

        return successResponse(res, result, "Successfully logged in", 200);
    } catch (error) {
        next(error);
    }
}

export { register, login };