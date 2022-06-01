import { Form } from 'antd';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';

import { Button } from '~/components/ui';
import { FormFeedback, InputField, InputMask } from '~/components/common';

import defaultValidateMessages from 'config/validationMessages';
import saveAutoPawnProspect from '~/api/saveAutoPawnProspect';
import { AutoPawnRequest } from '~/types/Requests';

type FormValues = AutoPawnRequest;
type Status = 'idle' | 'loading' | 'finished';

const AutoPawnForm: FC = () => {
  const [form] = Form.useForm<FormValues>();

  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: FormValues) => {
    setStatus('loading');

    try {
      await saveAutoPawnProspect(values);
      setStatus('finished');
    } catch (err) {
      setError((err as AxiosError).message);
      setStatus('idle');
    }
  };

  if (status === 'finished') {
    return (
      <div className="formContainer">
        <div className="w-full p-4">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div>
              <CheckCircleTwoTone twoToneColor="#0BBF69" style={{ fontSize: 60 }} />
            </div>
            <h2 className="text-2xl">Gracias</h2>
            <p className="text-lg text-center">
              Un miembro de nuestro equipo se comunicará contigo a la brevedad
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form form={form} onFinish={handleSubmit} validateMessages={defaultValidateMessages}>
      <div className="formContainer">
        <FormFeedback
          visible={error !== null}
          errorMessage={error as string}
          onDismiss={() => {
            setError(null);
          }}
        >
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl">Solicitud de avalúo</h2>
              <p className="text-secondary text-sm">
                Conoce cuánto te prestamos por tu auto. A la brevedad un representante se comunicará
                contigo.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Form.Item name="nombre" rules={[{ required: true }]}>
                  <InputField label="Nombre" />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="primerapellido" rules={[{ required: true }]}>
                  <InputField label="Primer Apellido" />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="segundoapellido" rules={[{ required: true }]}>
                  <InputField label="Segundo Apellido" />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="fecnac" rules={[{ required: true }]}>
                  <InputMask
                    label="Fecha de nacimiento"
                    placeholder="DD/MM/AA"
                    options={{
                      date: true,
                      datePattern: ['d', 'm', 'Y'],
                    }}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="ciudad" rules={[{ required: true }]}>
                  <InputField label="Ciudad" />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="marca" rules={[{ required: true }]}>
                  <InputField label="Marca" placeholder="Honda" />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="modelo" rules={[{ required: true }]}>
                  <InputField label="Modelo o Año" placeholder="Accord 2007" />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="tipo">
                  <InputField label="Tipo" placeholder="Sedán" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="cantidad"
                  rules={[{ required: true }]}
                  getValueFromEvent={({ target }) => target.rawValue}
                >
                  <InputMask
                    label="Cantidad solicitada"
                    options={{
                      prefix: '$',
                      numeral: true,
                      numeralPositiveOnly: true,
                      rawValueTrimPrefix: true,
                    }}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="correo" rules={[{ required: true }]}>
                  <InputField type="email" label="Correo electrónico" />
                </Form.Item>
              </div>
              <div>
                <Form.Item name="telefono" rules={[{ required: true }]}>
                  <InputField
                    type="tel"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    label="Teléfono (10 dígitos)"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="py-8">
              <Button
                fullWidth
                theme="primary"
                text="Enviar Solicitud"
                loading={status === 'loading'}
              />
            </div>
            <p className="text-xs text-secondary">
              La Tasa Nominal Anual Máxima (TAE) es de 150% sin IVA. Tasa Anual Fija. Para fines
              informativos y de comparación. Fecha de cálculo 30 de junio de 2017. Por ejemplo para
              un préstamo de $10,000 pesos se deberán abonar 12 cuotas mensuales de $1,250.00 pesos
              más IVA cada una. Importe total a pagar (capital + intereses) de $15,000.00 pesos más
              IVA. Periodo mínimo de 60 días y máximo de 6 meses (renovable).
            </p>
          </>
        </FormFeedback>
      </div>
    </Form>
  );
};

export default AutoPawnForm;
