import { Injectable } from '@angular/core';
import { SysConfig } from '@kleiolab/lib-config';
import { ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from '../../../state.model';
import { CrudFacade } from '../../_lib/crud-facade';
import { proTextPropertyActions } from './pro-text-property.actions';
import { byFksState, getByFks, getByFksWithoutLang, getTextPropAboutProject } from './pro-text-property.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProTextPropertyFacade extends CrudFacade<ProTextProperty> {

  fksIndex$ = this.store.select(byFksState);

  constructor(protected store: Store<IAppState>) {
    super(store, proTextPropertyActions)
  }

  getTextProperty = {
    byFks$: (d: Partial<ProTextProperty>) => this.store.select(getByFks(d)),
    byFksWithoutLang$: (d: Partial<ProTextProperty>) => this.store.select(getByFksWithoutLang(d)),
  };

  getTextPropAboutProject = (projectId: number, fkSystemType: number) => this.store.select(getTextPropAboutProject(projectId, fkSystemType))

  getProjectLabel(projectId: number): Observable<string> {
    return this.getTextPropAboutProject(projectId, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL)
  }

  getProjectDescription(projectId: number): Observable<string> {
    return this.getTextPropAboutProject(projectId, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__DESCRIPTION)
  }


  getProjectBtn1Label(projectId: number): Observable<string> {
    return this.getTextPropAboutProject(projectId, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__BTN_1_LABEL)
  }

  getProjectBtn2Label(projectId: number): Observable<string> {
    return this.getTextPropAboutProject(projectId, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__BTN_2_LABEL)
  }

  getProjectBtn1Url(projectId: number): Observable<string> {
    return this.getTextPropAboutProject(projectId, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__BTN_1_URL)
  }

  getProjectBtn2Url(projectId: number): Observable<string> {
    return this.getTextPropAboutProject(projectId, SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__BTN_2_URL)
  }
}
