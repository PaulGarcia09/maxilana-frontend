import useSWR from 'swr';
import { useMemo } from 'react';
import fetcher from '~/api/fetcher';
import { GetLoanCityPolicies } from '~/types/Responses/GetLoanCityPolicies';
import { LoanConfig } from '~/types/Models';

type Data = {
  isLoading: boolean;
  config?: LoanConfig;
};

const useLoanConfig = (cityCode: string): Data => {
  const { data: policies, isValidating } = useSWR<GetLoanCityPolicies>(
    cityCode ? `/servicios/pp/periodicidadespoliticas/${cityCode}` : null,
    {
      fetcher: fetcher,
      revalidateOnFocus: false,
    },
  );

  const config = useMemo(() => {
    if (policies) {
      const { Intervalo, MontoMaximo, MontoMinimo, Periodicidad } = policies;

      return {
        minAmount: Number(MontoMinimo),
        maxAmount: Number(MontoMaximo),
        amountInterval: Number(Intervalo),
        periodicity: Periodicidad.map((item) => ({
          code: item.CodigoPeriodicidad,
          label: item.Periodicidad,
          policies: item.Politicas.map((policy) => ({
            policyCode: policy.CodigoPolitica,
            timeLimit: Number(policy.Plazo),
          })),
        })),
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [policies]);

  return {
    config,
    isLoading: isValidating,
  };
};

export default useLoanConfig;
