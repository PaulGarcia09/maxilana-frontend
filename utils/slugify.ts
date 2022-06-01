type Slugify = (
  str: string,
  options?: { replacement?: string; lower?: boolean; trim?: boolean; strict?: boolean },
) => string;

const slugify: Slugify = (
  str = '',
  { replacement = '-', lower = true, trim = true, strict = true } = {},
) => {
  let result = str;
  if (trim) result = result.replace(/^\s+|\s+$/g, '');
  if (lower) result = result.toLowerCase();

  if (strict) {
    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0; i < from.length; i++) {
      result = result.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  }

  result = result
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, replacement) // collapse whitespace and replace by -
    .replace(/-+/g, replacement); // collapse dashes

  return result;
};
export default slugify;
