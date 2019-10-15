import { useSelector, shallowEqual } from 'react-redux';
/**
 * 浅对比，获取当前store.state
 *
 * @param {*} selector
 * @returns
 */
function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual);
}

export default useShallowEqualSelector;
