import { ReducerConfigCollection, ReducerFactory } from 'app/core/store/reducer-factory';

export const reducerDefinitions: ReducerConfigCollection = {
  klass: {
    indexBy: {
      keyInStore: 'dfh_pk_class',
      indexByFn: (item) => item.dfh_pk_class.toString()
    }
  },
  label: {
    indexBy: {
      keyInStore: 'pk_entity',
      indexByFn: (item) => {
        return item.pk_entity.toString()
      }
    },
    groupBy: [
      {
        keyInStore: 'dfh_fk_class',
        groupByFn: (d): string => d.dfh_fk_class.toString()
      },
      {
        keyInStore: 'dfh_fk_property',
        groupByFn: (d): string => d.dfh_fk_property.toString()
      }
    ]
  }
}

export function createDfhReducer() {
  return new ReducerFactory('dfh', reducerDefinitions).createReducers()
}