import React from "react";
import { SetURLSearchParams, URLSearchParamsInit } from "react-router-dom";

interface UseQueryPageParams {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
  paramName?: string;
}

interface UseQueryPageResult {
  currentPage: number;
  setPage: (page: number, extraParams?: Record<string, string>) => void;
}

export const useQueryPage = ({
  searchParams,
  setSearchParams,
  paramName = "page"
}: UseQueryPageParams): UseQueryPageResult => {
  const pageFromUrl = Number(searchParams.get(paramName) ?? "1");
  const currentPage =
    Number.isNaN(pageFromUrl) || pageFromUrl < 1 ? 1 : pageFromUrl;

  const setPage = React.useCallback(
    (page: number, extraParams: Record<string, string> = {}) => {
      const nextParams: URLSearchParamsInit = {
        ...extraParams,
        [paramName]: String(page)
      };

      setSearchParams(nextParams);
    },
    [paramName, setSearchParams]
  );

  return {
    currentPage,
    setPage
  };
};
