var server = require('./../server');
var ds = server.dataSources.postgres1;
var lbTables = ['Account', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Project', 'ProjectAccountAssociation'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
  ds.disconnect();
});