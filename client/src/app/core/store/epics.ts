import { Injectable } from '@angular/core';
import { LoopBackConfig, IAppState } from 'app/core';
import { AccountEpics } from 'app/modules/account/api/account.epics';
import { environment } from 'environments/environment';
import { Action } from 'redux';
import { ActionsObservable, combineEpics, Epic, StateObservable } from 'redux-observable';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ActiveProjectEpics } from '../active-project/active-project.epics';
import { DfhEpics } from '../dfh/dfh.epics';
import { InfEpics } from '../inf/inf.epics';
import { LoadingBarEpics } from '../loading-bar/api/loading-bar.epics';
import { SysEpics } from '../sys/sys.epics';
import { DatEpics } from 'app/core/dat/dat.epics';
import { ProEpics } from '../pro/pro.epics';

@Injectable()
export class RootEpics {

  private rootEpicStream$;
  private rootEpic;

  constructor(
    private loadingBarEpics: LoadingBarEpics,
    private accountEpics: AccountEpics,
    private activeProjectEpics: ActiveProjectEpics,
    private systemEpics: SysEpics,
    private dfhEpics: DfhEpics,
    private infEpics: InfEpics,
    private datEpics: DatEpics,
    private proEpics: ProEpics
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);


    this.rootEpicStream$ = new BehaviorSubject(combineEpics(
      this.loadingBarEpics.createEpics(),
      this.systemEpics.createEpics(),
      this.activeProjectEpics.createEpics(),
      this.accountEpics.createEpics(),
      this.dfhEpics.createEpics(),
      this.infEpics.createEpics(),
      this.datEpics.createEpics(),
      this.proEpics.createEpics(),
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
