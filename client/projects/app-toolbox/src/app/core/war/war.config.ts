import { ReducerConfigCollection } from 'projects/app-toolbox/src/app/core/redux-store/reducer-factory';
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";

export const warRoot = 'war';

export const warDefinitions: ReducerConfigCollection = {
  entity_preview: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item: WarEntityPreview) => item.pk_entity.toString()
    }
  }
}
