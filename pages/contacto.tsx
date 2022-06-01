import ms from 'ms';
import Link from 'next/link';
import { Form } from 'antd';
import { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { PhoneFilled, QuestionCircleFilled, ShopFilled } from '@ant-design/icons';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getAllCities from '~/api/getAllCities';

import { Button } from '~/components/ui';
import { Container, Layout } from '~/components/layout';
import { DefaultPageProps } from '~/types/DefaultPageProps';
import { FormFeedback, InputField, SelectField, SocialMenu } from '~/components/common';
import defaultValidateMessages from 'config/validationMessages';
import { City, CMSLegal } from '~/types/Models';
import { Contact } from '~/types/Requests';
import sendContact from '~/api/sendContact';

type FormValues = Contact;
type Status = 'idle' | 'loading' | 'submitted';

export const defaultGetStaticProps: GetStaticProps<{
  cities: City[];
  legalPages: CMSLegal[];
}> = async () => {
  const [cities, legalPages] = await Promise.all([getAllCities(), getAllLegalPages()]);

  return {
    props: {
      cities,
      legalPages,
      props: { css: ['/antd/form.css'] },
    },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '10m'),
  };
};

const ContactPage: NextPage<DefaultPageProps> = ({ cities, legalPages }) => {
  const [form] = Form.useForm<FormValues>();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: FormValues) => {
    setStatus('loading');

    try {
      await sendContact(data);
      setStatus('submitted');
    } catch (err) {
      setError((err as AxiosError).message);
      setStatus('idle');
    }
  };

  return (
    <Layout cities={cities} title="Contáctanos" legalPages={legalPages}>
      <Container>
        <div className="grid gap-10 my-12 sm:my-24 lg:grid-flow-col">
          <div className="lg:max-w-md">
            <div className="space-y-2">
              <h1 className="text-2xl">Estamos para ayudarte</h1>
              <p className="text-secondary">
                Nos encantaría escuchar lo que tienes qué decir. También puedes consultar las{' '}
                <Link href="/preguntas-frecuentes">
                  <a className="text-price underline">preguntas frecuentes</a>
                </Link>
              </p>
            </div>
          </div>
          <div>
            <div className="bg-white rounded overflow-hidden">
              <div className="grid sm:grid-cols-2">
                <div className="p-6">
                  {status !== 'submitted' ? (
                    <Form
                      form={form}
                      onFinish={handleFormSubmit}
                      validateMessages={defaultValidateMessages}
                    >
                      <FormFeedback
                        visible={error !== null}
                        errorMessage={error as string}
                        onDismiss={() => {
                          setError(null);
                        }}
                      >
                        <h2 className="text-xl">Tu opinión es importante para nosotros</h2>
                        <div className="grid gap-4 grid-cols-2 my-4">
                          <div className="col-span-2">
                            <Form.Item name="tema" rules={[{ required: true }]}>
                              <SelectField
                                name="tema"
                                label="Tema"
                                placeholder="Elige un tema"
                                options={[
                                  { label: 'Información', value: 'Información' },
                                  { label: 'Recursos Humanos', value: 'Recursos Humanos' },
                                  { label: 'Empeño', value: 'Empeño' },
                                  { label: 'Préstamos', value: 'Préstamos' },
                                  { label: 'Vales', value: 'Vales' },
                                ]}
                              />
                            </Form.Item>
                          </div>
                          <div className="col-span-2">
                            <Form.Item name="nombre" rules={[{ required: true }]}>
                              <InputField label="Nombre" />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item name="email" rules={[{ required: true }]}>
                              <InputField type="email" label="Correo Electrónico" />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item name="ciudad">
                              <InputField label="Ciudad" />
                            </Form.Item>
                          </div>
                          <div className="col-span-2">
                            <Form.Item name="asunto">
                              <InputField label="Asunto" />
                            </Form.Item>
                          </div>
                          <div className="col-span-2">
                            <Form.Item name="mensaje" rules={[{ required: true }]}>
                              <InputField label="Mensaje" />
                            </Form.Item>
                          </div>
                          <div className="col-span-2">
                            <Button
                              fullWidth
                              theme="secondary"
                              text="Enviar"
                              loading={status === 'loading'}
                            />
                          </div>
                        </div>
                      </FormFeedback>
                    </Form>
                  ) : (
                    <div>
                      <h2 className="text-xl mb-4">¡Gracias por contactarnos!</h2>
                      <p>
                        Enviaremos tu solicitud al área correspondiente y en breve nos comunicaremos
                        contigo.
                      </p>
                    </div>
                  )}
                </div>
                <div className="bg-gradient-to-br from-[#1E83E1] to-[#1362AB] p-6">
                  <div className="flex flex-col justify-center h-full text-white">
                    <div className="space-y-3">
                      <h2 className="text-xl text-white">Información de contacto</h2>
                      <p className="text-white">
                        Para cualquier duda o aclaración, por favor comunícate con nosotros a través
                        del los siguientes medios:
                      </p>
                    </div>
                    <div className="flex-grow my-10">
                      <ul className="list-none space-y-6">
                        <li className="flex flex-row space-x-2 items-center uppercase text-xs">
                          <PhoneFilled style={{ fontSize: 20, color: '#FEC200' }} />
                          <a href="tel:800215515">800 215 1515</a>
                        </li>
                        <li className="flex flex-row space-x-2 items-center uppercase text-xs">
                          <ShopFilled style={{ fontSize: 20, color: '#FEC200' }} />
                          <Link href="/sucursales">
                            <a>Buscar Sucursales</a>
                          </Link>
                        </li>
                        <li className="flex flex-row space-x-2 items-center uppercase text-xs">
                          <QuestionCircleFilled style={{ fontSize: 20, color: '#FEC200' }} />
                          <Link href="/preguntas-frecuentes">
                            <a>Ver preguntas frecuentes</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="text-center">
                      <SocialMenu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default ContactPage;
