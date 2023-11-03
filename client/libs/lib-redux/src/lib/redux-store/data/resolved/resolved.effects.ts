import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { FluxStandardAction } from 'flux-standard-action';
import { delay, filter, map } from 'rxjs';
import { cleanupResolvedAction } from './resolved.actions';

@Injectable({
  providedIn: 'root'
})
export class ResolvedEffects {

  constructor(
    private actions$: Actions<FluxStandardAction<any, any>>
  ) { }
  /**
   *
   */
  cleanupResolved$ = createEffect(() => this.actions$.pipe(
    filter(action => !!action && !!action.meta && !!action.meta.removePending),
    delay(0),
    map(action => cleanupResolvedAction({ uuid: action.meta.removePending }))
  ))
}
