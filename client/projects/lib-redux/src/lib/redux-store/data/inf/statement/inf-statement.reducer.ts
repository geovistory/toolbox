import { InfStatement } from '@kleiolab/lib-sdk-lb4';
import { U } from '@kleiolab/lib-utils';
import { CrudReducerFactory, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infStatementFeature = 'statement'
export const infStatementReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfStatement) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: [
    {
      keyInStore: 'subject',
      groupByFn: (d: InfStatement): string => indexStatementBySubject(d)
    },
    {
      keyInStore: 'subject+property',
      groupByFn: (d: InfStatement): string => indexStatementBySubjectProperty(d)
    },
    {
      keyInStore: 'object',
      groupByFn: (d: InfStatement): string => indexStatementByObject(d)
    },
    {
      keyInStore: 'object+property',
      groupByFn: (d: InfStatement): string => indexStatementByObjectProperty(d)
    },

    {
      keyInStore: 'fk_subject_data',
      groupByFn: (d: InfStatement): string => U.toStr0undef(d.fk_subject_data)
    },
  ]
}


export const infStatementReducers = new CrudReducerFactory(infFeatureKey, { [infStatementFeature]: infStatementReducerConfig }).createReducers();




/**
 * This function creates a key for the given statement by
 * - subject (all subject foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same subject
 * or to retrieve statements from such a group index
 */
export function indexStatementBySubject(fks: InfStatementSubjectFks = {}): string {
  return `${fks.fk_subject_info || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}`
}


export type InfStatementSubjectFks = Pick<InfStatement,
  'fk_subject_info' |
  'fk_subject_data' |
  'fk_subject_tables_cell' |
  'fk_subject_tables_row'
>;

/**
 * This function creates a key for the given statement by
 * - object (all object foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same object
 * or to retrieve statements from such a group index
 */
export function indexStatementByObject(fks: InfStatementObjectFks = {}): string {
  return `${fks.fk_object_info || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}`
}

export type InfStatementObjectFks = Pick<InfStatement,
  'fk_object_info' |
  'fk_object_data' |
  'fk_object_tables_cell' |
  'fk_object_tables_row'
>;


/**
 * This function creates a key for the given statement by
 * - subject (all subject foreign keys)
 * - property (all property foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same subject + property
 * or to retrieve statements from such a group index
 */
export function indexStatementBySubjectProperty(fks: InfStatementSubjectAndProperyFks = {}): string {
  return `${fks.fk_subject_info || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`
}

export type InfStatementProperyFks = Pick<InfStatement,
  'fk_property' |
  'fk_property_of_property'
>;
export type InfStatementSubjectAndProperyFks = InfStatementSubjectFks & InfStatementProperyFks



/**
 * This function creates a key for the given statement by
 * - object (all object foreign keys)
 * - property (all property foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same object + property
 * or to retrieve statements from such a group index
 */
export function indexStatementByObjectProperty(fks: InfStatementObjectAndProperyFks = {}): string {
  return `${fks.fk_object_info || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`
}
export type InfStatementObjectAndProperyFks = InfStatementObjectFks & InfStatementProperyFks

