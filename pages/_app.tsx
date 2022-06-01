import { getElementsByTagName } from 'domutils';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import NextNprogress from 'nextjs-progressbar';
import { useEffect } from 'react';
import MarketingScripts from '~/components/common/MarketingScripts';
import useEffectOnUpdate from '~/hooks/useEffectOnUpdate';
import usePageCss from '~/hooks/usePageCss';

import { usePageView, webVitals } from '~/utils/gtm';

import 'dayjs/locale/es';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  usePageCss(pageProps?.css);

  return (
    <>
      {/* Google Tag Manager - Global base code */}
      <MarketingScripts />
      <Component {...pageProps} />
      <NextNprogress
        color="#FDD426"
        startPosition={0.3}
        stopDelayMs={200}
        height={5}
        showOnShallow
      />
    </>
  );
}

export function reportWebVitals(metrics: NextWebVitalsMetric) {
  webVitals(metrics);
}

export default MyApp;
