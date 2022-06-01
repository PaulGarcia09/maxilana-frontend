import { Paginated } from '~/types/Paginated';

export interface Producto {
  id: number;
  codigo: string;
  idcategoria: number;
  nombrecategoria: string;
  slugcategoria: string;
  nombre: string;
  idsucursal: number;
  nombresucursal: string;
  slugsucursal: string;
  idciudad: number;
  ciudadnombre: string;
  slugciudad: string;
  precio: number;
  precioneto: number;
  marca: string;
  observaciones: string;
  imagen: 1 | 0;
  precod: number;
  slug?: string;
  ventalinea: 1 | 0;
  descuento?: string; //Numero con el %desc
  fechaimagen?: number; // Versión de imágen
}

export type GetProductos = Paginated<Producto>;
