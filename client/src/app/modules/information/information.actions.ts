import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Information } from './information.models';
import { PeItDetail } from 'app/core/state/models';


// Flux-standard-action gives us stronger typing of our actions.
type Payload = Information;
interface MetaData { };
export type InformationAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class InformationActions {
  static readonly ENTITY_EDITOR_INITIALIZED = 'ENTITY_EDITOR_INITIALIZED';
  static readonly ENTITY_EDITOR_DESTROYED = 'ENTITY_EDITOR_DESTROYED';

  @dispatch()
  entityEditorInitialized = (_peIt_editable: PeItDetail): InformationAction => ({
    type: InformationActions.ENTITY_EDITOR_INITIALIZED,
    meta: null,
    payload: {
      _peIt_editable
    }
  });
  entityEditorDestroyed = (): InformationAction => ({
    type: InformationActions.ENTITY_EDITOR_DESTROYED,
    meta: null,
    payload: null
  });


  static readonly ENTITY_ADD_EXISTING_INITIALIZED = 'ENTITY_ADD_EXISTING_INITIALIZED';
  static readonly ENTITY_ADD_EXISTING_DESTROYED = 'ENTITY_ADD_EXISTING_DESTROYED';

  @dispatch()
  entityAddExistingInitialized = (_peIt_add_form: PeItDetail): InformationAction => ({
    type: InformationActions.ENTITY_ADD_EXISTING_INITIALIZED,
    meta: null,
    payload:{
      _peIt_add_form
    }
  });
  entityAddExistingDestroyed = (): InformationAction => ({
    type: InformationActions.ENTITY_ADD_EXISTING_DESTROYED,
    meta: null,
    payload: null
  });


  static readonly PE_IT_CREATE_ADDED = 'PE_IT_CREATE_ADDED';
  static readonly PE_IT_CREATE_DESTROYED = 'PE_IT_CREATE_DESTROYED';

  @dispatch()
  peItCreateFormAdded = (_peIt_create_form: PeItDetail): InformationAction => ({
    type: InformationActions.PE_IT_CREATE_ADDED,
    meta: null,
    payload:{
      _peIt_create_form
    }
  });
  peItCreateFormDestroyed = (): InformationAction => ({
    type: InformationActions.PE_IT_CREATE_DESTROYED,
    meta: null,
    payload: null
  });


}
