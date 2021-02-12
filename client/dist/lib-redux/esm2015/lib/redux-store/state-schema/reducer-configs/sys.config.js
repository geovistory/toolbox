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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy9zeXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE1BQU0sT0FBTyxPQUFPLEdBQUcsS0FBSzs7Ozs7QUFNWCxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ2xCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUNsQyxDQUFDOzs7O0FBS1ksQ0FBQyxDQUF5QixFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTs7OztBQUk1RCxDQUFDLENBQXlCLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFJdkUsQ0FBQyxDQUF5QixFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsb0JBQW9CLElBQUksQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTzs7O0FBT3JJLEdBQUcsRUFBRSxDQUFDLE1BQU07O0FBMUI3QixNQUFNLE9BQU8sY0FBYyxHQUE0QjtJQUNyRCxxQkFBcUIsRUFBRTtRQUNyQixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsV0FBVztZQUN2QixTQUFTLE1BRVI7U0FDRjtRQUNELE9BQU8sRUFBRTtZQUNQO2dCQUNFLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixTQUFTLE1BQThEO2FBQ3hFO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLHFCQUFxQjtnQkFDakMsU0FBUyxNQUF5RTthQUNuRjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixTQUFTLE1BQXFJO2FBQy9JO1NBQ0Y7S0FDRjtJQUNELE1BQU0sRUFBRTtRQUNOLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxNQUFNO1lBQ2xCLFNBQVMsTUFBYztTQUN4QjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzJztcbmltcG9ydCB7IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuXG5leHBvcnQgY29uc3Qgc3lzUm9vdCA9ICdzeXMnO1xuXG5leHBvcnQgY29uc3Qgc3lzRGVmaW5pdGlvbnM6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uID0ge1xuICBzeXN0ZW1fcmVsZXZhbnRfY2xhc3M6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2NsYXNzJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyk6IHN0cmluZyA9PiBkLmZrX2NsYXNzLnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdyZXF1aXJlZF9ieV9zb3VyY2VzJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyk6IHN0cmluZyA9PiBkLnJlcXVpcmVkX2J5X3NvdXJjZXMudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ3JlcXVpcmVkJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyk6IHN0cmluZyA9PiAoZC5yZXF1aXJlZF9ieV9zb3VyY2VzIHx8IGQucmVxdWlyZWRfYnlfZW50aXRpZXMgfHwgZC5yZXF1aXJlZF9ieV9iYXNpY3MpID8gJ3RydWUnIDogJ2ZhbHNlJ1xuICAgICAgfVxuICAgIF1cbiAgfSxcbiAgY29uZmlnOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ21haW4nLFxuICAgICAgaW5kZXhCeUZuOiAoKSA9PiAnbWFpbidcbiAgICB9XG4gIH1cbn1cbiJdfQ==