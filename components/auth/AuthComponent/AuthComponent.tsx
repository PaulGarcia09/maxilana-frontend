import cn from 'classnames';
import Link from 'next/link';
import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { DownOutlined as ArrowDown } from '@ant-design/icons';

import { Dropdown } from '~/components/ui';
import { NextAPIMutator } from '~/modules/api/nextApiFetcher';
import useUser from '~/hooks/useUser';

interface Props {
  onClickLogin: () => void;
}

const AuthComponent: FC<Props> = ({ onClickLogin }) => {
  const router = useRouter();
  const { user, mutateUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [visible, toggleVisibility] = useState(false);

  const isLoggedIn = user !== undefined && user?.isLoggedIn;

  const handleLogout = async () => {
    setLoading(true);

    try {
      const auth = await NextAPIMutator({
        endpoint: '/api/logout',
        method: 'POST',
      });

      mutateUser(auth);
      setLoading(false);
      toggleVisibility(false);
      router.push('/');
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  if (!isLoggedIn || !user) {
    return (
      <span role="button" className="text-xs text-white block" onClick={onClickLogin}>
        Iniciar Sesión
      </span>
    );
  }

  return (
    <div className="relative">
      <Dropdown
        position="right"
        visible={visible}
        onClose={() => {
          toggleVisibility(false);
        }}
        parent={
          <div
            onClick={() => {
              toggleVisibility(!visible);
            }}
            className="flex items-center text-white text-sm hover:cursor-pointer"
          >
            <span className="flex items-center sm:space-x-2">
              <span className="line-clamp-1 inline-flex">{user.name}</span>
              <ArrowDown className={cn('transition-all', { ['transform rotate-180']: visible })} />
            </span>
          </div>
        }
      >
        <div role="menu" className="w-28">
          <Link href="/perfil">
            <a
              role="menuitem"
              className="block rounded-sm text-sm text-left p-1 hover:bg-brand/10 cursor-pointer"
            >
              Mi perfil
            </a>
          </Link>
          <span
            role="menuitem"
            onClick={handleLogout}
            className="block rounded-sm text-sm text-danger text-left p-1 hover:bg-brand/10 cursor-pointer"
          >
            {loading ? 'Saliendo...' : 'Salir'}
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default AuthComponent;
