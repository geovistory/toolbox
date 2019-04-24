import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { DfhClass } from 'app/core';
import { DfhProjRel } from '../../../../../core/sdk/models/DfhProjRel';
import { ProjectSettingsData } from './project-settings-data.models';

type Payload = ProjectSettingsData;
interface MetaData {
  itemsArray?: DfhClass[],
  projRel?: DfhProjRel,
  tabTitle?:string
};
export type ProjectSettingsDataAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ProjectSettingsDataAPIActions {
  static readonly SET_TAB_TITLE = 'ProjectSettingsData::SET_TAB_TITLE';
  
  static readonly DESTROY = 'ProjectSettingsData::DESTROY';
  
  /*********************************************************************
   *  Set tab title
   *********************************************************************/
  @dispatch()
  setTabTitle = (tabTitle: string): ProjectSettingsDataAPIAction => ({
    type: ProjectSettingsDataAPIActions.SET_TAB_TITLE,
    meta: { tabTitle },
    payload: null,
  });


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
