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
export class ActiveProjectPipesService {
    /**
     * @param {?} ngRedux
     * @param {?} s
     * @param {?} entityPreviewSocket
     * @param {?} schemaService
     */
    constructor(ngRedux, s, entityPreviewSocket, schemaService) {
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
        combineLatest(this.schemaService.schemaObjectStored$, this.pkProject$).subscribe((/**
         * @param {?} __0
         * @return {?}
         */
        ([object, pkProject]) => {
            this.extendEntityPreviewStream(object, pkProject);
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
    /**
     * Adds the entity previews to the streamed entity previews (for ws communication)
     * @private
     * @param {?} object
     * @param {?} pkProject
     * @return {?}
     */
    extendEntityPreviewStream(object, pkProject) {
        if (object && object.war && object.war.entity_preview && object.war.entity_preview.length) {
            this.entityPreviewSocket.emit('extendStream', {
                pkProject,
                pks: object.war.entity_preview.map((/**
                 * @param {?} p
                 * @return {?}
                 */
                p => p.pk_entity))
            });
        }
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
    { type: EntityPreviewSocket },
    { type: SchemaService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcXVlcmllcy8iLCJzb3VyY2VzIjpbImxpYi9xdWVyaWVzL3NlcnZpY2VzL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFhLGFBQWEsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7QUFLcEUsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7OztJQU1wQyxZQUNVLE9BQTJCLEVBQzNCLENBQXlCLEVBQ3pCLG1CQUF3QyxFQUN4QyxhQUE0QjtRQUg1QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixNQUFDLEdBQUQsQ0FBQyxDQUF3QjtRQUN6Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUHRDLDRCQUF1QixHQUFvQyxFQUFFLENBQUE7UUFVM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFTLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ3RFLElBQUksQ0FDSCxNQUFNOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFDLEVBQzVCLG9CQUFvQjs7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDaEIsQ0FBQyxFQUFDLENBQ0gsQ0FBQztRQUlKLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3JFLDZEQUE2RDtZQUM3RCw4REFBOEQ7WUFDOUQsNEJBQTRCO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUMxQixTQUFTOzs7O1lBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTs7c0JBQ2pCLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxtQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUMxQyxJQUFJLENBQUMsdUJBQXVCLEVBQy9CO2dCQUNGLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtvQkFDZCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTt3QkFDM0MsU0FBUzt3QkFDVCxHQUFHO3FCQUNKLENBQUMsQ0FBQTtpQkFDSDtZQUNILENBQUMsRUFBQyxDQUFBO1FBQ04sQ0FBQyxFQUFDLENBQUE7UUFFRixhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUzs7OztRQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRTtZQUN2RyxJQUFJLENBQUMseUJBQXlCLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBQ25ELENBQUMsRUFBQyxDQUFBO0lBRUosQ0FBQzs7OztJQUMyQixpQkFBaUI7UUFDM0MsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDekIsU0FBUzs7OztRQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUMsQ0FDckYsQ0FBQyxJQUFJLENBQUMsTUFBTTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDMUIsQ0FBQzs7OztJQUMyQix5QkFBeUI7UUFFbkQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQ2xDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFDaEIsU0FBUzs7OztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBRWxCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ2hGLENBQUMsRUFBQyxDQUNILENBQUMsSUFBSSxDQUFDLE1BQU07Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBO0lBQzFCLENBQUM7Ozs7Ozs7OztJQVdELG1CQUFtQixDQUFDLFFBQWdCLEVBQUUsV0FBcUI7O2NBQ25ELEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUVyQyxJQUNFLENBQ0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQ3hFLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUN4QyxJQUFJLFdBQVcsRUFBRTtZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLOzs7O1lBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTOzs7O1lBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBRTVELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUMzQyxTQUFTO29CQUNULEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDaEIsQ0FBQyxDQUFBO2dCQUNGLGtFQUFrRTtnQkFFbEUsMEZBQTBGO2dCQUMxRixJQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2hELENBQUMsRUFBQyxDQUFBO1NBQ0g7UUFFRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFtQixDQUFDLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDOUYsSUFBSSxDQUNILG9CQUFvQixDQUFtQixNQUFNLENBQUMsRUFDOUMsTUFBTTs7OztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FDekIsQ0FBQTtJQUNMLENBQUM7Ozs7Ozs7O0lBT08seUJBQXlCLENBQUMsTUFBc0IsRUFBRSxTQUFpQjtRQUV6RSxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRTtZQUN6RixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDNUMsU0FBUztnQkFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRzs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUM7YUFDckQsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7WUFwSEYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBYlEsT0FBTztZQVNQLHNCQUFzQjtZQUx0QixtQkFBbUI7WUFGUixhQUFhOzs7QUEyREg7SUFBM0IsS0FBSyxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs7NENBQXNCLFVBQVU7a0VBSTFEO0FBQzJCO0lBQTNCLEtBQUssQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OzRDQUE4QixVQUFVOzBFQVNsRTs7O0lBNURELCtDQUFzQzs7SUFFdEMsNERBQTZEOzs7OztJQUkzRCw0Q0FBbUM7Ozs7O0lBQ25DLHNDQUFpQzs7Ozs7SUFDakMsd0RBQWdEOzs7OztJQUNoRCxrREFBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUFwcFN0YXRlLCBTY2hlbWFTZXJ2aWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBHdlNjaGVtYU9iamVjdCwgSW5mTGFuZ3VhZ2UsIFByb1Byb2plY3QsIFdhckVudGl0eVByZXZpZXcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgRW50aXR5UHJldmlld1NvY2tldCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc29ja2V0cyc7XG5pbXBvcnQgeyBlcXVhbHMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkaXN0aW5jdFVudGlsQ2hhbmdlZCwgZmlsdGVyLCBmaXJzdCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2Uge1xuICBwdWJsaWMgcGtQcm9qZWN0JDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHJlcXVlc3RlZEVudGl0eVByZXZpZXdzOiB7IFtwa0VudGl0eTogbnVtYmVyXTogYm9vbGVhbiB9ID0ge31cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgICBwcml2YXRlIGVudGl0eVByZXZpZXdTb2NrZXQ6IEVudGl0eVByZXZpZXdTb2NrZXQsXG4gICAgcHJpdmF0ZSBzY2hlbWFTZXJ2aWNlOiBTY2hlbWFTZXJ2aWNlXG5cbiAgKSB7XG4gICAgdGhpcy5wa1Byb2plY3QkID0gbmdSZWR1eC5zZWxlY3Q8bnVtYmVyPihbJ2FjdGl2ZVByb2plY3QnLCAncGtfcHJvamVjdCddKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcihwID0+IHAgIT09IHVuZGVmaW5lZCksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCh4LCB5KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHggPT09IHlcbiAgICAgICAgfSlcbiAgICAgICk7XG5cblxuXG4gICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmZyb21FdmVudCgncmVjb25uZWN0Jykuc3Vic2NyaWJlKGRpc2Nvbm5lY3QgPT4ge1xuICAgICAgLy8gZ2V0IGFsbCBFbnRpdHlQcmV2aWV3IGtleXMgZnJvbSBzdGF0ZSBhbmQgc2VuZCB0aGVtIHRvIHRoZVxuICAgICAgLy8gc2VydmVyIHNvIHRoYXQgdGhleSB3aWxsIGJlIHN0cmVhbWVkLiBUaGlzIGlzIGltcG9ydGFudCBmb3JcbiAgICAgIC8vIHdoZW4gY29ubmVjdGlvbiB3YXMgbG9zdC5cbiAgICAgIHRoaXMucGtQcm9qZWN0JC5waXBlKGZpcnN0KCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHBrUHJvamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBrcyA9IE9iamVjdC5rZXlzKHtcbiAgICAgICAgICAgIC4uLnRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpLndhci5lbnRpdHlfcHJldmlldyxcbiAgICAgICAgICAgIC4uLnRoaXMucmVxdWVzdGVkRW50aXR5UHJldmlld3NcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAocGtzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmVtaXQoJ2FkZFRvU3RyZWFtJywge1xuICAgICAgICAgICAgICBwa1Byb2plY3QsXG4gICAgICAgICAgICAgIHBrc1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbWJpbmVMYXRlc3QodGhpcy5zY2hlbWFTZXJ2aWNlLnNjaGVtYU9iamVjdFN0b3JlZCQsIHRoaXMucGtQcm9qZWN0JCkuc3Vic2NyaWJlKChbb2JqZWN0LCBwa1Byb2plY3RdKSA9PiB7XG4gICAgICB0aGlzLmV4dGVuZEVudGl0eVByZXZpZXdTdHJlYW0ob2JqZWN0LCBwa1Byb2plY3QpXG4gICAgfSlcblxuICB9XG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQWN0aXZlUHJvamVjdCgpOiBPYnNlcnZhYmxlPFByb1Byb2plY3Q+IHtcbiAgICByZXR1cm4gdGhpcy5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLnByb2plY3QkLmJ5X3BrX2VudGl0eSQua2V5KHBrUHJvamVjdC50b1N0cmluZygpKSlcbiAgICApLnBpcGUoZmlsdGVyKGwgPT4gISFsKSlcbiAgfVxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpOiBPYnNlcnZhYmxlPEluZkxhbmd1YWdlPiB7XG5cbiAgICByZXR1cm4gdGhpcy5waXBlQWN0aXZlUHJvamVjdCgpLnBpcGUoXG4gICAgICBmaWx0ZXIocCA9PiAhIXApLFxuICAgICAgc3dpdGNoTWFwKHByb2plY3QgPT4ge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnMuaW5mJC5sYW5ndWFnZSQuYnlfcGtfZW50aXR5JC5rZXkocHJvamVjdC5ma19sYW5ndWFnZS50b1N0cmluZygpKVxuICAgICAgfSlcbiAgICApLnBpcGUoZmlsdGVyKGwgPT4gISFsKSlcbiAgfVxuXG5cblxuICAvKipcbiAgICogTG9hZHMgYSBkYXRhIHVuaXQgcHJldmlldywgaWYgaXQgaXMgbm90IHlldCBhdmFpbGFibGUgaW4gc3RhdGUgb3IgaWZcbiAgICogZm9yY2VSZWxvYWQgaXMgdHJ1ZTtcbiAgICpcbiAgICogQHBhcmFtIHBrRW50aXR5XG4gICAqIEBwYXJhbSBmb3JjZVJlbG9hZFxuICAgKi9cbiAgc3RyZWFtRW50aXR5UHJldmlldyhwa0VudGl0eTogbnVtYmVyLCBmb3JjZVJlbG9hZD86IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFdhckVudGl0eVByZXZpZXc+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMubmdSZWR1eC5nZXRTdGF0ZSgpO1xuXG4gICAgaWYgKFxuICAgICAgKFxuICAgICAgICAhKCgoc3RhdGUud2FyIHx8IHt9KS5lbnRpdHlfcHJldmlldyB8fCB7fSkuYnlfcGtfZW50aXR5IHx8IHt9KVtwa0VudGl0eV0gJiZcbiAgICAgICAgIXRoaXMucmVxdWVzdGVkRW50aXR5UHJldmlld3NbcGtFbnRpdHldXG4gICAgICApIHx8IGZvcmNlUmVsb2FkKSB7XG4gICAgICB0aGlzLnBrUHJvamVjdCQucGlwZShmaXJzdChwayA9PiAhIXBrKSkuc3Vic2NyaWJlKHBrUHJvamVjdCA9PiB7XG5cbiAgICAgICAgdGhpcy5lbnRpdHlQcmV2aWV3U29ja2V0LmVtaXQoJ2FkZFRvU3RyZWFtJywge1xuICAgICAgICAgIHBrUHJvamVjdCxcbiAgICAgICAgICBwa3M6IFtwa0VudGl0eV1cbiAgICAgICAgfSlcbiAgICAgICAgLy8gY29uc3QgcGtVaUNvbnRleHQgPSBTeXNDb25maWcuUEtfVUlfQ09OVEVYVF9EQVRBVU5JVFNfRURJVEFCTEU7XG5cbiAgICAgICAgLy8gdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKHRoaXMuYWN0aW9ucy5sb2FkRW50aXR5UHJldmlldyhwa1Byb2plY3QsIHBrRW50aXR5LCBwa1VpQ29udGV4dCkpXG4gICAgICAgIHRoaXMucmVxdWVzdGVkRW50aXR5UHJldmlld3NbcGtFbnRpdHldID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubmdSZWR1eC5zZWxlY3Q8V2FyRW50aXR5UHJldmlldz4oWyd3YXInLCAnZW50aXR5X3ByZXZpZXcnLCAnYnlfcGtfZW50aXR5JywgcGtFbnRpdHldKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkPFdhckVudGl0eVByZXZpZXc+KGVxdWFscyksXG4gICAgICAgIGZpbHRlcihwcmV2ID0+ICghIXByZXYpKVxuICAgICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGVudGl0eSBwcmV2aWV3cyB0byB0aGUgc3RyZWFtZWQgZW50aXR5IHByZXZpZXdzIChmb3Igd3MgY29tbXVuaWNhdGlvbilcbiAgICogQHBhcmFtIG9iamVjdFxuICAgKiBAcGFyYW0gcGtQcm9qZWN0XG4gICAqL1xuICBwcml2YXRlIGV4dGVuZEVudGl0eVByZXZpZXdTdHJlYW0ob2JqZWN0OiBHdlNjaGVtYU9iamVjdCwgcGtQcm9qZWN0OiBudW1iZXIpIHtcblxuICAgIGlmIChvYmplY3QgJiYgb2JqZWN0LndhciAmJiBvYmplY3Qud2FyLmVudGl0eV9wcmV2aWV3ICYmIG9iamVjdC53YXIuZW50aXR5X3ByZXZpZXcubGVuZ3RoKSB7XG4gICAgICB0aGlzLmVudGl0eVByZXZpZXdTb2NrZXQuZW1pdCgnZXh0ZW5kU3RyZWFtJywge1xuICAgICAgICBwa1Byb2plY3QsXG4gICAgICAgIHBrczogb2JqZWN0Lndhci5lbnRpdHlfcHJldmlldy5tYXAocCA9PiBwLnBrX2VudGl0eSlcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19