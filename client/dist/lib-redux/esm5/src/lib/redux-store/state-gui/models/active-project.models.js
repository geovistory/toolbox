/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/models/active-project.models.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QubW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtZ3VpL21vZGVscy9hY3RpdmUtcHJvamVjdC5tb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFNQSxvQ0FLQzs7O0lBSkMsK0JBQWU7O0lBQ2YscUNBQXFCOztJQUNyQiwwQ0FBK0I7O0lBQy9CLG9DQUFtQjs7Ozs7O0FBR3JCLGdDQUVDOzs7OztBQUVELG1DQUdDOzs7SUFGQyx1Q0FBdUI7Ozs7Ozs7QUFJekIsd0NBRUM7Ozs7QUFFRCwrQkFBNEQ7Ozs7QUFDNUQsOEJBQW9FOzs7O0FBQ3BFLDhCQUFvRTs7OztBQUNwRSxrQ0FBbUU7Ozs7QUFDbkUsOEJBQStFOzs7SUFBekIsa0NBQXVCOzs7OztBQUM3RSxrQ0FBcUU7Ozs7QUFDckUsK0JBQTZEOzs7O0FBRTdELGlDQUFpRjs7O0lBQXpCLHFDQUF1Qjs7Ozs7QUFDL0UseUNBQStFOzs7O0FBQy9FLHFDQUF3RTs7OztBQU94RSwyQkFHQzs7O0lBRkMsbUJBQVc7O0lBQ1gscUJBQXNCOzs7Ozs7QUFJeEIsOEJBZ0JDOzs7SUFkQywwQkFBZ0I7O0lBRWhCLDZCQUErTTs7SUFFL00sd0JBQWM7O0lBRWQsK0JBQTBNOztJQUUxTSx3QkFBUTs7SUFFUix3QkFBZ0I7O0lBRWhCLDZCQUErQjs7SUFDL0IsNEJBQStCOzs7OztBQUVqQyxpQ0FNQzs7O0lBSkMsdUNBR0M7Ozs7O0FBU0gscUNBR0M7OztJQUZDLG1DQUFrQjs7SUFDbEIseUNBQXdCOzs7OztBQUUxQiw2QkFpQkM7OztJQWhCQywyQkFBa0I7O0lBR2xCLDZCQUFvQjs7SUFHcEIsbUNBR0M7Ozs7O0FBU0gsK0JBR0M7OztJQUZDLDZCQUFrQjs7SUFDbEIsMEJBQWlCOzs7OztBQUduQixtQ0E0SEM7Ozs7Ozs7SUFwSEMsMENBQTRCOztJQUM1Qiw4Q0FBZ0M7Ozs7OztJQTJDaEMsNkJBQWdCOztJQUVoQiwrQkFBZ0I7O0lBR2hCLHFDQUFzQjs7SUFHdEIsb0NBQXFCOztJQUdyQixtQ0FBb0I7O0lBRXBCLG1DQUF3Qzs7SUFHeEMsb0NBQXlDOztJQUd6QyxvQ0FBOEM7O0lBTTlDLHdDQUF5Qzs7SUFTekMsd0NBQXlEOztJQUd6RCwyQ0FBOEM7O0lBRzlDLCtDQUFnRDs7Ozs7O0lBa0JoRCxzQ0FBd0I7O0lBSXhCLDJDQUE2Qjs7SUFJN0IsaURBQW1DOztJQUluQyxrREFBb0M7Ozs7O0FBSXRDLGdDQUdDOzs7SUFGQyw2QkFBMEI7O0lBQzFCLGdDQUF5Qjs7Ozs7QUFHM0IscUNBQXdFOzs7O0FBRXhFLGlDQStCQzs7O0lBOUJDLCtCQUFpQjs7SUFDakIsbUNBQXFCOztJQUVyQiw0QkFBYzs7SUFDZCx5Q0FBMkI7O0lBRTNCLG9DQUFzQjs7SUFDdEIsaUNBQXFCOztJQUVyQiw4QkFBNkI7O0lBQzdCLGtDQUFzQjs7SUFDdEIsc0NBQXlCOztJQUV6QixpQ0FBd0M7O0lBRXhDLHFDQUF5Qjs7SUFFekIsZ0NBQWtCOztJQUVsQixrREFBb0M7O0lBR3BDLGlDQUVDOztJQUVELDBDQUE2Qjs7SUFDN0IsMkNBQThCOztJQUM5Qix5Q0FBNEI7O0lBQzVCLDZDQUFnQzs7Ozs7QUFHbEMsK0JBRUM7OztJQURDLCtCQUF3Qjs7Ozs7QUFJMUIsK0JBUUM7OztJQVBDLGdDQUFxQjs7SUFDckIseUNBQStCOztJQUMvQixxQ0FBMEI7O0lBQzFCLCtCQUFvQjs7SUFDcEIsbUNBQXdCOztJQUN4QixnQ0FBb0M7O0lBQ3BDLDRCQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0Q2h1bmssIEluZlBlcnNpc3RlbnRJdGVtLCBJbmZUZW1wb3JhbEVudGl0eSwgUHJvRGZoQ2xhc3NQcm9qUmVsLCBTeXNBcHBDb250ZXh0SW50ZXJmYWNlLCBTeXNDbGFzc0ZpZWxkSW50ZXJmYWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERmaFByb3BlcnR5LCBJbmZMYW5ndWFnZSwgV2FyRW50aXR5UHJldmlldyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBFbnRpdHlEZXRhaWwsIFByb2plY3RTZXR0aW5nc0RhdGEsIFRhYkJhc2UsIFR5cGVzIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdCc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0UHJldmlldyB7XG4gIGxhYmVsPzogc3RyaW5nLFxuICBkZXNjcmlwdGlvbj86IHN0cmluZyxcbiAgZGVmYXVsdF9sYW5ndWFnZT86IEluZkxhbmd1YWdlLFxuICBwa19wcm9qZWN0PzogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5QnlQazxUPiB7XG4gIFtwa19lbnRpdHk6IG51bWJlcl06IFRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBWZXJzaW9uRW50aXR5PFQ+IHtcbiAgX2xhdGVzdFZlcnNpb246IG51bWJlciwgLy8gdmVyc2lvbiBudW1iZXIgb2YgdGhlIGxhdGVzdCB2ZXJzaW9uXG4gIFt2OiBudW1iZXJdOiBUXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5VmVyc2lvbnNCeVBrPFQ+IHtcbiAgW3BrX2VudGl0eTogbnVtYmVyXTogVmVyc2lvbkVudGl0eTxUPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENodW5rTGlzdCB7IFtwa19lbnRpdHk6IG51bWJlcl06IERhdENodW5rIH1cbmV4cG9ydCBpbnRlcmZhY2UgUGVJdExpc3QgeyBbcGtfZW50aXR5OiBudW1iZXJdOiBJbmZQZXJzaXN0ZW50SXRlbSB9XG5leHBvcnQgaW50ZXJmYWNlIFRlRW5MaXN0IHsgW3BrX2VudGl0eTogbnVtYmVyXTogSW5mVGVtcG9yYWxFbnRpdHkgfVxuZXhwb3J0IGludGVyZmFjZSBQcm9wZXJ0eUxpc3QgeyBbcGtfZW50aXR5OiBzdHJpbmddOiBEZmhQcm9wZXJ0eTsgfVxuZXhwb3J0IGludGVyZmFjZSBUeXBlUGVJdCBleHRlbmRzIEluZlBlcnNpc3RlbnRJdGVtIHsgZmtfdHlwZWRfY2xhc3M6IG51bWJlcjsgfSAvLyBUT0RPIHJlbW92ZSBpZiByZXBsYWNlZCBieSBUeXBlUHJldmlld1xuZXhwb3J0IGludGVyZmFjZSBUeXBlc0J5Q2xhc3MgeyBbZGZoX3BrX2NsYXNzOiBzdHJpbmddOiBUeXBlUGVJdFtdOyB9XG5leHBvcnQgaW50ZXJmYWNlIFR5cGVzQnlQayB7IFtwa19lbnRpdHk6IHN0cmluZ106IFR5cGVQZUl0OyB9XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZVByZXZpZXcgZXh0ZW5kcyBXYXJFbnRpdHlQcmV2aWV3IHsgZmtfdHlwZWRfY2xhc3M6IG51bWJlcjsgfVxuZXhwb3J0IGludGVyZmFjZSBUeXBlUHJldmlld3NCeUNsYXNzIHsgW2RmaF9wa19jbGFzczogc3RyaW5nXTogVHlwZVByZXZpZXdbXTsgfVxuZXhwb3J0IGludGVyZmFjZSBUeXBlUHJldmlld0xpc3QgeyBbcGtfZW50aXR5OiBzdHJpbmddOiBUeXBlUHJldmlld1tdOyB9XG4vLyBleHBvcnQgaW50ZXJmYWNlIENvbVF1ZXJ5QnlQayB7IFtrZXk6IHN0cmluZ106IFByb1F1ZXJ5IH1cblxuLy8gZXhwb3J0IGludGVyZmFjZSBIYXNUeXBlUHJvcGVydHlMaXN0IHsgW2RmaF9wa19wcm9wZXJ0eTogbnVtYmVyXTogSGFzVHlwZVByb3BlcnR5UmVhZGFibGUgfVxuXG5leHBvcnQgdHlwZSBJY29uVHlwZSA9ICd0ZXh0JyB8ICd0YWJsZScgfCAncGVyc2lzdGVudC1lbnRpdHknIHwgJ3RlbXBvcmFsLWVudGl0eScgfCAnc291cmNlJyB8ICdleHByZXNzaW9uLXBvcnRpb24nIHwgJ2FuYWx5c2lzJyB8ICdxdWVyeScgfCAndmlzdWFsJyB8ICdzdG9yeScgfCAnc2V0dGluZ3MnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhbmVsIHtcbiAgaWQ6IG51bWJlcjtcbiAgdGFiczogUGFuZWxUYWI8YW55PltdO1xufVxuXG5leHBvcnQgdHlwZSBMaXN0VHlwZSA9ICcnIHwgJ2VudGl0aWVzJyB8ICdzb3VyY2VzJyB8ICdhbmFseXNpcycgfCAncXVlcmllcycgfCAndmlzdWFscycgfCAnc3RvcmllcycgfCAnc2V0dGluZ3MnO1xuZXhwb3J0IGludGVyZmFjZSBQYW5lbFRhYjxEPiB7XG4gIC8vIHdoZXRlciB0YWIgaXMgYWN0aXZlIG9yIG5vdFxuICBhY3RpdmU6IGJvb2xlYW47XG4gIC8vIHRoZSByb290IGNvbXBvbmVudCBpbmNsdWRlZCBpbiB0aGlzIHRhYiwgaW4gZGFzaCBzZXBhcmF0ZSBtaW51c2NsZXM6IFBlSXREZXRhaWxDb21wb25lbnQgLT4gJ2VudGl0eS1kZXRhaWwnXG4gIGNvbXBvbmVudDogJ3RleHQtZGV0YWlsJyB8ICd0YWJsZS1kZXRhaWwnIHwgJ2VudGl0eS1kZXRhaWwnIHwgJ3RlLWVuLWRldGFpbCcgfCAnYW5hbHlzaXMtZGV0YWlsJyB8ICdxdWVyeS1kZXRhaWwnIHwgJ3Zpc3VhbC1kZXRhaWwnIHwgJ29udG9tZS1wcm9maWxlcy1zZXR0aW5ncycgfCAnY2xhc3Nlcy1zZXR0aW5ncycgfCAnY29udHItdm9jYWItc2V0dGluZ3MnO1xuICAvLyBpY29uIHRvIGJlIGRpc3BsYXllZCBpbiB0YWIsIGUuZy46IGd2LWljb24tc291cmNlXG4gIGljb246IEljb25UeXBlXG4gIC8vIG5hbWUgb2YgdGhlIHBhdGhTZWdtZW50IHVuZGVyICdhY3RpdmVQcm9qZWN0JywgdXNlZCB0byBnZW5lcmF0ZSB0aGUgcGF0aDogWydhY3RpdmVQcm9qZWN0JywgcGF0aFNlZ21lbnQsIHVpSWRdXG4gIHBhdGhTZWdtZW50PzogJ3RleHREZXRhaWxzJyB8ICd0YWJsZURldGFpbHMnIHwgJ3BlSXREZXRhaWxzJyB8ICd0ZUVuRGV0YWlscycgfCAnYW5hbHlzaXNEZXRhaWxzJyB8ICdxdWVyeURldGFpbHMnIHwgJ3Zpc3VhbERldGFpbHMnIHwgJ29udG9tZVByb2ZpbGVzU2V0dGluZ3MnIHwgJ2NsYXNzZXNTZXR0aW5ncycgfCAnY29udHJWb2NhYlNldHRpbmdzJztcbiAgLy8gZGF0YSB0byBwYXNzIHRvIGNvbXBvbmVudCB2aWEgaW5wdXQgdmFyaWFiYWxlc1xuICBkYXRhPzogRFxuICAvLyBnZW5lcmF0ZWQgYnkgcmVkdWNlcjogYmFzZSBwYXRoIHdoZXJlIHRoZSBjb21wb25lbnQgd2lsbCBiZSBhdHRhdGNoIGhpcyBTdWJTdG9yZVxuICBwYXRoPzogc3RyaW5nW107XG4gIC8vIGdlbmVyYXRlZCBvbiB0aGUgZmx5LCBuZXZlciBpbiBzdG9yZVxuICB0YWJUaXRsZSQ/OiBPYnNlcnZhYmxlPHN0cmluZz47XG4gIGxvYWRpbmckPzogT2JzZXJ2YWJsZTxib29sZWFuPjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgUGVJdFRhYkRhdGEge1xuICAvLyBVc2VkIGJ5IHBlSXQgZGV0YWlsIHN0YXRlIGNyZWF0b1xuICBwZUl0RGV0YWlsQ29uZmlnPzoge1xuICAgIHBlSXREZXRhaWw/OiBFbnRpdHlEZXRhaWxcbiAgICAvLyBzdGF0ZVNldHRpbmdzPzogU3RhdGVTZXR0aW5nc1xuICB9XG59XG4vLyBleHBvcnQgaW50ZXJmYWNlIFRlRW50VGFiRGF0YSB7XG4vLyAgIC8vIFVzZWQgYnkgdGVFbnQgZGV0YWlsIHN0YXRlIGNyZWF0b1xuLy8gICB0ZUVudERldGFpbENvbmZpZz86IHtcbi8vICAgICB0ZUVudERldGFpbD86IFRlRW50RGV0YWlsXG4vLyAgICAgLy8gc3RhdGVTZXR0aW5ncz86IFN0YXRlU2V0dGluZ3Ncbi8vICAgfVxuLy8gfVxuZXhwb3J0IGludGVyZmFjZSBBbmFseXNpc1RhYkRhdGEge1xuICBwa0VudGl0eT86IG51bWJlcjtcbiAgZmtBbmFseXNpc1R5cGU/OiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIFRhYkRhdGEge1xuICBwa0VudGl0eT86IG51bWJlcjtcbiAgLy8gY2xhc3NBbmRUeXBlUGs/OiBDbGFzc0FuZFR5cGVQaztcblxuICBwa1Byb3BlcnR5PzogbnVtYmVyO1xuXG4gIC8vIFVzZWQgYnkgcGVJdCBkZXRhaWwgc3RhdGUgY3JlYXRvXG4gIHBlSXREZXRhaWxDb25maWc/OiB7XG4gICAgcGVJdERldGFpbD86IEVudGl0eURldGFpbFxuICAgIC8vIHN0YXRlU2V0dGluZ3M/OiBTdGF0ZVNldHRpbmdzXG4gIH1cblxuICAvLyAvLyBVc2VkIGJ5IHRlRW50IGRldGFpbCBzdGF0ZSBjcmVhdG9cbiAgLy8gdGVFbnREZXRhaWxDb25maWc/OiB7XG4gIC8vICAgdGVFbnREZXRhaWw/OiBUZUVudERldGFpbFxuICAvLyAgIC8vIHN0YXRlU2V0dGluZ3M/OiBTdGF0ZVNldHRpbmdzw5pcbiAgLy8gfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJhbVNvdXJjZSB7XG4gIHBrRW50aXR5PzogbnVtYmVyLFxuICBjaHVuaz86IERhdENodW5rO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3REZXRhaWwgZXh0ZW5kcyBQcm9qZWN0UHJldmlldyB7XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBDUk0gYW5kIFByb2plY3QgQ29uZmlnXG4gICAqL1xuXG4gIC8vIENvbmNlcHRpb25hbCBSZWZlcmVuY2UgTW9kZWxcbiAgLy8gY3JtPzogUHJvamVjdENybSxcbiAgbG9hZGluZ0NvbmZpZ0RhdGE/OiBib29sZWFuO1xuICBjb25maWdEYXRhSW5pdGlhbGl6ZWQ/OiBib29sZWFuO1xuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogSW5mb3JtYXRpb24gQ2FjaGVcbiAgICovXG5cbiAgLy8gaW5mPzogSW5mO1xuXG4gIC8vIC8vIGRhdGEgdW5pdCBwcmV2aWV3c1xuICAvLyBlbnRpdHlQcmV2aWV3cz86IEVudGl0eVByZXZpZXdMaXN0O1xuXG4gIC8vIC8vIHR5cGVzIGJ5IHBrIGNsYXNzXG4gIC8vIHR5cGVzQnlDbGFzcz86IFR5cGVzQnlDbGFzcztcblxuICAvLyAvLyB0eXBlcyBieSBwa19lbnRpdHlcbiAgLy8gdHlwZXNCeVBrPzogVHlwZXNCeVBrO1xuXG4gIC8vIC8vIGRhdGEgdW5pdCBkZXRhaWxzIGZvciBkaXNwbGF5IGluIG1vZGFsXG4gIC8vIHBlSXRNb2RhbHM/OiBQZUl0RGV0YWlsTGlzdDtcblxuICAvLyAvLyBjaHVuayBMaXN0XG4gIC8vIGNodW5rcz86IENodW5rTGlzdDtcblxuICAvLyAvLyBJbmZQZXJzaXN0ZW50SXRlbXMgd2l0aCBzdGF0ZW1lbnRzIGJ5IHBrX2VudGl0eVxuICAvLyBwZUl0R3JhcGhzPzogUGVJdExpc3Q7XG5cbiAgLy8gLy8gSW5mUGVyc2lzdGVudEl0ZW1zIHdpdGggc3RhdGVtZW50cyBieSBwa19lbnRpdHlcbiAgLy8gdGVFbkdyYXBocz86IFRlRW5MaXN0O1xuXG4gIC8vIC8vIENvbVF1ZXJ5IGxpc3QgYnkgcGtfZW50aXR5XG4gIC8vIGNvbVF1ZXJ5VmVyc2lvbnNCeVBrPzogRW50aXR5VmVyc2lvbnNCeVBrPFByb1F1ZXJ5PjtcbiAgLy8gY29tUXVlcnlMb2FkaW5nPzogYm9vbGVhbjtcbiAgLy8gY29tUXVlcnlWZXJzaW9uTG9hZGluZz86IHsgW2tleTogc3RyaW5nXTogYm9vbGVhbiB9O1xuXG4gIC8vIC8vIENvbVZpc3VhbCBsaXN0IGJ5IHBrX2VudGl0eVxuICAvLyBjb21WaXN1YWxWZXJzaW9uc0J5UGs/OiBFbnRpdHlWZXJzaW9uc0J5UGs8UHJvVmlzdWFsPjtcbiAgLy8gY29tVmlzdWFsTG9hZGluZz86IGJvb2xlYW47XG4gIC8vIGNvbVZpc3VhbFZlcnNpb25Mb2FkaW5nPzogYm9vbGVhbjtcblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogTGF5b3V0IOKAkyBUYWJzXG4gICAqL1xuICBsaXN0PzogTGlzdFR5cGU7XG5cbiAgcGFuZWxzPzogUGFuZWxbXVxuXG4gIC8vIGluZGV4IG9mIGZvY3VzZWQgUGFuZWxcbiAgZm9jdXNlZFBhbmVsPzogbnVtYmVyO1xuXG4gIC8vIHNlcmlhbCBudW1iZXIgZm9yIHBhbmVsc1xuICBwYW5lbFNlcmlhbD86IG51bWJlcjtcblxuICAvLyBzZXJpYWwgbnVtYmVyIGZvciB1aUlkXG4gIHVpSWRTZXJpYWw/OiBudW1iZXI7XG5cbiAgdGFiTGF5b3V0cz86IHsgW3VpSWQ6IHN0cmluZ106IFRhYkJhc2UgfVxuXG4gIC8vIHJlZmVyZW5jZSB0aGUgdWlJZCB3aXRoaW4gdGhlIHBhdGggb2YgdGhlIHRhYiAodWlJZCBoYXMgbm90aGluZyB0byBkbyB3aXRoIHBrX2VudGl0eSlcbiAgdGV4dERldGFpbHM/OiB7IFt1aUlkOiBzdHJpbmddOiBUYWJCYXNlIH1cblxuICAvLyByZWZlcmVuY2UgdGhlIHVpSWQgd2l0aGluIHRoZSBwYXRoIG9mIHRoZSB0YWIgKHVpSWQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwa19lbnRpdHkpXG4gIHBlSXREZXRhaWxzPzogeyBbdWlJZDogc3RyaW5nXTogRW50aXR5RGV0YWlsIH1cblxuICAvLyAvLyByZWZlcmVuY2UgdGhlIHVpSWQgd2l0aGluIHRoZSBwYXRoIG9mIHRoZSB0YWIgKHVpSWQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwa19lbnRpdHkpXG4gIC8vIHRlRW5EZXRhaWxzPzogeyBbdWlJZDogc3RyaW5nXTogVGVFbnREZXRhaWwgfVxuXG4gIC8vIHJlZmVyZW5jZSB0aGUgdWlJZCB3aXRoaW4gdGhlIHBhdGggb2YgdGhlIHRhYiAodWlJZCBoYXMgbm90aGluZyB0byBkbyB3aXRoIHBrX2VudGl0eSlcbiAgYW5hbHlzaXNEZXRhaWxzPzogeyBbdWlJZDogc3RyaW5nXTogYW55IH1cblxuICAvLyAvLyByZWZlcmVuY2UgdGhlIHVpSWQgd2l0aGluIHRoZSBwYXRoIG9mIHRoZSB0YWIgKHVpSWQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwa19lbnRpdHkpXG4gIC8vIHF1ZXJ5RGV0YWlscz86IHsgW3VpSWQ6IHN0cmluZ106IFF1ZXJ5RGV0YWlsIH1cblxuICAvLyAvLyByZWZlcmVuY2UgdGhlIHVpSWQgd2l0aGluIHRoZSBwYXRoIG9mIHRoZSB0YWIgKHVpSWQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwa19lbnRpdHkpXG4gIC8vIHZpc3VhbERldGFpbHM/OiB7IFt1aUlkOiBzdHJpbmddOiBWaXN1YWxEZXRhaWwgfVxuXG4gIC8vIHJlZmVyZW5jZSB0aGUgdWlJZCB3aXRoaW4gdGhlIHBhdGggb2YgdGhlIHRhYiAodWlJZCBoYXMgbm90aGluZyB0byBkbyB3aXRoIHBrX2VudGl0eSlcbiAgY2xhc3Nlc1NldHRpbmdzPzogeyBbdWlJZDogc3RyaW5nXTogUHJvamVjdFNldHRpbmdzRGF0YSB9XG5cbiAgLy8gcmVmZXJlbmNlIHRoZSB1aUlkIHdpdGhpbiB0aGUgcGF0aCBvZiB0aGUgdGFiICh1aUlkIGhhcyBub3RoaW5nIHRvIGRvIHdpdGggcGtfZW50aXR5KVxuICBjb250clZvY2FiU2V0dGluZ3M/OiB7IFt1aUlkOiBzdHJpbmddOiBUeXBlcyB9XG5cbiAgLy8gcmVmZXJlbmNlIHRoZSB1aUlkIHdpdGhpbiB0aGUgcGF0aCBvZiB0aGUgdGFiICh1aUlkIGhhcyBub3RoaW5nIHRvIGRvIHdpdGggcGtfZW50aXR5KVxuICBvbnRvbWVQcm9maWxlc1NldHRpbmdzPzogeyBbdWlJZDogc3RyaW5nXTogYW55IH1cblxuICAvLyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vICAqIExheW91dCDigJMgTW9kYWxzXG4gIC8vICAqL1xuXG4gIC8vIGFkZE1vZGFsPzogQ3JlYXRlT3JBZGRFbnRpdHk7XG5cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIFRoaW5ncyBmb3IgTWVudGlvbmluZ3MgLyBBbm5vdGF0aW9uc1xuICAgKi9cblxuXG4gIC8vIC8vIHRoZSBjaHVuayB0aGF0IGlzIHVzZWQgdG8gY3JlYXRlIG1lbnRpb25pbmdzXG4gIC8vIHNlbGVjdGVkQ2h1bms/OiBEYXRDaHVuaztcblxuICAvLyBpZiB0cnVlLCB0aGUgdGV4dCBlZGl0b3IgYmVoYXZlcyBzbyB0aGF0IGVhY2ggbm9kZSBjYW4gYmUgY2xpY2tlZCB0byBkZS0vYWN0aXZhdGVcbiAgcmVmaW5pbmdDaHVuaz86IGJvb2xlYW47XG5cbiAgLy8gdHJ1ZSwgd2hlbiBtZW50aW9uaW5nIGlzIGJlaW5nIGNyZWF0ZWQuXG4gIC8vIFRPRE86IGNoZWNrLCBpZiBuZWVkZWRcbiAgY3JlYXRpbmdNZW50aW9uaW5nPzogYm9vbGVhbjtcblxuICAvLyBBcnJheSBvZiBwa19lbnRpdGllcyBvZiBtZW50aW9uaW5ncyAoYS5rLmEuIHN0YXRlbWVudHMgb2YgcHJvcGVydHkgXCJpcyBtZW50aW9uZWQgaW5cIilcbiAgLy8gdGhhdCBhcmUgZm9jdXNlZCBieSBhIGNsaWNrIG9uIGEgY2h1bmsgKGluIHRleHQgZWRpdG9yKVxuICBtZW50aW9uaW5nc0ZvY3VzZWRJblRleHQ/OiBudW1iZXJbXVxuXG4gIC8vIEFycmF5IG9mIHBrX2VudGl0aWVzIG9mIG1lbnRpb25pbmdzIChhLmsuYS4gc3RhdGVtZW50cyBvZiBwcm9wZXJ0eSBcImlzIG1lbnRpb25lZCBpblwiKVxuICAvLyB0aGF0IGFyZSBmb2N1c2VkIGJ5IGNsaWNrIG9uIG1lbnRpb25pbmcgaW4gYSBsaXN0L3RhYmxlIHZpZXdcbiAgbWVudGlvbmluZ3NGb2N1c2VkSW5UYWJsZT86IG51bWJlcltdXG5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0Q3JtIHtcbiAgY2xhc3Nlcz86IENsYXNzQ29uZmlnTGlzdDtcbiAgcHJvcGVydGllcz86IFByb3BlcnR5TGlzdFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENsYXNzQ29uZmlnTGlzdCB7IFtkZmhfcGtfY2xhc3M6IG51bWJlcl06IENsYXNzQ29uZmlnIH1cblxuZXhwb3J0IGludGVyZmFjZSBDbGFzc0NvbmZpZyB7XG4gIHBrRW50aXR5OiBudW1iZXI7XG4gIGRmaF9wa19jbGFzczogbnVtYmVyO1xuXG4gIGxhYmVsOiBzdHJpbmc7XG4gIGRmaF9zdGFuZGFyZF9sYWJlbDogc3RyaW5nO1xuXG4gIHByb2ZpbGVMYWJlbHM6IHN0cmluZztcbiAgcHJvZmlsZVBrczogbnVtYmVyW107XG5cbiAgcHJvalJlbD86IFByb0RmaENsYXNzUHJvalJlbDtcbiAgaXNJblByb2plY3Q/OiBib29sZWFuOyAvLyByZWZsZWN0cyB0aGUgZW5hYmxlZCAvIGRpc2FibGVkIHN0YXRlIGZyb20gZGF0YSBzZXR0aW5ncyBvZiB0aGUgcHJvamVjdFxuICBjaGFuZ2luZ1Byb2pSZWw6IGJvb2xlYW47XG5cbiAgc3ViY2xhc3NPZj86ICdwZUl0JyB8ICd0ZUVudCcgfCAnb3RoZXInOyAvLyB0byBkaXN0aW5ndWlzaCBUZUVudHMgZnJvbSBQZUl0c1xuXG4gIHN1YmNsYXNzT2ZUeXBlPzogYm9vbGVhbjsgLy8gdHJ1ZSBpZiBzdWJjbGFzcyBvZiBFNTUgVHlwZVxuXG4gIHNjb3BlTm90ZTogc3RyaW5nO1xuXG4gIGRmaF9pZGVudGlmaWVyX2luX25hbWVzcGFjZTogc3RyaW5nO1xuXG4gIC8vIHByb3BlcnR5RmllbGRzPzogUHJvcGVydHlGaWVsZExpc3Q7XG4gIHVpQ29udGV4dHM/OiB7XG4gICAgW3BrOiBudW1iZXJdOiBVaUNvbnRleHRcbiAgfVxuXG4gIHJlcXVpcmVkX2J5X3NvdXJjZXM/OiBib29sZWFuXG4gIHJlcXVpcmVkX2J5X2VudGl0aWVzPzogYm9vbGVhblxuICByZXF1aXJlZF9ieV9iYXNpY3M/OiBib29sZWFuXG4gIGV4Y2x1ZGVkX2Zyb21fZW50aXRpZXM/OiBib29sZWFuXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVWlDb250ZXh0IGV4dGVuZHMgU3lzQXBwQ29udGV4dEludGVyZmFjZSB7XG4gIHVpRWxlbWVudHM/OiBVaUVsZW1lbnRbXVxufVxuXG4vLyBzaG9ydCB2ZXJzaW9uIG9mIENvbVVpQ29udGV4dENvbmZpZ1xuZXhwb3J0IGludGVyZmFjZSBVaUVsZW1lbnQge1xuICBma19wcm9wZXJ0eT86IG51bWJlcixcbiAgcHJvcGVydHlfaXNfb3V0Z29pbmc/OiBib29sZWFuLFxuICBwcm9wZXJ0eUZpZWxkS2V5Pzogc3RyaW5nLCAvLyBUT0RPOiBtZXJnZSB0aGUgcHJvcGVydHlGaWVsZEtleSBhbmQgcHJvcFNldEtleSB0byBmaWVsZEtleVxuICBwcm9wU2V0S2V5Pzogc3RyaW5nLFxuICBma19jbGFzc19maWVsZD86IG51bWJlcixcbiAgY2xhc3NfZmllbGQ/OiBTeXNDbGFzc0ZpZWxkSW50ZXJmYWNlXG4gIG9yZF9udW06IG51bWJlclxufVxuIl19