import { useState, useCallback } from 'react';

const useImtArray = initial => {
  const [value, setValue] = useState(initial);
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
      index => setValue(arr => arr.filter((v, idx) => index !== idx)),
      [],
    ),
  };
};

export default useImtArray;
