/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/dfh.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var dfhRoot = 'dfh';
/** @type {?} */
export var dfhLabelByFksKey = (/**
 * @param {?} item
 * @return {?}
 */
function (item) { return (item.type || null) + "_" + (item.language || null) + "_" + (item.fk_class || null) + "_" + (item.fk_profile || null) + "_" + (item.fk_property || null) + "_" + (item.fk_project || null); });
var ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_profile.toString(); }, ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_class.toString(); }, ɵ2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.basic_type.toString(); }, ɵ3 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_property + '_' + item.has_domain + '_' + item.has_range; }, ɵ4 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.pk_property.toString(); }, ɵ5 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.has_domain.toString(); }, ɵ6 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.has_range.toString(); }, ɵ7 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.has_domain + '_' + d.pk_property; }, ɵ8 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.has_range + '_' + d.pk_property; }, ɵ9 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.is_has_type_subproperty ? d.is_has_type_subproperty.toString() : undefined; }, ɵ10 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return !d.fk_class ? undefined : d.fk_class + "_" + d.type; }, ɵ11 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return !d.fk_property ? undefined : d.fk_property + "_" + d.type; }, ɵ12 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return !d.fk_profile ? undefined : d.fk_profile + "_" + d.type; };
/** @type {?} */
export var dfhDefinitions = {
    profile: {
        indexBy: {
            keyInStore: 'pk_profile',
            indexByFn: (ɵ0)
        }
    },
    klass: {
        indexBy: {
            keyInStore: 'pk_class',
            indexByFn: (ɵ1),
        },
        groupBy: [
            {
                keyInStore: 'basic_type',
                groupByFn: (ɵ2)
            },
        ]
    },
    property: {
        indexBy: {
            keyInStore: 'pk_property__has_domain__has_range',
            indexByFn: (ɵ3)
        },
        groupBy: [
            {
                keyInStore: 'pk_property',
                groupByFn: (ɵ4)
            },
            {
                keyInStore: 'has_domain',
                groupByFn: (ɵ5)
            },
            {
                keyInStore: 'has_range',
                groupByFn: (ɵ6)
            },
            {
                keyInStore: 'has_domain__fk_property',
                groupByFn: (ɵ7)
            },
            {
                keyInStore: 'has_range__fk_property',
                groupByFn: (ɵ8)
            },
            {
                keyInStore: 'is_has_type_subproperty',
                groupByFn: (ɵ9)
            }
        ]
    },
    label: {
        indexBy: {
            keyInStore: 'fks',
            indexByFn: dfhLabelByFksKey
        },
        groupBy: [
            {
                keyInStore: 'fk_class__type',
                groupByFn: (ɵ10)
            },
            {
                keyInStore: 'fk_property__type',
                groupByFn: (ɵ11)
            },
            {
                keyInStore: 'fk_profile__type',
                groupByFn: (ɵ12)
            }
        ]
    },
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy9kZmguY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQU1BLE1BQU0sS0FBTyxPQUFPLEdBQUcsS0FBSzs7QUFFNUIsTUFBTSxLQUFPLGdCQUFnQjs7OztBQUFHLFVBQUMsSUFBdUIsSUFBSyxPQUFBLENBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLFdBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLFdBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLFdBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLFdBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLFdBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUUsRUFBMUosQ0FBMEosQ0FBQTs7Ozs7QUFNdE0sVUFBQyxJQUFnQixJQUFLLE9BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBMUIsQ0FBMEI7Ozs7QUFNaEQsVUFBQyxJQUFjLElBQUssT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUF4QixDQUF3Qjs7OztBQUsxQyxVQUFDLENBQVcsSUFBYSxPQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQXZCLENBQXVCOzs7O0FBT2xELFVBQUMsSUFBaUIsSUFBSyxPQUFBLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQS9ELENBQStEOzs7O0FBS3BGLFVBQUMsQ0FBYyxJQUFhLE9BQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsRUFBeEIsQ0FBd0I7Ozs7QUFJcEQsVUFBQyxDQUFjLElBQWEsT0FBQSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUF2QixDQUF1Qjs7OztBQUluRCxVQUFDLENBQWMsSUFBYSxPQUFBLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQXRCLENBQXNCOzs7O0FBSWxELFVBQUMsQ0FBYyxJQUFhLE9BQUEsQ0FBQyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBbEMsQ0FBa0M7Ozs7QUFJOUQsVUFBQyxDQUFjLElBQWEsT0FBQSxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFqQyxDQUFpQzs7OztBQUk3RCxVQUFDLENBQWMsSUFBYSxPQUFBLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQTVFLENBQTRFOzs7O0FBWXhHLFVBQUMsQ0FBVyxJQUFhLE9BQUEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFJLENBQUMsQ0FBQyxRQUFRLFNBQUksQ0FBQyxDQUFDLElBQU0sRUFBbkQsQ0FBbUQ7Ozs7QUFJNUUsVUFBQyxDQUFXLElBQWEsT0FBQSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUksQ0FBQyxDQUFDLFdBQVcsU0FBSSxDQUFDLENBQUMsSUFBTSxFQUF6RCxDQUF5RDs7OztBQUlsRixVQUFDLENBQVcsSUFBYSxPQUFBLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBSSxDQUFDLENBQUMsVUFBVSxTQUFJLENBQUMsQ0FBQyxJQUFNLEVBQXZELENBQXVEOztBQW5FbkcsTUFBTSxLQUFPLGNBQWMsR0FBNEI7SUFDckQsT0FBTyxFQUFFO1FBQ1AsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFlBQVk7WUFDeEIsU0FBUyxNQUFrRDtTQUM1RDtLQUNGO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFVBQVU7WUFDdEIsU0FBUyxNQUE4QztTQUN4RDtRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixTQUFTLE1BQWtEO2FBQzVEO1NBQ0Y7S0FDRjtJQUNELFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxvQ0FBb0M7WUFDaEQsU0FBUyxNQUF3RjtTQUNsRztRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxhQUFhO2dCQUN6QixTQUFTLE1BQXNEO2FBQ2hFO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLFNBQVMsTUFBcUQ7YUFDL0Q7WUFDRDtnQkFDRSxVQUFVLEVBQUUsV0FBVztnQkFDdkIsU0FBUyxNQUFvRDthQUM5RDtZQUNEO2dCQUNFLFVBQVUsRUFBRSx5QkFBeUI7Z0JBQ3JDLFNBQVMsTUFBZ0U7YUFDMUU7WUFDRDtnQkFDRSxVQUFVLEVBQUUsd0JBQXdCO2dCQUNwQyxTQUFTLE1BQStEO2FBQ3pFO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLHlCQUF5QjtnQkFDckMsU0FBUyxNQUEwRzthQUNwSDtTQUNGO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsS0FBSztZQUNqQixTQUFTLEVBQUUsZ0JBQWdCO1NBQzVCO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLGdCQUFnQjtnQkFDNUIsU0FBUyxPQUE4RTthQUN4RjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxtQkFBbUI7Z0JBQy9CLFNBQVMsT0FBb0Y7YUFDOUY7WUFDRDtnQkFDRSxVQUFVLEVBQUUsa0JBQWtCO2dCQUM5QixTQUFTLE9BQWtGO2FBQzVGO1NBQ0Y7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICcuLi9faGVscGVycyc7XG5pbXBvcnQgeyBEZmhMYWJlbCwgRGZoUHJvZmlsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEZmhQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5cbmltcG9ydCB7IERmaENsYXNzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcblxuZXhwb3J0IGNvbnN0IGRmaFJvb3QgPSAnZGZoJztcblxuZXhwb3J0IGNvbnN0IGRmaExhYmVsQnlGa3NLZXkgPSAoaXRlbTogUGFydGlhbDxEZmhMYWJlbD4pID0+IGAke2l0ZW0udHlwZSB8fCBudWxsfV8ke2l0ZW0ubGFuZ3VhZ2UgfHwgbnVsbH1fJHtpdGVtLmZrX2NsYXNzIHx8IG51bGx9XyR7aXRlbS5ma19wcm9maWxlIHx8IG51bGx9XyR7aXRlbS5ma19wcm9wZXJ0eSB8fCBudWxsfV8ke2l0ZW0uZmtfcHJvamVjdCB8fCBudWxsfWA7XG5cbmV4cG9ydCBjb25zdCBkZmhEZWZpbml0aW9uczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gPSB7XG4gIHByb2ZpbGU6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfcHJvZmlsZScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBEZmhQcm9maWxlKSA9PiBpdGVtLnBrX3Byb2ZpbGUudG9TdHJpbmcoKVxuICAgIH1cbiAgfSxcbiAga2xhc3M6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfY2xhc3MnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogRGZoQ2xhc3MpID0+IGl0ZW0ucGtfY2xhc3MudG9TdHJpbmcoKSxcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2Jhc2ljX3R5cGUnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhDbGFzcyk6IHN0cmluZyA9PiBkLmJhc2ljX3R5cGUudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICBdXG4gIH0sXG4gIHByb3BlcnR5OiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX3Byb3BlcnR5X19oYXNfZG9tYWluX19oYXNfcmFuZ2UnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogRGZoUHJvcGVydHkpID0+IGl0ZW0ucGtfcHJvcGVydHkgKyAnXycgKyBpdGVtLmhhc19kb21haW4gKyAnXycgKyBpdGVtLmhhc19yYW5nZVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAncGtfcHJvcGVydHknLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLnBrX3Byb3BlcnR5LnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdoYXNfZG9tYWluJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoUHJvcGVydHkpOiBzdHJpbmcgPT4gZC5oYXNfZG9tYWluLnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdoYXNfcmFuZ2UnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLmhhc19yYW5nZS50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnaGFzX2RvbWFpbl9fZmtfcHJvcGVydHknLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLmhhc19kb21haW4gKyAnXycgKyBkLnBrX3Byb3BlcnR5XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnaGFzX3JhbmdlX19ma19wcm9wZXJ0eScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaFByb3BlcnR5KTogc3RyaW5nID0+IGQuaGFzX3JhbmdlICsgJ18nICsgZC5wa19wcm9wZXJ0eVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2lzX2hhc190eXBlX3N1YnByb3BlcnR5JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoUHJvcGVydHkpOiBzdHJpbmcgPT4gZC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSA/IGQuaXNfaGFzX3R5cGVfc3VicHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgbGFiZWw6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAnZmtzJyxcbiAgICAgIGluZGV4QnlGbjogZGZoTGFiZWxCeUZrc0tleVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY2xhc3NfX3R5cGUnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhMYWJlbCk6IHN0cmluZyA9PiAhZC5ma19jbGFzcyA/IHVuZGVmaW5lZCA6IGAke2QuZmtfY2xhc3N9XyR7ZC50eXBlfWBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19wcm9wZXJ0eV9fdHlwZScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaExhYmVsKTogc3RyaW5nID0+ICFkLmZrX3Byb3BlcnR5ID8gdW5kZWZpbmVkIDogYCR7ZC5ma19wcm9wZXJ0eX1fJHtkLnR5cGV9YFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb2ZpbGVfX3R5cGUnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhMYWJlbCk6IHN0cmluZyA9PiAhZC5ma19wcm9maWxlID8gdW5kZWZpbmVkIDogYCR7ZC5ma19wcm9maWxlfV8ke2QudHlwZX1gXG4gICAgICB9XG4gICAgXVxuICB9LFxufTtcbiJdfQ==