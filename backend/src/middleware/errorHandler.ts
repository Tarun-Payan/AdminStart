import type { ErrorRequestHandler, NextFunction } from "express";
import { errorResponse } from "../services/responseService.js";
import { AppError } from "../errors/AppError.js";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Log unexpected error
    console.log(err);
    
    if (err instanceof AppError) {
        return errorResponse(res, err.statusCode, err.message);
    }
    return errorResponse(res, 500, "Internal Server Error");
};

export { errorHandler };