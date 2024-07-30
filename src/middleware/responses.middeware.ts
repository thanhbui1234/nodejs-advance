import { Response } from "express";
import { CreatedParams, OKParams, SuccessResponseParams } from "../interfaces/middleware";

const StatusCode = {
  OK: 200,
  CREATED: 201
};

const ReasonStatusCode = {
  CREATED: 'Created',
  OK: 'Success'
};



export class SuccessResponse {
  message: string;
  status: number;
  metadata: Record<string, any>;

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {}
  }: SuccessResponseParams) {
    this.message = message || reasonStatusCode;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res: Response, header: Record<string, any> = {}): Response {
    return res.status(this.status).json(this);
  }
}


export class OK extends SuccessResponse {
  constructor({ message, metadata }: OKParams) {
    super({ message, metadata });
  }
}


export class CREATED extends SuccessResponse {
  options: Record<string, any>;

  constructor({
    options = {},
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata
  }: CreatedParams) {
    super({ message, statusCode, reasonStatusCode, metadata });
    this.options = options;
  }
}
