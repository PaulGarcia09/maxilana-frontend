import { Form } from 'antd';
import React, { FC, useState } from 'react';

import { Button } from '~/components/ui';
import { CustomForm, InputField, InputMask } from '~/components/common';
import { checkAccount } from '~/modules/api';

type FormValues = {
  boleta: string;
  letra: string;
  monto: number;
};

const PawnAccountForm: FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      await checkAccount(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return (
    <CustomForm form={form} onSubmit={handleFormSubmit} className="max-w-sm mx-auto">
      <React.Fragment>
        <div className="mb-6">
          <h2 className="text-lg mb-4">Agrega una boleta</h2>
          <p>Ingresa los datos que vienen escritos en tu boleta</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="col-span-2">
            <Form.Item name="boleta" rules={[{ required: true }]}>
              <InputField maxLength={6} label="Número de boleta" />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="letra" rules={[{ required: true }]}>
              <InputField label="Letra" maxLength={3} />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="monto"
              getValueFromEvent={({ target }) => target.rawValue} // rawValue viene de Cleave.js
              rules={[{ required: true }]}
            >
              <InputMask
                placeholder="$0.00"
                label="Monto del préstamo"
                options={{
                  prefix: '$',
                  numeral: true,
                  numeralPositiveOnly: true,
                  rawValueTrimPrefix: true,
                }}
              />
            </Form.Item>
          </div>
          <div className="col-span-2">
            <Button
              fullWidth
              theme="primary"
              loading={loading}
              text={loading ? 'Consultando' : 'Consultar'}
            />
          </div>
        </div>
      </React.Fragment>
    </CustomForm>
  );
};

export default PawnAccountForm;
