import { useState } from 'react';
/**
 * auto Input Hooks
 * @param {*} initial Input初始值
 * @returns InputProps clear清空  replace(arg:any|Function)
 */
function useInput(initial) {
  const [value, setValue] = useState(initial);
  function onChange(event) {
    setValue(event.currentTarget.value);
  }
  const clear = () => {
    setValue('');
  };
  const replace = arg => {
    setValue(pre => (typeof arg === 'function' ? arg(pre) : arg));
  };
  return {
    bind: {
      value,
      onChange,
    },
    value,
    clear,
    replace,
  };
}

export default useInput;
