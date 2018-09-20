import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ProjectSettingsData } from './project-settings-data.models';
import { ProjectSettingsDataAPIAction, ProjectSettingsDataAPIActions } from './project-settings-data.actions';

const INITIAL_STATE = new ProjectSettingsData();

export function projectSettingsDataReducer(state: ProjectSettingsData = INITIAL_STATE, a: Action): ProjectSettingsData {

  const action = a as ProjectSettingsDataAPIAction;

  switch (action.type) {
    case ProjectSettingsDataAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: {},
        loading: true,
        error: null,
      };
    case ProjectSettingsDataAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: indexBy(prop('pk_entity'), action.meta.itemsArray), // <- change index prop
        loading: false,
        error: null,
      };
    case ProjectSettingsDataAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: {},
        loading: false,
        error: action.error,
      };
  }

  return state;
};

