import axios from '../../axios';
import { LoanAccount } from '~/types/Models';
import { LoanAccountResponse } from '~/types/Responses';
import parseQuery from '~/utils/parseQuery';

type Body = { [key: string]: any };

const checkLoanAccount = async (data: Body): Promise<LoanAccount> => {
  const queryParams = parseQuery(data);

  const response = await axios.get<LoanAccountResponse>(
    `/servicios/pp/consultarprestamo?${queryParams}`,
  );

  if (response.strMensaje !== '') {
    throw new Error(response.strMensaje);
  }

  const { strNombreCliente, dblMontoLiquidaCon, dblMontoAlCorriente, strFechaVencimiento } =
    response;

  return {
    minPayment: dblMontoAlCorriente,
    settlePayment: dblMontoLiquidaCon,
    clientCode: data.codigoprestamo,
    clientName: strNombreCliente,
    dueDate: strFechaVencimiento,
  };
};

export default checkLoanAccount;
