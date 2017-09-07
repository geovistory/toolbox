'use strict';

var path = require('path');

module.exports = function(User) {

  //send verification email after registration
  User.afterRemote('create', function(context, user, next) {
    console.log('> user.afterRemote create triggered');

    /**
     * var getRedirectUrl - gets the Url to be redericted after successful
     * email verification.
     *
     * The URL will point to the client app server, which can be hosted
     * on a different domain as the api server (e.g. in local dev environment).
     *
     * @return {type}  redirect url after successful email verification
     */
    var getRedirectUrl = function(){
      return context.req.headers.origin + '/email-verified';
    }

    /**
    * var getProtocol - get the protocol of api server ('http' or 'https').
    *
    * @return {String} host of api server
    */
    var getProtocol = function(){
      if(process.env.HEROKU_APP_NAME){
        return 'https';
      }
      return undefined;
    }

    /**
    * var getHost - get the host of api server.
    *
    * @return {String} host of api server
    */
    var getHost = function(){
      if(process.env.HEROKU_APP_NAME){
        return process.env.HEROKU_APP_NAME + '.herokuapp.com';
      }
      return undefined;
    }

    /**
    * var getPort - get the port of api server.
    *
    * @return {String}  port of api server
    */
    var getPort = function(){
      if(process.env.HEROKU_APP_NAME){
        return '443';
      }
      return undefined;
    }

    var options = {
      type: 'email',
      to: user.email,
      from: 'noreply@geovistory.org',
      subject: '[Geovistory] Please verify your email address',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      protocol: getProtocol(), //if undefined 'http' will be used.
      host: getHost(),  //if undefined app.get('host') will be used.
      port: getPort(), //if undefined app.get('port') will be used.
      redirect: getRedirectUrl(),
      user: user
    };

    user.verify(options, function(err, response) {
      if (err) {
        User.deleteById(user.id);
        return next(err);
      }

      console.log('> verification email sent:', response);

      next();

    });
  });



  /**
   * User - Prepare options for resetPassword method
   */
  User.beforeRemote('resetPassword', function(ctx, unused, next) {

    // We need headersOrigin for the reset-password-link in the email
    ctx.args.options.headersOrigin = ctx.req.headers.origin;

    next();

  })

  // Send an email with reset-password-link
  User.on('resetPasswordRequest', function (info) {

    // takes headersOrigin as base path, so that the reset-password-link
    // works on all servers (ng dev., staging, prod.).
    var url = info.options.headersOrigin + '/reset-password';

    var html = 'Click <a href="' + url + '?access_token=' +
    info.accessToken.id + '">here</a> to reset your password';

    User.app.models.Email.send({
      to: info.email,
      from: 'noreply@geovistory.org',
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });


};