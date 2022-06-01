import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import styles from './SideMenu.module.css';

interface Props {
  links: Array<{ label: string; href: string }>;
  className?: string;
}

const SideMenu: FC<Props> = ({ links, className }) => {
  const router = useRouter();
  return (
    <ul className={cn(styles.root, className)}>
      {links?.map((item) => (
        <li key={item?.href}>
          <Link href={item?.href}>
            <a
              className={cn(styles.link, { [styles.current]: router.asPath.includes(item?.href) })}
            >
              {item?.label}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SideMenu;
