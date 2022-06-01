import { Form } from 'antd';
import { FC, useState } from 'react';

import { Button } from '~/components/ui';
import { InputField, SelectField, InputMask } from '~/components/common';
import defaultValidateMessages from 'config/validationMessages';
import { City } from '~/types/Models';
import useMaterialsFormPawns from '~/hooks/useMaterialsForPawns';

export interface FormValues {
  material?: string;
  codigokilataje: number;
  gramos: string;
  plaza: number;
  correo: string;
  monto: number;
}

interface Props {
  cities?: City[];
  onSubmit: (data: FormValues) => Promise<void>;
}

const JewelryForm: FC<Props> = ({ onSubmit, cities = null }) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const { data } = useMaterialsFormPawns();

  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const { material, ...rest } = data;
      await onSubmit?.(rest);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  const materials = data !== undefined ? data.map((m) => ({ label: m.name, value: m.slug })) : [];

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      validateMessages={defaultValidateMessages}
      initialValues={{ plaza: '---', codigokilataje: 'default' }}
    >
      <div className="grid grid-cols-2 gap-4">
        <Form.Item name="material" initialValue="default" rules={[{ required: true }]}>
          <SelectField
            name="material"
            label="¿Cuál es el material de tu joya?"
            placeholder="Selecciona material"
            options={materials}
          />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => {
            const selectedMaterial = getFieldValue('material');
            let weights = [];

            if (selectedMaterial !== 'default') {
              const material = data?.find((m) => m.slug === selectedMaterial);
              // @ts-ignore
              weights = material?.weights.map((el) => ({ label: el.label, value: el.id }));
            }

            return (
              <Form.Item name="codigokilataje">
                <SelectField
                  name="kilataje"
                  label="¿Cuál es el kilataje de tu joya?"
                  options={weights}
                  placeholder={
                    selectedMaterial !== 'default' ? 'Elige el kilataje' : 'Elige un material'
                  }
                />
              </Form.Item>
            );
          }}
        </Form.Item>
        <div className="col-span-2">
          <Form.Item name="gramos" getValueFromEvent={({ target }) => target.rawValue}>
            <InputMask
              label="¿Cuál es el peso de tu joya en gramos?"
              options={{
                numeral: true,
                numeralDecimalScale: 2,
                rawValueTrimPrefix: true,
                prefix: 'g',
                tailPrefix: true,
              }}
            />
          </Form.Item>
        </div>
        <div className="col-span-2">
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
        <div className="col-span-2">
          <Form.Item name="correo">
            <InputField label="Correo electrónico" />
          </Form.Item>
        </div>
        <div className="col-span-2">
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

export default JewelryForm;
