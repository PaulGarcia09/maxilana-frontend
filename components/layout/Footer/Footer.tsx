import cn from 'classnames';
import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { SocialMenu } from '~/components/common';
import { City, CMSLegal } from '~/types/Models';
import footerMenu from '../../../config/footerMenu';

import styles from './Footer.module.css';

interface Props {
  variant?: 'default' | 'compact';
  cities: City[];
  legalPages: Partial<CMSLegal>[];
}

const Footer: FC<Props> = ({ variant = 'default', cities, legalPages }) => {
  if (variant === 'compact') {
    return (
      <footer className={`${styles.root} ${styles.rootCompact}`}>
        <section className={styles.wrapper}>
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <div>
              <Link href="/">
                <a>
                  <Image
                    src="/logo-alt.svg"
                    width={144}
                    height={36}
                    alt="Logotipo blanco de Maxilana"
                  />
                </a>
              </Link>
            </div>
            <Copyright />
          </div>
        </section>
      </footer>
    );
  }

  return (
    <footer className={styles.root}>
      <section className={`${styles.wrapper} ${styles.wrapperDefault}`}>
        <nav className="sm:flex sm:flex-row items-start mb-20">
          <div className="flex-initial sm:mr-12 mb-10 sm:mb-0">
            <div>
              <Link href="/">
                <a>
                  <Image
                    src="/logo-alt.svg"
                    width={144}
                    height={36}
                    alt="Logotipo blanco de Maxilana"
                  />
                </a>
              </Link>
              <span className="block text-sm text-white mb-4">¡Te sacamos del apuro!</span>
            </div>
            <SocialMenu />
          </div>
          <div className="flex-1">
            <ul className={`sm:grid sm:grid-cols-3 xl:grid-cols-5`}>
              {footerMenu(cities, legalPages).map((section) => {
                let items: JSX.Element[] = [];

                if (section.children) {
                  items = section.children.map(({ id, href, label, ...linkProps }) => (
                    <Link key={id} href={href || '#'}>
                      <a className={styles.menuLink} {...linkProps}>
                        {label}
                      </a>
                    </Link>
                  ));
                }

                return (
                  <li key={section.id} className={styles.menuSection}>
                    <h1 className={styles.menuTitle}>{section.label}</h1>
                    {items}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </section>
      <Copyright />
    </footer>
  );
};

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <small className={styles.copy}>
        &copy; Copyright {currentYear} - La Nacional Pignoraciones y Remates. Todos los derechos
        reservados.
      </small>
      <small className={cn(styles.powered, 'flex items-center')}>
        <span className="text-sm">Powered by </span>
        <a
          className="inline-flex items-center"
          href="https://www.adhocti.com/"
          title="Desarrollado con &hearts; por ADHOC TI: Consultoría y desarrollo de Sitios Web y Apps"
        >
          <Image
            src="/logo-adhoc.svg"
            width={70}
            height={16}
            layout="fixed"
            alt="Desarrollado con &hearts; por ADHOC TI: Consultoría y desarrollo de Sitios Web y Apps"
          />
        </a>
      </small>
    </div>
  );
};

export default Footer;
