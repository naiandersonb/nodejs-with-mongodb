import mongoose from "mongoose";
import { ErrorBase } from "../errors/ErrorBase.js";
import { ErrorValidation } from "../errors/ErrorValidation.js";
import { InvalidRequest } from "../errors/InvalidRequest.js";

export function errorHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new InvalidRequest().sendErrorResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErrorValidation(error).sendErrorResponse(res);
  } else if (error instanceof ErrorBase) {
    error.sendErrorResponse(res);
  } else {
    new ErrorBase().sendErrorResponse(res);
  }
}
