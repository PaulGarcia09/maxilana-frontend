import omit from 'lodash.omit';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { FC } from 'react';
import { formatPrice } from '~/modules/hooks/usePrice';
import { Branch, City } from '~/types/Models';
import { Tag } from '~/components/ui';
import parseQuery from '~/utils/parseQuery';

interface Props {
  city?: City | null;
  branch?: Branch | null;
  onFiltersChange: (filters: ParsedUrlQuery) => void;
}

const AppliedFilters: FC<Props> = ({ city, branch, onFiltersChange }) => {
  const { query, push } = useRouter();

  return (
    <div className="my-4 gap-2 flex overflow-x-auto pb-2 flex-wrap">
      {!!city && (
        <Tag
          closable
          onClick={() => onFiltersChange(omit(query, 'ciudad'))}
          className="whitespace-nowrap"
        >
          <strong>Ciudad:</strong> {city?.name}
        </Tag>
      )}
      {!!branch && (
        <Tag
          closable
          onClick={() => onFiltersChange(omit(query, 'sucursal'))}
          className="whitespace-nowrap"
        >
          <strong>Sucursal:</strong> {branch?.name}
        </Tag>
      )}
      {(() => {
        if (query?.min && query?.max) {
          return (
            <Tag
              closable
              onClick={() => onFiltersChange(omit(query, 'min', 'max'))}
              className="whitespace-nowrap"
            >
              Precio:{' '}
              {formatPrice({
                amount: parseFloat(query?.min as string),
                locale: 'MXN',
              })}{' '}
              -{' '}
              {formatPrice({
                amount: parseFloat(query?.max as string),
                locale: 'MXN',
              })}
            </Tag>
          );
        } else if (query?.min) {
          return (
            <Tag
              closable
              onClick={() => onFiltersChange(omit(query, 'min', 'max'))}
              className="whitespace-nowrap"
            >
              Precio Mayor a
              {formatPrice({
                amount: parseFloat(query?.min as string),
                locale: 'MXN',
              })}
            </Tag>
          );
        }
      })()}
      {query?.vtalinea && (
        <Tag
          closable
          onClick={() => onFiltersChange(omit(query, 'vtalinea'))}
          className="whitespace-nowrap"
        >
          {query?.vtalinea === '1' ? 'Venta' + ' en' + ' linea' : 'Venta' + ' en' + ' sucursal'}
        </Tag>
      )}
    </div>
  );
};

export default AppliedFilters;
