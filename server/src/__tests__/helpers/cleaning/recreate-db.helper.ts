import {Client, ClientConfig} from 'pg';
import {getPgSslForPg8, getPgUrlForPg8} from '../../../utils/databaseUrl';
import {parse} from 'pg-connection-string'
/**
 * This function only works of there is a database server with these dbs:
 * - a mainainance db
 * - a template db
 * - a test db
 */
export async function recreateDB() {
    if (!process.env.DB_MAINTAINANCE) throw Error('DB_MAINTAINANCE not defined')
    if (!process.env.DB_SCHEMA_TEMPLATE) throw Error('DB_SCHEMA_TEMPLATE not defined')
    if (!process.env.DB_FOR_SEEDING) throw Error('DB_FOR_SEEDING not defined')

    const maintainanceDb = parse(process.env.DB_MAINTAINANCE)
    const templateDb = parse(process.env.DB_SCHEMA_TEMPLATE)
    const testDb = parse(process.env.DB_FOR_SEEDING)

    if (maintainanceDb.host !== templateDb.host || maintainanceDb.host !== testDb.host) {
        throw Error('Databases must be on same host')
    }
    const connectionString = process.env.DB_MAINTAINANCE
    const pgConfig = parse(connectionString) as ClientConfig
    pgConfig.ssl = getPgSslForPg8(connectionString)
    const maintainanceClient = new Client(pgConfig)
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
