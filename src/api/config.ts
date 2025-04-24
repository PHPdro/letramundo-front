import axios, { AxiosRequestConfig } from "axios";

export interface Error {
  title: string;
  status: number;
  detail: string;
}

interface RequestParams {
  method?: AxiosRequestConfig["method"];
  headers?: AxiosRequestConfig["headers"];
  endpoint: string;
  version?: string;
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  timeout?: AxiosRequestConfig["timeout"];
}

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
export const request = async ({
  method = "get",
  headers = {},
  endpoint,
  data,
  params = {},
  timeout = 7000,
}: RequestParams) => {
  const token = await localStorage.getItem("auth");
  const baseUrl = "letramundo-back-main-r7azsi.laravel.cloud";
  const config: AxiosRequestConfig = {
    method,
    baseURL: `https://${baseUrl}/api/${endpoint}`,
    data,
    params,
    timeout: timeout,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  let result;

  try {
    result = await axios(config);
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      throw "O servidor não respondeu a tempo, tente novamente mais tarde!";
    }
    if (error.response.status == 401) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    } else if (error.response.status == 403) {
      throw "Você não tem permissão para acessar esse recurso";
    } else if (error.response.status == 404 && error.response.data.length === 0) {
      throw "Recurso não encontrado";
    }
    throw error;
  }
  return result.data;
};
