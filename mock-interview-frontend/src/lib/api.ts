/**
 * Configured Axios instance for all API calls.
 *
 * - Reads VITE_API_URL (matching the existing frontend convention).
 * - Attaches the Bearer token from localStorage on every request.
 * - On 401 response, attempts a silent refresh using the stored refreshToken.
 *   If refresh succeeds → updates localStorage and retries the original request.
 *   If refresh fails   → clears auth storage and redirects to /login.
 *
 * Usage: import { api } from '@/lib/api';
 */

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL as string;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — attach access token ──────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor — silent refresh on 401 ──────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token!);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Only intercept 401s that haven't already been retried
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      if (isRefreshing) {
        // Queue the request until the in-progress refresh resolves
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
      }

      isRefreshing = true;
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // No refresh token stored — force logout
        clearAuthStorage();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${BASE_URL}/api/user/refresh`, { refreshToken });
        const newToken = data.token;
        const newRefresh = data.refreshToken;

        localStorage.setItem('authToken', newToken);
        if (newRefresh) localStorage.setItem('refreshToken', newRefresh);

        processQueue(null, newToken);
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAuthStorage();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ── Auth helpers ───────────────────────────────────────────────────────────────
export function saveAuthTokens(token: string, refreshToken?: string) {
  localStorage.setItem('authToken', token);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
}

export function clearAuthStorage() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
}
