import { Injectable } from '@angular/core';
import { ActionsObservable, combineEpics, Epic } from '../../../../node_modules/redux-observable';
import { of } from '../../../../node_modules/rxjs';
import { filter, switchMap } from '../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionResolverService {

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
