import { getKeys, hasProperty } from './utils';

const getComparisonResult = (oldObj = {}, newObj = {}) => {
  const mergedObject = { ...oldObj, ...newObj };
  const keys = getKeys(mergedObject);
  const compareValues = (obj1, obj2, key) => {
    if (!obj1 || !hasProperty(obj1, key)) return { status: 'added', changes: [{ value: obj2[key], status: 'added' }] };
    if (!obj2 || !hasProperty(obj2, key)) return { status: 'removed', changes: [{ value: obj1[key], status: 'removed' }] };
    if (obj1[key] === obj2[key]) return { status: 'unchanged', changes: null };
    if (typeof obj1[key] === typeof obj2[key] && typeof obj1[key] === 'object') return { status: 'unchanged', changes: null };
    return { status: 'changed', changes: [{ value: obj1[key], status: 'removed' }, { value: obj2[key], status: 'added' }] };
  };
  return keys.reduce((acc, key) => {
    if (typeof mergedObject[key] === 'object') {
      return {
        ...acc,
        children: [
          ...acc.children,
          {
            key,
            value: mergedObject[key],
            ...compareValues(oldObj, newObj, key),
            ...getComparisonResult(oldObj[key], newObj[key]),
          },
        ],
      };
    }
    return {
      ...acc,
      children: [
        ...acc.children,
        {
          key,
          value: mergedObject[key],
          ...compareValues(oldObj, newObj, key),
        },
      ],
    };
  }, { children: [] });
};

export default getComparisonResult;
