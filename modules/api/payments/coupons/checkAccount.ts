import maxAxios from '~/api/axios';
import { CouponAccount } from '~/types/Models';
import { CouponAccountResponse } from '~/types/Responses';
import parseQuery from '~/utils/parseQuery';

type Body = { [key: string]: any };

const checkCouponAccount = async (data: Body): Promise<CouponAccount> => {
  const params = parseQuery(data);

  const response = await maxAxios.get<CouponAccountResponse>(
    `/servicios/vales/consultarlineadecredito?${params}`,
  );

  if (response?.strMensaje !== '') {
    throw new Error(response.strMensaje);
  }

  const { dblMontoACobrar, strNombreDistribuidor, strQuincena } = response;

  return {
    partnerNumber: data.numdistribuidor,
    clientName: strNombreDistribuidor,
    amount: dblMontoACobrar,
    currentDate: strQuincena,
  };
};

export default checkCouponAccount;
