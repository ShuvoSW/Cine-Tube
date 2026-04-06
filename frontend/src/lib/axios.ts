/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000, // optional: prevent hanging requests
});

// Flag to prevent multiple refresh attempts at the same time
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If it's not a 401 or already retried → reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Prevent infinite loop on login/register pages
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      if (currentPath === "/login" || currentPath === "/register") {
        return Promise.reject(error);
      }
    }

    if (isRefreshing) {
      // Wait for the current refresh to finish
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => api(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {},
        { withCredentials: true },
      );

      processQueue(null);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      // Only redirect if we're not already on login page
      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
