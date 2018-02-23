'use strict';

var path = require('path');

var util = require('../shared/util');


module.exports = function(Account) {

  Account.listProjects = function(accountId, cb) {

    const account = Account.find({
      "where": {
        "id": accountId
      },
      "include": {
        "relation": "projects",
        "scope": {
          "include": [
            "labels",
            "text_properties",
            "default_language"
          ],
          "order": "tmsp_last_modification DESC"
        },
      }
    }, (err, resultObjects) => {
      cb(err, resultObjects);
    });
  };

  Account.register = function(account, redirectUrl, context) {

    // Add the redirectUrl to the context, so that it is available in afterRemote
    context.redirectUrl = redirectUrl;

    return Account.create(account);

  }

  //send verification email after registration
  Account.afterRemote('register', function(context, account, next) {
    console.log('> account.afterRemote create triggered');

    /**
     * var getRedirectUrl - gets the Url to be redericted after successful
     * email verification.
     *
     * The URL will point to the client app server, which can be hosted
     * on a different domain as the api server (e.g. in local dev environment).
     *
     * @return {type}  redirect url after successful email verification
     */
    var getRedirectUrl = function() {
      return context.redirectUrl;
    }



    var options = {
      type: 'email',
      to: account.email,
      from: 'noreply@geovistory.org',
      subject: '[Geovistory] Please verify your email address',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      protocol: util.getProtocol(), //if undefined 'http' will be used.
      host: util.getHost(), //if undefined app.get('host') will be used.
      port: util.getPort(), //if undefined app.get('port') will be used.
      redirect: getRedirectUrl(),
      account: account
    };

    account.verify(options, function(err, response) {
      if (err) {
        Account.deleteById(account.id);
        return next(err);
      }

      console.log('> verification email sent:', response);

      next();

    });
  });


  // Send an email with reset-password-link
  Account.on('resetPasswordRequest', function(info) {

    var html = 'Click <a href="' + info.options.redirectUrl + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

    Account.app.models.Email.send({
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