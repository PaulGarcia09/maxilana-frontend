type Periodicity = Array<{
  CodigoPeriodicidad: string;
  Periodicidad: 'QUINCENAL' | 'SEMANAL';
  Politicas: Array<{
    CodigoPolitica: string;
    Plazo: string;
  }>;
}>;

export type GetLoanCityPolicies = {
  Intervalo: string;
  MontoMaximo: string;
  MontoMinimo: string;
  Periodicidad: Periodicity;
};
