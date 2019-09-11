/* eslint-disable guard-for-in */
import { useLayoutEffect } from 'react';
/**
 * 更换主题
 * @param {*} theme 主题数据
 */
const useTheme = theme => {
  useLayoutEffect(() => {
    // eslint-disable-next-line guard-for-in
    // eslint-disable-next-line no-restricted-syntax
    for (const key in theme) {
      document.documentElement.style.setProperty(
        `--${key}`,
        theme[key],
      );
    }
  }, [theme]);
};

export default useTheme;
