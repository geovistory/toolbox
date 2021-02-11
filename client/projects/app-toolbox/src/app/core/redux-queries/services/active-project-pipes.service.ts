import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NgRedux } from '@angular-redux/store';
import { filter, distinctUntilChanged, switchMap, first } from 'rxjs/operators';
import { SchemaSelectorsService } from './schema-selectors.service';
import { ProProject, InfLanguage, WarEntityPreview } from 'projects/app-toolbox/src/app/core/sdk-lb4';
import { IAppState } from 'projects/app-toolbox/src/app/core/redux-store/model';
import { cache } from 'projects/app-toolbox/src/app/shared/decorators/method-decorators';
import { equals } from 'ramda';
import { EntityPreviewSocket } from '../../sockets/sockets.module';

@Injectable({
  providedIn: 'root'
})
export class ActiveProjectPipesService {
  public pkProject$: Observable<number>;

  requestedEntityPreviews: { [pkEntity: number]: boolean } = {}


  constructor(
    private ngRedux: NgRedux<IAppState>,
    private s: SchemaSelectorsService,
    private entityPreviewSocket: EntityPreviewSocket,

  ) {
    this.pkProject$ = ngRedux.select<number>(['activeProject', 'pk_project']).pipe(
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



  }
  @cache({ refCount: false }) pipeActiveProject(): Observable<ProProject> {
    return this.pkProject$.pipe(
      switchMap(pkProject => this.s.pro$.project$.by_pk_entity$.key(pkProject.toString()))
    ).pipe(filter(l => !!l))
  }
  @cache({ refCount: false }) pipeActiveDefaultLanguage(): Observable<InfLanguage> {

    return this.pipeActiveProject().pipe(
      filter(p => !!p),
      switchMap(project => {

        return this.s.inf$.language$.by_pk_entity$.key(project.fk_language.toString())
      })
    ).pipe(filter(l => !!l))
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

}
