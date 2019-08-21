import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { concat, values, sort } from 'ramda';
import { OperatorFunction, pipe, UnaryFunction, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FieldList, PeItDetail, PropertyField, RoleDetail, TeEntDetail } from '../state/models';
import { U } from './util';
import { EntityVersionsByPk } from '../active-project';
import { ByPk } from '../store/model';
import { InfRole } from 'app/core';

type TeEnOrPeItDetail = TeEntDetail | PeItDetail;

/*****************************************************************************
 * Geovistory Type specific operators
 *****************************************************************************/

/**
 * Returns an Observable that emits a flattened PropertyField[] contained by all items in the
 * Array of TeEntDetail or PeItDetail
 * emitted by the source Observable.
 */
export const entityDetails_2_propFields = () => pipe(
  map((entityDetails: TeEnOrPeItDetail[]) => entityDetails.map(d => d._fields)),
  fieldLists_2_propFields()
)

/**
 * Returns an Observable that emits a flattened PropertyField[] contained by all items in the FieldList[]
 * emitted by the source Observable.
 */
export const fieldLists_2_propFields = () => mapConcat((fieldList: FieldList) => U.obj2Arr(fieldList)
  .filter(field => field.type === 'PropertyField')
  .map(field => (field as PropertyField))
)


export const entityDetail_2_propFields = () => pipe(
  map((entityDetail: TeEnOrPeItDetail) => entityDetail._fields),
  fieldList_2_propFields()
)

/**
 * Returns an Observable that emits a PropertyField[] consisting of all fields of type 'PropertyField' contained in the PropertyList emitted by the source Observable.
 */
export const fieldList_2_propFields = () => map((fieldList: FieldList) => U.obj2Arr(fieldList).filter(field => field.type === 'PropertyField').map(field => (field as PropertyField)))

/**
 * Returns an Observable that emits a flattened RoleDetail[] contained by all items in the PropertyField[]
 * emitted by the source Observable.
 */
export const propFields_2_roleDetails = () => mapConcat((propField: PropertyField) => U.obj2Arr(propField._role_list));

/**
 * Returns an Observable that emits an array of pk_entity of Geo-PeIts contained as _leaf_peIt in the RoleDetail[]
 * emitted by the source Observable.
 */
export const roleDetails_2_geoPeItPks = () => map((rDs: RoleDetail[]) => rDs
  .filter(rD => (rD && rD._leaf_peIt && rD._leaf_peIt.pkEntity && (
    rD._leaf_peIt.fkClass === DfhConfig.CLASS_PK_BUILT_WORK ||
    rD._leaf_peIt.fkClass === DfhConfig.CLASS_PK_GEOGRAPHICAL_PLACE)))
  .map(rD => rD._leaf_peIt.pkEntity))



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
    const textA = stringFn(a).toUpperCase(); // ignore upper and lowercase
    const textB = stringFn(b).toUpperCase(); // ignore upper and lowercase
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

