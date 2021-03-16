/**
 * @fileoverview added by tsickle
 * Generated from: services/active-project-pipes.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy9zcmMvbGliL3F1ZXJpZXMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYSxhQUFhLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUvRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUN4RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7O0FBRXBFO0lBU0UsbUNBQ1UsT0FBMkIsRUFDM0IsQ0FBeUIsRUFDekIsbUJBQXdDLEVBQ3hDLGFBQTRCO1FBSnRDLGlCQXdDQztRQXZDUyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixNQUFDLEdBQUQsQ0FBQyxDQUF3QjtRQUN6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUHRDLDRCQUF1QixHQUFvQyxFQUFFLENBQUE7UUFVM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFTLENBQUMsZUFBZSxF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QyxNQUFNLEVBQUU7WUFDekYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQzVDLFNBQVMsV0FBQTtnQkFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRzs7OztnQkFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxTQUFTLEVBQVgsQ0FBVyxFQUFDO2FBQ3JELENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7Z0JBcEhGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBYlEsT0FBTztnQkFTUCxzQkFBc0I7Z0JBTHRCLG1CQUFtQjtnQkFGUixhQUFhOzs7SUEyREg7UUFBM0IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7Z0RBQXNCLFVBQVU7c0VBSTFEO0lBQzJCO1FBQTNCLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7O2dEQUE4QixVQUFVOzhFQVNsRTtvQ0EzRUg7Q0FnSUMsQUFySEQsSUFxSEM7U0FsSFkseUJBQXlCOzs7SUFDcEMsK0NBQXNDOztJQUV0Qyw0REFBNkQ7Ozs7O0lBSTNELDRDQUFtQzs7Ozs7SUFDbkMsc0NBQWlDOzs7OztJQUNqQyx3REFBZ0Q7Ozs7O0lBQ2hELGtEQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQXBwU3RhdGUsIFNjaGVtYVNlcnZpY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IEd2U2NoZW1hT2JqZWN0LCBJbmZMYW5ndWFnZSwgUHJvUHJvamVjdCwgV2FyRW50aXR5UHJldmlldyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBFbnRpdHlQcmV2aWV3U29ja2V0IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zb2NrZXRzJztcbmltcG9ydCB7IGVxdWFscyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBmaWx0ZXIsIGZpcnN0LCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWNoZSB9IGZyb20gJy4uL2RlY29yYXRvcnMvbWV0aG9kLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB7XG4gIHB1YmxpYyBwa1Byb2plY3QkOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcmVxdWVzdGVkRW50aXR5UHJldmlld3M6IHsgW3BrRW50aXR5OiBudW1iZXJdOiBib29sZWFuIH0gPSB7fVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICAgIHByaXZhdGUgZW50aXR5UHJldmlld1NvY2tldDogRW50aXR5UHJldmlld1NvY2tldCxcbiAgICBwcml2YXRlIHNjaGVtYVNlcnZpY2U6IFNjaGVtYVNlcnZpY2VcblxuICApIHtcbiAgICB0aGlzLnBrUHJvamVjdCQgPSBuZ1JlZHV4LnNlbGVjdDxudW1iZXI+KFsnYWN0aXZlUHJvamVjdCcsICdwa19wcm9qZWN0J10pXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKHAgPT4gcCAhPT0gdW5kZWZpbmVkKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKHgsIHkpID0+IHtcbiAgICAgICAgICByZXR1cm4geCA9PT0geVxuICAgICAgICB9KVxuICAgICAgKTtcblxuXG5cbiAgICB0aGlzLmVudGl0eVByZXZpZXdTb2NrZXQuZnJvbUV2ZW50KCdyZWNvbm5lY3QnKS5zdWJzY3JpYmUoZGlzY29ubmVjdCA9PiB7XG4gICAgICAvLyBnZXQgYWxsIEVudGl0eVByZXZpZXcga2V5cyBmcm9tIHN0YXRlIGFuZCBzZW5kIHRoZW0gdG8gdGhlXG4gICAgICAvLyBzZXJ2ZXIgc28gdGhhdCB0aGV5IHdpbGwgYmUgc3RyZWFtZWQuIFRoaXMgaXMgaW1wb3J0YW50IGZvclxuICAgICAgLy8gd2hlbiBjb25uZWN0aW9uIHdhcyBsb3N0LlxuICAgICAgdGhpcy5wa1Byb2plY3QkLnBpcGUoZmlyc3QoKSlcbiAgICAgICAgLnN1YnNjcmliZSgocGtQcm9qZWN0KSA9PiB7XG4gICAgICAgICAgY29uc3QgcGtzID0gT2JqZWN0LmtleXMoe1xuICAgICAgICAgICAgLi4udGhpcy5uZ1JlZHV4LmdldFN0YXRlKCkud2FyLmVudGl0eV9wcmV2aWV3LFxuICAgICAgICAgICAgLi4udGhpcy5yZXF1ZXN0ZWRFbnRpdHlQcmV2aWV3c1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChwa3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmVudGl0eVByZXZpZXdTb2NrZXQuZW1pdCgnYWRkVG9TdHJlYW0nLCB7XG4gICAgICAgICAgICAgIHBrUHJvamVjdCxcbiAgICAgICAgICAgICAgcGtzXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgY29tYmluZUxhdGVzdCh0aGlzLnNjaGVtYVNlcnZpY2Uuc2NoZW1hT2JqZWN0U3RvcmVkJCwgdGhpcy5wa1Byb2plY3QkKS5zdWJzY3JpYmUoKFtvYmplY3QsIHBrUHJvamVjdF0pID0+IHtcbiAgICAgIHRoaXMuZXh0ZW5kRW50aXR5UHJldmlld1N0cmVhbShvYmplY3QsIHBrUHJvamVjdClcbiAgICB9KVxuXG4gIH1cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVBY3RpdmVQcm9qZWN0KCk6IE9ic2VydmFibGU8UHJvUHJvamVjdD4ge1xuICAgIHJldHVybiB0aGlzLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQucHJvamVjdCQuYnlfcGtfZW50aXR5JC5rZXkocGtQcm9qZWN0LnRvU3RyaW5nKCkpKVxuICAgICkucGlwZShmaWx0ZXIobCA9PiAhIWwpKVxuICB9XG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKCk6IE9ic2VydmFibGU8SW5mTGFuZ3VhZ2U+IHtcblxuICAgIHJldHVybiB0aGlzLnBpcGVBY3RpdmVQcm9qZWN0KCkucGlwZShcbiAgICAgIGZpbHRlcihwID0+ICEhcCksXG4gICAgICBzd2l0Y2hNYXAocHJvamVjdCA9PiB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucy5pbmYkLmxhbmd1YWdlJC5ieV9wa19lbnRpdHkkLmtleShwcm9qZWN0LmZrX2xhbmd1YWdlLnRvU3RyaW5nKCkpXG4gICAgICB9KVxuICAgICkucGlwZShmaWx0ZXIobCA9PiAhIWwpKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBMb2FkcyBhIGRhdGEgdW5pdCBwcmV2aWV3LCBpZiBpdCBpcyBub3QgeWV0IGF2YWlsYWJsZSBpbiBzdGF0ZSBvciBpZlxuICAgKiBmb3JjZVJlbG9hZCBpcyB0cnVlO1xuICAgKlxuICAgKiBAcGFyYW0gcGtFbnRpdHlcbiAgICogQHBhcmFtIGZvcmNlUmVsb2FkXG4gICAqL1xuICBzdHJlYW1FbnRpdHlQcmV2aWV3KHBrRW50aXR5OiBudW1iZXIsIGZvcmNlUmVsb2FkPzogYm9vbGVhbik6IE9ic2VydmFibGU8V2FyRW50aXR5UHJldmlldz4ge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5uZ1JlZHV4LmdldFN0YXRlKCk7XG5cbiAgICBpZiAoXG4gICAgICAoXG4gICAgICAgICEoKChzdGF0ZS53YXIgfHwge30pLmVudGl0eV9wcmV2aWV3IHx8IHt9KS5ieV9wa19lbnRpdHkgfHwge30pW3BrRW50aXR5XSAmJlxuICAgICAgICAhdGhpcy5yZXF1ZXN0ZWRFbnRpdHlQcmV2aWV3c1twa0VudGl0eV1cbiAgICAgICkgfHwgZm9yY2VSZWxvYWQpIHtcbiAgICAgIHRoaXMucGtQcm9qZWN0JC5waXBlKGZpcnN0KHBrID0+ICEhcGspKS5zdWJzY3JpYmUocGtQcm9qZWN0ID0+IHtcblxuICAgICAgICB0aGlzLmVudGl0eVByZXZpZXdTb2NrZXQuZW1pdCgnYWRkVG9TdHJlYW0nLCB7XG4gICAgICAgICAgcGtQcm9qZWN0LFxuICAgICAgICAgIHBrczogW3BrRW50aXR5XVxuICAgICAgICB9KVxuICAgICAgICAvLyBjb25zdCBwa1VpQ29udGV4dCA9IFN5c0NvbmZpZy5QS19VSV9DT05URVhUX0RBVEFVTklUU19FRElUQUJMRTtcblxuICAgICAgICAvLyB0aGlzLm5nUmVkdXguZGlzcGF0Y2godGhpcy5hY3Rpb25zLmxvYWRFbnRpdHlQcmV2aWV3KHBrUHJvamVjdCwgcGtFbnRpdHksIHBrVWlDb250ZXh0KSlcbiAgICAgICAgdGhpcy5yZXF1ZXN0ZWRFbnRpdHlQcmV2aWV3c1twa0VudGl0eV0gPSB0cnVlO1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxXYXJFbnRpdHlQcmV2aWV3PihbJ3dhcicsICdlbnRpdHlfcHJldmlldycsICdieV9wa19lbnRpdHknLCBwa0VudGl0eV0pXG4gICAgICAucGlwZShcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQ8V2FyRW50aXR5UHJldmlldz4oZXF1YWxzKSxcbiAgICAgICAgZmlsdGVyKHByZXYgPT4gKCEhcHJldikpXG4gICAgICApXG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgZW50aXR5IHByZXZpZXdzIHRvIHRoZSBzdHJlYW1lZCBlbnRpdHkgcHJldmlld3MgKGZvciB3cyBjb21tdW5pY2F0aW9uKVxuICAgKiBAcGFyYW0gb2JqZWN0XG4gICAqIEBwYXJhbSBwa1Byb2plY3RcbiAgICovXG4gIHByaXZhdGUgZXh0ZW5kRW50aXR5UHJldmlld1N0cmVhbShvYmplY3Q6IEd2U2NoZW1hT2JqZWN0LCBwa1Byb2plY3Q6IG51bWJlcikge1xuXG4gICAgaWYgKG9iamVjdCAmJiBvYmplY3Qud2FyICYmIG9iamVjdC53YXIuZW50aXR5X3ByZXZpZXcgJiYgb2JqZWN0Lndhci5lbnRpdHlfcHJldmlldy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuZW50aXR5UHJldmlld1NvY2tldC5lbWl0KCdleHRlbmRTdHJlYW0nLCB7XG4gICAgICAgIHBrUHJvamVjdCxcbiAgICAgICAgcGtzOiBvYmplY3Qud2FyLmVudGl0eV9wcmV2aWV3Lm1hcChwID0+IHAucGtfZW50aXR5KVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=