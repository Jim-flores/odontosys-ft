export interface ErrorResponse {
  success: boolean;
  statusCode: number;
  error: {
    message: string;
    code: string;
  };
  timestamp: string;
  path: string;
}
