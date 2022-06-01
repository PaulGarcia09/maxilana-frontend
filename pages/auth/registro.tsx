import { Form } from 'antd';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';

import { Logo } from '~/components/svg';
import { Button } from '~/components/ui';
import { AuthFooter, BareLayout } from '~/components/layout';
import { CustomForm, InputField, InputMask, InputCode } from '~/components/common';
import { SignupRequest } from '~/types/Requests';
import { NextAPIMutator } from '~/modules/api/nextApiFetcher';
import { User } from '~/types/Models';
import { useRouter } from 'next/router';
import axios from '~/modules/api/axios';
import { validatePhone } from '~/modules/api/auth';

type FormValues = {
  ConfirmaContrasena: string;
} & SignupRequest;

type Status = 'idle' | 'verificate_code' | 'error';

export const getStaticProps: GetStaticProps<{ css: string[] }> = () => {
  return { props: { css: ['/antd/form.css'] } };
};

const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [verificationForm] = Form.useForm();
  const [signupForm] = Form.useForm<FormValues>();
  const [status, setStatus] = useState<Status>('idle');

  // Verificación de que el celular es correcto
  //  se guardan los datos de registro y el código
  //  el chequeo se hace desde el cliente.
  const handleSignup = async (values: FormValues) => {
    setLoading(true);
    try {
      if (!Number(values.Celular)) {
        throw new Error('Escribe un número de teléfono válido');
      }

      await validatePhone({ celular: values.Celular });
      setStatus('verificate_code');
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Una vez que se verifica correctamente el celular
  //  procedemos a registrar al usuario.
  const handleVerification = async (values: { code: string; Celular: string }) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `/usuarios/Validarcodigo/Alta?user=${values.Celular}&codigo=${values.code}`,
      );
      if (!response?.result) {
        throw new Error('El código de verificación es incorrecto.');
      }

      const { Nombre, Apellidom, Apellidop, Correo, Contrasena, Celular } =
        signupForm.getFieldsValue(true);
      const params = {
        Nombre,
        Apellidom,
        Apellidop,
        Correo,
        Contrasena,
        Celular,
      };

      // Registro -> Login -> Redirección
      const user: User = await NextAPIMutator({
        endpoint: '/api/signup',
        method: 'POST',
        body: JSON.stringify(params),
      });
      if (user?.userCode) {
        router?.push('/');
      }
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BareLayout title="Registro" hasHeader={false}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <header className="flex items-center justify-center my-4">
          <Link href="/">
            <a className="inline-flex">
              <Logo alt width={182} height={46} />
            </a>
          </Link>
        </header>
        {(() => {
          if (status === 'verificate_code') {
            return (
              <div className="container mx-auto my-4 px-4 sm:max-w-xl">
                <h1 className="h5 text-center my-8">¡Ya casi! Estás a un paso</h1>
                <CustomForm
                  form={verificationForm}
                  name="codeVerificationForm"
                  onSubmit={handleVerification}
                >
                  <fieldset className="mb-4">
                    <label className="block text-center text-sm text-[#000] border-b-0 mb-4">
                      Código de verificación
                    </label>
                    <Form.Item
                      name="code"
                      className="text-center"
                      trigger="onComplete"
                      rules={[{ required: true }]}
                    >
                      <InputCode length={4} loading={loading} />
                    </Form.Item>
                  </fieldset>
                  <div className="my-2">
                    <Button fullWidth theme="primary" text="Verificar código" loading={loading} />
                  </div>
                  <div className="text-center text-sm">
                    <p>
                      Se ha enviado un mensaje con un código de verificación a tu celular. Introduce
                      el código para continuar.
                    </p>
                  </div>
                </CustomForm>
              </div>
            );
          }

          return (
            <div className="container mx-auto my-4 px-4 sm:max-w-xl">
              <h1 className="h5 text-center my-8">
                Regístrate y empieza a obtener beneficios de Maxilana
              </h1>
              <CustomForm form={signupForm} name="signupForm" onSubmit={handleSignup}>
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Form.Item name="Nombre" className="sm:col-span-2" rules={[{ required: true }]}>
                      <InputField label="Nombre" />
                    </Form.Item>
                    <Form.Item name="Apellidop" rules={[{ required: true }]}>
                      <InputField label="Apellido paterno" />
                    </Form.Item>
                    <Form.Item name="Apellidom" rules={[{ required: true }]}>
                      <InputField label="Apellido materno" />
                    </Form.Item>
                    <Form.Item name="Celular" rules={[{ required: true }]}>
                      <InputField label="Número celular" minLength={10} maxLength={10} />
                    </Form.Item>
                    <Form.Item name="Correo" rules={[{ required: true }]}>
                      <InputField type="email" label="Correo electrónico" />
                    </Form.Item>
                    <Form.Item name="Contrasena" rules={[{ required: true }]}>
                      <InputField minLength={8} type="password" label="Contraseña" />
                    </Form.Item>
                    <Form.Item
                      name="ConfirmaContrasena"
                      rules={[
                        { required: true },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('Contrasena') === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('Las contraseñas no coinciden'));
                          },
                        }),
                      ]}
                    >
                      <InputField minLength={8} type="password" label="Confirmar contraseña" />
                    </Form.Item>
                    <div className="sm:col-span-2">
                      <Button fullWidth theme="primary" text="Regístrate" loading={loading} />
                    </div>
                  </div>
                  <hr className="my-6" />
                  <div className="text-center text-sm">
                    <p>
                      Al registrarte aceptas el{' '}
                      <Link href="/legal/aviso-de-privacidad">
                        <a className="text-link">Aviso de privacidad</a>
                      </Link>{' '}
                      y los{' '}
                      <Link href="/legal/terminos-y-condiciones">
                        <a className="text-link">Términos y condiciones</a>
                      </Link>
                    </p>
                  </div>
                </>
              </CustomForm>
            </div>
          );
        })()}
        <AuthFooter />
      </div>
    </BareLayout>
  );
};

export default SignupPage;
