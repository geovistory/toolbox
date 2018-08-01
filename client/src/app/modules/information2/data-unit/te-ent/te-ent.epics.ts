import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/ignoreElements';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';

import { Injectable } from '@angular/core';
import { IAppState } from 'app/core/store/model';
import { equals, path } from 'ramda';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { Action } from '../../../../../../node_modules/redux';
import { DataUnitActions } from '../data-unit.actions';
import { ObservableStore } from '../../../../../../node_modules/@angular-redux/store';
import { TeEntDetail } from '../../information.models';
import { TeEntActions } from './te-ent.actions';

const isSiblingComponent = (path: string[]) => (action): boolean => {
    if (!action['@angular-redux::fractalkey']) return false;
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
    const bool = equals(actionPath, path);
    console.log('isSibling?')
    return !bool;
}



@Injectable()
export class TeEntAPIEpics {
    constructor(
        private teEntActions: TeEntActions
    ) { }

    public createEpics(localStore: ObservableStore<TeEntDetail>, path: string[]) {
        return [
            createEpicMiddleware(this.createAccentuationEpic(localStore, path)),
        ];
    }

    /**
     * Listenes for TE_ENT_SET_ACCENTUATION actions, filters actions dispatched by a
     * sibling component (not of the same fractal path), sets the accentuation of this
     * component to 'none'
     * @param  path of the component
     * @param  localStore of the component
     */
    private createAccentuationEpic(localStore: ObservableStore<TeEntDetail>, path: string[]): Epic<Action, IAppState> {
        return (action$, store) => action$
            .ofType(TeEntActions.TE_ENT_SET_ACCENTUATION)
            .switchMap((action) => new Observable<Action>((globalStore) => {
                console.log('AccentuationEpic?')

                globalStore.next({ type: 'NOOP' });
                if ((action as any).meta.accentuation !== 'none')
                    if (isSiblingComponent(path)(action))
                        localStore.dispatch(this.teEntActions.setAccentuation('none'))
            }))
    }
}
