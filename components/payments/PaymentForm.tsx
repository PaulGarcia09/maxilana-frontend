import { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Form, Radio } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Button } from '../ui';
import { FormFeedback, InputField, InputMask, SelectField } from '../common';
import defaultValidateMessages from 'config/validationMessages';
import ComboBox from '../../components/ui/ComboBox/ComboBox';
import { CreditCard } from '~/types/Requests/CreditCard';
import { DeliveryData } from '~/components/checkout/Types/CheckOutTypes';

import { ServicePaymentRequest, CartPurchase } from '~/types/Requests';
import Axios from 'axios';

type Status = 'idle' | 'loading' | 'error';

type FormValues = ServicePaymentRequest;

export interface PaymentData extends CreditCard {
  concept: string;
  amount: number;
}

interface Estado {
  Codigo: string;
  Estado: string;
}

interface Pais {
  Codigo: string;
  Pais: string;
}

export interface Props {
  title: string;
  description: string;
  data: any; //PaymentData | DeliveryData;
  copiarDatos: boolean;
  onSubmit: (data: any) => Promise<void>; //(data: FormValues | CartPurchase) => Promise<void>;
  showSubmitButton: boolean;
}

dayjs.extend(customParseFormat);

const PaymentForm: FC<Props> = ({
  data,
  title,
  description,
  onSubmit,
  showSubmitButton,
  copiarDatos,
}) => {
  const axiosConn = Axios.create({ baseURL: 'https://grupoalvarez.com.mx:4430/MaxilanaApp/api' });
  let selectEstado: HTMLSelectElement; //= document.getElementById('estado') as HTMLSelectElement;
  let selectPais: HTMLSelectElement; // = document.getElementById('pais') as HTMLSelectElement;

  const [form] = Form.useForm<FormValues>();
  const [status, setStatus] = useState<Status>('idle');

  const [pais, setPais] = useState<Pais | null>();
  const [paises, setPaises] = useState<Pais[]>();
  const [estado, setEstado] = useState<Estado | null>();
  const [estados, setEstados] = useState<Estado[]>();

  const handleFormSubmit = async (values: FormValues) => {
    setStatus('loading');
    try {
      await onSubmit(values);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
    }
  };

  useEffect(() => {
    selectEstado = document.getElementById('estado') as HTMLSelectElement;
    selectPais = document.getElementById('pais') as HTMLSelectElement;

    axiosConn
      .get('/v2/Usuarios/ConsultarPaises')
      .then(async (resp) => {
        const { response } = resp.data.data;
        await setPaises(response);
        selectEstado.value = '';
        selectPais.value = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axiosConn
      .get(`/v2/Usuarios/ConsultarEstados/Pais/${pais ? pais.Codigo : 'MX'}`)
      .then(async (resp) => {
        const { response } = resp.data.data;
        await setEstados(response);
        selectEstado.value = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pais]);

  useEffect(() => {
    if (!showSubmitButton) {
      showSubmitButton = true;
    }
  }, [data]);

  const handleCP = (p: string) => {
    setPais({ Codigo: p, Pais: '' });
    selectEstado.value = '';
  };
  const handleCE = (e: string) => {
    setEstado({ Codigo: e, Estado: '' });
  };

  const getFillFormValues = (dt: any) => {
    if (dt && dt.nombreenvio && copiarDatos) {
      return {
        importe: dt.monto,
        concepto: dt.concept,
        celular: dt.celularenvio,
        nombre: dt.nombreenvio,
        apellido: dt.apellidoenvio,
        calle: `${dt.domicilioenvio} ${dt.coloniaenvio}`,
        ciudad: dt.municipioenvio,
        estado: dt.estadoenvio,
        pais: dt.paisenvio,
        cp: dt.codigopostalenvio,
        email: dt.emailenvio,
      };
    } else {
      return {
        importe: dt.monto ? dt.monto : dt.amount,
        concepto: dt.concept,
        celular: dt.celular,
        nombre: dt.nombre,
        apellido: dt.apellidos,
        calle: dt.calle,
        ciudad: dt.ciudad,
        estado: dt.estado,
        pais: dt.pais,
        codigoPostal: dt.codigopostal,
        email: dt.email,
      };
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      validateMessages={defaultValidateMessages}
      initialValues={getFillFormValues(data)}
    >
      <div className="px-4">
        <h1 className="text-2xl mb-4">{title}</h1>
        <p>{description}</p>
      </div>
      <div className="py-6 sm:px-4">
        <div className="formContainer">
          <FormFeedback
            visible={status === 'error'}
            errorMessage="Ocurrió un error al procesar el pago, por favor comunícate con una sucursal."
            onDismiss={() => {
              setStatus('idle');
            }}
          >
            <div>
              <h5 className="text-lg mb-6">Información de pago</h5>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="col-span-2">
                  <Form.Item name="concepto">
                    <InputField disabled label="Concepto" />
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item name="importe">
                    <InputField disabled label="Importe a pagar" />
                  </Form.Item>
                </div>
                <div className="col-span-2 p-2">
                  <Form.Item
                    name="tipotarjeta"
                    label="Tipo de crédito"
                    rules={[{ required: true }]}
                  >
                    <Radio.Group className="flex flex-row">
                      <Radio value="CR">
                        <span>CRÉDITO</span>
                      </Radio>
                      <Radio value="DB">
                        <span>DÉBITO</span>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="col-span-2 p-2">
                  <Form.Item name="cardtype" label="Tipo de tarjeta" rules={[{ required: true }]}>
                    <Radio.Group className="flex flex-row">
                      <Radio value="VISA">
                        <span>VISA</span>
                      </Radio>
                      <Radio value="MC">
                        <span>MASTERCARD</span>
                      </Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div>
                  <Form.Item name="nombre" rules={[{ required: true }]}>
                    <InputField
                      label="Nombre"
                      maxLength={60}
                      placeholder="Nombre del titular de la tarjeta"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item name="apellido" rules={[{ required: true }]}>
                    <InputField
                      label="Apellido"
                      maxLength={60}
                      placeholder="Apellido del titular de la tarjeta"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item name="calle" rules={[{ required: true }]}>
                    <InputField label="Calle" maxLength={60} placeholder="Calle" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item name="ciudad" rules={[{ required: true }]}>
                    <InputField label="Ciudad" maxLength={50} placeholder="Ciudad" />
                  </Form.Item>
                </div>
                {/* <div>
                  <Form.Item name="estado" rules={[{ required: true }]}>
                    <InputField
                      label="Estado"
                      placeholder="Estado"
                    />
                  </Form.Item>
                </div> */}

                {/* <div>
                  <Form.Item name="pais" rules={[{ required: true }]}>
                    <InputField
                      label="Pais"
                      placeholder="Ciudad"
                    />
                  </Form.Item>
                </div> */}
                <div>
                  <ComboBox
                    llave="Codigo"
                    valor="Pais"
                    id="pais"
                    name="pais"
                    label="Pais"
                    requerido={true}
                    handleChange={handleCP}
                    data={paises ? paises : []}
                    placeHolder="Favor de seleccionar el país"
                  />
                </div>
                <div>
                  <ComboBox
                    llave="Codigo"
                    valor="Estado"
                    id="estado"
                    name="estado"
                    label="Estado"
                    requerido={true}
                    handleChange={handleCE}
                    data={estados ? estados : []}
                    placeHolder="Favor de seleccionar el estado"
                  />
                </div>

                <div>
                  <Form.Item name="cp" rules={[{ required: true }]}>
                    <InputField label="Código postal" maxLength={10} placeholder="Código postal" />
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item
                    name="tarjeta"
                    rules={[{ required: true }]}
                    getValueFromEvent={({ target }) => target.rawValue}
                  >
                    <InputMask
                      label="Número de la tarjeta"
                      placeholder="#### #### #### ####"
                      options={{
                        creditCard: true,
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    name="vencimiento"
                    rules={[
                      {
                        required: true,
                        validator: (_, value) => {
                          const dt = dayjs(value, 'MM/YY');
                          const isFuture = dt.isAfter(dayjs());

                          if (dt.isValid() && isFuture) {
                            return Promise.resolve();
                          }

                          return Promise.reject(new Error('Fecha inválida'));
                        },
                      },
                    ]}
                  >
                    <InputMask
                      label="Fecha de vencimiento"
                      placeholder="MM/AA"
                      maxLength={5}
                      options={{
                        date: true,
                        datePattern: ['m', 'Y'],
                      }}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item name="ccv" rules={[{ required: true }]}>
                    <InputMask
                      type="password"
                      label="Cod. de seguridad"
                      placeholder="###"
                      maxLength={3}
                      options={{
                        numericOnly: true,
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item name="email" rules={[{ required: true }]}>
                    <InputField type="email" maxLength={255} label="Correo Electrónico" />
                  </Form.Item>
                </div>
                <div className="col-span-2">
                  <Form.Item name="celular" rules={[{ required: true }]}>
                    <InputMask
                      type="text"
                      maxLength={25}
                      options={{ numericOnly: true }}
                      label="Numeró de Celular (A este numeró se le enviará la notificación del pago)"
                    />
                  </Form.Item>
                </div>
                <div hidden={!showSubmitButton} className="col-span-2">
                  <Button
                    fullWidth
                    text="Realizar Pago"
                    theme="primary"
                    loading={status === 'loading'}
                  />
                </div>
              </div>
              <div className="mt-4">
                <small className="text-xs text-center block">
                  Al hacer click en &quot;Realizar Pago&quot; aceptas los{' '}
                  <Link href="/legal/terminos-condiciones">
                    <a className="text-price underline">TÉRMINOS Y CONDICIONES</a>
                  </Link>
                </small>
              </div>
            </div>
          </FormFeedback>
        </div>
      </div>
    </Form>
  );
};

export default PaymentForm;
