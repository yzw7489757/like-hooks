import { useEffect } from 'react';

const useLifecycles = (mount, unmount) => {
  useEffect(() => {
    if (typeof mount === 'function') mount();
    return () => {
      if (typeof unmount === 'function') unmount();
    };
  }, [mount, unmount]);
};

export default useLifecycles;
