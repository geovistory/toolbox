/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/dat.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var datRoot = 'dat';
/** @type {?} */
export var facetteByPk = 'by_namespace';
var ɵ0 = /**
 * @param {?} newItem
 * @param {?} oldItem
 * @return {?}
 */
function (newItem, oldItem) {
    if (!oldItem.quill_doc && newItem.quill_doc)
        return false;
    return (newItem.pk_entity === oldItem.pk_entity &&
        newItem.entity_version === oldItem.entity_version);
}, ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString() + '_' + item.entity_version.toString(); }, ɵ2 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ3 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_text.toString(); }, ɵ4 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ5 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_text.toString(); }, ɵ6 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ7 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_digital.toString(); }, ɵ8 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ9 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_column.toString(); }, ɵ10 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ11 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_entity + '_' + item.fk_system_type; }, ɵ12 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_entity.toString(); }, ɵ13 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_project.toString(); };
/** @type {?} */
export var datDefinitions = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy9kYXQuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBLE1BQU0sS0FBTyxPQUFPLEdBQUcsS0FBSzs7QUFDNUIsTUFBTSxLQUFPLFdBQVcsR0FBRyxjQUFjOzs7Ozs7QUFJN0IsVUFBQyxPQUFtQixFQUFFLE9BQW1CO0lBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDMUQsT0FBTyxDQUNMLE9BQU8sQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLFNBQVM7UUFDdkMsT0FBTyxDQUFDLGNBQWMsS0FBSyxPQUFPLENBQUMsY0FBYyxDQUNsRCxDQUFBO0FBQ0gsQ0FBQzs7OztBQUdZLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBaEUsQ0FBZ0U7Ozs7QUFLeEUsVUFBQyxJQUFJLElBQWEsT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUF6QixDQUF5Qjs7OztBQUkzQyxVQUFDLElBQUksSUFBYSxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQXZCLENBQXVCOzs7O0FBUTNDLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBekIsQ0FBeUI7Ozs7QUFLakMsVUFBQyxJQUFJLElBQWEsT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUF2QixDQUF1Qjs7OztBQVEzQyxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQXpCLENBQXlCOzs7O0FBS2pDLFVBQUMsSUFBSSxJQUFhLE9BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBMUIsQ0FBMEI7Ozs7QUFROUMsVUFBQyxJQUFJLElBQUssT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUF6QixDQUF5Qjs7OztBQUtqQyxVQUFDLElBQTJCLElBQWEsT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUF6QixDQUF5Qjs7OztBQVFwRSxVQUFDLElBQUksSUFBSyxPQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQXpCLENBQXlCOzs7O0FBS2pDLFVBQUMsSUFBcUIsSUFBYSxPQUFBLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQTFDLENBQTBDOzs7O0FBUS9FLFVBQUMsSUFBSSxJQUFLLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBekIsQ0FBeUI7Ozs7QUFLakMsVUFBQyxJQUFJLElBQWEsT0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUExQixDQUEwQjs7QUFyRi9ELE1BQU0sS0FBTyxjQUFjLEdBQTRCO0lBQ3JELE9BQU8sRUFBRTtRQUNQLE1BQU0sTUFNTDtRQUNELE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSwyQkFBMkI7WUFDdkMsU0FBUyxNQUE0RTtTQUN0RjtRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixTQUFTLE1BQTZDO2FBQ3ZEO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFNBQVMsTUFBMkM7YUFDckQ7U0FDRjtLQUNGO0lBQ0QsS0FBSyxFQUFFOztRQUVMLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFNBQVMsTUFBcUM7U0FDL0M7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsU0FBUztnQkFDckIsU0FBUyxNQUEyQzthQUNyRDtTQUNGO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7O1FBRU4sT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFdBQVc7WUFDdkIsU0FBUyxNQUFxQztTQUMvQztRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixTQUFTLE1BQThDO2FBQ3hEO1NBQ0Y7S0FDRjtJQUNELG9CQUFvQixFQUFFOztRQUVwQixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsV0FBVztZQUN2QixTQUFTLE1BQXFDO1NBQy9DO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLFdBQVc7Z0JBQ3ZCLFNBQVMsTUFBb0U7YUFDOUU7U0FDRjtLQUNGO0lBQ0QsYUFBYSxFQUFFOztRQUViLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFNBQVMsT0FBcUM7U0FDL0M7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsMkJBQTJCO2dCQUN2QyxTQUFTLE9BQStFO2FBQ3pGO1NBQ0Y7S0FDRjtJQUNELFNBQVMsRUFBRTs7UUFFVCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsV0FBVztZQUN2QixTQUFTLE9BQXFDO1NBQy9DO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLFNBQVMsT0FBOEM7YUFDeEQ7U0FDRjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXREaWdpdGFsLCBEYXRUZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICcuLi9faGVscGVycy9yZWR1Y2VyLWZhY3RvcnknO1xuaW1wb3J0IHsgRGF0Q2xhc3NDb2x1bW5NYXBwaW5nIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcblxuZXhwb3J0IGNvbnN0IGRhdFJvb3QgPSAnZGF0JztcbmV4cG9ydCBjb25zdCBmYWNldHRlQnlQayA9ICdieV9uYW1lc3BhY2UnO1xuXG5leHBvcnQgY29uc3QgZGF0RGVmaW5pdGlvbnM6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uID0ge1xuICBkaWdpdGFsOiB7XG4gICAgZXF1YWxzOiAobmV3SXRlbTogRGF0RGlnaXRhbCwgb2xkSXRlbTogRGF0RGlnaXRhbCkgPT4ge1xuICAgICAgaWYgKCFvbGRJdGVtLnF1aWxsX2RvYyAmJiBuZXdJdGVtLnF1aWxsX2RvYykgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbmV3SXRlbS5wa19lbnRpdHkgPT09IG9sZEl0ZW0ucGtfZW50aXR5ICYmXG4gICAgICAgIG5ld0l0ZW0uZW50aXR5X3ZlcnNpb24gPT09IG9sZEl0ZW0uZW50aXR5X3ZlcnNpb25cbiAgICAgIClcbiAgICB9LFxuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHlfX2VudGl0eV92ZXJzaW9uJyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKCkgKyAnXycgKyBpdGVtLmVudGl0eV92ZXJzaW9uLnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICAgIGdyb3VwQnlGbjogKGl0ZW0pOiBzdHJpbmcgPT4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ3BrX3RleHQnLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtKTogc3RyaW5nID0+IGl0ZW0ucGtfdGV4dC50b1N0cmluZygpXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBjaHVuazoge1xuICAgIC8vIGZhY2V0dGVCeVBrLFxuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfdGV4dCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGl0ZW0pOiBzdHJpbmcgPT4gaXRlbS5ma190ZXh0LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIGNvbHVtbjoge1xuICAgIC8vIGZhY2V0dGVCeVBrLFxuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfZGlnaXRhbCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGl0ZW0pOiBzdHJpbmcgPT4gaXRlbS5ma19kaWdpdGFsLnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIGNsYXNzX2NvbHVtbl9tYXBwaW5nOiB7XG4gICAgLy8gZmFjZXR0ZUJ5UGssXG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19jb2x1bW4nLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtOiBEYXRDbGFzc0NvbHVtbk1hcHBpbmcpOiBzdHJpbmcgPT4gaXRlbS5ma19jb2x1bW4udG9TdHJpbmcoKVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgdGV4dF9wcm9wZXJ0eToge1xuICAgIC8vIGZhY2V0dGVCeVBrLFxuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfZW50aXR5X19ma19zeXN0ZW1fdHlwZScsXG4gICAgICAgIGdyb3VwQnlGbjogKGl0ZW06IERhdFRleHRQcm9wZXJ0eSk6IHN0cmluZyA9PiBpdGVtLmZrX2VudGl0eSArICdfJyArIGl0ZW0uZmtfc3lzdGVtX3R5cGVcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIG5hbWVzcGFjZToge1xuICAgIC8vIGZhY2V0dGVCeVBrLFxuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfcHJvamVjdCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGl0ZW0pOiBzdHJpbmcgPT4gaXRlbS5ma19wcm9qZWN0LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cbiJdfQ==