import { useMemo } from 'react';
import { PawnAccount } from '~/types/Models';
import roundDecimals from '~/utils/roundDecimals';
import roundUpToFifty from '~/utils/roundUpToFifty';

/**
 * Calcula el importe a pagar para la
 *  compra de días.
 */
const useCalculatePawnExtension = (data: PawnAccount, daysToExtend: number): number => {
  const extensionAmount = useMemo(() => {
    let totalAmount = 0;
    let subtotalAmount = 0;
    let totalDaysAmount = 0;
    let totalDueDaysAmount = 0;

    const { pendingDueDays, minDaysToPay, normalDailyInterest, dueDailyInterest, amountToAply } =
      data;

    if (daysToExtend < minDaysToPay) {
      throw new Error(`La cantidad de días mínimos son: ${minDaysToPay}`);
    }

    // Cobro de días normales
    const daysToPay = daysToExtend - pendingDueDays;

    // Cobro de días vencidos
    const dueDaysToPay = daysToExtend - daysToPay;

    if (daysToPay > 0) {
      totalDaysAmount = daysToPay * normalDailyInterest;
      totalDueDaysAmount = dueDaysToPay * dueDailyInterest;
    } else {
      totalDueDaysAmount = daysToExtend * dueDailyInterest;
    }

    subtotalAmount = totalDaysAmount + totalDueDaysAmount - amountToAply;
    subtotalAmount = roundUpToFifty(subtotalAmount);
    totalAmount = roundDecimals(subtotalAmount * data.extraCharge); // Agrega comisión

    return totalAmount;
  }, [daysToExtend]);

  return extensionAmount;
};

export default useCalculatePawnExtension;
