import { FC } from 'react';
import Link from 'next/link';

import s from './Breadcrumbs.module.css';

interface Item {
  label: string;
  href: string;
}

interface Props {
  links: Item[];
}

const Breadcrumbs: FC<Props> = ({ links }) => {
  return (
    <nav className={s.root}>
      <ul className={s.list}>
        {links.map((item, idx) => {
          if (links.length === idx + 1) {
            return (
              <li key={item.label} className={s.listItem}>
                <span className={s.itemLabel}>{item.label}</span>
              </li>
            );
          }

          return (
            <li key={item.label} className={s.listItem}>
              <Link href={item.href}>
                <a className={s.itemLabel}>{item.label}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
