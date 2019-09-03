import { Injectable } from '@angular/core';
import { FluxStandardAction } from 'flux-standard-action';
import { ToastyService, ToastyConfig } from '@cime/ngx-toasty';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, filter, mergeMap } from 'rxjs/operators';
import { NotificationsComponent } from '../notifications.component';
import { NotificationsAPIActions, NotificationsAPIAction } from './notifications.actions';

@Injectable()
export class NotificationsAPIEpics {
  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    // Assign the selected theme name to the `theme` property of the instance of ToastyConfig.
    // Possible values: default, bootstrap, material
    this.toastyConfig.theme = 'bootstrap';
  }

  public createEpics(c: NotificationsComponent): Epic {
    return combineEpics(this.createAddToastEpic(c));
  }

  private createAddToastEpic(c: NotificationsComponent): Epic {
    return (action$, store) => {
      return action$.pipe(
        /**
         * Filter the actions that triggers this epic
         */
        filter((a) => {
          return a;
        }),
        ofType(NotificationsAPIActions.ADD_TOAST),
        switchMap((action) => new Observable<FluxStandardAction<any>>((observer) => {
          /**
           * Add Toast
           */
          const a = action as NotificationsAPIAction;
          if (!a.payload.options.title && !a.payload.options.msg) {
            if (a.payload.type === 'error') {
              a.payload.options.title = 'Oops, something went wrong!'
            }
          }
          this.toastyService[a.payload.type](a.payload.options);

        })),
        takeUntil(c.destroy$)
      )
    }
  }
}
