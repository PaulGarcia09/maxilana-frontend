import { Form } from 'antd';
import { AxiosError } from 'axios';
import React, { FC, useEffect, useState } from 'react';

import { Button } from '~/components/ui';
import { FormFeedback, InputField, InputMask } from '~/components/common';

import defaultValidateMessages from 'config/validationMessages';

type FormValues = {
  codigoprestamo: string;
  prestamo: number;
};

interface Props {
  onSubmit: (data: FormValues) => Promise<void>;
}

const LoanAccountForm: FC<Props> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      await onSubmit(data);
    } catch (err) {
      setError((err as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} onFinish={handleFormSubmit} validateMessages={defaultValidateMessages}>
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
              form.resetFields();
              setError(null);
            }}
          >
            <React.Fragment>
              <div className="mb-6">
                <h2 className="text-lg mb-4">
                  Consulta el estado de cuenta de tu préstamo personal
                </h2>
                <p>Ingresa los datos de tu préstamo</p>
              </div>
              <div className="grid gap-4">
                <div>
                  <Form.Item name="codigoprestamo" rules={[{ required: true }]}>
                    <InputField label="Número de préstamo" placeholder="##-######" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    name="prestamo"
                    rules={[{ required: true }]}
                    getValueFromEvent={({ target }) => target.rawValue} // rawValue viene de Cleave.js
                  >
                    <InputMask
                      label="Importe del préstamo"
                      options={{
                        prefix: '$',
                        numeral: true,
                        numeralPositiveOnly: true,
                        rawValueTrimPrefix: true,
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Button
                    fullWidth
                    theme="primary"
                    loading={loading}
                    text={loading ? 'Buscando...' : 'Buscar'}
                  />
                </div>
              </div>
            </React.Fragment>
          </FormFeedback>
        </div>
      </div>
    </Form>
  );
};

export default LoanAccountForm;
