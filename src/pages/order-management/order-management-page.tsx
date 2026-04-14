import React from "react";
import { Alert, Button, Stack } from "@mui/material";
import { BackHomeButton } from "../../components/common";
import {
  OrderHeader,
  OrderLinesTable
} from "../../components/order-management";
import { sumBy } from "../../common";
import {
  getValidationPercent,
  initialOrderState,
  orderReducer
} from "./order-management.state";

export const OrderManagementPage: React.FC = () => {
  const [state, dispatch] = React.useReducer(orderReducer, initialOrderState);

  const totalAmount = sumBy(state.lines, (line) => line.amount);
  const statusPercent = getValidationPercent(state.lines);
  const canSend = statusPercent === 100;

  const handleSend = () => {
    if (!canSend) {
      return;
    }

    dispatch({ type: "send-order" });
  };

  return (
    <section className="order-management-page">
      <div className="order-management-page__topbar">
        <BackHomeButton />
      </div>

      <OrderHeader
        header={state.header}
        totalAmount={totalAmount}
        statusPercent={statusPercent}
      />

      <Stack spacing={2}>
        <OrderLinesTable
          lines={state.lines}
          selectedLineIds={state.selectedLineIds}
          onToggleSelected={(lineId, selected) =>
            dispatch({ type: "toggle-select-line", lineId, selected })
          }
          onValidateSelected={() =>
            dispatch({ type: "validate-selected-lines" })
          }
          onInvalidateSelected={() =>
            dispatch({ type: "invalidate-selected-lines" })
          }
          onAmountChange={(lineId, amount) =>
            dispatch({ type: "change-amount", lineId, amount })
          }
        />

        <div className="order-management-page__footer-actions">
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={!canSend || state.sent}
          >
            {state.sent ? "Pedido enviado" : "Enviar pedido"}
          </Button>
        </div>

        {state.sent && (
          <Alert severity="success">Pedido enviado correctamente.</Alert>
        )}

        <Alert severity="info" className="order-management-page__help">
          Selecciona líneas con los checkboxes y usa Validar/Invalidar para
          cambiar su estado. Puedes editar importes en la tabla y el total se
          recalcula automáticamente. El pedido solo se puede enviar cuando el
          estado llega al 100%.
        </Alert>
      </Stack>
    </section>
  );
};
