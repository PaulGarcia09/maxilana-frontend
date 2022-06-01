import { FC } from 'react';

import ResumeEmptyList from './ResumeEmptyList';
import useAccountStatus from '~/hooks/useAccountStatus';
import ResumeList from './ResumeList';
import { User } from '~/types/Models';
import { PageLoader } from '~/components/common';

interface Props {
  user?: User;
  onAddAccount?: () => void;
}

const noop = () => {};

const ResumeHub: FC<Props> = ({ user = null, onAddAccount = noop }) => {
  const { account: data, loading } = useAccountStatus(user?.userCode);

  if (loading) {
    return <PageLoader text="Obteniendo la información..." />;
  }

  if (data.length < 1) {
    return <ResumeEmptyList onAddAccount={onAddAccount} />;
  }

  return <ResumeList data={data} />;
};

export default ResumeHub;
