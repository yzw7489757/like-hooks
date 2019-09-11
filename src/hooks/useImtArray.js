import { useState, useCallback } from 'react';
/**
 * 通过二次封装数组，达到类似ImmutableArray效果
 * @param {*} initial
 * @returns
 */
const useImtArray = (initial = []) => {
  const [value, setValue] = useState(() => {
    if (!Array.isArray(initial)) {
      throw new Error(
        `useImtArray argument Expectations are arrays. Actually, they are${Object.prototype.toString.call(
          initial,
        )}`,
      );
    }
    return initial;
  });
  return {
    value,
    push: useCallback(val => setValue(v => [...v, val]), []),
    pop: useCallback(
      () => setValue(arr => arr.slice(0, arr.length - 1)),
      [],
    ),
    shift: useCallback(
      () => setValue(arr => arr.slice(1, arr.length)),
      [],
    ),
    unshift: useCallback(val => setValue(v => [val, ...v]), []),
    clear: useCallback(() => setValue(() => []), []),
    removeByVal: useCallback(
      val => setValue(arr => arr.filter(v => v !== val)),
      [],
    ),
    removeByIdx: useCallback(
      index =>
        setValue(arr =>
          arr.filter((v, idx) => parseInt(index, 10) !== idx),
        ),
      [],
    ),
  };
};

export default useImtArray;
