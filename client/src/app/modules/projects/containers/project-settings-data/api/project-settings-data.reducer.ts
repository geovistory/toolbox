import { indexBy, prop } from 'ramda';
import { Action } from 'redux';
import { ProjectSettingsData, ClassItemI, DataUnitType } from './project-settings-data.models';
import { ProjectSettingsDataAPIAction, ProjectSettingsDataAPIActions } from './project-settings-data.actions';
import { DfhClass } from 'app/core';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';

const INITIAL_STATE = new ProjectSettingsData();

/**
 * inits for this item whether this is a TeEn or PeIt
 */
const initDataUnitType = (dfhClass: DfhClass): DataUnitType => {
  if (dfhClass && dfhClass.class_profile_view.length) {

    const sysType = dfhClass.class_profile_view[0].dfh_fk_system_type;

    switch (sysType) {
      case DfhConfig.PK_SYSTEM_TYPE_TEMPORAL_ENTITY:
        return 'teEnt'
        break;
      case DfhConfig.PK_SYSTEM_TYPE_PERSISTENT_ITEM:
        return 'peIt'
        break;
    }
  }
}

/**
 * Maps Array of DfhClass to Map of {dfh_pk_class: ClassItemI}
 *
 * @param classes array of DfhClass
 */
const classItemsFromDfhClasses = (classes: DfhClass[]): ClassItemI[] => {

  const classItems: ClassItemI[] = classes.map(c => ({
    pkClass: c.dfh_pk_class.toString(),
    dataUnitType: initDataUnitType(c),
    profileLabels: c.class_profile_view.map(prof => prof.dfh_profile_label).join(', '),
    profilePks: c.class_profile_view.map(prof => prof.dfh_fk_profile),
    enabled: true,
    title: c.dfh_standard_label,
    scopeNote: !c.text_properties ? '' : !c.text_properties.length ? '' : c.text_properties[0].dfh_text_property
  } as ClassItemI))

  return classItems;
}


export function projectSettingsDataReducer(state: ProjectSettingsData = INITIAL_STATE, a: Action): ProjectSettingsData {

  const action = a as ProjectSettingsDataAPIAction;

  switch (action.type) {
    case ProjectSettingsDataAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: [],
        loading: true,
        error: null,
      };
    case ProjectSettingsDataAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: classItemsFromDfhClasses(action.meta.itemsArray),
        loading: false,
        error: null,
      };
    case ProjectSettingsDataAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: [],
        loading: false,
        error: action.error,
      };
  }

  return state;
};

