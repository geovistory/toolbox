/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/reducer-configs/pro.config.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const proRoot = 'pro';
/** @type {?} */
export const textPropertyByFksKey = (/**
 * @param {?} d
 * @return {?}
 */
(d) => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_language || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}`);
/** @type {?} */
export const textPropertyByFksWithoutLang = (/**
 * @param {?} d
 * @return {?}
 */
(d) => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}`);
/** @type {?} */
export const proClassFieldConfgByProjectAndClassKey = (/**
 * @param {?} d
 * @return {?}
 */
(d) => {
    /** @type {?} */
    const fk_class = d.fk_range_class || d.fk_domain_class || d.fk_class_for_class_field;
    return `${d.fk_project || null}_${fk_class || null}`;
});
const ɵ0 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ1 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_project.toString() + '_' + item.fk_entity.toString(), ɵ2 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString(), ɵ3 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_project + '_' + item.fk_class, ɵ4 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_project + '_' + d.enabled_in_entities, ɵ5 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_project.toString(), ɵ6 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.fk_project + '_' + item.fk_profile, ɵ7 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_project + '_' + d.enabled, ɵ8 = /**
 * @param {?} d
 * @return {?}
 */
(d) => d.fk_project.toString(), ɵ9 = /**
 * @param {?} item
 * @return {?}
 */
(item) => item.pk_entity.toString();
/** @type {?} */
export const proDefinitions = {
    project: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ0)
        }
    },
    info_proj_rel: {
        indexBy: {
            keyInStore: 'fk_project__fk_entity',
            indexByFn: (ɵ1)
        }
    },
    class_field_config: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ2)
        },
        groupBy: [
            {
                keyInStore: 'fk_project__fk_class',
                groupByFn: proClassFieldConfgByProjectAndClassKey
            }
        ]
    },
    dfh_class_proj_rel: {
        indexBy: {
            keyInStore: 'fk_project__fk_class',
            indexByFn: (ɵ3)
        },
        groupBy: [
            {
                keyInStore: 'fk_project__enabled_in_entities',
                groupByFn: (ɵ4)
            },
            {
                keyInStore: 'fk_project',
                groupByFn: (ɵ5)
            }
        ],
    },
    dfh_profile_proj_rel: {
        indexBy: {
            keyInStore: 'fk_project__fk_profile',
            indexByFn: (ɵ6)
        },
        groupBy: [
            {
                keyInStore: 'fk_project__enabled',
                groupByFn: (ɵ7)
            },
            {
                keyInStore: 'fk_project',
                groupByFn: (ɵ8)
            }
        ],
    },
    text_property: {
        indexBy: {
            keyInStore: 'fks',
            indexByFn: textPropertyByFksKey
        },
        groupBy: [
            {
                keyInStore: 'fks_without_lang',
                groupByFn: textPropertyByFksWithoutLang
            }
        ]
    },
    analysis: {
        indexBy: {
            keyInStore: 'pk_entity',
            indexByFn: (ɵ9)
        }
    }
};
export { ɵ0, ɵ1, ɵ2, ɵ3, ɵ4, ɵ5, ɵ6, ɵ7, ɵ8, ɵ9 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLXNjaGVtYS9yZWR1Y2VyLWNvbmZpZ3MvcHJvLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxNQUFNLE9BQU8sT0FBTyxHQUFHLEtBQUs7O0FBRzVCLE1BQU0sT0FBTyxvQkFBb0I7Ozs7QUFBRyxDQUFDLENBQTJCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLGNBQWMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLGVBQWUsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLHNCQUFzQixJQUFJLElBQUksSUFBSSxDQUFDLENBQUMscUJBQXFCLElBQUksSUFBSSxFQUFFLENBQUE7O0FBQ2pSLE1BQU0sT0FBTyw0QkFBNEI7Ozs7QUFBRyxDQUFDLENBQTJCLEVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLGNBQWMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLGVBQWUsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLHNCQUFzQixJQUFJLElBQUksSUFBSSxDQUFDLENBQUMscUJBQXFCLElBQUksSUFBSSxFQUFFLENBQUE7O0FBQ3hRLE1BQU0sT0FBTyxzQ0FBc0M7Ozs7QUFBRyxDQUFDLENBQStCLEVBQVUsRUFBRTs7VUFDMUYsUUFBUSxHQUFHLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUMsd0JBQXdCO0lBQ3BGLE9BQU8sR0FBRyxDQUFDLENBQUMs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a0Q7U0FDNUQ7S0FDRjtDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICcuLi9faGVscGVycyc7XG5pbXBvcnQgeyBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9EZmhDbGFzc1Byb2pSZWwsIFByb1RleHRQcm9wZXJ0eSwgUHJvRGZoUHJvZmlsZVByb2pSZWwgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuXG5leHBvcnQgY29uc3QgcHJvUm9vdCA9ICdwcm8nO1xuXG5cbmV4cG9ydCBjb25zdCB0ZXh0UHJvcGVydHlCeUZrc0tleSA9IChkOiBQYXJ0aWFsPFByb1RleHRQcm9wZXJ0eT4pID0+IGAke2QuZmtfcHJvamVjdCB8fCBudWxsfV8ke2QuZmtfc3lzdGVtX3R5cGUgfHwgbnVsbH1fJHtkLmZrX2xhbmd1YWdlIHx8IG51bGx9XyR7ZC5ma19kZmhfY2xhc3MgfHwgbnVsbH1fJHtkLmZrX2RmaF9wcm9wZXJ0eSB8fCBudWxsfV8ke2QuZmtfZGZoX3Byb3BlcnR5X2RvbWFpbiB8fCBudWxsfV8ke2QuZmtfZGZoX3Byb3BlcnR5X3JhbmdlIHx8IG51bGx9YFxuZXhwb3J0IGNvbnN0IHRleHRQcm9wZXJ0eUJ5RmtzV2l0aG91dExhbmcgPSAoZDogUGFydGlhbDxQcm9UZXh0UHJvcGVydHk+KTogc3RyaW5nID0+IGAke2QuZmtfcHJvamVjdCB8fCBudWxsfV8ke2QuZmtfc3lzdGVtX3R5cGUgfHwgbnVsbH1fJHtkLmZrX2RmaF9jbGFzcyB8fCBudWxsfV8ke2QuZmtfZGZoX3Byb3BlcnR5IHx8IG51bGx9XyR7ZC5ma19kZmhfcHJvcGVydHlfZG9tYWluIHx8IG51bGx9XyR7ZC5ma19kZmhfcHJvcGVydHlfcmFuZ2UgfHwgbnVsbH1gO1xuZXhwb3J0IGNvbnN0IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5ID0gKGQ6IFBhcnRpYWw8UHJvQ2xhc3NGaWVsZENvbmZpZz4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBma19jbGFzcyA9IGQuZmtfcmFuZ2VfY2xhc3MgfHwgZC5ma19kb21haW5fY2xhc3MgfHwgZC5ma19jbGFzc19mb3JfY2xhc3NfZmllbGQ7XG4gIHJldHVybiBgJHtkLmZrX3Byb2plY3QgfHwgbnVsbH1fJHtma19jbGFzcyB8fCBudWxsfWA7XG59O1xuXG5leHBvcnQgY29uc3QgcHJvRGVmaW5pdGlvbnM6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uID0ge1xuICBwcm9qZWN0OiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgfVxuICB9LFxuICBpbmZvX3Byb2pfcmVsOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb2plY3RfX2ZrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBpdGVtLmZrX3Byb2plY3QudG9TdHJpbmcoKSArICdfJyArIGl0ZW0uZmtfZW50aXR5LnRvU3RyaW5nKClcbiAgICB9XG4gIH0sXG4gIGNsYXNzX2ZpZWxkX2NvbmZpZzoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbSkgPT4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfcHJvamVjdF9fZmtfY2xhc3MnLFxuICAgICAgICBncm91cEJ5Rm46IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5XG4gICAgICB9XG4gICAgXVxuICB9LFxuICBkZmhfY2xhc3NfcHJval9yZWw6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAnZmtfcHJvamVjdF9fZmtfY2xhc3MnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogUHJvRGZoQ2xhc3NQcm9qUmVsKSA9PiBpdGVtLmZrX3Byb2plY3QgKyAnXycgKyBpdGVtLmZrX2NsYXNzXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogUHJvRGZoQ2xhc3NQcm9qUmVsKTogc3RyaW5nID0+IGQuZmtfcHJvamVjdCArICdfJyArIGQuZW5hYmxlZF9pbl9lbnRpdGllc1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBQcm9EZmhDbGFzc1Byb2pSZWwpOiBzdHJpbmcgPT4gZC5ma19wcm9qZWN0LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICBdLFxuICB9LFxuICBkZmhfcHJvZmlsZV9wcm9qX3JlbDoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdma19wcm9qZWN0X19ma19wcm9maWxlJyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW06IFByb0RmaFByb2ZpbGVQcm9qUmVsKSA9PiBpdGVtLmZrX3Byb2plY3QgKyAnXycgKyBpdGVtLmZrX3Byb2ZpbGVcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb2plY3RfX2VuYWJsZWQnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBQcm9EZmhQcm9maWxlUHJvalJlbCk6IHN0cmluZyA9PiBkLmZrX3Byb2plY3QgKyAnXycgKyBkLmVuYWJsZWRcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19wcm9qZWN0JyxcbiAgICAgICAgZ3JvdXBCeUZuOiAoZDogUHJvRGZoUHJvZmlsZVByb2pSZWwpOiBzdHJpbmcgPT4gZC5ma19wcm9qZWN0LnRvU3RyaW5nKClcbiAgICAgIH1cbiAgICBdLFxuICB9LFxuICB0ZXh0X3Byb3BlcnR5OiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ2ZrcycsXG4gICAgICBpbmRleEJ5Rm46IHRleHRQcm9wZXJ0eUJ5RmtzS2V5XG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma3Nfd2l0aG91dF9sYW5nJyxcbiAgICAgICAgZ3JvdXBCeUZuOiB0ZXh0UHJvcGVydHlCeUZrc1dpdGhvdXRMYW5nXG4gICAgICB9XG4gICAgXVxuICB9LFxuICBhbmFseXNpczoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdwa19lbnRpdHknLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogUHJvQW5hbHlzaXMpID0+IGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICB9XG4gIH1cbn1cbiJdfQ==