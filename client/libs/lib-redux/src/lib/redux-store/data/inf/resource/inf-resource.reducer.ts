import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infResourceFeature = 'resource'
export const infResourceReducerConfig: ReducerConfig<InfResource> = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfResource) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: [
    {
      keyInStore: 'fk_class',
      groupByFn: (d: InfResource): string => d.fk_class.toString()
    }
  ]
}


export const infResourceReducers = createModelReducers(infFeatureKey, infResourceFeature, infResourceReducerConfig)


