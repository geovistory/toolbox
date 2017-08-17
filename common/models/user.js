'use strict';

var path = require('path');

module.exports = function(User) {

  //send verification email after registration
  User.afterRemote('create', function(context, user, next) {
    console.log('> user.afterRemote create triggered');

    //takes the domain from where the request comes from.
    // so that redirect works on all servers (ng dev., staging, prod.).
    var redirectTo = context.req.headers.origin + '/email-verified';

    var options = {
      type: 'email',
      to: user.email,
      from: 'noreply@geovistory.org',
      subject: '[Geovistory] Please verify your email address',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      redirect: redirectTo,
      user: user
    };

    user.verify(options, function(err, response) {
      if (err) {
        User.deleteById(user.id);
        return next(err);
      }

      console.log('> verification email sent:', response);

      next();

      // context.res.render('response', {
      //   title: 'Signed up successfully',
      //   content: 'Please check your email and click on the verification link ' +
      //       'before logging in.',
      //   redirectTo: '/',
      //   redirectToLinkText: 'Log in'
      // });
    });
  });


  // Prepare options for resetPassword method
  User.beforeRemote('resetPassword', function(ctx, unused, next) {

    // We need headersOrigin to to create the reset-password-link in the email
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