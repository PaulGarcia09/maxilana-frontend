import { City, CMSLegal } from '~/types/Models';

const empresa = {
  id: 1,
  label: 'Empresa',
  href: '/empresa',
  children: [
    {
      id: 1,
      label: 'Inicio',
      href: '/',
    },
    {
      id: 2,
      label: 'Quiénes Somos',
      href: '/empresa',
    },
    {
      id: 3,
      label: 'Empleos',
      href: '/empleos',
    },
    {
      id: 4,
      label: 'Contacto',
      href: '/contacto',
    },
  ],
};

const servicios = {
  id: 2,
  label: 'Servicios',
  children: [
    {
      id: 1,
      label: 'Empeños',
      href: '/empeno',
    },
    {
      id: 2,
      label: 'Préstamos',
      href: '/prestamos-personales',
    },
    {
      id: 3,
      label: 'Maxilana Vales',
      href: '/vales',
    },
    {
      id: 4,
      label: 'Remates',
      href: '/remates',
    },
    {
      id: 5,
      label: 'Otros Servicios',
      href: '/otros-servicios',
    },
  ],
};

const recursos = {
  id: 5,
  label: 'Recursos',
  children: [
    {
      id: 1,
      label: 'Pago en línea',
      href: '/pagos',
    },
    {
      id: 2,
      label: 'Facturación',
      href: 'http://facturacion.maxilana.com/',
      target: '_blank',
      rel: 'noreferer',
    },
    {
      id: 3,
      label: 'Ayuda y Soporte',
      href: '/preguntas-frecuentes',
    },
  ],
};

const footerMenu = (cities: City[], legalPages: Partial<CMSLegal>[]) => {
  const sucursales = {
    id: 3,
    label: 'Sucursales',
    href: '/sucursales',
    children: cities?.length
      ? cities.map((item) => ({
          id: item.id,
          label: item?.name,
          href: `/sucursales/ciudad/${item.slug}`,
        }))
      : [],
  };

  const legal = {
    id: 4,
    label: 'Legal',
    children: [
      ...(legalPages?.map?.((item) => ({
        id: item.id,
        label: item.title,
        href: `/legal/${item.slug}`,
      })) || []),
      {
        id: 3,
        label: 'Contrato de adhesión',
        href: '/contratoadhesion.pdf',
        target: '_blank',
      },
      {
        id: 4,
        label: 'Registro Público',
        href: 'https://rpce.profeco.gob.mx/casa_empeno.php',
      },
    ],
  };
  return [empresa, servicios, sucursales, legal, recursos];
};

export default footerMenu;
