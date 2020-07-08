export class UrlBuilder {
  /**
  * gets the base Url of the app server.
  *
  * e.g.:
  * - https://www.geovistory.com
  * - https://geovistory-review-pr-76.herokuapp.com
  *
  * @return {type}  base url of the webserver
  */
  getBaseUrl() {
    return this.getProtocol() + '://' + this.getHost() + ':' + this.getPort();
  }

  /**
  * get the protocol of api server ('http' or 'https').
  *
  * @return {String} protocol of api server
  */
  getProtocol() {
    if (this.hostingIsRemote()) {
      return 'https';
    } else return 'http';
  }

  /**
  * get the host of api server.
  *
  * e.g.:
  * - www.geovistory.com
  * - geovistory-review-pr-76.herokuapp.com
  *
  * @return {String} host of api server
  */
  getHost() {
    if (this.hostingIsRemote()) {
      if (process.env.DOMAIN_NAME) return process.env.DOMAIN_NAME;
      else return process.env.HEROKU_APP_NAME + '.herokuapp.com';
    } else return '0.0.0.0';
  }

  /**
  * get the port of api server.
  *
  * e.g.:
  * - 443
  * - 3000
  *
  * @return {String}  port of api server
  */
  getPort() {
    if (this.hostingIsRemote()) {
      return '443';
    }
    return '3000';
  }

  hostingIsRemote() {
    const environment = process.env.DB_ENV;
    if(!environment) return false;

    if (['review', 'staging', 'production'].includes(environment)) return true;
    else return false;
  }
}
