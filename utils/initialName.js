/**
 * @description     set initial name for avatar
 * @param           {String} fullname - String
 * @returns         intialname - e.g: "John Doe" to "JD"
 */
function initialName(fullname) {
  if (typeof fullname !== 'string')
    throw new Error('fullname should be string');

  const splitName = fullname.split(' ');

  if (splitName.length === 1) {
    const initial = splitName[0].charAt(0).toUpperCase();

    return initial;
  }

  if (splitName.length > 2) {
    const firstInitial = splitName[0].charAt(0).toUpperCase();
    const secondInitial = splitName[1].charAt(0).toUpperCase();

    // result
    const initial = firstInitial + secondInitial;

    return initial;
  }

  const firstInitial = splitName[0].charAt(0).toUpperCase();
  const secondInitial = splitName[1].charAt(0).toUpperCase();

  // result
  const initial = firstInitial + secondInitial;

  return initial;
}

export default initialName;
