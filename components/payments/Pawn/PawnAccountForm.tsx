import { Form } from 'antd';
import Image from 'next/image';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';

import { Button } from '~/components/ui';
import { FormFeedback, InputField, InputMask } from '~/components/common';

import validationMessages from '../../../config/validationMessages';
import useUser from 'hooks/useUser';

type FormValues = {
  boleta: string;
  letra: string;
  monto: number;
};

interface Props {
  onSubmit: (data: FormValues) => Promise<void>;
}

const PawnAccountForm: FC<Props> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user?.isLoggedIn) {
      router.push('/perfil');
    }
    return () => {
      setLoading(false);
    };
  }, [user]);

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
    <Form form={form} onFinish={handleFormSubmit} validateMessages={validationMessages}>
      <div className="px-4">
        <h1 className="text-2xl mb-4">Boleta de empeño</h1>
        <p>
          No pierdas tu artículo y paga tu refrendo. Consulta aquí el estado de cuenta de tu boleta
          de empeño, y controla mejor tus gastos.
        </p>
      </div>
      <div className="py-6 sm:px-4">
        <div className="flex flex-col gap-6 items-center md:flex-row lg:flex-col xl:flex-row">
          <div>
            <Image
              width={328}
              height={139}
              layout="fixed"
              src="/imagen-boleta.jpg"
              alt="Imagen muestra de boleta de empeño"
            />
          </div>
          <div className="formContainer">
            <FormFeedback
              visible={error !== null}
              errorMessage={error as string}
              onDismiss={() => {
                setError(null);
              }}
            >
              <React.Fragment>
                <div className="mb-6">
                  <h2 className="text-lg mb-4">Consulta el estado de cuenta de tu boleta</h2>
                  <p>Ingresa los datos que vienen escritos en tu boleta</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="col-span-2">
                    <Form.Item name="boleta" rules={[{ required: true }]}>
                      <InputField maxLength={6} label="Número de boleta" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="letra" rules={[{ required: true }]}>
                      <InputField label="Letra" maxLength={3} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      name="monto"
                      getValueFromEvent={({ target }) => target.rawValue} // rawValue viene de Cleave.js
                      rules={[{ required: true }]}
                    >
                      <InputMask
                        placeholder="$0.00"
                        label="Monto del préstamo"
                        options={{
                          prefix: '$',
                          numeral: true,
                          numeralPositiveOnly: true,
                          rawValueTrimPrefix: true,
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-span-2">
                    <Button
                      fullWidth
                      theme="primary"
                      loading={loading}
                      text={loading ? 'Consultando' : 'Consultar'}
                    />
                  </div>
                </div>
              </React.Fragment>
            </FormFeedback>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default PawnAccountForm;
