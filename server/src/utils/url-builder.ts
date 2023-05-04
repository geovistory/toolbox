export class UrlBuilder {
  /**
  * gets the URL of the api server.
  *
  * e.g.:
  * - https://toolbox.geovistory.org/api
  * - http://localhost:3000
  *
  * @return {type}  base url of the webserver
  */
  getServerUrl() {
    return process.env.SERVER_URL ?? 'http://localhost:3000';
  }

  /**
  * gets the URL of the client webserver.
  *
  * e.g.:
  * - https://toolbox.geovistory.org/
  * - http://localhost:4200
  *
  * @return {type}  base url of the webserver
  */
  getClientUrl() {
    return process.env.CLIENT_URL ?? 'http://localhost:4200';
  }

}
