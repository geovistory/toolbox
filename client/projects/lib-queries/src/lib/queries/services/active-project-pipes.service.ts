import { Injectable } from '@angular/core';
import { IAppState, SchemaService } from '@kleiolab/lib-redux/public-api';
import { GvPositiveSchemaObject, InfLanguage, ProProject, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { equals } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, first, map, switchMap } from 'rxjs/operators';
import { WarSelector } from '../selectors/war.service';
import { PipeCache } from './PipeCache';
import { SchemaSelectorsService } from './schema-selectors.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectPipesService extends PipeCache<ActiveProjectPipesService> {
  public pkProject$: Observable<number>;

  requestedEntityPreviews: { [pkEntity: number]: boolean } = {}


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private s: SchemaSelectorsService,
    private entityPreviewSocket: EntityPreviewSocket,
    private warSelector: WarSelector,
    private schemaService: SchemaService

  ) {
    super()
    this.pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project'])
      .pipe(
        filter(p => p !== undefined),
        distinctUntilChanged((x, y) => {
          return x === y
        })
      );



    this.entityPreviewSocket.fromEvent('reconnect').subscribe(disconnect => {
      // get all EntityPreview keys from state and send them to the
      // server so that they will be streamed. This is important for
      // when connection was lost.
      this.pkProject$.pipe(first())
        .subscribe((pkProject) => {
          const pks = Object.keys({
            ...this.ngRedux.getState().war.entity_preview.by_project_id__pk_entity,
            ...this.requestedEntityPreviews
          });
          if (pks.length) {
            this.entityPreviewSocket.emit('addToStream', {
              pkProject,
              pks
            })
          }
        })
    })

    combineLatest(this.schemaService.schemaObjectStored$, this.pkProject$).subscribe(([object, pkProject]) => {
      this.extendEntityPreviewStream(object, pkProject)
    })

  }
  // @cache({ refCount: false })
  pipeActiveProject(): Observable<ProProject> {
    const obs$ = this.pkProject$.pipe(
      switchMap(pkProject => this.s.pro$.project$.by_pk_entity$.key(pkProject.toString()))
    ).pipe(filter(l => !!l))
    return this.cache('pipeActiveProject', obs$, ...arguments)

  }
  // @cache({ refCount: false })
  pipeActiveDefaultLanguage(): Observable<InfLanguage> {

    const obs$ = this.pipeActiveProject().pipe(
      filter(p => !!p),
      switchMap(project => {

        return this.s.inf$.language$.by_pk_entity$.key(project.fk_language.toString())
      })
    ).pipe(filter(l => !!l))
    return this.cache('pipeActiveDefaultLanguage', obs$, ...arguments)

  }



  /**
   * Loads a data unit preview, if it is not yet available in state or if
   * forceReload is true;
   *
   * @param pkEntity
   * @param forceReload
   * @param pkProject set to 0 to have the community version
   */
  streamEntityPreview(pkEntity: number, forceReload?: boolean, pkProject?: number): Observable<WarEntityPreview> {

    const state = this.ngRedux.getState();
    const pkActiveProject = state?.activeProject?.pk_project ?? 0;
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
      if (state.war?.entity_preview?.by_project_id__pk_entity?.[k]) return hasBeenRequested = true;
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
        this.warSelector.entity_preview$.by_project_id__pk_entity$.key(projectKey),
        this.warSelector.entity_preview$.by_project_id__pk_entity$.key(repoKey),
      ])
        .pipe(
          map(([projectVersion, repoVersion]) => projectVersion ?? repoVersion),
          distinctUntilChanged<WarEntityPreview>(equals),
          filter(prev => (!!prev))
        )
    } else {
      return this.warSelector.entity_preview$.by_project_id__pk_entity$.key(repoKey)
        .pipe(
          distinctUntilChanged<WarEntityPreview>(equals),
          filter(prev => (!!prev))
        )
    }
  }

  /**
   * Adds the entity previews to the streamed entity previews (for ws communication)
   * @param object
   * @param pkProject
   */
  private extendEntityPreviewStream(object: GvPositiveSchemaObject, pkProject: number) {

    if (object && object.war && object.war.entity_preview && object.war.entity_preview.length) {
      this.entityPreviewSocket.emit('extendStream', {
        pkProject,
        pks: object.war.entity_preview.map(p => p.project_id + '_' + p.pk_entity)
      });
    }
  }


  /**
   * Determines wether a class is a platform vocabulary class.
   * @param classId the class id
   * @returns true, if this class is a platform vocabulary class, else false
   */
  public getIsPlatformVocabClass(classId: number) {
    var platformVocabularies = this.ngRedux.getState()?.sys?.config?.by_main?.['main']?.platformVocabularies;
    var platformVocabClasses = platformVocabularies.map(pv => pv.parentOrAncestorClassId);
    var dfhClass = this.ngRedux.getState()?.dfh?.klass?.by_pk_class?.[classId];
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
    var dfhClass = this.ngRedux.getState()?.dfh?.klass?.by_pk_class?.[classId];
    var superClasses = dfhClass.ancestor_classes.concat(dfhClass.parent_classes);
    return superClasses.includes(superClassId);
  }
}
