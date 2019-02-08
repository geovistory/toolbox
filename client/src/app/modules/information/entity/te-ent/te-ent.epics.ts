import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { equals } from 'ramda';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { TeEntDetail } from 'app/core/state/models';
import { TeEntActions } from './te-ent.actions';

const isSiblingComponent = (path: string[]) => (action): boolean => {
    if (!action['@angular-redux::fractalkey']) return false;
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    const bool = equals(actionPath, path);
    // console.log('isSibling?')
    return !bool;
}



@Injectable()
export class TeEntAPIEpics {
    constructor(
        private teEntActions: TeEntActions
    ) { }

    public createEpics(localStore: ObservableStore<TeEntDetail>, path: string[], until$: Subject<boolean>) {
        return combineEpics(this.createAccentuationEpic(localStore, path, until$));
    }

    /**
     * Listenes for TE_ENT_SET_ACCENTUATION actions, filters actions dispatched by a
     * sibling component (not of the same fractal path), sets the accentuation of this
     * component to 'none'
     * @param  path of the component
     * @param  localStore of the component
     */
    private createAccentuationEpic(
        localStore: ObservableStore<TeEntDetail>,
        path: string[],
        until$: Subject<boolean>): Epic {
        return (action$, store) => action$.pipe(
            ofType(TeEntActions.TE_ENT_SET_ACCENTUATION),
            switchMap((action) => new Observable<Action>((globalStore) => {
                // console.log('AccentuationEpic?')

                const acc = localStore.getState().accentuation;

                // if another component gets the accentuation that this component has
                if (action.meta.accentuation !== 'none' && action.meta.accentuation === acc) {
                    if (isSiblingComponent(path)(action)) localStore.dispatch(this.teEntActions.setAccentuation('none'))
                }
            })),
            takeUntil(until$)
        )
    }
}
