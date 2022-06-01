import { FC, PropsWithChildren, ReactNode } from 'react';

interface Props {
  image: ReactNode;
  title: string;
  message: ReactNode;
}

const Result: FC<PropsWithChildren<Props>> = ({ image, title, message, children }) => {
  return (
    <div className="text-center space-y-8">
      {image}
      <div>
        <span className="h4 mt-8 mb-4 block">{title}</span>
        <div>{message}</div>
      </div>
      {children}
    </div>
  );
};
export default Result;
