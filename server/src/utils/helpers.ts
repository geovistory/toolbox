import {existsSync, mkdirSync, writeFileSync} from 'fs';
import {concat, mergeDeepWith} from 'ramda';
import sqlFormatter from 'sql-formatter';
import {GvSchemaModifier} from '../models/gv-schema-modifier.model';

export const logSql = (sql: string, params: any[], prefix = 'sql-') => {

  if (process.env.DB_ENV === 'development' || process.env.DB_ENV === 'test') {
    params.forEach((param, i) => {
      const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g')
      sql = sql.replace(replaceStr, typeof param === 'string' ? "'" + param + "'" : param)
    })


    const log = sqlFormatter.format(sql, {language: 'pl/sql'});
    logToFile(log, prefix)
    // console.log(`
    // "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
    //   ${log}
    //   `)
  }
}


export const logToFile = (str: string, prefix = 'log-') => {

  if (process.env.DB_ENV === 'development' || process.env.DB_ENV === 'test') {

    const dir = './dev-logs';
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    const filename = prefix + new Date().toISOString()
    writeFileSync(dir + '/' + filename, str, 'utf-8')

  }
}



/**
 * Returns a Promise that resolves after given miliseconds
 * @param ms
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(res => {setTimeout(() => res(), ms)})
}


export function logOnErr<M>(promise: Promise<M>) {
  return promise
    .then(data => data)
    .catch(error => {
      console.log('Error: ', error.message)
    });
}

export async function pgLogOnErr<M>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: (sql: string, params: any[]) => Promise<M>, sql: string, params: any[]
): Promise<M> {
  const call = cb(sql, params)
    .catch(error => {
      parsePGError(error, sql)
      return {} as M
    });
  return call
}
export async function pgBrkOnErr<M>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: (sql: string, params: any[]) => Promise<M>, sql: string, params: any[]
) {
  const call = cb(sql, params)
    .catch(error => {
      parsePGError(error, sql)
      throw new Error(error)
    });
  return call
}

export function brkOnErr<M>(promise: Promise<M>) {
  return promise
    .then(data => data)
    .catch(error => {
      throw new Error(error)
    });
}
class PgErrorCodes {
  "08003" = "connection_does_not_exist"
  "08006" = "connection_failure"
  "2F002" = "modifying_sql_data_not_permitted"
  "57P03" = "cannot_connect_now"
  "42601" = "syntax_error"
  "42501" = "insufficient_privilege"
  "42602" = "invalid_name"
  "42622" = "name_too_long"
  "42939" = "reserved_name"
  "42703" = "undefined_column"
  "42000" = "syntax_error_or_access_rule_violation"
  "42P01" = "undefined_table"
  "42P02" = "undefined_parameter"
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePGError(err: any, sqlString: string) {
  const errorCodes = new PgErrorCodes()
  console.log("ERROR node-postgres:", sqlString)
  console.log(err.stack);

  if (err === undefined) {
    console.log("No errors returned from Postgres")
  }

  else {

    if (err.message !== undefined) {
      console.log('ERROR message:', err.message)
    }
    if (err.code !== undefined) {
      const code: keyof PgErrorCodes = err.code
      console.log("Postgres error code:", code)
      if (Object.prototype.hasOwnProperty.call(errorCodes, code)) {
        console.log('Error code details:', errorCodes[code])
      }
    }


    console.log('severity:', err.severity)
    if (err.position !== undefined) {

      console.log("PostgreSQL error position:", err.position)

      // get the end of the error pos
      let end = err.position + 7
      if (err.position + 7 >= sqlString.length) {
        end = sqlString.length
      }

      // get the start position for SQL error
      let start = err.position - 2
      if (start - 2 <= 1) {
        start = 0
      }

      // log the partial SQL statement around error position
      console.log("---> " + sqlString.substring(start, end) + " <---")
    }

    if (err.code === undefined && err.position === undefined) {
      console.log("nUnknown Postgres error:", err)
    }
  }
}


/**
 * Deep merges the two given objects and returns a clone with the result
 * @param new
 */
export function mergeSchemaModifier(old: GvSchemaModifier, _new: Partial<GvSchemaModifier>) {
  return mergeDeepWith(concat, old, _new)
}
