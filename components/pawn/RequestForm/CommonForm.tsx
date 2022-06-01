import { Form } from 'antd';
import { FC, useState } from 'react';

import { Button } from '~/components/ui';
import { InputField, SelectField, InputMask } from '~/components/common';
import defaultValidateMessages from 'config/validationMessages';
import { City } from '~/types/Models';
import { RequestPawn } from '~/types/Requests/RequestPawn';

type FormValues = RequestPawn;

interface Props {
  cities?: City[];
  onSubmit: (data: FormValues) => Promise<void>;
}

const CommonForm: FC<Props> = ({ onSubmit, cities = null }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      await onSubmit?.(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      validateMessages={defaultValidateMessages}
      initialValues={{ plaza: '---' }}
    >
      <div className="grid gap-8">
        <Form.Item
          name="monto"
          rules={[{ required: true }]}
          getValueFromEvent={({ target }) => target.rawValue} // rawValue viene de Cleave.js
        >
          <InputMask
            label="¿Cuál es el valor de tu prenda en el mercado?"
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

export default CommonForm;
