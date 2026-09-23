import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts, searchProducts } from "../api/productsApi";

const PAGE_SIZE = 10;

export default function useProducts(query = "") {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const requestControllerRef = useRef(null);
  const loadingMoreRef = useRef(false);
  const requestVersionRef = useRef(0);
  const queryRef = useRef(query.trim());
  queryRef.current = query.trim();

  const loadPage = useCallback(async ({ offset, append, searchQuery }) => {
    if (append && loadingMoreRef.current) {
      return;
    }

    requestControllerRef.current?.abort();
    const controller = new AbortController();
    const requestVersion = requestVersionRef.current + 1;
    requestVersionRef.current = requestVersion;
    requestControllerRef.current = controller;

    if (append) {
      loadingMoreRef.current = true;
      setLoadingMore(true);
    } else {
      loadingMoreRef.current = false;
      setLoading(true);
      setLoadingMore(false);
      setProducts([]);
      setSkip(0);
    }
    setError(null);

    try {
      const data = searchQuery
        ? await searchProducts({
            query: searchQuery,
            limit: PAGE_SIZE,
            skip: offset,
            signal: controller.signal,
          })
        : await getProducts({
            limit: PAGE_SIZE,
            skip: offset,
            signal: controller.signal,
          });

      if (
        controller.signal.aborted ||
        requestVersionRef.current !== requestVersion
      ) {
        return;
      }

      const nextProducts = Array.isArray(data.products) ? data.products : [];
      setProducts((currentProducts) =>
        append ? [...currentProducts, ...nextProducts] : nextProducts,
      );
      setTotal(Number(data.total) || 0);
      setSkip(Number(data.skip) || offset);
    } catch (requestError) {
      if (
        controller.signal.aborted ||
        requestVersionRef.current !== requestVersion
      ) {
        return;
      }

      setError(requestError.message || "Không thể tải sản phẩm.");
    } finally {
      if (
        requestControllerRef.current === controller &&
        requestVersionRef.current === requestVersion
      ) {
        requestControllerRef.current = null;

        if (append) {
          loadingMoreRef.current = false;
          setLoadingMore(false);
        } else {
          setLoading(false);
        }
      }
    }
  }, []);

  const loadMore = useCallback(() => {
    if (loading || loadingMoreRef.current || skip + PAGE_SIZE >= total) {
      return;
    }

    loadPage({
      offset: skip + PAGE_SIZE,
      append: true,
      searchQuery: queryRef.current,
    });
  }, [loadPage, loading, skip, total]);

  const retry = useCallback(() => {
    loadPage({
      offset: 0,
      append: false,
      searchQuery: queryRef.current,
    });
  }, [loadPage]);

  const refresh = useCallback(() => {
    loadPage({
      offset: 0,
      append: false,
      searchQuery: queryRef.current,
    });
  }, [loadPage]);

  useEffect(() => {
    const normalizedQuery = query.trim();
    let debounceTimer;

    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    requestVersionRef.current += 1;
    loadingMoreRef.current = false;
    setLoadingMore(false);

    if (!queryRef.current) {
      loadPage({ offset: 0, append: false, searchQuery: "" });
    } else {
      debounceTimer = setTimeout(() => {
        loadPage({
          offset: 0,
          append: false,
          searchQuery: normalizedQuery,
        });
      }, 500);
    }

    return () => {
      clearTimeout(debounceTimer);
      requestControllerRef.current?.abort();
      requestControllerRef.current = null;
      requestVersionRef.current += 1;
    };
  }, [loadPage, query]);

  return {
    products,
    total,
    skip,
    limit: PAGE_SIZE,
    loading,
    loadingMore,
    error,
    hasMore: skip + PAGE_SIZE < total,
    loadMore,
    refresh,
    retry,
    isSearching: Boolean(query.trim()),
  };
}
