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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy90YWIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE1BQU0sS0FBTyxPQUFPLEdBQUcsS0FBSzs7Ozs7QUFNWCxVQUFDLElBQWEsSUFBSyxPQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQXZCLENBQXVCOzs7O0FBS3hDLFVBQUMsSUFBYSxJQUFhLE9BQUEsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBbEMsQ0FBa0M7O0FBVGhGLE1BQU0sS0FBTyxjQUFjLEdBQTRCO0lBQ3JELElBQUksRUFBRTtRQUNKLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxTQUFTO1lBQ3JCLFNBQVMsTUFBNEM7U0FDdEQ7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsa0JBQWtCO2dCQUM5QixTQUFTLE1BQStEO2FBQ3pFO1NBQ0Y7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICcuLi9faGVscGVycyc7XG5pbXBvcnQgeyBUYWJDZWxsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcblxuZXhwb3J0IGNvbnN0IHRhYlJvb3QgPSAndGFiJztcblxuZXhwb3J0IGNvbnN0IHRhYkRlZmluaXRpb25zOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiA9IHtcbiAgY2VsbDoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19jZWxsJyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW06IFRhYkNlbGwpID0+IGl0ZW0ucGtfY2VsbC50b1N0cmluZygpXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19jb2x1bW5fZmtfcm93JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoaXRlbTogVGFiQ2VsbCk6IHN0cmluZyA9PiBpdGVtLmZrX2NvbHVtbiArICdfJyArIGl0ZW0uZmtfcm93XG4gICAgICB9XG4gICAgXVxuICB9XG59XG4iXX0=