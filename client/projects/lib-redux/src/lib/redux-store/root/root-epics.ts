import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { ActionsObservable, combineEpics, Epic, StateObservable } from 'redux-observable-es6-compat';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccountEpics } from '../state-gui/epics/account.epics';
import { ActiveProjectEpics } from '../state-gui/epics/active-project.epics';
import { NotificationsAPIEpics } from '../state-gui/epics/notifications.epics';
import { ActionResolverEpics } from '../state-schema/epics/action-resolver.epics';
import { SchemaEpics } from '../state-schema/epics/schema.epics';
import { SysEpics } from '../state-schema/epics/sys.epics';
import { IAppState } from './models/model';


@Injectable({
  providedIn: 'root'
})
export class RootEpics {

  private rootEpicStream$;
  private rootEpic;

  constructor(
    private notificationEpics: NotificationsAPIEpics,
    private activeProjectEpics: ActiveProjectEpics,
    private accountEpics: AccountEpics,
    private sysEpics: SysEpics,
    private schemaObjectEpics: SchemaEpics,
    private actionResolver: ActionResolverEpics
  ) {

    this.rootEpicStream$ = new BehaviorSubject(combineEpics(
      this.notificationEpics.createEpics(),
      this.activeProjectEpics.createEpics(),
      this.accountEpics.createEpics(),
      this.sysEpics.createEpics(),
      this.schemaObjectEpics.createEpics(),
      // important: this needs to be the last epic
      this.actionResolver.createEpics()
    ));

    this.rootEpic = (
      action$: ActionsObservable<Action>,
      state$: StateObservable<IAppState>,
      dependencies = undefined
    ): Observable<Action> => {
      return this.rootEpicStream$.pipe(
        mergeMap((epic: Epic) => epic(action$, state$, dependencies))
      );
    }
  }

  public getRootEpic(): Epic<Action<any>, Action<any>, void, any> {
    return this.rootEpic;
  }

  /**
   * Adds an epic to the RootEpic middleware
   * @param epic that will be added to the RootEpics
   */
  public addEpic(epic: Epic<Action<any>, Action<any>, void, any>) {
    this.rootEpicStream$.next(epic);
  }
}
