/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/tab.config.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy90YWIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE1BQU0sS0FBTyxPQUFPLEdBQUcsS0FBSzs7Ozs7QUFNWCxVQUFDLElBQWEsSUFBSyxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQXZCLENBQXVCOzs7O0FBS3hDLFVBQUMsSUFBYSxJQUFhLE9BQUEsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBbEMsQ0FBa0M7O0FBVGhGLE1BQU0sS0FBTyxjQUFjLEdBQTRCO0lBQ3JELElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFNBQVMsTUFBNEM7U0FDdEQ7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsa0JBQWtCO2dCQUM5QixTQUFTLE1BQStEO2FBQ3pFO1NBQ0Y7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICcuLi9faGVscGVycy9yZWR1Y2VyLWZhY3RvcnknO1xuaW1wb3J0IHsgVGFiQ2VsbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5cbmV4cG9ydCBjb25zdCB0YWJSb290ID0gJ3RhYic7XG5cbmV4cG9ydCBjb25zdCB0YWJEZWZpbml0aW9uczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gPSB7XG4gIGNlbGw6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfY2VsbCcsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBUYWJDZWxsKSA9PiBpdGVtLnBrX2NlbGwudG9TdHJpbmcoKVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY29sdW1uX2ZrX3JvdycsXG4gICAgICAgIGdyb3VwQnlGbjogKGl0ZW06IFRhYkNlbGwpOiBzdHJpbmcgPT4gaXRlbS5ma19jb2x1bW4gKyAnXycgKyBpdGVtLmZrX3Jvd1xuICAgICAgfVxuICAgIF1cbiAgfVxufVxuIl19