/**
 * Esta función se usa para redondear a 50 centavos
 *  o el próximo entero.
 *
 * Es una función que usan en Maxilana para presentar
 *  cantidades de servicios a pagar.
 */

export default function roundUpToFifty(total: number) {
  const integer = Math.trunc(total);
  let decimal = total - integer;

  if (decimal < 0.5) {
    decimal = 0.5;
  } else if (decimal > 0.5) {
    decimal = 1;
  }

  return integer + decimal;
}
