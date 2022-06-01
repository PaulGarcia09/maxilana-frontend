export interface Sucursal {
  id: number;
  numero: number;
  nombre: string;
  direccion: string;
  telefono: string;
  codigociudad?: number;
  ciudad?: number;
  estado: string;
  img_croquis: string;
  activo: 0 | 1;
  HorarioLV: string;
  HorarioS: string;
  HorarioD: string;
  constancia: string;
  identifcadorparamapa: string;
  whatsapp: string;
  HorarioConFormato: string;
  whatsappConFormato: string;
  correoelectronico: string;
  correoelectronicooficial: string;
  HoraAperturaLV: string;
  HoraCierreLV: string;
  HoraAperturaS: string;
  HoraCierreS: string;
  HoraAperturaD: string;
  HoraCierreD: string;
  latitud: number;
  longitud: number;
  slug?: string;
}

export type GetSucursales = Array<{
  id: number;
  ciudad: string;
  slug: string;
  totalSucursales: number;
  sucursales: Sucursal[];
}>;
