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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3MvdGFiLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxNQUFNLE9BQU8sT0FBTyxHQUFHLEtBQUs7Ozs7O0FBTVgsQ0FBQyxJQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFOzs7O0FBS3hDLENBQUMsSUFBYSxFQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTTs7QUFUaEYsTUFBTSxPQUFPLGNBQWMsR0FBNEI7SUFDckQsSUFBSSxFQUFFO1FBQ0osT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFNBQVM7WUFDckIsU0FBUyxNQUE0QztTQUN0RDtRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLFNBQVMsTUFBK0Q7YUFDekU7U0FDRjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzJztcbmltcG9ydCB7IFRhYkNlbGwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuXG5leHBvcnQgY29uc3QgdGFiUm9vdCA9ICd0YWInO1xuXG5leHBvcnQgY29uc3QgdGFiRGVmaW5pdGlvbnM6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uID0ge1xuICBjZWxsOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2NlbGwnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogVGFiQ2VsbCkgPT4gaXRlbS5wa19jZWxsLnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2NvbHVtbl9ma19yb3cnLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtOiBUYWJDZWxsKTogc3RyaW5nID0+IGl0ZW0uZmtfY29sdW1uICsgJ18nICsgaXRlbS5ma19yb3dcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cbiJdfQ==