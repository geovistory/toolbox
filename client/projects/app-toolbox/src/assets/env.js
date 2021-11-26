// see: https://pumpingco.de/blog/environment-variables-angular-docker/
(function (window) {
  window["env"] = window["env"] || {};

  // Environment variable for the rest api url
  window["env"]["apiUrl"] = "http://localhost:3000";
  // Environment variable for the url serving static assets of angular dist folder
  window["env"]["assetsUrl"] = "http://localhost:3000";
})(this);
