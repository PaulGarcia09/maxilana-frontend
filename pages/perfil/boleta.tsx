import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Layout } from '~/components/layout';
import { Breadcrumbs } from '~/components/ui';
import { PageLoader } from '~/components/common';
import PaymentFlow from '~/components/profile/PaymentFlow';
import useAccountStatus from '~/hooks/useAccountStatus';
import { AuthPageProps } from '~/types/AuthPageProps';

export { default as getServerSideProps } from '~/utils/authGetServerSideProps';

const PawnBallotProfilePage: NextPage<AuthPageProps> = ({ user, cities, legalPages }) => {
  const router = useRouter();
  const { account, loading } = useAccountStatus(user?.userCode);
  const { ids, status = 'idle' } = router.query;
  let ballots = undefined;

  if (ids && !loading) {
    const selectedIds: string[] = JSON.parse(`${ids}`);

    if (Array.isArray(selectedIds)) {
      ballots = account.filter((item) => selectedIds.includes(item.accountNumber));
    }
  }

  return (
    <Layout cities={cities} title="Detalle de boleta" legalPages={legalPages}>
      <section className="max-w-2xl mx-auto py-4 sm:py-8">
        <div className="px-4">
          <Breadcrumbs
            links={[
              { label: 'Perfil', href: '/perfil' },
              { label: 'Detalle de boleta', href: '/perfil/boleta' },
            ]}
          />
        </div>
        {(() => {
          if (ballots === undefined) {
            return <PageLoader text="Obteniendo información de la boleta..." />;
          }

          // @ts-ignore
          return <PaymentFlow accounts={ballots} status={status} />;
        })()}
      </section>
    </Layout>
  );
};

export default PawnBallotProfilePage;
