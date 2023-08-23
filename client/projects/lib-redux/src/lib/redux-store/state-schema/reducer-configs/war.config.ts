import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ReducerConfigCollection } from '../_helpers/reducer-factory';

export const warRoot = 'war';

export const warDefinitions: ReducerConfigCollection = {
  entity_preview: {
    indexBy: {
      keyInStore: 'project_id__pk_entity',
      indexByFn: (item: WarEntityPreview) => item.project_id + '_' + item.pk_entity
    }
  }
}
