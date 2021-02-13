/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/inf.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { U } from '@kleiolab/lib-utils';
/** @type {?} */
export var infRoot = 'inf';
var ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_class.toString(); }, ɵ2 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ3 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_class.toString(); }, ɵ4 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ5 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return indexStatementBySubject(d); }, ɵ6 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return indexStatementBySubjectProperty(d); }, ɵ7 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return indexStatementByObject(d); }, ɵ8 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return indexStatementByObjectProperty(d); }, ɵ9 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return U.toStr0undef(d.fk_subject_data); }, ɵ10 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ11 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_concerned_entity + '_' + d.fk_class_field; }, ɵ12 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_concerned_entity.toString(); }, ɵ13 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ14 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ15 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ16 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ17 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ18 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
};
/** @type {?} */
export var infDefinitions = {
    persistent_item: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ0)
        },
        groupBy: [
            {
                keyInStore: 'fk_class',
                groupByFn: (ɵ1)
            }
        ]
    },
    temporal_entity: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ2)
        },
        groupBy: [
            {
                keyInStore: 'fk_class',
                groupByFn: (ɵ3)
            }
        ]
    },
    statement: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ4)
        },
        groupBy: [
            {
                keyInStore: 'subject',
                groupByFn: (ɵ5)
            },
            {
                keyInStore: 'subject+property',
                groupByFn: (ɵ6)
            },
            {
                keyInStore: 'object',
                groupByFn: (ɵ7)
            },
            {
                keyInStore: 'object+property',
                groupByFn: (ɵ8)
            },
            {
                keyInStore: 'fk_subject_data',
                groupByFn: (ɵ9)
            },
        ]
    },
    text_property: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ10)
        },
        groupBy: [
            {
                keyInStore: 'fk_concerned_entity__fk_class_field',
                groupByFn: (ɵ11)
            },
            {
                keyInStore: 'fk_concerned_entity',
                groupByFn: (ɵ12)
            },
        ]
    },
    lang_string: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ13)
        },
        groupBy: []
    },
    appellation: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ14)
        },
        groupBy: []
    },
    time_primitive: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ15)
        },
        groupBy: []
    },
    place: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ16)
        },
        groupBy: []
    },
    language: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ17)
        },
        groupBy: []
    },
    dimension: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ18)
        },
        groupBy: []
    },
}
/**
 * This function creates a key for the given statement by
 * - subject (all subject foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same subject
 * or to retrieve statements from such a group index
 */
;
/**
 * This function creates a key for the given statement by
 * - subject (all subject foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same subject
 * or to retrieve statements from such a group index
 * @param {?=} fks
 * @return {?}
 */
export function indexStatementBySubject(fks) {
    if (fks === void 0) { fks = {}; }
    return (fks.fk_subject_info || '0') + "-" + (fks.fk_subject_data || '0') + "-" + ((fks.fk_subject_tables_row) || '0') + "-" + ((fks.fk_subject_tables_cell) || '0');
}
/**
 * @record
 */
export function IndexStatementBySubject() { }
if (false) {
    /** @type {?|undefined} */
    IndexStatementBySubject.prototype.fk_subject_info;
    /** @type {?|undefined} */
    IndexStatementBySubject.prototype.fk_subject_data;
    /** @type {?|undefined} */
    IndexStatementBySubject.prototype.fk_subject_tables_row;
    /** @type {?|undefined} */
    IndexStatementBySubject.prototype.fk_subject_tables_cell;
}
;
/**
 * This function creates a key for the given statement by
 * - object (all object foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same object
 * or to retrieve statements from such a group index
 * @param {?=} fks
 * @return {?}
 */
export function indexStatementByObject(fks) {
    if (fks === void 0) { fks = {}; }
    return (fks.fk_object_info || '0') + "-" + (fks.fk_object_data || '0') + "-" + (fks.fk_object_tables_row || '0') + "-" + (fks.fk_object_tables_cell || '0');
}
/**
 * @record
 */
export function IndexStatementByObject() { }
if (false) {
    /** @type {?|undefined} */
    IndexStatementByObject.prototype.fk_object_info;
    /** @type {?|undefined} */
    IndexStatementByObject.prototype.fk_object_data;
    /** @type {?|undefined} */
    IndexStatementByObject.prototype.fk_object_tables_row;
    /** @type {?|undefined} */
    IndexStatementByObject.prototype.fk_object_tables_cell;
}
;
/**
 * This function creates a key for the given statement by
 * - subject (all subject foreign keys)
 * - property (all property foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same subject + property
 * or to retrieve statements from such a group index
 * @param {?=} fks
 * @return {?}
 */
export function indexStatementBySubjectProperty(fks) {
    if (fks === void 0) { fks = {}; }
    return (fks.fk_subject_info || '0') + "-" + (fks.fk_subject_data || '0') + "-" + ((fks.fk_subject_tables_row) || '0') + "-" + ((fks.fk_subject_tables_cell) || '0') + "-" + (fks.fk_property || '0') + "-" + (fks.fk_property_of_property || '0');
}
/**
 * @record
 */
export function IndexStatementBySubjectProperty() { }
if (false) {
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_subject_info;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_subject_data;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_subject_tables_row;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_subject_tables_cell;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_property;
    /** @type {?|undefined} */
    IndexStatementBySubjectProperty.prototype.fk_property_of_property;
}
/**
 * This function creates a key for the given statement by
 * - object (all object foreign keys)
 * - property (all property foreign keys)
 *
 * The key is created on the basis of the given foreign keys.
 * Keys are separated by dash '-', undefined keys are replaced by a zero '0'
 *
 * Use this function to index groups of statements with the same object + property
 * or to retrieve statements from such a group index
 * @param {?=} fks
 * @return {?}
 */
export function indexStatementByObjectProperty(fks) {
    if (fks === void 0) { fks = {}; }
    return (fks.fk_object_info || '0') + "-" + (fks.fk_object_data || '0') + "-" + (fks.fk_object_tables_row || '0') + "-" + (fks.fk_object_tables_cell || '0') + "-" + (fks.fk_property || '0') + "-" + (fks.fk_property_of_property || '0');
}
/**
 * @record
 */
export function IndexStatementByObjectProperty() { }
if (false) {
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_object_info;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_object_data;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_object_tables_row;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_object_tables_cell;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_property;
    /** @type {?|undefined} */
    IndexStatementByObjectProperty.prototype.fk_property_of_property;
}
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13, ɵ14, ɵ15, ɵ16, ɵ17, ɵ18 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy9pbmYuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLENBQUMsRUFBRSxNQUFNLHFCQUFxQixDQUFDOztBQUV4QyxNQUFNLEtBQU8sT0FBTyxHQUFHLEtBQUs7Ozs7O0FBTVgsVUFBQyxJQUFJO0lBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ2xDLENBQUM7Ozs7QUFLWSxVQUFDLENBQUMsSUFBYSxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQXJCLENBQXFCOzs7O0FBT3RDLFVBQUMsSUFBSTtJQUNkLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNsQyxDQUFDOzs7O0FBS1ksVUFBQyxDQUFDLElBQWEsT0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFyQixDQUFxQjs7OztBQU90QyxVQUFDLElBQWtCO0lBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNsQyxDQUFDOzs7O0FBS1ksVUFBQyxDQUFlLElBQWEsT0FBQSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsRUFBMUIsQ0FBMEI7Ozs7QUFJdkQsVUFBQyxDQUFlLElBQWEsT0FBQSwrQkFBK0IsQ0FBQyxDQUFDLENBQUMsRUFBbEMsQ0FBa0M7Ozs7QUFJL0QsVUFBQyxDQUFlLElBQWEsT0FBQSxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBekIsQ0FBeUI7Ozs7QUFJdEQsVUFBQyxDQUFlLElBQWEsT0FBQSw4QkFBOEIsQ0FBQyxDQUFDLENBQUMsRUFBakMsQ0FBaUM7Ozs7QUFLOUQsVUFBQyxDQUFlLElBQWEsT0FBQSxD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QStCOztJQUMvQixxREFBcUI7O0lBQ3JCLGlFQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnLi4vX2hlbHBlcnMvcmVkdWNlci1mYWN0b3J5JztcblxuaW1wb3J0IHsgSW5mU3RhdGVtZW50LCBJbmZUZXh0UHJvcGVydHksIEluZkRpbWVuc2lvbiB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBVIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5cbmV4cG9ydCBjb25zdCBpbmZSb290ID0gJ2luZic7XG5cbmV4cG9ydCBjb25zdCBpbmZEZWZpbml0aW9uczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gPSB7XG4gIHBlcnNpc3RlbnRfaXRlbToge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY2xhc3MnLFxuICAgICAgICBncm91cEJ5Rm46IChkKTogc3RyaW5nID0+IGQuZmtfY2xhc3MudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgdGVtcG9yYWxfZW50aXR5OiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgICB9XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19jbGFzcycsXG4gICAgICAgIGdyb3VwQnlGbjogKGQpOiBzdHJpbmcgPT4gZC5ma19jbGFzcy50b1N0cmluZygpXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBzdGF0ZW1lbnQ6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW06IEluZlN0YXRlbWVudCkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnc3ViamVjdCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IEluZlN0YXRlbWVudCk6IHN0cmluZyA9PiBpbmRleFN0YXRlbWVudEJ5U3ViamVjdChkKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ3N1YmplY3QrcHJvcGVydHknLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBJbmZTdGF0ZW1lbnQpOiBzdHJpbmcgPT4gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eShkKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ29iamVjdCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IEluZlN0YXRlbWVudCk6IHN0cmluZyA9PiBpbmRleFN0YXRlbWVudEJ5T2JqZWN0KGQpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnb2JqZWN0K3Byb3BlcnR5JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogSW5mU3RhdGVtZW50KTogc3RyaW5nID0+IGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eShkKVxuICAgICAgfSxcblxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfc3ViamVjdF9kYXRhJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogSW5mU3RhdGVtZW50KTogc3RyaW5nID0+IFUudG9TdHIwdW5kZWYoZC5ma19zdWJqZWN0X2RhdGEpXG4gICAgICB9LFxuICAgIF1cbiAgfSxcblxuICB0ZXh0X3Byb3BlcnR5OiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgICB9XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19jb25jZXJuZWRfZW50aXR5X19ma19jbGFzc19maWVsZCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IEluZlRleHRQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLmZrX2NvbmNlcm5lZF9lbnRpdHkgKyAnXycgKyBkLmZrX2NsYXNzX2ZpZWxkXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY29uY2VybmVkX2VudGl0eScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IEluZlRleHRQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLmZrX2NvbmNlcm5lZF9lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICBdXG4gIH0sXG4gIGxhbmdfc3RyaW5nOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgICB9XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXVxuICB9LFxuICBhcHBlbGxhdGlvbjoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW11cbiAgfSxcbiAgdGltZV9wcmltaXRpdmU6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICB9LFxuICAgIGdyb3VwQnk6IFtdXG4gIH0sXG4gIHBsYWNlOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgICB9XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXVxuICB9LFxuICBsYW5ndWFnZToge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW11cbiAgfSxcbiAgZGltZW5zaW9uOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBJbmZEaW1lbnNpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICB9LFxuICAgIGdyb3VwQnk6IFtdXG4gIH0sXG59XG5cblxuXG5cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSBrZXkgZm9yIHRoZSBnaXZlbiBzdGF0ZW1lbnQgYnlcbiAqIC0gc3ViamVjdCAoYWxsIHN1YmplY3QgZm9yZWlnbiBrZXlzKVxuICpcbiAqIFRoZSBrZXkgaXMgY3JlYXRlZCBvbiB0aGUgYmFzaXMgb2YgdGhlIGdpdmVuIGZvcmVpZ24ga2V5cy5cbiAqIEtleXMgYXJlIHNlcGFyYXRlZCBieSBkYXNoICctJywgdW5kZWZpbmVkIGtleXMgYXJlIHJlcGxhY2VkIGJ5IGEgemVybyAnMCdcbiAqXG4gKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBpbmRleCBncm91cHMgb2Ygc3RhdGVtZW50cyB3aXRoIHRoZSBzYW1lIHN1YmplY3RcbiAqIG9yIHRvIHJldHJpZXZlIHN0YXRlbWVudHMgZnJvbSBzdWNoIGEgZ3JvdXAgaW5kZXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZGV4U3RhdGVtZW50QnlTdWJqZWN0KGZrczogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QgPSB7fSk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtma3MuZmtfc3ViamVjdF9pbmZvIHx8ICcwJ30tJHtma3MuZmtfc3ViamVjdF9kYXRhIHx8ICcwJ30tJHsoZmtzLmZrX3N1YmplY3RfdGFibGVzX3JvdykgfHwgJzAnfS0keyhma3MuZmtfc3ViamVjdF90YWJsZXNfY2VsbCkgfHwgJzAnfWBcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3Qge1xuICBma19zdWJqZWN0X2luZm8/OiBudW1iZXI7XG4gIGZrX3N1YmplY3RfZGF0YT86IG51bWJlcjtcbiAgZmtfc3ViamVjdF90YWJsZXNfcm93PzogbnVtYmVyO1xuICBma19zdWJqZWN0X3RhYmxlc19jZWxsPzogbnVtYmVyO1xufTtcblxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIGtleSBmb3IgdGhlIGdpdmVuIHN0YXRlbWVudCBieVxuICogLSBvYmplY3QgKGFsbCBvYmplY3QgZm9yZWlnbiBrZXlzKVxuICpcbiAqIFRoZSBrZXkgaXMgY3JlYXRlZCBvbiB0aGUgYmFzaXMgb2YgdGhlIGdpdmVuIGZvcmVpZ24ga2V5cy5cbiAqIEtleXMgYXJlIHNlcGFyYXRlZCBieSBkYXNoICctJywgdW5kZWZpbmVkIGtleXMgYXJlIHJlcGxhY2VkIGJ5IGEgemVybyAnMCdcbiAqXG4gKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBpbmRleCBncm91cHMgb2Ygc3RhdGVtZW50cyB3aXRoIHRoZSBzYW1lIG9iamVjdFxuICogb3IgdG8gcmV0cmlldmUgc3RhdGVtZW50cyBmcm9tIHN1Y2ggYSBncm91cCBpbmRleFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhTdGF0ZW1lbnRCeU9iamVjdChma3M6IEluZGV4U3RhdGVtZW50QnlPYmplY3QgPSB7fSk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtma3MuZmtfb2JqZWN0X2luZm8gfHwgJzAnfS0ke2Zrcy5ma19vYmplY3RfZGF0YSB8fCAnMCd9LSR7ZmtzLmZrX29iamVjdF90YWJsZXNfcm93IHx8ICcwJ30tJHtma3MuZmtfb2JqZWN0X3RhYmxlc19jZWxsIHx8ICcwJ31gXG59XG5leHBvcnQgaW50ZXJmYWNlIEluZGV4U3RhdGVtZW50QnlPYmplY3Qge1xuICBma19vYmplY3RfaW5mbz86IG51bWJlcjtcbiAgZmtfb2JqZWN0X2RhdGE/OiBudW1iZXI7XG4gIGZrX29iamVjdF90YWJsZXNfcm93PzogbnVtYmVyO1xuICBma19vYmplY3RfdGFibGVzX2NlbGw/OiBudW1iZXI7XG59O1xuXG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGEga2V5IGZvciB0aGUgZ2l2ZW4gc3RhdGVtZW50IGJ5XG4gKiAtIHN1YmplY3QgKGFsbCBzdWJqZWN0IGZvcmVpZ24ga2V5cylcbiAqIC0gcHJvcGVydHkgKGFsbCBwcm9wZXJ0eSBmb3JlaWduIGtleXMpXG4gKlxuICogVGhlIGtleSBpcyBjcmVhdGVkIG9uIHRoZSBiYXNpcyBvZiB0aGUgZ2l2ZW4gZm9yZWlnbiBrZXlzLlxuICogS2V5cyBhcmUgc2VwYXJhdGVkIGJ5IGRhc2ggJy0nLCB1bmRlZmluZWQga2V5cyBhcmUgcmVwbGFjZWQgYnkgYSB6ZXJvICcwJ1xuICpcbiAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIGluZGV4IGdyb3VwcyBvZiBzdGF0ZW1lbnRzIHdpdGggdGhlIHNhbWUgc3ViamVjdCArIHByb3BlcnR5XG4gKiBvciB0byByZXRyaWV2ZSBzdGF0ZW1lbnRzIGZyb20gc3VjaCBhIGdyb3VwIGluZGV4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRleFN0YXRlbWVudEJ5U3ViamVjdFByb3BlcnR5KGZrczogSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSA9IHt9KTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke2Zrcy5ma19zdWJqZWN0X2luZm8gfHwgJzAnfS0ke2Zrcy5ma19zdWJqZWN0X2RhdGEgfHwgJzAnfS0keyhma3MuZmtfc3ViamVjdF90YWJsZXNfcm93KSB8fCAnMCd9LSR7KGZrcy5ma19zdWJqZWN0X3RhYmxlc19jZWxsKSB8fCAnMCd9LSR7ZmtzLmZrX3Byb3BlcnR5IHx8ICcwJ30tJHtma3MuZmtfcHJvcGVydHlfb2ZfcHJvcGVydHkgfHwgJzAnfWBcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eSB7XG4gIGZrX3N1YmplY3RfaW5mbz86IG51bWJlcjtcbiAgZmtfc3ViamVjdF9kYXRhPzogbnVtYmVyO1xuICBma19zdWJqZWN0X3RhYmxlc19yb3c/OiBudW1iZXI7XG4gIGZrX3N1YmplY3RfdGFibGVzX2NlbGw/OiBudW1iZXI7XG4gIGZrX3Byb3BlcnR5PzogbnVtYmVyO1xuICBma19wcm9wZXJ0eV9vZl9wcm9wZXJ0eT86IG51bWJlcjtcbn1cblxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIGtleSBmb3IgdGhlIGdpdmVuIHN0YXRlbWVudCBieVxuICogLSBvYmplY3QgKGFsbCBvYmplY3QgZm9yZWlnbiBrZXlzKVxuICogLSBwcm9wZXJ0eSAoYWxsIHByb3BlcnR5IGZvcmVpZ24ga2V5cylcbiAqXG4gKiBUaGUga2V5IGlzIGNyZWF0ZWQgb24gdGhlIGJhc2lzIG9mIHRoZSBnaXZlbiBmb3JlaWduIGtleXMuXG4gKiBLZXlzIGFyZSBzZXBhcmF0ZWQgYnkgZGFzaCAnLScsIHVuZGVmaW5lZCBrZXlzIGFyZSByZXBsYWNlZCBieSBhIHplcm8gJzAnXG4gKlxuICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gaW5kZXggZ3JvdXBzIG9mIHN0YXRlbWVudHMgd2l0aCB0aGUgc2FtZSBvYmplY3QgKyBwcm9wZXJ0eVxuICogb3IgdG8gcmV0cmlldmUgc3RhdGVtZW50cyBmcm9tIHN1Y2ggYSBncm91cCBpbmRleFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5KGZrczogSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5ID0ge30pOiBzdHJpbmcge1xuICByZXR1cm4gYCR7ZmtzLmZrX29iamVjdF9pbmZvIHx8ICcwJ30tJHtma3MuZmtfb2JqZWN0X2RhdGEgfHwgJzAnfS0ke2Zrcy5ma19vYmplY3RfdGFibGVzX3JvdyB8fCAnMCd9LSR7ZmtzLmZrX29iamVjdF90YWJsZXNfY2VsbCB8fCAnMCd9LSR7ZmtzLmZrX3Byb3BlcnR5IHx8ICcwJ30tJHtma3MuZmtfcHJvcGVydHlfb2ZfcHJvcGVydHkgfHwgJzAnfWBcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSW5kZXhTdGF0ZW1lbnRCeU9iamVjdFByb3BlcnR5IHtcbiAgZmtfb2JqZWN0X2luZm8/OiBudW1iZXI7XG4gIGZrX29iamVjdF9kYXRhPzogbnVtYmVyO1xuICBma19vYmplY3RfdGFibGVzX3Jvdz86IG51bWJlcjtcbiAgZmtfb2JqZWN0X3RhYmxlc19jZWxsPzogbnVtYmVyO1xuICBma19wcm9wZXJ0eT86IG51bWJlcjtcbiAgZmtfcHJvcGVydHlfb2ZfcHJvcGVydHk/OiBudW1iZXI7XG59XG5cbiJdfQ==