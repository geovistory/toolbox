/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/reducer-configs/inf.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { U } from '@kleiolab/lib-utils';
/** @type {?} */
export const infRoot = 'inf';
const ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_class.toString(), ɵ2 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ3 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_class.toString(), ɵ4 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ5 = /**
 * @param {?} d
 * @return {?}
 */
(d) => indexStatementBySubject(d), ɵ6 = /**
 * @param {?} d
 * @return {?}
 */
(d) => indexStatementBySubjectProperty(d), ɵ7 = /**
 * @param {?} d
 * @return {?}
 */
(d) => indexStatementByObject(d), ɵ8 = /**
 * @param {?} d
 * @return {?}
 */
(d) => indexStatementByObjectProperty(d), ɵ9 = /**
 * @param {?} d
 * @return {?}
 */
(d) => U.toStr0undef(d.fk_subject_data), ɵ10 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ11 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_concerned_entity + '_' + d.fk_class_field, ɵ12 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_concerned_entity.toString(), ɵ13 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ14 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ15 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ16 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ17 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ18 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
};
/** @type {?} */
export const infDefinitions = {
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
export function indexStatementBySubject(fks = {}) {
    return `${fks.fk_subject_info || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}`;
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
export function indexStatementByObject(fks = {}) {
    return `${fks.fk_object_info || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}`;
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
export function indexStatementBySubjectProperty(fks = {}) {
    return `${fks.fk_subject_info || '0'}-${fks.fk_subject_data || '0'}-${(fks.fk_subject_tables_row) || '0'}-${(fks.fk_subject_tables_cell) || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`;
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
export function indexStatementByObjectProperty(fks = {}) {
    return `${fks.fk_object_info || '0'}-${fks.fk_object_data || '0'}-${fks.fk_object_tables_row || '0'}-${fks.fk_object_tables_cell || '0'}-${fks.fk_property || '0'}-${fks.fk_property_of_property || '0'}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3MvaW5mLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLE9BQU8sRUFBRSxDQUFDLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFFeEMsTUFBTSxPQUFPLE9BQU8sR0FBRyxLQUFLOzs7OztBQU1YLENBQUMsSUFBSSxFQUFFLEVBQUU7SUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ2xDLENBQUM7Ozs7QUFLWSxDQUFDLENBQUMsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFPdEMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDbEMsQ0FBQzs7OztBQUtZLENBQUMsQ0FBQyxFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTs7OztBQU90QyxDQUFDLElBQWtCLEVBQUUsRUFBRTtJQUNoQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDbEMsQ0FBQzs7OztBQUtZLENBQUMsQ0FBZSxFQUFVLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7Ozs7QUFJdkQsQ0FBQyxDQUFlLEVBQVUsRUFBRSxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQzs7OztBQUkvRCxDQUFDLENBQWUsRUFBVSxFQUFFLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDOzs7O0FBSXRELENBQUMsQ0FBZSxFQUFVLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7Ozs7QUFLOUQsQ0FBQyxDQUFlLEVBQVUsRUFBRSxDQUFDLENB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QixpRUFBaUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzL3JlZHVjZXItZmFjdG9yeSc7XG5cbmltcG9ydCB7IEluZlN0YXRlbWVudCwgSW5mVGV4dFByb3BlcnR5LCBJbmZEaW1lbnNpb24gfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgVSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgaW5mUm9vdCA9ICdpbmYnO1xuXG5leHBvcnQgY29uc3QgaW5mRGVmaW5pdGlvbnM6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uID0ge1xuICBwZXJzaXN0ZW50X2l0ZW06IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2NsYXNzJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZCk6IHN0cmluZyA9PiBkLmZrX2NsYXNzLnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHRlbXBvcmFsX2VudGl0eToge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY2xhc3MnLFxuICAgICAgICBncm91cEJ5Rm46IChkKTogc3RyaW5nID0+IGQuZmtfY2xhc3MudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgc3RhdGVtZW50OiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBJbmZTdGF0ZW1lbnQpID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ3N1YmplY3QnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBJbmZTdGF0ZW1lbnQpOiBzdHJpbmcgPT4gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3QoZClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdzdWJqZWN0K3Byb3BlcnR5JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogSW5mU3RhdGVtZW50KTogc3RyaW5nID0+IGluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHkoZClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdvYmplY3QnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBJbmZTdGF0ZW1lbnQpOiBzdHJpbmcgPT4gaW5kZXhTdGF0ZW1lbnRCeU9iamVjdChkKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ29iamVjdCtwcm9wZXJ0eScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IEluZlN0YXRlbWVudCk6IHN0cmluZyA9PiBpbmRleFN0YXRlbWVudEJ5T2JqZWN0UHJvcGVydHkoZClcbiAgICAgIH0sXG5cbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3N1YmplY3RfZGF0YScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IEluZlN0YXRlbWVudCk6IHN0cmluZyA9PiBVLnRvU3RyMHVuZGVmKGQuZmtfc3ViamVjdF9kYXRhKVxuICAgICAgfSxcbiAgICBdXG4gIH0sXG5cbiAgdGV4dF9wcm9wZXJ0eToge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY29uY2VybmVkX2VudGl0eV9fZmtfY2xhc3NfZmllbGQnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBJbmZUZXh0UHJvcGVydHkpOiBzdHJpbmcgPT4gZC5ma19jb25jZXJuZWRfZW50aXR5ICsgJ18nICsgZC5ma19jbGFzc19maWVsZFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2NvbmNlcm5lZF9lbnRpdHknLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBJbmZUZXh0UHJvcGVydHkpOiBzdHJpbmcgPT4gZC5ma19jb25jZXJuZWRfZW50aXR5LnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgXVxuICB9LFxuICBsYW5nX3N0cmluZzoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW11cbiAgfSxcbiAgYXBwZWxsYXRpb246IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICB9LFxuICAgIGdyb3VwQnk6IFtdXG4gIH0sXG4gIHRpbWVfcHJpbWl0aXZlOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgICB9XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXVxuICB9LFxuICBwbGFjZToge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW11cbiAgfSxcbiAgbGFuZ3VhZ2U6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICB9LFxuICAgIGdyb3VwQnk6IFtdXG4gIH0sXG4gIGRpbWVuc2lvbjoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogSW5mRGltZW5zaW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgICB9XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXVxuICB9LFxufVxuXG5cblxuXG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBjcmVhdGVzIGEga2V5IGZvciB0aGUgZ2l2ZW4gc3RhdGVtZW50IGJ5XG4gKiAtIHN1YmplY3QgKGFsbCBzdWJqZWN0IGZvcmVpZ24ga2V5cylcbiAqXG4gKiBUaGUga2V5IGlzIGNyZWF0ZWQgb24gdGhlIGJhc2lzIG9mIHRoZSBnaXZlbiBmb3JlaWduIGtleXMuXG4gKiBLZXlzIGFyZSBzZXBhcmF0ZWQgYnkgZGFzaCAnLScsIHVuZGVmaW5lZCBrZXlzIGFyZSByZXBsYWNlZCBieSBhIHplcm8gJzAnXG4gKlxuICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gaW5kZXggZ3JvdXBzIG9mIHN0YXRlbWVudHMgd2l0aCB0aGUgc2FtZSBzdWJqZWN0XG4gKiBvciB0byByZXRyaWV2ZSBzdGF0ZW1lbnRzIGZyb20gc3VjaCBhIGdyb3VwIGluZGV4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpbmRleFN0YXRlbWVudEJ5U3ViamVjdChma3M6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0ID0ge30pOiBzdHJpbmcge1xuICByZXR1cm4gYCR7ZmtzLmZrX3N1YmplY3RfaW5mbyB8fCAnMCd9LSR7ZmtzLmZrX3N1YmplY3RfZGF0YSB8fCAnMCd9LSR7KGZrcy5ma19zdWJqZWN0X3RhYmxlc19yb3cpIHx8ICcwJ30tJHsoZmtzLmZrX3N1YmplY3RfdGFibGVzX2NlbGwpIHx8ICcwJ31gXG59XG5leHBvcnQgaW50ZXJmYWNlIEluZGV4U3RhdGVtZW50QnlTdWJqZWN0IHtcbiAgZmtfc3ViamVjdF9pbmZvPzogbnVtYmVyO1xuICBma19zdWJqZWN0X2RhdGE/OiBudW1iZXI7XG4gIGZrX3N1YmplY3RfdGFibGVzX3Jvdz86IG51bWJlcjtcbiAgZmtfc3ViamVjdF90YWJsZXNfY2VsbD86IG51bWJlcjtcbn07XG5cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSBrZXkgZm9yIHRoZSBnaXZlbiBzdGF0ZW1lbnQgYnlcbiAqIC0gb2JqZWN0IChhbGwgb2JqZWN0IGZvcmVpZ24ga2V5cylcbiAqXG4gKiBUaGUga2V5IGlzIGNyZWF0ZWQgb24gdGhlIGJhc2lzIG9mIHRoZSBnaXZlbiBmb3JlaWduIGtleXMuXG4gKiBLZXlzIGFyZSBzZXBhcmF0ZWQgYnkgZGFzaCAnLScsIHVuZGVmaW5lZCBrZXlzIGFyZSByZXBsYWNlZCBieSBhIHplcm8gJzAnXG4gKlxuICogVXNlIHRoaXMgZnVuY3Rpb24gdG8gaW5kZXggZ3JvdXBzIG9mIHN0YXRlbWVudHMgd2l0aCB0aGUgc2FtZSBvYmplY3RcbiAqIG9yIHRvIHJldHJpZXZlIHN0YXRlbWVudHMgZnJvbSBzdWNoIGEgZ3JvdXAgaW5kZXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZGV4U3RhdGVtZW50QnlPYmplY3QoZmtzOiBJbmRleFN0YXRlbWVudEJ5T2JqZWN0ID0ge30pOiBzdHJpbmcge1xuICByZXR1cm4gYCR7ZmtzLmZrX29iamVjdF9pbmZvIHx8ICcwJ30tJHtma3MuZmtfb2JqZWN0X2RhdGEgfHwgJzAnfS0ke2Zrcy5ma19vYmplY3RfdGFibGVzX3JvdyB8fCAnMCd9LSR7ZmtzLmZrX29iamVjdF90YWJsZXNfY2VsbCB8fCAnMCd9YFxufVxuZXhwb3J0IGludGVyZmFjZSBJbmRleFN0YXRlbWVudEJ5T2JqZWN0IHtcbiAgZmtfb2JqZWN0X2luZm8/OiBudW1iZXI7XG4gIGZrX29iamVjdF9kYXRhPzogbnVtYmVyO1xuICBma19vYmplY3RfdGFibGVzX3Jvdz86IG51bWJlcjtcbiAgZmtfb2JqZWN0X3RhYmxlc19jZWxsPzogbnVtYmVyO1xufTtcblxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gY3JlYXRlcyBhIGtleSBmb3IgdGhlIGdpdmVuIHN0YXRlbWVudCBieVxuICogLSBzdWJqZWN0IChhbGwgc3ViamVjdCBmb3JlaWduIGtleXMpXG4gKiAtIHByb3BlcnR5IChhbGwgcHJvcGVydHkgZm9yZWlnbiBrZXlzKVxuICpcbiAqIFRoZSBrZXkgaXMgY3JlYXRlZCBvbiB0aGUgYmFzaXMgb2YgdGhlIGdpdmVuIGZvcmVpZ24ga2V5cy5cbiAqIEtleXMgYXJlIHNlcGFyYXRlZCBieSBkYXNoICctJywgdW5kZWZpbmVkIGtleXMgYXJlIHJlcGxhY2VkIGJ5IGEgemVybyAnMCdcbiAqXG4gKiBVc2UgdGhpcyBmdW5jdGlvbiB0byBpbmRleCBncm91cHMgb2Ygc3RhdGVtZW50cyB3aXRoIHRoZSBzYW1lIHN1YmplY3QgKyBwcm9wZXJ0eVxuICogb3IgdG8gcmV0cmlldmUgc3RhdGVtZW50cyBmcm9tIHN1Y2ggYSBncm91cCBpbmRleFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhTdGF0ZW1lbnRCeVN1YmplY3RQcm9wZXJ0eShma3M6IEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHkgPSB7fSk6IHN0cmluZyB7XG4gIHJldHVybiBgJHtma3MuZmtfc3ViamVjdF9pbmZvIHx8ICcwJ30tJHtma3MuZmtfc3ViamVjdF9kYXRhIHx8ICcwJ30tJHsoZmtzLmZrX3N1YmplY3RfdGFibGVzX3JvdykgfHwgJzAnfS0keyhma3MuZmtfc3ViamVjdF90YWJsZXNfY2VsbCkgfHwgJzAnfS0ke2Zrcy5ma19wcm9wZXJ0eSB8fCAnMCd9LSR7ZmtzLmZrX3Byb3BlcnR5X29mX3Byb3BlcnR5IHx8ICcwJ31gXG59XG5leHBvcnQgaW50ZXJmYWNlIEluZGV4U3RhdGVtZW50QnlTdWJqZWN0UHJvcGVydHkge1xuICBma19zdWJqZWN0X2luZm8/OiBudW1iZXI7XG4gIGZrX3N1YmplY3RfZGF0YT86IG51bWJlcjtcbiAgZmtfc3ViamVjdF90YWJsZXNfcm93PzogbnVtYmVyO1xuICBma19zdWJqZWN0X3RhYmxlc19jZWxsPzogbnVtYmVyO1xuICBma19wcm9wZXJ0eT86IG51bWJlcjtcbiAgZmtfcHJvcGVydHlfb2ZfcHJvcGVydHk/OiBudW1iZXI7XG59XG5cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGNyZWF0ZXMgYSBrZXkgZm9yIHRoZSBnaXZlbiBzdGF0ZW1lbnQgYnlcbiAqIC0gb2JqZWN0IChhbGwgb2JqZWN0IGZvcmVpZ24ga2V5cylcbiAqIC0gcHJvcGVydHkgKGFsbCBwcm9wZXJ0eSBmb3JlaWduIGtleXMpXG4gKlxuICogVGhlIGtleSBpcyBjcmVhdGVkIG9uIHRoZSBiYXNpcyBvZiB0aGUgZ2l2ZW4gZm9yZWlnbiBrZXlzLlxuICogS2V5cyBhcmUgc2VwYXJhdGVkIGJ5IGRhc2ggJy0nLCB1bmRlZmluZWQga2V5cyBhcmUgcmVwbGFjZWQgYnkgYSB6ZXJvICcwJ1xuICpcbiAqIFVzZSB0aGlzIGZ1bmN0aW9uIHRvIGluZGV4IGdyb3VwcyBvZiBzdGF0ZW1lbnRzIHdpdGggdGhlIHNhbWUgb2JqZWN0ICsgcHJvcGVydHlcbiAqIG9yIHRvIHJldHJpZXZlIHN0YXRlbWVudHMgZnJvbSBzdWNoIGEgZ3JvdXAgaW5kZXhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eShma3M6IEluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSA9IHt9KTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke2Zrcy5ma19vYmplY3RfaW5mbyB8fCAnMCd9LSR7ZmtzLmZrX29iamVjdF9kYXRhIHx8ICcwJ30tJHtma3MuZmtfb2JqZWN0X3RhYmxlc19yb3cgfHwgJzAnfS0ke2Zrcy5ma19vYmplY3RfdGFibGVzX2NlbGwgfHwgJzAnfS0ke2Zrcy5ma19wcm9wZXJ0eSB8fCAnMCd9LSR7ZmtzLmZrX3Byb3BlcnR5X29mX3Byb3BlcnR5IHx8ICcwJ31gXG59XG5leHBvcnQgaW50ZXJmYWNlIEluZGV4U3RhdGVtZW50QnlPYmplY3RQcm9wZXJ0eSB7XG4gIGZrX29iamVjdF9pbmZvPzogbnVtYmVyO1xuICBma19vYmplY3RfZGF0YT86IG51bWJlcjtcbiAgZmtfb2JqZWN0X3RhYmxlc19yb3c/OiBudW1iZXI7XG4gIGZrX29iamVjdF90YWJsZXNfY2VsbD86IG51bWJlcjtcbiAgZmtfcHJvcGVydHk/OiBudW1iZXI7XG4gIGZrX3Byb3BlcnR5X29mX3Byb3BlcnR5PzogbnVtYmVyO1xufVxuXG4iXX0=