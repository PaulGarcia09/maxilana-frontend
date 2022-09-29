import { BankTransaction } from '~/types/Responses';
import { PaymentTransactionRequest } from '~/types/Requests';

const normalize3DTransaction = (responseBuffer: Buffer): PaymentTransactionRequest => {
  const parsedResponse = responseBuffer.toString('utf-8');
  // @ts-ignore
  // const securetransaction: BankTransaction = Object.fromEntries(
  //   new URLSearchParams(parsedResponse),
  // );
  const securetransaction: Any = Object.fromEntries(new URLSearchParams(parsedResponse));

  const { ECI, XID, CAVV, REFERENCE3D, CARDTYPE, Status, AMOUNT, ...rest } = securetransaction;

  return {
    eci: ECI,
    xid: XID,
    cavv: CAVV,
    status: Status,
    cardtype: CARDTYPE,
    total: Number(AMOUNT),
    Reference3D: REFERENCE3D,
  };
};

export default normalize3DTransaction;
