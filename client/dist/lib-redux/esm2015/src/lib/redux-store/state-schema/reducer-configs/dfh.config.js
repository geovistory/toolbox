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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3MvZGZoLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFNQSxNQUFNLE9BQU8sT0FBTyxHQUFHLEtBQUs7O0FBRTVCLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7QUFBRyxDQUFDLElBQXVCLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUUsQ0FBQTs7Ozs7QUFNdE0sQ0FBQyxJQUFnQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTs7OztBQU1oRCxDQUFDLElBQWMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFLMUMsQ0FBQyxDQUFXLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOzs7O0FBT2xELENBQUMsSUFBaUIsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVM7Ozs7QUFLcEYsQ0FBQyxDQUFjLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFOzs7O0FBSXBELENBQUMsQ0FBYyxFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTs7OztBQUluRCxDQUFDLENBQWMsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFJbEQsQ0FBQyxDQUFjLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxXQUFXOzs7O0FBSTlELENBQUMsQ0FBYyxFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsV0FBVzs7OztBQUk3RCxDQUFDLENBQWMsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7QUFZeEcsQ0FBQyxDQUFXLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTs7OztBQUk1RSxDQUFDLENBQVcsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFOzs7O0FBSWxGLENBQUMsQ0FBVyxFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7O0FBbkVuRyxNQUFNLE9BQU8sY0FBYyxHQUE0QjtJQUNyRCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsWUFBWTtZQUN4QixTQUFTLE1BQWtEO1NBQzVEO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsVUFBVTtZQUN0QixTQUFTLE1BQThDO1NBQ3hEO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLFNBQVMsTUFBa0Q7YUFDNUQ7U0FDRjtLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLG9DQUFvQztZQUNoRCxTQUFTLE1BQXdGO1NBQ2xHO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLGFBQWE7Z0JBQ3pCLFNBQVMsTUFBc0Q7YUFDaEU7WUFDRDtnQkFDRSxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsU0FBUyxNQUFxRDthQUMvRDtZQUNEO2dCQUNFLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixTQUFTLE1BQW9EO2FBQzlEO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLHlCQUF5QjtnQkFDckMsU0FBUyxNQUFnRTthQUMxRTtZQUNEO2dCQUNFLFVBQVUsRUFBRSx3QkFBd0I7Z0JBQ3BDLFNBQVMsTUFBK0Q7YUFDekU7WUFDRDtnQkFDRSxVQUFVLEVBQUUseUJBQXlCO2dCQUNyQyxTQUFTLE1BQTBHO2FBQ3BIO1NBQ0Y7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxnQkFBZ0I7U0FDNUI7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsZ0JBQWdCO2dCQUM1QixTQUFTLE9BQThFO2FBQ3hGO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLG1CQUFtQjtnQkFDL0IsU0FBUyxPQUFvRjthQUM5RjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLFNBQVMsT0FBa0Y7YUFDNUY7U0FDRjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzJztcbmltcG9ydCB7IERmaExhYmVsLCBEZmhQcm9maWxlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERmaFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcblxuaW1wb3J0IHsgRGZoQ2xhc3MgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuXG5leHBvcnQgY29uc3QgZGZoUm9vdCA9ICdkZmgnO1xuXG5leHBvcnQgY29uc3QgZGZoTGFiZWxCeUZrc0tleSA9IChpdGVtOiBQYXJ0aWFsPERmaExhYmVsPikgPT4gYCR7aXRlbS50eXBlIHx8IG51bGx9XyR7aXRlbS5sYW5ndWFnZSB8fCBudWxsfV8ke2l0ZW0uZmtfY2xhc3MgfHwgbnVsbH1fJHtpdGVtLmZrX3Byb2ZpbGUgfHwgbnVsbH1fJHtpdGVtLmZrX3Byb3BlcnR5IHx8IG51bGx9XyR7aXRlbS5ma19wcm9qZWN0IHx8IG51bGx9YDtcblxuZXhwb3J0IGNvbnN0IGRmaERlZmluaXRpb25zOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiA9IHtcbiAgcHJvZmlsZToge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19wcm9maWxlJyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW06IERmaFByb2ZpbGUpID0+IGl0ZW0ucGtfcHJvZmlsZS50b1N0cmluZygpXG4gICAgfVxuICB9LFxuICBrbGFzczoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19jbGFzcycsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBEZmhDbGFzcykgPT4gaXRlbS5wa19jbGFzcy50b1N0cmluZygpLFxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnYmFzaWNfdHlwZScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaENsYXNzKTogc3RyaW5nID0+IGQuYmFzaWNfdHlwZS50b1N0cmluZygpXG4gICAgICB9LFxuICAgIF1cbiAgfSxcbiAgcHJvcGVydHk6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfcHJvcGVydHlfX2hhc19kb21haW5fX2hhc19yYW5nZScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBEZmhQcm9wZXJ0eSkgPT4gaXRlbS5wa19wcm9wZXJ0eSArICdfJyArIGl0ZW0uaGFzX2RvbWFpbiArICdfJyArIGl0ZW0uaGFzX3JhbmdlXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdwa19wcm9wZXJ0eScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaFByb3BlcnR5KTogc3RyaW5nID0+IGQucGtfcHJvcGVydHkudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2hhc19kb21haW4nLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLmhhc19kb21haW4udG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2hhc19yYW5nZScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaFByb3BlcnR5KTogc3RyaW5nID0+IGQuaGFzX3JhbmdlLnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdoYXNfZG9tYWluX19ma19wcm9wZXJ0eScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaFByb3BlcnR5KTogc3RyaW5nID0+IGQuaGFzX2RvbWFpbiArICdfJyArIGQucGtfcHJvcGVydHlcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdoYXNfcmFuZ2VfX2ZrX3Byb3BlcnR5JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoUHJvcGVydHkpOiBzdHJpbmcgPT4gZC5oYXNfcmFuZ2UgKyAnXycgKyBkLnBrX3Byb3BlcnR5XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnaXNfaGFzX3R5cGVfc3VicHJvcGVydHknLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLmlzX2hhc190eXBlX3N1YnByb3BlcnR5ID8gZC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eS50b1N0cmluZygpIDogdW5kZWZpbmVkXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBsYWJlbDoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdma3MnLFxuICAgICAgaW5kZXhCeUZuOiBkZmhMYWJlbEJ5RmtzS2V5XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19jbGFzc19fdHlwZScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaExhYmVsKTogc3RyaW5nID0+ICFkLmZrX2NsYXNzID8gdW5kZWZpbmVkIDogYCR7ZC5ma19jbGFzc31fJHtkLnR5cGV9YFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb3BlcnR5X190eXBlJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoTGFiZWwpOiBzdHJpbmcgPT4gIWQuZmtfcHJvcGVydHkgPyB1bmRlZmluZWQgOiBgJHtkLmZrX3Byb3BlcnR5fV8ke2QudHlwZX1gXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfcHJvZmlsZV9fdHlwZScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaExhYmVsKTogc3RyaW5nID0+ICFkLmZrX3Byb2ZpbGUgPyB1bmRlZmluZWQgOiBgJHtkLmZrX3Byb2ZpbGV9XyR7ZC50eXBlfWBcbiAgICAgIH1cbiAgICBdXG4gIH0sXG59O1xuIl19