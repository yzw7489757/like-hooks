import { useState, useRef, useEffect, useMemo } from 'react';
import { isOriginal, random } from '../utils';

const useStateWithCb = initialVal => {
  const [state, setState] = useState(() => initialVal);
  const fn = useRef(null); // 保存 callback
  const [r, sr] = useState(() => random()); // 原始类型相同值 随机数标识
  const hijackSetState = useMemo(
    () =>
      new Proxy(setState, {
        apply(target, thisArg, argumentsList) {
          const args = Array.prototype.slice.call(argumentsList);
          if (isOriginal(args[0]) && args[0] === state) {
            sr(random()); // 相同值重置标识
          }
          if (args.length > 1 && typeof args.slice(-1)[0] === 'function') {
            fn.current = args.pop();
          }
          return target(...args);
        },
      }),
    [state],
  );

  useEffect(() => {
    if (typeof fn.current === 'function') fn.current(state, hijackSetState);
  }, [state, r, hijackSetState]);

  return [state, hijackSetState];
};
export default useStateWithCb;
