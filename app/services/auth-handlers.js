import Cookies from 'js-cookie';
/**
 * declartions of session client handlers by
 * SessionStorage
 * LocalStorage
 * js-cookie
 * @see https://www.npmjs.com/package/js-cookie
 */
export default () => {
  const sessionStorage = {
    save: (key, value) => {
      // Save data to sessionStorage
      window.sessionStorage.setItem(key, value);
    },
    get: (key) => window.sessionStorage.getItem(key),

    remove: (key) => {
      window.sessionStorage.removeItem(key);
    },
  };
  const localStorage = {
    save: (key, value) => {
      // Save data to localStorage
      localStorage.setItem(key, value);
    },
    get: (key, value) => {
      // Save data to localStorage
      localStorage.getItem(key, value);
    },
    remove: (key) => {
      localStorage.removeItem(key);
    },
  };
  const cookie = {
    save: (key, value, expire) => {
      // Save data to localStorage
      Cookies.set(key, value, expire);
    },
    get: (key, value) => {
      // Save data to localStorage
      Cookies.get(key, value);
    },
    remove: (key) => {
      Cookies.remove(key);
    },
  };
  return {
    sessionStorage,
    localStorage,
    cookie,
  };
};
