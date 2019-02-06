import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { concat } from 'ramda';
import { OperatorFunction, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { FieldList, PeItDetail, PropertyField, RoleDetail, TeEntDetail } from '../state/models';
import { U } from './util';

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


