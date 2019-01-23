var _ = require('lodash');

module.exports = function (app) {
    var Role = app.models.Role;

    Role.registerResolver('project_member', function (role, context, cb) {

        //Q: Is the user logged in? (there will be an accessToken with an ID if so)
        var accountId = context.accessToken.userId;
        if (!accountId) {
            //A: No, user is NOT logged in: callback with FALSE
            return process.nextTick(() => cb(null, false));
        }

        // Q: Does the current request provide a PK of the project it wants to access?
        const req = context.remotingContext.req;
        const pkProject = parseInt(_.get(req, 'query.pkProject')); // TODO add other paths like body.pkProject
        if (!pkProject) {
            // A: No. This request does not provice a PK of the project
            return process.nextTick(() => cb(null, false));
        }

        // Q: Is the current logged-in user associated with this Project?
        // Step 1: lookup the requested project
        app.models.Project.findById(pkProject, function (err, project) {
            // A: The datastore produced an error! Pass error to callback
            if (err) return cb(err);
            // A: There's no project by this ID! Pass error to callback
            if (!project) return cb(new Error("Project not found"));

            // Step 2: check if User is part of the Team associated with this Project
            // (using count() because we only want to know if such a record exists)
            var ProjectAccountAssociation = app.models.ProjectAccountAssociation;
            ProjectAccountAssociation.count({
                account_id: accountId,
                fk_project: pkProject
            }, function (err, count) {
                // A: The datastore produced an error! Pass error to callback
                if (err) return cb(err);

                if (count > 0) {
                    // A: YES. At least one Team associated with this User AND Project
                    // callback with TRUE, user is role:`teamMember`
                    return cb(null, true);
                }

                else {
                    // A: NO, User is not in this Project's Team
                    // callback with FALSE, user is NOT role:`teamMember`
                    return cb(null, false);
                }
            });
        });
    });
};