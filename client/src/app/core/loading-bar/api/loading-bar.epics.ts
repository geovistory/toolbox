import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingBarActions } from './loading-bar.actions';




@Injectable()
export class LoadingBarEpics {
  constructor(
    private service: SlimLoadingBarService,
    private actions: LoadingBarActions,
  ) { }

  public createEpics(): Epic<FluxStandardAction<any>, FluxStandardAction<any>, void, any> {
    return combineEpics(
      this.createStartLoadingBarEpic(),
      this.createCompleteLoadingBarEpic()
    );
  }

  private createCompleteLoadingBarEpic(): Epic {
    return (action$, store) => action$.pipe(
      ofType(LoadingBarActions.COPMLETE),
      switchMap(() => {
        return Observable.create(observer => {
          this.service.complete()
          // observer.next(this.actions.stopLoading())
        })
      })
    )
  }

  private createStartLoadingBarEpic(): Epic {
    return (action$, store) => action$.pipe(
      ofType(LoadingBarActions.START),
      switchMap(() => {
        return Observable.create(observer => {
          this.service.start();
        })
      })
    )
  }
}
