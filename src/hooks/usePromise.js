import { useState, useEffect, useCallback } from 'react';

const usePromise = (fn, args) => {
  const [state, setState] = useState({ loading: true });
  const memoPromise = useCallback(fn, args);

  useEffect(() => {
    let pending = true;
    memoPromise()
      .then(value => {
        if (pending) {
          setState({
            loading: false,
            value,
          });
        }
      })
      .catch(error => {
        if (pending) {
          setState({
            loading: false,
            error,
          });
        }
      });

    return () => {
      pending = false;
    };
  }, [memoPromise]);

  return state;
};

export default usePromise;
