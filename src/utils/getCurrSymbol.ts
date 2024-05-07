export const getCurrSymbol = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'UAH':
      return '₴';
    case 'EUR':
      return '€';
    default:
      return '$';
  }
};
