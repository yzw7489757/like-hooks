import { useRef, useCallback, useEffect } from 'react';

const useRaf = callback => {
  const requestRef = useRef(); // 储存RequestAnimationFrame返回的id
  const previousTimeRef = useRef(); // 每次耗时间隔

  const animate = useCallback(
    time => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current; // 耗时间隔
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback],
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  const stopRaf = useCallback(() => {
    cancelAnimationFrame(requestRef.current);
    requestRef.current = null;
  }, []);

  const restartRaf = useCallback(() => {
    if (requestRef.current === null) {
      requestAnimationFrame(animate);
    }
  }, [animate]);

  return [restartRaf, stopRaf];
};
export default useRaf;
