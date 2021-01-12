/* eslint-disable @typescript-eslint/camelcase */
import {Where} from '@loopback/repository';
import 'reflect-metadata';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {filter, first, switchMap, startWith} from 'rxjs/operators';
import {WarClassPreview, WarEntityPreview} from '../../models';
import {createWarehouse, WarehouseStubs} from '../../warehouse/createWarehouse';
import {getWarehouseConfig} from '../../warehouse/startScripts';
import {Warehouse} from '../../warehouse/Warehouse';
import {createWarClassPreviewRepo} from './atomic/war-class-preview.helper';
import {createWarEntityPreviewRepo} from './atomic/war-entity-preview.helper';




export async function setupCleanAndStartWarehouse(stubs?: WarehouseStubs) {
    const config = getWarehouseConfig()
    const injector = createWarehouse(config, stubs)
    const wh: Warehouse = injector.get(Warehouse)
    await wh.whPgPool.query(`drop schema if exists ${wh.schemaName} cascade;`)
    await wh.start()
    await wh.gvPgListener.query('LISTEN entity_previews_updated;')
    await wh.gvPgListener.query('LISTEN modified_war_class_preview;')
    return injector;
}


export async function truncateWarehouseTables(wh: Warehouse) {
    await wh.whPgPool.query(`
        CREATE OR REPLACE FUNCTION truncate_tables(_schemaname text)
        RETURNS void AS
        $func$
        BEGIN
            -- RAISE NOTICE '%',
            EXECUTE  -- dangerous, test before you execute!
            (SELECT 'TRUNCATE TABLE '
                || string_agg(quote_ident(schemaname) || '.' || quote_ident(tablename), ', ')
                || ' CASCADE'
            FROM   pg_tables
            WHERE  schemaname = _schemaname
            );
        END
        $func$ LANGUAGE plpgsql;

        select truncate_tables('${wh.schemaName}')
    `)
}

export async function stopWarehouse(wh: Warehouse) {
    // await wait(1000)
    await wh.whPgPool.query('VACUUM ANALYZE')
    await wh.stop()
}
/**
 * Returns a Promise that resolves after given miliseconds
 * @param ms
 */
export async function wait(ms: number) {
    return new Promise(res => {setTimeout(() => res(), ms)})
}

/**
 * Takes an observable and returns a Promis that resolves as soon as
 * the observable nexts the first time.
 * @param observable$
 */
export async function waitUntilNext<M>(observable$: Observable<M>) {
    return new Promise<M>((res) => {observable$.pipe(first()).subscribe((i) => {res(i)})})
}

/**
 * Returns a Promis that resolves as soon as the database emits a entity preview
 * that machtches the given whereFilter.
 * @param observable$
 */
export function waitForEntityPreview<M>(wh: Warehouse, whereFilter: Where<WarEntityPreview>[]) {
    return new Promise<WarEntityPreview>((res, rej) => {
        const sub = wh.gvPgNotifications$.subscribe((msg) => {
            if (msg.channel === 'entity_previews_updated') {

                createWarEntityPreviewRepo().find({
                    where: {
                        and: [
                            {tmsp_last_modification: {gte: msg.payload}},
                            ...whereFilter
                        ]
                    }
                })
                    .then((result) => {
                        if (result?.length === 1) {
                            // console.log('OK! ', msg.payload)
                            res(result[0])
                            sub.unsubscribe()
                        } else if (result.length > 1) {
                            rej('found too many entity peviews')
                        }
                    })
                    .catch(e => rej(e))
            }
        })
    })
}


/**
 * Returns a Promise that resolves as soon as the database emits a entity preview
 * that machtches the given whereFilter.
 * @param observable$
 */
export function waitForEntityPreviewUntil<M>(wh: Warehouse, compare: (item: WarEntityPreview) => boolean) {
    return new Promise<WarEntityPreview>((res, rej) => {
        const sub = wh.gvPgNotifications$.subscribe((msg) => {
            if (msg.channel === 'entity_previews_updated') {


                createWarEntityPreviewRepo().find({
                    where: {
                        and: [
                            {tmsp_last_modification: {gte: msg.payload}}
                        ]
                    }
                })
                    .then((result) => {

                        if (result?.length) {
                            result.forEach(i => {
                                if (compare(i)) {
                                    res(result[0])
                                    sub.unsubscribe()
                                }
                            })
                        }
                    })
                    .catch(e => rej(e))
            }
        })
    })
}

/**
 * Returns a Promis that resolves as soon as it finds a entity preview
 * matching the given filter. It begins to search emmediately and
 * repeats the search every time the gvDB emits a entity preview
 * @param observable$
 */
export function searchForEntityPreview<M>(wh: Warehouse, whereFilter: Where<WarEntityPreview>[]) {
    return new Promise<WarEntityPreview>((res, rej) => {
        const sub = wh.gvPgNotifications$
            .pipe(startWith({channel: 'entity_previews_updated'}))
            .subscribe((msg) => {
                if (msg.channel === 'entity_previews_updated') {

                    createWarEntityPreviewRepo().find({
                        where: {
                            and: [
                                ...whereFilter
                            ]
                        }
                    })
                        .then((result) => {
                            if (result?.length === 1) {
                                // console.log('OK! ', msg.payload)
                                res(result[0])
                                sub.unsubscribe()
                            } else if (result.length > 1) {
                                rej('found too many entity peviews')
                            }
                        })
                        .catch(e => rej(e))
                }
            })
    })
}


/**
 * Returns a Promis that resolves as soon as the database emits a entity preview
 * that machtches the given whereFilter.
 * @param observable$
 */
export async function waitForClassPreview<M>(wh: Warehouse, whereFilter: Where<WarClassPreview>[]) {
    return new Promise<WarClassPreview>((res, rej) => {
        const sub = wh.gvPgNotifications$.subscribe((msg) => {
            if (msg.channel === 'modified_war_class_preview') {
                createWarClassPreviewRepo().find({
                    where: {
                        and: [
                            {tmsp_last_modification: {eq: msg.payload}},
                            ...whereFilter
                        ]
                    }
                })
                    .then((result) => {
                        if (result?.length === 1) {
                            res(result[0])
                            sub.unsubscribe()
                        } else if (result.length > 1) {
                            rej('found too many entity peviews')
                        }
                    })
                    .catch(e => rej(e))
            }
        })
    })
}


export function waitUntilSatisfy<M>(obs$: Observable<M>, compare: (item: M) => boolean) {
    return new Promise<M>((res, rej) => {
        const sub = obs$.pipe(filter(item => compare(item))).subscribe((x) => {
            res(x)
            sub.unsubscribe()
        })
    })
}

export async function searchUntilSatisfy<M>(options: {
    notifier$: Observable<unknown>,
    getFn: () => Promise<M | undefined>,
    compare: (val?: M) => boolean
}) {
    const x$ = new BehaviorSubject(undefined);
    const item$ = merge(x$, options.notifier$)
        .pipe(
            switchMap(_ => options.getFn()),
        );
    const result = await waitUntilSatisfy(item$, options.compare);
    return result;
}



