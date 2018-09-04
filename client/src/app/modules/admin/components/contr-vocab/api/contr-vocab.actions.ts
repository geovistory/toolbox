import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { DfhClass } from 'app/core';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = DfhClass;
interface MetaData {
  pkClass?: number;
  pkUiContext?: number;
};
export type ContrVocabAPIAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class ContrVocabAPIActions {
  static readonly LOAD_CLASS_DETAILS = 'LOAD_CLASS_DETAILS';
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  @dispatch() loadClassDetails = (pkClass: number, pkUiContext:number): ContrVocabAPIAction => ({
    type: ContrVocabAPIActions.LOAD_CLASS_DETAILS,
    meta: { pkClass, pkUiContext },
    payload: null,
  });

  @dispatch() loadStarted = (): ContrVocabAPIAction => ({
    type: ContrVocabAPIActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  @dispatch() loadSucceeded = (payload: Payload): ContrVocabAPIAction => ({
    type: ContrVocabAPIActions.LOAD_SUCCEEDED,
    meta: null,
    payload,
  })

  @dispatch() loadFailed = (error): ContrVocabAPIAction => ({
    type: ContrVocabAPIActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })
}
