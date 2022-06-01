// noinspection SpellCheckingInspection

import { NextWebVitalsMetric } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export const pageView = (url: string): void => {
  window?.dataLayer?.push?.({
    event: 'pageview',
    page: url,
  });
};

export const usePageView = () => {
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', pageView);
    return () => {
      router.events.off('routeChangeComplete', pageView);
    };
  }, [router.events]);
};

export const webVitals = ({ id, name, label, value }: NextWebVitalsMetric) => {
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
  const event = {
    event: name,
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  };
  window?.dataLayer?.push?.(event);
};
