import sqlFormatter from 'sql-formatter';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

export const logSql = (sql: string, params: any[]) => {

  if (process.env.DB_ENV === 'development') {
    params.forEach((param, i) => {
      const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g')
      sql = sql.replace(replaceStr, typeof param === 'string' ? "'" + param + "'" : param)
    })

    const dir = './dev-logs';
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    const filename = 'sql-' + formatDate(new Date())
    const log = sqlFormatter.format(sql, { language: 'pl/sql' });
    writeFileSync(dir + '/' + filename, log, 'utf-8')

    // console.log(`
    // "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
    //   ${log}
    //   `)
  }
}

function formatDate(date: Date): string {
  const yy = setStringLen(date.getUTCFullYear(), 4, '0', 'before');
  const mm = setStringLen(date.getUTCMonth() + 1, 2, '0', 'before');
  const dd = setStringLen(date.getUTCDate(), 2, '0', 'before');
  const h = setStringLen(date.getUTCHours(), 2, '0', 'before');
  const m = setStringLen(date.getUTCMinutes(), 2, '0', 'before');
  const s = setStringLen(date.getUTCSeconds(), 2, '0', 'before');
  const ms = setStringLen(date.getUTCMilliseconds(), 2, '0', 'before');
  return yy + '-' + mm + '-' + dd + ' ' + h + 'h' + m + '-' + s + '-' + ms;
}

function setStringLen(str: number, len: number, char: string, where: string) {
  let toReturn: string = str + '';
  while (toReturn.length < len) {
    if (where == 'before') toReturn = char + toReturn;
    else toReturn += char;
  }
  return toReturn;
}