import { useEffect, useRef } from 'react';

function useEventListener(eventName, handler, target = window) {
  const memoHandler = useRef();
  useEffect(() => {
    memoHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = event => memoHandler.current(event);
    if ('current' in target && typeof target.current === 'object') {
      target.current.addEventListener(eventName, eventListener);
    } else {
      target.addEventListener(eventName, eventListener);
    }
    return () => {
      target.removeEventListener(eventName, eventListener);
    };
  }, [eventName, target]);
}

export default useEventListener;
