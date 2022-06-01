import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { Form, Radio } from 'antd';

import { Button } from '~/components/ui';
import { FormFeedback, InputMask } from '~/components/common';

import { LoanAccount } from '~/types/Models';
import { usePrice } from '~/modules/hooks';

type FormValues = {
  fixedAmount: number;
  customAmount?: number;
};

interface Props {
  account: LoanAccount;
  onSubmit: (data: number) => Promise<void>;
}

const LoanSelectionPaymentForm: FC<Props> = ({ account, onSubmit }) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { price: settleAmount } = usePrice({ amount: account.settlePayment });
  const { price: minimumAmount } = usePrice({ amount: account.minPayment });

  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);
    const { fixedAmount, customAmount } = data;

    try {
      let amount = fixedAmount;

      if (fixedAmount === -1 && !customAmount) {
        throw new Error('Escribe una cantidad correcta para otro pago');
      } else if (fixedAmount === -1) {
        amount = customAmount as number;
      }

      await onSubmit(amount);
    } catch (err) {
      setError((err as AxiosError).message);
    }

    setLoading(false);
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      initialValues={{
        fixedAmount: account.minPayment,
      }}
    >
      <div className="px-4">
        <h1 className="text-2xl mb-4">Préstamos personales</h1>
        <p>Abona a tu préstamo personal en línea</p>
      </div>
      <div className="py-6 sm:px-4">
        <div className="formContainer">
          <FormFeedback
            visible={error !== null}
            errorMessage={error as string}
            onDismiss={() => {
              setError(null);
            }}
          >
            <div>
              <p className="text-sm text-secondary">Cliente:</p>
              <p className="text-primary font-semibold">{account.clientName}</p>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-secondary">
                    Seleccione una opción de abono a su préstamo, en caso de seleccionar “Otro
                    importe” habrá de capturar el importe en el recuadro.
                  </p>
                </div>
                <div>
                  <p className="text-primary font-semibold mb-4">
                    ¿Qué desea hacer con su préstamo?
                  </p>
                  <Form.Item name="fixedAmount">
                    <Radio.Group>
                      <span className="block my-2">
                        <Radio value={account.minPayment}>
                          <strong>{minimumAmount}</strong> de abono, tiene hasta el{' '}
                          {account.dueDate}
                        </Radio>
                      </span>
                      <span className="block my-2">
                        <Radio value={account.settlePayment}>
                          <strong>{settleAmount}</strong> para liquidar a día de hoy
                        </Radio>
                      </span>
                      <span className="block my-2">
                        <Radio value={-1}>
                          <div className="flex flex-row items-center space-x-3">
                            <span>Otro importe</span>
                            <Form.Item noStyle shouldUpdate>
                              {({ getFieldValue }) =>
                                getFieldValue('fixedAmount') === -1 ? (
                                  <Form.Item
                                    name="customAmount"
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Campo requerido',
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
                <Button fullWidth theme="primary" text="Proceder al pago" loading={loading} />
              </div>
            </div>
          </FormFeedback>
        </div>
      </div>
    </Form>
  );
};

export default LoanSelectionPaymentForm;
