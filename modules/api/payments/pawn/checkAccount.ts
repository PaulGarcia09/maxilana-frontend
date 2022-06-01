import axios from '~/api/axios';
import parseQuery from '~/utils/parseQuery';
import { PawnAccount } from '~/types/Models';
import { PawnAccountResponse } from '~/types/Responses';
import roundDecimals from '~/utils/roundDecimals';
import roundUpToFifty from '~/utils/roundUpToFifty';

type Body = { [key: string]: any };

const checkAccount = async (data: Body): Promise<PawnAccount> => {
  const queryParams = parseQuery(data);

  const response = await axios.get<PawnAccountResponse>(`/boleta?${queryParams}`);

  if (response.error) {
    throw new Error(response.error);
  }

  const {
    FechaConsulta,
    FechaEmpeno,
    FechaVencimiento,
    EstadoBoleta,
    BoletaActual,
    Cliente,
    Prestamo,
    TipoEmpeno,
    InteresNormal,
    InteresVencido,
    ImportePagoMinimo,
    comision,
    SaldoPorAplicar,
    DiasPagoMinimo,
    DiasVencidos,
    DiasVencidosPendientes,
    DiasVencidosPermitidos,
    InteresDiarioNormal,
    InteresDiarioVencido,
    RefrendoPendienteAplicar,
    BoletaBloqueada,
    CodigoSucursal,
  } = response;

  let decimal = 0;
  let decimalTotal = 0;
  let loan = Number(Prestamo);
  let paymentAmount = 0; // REFRENDO
  let totalPaymentAmount = 0; // DESEMPEÑO
  const extraCharge = Number(comision); // COMISION
  const minPaymentAmount = roundDecimals(roundUpToFifty(Number(ImportePagoMinimo)) * extraCharge); // PAGO MÍNIMO

  /** CÁLCULO DE PAGO DE REFRENDO */
  const interest = Number(InteresNormal) + Number(InteresVencido);
  const diffInterest = interest - Math.round(interest);

  if (diffInterest > 0) {
    decimal = 0.5 - Math.round(diffInterest);
  }

  if (decimal === 0) {
    paymentAmount = Math.round(interest);
  } else if (decimal > 0) {
    paymentAmount = interest + decimal;
  } else {
    paymentAmount = Math.round(interest + (0.5 + decimal));
  }

  paymentAmount = roundDecimals(paymentAmount * extraCharge);

  /** CÁLCULO DE PAGO DE DESEMPEÑO */
  // SOLO INFORMATIVO, NO SE PUEDE PAGAR
  let subtotal = loan + interest;
  const diffSubtotalInterest = subtotal - Math.round(subtotal);

  if (diffSubtotalInterest > 0) {
    decimalTotal = 0.5 - Math.round(diffSubtotalInterest);
  }

  if (decimalTotal === 0) {
    totalPaymentAmount = Math.round(subtotal);
  } else if (decimalTotal > 0) {
    totalPaymentAmount = subtotal + decimalTotal;
  } else {
    totalPaymentAmount = Math.round(subtotal + (0.5 + decimalTotal));
  }

  totalPaymentAmount = roundDecimals(totalPaymentAmount);

  const accountBlocked = BoletaBloqueada === 'true';
  const accountBlockedMessage = accountBlocked ? response?.Mensaje ?? '' : '';

  return {
    extraCharge,
    name: Cliente,
    accountBlocked,
    accountBlockedMessage,
    accountNumber: BoletaActual,
    accountLetter: data.letra,
    loanAmount: loan,
    startDate: FechaEmpeno,
    status: EstadoBoleta,
    requestDate: FechaConsulta,
    dueDate: FechaVencimiento,
    description: TipoEmpeno,
    paymentAmount: paymentAmount,
    minPaymentAmount: minPaymentAmount,
    totalPaymentAmount: totalPaymentAmount,
    dueDays: Number(DiasVencidos),
    limitDueDays: Number(DiasVencidosPermitidos),
    pendingDueDays: Number(DiasVencidosPendientes),
    normalDailyInterest: Number(InteresDiarioNormal),
    dueDailyInterest: Number(InteresDiarioVencido),
    minDaysToPay: Number(DiasPagoMinimo),
    amountToAply: Number(SaldoPorAplicar),
    paymentPendingToApply: Number(RefrendoPendienteAplicar) === 1,
    branch: CodigoSucursal,
  };
};

export default checkAccount;
