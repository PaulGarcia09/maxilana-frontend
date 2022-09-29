import { CreditCard } from './CreditCard';

export interface CouponPaymentRequest extends CreditCard {
  cdistribuidora: string;
  email: string;
}
