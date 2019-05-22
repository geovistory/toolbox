import { ReducerConfigCollection, ReducerFactory } from '../store/reducer-factory';


export const reducerDefinitions: ReducerConfigCollection = {
  system_relevant_class: {
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
      },
      {
        keyInStore: 'required_by_sources',
        groupByFn: (d): string => d.required_by_sources.toString()
      }
    ]
  }
}

export function createSysReducer() {
  return new ReducerFactory('sys', reducerDefinitions).createReducers()
}