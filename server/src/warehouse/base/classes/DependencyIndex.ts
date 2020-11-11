import {Warehouse} from '../../Warehouse';
import {AggregatedDataService} from './AggregatedDataService';
import {ClearAll} from './ClearAll';
import {DataService} from './DataService';
import {ReplaySubject, combineLatest} from 'rxjs';
import {first} from 'rxjs/operators';
import {PoolClient} from 'pg';
import {KeyDefinition} from '../interfaces/KeyDefinition';
import {recreateDB} from '../../../__tests__/helpers/cleaning/recreate-db.helper';



export class DependencyIndex<ReceiverKeyModel, ReceiverValModel, ProviderKeyModel, ProviderValModel> implements ClearAll {

    schema: string;
    table: string;
    schemaTable: string;
    ready$ = new ReplaySubject<boolean>()
    providerKeyCols: string; // e.g. '"fkProject","pkEntity"'
    receiverKeyCols: string; // e.g. '"fkProject","pkEntity"'
    providerKeyDefs: KeyDefinition[];
    receiverKeyDefs: KeyDefinition[];
    keyCols: string; // e.g. '"r_fkProject","r_pkEntity", "p_fkProject","p_pkEntity"'
    pgClient: PoolClient


    private cache: {receiverKey: ReceiverKeyModel, providerKey: ProviderKeyModel}[] = [];

    constructor(
        public wh: Warehouse,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        public receiverDS: AggregatedDataService<ReceiverKeyModel, ReceiverValModel>,
        public providerDS: DataService<ProviderKeyModel, ProviderValModel>,
        public receiverKeyToString: (key: ReceiverKeyModel) => string,
        public stringToReceiverKey: (str: string) => ReceiverKeyModel,
        public providerKeyToString: (key: ProviderKeyModel) => string,
        public stringToProviderKey: (str: string) => ProviderKeyModel,
    ) {
        providerDS.registerProviderOf(this)
        receiverDS.registerReceiverOf(this)
        this.schema = wh.schemaName;
        this.table = 'dep__' + receiverDS.index.table + '__on__' + providerDS.index.table;
        this.schemaTable = `${this.schema}.${this.table}`
        this.providerKeyDefs = this.providerDS.index.keyDefs.map(k => ({...k, name: 'p_' + k.name}));
        this.receiverKeyDefs = this.receiverDS.index.keyDefs.map(k => ({...k, name: 'r_' + k.name}));
        this.providerKeyCols = this.providerKeyDefs.map(k => `"${k.name}"`).join(',')
        this.receiverKeyCols = this.receiverKeyDefs.map(k => `"${k.name}"`).join(',')
        this.keyCols = `${this.providerKeyCols},${this.receiverKeyCols}`
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
                CREATE TABLE IF NOT EXISTS ${this.schemaTable} (
                -- provider key cols
                ${this.providerKeyDefs.map(k => `"${k.name}" ${k.type}`).join(',')},
                -- receiver key cols
                ${this.receiverKeyDefs.map(k => `"${k.name}" ${k.type}`).join(',')},
                val jsonb,
                used_by_aggregator timestamp with time zone,
                CONSTRAINT ${this.table}_keys_uniq UNIQUE (${this.providerKeyCols},${this.receiverKeyCols})
            )`).catch((e) => {
            console.log(`Error during CREATE TABLE:  ${this.schemaTable}:`, e)
        })

        const indexedCols = [
            ...this.providerKeyDefs.map(k => k.name),
            ...this.receiverKeyDefs.map(k => k.name),
            'used_by_aggregator'
        ]
        for (const indexCol of indexedCols) {

            await this.pgClient.query(`
                    CREATE INDEX IF NOT EXISTS ${this.schema}_${this.table}_${indexCol}_idx
                    ON ${this.schemaTable}("${indexCol}");
                `).catch((e) => {
                console.log(`Error during CREATE INDEX:  ${this.schemaTable}(${indexCol}):`, e)
            })
        }

    }


    cacheNewDependencies(receiverKey: ReceiverKeyModel, providerKey: ProviderKeyModel) {
        this.cache.push({receiverKey, providerKey})
    }
    getSqlForStoringCache(tmsp: string): {
        sql: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params: any[];
    } | undefined {
        if (this.cache.length === 0) return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const params: any[] = [], addParam = (val: any) => {
            params.push(val)
            return '$' + params.length
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const addParams = (vals: any[]) => {
            return vals.map((val) => addParam(val)).join(',');
        }
        const sql = `
            INSERT INTO
                ${this.schemaTable}
                (${this.keyCols}, used_by_aggregator)
            VALUES
            ${this.cache.map(c => `(
                ${addParams(this.providerDS.index.getKeyModelValues(c.providerKey))},
                ${addParam(tmsp)}
            )`).join(',')}
        `
        return {sql, params}
    }

    clearCache() {
        this.cache = []
    }

    async clearAll(): Promise<void> {

        await this.pgClient.query(`
        DELETE FROM ${this.schema}_${this.table};
        `).catch((e) => {
            console.log(`Error during DELETE INDEX:  ${this.schemaTable}:`, e)
        })
    }


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    err(e: any) {
        console.log(`Error during setup of  ${this.schemaTable}:`, e)
    }

}

