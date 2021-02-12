/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/reducer-configs/tab.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var tabRoot = 'tab';
var ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.pk_cell.toString(); }, ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
function (item) { return item.fk_column + '_' + item.fk_row; };
/** @type {?} */
export var tabDefinitions = {
    cell: {
        indexBy: {
            keyInStore: 'pk_cell',
            indexByFn: (ɵ0)
        },
        groupBy: [
            {
                keyInStore: 'fk_column_fk_row',
                groupByFn: (ɵ1)
            }
        ]
    }
};
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3MvdGFiLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxNQUFNLEtBQU8sT0FBTyxHQUFHLEtBQUs7Ozs7O0FBTVgsVUFBQyxJQUFhLElBQUssT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUF2QixDQUF1Qjs7OztBQUt4QyxVQUFDLElBQWEsSUFBYSxPQUFBLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQWxDLENBQWtDOztBQVRoRixNQUFNLEtBQU8sY0FBYyxHQUE0QjtJQUNyRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsU0FBUztZQUNyQixTQUFTLE1BQTRDO1NBQ3REO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLGtCQUFrQjtnQkFDOUIsU0FBUyxNQUErRDthQUN6RTtTQUNGO0tBQ0Y7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnLi4vX2hlbHBlcnMnO1xuaW1wb3J0IHsgVGFiQ2VsbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5cbmV4cG9ydCBjb25zdCB0YWJSb290ID0gJ3RhYic7XG5cbmV4cG9ydCBjb25zdCB0YWJEZWZpbml0aW9uczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gPSB7XG4gIGNlbGw6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfY2VsbCcsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBUYWJDZWxsKSA9PiBpdGVtLnBrX2NlbGwudG9TdHJpbmcoKVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY29sdW1uX2ZrX3JvdycsXG4gICAgICAgIGdyb3VwQnlGbjogKGl0ZW06IFRhYkNlbGwpOiBzdHJpbmcgPT4gaXRlbS5ma19jb2x1bW4gKyAnXycgKyBpdGVtLmZrX3Jvd1xuICAgICAgfVxuICAgIF1cbiAgfVxufVxuIl19