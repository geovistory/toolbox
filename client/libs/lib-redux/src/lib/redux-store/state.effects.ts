import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FluxStandardAction } from 'flux-standard-action';
import { of, switchMap } from 'rxjs';
import { setDataState } from './data/data.actions';
import { stateActions } from './state.actions';
import { setUiState } from './ui/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class StateEffects {

  constructor(private actions$: Actions<FluxStandardAction<any, any>>) { }

  setState$ = createEffect(() => this.actions$.pipe(
    ofType(stateActions.setState),
    switchMap(action => (of(
      setUiState({ ui: action.state.ui }),
      setDataState({ data: action.state.data }),
    ))),
  ))

}
