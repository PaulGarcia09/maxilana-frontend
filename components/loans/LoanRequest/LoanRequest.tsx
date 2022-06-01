import cn from 'classnames';
import { Form } from 'antd';
import { FC, useState } from 'react';
import { WhatsAppOutlined, LoadingOutlined } from '@ant-design/icons';

import { Button } from '~/components/ui';
import { FormFeedback, InputField } from '~/components/common';

import styles from '../LoanCalculator/LoanCalculator.module.css';
import defaultValidateMessages from 'config/validationMessages';
import { AxiosError } from 'axios';

export type FormValues = {
  Nombre: string;
  CorreoElectronico: string;
  Telefono: string;
};

interface Props {
  onSubmit: (data: FormValues) => Promise<any>;
  onWhatsapp: (data: FormValues) => Promise<any>;
}

const LoanRequest: FC<Props> = ({ onSubmit, onWhatsapp }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const catchError = (ex: Error) => {
    const err = ex as AxiosError;

    if (err.response) {
      setError(err.message);
    } else if (err.request) {
      setError('Ocurrió un error al solicitar la petición, por favor inténtalo en otra ocasión');
    } else {
      setError('Ocurrió un error desconocido, inténtalo más tarde.');
    }
  };

  return (
    <Form form={form} validateMessages={defaultValidateMessages}>
      <div className={cn(styles.root, { [styles.rootLoading]: loading })}>
        <div>
          <FormFeedback
            visible={error !== null}
            errorMessage={error as string}
            onDismiss={() => {
              setError(null);
            }}
          >
            <div className="mb-6 text-center">
              <h5 className={cn(styles.title, 'mb-4')}>Información de contacto</h5>
              <p>
                Al llenar la solicitud recibirás una llamada de parte de un miembro del equipo de
                Maxilana.
              </p>
            </div>
            <div className="grid gap-4">
              <Form.Item name="Nombre">
                <InputField label="Nombre completo" />
              </Form.Item>
              <Form.Item name="CorreoElectronico">
                <InputField type="email" label="Correo electrónico" />
              </Form.Item>
              <Form.Item name="Telefono">
                <InputField type="tel" label="Teléfono" maxLength={10} placeholder="##########" />
              </Form.Item>
              <div>
                <Button
                  fullWidth
                  theme="primary"
                  text="Enviar información"
                  onClick={(evt) => {
                    evt.preventDefault();

                    setLoading(true);

                    form
                      .validateFields()
                      .then((values) => {
                        const { Nombre, CorreoElectronico, Telefono } = values;

                        if (!Nombre || !CorreoElectronico || !Telefono) {
                          throw new Error(
                            'Para enviar una solicitud de préstamo necesitas llenar el formulario',
                          );
                        }

                        return onSubmit(values);
                      })
                      .catch((err) => {
                        setError((err as AxiosError).message);
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                />
              </div>
              <div>
                <Button
                  fullWidth
                  theme="whatsapp"
                  text="Comunícate con un asesor"
                  icon={<WhatsAppOutlined />}
                  onClick={(evt) => {
                    evt.preventDefault();

                    setLoading(true);

                    const data = form.getFieldsValue();
                    onWhatsapp(data)
                      .catch(catchError)
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                />
              </div>
            </div>
          </FormFeedback>
        </div>
        {loading && (
          <div className={styles.loaderOverlay}>
            <span className={styles.loader}>
              <LoadingOutlined spin style={{ fontSize: 40 }} />
            </span>
          </div>
        )}
      </div>
    </Form>
  );
};

export default LoanRequest;
