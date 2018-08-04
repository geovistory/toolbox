





import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ComUiContextConfig, DfhClass, LoadingBarAction, LoadingBarActions } from 'app/core';
import { DfhClassApi } from 'app/core/sdk/services/custom/DfhClass';
import { IAppState } from 'app/core/store/model';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ComUiContextConfigApi } from '../../../../../core/sdk/services/custom/ComUiContextConfig';
import { ClassDetail } from '../../../admin.models';
import { ClassUiContextAPIActions } from './class-ui-context.actions';





@Injectable()
export class ClassUiContextAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private uiPropConfigApi: ComUiContextConfigApi,
    private actions: ClassUiContextAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(subStore: ObservableStore<ClassDetail>, pkClass: number, pkUiContext: number, until$: Subject<boolean>) {
    return combineEpics(
      this.createLoadClassEpic(subStore, pkClass, pkUiContext, until$),
      this.createupdateUiContextConfigEpic(subStore, pkClass, pkUiContext, until$),
    );
  }

  private createLoadClassEpic(
    subStore: ObservableStore<ClassDetail>,
    pkClass: number, pkUiContext: number,
    until$: Subject<boolean>
  ): Epic {
    return (action$, store) => action$.pipe(
      ofType(ClassUiContextAPIActions.LOAD_CLASS_UI_CONTEXT),
      switchMap((action) => new Observable<LoadingBarAction>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());
        subStore.dispatch(this.actions.loadStarted());

        this.classApi.propertiesAndUiElements(pkClass, pkUiContext, null)
          .subscribe((data: DfhClass[]) => {
            globalStore.next(this.loadingBarActions.completeLoading());

            subStore.dispatch(this.actions.loadSucceeded(data[0], pkUiContext));
          }, error => {
            subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          })
      })),
      takeUntil(until$)
    )
  }


  private createupdateUiContextConfigEpic(
    subStore: ObservableStore<ClassDetail>,
    pkClass: number,
    pkUiContext: number,
    until$: Subject<boolean>): Epic {
    return (action$, store) => action$.pipe(
      ofType(ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG),
      switchMap((action) => new Observable<LoadingBarAction>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());
        subStore.dispatch(this.actions.updateUiContextConfigStarted());

        combineLatest(
          action.meta.uiPropConfigs.map(data => this.uiPropConfigApi.patchOrCreate(data))
        ).subscribe((data: ComUiContextConfig[]) => {

          subStore.dispatch(this.actions.loadClassUiContext());

        }, error => {
          subStore.dispatch(this.actions.updateUiContextConfigFailed({ status: '' + error.status }))
        })
      })),
      takeUntil(until$)
    )
  }
}
