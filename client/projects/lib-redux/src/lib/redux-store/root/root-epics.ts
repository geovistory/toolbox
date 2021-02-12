import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { ActionsObservable, combineEpics, Epic, StateObservable } from 'redux-observable-es6-compat';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AccountEpics, ActiveProjectEpics, LoadingBarEpics, NotificationsAPIEpics } from '../state-gui/epics';
import { DatEpics, DfhEpics, InfEpics, ProEpics, SysEpics } from '../state-schema/epics';
import { ActionResolverEpics } from '../state-schema/_helpers';
import { IAppState } from './models';

@Injectable()
export class RootEpics {

  private rootEpicStream$;
  private rootEpic;

  constructor(
    private loadingBarEpics: LoadingBarEpics,
    private notificationEpics: NotificationsAPIEpics,
    private activeProjectEpics: ActiveProjectEpics,
    private accountEpics: AccountEpics,
    private systemEpics: SysEpics,
    private dfhEpics: DfhEpics,
    private infEpics: InfEpics,
    private datEpics: DatEpics,
    private proEpics: ProEpics,
    private actionResolver: ActionResolverEpics
  ) {

    this.rootEpicStream$ = new BehaviorSubject(combineEpics(
      this.loadingBarEpics.createEpics(),
      this.notificationEpics.createEpics(),
      this.systemEpics.createEpics(),
      this.activeProjectEpics.createEpics(),
      this.accountEpics.createEpics(),
      this.dfhEpics.createEpics(),
      this.infEpics.createEpics(),
      this.datEpics.createEpics(),
      this.proEpics.createEpics(),
      // important: this needs to be the last epic in
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
