import { combineReducers } from 'redux';
import { SysSystemRelevantClass } from '../sdk';
import { StandardReducerFactory } from '../store/reducers';
import { SystemRelevantClassSlice } from './system.models';


export function createSystemReducer() {
  return combineReducers({
    systemRelevantClass: new StandardReducerFactory<SystemRelevantClassSlice, SysSystemRelevantClass>('system', 'systemRelevantClass', {
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
    }, {}).reducer
  });
}