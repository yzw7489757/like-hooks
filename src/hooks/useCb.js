import { useState, useRef, useEffect, useCallback } from 'react';
import { isOriginal, random } from '../utils';

const useCb = initialVal => {
  // eslint-disable-next-line prefer-const
  let [state, updateState] = useState(initialVal);
  const fn = useRef(null);
  const [randomDeps, setRandomDeps] = useState(random());
  updateState = useCallback(
    new Proxy(updateState, {
      apply(target, thisArg, argumentList) {
        const args = Array.prototype.slice.call(argumentList);
        if (isOriginal(args[0]) && args[0] === state) {
          setRandomDeps(random());
        }
        if (
          args.length > 1 &&
          typeof args.slice(-1)[0] === 'function'
        ) {
          fn.current = args.pop();
        }
        return target.apply(thisArg, args);
      },
    }),
    [],
  );
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    typeof fn.current === 'function' && fn.current();
  }, [state, randomDeps]);
  return [state, updateState];
};

export default useCb;
