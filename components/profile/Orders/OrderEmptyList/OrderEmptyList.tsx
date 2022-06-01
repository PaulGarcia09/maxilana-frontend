import { FC } from 'react';

import { Button } from '~/components/ui';
import { EmptyOrders } from '~/components/svg';

const OrderEmptyList: FC = () => (
  <div className="px-4 py-6">
    <div className="flex flex-col items-center justify-center gap-3">
      <EmptyOrders />
      <h5 className="h6 text-center">Aún no has hecho ninguna compra</h5>
      <p className="text-secondary">Ve y busca uno de nuestros remates</p>
      <Button size="small" theme="primary" text="Ir a comprar" href="/remates" />
    </div>
  </div>
);

export default OrderEmptyList;
