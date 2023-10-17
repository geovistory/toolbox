import { GvPositiveSchemaObject, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../../root/models/model';
import { infDefinitions } from '../inf/inf.config';
import { datDefinitions } from '../reducer-configs/dat.config';
import { dfhDefinitions } from '../reducer-configs/dfh.config';
import { proDefinitions } from '../reducer-configs/pro.config';
import { sysDefinitions } from '../reducer-configs/sys.config';
import { tabDefinitions } from '../reducer-configs/tab.config';
import { warDefinitions } from '../reducer-configs/war.config';
import { addToEntityModelMap, mergeItemsInState, ReducerConfigCollection } from '../_helpers/crud-reducer-factory';
import { GvSchemaActions } from './schema.actions';

const definitions = {
  dat: datDefinitions,
  dfh: dfhDefinitions,
  inf: infDefinitions,
  pro: proDefinitions,
  sys: sysDefinitions,
  tab: tabDefinitions,
  war: warDefinitions,

}
export const schemaModifierReducer = (state: IAppState = {}, action: FluxStandardAction<GvSchemaModifier>) => {

  if (action.type === GvSchemaActions.GV_MODIFIER_LOAD_SUCCEEDED) {
    if (action.payload.positive) {

      state = {
        ...state,
        ...loopOverSchemaNames(state, action.payload.positive)
      }
    }
    if (action.payload.negative) {
      // todo
    }

  }
  return state;
}


function loopOverSchemaNames(state: IAppState, positive: GvPositiveSchemaObject) {

  Object.keys(positive).forEach(schemaName => {
    const schemaDef: ReducerConfigCollection = definitions[schemaName];
    if (schemaDef) {
      const schemaData = positive[schemaName];
      const schemaState = state[schemaName] || {}
      state = {
        ...state,
        [schemaName]: {
          ...schemaState,
          ...loopOverModels(schemaData, schemaDef, schemaState)
        }
      }

    }

  });
  return state;


}


function loopOverModels(schemaData: any, schemaDef: ReducerConfigCollection, schemaState: any) {
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
