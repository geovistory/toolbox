"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sql_formatter_1 = __importDefault(require("sql-formatter"));
const fs_1 = require("fs");
exports.logSql = (sql, params) => {
    if (process.env.DB_ENV === 'development') {
        params.forEach((param, i) => {
            const replaceStr = new RegExp('\\$' + (i + 1) + '(?!\\d)', 'g');
            sql = sql.replace(replaceStr, typeof param === 'string' ? "'" + param + "'" : param);
        });
        const dir = './dev-logs';
        if (!fs_1.existsSync(dir)) {
            fs_1.mkdirSync(dir);
        }
        const filename = 'sql-' + new Date().toISOString();
        const log = sql_formatter_1.default.format(sql, { language: 'pl/sql' });
        fs_1.writeFileSync(dir + '/' + filename, log, 'utf-8');
        // console.log(`
        // "\u{1b}[32m Formatted and Deserialized SQL (not sent to db) "\u{1b}[0m
        //   ${log}
        //   `)
    }
};
//# sourceMappingURL=utils.js.map