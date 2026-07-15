import { z } from "zod";
import { registry } from "./registry.js";
import {
    createErrorResponse,
    createResponse,
    createSuccessResponseSchema,
} from "./responseSchemas.js";
import { RegisterSchema, UserResponseSchema, LoginSchema } from "../schemas/auth.js";

const RegisterResponseDataSchema = z.object({
    user: UserResponseSchema,
    token: z.string(),
}).openapi("RegisterResponseData");

const RegisterSuccessResponseSchema = createSuccessResponseSchema(
    RegisterResponseDataSchema,
    "RegisterSuccessResponse",
);

registry.registerPath({
    method: "post",
    path: "/api/register",

    tags: ["Auth"],

    summary: "Register user",

    request: {
        body: {
            content: {
                "application/json": {
                    schema: RegisterSchema,
                },
            },
        },
    },

    responses: {
        201: createResponse("User registered successfully", RegisterSuccessResponseSchema),
        400: createErrorResponse("Validation failed"),
        409: createErrorResponse("User already exists"),
        500: createErrorResponse("Internal server error"),
    },
});

registry.registerPath({
    method: "post",
    path: "/api/login",

    tags: ["Auth"],

    summary: "Login User",

    request: {
        body: {
            content: {
                "application/json": {
                    schema: LoginSchema,
                },
            },
        },
    },
    responses: {
        200: createResponse("User logged in successfully", RegisterSuccessResponseSchema),
        400: createErrorResponse("Validation failed"),
        401: createErrorResponse("Invalid credentials"),
        500: createErrorResponse("Internal server error"),
    },
});