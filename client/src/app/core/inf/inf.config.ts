import { ReducerConfigCollection } from "app/core/store/reducer-factory";
import { InfTextProperty, InfRole } from "../sdk";

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
        groupByFn: (d: InfRole): string => d.fk_entity.toString()
      },
      {
        keyInStore: 'fk_temporal_entity',
        groupByFn: (d: InfRole): string => d.fk_temporal_entity.toString()
      },
      {
        keyInStore: 'fk_property',
        groupByFn: (d: InfRole): string => d.fk_property.toString()
      },
      {
        keyInStore: 'fk_property__fk_temporal_entity',
        groupByFn: (d: InfRole): string => d.fk_property.toString() + '_' + d.fk_temporal_entity.toString()
      },
      {
        keyInStore: 'fk_property__fk_entity',
        groupByFn: (d: InfRole): string => d.fk_property.toString() + '_' + d.fk_entity.toString()
      },
      {
        keyInStore: 'fk_data_subject',
        groupByFn: (d: InfRole): string => d.fk_data_subject.toString()
      },
      {
        keyInStore: 'fk_data_object',
        groupByFn: (d: InfRole): string => d.fk_data_object.toString()
      }
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
