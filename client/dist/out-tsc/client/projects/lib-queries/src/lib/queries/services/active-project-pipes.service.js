import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { equals } from 'ramda';
import { distinctUntilChanged, filter, first, switchMap } from 'rxjs/operators';
import { cache } from '../decorators/method-decorators';
let ActiveProjectPipesService = class ActiveProjectPipesService {
    constructor(ngRedux, s, entityPreviewSocket) {
        this.ngRedux = ngRedux;
        this.s = s;
        this.entityPreviewSocket = entityPreviewSocket;
        this.requestedEntityPreviews = {};
        this.pkProject$ = ngRedux.select(['activeProject', 'pk_project']).pipe(filter(p => p !== undefined), distinctUntilChanged((x, y) => {
            return x === y;
        }));
        this.entityPreviewSocket.fromEvent('reconnect').subscribe(disconnect => {
            // get all EntityPreview keys from state and send them to the
            // server so that they will be streamed. This is important for
            // when connection was lost.
            this.pkProject$.pipe(first())
                .subscribe((pkProject) => {
                const pks = Object.keys(Object.assign({}, this.ngRedux.getState().war.entity_preview, this.requestedEntityPreviews));
                if (pks.length) {
                    this.entityPreviewSocket.emit('addToStream', {
                        pkProject,
                        pks
                    });
                }
            });
        });
    }
    pipeActiveProject() {
        return this.pkProject$.pipe(switchMap(pkProject => this.s.pro$.project$.by_pk_entity$.key(pkProject.toString()))).pipe(filter(l => !!l));
    }
    pipeActiveDefaultLanguage() {
        return this.pipeActiveProject().pipe(filter(p => !!p), switchMap(project => {
            return this.s.inf$.language$.by_pk_entity$.key(project.fk_language.toString());
        })).pipe(filter(l => !!l));
    }
    /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param pkEntity
     * @param forceReload
     */
    streamEntityPreview(pkEntity, forceReload) {
        const state = this.ngRedux.getState();
        if ((!(((state.war || {}).entity_preview || {}).by_pk_entity || {})[pkEntity] &&
            !this.requestedEntityPreviews[pkEntity]) || forceReload) {
            this.pkProject$.pipe(first(pk => !!pk)).subscribe(pkProject => {
                this.entityPreviewSocket.emit('addToStream', {
                    pkProject,
                    pks: [pkEntity]
                });
                // const pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
                // this.ngRedux.dispatch(this.actions.loadEntityPreview(pkProject, pkEntity, pkUiContext))
                this.requestedEntityPreviews[pkEntity] = true;
            });
        }
        return this.ngRedux.select(['war', 'entity_preview', 'by_pk_entity', pkEntity])
            .pipe(distinctUntilChanged(equals), filter(prev => (!!prev)));
    }
};
tslib_1.__decorate([
    cache({ refCount: false })
], ActiveProjectPipesService.prototype, "pipeActiveProject", null);
tslib_1.__decorate([
    cache({ refCount: false })
], ActiveProjectPipesService.prototype, "pipeActiveDefaultLanguage", null);
ActiveProjectPipesService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ActiveProjectPipesService);
export { ActiveProjectPipesService };
//# sourceMappingURL=active-project-pipes.service.js.map