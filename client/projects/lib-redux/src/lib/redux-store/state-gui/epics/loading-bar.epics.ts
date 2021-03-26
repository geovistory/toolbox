import { Injectable } from '@angular/core';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { FluxStandardAction } from 'flux-standard-action';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LoadingBarActions } from '../../state-gui/actions/loading-bar.actions';




@Injectable({
  providedIn: 'root'
})
export class LoadingBarEpics {
  constructor(
    private service: SlimLoadingBarService,
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
