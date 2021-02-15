import { ReducerConfigCollection } from "@kleiolab/lib-redux";
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
