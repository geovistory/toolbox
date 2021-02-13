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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3Mvc3lzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSxNQUFNLEtBQU8sT0FBTyxHQUFHLEtBQUs7Ozs7O0FBTVgsVUFBQyxJQUFJO0lBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQ2xDLENBQUM7Ozs7QUFLWSxVQUFDLENBQXlCLElBQWEsT0FBQSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFyQixDQUFxQjs7OztBQUk1RCxVQUFDLENBQXlCLElBQWEsT0FBQSxDQUFDLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLEVBQWhDLENBQWdDOzs7O0FBSXZFLFVBQUMsQ0FBeUIsSUFBYSxPQUFBLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixJQUFJLENBQUMsQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQTVGLENBQTRGOzs7QUFPckksY0FBTSxPQUFBLE1BQU0sRUFBTixDQUFNOztBQTFCN0IsTUFBTSxLQUFPLGNBQWMsR0FBNEI7SUFDckQscUJBQXFCLEVBQUU7UUFDckIsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLFdBQVc7WUFDdkIsU0FBUyxNQUVSO1NBQ0Y7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsVUFBVTtnQkFDdEIsU0FBUyxNQUE4RDthQUN4RTtZQUNEO2dCQUNFLFVBQVUsRUFBRSxxQkFBcUI7Z0JBQ2pDLFNBQVMsTUFBeUU7YUFDbkY7WUFDRDtnQkFDRSxVQUFVLEVBQUUsVUFBVTtnQkFDdEIsU0FBUyxNQUFxSTthQUMvSTtTQUNGO0tBQ0Y7SUFDRCxNQUFNLEVBQUU7UUFDTixPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsTUFBTTtZQUNsQixTQUFTLE1BQWM7U0FDeEI7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICcuLi9faGVscGVycy9yZWR1Y2VyLWZhY3RvcnknO1xuaW1wb3J0IHsgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5cbmV4cG9ydCBjb25zdCBzeXNSb290ID0gJ3N5cyc7XG5cbmV4cG9ydCBjb25zdCBzeXNEZWZpbml0aW9uczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gPSB7XG4gIHN5c3RlbV9yZWxldmFudF9jbGFzczoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4ge1xuICAgICAgICByZXR1cm4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfY2xhc3MnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBTeXNTeXN0ZW1SZWxldmFudENsYXNzKTogc3RyaW5nID0+IGQuZmtfY2xhc3MudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ3JlcXVpcmVkX2J5X3NvdXJjZXMnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBTeXNTeXN0ZW1SZWxldmFudENsYXNzKTogc3RyaW5nID0+IGQucmVxdWlyZWRfYnlfc291cmNlcy50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAncmVxdWlyZWQnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBTeXNTeXN0ZW1SZWxldmFudENsYXNzKTogc3RyaW5nID0+IChkLnJlcXVpcmVkX2J5X3NvdXJjZXMgfHwgZC5yZXF1aXJlZF9ieV9lbnRpdGllcyB8fCBkLnJlcXVpcmVkX2J5X2Jhc2ljcykgPyAndHJ1ZScgOiAnZmFsc2UnXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBjb25maWc6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAnbWFpbicsXG4gICAgICBpbmRleEJ5Rm46ICgpID0+ICdtYWluJ1xuICAgIH1cbiAgfVxufVxuIl19