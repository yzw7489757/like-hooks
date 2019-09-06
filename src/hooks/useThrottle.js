import { useState, useRef, useEffect } from 'react';

const useThrottle = (fn, args, timing = 300) => {
  const [state, setState] = useState(() => fn(...args));
  const timeout = useRef(null);
  const lastArgs = useRef(null); // 最近一次参数
  const hasChanged = useRef(false); // 是否有更新
  useEffect(() => {
    if (!timeout.current) {
      const timeoutHandler = () => {
        if (hasChanged.current) {
          // 有更新，立即更新并再启动一次，否则放弃更新
          hasChanged.current = false;
          setState(() => fn(...lastArgs.current));
          timeout.current = setTimeout(timeoutHandler, timing);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutHandler, timing);
    } else {
      lastArgs.current = args; // 更新最新参数
      hasChanged.current = true; // 有更新任务
    }
  }, [args, fn, timing]);
  return state;
};

export default useThrottle;
