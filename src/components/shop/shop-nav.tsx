import React from "react";
import { Link, useSearchParams } from "react-router-dom";

type ShopNavProps = {
  title: string;
};

export const ShopNav: React.FC<ShopNavProps> = ({ title }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") === "2" ? "2" : "1";

  const getLinkClassName = (page: "1" | "2") =>
    currentPage === page
      ? "shop-nav__link shop-nav__link--active"
      : "shop-nav__link";

  return (
    <header className="shop-nav">
      <h1 className="shop-nav__title">{title}</h1>
      <nav className="shop-nav__links" aria-label="Shop navigation">
        <Link to="/orders?page=1" className={getLinkClassName("1")}>
          Página 1
        </Link>
        <Link to="/orders?page=2" className={getLinkClassName("2")}>
          Página 2
        </Link>
      </nav>
    </header>
  );
};
