import { FC, useState } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Form, Radio } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Button } from '../ui';
import { FormFeedback, InputField, InputMask } from '../common';
import defaultValidateMessages from 'config/validationMessages';
import { ServicePaymentRequest } from '~/types/Requests';

type Status = 'idle' | 'loading' | 'error';

type FormValues = ServicePaymentRequest;

interface PaymentData {
  concept: string;
  amount: number;
}

interface Props {
  title: string;
  description: string;
  data: PaymentData;
  onSubmit: (data: FormValues) => Promise<void>;
}

dayjs.extend(customParseFormat);

const PaymentForm: FC<Props> = ({ data, title, description, onSubmit }) => {
  const [form] = Form.useForm<FormValues>();
  const [status, setStatus] = useState<Status>('idle');

  const handleFormSubmit = async (values: FormValues) => {
    setStatus('loading');

    try {
      setStatus('idle');
      await onSubmit(values);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      validateMessages={defaultValidateMessages}
      initialValues={{
        importe: data.amount,
        concepto: data.concept,
      }}
    >
      <div className="px-4">
        <h1 className="text-2xl mb-4">{title}</h1>
        <p>{description}</p>
      </div>
      <div className="py-6 sm:px-4">
        <div className="formContainer">
          <FormFeedback
            visible={status === 'error'}
            errorMessage="Ocurrió un error al procesar el pago, por favor comunícate con una sucursal."
            onDismiss={() => {
              setStatus('idle');
            }}
          >
            <div>
              <h5 className="text-lg mb-6">Información de pago</h5>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <Form.Item name="concepto">
                    <InputField disabled label="Concepto" />
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item name="importe">
                    <InputField disabled label="Importe a pagar" />
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item name="cardtype" label="Tipo de tarjeta" rules={[{ required: true }]}>
                    <Radio.Group className="flex flex-row">
                      <Radio value="VISA">
                        <span>VISA</span>
                      </Radio>
                      <Radio value="MC">
                        <span>MASTERCARD</span>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item name="titular" rules={[{ required: true }]}>
                    <InputField
                      label="Titular de la tarjeta"
                      placeholder="Nombre del titular de la tarjeta"
                    />
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item
                    name="tarjeta"
                    rules={[{ required: true }]}
                    getValueFromEvent={({ target }) => target.rawValue}
                  >
                    <InputMask
                      label="Número de la tarjeta"
                      placeholder="#### #### #### ####"
                      options={{
                        creditCard: true,
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    name="vencimiento"
                    rules={[
                      {
                        required: true,
                        validator: (_, value) => {
                          const dt = dayjs(value, 'MM/YY');
                          const isFuture = dt.isAfter(dayjs());

                          if (dt.isValid() && isFuture) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error('Fecha inválida'));
                        },
                      },
                    ]}
                  >
                    <InputMask
                      label="Fecha de vencimiento"
                      placeholder="MM/AA"
                      maxLength={5}
                      options={{
                        date: true,
                        datePattern: ['m', 'Y'],
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item name="ccv" rules={[{ required: true }]}>
                    <InputMask
                      type="password"
                      label="Cod. de seguridad"
                      placeholder="###"
                      maxLength={3}
                      options={{
                        numericOnly: true,
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item name="correoelectronico" rules={[{ required: true }]}>
                    <InputField type="email" label="Correo Electrónico" />
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Button
                    fullWidth
                    text="Realizar Pago"
                    theme="primary"
                    loading={status === 'loading'}
                  />
                </div>
              </div>
              <div className="mt-4">
                <small className="text-xs text-center block">
                  Al hacer click en &quot;Realizar Pago&quot; aceptas los{' '}
                  <Link href="/legal/terminos-condiciones">
                    <a className="text-price underline">TÉRMINOS Y CONDICIONES</a>
                  </Link>
                </small>
              </div>
            </div>
          </FormFeedback>
        </div>
      </div>
    </Form>
  );
};

export default PaymentForm;
