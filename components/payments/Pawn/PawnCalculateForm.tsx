import dayjs from 'dayjs';
import cn from 'classnames';
import { AxiosError } from 'axios';
import { Radio, Form } from 'antd';
import { FC, useState } from 'react';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { Button } from '~/components/ui';
import { PawnAccount } from '~/types/Models';
import { FormFeedback, InputMask } from '~/components/common';

import { formatPrice } from '~/modules/hooks/usePrice';
import useCalculatePawnExtension from '~/hooks/useCalculatePawnExtension';

type Status = 'idle' | 'loading' | 'searching';

type FormValues = {
  paymentType: 'REFRENDO' | 'ABONO' | 'OTRO-ABONO';
  paymentAmount?: number;
  paymentExtension?: number;
};

interface Props {
  data: PawnAccount;
  onSubmit: (data: FormValues) => Promise<void>;
}

dayjs.extend(localizedFormat);
const LOCALE = 'es-MX';

const PawnCalculateForm: FC<Props> = ({ data, onSubmit }) => {
  const [form] = Form.useForm();

  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [daysToExtend, setDaysToExtend] = useState(data.minDaysToPay);

  const creditBalance = data?.creditBalance
    ? formatPrice({ amount: data.creditBalance, locale: LOCALE })
    : '$0.00';
  const extensionAmount = useCalculatePawnExtension(data, daysToExtend); // PAGO DE EXTENSIÓN DE DÍAS
  const loanAmount = formatPrice({ amount: data.loanAmount, locale: LOCALE }); // PRÉSTAMO DEL CLIENTE
  const paymentAmount = formatPrice({ amount: data.paymentAmount, locale: LOCALE }); // PAGO DE REFRENDO
  const totalPaymentAmount = formatPrice({ amount: data.totalPaymentAmount, locale: LOCALE }); // DESEMPEÑO (SOLO ES INFORMATIVO)
  const formattedExtensionAmount = formatPrice({ amount: extensionAmount, locale: LOCALE });

  const startDate = dayjs(data.startDate, 'YYYY-MM-DD').locale('es').format('DD MMMM YYYY');
  const dueDate = dayjs(data.dueDate, 'YYYY-MM-DD').locale('es').format('DD MMMM YYYY');

  let reason = '';
  const isPastLimitDueDays = data.dueDays > data.limitDueDays;
  const cannotBePaid = isPastLimitDueDays || data.accountBlocked || data.paymentPendingToApply;

  if (cannotBePaid) {
    if (isPastLimitDueDays || data.paymentPendingToApply) {
      reason =
        'Por el momento no es posible pagar, alguna de las razones son' +
        ' ya realizaste un refrendo o tu límite de días para pagar vencieron.' +
        ' Si tienes dudas comunícate con nosotros en este teléfono: 800 215 1515.';
    } else {
      reason = data.accountBlockedMessage;
    }
  }

  const buttonText = {
    idle: 'Pagar',
    loading: 'Pagar',
    searching: 'Calculando montos e intereses',
  };

  const statusStyles = {
    Activa: 'text-[#0BBF69]',
    Vencida: 'text-danger',
    Extraviada: 'text-danger',
    'Proceso comercial': 'text-danger',
  };

  const handleFormSubmit = async (values: FormValues) => {
    setStatus('loading');
    const { paymentType, paymentExtension } = values;

    try {
      let amount = 0;

      if (paymentType === 'REFRENDO') {
        amount = data.paymentAmount;
      } else if (paymentType === 'ABONO') {
        amount = extensionAmount;
      } else if (paymentType === 'OTRO-ABONO') {
        if (!values.paymentAmount) {
          throw new Error('Escribe una cantidad correcta para otro pago');
        }

        amount = Number(values.paymentAmount);
      }

      setStatus('idle');
      await onSubmit({ paymentType, paymentExtension, paymentAmount: amount });
    } catch (err) {
      setError((err as AxiosError).message);
      setStatus('idle');
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      initialValues={{
        paymentType: 'REFRENDO',
        paymentAmount: data.minPaymentAmount,
        paymentExtension: data.minDaysToPay,
      }}
      onValuesChange={(changedValues) => {
        if (changedValues?.paymentExtension) {
          const extension = Number(changedValues.paymentExtension);

          if (!Number.isNaN(extension) && extension >= data.minDaysToPay) {
            setDaysToExtend(extension);
          }
        }
      }}
    >
      <div className="px-4">
        <h1 className="text-2xl mb-4">Boleta de empeño</h1>
        <p>
          La consulta muestra la información al dia de hoy, selecciona el monto que desees pagar.
        </p>
      </div>
      <div className="py-6 sm:px-4">
        <div className="relative formContainer">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-sm text-secondary">Cliente:</p>
              <p className="text-primary font-semibold">{data.name}</p>
              <div className="mb-4">
                <div className="py-2 border-b border-b-[#0C5E9C26]">
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm text-secondary">Número boleta actual:</span>
                    <span className="text-primary font-semibold">{data.accountNumber}</span>
                  </div>
                </div>
                <div className="py-2 border-b border-b-[#0C5E9C26]">
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm text-secondary">Tipo de empeño:</span>
                    <span className="text-sm text-primary">{data.description}</span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm text-secondary">Fecha de empeño:</span>
                    <span className="text-sm text-primary">{startDate}</span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm text-secondary">Fecha de vencimiento:</span>
                    <span className="text-sm text-primary">{dueDate}</span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm text-secondary">Estado de boleta:</span>
                    <span className={cn('text-sm', statusStyles[data.status])}>{data.status}</span>
                  </div>
                  <div className="flex flex-row justify-between">
                    <span className="text-sm text-secondary">Saldo a favor:</span>
                    <span>{creditBalance}</span>
                  </div>
                </div>
                <div className="py-2 border-b border-b-[#0C5E9C26]">
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm text-secondary">Monto de préstamo:</span>
                    <span className="text-sm text-primary">{loanAmount}</span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm text-secondary">Pago de interés:</span>
                    <span className="text-sm text-primary font-semibold">{paymentAmount}</span>
                  </div>
                </div>
                <div className="py-2 border-b border-b-[#0C5E9C26]">
                  <div className="flex flex-row justify-between items-center">
                    <span className="text-sm text-secondary">Desempeño:</span>
                    <span className="text-sm text-primary">{totalPaymentAmount}</span>
                  </div>
                </div>
              </div>
            </div>
            {cannotBePaid ? (
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h2 className="text-lg mb-4">No es posible pagar esta boleta online</h2>
                  <p className="text-secondary text-sm mb-2">
                    Para pagar tu boleta por favor comunícate con una sucursal.
                  </p>
                  {reason && <p className="text-secondary text-sm">{reason}</p>}
                </div>
                <Button fullWidth href="/sucursales" text="Ver sucursales" />
              </div>
            ) : (
              <FormFeedback
                visible={error !== null}
                errorMessage={error as string}
                onDismiss={() => {
                  setError(null);
                }}
              >
                <div className="flex flex-col h-full">
                  <h2 className="text-lg mb-4">Selecciona el monto que desees pagar</h2>
                  <div className="flex-1">
                    <Form.Item name="paymentType">
                      <Radio.Group>
                        <span className="block my-2">
                          <Radio value="REFRENDO">
                            Pagar refrendo <strong>{paymentAmount}</strong>
                          </Radio>
                        </span>
                        <span className="block my-2">
                          <Radio value="ABONO">
                            Comprar días (mínimo {data.minDaysToPay}){' '}
                            <strong>{formattedExtensionAmount}</strong>
                            <div className="flex flex-row items-center space-x-3">
                              <Form.Item noStyle shouldUpdate>
                                {({ getFieldValue }) =>
                                  getFieldValue('paymentType') === 'ABONO' ? (
                                    <Form.Item
                                      name="paymentExtension"
                                      rules={[
                                        {
                                          required: true,
                                          validator: (_, value) => {
                                            const extension = Number(value);

                                            if (extension < data.minDaysToPay) {
                                              return Promise.reject(
                                                new Error(
                                                  `La cantidad mínima es de ${data.minDaysToPay}`,
                                                ),
                                              );
                                            }

                                            return Promise.resolve();
                                          },
                                        },
                                      ]}
                                    >
                                      <InputMask
                                        type="number"
                                        min={data.minDaysToPay}
                                        options={{
                                          numeral: true,
                                          numeralPositiveOnly: true,
                                          numeralDecimalScale: 0,
                                        }}
                                      />
                                    </Form.Item>
                                  ) : null
                                }
                              </Form.Item>
                            </div>
                          </Radio>
                        </span>
                        <span className="block my-2">
                          <Radio value="OTRO-ABONO">
                            <div>
                              <span>Abonar a interés (mínimo {`$${data.minPaymentAmount}`})</span>
                              <Form.Item noStyle shouldUpdate>
                                {({ getFieldValue }) =>
                                  getFieldValue('paymentType') === 'OTRO-ABONO' ? (
                                    <Form.Item
                                      name="paymentAmount"
                                      rules={[
                                        {
                                          required: true,
                                          validator: (_, value) => {
                                            const amount = Number(value);

                                            if (amount === NaN) {
                                              return Promise.reject(
                                                new Error('Escribe una cantidad válida'),
                                              );
                                            } else if (amount < data.minPaymentAmount) {
                                              return Promise.reject(
                                                new Error(
                                                  `La cantidad mínima es de $${data.minPaymentAmount}`,
                                                ),
                                              );
                                            } else if (amount > data.paymentAmount) {
                                              return Promise.reject(
                                                new Error(
                                                  `La cantidad máxima es de $${data.paymentAmount}`,
                                                ),
                                              );
                                            }

                                            return Promise.resolve();
                                          },
                                        },
                                      ]}
                                      getValueFromEvent={({ target }) => target.rawValue}
                                    >
                                      <InputMask
                                        options={{
                                          prefix: '$',
                                          numeral: true,
                                          numeralPositiveOnly: true,
                                          rawValueTrimPrefix: true,
                                        }}
                                      />
                                    </Form.Item>
                                  ) : null
                                }
                              </Form.Item>
                            </div>
                          </Radio>
                        </span>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <div>
                    <Button
                      fullWidth
                      theme="primary"
                      text={buttonText[status]}
                      loading={['loading', 'searching'].includes(status)}
                    />
                  </div>
                </div>
              </FormFeedback>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
};

export default PawnCalculateForm;
