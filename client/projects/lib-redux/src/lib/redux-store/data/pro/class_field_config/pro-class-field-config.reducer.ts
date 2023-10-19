import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proClassFieldConfgByProjectAndClassKey = (d: Partial<ProClassFieldConfig>): string => {
  const fk_class = d.fk_range_class || d.fk_domain_class || d.fk_class_for_class_field;
  return `${d.fk_project || null}_${fk_class || null}`;
};
export const proClassFieldConfigFeature = 'class_field_config'
export const proClassFieldConfigReducerConfig: ReducerConfig = {
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
}


export const proClassFieldConfigReducers = new CrudReducerFactory(proFeatureKey, { [proClassFieldConfigFeature]: proClassFieldConfigReducerConfig }).createReducers();


