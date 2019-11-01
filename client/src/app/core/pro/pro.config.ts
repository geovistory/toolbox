import { ReducerConfigCollection } from "app/core/store/reducer-factory";
import { ProClassFieldConfig, ProDfhClassProjRel, ProPropertyLabel } from "../sdk";

export const proRoot = 'pro';

export const proDefinitions: ReducerConfigCollection = {
  info_proj_rel: {
    indexBy: {
      keyInStore: 'fk_project__fk_entity',
      indexByFn: (item) => item.fk_project.toString() + '_' + item.fk_entity.toString()
    }
  },
  class_field_config: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'fk_class__fk_app_context',
        groupByFn: (d: ProClassFieldConfig): string => d.fk_class + '_' + d.fk_app_context
      },
      {
        keyInStore: 'fk_property__property_is_outgoing__fk_app_context',
        groupByFn: (d: ProClassFieldConfig): string => d.fk_property + '_' + d.property_is_outgoing + '_' + d.fk_app_context
      }
    ]
  },
  dfh_class_proj_rel: {
    indexBy: {
      keyInStore: 'fk_project__fk_entity',
      indexByFn: (item) => item.fk_project + '_' + item.fk_entity
    },
    groupBy: [
      {
        keyInStore: 'fk_project__enabled_in_entities',
        groupByFn: (d: ProDfhClassProjRel): string => d.fk_project + '_' + d.enabled_in_entities
      }
    ]
  },
  property_label: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item: ProPropertyLabel) => item.pk_entity.toString()
    },
    groupBy: [
      {
        keyInStore: 'fk_project__fk_property__fk_domain_class__fk_range_class',
        groupByFn: (d: ProPropertyLabel): string => d.fk_project + '_' + d.fk_property + '_' + d.fk_domain_class + '_' + d.fk_range_class
      },
      {
        keyInStore: 'fk_project__fk_property__fk_domain_class__fk_range_class__fk_system_type',
        groupByFn: (d: ProPropertyLabel): string => d.fk_project + '_' + d.fk_property + '_' + d.fk_domain_class + '_' + d.fk_range_class + '_' + d.fk_system_type
      }
    ]
  }
}
