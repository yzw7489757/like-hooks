import { useRef, useEffect } from 'react';
import { random } from '../utils';

const usePrevious = value => {
  const r = useRef(random());
  const ref = useRef(Symbol.for(r.current));

  useEffect(() => {
    ref.current = value;
  });
  return Symbol.for(r.current) === ref.current ? value : ref.current;
};
export default usePrevious;
