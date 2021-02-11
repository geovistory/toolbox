import { Injectable } from '@angular/core';
import { LoadingBarActions } from "projects/app-toolbox/src/app/core/loading-bar/api/loading-bar.actions";
import { ProInfoProjRelApi } from '@kleiolab/lib-sdk-lb3';
import { ProInfoProjRel } from '@kleiolab/lib-sdk-lb3';
import { NotificationsAPIActions } from 'projects/app-toolbox/src/app/core/notifications/components/api/notifications.actions';
import { startsWith } from 'ramda';
import { Action } from 'redux';
import { combineEpics, Epic, ofType } from 'redux-observable-es6-compat';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { InformationComponent } from '../entity-list.component';
import { InformationAPIAction, InformationAPIActions } from './entity-list.actions';

export const ofDirectChildSubstore = (path: string[]) => (action): boolean => {
  const actionPath = JSON.parse(action['@angular-redux::fractalkey']);

  // path must be equal to begin of action path
  const startsWithBool = startsWith(path, actionPath);

  // number of levels (_leaf_pe_it) must equal in actionPath and in path
  const nextLevelBool = (path.filter(s => s === '_leaf_peIt').length) === actionPath.filter(s => s === '_leaf_peIt').length

  return (startsWithBool && nextLevelBool);
}

@Injectable()
export class InformationAPIEpics {
  constructor(
    private eprApi: ProInfoProjRelApi,
    private actions: InformationAPIActions,
    private loadingBarActions: LoadingBarActions,
    private notificationActions: NotificationsAPIActions
  ) { }

  public createEpics(c: InformationComponent): Epic {
    return combineEpics(
    );
  }


}
