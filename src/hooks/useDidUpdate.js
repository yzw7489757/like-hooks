import { useRef, useEffect } from 'react';
/**
 * 在首次外触发effects
 *
 * @param {*} fn
 * @param {*} [deps=[]]
 */
function useDidUpdate(fn, deps = []) {
  const refTimes = useRef(0);
  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    if (refTimes.current++ > 0) {
      if (typeof fn === 'function') fn();
    }
  }, [fn, ...deps]);
}

export default useDidUpdate;
