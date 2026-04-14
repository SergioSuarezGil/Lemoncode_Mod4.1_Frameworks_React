import React from "react";
import { Typography } from "@mui/material";
import { BackHomeButton } from "../common";

export const PageHeader: React.FC = () => {
  return (
    <div className="rick-page__header">
      <div className="rick-page__header-content">
        <Typography variant="h4" component="h1">
          Personajes de Rick y Morty
        </Typography>
        <div className="rick-page__actions">
          <BackHomeButton label="Volver" />
        </div>
      </div>
    </div>
  );
};
