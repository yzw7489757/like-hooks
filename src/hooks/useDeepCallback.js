import { useCallback, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { isObject } from '../utils';
/**
 * 深对比版本useCallback
 *
 * @param {*} effect
 * @param {*} deps
 * @returns
 */
const useDeepCallback = (effect, deps) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!deps || !deps.length) {
      console.warn(
        '`useDeepCompareEffect` should not be used with no dependencies. Use React.useEffect instead.',
      );
    }

    if (!deps.every(isObject)) {
      console.warn(
        '`useDeepCompareEffect` should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
      );
    }
  }
  const ref = useRef(undefined);
  if (!isEqual(deps, ref.current)) {
    ref.current = deps;
  }
  return useCallback(effect, ref.current);
};

export default useDeepCallback;
