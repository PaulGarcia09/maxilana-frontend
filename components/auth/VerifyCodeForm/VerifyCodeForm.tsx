import { Form } from 'antd';
import { FC, useState } from 'react';
import { CustomForm, InputCode } from '~/components/common';
import { Logo } from '~/components/svg';
import { Button } from '~/components/ui';
import axios from '~/modules/api/axios';
import { RecoveryPasswordResponse } from '../LoginFlow/index';

type FormValues = {
  verifyCode: string;
};

interface Props {
  changeLoginFlow: (changeDirection: 'newPassword' | 'recoveryPassword') => void;
  userData: RecoveryPasswordResponse | undefined;
}

const VerifyCodeForm: FC<Props> = ({ changeLoginFlow, userData }) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const userId = userData?.Usuario;
      const userCode = values.verifyCode;
      const response = await axios.get(
        `/usuarios/Validarcodigo/Recuperar?user=${userId}&codigo=${userCode}`,
      );
      // Cachar algún error
      if (!response?.result) {
        throw new Error('Código incorrecto, intenta de nuevo.');
      }
      // Si todo está bien
      changeLoginFlow('newPassword');
    } catch (error) {
      throw error;
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  return (
    <CustomForm form={form} name="verifyCodeForm" className="w-96 max-w-sm" onSubmit={handleSubmit}>
      <>
        <header className="text-center">
          <span className="inline-flex">
            <Logo alt width={182} height={46} />
          </span>
        </header>

        <div className="px-4">
          <div className="my-6 text-center">
            <h3 className="text-xl my-3">¡Ya casi! Estás a un paso</h3>
          </div>
          <div>
            <div className="grid gap-y-4 justify-center">
              <Form.Item name="verifyCode" rules={[{ required: true }]} trigger="onComplete">
                <InputCode length={4} loading={loading} />
              </Form.Item>
              <div className="mb-6 text-center">
                <p className="text-center text-secondary">
                  Se ha enviado un mensaje con un código de verificación al número de celular.
                  Introduce el código para continuar.
                </p>
              </div>
              <Button fullWidth theme="primary" loading={loading} text="Confirmar" />
              <div className="w-full text-center">
                <span
                  className="text-[#2980de] cursor-pointer tracking-widest"
                  onClick={() => changeLoginFlow('recoveryPassword')}
                >
                  REGRESAR
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    </CustomForm>
  );
};

export default VerifyCodeForm;
