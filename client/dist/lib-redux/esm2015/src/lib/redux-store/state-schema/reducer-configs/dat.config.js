/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/reducer-configs/dat.config.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3MvZGF0LmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxNQUFNLE9BQU8sT0FBTyxHQUFHLEtBQUs7O0FBQzVCLE1BQU0sT0FBTyxXQUFXLEdBQUcsY0FBYzs7Ozs7O0FBSTdCLENBQUMsT0FBbUIsRUFBRSxPQUFtQixFQUFFLEVBQUU7SUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUMxRCxPQUFPLENBQ0wsT0FBTyxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUMsU0FBUztRQUN2QyxPQUFPLENBQUMsY0FBYyxLQUFLLE9BQU8sQ0FBQyxjQUFjLENBQ2xELENBQUE7QUFDSCxDQUFDOzs7O0FBR1ksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFOzs7O0FBS3hFLENBQUMsSUFBSSxFQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTs7OztBQUkzQyxDQUFDLElBQUksRUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Ozs7QUFRM0MsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOzs7O0FBS2pDLENBQUMsSUFBSSxFQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTs7OztBQVEzQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFLakMsQ0FBQyxJQUFJLEVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOzs7O0FBUTlDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTs7OztBQUtqQyxDQUFDLElBQTJCLEVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOzs7O0FBUXBFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTs7OztBQUtqQyxDQUFDLElBQXFCLEVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjOzs7O0FBUS9FLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTs7OztBQUtqQyxDQUFDLElBQUksRUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7O0FBckYvRCxNQUFNLE9BQU8sY0FBYyxHQUE0QjtJQUNyRCxPQUFPLEVBQUU7UUFDUCxNQUFNLE1BTUw7UUFDRCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsMkJBQTJCO1lBQ3ZDLFNBQVMsTUFBNEU7U0FDdEY7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsV0FBVztnQkFDdkIsU0FBUyxNQUE2QzthQUN2RDtZQUNEO2dCQUNFLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixTQUFTLE1BQTJDO2FBQ3JEO1NBQ0Y7S0FDRjtJQUNELEtBQUssRUFBRTs7UUFFTCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsV0FBVztZQUN2QixTQUFTLE1BQXFDO1NBQy9DO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFNBQVMsTUFBMkM7YUFDckQ7U0FDRjtLQUNGO0lBQ0QsTUFBTSxFQUFFOztRQUVOLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFNBQVMsTUFBcUM7U0FDL0M7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsU0FBUyxNQUE4QzthQUN4RDtTQUNGO0tBQ0Y7SUFDRCxvQkFBb0IsRUFBRTs7UUFFcEIsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFdBQVc7WUFDdkIsU0FBUyxNQUFxQztTQUMvQztRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixTQUFTLE1BQW9FO2FBQzlFO1NBQ0Y7S0FDRjtJQUNELGFBQWEsRUFBRTs7UUFFYixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsV0FBVztZQUN2QixTQUFTLE9BQXFDO1NBQy9DO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLDJCQUEyQjtnQkFDdkMsU0FBUyxPQUErRTthQUN6RjtTQUNGO0tBQ0Y7SUFDRCxTQUFTLEVBQUU7O1FBRVQsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFdBQVc7WUFDdkIsU0FBUyxPQUFxQztTQUMvQztRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxZQUFZO2dCQUN4QixTQUFTLE9BQThDO2FBQ3hEO1NBQ0Y7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0RGlnaXRhbCwgRGF0VGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnLi4vX2hlbHBlcnMvcmVkdWNlci1mYWN0b3J5JztcbmltcG9ydCB7IERhdENsYXNzQ29sdW1uTWFwcGluZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5cbmV4cG9ydCBjb25zdCBkYXRSb290ID0gJ2RhdCc7XG5leHBvcnQgY29uc3QgZmFjZXR0ZUJ5UGsgPSAnYnlfbmFtZXNwYWNlJztcblxuZXhwb3J0IGNvbnN0IGRhdERlZmluaXRpb25zOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiA9IHtcbiAgZGlnaXRhbDoge1xuICAgIGVxdWFsczogKG5ld0l0ZW06IERhdERpZ2l0YWwsIG9sZEl0ZW06IERhdERpZ2l0YWwpID0+IHtcbiAgICAgIGlmICghb2xkSXRlbS5xdWlsbF9kb2MgJiYgbmV3SXRlbS5xdWlsbF9kb2MpIHJldHVybiBmYWxzZTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIG5ld0l0ZW0ucGtfZW50aXR5ID09PSBvbGRJdGVtLnBrX2VudGl0eSAmJlxuICAgICAgICBuZXdJdGVtLmVudGl0eV92ZXJzaW9uID09PSBvbGRJdGVtLmVudGl0eV92ZXJzaW9uXG4gICAgICApXG4gICAgfSxcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5X19lbnRpdHlfdmVyc2lvbicsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpICsgJ18nICsgaXRlbS5lbnRpdHlfdmVyc2lvbi50b1N0cmluZygpXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtKTogc3RyaW5nID0+IGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdwa190ZXh0JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoaXRlbSk6IHN0cmluZyA9PiBpdGVtLnBrX3RleHQudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgY2h1bms6IHtcbiAgICAvLyBmYWNldHRlQnlQayxcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3RleHQnLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtKTogc3RyaW5nID0+IGl0ZW0uZmtfdGV4dC50b1N0cmluZygpXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBjb2x1bW46IHtcbiAgICAvLyBmYWNldHRlQnlQayxcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2RpZ2l0YWwnLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtKTogc3RyaW5nID0+IGl0ZW0uZmtfZGlnaXRhbC50b1N0cmluZygpXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBjbGFzc19jb2x1bW5fbWFwcGluZzoge1xuICAgIC8vIGZhY2V0dGVCeVBrLFxuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY29sdW1uJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoaXRlbTogRGF0Q2xhc3NDb2x1bW5NYXBwaW5nKTogc3RyaW5nID0+IGl0ZW0uZmtfY29sdW1uLnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHRleHRfcHJvcGVydHk6IHtcbiAgICAvLyBmYWNldHRlQnlQayxcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2VudGl0eV9fZmtfc3lzdGVtX3R5cGUnLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtOiBEYXRUZXh0UHJvcGVydHkpOiBzdHJpbmcgPT4gaXRlbS5ma19lbnRpdHkgKyAnXycgKyBpdGVtLmZrX3N5c3RlbV90eXBlXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBuYW1lc3BhY2U6IHtcbiAgICAvLyBmYWNldHRlQnlQayxcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtKTogc3RyaW5nID0+IGl0ZW0uZmtfcHJvamVjdC50b1N0cmluZygpXG4gICAgICB9XG4gICAgXVxuICB9XG59XG4iXX0=