import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    meta?: {
      skipAuth?: boolean;
    };
  }

  export interface InternalAxiosRequestConfig {
    meta?: {
      skipAuth?: boolean;
    };
  }
}