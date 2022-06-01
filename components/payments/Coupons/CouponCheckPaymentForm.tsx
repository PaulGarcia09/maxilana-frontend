import { FC, useState } from 'react';
import { Form, Radio } from 'antd';
import { AxiosError } from 'axios';

import { Button } from '~/components/ui';
import { FormFeedback, InputMask } from '~/components/common';
import { usePrice } from '~/modules/hooks';

import { CouponAccount } from '~/types/Models';

type FormValues = {
  fixedAmount: number;
  customAmount?: number;
};

interface Props {
  account: CouponAccount;
  onSubmit: (data: number) => Promise<void>;
}

const CouponCheckPaymentForm: FC<Props> = ({ account, onSubmit }) => {
  const [form] = Form.useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { price: paymentAmount } = usePrice({ amount: account.amount });

  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);
    const { fixedAmount, customAmount } = data;

    try {
      let amount = fixedAmount;

      if (fixedAmount === -1 && !customAmount) {
        throw new Error('Escribe una cantidad correcta para otro pago');
      } else if (fixedAmount === -1) {
        amount = Number(customAmount);
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
        fixedAmount: account.amount,
      }}
    >
      <div className="px-4">
        <h1 className="text-2xl mb-4">Maxilana Vales</h1>
        <p>Paga directamente a tu distribuidora</p>
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
              <p className="text-sm text-secondary">Distribuidor:</p>
              <p className="text-primary font-semibold">{account.clientName}</p>
              <div className="grid gap-4">
                <div>
                  <p className="text-sm text-secondary">
                    El importe que se muestra acontinuación es para la quincena{' '}
                    <span className="text-primary font-semibold">{account.currentDate}</span>
                  </p>
                </div>
                <Form.Item name="fixedAmount" rules={[{ required: true }]}>
                  <Radio.Group>
                    <span className="block my-2">
                      <Radio value={account.amount} defaultChecked>
                        <span>
                          Pagar <strong>{paymentAmount}</strong>
                        </span>
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
                <Button fullWidth theme="primary" loading={loading} text="Pagar abono" />
              </div>
            </div>
          </FormFeedback>
        </div>
      </div>
    </Form>
  );
};

export default CouponCheckPaymentForm;
