import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ClassSettingsI } from './class-settings.models';
import { DfhClass } from 'app/core';

type Payload = ClassSettingsI;
interface MetaData {
  dfhPkClass?: number;
  dfhClass?: DfhClass;
};
export type ClassSettingsAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ClassSettingsAPIActions {
  static readonly LOAD = 'ClassSettings::LOAD';
  static readonly LOAD_STARTED = 'ClassSettings::LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'ClassSettings::LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'ClassSettings::LOAD_FAILED';

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

  loadSucceeded = (dfhClass: DfhClass): ClassSettingsAPIAction => ({
    type: ClassSettingsAPIActions.LOAD_SUCCEEDED,
    meta: { dfhClass },
    payload: null
  })

  loadFailed = (error): ClassSettingsAPIAction => ({
    type: ClassSettingsAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })
}
