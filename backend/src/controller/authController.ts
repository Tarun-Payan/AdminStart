import type { NextFunction, Request, Response } from "express";
import { successResponse } from "../services/responseService.js";
import { register as registerUser } from "../services/authService.js";
import type { RegisterInput } from "../schemas/auth.js";

async function register(req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction) {
    try {
        const body = req.body;
        const result = await registerUser(body);

        return successResponse(res, result, "Successfully registered", 201);
    } catch (error) {
        next(error);
    }
}

export { register };