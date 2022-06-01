import { FC } from 'react';
import Link from 'next/link';

const ComissionsTable: FC = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto my-6">
        <table className="w-full table-auto text-center text-sm">
          <thead>
            <tr>
              <th className="sm:p-2 bg-surface-dark text-left text-xs">Plaza</th>
              <th className="sm:p-2 bg-surface-dark text-xs">
                <span className="text-base">CAT</span> Promedio
              </th>
              <th className="sm:p-2 bg-surface-dark text-xs">Costo Mensual Totalizado</th>
              <th className="sm:p-2 bg-surface-dark text-xs">Costo Diario Totalizado</th>
            </tr>
          </thead>
          <tbody>
            {comissions.map((item) => (
              <tr key={item.id}>
                <td className="p-2 bg-white border-surface-dark border-b-2 text-sm text-left">
                  {item.branch}
                </td>
                <td className="p-2 bg-white border-surface-dark border-b-2 text-sm">
                  {item.avgCat}
                </td>
                <td className="p-2 bg-white border-surface-dark border-b-2 text-sm">{item.cmt}</td>
                <td className="p-2 bg-white border-surface-dark border-b-2 text-sm">{item.cdt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-6xl mx-auto my-6">
        <div className="grid gap-4 text-center sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
          <div>
            <a
              href="http://www.banxico.org.mx/CAT/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-price hover:underline"
            >
              Calculadora de CAT
            </a>
          </div>
          <div>
            <a
              href="http://www.banxico.org.mx/ley-de-transparencia/consultas-frecuentes/costo-anual-total.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-price hover:underline"
            >
              Explicación y metodología del CAT
            </a>
          </div>
          <div>
            <a
              href="https://rpce.profeco.gob.mx/casa_empeno.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-price hover:underline"
            >
              Registro público de casas de empeño [RPCE-0338-2015]
            </a>
          </div>
          <div>
            <a
              href="/contratoadhesion.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-price hover:underline"
            >
              Contrato de adhesión registrado ante PROFECO
            </a>
          </div>
          <div>
            <Link href="/preguntas-frecuentes/empenos">
              <a className="text-xs text-price hover:underline">
                Explicación de operación y empeño
              </a>
            </Link>
          </div>
          <div>
            <Link href="/sucursales">
              <a className="text-xs text-price hover:underline">
                Horarios de operación, atención al cliente y aclaraciones
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const comissions = [
  {
    id: 1,
    branch: 'Culiacán',
    avgCat: '221.19%',
    cmt: '18.43%',
    cdt: '0.61%',
  },
  {
    id: 2,
    branch: 'Hermosillo',
    avgCat: '221.19%',
    cmt: '18.43%',
    cdt: '0.61%',
  },
  {
    id: 3,
    branch: 'Tijuana',
    avgCat: '234.88%',
    cmt: '19.57%',
    cdt: '0.65%',
  },
  {
    id: 4,
    branch: 'Mazatlán',
    avgCat: '225.28%',
    cmt: '18.77%',
    cdt: '0.63%',
  },
  {
    id: 5,
    branch: 'Guadalajara',
    avgCat: '225.28%',
    cmt: '18.77%',
    cdt: '0.63%',
  },
  {
    id: 6,
    branch: 'Mexicali',
    avgCat: '234.88%',
    cmt: '19.57%',
    cdt: '0.65%',
  },
];

export default ComissionsTable;
