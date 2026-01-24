export interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    code: string;
  };
  timestamp: string;
  path: string;
}
