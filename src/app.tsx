import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { LoginPage } from "./pages/login-page";
import { MainMenuPage } from "./pages/main-menu-page";
import { DetailPage, ListPage } from "./pages/github";
import { CharactersPage } from "./pages/rick-and-morty";
import { OrderManagementPage } from "./pages/order-management";
import { CheckoutPage, OrdersListPage, ShopLayout } from "./pages/shop";
import { OrganizationProvider, ShopCartProvider } from "./context";

export const App = () => {
  return (
    <OrganizationProvider>
      <ShopCartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<MainMenuPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/rick-and-morty" element={<CharactersPage />} />
            <Route path="/order-management" element={<OrderManagementPage />} />

            <Route element={<ShopLayout />}>
              <Route path="/orders" element={<OrdersListPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ShopCartProvider>
    </OrganizationProvider>
  );
};
