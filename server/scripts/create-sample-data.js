module.exports = function(app) {
  var User = app.models.User;
  var Project = app.models.project;

  User.create([
    {username: 'John', email: 'john@doe.com',   emailVerified: 'true', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com',   emailVerified: 'true', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com',emailVerified: 'true', password: 'opensesame'},
    {username: 'Carla', email: 'carla@verify.com', password: 'opensesame'}
  ], function(err, users) {
    if (err) throw err;

    console.log('Created users:', users);
  });

  Project.create([
    {name: 'Sentatoren', description: 'Dieses Projekt behandelt die römischen Senatoren des 3. Jh.'},
    {name: 'Römische Provinzen', description: 'Die römischen Provinzen im Wandel der Zeit.'},
  ], function(err, projects) {
    if (err) throw err;

    console.log('Created projects:', projects);
  });


};