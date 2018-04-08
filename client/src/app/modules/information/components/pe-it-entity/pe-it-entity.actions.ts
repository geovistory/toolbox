import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfPersistentItem } from 'app/core';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = InfPersistentItem;
interface MetaData {  };
export type PeItEntityAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PeItEntityActions {
  static readonly LOAD_PEIT = 'LOAD_PEIT';
  static readonly LOAD_STARTED = 'LOAD_STARTED';
  static readonly LOAD_SUCCEEDED = 'LOAD_SUCCEEDED';
  static readonly LOAD_FAILED = 'LOAD_FAILED';

  @dispatch()
  loadPeIt = (): PeItEntityAction => ({
    type: PeItEntityActions.LOAD_PEIT,
    meta: null,
    payload: null,
  });

  loadStarted = (): PeItEntityAction => ({
    type: PeItEntityActions.LOAD_STARTED,
    meta: null,
    payload: null,
  })

  loadSucceeded = (payload: Payload): PeItEntityAction => ({
    type: PeItEntityActions.LOAD_SUCCEEDED,
    meta: null,
    payload,
  })

  loadFailed = (error): PeItEntityAction => ({
    type: PeItEntityActions.LOAD_FAILED,
    meta: null,
    payload: null,
    error,
  })
}
