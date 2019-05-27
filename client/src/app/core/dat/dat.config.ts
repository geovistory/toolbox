import { ReducerConfigCollection } from "app/core/store/reducer-factory";

export const datRoot = 'dat';
export const facetteByPk = 'by_namespace';

export const datDefinitions: ReducerConfigCollection = {
  digital: {
    // facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity__entity_version',
      indexByFn: (item) => item.pk_entity.toString() + '_' + item.entity_version.toString()
    },
    groupBy: [
      {
        keyInStore: 'pk_entity',
        groupByFn: (item): string => item.pk_entity.toString()
      }
    ]
  }
}
