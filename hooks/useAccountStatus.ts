import useSWR from 'swr';
import { useMemo } from 'react';

import fetcher from '~/modules/api/fetcher';
import { PawnAccount } from '~/types/Models';
import { GetAccountStatus } from '~/types/Responses';
import roundDecimals from '~/utils/roundDecimals';
import roundUpToFifty from '~/utils/roundUpToFifty';

export default function useAccountStatus(userCode?: string) {
  const { data, error, isValidating } = useSWR<GetAccountStatus>(
    userCode !== undefined ? `/usuarios/estadodecuenta?codigousuario=${userCode}` : null,
    {
      fetcher: fetcher,
      revalidateOnFocus: false,
    },
  );

  const account: PawnAccount[] = useMemo(() => {
    if (data !== undefined && Array.isArray(data)) {
      return data.map((ballot) => {
        const {
          Boleta,
          FecVen,
          Prestamo,
          Refrendo,
          TipoEmpeno,
          // Sucursal,
          Codigosucursal,
          Estatus,
          Nombre,
          ApellidoP,
          ApellidoM,
          FLR,
          FecEmpeno,
          // Banco,
          fechaConsulta,
          Prefijo,
          InteresdiarioActivo,
          InteresDiarioVencido,
          DiasPagoMinimo,
          ImportePagoMinimo,
          DiasVencidosPendientes,
          SaldoAFavor,
          BoletaBloqueada,
          Mensaje,
          PagoEnProceso,
          SaldoPorAplicar,
          // PermitirPago,
          comision,
        } = ballot;

        let loan = Number(Prestamo);
        let totalPaymentAmount = 0; // DESEMPEÑO
        const extraCharge = comision; // COMISION
        let paymentAmount = Number(Refrendo); // REFRENDO
        let refrendoNocomicion = Number(Refrendo); // REFRENDO
        const minPaymentAmount = roundDecimals(
          roundUpToFifty(Number(ImportePagoMinimo)) * extraCharge,
        ); // PAGO MÍNIMO
        /** CÁLCULO DE PAGO DE REFRENDO */
        paymentAmount = roundDecimals(roundUpToFifty(paymentAmount));
        paymentAmount = paymentAmount * extraCharge;
        /** CÁLCULO DE PAGO DE DESEMPEÑO */
        // SOLO INFORMATIVO, NO SE PUEDE PAGAR
        // ! https://docs.google.com/spreadsheets/d/1fvTCU19wyIS0uEPZ7ORA24LhJsxewq6PUVo6ZtIlh2U/edit?disco=AAAARViEeF4

        totalPaymentAmount = roundDecimals(paymentAmount + loan);

        const accountBlocked = BoletaBloqueada === '1';
        const accountBlockedMessage = accountBlocked ? Mensaje ?? '' : '';

        return {
          extraCharge,
          accountBlocked,
          accountBlockedMessage,
          name: `${Nombre} ${ApellidoP} ${ApellidoM}`.trim(),
          accountNumber: Boleta,
          accountLetter: Prefijo,
          loanAmount: loan,
          startDate: FecEmpeno,
          status: Estatus,
          requestDate: fechaConsulta,
          dueDate: FecVen,
          description: TipoEmpeno,
          paymentAmount: paymentAmount,
          paymenAmounNocomision: refrendoNocomicion,
          minPaymentAmount: minPaymentAmount,
          totalPaymentAmount: totalPaymentAmount,
          dueDays: Number(DiasVencidosPendientes),
          limitDueDays: Number(DiasVencidosPendientes), // TODO: Preguntar si este dato es diferente, no viene
          pendingDueDays: Number(DiasVencidosPendientes),
          normalDailyInterest: Number(InteresdiarioActivo),
          dueDailyInterest: Number(InteresDiarioVencido),
          minDaysToPay: Number(DiasPagoMinimo),
          amountToAply: Number(SaldoPorAplicar),
          paymentPendingToApply: Number(PagoEnProceso) === 1,
          branch: Codigosucursal,
          creditBalance: Number(SaldoAFavor),
        };
      });
    }

    return [];
  }, [data]);

  return { account, error, loading: isValidating };
}
