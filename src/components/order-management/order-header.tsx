import React from "react";
import { Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { OrderHeader as OrderHeaderModel } from "../../types/order-management";

type OrderHeaderProps = {
  header: OrderHeaderModel;
  totalAmount: number;
  statusPercent: number;
};

export const OrderHeader: React.FC<OrderHeaderProps> = ({
  header,
  totalAmount,
  statusPercent
}) => {
  return (
    <Card className="order-header">
      <CardContent className="order-header__content">
        <Stack spacing={1.5}>
          <Typography variant="h5" component="h1">
            Pedido a proveedor
          </Typography>
          <div className="order-header__fields">
            <TextField
              label="Número"
              size="small"
              value={header.orderNumber}
              slotProps={{ htmlInput: { readOnly: true } }}
            />
            <TextField
              label="Proveedor"
              size="small"
              value={header.provider}
              slotProps={{ htmlInput: { readOnly: true } }}
            />
            <TextField
              label="Fecha"
              type="date"
              size="small"
              value={header.orderDate}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { readOnly: true }
              }}
            />
          </div>

          <div className="order-header__summary-fields">
            <TextField
              className="order-header__highlight-input"
              label="Importe total"
              size="small"
              value={`${totalAmount.toFixed(2)} €`}
              slotProps={{ htmlInput: { readOnly: true } }}
            />
            <TextField
              className="order-header__highlight-input"
              label="Estado"
              size="small"
              value={`${statusPercent}%`}
              slotProps={{ htmlInput: { readOnly: true } }}
            />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
};
