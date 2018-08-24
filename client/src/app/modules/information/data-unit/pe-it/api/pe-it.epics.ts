import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { InfEntityProjectRel, InfEntityProjectRelApi, LoadingBarAction, LoadingBarActions } from 'app/core';
import { FluxStandardAction } from 'flux-standard-action';
import { startsWith } from 'ramda';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { PeItDetail } from 'app/core/models';
import { PeItActions } from '../pe-it.actions';
import { LeafPeItActions, LeafPeItAction } from '../../../value/leaf-pe-it-view/leaf-pe-it-view.actions';
import { PeItBase } from '../pe-it-base';


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
        private eprApi: InfEntityProjectRelApi,
        private actions: PeItActions
    ) { }

    public createEpics(peItBase: PeItBase) {
        return combineEpics(
            this.memorizeLoadingStartOfLeafPeIts(peItBase),
            this.memorizeLoadingCompletionOfLeafPeIts(peItBase)
        );
    }

    /**
     * Epic that observes loading start of child leaf-pe-its
     * It memorizes the pk_entity of each LEAF_PE_IT_START_LOADING
     *
     * @param p PeItBase Component instance
     */
    private memorizeLoadingStartOfLeafPeIts(p: PeItBase): Epic {
        return (action$, store) => {
            return action$.pipe(
                ofType(LeafPeItActions.LEAF_PE_IT_START_LOADING),
                filter(action => ofSubstoreLevel(p.basePath)(action)),
                switchMap((action: LeafPeItAction) => new Observable<LoadingBarAction>((globalStore) => {
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
     * It memorizes the pk_entity of each LEAF_PE_IT_START_LOADING
     *
     * @param p PeItBase Component instance
     */
    private memorizeLoadingCompletionOfLeafPeIts(p: PeItBase): Epic {
        return (action$, store) => {
            return action$.pipe(
                ofType(LeafPeItActions.LEAF_PE_IT_STATE_ADDED),
                filter(action => ofSubstoreLevel(p.basePath)(action)),
                switchMap((action: LeafPeItAction) => new Observable<LoadingBarAction>((globalStore) => {
                    const index = p.pksOfloadingLeafPeIts.indexOf(action.payload.pkEntity)
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
