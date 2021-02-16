/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/active-project-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { EntityPreviewSocket } from '@kleiolab/lib-sockets';
import { equals } from 'ramda';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, first, switchMap } from 'rxjs/operators';
import { cache } from '../decorators/method-decorators';
import { SchemaSelectorsService } from './schema-selectors.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
import * as i2 from "./schema-selectors.service";
import * as i3 from "@kleiolab/lib-sockets";
var ActiveProjectPipesService = /** @class */ (function () {
    function ActiveProjectPipesService(ngRedux, s, entityPreviewSocket) {
        var _this = this;
        this.ngRedux = ngRedux;
        this.s = s;
        this.entityPreviewSocket = entityPreviewSocket;
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
    ActiveProjectPipesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ActiveProjectPipesService.ctorParameters = function () { return [
        { type: NgRedux },
        { type: SchemaSelectorsService },
        { type: EntityPreviewSocket }
    ]; };
    /** @nocollapse */ ActiveProjectPipesService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ActiveProjectPipesService_Factory() { return new ActiveProjectPipesService(i0.ɵɵinject(i1.NgRedux), i0.ɵɵinject(i2.SchemaSelectorsService), i0.ɵɵinject(i3.EntityPreviewSocket)); }, token: ActiveProjectPipesService, providedIn: "root" });
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7QUFFcEU7SUFTRSxtQ0FDVSxPQUEyQixFQUMzQixDQUF5QixFQUN6QixtQkFBd0M7UUFIbEQsaUJBcUNDO1FBcENTLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLE1BQUMsR0FBRCxDQUFDLENBQXdCO1FBQ3pCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFObEQsNEJBQXVCLEdBQW9DLEVBQUUsQ0FBQTtRQVMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQVMsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDdEUsSUFBSSxDQUNILE1BQU07Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxTQUFTLEVBQWYsQ0FBZSxFQUFD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QixDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7b0JBQzNDLFNBQVMsV0FBQTtvQkFDVCxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUM7aUJBQ2hCLENBQUMsQ0FBQTtnQkFDRixrRUFBa0U7Z0JBRWxFLDBGQUEwRjtnQkFDMUYsS0FBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNoRCxDQUFDLEVBQUMsQ0FBQTtTQUNIO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBbUIsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzlGLElBQUksQ0FDSCxvQkFBb0IsQ0FBbUIsTUFBTSxDQUFDLEVBQzlDLE1BQU07Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFSLENBQVEsRUFBQyxDQUN6QixDQUFBO0lBQ0wsQ0FBQzs7Z0JBbEdGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBYlEsT0FBTztnQkFTUCxzQkFBc0I7Z0JBTHRCLG1CQUFtQjs7O0lBc0RFO1FBQTNCLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7O2dEQUFzQixVQUFVO3NFQUkxRDtJQUMyQjtRQUEzQixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OztnREFBOEIsVUFBVTs4RUFTbEU7b0NBeEVIO0NBK0dDLEFBcEdELElBb0dDO1NBakdZLHlCQUF5Qjs7O0lBQ3BDLCtDQUFzQzs7SUFFdEMsNERBQTZEOzs7OztJQUkzRCw0Q0FBbUM7Ozs7O0lBQ25DLHNDQUFpQzs7Ozs7SUFDakMsd0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgSW5mTGFuZ3VhZ2UsIFByb1Byb2plY3QsIFdhckVudGl0eVByZXZpZXcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgRW50aXR5UHJldmlld1NvY2tldCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc29ja2V0cyc7XG5pbXBvcnQgeyBlcXVhbHMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBmaXJzdCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2Uge1xuICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHJlcXVlc3RlZEVudGl0eVByZXZpZXdzOiB7IFtwa0VudGl0eTogbnVtYmVyXTogYm9vbGVhbiB9ID0ge31cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgICBwcml2YXRlIGVudGl0eVByZXZpZXdTb2NrZXQ6IEVudGl0eVByZXZpZXdTb2NrZXQsXG5cbiAgKSB7XG4gICAgdGhpcy5wa1Byb2plY3QkID0gbmdSZWR1eC5zZWxlY3Q8bnVtYmVyPihbJ2FjdGl2ZVByb2plY3QnLCAncGtfcHJvamVjdCddKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihwID0+IHAgIT09IHVuZGVmaW5lZCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHggPT09IHlcbiAgICAgICAgfSlcbiAgICAgICk7XG5cblxuXG4gICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmZyb21FdmVudCgncmVjb25uZWN0Jykuc3Vic2NyaWJlKGRpc2Nvbm5lY3QgPT4ge1xuICAgICAgLy8gZ2V0IGFsbCBFbnRpdHlQcmV2aWV3IGtleXMgZnJvbSBzdGF0ZSBhbmQgc2VuZCB0aGVtIHRvIHRoZVxuICAgICAgLy8gc2VydmVyIHNvIHRoYXQgdGhleSB3aWxsIGJlIHN0cmVhbWVkLiBUaGlzIGlzIGltcG9ydGFudCBmb3JcbiAgICAgIC8vIHdoZW4gY29ubmVjdGlvbiB3YXMgbG9zdC5cbiAgICAgIHRoaXMucGtQcm9qZWN0JC5waXBlKGZpcnN0KCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHBrUHJvamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBrcyA9IE9iamVjdC5rZXlzKHtcbiAgICAgICAgICAgIC4uLnRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLndhci5lbnRpdHlfcHJldmlldyxcbiAgICAgICAgICAgIC4uLnRoaXMucmVxdWVzdGVkRW50aXR5UHJldmlld3NcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAocGtzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmVtaXQoJ2FkZFRvU3RyZWFtJywge1xuICAgICAgICAgICAgICBwa1Byb2plY3QsXG4gICAgICAgICAgICAgIHBrc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcblxuXG5cbiAgfVxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUFjdGl2ZVByb2plY3QoKTogT2JzZXJ2YWJsZTxQcm9Qcm9qZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5wcm9qZWN0JC5ieV9wa19lbnRpdHkkLmtleShwa1Byb2plY3QudG9TdHJpbmcoKSkpXG4gICAgKS5waXBlKGZpbHRlcihsID0+ICEhbCkpXG4gIH1cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVBY3RpdmVEZWZhdWx0TGFuZ3VhZ2UoKTogT2JzZXJ2YWJsZTxJbmZMYW5ndWFnZT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucGlwZUFjdGl2ZVByb2plY3QoKS5waXBlKFxuICAgICAgZmlsdGVyKHAgPT4gISFwKSxcbiAgICAgIHN3aXRjaE1hcChwcm9qZWN0ID0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KHByb2plY3QuZmtfbGFuZ3VhZ2UudG9TdHJpbmcoKSlcbiAgICAgIH0pXG4gICAgKS5waXBlKGZpbHRlcihsID0+ICEhbCkpXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIExvYWRzIGEgZGF0YSB1bml0IHByZXZpZXcsIGlmIGl0IGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGluIHN0YXRlIG9yIGlmXG4gICAqIGZvcmNlUmVsb2FkIGlzIHRydWU7XG4gICAqXG4gICAqIEBwYXJhbSBwa0VudGl0eVxuICAgKiBAcGFyYW0gZm9yY2VSZWxvYWRcbiAgICovXG4gIHN0cmVhbUVudGl0eVByZXZpZXcocGtFbnRpdHk6IG51bWJlciwgZm9yY2VSZWxvYWQ/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxXYXJFbnRpdHlQcmV2aWV3PiB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKTtcblxuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgISgoKHN0YXRlLndhciB8fCB7fSkuZW50aXR5X3ByZXZpZXcgfHwge30pLmJ5X3BrX2VudGl0eSB8fCB7fSlbcGtFbnRpdHldICYmXG4gICAgICAgICF0aGlzLnJlcXVlc3RlZEVudGl0eVByZXZpZXdzW3BrRW50aXR5XVxuICAgICAgKSB8fCBmb3JjZVJlbG9hZCkge1xuICAgICAgdGhpcy5wa1Byb2plY3QkLnBpcGUoZmlyc3QocGsgPT4gISFwaykpLnN1YnNjcmliZShwa1Byb2plY3QgPT4ge1xuXG4gICAgICAgIHRoaXMuZW50aXR5UHJldmlld1NvY2tldC5lbWl0KCdhZGRUb1N0cmVhbScsIHtcbiAgICAgICAgICBwa1Byb2plY3QsXG4gICAgICAgICAgcGtzOiBbcGtFbnRpdHldXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGNvbnN0IHBrVWlDb250ZXh0ID0gU3lzQ29uZmlnLlBLX1VJX0NPTlRFWFRfREFUQVVOSVRTX0VESVRBQkxFO1xuXG4gICAgICAgIC8vIHRoaXMubmdSZWR1eC5kaXNwYXRjaCh0aGlzLmFjdGlvbnMubG9hZEVudGl0eVByZXZpZXcocGtQcm9qZWN0LCBwa0VudGl0eSwgcGtVaUNvbnRleHQpKVxuICAgICAgICB0aGlzLnJlcXVlc3RlZEVudGl0eVByZXZpZXdzW3BrRW50aXR5XSA9IHRydWU7XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PFdhckVudGl0eVByZXZpZXc+KFsnd2FyJywgJ2VudGl0eV9wcmV2aWV3JywgJ2J5X3BrX2VudGl0eScsIHBrRW50aXR5XSlcbiAgICAgIC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZDxXYXJFbnRpdHlQcmV2aWV3PihlcXVhbHMpLFxuICAgICAgICBmaWx0ZXIocHJldiA9PiAoISFwcmV2KSlcbiAgICAgIClcbiAgfVxuXG59XG4iXX0=