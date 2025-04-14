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
  loaderStateSetter?: (state: boolean) => void;
}

const toggleLoader = (loaderStateSetter: ((state: boolean) => void) | undefined, state: boolean) => {
  if (loaderStateSetter) {
    loaderStateSetter(state);
  }
};
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
var logoutMessageSent = false;
export const request = async ({
  method = "get",
  headers = {},
  endpoint,
  data,
  params = {},
  timeout = 7000,
  loaderStateSetter,
}: RequestParams) => {
  // const token = await localStorage.getItem("auth");
  const baseUrl = "letramundo-back-main-r7azsi.laravel.cloud";
  const config: AxiosRequestConfig = {
    method,
    baseURL: `https://${baseUrl}/${endpoint}`,
    data,
    params,
    timeout: timeout,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  let result;
  toggleLoader(loaderStateSetter, true);
  try {
    result = await axios(config);
    if (endpoint !== "auth/login") {
      window.dispatchEvent(new Event("Authorized")); // ativa o menu
    }
  } catch (error: any) {
    if (error.code === "ECONNABORTED") {
      throw "O servidor não respondeu a tempo, tente novamente mais tarde!";
    }
    if (error.response.status == 401) {
      localStorage.removeItem("auth");
      window.dispatchEvent(new Event("Logout"));
      if (!logoutMessageSent) {
        logoutMessageSent = true;
        setTimeout(() => {
          logoutMessageSent = false;
        }, 5000);
      }
      window.location.href = process.env.NEXT_PUBLIC_URL + "/login";
    } else if (error.response.status == 403) {
      throw "Você não tem permissão para acessar esse recurso";
    } else if (error.response.status == 404 && error.response.data.length === 0) {
      throw "Recurso não encontrado";
    }
    toggleLoader(loaderStateSetter, false);
    throw error;
  }
  toggleLoader(loaderStateSetter, false);
  return result.data;
};
