import Link from 'next/link';
import { Tabs } from 'antd';
import { NextPage } from 'next';
import { UserOutlined, EditOutlined, FileTextOutlined, ProfileOutlined } from '@ant-design/icons';

import { Layout } from '~/components/layout';
import { Modal, PageLoader } from '~/components/common';
import { OrdersHub, PawnsHub, ResumeHub } from '~/components/profile';
import { PawnAccountForm } from '~/components/profile/Pawns';
import useToggleState from '~/hooks/useToggleState';
import { AuthPageProps } from '~/types/AuthPageProps';

export { default as getServerSideProps } from '~/utils/authGetServerSideProps';

const { TabPane } = Tabs;

const ProfilePage: NextPage<AuthPageProps> = ({ user, cities, legalPages }) => {
  const [showModal, toggleModal] = useToggleState(false);

  return (
    <Layout cities={cities || []} legalPages={legalPages || []} title="Perfil de usuario">
      {(() => {
        if (!user || user.isLoggedIn === false) {
          return (
            <div className="max-w-2xl mx-auto py-4 sm:px-4 sm:py-8">
              <PageLoader text="Cargando perfil de usuario..." />
            </div>
          );
        }

        return (
          <section className="max-w-2xl mx-auto py-4 sm:px-4 sm:py-8">
            <header className="flex items-center mb-6 px-4 sm:px-0">
              <span className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full border-gray-300 border">
                <UserOutlined style={{ fontSize: 32 }} />
              </span>
              <div className="space-y-2 ml-4 flex-1">
                <span className="block font-semibold capitalize">
                  {`${user?.name} ${user?.lastname}`}
                </span>
                {/* <span className="block text-secondary text-sm">ezerangel@live.com</span>
                <span className="p-1 rounded-sm bg-surface-dark text-xs">Público general</span> */}
              </div>
              <div>
                <Link href="/perfil/editar-perfil">
                  <a>
                    <EditOutlined style={{ fontSize: 24 }} />
                  </a>
                </Link>
              </div>
            </header>
            <div className="relative bg-white border border-surface-dark sm:rounded-sm">
              <Tabs defaultActiveKey="resumen">
                <TabPane
                  key="resumen"
                  tab={
                    <span className="flex items-center px-2">
                      <FileTextOutlined style={{ fontSize: 14 }} />
                      Resumen
                    </span>
                  }
                >
                  {
                    <ResumeHub
                      user={user}
                      onAddAccount={() => {
                        toggleModal();
                      }}
                    ></ResumeHub>
                  }
                </TabPane>
                <TabPane
                  key="boletas"
                  tab={
                    <span className="flex items-center px-2">
                      <FileTextOutlined style={{ fontSize: 14 }} />
                      Boletas
                    </span>
                  }
                >
                  <PawnsHub
                    user={user}
                    onAddAccount={() => {
                      toggleModal();
                    }}
                  />
                </TabPane>
              </Tabs>
            </div>
          </section>
        );
      })()}

      {showModal && (
        <Modal open onClose={() => toggleModal()}>
          <PawnAccountForm />
        </Modal>
      )}
    </Layout>
  );
};

export default ProfilePage;
