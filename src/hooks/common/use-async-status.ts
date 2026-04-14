import React from "react";

const DEFAULT_ERROR_MESSAGE = "Se produjo un error inesperado.";

type UseAsyncStatusResult = {
  isLoading: boolean;
  errorMessage: string;
  run: <T>(request: () => Promise<T>) => Promise<T | null>;
};

export const useAsyncStatus = (
  fallbackErrorMessage: string = DEFAULT_ERROR_MESSAGE
): UseAsyncStatusResult => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const run = React.useCallback(
    async <T>(request: () => Promise<T>): Promise<T | null> => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        return await request();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : fallbackErrorMessage;
        setErrorMessage(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [fallbackErrorMessage]
  );

  return {
    isLoading,
    errorMessage,
    run
  };
};
