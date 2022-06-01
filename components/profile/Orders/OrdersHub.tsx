import { FC } from 'react';

import OrderEmptyList from './OrderEmptyList';
import { PageLoader } from '~/components/common';
import useAccountStatus from '~/hooks/useAccountStatus';
import OrderList from './OrderList';
import { User } from '~/types/Models';
import orders from '~/modules/mock/orders.json';

interface Props {
  user?: User;
}

const OrdersHub: FC<Props> = ({ user = null }) => {
  // Las compras deberían venir del estado de cuenta...
  //  por el momento no vienen.
  const { loading } = useAccountStatus(user?.userCode);

  if (loading) {
    return <PageLoader text="Buscando compras..." />;
  }

  //if (data.length < 1) {
  // return <OrderEmptyList />;
  //}

  return <OrderList data={orders} />;
};

export default OrdersHub;
