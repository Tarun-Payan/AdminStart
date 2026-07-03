import { ZodObject } from "zod";
import type { Request, Response, NextFunction } from "express";
import { errorResponse, formatValidationErrors } from "../services/responseService.js";

export function validateBody(schema: ZodObject<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = formatValidationErrors(result.error.issues);
            return errorResponse(res, 400, "Validation failed", errors);
        }

        req.body = result.data;
        next();
    };
}