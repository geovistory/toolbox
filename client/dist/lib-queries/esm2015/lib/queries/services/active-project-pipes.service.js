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
export class ActiveProjectPipesService {
    /**
     * @param {?} ngRedux
     * @param {?} s
     * @param {?} entityPreviewSocket
     */
    constructor(ngRedux, s, entityPreviewSocket) {
        this.ngRedux = ngRedux;
        this.s = s;
        this.entityPreviewSocket = entityPreviewSocket;
        this.requestedEntityPreviews = {};
        this.pkProject$ = ngRedux.select(['activeProject', 'pk_project']).pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        p => p !== undefined)), distinctUntilChanged((/**
         * @param {?} x
         * @param {?} y
         * @return {?}
         */
        (x, y) => {
            return x === y;
        })));
        this.entityPreviewSocket.fromEvent('reconnect').subscribe((/**
         * @param {?} disconnect
         * @return {?}
         */
        disconnect => {
            // get all EntityPreview keys from state and send them to the
            // server so that they will be streamed. This is important for
            // when connection was lost.
            this.pkProject$.pipe(first())
                .subscribe((/**
             * @param {?} pkProject
             * @return {?}
             */
            (pkProject) => {
                /** @type {?} */
                const pks = Object.keys(Object.assign({}, this.ngRedux.getState().war.entity_preview, this.requestedEntityPreviews));
                if (pks.length) {
                    this.entityPreviewSocket.emit('addToStream', {
                        pkProject,
                        pks
                    });
                }
            }));
        }));
    }
    /**
     * @return {?}
     */
    pipeActiveProject() {
        return this.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => this.s.pro$.project$.by_pk_entity$.key(pkProject.toString())))).pipe(filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !!l)));
    }
    /**
     * @return {?}
     */
    pipeActiveDefaultLanguage() {
        return this.pipeActiveProject().pipe(filter((/**
         * @param {?} p
         * @return {?}
         */
        p => !!p)), switchMap((/**
         * @param {?} project
         * @return {?}
         */
        project => {
            return this.s.inf$.language$.by_pk_entity$.key(project.fk_language.toString());
        }))).pipe(filter((/**
         * @param {?} l
         * @return {?}
         */
        l => !!l)));
    }
    /**
     * Loads a data unit preview, if it is not yet available in state or if
     * forceReload is true;
     *
     * @param {?} pkEntity
     * @param {?=} forceReload
     * @return {?}
     */
    streamEntityPreview(pkEntity, forceReload) {
        /** @type {?} */
        const state = this.ngRedux.getState();
        if ((!(((state.war || {}).entity_preview || {}).by_pk_entity || {})[pkEntity] &&
            !this.requestedEntityPreviews[pkEntity]) || forceReload) {
            this.pkProject$.pipe(first((/**
             * @param {?} pk
             * @return {?}
             */
            pk => !!pk))).subscribe((/**
             * @param {?} pkProject
             * @return {?}
             */
            pkProject => {
                this.entityPreviewSocket.emit('addToStream', {
                    pkProject,
                    pks: [pkEntity]
                });
                // const pkUiContext = SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
                // this.ngRedux.dispatch(this.actions.loadEntityPreview(pkProject, pkEntity, pkUiContext))
                this.requestedEntityPreviews[pkEntity] = true;
            }));
        }
        return this.ngRedux.select(['war', 'entity_preview', 'by_pk_entity', pkEntity])
            .pipe(distinctUntilChanged(equals), filter((/**
         * @param {?} prev
         * @return {?}
         */
        prev => (!!prev))));
    }
}
ActiveProjectPipesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ActiveProjectPipesService.ctorParameters = () => [
    { type: NgRedux },
    { type: SchemaSelectorsService },
    { type: EntityPreviewSocket }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7QUFLcEUsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7O0lBTXBDLFlBQ1UsT0FBMkIsRUFDM0IsQ0FBeUIsRUFDekIsbUJBQXdDO1FBRnhDLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLE1BQUMsR0FBRCxDQUFDLENBQXdCO1FBQ3pCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFObEQsNEJBQXVCLEdBQW9DLEVBQUUsQ0FBQTtRQVMzRCxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQVMsQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzVFLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUMs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LDBGQUEwRjtnQkFDMUYsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNoRCxDQUFDLEVBQUMsQ0FBQTtTQUNIO1FBRUQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBbUIsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzlGLElBQUksQ0FDSCxvQkFBb0IsQ0FBbUIsTUFBTSxDQUFDLEVBQzlDLE1BQU07Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQ3pCLENBQUE7SUFDTCxDQUFDOzs7WUFqR0YsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBYlEsT0FBTztZQVNQLHNCQUFzQjtZQUx0QixtQkFBbUI7OztBQXFERTtJQUEzQixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7Ozs0Q0FBc0IsVUFBVTtrRUFJMUQ7QUFDMkI7SUFBM0IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7NENBQThCLFVBQVU7MEVBU2xFOzs7SUF4REQsK0NBQXNDOztJQUV0Qyw0REFBNkQ7Ozs7O0lBSTNELDRDQUFtQzs7Ozs7SUFDbkMsc0NBQWlDOzs7OztJQUNqQyx3REFBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBJbmZMYW5ndWFnZSwgUHJvUHJvamVjdCwgV2FyRW50aXR5UHJldmlldyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBFbnRpdHlQcmV2aWV3U29ja2V0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zb2NrZXRzJztcbmltcG9ydCB7IGVxdWFscyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIGZpcnN0LCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWNoZSB9IGZyb20gJy4uL2RlY29yYXRvcnMvbWV0aG9kLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB7XG4gIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcmVxdWVzdGVkRW50aXR5UHJldmlld3M6IHsgW3BrRW50aXR5OiBudW1iZXJdOiBib29sZWFuIH0gPSB7fVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZW50aXR5UHJldmlld1NvY2tldDogRW50aXR5UHJldmlld1NvY2tldCxcblxuICApIHtcbiAgICB0aGlzLnBrUHJvamVjdCQgPSBuZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsnYWN0aXZlUHJvamVjdCcsICdwa19wcm9qZWN0J10pLnBpcGUoXG4gICAgICBmaWx0ZXIocCA9PiBwICE9PSB1bmRlZmluZWQpLFxuICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHgsIHkpID0+IHtcbiAgICAgICAgcmV0dXJuIHggPT09IHlcbiAgICAgIH0pXG4gICAgKTtcblxuXG5cbiAgICB0aGlzLmVudGl0eVByZXZpZXdTb2NrZXQuZnJvbUV2ZW50KCdyZWNvbm5lY3QnKS5zdWJzY3JpYmUoZGlzY29ubmVjdCA9PiB7XG4gICAgICAvLyBnZXQgYWxsIEVudGl0eVByZXZpZXcga2V5cyBmcm9tIHN0YXRlIGFuZCBzZW5kIHRoZW0gdG8gdGhlXG4gICAgICAvLyBzZXJ2ZXIgc28gdGhhdCB0aGV5IHdpbGwgYmUgc3RyZWFtZWQuIFRoaXMgaXMgaW1wb3J0YW50IGZvclxuICAgICAgLy8gd2hlbiBjb25uZWN0aW9uIHdhcyBsb3N0LlxuICAgICAgdGhpcy5wa1Byb2plY3QkLnBpcGUoZmlyc3QoKSlcbiAgICAgICAgLnN1YnNjcmliZSgocGtQcm9qZWN0KSA9PiB7XG4gICAgICAgICAgY29uc3QgcGtzID0gT2JqZWN0LmtleXMoe1xuICAgICAgICAgICAgLi4udGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkud2FyLmVudGl0eV9wcmV2aWV3LFxuICAgICAgICAgICAgLi4udGhpcy5yZXF1ZXN0ZWRFbnRpdHlQcmV2aWV3c1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChwa3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eVByZXZpZXdTb2NrZXQuZW1pdCgnYWRkVG9TdHJlYW0nLCB7XG4gICAgICAgICAgICAgIHBrUHJvamVjdCxcbiAgICAgICAgICAgICAgcGtzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuXG5cblxuICB9XG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQWN0aXZlUHJvamVjdCgpOiBPYnNlcnZhYmxlPFByb1Byb2plY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLnByb2plY3QkLmJ5X3BrX2VudGl0eSQua2V5KHBrUHJvamVjdC50b1N0cmluZygpKSlcbiAgICApLnBpcGUoZmlsdGVyKGwgPT4gISFsKSlcbiAgfVxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpOiBPYnNlcnZhYmxlPEluZkxhbmd1YWdlPiB7XG5cbiAgICByZXR1cm4gdGhpcy5waXBlQWN0aXZlUHJvamVjdCgpLnBpcGUoXG4gICAgICBmaWx0ZXIocCA9PiAhIXApLFxuICAgICAgc3dpdGNoTWFwKHByb2plY3QgPT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkocHJvamVjdC5ma19sYW5ndWFnZS50b1N0cmluZygpKVxuICAgICAgfSlcbiAgICApLnBpcGUoZmlsdGVyKGwgPT4gISFsKSlcbiAgfVxuXG5cblxuICAvKipcbiAgICogTG9hZHMgYSBkYXRhIHVuaXQgcHJldmlldywgaWYgaXQgaXMgbm90IHlldCBhdmFpbGFibGUgaW4gc3RhdGUgb3IgaWZcbiAgICogZm9yY2VSZWxvYWQgaXMgdHJ1ZTtcbiAgICpcbiAgICogQHBhcmFtIHBrRW50aXR5XG4gICAqIEBwYXJhbSBmb3JjZVJlbG9hZFxuICAgKi9cbiAgc3RyZWFtRW50aXR5UHJldmlldyhwa0VudGl0eTogbnVtYmVyLCBmb3JjZVJlbG9hZD86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFdhckVudGl0eVByZXZpZXc+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpO1xuXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAhKCgoc3RhdGUud2FyIHx8IHt9KS5lbnRpdHlfcHJldmlldyB8fCB7fSkuYnlfcGtfZW50aXR5IHx8IHt9KVtwa0VudGl0eV0gJiZcbiAgICAgICAgIXRoaXMucmVxdWVzdGVkRW50aXR5UHJldmlld3NbcGtFbnRpdHldXG4gICAgICApIHx8IGZvcmNlUmVsb2FkKSB7XG4gICAgICB0aGlzLnBrUHJvamVjdCQucGlwZShmaXJzdChwayA9PiAhIXBrKSkuc3Vic2NyaWJlKHBrUHJvamVjdCA9PiB7XG5cbiAgICAgICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmVtaXQoJ2FkZFRvU3RyZWFtJywge1xuICAgICAgICAgIHBrUHJvamVjdCxcbiAgICAgICAgICBwa3M6IFtwa0VudGl0eV1cbiAgICAgICAgfSlcbiAgICAgICAgLy8gY29uc3QgcGtVaUNvbnRleHQgPSBTeXNDb25maWcuUEtfVUlfQ09OVEVYVF9EQVRBVU5JVFNfRURJVEFCTEU7XG5cbiAgICAgICAgLy8gdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKHRoaXMuYWN0aW9ucy5sb2FkRW50aXR5UHJldmlldyhwa1Byb2plY3QsIHBrRW50aXR5LCBwa1VpQ29udGV4dCkpXG4gICAgICAgIHRoaXMucmVxdWVzdGVkRW50aXR5UHJldmlld3NbcGtFbnRpdHldID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8V2FyRW50aXR5UHJldmlldz4oWyd3YXInLCAnZW50aXR5X3ByZXZpZXcnLCAnYnlfcGtfZW50aXR5JywgcGtFbnRpdHldKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPFdhckVudGl0eVByZXZpZXc+KGVxdWFscyksXG4gICAgICAgIGZpbHRlcihwcmV2ID0+ICghIXByZXYpKVxuICAgICAgKVxuICB9XG5cbn1cbiJdfQ==