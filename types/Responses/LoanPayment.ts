interface LoanAccountResponse {
  PagosEnLineaPrestamosPersonalesObtenerInformacionPrestamoPersonalResult: boolean;
  strNombreCliente: string;
  dblMontoLiquidaCon: number;
  dblMontoAlCorriente: number;
  strFechaVencimiento: string;
  strMensaje: string;
  comision: string; //number
}

export type { LoanAccountResponse };
