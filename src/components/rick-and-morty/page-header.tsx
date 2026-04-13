import React from "react";
import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const PageHeader: React.FC = () => {
  return (
    <div className="rick-page__header">
      <Typography variant="h4" component="h1">
        Personajes de Rick y Morty
      </Typography>
      <Button component={RouterLink} to="/list" variant="outlined">
        Volver a GitHub
      </Button>
    </div>
  );
};
