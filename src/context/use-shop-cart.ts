import React from "react";

type ShopCartContextValue = {
  selectedPictureIds: string[];
  isCartVisible: boolean;
  setPictureSelection: (pictureId: string, selected: boolean) => void;
  clearCart: () => void;
  toggleCartVisibility: () => void;
};

export const ShopCartContext = React.createContext<ShopCartContextValue | null>(
  null
);

export const useShopCart = (): ShopCartContextValue => {
  const context = React.useContext(ShopCartContext);

  if (!context) {
    throw new Error("useShopCart debe utilizarse dentro de ShopCartProvider");
  }

  return context;
};
