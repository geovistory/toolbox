import { createAction, props } from '@ngrx/store';

/**
 * Cleanup resolved actions
 */
export const cleanupResolvedAction = createAction('CLEAN_UP_RESOLVED', props<{ uuid: string }>())
