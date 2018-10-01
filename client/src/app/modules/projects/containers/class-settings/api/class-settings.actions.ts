import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ClassSettingsI, VocabularyItem } from './class-settings.models';
import { DfhClass, InfNamespace } from 'app/core';

type Payload = ClassSettingsI;
interface MetaData {
  dfhPkClass?: number;
  dfhClass?: DfhClass;
  namespaces?: InfNamespace[]
  vocabulary?: VocabularyItem;
};
export type ClassSettingsAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ClassSettingsAPIActions {
  static readonly LOAD = 'ClassSettings::LOAD';
  static readonly LOAD_STARTED = 'ClassSettings::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'ClassSettings::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'ClassSettings::LOAD_FAILED';

  static readonly DESTROY = 'ClassSettings::DESTROY';

  /**************************************************
   * Actions to manage initial loading
   **************************************************/
  @dispatch()
  load = (dfhPkClass): ClassSettingsAPIAction => ({
    type: ClassSettingsAPIActions.LOAD,
    meta: { dfhPkClass },
    payload: null,
  });

  loadStarted = (): ClassSettingsAPIAction => ({
    type: ClassSettingsAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (dfhClass: DfhClass, namespaces: InfNamespace[]): ClassSettingsAPIAction => ({
    type: ClassSettingsAPIActions.LOAD_SUCCEEDED,
    meta: { dfhClass, namespaces },
    payload: null
  })

  loadFailed = (error): ClassSettingsAPIAction => ({
    type: ClassSettingsAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })

  /**************************************************
   * Actions to manage vocabularies
   **************************************************/


  /*********************************************************************
  *  Method to distroy the slice of store
  *********************************************************************/
  @dispatch()
  destroy = (): ClassSettingsAPIAction => ({
    type: ClassSettingsAPIActions.DESTROY,
    meta: null,
    payload: null
  })
}
