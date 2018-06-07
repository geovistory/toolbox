import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfPersistentItem } from 'app/core';
import { IEntityCreateNewState } from './entity-add-create-new.model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IEntityCreateNewState;
interface MetaData { };
export type EntityCreateNewAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class EntityCreateNewActions {
  static readonly ENTITY_ADD_EXISTING_INITIALIZED = 'ENTITY_ADD_EXISTING_INITIALIZED';
  static readonly ENTITY_ADD_EXISTING_DESTROYED = 'ENTITY_ADD_EXISTING_DESTROYED';

  @dispatch()
  entityCreateNewInitialized = (payload: Payload): EntityCreateNewAction => ({
    type: EntityCreateNewActions.ENTITY_ADD_EXISTING_INITIALIZED,
    meta: null,
    payload
  });
  entityCreateNewDestroyed = (): EntityCreateNewAction => ({
    type: EntityCreateNewActions.ENTITY_ADD_EXISTING_DESTROYED,
    meta: null,
    payload: null
  });
}
