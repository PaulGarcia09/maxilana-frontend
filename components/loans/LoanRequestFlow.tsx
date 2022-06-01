import dayjs from 'dayjs';
import { FC, useState } from 'react';

import LoanRequest from './LoanRequest';
import LoanResponse from './LoanResponse';
import LoanCalculator from './LoanCalculator';
import saveLoanProspect from '~/api/saveLoanProspect';

import type { LoanRequestData } from './LoanRequest';

type Status = 'calculate' | 'form' | 'response';

type Config = {
  cityCode: number;
  policy: string;
  amount: number;
};

// LOS IDS DE ESTA LISTA ESTÁN BASADOS
//  EN LOS IDS DE LAS PLAZAS QUE SE MUESTRAN
//  EN LA CALCULADORA.
const whatsappList = [
  {
    id: 1,
    label: 'Culiacán',
    phone: '6675021267',
  },
  {
    id: 2,
    label: 'Mazatlán',
    phone: '6692405437',
  },
  {
    id: 3,
    label: 'Hermosillo',
    phone: '6624294030',
  },
  {
    id: 4,
    label: 'Guadalajara',
    phone: '3318911511',
  },
  {
    id: 6,
    label: 'Tijuana',
    phone: '664120345',
  },
  {
    id: 5,
    label: 'Mexicali',
    phone: '6861571304',
  },
];

const LoanRequestFlow: FC = () => {
  const [status, setStatus] = useState<Status>('calculate');
  const [loanConfig, setLoanConfig] = useState<Config | null>(null);

  const handleRequestLoan = async (data: LoanRequestData) => {
    if (!loanConfig) {
      throw new Error('Faltan datos para enviar la petición de préstamo');
    }

    const now = dayjs().format('DD/MM/YYYY');

    const params = {
      ...data,
      Fecha: now,
      CodigoPlaza: loanConfig.cityCode,
      MontoSolicitado: loanConfig.amount,
      CodigoPolitica: loanConfig.policy,
    };

    await saveLoanProspect(params);
    setStatus('response');
  };

  const handleWhatsappLoan = async (data: LoanRequestData) => {
    if (!loanConfig) {
      throw new Error('Faltan datos para enviar la petición de préstamo');
    }

    const now = dayjs().format('DD/MM/YYYY');
    const item = whatsappList.find((item) => item.id == loanConfig.cityCode);
    const { Nombre = '', CorreoElectronico = '', Telefono = '' } = data;

    const params = {
      Nombre,
      CorreoElectronico,
      Telefono,
      Fecha: now,
      CodigoPlaza: loanConfig.cityCode,
      MontoSolicitado: loanConfig.amount,
      CodigoPolitica: loanConfig.policy,
    };

    await saveLoanProspect(params);
    setStatus('response');

    // Enviamos a Whatsapp
    setTimeout(() => {
      const message = `
        Hola quisiera solicitar un préstamo, mis datos son los siguientes:
         \nFecha: ${params.Fecha}
         \nMonto Solicitado: ${params.MontoSolicitado}
         \nCiudad: ${item?.label}
      `;

      const location = `https://api.whatsapp.com/send?phone=521${item?.phone}&text=${message}`;

      // @ts-ignore
      window.location = location;
    }, 2000);
  };

  if (status === 'calculate') {
    return (
      <LoanCalculator
        onSubmit={(data) => {
          setStatus('form');
          setLoanConfig(data as Config);
        }}
      />
    );
  }

  if (status === 'form') {
    return <LoanRequest onSubmit={handleRequestLoan} onWhatsapp={handleWhatsappLoan} />;
  }

  return (
    <LoanResponse
      onReturn={() => {
        setLoanConfig(null);
        setStatus('calculate');
      }}
    />
  );
};

export default LoanRequestFlow;
