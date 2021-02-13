/**
 * @fileoverview added by tsickle
 * Generated from: services/active-project-pipes.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7O0FBS3BFLE1BQU0sT0FBTyx5QkFBeUI7Ozs7OztJQU1wQyxZQUNVLE9BQTJCLEVBQzNCLENBQXlCLEVBQ3pCLG1CQUF3QztRQUZ4QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixNQUFDLEdBQUQsQ0FBQyxDQUF3QjtRQUN6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBTmxELDRCQUF1QixHQUFvQyxFQUFFLENBQUE7UUFTM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFTLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUM1RSxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUyxF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QUVsRSwwRkFBMEY7Z0JBQzFGLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDaEQsQ0FBQyxFQUFDLENBQUE7U0FDSDtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQW1CLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM5RixJQUFJLENBQ0gsb0JBQW9CLENBQW1CLE1BQU0sQ0FBQyxFQUM5QyxNQUFNOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUN6QixDQUFBO0lBQ0wsQ0FBQzs7O1lBakdGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQWJRLE9BQU87WUFTUCxzQkFBc0I7WUFMdEIsbUJBQW1COzs7QUFxREU7SUFBM0IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7NENBQXNCLFVBQVU7a0VBSTFEO0FBQzJCO0lBQTNCLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OzRDQUE4QixVQUFVOzBFQVNsRTs7O0lBeERELCtDQUFzQzs7SUFFdEMsNERBQTZEOzs7OztJQUkzRCw0Q0FBbUM7Ozs7O0lBQ25DLHNDQUFpQzs7Ozs7SUFDakMsd0RBQWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBcHBTdGF0ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgSW5mTGFuZ3VhZ2UsIFByb1Byb2plY3QsIFdhckVudGl0eVByZXZpZXcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgRW50aXR5UHJldmlld1NvY2tldCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc29ja2V0cyc7XG5pbXBvcnQgeyBlcXVhbHMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBmaXJzdCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2Uge1xuICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHJlcXVlc3RlZEVudGl0eVByZXZpZXdzOiB7IFtwa0VudGl0eTogbnVtYmVyXTogYm9vbGVhbiB9ID0ge31cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgICBwcml2YXRlIGVudGl0eVByZXZpZXdTb2NrZXQ6IEVudGl0eVByZXZpZXdTb2NrZXQsXG5cbiAgKSB7XG4gICAgdGhpcy5wa1Byb2plY3QkID0gbmdSZWR1eC5zZWxlY3Q8bnVtYmVyPihbJ2FjdGl2ZVByb2plY3QnLCAncGtfcHJvamVjdCddKS5waXBlKFxuICAgICAgZmlsdGVyKHAgPT4gcCAhPT0gdW5kZWZpbmVkKSxcbiAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB7XG4gICAgICAgIHJldHVybiB4ID09PSB5XG4gICAgICB9KVxuICAgICk7XG5cblxuXG4gICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmZyb21FdmVudCgncmVjb25uZWN0Jykuc3Vic2NyaWJlKGRpc2Nvbm5lY3QgPT4ge1xuICAgICAgLy8gZ2V0IGFsbCBFbnRpdHlQcmV2aWV3IGtleXMgZnJvbSBzdGF0ZSBhbmQgc2VuZCB0aGVtIHRvIHRoZVxuICAgICAgLy8gc2VydmVyIHNvIHRoYXQgdGhleSB3aWxsIGJlIHN0cmVhbWVkLiBUaGlzIGlzIGltcG9ydGFudCBmb3JcbiAgICAgIC8vIHdoZW4gY29ubmVjdGlvbiB3YXMgbG9zdC5cbiAgICAgIHRoaXMucGtQcm9qZWN0JC5waXBlKGZpcnN0KCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHBrUHJvamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBrcyA9IE9iamVjdC5rZXlzKHtcbiAgICAgICAgICAgIC4uLnRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLndhci5lbnRpdHlfcHJldmlldyxcbiAgICAgICAgICAgIC4uLnRoaXMucmVxdWVzdGVkRW50aXR5UHJldmlld3NcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAocGtzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmVtaXQoJ2FkZFRvU3RyZWFtJywge1xuICAgICAgICAgICAgICBwa1Byb2plY3QsXG4gICAgICAgICAgICAgIHBrc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcblxuXG5cbiAgfVxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUFjdGl2ZVByb2plY3QoKTogT2JzZXJ2YWJsZTxQcm9Qcm9qZWN0PiB7XG4gICAgcmV0dXJuIHRoaXMucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5wcm9qZWN0JC5ieV9wa19lbnRpdHkkLmtleShwa1Byb2plY3QudG9TdHJpbmcoKSkpXG4gICAgKS5waXBlKGZpbHRlcihsID0+ICEhbCkpXG4gIH1cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVBY3RpdmVEZWZhdWx0TGFuZ3VhZ2UoKTogT2JzZXJ2YWJsZTxJbmZMYW5ndWFnZT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucGlwZUFjdGl2ZVByb2plY3QoKS5waXBlKFxuICAgICAgZmlsdGVyKHAgPT4gISFwKSxcbiAgICAgIHN3aXRjaE1hcChwcm9qZWN0ID0+IHtcblxuICAgICAgICByZXR1cm4gdGhpcy5zLmluZiQubGFuZ3VhZ2UkLmJ5X3BrX2VudGl0eSQua2V5KHByb2plY3QuZmtfbGFuZ3VhZ2UudG9TdHJpbmcoKSlcbiAgICAgIH0pXG4gICAgKS5waXBlKGZpbHRlcihsID0+ICEhbCkpXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIExvYWRzIGEgZGF0YSB1bml0IHByZXZpZXcsIGlmIGl0IGlzIG5vdCB5ZXQgYXZhaWxhYmxlIGluIHN0YXRlIG9yIGlmXG4gICAqIGZvcmNlUmVsb2FkIGlzIHRydWU7XG4gICAqXG4gICAqIEBwYXJhbSBwa0VudGl0eVxuICAgKiBAcGFyYW0gZm9yY2VSZWxvYWRcbiAgICovXG4gIHN0cmVhbUVudGl0eVByZXZpZXcocGtFbnRpdHk6IG51bWJlciwgZm9yY2VSZWxvYWQ/OiBib29sZWFuKTogT2JzZXJ2YWJsZTxXYXJFbnRpdHlQcmV2aWV3PiB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLm5nUmVkdXguZ2V0U3RhdGUoKTtcblxuICAgIGlmIChcbiAgICAgIChcbiAgICAgICAgISgoKHN0YXRlLndhciB8fCB7fSkuZW50aXR5X3ByZXZpZXcgfHwge30pLmJ5X3BrX2VudGl0eSB8fCB7fSlbcGtFbnRpdHldICYmXG4gICAgICAgICF0aGlzLnJlcXVlc3RlZEVudGl0eVByZXZpZXdzW3BrRW50aXR5XVxuICAgICAgKSB8fCBmb3JjZVJlbG9hZCkge1xuICAgICAgdGhpcy5wa1Byb2plY3QkLnBpcGUoZmlyc3QocGsgPT4gISFwaykpLnN1YnNjcmliZShwa1Byb2plY3QgPT4ge1xuXG4gICAgICAgIHRoaXMuZW50aXR5UHJldmlld1NvY2tldC5lbWl0KCdhZGRUb1N0cmVhbScsIHtcbiAgICAgICAgICBwa1Byb2plY3QsXG4gICAgICAgICAgcGtzOiBbcGtFbnRpdHldXG4gICAgICAgIH0pXG4gICAgICAgIC8vIGNvbnN0IHBrVWlDb250ZXh0ID0gU3lzQ29uZmlnLlBLX1VJX0NPTlRFWFRfREFUQVVOSVRTX0VESVRBQkxFO1xuXG4gICAgICAgIC8vIHRoaXMubmdSZWR1eC5kaXNwYXRjaCh0aGlzLmFjdGlvbnMubG9hZEVudGl0eVByZXZpZXcocGtQcm9qZWN0LCBwa0VudGl0eSwgcGtVaUNvbnRleHQpKVxuICAgICAgICB0aGlzLnJlcXVlc3RlZEVudGl0eVByZXZpZXdzW3BrRW50aXR5XSA9IHRydWU7XG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5nUmVkdXguc2VsZWN0PFdhckVudGl0eVByZXZpZXc+KFsnd2FyJywgJ2VudGl0eV9wcmV2aWV3JywgJ2J5X3BrX2VudGl0eScsIHBrRW50aXR5XSlcbiAgICAgIC5waXBlKFxuICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZDxXYXJFbnRpdHlQcmV2aWV3PihlcXVhbHMpLFxuICAgICAgICBmaWx0ZXIocHJldiA9PiAoISFwcmV2KSlcbiAgICAgIClcbiAgfVxuXG59XG4iXX0=