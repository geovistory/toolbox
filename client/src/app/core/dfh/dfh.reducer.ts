import { StandardReducerFactory } from 'app/core/store/reducers';
import { combineReducers } from 'redux';
import { DfhClass } from '../sdk';
import { ClassSlice } from './dfh.models';



export function createDfhReducer() {
  return combineReducers({
    klass: new StandardReducerFactory<ClassSlice, DfhClass>('dfh', 'class', {
      indexBy: {
        keyInStore: 'dfh_pk_class',
        indexByFn: (item) => item.dfh_pk_class.toString()
      }
    }, {}).reducer,
    label: new StandardReducerFactory<ClassSlice, DfhClass>('dfh', 'label', {
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
        }
      ]
    }, {}).reducer
  });
}