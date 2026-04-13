import React from "react";
import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

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
      <Button variant="outlined" component={RouterLink} to="/rick-and-morty">
        Rick and Morty
      </Button>
    </Box>
  );
};
