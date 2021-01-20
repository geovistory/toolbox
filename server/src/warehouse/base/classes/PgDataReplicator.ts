/* eslint-disable @typescript-eslint/no-explicit-any */
import {PoolClient, QueryArrayResult} from 'pg';
import {Logger} from './Logger';
import {brkOnErr, pgLogOnErr} from '../../../utils/helpers';

export interface PgTable {
    // pool client connected to the database of the table
    client: PoolClient,

    // provide full name. Pattern: 'schema.table', e.g. 'war.entity_preview'
    table: string
}
export type DataReplicatorSqlFn = (insertClause: string, fromClause: string) => string

export class PgDataReplicator<M> {

    /**
     * create a data replicator
     * the getInsertState
     * @param source PgTable object containing information source table
     * @param target PgTable object containing information source table
     * @param columns Optional array of col names of the source table to read from
     * @param getInsertStatement Optional function that creates the replication sql
     */
    constructor(
        private source: PgTable,
        private target: PgTable,
        private columns?: string[],
        private getInsertStatement: DataReplicatorSqlFn = (insertClause: string, fromClause: string) => `${insertClause} ${fromClause}`

    ) { }
    /**
     * Loops over source table for batches of given batchSize and
     * executes statement given by this.getInsertStatement
     * @param batchSize max number of rows considered by one batch.
     * @returns statitistics about batches and time (miliseconds) used per batch
     */
    async replicateTable(batchSize = 10000) {
        const res = await brkOnErr(this.source.client.query<{count: number}>(`SELECT count(*):: integer From ${this.source.table} `))
        const size = res.rows[0].count;
        const limit = batchSize;
        const logPrefix = `${this.constructor.name} ${this.source.table}`

        const stats: {items: number, duration: number, rows: M[]}[] = []

        for (let offset = 0; offset < size; offset += limit) {
            const items = limit > size ? size % limit : limit;
            const last = offset + items;

            const logString = `replicate ${offset} - ${last} of ${size} items (${(offset / limit) + 1} /${Math.floor(size / limit) + 1} batches)`
            const t0 = Logger.start(logPrefix, `${logString} `, 0)

            const data = await this.readFromTable(limit, offset)
            const {sql, params} = this.convertReadResults(data)

            const rows = (await this.writeToTable<M>(sql, params)).rows
            const duration = Logger.itTook(logPrefix, t0, `to ${logString} `, 0)
            stats.push({items, duration, rows})
        }
        return stats
    }

    private async readFromTable(limit: number, offset: number) {
        const cols = this.columns ? this.columns.join(',') : '*'
        return this.source.client.query({
            text: `select ${cols} from ${this.source.table} LIMIT ${limit} OFFSET ${offset}`,
            rowMode: 'array',
        })
    }

    private convertReadResults(data: QueryArrayResult<any>): {sql: string, params: any[][]} {
        const params: any[][] = []
        const placeholders: string[] = [];
        const colNames: string[] = []
        data.fields.forEach((field, i) => {
            const placeholder = `$${i + 1}::${this.getDataTypeName(field.dataTypeID)}[]`;
            placeholders.push(placeholder)
            const colName = `"${field.name}"`;
            colNames.push(colName)
            params.push([])
            for (const row of data.rows) {
                params[i].push(row[i])
            }
        })

        const insertClause = `INSERT INTO ${this.target.table} (${colNames.join(',')})`
        const fromClause = `(SELECT * FROM UNNEST (${placeholders.join(',')}) t(${colNames.join(',')}))`
        const sql = this.getInsertStatement(insertClause, fromClause)
        return {sql, params}
    }

    private async writeToTable<M>(sql: string, params: any[]) {
        return pgLogOnErr((s, p) => this.target.client.query<M>(s, p), sql, params)
    }

    private getDataTypeName(id: number): string {
        const name = dataTypeIdLookup[id];
        if (!name) throw new Error(`Datatype with ${id} not found.`);
        return name
    }



}


const dataTypeIdLookup: {[id: number]: string} = {
    16: 'bool',
    17: 'bytea',
    18: 'char',
    19: 'name',
    20: 'int8',
    21: 'int2',
    22: 'int2vector',
    23: 'int4',
    24: 'regproc',
    25: 'text',
    26: 'oid',
    27: 'tid',
    28: 'xid',
    29: 'cid',
    30: 'oidvector',
    71: 'pg_type',
    75: 'pg_attribute',
    81: 'pg_proc',
    83: 'pg_class',
    114: 'json',
    142: 'xml',
    194: 'pg_node_tree',
    3361: 'pg_ndistinct',
    3402: 'pg_dependencies',
    5017: 'pg_mcv_list',
    32: 'pg_ddl_command',
    600: 'point',
    601: 'lseg',
    602: 'path',
    603: 'box',
    604: 'polygon',
    628: 'line',
    700: 'float4',
    701: 'float8',
    705: 'unknown',
    718: 'circle',
    790: 'money',
    829: 'macaddr',
    869: 'inet',
    650: 'cidr',
    774: 'macaddr8',
    1033: 'aclitem',
    1042: 'bpchar',
    1043: 'varchar',
    1082: 'date',
    1083: 'time',
    1114: 'timestamp',
    1184: 'timestamptz',
    1186: 'interval',
    1266: 'timetz',
    1560: 'bit',
    1562: 'varbit',
    1700: 'numeric',
    1790: 'refcursor',
    2202: 'regprocedure',
    2203: 'regoper',
    2204: 'regoperator',
    2205: 'regclass',
    2206: 'regtype',
    4096: 'regrole',
    4089: 'regnamespace',
    2950: 'uuid',
    3220: 'pg_lsn',
    3614: 'tsvector',
    3642: 'gtsvector',
    3615: 'tsquery',
    3734: 'regconfig',
    3769: 'regdictionary',
    3802: 'jsonb',
    4072: 'jsonpath',
    2970: 'txid_snapshot',
    3904: 'int4range',
    3906: 'numrange',
    3908: 'tsrange',
    3910: 'tstzrange',
    3912: 'daterange',
    3926: 'int8range',
    2249: 'record',
    2287: '_record',
    2275: 'cstring',
    2276: 'any',
    2277: 'anyarray',
    2278: 'void',
    2279: 'trigger',
    3838: 'event_trigger',
    2280: 'language_handler',
    2281: 'internal',
    2282: 'opaque',
    2283: 'anyelement',
    2776: 'anynonarray',
    3500: 'anyenum',
    3115: 'fdw_handler',
    325: 'index_am_handler',
    3310: 'tsm_handler',
    269: 'table_am_handler',
    3831: 'anyrange',
}
