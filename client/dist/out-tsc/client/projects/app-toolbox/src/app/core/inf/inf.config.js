import { U } from '../util/util';
export const infRoot = 'inf';
export const infDefinitions = {
    persistent_item: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: [
            {
                keyInStore: 'fk_class',
                groupByFn: (d) => d.fk_class.toString()
            }
        ]
    },
    temporal_entity: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: [
            {
                keyInStore: 'fk_class',
                groupByFn: (d) => d.fk_class.toString()
            }
        ]
    },
    statement: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: [
            {
                keyInStore: 'subject',
                groupByFn: (d) => indexStatementBySubject(d)
            },
            {
                keyInStore: 'subject+property',
                groupByFn: (d) => indexStatementBySubjectProperty(d)
            },
            {
                keyInStore: 'object',
                groupByFn: (d) => indexStatementByObject(d)
            },
            {
                keyInStore: 'object+property',
                groupByFn: (d) => indexStatementByObjectProperty(d)
            },
            {
                keyInStore: 'fk_subject_data',
                groupByFn: (d) => U.toStr0undef(d.fk_subject_data)
            },
        ]
    },
    text_property: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: [
            {
                keyInStore: 'fk_concerned_entity__fk_class_field',
                groupByFn: (d) => d.fk_concerned_entity + '_' + d.fk_class_field
            },
            {
                keyInStore: 'fk_concerned_entity',
                groupByFn: (d) => d.fk_concerned_entity.toString()
            },
        ]
    },
    lang_string: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: []
    },
    appellation: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: []
    },
    time_primitive: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: []
    },
    place: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: []
    },
    language: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: []
    },
    dimension: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => {
                return item.pk_entity.toString();
            }
        },
        groupBy: []
    },
};
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
export function indexStatementBySubject(fks = {}) {
    return `${fks.fk_subject_info || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}`;
}
;
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
export function indexStatementByObject(fks = {}) {
    return `${fks.fk_object_info || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}`;
}
;
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
export function indexStatementBySubjectProperty(fks = {}) {
    return `${fks.fk_subject_info || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`;
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
export function indexStatementByObjectProperty(fks = {}) {
    return `${fks.fk_object_info || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`;
}
//# sourceMappingURL=inf.config.js.map