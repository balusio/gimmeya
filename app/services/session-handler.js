import AuthHandlers from './auth-handlers';
/**
 * HandleSession after the login is succesful will set a expire
 * time that is defined for the whole application,
 * only if the session handler is setted by cookie, otherwise will relly on Session or LocalStorage
 */
export default class HandleSession {
  /**
   * @param {string} handler session handler can be LocalStorage, SessionStorage or cookie
   * @param {Date} expire Only needed if you want to have a expire Cookie that
   * redirects you directly to the login
   * otherwise you can enter directly to the Map and the connections with the
   * API should be open by the HttpOnly header
   */
  constructor(handler, expire = null) {
    this.availableHandlers = ['sessionStorage', 'localStorage', 'cookie'];
    if (this.availableHandlers.includes(handler)) {
      this.handler = AuthHandlers();
      this.handler = this.handler[handler];
    } else {
      // eslint-disable-next-line prefer-destructuring
      this.handler = this.availableHandlers[0];
    }
    this.expireTime = expire;
  }
  /**
   * @listen loading method, after it will load the session needed
   */

  startHandler(keyObject) {
    this.handler.save(keyObject, this.expireTime);
  }
  /**
   * @return {boolean} loaded or not no matter the status of the session
   */

  getloadStatus(keyObject) {
    this.handler.get(keyObject);
  }

  /**
   * @param {date} newTime change the time for save the auth handler if is needed
   */
  changeExpireDate(newTime) {
    this.handler.setExpireTime(newTime);
  }
}
