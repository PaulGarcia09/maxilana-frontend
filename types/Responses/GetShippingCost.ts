export interface ShippingCost {
  activo: null | string;
  costo: null | string;
  marca: string;
  nombre: string;
  costotipo: string;
  tipo: number;
}

export type GetShippingCost = Array<ShippingCost>;
