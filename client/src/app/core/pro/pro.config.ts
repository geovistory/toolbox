import { ReducerConfigCollection } from "app/core/store/reducer-factory";

export const proRoot = 'pro';

export const proDefinitions: ReducerConfigCollection = {
  info_proj_rel: {
    indexBy: {
      keyInStore: 'fk_project__fk_entity',
      indexByFn: (item) => item.fk_project.toString() + '_' + item.fk_entity.toString()
    }
  }
}
