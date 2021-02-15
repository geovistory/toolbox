/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/actions/dat.actions.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { U } from '@kleiolab/lib-utils';
import { datRoot } from '../reducer-configs/dat.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
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
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
DatActions.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ DatActions.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function DatActions_Factory() { return new DatActions(i0.ɵɵinject(i1.NgRedux)); }, token: DatActions, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmFjdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXJlZHV4L3NyYy9saWIvcmVkdXgtc3RvcmUvIiwic291cmNlcyI6WyJzdGF0ZS1zY2hlbWEvYWN0aW9ucy9kYXQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUl4QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEQsT0FBTyxFQUE2RCxvQkFBb0IsRUFBcUIsTUFBTSxvQ0FBb0MsQ0FBQzs7O0FBR3hKLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxvQkFBOEM7Ozs7SUFVdkYsWUFBbUIsT0FBMkI7UUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFBN0MsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7SUFBbUIsQ0FBQzs7OztJQUVsRSxhQUFhO1FBQ1gsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO1FBRS9ELElBQUksQ0FBQyxXQUFXOzs7OztRQUFHLENBQUMsUUFBZ0IsRUFBRSxhQUFzQixFQUFFLEVBQUU7O2tCQUN4RCxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTs7a0JBRXJCLE1BQU0sR0FBd0Q7Z0JBQ2xFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEdBQUcscUJBQXFCLENBQUMsWUFBWTtnQkFDckcsSUFBSSxFQUFFLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUU7Z0JBQzdD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QUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFFeEgsa0JBQWEsR0FBRyxJQUFJLG9CQUFvQixDQUFxQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBRXBGLENBQUM7OztZQWpCcEQsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7O1lBeEhRLE9BQU87Ozs7O0lBMkhkLDZCQUFrRTs7SUFFbEUsMkJBQTZEOztJQUU3RCw0QkFBK0Q7O0lBRS9ELDBDQUFnSzs7SUFFaEssK0JBQXdIOztJQUV4SCxtQ0FBc0k7O0lBRTFILDZCQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nUmVkdXggfSBmcm9tICdAYW5ndWxhci1yZWR1eC9zdG9yZSc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRDaHVuaywgRGF0Q29sdW1uLCBEYXREaWdpdGFsLCBEYXROYW1lc3BhY2UsIERhdFRleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEYXRDbGFzc0NvbHVtbk1hcHBpbmcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgRmx1eFN0YW5kYXJkQWN0aW9uIH0gZnJvbSAnZmx1eC1zdGFuZGFyZC1hY3Rpb24nO1xuaW1wb3J0IHsgSUFwcFN0YXRlIH0gZnJvbSAnLi4vLi4vcm9vdC9tb2RlbHMvbW9kZWwnO1xuaW1wb3J0IHsgQ2h1bmtTbGljZSwgQ2xhc3NDb2x1bW5NYXBwaW5nU2xpY2UsIENvbHVtblNsaWNlLCBEaWdpdGFsU2xpY2UsIE5hbWVzcGFjZVNsaWNlLCBUZXh0UHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscy9kYXQubW9kZWxzJztcbmltcG9ydCB7IGRhdFJvb3QgfSBmcm9tICcuLi9yZWR1Y2VyLWNvbmZpZ3MvZGF0LmNvbmZpZyc7XG5pbXBvcnQgeyBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlLCBMb2FkQWN0aW9uTWV0YSwgTG9hZFZlcnNpb25BY3Rpb24sIFNjaGVtYUFjdGlvbnNGYWN0b3J5LCBTdWNjZWVkQWN0aW9uTWV0YSB9IGZyb20gJy4uL19oZWxwZXJzL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5cbmV4cG9ydCBjbGFzcyBEaWdpdGFsQWN0aW9uc0ZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxEaWdpdGFsU2xpY2UsIERhdERpZ2l0YWw+IHtcblxuICAvLyBTdWZmaXhlcyBvZiBsb2FkIGFjdGlvbiB0eXBlc1xuICBzdGF0aWMgcmVhZG9ubHkgTE9BRF9WRVJTSU9OID0gJ0xPQURfVkVSU0lPTic7XG5cbiAgLyoqXG4gICAqIExvYWQgYSB2ZXJzaW9uLiBpZiBlbnRpdHlWZXJzaW9uIG9taXR0ZWQsIGxhdGVzdCB2ZXJzaW9uIGlzIHJldHVybmVkLlxuICAgKi9cbiAgbG9hZFZlcnNpb246IChwa0VudGl0eTogbnVtYmVyLCBlbnRpdHlWZXJzaW9uPzogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPERhdERpZ2l0YWw+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4pIHsgc3VwZXIobmdSZWR1eCkgfVxuXG4gIGNyZWF0ZUFjdGlvbnMoKTogRGlnaXRhbEFjdGlvbnNGYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ2RpZ2l0YWwnKSlcblxuICAgIHRoaXMubG9hZFZlcnNpb24gPSAocGtFbnRpdHk6IG51bWJlciwgZW50aXR5VmVyc2lvbj86IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG5cbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPERpZ2l0YWxTbGljZSwgTG9hZFZlcnNpb25BY3Rpb24+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgRGlnaXRhbEFjdGlvbnNGYWN0b3J5LkxPQURfVkVSU0lPTixcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwa0VudGl0eSwgZW50aXR5VmVyc2lvbiB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxEYXREaWdpdGFsPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24gZXh0ZW5kcyBMb2FkQWN0aW9uTWV0YSB7IHBrRGlnaXRhbDogbnVtYmVyIH1cblxuZXhwb3J0IGNsYXNzIENodW5rQWN0aW9uc0ZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxDaHVua1NsaWNlLCBEYXRDaHVuaz4ge1xuXG4gIC8vIFN1ZmZpeGVzIG9mIGxvYWQgYWN0aW9uIHR5cGVzXG4gIHN0YXRpYyByZWFkb25seSBDSFVOS1NfT0ZfRElHSVRBTCA9ICdDSFVOS1NfT0ZfRElHSVRBTCc7XG5cbiAgLyoqXG4gICAqIExvYWQgYSB2ZXJzaW9uLiBpZiBlbnRpdHlWZXJzaW9uIG9taXR0ZWQsIGxhdGVzdCB2ZXJzaW9uIGlzIHJldHVybmVkLlxuICAgKi9cbiAgbG9hZENodW5rc09mRGlnaXRhbDogKHBrRGlnaXRhbDogbnVtYmVyLCBwazogbnVtYmVyKSA9PiBBY3Rpb25SZXN1bHRPYnNlcnZhYmxlPERhdENodW5rPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IENodW5rQWN0aW9uc0ZhY3Rvcnkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jcmVhdGVDcnVkQWN0aW9ucyhkYXRSb290LCAnY2h1bmsnKSlcblxuICAgIHRoaXMubG9hZENodW5rc09mRGlnaXRhbCA9IChwa0RpZ2l0YWw6IG51bWJlciwgcGs6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgYWRkUGVuZGluZyA9IFUudXVpZCgpXG5cbiAgICAgIGNvbnN0IGFjdGlvbjogRmx1eFN0YW5kYXJkQWN0aW9uPENodW5rU2xpY2UsIExvYWRDaHVua3NPZkRpZ2l0YWxBY3Rpb24+ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmFjdGlvblByZWZpeCArICcuJyArIHRoaXMubW9kZWxOYW1lICsgJzo6TE9BRCcgKyAnOjonICsgQ2h1bmtBY3Rpb25zRmFjdG9yeS5DSFVOS1NfT0ZfRElHSVRBTCxcbiAgICAgICAgbWV0YTogeyBhZGRQZW5kaW5nLCBwa0RpZ2l0YWwsIHBrIH0sXG4gICAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgICB9O1xuICAgICAgdGhpcy5uZ1JlZHV4LmRpc3BhdGNoKGFjdGlvbilcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBlbmRpbmckOiB0aGlzLm5nUmVkdXguc2VsZWN0PGJvb2xlYW4+KFsncGVuZGluZycsIGFkZFBlbmRpbmddKSxcbiAgICAgICAgcmVzb2x2ZWQkOiB0aGlzLm5nUmVkdXguc2VsZWN0PFN1Y2NlZWRBY3Rpb25NZXRhPERhdENodW5rPj4oWydyZXNvbHZlZCcsIGFkZFBlbmRpbmddKSxcbiAgICAgICAga2V5OiBhZGRQZW5kaW5nXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvYWRDb2x1bW5zT2ZUYWJsZUFjdGlvbiBleHRlbmRzIExvYWRBY3Rpb25NZXRhIHsgcGtEaWdpdGFsOiBudW1iZXIgfVxuXG5leHBvcnQgY2xhc3MgQ29sdW1uQWN0aW9uc0ZhY3RvcnkgZXh0ZW5kcyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxDb2x1bW5TbGljZSwgRGF0Q29sdW1uPiB7XG5cbiAgLy8gU3VmZml4ZXMgb2YgbG9hZCBhY3Rpb24gdHlwZXNcbiAgc3RhdGljIHJlYWRvbmx5IENPTFVNTlNfT0ZfVEFCTEUgPSAnQ09MVU1OU19PRl9UQUJMRSc7XG5cbiAgLyoqXG4gICAqIExvYWQgYSB2ZXJzaW9uLiBpZiBlbnRpdHlWZXJzaW9uIG9taXR0ZWQsIGxhdGVzdCB2ZXJzaW9uIGlzIHJldHVybmVkLlxuICAgKi9cbiAgbG9hZENvbHVtbnNPZlRhYmxlOiAocGtEaWdpdGFsOiBudW1iZXIsIHBrOiBudW1iZXIpID0+IEFjdGlvblJlc3VsdE9ic2VydmFibGU8RGF0Q29sdW1uPjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IHN1cGVyKG5nUmVkdXgpIH1cblxuICBjcmVhdGVBY3Rpb25zKCk6IENvbHVtbkFjdGlvbnNGYWN0b3J5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ2NvbHVtbicpKVxuXG4gICAgdGhpcy5sb2FkQ29sdW1uc09mVGFibGUgPSAocGtEaWdpdGFsOiBudW1iZXIsIHBrOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGFkZFBlbmRpbmcgPSBVLnV1aWQoKVxuXG4gICAgICBjb25zdCBhY3Rpb246IEZsdXhTdGFuZGFyZEFjdGlvbjxDb2x1bW5TbGljZSwgTG9hZENvbHVtbnNPZlRhYmxlQWN0aW9uPiA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5hY3Rpb25QcmVmaXggKyAnLicgKyB0aGlzLm1vZGVsTmFtZSArICc6OkxPQUQnICsgJzo6JyArIENvbHVtbkFjdGlvbnNGYWN0b3J5LkNPTFVNTlNfT0ZfVEFCTEUsXG4gICAgICAgIG1ldGE6IHsgYWRkUGVuZGluZywgcGtEaWdpdGFsLCBwayB9LFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfTtcbiAgICAgIHRoaXMubmdSZWR1eC5kaXNwYXRjaChhY3Rpb24pXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwZW5kaW5nJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxib29sZWFuPihbJ3BlbmRpbmcnLCBhZGRQZW5kaW5nXSksXG4gICAgICAgIHJlc29sdmVkJDogdGhpcy5uZ1JlZHV4LnNlbGVjdDxTdWNjZWVkQWN0aW9uTWV0YTxEYXRDb2x1bW4+PihbJ3Jlc29sdmVkJywgYWRkUGVuZGluZ10pLFxuICAgICAgICBrZXk6IGFkZFBlbmRpbmdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIERhdEFjdGlvbnMge1xuXG4gIGRpZ2l0YWwgPSBuZXcgRGlnaXRhbEFjdGlvbnNGYWN0b3J5KHRoaXMubmdSZWR1eCkuY3JlYXRlQWN0aW9ucygpO1xuXG4gIGNodW5rID0gbmV3IENodW5rQWN0aW9uc0ZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcblxuICBjb2x1bW4gPSBuZXcgQ29sdW1uQWN0aW9uc0ZhY3RvcnkodGhpcy5uZ1JlZHV4KS5jcmVhdGVBY3Rpb25zKClcblxuICBjbGFzc19jb2x1bW5fbWFwcGluZyA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxDbGFzc0NvbHVtbk1hcHBpbmdTbGljZSwgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nPih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICdjbGFzc19jb2x1bW5fbWFwcGluZycpXG5cbiAgbmFtZXNwYWNlID0gbmV3IFNjaGVtYUFjdGlvbnNGYWN0b3J5PE5hbWVzcGFjZVNsaWNlLCBEYXROYW1lc3BhY2U+KHRoaXMubmdSZWR1eCkuY3JlYXRlQ3J1ZEFjdGlvbnMoZGF0Um9vdCwgJ25hbWVzcGFjZScpXG5cbiAgdGV4dF9wcm9wZXJ0eSA9IG5ldyBTY2hlbWFBY3Rpb25zRmFjdG9yeTxUZXh0UHJvcGVydHlTbGljZSwgRGF0VGV4dFByb3BlcnR5Pih0aGlzLm5nUmVkdXgpLmNyZWF0ZUNydWRBY3Rpb25zKGRhdFJvb3QsICd0ZXh0X3Byb3BlcnR5JylcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7IH1cblxufVxuIl19