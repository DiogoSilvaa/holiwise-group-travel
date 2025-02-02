"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { Logo } from "@/components/icons/logo";
import type { QueryKey, Query } from "@tanstack/react-query";

type LoadingControllerConfig = {
  showDelay: number;
  hideDelay: number;
  animationDuration: number;
};

const DEFAULT_CONFIG: LoadingControllerConfig = {
  showDelay: 200,
  hideDelay: 200,
  animationDuration: 200,
};

const useQueryTracker = (queryClient: ReturnType<typeof useQueryClient>) => {
  const [completedQueries, setCompletedQueries] = useState<Set<string>>(() => new Set());

  const serializeQueryKey = useCallback((key: QueryKey) => JSON.stringify(key), []);

  useEffect(() => {
    const handleQuerySuccess = (query: Query<unknown, Error, unknown, QueryKey>) => {
      if (query.getObserversCount() > 0) {
        const key = serializeQueryKey(query.queryKey);
        setCompletedQueries((prev) => new Set(prev).add(key));
      }
    };

    const unsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.query?.state.status === "success") {
        handleQuerySuccess(event.query);
      }
    });

    return () => unsubscribe();
  }, [queryClient, serializeQueryKey]);

  return { completedQueries, serializeQueryKey };
};

const useLoadingVisibility = (
  isLoading: boolean,
  config: LoadingControllerConfig = DEFAULT_CONFIG
) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialLoad = useRef(true);

  const clearPendingOperations = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    clearPendingOperations();

    if (isLoading) {
      const showLoader = () => setIsVisible(true);

      if (isInitialLoad.current) {
        showLoader();
        isInitialLoad.current = false;
      } else {
        timeoutRef.current = setTimeout(showLoader, config.showDelay);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        isInitialLoad.current = true;
      }, config.hideDelay);
    }

    return clearPendingOperations;
  }, [isLoading, config, clearPendingOperations]);

  return isVisible;
};

const useTripQueryDetector = () => {
  return useCallback((query: Query<unknown, Error, unknown, QueryKey>) => {
    const { queryKey, state } = query;
    const isTripRelated =
      Array.isArray(queryKey) && (queryKey[0] === "trip" || queryKey[0] === "trips");
    return isTripRelated && !state.isInvalidated;
  }, []);
};

export const GlobalLoading = () => {
  const queryClient = useQueryClient();
  const { completedQueries, serializeQueryKey } = useQueryTracker(queryClient);
  const isTripQuery = useTripQueryDetector();

  const isLoading = useIsFetching({
    predicate: (query) => {
      const key = serializeQueryKey(query.queryKey);
      return isTripQuery(query) && !completedQueries.has(key);
    },
  });

  const isVisible = useLoadingVisibility(!!isLoading, {
    ...DEFAULT_CONFIG,
    hideDelay: DEFAULT_CONFIG.animationDuration + 200,
  });

  return (
    <div
      aria-live="assertive"
      role="status"
      className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-${DEFAULT_CONFIG.animationDuration}ms ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Logo className="animate-fastPulse text-primary-500" />
      <span className="sr-only">Loading application content</span>
    </div>
  );
};
