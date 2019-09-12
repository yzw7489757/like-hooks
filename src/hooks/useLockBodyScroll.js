import { useLayoutEffect } from 'react';
/**
 * 锁定body滚动条，多用于modal，后台...
 */
const useLockBodyScroll = () => {
  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
};
export default useLockBodyScroll;
