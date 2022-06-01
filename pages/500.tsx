import { ArrowRightOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Error500, Logo } from '~/components/svg';
import { Button } from '~/components/ui';
import { Result, Search } from '~/components/common';

const Custom500 = () => {
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
            image={<Error500 />}
            title="Oops... Un error inesperado a ocurrido."
            message={
              <p>
                Lo sentimos, estamos trabajando en solucionarlo. Por favor vuelve a intentarlo más
                tarde. Si necesitas ayuda urgente por favor comunicarse al{' '}
                <a href="tel:800 215 1515">800 215 1515</a>.
              </p>
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
export default Custom500;
