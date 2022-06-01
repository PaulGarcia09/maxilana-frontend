import React, { FC, PropsWithChildren } from 'react';
import { Meta } from '~/components/common';
import { MetaProps } from '~/components/common/Meta/Meta';
import { Footer, Navbar } from '~/components/layout';
import { City, CMSLegal } from '~/types/Models';

interface Props {
  title?: string;
  meta?: MetaProps;
  cities: City[];
  legalPages: Array<Partial<CMSLegal>>;
  bgWhite?: boolean;
}

const Layout: FC<PropsWithChildren<Props>> = ({
  title,
  meta,
  cities = [],
  children,
  bgWhite,
  legalPages,
}) => {
  return (
    <>
      <Meta title={title} {...meta} />
      <div className="min-h-screen flex flex-col">
        <Navbar cities={cities} />
        <div className={`flex-1${bgWhite ? ' bg-white' : ''}`}>{children}</div>
        <Footer cities={cities} legalPages={legalPages} />
      </div>
    </>
  );
};

export default Layout;
