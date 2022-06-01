import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Error404, Logo } from '~/components/svg';
import { Button } from '~/components/ui';
import { Result, Search } from '~/components/common';

const Custom404 = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <div className="bg-brand py-4">
        <Link href="/">
          <a className="w-64 mx-auto block">
            <Logo />
          </a>
        </Link>
      </div>
      <div className="flex justify-center items-center flex-1">
        <div className="text-center space-y-8 max-w-2xl">
          <Result
            image={<Error404 />}
            title="Oops!... La página que buscas no existe."
            message={
              <p>Lo sentimos puede que la página que buscas ya no exista o nunca fue creada.</p>
            }
          >
            <Button text="Ir al inicio" rightIcon={<ArrowRightOutlined />} href="/" />
            <Search />
          </Result>
        </div>
      </div>
    </div>
  );
};
export default Custom404;
