/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/reducer-configs/sys.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export var sysRoot = 'sys';
var ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
function (item) {
    return item.pk_entity.toString();
}, ɵ1 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.fk_class.toString(); }, ɵ2 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return d.required_by_sources.toString(); }, ɵ3 = /**
 * @param {?} d
 * @return {?}
 */
function (d) { return (d.required_by_sources || d.required_by_entities || d.required_by_basics) ? 'true' : 'false'; }, ɵ4 = /**
 * @return {?}
 */
function () { return 'main'; };
/** @type {?} */
export var sysDefinitions = {
    system_relevant_class: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ0)
        },
        groupBy: [
            {
                keyInStore: 'fk_class',
                groupByFn: (ɵ1)
            },
            {
                keyInStore: 'required_by_sources',
                groupByFn: (ɵ2)
            },
            {
                keyInStore: 'required',
                groupByFn: (ɵ3)
            }
        ]
    },
    config: {
        indexBy: {
            keyInStore: 'main',
            indexByFn: (ɵ4)
        }
    }
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3Mvc3lzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxNQUFNLEtBQU8sT0FBTyxHQUFHLEtBQUs7Ozs7O0FBTVgsVUFBQyxJQUFJO0lBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ2xDLENBQUM7Ozs7QUFLWSxVQUFDLENBQXlCLElBQWEsT0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFyQixDQUFxQjs7OztBQUk1RCxVQUFDLENBQXlCLElBQWEsT0FBQSxDQUFDLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLEVBQWhDLENBQWdDOzs7O0FBSXZFLFVBQUMsQ0FBeUIsSUFBYSxPQUFBLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQTVGLENBQTRGOzs7QUFPckksY0FBTSxPQUFBLE1BQU0sRUFBTixDQUFNOztBQTFCN0IsTUFBTSxLQUFPLGNBQWMsR0FBNEI7SUFDckQscUJBQXFCLEVBQUU7UUFDckIsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFdBQVc7WUFDdkIsU0FBUyxNQUVSO1NBQ0Y7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsVUFBVTtnQkFDdEIsU0FBUyxNQUE4RDthQUN4RTtZQUNEO2dCQUNFLFVBQVUsRUFBRSxxQkFBcUI7Z0JBQ2pDLFNBQVMsTUFBeUU7YUFDbkY7WUFDRDtnQkFDRSxVQUFVLEVBQUUsVUFBVTtnQkFDdEIsU0FBUyxNQUFxSTthQUMvSTtTQUNGO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsTUFBTTtZQUNsQixTQUFTLE1BQWM7U0FDeEI7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICcuLi9faGVscGVycyc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcblxuZXhwb3J0IGNvbnN0IHN5c1Jvb3QgPSAnc3lzJztcblxuZXhwb3J0IGNvbnN0IHN5c0RlZmluaXRpb25zOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiA9IHtcbiAgc3lzdGVtX3JlbGV2YW50X2NsYXNzOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgICB9XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19jbGFzcycsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MpOiBzdHJpbmcgPT4gZC5ma19jbGFzcy50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAncmVxdWlyZWRfYnlfc291cmNlcycsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MpOiBzdHJpbmcgPT4gZC5yZXF1aXJlZF9ieV9zb3VyY2VzLnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdyZXF1aXJlZCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MpOiBzdHJpbmcgPT4gKGQucmVxdWlyZWRfYnlfc291cmNlcyB8fCBkLnJlcXVpcmVkX2J5X2VudGl0aWVzIHx8IGQucmVxdWlyZWRfYnlfYmFzaWNzKSA/ICd0cnVlJyA6ICdmYWxzZSdcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIGNvbmZpZzoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdtYWluJyxcbiAgICAgIGluZGV4QnlGbjogKCkgPT4gJ21haW4nXG4gICAgfVxuICB9XG59XG4iXX0=