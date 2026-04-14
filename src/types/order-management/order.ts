export interface OrderHeader {
  orderNumber: string;
  orderDate: string;
  provider: string;
}

export interface OrderLine {
  id: number;
  article: string;
  amount: number;
  validated: boolean;
}

export interface OrderState {
  header: OrderHeader;
  lines: OrderLine[];
  selectedLineIds: number[];
  sent: boolean;
}
