// ESTE MODELO SOLO LLEGA
//  DEL ENDPOINT DEL CARRITO...
interface Producto {
  id: string;
  nombre: string;
  precio: number;
  seguro?: number; // Cantidad de seguro de producto, joyería o >= $10K
  sucursal: number; // El id de la sucursal
  idciudad: number; // El id de la plaza
}

interface ItemCarrito {
  plaza: string;
  envio: string; // number
  productos: Producto[];
}

export interface MaxilanCartResponse {
  orden: string; //number
  carrito: ItemCarrito[];
  pago: {
    envio: number;
    subtotal: number;
    total: number;
  };
}
