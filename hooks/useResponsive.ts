import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  let type;
  if (isMobile) type = 'mobile';
  if (isTablet) type = 'tablet';
  if (isDesktop) type = 'desktop';
  return { isMobile, isTablet, isDesktop, isNotMobile, type };
};

export default useResponsive;
