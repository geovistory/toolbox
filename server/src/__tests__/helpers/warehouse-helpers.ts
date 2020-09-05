/* eslint-disable @typescript-eslint/camelcase */
import {Where} from '@loopback/repository';
import {Observable} from 'rxjs';
import {first, filter} from 'rxjs/operators';
import {WarEntityPreview, WarClassPreview} from '../../models';
import {Warehouse} from '../../warehouse/Warehouse';
import {createWarEntityPreviewRepo} from './atomic/war-entity_preview.helper';
import {createWarClassPreviewRepo} from './atomic/war-class-preview.helper';
import {forEach} from 'lodash';

export async function setupWarehouseWithoutStarting() {

    const wh = new Warehouse()
    // await wh.pgClient.connect()
    // wh.startListening()
    return wh;
}
export async function setupWarehouse() {

    const wh = new Warehouse()
    return wh;
}
export async function setupCleanAndStartWarehouse() {

    const wh = new Warehouse()
    await wh.init()

    await wh.pgClient.query('LISTEN entity_previews_updated;')
    await wh.pgClient.query('LISTEN modified_war_class_preview;')

    return wh;
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
        wh.pgClient.on('notification', (msg) => {
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
                            res(result[0])
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
export function waitForEntityPreviewUntil<M>(wh: Warehouse, compare: (item: WarEntityPreview) => boolean) {
    return new Promise<WarEntityPreview>((res, rej) => {
        wh.pgClient.on('notification', (msg) => {
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
 * Returns a Promis that resolves as soon as the database emits a entity preview
 * that machtches the given whereFilter.
 * @param observable$
 */
export async function waitForClassPreview<M>(wh: Warehouse, whereFilter: Where<WarClassPreview>[]) {
    return new Promise<WarClassPreview>((res, rej) => {
        wh.pgClient.on('notification', (msg) => {
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
