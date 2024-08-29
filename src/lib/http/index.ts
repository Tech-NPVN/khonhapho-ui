type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type HttpOptions = RequestInit & {
  base_url?: string;
};

const fetcher = async <Response>(url: string, options: HttpOptions = {}): Promise<Response> => {
  const { headers } = options;

  const baseUrl = options?.base_url === undefined ? process.env.NEXT_PUBLIC_API : options.base_url;
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const response = await fetch(fullUrl, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  const data: Response = await response.json();
  return data;
};

const http = {
  get<Response>(url: string, options?: Omit<HttpOptions, 'body'>) {
    return fetcher<Response>(url, { method: 'GET', ...options });
  },
  post<Response, Request>(url: string, data: Request, options?: Omit<HttpOptions, 'body'>) {
    return fetcher<Response>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },
  put<Response, Request>(url: string, data: Request, options?: Omit<HttpOptions, 'body'>) {
    return fetcher<Response>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },
  patch<Response, Request>(url: string, data: Request, options?: Omit<HttpOptions, 'body'>) {
    return fetcher<Response>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },
  delete<Response>(url: string, options?: Omit<HttpOptions, 'body'>) {
    return fetcher<Response>(url, { method: 'DELETE', ...options });
  },
};

export { fetcher, type Methods, type HttpOptions };

export default http;
