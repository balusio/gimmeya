/**
 * Async function who handles a middleware to have statics on a simple Redis, this is just an example implementation
 * suggest use winston on a real project
 * @param {object} req request object
 */
module.exports = (req) => {
  try {
    /**
     * @type {string} ip ip from request
     * @type {string} method direct getted from request
     * @type {string} hostname host
     * @type {string} originalUrl url
     */
    const {
      ip,
      method,
      hostname,
      originalUrl,
    } = req;
    const logData = JSON.stringify({
      date: new Date(),
      url: hostname + originalUrl,
      ip,
      method,
    });
    process.stdout.write(`${logData} \n`);
  } catch (error) {
  /**
   * @throws {console.error} if cannot write or catch the variables and write them on the stdout
   */
    console.error(`Problem locading the log data on req:\n ${error}`);
  }
};
