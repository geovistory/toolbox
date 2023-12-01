import { GvNegativeSchemaObject, GvPositiveSchemaObject, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { combineReducers, createReducer, on } from '@ngrx/store';
import { FluxStandardAction } from 'flux-standard-action';
import { composeReducers } from '../_lib/composeReducers';
import { deleteItemsFromState, mergeItemsInState } from './_lib/crud-reducer-factory';
import { datDefinitions } from './dat/dat.config';
import { datReducers } from './dat/dat.reducers';
import { schemaModifierActions, setDataState } from './data.actions';
import { DataState } from './data.model';
import { dfhDefinitions } from './dfh/dfh.config';
import { dfhReducers } from './dfh/dfh.reducers';
import { infDefinitions } from './inf/inf.config';
import { infReducers } from './inf/inf.reducers';
import { pendingReducers } from './pending/pending.reducers';
import { proDefinitions } from './pro/pro.config';
import { proReducers } from './pro/pro.reducers';
import { resolvedReducers } from './resolved/resolved.reducers';
import { sysDefinitions } from './sys/sys.config';
import { sysReducers } from './sys/sys.reducers';
import { tabReducers } from './tab/sys.reducers';
import { tabDefinitions } from './tab/tab.config';
import { warDefinitions } from './war/war.config';
import { warReducers } from './war/war.reducers';

class Definitions {
  dat = new datDefinitions();
  dfh = new dfhDefinitions();
  inf = new infDefinitions();
  pro = new proDefinitions();
  sys = new sysDefinitions();
  tab = new tabDefinitions();
  war = new warDefinitions();
}

const definitions = new Definitions();

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
        ...loopOverSchemaNames(state, action.payload.negative, removeModels)
      }
    }
    return state;
  }),
  // set the entire data state
  on(setDataState, (_, action) => action.data)
)



function loopOverSchemaNames(state: DataState, schemaObject: GvPositiveSchemaObject | GvNegativeSchemaObject, cb: (schemaData: any, schemaDef: Definitions, schemaState: any) => any) {

  Object.keys(schemaObject).forEach(schemaName => {
    const schemaDef = definitions[schemaName];
    if (schemaDef) {
      const schemaData = schemaObject[schemaName];
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


function addModels(schemaData: any, schemaDef: Definitions, schemaState: any) {
  Object.keys(schemaData).forEach(modelName => {
    const modelDef = schemaDef[modelName];
    const modelData = schemaData[modelName];
    const modelState = schemaState[modelName] || {};
    if (modelDef) {
      schemaState = {
        ...schemaState,
        [modelName]: mergeItemsInState(modelDef, modelState, modelData),
      }

    }
  });
  return schemaState
}




function removeModels(schemaData: any, schemaDef: Definitions, schemaState: any) {
  Object.keys(schemaData).forEach(modelName => {
    const modelDef = schemaDef[modelName];
    const modelData = schemaData[modelName];
    const modelState = schemaState[modelName] || {};
    if (modelDef) {
      schemaState = {
        ...schemaState,
        [modelName]: deleteItemsFromState(modelDef, modelState, modelData),
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
    war: warReducers,
    pending: pendingReducers,
    resolved: resolvedReducers
  })
)
