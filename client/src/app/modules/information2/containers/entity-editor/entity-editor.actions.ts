import { dispatch } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';

import { IEntityEditorWrapper } from './entity-editor.model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IEntityEditorWrapper;
interface MetaData { };
export type EntityEditorAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class EntityEditorActions {
  static readonly ENTITY_EDITOR_INITIALIZED = 'ENTITY_EDITOR_INITIALIZED';
  static readonly ENTITY_EDITOR_DESTROYED = 'ENTITY_EDITOR_DESTROYED';

  @dispatch()
  entityEditorInitialized = (payload: Payload): EntityEditorAction => ({
    type: EntityEditorActions.ENTITY_EDITOR_INITIALIZED,
    meta: null,
    payload
  });
  entityEditorDestroyed = (): EntityEditorAction => ({
    type: EntityEditorActions.ENTITY_EDITOR_DESTROYED,
    meta: null,
    payload: null
  });
}
