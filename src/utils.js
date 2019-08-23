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
  return o - o === 0 && !(isPlainObject(o) && Array.isArray(o));
};
