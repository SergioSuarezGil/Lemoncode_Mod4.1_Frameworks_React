import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useShopCart } from "../../context";
import { getPicturesByIds } from "../../services/shop";
import { formatCurrencyEur, sumBy } from "../../common";

export const ShopCartPanel: React.FC = () => {
  const {
    selectedPictureIds,
    clearCart,
    setPictureSelection,
    isCartVisible,
    toggleCartVisibility
  } = useShopCart();

  const selectedPictures = getPicturesByIds(selectedPictureIds);

  const totalEur = sumBy(selectedPictures, (picture) => picture.priceEur);

  return (
    <aside className="shop-cart" aria-label="Shopping cart panel">
      <div className="shop-cart__header">
        <h2 className="shop-cart__title">
          Carrito de la compra ({selectedPictureIds.length})
        </h2>
        <button
          type="button"
          className="shop-cart__toggle"
          onClick={toggleCartVisibility}
        >
          {isCartVisible ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {isCartVisible && (
        <>
          {selectedPictures.length === 0 ? (
            <p className="shop-cart__empty">
              Todavía no hay imágenes seleccionadas.
            </p>
          ) : (
            <div className="shop-cart__items">
              {selectedPictures.map((picture) => (
                <label className="shop-cart__item" key={picture.id}>
                  <input
                    type="checkbox"
                    checked
                    onChange={(event) =>
                      setPictureSelection(picture.id, event.target.checked)
                    }
                  />
                  <span>{picture.title}</span>
                  <strong>{formatCurrencyEur(picture.priceEur)}</strong>
                </label>
              ))}
            </div>
          )}

          <p className="shop-cart__total">
            Total: <strong>{formatCurrencyEur(totalEur)}</strong>
          </p>

          <div className="shop-cart__actions">
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
              disabled={selectedPictures.length === 0}
            >
              Vaciar carrito
            </Button>
            <Button
              variant="contained"
              component={RouterLink}
              to="/checkout"
              disabled={selectedPictures.length === 0}
            >
              Ir a pedido
            </Button>
          </div>
        </>
      )}
    </aside>
  );
};
