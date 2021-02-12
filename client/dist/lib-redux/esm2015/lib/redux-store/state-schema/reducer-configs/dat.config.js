/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/dat.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const datRoot = 'dat';
/** @type {?} */
export const facetteByPk = 'by_namespace';
const ɵ0 = /**
 * @param {?} newItem
 * @param {?} oldItem
 * @return {?}
 */
(newItem, oldItem) => {
    if (!oldItem.quill_doc && newItem.quill_doc)
        return false;
    return (newItem.pk_entity === oldItem.pk_entity &&
        newItem.entity_version === oldItem.entity_version);
}, ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString() + '_' + item.entity_version.toString(), ɵ2 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_text.toString(), ɵ4 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ5 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_text.toString(), ɵ6 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ7 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_digital.toString(), ɵ8 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ9 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_column.toString(), ɵ10 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ11 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_entity + '_' + item.fk_system_type, ɵ12 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ13 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_project.toString();
/** @type {?} */
export const datDefinitions = {
    digital: {
        equals: (ɵ0),
        indexBy: {
            keyInStore: 'pk_entity__entity_version',
            indexByFn: (ɵ1)
        },
        groupBy: [
            {
                keyInStore: 'pk_entity',
                groupByFn: (ɵ2)
            },
            {
                keyInStore: 'pk_text',
                groupByFn: (ɵ3)
            }
        ]
    },
    chunk: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ4)
        },
        groupBy: [
            {
                keyInStore: 'fk_text',
                groupByFn: (ɵ5)
            }
        ]
    },
    column: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ6)
        },
        groupBy: [
            {
                keyInStore: 'fk_digital',
                groupByFn: (ɵ7)
            }
        ]
    },
    class_column_mapping: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ8)
        },
        groupBy: [
            {
                keyInStore: 'fk_column',
                groupByFn: (ɵ9)
            }
        ]
    },
    text_property: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ10)
        },
        groupBy: [
            {
                keyInStore: 'fk_entity__fk_system_type',
                groupByFn: (ɵ11)
            }
        ]
    },
    namespace: {
        // facetteByPk,
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ12)
        },
        groupBy: [
            {
                keyInStore: 'fk_project',
                groupByFn: (ɵ13)
            }
        ]
    }
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10, ɵ11, ɵ12, ɵ13 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy9kYXQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBLE1BQU0sT0FBTyxPQUFPLEdBQUcsS0FBSzs7QUFDNUIsTUFBTSxPQUFPLFdBQVcsR0FBRyxjQUFjOzs7Ozs7QUFJN0IsQ0FBQyxPQUFtQixFQUFFLE9BQW1CLEVBQUUsRUFBRTtJQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBQzFELE9BQU8sQ0FDTCxPQUFPLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQyxTQUFTO1FBQ3ZDLE9BQU8sQ0FBQyxjQUFjLEtBQUssT0FBTyxDQUFDLGNBQWMsQ0FDbEQsQ0FBQTtBQUNILENBQUM7Ozs7QUFHWSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFLeEUsQ0FBQyxJQUFJLEVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOzs7O0FBSTNDLENBQUMsSUFBSSxFQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTs7OztBQVEzQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFLakMsQ0FBQyxJQUFJLEVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFOzs7O0FBUTNDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTs7OztBQUtqQyxDQUFDLElBQUksRUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFROUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOzs7O0FBS2pDLENBQUMsSUFBMkIsRUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFRcEUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOzs7O0FBS2pDLENBQUMsSUFBcUIsRUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWM7Ozs7QUFRL0UsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOzs7O0FBS2pDLENBQUMsSUFBSSxFQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTs7QUFyRi9ELE1BQU0sT0FBTyxjQUFjLEdBQTRCO0lBQ3JELE9BQU8sRUFBRTtRQUNQLE1BQU0sTUFNTDtRQUNELE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSwyQkFBMkI7WUFDdkMsU0FBUyxNQUE0RTtTQUN0RjtRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixTQUFTLE1BQTZDO2FBQ3ZEO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFNBQVMsTUFBMkM7YUFDckQ7U0FDRjtLQUNGO0lBQ0QsS0FBSyxFQUFFOztRQUVMLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFNBQVMsTUFBcUM7U0FDL0M7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsU0FBUztnQkFDckIsU0FBUyxNQUEyQzthQUNyRDtTQUNGO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7O1FBRU4sT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFdBQVc7WUFDdkIsU0FBUyxNQUFxQztTQUMvQztRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixTQUFTLE1BQThDO2FBQ3hEO1NBQ0Y7S0FDRjtJQUNELG9CQUFvQixFQUFFOztRQUVwQixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsV0FBVztZQUN2QixTQUFTLE1BQXFDO1NBQy9DO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLFNBQVMsTUFBb0U7YUFDOUU7U0FDRjtLQUNGO0lBQ0QsYUFBYSxFQUFFOztRQUViLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFNBQVMsT0FBcUM7U0FDL0M7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsMkJBQTJCO2dCQUN2QyxTQUFTLE9BQStFO2FBQ3pGO1NBQ0Y7S0FDRjtJQUNELFNBQVMsRUFBRTs7UUFFVCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsV0FBVztZQUN2QixTQUFTLE9BQXFDO1NBQy9DO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLFNBQVMsT0FBOEM7YUFDeEQ7U0FDRjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXREaWdpdGFsLCBEYXRUZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICcuLi9faGVscGVycyc7XG5pbXBvcnQgeyBEYXRDbGFzc0NvbHVtbk1hcHBpbmcgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuXG5leHBvcnQgY29uc3QgZGF0Um9vdCA9ICdkYXQnO1xuZXhwb3J0IGNvbnN0IGZhY2V0dGVCeVBrID0gJ2J5X25hbWVzcGFjZSc7XG5cbmV4cG9ydCBjb25zdCBkYXREZWZpbml0aW9uczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gPSB7XG4gIGRpZ2l0YWw6IHtcbiAgICBlcXVhbHM6IChuZXdJdGVtOiBEYXREaWdpdGFsLCBvbGRJdGVtOiBEYXREaWdpdGFsKSA9PiB7XG4gICAgICBpZiAoIW9sZEl0ZW0ucXVpbGxfZG9jICYmIG5ld0l0ZW0ucXVpbGxfZG9jKSByZXR1cm4gZmFsc2U7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBuZXdJdGVtLnBrX2VudGl0eSA9PT0gb2xkSXRlbS5wa19lbnRpdHkgJiZcbiAgICAgICAgbmV3SXRlbS5lbnRpdHlfdmVyc2lvbiA9PT0gb2xkSXRlbS5lbnRpdHlfdmVyc2lvblxuICAgICAgKVxuICAgIH0sXG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eV9fZW50aXR5X3ZlcnNpb24nLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKSArICdfJyArIGl0ZW0uZW50aXR5X3ZlcnNpb24udG9TdHJpbmcoKVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoaXRlbSk6IHN0cmluZyA9PiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAncGtfdGV4dCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGl0ZW0pOiBzdHJpbmcgPT4gaXRlbS5wa190ZXh0LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIGNodW5rOiB7XG4gICAgLy8gZmFjZXR0ZUJ5UGssXG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma190ZXh0JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoaXRlbSk6IHN0cmluZyA9PiBpdGVtLmZrX3RleHQudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgY29sdW1uOiB7XG4gICAgLy8gZmFjZXR0ZUJ5UGssXG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19kaWdpdGFsJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoaXRlbSk6IHN0cmluZyA9PiBpdGVtLmZrX2RpZ2l0YWwudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgY2xhc3NfY29sdW1uX21hcHBpbmc6IHtcbiAgICAvLyBmYWNldHRlQnlQayxcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2NvbHVtbicsXG4gICAgICAgIGdyb3VwQnlGbjogKGl0ZW06IERhdENsYXNzQ29sdW1uTWFwcGluZyk6IHN0cmluZyA9PiBpdGVtLmZrX2NvbHVtbi50b1N0cmluZygpXG4gICAgICB9XG4gICAgXVxuICB9LFxuICB0ZXh0X3Byb3BlcnR5OiB7XG4gICAgLy8gZmFjZXR0ZUJ5UGssXG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19lbnRpdHlfX2ZrX3N5c3RlbV90eXBlJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoaXRlbTogRGF0VGV4dFByb3BlcnR5KTogc3RyaW5nID0+IGl0ZW0uZmtfZW50aXR5ICsgJ18nICsgaXRlbS5ma19zeXN0ZW1fdHlwZVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgbmFtZXNwYWNlOiB7XG4gICAgLy8gZmFjZXR0ZUJ5UGssXG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19wcm9qZWN0JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoaXRlbSk6IHN0cmluZyA9PiBpdGVtLmZrX3Byb2plY3QudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIF1cbiAgfVxufVxuIl19