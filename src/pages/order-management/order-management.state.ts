import { OrderState } from "../../types/order-management";

export type OrderAction =
  | { type: "toggle-select-line"; lineId: number; selected: boolean }
  | { type: "validate-selected-lines" }
  | { type: "invalidate-selected-lines" }
  | { type: "change-amount"; lineId: number; amount: number }
  | { type: "send-order" };

export const initialOrderState: OrderState = {
  header: {
    orderNumber: "ORD-2026-001",
    orderDate: "2026-04-15",
    provider: "Suministros Lemoncode"
  },
  lines: [
    { id: 1, article: "Reactivos maquinaria", amount: 2345, validated: true },
    { id: 2, article: "Recambios impresión", amount: 135, validated: false },
    { id: 3, article: "Soportes plataforma", amount: 540, validated: false }
  ],
  selectedLineIds: [],
  sent: false
};

const addSelectedLine = (
  selectedLineIds: number[],
  lineId: number
): number[] => {
  if (selectedLineIds.includes(lineId)) {
    return selectedLineIds;
  }

  return [...selectedLineIds, lineId];
};

const removeSelectedLine = (
  selectedLineIds: number[],
  lineId: number
): number[] => selectedLineIds.filter((id) => id !== lineId);

const updateValidatedForSelected = (
  state: OrderState,
  validated: boolean
): OrderState => ({
  ...state,
  sent: false,
  lines: state.lines.map((line) =>
    state.selectedLineIds.includes(line.id) ? { ...line, validated } : line
  ),
  selectedLineIds: []
});

export const orderReducer = (
  state: OrderState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case "toggle-select-line": {
      const nextSelectedLineIds = action.selected
        ? addSelectedLine(state.selectedLineIds, action.lineId)
        : removeSelectedLine(state.selectedLineIds, action.lineId);

      return {
        ...state,
        selectedLineIds: nextSelectedLineIds
      };
    }

    case "validate-selected-lines":
      return updateValidatedForSelected(state, true);

    case "invalidate-selected-lines":
      return updateValidatedForSelected(state, false);

    case "change-amount":
      return {
        ...state,
        sent: false,
        lines: state.lines.map((line) =>
          line.id === action.lineId ? { ...line, amount: action.amount } : line
        )
      };

    case "send-order":
      return {
        ...state,
        sent: true
      };

    default:
      return state;
  }
};

export const getValidationPercent = (lines: OrderState["lines"]): number => {
  if (lines.length === 0) {
    return 0;
  }

  const validatedLines = lines.filter((line) => line.validated).length;
  return Math.round((validatedLines / lines.length) * 100);
};
