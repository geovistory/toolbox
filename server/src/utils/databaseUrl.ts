
function getDatabaseUrl() {
  const databaseUrl = (process.env.DB_ENV === 'test' ? process.env.TEST_DATABASE_URL : process.env.DATABASE_URL) as string;
  return databaseUrl
}
const dbOnLocalhost = getDatabaseUrl().split('@')[1].startsWith('localhost');

// creates postgres url for loopback juggler.DataSource
export function getPgUrlForLoopback() {
  const url = getDatabaseUrl() + '?ssl=true'
  return url
};
// creates postgres ssl config for loopback juggler.DataSource
export function getPgSslForLoopback() {
  return {rejectUnauthorized: false}
};

// creates postgres url for node-postgres ('pg') v8 and higher
export function getPgUrlForPg8() {

  const url = getDatabaseUrl()
  return url
};
// creates postgres ssl config for node-postgres ('pg') v8 and higher
export function getPgSslForPg8() {
  return {rejectUnauthorized: false}
};
