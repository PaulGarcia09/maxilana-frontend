import useEffectOnUpdate from '~/hooks/useEffectOnUpdate';

const addCSS = (css: string[]) => {
  const loadedCss = Array.from(document.head.getElementsByClassName('extra-css')).map(
    (item) => item.id,
  );
  css.forEach((item: string) => {
    if (!loadedCss.includes(item)) {
      const linkElement = document.createElement('link');
      linkElement.id = item;
      linkElement.href = item;
      linkElement.rel = 'stylesheet';
      linkElement.type = 'text/css';
      document.head.appendChild(linkElement);
    }
  });
};

const usePageCss = (css: string[]) => {
  useEffectOnUpdate(() => {
    if (css?.length) {
      addCSS(css);
    }
  }, [css]);
};

export default usePageCss;
