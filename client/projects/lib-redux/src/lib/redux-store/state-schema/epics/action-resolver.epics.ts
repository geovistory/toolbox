import { Injectable } from '@angular/core';
import { ActionsObservable, combineEpics, Epic } from 'redux-observable-es6-compat';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionResolverEpics {

  // requestMap: { [uuid: string]: ActionResultObservable<any> } = {};

  constructor() { }

  createEpics = () => combineEpics(this.createResolveEpic());
  private createResolveEpic(): Epic {
    return (action$: ActionsObservable<any>, store) => action$.pipe(
      filter(action => !!action && !!action.meta && !!action.meta.removePending),

      switchMap(action => (of({ type: 'CLEAN_UP_RESOLVED', meta: { uuid: action.meta.removePending } }))),
    )
  }



}
