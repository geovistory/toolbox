import { GvPositiveSchemaObject, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { createReducer, on } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../root/models/model';
import { datDefinitions } from './dat/dat.config';
import { schemaModifierActions } from './data.actions';
import { dfhDefinitions } from './dfh/dfh.config';
import { infDefinitions } from './inf/inf.config';
import { proDefinitions } from './pro/pro.config';
import { sysDefinitions } from './sys/sys.config';
import { tabDefinitions } from './tab/tab.config';
import { warDefinitions } from './war/war.config';
import { addToEntityModelMap, deleteItemsFromState, mergeItemsInState, ReducerConfigCollection } from './_helpers/crud-reducer-factory';

const definitions = {
  dat: datDefinitions,
  dfh: dfhDefinitions,
  inf: infDefinitions,
  pro: proDefinitions,
  sys: sysDefinitions,
  tab: tabDefinitions,
  war: warDefinitions,
}

export const dataReducer = createReducer({},
  on(schemaModifierActions.succeeded, (state: IAppState = {}, action: FluxStandardAction<GvSchemaModifier>) => {

    if (action.payload.positive) {
      state = {
        ...state.data,
        ...loopOverSchemaNames(state, action.payload.positive, addModels)
      }
    }
    if (action.payload.negative) {
      state = {
        ...state.data,
        ...loopOverSchemaNames(state, action.payload.positive, removeModels)
      }
    }
    return state;
  }))



function loopOverSchemaNames(state: IAppState, positive: GvPositiveSchemaObject, cb: (schemaData: any, schemaDef: ReducerConfigCollection, schemaState: any) => any) {

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
        pkEntityModelMap: {
          ...schemaState.pkEntityModelMap,
          ...addToEntityModelMap(modelData, modelName)
        }
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
        pkEntityModelMap: {
          ...schemaState.pkEntityModelMap,
          ...addToEntityModelMap(modelData, modelName)
        }
      }

    }
  });
  return schemaState
}
