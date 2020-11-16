import {PoolClient} from 'pg';
import QueryStream from 'pg-query-stream';
import {combineLatest, ReplaySubject} from 'rxjs';
import {first} from 'rxjs/operators';
import {Warehouse} from '../../Warehouse';
import {handleAsyncStream} from './IndexLeveldb';
import {KeyDefinition} from '../interfaces/KeyDefinition';
import {SqlUpsertQueue} from './SqlUpsertQueue';
import {keys, values} from 'ramda';

export class DataIndexPostgres<KeyModel, ValueModel> {

    static indexes = 0;
    pgClient: PoolClient

    schema: string;
    table: string;
    schemaTable: string;
    ready$ = new ReplaySubject<boolean>()
    keyCols: string; // e.g. '"fkProject","pkEntity"'

    insertStmt: string;
    keyJsonObjSql: string;

    upsertQueue: SqlUpsertQueue<KeyModel, ValueModel>;

    constructor(
        public keyDefs: KeyDefinition[],
        public keyToString: (key: KeyModel) => string,
        public stringToKey: (str: string) => KeyModel,
        name: string,
        wh: Warehouse
    ) {
        if (!keyDefs || keyDefs?.length < 1) throw Error(`KeyDefs missing in ${name}`)
        this.schema = wh.schemaName;
        this.table = name;
        this.schemaTable = `${this.schema}.${this.table}`
        this.keyCols = this.keyDefs.map(k => `"${k.name}"`).join(',')
        this.insertStmt = this.createInsertStatement()
        this.keyJsonObjSql = this.createKeyJsonObjSql()
        combineLatest(
            wh.pgConnected$,
            wh.createSchema$
        ).pipe(first()).subscribe(([client]) => {
            this.pgClient = client;
            this.setupTable()
                .then(() => {
                    this.ready$.next(true)
                })
                .catch((e) => this.err(e))
        })
    }



    private async setupTable() {
        await this.pgClient.query(`
                CREATE TABLE IF NOT EXISTS ${this.schema}.${this.table} (
                ${this.keyDefs.map(keyDef => `"${keyDef.name}" ${keyDef.type}`).join(',')},
                val jsonb,
                tmsp_last_modification timestamp with time zone,
                tmsp_deleted timestamp with time zone,
                CONSTRAINT ${this.table}_keys_uniq UNIQUE (${this.keyCols})
            )`).catch((e) => {
            console.log(`Error during CREATE TABLE:  ${this.schema}.${this.table}:`, e)
        })

        await this.pgClient.query(`
                DROP TRIGGER IF EXISTS last_modification_tmsp ON ${this.schema}.${this.table}
            `).catch((e) => {
            console.log(`Error during DROP TRIGGER last_modification_tmsp:  ${this.schema}.${this.table}:`, e)
        })
        await this.pgClient.query(`
                CREATE TRIGGER last_modification_tmsp
                BEFORE INSERT OR UPDATE
                ON ${this.schema}.${this.table}
                FOR EACH ROW
                EXECUTE PROCEDURE ${this.schema}.tmsp_last_modification();
            `).catch((e) => {
            console.log(`Error during CREATE TRIGGER last_modification_tmsp:  ${this.schema}.${this.table}:`, e)
        })
        const indexedCols = [
            ...this.keyDefs.map(k => k.name),
            'tmsp_last_modification',
            'tmsp_deleted'
        ]
        for (const indexCol of indexedCols) {

            await this.pgClient.query(`
                    CREATE INDEX IF NOT EXISTS ${this.schema}_${this.table}_${indexCol}_idx
                    ON ${this.schema}.${this.table}("${indexCol}");
                `).catch((e) => {
                console.log(`Error during CREATE INDEX:  ${this.schema}.${this.table}(${indexCol}):`, e)
            })
        }

    }

    forEachValue(cb: (val: ValueModel) => void): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getValues(): Promise<ValueModel[]> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err(e: any) {
        console.log(`Error during setup of  ${this.schema}.${this.table}:`, e)
    }

    async addToIdx(keyModel: KeyModel, val: ValueModel): Promise<void> {
        const key: string = this.keyToString(keyModel);

        return new Promise((res, rej) => {
            this.pgClient.query(this.insertStmt, [
                ...this.getKeyModelValues(keyModel),
                key,
                Array.isArray(val) ? JSON.stringify(val) : val,
            ]).then(_ => res())
                .catch(e => {
                    console.log('error when inserting: ', {key, val})
                    console.log(e)
                });
        })

    }

    getKeyModelValues(keyModel: KeyModel) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this.keyDefs.map(k => (keyModel as any)[k.name]);
    }

    async removeFromIdx(keyModel: KeyModel): Promise<void> {
        const key: string = this.keyToString(keyModel);
        await this.pgClient.query(`
            DELETE FROM ${this.schema}.${this.table} WHERE key = $1;
        `, [key]);
    }


    async removeFromIdxWhereDeletedBefore(tmsp: string): Promise<void> {
        await this.pgClient.query(`
            DELETE FROM ${this.schema}.${this.table} WHERE tmsp_deleted <= $1;
        `, [tmsp]);
    }

    /**
     * Returns value of key. If key not exists, returns undefined.
     * @param key
     */

    async getFromIdx(keyModel: KeyModel): Promise<ValueModel | undefined> {
        return new Promise((res, rej) => {
            const sql = `
                SELECT val
                FROM ${this.schema}.${this.table}
                WHERE
                ${this.keyDefs.map((k, i) => `"${k.name}"=$${i + 1}`).join(' AND ')}
            `
            const params = this.getKeyModelValues(keyModel)
            this.pgClient.query<{val: ValueModel}>(sql, params)
                .then(results => res(results?.rows?.[0]?.val))
                .catch(e => rej(e))
        })
    }

    async getFromIdxWithTmsps(keyModel: KeyModel): Promise<{
        val: ValueModel,
        lastModification: Date | undefined,
        deleted: Date | undefined
    } | undefined> {
        return new Promise((res, rej) => {
            const sql = `
                SELECT val, tmsp_last_modification, tmsp_deleted
                FROM ${this.schema}.${this.table}
                WHERE
                ${this.keyDefs.map((k, i) => `"${k.name}"=$${i + 1}`).join(' AND ')}
            `
            const params = this.getKeyModelValues(keyModel)
            this.pgClient.query<{
                val: ValueModel,
                tmsp_last_modification: string,
                tmsp_deleted: string
            }>(sql, params)
                .then(results => {
                    const row = results?.rows?.[0]
                    res({
                        val: row?.val,
                        lastModification: row.tmsp_last_modification ? new Date(row.tmsp_last_modification) : undefined,
                        deleted: row.tmsp_deleted ? new Date(row.tmsp_deleted) : undefined
                    })
                })
                .catch(e => rej(e))
        })
    }


    async forEachKey<M>(cb: (key: KeyModel) => Promise<M>) {
        const querystream = new QueryStream(
            `SELECT key FROM ${this.schema}.${this.table}`
        )
        const stream = this.pgClient.query(querystream);
        return handleAsyncStream<M, {key: string}>(stream, (item) => cb(this.stringToKey(item.key)));

    }

    async forEachKeyStartingWith<M>(str: string, cb: (key: KeyModel) => Promise<M>): Promise<void> {
        const querystream = new QueryStream(
            `SELECT key FROM ${this.schema}.${this.table} WHERE key LIKE $1`,
            [str + '%']
        )
        const stream = this.pgClient.query(querystream);
        return handleAsyncStream<M, {key: string}>(stream, (item) => cb(this.stringToKey(item.key)));
    }

    async forEachItemWith<M>(partialKey: Partial<KeyModel>, cb: (item: {key: KeyModel, value: ValueModel}) => Promise<M>): Promise<void> {
        const cols = keys(partialKey);
        if (cols.length < 1) throw new Error("Partial key must contain at least one key");
        const sql = `
        SELECT ${this.keyJsonObjSql} as key, val as value
        FROM ${this.schemaTable}
        WHERE ${cols.map((k, i) => `"${k}"=$${i + 1}`).join(' AND ')}`
        const querystream = new QueryStream(
            sql,
            values(partialKey)
        )
        const stream = this.pgClient.query(querystream);
        return handleAsyncStream<M, {key: KeyModel, value: ValueModel}>(stream, (item) => cb({
            key: item.key,
            value: item.value
        }));
    }


    async clearIdx() {
        await this.pgClient.query(`TRUNCATE TABLE ${this.schema}.${this.table};`)
    }


    async keyExists(key: string): Promise<boolean> {
        return new Promise((res, rej) => {

            this.pgClient.query<{exists: boolean}>(
                `SELECT EXISTS (SELECT key FROM ${this.schema}.${this.table} WHERE key = $1);`,
                [key]
            )
                .then(results => res(results?.rows?.[0].exists)
                ).catch(e => rej(e))

        });
    }


    async getKeys(): Promise<KeyModel[]> {
        return new Promise((res, rej) => {
            this.pgClient.query<{keys: KeyModel[]}>(
                `SELECT array_agg(key) AS keys FROM ${this.schema}.${this.table};`
            ).then(results => res(results?.rows?.[0].keys)
            ).catch(e => rej(e))
        })
    }



    async getLength(): Promise<number> {
        return new Promise((res, rej) => {
            this.pgClient.query<{count: string}>(
                `SELECT count(*) FROM ${this.schema}.${this.table}`
            ).then(results => res(parseInt(results?.rows?.[0].count, 10))
            ).catch(e => rej(e))
        })

    }

    createInsertStatement() {
        return `INSERT INTO ${this.schema}.${this.table} (${this.keyCols}, key, val) VALUES (
                $1,
                $2,
                ${this.keyDefs.map((k, i) => `$${i + 3}`)}
        )
        ON CONFLICT (key) DO UPDATE SET val = EXCLUDED.val;`
    }

    createKeyJsonObjSql() {
        return `json_build_object(${this.keyDefs.map(k => `'${k.name}', "${k.name}"`).join(',')})`
    }

}
