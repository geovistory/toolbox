/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/reducer-configs/dfh.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const dfhRoot = 'dfh';
/** @type {?} */
export const dfhLabelByFksKey = (/**
 * @param {?} item
 * @return {?}
 */
(item) => `${item.type || null}_${item.language || null}_${item.fk_class || null}_${item.fk_profile || null}_${item.fk_property || null}_${item.fk_project || null}`);
const ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_profile.toString(), ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_class.toString(), ɵ2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.basic_type.toString(), ɵ3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_property + '_' + item.has_domain + '_' + item.has_range, ɵ4 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.pk_property.toString(), ɵ5 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_domain.toString(), ɵ6 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_range.toString(), ɵ7 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_domain + '_' + d.pk_property, ɵ8 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_range + '_' + d.pk_property, ɵ9 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.is_has_type_subproperty ? d.is_has_type_subproperty.toString() : undefined, ɵ10 = /**
 * @param {?} d
 * @return {?}
 */
(d) => !d.fk_class ? undefined : `${d.fk_class}_${d.type}`, ɵ11 = /**
 * @param {?} d
 * @return {?}
 */
(d) => !d.fk_property ? undefined : `${d.fk_property}_${d.type}`, ɵ12 = /**
 * @param {?} d
 * @return {?}
 */
(d) => !d.fk_profile ? undefined : `${d.fk_profile}_${d.type}`;
/** @type {?} */
export const dfhDefinitions = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3MvZGZoLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFNQSxNQUFNLE9BQU8sT0FBTyxHQUFHLEtBQUs7O0FBRTVCLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7QUFBRyxDQUFDLElBQXVCLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUUsQ0FBQTs7Ozs7QUFNdE0sQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTs7OztBQU1oRCxDQUFDLElBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFLMUMsQ0FBQyxDQUFXLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOzs7O0FBT2xELENBQUMsSUFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVM7Ozs7QUFLcEYsQ0FBQyxDQUFjLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFOzs7O0FBSXBELENBQUMsQ0FBYyxFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTs7OztBQUluRCxDQUFDLENBQWMsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFJbEQsQ0FBQyxDQUFjLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxXQUFXOzs7O0FBSTlELENBQUMsQ0FBYyxFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVzs7OztBQUk3RCxDQUFDLENBQWMsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7QUFZeEcsQ0FBQyxDQUFXLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTs7OztBQUk1RSxDQUFDLENBQVcsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFOzs7O0FBSWxGLENBQUMsQ0FBVyxFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7O0FBbkVuRyxNQUFNLE9BQU8sY0FBYyxHQUE0QjtJQUNyRCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsWUFBWTtZQUN4QixTQUFTLE1BQWtEO1NBQzVEO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsVUFBVTtZQUN0QixTQUFTLE1BQThDO1NBQ3hEO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLFNBQVMsTUFBa0Q7YUFDNUQ7U0FDRjtLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLG9DQUFvQztZQUNoRCxTQUFTLE1BQXdGO1NBQ2xHO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLGFBQWE7Z0JBQ3pCLFNBQVMsTUFBc0Q7YUFDaEU7WUFDRDtnQkFDRSxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsU0FBUyxNQUFxRDthQUMvRDtZQUNEO2dCQUNFLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixTQUFTLE1BQW9EO2FBQzlEO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLHlCQUF5QjtnQkFDckMsU0FBUyxNQUFnRTthQUMxRTtZQUNEO2dCQUNFLFVBQVUsRUFBRSx3QkFBd0I7Z0JBQ3BDLFNBQVMsTUFBK0Q7YUFDekU7WUFDRDtnQkFDRSxVQUFVLEVBQUUseUJBQXlCO2dCQUNyQyxTQUFTLE1BQTBHO2FBQ3BIO1NBQ0Y7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxnQkFBZ0I7U0FDNUI7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsZ0JBQWdCO2dCQUM1QixTQUFTLE9BQThFO2FBQ3hGO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLG1CQUFtQjtnQkFDL0IsU0FBUyxPQUFvRjthQUM5RjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLFNBQVMsT0FBa0Y7YUFDNUY7U0FDRjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzL3JlZHVjZXItZmFjdG9yeSc7XG5pbXBvcnQgeyBEZmhMYWJlbCwgRGZoUHJvZmlsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEZmhQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5cbmltcG9ydCB7IERmaENsYXNzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcblxuZXhwb3J0IGNvbnN0IGRmaFJvb3QgPSAnZGZoJztcblxuZXhwb3J0IGNvbnN0IGRmaExhYmVsQnlGa3NLZXkgPSAoaXRlbTogUGFydGlhbDxEZmhMYWJlbD4pID0+IGAke2l0ZW0udHlwZSB8fCBudWxsfV8ke2l0ZW0ubGFuZ3VhZ2UgfHwgbnVsbH1fJHtpdGVtLmZrX2NsYXNzIHx8IG51bGx9XyR7aXRlbS5ma19wcm9maWxlIHx8IG51bGx9XyR7aXRlbS5ma19wcm9wZXJ0eSB8fCBudWxsfV8ke2l0ZW0uZmtfcHJvamVjdCB8fCBudWxsfWA7XG5cbmV4cG9ydCBjb25zdCBkZmhEZWZpbml0aW9uczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gPSB7XG4gIHByb2ZpbGU6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfcHJvZmlsZScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBEZmhQcm9maWxlKSA9PiBpdGVtLnBrX3Byb2ZpbGUudG9TdHJpbmcoKVxuICAgIH1cbiAgfSxcbiAga2xhc3M6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfY2xhc3MnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogRGZoQ2xhc3MpID0+IGl0ZW0ucGtfY2xhc3MudG9TdHJpbmcoKSxcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2Jhc2ljX3R5cGUnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhDbGFzcyk6IHN0cmluZyA9PiBkLmJhc2ljX3R5cGUudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICBdXG4gIH0sXG4gIHByb3BlcnR5OiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX3Byb3BlcnR5X19oYXNfZG9tYWluX19oYXNfcmFuZ2UnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogRGZoUHJvcGVydHkpID0+IGl0ZW0ucGtfcHJvcGVydHkgKyAnXycgKyBpdGVtLmhhc19kb21haW4gKyAnXycgKyBpdGVtLmhhc19yYW5nZVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAncGtfcHJvcGVydHknLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLnBrX3Byb3BlcnR5LnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdoYXNfZG9tYWluJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoUHJvcGVydHkpOiBzdHJpbmcgPT4gZC5oYXNfZG9tYWluLnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdoYXNfcmFuZ2UnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLmhhc19yYW5nZS50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnaGFzX2RvbWFpbl9fZmtfcHJvcGVydHknLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLmhhc19kb21haW4gKyAnXycgKyBkLnBrX3Byb3BlcnR5XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnaGFzX3JhbmdlX19ma19wcm9wZXJ0eScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaFByb3BlcnR5KTogc3RyaW5nID0+IGQuaGFzX3JhbmdlICsgJ18nICsgZC5wa19wcm9wZXJ0eVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2lzX2hhc190eXBlX3N1YnByb3BlcnR5JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoUHJvcGVydHkpOiBzdHJpbmcgPT4gZC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSA/IGQuaXNfaGFzX3R5cGVfc3VicHJvcGVydHkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgbGFiZWw6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAnZmtzJyxcbiAgICAgIGluZGV4QnlGbjogZGZoTGFiZWxCeUZrc0tleVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY2xhc3NfX3R5cGUnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhMYWJlbCk6IHN0cmluZyA9PiAhZC5ma19jbGFzcyA/IHVuZGVmaW5lZCA6IGAke2QuZmtfY2xhc3N9XyR7ZC50eXBlfWBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19wcm9wZXJ0eV9fdHlwZScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaExhYmVsKTogc3RyaW5nID0+ICFkLmZrX3Byb3BlcnR5ID8gdW5kZWZpbmVkIDogYCR7ZC5ma19wcm9wZXJ0eX1fJHtkLnR5cGV9YFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb2ZpbGVfX3R5cGUnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhMYWJlbCk6IHN0cmluZyA9PiAhZC5ma19wcm9maWxlID8gdW5kZWZpbmVkIDogYCR7ZC5ma19wcm9maWxlfV8ke2QudHlwZX1gXG4gICAgICB9XG4gICAgXVxuICB9LFxufTtcbiJdfQ==