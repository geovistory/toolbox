'use strict';

var path = require('path');

var UrlBuilder = require('../classes/UrlBuilder');
var urlBuilder = new UrlBuilder();

module.exports = function (PubAccount) {

  PubAccount.listProjects = function (id, cb) {

    const account = PubAccount.find({
      "where": {
        "id": id
      },
      "include": {
        "relation": "projects",
        "scope": {
          "include": [
            // "labels",
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

  /**
   * after registration
  * - send verification email
  * - clone sandbox project
  */
  PubAccount.afterRemote('create', function (context, account, next) {
    console.log('> account.afterRemote create triggered');

    // Clone sandbox project
    const sql = 'SELECT commons.clone_sandbox_project($1);';
    const params = [account.id]
    PubAccount.dataSource.connector.execute(sql, params, (err) => {
      if (err) console.error(`Error while cloning sandbox project for account with id ${account.id} :`, err);
      else {

      }
    });

    // Send verification email

    var baseUrl = urlBuilder.getBaseUrl();

    var options = {
      type: 'email',
      to: account.email,
      from: 'noreply@geovistory.com',
      subject: 'Geovistory – Please verify your email address',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      protocol: urlBuilder.getProtocol(),
      host: urlBuilder.getHost(),
      port: urlBuilder.getPort(),
      redirect: baseUrl + '/email-verified',
      account: account
    };

    account.verify(options, function (err, response) {

      if (err) {
        PubAccount.deleteById(account.id);
        return next(err);
      }

      console.log('> verification email sent:', response);

      next();

    });

  });


  // Send an email with reset-password-link
  PubAccount.on('resetPasswordRequest', function (info) {

    var url = urlBuilder.getBaseUrl() + '/reset-password';

    var html = 'Click <a href="' + url + '?access_token=' +
      info.accessToken.id + '">here</a> to reset your password';

    PubAccount.app.models.Email.send({
      to: info.email,
      from: 'noreply@geovistory.com',
      subject: 'Geovistory – Password reset',
      html: html
    }, function (err) {
      if (err) return console.log('> error sending password reset email');
      console.log('> sending password reset email to:', info.email);
    });
  });


  PubAccount.getRoles = function (id, cb) {

    var sql_stmt = `
    SELECT role.id, role.name
    FROM role
    JOIN rolemapping ON role.id = rolemapping.roleid
    WHERE rolemapping.principaltype = 'USER'
    AND rolemapping.principalid = $1::text
    `;
    var params = [id];

    const connector = PubAccount.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });

    return cb.promise;
  }

  PubAccount.withRolesAndProjects = function (cb) {

    var sql_stmt = `
    SELECT
    account.id,
    account.username,
    account.email,
    account.emailverified,
    COALESCE(json_agg(DISTINCT rolemappings.roles) FILTER (WHERE rolemappings.principalid IS NOT NULL), '[]') AS roles,
    COALESCE(json_agg(DISTINCT project_rels.projects) FILTER (WHERE project_rels.account_id IS NOT NULL), '[]') AS projectrels
    from account
    LEFT JOIN LATERAL (
      SELECT jsonb_build_object('id', role.id, 'name', role.name) roles, rolemapping.principalid
      FROM role
      JOIN rolemapping ON role.id = rolemapping.roleid
      WHERE rolemapping.principaltype = 'USER'
      AND rolemapping.principalid = account.id::text
    ) AS rolemappings
    ON rolemappings.principalid = account.id::text
    LEFT JOIN LATERAL (
      SELECT apr.account_id ,jsonb_build_object('pk_entity', pk_entity, 'role', role) projects
      FROM account_project_rel AS apr
      JOIN projects.project ON apr.fk_project = project.pk_entity
    ) AS project_rels
    ON project_rels.account_id = account.id
    GROUP BY
    account.id,
    account.username,
    account.email,
    account.emailverified
    `;
    var params = [];

    const connector = PubAccount.dataSource.connector;
    connector.execute(sql_stmt, params, (err, resultObjects) => {
      cb(err, resultObjects);
    });

    return cb.promise;
  }

};
