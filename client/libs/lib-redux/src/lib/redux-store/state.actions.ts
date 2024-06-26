import { createActionGroup, props } from '@ngrx/store';
import { IAppState } from './state.model';

export const stateActions = createActionGroup({
  source: 'State',
  events: { 'Set State': props<{ state: IAppState }>() }
})
