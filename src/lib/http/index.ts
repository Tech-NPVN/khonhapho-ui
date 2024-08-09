import { HttpStatus } from '@/constants/enums';
import { redirect } from 'next/navigation';

type Methods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type CustomOptions = Omit<RequestInit, 'method'> & {
  base_url?: string;
};

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: HttpStatus.UNPROCESSABLE_ENTITY;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: HttpStatus.UNPROCESSABLE_ENTITY;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;

const isClient: boolean = typeof window !== 'undefined';

const request = async <Response>(method: Methods, url: string, options?: CustomOptions) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json',
        };

  if (isClient) {
    const token = localStorage.getItem('token');
    if (token) {
      baseHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const baseUrl = options?.base_url === undefined ? process.env.NEXT_PUBLIC_API : options.base_url;

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (res.status === HttpStatus.UNPROCESSABLE_ENTITY) {
      throw new EntityError(
        data as {
          status: HttpStatus.UNPROCESSABLE_ENTITY;
          payload: EntityErrorPayload;
        },
      );
    } else if (res.status === HttpStatus.UNAUTHORIZED) {
      if (isClient) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            },
          });
          try {
            await clientLogoutRequest;
          } catch (error) {
          } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            clientLogoutRequest = null;
            location.href = '/login';
          }
        }
      } else {
        const token = (options?.headers as any)?.Authorization.split('Bearer ')[1];
        redirect(`/logout?token=${token}`);
      }
    } else {
      throw new HttpError(data);
    }
  }

  return data;
};

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, options);
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options });
  },
};

export default http;
export { isClient, type CustomOptions, type Methods };
