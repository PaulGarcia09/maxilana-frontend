import Link from 'next/link';
import { Form } from 'antd';
import { FC, useEffect, useState } from 'react';

import { Logo } from '~/components/svg';
import { Button } from '~/components/ui';
import { CustomForm, InputField } from '~/components/common';
import { NextAPIMutator } from '~/modules/api/nextApiFetcher';
import useUser from '~/hooks/useUser';

type FormValues = {
  user: string;
  password: string;
};

type Status = 'idle' | 'successful' | 'error';
interface Props {
  onSuccess: () => void;
  changeLoginFlow: (newDirection: 'recoveryPassword') => void;
}

const LoginForm: FC<Props> = ({ onSuccess, changeLoginFlow }) => {
  const { mutateUser } = useUser();
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);

    try {
      const authUser = await NextAPIMutator({
        endpoint: '/api/login',
        method: 'POST',
        body: JSON.stringify(values),
      });

      mutateUser(authUser);
      setStatus('successful');
    } catch (err) {
      setLoading(false);
      throw err;
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!document.getElementById('/antd/form.css')) {
      const head = document.head;
      const link = document.createElement('link');

      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = '/antd/form.css';

      head.appendChild(link);
    }
  }, []);

  if (status === 'successful') {
    return (
      <div className="formContainer max-w-lg">
        <header className="text-center">
          <p className="h5 mb-4">¡Hecho!</p>
          <span className="text-secondary">Iniciaste sesión correctamente</span>
        </header>
        <div className="my-4 space-y-4">
          <Button fullWidth size="small" theme="primary" text="Ir a mi perfil" href="/perfil" />
          <Button
            fullWidth
            size="small"
            theme="secondary"
            text="Seguir navegando"
            onClick={onSuccess}
          />
        </div>
      </div>
    );
  }

  return (
    <CustomForm form={form} name="loginForm" className="w-96 max-w-sm" onSubmit={handleSubmit}>
      <>
        <header className="text-center">
          <span className="inline-flex">
            <Logo alt width={182} height={46} />
          </span>
        </header>
        <div className="px-4">
          <p className="text-center text-secondary my-6">Inicia sesión con tu email o celular</p>
          <div>
            <div className="grid gap-4">
              <Form.Item name="user" rules={[{ required: true }]}>
                <InputField label="Email o celular" placeholder="Ingresa número celular o email" />
              </Form.Item>
              <div className="flex flex-col relative">
                <Form.Item name="password" rules={[{ required: true }]}>
                  <InputField type="password" label="Contraseña" />
                </Form.Item>
                <div className="text-center text-sm absolute right-0">
                  <span
                    onClick={() => changeLoginFlow('recoveryPassword')}
                    className="text-[#1E83E1] cursor-pointer text-xs font-medium tracking-wider"
                  >
                    OLVIDÉ MI CONTRASEÑA
                  </span>
                </div>
              </div>
              <Button fullWidth theme="primary" loading={loading} text="Iniciar Sesión" />
            </div>
            <hr className="my-6" />
            <div className="text-center text-sm">
              <p>
                ¿No tienes cuenta?{' '}
                <Link href="/auth/registro">
                  <a className="text-link">Regístrate aquí</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    </CustomForm>
  );
};

export default LoginForm;
