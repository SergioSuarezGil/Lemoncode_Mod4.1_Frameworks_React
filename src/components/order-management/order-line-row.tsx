import React from "react";
import { Checkbox, TableCell, TableRow, TextField } from "@mui/material";
import { OrderLine } from "../../types/order-management";

type OrderLineRowProps = {
  line: OrderLine;
  selected: boolean;
  onToggleSelected: (lineId: number, selected: boolean) => void;
  onAmountChange: (lineId: number, amount: number) => void;
};

export const OrderLineRow: React.FC<OrderLineRowProps> = ({
  line,
  selected,
  onToggleSelected,
  onAmountChange
}) => {
  return (
    <TableRow hover>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onChange={(event) => onToggleSelected(line.id, event.target.checked)}
        />
      </TableCell>
      <TableCell>{line.validated ? "Válido" : "Pendiente"}</TableCell>
      <TableCell>{line.article}</TableCell>
      <TableCell>
        <div className="order-line-row__amount-wrap">
          <TextField
            type="number"
            size="small"
            value={line.amount}
            className="order-line-row__amount"
            slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
            onChange={(event) => {
              const nextAmount = Number.parseFloat(event.target.value);
              onAmountChange(
                line.id,
                Number.isNaN(nextAmount) ? 0 : nextAmount
              );
            }}
          />
          <span className="order-line-row__currency">€</span>
        </div>
      </TableCell>
    </TableRow>
  );
};
