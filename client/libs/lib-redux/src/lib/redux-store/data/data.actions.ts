import type { GvPaginationObject, GvPositiveSchemaObject, GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { createAction, createActionGroup, props } from '@ngrx/store';
import type { Observable } from 'rxjs';
import { DataState } from './data.model';

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
    'LoadWithMapper': props<{ meta: { addPending: string }, data$: Observable<any>, mapper: (data: any) => GvSchemaModifier }>(),
    'Succeeded': props<{ payload: GvSchemaModifier }>(),
  }
})

/**
 * Set the entire data state
 */
export const setDataState = createAction('Set Data State', props<{ data: DataState }>())

