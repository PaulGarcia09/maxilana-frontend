import { Form } from 'antd';
import { FC, useState } from 'react';
import { CustomForm, InputField } from '~/components/common';
import { Logo } from '~/components/svg';
import { Button } from '~/components/ui';
import { RecoveryPasswordResponse } from '../LoginFlow/index';
import axios from '~/modules/api/axios';

type FormValues = {
  cellphoneNumber: string;
};
interface Props {
  changeLoginFlow: (changeDirection: 'verifyCode' | 'login') => void;
  setUserData: (userData: RecoveryPasswordResponse | undefined) => void;
}

const RecoveryPasswordForm: FC<Props> = ({ changeLoginFlow, setUserData }) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    const userCellphoneNumber: number = Number(values.cellphoneNumber);
    try {
      // Primero cachamos algún error...
      if (!userCellphoneNumber) {
        throw new Error('Escribe un teléfono válido');
      }
      const response: RecoveryPasswordResponse = await axios.get(
        `/usuarios/obtenercodigorecuperacion?celular=${userCellphoneNumber}&email=`,
      );
      if (!response?.Usuario) {
        throw new Error(response?.mensaje ?? 'Ocurrió un error, inténtalo en otra ocasión');
      }
      // Si no hay errores entonces todo bien 👌🏽
      setUserData(response);
      changeLoginFlow('verifyCode');
    } catch (error) {
      throw error;
    } finally {
      // Esto se ejecuta cuando la Promise resuelve o se rechaza
      setLoading(false);
    }
  };

  return (
    <CustomForm
      form={form}
      name="recoveryPasswordForm"
      className="w-96 max-w-sm"
      onSubmit={handleSubmit}
    >
      <>
        <header className="text-center">
          <span className="inline-flex">
            <Logo alt width={182} height={46} />
          </span>
        </header>

        <div className="px-4">
          <div className="my-6 text-center">
            <h3 className="text-xl my-3">Recuperar contraseña</h3>
            <p className="text-center text-secondary">
              Las instrucciones de recuperación de contraseña serán enviadas al número de celular
              especificado en el registro.
            </p>
          </div>
          <div>
            <div className="grid gap-y-4">
              <Form.Item name="cellphoneNumber" rules={[{ required: true }]}>
                <InputField
                  label="Celular"
                  placeholder="Ingresa tu número de celular"
                  minLength={10}
                  maxLength={10}
                />
              </Form.Item>
              <Button fullWidth theme="primary" loading={loading} text="Envíar instrucciones" />
              <div className="w-full text-center">
                <span
                  className="text-[#2980de] cursor-pointer tracking-widest"
                  onClick={() => changeLoginFlow('login')}
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

export default RecoveryPasswordForm;
