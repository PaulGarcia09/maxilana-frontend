import cn from 'classnames';
import { FC } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { MenuOutlined } from '@ant-design/icons';

import { Logo } from '~/components/svg';
import { AuthComponent, LoginFlow } from '~/components/auth';
import { SocialMenu } from '~/components/common';
import Searcher from '~/components/ui/Searcher';
import { Button } from '~/components/ui';
import { CartBadge } from '~/components/cart';

import styles from './Navbar.module.css';
import mainMenu from '../../../config/mainMenu';
import useToggleState from '~/hooks/useToggleState';
import { City } from '~/types/Models';

interface Props {
  cities?: City[];
}

const Modal = dynamic(() => import('../../common/Modal'));

const Navbar: FC<Props> = ({ cities }) => {
  const { asPath } = useRouter();
  const [showModal, toggleModal] = useToggleState(false);

  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <nav className={styles.areas}>
          <div className={styles.brandingArea}>
            <label className={styles.drawerTrigger} role="button" htmlFor="menuControl">
              <MenuOutlined style={{ color: 'white', fontSize: 24 }} />
            </label>
            <Link href="/" prefetch={false}>
              <a className={styles.logo}>
                <Logo />
              </a>
            </Link>
          </div>
          <div className={styles.navigationArea}>
            <input type="checkbox" id="menuControl" className={styles.menuControl} />
            <label className={styles.backdrop} role="button" htmlFor="menuControl" />
            <ul className={styles.navigationMenu}>
              {mainMenu.map((item) => (
                <li
                  key={item.id}
                  className={cn(styles.navigationItem, {
                    [styles.current]: asPath !== '/' && item.href.includes(asPath),
                  })}
                >
                  <Link href={item.href} prefetch={false}>
                    <a target={item?.target || '_self'}>{item.label}</a>
                  </Link>
                </li>
              ))}
              <li className={cn(styles.navigationItem, styles.navigationItemPayment)}>
                <Button
                  size="small"
                  theme="primary"
                  text="Pagar en línea"
                  href="/pagos"
                  fullWidth
                />
              </li>
              <li className={styles.navigationItemSocial}>
                <SocialMenu brand size="small" />
              </li>
            </ul>
            <Searcher cities={cities} />
          </div>
          <div className={styles.contextualArea}>
            <div className="flex justify-between items-center space-x-6">
              <AuthComponent onClickLogin={toggleModal} />
              <CartBadge />
            </div>
            <span className={styles.payOnlineLink}>
              <Button size="small" theme="primary" text="Pagar en línea" href="/pagos" />
            </span>
          </div>
        </nav>
      </div>
      {showModal && (
        <Modal open onClose={toggleModal}>
          {/* <LoginForm onSuccess={toggleModal} /> */}
          <LoginFlow onSuccess={toggleModal} />
        </Modal>
      )}
    </header>
  );
};

export default Navbar;
