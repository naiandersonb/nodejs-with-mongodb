import { InvalidRequest } from "./InvalidRequest.js";

export class ErrorValidation extends InvalidRequest {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map((err) => err.message)
      .join("; ");
    super(`Os seguintes erros foram encontrados: ${errorMessages}`)
  }
}