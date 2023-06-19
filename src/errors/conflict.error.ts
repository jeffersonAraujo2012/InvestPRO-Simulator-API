import { ApplicationError } from "@/protocols";

export default function conflictError(message?: string): ApplicationError {
  return {
    name: 'ConflictError',
    message: message || 'Conflict Error'
  }
}