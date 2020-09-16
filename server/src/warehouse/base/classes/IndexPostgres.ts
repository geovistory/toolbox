import {PoolClient} from 'pg';
import QueryStream from 'pg-query-stream';
import {combineLatest, ReplaySubject} from 'rxjs';
import {first} from 'rxjs/operators';
import {Warehouse} from '../../Warehouse';
import {Index} from '../interfaces/Index';
import {handleAsyncStream} from './IndexLeveldb';
// Temporary implementation as leveldb key-value store

export abstract class IndexPostgres<KeyModel, ValueModel> implements Index<KeyModel, ValueModel> {


    static indexes = 0;
    indexName = '/' + IndexPostgres.indexes++
    pgClient: PoolClient

    schema = 'war_cache'
    table: string;
    ready$ = new ReplaySubject<boolean>()

    constructor(
        name = 'default',
        wh: Warehouse
    ) {
        this.table = name;
        combineLatest(
            wh.pgConnected$,
            wh.createSchema$
        ).pipe(first()).subscribe(([client]) => {
            this.pgClient = client;
            this.pgClient.query(`CREATE SCHEMA IF NOT EXISTS ${this.schema}`)
                .then(_ => {
                    this.setupTable()
                        .then(() => {
                            this.ready$.next(true)
                        })
                        .catch((e) => this.err(e))
                }).catch((e) => {
                    console.log(`Error during CREATE SCHEMA: ${this.indexName}:`, e)
                })

        })
    }

    private async setupTable() {
        await this.pgClient.query(`
                CREATE TABLE IF NOT EXISTS ${this.schema}.${this.table} (
                key varchar NOT NULL UNIQUE,
                val json
            )`).catch((e) => {
            console.log(`Error during CREATE TABLE: ${this.indexName}:`, e)
        })

        await this.pgClient.query(`
                CREATE INDEX IF NOT EXISTS ${this.schema}_${this.table}_key_idx
                ON ${this.schema}.${this.table}(key);
            `).catch((e) => {
            console.log(`Error during REATE INDEX: ${this.indexName}:`, e)
        })
    }

    forEachValue(cb: (val: ValueModel) => void): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getValues(): Promise<ValueModel[]> {
        throw new Error('Method not implemented.');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err(e: any) {
        console.log(`Error during setup of ${this.indexName}:`, e)
    }

    async addToIdx(keyModel: KeyModel, val: ValueModel): Promise<void> {
        const key = this.keyToString(keyModel);

        return new Promise((res, rej) => {
            this.pgClient.query(`
            INSERT INTO ${this.schema}.${this.table} (key, val) VALUES (
                $1,
                ${typeof val === 'string' ? 'to_json($2::text)' : '$2'}
            )
            ON CONFLICT (key) DO UPDATE SET val = EXCLUDED.val;
        `, [
                key,
                Array.isArray(val) ? JSON.stringify(val) : val
            ]).then(_ => res())
                .catch(e => {
                    console.log('error when inserting: ', {key, val})
                    console.log(e)
                });
        })
        // await this.pgClient.query(`
        //     INSERT INTO ${this.schema}.${this.table} (key, val) VALUES (
        //         $1,
        //         ${typeof val === 'string' ? 'to_json($2::text)' : '$2'}
        //     )
        //     ON CONFLICT (key) DO UPDATE SET val = EXCLUDED.val;
        // `, [key, val]);

        // this.idx[this.keyToString(key)] = val
    }
    async removeFromIdx(keyModel: KeyModel): Promise<void> {
        const key = this.keyToString(keyModel);
        await this.pgClient.query(`
            DELETE FROM ${this.schema}.${this.table} WHERE key = $1;
        `, [key]);
    }

    /**
     * Returns value of key. If key not exists, returns undefined.
     * @param key
     */

    async getFromIdx(keyModel: KeyModel): Promise<ValueModel | undefined> {
        const key = this.keyToString(keyModel);

        return new Promise((res, rej) => {
            this.pgClient.query<{val: ValueModel}>(
                `SELECT val FROM ${this.schema}.${this.table} WHERE key = $1;`,
                [key]
            ).then(results => res(results?.rows?.[0]?.val)
            ).catch(e => rej(e))
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

    async forEachItemStartingWith<M>(str: string, cb: (item: {key: KeyModel, value: ValueModel}) => Promise<M>): Promise<void> {
        const querystream = new QueryStream(
            `SELECT key, val as value FROM ${this.schema}.${this.table} WHERE key LIKE $1`,
            [str + '%']
        )
        const stream = this.pgClient.query(querystream);
        return handleAsyncStream<M, {key: string, value: ValueModel}>(stream, (item) => cb({
            key: this.stringToKey(item.key),
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


    abstract keyToString(key: KeyModel): string;
    abstract stringToKey(str: string): KeyModel;

}
