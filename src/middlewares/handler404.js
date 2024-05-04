import { NotFound } from "../errors/NotFound.js";

export function handler404(req, res, next) {
  const error404 = new NotFound()
  next(error404)
}