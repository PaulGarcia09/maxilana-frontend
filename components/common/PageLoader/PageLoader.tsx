import { FC, PropsWithChildren } from 'react';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  text: string;
}

const PageLoader: FC<PropsWithChildren<Props>> = ({ text, children = null }) => {
  return (
    <div className="container mx-auto max-w-3xl flex flex-col items-center px-4 py-48 space-y-6">
      <LoadingOutlined className="text-brand text-2xl" />
      <span className="block text-secondary text-center text-2xl md:text-3xl">{text}</span>
      {children}
    </div>
  );
};

export default PageLoader;
