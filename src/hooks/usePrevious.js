import { useRef, useEffect } from 'react';
import { random } from '../utils';

const usePrevious = (value, initEqual = true) => {
  const r = useRef(random());
  const ref = useRef(Symbol.for(r.current));

  useEffect(() => {
    ref.current = value;
  });
  return Symbol.for(r.current) === ref.current && initEqual ? value : ref.current;
};
export default usePrevious;
