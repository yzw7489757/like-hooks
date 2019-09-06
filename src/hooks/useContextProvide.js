import React, {
  useLayoutEffect,
  // useState,
  useReducer,
  useContext,
  // useMemo,
} from 'react';

const Context = React.createContext([{}, () => {}]);

// const Provider = ({ children }) => {
//   const state = useState({});
//   const value = useMemo(() => state, [state]);
//   return (
//     <Context.Provider value={value}>{children}</Context.Provider>
//   );
// };

function useContextReducer(
  contextKey,
  reducer,
  initialState,
  initialAction,
) {
  const [contextState, setContextState] = useContext(Context);
  let [state] = useReducer(reducer, initialState, initialAction);

  if (contextState[contextKey] != null) {
    state = contextState[contextKey];
  }

  const dispatch = action =>
    setContextState(prevState => ({
      ...prevState,
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
