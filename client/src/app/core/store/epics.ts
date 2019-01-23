import { Injectable } from '@angular/core';
import { combineEpics, Epic, StateObservable, ActionsObservable } from 'redux-observable';
import { BehaviorSubject, Observable } from 'rxjs';
import { Action } from 'redux';
import { ActiveProjectEpics } from '../active-project/active-project.epics';
import { LoadingBarEpics } from '../loading-bar/api/loading-bar.epics';
import { mergeMap } from 'rxjs/operators';
import { IAppState } from './model';
import { AccountEpics } from 'app/modules/account/api/account.epics';



@Injectable()
export class RootEpics {

    private rootEpicStream$;
    private rootEpic;

    constructor(
        private loadingBarEpics: LoadingBarEpics,
        private activeProjectEpics: ActiveProjectEpics,
        private accountEpics: AccountEpics
    ) {

        this.rootEpicStream$ = new BehaviorSubject(combineEpics(
            this.loadingBarEpics.createEpics(),
            this.activeProjectEpics.createEpics(),
            this.accountEpics.createEpics()
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
