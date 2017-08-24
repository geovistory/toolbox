module.exports = function(app) {
  var User = app.models.User;

  User.create([
    {username: 'John', email: 'john@doe.com',   emailVerified: 'true', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com',   emailVerified: 'true', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com',emailVerified: 'true', password: 'opensesame'},
    {username: 'Carla', email: 'carla@verify.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);

  });
};