export function convertCurrency(currency: string, amount: string): number {
  const usdToUahRate = 39.26;
  const usdToEurRate = 0.93;

  if (currency === 'UAH') {
    return Math.floor(usdToUahRate * +amount);
  }

  if (currency === 'EUR') {
    return Math.floor(usdToEurRate * +amount);
  }

  return +amount;
}
