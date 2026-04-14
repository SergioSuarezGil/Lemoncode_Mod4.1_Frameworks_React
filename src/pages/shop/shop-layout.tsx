import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BackHomeButton } from "../../components/common";
import { ShopCartPanel, ShopNav } from "../../components/shop";

export const ShopLayout: React.FC = () => {
  const location = useLocation();
  const showShopNav = location.pathname !== "/checkout";

  return (
    <section className="shop-layout">
      <div className="shop-layout__main">
        <div className="shop-layout__topbar">
          <div className="shop-layout__actions">
            <BackHomeButton />
          </div>
          {showShopNav && <ShopNav title="Compra de imágenes" />}
        </div>
        <Outlet />
      </div>
      <ShopCartPanel />
    </section>
  );
};
