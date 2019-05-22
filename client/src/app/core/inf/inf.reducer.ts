import { ReducerConfigCollection, ReducerFactory } from 'app/core/store/reducer-factory';

const facetteByPk = 'by_project';

export const reducerDefinitions: ReducerConfigCollection = {
  persistent_item: {
    facetteByPk,
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: [
      {
        keyInStore: 'fk_class',
        groupByFn: (d): string => d.fk_class.toString()
      }
    ]
  }
}

export function createInfReducer() {
  return new ReducerFactory('inf', reducerDefinitions).createReducers()
}


