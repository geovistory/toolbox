"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_formatter_1 = __importDefault(require("sql-formatter"));
exports.logSql = (sql, params) => {
    if (process.env.DB_ENV === 'development') {
        params.forEach((param, i) => {
            const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g');
            sql = sql.replace(replaceStr, typeof param === 'string' ? "'" + param + "'" : param);
        });
        console.log(`
    "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
      ${sql_formatter_1.default.format(sql, { language: 'pl/sql' })}

      `);
    }
};
//# sourceMappingURL=utils.js.map