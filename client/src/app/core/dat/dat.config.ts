import { ReducerConfigCollection } from 'app/core/store/reducer-factory';
import { DatDigital } from '../sdk';

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
