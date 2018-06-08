import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { Information } from '../../information.models';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = Information;
interface MetaData { };
export type EntityAddExistingAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class EntityAddExistingActions {
  static readonly ENTITY_ADD_EXISTING_INITIALIZED = 'ENTITY_ADD_EXISTING_INITIALIZED';
  static readonly ENTITY_ADD_EXISTING_DESTROYED = 'ENTITY_ADD_EXISTING_DESTROYED';

  @dispatch()
  entityAddExistingInitialized = (payload: Payload): EntityAddExistingAction => ({
    type: EntityAddExistingActions.ENTITY_ADD_EXISTING_INITIALIZED,
    meta: null,
    payload
  });
  entityAddExistingDestroyed = (): EntityAddExistingAction => ({
    type: EntityAddExistingActions.ENTITY_ADD_EXISTING_DESTROYED,
    meta: null,
    payload: null
  });
}
