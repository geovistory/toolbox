import { GvPositiveSchemaObject, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, createReducer, on } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';
import { composeReducers } from '../_lib/composeReducers';
import { datDefinitions } from './dat/dat.config';
import { datReducers } from './dat/dat.reducers';
import { schemaModifierActions } from './data.actions';
import { DataState } from './data.model';
import { dfhDefinitions } from './dfh/dfh.config';
import { dfhReducers } from './dfh/dfh.reducers';
import { infDefinitions } from './inf/inf.config';
import { infReducers } from './inf/inf.reducers';
import { proDefinitions } from './pro/pro.config';
import { proReducers } from './pro/pro.reducers';
import { sysDefinitions } from './sys/sys.config';
import { sysReducers } from './sys/sys.reducers';
import { tabReducers } from './tab/sys.reducers';
import { tabDefinitions } from './tab/tab.config';
import { warDefinitions } from './war/war.config';
import { warReducers } from './war/war.reducers';
import { deleteItemsFromState, mergeItemsInState, ReducerConfigCollection } from './_lib/crud-reducer-factory';

const definitions = {
  dat: datDefinitions,
  dfh: dfhDefinitions,
  inf: infDefinitions,
  pro: proDefinitions,
  sys: sysDefinitions,
  tab: tabDefinitions,
  war: warDefinitions,
}

const dataRootReducers = createReducer({},
  on(schemaModifierActions.succeeded, (state: DataState = {}, action: FluxStandardAction<GvSchemaModifier>) => {

    if (action.payload.positive) {
      state = {
        ...state,
        ...loopOverSchemaNames(state, action.payload.positive, addModels)
      }
    }
    if (action.payload.negative) {
      state = {
        ...state,
        ...loopOverSchemaNames(state, action.payload.positive, removeModels)
      }
    }
    return state;
  }))



function loopOverSchemaNames(state: DataState, positive: GvPositiveSchemaObject, cb: (schemaData: any, schemaDef: ReducerConfigCollection, schemaState: any) => any) {

  Object.keys(positive).forEach(schemaName => {
    const schemaDef: ReducerConfigCollection = definitions[schemaName];
    if (schemaDef) {
      const schemaData = positive[schemaName];
      const schemaState = state[schemaName] || {}
      state = {
        ...state,
        [schemaName]: {
          ...schemaState,
          ...cb(schemaData, schemaDef, schemaState)
        }
      }

    }

  });
  return state;


}


function addModels(schemaData: any, schemaDef: ReducerConfigCollection, schemaState: any) {
  Object.keys(schemaData).forEach(modelName => {
    const modelDef = schemaDef[modelName];
    const modelData = schemaData[modelName];
    const modelState = schemaState[modelName] || {};
    if (modelDef) {
      schemaState = {
        ...schemaState,
        [modelName]: mergeItemsInState(modelDef, modelState, modelData),
        // pkEntityModelMap: {
        //   ...schemaState.pkEntityModelMap,
        //   ...addToEntityModelMap(modelData, modelName)
        // }
      }

    }
  });
  return schemaState
}




function removeModels(schemaData: any, schemaDef: ReducerConfigCollection, schemaState: any) {
  Object.keys(schemaData).forEach(modelName => {
    const modelDef = schemaDef[modelName];
    const modelData = schemaData[modelName];
    const modelState = schemaState[modelName] || {};
    if (modelDef) {
      schemaState = {
        ...schemaState,
        [modelName]: deleteItemsFromState(modelDef, modelState, modelData),
        // pkEntityModelMap: {
        //   ...schemaState.pkEntityModelMap,
        //   ...addToEntityModelMap(modelData, modelName)
        // }
      }

    }
  });
  return schemaState
}

export const dataReducer = composeReducers<DataState>(
  dataRootReducers,
  combineReducers<DataState>({
    dat: datReducers,
    dfh: dfhReducers,
    inf: infReducers,
    pro: proReducers,
    sys: sysReducers,
    tab: tabReducers,
    war: warReducers
  })
)
