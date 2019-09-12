/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useLayoutEffect, useState, useReducer, useContext, useMemo } from 'react';

const Context = React.createContext([{}, () => {}]);

export const Provider = ({ children }) => {
  const state = useState({});
  const value = useMemo(() => state, [state]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
/**
 *
 *
 * @param {String} contextKey 上下文键
 * @param {Function} reducer reducer函数
 * @param {Object} initialState 初始值
 * @param {Function} initialAction 初始过滤
 * @returns
 */
function useContextReducer(contextKey, reducer, initialState, initialAction) {
  // 创建context
  const [contextState, setContextState] = useContext(Context);

  // 创建store
  let [state] = useReducer(reducer, initialState, initialAction);

  if (contextState[contextKey]) {
    state = contextState[contextKey];
  }

  const dispatch = action =>
    setContextState(prevState => ({
      ...prevState,
      // dispatch
      [contextKey]: reducer(prevState[contextKey], action),
    }));

  useLayoutEffect(() => {
    if (contextState[contextKey] == null && state != null) {
      setContextState(prevState => {
        if (prevState[contextKey] == null) {
          return { ...prevState, [contextKey]: state };
        }
        return prevState;
      });
    }
  }, [contextKey, contextState, setContextState, state]);

  return [state, dispatch];
}

export default useContextReducer;
