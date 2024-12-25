// src/utils/http.ts 或者你选择的文件路径

import axios from "axios";
import type { InternalAxiosRequestConfig, AxiosInstance } from "axios";
import { getToken } from "@/utils/token";

const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 设置基础 URL
  timeout: 10000, // 设置请求超时时间
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

// request 拦截器
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    if (getToken() && !isToken) {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
    }

    // 删除自定义的 isToken 标志，因为它不是标准的 HTTP 头
    delete config.headers?.isToken;

    return config;
  },
  (error: any): Promise<any> => {
    return Promise.reject(error);
  }
);

export default http;
