import { DfhClass, DfhClassProfileView, U, ClassConfig } from 'app/core';
import { ProDfhClassProjRel } from 'app/core/sdk/models/ProDfhClassProjRel';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { clone } from 'ramda';
import { Action } from 'redux';
import { ProjectSettingsDataAPIAction, ProjectSettingsDataAPIActions } from './project-settings-data.actions';
import { EntityType, ProjectSettingsData } from './project-settings-data.models';

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

