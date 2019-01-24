module.exports = function(app) {
  var PubAccount = app.models.PubAccount;
  var ComProject = app.models.ComProject;

  PubAccount.create([
    {username: 'John', email: 'john@doe.com',   emailVerified: 'true', password: 'opensesame'},
    {username: 'Jane', email: 'jane@doe.com',   emailVerified: 'true', password: 'opensesame'},
    {username: 'Bob', email: 'bob@projects.com',emailVerified: 'true', password: 'opensesame'},
    {username: 'Carla', email: 'carla@verify.com', password: 'opensesame'}
  ], function(err, accounts) {
    if (err) throw err;

    console.log('Created accounts:', accounts);
  });

  ComProject.create([
    {name: 'Sentatoren', description: 'Dieses Projekt behandelt die römischen Senatoren des 3. Jh.'},
    {name: 'Römische Provinzen', description: 'Die römischen Provinzen im Wandel der Zeit.'},
  ], function(err, projects) {
    if (err) throw err;

    console.log('Created projects:', projects);
  });


};