import { Form } from 'antd';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { Logo } from '~/components/svg';
import { InputCode } from '~/components/common';
import { AuthFooter, BareLayout } from '~/components/layout';
import defaultValidateMessages from 'config/validationMessages';

type Status = 'idle' | 'loading' | 'error';
export const getStaticProps: GetStaticProps<{ css: string[] }> = () => {
  return { props: { css: ['/antd/form.css'] } };
};

const CodeVerificationPage = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = (values: any) => {
    setStatus('loading');

    setTimeout(() => {
      console.log(values);
      setStatus('idle');
    }, 3000);
  };

  return (
    <BareLayout title="Código de verificación" hasHeader={false}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <header className="flex items-center justify-center my-4">
          <Link href="/">
            <a className="inline-flex">
              <Logo alt width={182} height={46} />
            </a>
          </Link>
        </header>
        <div className="container mx-auto my-4 px-4 sm:max-w-lg">
          <h1 className="h5 text-center my-8">¡Ya casi! Estás a un paso</h1>
          <Form
            form={form}
            name="codeVerificationForm"
            validateMessages={defaultValidateMessages}
            className="bg-white rounded border border-gray-200 p-6"
            onValuesChange={(changedValues) => {
              handleSubmit(changedValues);
            }}
          >
            <fieldset className="mb-4">
              <label className="block text-center text-sm text-[#000] border-b-0 mb-4">
                Código de verificación
              </label>
              <Form.Item name="verificationCode" className="text-center" trigger="onComplete">
                <InputCode length={4} loading={status === 'loading'} />
              </Form.Item>
            </fieldset>
            <div className="text-center text-sm">
              <p>
                Se ha enviado un mensaje con un código de verificación a tu celular. Introduce el
                código para continuar.
              </p>
            </div>
          </Form>
        </div>
        <AuthFooter />
      </div>
    </BareLayout>
  );
};

export default CodeVerificationPage;
