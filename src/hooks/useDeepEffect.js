import { useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';
import { isObject } from '../utils';
/**
 * 深对比版本useEffect
 *
 * @param {*} effect
 * @param {*} deps
 * @returns
 */
const useDeepEffect = (effect, deps) => {
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
  useEffect(effect, ref.current);
};

export default useDeepEffect;
