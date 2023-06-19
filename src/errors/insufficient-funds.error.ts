import { ApplicationError } from "@/protocols";

export default function insufficientFunds(): ApplicationError {
  return {
    name: "InsufficientFunds",
    message: "Insufficient funds",
  };
}
