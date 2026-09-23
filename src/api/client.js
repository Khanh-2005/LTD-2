import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

export function normalizeApiError(error) {
  if (axios.isCancel(error) || error?.code === "ERR_CANCELED") {
    return error;
  }

  if (error?.code === "ECONNABORTED" || error?.code === "ETIMEDOUT") {
    return new Error("Quá thời gian chờ kết nối đến máy chủ.");
  }

  if (error?.response) {
    const status = error.response.status;
    const message = error.response.data?.message;
    return new Error(message || `Máy chủ trả về lỗi ${status}.`);
  }

  if (error?.request) {
    return new Error("Không thể kết nối đến máy chủ.");
  }

  return error instanceof Error
    ? error
    : new Error("Đã xảy ra lỗi không xác định.");
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error)),
);

export default apiClient;
