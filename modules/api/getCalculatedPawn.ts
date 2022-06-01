import maxAxios from './axios';
import parseQuery from '~/utils/parseQuery';
import { RequestPawn } from '~/types/Requests/RequestPawn';
import { GetCalculatedPawn } from '~/types/Responses/GetCalculatedPawn';
import { PawnCalculation } from '~/types/Models';

const getCalculatedPawn = async (data: RequestPawn): Promise<PawnCalculation> => {
  // @ts-ignore
  const queryParams = parseQuery(data);

  const response = await maxAxios.get<GetCalculatedPawn>(
    `/calculadoraempeno/calcularprestamo?${queryParams}`,
  );

  if (response) {
    const months = Object.keys(response).map((m) => Number(m));
    const maxMonthlyPaymentLimit = Math.max(...months);
    const config = months.map((item) => ({
      month: item,
      commonLoan: response[item].Prestamonormal,
      commonInterest: response[item].Interesnormal,
      bronzeLoan: response[item].Prestamobronce,
      bronzeInterest: response[item].Interesbronce,
      silverLoan: response[item].Prestamoplata,
      silverInterest: response[item].Interesplata,
      goldenLoan: response[item].Prestamooro,
      goldenInterest: response[item].Interesoro,
    }));

    return {
      maxMonthlyPaymentLimit,
      config,
    };
  }

  throw new Error('Ocurrió un error al calcular el préstamo para tu empeño');
};

export default getCalculatedPawn;
