import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export abstract class AbstractApiModule {
  url: string;

  constructor() {
    this.url = import.meta.env.VITE_API_URL as string;
  }

  async fetcher<Response, Error = object>(
    endpoint: string,
    config: Omit<AxiosRequestConfig, "url"> = {}
  ) {
    return axios<AxiosError<Error>, AxiosResponse<Response>>(
      `${this.url}/${endpoint}`,
      {
        ...config,
      }
    );
  }
}
