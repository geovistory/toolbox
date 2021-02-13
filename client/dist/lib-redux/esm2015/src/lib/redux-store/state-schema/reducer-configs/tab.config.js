/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/reducer-configs/tab.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const tabRoot = 'tab';
const ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_cell.toString(), ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_column + '_' + item.fk_row;
/** @type {?} */
export const tabDefinitions = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3MvdGFiLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxNQUFNLE9BQU8sT0FBTyxHQUFHLEtBQUs7Ozs7O0FBTVgsQ0FBQyxJQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFOzs7O0FBS3hDLENBQUMsSUFBYSxFQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTTs7QUFUaEYsTUFBTSxPQUFPLGNBQWMsR0FBNEI7SUFDckQsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFNBQVM7WUFDckIsU0FBUyxNQUE0QztTQUN0RDtRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLFNBQVMsTUFBK0Q7YUFDekU7U0FDRjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzL3JlZHVjZXItZmFjdG9yeSc7XG5pbXBvcnQgeyBUYWJDZWxsIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcblxuZXhwb3J0IGNvbnN0IHRhYlJvb3QgPSAndGFiJztcblxuZXhwb3J0IGNvbnN0IHRhYkRlZmluaXRpb25zOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiA9IHtcbiAgY2VsbDoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19jZWxsJyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW06IFRhYkNlbGwpID0+IGl0ZW0ucGtfY2VsbC50b1N0cmluZygpXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19jb2x1bW5fZmtfcm93JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoaXRlbTogVGFiQ2VsbCk6IHN0cmluZyA9PiBpdGVtLmZrX2NvbHVtbiArICdfJyArIGl0ZW0uZmtfcm93XG4gICAgICB9XG4gICAgXVxuICB9XG59XG4iXX0=