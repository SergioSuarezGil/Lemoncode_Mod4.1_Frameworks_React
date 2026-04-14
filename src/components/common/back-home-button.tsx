import React from "react";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type BackHomeButtonProps = {
  label?: string;
};

export const BackHomeButton: React.FC<BackHomeButtonProps> = ({
  label = "VOLVER"
}) => {
  return (
    <Button variant="outlined" component={RouterLink} to="/home">
      {label}
    </Button>
  );
};
