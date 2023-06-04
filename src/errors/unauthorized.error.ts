import { ApplicationError } from "@/protocols";

export function unauthorizedError(message: string): ApplicationError {
  return {
    name: "UnauthorizedError",
    message,
  };
}
