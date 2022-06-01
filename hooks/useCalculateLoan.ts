import useSWR from 'swr';
import fetcher from '~/api/fetcher';
import { usePrice } from '~/modules/hooks';
import { GetLoanData } from '~/types/Responses/GetLoanData';

const useCalculateLoan = (policyCode: string, amount: number) => {
  const { data } = useSWR<GetLoanData>(
    policyCode !== '' && amount ? `/servicios/pp/getmontoabono/${policyCode}/${amount}` : null,
    {
      fetcher: fetcher,
      revalidateOnFocus: false,
    },
  );

  const { price: loanAmount } = usePrice(
    data !== undefined ? { amount: Number(data.MontoAbono) } : undefined,
  );

  return loanAmount;
};

export default useCalculateLoan;
