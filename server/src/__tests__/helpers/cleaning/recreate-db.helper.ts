import {Client} from 'pg';
import {getPgSslForPg8} from '../../../utils/databaseUrl';
import {parse} from 'pg-connection-string'
/**
 * This function only works of there is a database server with these dbs:
 * - a mainainance db
 * - a template db
 * - a test db
 */
export async function recreateDB() {
    if (!process.env.MAINTAINANCE_DATABASE_URL) throw Error('MAINTAINANCE_DATABASE_URL not defined')
    if (!process.env.TEMPLATE_DATABASE_URL) throw Error('TEMPLATE_DATABASE_URL not defined')
    if (!process.env.TEST_DATABASE_URL) throw Error('TEST_DATABASE_URL not defined')

    const maintainanceDb = parse(process.env.MAINTAINANCE_DATABASE_URL)
    const templateDb = parse(process.env.TEMPLATE_DATABASE_URL)
    const testDb = parse(process.env.TEST_DATABASE_URL)

    if (maintainanceDb.host !== templateDb.host || maintainanceDb.host !== testDb.host) {
        throw Error('Databases must be on same host')
    }

    const maintainanceClient = new Client({
        connectionString: process.env.MAINTAINANCE_DATABASE_URL,
        ssl: getPgSslForPg8(process.env.MAINTAINANCE_DATABASE_URL)
    })
    await maintainanceClient.connect()

    // terminate existing sessions on both: template and test db
    await maintainanceClient.query(`
        SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity
        WHERE pg_stat_activity.datname IN ($1, $2)
        AND pid <> pg_backend_pid();
    `, [testDb.database, templateDb.database])

    // drop test db
    await maintainanceClient.query(`drop database if exists ${testDb.database};`)

    // create test db using template db as template
    await maintainanceClient.query(`create database ${testDb.database} with template ${templateDb.database};`)

}
