/**
 * general Utils functions for the App
 */


/**
 * @type { Array<obj> } urlParams
 * this method returns the elements of a url searh from react-router DOM
 * and making those object properties
 * @param {string} url string from the Url after questionMark (?) parameters.
 * @example:
 * const url = ?string=text&foo=bard
 * const queryParams = urlParams(url)
 * queryParams = {
 * string: text
 * foo : bar
 * }
 * @return {obj} object with all properties in key:value after the question mark (?) from the URL
 */
const GetUrlParams = (url) => url.substring(1).split('&').reduce((obj, queryParam) => {
  const paramKeyVal = queryParam.split('=');
  // eslint-disable-next-line no-param-reassign
  obj[paramKeyVal[0]] = decodeURIComponent(paramKeyVal[1]);
  return obj;
}, {});

const stringAnnoy = 'string';

export {
  GetUrlParams,
  stringAnnoy,
};
