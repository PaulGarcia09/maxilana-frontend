import { CreditCard } from './CreditCard';

export interface LoanPaymentRequest extends CreditCard {
  codigoprestamo: string;
  sucursal: string;
}
