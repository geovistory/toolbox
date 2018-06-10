import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { Information, PeItDetail } from './information.models';


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
}
