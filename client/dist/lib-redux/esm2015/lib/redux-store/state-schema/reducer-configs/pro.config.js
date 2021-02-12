/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/reducer-configs/pro.config.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtc2NoZW1hL3JlZHVjZXItY29uZmlncy9wcm8uY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUlBLE1BQU0sT0FBTyxPQUFPLEdBQUcsS0FBSzs7QUFHNUIsTUFBTSxPQUFPLG9CQUFvQjs7OztBQUFHLENBQUMsQ0FBMkIsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsWUFBWSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsZUFBZSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsc0JBQXNCLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLEVBQUUsQ0FBQTs7QUFDalIsTUFBTSxPQUFPLDRCQUE0Qjs7OztBQUFHLENBQUMsQ0FBMkIsRUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsWUFBWSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsZUFBZSxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsc0JBQXNCLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxxQkFBcUIsSUFBSSxJQUFJLEVBQUUsQ0FBQTs7QUFDeFEsTUFBTSxPQUFPLHNDQUFzQzs7OztBQUFHLENBQUMsQ0FBK0IsRUFBVSxFQUFFOztVQUMxRixRQUFRLEdBQUcsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLENBQUMsZUFBZSxJQUFJLENBQUMsQ0FBQyx3QkFBd0I7SUFDcEYsT0FBTyxHQUFHLENBQUMsQ0FBQyxVQUFV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QUM1RDtLQUNGO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbiB9IGZyb20gJy4uL19oZWxwZXJzJztcbmltcG9ydCB7IFByb0NsYXNzRmllbGRDb25maWcsIFByb0RmaENsYXNzUHJvalJlbCwgUHJvVGV4dFByb3BlcnR5LCBQcm9EZmhQcm9maWxlUHJvalJlbCB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBQcm9BbmFseXNpcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5cbmV4cG9ydCBjb25zdCBwcm9Sb290ID0gJ3Bybyc7XG5cblxuZXhwb3J0IGNvbnN0IHRleHRQcm9wZXJ0eUJ5RmtzS2V5ID0gKGQ6IFBhcnRpYWw8UHJvVGV4dFByb3BlcnR5PikgPT4gYCR7ZC5ma19wcm9qZWN0IHx8IG51bGx9XyR7ZC5ma19zeXN0ZW1fdHlwZSB8fCBudWxsfV8ke2QuZmtfbGFuZ3VhZ2UgfHwgbnVsbH1fJHtkLmZrX2RmaF9jbGFzcyB8fCBudWxsfV8ke2QuZmtfZGZoX3Byb3BlcnR5IHx8IG51bGx9XyR7ZC5ma19kZmhfcHJvcGVydHlfZG9tYWluIHx8IG51bGx9XyR7ZC5ma19kZmhfcHJvcGVydHlfcmFuZ2UgfHwgbnVsbH1gXG5leHBvcnQgY29uc3QgdGV4dFByb3BlcnR5QnlGa3NXaXRob3V0TGFuZyA9IChkOiBQYXJ0aWFsPFByb1RleHRQcm9wZXJ0eT4pOiBzdHJpbmcgPT4gYCR7ZC5ma19wcm9qZWN0IHx8IG51bGx9XyR7ZC5ma19zeXN0ZW1fdHlwZSB8fCBudWxsfV8ke2QuZmtfZGZoX2NsYXNzIHx8IG51bGx9XyR7ZC5ma19kZmhfcHJvcGVydHkgfHwgbnVsbH1fJHtkLmZrX2RmaF9wcm9wZXJ0eV9kb21haW4gfHwgbnVsbH1fJHtkLmZrX2RmaF9wcm9wZXJ0eV9yYW5nZSB8fCBudWxsfWA7XG5leHBvcnQgY29uc3QgcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXkgPSAoZDogUGFydGlhbDxQcm9DbGFzc0ZpZWxkQ29uZmlnPik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGZrX2NsYXNzID0gZC5ma19yYW5nZV9jbGFzcyB8fCBkLmZrX2RvbWFpbl9jbGFzcyB8fCBkLmZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZDtcbiAgcmV0dXJuIGAke2QuZmtfcHJvamVjdCB8fCBudWxsfV8ke2ZrX2NsYXNzIHx8IG51bGx9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBwcm9EZWZpbml0aW9uczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gPSB7XG4gIHByb2plY3Q6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAncGtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IGl0ZW0ucGtfZW50aXR5LnRvU3RyaW5nKClcbiAgICB9XG4gIH0sXG4gIGluZm9fcHJval9yZWw6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAnZmtfcHJvamVjdF9fZmtfZW50aXR5JyxcbiAgICAgIGluZGV4QnlGbjogKGl0ZW0pID0+IGl0ZW0uZmtfcHJvamVjdC50b1N0cmluZygpICsgJ18nICsgaXRlbS5ma19lbnRpdHkudG9TdHJpbmcoKVxuICAgIH1cbiAgfSxcbiAgY2xhc3NfZmllbGRfY29uZmlnOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtKSA9PiBpdGVtLnBrX2VudGl0eS50b1N0cmluZygpXG4gICAgfSxcbiAgICBncm91cEJ5OiBbXG4gICAgICB7XG4gICAgICAgIGtleUluU3RvcmU6ICdma19wcm9qZWN0X19ma19jbGFzcycsXG4gICAgICAgIGdyb3VwQnlGbjogcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXlcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIGRmaF9jbGFzc19wcm9qX3JlbDoge1xuICAgIGluZGV4Qnk6IHtcbiAgICAgIGtleUluU3RvcmU6ICdma19wcm9qZWN0X19ma19jbGFzcycsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBQcm9EZmhDbGFzc1Byb2pSZWwpID0+IGl0ZW0uZmtfcHJvamVjdCArICdfJyArIGl0ZW0uZmtfY2xhc3NcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBQcm9EZmhDbGFzc1Byb2pSZWwpOiBzdHJpbmcgPT4gZC5ma19wcm9qZWN0ICsgJ18nICsgZC5lbmFibGVkX2luX2VudGl0aWVzXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfcHJvamVjdCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IFByb0RmaENsYXNzUHJvalJlbCk6IHN0cmluZyA9PiBkLmZrX3Byb2plY3QudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIF0sXG4gIH0sXG4gIGRmaF9wcm9maWxlX3Byb2pfcmVsOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb2plY3RfX2ZrX3Byb2ZpbGUnLFxuICAgICAgaW5kZXhCeUZuOiAoaXRlbTogUHJvRGZoUHJvZmlsZVByb2pSZWwpID0+IGl0ZW0uZmtfcHJvamVjdCArICdfJyArIGl0ZW0uZmtfcHJvZmlsZVxuICAgIH0sXG4gICAgZ3JvdXBCeTogW1xuICAgICAge1xuICAgICAgICBrZXlJblN0b3JlOiAnZmtfcHJvamVjdF9fZW5hYmxlZCcsXG4gICAgICAgIGdyb3VwQnlGbjogKGQ6IFByb0RmaFByb2ZpbGVQcm9qUmVsKTogc3RyaW5nID0+IGQuZmtfcHJvamVjdCArICdfJyArIGQuZW5hYmxlZFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICBncm91cEJ5Rm46IChkOiBQcm9EZmhQcm9maWxlUHJvalJlbCk6IHN0cmluZyA9PiBkLmZrX3Byb2plY3QudG9TdHJpbmcoKVxuICAgICAgfVxuICAgIF0sXG4gIH0sXG4gIHRleHRfcHJvcGVydHk6IHtcbiAgICBpbmRleEJ5OiB7XG4gICAgICBrZXlJblN0b3JlOiAnZmtzJyxcbiAgICAgIGluZGV4QnlGbjogdGV4dFByb3BlcnR5QnlGa3NLZXlcbiAgICB9LFxuICAgIGdyb3VwQnk6IFtcbiAgICAgIHtcbiAgICAgICAga2V5SW5TdG9yZTogJ2Zrc193aXRob3V0X2xhbmcnLFxuICAgICAgICBncm91cEJ5Rm46IHRleHRQcm9wZXJ0eUJ5RmtzV2l0aG91dExhbmdcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIGFuYWx5c2lzOiB7XG4gICAgaW5kZXhCeToge1xuICAgICAga2V5SW5TdG9yZTogJ3BrX2VudGl0eScsXG4gICAgICBpbmRleEJ5Rm46IChpdGVtOiBQcm9BbmFseXNpcykgPT4gaXRlbS5wa19lbnRpdHkudG9TdHJpbmcoKVxuICAgIH1cbiAgfVxufVxuIl19