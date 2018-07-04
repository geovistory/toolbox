import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

import { Injectable } from '@angular/core';
import { IAppState } from 'app/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { Observable } from 'rxjs';

import { LoadingBarAction, LoadingBarActions } from './loading-bar.actions';



@Injectable()
export class LoadingBarEpics {
  constructor(
    private service: SlimLoadingBarService,
    private actions: LoadingBarActions,
  ) { }

  public createEpics() {
    return [
      createEpicMiddleware(this.createStartLoadingBarEpic()),
      createEpicMiddleware(this.createCompleteLoadingBarEpic()),
    ];
  }

  private createCompleteLoadingBarEpic(): Epic<LoadingBarAction, IAppState> {
    return (action$, store) => action$
      .ofType(LoadingBarActions.COPMLETE)
      .switchMap(() => {
        return Observable.create(observer => {
          this.service.complete()
          // observer.next(this.actions.stopLoading())
        })
      });
  }

  private createStartLoadingBarEpic(): Epic<LoadingBarAction, IAppState> {
    return (action$, store) => action$
      .ofType(LoadingBarActions.START)
      .switchMap(() => {
        return Observable.create(observer => {
          this.service.start()          
        })
      });
  }
}
