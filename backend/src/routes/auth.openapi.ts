import { registry } from "../openapi/registry.js";
import { RegisterSchema } from "../schemas/auth.js";

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
        200: {
            description: "User registered successfully",
        },

        400: {
            description: "Validation failed",
        },
    },
});