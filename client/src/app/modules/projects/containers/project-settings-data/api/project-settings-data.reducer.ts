import { indexBy, prop, clone } from 'ramda';
import { Action } from 'redux';
import { ProjectSettingsData, ClassItemI, DataUnitType } from './project-settings-data.models';
import { ProjectSettingsDataAPIAction, ProjectSettingsDataAPIActions } from './project-settings-data.actions';
import { DfhClass, DfhClassProfileView, U } from 'app/core';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { DfhProjRel } from 'app/core/sdk/models/DfhProjRel';

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
 * inits for this item whether this is_in_project or not
 */
const getProjRel = (dfhClass: DfhClass): DfhProjRel => {
  if (dfhClass && dfhClass.proj_rels && dfhClass.proj_rels.length && dfhClass.proj_rels[0]) {
    return dfhClass.proj_rels[0];
  } else return undefined;
}

/**
 * Maps Array of DfhClass to Map of {dfh_pk_class: ClassItemI}
 *
 * @param classes array of DfhClass
 */
const classItemsFromDfhClasses = (classes: DfhClass[]): ClassItemI[] => {

  const classItems: ClassItemI[] = classes.map(c => ({
    pkEntity: c.pk_entity,
    pkClass: c.dfh_pk_class.toString(),
    dataUnitType: initDataUnitType(c),
    profileLabels: c.class_profile_view.map(prof => prof.dfh_profile_label).join(', '),
    profilePks: c.class_profile_view.map(prof => prof.dfh_fk_profile),
    projRel: getProjRel(c),
    title: c.dfh_standard_label,
    scopeNote: !c.text_properties ? '' : !c.text_properties.length ? '' : c.text_properties[0].dfh_text_property,
    changingProjRel: false
  } as ClassItemI))

  return classItems;
}

/**
 * extracts list of distinct profiles from class list
 */
const getProfiles = (classes: DfhClass[]): DfhClassProfileView[] => {

  const profileMap = {};

  classes.forEach(c => {
    c.class_profile_view.forEach((dpv: DfhClassProfileView) => {
      profileMap[dpv.dfh_fk_profile] = dpv;
    })
  })

  return U.obj2Arr(profileMap);
}


export function projectSettingsDataReducer(state: ProjectSettingsData = INITIAL_STATE, a: Action): ProjectSettingsData {

  const action = a as ProjectSettingsDataAPIAction;

  switch (action.type) {

    /*****************************************************
     * Reducers to handle loading of class list
     *****************************************************/
    case ProjectSettingsDataAPIActions.LOAD_STARTED:
      return {
        ...state,
        items: [],
        profiles: [],
        loading: true,
        error: null,
      };
    case ProjectSettingsDataAPIActions.LOAD_SUCCEEDED:
      return {
        ...state,
        items: classItemsFromDfhClasses(action.meta.itemsArray),
        profiles: getProfiles(action.meta.itemsArray),
        loading: false,
        error: null,
      };
    case ProjectSettingsDataAPIActions.LOAD_FAILED:
      return {
        ...state,
        items: [],
        profiles: [],
        loading: false,
        error: action.error,
      };

    /*****************************************************
    * Reducers to handle disabling and enabling a class
    *****************************************************/
    case ProjectSettingsDataAPIActions.CHANGE_CLASS_PROJ_REL_STARTED:
      const items1: ClassItemI[] = clone(state.items);
      const index1 = items1.findIndex(i => i.pkEntity == action.meta.projRel.fk_entity)
      items1[index1].changingProjRel = true;
      return {
        ...state,
        items: items1
      };
    case ProjectSettingsDataAPIActions.CHANGE_CLASS_PROJ_REL_SUCCEEDED:
      const items: ClassItemI[] = clone(state.items);
      const index = items.findIndex(i => i.pkEntity == action.meta.projRel.fk_entity)
      items[index].projRel = action.meta.projRel;
      items[index].changingProjRel = false;
      return {
        ...state,
        items
      };
    case ProjectSettingsDataAPIActions.CHANGE_CLASS_PROJ_REL_FAILED:
      return {
        ...state,
        items: []
      };

    /*****************************************************
    * Reducers called on destroy of component
    *****************************************************/
    case ProjectSettingsDataAPIActions.DESTROY:
      return undefined;

  }

  return state;
};

