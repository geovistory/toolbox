import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { FluxStandardAction } from 'flux-standard-action';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionResolverEpics {

  constructor(private actions$: Actions<FluxStandardAction<any, any>>) { }

  cleanupResolved$ = createEffect(() => this.actions$.pipe(
    filter(action => !!action && !!action.meta && !!action.meta.removePending),
    switchMap(action => (of({ type: 'CLEAN_UP_RESOLVED', meta: { uuid: action.meta.removePending } }))),
  ))

}
