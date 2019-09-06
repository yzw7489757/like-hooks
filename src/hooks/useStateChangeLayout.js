import { useState, useLayoutEffect } from 'react';

const useStateChangeLayout = (initialState, callback) => {
  const [state, setState] = useState(initialState);

  useLayoutEffect(() => callback(state), [state, callback]);

  return [state, setState];
};

export default useStateChangeLayout;
