import type { GvPaginationObject, GvPositiveSchemaObject, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { createActionGroup, props } from '@ngrx/store';
import type { Observable } from 'rxjs';

export const schemaObjectActions = createActionGroup({
  source: 'GV_SCHEMA_OBJECT',
  events: {
    'Load': props<{ meta: { addPending: string }, payload: Observable<GvPositiveSchemaObject> }>(),
  }
})

export const paginationObjectActions = createActionGroup({
  source: 'GV_PAGINATION_OBJECT',
  events: {
    'Load': props<{ meta: { addPending: string }, payload: Observable<GvPaginationObject> }>(),
  }
})

export const schemaModifierActions = createActionGroup({
  source: 'GV_SCHEMA_MODIFIER',
  events: {
    'Load': props<{ meta: { addPending: string }, payload: Observable<GvSchemaModifier> }>(),
    'Succeeded': props<{ payload: GvSchemaModifier }>(),
  }
})


