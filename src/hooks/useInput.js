import { useState } from 'react';

function useInput(initial) {
  const [value, setValue] = useState(initial);
  function onChange(event) {
    setValue(event.currentTarget.value);
  }
  return {
    value,
    onChange,
  };
}

export default useInput;
