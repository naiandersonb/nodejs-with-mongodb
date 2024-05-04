import { ErrorBase } from "./ErrorBase.js";

export class InvalidRequest extends ErrorBase {
  constructor(message = "Um ou mais dados fornecidos estão incorretos") {
    super(message, 400);
  }
}