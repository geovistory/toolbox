import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ClassSettings } from './class-settings.models';
import { ClassSettingsAPIAction, ClassSettingsAPIActions } from './class-settings.actions';

const INITIAL_STATE = new ClassSettings();

export function classSettingsReducer(state: ClassSettings = INITIAL_STATE, a: Action): ClassSettings {

  const action = a as ClassSettingsAPIAction;

  switch (action.type) {
    case ClassSettingsAPIActions.LOAD_STARTED:
      return {
        ...state,
        dfhClass: undefined
      };
    case ClassSettingsAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        dfhClass: action.meta.dfhClass
      };
    case ClassSettingsAPIActions.LOAD_FAILED:
      return {
        ...state,
        dfhClass: undefined
      };
  }

  return state;
};

