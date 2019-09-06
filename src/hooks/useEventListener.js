import { useEffect, useRef } from 'react';

function useEventListener(eventName, handler, target = window) {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = event => savedHandler.current(event);
    target.addEventListener(eventName, eventListener);
    return () => {
      target.removeEventListener(eventName, eventListener);
    };
  }, [eventName, target]);
}

export default useEventListener;
