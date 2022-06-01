import Script from 'next/script';
import { GTM_ID } from '~/utils/gtm';

const MarketingScripts = () => {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="GTM"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function __loadGtag() {
              setTimeout(function (){
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer', '${GTM_ID}');
              },100); 
            }
            window.addEventListener('scroll', __loadGtag, { once: true });
          `,
        }}
      />
      {/* Chat twak.to */}
      <Script
        id="TAWK.TO"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          /*language=css*/
          __html: `
            function __loadTawkTo() {
              setTimeout(function (){
                window.Tawk_API = window.Tawk_API || {}
                  window.Tawk_LoadStart = new Date();
                  var s1 = document.createElement('script'),
                      s0 = document.getElementsByTagName('script')[0];
                  s1.async = true;
                  s1.src = '${process.env.NEXT_PUBLIC_TWAK_TO_SRC}';
                  s1.charset = 'UTF-8';
                  s1.setAttribute('crossorigin', '*');
                  s0.parentNode.insertBefore(s1, s0);
              },100);
            }
            window.addEventListener('scroll', __loadTawkTo, { once: true });
          `,
        }}
      />
    </>
  );
};

export default MarketingScripts;
