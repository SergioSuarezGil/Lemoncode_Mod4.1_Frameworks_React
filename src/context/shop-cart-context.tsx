import React from "react";
import { ShopCartContext } from "./use-shop-cart";

const SHOP_CART_STORAGE_KEY = "shop.selected-picture-ids";

type ShopCartProviderProps = {
  children: React.ReactNode;
};

const readCartFromStorage = (): string[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawData = window.localStorage.getItem(SHOP_CART_STORAGE_KEY);
    const parsedData = rawData ? JSON.parse(rawData) : [];

    return Array.isArray(parsedData)
      ? parsedData.filter((item): item is string => typeof item === "string")
      : [];
  } catch {
    return [];
  }
};

const writeCartToStorage = (selectedPictureIds: string[]) => {
  window.localStorage.setItem(
    SHOP_CART_STORAGE_KEY,
    JSON.stringify(selectedPictureIds)
  );
};

export const ShopCartProvider: React.FC<ShopCartProviderProps> = ({
  children
}) => {
  const [selectedPictureIds, setSelectedPictureIds] =
    React.useState<string[]>(readCartFromStorage);
  const [isCartVisible, setIsCartVisible] = React.useState(true);

  const setPictureSelection = React.useCallback(
    (pictureId: string, selected: boolean) => {
      setSelectedPictureIds((previousIds) => {
        const hasPicture = previousIds.includes(pictureId);

        if (selected && !hasPicture) {
          return [...previousIds, pictureId];
        }

        if (!selected && hasPicture) {
          return previousIds.filter((id) => id !== pictureId);
        }

        return previousIds;
      });
    },
    []
  );

  const clearCart = React.useCallback(() => {
    setSelectedPictureIds([]);
  }, []);

  const toggleCartVisibility = React.useCallback(() => {
    setIsCartVisible((previousValue) => !previousValue);
  }, []);

  React.useEffect(() => {
    writeCartToStorage(selectedPictureIds);
  }, [selectedPictureIds]);

  const value = React.useMemo(
    () => ({
      selectedPictureIds,
      isCartVisible,
      setPictureSelection,
      clearCart,
      toggleCartVisibility
    }),
    [
      selectedPictureIds,
      isCartVisible,
      setPictureSelection,
      clearCart,
      toggleCartVisibility
    ]
  );

  return (
    <ShopCartContext.Provider value={value}>
      {children}
    </ShopCartContext.Provider>
  );
};
