import { Injectable } from '@angular/core';
import { InfEntityProjectRelApi, LoadingBarAction, LoadingBarActions, SubstoreComponent, InfEntityProjectRel } from 'app/core';
import { startsWith } from 'ramda';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { LeafPeItViewAPIAction, LeafPeItViewAPIActions } from '../../../value/leaf-pe-it-view/api/leaf-pe-it-view.actions';
import { PeItEditableComponent } from '../pe-it-editable/pe-it-editable.component';
import { PeItActions, PeItAction } from '../pe-it.actions';
import { NotificationsAPIActions } from 'app/core/notifications/components/api/notifications.actions';


const ofSubstoreLevel = (path: string[]) => (action): boolean => {
    const actionPath = JSON.parse(action['@angular-redux::fractalkey']);

    // path must be equal to begin of action path
    const startsWithBool = startsWith(path, actionPath);

    // number of levels (_leaf_pe_it) must one higher in actionPath than in path
    const nextLevelBool = (path.filter(s => s === '_leaf_peIt').length + 1) === actionPath.filter(s => s === '_leaf_peIt').length

    return (startsWithBool && nextLevelBool);
}

@Injectable()
export class PeItApiEpics {
    constructor(
        private actions: PeItActions,
        private loadingBarActions: LoadingBarActions,
        private notificationActions: NotificationsAPIActions
    ) { }

    public createEpics(peItBase: PeItEditableComponent) {
        return combineEpics(
            this.memorizeLoadingStartOfLeafPeIts(peItBase),
            this.memorizeLoadingCompletionOfLeafPeIts(peItBase)
        );
    }

    /**
     * Epic that observes loading start of child leaf-pe-its
     * It memorizes the pk_entity of each LOAD
     *
     * @param p PeItEditableComponent Component instance
     */
    private memorizeLoadingStartOfLeafPeIts(p: PeItEditableComponent): Epic {
        return (action$, store) => {
            return action$.pipe(
                ofType(LeafPeItViewAPIActions.LOAD),
                filter(action => ofSubstoreLevel(p.basePath)(action)),
                switchMap((action: LeafPeItViewAPIAction) => new Observable<LoadingBarAction>((globalStore) => {
                    p.pksOfloadingLeafPeIts.push(action.meta.pkEntity)

                    if (p.pksOfloadingLeafPeIts.length > 0) {
                        p.localStore.dispatch(this.actions.setLeafPeItLoading(true))
                    }
                })),
                takeUntil(p.destroy$)
            )
        }
    }

    /**
     * Epic that observes loading completion of child leaf-pe-its
     * It memorizes the pk_entity of each LOAD_SUCCEEDED
     *
     * @param p PeItEditableComponent Component instance
     */
    private memorizeLoadingCompletionOfLeafPeIts(p: PeItEditableComponent): Epic {
        return (action$, store) => {
            return action$.pipe(
                ofType(LeafPeItViewAPIActions.LOAD_SUCCEEDED),
                filter(action => ofSubstoreLevel(p.basePath)(action)),
                switchMap((action: LeafPeItViewAPIAction) => new Observable<LoadingBarAction>((globalStore) => {
                    const index = p.pksOfloadingLeafPeIts.indexOf(action.meta.peItDetail.pkEntity)
                    p.pksOfloadingLeafPeIts.splice(index, 1)

                    if (p.pksOfloadingLeafPeIts.length === 0) {
                        p.localStore.dispatch(this.actions.setLeafPeItLoading(false))
                    }
                })),
                takeUntil(p.destroy$)
            )
        }
    }

   
}
