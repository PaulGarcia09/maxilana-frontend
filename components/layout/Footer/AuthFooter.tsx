import Link from 'next/link';

const AuthFooter = () => {
  return (
    <footer className="my-12 mx-auto sm:max-w-xl">
      <ul className="flex flex-col items-center justify-between text-center text-sm sm:flex-row">
        <li className="text-link uppercase p-1 mx-4">
          <Link href="/contacto">
            <a>Contacto</a>
          </Link>
        </li>
        <li className="text-link uppercase p-1 mx-4">
          <Link href="/legal/terminos-y-condiciones">
            <a>Términos y Condiciones</a>
          </Link>
        </li>
        <li className="text-link uppercase p-1 mx-4">
          <Link href="/legal/aviso-de-privacidad">
            <a>Aviso de privacidad</a>
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default AuthFooter;
