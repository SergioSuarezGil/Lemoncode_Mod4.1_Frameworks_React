import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { LoginPage } from "./pages/login-page";
import { ListPage } from "./pages/list-page";
import { DetailPage } from "./pages/detail-page";
import { RickAndMortyPage } from "./pages/rick-and-morty-page";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/rick-and-morty" element={<RickAndMortyPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
