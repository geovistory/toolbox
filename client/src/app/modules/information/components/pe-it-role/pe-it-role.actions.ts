
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IPiRoleState } from './pe-it-role.model';

// replace PiRole with name of component

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IPiRoleState;
interface MetaData { };
export type PiRoleAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class PiRoleActions {
  static readonly FOO = 'FOO';

  @dispatch()

  foo = (): PiRoleAction => ({
    type: PiRoleActions.FOO,
    meta: null,
    payload: null
  })

}
