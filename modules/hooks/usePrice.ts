import { useMemo } from 'react';

const locale = 'es-MX';
const currencyCode = 'MXN';

export function formatPrice({ amount, locale: locale }: { amount: number; locale?: string }) {
  const strAmount = String(amount.toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  return `$${strAmount}`;
}

export function formatVariantPrice({
  amount,
  baseAmount,
  locale,
}: {
  baseAmount: number;
  amount: number;
  locale: string;
}) {
  const hasDiscount = baseAmount > amount;
  const formatDiscount = new Intl.NumberFormat(locale, { style: 'percent' });
  const discount = hasDiscount ? formatDiscount.format((baseAmount - amount) / baseAmount) : null;

  const price = formatPrice({ amount, locale });
  const basePrice = hasDiscount ? formatPrice({ amount: baseAmount, locale }) : null;

  return { price, basePrice, discount };
}

type HookParams = { amount: number; baseAmount?: number };
type HookResult = {
  price: string;
  basePrice: string | null;
  discount: string | null;
};

const usePrice = (data?: HookParams): HookResult => {
  const { amount, baseAmount } = data ?? {};

  const value = useMemo(() => {
    if (typeof amount !== 'number') return '';

    return baseAmount
      ? formatVariantPrice({ amount, baseAmount, locale })
      : formatPrice({ amount, locale });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, baseAmount]);

  if (typeof value === 'string') {
    return { price: value, basePrice: null, discount: null };
  }

  return value;
};

export default usePrice;
