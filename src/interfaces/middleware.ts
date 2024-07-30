interface SuccessResponseParams {
  message?: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata?: Record<string, any>;
}

interface OKParams {
  message?: string;
  metadata?: Record<string, any>;
}

interface CreatedParams extends SuccessResponseParams {
  options?: Record<string, any>;
}

export { SuccessResponseParams, OKParams, CreatedParams };
