import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { LoginPage } from "./pages/login-page";
import { DetailPage, ListPage } from "./pages/github";
import { CharactersPage } from "./pages/rick-and-morty";
import { OrganizationProvider } from "./context";

export const App = () => {
  return (
    <OrganizationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/rick-and-morty" element={<CharactersPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </OrganizationProvider>
  );
};
