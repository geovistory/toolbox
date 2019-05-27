import { ReducerConfigCollection } from "app/core/store/reducer-factory";

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
        keyInStore: 'fk_entity',
        groupByFn: (d): string => d.fk_entity.toString()
      },
      {
        keyInStore: 'fk_temporal_entity',
        groupByFn: (d): string => d.fk_temporal_entity.toString()
      },
      {
        keyInStore: 'fk_property',
        groupByFn: (d): string => d.fk_property.toString()
      },
      {
        keyInStore: 'fk_property__fk_temporal_entity',
        groupByFn: (d): string => d.fk_property.toString() + '_' + d.fk_temporal_entity.toString()
      },
      {
        keyInStore: 'fk_property__fk_entity',
        groupByFn: (d): string => d.fk_property.toString() + '_' + d.fk_entity.toString()
      }
    ]
  },
  entity_association: {
    facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: [
      {
        keyInStore: 'fk_property',
        groupByFn: (d): string => d.fk_property.toString()
      },
      {
        keyInStore: 'fk_info_domain',
        groupByFn: (d): string => d.fk_info_domain.toString()
      },
      {
        keyInStore: 'fk_info_range',
        groupByFn: (d): string => d.fk_info_range.toString()
      },
      {
        keyInStore: 'fk_data_domain',
        groupByFn: (d): string => d.fk_data_domain.toString()
      },
      {
        keyInStore: 'fk_data_range',
        groupByFn: (d): string => d.fk_data_range.toString()
      },
      {
        keyInStore: 'fk_property__fk_info_domain',
        groupByFn: (d): string => d.fk_property.toString() + '_' + d.fk_info_domain.toString()
      },
    ]
  },
  appellation: {
    facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: []
  },
}
