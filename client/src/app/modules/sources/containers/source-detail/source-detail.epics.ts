import { Injectable } from '@angular/core';
import { InfDigitalObjectApi, LoadingBarAction, InfDigitalObject } from 'app/core';
import { startsWith } from 'ramda';
import { combineEpics, Epic, ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, first } from 'rxjs/operators';
import { SourceDetailAction, SourceDetailActions } from './source-detail.actions';
import { SourceDetailComponent } from './source-detail.component';
import { IVersion } from '../../sources.models';


const ofSubstoreLevel = (path: string[]) => (action): boolean => {
  const actionPath = JSON.parse(action['@angular-redux::fractalkey']);

  // path must be equal to begin of action path
  const startsWithBool = startsWith(path, actionPath);

  // number of levels (_leaf_pe_it) must one higher in actionPath than in path
  const nextLevelBool = (path.filter(s => s === '_leaf_peIt').length + 1) === actionPath.filter(s => s === '_leaf_peIt').length

  return (startsWithBool && nextLevelBool);
}

@Injectable()
export class SourceDetailApiEpics {
  constructor(
    private digiObjApi: InfDigitalObjectApi,
    private actions: SourceDetailActions
  ) { }

  public createEpics(c: SourceDetailComponent) {
    return combineEpics(
      this.loadVersionsList(c),
      this.startEdit(c)
    );
  }

  private startEdit(c: SourceDetailComponent): Epic {
    return (action$, store) => action$.pipe(
      ofType(SourceDetailActions.SOURCE_DETAIL_START_EDIT),
      switchMap((action: SourceDetailAction) => new Observable<LoadingBarAction>((globalStore) => {

        // get the latest Id of latest version
        c.view$.pipe(
          first((val) => val ? true : false),
          takeUntil(c.destroy$)
        ).subscribe(digiObj => {

          // search for versions of that digital object
          this.digiObjApi.getLatestVersion(digiObj.pk_entity)
            .takeUntil(c.destroy$)
            .subscribe((digitObjects: InfDigitalObject[]) => {
              const latestId = digitObjects[0].js_quill_data.latestId;
              // make component emit action
              c.editStarted(latestId);
            })

        })
      })),
      takeUntil(c.destroy$)
    )

  }

  /**
   * Epic that loads version list of source detail
   *
   * @param c SourceDetailComponent Component instance
   */
  private loadVersionsList(c: SourceDetailComponent): Epic {
    return (action$, store) => action$.pipe(
      ofType(SourceDetailActions.SOURCE_DETAIL_START_LOADING_VERSION_LIST),
      switchMap((action: SourceDetailAction) => new Observable<LoadingBarAction>((globalStore) => {

        // get the digital object (only first valid value)
        c.view$.pipe(
          // first((val) => val ? true : false),
          takeUntil(c.destroy$)
        ).subscribe(digiObj => {
          // search for versions of that digital object
          this.digiObjApi.getVersions(digiObj.pk_entity)
            .takeUntil(c.destroy$)
            .subscribe((digitObjects: InfDigitalObject[]) => {

              // map versions to IVersion[]
              const versionList = digitObjects.map(item => {
                return {
                  entityVersion: item.entity_version,
                  pkEntityVersionConcat: item.pk_entity_version_concat,
                  pkEntity: item.pk_entity
                } as IVersion
              })

              // make component emit action
              c.versionListLoaded(versionList);
            })

        })
      })),
      takeUntil(c.destroy$)
    )

  }


}
