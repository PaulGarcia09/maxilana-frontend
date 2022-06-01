import { Form } from 'antd';
import { FC, useState } from 'react';
import { CustomForm, InputField } from '~/components/common';
import { Logo } from '~/components/svg';
import { Button } from '~/components/ui';
import { RecoveryPasswordResponse } from '../LoginFlow/index';
import axios from '~/modules/api/axios';

type FormValues = {
  newPassword: string;
  repeatNewPassword: string;
};
interface Props {
  changeLoginFlow: (changeDirection: 'successOnRecoveryPasswordProcess' | 'verifyCode') => void;
  userData: RecoveryPasswordResponse | undefined;
}

const ChangePasswordForm: FC<Props> = ({ changeLoginFlow, userData }) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const userId = userData?.Usuario;
      let { newPassword } = values;
      const response = await axios.post('/usuarios/changepass', {
        usuario: userId,
        password: newPassword,
      });
      if (!response.response) {
        throw new Error('Lo sentimos, ha ocurrido un error');
      }
      changeLoginFlow('successOnRecoveryPasswordProcess');
    } catch (error) {
      throw error;
    } finally {
      form.resetFields();
      setLoading(false);
    }
  };

  return (
    <CustomForm
      form={form}
      name="changePasswordForm"
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
          <div className="text-center">
            <p className="text-center text-secondary"></p>
          </div>
          <div className="mt-6 grid gap-y-4">
            <Form.Item name="newPassword" rules={[{ required: true }]}>
              <InputField type="password" label="Escribe tu nueva contraseña" minLength={8} />
            </Form.Item>
            <Form.Item
              name="repeatNewPassword"
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                  },
                }),
              ]}
            >
              <InputField type="password" label="Escribela de nuevo" minLength={8} />
            </Form.Item>
            {loading && (
              <p className="text-center text-secondary -mt-5">Verificando si todo está bien...</p>
            )}
            <Button fullWidth theme="primary" loading={loading} text="Confirmar" />
            <div className="w-full text-center">
              <span
                className="text-[#2980de] cursor-pointer tracking-widest"
                onClick={() => changeLoginFlow('verifyCode')}
              >
                REGRESAR
              </span>
            </div>
          </div>
        </div>
      </>
    </CustomForm>
  );
};

export default ChangePasswordForm;
