/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/active-project-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { SchemaService } from '@kleiolab/lib-redux';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { equals } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, filter, first, switchMap } from 'rxjs/operators';
import { cache } from '../decorators/method-decorators';
import { SchemaSelectorsService } from './schema-selectors.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
import * as i2 from "./schema-selectors.service";
import * as i3 from "@kleiolab/lib-sockets";
import * as i4 from "@kleiolab/lib-redux";
var ActiveProjectPipesService = /** @class */ (function () {
    function ActiveProjectPipesService(ngRedux, s, entityPreviewSocket, schemaService) {
        var _this = this;
        this.ngRedux = ngRedux;
        this.s = s;
        this.entityPreviewSocket = entityPreviewSocket;
        this.schemaService = schemaService;
        this.requestedEntityPreviews = {};
        this.pkProject$ = ngRedux.select(['activeProject', 'pk_project'])
            .pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return p !== undefined; })), distinctUntilChanged((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        function (x, y) {
            return x === y;
        })));
        this.entityPreviewSocket.fromEvent('reconnect').subscribe((/**
         * @param {?} disconnect
         * @return {?}
         */
        function (disconnect) {
            // get all EntityPreview keys from state and send them to the
            // server so that they will be streamed. This is important for
            // when connection was lost.
            _this.pkProject$.pipe(first())
                .subscribe((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                /** @type {?} */
                var pks = Object.keys(tslib_1.__assign({}, _this.ngRedux.getState().war.entity_preview, _this.requestedEntityPreviews));
                if (pks.length) {
                    _this.entityPreviewSocket.emit('addToStream', {
                        pkProject: pkProject,
                        pks: pks
                    });
                }
            }));
        }));
        combineLatest(this.schemaService.schemaObjectStored$, this.pkProject$).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), object = _b[0], pkProject = _b[1];
            _this.extendEntityPreviewStream(object, pkProject);
        }));
    }
    /**
     * @return {?}
     */
    ActiveProjectPipesService.prototype.pipeActiveProject = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return _this.s.pro$.project$.by_pk_entity$.key(pkProject.toString()); }))).pipe(filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return !!l; })));
    };
    /**
     * @return {?}
     */
    ActiveProjectPipesService.prototype.pipeActiveDefaultLanguage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.pipeActiveProject().pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        function (p) { return !!p; })), switchMap((/**
         * @param {?} project
         * @return {?}
         */
        function (project) {
            return _this.s.inf$.language$.by_pk_entity$.key(project.fk_language.toString());
        }))).pipe(filter((/**
         * @param {?} l
         * @return {?}
         */
        function (l) { return !!l; })));
    };
    /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param pkEntity
     * @param forceReload
     */
    /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param {?} pkEntity
     * @param {?=} forceReload
     * @return {?}
     */
    ActiveProjectPipesService.prototype.streamEntityPreview = /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param {?} pkEntity
     * @param {?=} forceReload
     * @return {?}
     */
    function (pkEntity, forceReload) {
        var _this = this;
        /** @type {?} */
        var state = this.ngRedux.getState();
        if ((!(((state.war || {}).entity_preview || {}).by_pk_entity || {})[pkEntity] &&
            !this.requestedEntityPreviews[pkEntity]) || forceReload) {
            this.pkProject$.pipe(first((/**
             * @param {?} pk
             * @return {?}
             */
            function (pk) { return !!pk; }))).subscribe((/**
             * @param {?} pkProject
             * @return {?}
             */
            function (pkProject) {
                _this.entityPreviewSocket.emit('addToStream', {
                    pkProject: pkProject,
                    pks: [pkEntity]
                });
                // const pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
                // this.ngRedux.dispatch(this.actions.loadEntityPreview(pkProject, pkEntity, pkUiContext))
                _this.requestedEntityPreviews[pkEntity] = true;
            }));
        }
        return this.ngRedux.select(['war', 'entity_preview', 'by_pk_entity', pkEntity])
            .pipe(distinctUntilChanged(equals), filter((/**
         * @param {?} prev
         * @return {?}
         */
        function (prev) { return (!!prev); })));
    };
    /**
     * Adds the entity previews to the streamed entity previews (for ws communication)
     * @param object
     * @param pkProject
     */
    /**
     * Adds the entity previews to the streamed entity previews (for ws communication)
     * @private
     * @param {?} object
     * @param {?} pkProject
     * @return {?}
     */
    ActiveProjectPipesService.prototype.extendEntityPreviewStream = /**
     * Adds the entity previews to the streamed entity previews (for ws communication)
     * @private
     * @param {?} object
     * @param {?} pkProject
     * @return {?}
     */
    function (object, pkProject) {
        if (object && object.war && object.war.entity_preview && object.war.entity_preview.length) {
            this.entityPreviewSocket.emit('extendStream', {
                pkProject: pkProject,
                pks: object.war.entity_preview.map((/**
                 * @param {?} p
                 * @return {?}
                 */
                function (p) { return p.pk_entity; }))
            });
        }
    };
    ActiveProjectPipesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ActiveProjectPipesService.ctorParameters = function () { return [
        { type: NgRedux },
        { type: SchemaSelectorsService },
        { type: EntityPreviewSocket },
        { type: SchemaService }
    ]; };
    /** @nocollapse */ ActiveProjectPipesService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActiveProjectPipesService_Factory() { return new ActiveProjectPipesService(i0.ɵɵinject(i1.NgRedux), i0.ɵɵinject(i2.SchemaSelectorsService), i0.ɵɵinject(i3.EntityPreviewSocket), i0.ɵɵinject(i4.SchemaService)); }, token: ActiveProjectPipesService, providedIn: "root" });
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ActiveProjectPipesService.prototype, "pipeActiveProject", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ActiveProjectPipesService.prototype, "pipeActiveDefaultLanguage", null);
    return ActiveProjectPipesService;
}());
export { ActiveProjectPipesService };
if (false) {
    /** @type {?} */
    ActiveProjectPipesService.prototype.pkProject$;
    /** @type {?} */
    ActiveProjectPipesService.prototype.requestedEntityPreviews;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectPipesService.prototype.ngRedux;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectPipesService.prototype.s;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectPipesService.prototype.entityPreviewSocket;
    /**
     * @type {?}
     * @private
     */
    ActiveProjectPipesService.prototype.schemaService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFhLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7QUFFcEU7SUFTRSxtQ0FDVSxPQUEyQixFQUMzQixDQUF5QixFQUN6QixtQkFBd0MsRUFDeEMsYUFBNEI7UUFKdEMsaUJBd0NDO1FBdkNTLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLE1BQUMsR0FBRCxDQUFDLENBQXdCO1FBQ3pCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFQdEMsNEJBQXVCLEdBQW9DLEVBQUUsQ0FBQTtRQVUzRCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQVMsQ0FBQyxlQUFlLEVBQUUs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QU0sRUFBRTtZQUN6RixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDNUMsU0FBUyxXQUFBO2dCQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHOzs7O2dCQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFNBQVMsRUFBWCxDQUFXLEVBQUM7YUFDckQsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztnQkFwSEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7OztnQkFiUSxPQUFPO2dCQVNQLHNCQUFzQjtnQkFMdEIsbUJBQW1CO2dCQUZSLGFBQWE7OztJQTJESDtRQUEzQixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OztnREFBc0IsVUFBVTtzRUFJMUQ7SUFDMkI7UUFBM0IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Z0RBQThCLFVBQVU7OEVBU2xFO29DQTNFSDtDQWdJQyxBQXJIRCxJQXFIQztTQWxIWSx5QkFBeUI7OztJQUNwQywrQ0FBc0M7O0lBRXRDLDREQUE2RDs7Ozs7SUFJM0QsNENBQW1DOzs7OztJQUNuQyxzQ0FBaUM7Ozs7O0lBQ2pDLHdEQUFnRDs7Ozs7SUFDaEQsa0RBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBcHBTdGF0ZSwgU2NoZW1hU2VydmljZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgR3ZTY2hlbWFPYmplY3QsIEluZkxhbmd1YWdlLCBQcm9Qcm9qZWN0LCBXYXJFbnRpdHlQcmV2aWV3IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEVudGl0eVByZXZpZXdTb2NrZXQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNvY2tldHMnO1xuaW1wb3J0IHsgZXF1YWxzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgZmlyc3QsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIHtcbiAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICByZXF1ZXN0ZWRFbnRpdHlQcmV2aWV3czogeyBbcGtFbnRpdHk6IG51bWJlcl06IGJvb2xlYW4gfSA9IHt9XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbnRpdHlQcmV2aWV3U29ja2V0OiBFbnRpdHlQcmV2aWV3U29ja2V0LFxuICAgIHByaXZhdGUgc2NoZW1hU2VydmljZTogU2NoZW1hU2VydmljZVxuXG4gICkge1xuICAgIHRoaXMucGtQcm9qZWN0JCA9IG5nUmVkdXguc2VsZWN0PG51bWJlcj4oWydhY3RpdmVQcm9qZWN0JywgJ3BrX3Byb2plY3QnXSlcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIocCA9PiBwICE9PSB1bmRlZmluZWQpLFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoeCwgeSkgPT4ge1xuICAgICAgICAgIHJldHVybiB4ID09PSB5XG4gICAgICAgIH0pXG4gICAgICApO1xuXG5cblxuICAgIHRoaXMuZW50aXR5UHJldmlld1NvY2tldC5mcm9tRXZlbnQoJ3JlY29ubmVjdCcpLnN1YnNjcmliZShkaXNjb25uZWN0ID0+IHtcbiAgICAgIC8vIGdldCBhbGwgRW50aXR5UHJldmlldyBrZXlzIGZyb20gc3RhdGUgYW5kIHNlbmQgdGhlbSB0byB0aGVcbiAgICAgIC8vIHNlcnZlciBzbyB0aGF0IHRoZXkgd2lsbCBiZSBzdHJlYW1lZC4gVGhpcyBpcyBpbXBvcnRhbnQgZm9yXG4gICAgICAvLyB3aGVuIGNvbm5lY3Rpb24gd2FzIGxvc3QuXG4gICAgICB0aGlzLnBrUHJvamVjdCQucGlwZShmaXJzdCgpKVxuICAgICAgICAuc3Vic2NyaWJlKChwa1Byb2plY3QpID0+IHtcbiAgICAgICAgICBjb25zdCBwa3MgPSBPYmplY3Qua2V5cyh7XG4gICAgICAgICAgICAuLi50aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS53YXIuZW50aXR5X3ByZXZpZXcsXG4gICAgICAgICAgICAuLi50aGlzLnJlcXVlc3RlZEVudGl0eVByZXZpZXdzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHBrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5UHJldmlld1NvY2tldC5lbWl0KCdhZGRUb1N0cmVhbScsIHtcbiAgICAgICAgICAgICAgcGtQcm9qZWN0LFxuICAgICAgICAgICAgICBwa3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBjb21iaW5lTGF0ZXN0KHRoaXMuc2NoZW1hU2VydmljZS5zY2hlbWFPYmplY3RTdG9yZWQkLCB0aGlzLnBrUHJvamVjdCQpLnN1YnNjcmliZSgoW29iamVjdCwgcGtQcm9qZWN0XSkgPT4ge1xuICAgICAgdGhpcy5leHRlbmRFbnRpdHlQcmV2aWV3U3RyZWFtKG9iamVjdCwgcGtQcm9qZWN0KVxuICAgIH0pXG5cbiAgfVxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUFjdGl2ZVByb2plY3QoKTogT2JzZXJ2YWJsZTxQcm9Qcm9qZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5wcm9qZWN0JC5ieV9wa19lbnRpdHkkLmtleShwa1Byb2plY3QudG9TdHJpbmcoKSkpXG4gICAgKS5waXBlKGZpbHRlcihsID0+ICEhbCkpXG4gIH1cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVBY3RpdmVEZWZhdWx0TGFuZ3VhZ2UoKTogT2JzZXJ2YWJsZTxJbmZMYW5ndWFnZT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucGlwZUFjdGl2ZVByb2plY3QoKS5waXBlKFxuICAgICAgZmlsdGVyKHAgPT4gISFwKSxcbiAgICAgIHN3aXRjaE1hcChwcm9qZWN0ID0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KHByb2plY3QuZmtfbGFuZ3VhZ2UudG9TdHJpbmcoKSlcbiAgICAgIH0pXG4gICAgKS5waXBlKGZpbHRlcihsID0+ICEhbCkpXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIExvYWRzIGEgZGF0YSB1bml0IHByZXZpZXcsIGlmIGl0IGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGluIHN0YXRlIG9yIGlmXG4gICAqIGZvcmNlUmVsb2FkIGlzIHRydWU7XG4gICAqXG4gICAqIEBwYXJhbSBwa0VudGl0eVxuICAgKiBAcGFyYW0gZm9yY2VSZWxvYWRcbiAgICovXG4gIHN0cmVhbUVudGl0eVByZXZpZXcocGtFbnRpdHk6IG51bWJlciwgZm9yY2VSZWxvYWQ/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxXYXJFbnRpdHlQcmV2aWV3PiB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKTtcblxuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgISgoKHN0YXRlLndhciB8fCB7fSkuZW50aXR5X3ByZXZpZXcgfHwge30pLmJ5X3BrX2VudGl0eSB8fCB7fSlbcGtFbnRpdHldICYmXG4gICAgICAgICF0aGlzLnJlcXVlc3RlZEVudGl0eVByZXZpZXdzW3BrRW50aXR5XVxuICAgICAgKSB8fCBmb3JjZVJlbG9hZCkge1xuICAgICAgdGhpcy5wa1Byb2plY3QkLnBpcGUoZmlyc3QocGsgPT4gISFwaykpLnN1YnNjcmliZShwa1Byb2plY3QgPT4ge1xuXG4gICAgICAgIHRoaXMuZW50aXR5UHJldmlld1NvY2tldC5lbWl0KCdhZGRUb1N0cmVhbScsIHtcbiAgICAgICAgICBwa1Byb2plY3QsXG4gICAgICAgICAgcGtzOiBbcGtFbnRpdHldXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGNvbnN0IHBrVWlDb250ZXh0ID0gU3lzQ29uZmlnLlBLX1VJX0NPTlRFWFRfREFUQVVOSVRTX0VESVRBQkxFO1xuXG4gICAgICAgIC8vIHRoaXMubmdSZWR1eC5kaXNwYXRjaCh0aGlzLmFjdGlvbnMubG9hZEVudGl0eVByZXZpZXcocGtQcm9qZWN0LCBwa0VudGl0eSwgcGtVaUNvbnRleHQpKVxuICAgICAgICB0aGlzLnJlcXVlc3RlZEVudGl0eVByZXZpZXdzW3BrRW50aXR5XSA9IHRydWU7XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PFdhckVudGl0eVByZXZpZXc+KFsnd2FyJywgJ2VudGl0eV9wcmV2aWV3JywgJ2J5X3BrX2VudGl0eScsIHBrRW50aXR5XSlcbiAgICAgIC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZDxXYXJFbnRpdHlQcmV2aWV3PihlcXVhbHMpLFxuICAgICAgICBmaWx0ZXIocHJldiA9PiAoISFwcmV2KSlcbiAgICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIHRoZSBlbnRpdHkgcHJldmlld3MgdG8gdGhlIHN0cmVhbWVkIGVudGl0eSBwcmV2aWV3cyAoZm9yIHdzIGNvbW11bmljYXRpb24pXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHBhcmFtIHBrUHJvamVjdFxuICAgKi9cbiAgcHJpdmF0ZSBleHRlbmRFbnRpdHlQcmV2aWV3U3RyZWFtKG9iamVjdDogR3ZTY2hlbWFPYmplY3QsIHBrUHJvamVjdDogbnVtYmVyKSB7XG5cbiAgICBpZiAob2JqZWN0ICYmIG9iamVjdC53YXIgJiYgb2JqZWN0Lndhci5lbnRpdHlfcHJldmlldyAmJiBvYmplY3Qud2FyLmVudGl0eV9wcmV2aWV3Lmxlbmd0aCkge1xuICAgICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmVtaXQoJ2V4dGVuZFN0cmVhbScsIHtcbiAgICAgICAgcGtQcm9qZWN0LFxuICAgICAgICBwa3M6IG9iamVjdC53YXIuZW50aXR5X3ByZXZpZXcubWFwKHAgPT4gcC5wa19lbnRpdHkpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==