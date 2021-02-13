/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/active-project.models.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ProjectPreview() { }
if (false) {
    /** @type {?|undefined} */
    ProjectPreview.prototype.label;
    /** @type {?|undefined} */
    ProjectPreview.prototype.description;
    /** @type {?|undefined} */
    ProjectPreview.prototype.default_language;
    /** @type {?|undefined} */
    ProjectPreview.prototype.pk_project;
}
/**
 * @record
 * @template T
 */
export function EntityByPk() { }
/**
 * @record
 * @template T
 */
export function VersionEntity() { }
if (false) {
    /** @type {?} */
    VersionEntity.prototype._latestVersion;
    /* Skipping unhandled member: [v: number]: T*/
}
/**
 * @record
 * @template T
 */
export function EntityVersionsByPk() { }
/**
 * @record
 */
export function ChunkList() { }
/**
 * @record
 */
export function PeItList() { }
/**
 * @record
 */
export function TeEnList() { }
/**
 * @record
 */
export function PropertyList() { }
/**
 * @record
 */
export function TypePeIt() { }
if (false) {
    /** @type {?} */
    TypePeIt.prototype.fk_typed_class;
}
/**
 * @record
 */
export function TypesByClass() { }
/**
 * @record
 */
export function TypesByPk() { }
/**
 * @record
 */
export function TypePreview() { }
if (false) {
    /** @type {?} */
    TypePreview.prototype.fk_typed_class;
}
/**
 * @record
 */
export function TypePreviewsByClass() { }
/**
 * @record
 */
export function TypePreviewList() { }
/**
 * @record
 */
export function Panel() { }
if (false) {
    /** @type {?} */
    Panel.prototype.id;
    /** @type {?} */
    Panel.prototype.tabs;
}
/**
 * @record
 * @template D
 */
export function PanelTab() { }
if (false) {
    /** @type {?} */
    PanelTab.prototype.active;
    /** @type {?} */
    PanelTab.prototype.component;
    /** @type {?} */
    PanelTab.prototype.icon;
    /** @type {?|undefined} */
    PanelTab.prototype.pathSegment;
    /** @type {?|undefined} */
    PanelTab.prototype.data;
    /** @type {?|undefined} */
    PanelTab.prototype.path;
    /** @type {?|undefined} */
    PanelTab.prototype.tabTitle$;
    /** @type {?|undefined} */
    PanelTab.prototype.loading$;
}
/**
 * @record
 */
export function PeItTabData() { }
if (false) {
    /** @type {?|undefined} */
    PeItTabData.prototype.peItDetailConfig;
}
/**
 * @record
 */
export function AnalysisTabData() { }
if (false) {
    /** @type {?|undefined} */
    AnalysisTabData.prototype.pkEntity;
    /** @type {?|undefined} */
    AnalysisTabData.prototype.fkAnalysisType;
}
/**
 * @record
 */
export function TabData() { }
if (false) {
    /** @type {?|undefined} */
    TabData.prototype.pkEntity;
    /** @type {?|undefined} */
    TabData.prototype.pkProperty;
    /** @type {?|undefined} */
    TabData.prototype.peItDetailConfig;
}
/**
 * @record
 */
export function RamSource() { }
if (false) {
    /** @type {?|undefined} */
    RamSource.prototype.pkEntity;
    /** @type {?|undefined} */
    RamSource.prototype.chunk;
}
/**
 * @record
 */
export function ProjectDetail() { }
if (false) {
    /**
     * ***************************************************************
     * CRM and Project Config
     * @type {?|undefined}
     */
    ProjectDetail.prototype.loadingConfigData;
    /** @type {?|undefined} */
    ProjectDetail.prototype.configDataInitialized;
    /**
     * ***************************************************************
     * Layout – Tabs
     * @type {?|undefined}
     */
    ProjectDetail.prototype.list;
    /** @type {?|undefined} */
    ProjectDetail.prototype.panels;
    /** @type {?|undefined} */
    ProjectDetail.prototype.focusedPanel;
    /** @type {?|undefined} */
    ProjectDetail.prototype.panelSerial;
    /** @type {?|undefined} */
    ProjectDetail.prototype.uiIdSerial;
    /** @type {?|undefined} */
    ProjectDetail.prototype.tabLayouts;
    /** @type {?|undefined} */
    ProjectDetail.prototype.textDetails;
    /** @type {?|undefined} */
    ProjectDetail.prototype.peItDetails;
    /** @type {?|undefined} */
    ProjectDetail.prototype.analysisDetails;
    /** @type {?|undefined} */
    ProjectDetail.prototype.classesSettings;
    /** @type {?|undefined} */
    ProjectDetail.prototype.contrVocabSettings;
    /** @type {?|undefined} */
    ProjectDetail.prototype.ontomeProfilesSettings;
    /**
     * ***************************************************************
     * Things for Mentionings / Annotations
     * @type {?|undefined}
     */
    ProjectDetail.prototype.refiningChunk;
    /** @type {?|undefined} */
    ProjectDetail.prototype.creatingMentioning;
    /** @type {?|undefined} */
    ProjectDetail.prototype.mentioningsFocusedInText;
    /** @type {?|undefined} */
    ProjectDetail.prototype.mentioningsFocusedInTable;
}
/**
 * @record
 */
export function ProjectCrm() { }
if (false) {
    /** @type {?|undefined} */
    ProjectCrm.prototype.classes;
    /** @type {?|undefined} */
    ProjectCrm.prototype.properties;
}
/**
 * @record
 */
export function ClassConfigList() { }
/**
 * @record
 */
export function ClassConfig() { }
if (false) {
    /** @type {?} */
    ClassConfig.prototype.pkEntity;
    /** @type {?} */
    ClassConfig.prototype.dfh_pk_class;
    /** @type {?} */
    ClassConfig.prototype.label;
    /** @type {?} */
    ClassConfig.prototype.dfh_standard_label;
    /** @type {?} */
    ClassConfig.prototype.profileLabels;
    /** @type {?} */
    ClassConfig.prototype.profilePks;
    /** @type {?|undefined} */
    ClassConfig.prototype.projRel;
    /** @type {?|undefined} */
    ClassConfig.prototype.isInProject;
    /** @type {?} */
    ClassConfig.prototype.changingProjRel;
    /** @type {?|undefined} */
    ClassConfig.prototype.subclassOf;
    /** @type {?|undefined} */
    ClassConfig.prototype.subclassOfType;
    /** @type {?} */
    ClassConfig.prototype.scopeNote;
    /** @type {?} */
    ClassConfig.prototype.dfh_identifier_in_namespace;
    /** @type {?|undefined} */
    ClassConfig.prototype.uiContexts;
    /** @type {?|undefined} */
    ClassConfig.prototype.required_by_sources;
    /** @type {?|undefined} */
    ClassConfig.prototype.required_by_entities;
    /** @type {?|undefined} */
    ClassConfig.prototype.required_by_basics;
    /** @type {?|undefined} */
    ClassConfig.prototype.excluded_from_entities;
}
/**
 * @record
 */
export function UiContext() { }
if (false) {
    /** @type {?|undefined} */
    UiContext.prototype.uiElements;
}
/**
 * @record
 */
export function UiElement() { }
if (false) {
    /** @type {?|undefined} */
    UiElement.prototype.fk_property;
    /** @type {?|undefined} */
    UiElement.prototype.property_is_outgoing;
    /** @type {?|undefined} */
    UiElement.prototype.propertyFieldKey;
    /** @type {?|undefined} */
    UiElement.prototype.propSetKey;
    /** @type {?|undefined} */
    UiElement.prototype.fk_class_field;
    /** @type {?|undefined} */
    UiElement.prototype.class_field;
    /** @type {?} */
    UiElement.prototype.ord_num;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QubW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1ndWkvbW9kZWxzL2FjdGl2ZS1wcm9qZWN0Lm1vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVNBLG9DQUtDOzs7SUFKQywrQkFBZTs7SUFDZixxQ0FBcUI7O0lBQ3JCLDBDQUErQjs7SUFDL0Isb0NBQW1COzs7Ozs7QUFHckIsZ0NBRUM7Ozs7O0FBRUQsbUNBR0M7OztJQUZDLHVDQUF1Qjs7Ozs7OztBQUl6Qix3Q0FFQzs7OztBQUVELCtCQUE0RDs7OztBQUM1RCw4QkFBb0U7Ozs7QUFDcEUsOEJBQW9FOzs7O0FBQ3BFLGtDQUFtRTs7OztBQUNuRSw4QkFBK0U7OztJQUF6QixrQ0FBdUI7Ozs7O0FBQzdFLGtDQUFxRTs7OztBQUNyRSwrQkFBNkQ7Ozs7QUFFN0QsaUNBQWlGOzs7SUFBekIscUNBQXVCOzs7OztBQUMvRSx5Q0FBK0U7Ozs7QUFDL0UscUNBQXdFOzs7O0FBT3hFLDJCQUdDOzs7SUFGQyxtQkFBVzs7SUFDWCxxQkFBc0I7Ozs7OztBQUl4Qiw4QkFnQkM7OztJQWRDLDBCQUFnQjs7SUFFaEIsNkJBQStNOztJQUUvTSx3QkFBYzs7SUFFZCwrQkFBME07O0lBRTFNLHdCQUFROztJQUVSLHdCQUFnQjs7SUFFaEIsNkJBQStCOztJQUMvQiw0QkFBK0I7Ozs7O0FBRWpDLGlDQU1DOzs7SUFKQyx1Q0FHQzs7Ozs7QUFTSCxxQ0FHQzs7O0lBRkMsbUNBQWtCOztJQUNsQix5Q0FBd0I7Ozs7O0FBRTFCLDZCQWlCQzs7O0lBaEJDLDJCQUFrQjs7SUFHbEIsNkJBQW9COztJQUdwQixtQ0FHQzs7Ozs7QUFTSCwrQkFHQzs7O0lBRkMsNkJBQWtCOztJQUNsQiwwQkFBaUI7Ozs7O0FBR25CLG1DQTRIQzs7Ozs7OztJQXBIQywwQ0FBNEI7O0lBQzVCLDhDQUFnQzs7Ozs7O0lBMkNoQyw2QkFBZ0I7O0lBRWhCLCtCQUFnQjs7SUFHaEIscUNBQXNCOztJQUd0QixvQ0FBcUI7O0lBR3JCLG1DQUFvQjs7SUFFcEIsbUNBQXdDOztJQUd4QyxvQ0FBeUM7O0lBR3pDLG9DQUE4Qzs7SUFNOUMsd0NBQXlDOztJQVN6Qyx3Q0FBeUQ7O0lBR3pELDJDQUE4Qzs7SUFHOUMsK0NBQWdEOzs7Ozs7SUFrQmhELHNDQUF3Qjs7SUFJeEIsMkNBQTZCOztJQUk3QixpREFBbUM7O0lBSW5DLGtEQUFvQzs7Ozs7QUFJdEMsZ0NBR0M7OztJQUZDLDZCQUEwQjs7SUFDMUIsZ0NBQXlCOzs7OztBQUczQixxQ0FBd0U7Ozs7QUFFeEUsaUNBK0JDOzs7SUE5QkMsK0JBQWlCOztJQUNqQixtQ0FBcUI7O0lBRXJCLDRCQUFjOztJQUNkLHlDQUEyQjs7SUFFM0Isb0NBQXNCOztJQUN0QixpQ0FBcUI7O0lBRXJCLDhCQUE2Qjs7SUFDN0Isa0NBQXNCOztJQUN0QixzQ0FBeUI7O0lBRXpCLGlDQUF3Qzs7SUFFeEMscUNBQXlCOztJQUV6QixnQ0FBa0I7O0lBRWxCLGtEQUFvQzs7SUFHcEMsaUNBRUM7O0lBRUQsMENBQTZCOztJQUM3QiwyQ0FBOEI7O0lBQzlCLHlDQUE0Qjs7SUFDNUIsNkNBQWdDOzs7OztBQUdsQywrQkFFQzs7O0lBREMsK0JBQXdCOzs7OztBQUkxQiwrQkFRQzs7O0lBUEMsZ0NBQXFCOztJQUNyQix5Q0FBK0I7O0lBQy9CLHFDQUEwQjs7SUFDMUIsK0JBQW9COztJQUNwQixtQ0FBd0I7O0lBQ3hCLGdDQUFvQzs7SUFDcEMsNEJBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRDaHVuaywgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlRlbXBvcmFsRW50aXR5LCBQcm9EZmhDbGFzc1Byb2pSZWwsIFN5c0FwcENvbnRleHRJbnRlcmZhY2UsIFN5c0NsYXNzRmllbGRJbnRlcmZhY2UgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgRGZoUHJvcGVydHksIEluZkxhbmd1YWdlLCBXYXJFbnRpdHlQcmV2aWV3IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFR5cGVzIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC90eXBlcy5tb2RlbHMnO1xuaW1wb3J0IHsgRW50aXR5RGV0YWlsIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC9lbnRpdHktZGV0YWlsJztcbmltcG9ydCB7IFRhYkJhc2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0L3RhYi1sYXlvdXQubW9kZWxzJztcbmltcG9ydCB7IFByb2plY3RTZXR0aW5nc0RhdGEgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0L3Byb2plY3Qtc2V0dGluZ3MtZGF0YS5tb2RlbHMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdFByZXZpZXcge1xuICBsYWJlbD86IHN0cmluZyxcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmcsXG4gIGRlZmF1bHRfbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZSxcbiAgcGtfcHJvamVjdD86IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eUJ5UGs8VD4ge1xuICBbcGtfZW50aXR5OiBudW1iZXJdOiBUXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVmVyc2lvbkVudGl0eTxUPiB7XG4gIF9sYXRlc3RWZXJzaW9uOiBudW1iZXIsIC8vIHZlcnNpb24gbnVtYmVyIG9mIHRoZSBsYXRlc3QgdmVyc2lvblxuICBbdjogbnVtYmVyXTogVFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVZlcnNpb25zQnlQazxUPiB7XG4gIFtwa19lbnRpdHk6IG51bWJlcl06IFZlcnNpb25FbnRpdHk8VD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaHVua0xpc3QgeyBbcGtfZW50aXR5OiBudW1iZXJdOiBEYXRDaHVuayB9XG5leHBvcnQgaW50ZXJmYWNlIFBlSXRMaXN0IHsgW3BrX2VudGl0eTogbnVtYmVyXTogSW5mUGVyc2lzdGVudEl0ZW0gfVxuZXhwb3J0IGludGVyZmFjZSBUZUVuTGlzdCB7IFtwa19lbnRpdHk6IG51bWJlcl06IEluZlRlbXBvcmFsRW50aXR5IH1cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcGVydHlMaXN0IHsgW3BrX2VudGl0eTogc3RyaW5nXTogRGZoUHJvcGVydHk7IH1cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZVBlSXQgZXh0ZW5kcyBJbmZQZXJzaXN0ZW50SXRlbSB7IGZrX3R5cGVkX2NsYXNzOiBudW1iZXI7IH0gLy8gVE9ETyByZW1vdmUgaWYgcmVwbGFjZWQgYnkgVHlwZVByZXZpZXdcbmV4cG9ydCBpbnRlcmZhY2UgVHlwZXNCeUNsYXNzIHsgW2RmaF9wa19jbGFzczogc3RyaW5nXTogVHlwZVBlSXRbXTsgfVxuZXhwb3J0IGludGVyZmFjZSBUeXBlc0J5UGsgeyBbcGtfZW50aXR5OiBzdHJpbmddOiBUeXBlUGVJdDsgfVxuXG5leHBvcnQgaW50ZXJmYWNlIFR5cGVQcmV2aWV3IGV4dGVuZHMgV2FyRW50aXR5UHJldmlldyB7IGZrX3R5cGVkX2NsYXNzOiBudW1iZXI7IH1cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZVByZXZpZXdzQnlDbGFzcyB7IFtkZmhfcGtfY2xhc3M6IHN0cmluZ106IFR5cGVQcmV2aWV3W107IH1cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZVByZXZpZXdMaXN0IHsgW3BrX2VudGl0eTogc3RyaW5nXTogVHlwZVByZXZpZXdbXTsgfVxuLy8gZXhwb3J0IGludGVyZmFjZSBDb21RdWVyeUJ5UGsgeyBba2V5OiBzdHJpbmddOiBQcm9RdWVyeSB9XG5cbi8vIGV4cG9ydCBpbnRlcmZhY2UgSGFzVHlwZVByb3BlcnR5TGlzdCB7IFtkZmhfcGtfcHJvcGVydHk6IG51bWJlcl06IEhhc1R5cGVQcm9wZXJ0eVJlYWRhYmxlIH1cblxuZXhwb3J0IHR5cGUgSWNvblR5cGUgPSAndGV4dCcgfCAndGFibGUnIHwgJ3BlcnNpc3RlbnQtZW50aXR5JyB8ICd0ZW1wb3JhbC1lbnRpdHknIHwgJ3NvdXJjZScgfCAnZXhwcmVzc2lvbi1wb3J0aW9uJyB8ICdhbmFseXNpcycgfCAncXVlcnknIHwgJ3Zpc3VhbCcgfCAnc3RvcnknIHwgJ3NldHRpbmdzJztcblxuZXhwb3J0IGludGVyZmFjZSBQYW5lbCB7XG4gIGlkOiBudW1iZXI7XG4gIHRhYnM6IFBhbmVsVGFiPGFueT5bXTtcbn1cblxuZXhwb3J0IHR5cGUgTGlzdFR5cGUgPSAnJyB8ICdlbnRpdGllcycgfCAnc291cmNlcycgfCAnYW5hbHlzaXMnIHwgJ3F1ZXJpZXMnIHwgJ3Zpc3VhbHMnIHwgJ3N0b3JpZXMnIHwgJ3NldHRpbmdzJztcbmV4cG9ydCBpbnRlcmZhY2UgUGFuZWxUYWI8RD4ge1xuICAvLyB3aGV0ZXIgdGFiIGlzIGFjdGl2ZSBvciBub3RcbiAgYWN0aXZlOiBib29sZWFuO1xuICAvLyB0aGUgcm9vdCBjb21wb25lbnQgaW5jbHVkZWQgaW4gdGhpcyB0YWIsIGluIGRhc2ggc2VwYXJhdGUgbWludXNjbGVzOiBQZUl0RGV0YWlsQ29tcG9uZW50IC0+ICdlbnRpdHktZGV0YWlsJ1xuICBjb21wb25lbnQ6ICd0ZXh0LWRldGFpbCcgfCAndGFibGUtZGV0YWlsJyB8ICdlbnRpdHktZGV0YWlsJyB8ICd0ZS1lbi1kZXRhaWwnIHwgJ2FuYWx5c2lzLWRldGFpbCcgfCAncXVlcnktZGV0YWlsJyB8ICd2aXN1YWwtZGV0YWlsJyB8ICdvbnRvbWUtcHJvZmlsZXMtc2V0dGluZ3MnIHwgJ2NsYXNzZXMtc2V0dGluZ3MnIHwgJ2NvbnRyLXZvY2FiLXNldHRpbmdzJztcbiAgLy8gaWNvbiB0byBiZSBkaXNwbGF5ZWQgaW4gdGFiLCBlLmcuOiBndi1pY29uLXNvdXJjZVxuICBpY29uOiBJY29uVHlwZVxuICAvLyBuYW1lIG9mIHRoZSBwYXRoU2VnbWVudCB1bmRlciAnYWN0aXZlUHJvamVjdCcsIHVzZWQgdG8gZ2VuZXJhdGUgdGhlIHBhdGg6IFsnYWN0aXZlUHJvamVjdCcsIHBhdGhTZWdtZW50LCB1aUlkXVxuICBwYXRoU2VnbWVudD86ICd0ZXh0RGV0YWlscycgfCAndGFibGVEZXRhaWxzJyB8ICdwZUl0RGV0YWlscycgfCAndGVFbkRldGFpbHMnIHwgJ2FuYWx5c2lzRGV0YWlscycgfCAncXVlcnlEZXRhaWxzJyB8ICd2aXN1YWxEZXRhaWxzJyB8ICdvbnRvbWVQcm9maWxlc1NldHRpbmdzJyB8ICdjbGFzc2VzU2V0dGluZ3MnIHwgJ2NvbnRyVm9jYWJTZXR0aW5ncyc7XG4gIC8vIGRhdGEgdG8gcGFzcyB0byBjb21wb25lbnQgdmlhIGlucHV0IHZhcmlhYmFsZXNcbiAgZGF0YT86IERcbiAgLy8gZ2VuZXJhdGVkIGJ5IHJlZHVjZXI6IGJhc2UgcGF0aCB3aGVyZSB0aGUgY29tcG9uZW50IHdpbGwgYmUgYXR0YXRjaCBoaXMgU3ViU3RvcmVcbiAgcGF0aD86IHN0cmluZ1tdO1xuICAvLyBnZW5lcmF0ZWQgb24gdGhlIGZseSwgbmV2ZXIgaW4gc3RvcmVcbiAgdGFiVGl0bGUkPzogT2JzZXJ2YWJsZTxzdHJpbmc+O1xuICBsb2FkaW5nJD86IE9ic2VydmFibGU8Ym9vbGVhbj47XG59XG5leHBvcnQgaW50ZXJmYWNlIFBlSXRUYWJEYXRhIHtcbiAgLy8gVXNlZCBieSBwZUl0IGRldGFpbCBzdGF0ZSBjcmVhdG9cbiAgcGVJdERldGFpbENvbmZpZz86IHtcbiAgICBwZUl0RGV0YWlsPzogRW50aXR5RGV0YWlsXG4gICAgLy8gc3RhdGVTZXR0aW5ncz86IFN0YXRlU2V0dGluZ3NcbiAgfVxufVxuLy8gZXhwb3J0IGludGVyZmFjZSBUZUVudFRhYkRhdGEge1xuLy8gICAvLyBVc2VkIGJ5IHRlRW50IGRldGFpbCBzdGF0ZSBjcmVhdG9cbi8vICAgdGVFbnREZXRhaWxDb25maWc/OiB7XG4vLyAgICAgdGVFbnREZXRhaWw/OiBUZUVudERldGFpbFxuLy8gICAgIC8vIHN0YXRlU2V0dGluZ3M/OiBTdGF0ZVNldHRpbmdzXG4vLyAgIH1cbi8vIH1cbmV4cG9ydCBpbnRlcmZhY2UgQW5hbHlzaXNUYWJEYXRhIHtcbiAgcGtFbnRpdHk/OiBudW1iZXI7XG4gIGZrQW5hbHlzaXNUeXBlPzogbnVtYmVyO1xufVxuZXhwb3J0IGludGVyZmFjZSBUYWJEYXRhIHtcbiAgcGtFbnRpdHk/OiBudW1iZXI7XG4gIC8vIGNsYXNzQW5kVHlwZVBrPzogQ2xhc3NBbmRUeXBlUGs7XG5cbiAgcGtQcm9wZXJ0eT86IG51bWJlcjtcblxuICAvLyBVc2VkIGJ5IHBlSXQgZGV0YWlsIHN0YXRlIGNyZWF0b1xuICBwZUl0RGV0YWlsQ29uZmlnPzoge1xuICAgIHBlSXREZXRhaWw/OiBFbnRpdHlEZXRhaWxcbiAgICAvLyBzdGF0ZVNldHRpbmdzPzogU3RhdGVTZXR0aW5nc1xuICB9XG5cbiAgLy8gLy8gVXNlZCBieSB0ZUVudCBkZXRhaWwgc3RhdGUgY3JlYXRvXG4gIC8vIHRlRW50RGV0YWlsQ29uZmlnPzoge1xuICAvLyAgIHRlRW50RGV0YWlsPzogVGVFbnREZXRhaWxcbiAgLy8gICAvLyBzdGF0ZVNldHRpbmdzPzogU3RhdGVTZXR0aW5nc8OaXG4gIC8vIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSYW1Tb3VyY2Uge1xuICBwa0VudGl0eT86IG51bWJlcixcbiAgY2h1bms/OiBEYXRDaHVuaztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0RGV0YWlsIGV4dGVuZHMgUHJvamVjdFByZXZpZXcge1xuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogQ1JNIGFuZCBQcm9qZWN0IENvbmZpZ1xuICAgKi9cblxuICAvLyBDb25jZXB0aW9uYWwgUmVmZXJlbmNlIE1vZGVsXG4gIC8vIGNybT86IFByb2plY3RDcm0sXG4gIGxvYWRpbmdDb25maWdEYXRhPzogYm9vbGVhbjtcbiAgY29uZmlnRGF0YUluaXRpYWxpemVkPzogYm9vbGVhbjtcblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIEluZm9ybWF0aW9uIENhY2hlXG4gICAqL1xuXG4gIC8vIGluZj86IEluZjtcblxuICAvLyAvLyBkYXRhIHVuaXQgcHJldmlld3NcbiAgLy8gZW50aXR5UHJldmlld3M/OiBFbnRpdHlQcmV2aWV3TGlzdDtcblxuICAvLyAvLyB0eXBlcyBieSBwayBjbGFzc1xuICAvLyB0eXBlc0J5Q2xhc3M/OiBUeXBlc0J5Q2xhc3M7XG5cbiAgLy8gLy8gdHlwZXMgYnkgcGtfZW50aXR5XG4gIC8vIHR5cGVzQnlQaz86IFR5cGVzQnlQaztcblxuICAvLyAvLyBkYXRhIHVuaXQgZGV0YWlscyBmb3IgZGlzcGxheSBpbiBtb2RhbFxuICAvLyBwZUl0TW9kYWxzPzogUGVJdERldGFpbExpc3Q7XG5cbiAgLy8gLy8gY2h1bmsgTGlzdFxuICAvLyBjaHVua3M/OiBDaHVua0xpc3Q7XG5cbiAgLy8gLy8gSW5mUGVyc2lzdGVudEl0ZW1zIHdpdGggc3RhdGVtZW50cyBieSBwa19lbnRpdHlcbiAgLy8gcGVJdEdyYXBocz86IFBlSXRMaXN0O1xuXG4gIC8vIC8vIEluZlBlcnNpc3RlbnRJdGVtcyB3aXRoIHN0YXRlbWVudHMgYnkgcGtfZW50aXR5XG4gIC8vIHRlRW5HcmFwaHM/OiBUZUVuTGlzdDtcblxuICAvLyAvLyBDb21RdWVyeSBsaXN0IGJ5IHBrX2VudGl0eVxuICAvLyBjb21RdWVyeVZlcnNpb25zQnlQaz86IEVudGl0eVZlcnNpb25zQnlQazxQcm9RdWVyeT47XG4gIC8vIGNvbVF1ZXJ5TG9hZGluZz86IGJvb2xlYW47XG4gIC8vIGNvbVF1ZXJ5VmVyc2lvbkxvYWRpbmc/OiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfTtcblxuICAvLyAvLyBDb21WaXN1YWwgbGlzdCBieSBwa19lbnRpdHlcbiAgLy8gY29tVmlzdWFsVmVyc2lvbnNCeVBrPzogRW50aXR5VmVyc2lvbnNCeVBrPFByb1Zpc3VhbD47XG4gIC8vIGNvbVZpc3VhbExvYWRpbmc/OiBib29sZWFuO1xuICAvLyBjb21WaXN1YWxWZXJzaW9uTG9hZGluZz86IGJvb2xlYW47XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIExheW91dCDigJMgVGFic1xuICAgKi9cbiAgbGlzdD86IExpc3RUeXBlO1xuXG4gIHBhbmVscz86IFBhbmVsW11cblxuICAvLyBpbmRleCBvZiBmb2N1c2VkIFBhbmVsXG4gIGZvY3VzZWRQYW5lbD86IG51bWJlcjtcblxuICAvLyBzZXJpYWwgbnVtYmVyIGZvciBwYW5lbHNcbiAgcGFuZWxTZXJpYWw/OiBudW1iZXI7XG5cbiAgLy8gc2VyaWFsIG51bWJlciBmb3IgdWlJZFxuICB1aUlkU2VyaWFsPzogbnVtYmVyO1xuXG4gIHRhYkxheW91dHM/OiB7IFt1aUlkOiBzdHJpbmddOiBUYWJCYXNlIH1cblxuICAvLyByZWZlcmVuY2UgdGhlIHVpSWQgd2l0aGluIHRoZSBwYXRoIG9mIHRoZSB0YWIgKHVpSWQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwa19lbnRpdHkpXG4gIHRleHREZXRhaWxzPzogeyBbdWlJZDogc3RyaW5nXTogVGFiQmFzZSB9XG5cbiAgLy8gcmVmZXJlbmNlIHRoZSB1aUlkIHdpdGhpbiB0aGUgcGF0aCBvZiB0aGUgdGFiICh1aUlkIGhhcyBub3RoaW5nIHRvIGRvIHdpdGggcGtfZW50aXR5KVxuICBwZUl0RGV0YWlscz86IHsgW3VpSWQ6IHN0cmluZ106IEVudGl0eURldGFpbCB9XG5cbiAgLy8gLy8gcmVmZXJlbmNlIHRoZSB1aUlkIHdpdGhpbiB0aGUgcGF0aCBvZiB0aGUgdGFiICh1aUlkIGhhcyBub3RoaW5nIHRvIGRvIHdpdGggcGtfZW50aXR5KVxuICAvLyB0ZUVuRGV0YWlscz86IHsgW3VpSWQ6IHN0cmluZ106IFRlRW50RGV0YWlsIH1cblxuICAvLyByZWZlcmVuY2UgdGhlIHVpSWQgd2l0aGluIHRoZSBwYXRoIG9mIHRoZSB0YWIgKHVpSWQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwa19lbnRpdHkpXG4gIGFuYWx5c2lzRGV0YWlscz86IHsgW3VpSWQ6IHN0cmluZ106IGFueSB9XG5cbiAgLy8gLy8gcmVmZXJlbmNlIHRoZSB1aUlkIHdpdGhpbiB0aGUgcGF0aCBvZiB0aGUgdGFiICh1aUlkIGhhcyBub3RoaW5nIHRvIGRvIHdpdGggcGtfZW50aXR5KVxuICAvLyBxdWVyeURldGFpbHM/OiB7IFt1aUlkOiBzdHJpbmddOiBRdWVyeURldGFpbCB9XG5cbiAgLy8gLy8gcmVmZXJlbmNlIHRoZSB1aUlkIHdpdGhpbiB0aGUgcGF0aCBvZiB0aGUgdGFiICh1aUlkIGhhcyBub3RoaW5nIHRvIGRvIHdpdGggcGtfZW50aXR5KVxuICAvLyB2aXN1YWxEZXRhaWxzPzogeyBbdWlJZDogc3RyaW5nXTogVmlzdWFsRGV0YWlsIH1cblxuICAvLyByZWZlcmVuY2UgdGhlIHVpSWQgd2l0aGluIHRoZSBwYXRoIG9mIHRoZSB0YWIgKHVpSWQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwa19lbnRpdHkpXG4gIGNsYXNzZXNTZXR0aW5ncz86IHsgW3VpSWQ6IHN0cmluZ106IFByb2plY3RTZXR0aW5nc0RhdGEgfVxuXG4gIC8vIHJlZmVyZW5jZSB0aGUgdWlJZCB3aXRoaW4gdGhlIHBhdGggb2YgdGhlIHRhYiAodWlJZCBoYXMgbm90aGluZyB0byBkbyB3aXRoIHBrX2VudGl0eSlcbiAgY29udHJWb2NhYlNldHRpbmdzPzogeyBbdWlJZDogc3RyaW5nXTogVHlwZXMgfVxuXG4gIC8vIHJlZmVyZW5jZSB0aGUgdWlJZCB3aXRoaW4gdGhlIHBhdGggb2YgdGhlIHRhYiAodWlJZCBoYXMgbm90aGluZyB0byBkbyB3aXRoIHBrX2VudGl0eSlcbiAgb250b21lUHJvZmlsZXNTZXR0aW5ncz86IHsgW3VpSWQ6IHN0cmluZ106IGFueSB9XG5cbiAgLy8gLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyAgKiBMYXlvdXQg4oCTIE1vZGFsc1xuICAvLyAgKi9cblxuICAvLyBhZGRNb2RhbD86IENyZWF0ZU9yQWRkRW50aXR5O1xuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBUaGluZ3MgZm9yIE1lbnRpb25pbmdzIC8gQW5ub3RhdGlvbnNcbiAgICovXG5cblxuICAvLyAvLyB0aGUgY2h1bmsgdGhhdCBpcyB1c2VkIHRvIGNyZWF0ZSBtZW50aW9uaW5nc1xuICAvLyBzZWxlY3RlZENodW5rPzogRGF0Q2h1bms7XG5cbiAgLy8gaWYgdHJ1ZSwgdGhlIHRleHQgZWRpdG9yIGJlaGF2ZXMgc28gdGhhdCBlYWNoIG5vZGUgY2FuIGJlIGNsaWNrZWQgdG8gZGUtL2FjdGl2YXRlXG4gIHJlZmluaW5nQ2h1bms/OiBib29sZWFuO1xuXG4gIC8vIHRydWUsIHdoZW4gbWVudGlvbmluZyBpcyBiZWluZyBjcmVhdGVkLlxuICAvLyBUT0RPOiBjaGVjaywgaWYgbmVlZGVkXG4gIGNyZWF0aW5nTWVudGlvbmluZz86IGJvb2xlYW47XG5cbiAgLy8gQXJyYXkgb2YgcGtfZW50aXRpZXMgb2YgbWVudGlvbmluZ3MgKGEuay5hLiBzdGF0ZW1lbnRzIG9mIHByb3BlcnR5IFwiaXMgbWVudGlvbmVkIGluXCIpXG4gIC8vIHRoYXQgYXJlIGZvY3VzZWQgYnkgYSBjbGljayBvbiBhIGNodW5rIChpbiB0ZXh0IGVkaXRvcilcbiAgbWVudGlvbmluZ3NGb2N1c2VkSW5UZXh0PzogbnVtYmVyW11cblxuICAvLyBBcnJheSBvZiBwa19lbnRpdGllcyBvZiBtZW50aW9uaW5ncyAoYS5rLmEuIHN0YXRlbWVudHMgb2YgcHJvcGVydHkgXCJpcyBtZW50aW9uZWQgaW5cIilcbiAgLy8gdGhhdCBhcmUgZm9jdXNlZCBieSBjbGljayBvbiBtZW50aW9uaW5nIGluIGEgbGlzdC90YWJsZSB2aWV3XG4gIG1lbnRpb25pbmdzRm9jdXNlZEluVGFibGU/OiBudW1iZXJbXVxuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdENybSB7XG4gIGNsYXNzZXM/OiBDbGFzc0NvbmZpZ0xpc3Q7XG4gIHByb3BlcnRpZXM/OiBQcm9wZXJ0eUxpc3Rcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDbGFzc0NvbmZpZ0xpc3QgeyBbZGZoX3BrX2NsYXNzOiBudW1iZXJdOiBDbGFzc0NvbmZpZyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xhc3NDb25maWcge1xuICBwa0VudGl0eTogbnVtYmVyO1xuICBkZmhfcGtfY2xhc3M6IG51bWJlcjtcblxuICBsYWJlbDogc3RyaW5nO1xuICBkZmhfc3RhbmRhcmRfbGFiZWw6IHN0cmluZztcblxuICBwcm9maWxlTGFiZWxzOiBzdHJpbmc7XG4gIHByb2ZpbGVQa3M6IG51bWJlcltdO1xuXG4gIHByb2pSZWw/OiBQcm9EZmhDbGFzc1Byb2pSZWw7XG4gIGlzSW5Qcm9qZWN0PzogYm9vbGVhbjsgLy8gcmVmbGVjdHMgdGhlIGVuYWJsZWQgLyBkaXNhYmxlZCBzdGF0ZSBmcm9tIGRhdGEgc2V0dGluZ3Mgb2YgdGhlIHByb2plY3RcbiAgY2hhbmdpbmdQcm9qUmVsOiBib29sZWFuO1xuXG4gIHN1YmNsYXNzT2Y/OiAncGVJdCcgfCAndGVFbnQnIHwgJ290aGVyJzsgLy8gdG8gZGlzdGluZ3Vpc2ggVGVFbnRzIGZyb20gUGVJdHNcblxuICBzdWJjbGFzc09mVHlwZT86IGJvb2xlYW47IC8vIHRydWUgaWYgc3ViY2xhc3Mgb2YgRTU1IFR5cGVcblxuICBzY29wZU5vdGU6IHN0cmluZztcblxuICBkZmhfaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6IHN0cmluZztcblxuICAvLyBwcm9wZXJ0eUZpZWxkcz86IFByb3BlcnR5RmllbGRMaXN0O1xuICB1aUNvbnRleHRzPzoge1xuICAgIFtwazogbnVtYmVyXTogVWlDb250ZXh0XG4gIH1cblxuICByZXF1aXJlZF9ieV9zb3VyY2VzPzogYm9vbGVhblxuICByZXF1aXJlZF9ieV9lbnRpdGllcz86IGJvb2xlYW5cbiAgcmVxdWlyZWRfYnlfYmFzaWNzPzogYm9vbGVhblxuICBleGNsdWRlZF9mcm9tX2VudGl0aWVzPzogYm9vbGVhblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVpQ29udGV4dCBleHRlbmRzIFN5c0FwcENvbnRleHRJbnRlcmZhY2Uge1xuICB1aUVsZW1lbnRzPzogVWlFbGVtZW50W11cbn1cblxuLy8gc2hvcnQgdmVyc2lvbiBvZiBDb21VaUNvbnRleHRDb25maWdcbmV4cG9ydCBpbnRlcmZhY2UgVWlFbGVtZW50IHtcbiAgZmtfcHJvcGVydHk/OiBudW1iZXIsXG4gIHByb3BlcnR5X2lzX291dGdvaW5nPzogYm9vbGVhbixcbiAgcHJvcGVydHlGaWVsZEtleT86IHN0cmluZywgLy8gVE9ETzogbWVyZ2UgdGhlIHByb3BlcnR5RmllbGRLZXkgYW5kIHByb3BTZXRLZXkgdG8gZmllbGRLZXlcbiAgcHJvcFNldEtleT86IHN0cmluZyxcbiAgZmtfY2xhc3NfZmllbGQ/OiBudW1iZXIsXG4gIGNsYXNzX2ZpZWxkPzogU3lzQ2xhc3NGaWVsZEludGVyZmFjZVxuICBvcmRfbnVtOiBudW1iZXJcbn1cbiJdfQ==