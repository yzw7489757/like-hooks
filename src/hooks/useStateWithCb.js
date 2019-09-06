import { useState, useRef, useEffect } from 'react';
import { isOriginal, random } from '../utils';

const useStateWithCb = initialVal => {
  // eslint-disable-next-line prefer-const
  let [state, setState] = useState(initialVal);
  const fn = useRef(null);
  const [r, sr] = useState(random());
  setState = new Proxy(setState, {
    apply(target, thisArg, argumentsList) {
      const args = Array.prototype.slice.call(argumentsList);
      if (isOriginal(args[0]) && args[0] === state) {
        sr(random());
      }
      if (
        args.length > 1 &&
        typeof args.slice(-1)[0] === 'function'
      ) {
        // eslint-disable-next-line prefer-destructuring
        fn.current = args.pop();
      }
      return target(...args);
    },
  });

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    typeof fn.current === 'function' && fn.current(state);
  }, [state, r]);

  return [state, setState];
};
export default useStateWithCb;
