/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/tab.config.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy90YWIuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE1BQU0sT0FBTyxPQUFPLEdBQUcsS0FBSzs7Ozs7QUFNWCxDQUFDLElBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Ozs7QUFLeEMsQ0FBQyxJQUFhLEVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNOztBQVRoRixNQUFNLE9BQU8sY0FBYyxHQUE0QjtJQUNyRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsU0FBUztZQUNyQixTQUFTLE1BQTRDO1NBQ3REO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLGtCQUFrQjtnQkFDOUIsU0FBUyxNQUErRDthQUN6RTtTQUNGO0tBQ0Y7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uIH0gZnJvbSAnLi4vX2hlbHBlcnMvcmVkdWNlci1mYWN0b3J5JztcbmltcG9ydCB7IFRhYkNlbGwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuXG5leHBvcnQgY29uc3QgdGFiUm9vdCA9ICd0YWInO1xuXG5leHBvcnQgY29uc3QgdGFiRGVmaW5pdGlvbnM6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uID0ge1xuICBjZWxsOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2NlbGwnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogVGFiQ2VsbCkgPT4gaXRlbS5wa19jZWxsLnRvU3RyaW5nKClcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2NvbHVtbl9ma19yb3cnLFxuICAgICAgICBncm91cEJ5Rm46IChpdGVtOiBUYWJDZWxsKTogc3RyaW5nID0+IGl0ZW0uZmtfY29sdW1uICsgJ18nICsgaXRlbS5ma19yb3dcbiAgICAgIH1cbiAgICBdXG4gIH1cbn1cbiJdfQ==