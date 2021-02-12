/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/actions/dat.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { datRoot } from '../reducer-configs';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
export class DigitalActionsFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(datRoot, 'digital'));
        this.loadVersion = (/**
         * @param {?} pkEntity
         * @param {?=} entityVersion
         * @return {?}
         */
        (pkEntity, entityVersion) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + DigitalActionsFactory.LOAD_VERSION,
                meta: { addPending, pkEntity, entityVersion },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
DigitalActionsFactory.LOAD_VERSION = 'LOAD_VERSION';
if (false) {
    /** @type {?} */
    DigitalActionsFactory.LOAD_VERSION;
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     * @type {?}
     */
    DigitalActionsFactory.prototype.loadVersion;
    /** @type {?} */
    DigitalActionsFactory.prototype.ngRedux;
}
/**
 * @record
 */
export function LoadChunksOfDigitalAction() { }
if (false) {
    /** @type {?} */
    LoadChunksOfDigitalAction.prototype.pkDigital;
}
export class ChunkActionsFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(datRoot, 'chunk'));
        this.loadChunksOfDigital = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        (pkDigital, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ChunkActionsFactory.CHUNKS_OF_DIGITAL,
                meta: { addPending, pkDigital, pk },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ChunkActionsFactory.CHUNKS_OF_DIGITAL = 'CHUNKS_OF_DIGITAL';
if (false) {
    /** @type {?} */
    ChunkActionsFactory.CHUNKS_OF_DIGITAL;
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     * @type {?}
     */
    ChunkActionsFactory.prototype.loadChunksOfDigital;
    /** @type {?} */
    ChunkActionsFactory.prototype.ngRedux;
}
/**
 * @record
 */
export function LoadColumnsOfTableAction() { }
if (false) {
    /** @type {?} */
    LoadColumnsOfTableAction.prototype.pkDigital;
}
export class ColumnActionsFactory extends SchemaActionsFactory {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
    }
    /**
     * @return {?}
     */
    createActions() {
        Object.assign(this, this.createCrudActions(datRoot, 'column'));
        this.loadColumnsOfTable = (/**
         * @param {?} pkDigital
         * @param {?} pk
         * @return {?}
         */
        (pkDigital, pk) => {
            /** @type {?} */
            const addPending = U.uuid();
            /** @type {?} */
            const action = {
                type: this.actionPrefix + '.' + this.modelName + '::LOAD' + '::' + ColumnActionsFactory.COLUMNS_OF_TABLE,
                meta: { addPending, pkDigital, pk },
                payload: null,
            };
            this.ngRedux.dispatch(action);
            return {
                pending$: this.ngRedux.select(['pending', addPending]),
                resolved$: this.ngRedux.select(['resolved', addPending]),
                key: addPending
            };
        });
        return this;
    }
}
// Suffixes of load action types
ColumnActionsFactory.COLUMNS_OF_TABLE = 'COLUMNS_OF_TABLE';
if (false) {
    /** @type {?} */
    ColumnActionsFactory.COLUMNS_OF_TABLE;
    /**
     * Load a version. if entityVersion omitted, latest version is returned.
     * @type {?}
     */
    ColumnActionsFactory.prototype.loadColumnsOfTable;
    /** @type {?} */
    ColumnActionsFactory.prototype.ngRedux;
}
export class DatActions {
    /**
     * @param {?} ngRedux
     */
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.digital = new DigitalActionsFactory(this.ngRedux).createActions();
        this.chunk = new ChunkActionsFactory(this.ngRedux).createActions();
        this.column = new ColumnActionsFactory(this.ngRedux).createActions();
        this.class_column_mapping = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'class_column_mapping');
        this.namespace = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'namespace');
        this.text_property = new SchemaActionsFactory(this.ngRedux).createCrudActions(datRoot, 'text_property');
    }
}
DatActions.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DatActions.ctorParameters = () => [
    { type: NgRedux }
];
if (false) {
    /** @type {?} */
    DatActions.prototype.digital;
    /** @type {?} */
    DatActions.prototype.chunk;
    /** @type {?} */
    DatActions.prototype.column;
    /** @type {?} */
    DatActions.prototype.class_column_mapping;
    /** @type {?} */
    DatActions.prototype.namespace;
    /** @type {?} */
    DatActions.prototype.text_property;
    /** @type {?} */
    DatActions.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4LyIsInNvdXJjZXMiOlsibGliL3JlZHV4LXN0b3JlL3N0YXRlLXNjaGVtYS9hY3Rpb25zL2RhdC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBSXhDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM3QyxPQUFPLEVBQTBDLG9CQUFvQixFQUF3QyxNQUFNLG9DQUFvQyxDQUFDO0FBR3hKLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxvQkFBOEM7Ozs7SUFVdkYsWUFBbUIsT0FBMkI7UUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFBN0MsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBbUIsQ0FBQzs7OztJQUVsRSxhQUFhO1FBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBRS9ELElBQUksQ0FBQyxXQUFXOzs7OztRQUFHLENBQUMsUUFBZ0IsRUFBRSxhQUFzQixFQUFFLEVBQUU7O2tCQUN4RCxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7a0JBRXJCLE1BQU0sR0FBd0Q7Z0JBQ2xFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcscUJBQXFCLENBQUMsWUFBWTtnQkFDckcsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7Z0JBQzdDLE9BQU8sRUFBRSxJQUFJO2FBQ2Q7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUM3QixPQUFPO2dCQUNMLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBVSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDL0QsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFnQyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDdkYsR0FBRyxFQUFFLFVBQVU7YUFDaEIsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFBO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7QUE1QmUsa0NBQVksR0FBRyxjQUFjLENBQUM7OztJQUE5QyxtQ0FBOEM7Ozs7O0lBSzlDLDRDQUE4Rjs7SUFFbEYsd0NBQWtDOzs7OztBQXdCaEQsK0NBQXVGOzs7SUFBbkIsOENBQWlCOztBQUVyRixNQUFNLE9BQU8sbUJBQW9CLFNBQVEsb0JBQTBDOzs7O0lBVWpGLFlBQW1CLE9BQTJCO1FBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQTdDLFlBQU8sR0FBUCxPQUFPLENBQW9CO0lBQW1CLENBQUM7Ozs7SUFFbEUsYUFBYTtRQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQTtRQUU3RCxJQUFJLENBQUMsbUJBQW1COzs7OztRQUFHLENBQUMsU0FBaUIsRUFBRSxFQUFVLEVBQUUsRUFBRTs7a0JBQ3JELFVBQVUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFOztrQkFFckIsTUFBTSxHQUE4RDtnQkFDeEUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxpQkFBaUI7Z0JBQ3hHLElBQUksRUFBRSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFO2dCQUNuQyxPQUFPLEVBQUUsSUFBSTthQUNkO1lBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDN0IsT0FBTztnQkFDTCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQVUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQy9ELFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBOEIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3JGLEdBQUcsRUFBRSxVQUFVO2FBQ2hCLENBQUM7UUFDSixDQUFDLENBQUEsQ0FBQTtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzs7O0FBNUJlLHFDQUFpQixHQUFHLG1CQUFtQixDQUFDOzs7SUFBeEQsc0NBQXdEOzs7OztJQUt4RCxrREFBeUY7O0lBRTdFLHNDQUFrQzs7Ozs7QUF3QmhELDhDQUFzRjs7O0lBQW5CLDZDQUFpQjs7QUFFcEYsTUFBTSxPQUFPLG9CQUFxQixTQUFRLG9CQUE0Qzs7OztJQVVwRixZQUFtQixPQUEyQjtRQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUE3QyxZQUFPLEdBQVAsT0FBTyxDQUFvQjtJQUFtQixDQUFDOzs7O0lBRWxFLGFBQWE7UUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFFOUQsSUFBSSxDQUFDLGtCQUFrQjs7Ozs7UUFBRyxDQUFDLFNBQWlCLEVBQUUsRUFBVSxFQUFFLEVBQUU7O2tCQUNwRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7a0JBRXJCLE1BQU0sR0FBOEQ7Z0JBQ3hFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcsb0JBQW9CLENBQUMsZ0JBQWdCO2dCQUN4RyxJQUFJLEVBQUUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRTtnQkFDbkMsT0FBTyxFQUFFLElBQUk7YUFDZDtZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzdCLE9BQU87Z0JBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUMvRCxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQStCLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUN0RixHQUFHLEVBQUUsVUFBVTthQUNoQixDQUFDO1FBQ0osQ0FBQyxDQUFBLENBQUE7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztBQTVCZSxxQ0FBZ0IsR0FBRyxrQkFBa0IsQ0FBQzs7O0lBQXRELHNDQUFzRDs7Ozs7SUFLdEQsa0RBQXlGOztJQUU3RSx1Q0FBa0M7O0FBeUJoRCxNQUFNLE9BQU8sVUFBVTs7OztJQWNyQixZQUFtQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQVo5QyxZQUFPLEdBQUcsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFbEUsVUFBSyxHQUFHLElBQUksbUJBQW1CLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBRTdELFdBQU0sR0FBRyxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsQ0FBQTtRQUUvRCx5QkFBb0IsR0FBRyxJQUFJLG9CQUFvQixDQUFpRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLHNCQUFzQixDQUFDLENBQUE7UUFFaEssY0FBUyxHQUFHLElBQUksb0JBQW9CLENBQStCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFFeEgsa0JBQWEsR0FBRyxJQUFJLG9CQUFvQixDQUFxQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBRXBGLENBQUM7OztZQWZwRCxVQUFVOzs7O1lBdEhGLE9BQU87Ozs7SUF5SGQsNkJBQWtFOztJQUVsRSwyQkFBNkQ7O0lBRTdELDRCQUErRDs7SUFFL0QsMENBQWdLOztJQUVoSywrQkFBd0g7O0lBRXhILG1DQUFzSTs7SUFFMUgsNkJBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdSZWR1eCB9IGZyb20gJ0Bhbmd1bGFyLXJlZHV4L3N0b3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERhdENodW5rLCBEYXRDb2x1bW4sIERhdERpZ2l0YWwsIERhdE5hbWVzcGFjZSwgRGF0VGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERhdENsYXNzQ29sdW1uTWFwcGluZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBGbHV4U3RhbmRhcmRBY3Rpb24gfSBmcm9tICdmbHV4LXN0YW5kYXJkLWFjdGlvbic7XG5pbXBvcnQgeyBJQXBwU3RhdGUgfSBmcm9tICcuLi8uLi9yb290L21vZGVscyc7XG5pbXBvcnQgeyBDaHVua1NsaWNlLCBDbGFzc0NvbHVtbk1hcHBpbmdTbGljZSwgQ29sdW1uU2xpY2UsIERpZ2l0YWxTbGljZSwgTmFtZXNwYWNlU2xpY2UsIFRleHRQcm9wZXJ0eVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IGRhdFJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MnO1xuaW1wb3J0IHsgQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZSwgTG9hZEFjdGlvbk1ldGEsIFNjaGVtYUFjdGlvbnNGYWN0b3J5LCBTdWNjZWVkQWN0aW9uTWV0YSwgTG9hZFZlcnNpb25BY3Rpb24gfSBmcm9tICcuLi9faGVscGVycy9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuXG5leHBvcnQgY2xhc3MgRGlnaXRhbEFjdGlvbnNGYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8RGlnaXRhbFNsaWNlLCBEYXREaWdpdGFsPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IExPQURfVkVSU0lPTiA9ICdMT0FEX1ZFUlNJT04nO1xuXG4gIC8qKlxuICAgKiBMb2FkIGEgdmVyc2lvbi4gaWYgZW50aXR5VmVyc2lvbiBvbWl0dGVkLCBsYXRlc3QgdmVyc2lvbiBpcyByZXR1cm5lZC5cbiAgICovXG4gIGxvYWRWZXJzaW9uOiAocGtFbnRpdHk6IG51bWJlciwgZW50aXR5VmVyc2lvbj86IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEYXREaWdpdGFsPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IERpZ2l0YWxBY3Rpb25zRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdkaWdpdGFsJykpXG5cbiAgICB0aGlzLmxvYWRWZXJzaW9uID0gKHBrRW50aXR5OiBudW1iZXIsIGVudGl0eVZlcnNpb24/OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxEaWdpdGFsU2xpY2UsIExvYWRWZXJzaW9uQWN0aW9uPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIERpZ2l0YWxBY3Rpb25zRmFjdG9yeS5MT0FEX1ZFUlNJT04sXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGtFbnRpdHksIGVudGl0eVZlcnNpb24gfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGF0RGlnaXRhbD4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkQ2h1bmtzT2ZEaWdpdGFsQWN0aW9uIGV4dGVuZHMgTG9hZEFjdGlvbk1ldGEgeyBwa0RpZ2l0YWw6IG51bWJlciB9XG5cbmV4cG9ydCBjbGFzcyBDaHVua0FjdGlvbnNGYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8Q2h1bmtTbGljZSwgRGF0Q2h1bms+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgQ0hVTktTX09GX0RJR0lUQUwgPSAnQ0hVTktTX09GX0RJR0lUQUwnO1xuXG4gIC8qKlxuICAgKiBMb2FkIGEgdmVyc2lvbi4gaWYgZW50aXR5VmVyc2lvbiBvbWl0dGVkLCBsYXRlc3QgdmVyc2lvbiBpcyByZXR1cm5lZC5cbiAgICovXG4gIGxvYWRDaHVua3NPZkRpZ2l0YWw6IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4gQWN0aW9uUmVzdWx0T2JzZXJ2YWJsZTxEYXRDaHVuaz47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBDaHVua0FjdGlvbnNGYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ2NodW5rJykpXG5cbiAgICB0aGlzLmxvYWRDaHVua3NPZkRpZ2l0YWwgPSAocGtEaWdpdGFsOiBudW1iZXIsIHBrOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxDaHVua1NsaWNlLCBMb2FkQ2h1bmtzT2ZEaWdpdGFsQWN0aW9uPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIENodW5rQWN0aW9uc0ZhY3RvcnkuQ0hVTktTX09GX0RJR0lUQUwsXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGtEaWdpdGFsLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxEYXRDaHVuaz4+KFsncmVzb2x2ZWQnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIGtleTogYWRkUGVuZGluZ1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkQ29sdW1uc09mVGFibGVBY3Rpb24gZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRGlnaXRhbDogbnVtYmVyIH1cblxuZXhwb3J0IGNsYXNzIENvbHVtbkFjdGlvbnNGYWN0b3J5IGV4dGVuZHMgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8Q29sdW1uU2xpY2UsIERhdENvbHVtbj4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBDT0xVTU5TX09GX1RBQkxFID0gJ0NPTFVNTlNfT0ZfVEFCTEUnO1xuXG4gIC8qKlxuICAgKiBMb2FkIGEgdmVyc2lvbi4gaWYgZW50aXR5VmVyc2lvbiBvbWl0dGVkLCBsYXRlc3QgdmVyc2lvbiBpcyByZXR1cm5lZC5cbiAgICovXG4gIGxvYWRDb2x1bW5zT2ZUYWJsZTogKHBrRGlnaXRhbDogbnVtYmVyLCBwazogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPERhdENvbHVtbj47XG5cbiAgY29uc3RydWN0b3IocHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPikgeyBzdXBlcihuZ1JlZHV4KSB9XG5cbiAgY3JlYXRlQWN0aW9ucygpOiBDb2x1bW5BY3Rpb25zRmFjdG9yeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCB0aGlzLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdjb2x1bW4nKSlcblxuICAgIHRoaXMubG9hZENvbHVtbnNPZlRhYmxlID0gKHBrRGlnaXRhbDogbnVtYmVyLCBwazogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBhZGRQZW5kaW5nID0gVS51dWlkKClcblxuICAgICAgY29uc3QgYWN0aW9uOiBGbHV4U3RhbmRhcmRBY3Rpb248Q29sdW1uU2xpY2UsIExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbj4gPSB7XG4gICAgICAgIHR5cGU6IHRoaXMuYWN0aW9uUHJlZml4ICsgJy4nICsgdGhpcy5tb2RlbE5hbWUgKyAnOjpMT0FEJyArICc6OicgKyBDb2x1bW5BY3Rpb25zRmFjdG9yeS5DT0xVTU5TX09GX1RBQkxFLFxuICAgICAgICBtZXRhOiB7IGFkZFBlbmRpbmcsIHBrRGlnaXRhbCwgcGsgfSxcbiAgICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICAgIH07XG4gICAgICB0aGlzLm5nUmVkdXguZGlzcGF0Y2goYWN0aW9uKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGVuZGluZyQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8Ym9vbGVhbj4oWydwZW5kaW5nJywgYWRkUGVuZGluZ10pLFxuICAgICAgICByZXNvbHZlZCQ6IHRoaXMubmdSZWR1eC5zZWxlY3Q8U3VjY2VlZEFjdGlvbk1ldGE8RGF0Q29sdW1uPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGF0QWN0aW9ucyB7XG5cbiAgZGlnaXRhbCA9IG5ldyBEaWdpdGFsQWN0aW9uc0ZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKCk7XG5cbiAgY2h1bmsgPSBuZXcgQ2h1bmtBY3Rpb25zRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuXG4gIGNvbHVtbiA9IG5ldyBDb2x1bW5BY3Rpb25zRmFjdG9yeSh0aGlzLm5nUmVkdXgpLmNyZWF0ZUFjdGlvbnMoKVxuXG4gIGNsYXNzX2NvbHVtbl9tYXBwaW5nID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PENsYXNzQ29sdW1uTWFwcGluZ1NsaWNlLCBEYXRDbGFzc0NvbHVtbk1hcHBpbmc+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ2NsYXNzX2NvbHVtbl9tYXBwaW5nJylcblxuICBuYW1lc3BhY2UgPSBuZXcgU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8TmFtZXNwYWNlU2xpY2UsIERhdE5hbWVzcGFjZT4odGhpcy5uZ1JlZHV4KS5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnbmFtZXNwYWNlJylcblxuICB0ZXh0X3Byb3BlcnR5ID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFRleHRQcm9wZXJ0eVNsaWNlLCBEYXRUZXh0UHJvcGVydHk+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ3RleHRfcHJvcGVydHknKVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgfVxuXG59XG4iXX0=