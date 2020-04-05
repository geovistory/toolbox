import { ReducerConfigCollection } from "app/core/store/reducer-factory";
import { InfTextProperty, InfRole, InfLangString } from "../sdk";
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
        keyInStore: 'fk_entity',
        groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_entity)
      },
      {
        keyInStore: 'fk_temporal_entity',
        groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_temporal_entity)
      },
      {
        keyInStore: 'fk_property',
        groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_property)
      },
      {
        keyInStore: 'fk_property__fk_temporal_entity',
        groupByFn: (d: InfRole): string => U.toStrContains0undef([d.fk_property, d.fk_temporal_entity])
      },
      {
        keyInStore: 'fk_property__fk_entity',
        groupByFn: (d: InfRole): string => U.toStrContains0undef([d.fk_property, d.fk_entity])
      },
      {
        keyInStore: 'fk_property_of_property__fk_temporal_entity',
        groupByFn: (d: InfRole): string => U.toStrContains0undef([d.fk_property_of_property, d.fk_temporal_entity])
      },
      {
        keyInStore: 'fk_subject_data',
        groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_subject_data)
      },
      {
        keyInStore: 'fk_object_data',
        groupByFn: (d: InfRole): string => U.toStr0undef(d.fk_object_data)
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
  lang_string: {
    facetteByPk,
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
