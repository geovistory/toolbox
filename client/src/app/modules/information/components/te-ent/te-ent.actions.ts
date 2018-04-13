import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { ITeEntState } from './te-ent.model';

// replace TeEnt with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = ITeEntState;
interface MetaData { };
export type TeEntAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class TeEntActions {
  static readonly FOO = 'FOO';

  @dispatch()

  foo = (): TeEntAction => ({
    type: TeEntActions.FOO,
    meta: null,
    payload: null
  })

}
