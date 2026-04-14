import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { formatCurrencyEur } from "../../common";

type Order = {
  id: string;
  customer: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered";
};

type OrdersTableProps = {
  orders: Order[];
};

type OrderColumn = {
  key: keyof Order;
  title: string;
  className?: string;
  formatter?: (order: Order) => string;
};

const orderColumns: OrderColumn[] = [
  { key: "id", title: "Order ID" },
  { key: "customer", title: "Customer" },
  { key: "status", title: "Status", className: "orders-table__status" },
  {
    key: "total",
    title: "Total",
    formatter: (order) => formatCurrencyEur(order.total)
  }
];

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  return (
    <TableContainer
      component={Paper}
      className="orders-table"
      role="region"
      aria-label="Orders list"
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {orderColumns.map((column) => (
              <TableCell key={column.key}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {orderColumns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.formatter
                    ? column.formatter(order)
                    : String(order[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
