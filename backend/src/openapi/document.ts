import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./registry.js";

/**
 * Generate the OpenAPI document lazily.
 * Must be called AFTER all route openapi files (e.g. auth.openapi.ts)
 * have run their registry.registerPath() calls.
 */
export function generateOpenApiDocument(url: string = "http://localhost:3000") {
    return new OpenApiGeneratorV3(registry.definitions).generateDocument({
        openapi: "3.0.0",
        info: {
            title: "AuthStack API",
            version: "1.0.0",
        },
        servers: [
            {
                url: url,
            },
        ],
    });
}