import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ClassSettings } from './class-settings.models';
import { ClassSettingsAPIAction, ClassSettingsAPIActions } from './class-settings.actions';

const INITIAL_STATE = new ClassSettings();

export function classSettingsReducer(state: ClassSettings = INITIAL_STATE, a: Action): ClassSettings {

  const action = a as ClassSettingsAPIAction;

  /**************************************************
   * Reducers to manage initial loading
   **************************************************/
  switch (action.type) {
    case ClassSettingsAPIActions.LOAD_STARTED:
      state = {
        ...state,
        dfhClass: undefined,
        namespaces: undefined
      };
      break;
    case ClassSettingsAPIActions.LOAD_SUCCEEDED:
      state = {
        ...state,
        dfhClass: action.meta.dfhClass,
        namespaces: action.meta.namespaces
      };
      break;
    case ClassSettingsAPIActions.LOAD_FAILED:
      state = {
        ...state,
        dfhClass: undefined,
        namespaces: undefined
      };
      break;

    /**************************************************
     * Reducers to manage vocabularies
     **************************************************/

    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case ClassSettingsAPIActions.DESTROY:
      return undefined;
  }

  return state;
};

