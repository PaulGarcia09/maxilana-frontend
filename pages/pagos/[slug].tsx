import ms from 'ms';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { ReactElement, useEffect } from 'react';
import getAllLegalPages from '~/api/cms/getAllLegalPages';
import getPaymentsList from '~/api/cms/getPayments';
import getAllCities from '~/api/getAllCities';
import getPaymentBySlug from '~/api/getPaymentBySlug';
import { HelpSidebar, Layout } from '~/components/layout';
import { LoanPaymentFlow, PawnPaymentFlow, CouponPaymentFlow } from '~/components/payments';
import { DefaultPageProps } from '~/types/DefaultPageProps';
import { CMSPayment } from '~/types/Models';

const paymentTypes: Record<
  'empeno' | 'prestamo' | 'vale',
  { css: string[]; component: ReactElement }
> = {
  empeno: {
    css: ['/antd/form.css', '/antd/radio.css', '/antd/select.css'],
    component: <PawnPaymentFlow />,
  },
  prestamo: {
    css: ['/antd/form.css', '/antd/radio.css'],
    component: <LoanPaymentFlow />,
  },
  vale: {
    css: ['/antd/form.css', '/antd/radio.css'],
    component: <CouponPaymentFlow />,
  },
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const payments = await getPaymentsList();
  return {
    paths: payments.map((payment) => ({ params: { slug: payment.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  DefaultPageProps<{ payment: CMSPayment }>,
  { slug: string }
> = async (ctx) => {
  const [cities, legalPages, payment] = await Promise.all([
    getAllCities(),
    getAllLegalPages(),
    getPaymentBySlug(`${ctx?.params?.slug}`),
  ]);
  return {
    props: {
      cities,
      legalPages,
      payment,
      css: paymentTypes[payment.type].css,
    },
    revalidate: ms(process.env.DEFAULT_REVALIDATE || '10m'),
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const PaymentPage: NextPage<Props> = ({ cities, legalPages, payment }) => {
  const { component } = paymentTypes[payment.type];
  useEffect(() => {
    console.log(payment);
  }, []);
  return (
    <Layout meta={{ ...payment?.seo }} cities={cities} legalPages={legalPages}>
      <div className="container mx-auto py-6">
        <div className="grid grid-flow-col gap-6">
          {component}
          <aside className="hidden w-[512px] lg:block">
            <HelpSidebar questions={payment.faqs} />
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentPage;
