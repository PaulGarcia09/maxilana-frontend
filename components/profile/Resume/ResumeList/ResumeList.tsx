import { FC, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { Order } from '~/types/Models';
import { useRouter } from 'next/router';
import { PawnAccount } from '~/types/Models';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { formatPrice } from '~/modules/hooks/usePrice';
interface Props {
  data: PawnAccount[];
}

type Status = 'idle' | 'selection';

const ResumeList: FC<Props> = ({ data }) => {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<Status>('idle');
  const [checkedState, setCheckedState] = useState<boolean[]>([]);
  const [ballots, setBallotsToPay] = useState<PawnAccount[]>(data);
  let Count = ballots.length;
  let User = capitalizarPalabras(ballots[0].name);
  let totalRef = 0;
  let totalPre = 0;
  let totalDes = 0;
  let totalDescNocom = 0;
  let strTotalDesempeno = ''; //;
  let strTotalPrestamo = ''; //;
  let strTotalRefrendo = ''; //;
  console.log(ballots);
  ballots.forEach((ball) => {
    totalRef = totalRef + ball.paymentAmount;
    strTotalRefrendo = formatPrice({ amount: totalRef, locale: LOCALE });

    totalPre = totalPre + ball.loanAmount;
    strTotalPrestamo = formatPrice({ amount: totalPre, locale: LOCALE });

    (totalDescNocom = totalDescNocom + ((ball?.paymenAmounNocomision as number) ?? 0)),
      (totalDes = totalDescNocom + totalPre);
    strTotalDesempeno = formatPrice({ amount: totalDes, locale: LOCALE });
  });
  const LOCALE = 'es-MX';
  function capitalizarPalabras(val: string) {
    return val
      .toLowerCase()
      .trim()
      .split(' ')
      .map((v) => v[0].toUpperCase() + v.substring(1))
      .join(' ');
  }
  return (
    <>
      <table className="w-full table-auto border-collapse text-sm text-secondary">
        <tbody>
          <tr>
            <td className="p-4 border-b border-[#0C5E9C26]">Nombre del cliente</td>
            <td className="p-4 border-b border-[#0C5E9C26] text-right">{User}</td>
            <td className="md:w-2/12 border-b border-[#0C5E9C26]" />
          </tr>
          <tr>
            <td className="p-4 border-b border-[#0C5E9C26]">Empeños vigentes</td>
            <td className="p-4 border-b border-[#0C5E9C26] text-right">{Count}</td>
            <td className="md:w-2/12 border-b border-[#0C5E9C26]" />
          </tr>
          <tr>
            <td className="p-4 border-b border-[#0C5E9C26]">Total de préstamo</td>
            <td className="p-4 border-b border-[#0C5E9C26] text-right">{strTotalPrestamo}</td>
            <td className="md:w-2/12 border-b border-[#0C5E9C26]" />
          </tr>
          <tr>
            <td className="p-4 border-b border-[#0C5E9C26]">Total para refrendar</td>
            <td className="p-4 border-b border-[#0C5E9C26] text-right">{strTotalRefrendo}</td>
            <td className="md:w-2/12 border-b border-[#0C5E9C26]" />
          </tr>
          <tr>
            <td className="p-4 border-b border-[#0C5E9C26]">Total para desempeñar</td>
            <td className="p-4 border-b border-[#0C5E9C26] text-right">{strTotalDesempeno}</td>
            <td className="md:w-2/12 border-b border-[#0C5E9C26]" />
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ResumeList;
