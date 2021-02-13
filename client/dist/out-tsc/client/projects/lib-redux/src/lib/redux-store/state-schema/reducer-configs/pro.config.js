export const proRoot = 'pro';
export const textPropertyByFksKey = (d) => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_language || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}`;
export const textPropertyByFksWithoutLang = (d) => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}`;
export const proClassFieldConfgByProjectAndClassKey = (d) => {
    const fk_class = d.fk_range_class || d.fk_domain_class || d.fk_class_for_class_field;
    return `${d.fk_project || null}_${fk_class || null}`;
};
export const proDefinitions = {
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
            }
        ]
    },
    dfh_class_proj_rel: {
        indexBy: {
            keyInStore: 'fk_project__fk_class',
            indexByFn: (item) => item.fk_project + '_' + item.fk_class
        },
        groupBy: [
            {
                keyInStore: 'fk_project__enabled_in_entities',
                groupByFn: (d) => d.fk_project + '_' + d.enabled_in_entities
            },
            {
                keyInStore: 'fk_project',
                groupByFn: (d) => d.fk_project.toString()
            }
        ],
    },
    dfh_profile_proj_rel: {
        indexBy: {
            keyInStore: 'fk_project__fk_profile',
            indexByFn: (item) => item.fk_project + '_' + item.fk_profile
        },
        groupBy: [
            {
                keyInStore: 'fk_project__enabled',
                groupByFn: (d) => d.fk_project + '_' + d.enabled
            },
            {
                keyInStore: 'fk_project',
                groupByFn: (d) => d.fk_project.toString()
            }
        ],
    },
    text_property: {
        indexBy: {
            keyInStore: 'fks',
            indexByFn: textPropertyByFksKey
        },
        groupBy: [
            {
                keyInStore: 'fks_without_lang',
                groupByFn: textPropertyByFksWithoutLang
            }
        ]
    },
    analysis: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (item) => item.pk_entity.toString()
        }
    }
};
//# sourceMappingURL=pro.config.js.map