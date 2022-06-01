import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react';

import { Meta } from '~/components/common';
import { MetaProps } from '~/components/common/Meta/Meta';
import { Logo } from '~/components/svg';

interface Props {
  title?: string;
  meta?: MetaProps;
  bgWhite?: boolean;
  hasHeader?: boolean;
}

const Layout: FC<PropsWithChildren<Props>> = ({
  title,
  meta,
  children,
  bgWhite,
  hasHeader = true,
}) => {
  return (
    <>
      <Meta title={title} {...meta} />
      <div className="min-h-screen flex flex-col">
        {hasHeader && (
          <div className="bg-brand py-4">
            <Link href="/">
              <a className="w-64 mx-auto block">
                <Logo />
              </a>
            </Link>
          </div>
        )}
        <main className={`flex-1${bgWhite ? ' bg-white' : ''}`}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
