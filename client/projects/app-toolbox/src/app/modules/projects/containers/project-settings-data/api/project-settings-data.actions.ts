import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DfhClass } from "@kleiolab/lib-sdk-lb4";
import { FluxStandardAction } from 'flux-standard-action';
import { ProDfhClassProjRel } from '@kleiolab/lib-sdk-lb3';
import { ProjectSettingsData } from './project-settings-data.models';

type Payload = ProjectSettingsData;
interface MetaData {
  itemsArray?: DfhClass[],
  projRel?: ProDfhClassProjRel,
  tabTitle?: string
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
