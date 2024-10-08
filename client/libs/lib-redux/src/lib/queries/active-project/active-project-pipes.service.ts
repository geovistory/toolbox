import { Injectable } from '@angular/core';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { Store } from '@ngrx/store';
import { equals } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { filterNullish } from '../../_helpers/filterNullish';
import { StateFacade } from '../../redux-store/state.facade';
import { IAppState } from '../../redux-store/state.model';
import { getActiveProjectLanguage, getActiveProjectNamespaces } from './active-project.selectors';

// TODO: The methods of this service are quite divers and should be located at different places
@Injectable({
  providedIn: 'root'
})
export class ActiveProjectPipesService {

  requestedEntityPreviews: { [pkEntity: string]: boolean } = {}

  language$ = this.store.select(getActiveProjectLanguage)
  namespaces$ = this.store.select(getActiveProjectNamespaces)

  constructor(
    private store: Store<IAppState>,
    private state: StateFacade,
    private entityPreviewSocket: EntityPreviewSocket,

  ) {



    this.entityPreviewSocket.fromEvent('reconnect').subscribe(async () => {

      const state = await this.state.getState()
      // get all EntityPreview keys from state and send them to the
      // server so that they will be streamed. This is important for
      // when connection was lost.
      const pks = Object.keys({
        ...state?.data?.war?.entity_preview?.by_project_id__pk_entity,
        ...this.requestedEntityPreviews
      });
      if (pks.length) {
        this.entityPreviewSocket.emit('addToStream', {
          pkProject: state?.ui?.activeProject?.pk_project,
          pks
        })
      }

    })


    // dispatch a method to put the EntityPreview to the store
    this.entityPreviewSocket.fromEvent<WarEntityPreview>('entityPreview').subscribe(data => {
      state.data.war.entityPreview.loadSucceeded([data], '');
    });



  }


  /**
   * Loads an entity preview, if it is not yet available in state or if
   * forceReload is true;
   *
   * @param pkEntity
   * @param forceReload
   * @param pkProject set to 0 to have the community version
   */
  streamEntityPreview(pkEntity: number, forceReload?: boolean, pkProject?: number): Observable<WarEntityPreview> {

    const state = this.state.getState();
    const pkActiveProject = state?.ui?.activeProject?.pk_project ?? 0;
    const pkRequestedProject = pkProject ?? pkActiveProject;


    const repoKey = 0 + '_' + pkEntity
    let projectKey: string;
    let keys: string[];

    const wantsProjectVersion = pkRequestedProject !== 0;

    if (wantsProjectVersion) {
      projectKey = pkRequestedProject + '_' + pkEntity
      keys = [projectKey, repoKey]
    }
    else {
      keys = [repoKey]
    }

    let hasBeenRequested = false;
    keys.forEach(k => {
      if (state.data.war?.entity_preview?.by_project_id__pk_entity?.[k]) hasBeenRequested = true;
      else if (this.requestedEntityPreviews?.[k]) hasBeenRequested = true;
    })

    if (forceReload || !hasBeenRequested) {
      this.entityPreviewSocket.emit('addToStream', {
        pkProject: pkActiveProject,
        pks: keys
      })
      keys.forEach(pk => { this.requestedEntityPreviews[pk] = true; })
    }

    if (wantsProjectVersion) {
      projectKey = pkRequestedProject + '_' + pkEntity

      return combineLatest([
        this.state.data.war.entityPreview.getEntityPreview.byKey$(projectKey),
        this.state.data.war.entityPreview.getEntityPreview.byKey$(repoKey),
      ])
        .pipe(
          map(([projectVersion, repoVersion]) => projectVersion ?? repoVersion),
          filterNullish(),
          distinctUntilChanged<WarEntityPreview>(equals),
        )
    } else {
      return this.state.data.war.entityPreview.getEntityPreview.byKey$(repoKey)
        .pipe(
          filterNullish(),
          distinctUntilChanged<WarEntityPreview>(equals),
        )
    }
  }





  /**
   * Determines wether a class is a platform vocabulary class.
   * @param classId the class id
   * @returns true, if this class is a platform vocabulary class, else false
   */
  public getIsPlatformVocabClass(classId: number) {
    const platformVocabularies = this.state.getState()?.data?.sys?.config?.by_main?.['main']?.platformVocabularies;
    const platformVocabClasses = platformVocabularies?.map(pv => pv.parentOrAncestorClassId);
    const dfhClass = this.state.getState()?.data?.dfh?.klass?.by_pk_class?.[classId];
    const superClasses = dfhClass?.ancestor_classes.concat(dfhClass.parent_classes);
    return superClasses?.some((superClass) => platformVocabClasses?.includes(superClass));
  }

  /**
 * Determines wether a class (classId) is subclass of super class (superClassId).
 * @param classId class you want to know if it is a subclass
 * @param superClassId class you want to know if it is a parent or ancestor of classId
 * @returns true, if this class is a subclass of super class, else false
 */
  public getIsSubclassOf(classId: number, superClassId: number) {
    const dfhClass = this.state.getState()?.data?.dfh?.klass?.by_pk_class?.[classId];
    const superClasses = dfhClass?.ancestor_classes.concat(dfhClass.parent_classes);
    return superClasses?.includes(superClassId);
  }
}
