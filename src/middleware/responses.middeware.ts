import { Response } from "express";

const StatusCode = {
  OK: 200,
  CREATED: 201
};

const ReasonStatusCode = {
  CREATED: 'Created',
  OK: 'Success'
};

interface SuccessResponseParams {
  message?: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata?: Record<string, any>;
}

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

interface OKParams {
  message?: string;
  metadata?: Record<string, any>;
}

export class OK extends SuccessResponse {
  constructor({ message, metadata }: OKParams) {
    super({ message, metadata });
  }
}

interface CreatedParams extends SuccessResponseParams {
  options?: Record<string, any>;
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
