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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3MvdGFiLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxNQUFNLEtBQU8sT0FBTyxHQUFHLEtBQUs7Ozs7O0FBTVgsVUFBQyxJQUFhLElBQUssT0FBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUF2QixDQUF1Qjs7OztBQUt4QyxVQUFDLElBQWEsSUFBYSxPQUFBLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQWxDLENBQWtDOztBQVRoRixNQUFNLEtBQU8sY0FBYyxHQUE0QjtJQUNyRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsU0FBUztZQUNyQixTQUFTLE1BQTRDO1NBQ3REO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLGtCQUFrQjtnQkFDOUIsU0FBUyxNQUErRDthQUN6RTtTQUNGO0tBQ0Y7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnLi4vX2hlbHBlcnMvcmVkdWNlci1mYWN0b3J5JztcbmltcG9ydCB7IFRhYkNlbGwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuXG5leHBvcnQgY29uc3QgdGFiUm9vdCA9ICd0YWInO1xuXG5leHBvcnQgY29uc3QgdGFiRGVmaW5pdGlvbnM6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uID0ge1xuICBjZWxsOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2NlbGwnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogVGFiQ2VsbCkgPT4gaXRlbS5wa19jZWxsLnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2NvbHVtbl9ma19yb3cnLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtOiBUYWJDZWxsKTogc3RyaW5nID0+IGl0ZW0uZmtfY29sdW1uICsgJ18nICsgaXRlbS5ma19yb3dcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cbiJdfQ==