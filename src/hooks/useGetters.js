import { useMemo, useRef } from 'react';
import { clone, isPlainObject } from '../utils';
/**
 * 监听对象属性被读取
 * @param {*} watcher 监听对象
 * @param {*} fn 回调
 */
const useGetter = (watcher, fn) => {
  if (!isPlainObject(watcher)) {
    throw new Error(
      `Expectation is the object, the actual result ${Object.prototype.toString.call(watcher)}`,
    );
  }
  const value = useMemo(() => watcher, [watcher]);
  const cloneVal = useMemo(() => clone(watcher), [watcher]);
  const cb = useRef(fn);

  Object.keys(cloneVal).forEach(name => {
    Object.defineProperty(value, name, {
      get() {
        if (typeof cb.current === 'function') cb.current(name, cloneVal);
        return cloneVal[name];
      },
    });
  });
};

export default useGetter;
