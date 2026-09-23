import apiClient from "./client";

export async function getProducts({ limit, skip, signal } = {}) {
  const response = await apiClient.get("/products", {
    params: { limit, skip },
    signal,
  });

  return response.data;
}

export async function searchProducts({ query, limit, skip, signal } = {}) {
  const response = await apiClient.get("/products/search", {
    params: { q: query, limit, skip },
    signal,
  });

  return response.data;
}
