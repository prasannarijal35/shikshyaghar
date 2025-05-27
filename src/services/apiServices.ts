import { getAccessToken } from "@/utils/localStorage";
import axios, { AxiosInstance } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    isAuthRoute?: boolean;
  }
}

const myAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
  isAuthRoute: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * @description Axios interceptor to add content type to the request
 * @param {AxiosRequestConfig} config
 * @returns {AxiosRequestConfig}
 */
myAxios.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") return config;
    const accessToken = await getAccessToken();

    if (config.isAuthRoute && accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default myAxios;
