import React from "react";
import { formatCurrencyEur, sumBy } from "../../common";

type CartItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type CartSummaryProps = {
  items: CartItem[];
};

export const CartSummary: React.FC<CartSummaryProps> = ({ items }) => {
  const subtotal = sumBy(items, (item) => item.quantity * item.price);
  const total = subtotal;

  return (
    <section className="cart-summary" aria-label="Resumen del carrito">
      <h2 className="cart-summary__title">Resumen del carrito</h2>
      <div className="cart-summary__totals">
        <p>
          <span>Subtotal</span>
          <span>{formatCurrencyEur(subtotal)}</span>
        </p>
        <p className="cart-summary__total">
          <span>Total</span>
          <span>{formatCurrencyEur(total)}</span>
        </p>
      </div>
      <button type="button" className="cart-summary__button">
        Finalizar pedido
      </button>
    </section>
  );
};
