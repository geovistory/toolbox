import sqlFormatter from 'sql-formatter';
import {writeFileSync, existsSync, mkdirSync} from 'fs';

export const logSql = (sql: string, params: any[]) => {

  if (process.env.DB_ENV === 'development' || process.env.DB_ENV === 'test') {
    params.forEach((param, i) => {
      const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g')
      sql = sql.replace(replaceStr, typeof param === 'string' ? "'" + param + "'" : param)
    })

    const dir = './dev-logs';
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    const filename = 'sql-' + new Date().toISOString()
    const log = sqlFormatter.format(sql, {language: 'pl/sql'});
    writeFileSync(dir + '/' + filename, log, 'utf-8')

    // console.log(`
    // "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
    //   ${log}
    //   `)
  }
}



/**
 * Returns a Promise that resolves after given miliseconds
 * @param ms
 */
export async function wait(ms: number) {
  return new Promise(res => {setTimeout(() => res(), ms)})
}
