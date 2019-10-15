import { useEffect } from 'react';
/**
 *卸载后执行，仅一次
 *
 * @param {*} fn
 */
const useUnmount = fn => {
  useEffect(() => fn(), [fn]);
};

export default useUnmount;
