import { useEffect, useRef } from 'react';

function useEventListener(eventName, handler, target = window) {
  const memoHandler = useRef();
  useEffect(() => {
    memoHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = event => memoHandler.current(event);
    const targetEl =
      'current' in target && typeof target.current === 'object' ? target.current : target;
    targetEl.addEventListener(eventName, eventListener);
    return () => {
      targetEl.removeEventListener(eventName, eventListener);
    };
  }, [eventName, target]);
}

export default useEventListener;
