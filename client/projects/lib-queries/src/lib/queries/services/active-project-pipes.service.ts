import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { IAppState, SchemaService } from '@kleiolab/lib-redux';
import { GvPositiveSchemaObject, InfLanguage, ProProject, WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { equals } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, first, switchMap } from 'rxjs/operators';
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
            ...this.ngRedux.getState().war.entity_preview,
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
   */
  streamEntityPreview(pkEntity: number, forceReload?: boolean): Observable<WarEntityPreview> {
    const state = this.ngRedux.getState();

    if (
      (
        !(((state.war || {}).entity_preview || {}).by_pk_entity || {})[pkEntity] &&
        !this.requestedEntityPreviews[pkEntity]
      ) || forceReload) {
      this.pkProject$.pipe(first(pk => !!pk)).subscribe(pkProject => {

        this.entityPreviewSocket.emit('addToStream', {
          pkProject,
          pks: [pkEntity]
        })
        // const pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;

        // this.ngRedux.dispatch(this.actions.loadEntityPreview(pkProject, pkEntity, pkUiContext))
        this.requestedEntityPreviews[pkEntity] = true;
      })
    }

    return this.ngRedux.select<WarEntityPreview>(['war', 'entity_preview', 'by_pk_entity', pkEntity])
      .pipe(
        distinctUntilChanged<WarEntityPreview>(equals),
        filter(prev => (!!prev))
      )
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
        pks: object.war.entity_preview.map(p => p.pk_entity)
      });
    }
  }
}
