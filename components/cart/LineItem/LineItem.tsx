import { FC, useState } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';

import { Button, Img, Tooltip } from '~/components/ui';
import useRemoveItem from '~/hooks/cart/useRemoveItem';
import { usePrice } from '~/modules/hooks';
import { formatPrice } from '~/modules/hooks/usePrice';
import { CartProduct } from '~/types/Models';

interface Props {
  data: CartProduct;
}

const LineItem: FC<Props> = ({ data }) => {
  const removeItem = useRemoveItem();
  const [removing, setRemoving] = useState(false);
  const { price } = usePrice({ amount: data?.price });
  const insurance = data?.insurance ?? 0;

  const handleRemove = async () => {
    setRemoving(true);

    try {
      await removeItem(data.id);
      setRemoving(false);
    } catch (error) {
      setRemoving(false);
      console.log(error);
    }
  };

  return (
    <div className="p-4 flex flex-row space-x-4">
      <div>
        <Img
          src={data.image}
          width={132}
          height={132}
          objectFit="cover"
          placeholder="empty"
          alt={`Thumbnail de producto: ${data.name}`}
        />
      </div>
      <div className="space-y-2">
        <h2 className="h6">{data.name}</h2>
        <p className="text-secondary text-sm">{`Código: ${data.id}`}</p>
        <p className="text-secondary text-sm">Precio: {price}</p>
        {insurance > 0 && (
          <Tooltip text="Seguro para joyería y articulos con precio mayor a $10,000. Se aplica al envio.">
            <p className="flex items-center text-sm text-secondary">
              <span className="mr-1">
                {`Seguro: ${formatPrice({ amount: insurance, locale: 'es-MX' })}`}
              </span>
              <InfoCircleOutlined />
            </p>
          </Tooltip>
        )}
        <Button
          size="small"
          theme="danger"
          variant="link"
          loading={removing}
          text={removing ? 'Eliminando...' : 'Eliminar'}
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default LineItem;
