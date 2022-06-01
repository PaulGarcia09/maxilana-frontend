// TODO: Esto ya no se usa en el checkout del producto
export interface MaxilanaSecure2DResponse {
  referencia: string;
  monto: string;
  articulo: string;
  contacto: string;
  dom: string;
  mun: string;
  ciudad: string;
  nombreenvio: string;
  envio: string;
}

export interface MaxilanaCheckout2DResponse {
  resultado: boolean;
  referencia: string;
  datosenvio: {
    nombre: string;
    celular: string;
    domicilio: string;
    colonia: string;
    codigopostal: string;
    municipio: string;
    estado: string;
    instrucciones: string;
  };
}

export interface PawnSecure2DResponse {
  cliente: string; // Reference3D
  sucod: string; // sucursalcodigo
  sucnom: string; // sucursal nombre
  boleta: string; // boleta
  monto: string; // total
  codaut: string; // código de autorización
  referencia: string; //referencia
}
