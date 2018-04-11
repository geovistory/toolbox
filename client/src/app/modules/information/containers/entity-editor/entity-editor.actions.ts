import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { InfPersistentItem } from 'app/core';
import { IEntityEditorWrapper } from './entity-editor.model';

// Flux-standard-action gives us stronger typing of our actions.
type Payload = IEntityEditorWrapper;
interface MetaData {  };
export type EntityEditorAction = FluxStandardAction<Payload, MetaData>;

@Injectable()
export class EntityEditorActions {
  static readonly ENTITY_EDITOR_INITIALIZED = 'ENTITY_EDITOR_INITIALIZED';

  @dispatch()
  entityEditorInitialized = (payload:Payload): EntityEditorAction => ({
    type: EntityEditorActions.ENTITY_EDITOR_INITIALIZED,
    meta: null,
    payload
  });
}
