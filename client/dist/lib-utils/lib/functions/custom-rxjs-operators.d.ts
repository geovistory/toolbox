import { OperatorFunction } from 'rxjs';
export interface ByPk<T> {
    [pk: string]: T;
}
export interface VersionEntity<T> {
    _latestVersion: number;
    [v: number]: T;
}
export interface EntityVersionsByPk<T> {
    [pk_entity: number]: VersionEntity<T>;
}
/*****************************************************************************
 * Generic operators
 *****************************************************************************/
/**
 * Returns an Observable that emits an flatened array consisting of the items of the arrays returned by getArrayFromItemFn.
 */
export declare function mapConcat<T, R>(getArrayFromItemFn: (value: T) => R[]): OperatorFunction<T[], R[]>;
/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an array containing the latest versions for each indexed entity
 */
export declare function latestEntityVersions<T>(): OperatorFunction<EntityVersionsByPk<T>, T[]>;
/**
 * Takes an object with EntityVersions indexed by pk
 * Returns an the latest versions for entity with given pkEntity
 */
export declare function latestEntityVersion<T>(pkEntity: number): OperatorFunction<EntityVersionsByPk<T>, T>;
export declare function latestVersion<T>(versions: ByPk<T>): T;
export declare function getSpecificVersion<T>(versions: ByPk<T>, version: any): T;
/**
 * limits the number of items in array
 */
export declare function limitTo<T>(limit?: number): OperatorFunction<T[], T[]>;
/**
 * limits the number of items in array
 */
export declare function limitOffset<T>(limit?: number, offset?: number): OperatorFunction<T[], T[]>;
export declare function sortAbc<T>(stringFn: (x: T) => string): OperatorFunction<T[], T[]>;
