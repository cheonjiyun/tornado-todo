import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
    baseURL: "/proxy",
    withCredentials: true,
    timeout: 5000,
});

export interface HttpClient extends AxiosInstance {
    get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export const http: HttpClient = axiosInstance;
axiosInstance.interceptors.response.use((response) => response.data);

//`${import.meta.env.VITE_BASE_URL}`
