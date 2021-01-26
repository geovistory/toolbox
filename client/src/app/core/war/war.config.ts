import { ReducerConfigCollection } from 'app/core/redux-store/reducer-factory';
import { WarEntityPreview } from '../sdk';

export const warRoot = 'war';

export const warDefinitions: ReducerConfigCollection = {
  entity_preview: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item: WarEntityPreview) => item.pk_entity.toString()
    }
  }
}
