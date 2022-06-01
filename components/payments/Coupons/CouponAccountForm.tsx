import { Form } from 'antd';
import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';

import { Button } from '~/components/ui';
import { FormFeedback, InputField } from '~/components/common';

import defaultValidateMessages from 'config/validationMessages';

type FormValues = {
  numdistribuidor: string;
  contrasena: string;
};

interface Props {
  onSubmit: (data: FormValues) => Promise<void>;
}

const CouponAccountForm: FC<Props> = ({ onSubmit }) => {
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
            <>
              <div className="mb-6">
                <h2 className="text-lg mb-4">Consulta el estado de cuenta a la quincena actual</h2>
                <p>Ingresa los datos de tu distribuidor</p>
              </div>
              <div className="grid gap-4">
                <Form.Item name="numdistribuidor">
                  <InputField type="number" label="Número de distribuidor" />
                </Form.Item>
                <Form.Item name="contrasena">
                  <InputField type="password" label="Contraseña" />
                </Form.Item>
                <div>
                  <Button
                    fullWidth
                    theme="primary"
                    loading={loading}
                    text={loading ? 'Buscando' : 'Buscar'}
                  />
                </div>
              </div>
            </>
          </FormFeedback>
        </div>
      </div>
    </Form>
  );
};

export default CouponAccountForm;
