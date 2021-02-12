import { ReducerConfigCollection } from '../_helpers';
export declare const infRoot = "inf";
export declare const infDefinitions: ReducerConfigCollection;
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
export declare function indexStatementBySubject(fks?: IndexStatementBySubject): string;
export interface IndexStatementBySubject {
    fk_subject_info?: number;
    fk_subject_data?: number;
    fk_subject_tables_row?: number;
    fk_subject_tables_cell?: number;
}
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
export declare function indexStatementByObject(fks?: IndexStatementByObject): string;
export interface IndexStatementByObject {
    fk_object_info?: number;
    fk_object_data?: number;
    fk_object_tables_row?: number;
    fk_object_tables_cell?: number;
}
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
export declare function indexStatementBySubjectProperty(fks?: IndexStatementBySubjectProperty): string;
export interface IndexStatementBySubjectProperty {
    fk_subject_info?: number;
    fk_subject_data?: number;
    fk_subject_tables_row?: number;
    fk_subject_tables_cell?: number;
    fk_property?: number;
    fk_property_of_property?: number;
}
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
export declare function indexStatementByObjectProperty(fks?: IndexStatementByObjectProperty): string;
export interface IndexStatementByObjectProperty {
    fk_object_info?: number;
    fk_object_data?: number;
    fk_object_tables_row?: number;
    fk_object_tables_cell?: number;
    fk_property?: number;
    fk_property_of_property?: number;
}
