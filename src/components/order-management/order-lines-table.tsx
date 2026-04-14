import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { OrderLine } from "../../types/order-management";
import { OrderLineRow } from "./order-line-row";

type OrderLinesTableProps = {
  lines: OrderLine[];
  selectedLineIds: number[];
  onToggleSelected: (lineId: number, selected: boolean) => void;
  onValidateSelected: () => void;
  onInvalidateSelected: () => void;
  onAmountChange: (lineId: number, amount: number) => void;
};

export const OrderLinesTable: React.FC<OrderLinesTableProps> = ({
  lines,
  selectedLineIds,
  onToggleSelected,
  onValidateSelected,
  onInvalidateSelected,
  onAmountChange
}) => {
  const hasSelection = selectedLineIds.length > 0;

  return (
    <Paper className="order-lines-table" elevation={0}>
      <div className="order-lines-table__actions">
        <Button
          size="small"
          variant="contained"
          onClick={onValidateSelected}
          disabled={!hasSelection}
        >
          Validar
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="warning"
          onClick={onInvalidateSelected}
          disabled={!hasSelection}
        >
          Invalidar
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Estado</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Importe</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lines.map((line) => (
            <OrderLineRow
              key={line.id}
              line={line}
              selected={selectedLineIds.includes(line.id)}
              onToggleSelected={onToggleSelected}
              onAmountChange={onAmountChange}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};
