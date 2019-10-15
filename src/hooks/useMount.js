import { useEffect } from 'react';
/**
 *挂载后执行，仅一次
 *
 * @param {*} fn
 */
const useMount = fn => {
  useEffect(() => {
    fn();
  }, [fn]);
};

export default useMount;
