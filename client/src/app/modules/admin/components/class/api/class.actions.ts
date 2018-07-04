import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { DfhClass } from 'app/core';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = DfhClass;
interface MetaData {
  pkClass?: number
};
export type ClassAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ClassAPIActions {
  static readonly LOAD_CLASS_DETAILS = 'LOAD_CLASS_DETAILS';
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  @dispatch() loadClassDetails = (pkClass: number): ClassAPIAction => ({
    type: ClassAPIActions.LOAD_CLASS_DETAILS,
    meta: { pkClass },
    payload: null,
  });

  @dispatch() loadStarted = (): ClassAPIAction => ({
    type: ClassAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  @dispatch() loadSucceeded = (payload: Payload): ClassAPIAction => ({
    type: ClassAPIActions.LOAD_SUCCEEDED,
    meta: null,
    payload,
  })

  @dispatch() loadFailed = (error): ClassAPIAction => ({
    type: ClassAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })
}
