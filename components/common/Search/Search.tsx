import { Form } from 'antd';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { InputField } from '~/components/common';

const Search: FC = () => {
  const router = useRouter();
  const handleSubmit = (value: { q: string }) => {
    if (value?.q) {
      router.push(`/busqueda?q=${value?.q}`);
    }
  };
  return (
    <Form className="max-w-sm mx-auto" onFinish={handleSubmit}>
      <Form.Item name="q">
        <InputField placeholder="Buscar productos" />
      </Form.Item>
    </Form>
  );
};

export default Search;
