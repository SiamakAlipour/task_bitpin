import { getCookie } from 'utils/services/cookies';

/**
 * Takes a number and separated of numbers as string
 * @example
 * let a = 150005000
 * let example = handlePrice(a); // example will be 15,000,5000
 * @param {number} price
 * @returns {string} separated of numbers as string
 */
export const formatPrice = (price) => {
  const nf = new Intl.NumberFormat();
  return nf.format(price);
};

/**
 * Takes an id and check if cookie is exist
 * @param {*} id
 * @return {boolean} return true if exist
 */
export const checkCookieExist = (id) => {
  const cookies = getCookie('fav') || [];
  return cookies.some((cookie) => cookie.id === id);
};
