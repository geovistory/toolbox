// see: https://pumpingco.de/blog/environment-variables-angular-docker/
(function (window) {
  window["env"] = window["env"] || {};

  // Environment variables
  window["env"]["apiUrl"] = "http://localhost:3000";
})(this);
