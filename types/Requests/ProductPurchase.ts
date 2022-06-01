import { CreditCard } from './CreditCard';

// TODO: Eliminar cuando se suba el carrito de compras.
export interface ProductPurchase extends CreditCard {
  sucursal: number;
  upc: string; // Código del producto
  nombreenvio: string;
  celular: string;
  correo: string;
  domicilio: string;
  codigopostal: string;
  colonia: string;
  municipio: string;
  estado: string;
  instrucciones: string;
}

export interface CartPurchase extends CreditCard {
  celular: string;
  correo: string;
  domicilio: string;
  codigopostal: string;
  colonia: string;
  municipio: string;
  estado: string;
  instrucciones: string;
  orden: string; // ? Aun no se si es el id de la orden o el objeto completo
}
