import { BankTransaction } from '~/types/Responses';
import { PaymentTransactionRequest } from '~/types/Requests';

const normalize3DTransaction = (responseBuffer: Buffer): PaymentTransactionRequest => {
  const parsedResponse = responseBuffer.toString('utf-8');
  // @ts-ignore
  const securetransaction: BankTransaction = Object.fromEntries(
    new URLSearchParams(parsedResponse),
  );

  const { ECI, XID, CAVV, Reference3D, CardType, Status, Total } = securetransaction;

  return {
    eci: ECI,
    xid: XID,
    cavv: CAVV,
    status: Status,
    cardtype: CardType,
    total: Number(Total),
    Reference3D,
  };
};

export default normalize3DTransaction;
