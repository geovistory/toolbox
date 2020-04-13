import { ReducerConfigCollection } from "app/core/store/reducer-factory";
import { InfRole, InfTextProperty } from "../sdk";
import { U } from '../util/util';

export const infRoot = 'inf';
export const facetteByPk = 'by_project';

export const infDefinitions: ReducerConfigCollection = {
  persistent_item: {
    facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: [
      {
        keyInStore: 'fk_class',
        groupByFn: (d): string => d.fk_class.toString()
      }
    ]
  },
  temporal_entity: {
    facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: [
      {
        keyInStore: 'fk_class',
        groupByFn: (d): string => d.fk_class.toString()
      }
    ]
  },
  role: {
    facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: [
      {
        keyInStore: 'subject',
        groupByFn: (d: InfRole): string => indexRoleBySubject(d)
      },
      {
        keyInStore: 'subject+property',
        groupByFn: (d: InfRole): string => indexRoleBySubjectProperty(d)
      },
      {
        keyInStore: 'object',
        groupByFn: (d: InfRole): string => indexRoleByObject(d)
      },
      {
        keyInStore: 'object+property',
        groupByFn: (d: InfRole): string => indexRoleByObjectProperty(d)
      },
      // {
      //   keyInStore: 'fk_entity',
      //   groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_entity)
      // },
      // {
      //   keyInStore: 'fk_temporal_entity',
      //   groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_temporal_entity)
      // },
      // {
      //   keyInStore: 'fk_property',
      //   groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_property)
      // },
      // {
      //   keyInStore: 'fk_property__fk_temporal_entity',
      //   groupByFn: (d: InfRole): string => U.toStrContains0undef([d.fk_property, d.fk_temporal_entity])
      // },
      // {
      //   keyInStore: 'fk_property__fk_entity',
      //   groupByFn: (d: InfRole): string => U.toStrContains0undef([d.fk_property, d.fk_entity])
      // },
      // {
      //   keyInStore: 'fk_property_of_property__fk_temporal_entity',
      //   groupByFn: (d: InfRole): string => U.toStrContains0undef([d.fk_property_of_property, d.fk_temporal_entity])
      // },
      {
        keyInStore: 'fk_subject_data',
        groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_subject_data)
      },
      // {
      //   keyInStore: 'fk_object_data',
      //   groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_object_data)
      // }
    ]
  },

  text_property: {
    facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: [
      {
        keyInStore: 'fk_concerned_entity__fk_class_field',
        groupByFn: (d: InfTextProperty): string => d.fk_concerned_entity + '_' + d.fk_class_field
      },
      {
        keyInStore: 'fk_concerned_entity',
        groupByFn: (d: InfTextProperty): string => d.fk_concerned_entity.toString()
      },
    ]
  },
  lang_string: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: []
  },
  appellation: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: []
  },
  time_primitive: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: []
  },
  place: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: []
  },
  language: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: []
  }
}





/**
 * This function creates a key for the given role by
 * - subject (all subject foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of roles with the same subject
 * or to retrieve roles from such a group index
 */
export function indexRoleBySubject(fks: IndexRoleBySubject = {}): string {
  return `${fks.fk_temporal_entity || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}`
}
export interface IndexRoleBySubject {
  fk_temporal_entity?: number;
  fk_subject_data?: number;
  fk_subject_tables_row?: number;
  fk_subject_tables_cell?: number;
};


/**
 * This function creates a key for the given role by
 * - object (all object foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of roles with the same object
 * or to retrieve roles from such a group index
 */
export function indexRoleByObject(fks: IndexRoleByObject = {}): string {
  return `${fks.fk_entity || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}`
}
export interface IndexRoleByObject {
  fk_entity?: number;
  fk_object_data?: number;
  fk_object_tables_row?: number;
  fk_object_tables_cell?: number;
};


/**
 * This function creates a key for the given role by
 * - subject (all subject foreign keys)
 * - property (all property foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of roles with the same subject + property
 * or to retrieve roles from such a group index
 */
export function indexRoleBySubjectProperty(fks: IndexRoleBySubjectProperty = {}): string {
  return `${fks.fk_temporal_entity || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`
}
export interface IndexRoleBySubjectProperty {
  fk_temporal_entity?: number;
  fk_subject_data?: number;
  fk_subject_tables_row?: number;
  fk_subject_tables_cell?: number;
  fk_property?: number;
  fk_property_of_property?: number;
}


/**
 * This function creates a key for the given role by
 * - object (all object foreign keys)
 * - property (all property foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of roles with the same object + property
 * or to retrieve roles from such a group index
 */
export function indexRoleByObjectProperty(fks: IndexRoleByObjectProperty = {}): string {
  return `${fks.fk_entity || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`
}
export interface IndexRoleByObjectProperty {
  fk_entity?: number;
  fk_object_data?: number;
  fk_object_tables_row?: number;
  fk_object_tables_cell?: number;
  fk_property?: number;
  fk_property_of_property?: number;
}

