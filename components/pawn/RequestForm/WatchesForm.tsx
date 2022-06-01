import { Form } from 'antd';
import { FC, useState } from 'react';

import { Button } from '~/components/ui';
import { InputField, SelectField, InputMask } from '~/components/common';
import defaultValidateMessages from 'config/validationMessages';
import { City } from '~/types/Models';
import useBrandWatchesForPawns from '~/hooks/useBrandWatchesForPawns';

export interface FormValues {
  codigomarca: number;
  monto: number;
  plaza: number;
  correo: string;
}

interface Props {
  cities?: City[];
  onSubmit: (data: FormValues) => Promise<void>;
}

const WatchesForm: FC<Props> = ({ onSubmit, cities = null }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data } = useBrandWatchesForPawns();

  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      await onSubmit?.(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const brands = data ? data.map((item) => ({ label: item.label, value: item.id })) : [];

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      validateMessages={defaultValidateMessages}
      initialValues={{ plaza: 'default' }}
    >
      <div className="grid gap-8">
        <Form.Item name="codigomarca" initialValue="default" rules={[{ required: true }]}>
          <SelectField
            name="codigomarca"
            label="¿Cuál es la marca de tu reloj?"
            placeholder="Selecciona la marca"
            options={brands}
          />
        </Form.Item>
        <Form.Item
          name="monto"
          rules={[{ required: true }]}
          getValueFromEvent={({ target }) => target.rawValue} // rawValue viene de Cleave.js
        >
          <InputMask
            label="¿Cuál es el valor de tu reloj en el mercado?"
            options={{
              prefix: '$',
              numeral: true,
              numeralPositiveOnly: true,
              rawValueTrimPrefix: true,
            }}
          />
        </Form.Item>
        <div>
          <Form.Item name="plaza" rules={[{ required: true }]}>
            <SelectField
              name="plaza"
              label="Selecciona tu ciudad"
              options={
                cities !== null
                  ? cities.map((item) => ({
                      value: item.code,
                      label: item.name,
                    }))
                  : []
              }
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="correo">
            <InputField label="Correo electrónico" />
          </Form.Item>
        </div>
        <div>
          <Button
            fullWidth
            theme="primary"
            loading={loading}
            text="Ver cuánto te prestamos por tu artículo"
          />
        </div>
      </div>
    </Form>
  );
};

export default WatchesForm;
