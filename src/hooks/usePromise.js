import { useState, useEffect, useCallback } from 'react';
/**
 * 简化Promise
 * @param {*} fn Promise函数
 * @param {*} [args=[]] 依赖更新参数
 * @returns loading:加载状态,value:成功状态的值,error:失败状态的值
 */
const usePromise = (fn, args = []) => {
  const [state, setState] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoPromise = useCallback(() => fn(), args);

  useEffect(() => {
    let pending = true; // 防止多次触发
    setState(newestState => ({ ...newestState, loading: true }));
    Promise.resolve(memoPromise())
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
