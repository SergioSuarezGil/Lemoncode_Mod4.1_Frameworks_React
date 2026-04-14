import React from "react";
import { Box } from "@mui/material";
import { BackHomeButton } from "../common";

export const MembersHeader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2
      }}
    >
      <h2 className="github-members__title">Miembros de GitHub</h2>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}
      >
        <BackHomeButton />
      </Box>
    </Box>
  );
};
