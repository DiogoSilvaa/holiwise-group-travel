"use client";

import React, { useEffect, useState } from "react";
import { useIsFetching } from "@tanstack/react-query";
import { Logo } from "@/components/icons/logo";

export const GlobalLoading = () => {
  const isFetching = useIsFetching();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isFetching && isFirstLoad) {
      setIsFirstLoad(false);
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isFetching, isFirstLoad]);

  return (
    <div
      className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <Logo className="animate-fastPulse text-primary-500" />
    </div>
  );
};
