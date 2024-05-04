import { ErrorBase } from "./ErrorBase.js";

export class NotFound extends ErrorBase {
  constructor(message = 'Page not found') {
    super(message, 404)
  }
}