export interface Ciudad {
  id: number;
  slug: string;
  nombre: string;
  estado: string;
  activo: 0 | 1;
  codigoplaza: number;
}

export type GetCities = Array<Ciudad>;
