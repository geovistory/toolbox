import c from 'child_process';
import fs from 'fs';
import path from 'path';
import {Pool} from 'pg';
import pgkDir from 'pkg-dir';
import {createWarehouse} from './createWarehouse';
import {Warehouse, WarehouseConfig} from './Warehouse';
import {getGvDatabaseUrl, getWhDatabaseUrl} from '../utils/databaseUrl';

const appRoot = pgkDir.sync() ?? ''
const schemaPrefix = 'war_cache_'

// Use this function to start warehouse on heroku environments
// The warehouse-compat-list is required
// (it's not created by this function, because on heroku .git folder is missing)
export async function start() {
    const config = getWarehouseConfig()
    const warehouse: Warehouse = createWarehouse(config).get(Warehouse)
    await warehouse.start();
    await removeWarehouseSchemasExcept(warehouse.whPgPool, schemaPrefix, warehouse.schemaName)
    return warehouse
}


// Use this function to start warehouse on local environments
// The function will create the warehouse-compat-list
// (this requires git CLI and .git folder)
export async function startDev() {
    c.execSync(`cd ${path.join(appRoot, '..')} && sh deployment/create-warehouse-compat-list.sh`);
    await start();
}


// Use this function to start warehouse on local environments
// Cleans the whDB and starts warehouse without backups
export async function cleanAndStartDev() {
    c.execSync(`cd ${path.join(appRoot, '..')} && sh deployment/create-warehouse-compat-list.sh`);
    const config: WarehouseConfig = getWarehouseConfig()
    const warehouse: Warehouse = createWarehouse(config).get(Warehouse)
    await warehouse.whPgPool.query(`drop schema if exists ${warehouse.schemaName} cascade;`)
    await warehouse.start();
    await removeWarehouseSchemasExcept(warehouse.whPgPool, schemaPrefix, warehouse.schemaName)
    return warehouse
}



function getSchemaName() {
    const file = 'warehouse-compat-list.txt'
    const filePath = path.join(__dirname, '../../../deployment/', file)
    // const filePath= path.join(appRoot, '/deployment/', file)
    // reads warhouse compatible commits
    const compatibleWithCommits = fs
        .readFileSync(filePath)
        .toString()
        .split('\n')
        .filter(str => !!str);

    if (!compatibleWithCommits.length) throw new Error('Can\'t find the latest commit from compatibleWithCommits')

    // gets commit sha of last change on warehouse directory
    const warehouseCommit = compatibleWithCommits[compatibleWithCommits.length - 1]

    return schemaPrefix + warehouseCommit
}

export function getWarehouseConfig() {
    const gvDb = getGvDatabaseUrl();
    const whDb = getWhDatabaseUrl();

    const config: WarehouseConfig = {
        warehouseDatabase: whDb,
        warehouseDatabaseMaxConnections: parseInt(process.env.WAREHOUSE_WH_DB_POOL_SIZE ?? '25', 10),
        geovistoryDatabase: gvDb,
        geovistoryDatabaseMaxConnections: parseInt(process.env.WAREHOUSE_GV_DB_POOL_SIZE ?? '25', 10),
        warehouseSchema: getSchemaName()
    }

    return config
}

/**
 *
 * @param pgPool pg PoolClient
 * @param warehouseSchemaPrefix prefix of warehouse schemas
 * @param notRemovingSchema complete name of schema not to remove, even if it begins with warehouseSchemaPrefix
 */
async function removeWarehouseSchemasExcept(pgPool: Pool, warehouseSchemaPrefix: string, notRemovingSchema: string) {
    const res = await pgPool.query<{schema: string}>(`
        SELECT schema_name AS schema
        FROM information_schema.schemata
        WHERE schema_name iLike $1 || '%'
        AND schema_name != $2
    `, [warehouseSchemaPrefix, notRemovingSchema])
    const schemasToRemove = res.rows
    for (const item of schemasToRemove) {
        await pgPool.query(`DROP SCHEMA ${item.schema} CASCADE;`)
    }
}
