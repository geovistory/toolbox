import { concat, sort, values } from 'ramda';
import { pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { U } from './util';
/*****************************************************************************
 * Generic operators
 *****************************************************************************/
/**
 * Returns an Observable that emits an flatened array consisting of the items of the arrays returned by getArrayFromItemFn.
 */
export function mapConcat(getArrayFromItemFn) {
    return map((source) => {
        if (typeof getArrayFromItemFn !== 'function') {
            throw new TypeError('argument is not a function.');
        }
        let concatenatedArray = [];
        source.forEach(item => {
            if (item)
                concatenatedArray = concat(concatenatedArray, getArrayFromItemFn(item));
        });
        return concatenatedArray;
    });
}
/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an array containing the latest versions for each indexed entity
 */
export function latestEntityVersions() {
    return pipe(map(d => U.objNr2Arr(d)), map(a => a.map(q => q[q._latestVersion])));
}
/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an the latest versions for entity with given pkEntity
 */
export function latestEntityVersion(pkEntity) {
    return pipe(map(byPkEntity => byPkEntity[pkEntity]), filter(entityVersions => entityVersions && entityVersions._latestVersion !== undefined), map(entityVersions => entityVersions[entityVersions._latestVersion]));
}
export function latestVersion(versions) {
    let latestVersion = 0;
    let latest;
    values(versions).forEach((v) => {
        if (v.entity_version > latestVersion) {
            latestVersion = v.entity_version;
            latest = v;
        }
    });
    return latest;
}
export function getSpecificVersion(versions, version) {
    const ver = values(versions).find((v) => v.entity_version === version);
    return ver;
}
/**
 * limits the number of items in array
 */
export function limitTo(limit) {
    return map((items) => {
        if (!limit)
            return items;
        return items.slice(0, limit);
    });
}
/**
 * limits the number of items in array
 */
export function limitOffset(limit, offset) {
    return map((items) => {
        if (!limit)
            return items;
        offset = offset ? offset : 0;
        const start = limit * offset;
        const end = start + limit;
        return items.slice(start, end);
    });
}
export function sortAbc(stringFn) {
    return map((l) => sort((a, b) => {
        let textA = stringFn(a);
        let textB = stringFn(b);
        if (!textA)
            return -1;
        if (!textB)
            return 1;
        textA = textA.toUpperCase(); // ignore upper and lowercase
        textB = textB.toUpperCase(); // ignore upper and lowercase
        if (textA < textB) {
            return -1;
        }
        if (textA > textB) {
            return 1;
        }
        // names are equal
        return 0;
    }, l));
}
//# sourceMappingURL=custom-rxjs-operators.js.map