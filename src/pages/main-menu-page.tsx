import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const MainMenuPage: React.FC = () => {
  return (
    <section className="main-menu-page">
      <Paper className="main-menu-page__card" elevation={0}>
        <Stack spacing={2.5}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              className="main-menu-page__title"
            >
              HOME
            </Typography>
            <Typography variant="body1" className="main-menu-page__subtitle">
              Elige la sección que quieres abrir.
            </Typography>
          </Box>

          <Box className="main-menu-page__buttons">
            <Button variant="contained" component={RouterLink} to="/list">
              GITHUB LIST
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/rick-and-morty"
            >
              RICK AND MORTY
            </Button>
            <Button variant="contained" component={RouterLink} to="/orders">
              SHOP ONLINE
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/order-management"
            >
              GESTION DE PEDIDOS
            </Button>
          </Box>
        </Stack>
      </Paper>
    </section>
  );
};
