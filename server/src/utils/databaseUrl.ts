import {PoolConfig} from 'pg';
import {parse} from 'pg-connection-string';

export function getGvDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("Warehouse > No DATABASE_URL provided")
  if (!dbRequiresSSL(databaseUrl) && process.env.GV_DB_SSL === 'sslmode=require') {
    return databaseUrl + '?sslmode=require'
  }
  return databaseUrl
}

// creates postgres url for loopback juggler.DataSource
export function getGvPgUrlForLoopback() {
  const url = getGvDatabaseUrl().replace('sslmode=require', 'ssl=true')
  return url
};

export function getWhDatabaseUrl() {
  const databaseUrl = process.env.WH_DATABASE_URL as string;
  if (!databaseUrl) throw new Error("Warehouse > No WH_DATABASE_URL provided")
  if (!dbRequiresSSL(databaseUrl) && process.env.WH_DB_SSL === 'sslmode=require') {
    return databaseUrl + '?sslmode=require'
  }
  return databaseUrl
}


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

export function createPoolConfig(connectionString?: string, maxConnections?: number): PoolConfig {
  if (!connectionString) throw new Error("Please provide a connection string");
  const config = parse(connectionString) as PoolConfig
  config.max = maxConnections
  config.ssl = getPgSslForPg8(connectionString)
  return config
}
