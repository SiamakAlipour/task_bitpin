/* eslint-disable no-undef */
export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const cDecoded = decodeURIComponent(document.cookie); // to be careful
  const ca = cDecoded.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return JSON.parse(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
};

export const setCookie = (name, value, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  const cookie = [name, '=', JSON.stringify(value), ';', expires, ';path=/'].join('');
  document.cookie = cookie;
};
