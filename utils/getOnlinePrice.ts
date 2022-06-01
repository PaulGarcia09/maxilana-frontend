import roundDecimals from './roundDecimals';

/**
 * Devuelve el precio para venta en línea
 *  si el producto tiene descuento extra, lo aplica.
 */
export default function getOnlinePrice(netPrice: number, promoDiscount?: number) {
  let onlinePrice = netPrice;

  if (promoDiscount && Number(promoDiscount)) {
    onlinePrice = netPrice - (netPrice * promoDiscount) / 100;
  }

  return roundDecimals(onlinePrice);
}
