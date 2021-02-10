import { ReducerConfigCollection } from 'projects/toolbox/src/app/core/redux-store/reducer-factory';
import { DatDigital } from '../sdk';
import { DatClassColumnMapping } from '../sdk-lb4';
import { DatTextProperty } from '../sdk/models/DatTextProperty';

export const datRoot = 'dat';
export const facetteByPk = 'by_namespace';

export const datDefinitions: ReducerConfigCollection = {
  digital: {
    equals: (newItem: DatDigital, oldItem: DatDigital) => {
      if (!oldItem.quill_doc && newItem.quill_doc) return false;
      return (
        newItem.pk_entity === oldItem.pk_entity &&
        newItem.entity_version === oldItem.entity_version
      )
    },
    indexBy: {
      keyInStore: 'pk_entity__entity_version',
      indexByFn: (item) => item.pk_entity.toString() + '_' + item.entity_version.toString()
    },
    groupBy: [
      {
        keyInStore: 'pk_entity',
        groupByFn: (item): string => item.pk_entity.toString()
      },
      {
        keyInStore: 'pk_text',
        groupByFn: (item): string => item.pk_text.toString()
      }
    ]
  },
  chunk: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'fk_text',
        groupByFn: (item): string => item.fk_text.toString()
      }
    ]
  },
  column: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'fk_digital',
        groupByFn: (item): string => item.fk_digital.toString()
      }
    ]
  },
  class_column_mapping: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'fk_column',
        groupByFn: (item: DatClassColumnMapping): string => item.fk_column.toString()
      }
    ]
  },
  text_property: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'fk_entity__fk_system_type',
        groupByFn: (item: DatTextProperty): string => item.fk_entity + '_' + item.fk_system_type
      }
    ]
  },
  namespace: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'fk_project',
        groupByFn: (item): string => item.fk_project.toString()
      }
    ]
  }
}
