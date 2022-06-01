import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return <section className="container mx-auto px-4">{children}</section>;
};

export default Container;
