import type { Request, Response } from "express";
import { successResponse } from "../services/responseService.js";

function register(req: Request, res: Response) {
    console.log(req.body);
    return successResponse(res, null, "Successfully registered");
}

export { register };