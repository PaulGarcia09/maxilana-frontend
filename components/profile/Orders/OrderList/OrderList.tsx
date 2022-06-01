import { FC } from 'react';
import Link from 'next/link';
import { Order } from '~/types/Models';

interface Props {
  data: Order[];
}

const OrderList: FC<Props> = ({ data }) => {
  return (
    <ul>
      {data.map((order) => (
        <li key={order.reference}>
          <Link href={`/perfil/pedido?id=${order.reference}`}>
            <a className="block border-b py-2 px-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-secondary"># Pedido</span>
                <span className="text-xs text-link uppercase">Ver detalle</span>
              </div>
              <div className="flex items-center">
                <span className="w-16 h-16 rounded-sm bg-gray-300 flex-shrink-0" />
                <div className="ml-4">
                  <p className="font-bold text-sm">{order.productName}</p>
                </div>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
