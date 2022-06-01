/**
 * Redondea número a dos o x decimales.
 */
export default function roundDecimals(x: number, decimals: number = 2): number {
  if (Number.isNaN(x)) {
    throw new Error('Es necesario un número para redondear');
  }

  const off = Math.pow(10, decimals);

  return Math.round(x * off) / 100;
}
