import { useEffect, useRef, useState } from 'react';

const useThrottleVal = (value, ms = 200) => {
  const [state, setState] = useState(value);
  const timeout = useRef();
  const lastVal = useRef(null);
  const hasChanged = useRef(false); // 最后更新

  useEffect(() => {
    if (!timeout.current) {
      // 如果当前没定时
      setState(value); // 直接更新值
      const timeoutCallback = () => {
        if (hasChanged.current) {
          // 如果最后已经有更新
          hasChanged.current = false;
          setState(lastVal.current); //
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms); // 启动定时
    } else {
      lastVal.current = value;
      hasChanged.current = true;
    }
  }, [ms, value]);

  useEffect(() => () => timeout.current && clearTimeout(timeout.current), []);

  return state;
};

export default useThrottleVal;
