import { Form } from 'antd';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { Logo } from '~/components/svg';
import { Button } from '~/components/ui';
import { InputField } from '~/components/common';
import { BareLayout, AuthFooter } from '~/components/layout';
import defaultValidateMessages from 'config/validationMessages';

export const getStaticProps: GetStaticProps<{ css: string[] }> = () => {
  return { props: { css: ['/antd/form.css'] } };
};

const LoginPage = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <BareLayout title="Iniciar Sesión" hasHeader={false}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <header className="flex items-center justify-center my-4">
          <Link href="/">
            <a className="inline-flex">
              <Logo alt width={182} height={46} />
            </a>
          </Link>
        </header>
        <div className="container mx-auto my-4 px-4 sm:max-w-lg">
          <h1 className="h5 text-center my-8">Inicia sesión con tu email o celular</h1>
          <Form
            form={form}
            name="loginForm"
            onFinish={handleSubmit}
            validateMessages={defaultValidateMessages}
            className="bg-white rounded border border-gray-200 p-6"
          >
            <div className="grid gap-4">
              <Form.Item name="user" rules={[{ required: true }]}>
                <InputField label="Email o celular" placeholder="Ingresa número celular o email" />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true }]}>
                <InputField type="password" label="Contraseña" />
              </Form.Item>
              <Button fullWidth theme="primary" text="Iniciar Sesión" />
            </div>
            <hr className="my-6" />
            <div className="text-center text-sm">
              <p>
                ¿No estás registrado?{' '}
                <Link href="/auth/registro">
                  <a className="text-link">Regístrate aquí</a>
                </Link>
              </p>
            </div>
          </Form>
        </div>
        <AuthFooter />
      </div>
    </BareLayout>
  );
};

export default LoginPage;
