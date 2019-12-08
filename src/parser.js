const compare = (oldObj = {}, newObj = {}) => {
  const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  const unitedObject = { ...oldObj, ...newObj };
  const keys = Object.keys(unitedObject);
  const compareValues = (obj1, obj2, key) => {
    if (!obj1 || !hasProperty(obj1, key)) return [{ value: obj2[key], status: 'added' }];
    if (!obj2 || !hasProperty(obj2, key)) return [{ value: obj1[key], status: 'removed' }];
    if (obj1[key] === obj2[key]) return obj1[key];
    return [{ status: 'removed', value: obj1[key] }, { status: 'added', value: obj2[key] }];
  };
  return keys.reduce((acc, key) => (typeof unitedObject[key] === 'object'
    ? { ...acc, [key]: compare(oldObj[key], newObj[key]) }
    : { ...acc, [key]: compareValues(oldObj, newObj, key) }), {});
};

export default compare;
