export const sumBy = <T>(items: T[], selector: (item: T) => number): number => {
  let total = 0;

  for (const item of items) {
    total += selector(item);
  }

  return total;
};

export const formatCurrencyEur = (value: number): string =>
  `${value.toFixed(2)} €`;
