export const formatCurrency = (value: number, currencyCode: string) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  });

  return formatter.format(value / 100);
};
