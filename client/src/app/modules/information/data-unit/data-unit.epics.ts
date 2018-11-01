import { Injectable } from '@angular/core';
import { InfPersistentItem, SubstoreComponent, U } from 'app/core';
import { TreeviewItem } from 'ngx-treeview';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter } from 'rxjs/operators';
import { DataUnitActions } from './data-unit.actions';
import { RoleSetActions, RoleSetAction } from '../role-set/role-set.actions';
import { startsWith } from 'ramda';
import { DataUnitBase } from './data-unit.base';

/**
 * Cheks if the action comes from a direct child (from _fields) and not
 * from a deeper down nested child (sub-sub-child)ﬂ
 * @param path
 */
const ofDirectChild = (path: string[]) => (action): boolean => {
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);

    // path must be equal to begin of action path
    const startsWithBool = startsWith(path, actionPath);

    // number of _fields must one higher in actionPath than in path
    const nextLevelBool = (path.filter(s => s === '_fields').length + 1) === actionPath.filter(s => s === '_fields').length

    return (startsWithBool && nextLevelBool);
}


@Injectable()
export class DataUnitAPIEpics {
    constructor(
        private actions: DataUnitActions
    ) { }

    public createEpics(c: DataUnitBase): Epic {
        return combineEpics(this.removeRoleFromRoleListEpic(c));
    }

    /**
     * listenes to remove role set action and removes it from _fields
     */
    private removeRoleFromRoleListEpic(c: DataUnitBase): Epic {
        return (action$, store) => {
            return action$.pipe(
                /**
                 * Filter the actions that triggers this epic
                 */
                ofType(RoleSetActions.REMOVE_ROLE_SET),
                filter(action => ofDirectChild(c.basePath)(action)),
                switchMap((action: RoleSetAction) => new Observable<Action>((globalStore) => {

                    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);
                    const key = actionPath[actionPath.length - 1];
                    c.localStore.dispatch(this.actions.removeRoleSet(key))
                    // const a = c.localStore.getState()._fields
                })),
                takeUntil(c.destroy$)
            )
        }
    }
}
