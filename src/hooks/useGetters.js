import { useState, useRef } from 'react';

const useGetter = (initial, fn) => {
  const [value, setVal] = useState(initial);
  const cb = useRef(fn);
  // eslint-disable-next-line no-param-reassign
  const obj = { ...value };
  Object.keys(obj).forEach(name => {
    Object.defineProperty(obj, name, {
      get() {
        if (typeof cb.current === 'function') cb.current();
        return value[name];
      },
    });
  });

  return [obj, setVal];
};

export default useGetter;
