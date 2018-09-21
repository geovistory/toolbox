import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ProjectSettingsDataI } from './project-settings-data.models';
import { DfhClass } from 'app/core';

type Payload = ProjectSettingsDataI;
interface MetaData {
  itemsArray?: DfhClass[]
};
export type ProjectSettingsDataAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ProjectSettingsDataAPIActions {
  static readonly LOAD = 'ProjectSettingsData::LOAD';
  static readonly LOAD_STARTED = 'ProjectSettingsData::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'ProjectSettingsData::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'ProjectSettingsData::LOAD_FAILED';

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
}
