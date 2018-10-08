import { Injectable } from '@angular/core';
import { InfEntityProjectRelApi, LoadingBarAction } from 'app/core';
import { startsWith } from 'ramda';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { PeItBase } from '../pe-it-base';
import { PeItActions } from '../pe-it.actions';
import { LeafPeItViewAPIActions, LeafPeItViewAPIAction } from '../../../value/leaf-pe-it-view/api/leaf-pe-it-view.actions';


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
     * It memorizes the pk_entity of each LOAD
     *
     * @param p PeItBase Component instance
     */
    private memorizeLoadingStartOfLeafPeIts(p: PeItBase): Epic {
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
     * @param p PeItBase Component instance
     */
    private memorizeLoadingCompletionOfLeafPeIts(p: PeItBase): Epic {
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
