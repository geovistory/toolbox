import { Injectable } from '@angular/core';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { equals } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { StateFacade } from '../state.facade';

// TODO: The methods of this service are quite divers and should be located at different places
@Injectable({
  providedIn: 'root'
})
export class ActiveProjectPipesService {
  public pkProject$: Observable<number>;

  requestedEntityPreviews: { [pkEntity: number]: boolean } = {}


  constructor(
    private state: StateFacade,
    private entityPreviewSocket: EntityPreviewSocket,

  ) {
    // TODO: Delete in favor of state.ui.activeProject.projectId$;
    this.pkProject$ = state.ui.activeProject.projectId$;



    this.entityPreviewSocket.fromEvent('reconnect').subscribe(async (disconnect) => {

      const state = await this.state.getState()
      // get all EntityPreview keys from state and send them to the
      // server so that they will be streamed. This is important for
      // when connection was lost.
      const pks = Object.keys({
        ...state.data.war.entity_preview.by_project_id__pk_entity,
        ...this.requestedEntityPreviews
      });
      if (pks.length) {
        this.entityPreviewSocket.emit('addToStream', {
          pkProject: state.ui.activeProject.pk_project,
          pks
        })
      }

    })


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
      if (state.data.war?.entity_preview?.by_project_id__pk_entity?.[k]) return hasBeenRequested = true;
      if (this.requestedEntityPreviews?.[k]) return hasBeenRequested = true;
    })

    if (forceReload || !hasBeenRequested) {
      this.entityPreviewSocket.emit('addToStream', {
        pkProject: pkActiveProject,
        pks: keys
      })
      keys.forEach(pk => { this.requestedEntityPreviews[pk] = true; })
    }

    if (wantsProjectVersion) {
      return combineLatest([
        this.state.data.war.entityPreview.getEntityPreview.byKey$(projectKey),
        this.state.data.war.entityPreview.getEntityPreview.byKey$(repoKey),
      ])
        .pipe(
          map(([projectVersion, repoVersion]) => projectVersion ?? repoVersion),
          distinctUntilChanged<WarEntityPreview>(equals),
          filter(prev => (!!prev))
        )
    } else {
      return this.state.data.war.entityPreview.getEntityPreview.byKey$(repoKey)
        .pipe(
          distinctUntilChanged<WarEntityPreview>(equals),
          filter(prev => (!!prev))
        )
    }
  }





  /**
   * Determines wether a class is a platform vocabulary class.
   * @param classId the class id
   * @returns true, if this class is a platform vocabulary class, else false
   */
  public getIsPlatformVocabClass(classId: number) {
    var platformVocabularies = this.state.getState()?.data?.sys?.config?.by_main?.['main']?.platformVocabularies;
    var platformVocabClasses = platformVocabularies.map(pv => pv.parentOrAncestorClassId);
    var dfhClass = this.state.getState()?.data?.dfh?.klass?.by_pk_class?.[classId];
    var superClasses = dfhClass.ancestor_classes.concat(dfhClass.parent_classes);
    return superClasses.some((superClass) => platformVocabClasses.includes(superClass));
  }

  /**
 * Determines wether a class (classId) is subclass of super class (superClassId).
 * @param classId class you want to know if it is a subclass
 * @param superClassId class you want to know if it is a parent or ancestor of classId
 * @returns true, if this class is a subclass of super class, else false
 */
  public getIsSubclassOf(classId: number, superClassId: number) {
    var dfhClass = this.state.getState()?.data?.dfh?.klass?.by_pk_class?.[classId];
    var superClasses = dfhClass.ancestor_classes.concat(dfhClass.parent_classes);
    return superClasses.includes(superClassId);
  }
}
