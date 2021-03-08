/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/dfh.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const dfhRoot = 'dfh';
/** @type {?} */
export const dfhLabelByFksKey = (/**
 * @param {?} item
 * @return {?}
 */
(item) => `${item.type || null}_${item.language || null}_${item.fk_class || null}_${item.fk_profile || null}_${item.fk_property || null}_${item.fk_project || null}`);
const ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_profile.toString(), ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_class.toString(), ɵ2 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.basic_type.toString(), ɵ3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_property + '_' + item.has_domain + '_' + item.has_range, ɵ4 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.pk_property.toString(), ɵ5 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_domain.toString(), ɵ6 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.has_range.toString(), ɵ7 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.is_has_type_subproperty ? d.is_has_type_subproperty.toString() : undefined, ɵ8 = /**
 * @param {?} d
 * @return {?}
 */
(d) => !d.fk_class ? undefined : `${d.fk_class}_${d.type}`, ɵ9 = /**
 * @param {?} d
 * @return {?}
 */
(d) => !d.fk_property ? undefined : `${d.fk_property}_${d.type}`, ɵ10 = /**
 * @param {?} d
 * @return {?}
 */
(d) => !d.fk_profile ? undefined : `${d.fk_profile}_${d.type}`;
/** @type {?} */
export const dfhDefinitions = {
    profile: {
        indexBy: {
            keyInStore: 'pk_profile',
            indexByFn: (ɵ0)
        }
    },
    klass: {
        indexBy: {
            keyInStore: 'pk_class',
            indexByFn: (ɵ1),
        },
        groupBy: [
            {
                keyInStore: 'basic_type',
                groupByFn: (ɵ2)
            },
        ]
    },
    property: {
        indexBy: {
            keyInStore: 'pk_property__has_domain__has_range',
            indexByFn: (ɵ3)
        },
        groupBy: [
            {
                keyInStore: 'pk_property',
                groupByFn: (ɵ4)
            },
            {
                keyInStore: 'has_domain',
                groupByFn: (ɵ5)
            },
            {
                keyInStore: 'has_range',
                groupByFn: (ɵ6)
            },
            // {
            //   keyInStore: 'has_domain__fk_property',
            //   groupByFn: (d: DfhProperty): string => d.has_domain + '_' + d.pk_property
            // },
            // {
            //   keyInStore: 'has_range__fk_property',
            //   groupByFn: (d: DfhProperty): string => d.has_range + '_' + d.pk_property
            // },
            {
                keyInStore: 'is_has_type_subproperty',
                groupByFn: (ɵ7)
            }
        ]
    },
    label: {
        indexBy: {
            keyInStore: 'fks',
            indexByFn: dfhLabelByFksKey
        },
        groupBy: [
            {
                keyInStore: 'fk_class__type',
                groupByFn: (ɵ8)
            },
            {
                keyInStore: 'fk_property__type',
                groupByFn: (ɵ9)
            },
            {
                keyInStore: 'fk_profile__type',
                groupByFn: (ɵ10)
            }
        ]
    },
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9, ɵ10 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGZoLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy9kZmguY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBLE1BQU0sT0FBTyxPQUFPLEdBQUcsS0FBSzs7QUFFNUIsTUFBTSxPQUFPLGdCQUFnQjs7OztBQUFHLENBQUMsSUFBdUIsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRSxDQUFBOzs7OztBQU10TSxDQUFDLElBQWdCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOzs7O0FBTWhELENBQUMsSUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTs7OztBQUsxQyxDQUFDLENBQVcsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFPbEQsQ0FBQyxJQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUzs7OztBQUtwRixDQUFDLENBQWMsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Ozs7QUFJcEQsQ0FBQyxDQUFjLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFOzs7O0FBSW5ELENBQUMsQ0FBYyxFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTs7OztBQVlsRCxDQUFDLENBQWMsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7QUFZeEcsQ0FBQyxDQUFXLEVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTs7OztBQUk1RSxDQUFDLENBQVcsRUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFOzs7O0FBSWxGLENBQUMsQ0FBVyxFQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7O0FBbkVuRyxNQUFNLE9BQU8sY0FBYyxHQUE0QjtJQUNyRCxPQUFPLEVBQUU7UUFDUCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsWUFBWTtZQUN4QixTQUFTLE1BQWtEO1NBQzVEO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxPQUFPLEVBQUU7WUFDUCxVQUFVLEVBQUUsVUFBVTtZQUN0QixTQUFTLE1BQThDO1NBQ3hEO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLFNBQVMsTUFBa0Q7YUFDNUQ7U0FDRjtLQUNGO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFO1lBQ1AsVUFBVSxFQUFFLG9DQUFvQztZQUNoRCxTQUFTLE1BQXdGO1NBQ2xHO1FBQ0QsT0FBTyxFQUFFO1lBQ1A7Z0JBQ0UsVUFBVSxFQUFFLGFBQWE7Z0JBQ3pCLFNBQVMsTUFBc0Q7YUFDaEU7WUFDRDtnQkFDRSxVQUFVLEVBQUUsWUFBWTtnQkFDeEIsU0FBUyxNQUFxRDthQUMvRDtZQUNEO2dCQUNFLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixTQUFTLE1BQW9EO2FBQzlEO1lBQ0QsSUFBSTtZQUNKLDJDQUEyQztZQUMzQyw4RUFBOEU7WUFDOUUsS0FBSztZQUNMLElBQUk7WUFDSiwwQ0FBMEM7WUFDMUMsNkVBQTZFO1lBQzdFLEtBQUs7WUFDTDtnQkFDRSxVQUFVLEVBQUUseUJBQXlCO2dCQUNyQyxTQUFTLE1BQTBHO2FBQ3BIO1NBQ0Y7S0FDRjtJQUNELEtBQUssRUFBRTtRQUNMLE9BQU8sRUFBRTtZQUNQLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFNBQVMsRUFBRSxnQkFBZ0I7U0FDNUI7UUFDRCxPQUFPLEVBQUU7WUFDUDtnQkFDRSxVQUFVLEVBQUUsZ0JBQWdCO2dCQUM1QixTQUFTLE1BQThFO2FBQ3hGO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLG1CQUFtQjtnQkFDL0IsU0FBUyxNQUFvRjthQUM5RjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxrQkFBa0I7Z0JBQzlCLFNBQVMsT0FBa0Y7YUFDNUY7U0FDRjtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZmhMYWJlbCwgRGZoUHJvZmlsZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBEZmhDbGFzcywgRGZoUHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICcuLi9faGVscGVycy9yZWR1Y2VyLWZhY3RvcnknO1xuXG5cbmV4cG9ydCBjb25zdCBkZmhSb290ID0gJ2RmaCc7XG5cbmV4cG9ydCBjb25zdCBkZmhMYWJlbEJ5RmtzS2V5ID0gKGl0ZW06IFBhcnRpYWw8RGZoTGFiZWw+KSA9PiBgJHtpdGVtLnR5cGUgfHwgbnVsbH1fJHtpdGVtLmxhbmd1YWdlIHx8IG51bGx9XyR7aXRlbS5ma19jbGFzcyB8fCBudWxsfV8ke2l0ZW0uZmtfcHJvZmlsZSB8fCBudWxsfV8ke2l0ZW0uZmtfcHJvcGVydHkgfHwgbnVsbH1fJHtpdGVtLmZrX3Byb2plY3QgfHwgbnVsbH1gO1xuXG5leHBvcnQgY29uc3QgZGZoRGVmaW5pdGlvbnM6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uID0ge1xuICBwcm9maWxlOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX3Byb2ZpbGUnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogRGZoUHJvZmlsZSkgPT4gaXRlbS5wa19wcm9maWxlLnRvU3RyaW5nKClcbiAgICB9XG4gIH0sXG4gIGtsYXNzOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2NsYXNzJyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW06IERmaENsYXNzKSA9PiBpdGVtLnBrX2NsYXNzLnRvU3RyaW5nKCksXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdiYXNpY190eXBlJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoQ2xhc3MpOiBzdHJpbmcgPT4gZC5iYXNpY190eXBlLnRvU3RyaW5nKClcbiAgICAgIH0sXG4gICAgXVxuICB9LFxuICBwcm9wZXJ0eToge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19wcm9wZXJ0eV9faGFzX2RvbWFpbl9faGFzX3JhbmdlJyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW06IERmaFByb3BlcnR5KSA9PiBpdGVtLnBrX3Byb3BlcnR5ICsgJ18nICsgaXRlbS5oYXNfZG9tYWluICsgJ18nICsgaXRlbS5oYXNfcmFuZ2VcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ3BrX3Byb3BlcnR5JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoUHJvcGVydHkpOiBzdHJpbmcgPT4gZC5wa19wcm9wZXJ0eS50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnaGFzX2RvbWFpbicsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaFByb3BlcnR5KTogc3RyaW5nID0+IGQuaGFzX2RvbWFpbi50b1N0cmluZygpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnaGFzX3JhbmdlJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoUHJvcGVydHkpOiBzdHJpbmcgPT4gZC5oYXNfcmFuZ2UudG9TdHJpbmcoKVxuICAgICAgfSxcbiAgICAgIC8vIHtcbiAgICAgIC8vICAga2V5SW5TdG9yZTogJ2hhc19kb21haW5fX2ZrX3Byb3BlcnR5JyxcbiAgICAgIC8vICAgZ3JvdXBCeUZuOiAoZDogRGZoUHJvcGVydHkpOiBzdHJpbmcgPT4gZC5oYXNfZG9tYWluICsgJ18nICsgZC5wa19wcm9wZXJ0eVxuICAgICAgLy8gfSxcbiAgICAgIC8vIHtcbiAgICAgIC8vICAga2V5SW5TdG9yZTogJ2hhc19yYW5nZV9fZmtfcHJvcGVydHknLFxuICAgICAgLy8gICBncm91cEJ5Rm46IChkOiBEZmhQcm9wZXJ0eSk6IHN0cmluZyA9PiBkLmhhc19yYW5nZSArICdfJyArIGQucGtfcHJvcGVydHlcbiAgICAgIC8vIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eScsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IERmaFByb3BlcnR5KTogc3RyaW5nID0+IGQuaXNfaGFzX3R5cGVfc3VicHJvcGVydHkgPyBkLmlzX2hhc190eXBlX3N1YnByb3BlcnR5LnRvU3RyaW5nKCkgOiB1bmRlZmluZWRcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIGxhYmVsOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ2ZrcycsXG4gICAgICBpbmRleEJ5Rm46IGRmaExhYmVsQnlGa3NLZXlcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX2NsYXNzX190eXBlJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoTGFiZWwpOiBzdHJpbmcgPT4gIWQuZmtfY2xhc3MgPyB1bmRlZmluZWQgOiBgJHtkLmZrX2NsYXNzfV8ke2QudHlwZX1gXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfcHJvcGVydHlfX3R5cGUnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBEZmhMYWJlbCk6IHN0cmluZyA9PiAhZC5ma19wcm9wZXJ0eSA/IHVuZGVmaW5lZCA6IGAke2QuZmtfcHJvcGVydHl9XyR7ZC50eXBlfWBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19wcm9maWxlX190eXBlJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogRGZoTGFiZWwpOiBzdHJpbmcgPT4gIWQuZmtfcHJvZmlsZSA/IHVuZGVmaW5lZCA6IGAke2QuZmtfcHJvZmlsZX1fJHtkLnR5cGV9YFxuICAgICAgfVxuICAgIF1cbiAgfSxcbn07XG4iXX0=