import React, { FC, useEffect, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { InputField } from '~/components/common';
import useDebounceEffect from '~/hooks/useDebounceEffect';

interface Value {
  min?: number;
  max?: number;
}

interface Props {
  value?: { min: string; max: string };
  onChange?: (value?: Value) => void;
}

const PriceRangeInput: FC<Props> = ({ onChange, value }) => {
  const [min, setMin] = useState<number | undefined>(
    !isNaN(parseFloat(value?.min || '-')) ? parseFloat(value?.min || '0') : undefined,
  );
  const [max, setMax] = useState<number | undefined>(
    !isNaN(parseFloat(value?.min || '-')) ? parseFloat(value?.min || '0') : undefined,
  );

  useEffect(() => {
    setMin(!isNaN(parseFloat(value?.min || '0')) ? parseFloat(value?.min || '0') : undefined);
    setMax(!isNaN(parseFloat(value?.max || '-')) ? parseFloat(value?.max || '0') : undefined);
  }, [value]);

  useDebounceEffect<number | undefined>(
    (debouncedMin, debouncedMax) => {
      if (
        typeof onChange === 'function' &&
        (debouncedMin !== value?.min || debouncedMax !== value?.max)
      ) {
        if ((debouncedMax || 0) >= (debouncedMin || 0)) {
          onChange({ min: debouncedMin, max: debouncedMax });
        } else if (debouncedMin && !debouncedMax) {
          onChange({ min: debouncedMin });
        }
      }
    },
    1000,
    [min, max],
  );

  return (
    <>
      <div className="flex items-center gap-2">
        <InputField
          placeholder="Min"
          className="flex-1"
          value={min ?? ''}
          onChange={(e) => {
            if (!isNaN(parseFloat(e.target.value))) {
              setMin(parseFloat(e.target.value));
            } else if (!e.target.value) {
              setMin(undefined);
            }
          }}
        />
        <span>a</span>
        <InputField
          placeholder="Max"
          className="flex-1"
          value={max ?? ''}
          onChange={(e) => {
            if (!isNaN(parseFloat(e.target.value))) {
              if (min === undefined) setMin(0);
              setMax(parseFloat(e.target.value));
            } else if (!e.target.value) {
              if (min === undefined) setMin(0);
              setMax(undefined);
            }
          }}
        />
        <CloseOutlined
          role="button"
          onClick={() => {
            setMin(undefined);
            setMax(undefined);
            if (typeof onChange === 'function') onChange();
          }}
        />
      </div>
      {!!max && (min || 0) > (max || 0) && (
        <div className="text-danger mt-2 text-sm">
          El precio máximo debe ser mayo o igual al precio mínimo
        </div>
      )}
    </>
  );
};

export default PriceRangeInput;
