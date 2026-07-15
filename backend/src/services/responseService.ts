import { type Response } from "express";
import { type ZodError, type ZodType } from "zod";

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data: T | null;
  errors?: ValidationErrorItem[];
};

export type ValidationErrorItem = {
  field: string;
  path: Array<string | number>;
  code: string;
  message: string;
  expected?: string;
  received?: string;
};

export function formatValidationErrors(
  issues: ZodError<ZodType<any, any>>["issues"]
): ValidationErrorItem[] {
  return issues.map((issue) => {
    const path = issue.path.map((item) =>
      typeof item === "symbol" ? String(item) : item
    );

    const expectedValue = "expected" in issue ? issue.expected : undefined;
    const receivedValue = "received" in issue ? issue.received : undefined;

    const formattedIssue: ValidationErrorItem = {
      field: path.length ? String(path.join(".")) : "",
      path,
      code: issue.code,
      message: issue.message,
    };

    if (expectedValue !== undefined) {
      formattedIssue.expected =
        typeof expectedValue === "string"
          ? expectedValue
          : String(expectedValue);
    }

    if (receivedValue !== undefined) {
      formattedIssue.received =
        typeof receivedValue === "string"
          ? receivedValue
          : String(receivedValue);
    }

    return formattedIssue;
  });
}

export function errorResponse(
  res: Response<ApiResponse<null>>,
  status: number,
  message: string,
  errors: ValidationErrorItem[] = []
): Response<ApiResponse<null>> {
  return res.status(status).json({
    success: false,
    message,
    errors,
    data: null,
  });
}

export function successResponse<T = unknown>(
  res: Response<ApiResponse<T>>,
  data: T | null = null,
  message = "Success",
  status = 200
): Response<ApiResponse<T>> {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}
