import { FC, useState, useEffect, ChangeEventHandler } from 'react';
import Axios from 'axios';
import { SelectField } from '~/components/common';
import { Form, Radio } from 'antd';
import { Pais } from '~/components/checkout/Types/CheckOutTypes';
import { PaymentData } from '~/components/payments/PaymentForm';

interface Props {
  name: string;
  id: string;
  label: string;
  handleChange: (pais: string) => void;
  data: any[];
  llave: string;
  valor: string;
  requerido?: boolean;
  apiURL?: string;
  typeApi?: string;
  placeHolder?: string;
}

const ComboBox: FC<Props> = ({
  name,
  id,
  label,
  requerido,
  handleChange,
  data,
  llave,
  valor,
  apiURL,
  typeApi,
  placeHolder,
}) => {
  useEffect(() => {
    let ref = document.getElementById(id) as HTMLSelectElement;
    ref.addEventListener('change', (e) => {
      var k = e.target as HTMLSelectElement;
      if (k) {
        handleChange(k.value);
      } else {
        handleChange('MX');
      }
    });
  }, []);

  return (
    <div className="form-group">
      <label className="p-3">{label}</label>
      <Form.Item name={name} rules={[{ required: requerido }]}>
        <SelectField
          id={id}
          name={name}
          placeholder={placeHolder}
          options={
            data !== undefined
              ? data.map((item) => ({
                  value: item[llave],
                  label: item[valor],
                }))
              : []
          }
        />
      </Form.Item>
    </div>
  );
};

export default ComboBox;
