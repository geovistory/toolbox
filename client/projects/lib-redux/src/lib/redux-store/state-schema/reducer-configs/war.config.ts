import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ReducerConfigCollection } from '../_helpers/reducer-factory';

export const warRoot = 'war';

export const warDefinitions: ReducerConfigCollection = {
  entity_preview: {
    indexBy: {
      keyInStore: 'project__pk_entity',
      indexByFn: (item: WarEntityPreview) => item.project + '_' + item.pk_entity
    }
  }
}
