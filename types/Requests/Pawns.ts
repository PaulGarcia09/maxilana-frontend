import { CreditCard } from './CreditCard';
import { PaymentTransactionRequest } from './PaymentTransactionRequest';

interface PawnAccount {
  boleta: string;
  monto: string;
  sucursal: string;
  prestamo: string;
  codigotipopago: string; // '1' | '2' | '3'
  fechaconsulta: string;
  diaspagados: string;
  letra: string;
}

/**
 * Códigos de pago
 * 1 - Pago de refrendo
 * 2 - Compra de días
 * 3 - Abono de cantidad
 */
export interface PawnPaymentRequest extends CreditCard {
  email: string;
  detallepago: PawnAccount[];
}

export interface Pawn2DRequest extends PaymentTransactionRequest {
  Cliente: string;
  total: number;
}

// PETICIÓN DE EMPEÑO
export interface PawnRequest {
  codigoarticulo: number;
  monto: number;
  plaza: number;
  correo: string;
}

// PETICIÓN DE AUTOEMPEÑO
export interface AutoPawnRequest {
  ciudad: string;
  marca: string;
  modelo: string;
  tipo: string;
  cantidad: number;
  correo: string;
  telefono: string;
  nombre: string;
  primerapellido: string;
  segundoapellido: string;
  fecnac: string;
}
