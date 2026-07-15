import { z } from "zod";

export const ErrorResponseSchema = z
    .object({
        success: z.literal(false),
        message: z.string(),
        errors: z.array(z.unknown()).optional(),
        data: z.null(),
    })
    .openapi("ErrorResponse");

export function createSuccessResponseSchema<T extends z.ZodTypeAny>(
    dataSchema: T,
    name: string,
) {
    return z
        .object({
            success: z.literal(true),
            message: z.string(),
            data: dataSchema,
        })
        .openapi(name);
}

export function createResponse(description: string, schema: z.ZodTypeAny) {
    return {
        description,
        content: {
            "application/json": {
                schema,
            },
        },
    };
}

export function createErrorResponse(description: string) {
    return createResponse(description, ErrorResponseSchema);
}
