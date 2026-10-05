import axios from "axios";

import { getCachedAuthToken } from "@/features/auth/lib/auth";

export interface ApiResponse<T, M = undefined> {
  status: string;
  message: string;
  data: T;
  meta?: M;
}

export interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

console.log(import.meta.env.VITE_API_URL)
api.interceptors.request.use((config) => {
  const token = getCachedAuthToken();
  if (token) config.headers.set("Authorization", `Bearer ${token}`);
  return config;
});
