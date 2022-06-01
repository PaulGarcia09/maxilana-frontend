import cn from 'classnames';
import Slider from 'antd/lib/slider';
import { FC, useMemo, useState } from 'react';
import { WhatsAppOutlined } from '@ant-design/icons';
import BackButton from '~/components/pawn/BackButton';

import { Button } from '~/components/ui';

import { PawnCalculation } from '~/types/Models';
import { CMSWhatsApp } from '~/types/Models/CMSWhatsApp';

import commonStyles from '../Pawn.module.css';
import { formatPrice } from '~/modules/hooks/usePrice';

interface Props {
  data: PawnCalculation;
  whatsapp: CMSWhatsApp;
  onBack: () => void;
  onRestart: () => void;
}

const defaultTable = [
  {
    id: 1,
    label: 'Público general',
    payment: 10,
    amount: 10,
    paymentClass: 'border-[#DEEAF5]',
    amountClass: 'bg-[#DEEAF5]',
  },
  {
    id: 2,
    label: 'Cliente bronce',
    payment: 10,
    amount: 10,
    paymentClass: 'border-[#CE9550]',
    amountClass: 'text-white bg-[#CE9550]',
  },
  {
    id: 3,
    label: 'Cliente plata',
    payment: 10,
    amount: 10,
    paymentClass: 'border-gray-300',
    amountClass: 'bg-gray-300',
  },
  {
    id: 4,
    label: 'Cliente oro',
    payment: 10,
    amount: 10,
    paymentClass: 'border-[#F0CE21]',
    amountClass: 'bg-[#F0CE21]',
  },
];

const Calculator: FC<Props> = ({ data, whatsapp, onBack, onRestart }) => {
  const [monthlySpan, setMonthlySpan] = useState(1);

  const config = useMemo(() => {
    const monthlyConfig = data.config.find((item) => item.month === monthlySpan);

    if (!monthlyConfig) {
      return [];
    }

    const rates = [
      { interest: monthlyConfig?.commonInterest, amount: monthlyConfig?.commonLoan },
      { interest: monthlyConfig?.bronzeInterest, amount: monthlyConfig?.bronzeLoan },
      { interest: monthlyConfig?.silverInterest, amount: monthlyConfig?.silverLoan },
      { interest: monthlyConfig?.goldenInterest, amount: monthlyConfig?.goldenLoan },
    ];

    const table = defaultTable.map((item, idx) => {
      const amount = formatPrice({ amount: rates[idx].amount, locale: 'es-MX' });
      const payment = formatPrice({ amount: rates[idx].interest, locale: 'es-MX' });

      return {
        ...item,
        amount,
        payment,
      };
    });

    return table.reverse();
  }, [monthlySpan]);

  return (
    <div className={commonStyles.root}>
      <div className="bg-white p-4">
        <div className="flex justify-between items-center">
          <BackButton onBack={onBack} />
          <BackButton restart onBack={onRestart} />
        </div>
        <div className="text-center mb-6">
          <h3 className={commonStyles.title}>Valuación de empeño</h3>
        </div>
        {data.maxMonthlyPaymentLimit > 1 ? (
          <div className="mb-6">
            <dl className="text-center flex flex-col sm:flex-row sm:justify-between sm:text-left">
              <dt className="text-lg">Elige el período de pagos:</dt>
              <dd className="text-lg text-brand">
                {monthlySpan > 1 ? `${monthlySpan} pagos mensuales` : '1 pago mensual'}
              </dd>
            </dl>
            <div className="my-4">
              <Slider
                min={1}
                step={1}
                max={data.maxMonthlyPaymentLimit}
                value={monthlySpan}
                tooltipVisible={false}
                trackStyle={{
                  backgroundColor: '#1E83E1',
                }}
                handleStyle={{
                  borderColor: '#1E83E1',
                }}
                onChange={setMonthlySpan}
              />
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <dl className="text-center flex flex-col sm:flex-row sm:justify-between sm:text-left">
              <dt className="text-lg">Período máximo:</dt>
              <dd className="text-lg text-brand">1 mes</dd>
            </dl>
          </div>
        )}
        <div className="mb-6">
          <p className="text-center text-lg sm:text-left">
            El préstamo y refrendo aproximado por tu artículo es:
          </p>
          <div className="mt-4 grid grid-cols-2">
            <span className="text-sm text-secondary">Cliente</span>
            <span className="text-sm text-secondary">Préstamo / Refrendo</span>
          </div>
          {config?.map((item) => {
            const composedBackground = cn(
              'p-2 rounded-sm text-sm text-secondary font-semibold',
              item.amountClass,
            );
            const composedBorder = cn(
              'p-2 rounded-sm text-sm text-secondary font-semibold border',
              item.paymentClass,
            );

            return (
              <div key={item.id} className="mt-4">
                <dl className="grid grid-flow-col items-center sm:grid-cols-2">
                  <dt className="text-sm">{`${item.label}:`}</dt>
                  <dd className="text-sm text-right sm:text-left">
                    <span className={composedBackground}>{item.amount}</span>
                    <span>&nbsp;/&nbsp;</span>
                    <span className={composedBorder}>{item.payment}</span>
                  </dd>
                </dl>
              </div>
            );
          })}
        </div>
        <div className="mb-6">
          <Button
            fullWidth
            size="large"
            theme="whatsapp"
            text="Valuar con un experto"
            href={`https://api.whatsapp.com/send?phone=521${whatsapp.number}&text=Hola me gustaría solicitar un empeño`}
            icon={<WhatsAppOutlined style={{ fontSize: 20, color: '#FFF' }} />}
            target="_blank"
          />
        </div>
        <small className="inline-block text-secondary text-xxs text-center">
          Este cálculo es informativo y no representa un préstamo formal. Cuando acudas a una
          sucursal Maxilana, uno de nuestros Valuadores Certificados te dirá el valor de tu
          artículo, que dependerá de sus condiciones y características. El monto final del préstamo
          que podemos darte dependerá del avalúo de tu artículo y tu historial como cliente. CAT
          promedio sin I.V.A. para fines informativos y de comparación. Calculado al 1 de enero de
          2019. Todas las operaciones prendarias causarán I.V.A. I.V.A. 16% en Guadalajara,
          Culiacán, Mazatlán, Hermosillo, excepto en: Tijuana, Mexicali, del 8% y se cobrará al
          momento de realizar el Empeño) - Contrato aprobado e inscrito con el No. 1718-2018.
        </small>
      </div>
    </div>
  );
};

export default Calculator;
