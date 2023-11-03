import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { datFeatureKey } from "../dat.feature.key";

export const datNamespaceFeature = 'namespace'
export const datNamespaceReducerConfig: ReducerConfig = {
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

export const datNamespaceReducers = createModelReducers(datFeatureKey, datNamespaceFeature, datNamespaceReducerConfig)


