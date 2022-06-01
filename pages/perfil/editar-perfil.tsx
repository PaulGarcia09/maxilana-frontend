import { Form } from 'antd';
import { NextPage } from 'next';

import { Layout } from '~/components/layout';
import { Breadcrumbs, Button } from '~/components/ui';
import { CustomForm, InputField } from '~/components/common';
import { AuthPageProps } from '~/types/AuthPageProps';
import { NextAPIMutator } from '~/modules/api/nextApiFetcher';
import { useState } from 'react';

export { default as getServerSideProps } from '~/utils/authGetServerSideProps';

type FormValues = {
  Nombre: string;
  Apellidop: string;
  Apellidom: string;
  Celular: string;
  Correo: string;
  Contrasena?: string;
  ContrasenaNueva?: string;
};

const EditProfilePage: NextPage<AuthPageProps> = ({ cities = [], legalPages = [], user }) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    const { Contrasena, ContrasenaNueva, ...rest } = values;
    let params = null;

    try {
      if (ContrasenaNueva) {
        params = {
          ...rest,
          Contrasena: ContrasenaNueva,
        };
      } else {
        params = { ...rest };
      }

      await NextAPIMutator({
        endpoint: '/api/edit-user',
        method: 'POST',
        body: JSON.stringify(params),
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return (
    <Layout cities={cities} title="Editar tu perfil" legalPages={legalPages}>
      <section className="max-w-2xl mx-auto py-4 sm:px-4 sm:py-8">
        <div className="px-4 sm:px-0">
          <Breadcrumbs
            links={[
              { label: 'Perfil', href: '/perfil' },
              { label: 'Editar perfil', href: '/perfil/editar-perfil' },
            ]}
          />
        </div>
        <CustomForm
          form={form}
          name="profileForm"
          onSubmit={handleSubmit}
          initialValues={{
            Nombre: user.name,
            Apellidop: user.lastname,
            Apellidom: user.surname,
            Celular: user?.cellphone ?? '',
            Correo: user?.email ?? '',
          }}
        >
          <>
            <h1 className="h6">Editar perfil</h1>
            <div className="grid gap-4 mt-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Form.Item name="Nombre">
                  <InputField label="Nombre completo" />
                </Form.Item>
              </div>
              <Form.Item name="Apellidop">
                <InputField label="Apellido materno" />
              </Form.Item>
              <Form.Item name="Apellidom">
                <InputField label="Apellido materno" />
              </Form.Item>
              <Form.Item name="Celular">
                <InputField type="tel" label="Celular" maxLength={10} />
              </Form.Item>
              <Form.Item name="Correo">
                <InputField label="Correo electrónico" />
              </Form.Item>
              <div className="sm:col-span-2">
                <h2 className="heading capitalize">Cambiar contraseña</h2>
              </div>
              <div className="sm:col-span-2">
                <Form.Item
                  name="Contrasena"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value && !getFieldValue('ContrasenaNueva')) {
                          return Promise.reject(
                            'Para cambiar tu contraseña, llena todos los campos.',
                          );
                        }

                        if (getFieldValue('ContrasenaNueva') && !value) {
                          return Promise.reject('Ingresa tu contraseña actual');
                        }

                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <InputField type="password" label="Contraseña actual" />
                </Form.Item>
              </div>
              <Form.Item name="ContrasenaNueva">
                <InputField type="password" label="Contraseña nueva" />
              </Form.Item>
              <Form.Item
                name="ConfirmarContrasena"
                dependencies={['ContrasenaNueva']}
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('ContrasenaNueva') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('Las nuevas contraseñas no coinciden.'));
                    },
                  }),
                ]}
              >
                <InputField type="password" label="Confirmar contraseña nueva" />
              </Form.Item>
              <div className="sm:col-span-2">
                <Button
                  fullWidth
                  theme="primary"
                  disabled={loading}
                  text={loading ? 'Guardando' : 'Guardar'}
                />
              </div>
            </div>
          </>
        </CustomForm>
      </section>
    </Layout>
  );
};

export default EditProfilePage;
