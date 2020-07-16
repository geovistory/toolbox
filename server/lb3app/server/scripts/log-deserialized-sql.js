var sqlFormatter = require("sql-formatter");

const logFn = (sql, params) => {

    params.forEach((param, i) => {
        const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g')
        sql = sql.replace(replaceStr, typeof param === 'string' ? "'" + param + "'" : param )
    })

    console.log(`
    "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
    ${sqlFormatter.format(sql, { language: 'pl/sql' })}

    `)
}

module.exports = logFn;