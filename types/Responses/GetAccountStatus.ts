import { PawnStatus } from '../Models';

export interface MaxilanaPawnBallot {
  Boleta: string;
  FecVen: string;
  Prestamo: string;
  Refrendo: string;
  Sucursal: string;
  Codigosucursal: string;
  Estatus: PawnStatus;
  Nombre: string;
  ApellidoP: string;
  ApellidoM: string;
  FLR: string;
  Banco: string;
  fechaConsulta: string;
  Prefijo: string;
  InteresdiarioActivo: string;
  InteresDiarioVencido: string;
  DiasPagoMinimo: string;
  ImportePagoMinimo: string;
  DiasVencidosPendientes: string;
  SaldoAFavor: string;
  BoletaBloqueada: string;
  Mensaje: string;
  PagoEnProceso: string;
  SaldoPorAplicar: string;
  PermitirPago: string;
  comision: number;
  TipoEmpeno: string;
  FecEmpeno: string;
}

export type GetAccountStatus = MaxilanaPawnBallot[];
