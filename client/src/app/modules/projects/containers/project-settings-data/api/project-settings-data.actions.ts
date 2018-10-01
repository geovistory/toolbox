import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ProjectSettingsDataI } from './project-settings-data.models';
import { DfhClass } from 'app/core';
import { DfhProjRel } from '../../../../../core/sdk/models/DfhProjRel';

type Payload = ProjectSettingsDataI;
interface MetaData {
  itemsArray?: DfhClass[],
  projRel?: DfhProjRel
};
export type ProjectSettingsDataAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ProjectSettingsDataAPIActions {
  static readonly LOAD = 'ProjectSettingsData::LOAD';
  static readonly LOAD_STARTED = 'ProjectSettingsData::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'ProjectSettingsData::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'ProjectSettingsData::LOAD_FAILED';

  static readonly CHANGE_CLASS_PROJ_REL = 'ProjectSettingsData::CHANGE_CLASS_PROJ_REL';
  static readonly CHANGE_CLASS_PROJ_REL_STARTED = 'ProjectSettingsData::CHANGE_CLASS_PROJ_REL_STARTED';
  static readonly CHANGE_CLASS_PROJ_REL_SUCCEEDED = 'ProjectSettingsData::CHANGE_CLASS_PROJ_REL_SUCCEEDED';
  static readonly CHANGE_CLASS_PROJ_REL_FAILED = 'ProjectSettingsData::CHANGE_CLASS_PROJ_REL_FAILED';

  static readonly DESTROY = 'ProjectSettingsData::DESTROY';


  /*********************************************************************
   *  Methods to manage loading of class list
   *********************************************************************/
  @dispatch()
  load = (): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.LOAD,
    meta: null,
    payload: null,
  });

  loadStarted = (): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (itemsArray: any[]): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.LOAD_SUCCEEDED,
    meta: {
      itemsArray
    },
    payload: null
  })

  loadFailed = (error): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
   *  Methods to manage enabling and disabling a class for the project
   *********************************************************************/
  @dispatch()
  changeClassProjRel = (projRel: DfhProjRel): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.CHANGE_CLASS_PROJ_REL,
    meta: { projRel },
    payload: null,
  });

  changeClassProjRelStarted = (projRel: DfhProjRel): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.CHANGE_CLASS_PROJ_REL_STARTED,
    meta: { projRel },
    payload: null,
  })

  changeClassProjRelSucceeded = (projRel: DfhProjRel): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.CHANGE_CLASS_PROJ_REL_SUCCEEDED,
    meta: { projRel },
    payload: null
  })

  changeClassProjRelFailed = (error): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.CHANGE_CLASS_PROJ_REL_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.DESTROY,
    meta: null,
    payload: null
  })

}
