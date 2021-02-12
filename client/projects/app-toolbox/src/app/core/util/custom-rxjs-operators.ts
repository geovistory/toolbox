// TODO DELETE
import { concat, sort, values } from 'ramda';
import { OperatorFunction, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EntityVersionsByPk } from '../active-project';
import { EntityDetail } from '../state/models';
import { ByPk, } from '../redux-store/model';
import { U } from './util';


/*****************************************************************************
 * Generic operators
 *****************************************************************************/

/**
 * Returns an Observable that emits an flatened array consisting of the items of the arrays returned by getArrayFromItemFn.
 */
export function mapConcat<T, R>(getArrayFromItemFn: (value: T) => R[]): OperatorFunction<T[], R[]> {
  return map((source: T[]) => {

    if (typeof getArrayFromItemFn !== 'function') {
      throw new TypeError('argument is not a function.');
    }

    let concatenatedArray: R[] = [];
    source.forEach(item => {
      if (item) concatenatedArray = concat(concatenatedArray, getArrayFromItemFn(item))
    })

    return concatenatedArray
  })
}


/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an array containing the latest versions for each indexed entity
 */
export function latestEntityVersions<T>(): OperatorFunction<EntityVersionsByPk<T>, T[]> {
  return pipe(
    map(d => U.objNr2Arr(d)),
    map(a => a.map(q => q[q._latestVersion]))
  )
}


/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an the latest versions for entity with given pkEntity
 */
export function latestEntityVersion<T>(pkEntity: number): OperatorFunction<EntityVersionsByPk<T>, T> {
  return pipe(
    map(byPkEntity => byPkEntity[pkEntity]),
    filter(entityVersions => entityVersions && entityVersions._latestVersion !== undefined),
    map(entityVersions => entityVersions[entityVersions._latestVersion])
  )
}

export function latestVersion<T>(versions: ByPk<T>): T {
  let latestVersion = 0
  let latest;
  values(versions).forEach((v: any) => {
    if (v.entity_version > latestVersion) {
      latestVersion = v.entity_version;
      latest = v;
    }
  })
  return latest;
}

export function getSpecificVersion<T>(versions: ByPk<T>, version): T {
  const ver = values(versions).find((v: any) => v.entity_version === version)
  return ver
}


/**
 * limits the number of items in array
 */
export function limitTo<T>(limit?: number) {
  return map((items: T[]) => {
    if (!limit) return items
    return items.slice(0, limit)
  })
}

/**
 * limits the number of items in array
 */
export function limitOffset<T>(limit?: number, offset?: number) {
  return map((items: T[]) => {
    if (!limit) return items
    offset = offset ? offset : 0;
    const start = limit * offset;
    const end = start + limit;
    return items.slice(start, end)
  })
}



export function sortAbc<T>(stringFn: (x: T) => string) {
  return map((l: T[]) => sort((a, b) => {
    let textA = stringFn(a)
    let textB = stringFn(b)

    if (!textA) return -1;
    if (!textB) return 1;

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
  }, l)
  )
}


