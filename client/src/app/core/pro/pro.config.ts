import { ReducerConfigCollection } from "app/core/store/reducer-factory";
import { ProClassFieldConfig, ProDfhClassProjRel, ProTextProperty, ProAnalysis } from "../sdk";

export const proRoot = 'pro';


export const textPropertyByFksKey = (d: Partial<ProTextProperty>) => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_language || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}`
export const textPropertyByFksWithoutLang = (d: Partial<ProTextProperty>): string => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}`;
export const proClassFieldConfgByProjectAndClassKey = (d: Partial<ProClassFieldConfig>): string => {
  const fk_class = d.fk_range_class || d.fk_domain_class || d.fk_class_for_class_field;
  return `${d.fk_project || null}_${fk_class || null}`;
};

export const proDefinitions: ReducerConfigCollection = {
  project: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => item.pk_entity.toString()
    }
  },
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
        keyInStore: 'fk_project__fk_class',
        groupByFn: proClassFieldConfgByProjectAndClassKey
      },
      // {
      //   keyInStore: 'fk_class__fk_app_context',
      //   groupByFn: (d: ProClassFieldConfig): string => {
      //     const fk_class = d.fk_range_class || d.fk_domain_class || d.fk_class_for_class_field
      //     return fk_class + '_' + d.fk_app_context
      //   }
      // },
      // {
      //   keyInStore: 'fk_property__fk_domain_class__fk_app_context',
      //   groupByFn: (d: ProClassFieldConfig): string => d.fk_property + '_' + d.fk_domain_class + '_' + d.fk_app_context
      // },
      // {
      //   keyInStore: 'fk_property__fk_range_class__fk_app_context',
      //   groupByFn: (d: ProClassFieldConfig): string => d.fk_property + '_' + d.fk_range_class + '_' + d.fk_app_context
      // },
    ]
  },
  dfh_class_proj_rel: {
    indexBy: {
      keyInStore: 'fk_project__fk_class',
      indexByFn: (item: ProDfhClassProjRel) => item.fk_project + '_' + item.fk_class
    },
    groupBy: [
      {
        keyInStore: 'fk_project__enabled_in_entities',
        groupByFn: (d: ProDfhClassProjRel): string => d.fk_project + '_' + d.enabled_in_entities
      },
      {
        keyInStore: 'fk_project',
        groupByFn: (d: ProDfhClassProjRel): string => d.fk_project.toString()
      }
    ],
  },
  text_property: {
    indexBy: {
      keyInStore: 'fks',
      indexByFn: textPropertyByFksKey
    },
    groupBy: [
      // {
      //   keyInStore: 'fk_project__fk_dfh_class__fk_system_type__fk_language',
      //   groupByFn: (d: ProTextProperty): string => !d.fk_dfh_class ? undefined : `${d.fk_project}_${d.fk_dfh_class}_${d.fk_system_type}_${d.fk_language}`
      // },
      // {
      //   keyInStore: 'fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language',
      //   groupByFn: (d: ProTextProperty): string => !d.fk_dfh_property_domain ? undefined : `${d.fk_project}_${d.fk_dfh_property}_${d.fk_dfh_property_domain}_${d.fk_system_type}_${d.fk_language}`
      // },
      {
        keyInStore: 'fks_without_lang',
        groupByFn: textPropertyByFksWithoutLang
      }
    ]
  },
  analysis: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item: ProAnalysis) => item.pk_entity.toString()
    }
  }
}
