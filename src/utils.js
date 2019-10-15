export const random = () =>
  Math.random()
    .toString(36)
    .split('')
    .join('.')
    .substring(0, 7);
export function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}

export const isOriginal = o => {
  return typeof o === 'object' ? !o : typeof o !== 'function';
};

function forEach(array, iteratee) {
  let index = -1;
  const { length } = array;
  // eslint-disable-next-line no-plusplus
  while (++index < length) {
    iteratee(array[index], index);
  }
  return array;
}
export function isObject(target) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}
export function clone(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const isArray = Array.isArray(target);
    const cloneTarget = isArray ? [] : {};

    if (map.get(target)) {
      return map.get(target);
    }

    if (!isObject(target)) {
      return target;
    }
    map.set(target, cloneTarget);

    const keys = isArray ? target : Object.keys(target);
    forEach(keys, (value, key) => {
      if (keys) {
        // eslint-disable-next-line no-param-reassign
        key = value;
      }
      cloneTarget[key] = clone(target[key], map);
    });

    return cloneTarget;
  }
  return target;
}
