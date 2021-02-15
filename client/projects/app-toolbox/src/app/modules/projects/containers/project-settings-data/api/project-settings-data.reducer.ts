import { ProjectSettingsData } from '@kleiolab/lib-redux';
import { Action } from 'redux';
import { ProjectSettingsDataAPIAction, ProjectSettingsDataAPIActions } from './project-settings-data.actions';

const INITIAL_STATE = new ProjectSettingsData();


export function projectSettingsDataReducer(state: ProjectSettingsData = INITIAL_STATE, a: Action): ProjectSettingsData {

  const action = a as ProjectSettingsDataAPIAction;

  switch (action.type) {
    /*****************************************************
    * Set tab title
    *****************************************************/
    case ProjectSettingsDataAPIActions.SET_TAB_TITLE:
      state = {
        ...state,
        tabTitle: action.meta.tabTitle
      };
      break;

    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case ProjectSettingsDataAPIActions.DESTROY:
      return undefined;

  }

  return state;
};

