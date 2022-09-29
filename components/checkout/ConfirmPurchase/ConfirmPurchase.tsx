import dayjs from 'dayjs';
import Link from 'next/link';
import { Form, Radio, Checkbox } from 'antd';
import { FC, useState, useEffect } from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { Button } from '~/components/ui';
import { CartSummary } from '~/components/cart';
import { BankTransactionForm } from '~/components/payments';
import { FormFeedback, InputField, InputMask, PageLoader, SelectField } from '~/components/common';

import styles from './ConfirmPurchase.module.css';
import defaultValidateMessages from 'config/validationMessages';

import { request3DTransaction } from '~/api/payments';
import { CartPurchase } from '~/types/Requests';
import { MaxilanaCheckout3DResponse as Transaction } from '~/types/Responses';
import { Cart } from '~/types/Models';
import PaymentForm from '../../payments/PaymentForm';
import { Props as CardProps, PaymentData } from '../../payments/PaymentForm';
import { ServicePaymentRequest } from '~/types/Requests';
import Axios from 'axios';
import { Estado, Pais } from '../Types/CheckOutTypes';
import ComboBox from '~/components/ui/ComboBox/ComboBox';
import { DeliveryData, initialDeliveryData } from '~/components/checkout/Types/CheckOutTypes';

interface Props {
  cart: Cart;
  onSubmit: (data: any) => Promise<void>;
}

type Status = 'idle' | 'submiting' | 'error';
type Data = {
  payment: CartPurchase;
  transaction: Transaction;
};

dayjs.extend(customParseFormat);

export const ConfirmPurchase: FC<Props> = ({ cart, onSubmit }) => {
  const axiosConn = Axios.create({ baseURL: 'https://grupoalvarez.com.mx:4430/MaxilanaApp/api' });
  let selectEstado: HTMLSelectElement; //= document.getElementById('estado') as HTMLSelectElement;
  let selectPais: HTMLSelectElement; // = document.getElementById('pais') as HTMLSelectElement;

  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<Data | null>(null);

  const [form] = Form.useForm<CartPurchase>();

  type CardFormValues = ServicePaymentRequest;
  const [cardForm] = Form.useForm<CardFormValues>();

  const [paymentData, setPaymentData] = useState();
  const [cardProps, setCardProps] = useState({
    title: 'Pago de articulo',
    description: 'Pago de articulo',
    data: paymentData,
    onSubmit: () => {},
    showSubmitButton: false,
  });

  const [mismosDatos, setCheckCopiarDatos] = useState(false);
  const [formDataBack, setFormDataBack] = useState({});
  const [initialFormDataBack, setInitialFormDataBack] = useState({});

  const [pais, setPais] = useState<Pais>();
  const [paises, setPaises] = useState<any[]>();
  const [estado, setEstado] = useState<Estado>();
  const [estados, setEstados] = useState<Estado[]>();

  useEffect(() => {
    selectEstado = document.getElementById('estado') as HTMLSelectElement;
    selectPais = document.getElementById('pais') as HTMLSelectElement;

    const axiosConn = Axios.create({ baseURL: 'https://grupoalvarez.com.mx:4430/MaxilanaApp/api' });
    axiosConn
      .get('/v2/Usuarios/ConsultarPaises')
      .then((resp) => {
        const { response } = resp.data.data;
        setPaises(response);
      })
      .catch((err) => {
        console.log(err);
      });

    const initDF = form.getFieldsValue();
    setInitialFormDataBack(initDF);

    setPais({ Codigo: '', Pais: '' });
    axiosConn
      .get('/v2/Usuarios/ConsultarPaises')
      .then((resp) => {
        const { response } = resp.data.data;
        setPaises(response);
        selectEstado.value = '';
        selectPais.value = '';
      })
      .catch((err) => {
        console.log(err);
      });

    // let eEstado = document.getElementById('estado') as HTMLSelectElement;
    // eEstado.addEventListener('change', (e: any) => {
    //   const { target } = e;
    //   setEstado({ Estado: target.innerText, Codigo: target.value })
    // });

    // let ePais = document.getElementById('pais') as HTMLSelectElement;
    // ePais.addEventListener('change', (e: any) => {
    //   const { target } = e;
    //   setPais({ Codigo: target.value, Pais: target.innerText })
    // });
  }, []);

  useEffect(() => {
    axiosConn
      .get(`/v2/Usuarios/ConsultarEstados/Pais/${pais && pais.Codigo ? pais.Codigo : 'MX'}`)
      .then((resp) => {
        const { response } = resp.data.data;
        setEstados(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pais]);

  useEffect(() => {
    ponDatosEnvio;
  }, [mismosDatos]);

  const handleCheckChange = (e: any) => {
    setCheckCopiarDatos(e.target.checked);
  };

  const handleSetDataBack = (db: any) => {
    const response = {
      amount: cart.pricing.total,
      mismosDatos: mismosDatos,
      dataform: db,
    };
    setFormDataBack(response);
  };

  const ponDatosEnvio = () => {
    const db = {
      amount: cart.pricing.total,
      mismosDatos: mismosDatos,
      estado,
      pais,
      dataform: form.getFieldsValue(),
    };
    handleSetDataBack(db);
  };

  const handleCP = (p: string) => {
    setPais({ Codigo: p, Pais: '' });
    //selectEstado.value = '';
  };
  const handleCE = (e: string) => {
    setEstado({ Codigo: e, Estado: '' });
  };

  const handleFormSubmit = async (data: CartPurchase) => {
    setStatus('submiting');

    // try {
    //   // ! Esto no debería ser así
    //   // ! No es correcto enviar un importe en una petición
    //   // ! El API debería obtener el total de la compra por medio del order id
    //   const params = {
    //     ...data,
    //     orden: cart.id,
    //     importe: cart.pricing.total,
    //   };

    //   const deliveryData:DeliveryData = initialDeliveryData;
    //   const transaction3D = await request3DTransaction(params, deliveryData);

    //   setData({
    //     payment: params,
    //     transaction: transaction3D,
    //   });

    // } catch (err) {
    //   console.log(err);
    //   setStatus('error');
    // }
  };

  if (status === 'submiting') {
    const db = {
      amount: cart.pricing.total,
      mismosDatos: mismosDatos,
      estado,
      pais,
      dataform: form.getFieldsValue(),
    };
    onSubmit(db);
    // return (

    //   // <PageLoader text="En un momento serás redirigido a la pasarela de pagos...">
    //   //   {/* {data !== null && (
    //   //     <BankTransactionForm
    //   //       {...data}
    //   //       forwardPath={`${window.location.origin}/checkout/response?oid=${cart.id}`}
    //   //     />
    //   //   )} */}
    //   // </PageLoader>
    // );
  }

  return (
    <Form form={form} onFinish={handleFormSubmit} validateMessages={defaultValidateMessages}>
      <div className="container mx-auto md:px-4 p-4">
        <div className={styles.root}>
          <h1 className={styles.title}>Confirmar compra</h1>
          <div className={styles.gridContainer}>
            <div>
              <div className="formContainer">
                <h2 className={styles.subtitle}>Dirección de envío</h2>
                <div className="grid gap-4">
                  <div>
                    <Form.Item name="nombreenvio" rules={[{ required: true }]}>
                      <InputField label="Nombre(s)" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="apellidos" rules={[{ required: true }]}>
                      <InputField label="Apellido(s)" />
                    </Form.Item>
                  </div>
                  <div className="col-span-2">
                    <Form.Item name="domicilio" rules={[{ required: true }]}>
                      <InputField label="Dirección" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="codigopostal" rules={[{ required: true }]}>
                      <InputField label="Código Postal" maxLength={5} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="colonia" rules={[{ required: true }]}>
                      <InputField label="Colonia" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="municipio" rules={[{ required: true }]}>
                      <InputField label="Municipio" />
                    </Form.Item>
                  </div>
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
                    <Form.Item name="celular" rules={[{ required: true }]}>
                      <InputField label="Celular" placeholder="10 dígitos" maxLength={10} />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item name="correo" rules={[{ required: true }]}>
                      <InputField type="email" label="Correo electrónico" />
                    </Form.Item>
                  </div>
                  <div className="col-span-2">
                    <Form.Item name="instrucciones" rules={[{ required: true }]}>
                      <InputField
                        label="Instrucciones de entrega"
                        placeholder="Escribe referencias de cómo localizar tu casa"
                      />
                    </Form.Item>
                  </div>
                </div>
                <hr className={styles.divider} />
                <h2 className={styles.subtitle}>Información de pago</h2>
                <div>
                  <Form.Item name="mismosDatos">
                    <Checkbox onChange={handleCheckChange} value="0">
                      <span className="ml-2">Datos de tarjeta son iguales a los del envío.</span>
                    </Checkbox>
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="lg:max-w-[520px]">
              <div className="formContainer">
                <FormFeedback
                  visible={status === 'error'}
                  onDismiss={() => {
                    setStatus('idle');
                  }}
                >
                  <div>
                    <CartSummary data={cart} />
                    <hr className="my-4" />
                    <div>
                      <Button fullWidth size="large" theme="primary" text="Confirmar compra" />
                    </div>
                    <hr className="my-4" />
                    <div className="text-center">
                      <small>
                        Al hacer clic en &ldquo;Proceder al pago&rdquo; confirmas que aceptas los{' '}
                        <Link href="/legal/terminos-y-condiciones">
                          <a className="text-price">TÉRMINOS Y CONDICIONES</a>
                        </Link>{' '}
                        de Maxilana.
                      </small>
                    </div>
                  </div>
                </FormFeedback>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ConfirmPurchase;
