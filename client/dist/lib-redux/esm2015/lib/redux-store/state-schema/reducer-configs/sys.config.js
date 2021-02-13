/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/sys.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const sysRoot = 'sys';
const ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
(item) => {
    return item.pk_entity.toString();
}, ɵ1 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_class.toString(), ɵ2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.required_by_sources.toString(), ɵ3 = /**
 * @param {?} d
 * @return {?}
 */
(d) => (d.required_by_sources || d.required_by_entities || d.required_by_basics) ? 'true' : 'false', ɵ4 = /**
 * @return {?}
 */
() => 'main';
/** @type {?} */
export const sysDefinitions = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy9zeXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE1BQU0sT0FBTyxPQUFPLEdBQUcsS0FBSzs7Ozs7QUFNWCxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNsQyxDQUFDOzs7O0FBS1ksQ0FBQyxDQUF5QixFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTs7OztBQUk1RCxDQUFDLENBQXlCLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFJdkUsQ0FBQyxDQUF5QixFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsb0JBQW9CLElBQUksQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTzs7O0FBT3JJLEdBQUcsRUFBRSxDQUFDLE1BQU07O0FBMUI3QixNQUFNLE9BQU8sY0FBYyxHQUE0QjtJQUNyRCxxQkFBcUIsRUFBRTtRQUNyQixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsV0FBVztZQUN2QixTQUFTLE1BRVI7U0FDRjtRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixTQUFTLE1BQThEO2FBQ3hFO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLHFCQUFxQjtnQkFDakMsU0FBUyxNQUF5RTthQUNuRjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixTQUFTLE1BQXFJO2FBQy9JO1NBQ0Y7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLFNBQVMsTUFBYztTQUN4QjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzL3JlZHVjZXItZmFjdG9yeSc7XG5pbXBvcnQgeyBTeXNTeXN0ZW1SZWxldmFudENsYXNzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcblxuZXhwb3J0IGNvbnN0IHN5c1Jvb3QgPSAnc3lzJztcblxuZXhwb3J0IGNvbnN0IHN5c0RlZmluaXRpb25zOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiA9IHtcbiAgc3lzdGVtX3JlbGV2YW50X2NsYXNzOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiB7XG4gICAgICAgIHJldHVybiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgICB9XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19jbGFzcycsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MpOiBzdHJpbmcgPT4gZC5ma19jbGFzcy50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAncmVxdWlyZWRfYnlfc291cmNlcycsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MpOiBzdHJpbmcgPT4gZC5yZXF1aXJlZF9ieV9zb3VyY2VzLnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdyZXF1aXJlZCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MpOiBzdHJpbmcgPT4gKGQucmVxdWlyZWRfYnlfc291cmNlcyB8fCBkLnJlcXVpcmVkX2J5X2VudGl0aWVzIHx8IGQucmVxdWlyZWRfYnlfYmFzaWNzKSA/ICd0cnVlJyA6ICdmYWxzZSdcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIGNvbmZpZzoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdtYWluJyxcbiAgICAgIGluZGV4QnlGbjogKCkgPT4gJ21haW4nXG4gICAgfVxuICB9XG59XG4iXX0=