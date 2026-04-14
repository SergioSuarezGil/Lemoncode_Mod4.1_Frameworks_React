import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import { useShopCart } from "../../context";
import { getPicturesByIds } from "../../services/shop";
import { formatCurrencyEur, sumBy } from "../../common";

export const CheckoutPage: React.FC = () => {
  const { selectedPictureIds } = useShopCart();
  const [isOrderConfirmed, setIsOrderConfirmed] = React.useState(false);

  const selectedPictures = getPicturesByIds(selectedPictureIds);

  const totalEur = sumBy(selectedPictures, (picture) => picture.priceEur);

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
  };

  return (
    <section className="checkout-page">
      <h2 className="checkout-page__title">Confirmación del pedido</h2>
      {selectedPictures.length === 0 ? (
        <p>
          El carrito está vacío. Añade al menos una imagen antes de continuar.
        </p>
      ) : (
        <>
          <p className="checkout-page__summary">
            Listo para tramitar tu pedido con{" "}
            <strong>{selectedPictures.length}</strong> imagen(es).
          </p>
          <p className="checkout-page__total">
            Importe total: <strong>{formatCurrencyEur(totalEur)}</strong>
          </p>
        </>
      )}

      {isOrderConfirmed && (
        <Alert severity="success" className="checkout-page__alert">
          Se ha confirmado el pedido
        </Alert>
      )}

      <div className="checkout-page__actions">
        <Button variant="outlined" component={RouterLink} to="/orders">
          Volver a las imágenes
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleConfirmOrder}
          disabled={selectedPictures.length === 0}
        >
          Confirmar pedido
        </Button>
      </div>
    </section>
  );
};
