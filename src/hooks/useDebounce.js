import { useRef, useEffect } from 'react';

const useDebounce = (fn, ms = 300, args) => {
  const pendingInput = useRef(true);
  useEffect(() => {
    let savedHandlerId;
    if (pendingInput.current) {
      pendingInput.current = false;
    } else {
      savedHandlerId = setTimeout(fn, ms);
    }
    return () => clearTimeout(savedHandlerId);
  }, [args, fn, ms]);
};
export default useDebounce;
