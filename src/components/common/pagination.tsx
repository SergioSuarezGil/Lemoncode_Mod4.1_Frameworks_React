import React from "react";
import { Box, Pagination } from "@mui/material";

interface PaginationControlProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (_event: React.ChangeEvent<unknown>, page: number) => void;
  className?: string;
}

export const PaginationControl: React.FC<PaginationControlProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box
      sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      className={className}
    >
      <Pagination
        page={currentPage}
        count={totalPages}
        color="primary"
        onChange={onPageChange}
      />
    </Box>
  );
};
