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
var ActiveProjectPipesService = /** @class */ (function () {
    function ActiveProjectPipesService(ngRedux, s, entityPreviewSocket) {
        var _this = this;
        this.ngRedux = ngRedux;
        this.s = s;
        this.entityPreviewSocket = entityPreviewSocket;
        this.requestedEntityPreviews = {};
        this.pkProject$ = ngRedux.select(['activeProject', 'pk_project']).pipe(filter((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7O0FBRXBFO0lBU0UsbUNBQ1UsT0FBMkIsRUFDM0IsQ0FBeUIsRUFDekIsbUJBQXdDO1FBSGxELGlCQW9DQztRQW5DUyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixNQUFDLEdBQUQsQ0FBQyxDQUF3QjtRQUN6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBTmxELDRCQUF1QixHQUFvQyxFQUFFLENBQUE7UUFTM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFTLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUM1RSxNQUFNOzs7O1FBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssU0FBUyxFQUFmLENBQWUs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QkFBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUMzQyxTQUFTLFdBQUE7b0JBQ1QsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDO2lCQUNoQixDQUFDLENBQUE7Z0JBQ0Ysa0VBQWtFO2dCQUVsRSwwRkFBMEY7Z0JBQzFGLEtBQUksQ0FBQyx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDaEQsQ0FBQyxFQUFDLENBQUE7U0FDSDtRQUVELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQW1CLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM5RixJQUFJLENBQ0gsb0JBQW9CLENBQW1CLE1BQU0sQ0FBQyxFQUM5QyxNQUFNOzs7O1FBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBUixDQUFRLEVBQUMsQ0FDekIsQ0FBQTtJQUNMLENBQUM7O2dCQWpHRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQWJRLE9BQU87Z0JBU1Asc0JBQXNCO2dCQUx0QixtQkFBbUI7OztJQXFERTtRQUEzQixLQUFLLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OztnREFBc0IsVUFBVTtzRUFJMUQ7SUFDMkI7UUFBM0IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Z0RBQThCLFVBQVU7OEVBU2xFO29DQXZFSDtDQThHQyxBQW5HRCxJQW1HQztTQWhHWSx5QkFBeUI7OztJQUNwQywrQ0FBc0M7O0lBRXRDLDREQUE2RDs7Ozs7SUFJM0QsNENBQW1DOzs7OztJQUNuQyxzQ0FBaUM7Ozs7O0lBQ2pDLHdEQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEluZkxhbmd1YWdlLCBQcm9Qcm9qZWN0LCBXYXJFbnRpdHlQcmV2aWV3IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IEVudGl0eVByZXZpZXdTb2NrZXQgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNvY2tldHMnO1xuaW1wb3J0IHsgZXF1YWxzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgZmlyc3QsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIHtcbiAgcHVibGljIHBrUHJvamVjdCQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICByZXF1ZXN0ZWRFbnRpdHlQcmV2aWV3czogeyBbcGtFbnRpdHk6IG51bWJlcl06IGJvb2xlYW4gfSA9IHt9XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbnRpdHlQcmV2aWV3U29ja2V0OiBFbnRpdHlQcmV2aWV3U29ja2V0LFxuXG4gICkge1xuICAgIHRoaXMucGtQcm9qZWN0JCA9IG5nUmVkdXguc2VsZWN0PG51bWJlcj4oWydhY3RpdmVQcm9qZWN0JywgJ3BrX3Byb2plY3QnXSkucGlwZShcbiAgICAgIGZpbHRlcihwID0+IHAgIT09IHVuZGVmaW5lZCksXG4gICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgoeCwgeSkgPT4ge1xuICAgICAgICByZXR1cm4geCA9PT0geVxuICAgICAgfSlcbiAgICApO1xuXG5cblxuICAgIHRoaXMuZW50aXR5UHJldmlld1NvY2tldC5mcm9tRXZlbnQoJ3JlY29ubmVjdCcpLnN1YnNjcmliZShkaXNjb25uZWN0ID0+IHtcbiAgICAgIC8vIGdldCBhbGwgRW50aXR5UHJldmlldyBrZXlzIGZyb20gc3RhdGUgYW5kIHNlbmQgdGhlbSB0byB0aGVcbiAgICAgIC8vIHNlcnZlciBzbyB0aGF0IHRoZXkgd2lsbCBiZSBzdHJlYW1lZC4gVGhpcyBpcyBpbXBvcnRhbnQgZm9yXG4gICAgICAvLyB3aGVuIGNvbm5lY3Rpb24gd2FzIGxvc3QuXG4gICAgICB0aGlzLnBrUHJvamVjdCQucGlwZShmaXJzdCgpKVxuICAgICAgICAuc3Vic2NyaWJlKChwa1Byb2plY3QpID0+IHtcbiAgICAgICAgICBjb25zdCBwa3MgPSBPYmplY3Qua2V5cyh7XG4gICAgICAgICAgICAuLi50aGlzLm5nUmVkdXguZ2V0U3RhdGUoKS53YXIuZW50aXR5X3ByZXZpZXcsXG4gICAgICAgICAgICAuLi50aGlzLnJlcXVlc3RlZEVudGl0eVByZXZpZXdzXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHBrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZW50aXR5UHJldmlld1NvY2tldC5lbWl0KCdhZGRUb1N0cmVhbScsIHtcbiAgICAgICAgICAgICAgcGtQcm9qZWN0LFxuICAgICAgICAgICAgICBwa3NcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cblxuXG4gIH1cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVBY3RpdmVQcm9qZWN0KCk6IE9ic2VydmFibGU8UHJvUHJvamVjdD4ge1xuICAgIHJldHVybiB0aGlzLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQucHJvamVjdCQuYnlfcGtfZW50aXR5JC5rZXkocGtQcm9qZWN0LnRvU3RyaW5nKCkpKVxuICAgICkucGlwZShmaWx0ZXIobCA9PiAhIWwpKVxuICB9XG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKCk6IE9ic2VydmFibGU8SW5mTGFuZ3VhZ2U+IHtcblxuICAgIHJldHVybiB0aGlzLnBpcGVBY3RpdmVQcm9qZWN0KCkucGlwZShcbiAgICAgIGZpbHRlcihwID0+ICEhcCksXG4gICAgICBzd2l0Y2hNYXAocHJvamVjdCA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShwcm9qZWN0LmZrX2xhbmd1YWdlLnRvU3RyaW5nKCkpXG4gICAgICB9KVxuICAgICkucGlwZShmaWx0ZXIobCA9PiAhIWwpKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIGRhdGEgdW5pdCBwcmV2aWV3LCBpZiBpdCBpcyBub3QgeWV0IGF2YWlsYWJsZSBpbiBzdGF0ZSBvciBpZlxuICAgKiBmb3JjZVJlbG9hZCBpcyB0cnVlO1xuICAgKlxuICAgKiBAcGFyYW0gcGtFbnRpdHlcbiAgICogQHBhcmFtIGZvcmNlUmVsb2FkXG4gICAqL1xuICBzdHJlYW1FbnRpdHlQcmV2aWV3KHBrRW50aXR5OiBudW1iZXIsIGZvcmNlUmVsb2FkPzogYm9vbGVhbik6IE9ic2VydmFibGU8V2FyRW50aXR5UHJldmlldz4ge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5uZ1JlZHV4LmdldFN0YXRlKCk7XG5cbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgICEoKChzdGF0ZS53YXIgfHwge30pLmVudGl0eV9wcmV2aWV3IHx8IHt9KS5ieV9wa19lbnRpdHkgfHwge30pW3BrRW50aXR5XSAmJlxuICAgICAgICAhdGhpcy5yZXF1ZXN0ZWRFbnRpdHlQcmV2aWV3c1twa0VudGl0eV1cbiAgICAgICkgfHwgZm9yY2VSZWxvYWQpIHtcbiAgICAgIHRoaXMucGtQcm9qZWN0JC5waXBlKGZpcnN0KHBrID0+ICEhcGspKS5zdWJzY3JpYmUocGtQcm9qZWN0ID0+IHtcblxuICAgICAgICB0aGlzLmVudGl0eVByZXZpZXdTb2NrZXQuZW1pdCgnYWRkVG9TdHJlYW0nLCB7XG4gICAgICAgICAgcGtQcm9qZWN0LFxuICAgICAgICAgIHBrczogW3BrRW50aXR5XVxuICAgICAgICB9KVxuICAgICAgICAvLyBjb25zdCBwa1VpQ29udGV4dCA9IFN5c0NvbmZpZy5QS19VSV9DT05URVhUX0RBVEFVTklUU19FRElUQUJMRTtcblxuICAgICAgICAvLyB0aGlzLm5nUmVkdXguZGlzcGF0Y2godGhpcy5hY3Rpb25zLmxvYWRFbnRpdHlQcmV2aWV3KHBrUHJvamVjdCwgcGtFbnRpdHksIHBrVWlDb250ZXh0KSlcbiAgICAgICAgdGhpcy5yZXF1ZXN0ZWRFbnRpdHlQcmV2aWV3c1twa0VudGl0eV0gPSB0cnVlO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxXYXJFbnRpdHlQcmV2aWV3PihbJ3dhcicsICdlbnRpdHlfcHJldmlldycsICdieV9wa19lbnRpdHknLCBwa0VudGl0eV0pXG4gICAgICAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8V2FyRW50aXR5UHJldmlldz4oZXF1YWxzKSxcbiAgICAgICAgZmlsdGVyKHByZXYgPT4gKCEhcHJldikpXG4gICAgICApXG4gIH1cblxufVxuIl19