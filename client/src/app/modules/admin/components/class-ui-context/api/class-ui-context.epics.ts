import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';

import { ObservableStore } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { DfhClass, LoadingBarAction, LoadingBarActions, ComUiContextConfig } from 'app/core';
import { DfhClassApi } from 'app/core/sdk/services/custom/DfhClass';
import { IAppState } from 'app/core/store/model';
import { FluxStandardAction } from 'flux-standard-action';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import { ClassDetail } from '../../../admin.models';
import { ClassUiContextAPIActions } from './class-ui-context.actions';
import { ComUiContextConfigApi } from '../../../../../core/sdk/services/custom/ComUiContextConfig';




@Injectable()
export class ClassUiContextAPIEpics {
  constructor(
    private classApi: DfhClassApi,
    private uiPropConfigApi: ComUiContextConfigApi,
    private actions: ClassUiContextAPIActions,
    private loadingBarActions: LoadingBarActions
  ) { }

  public createEpics(subStore: ObservableStore<ClassDetail>, pkClass: number, pkUiContext: number) {
    return [
      createEpicMiddleware(this.createLoadClassEpic(subStore, pkClass, pkUiContext)),
      createEpicMiddleware(this.createUpdateUiPropConfigEpic(subStore, pkClass, pkUiContext)),
    ];
  }

  private createLoadClassEpic(subStore: ObservableStore<ClassDetail>, pkClass: number, pkUiContext: number): Epic<FluxStandardAction<any, any>, IAppState> {
    return (action$, store) => action$
      .ofType(ClassUiContextAPIActions.LOAD_CLASS_UI_CONTEXT)
      .switchMap((action) => new Observable<LoadingBarAction>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());
        subStore.dispatch(this.actions.loadStarted());

        this.classApi.propertiesAndUiElements(pkClass, pkUiContext)
          .subscribe((data: DfhClass[]) => {
            globalStore.next(this.loadingBarActions.completeLoading());

            subStore.dispatch(this.actions.loadSucceeded(data[0]));
          }, error => {
            subStore.dispatch(this.actions.loadFailed({ status: '' + error.status }))
          })
      }))
  }


  private createUpdateUiPropConfigEpic(subStore: ObservableStore<ClassDetail>, pkClass: number, pkUiContext: number): Epic<FluxStandardAction<any, any>, IAppState> {
    return (action$, store) => action$
      .ofType(ClassUiContextAPIActions.UPDATE_UI_PROP_CONFIG)
      .switchMap((action) => new Observable<LoadingBarAction>((globalStore) => {
        globalStore.next(this.loadingBarActions.startLoading());
        subStore.dispatch(this.actions.updateUiPropConfigStarted());

        Observable.combineLatest(
          action.meta.uiPropConfigs.map(data => this.uiPropConfigApi.patchOrCreate(data))
        ).subscribe((data: ComUiContextConfig[]) => {

            subStore.dispatch(this.actions.loadClassUiContext());

          }, error => {
            subStore.dispatch(this.actions.updateUiPropConfigFailed({ status: '' + error.status }))
          })
      }))
  }
}
