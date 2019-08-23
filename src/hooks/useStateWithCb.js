import { useState, useEffect, useLayoutEffect } from 'react';

const useStateWithCb = (initialVal, callback) => {
  const [state, setState] = useState(initialVal);

  useEffect(() => callback(state), [state, callback]);
  return [state, setState];
};
const useStateWithCbInstant = (initialVal, callback) => {
  const [state, setState] = useState(initialVal);

  useLayoutEffect(() => callback(state), [state, callback]);
  return [state, setState];
};

export { useStateWithCb, useStateWithCbInstant };
