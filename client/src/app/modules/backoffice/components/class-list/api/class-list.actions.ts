import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { DfhClass } from 'app/core';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = DfhClass[];
interface MetaData {
  itemsArray?: any[]
};
export type ClassListAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ClassListAPIActions {
  static readonly LOAD_CLASSES = 'LOAD_CLASSES';
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  @dispatch()
  loadClasses = (): ClassListAPIAction => ({
    type: ClassListAPIActions.LOAD_CLASSES,
    meta: {},
    payload: null,
  });

  loadStarted = (): ClassListAPIAction => ({
    type: ClassListAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (itemsArray: any[]): ClassListAPIAction => ({
    type: ClassListAPIActions.LOAD_SUCCEEDED,
    meta: { itemsArray },
    payload: null,
  })

  loadFailed = (error): ClassListAPIAction => ({
    type: ClassListAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })
}
