
export function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL as string;
  return databaseUrl
}

// creates postgres url for loopback juggler.DataSource
export function getPgUrlForLoopback() {
  const url = getDatabaseUrl().replace('sslmode=require', 'ssl=true')
  return url
};
// creates postgres ssl config for loopback juggler.DataSource
export function getPgSslForLoopback() {
};

// creates postgres url for node-postgres ('pg') v8 and higher
export function getPgUrlForPg8() {
  const url = getDatabaseUrl()
  return url
};
// creates postgres ssl config for node-postgres ('pg') v8 and higher
export function getPgSslForPg8(url: string) {
  if (dbRequiresSSL(url)) return {rejectUnauthorized: false}
  return undefined;
};

// returns true if the url string wants ssl, else false
export function dbRequiresSSL(url: string) {
  if (url.includes('ssl=true')) return true;
  if (url.includes('sslmode=require')) return true;
  return false
}
