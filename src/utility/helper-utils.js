/**
 * helper method to compare two objects
 * @param {Object} a first object to compare
 * @param {Object} b second object to compare
 */
export const isEquivalent = (a, b) => {
  const aProps = Object.getOwnPropertyNames(a);
  const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
};

/**
 * converts the date object to required format
 * @param {Object} date the date to be formatted
 */
export const getFormattedDate = (date) => {
  const newDate = new Date(date.seconds * 1000);

  return (
    newDate.getFullYear().toString() +
    '-' +
    ('0' + (newDate.getMonth() + 1).toString()).substr(-2) +
    '-' +
    ('0' + newDate.getDate().toString()).substr(-2)
  );
};
