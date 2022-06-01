// @ts-check
const withPreact = require('next-plugin-preact');
const nextBuildId = require('next-build-id');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const buildId = nextBuildId.sync({ dir: __dirname });

if (!process.env.IMAGES_DOMAINS) throw Error('Environment variable IMAGES_DOMAINS is missing');
if (!process.env.IMAGES_DEVICE_SIZES) {
  throw Error('Environment variable IMAGES_DEVICE_SIZES is missing');
}
if (!process.env.IMAGES_SIZES) throw Error('Environment variable IMAGES_SIZES is missing');

if (!`${process.env.IMAGES_DOMAINS}`.includes('maps.googleapis.com')) {
  throw Error('Environment variable IMAGES_DOMAINS not includes maps.googleapis.com');
}
if (!`${process.env.IMAGES_DOMAINS}`.includes('img.youtube.com')) {
  throw Error('Environment variable IMAGES_DOMAINS not includes img.youtube.com');
}

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  generateBuildId: () => buildId,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: process.env.OPTIMIZE_CSS === 'true',
  },
  images: {
    domains: process.env.IMAGES_DOMAINS.split(','),
    deviceSizes: process.env.IMAGES_DEVICE_SIZES.split(',').map((item) => parseInt(item)),
    imageSizes: process.env.IMAGES_SIZES.split(',').map((item) => parseInt(item)),
    formats: ['image/avif', 'image/webp'],
  },
  redirects() {
    const externalLegacyPaths = [
      'autoclavepp',
      'busquedaarticulos',
      'consultarventas',
      'costoenvios',
      'descuentosremates',
      'direccionessucursales',
      'fotosremates',
      'informacionsucursales',
      'sinonimosremates',
      'subasta',
    ];
    return [
      ...externalLegacyPaths.map((item) => ({
        source: `/${item}`,
        destination: `https://consola.maxilana.com/${item}`,
        permanent: true,
      })),
      // URLS del sitio viejo
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/somos.html',
        destination: '/empresa',
        permanent: true,
      },
      {
        source: '/servicios.html',
        destination: '/otros-servicios',
        permanent: true,
      },
      {
        source: '/preguntas.html',
        destination: '/ayuda-soporte',
        permanent: true,
      },
      {
        source: '/sucursales.html',
        destination: '/sucursales',
        permanent: true,
      },
      {
        source: '/sucursales.html',
        destination: '/sucursales',
        permanent: true,
      },
      {
        source: '/tijuana.php',
        destination: '/sucursales/ciudad/tijuana',
        permanent: true,
      },
      {
        source: '/hermosillo.php',
        destination: '/sucursales/ciudad/hermosillo',
        permanent: true,
      },
      {
        source: '/culiacan.php',
        destination: '/sucursales/ciudad/culiacan',
        permanent: true,
      },
      {
        source: '/mazatlan.php',
        destination: '/sucursales/ciudad/mazatlan',
        permanent: true,
      },
      {
        source: '/guadalajara.php',
        destination: '/sucursales/ciudad/guadalajara',
        permanent: true,
      },
      {
        source: '/mexicali.php',
        destination: '/sucursales/ciudad/mexicali',
        permanent: true,
      },
      {
        source: '/contacto.php',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/empeno/index.php',
        destination: '/empeno',
        permanent: true,
      },
      {
        source: '/boleta.php',
        destination: '/pagos/pagar-empeno-maxilana',
        permanent: true,
      },
      {
        source: '/solicitudauto.php',
        destination: '/empeno/auto',
        permanent: true,
      },
      {
        source: '/sucursales.html',
        destination: '/sucursales',
        permanent: true,
      },
      {
        source: '/requisitos.php',
        destination: '/prestamos-personales',
        permanent: true,
      },
      {
        source: '/sucursales.html',
        destination: '/sucursales',
        permanent: true,
      },
      {
        source: '/aviso-de-privacidad',
        destination: '/legal/aviso-de-privacidad',
        permanent: true,
      },
      {
        source: '/terminos-y-condiciones.html',
        destination: '/legal/terminos-y-condiciones',
        permanent: true,
      },
      {
        source: '/prestamos.php',
        destination: '/pagos',
        permanent: true,
      },
    ];
  },
  rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap',
      },
      {
        source: '/api/:path*',
        destination: 'https://consola.maxilana.com/api/:path*',
      },
      {
        source: '/images/:path*',
        destination: 'https://consola.maxilana.com/images/:path*',
      },
      {
        source: '/subasta/:path*',
        destination: 'https://consola.maxilana.com/subasta/:path*',
      },
    ];
  },
};

module.exports = withPreact(withBundleAnalyzer(nextConfig));
