class ApiResponse<T> {
  data?: T;
  message: string = '';
  status: boolean = false;
  statusCode?: number;
}

export { ApiResponse };
