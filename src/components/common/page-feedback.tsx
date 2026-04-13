import React from "react";
import { Alert, Box, CircularProgress } from "@mui/material";

interface PageFeedbackProps {
  isLoading: boolean;
  loadingText: string;
  errorMessage: string;
  showEmptyState: boolean;
  emptyMessage: string;
  loadingClassName?: string;
  alertClassName?: string;
}

export const PageFeedback: React.FC<PageFeedbackProps> = ({
  isLoading,
  loadingText,
  errorMessage,
  showEmptyState,
  emptyMessage,
  loadingClassName,
  alertClassName
}) => {
  return (
    <>
      {isLoading && (
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
          className={loadingClassName}
        >
          <CircularProgress size={20} />
          <span>{loadingText}</span>
        </Box>
      )}

      {errorMessage && (
        <Alert severity="error" className={alertClassName}>
          {errorMessage}
        </Alert>
      )}

      {showEmptyState && (
        <Alert severity="info" className={alertClassName}>
          {emptyMessage}
        </Alert>
      )}
    </>
  );
};
