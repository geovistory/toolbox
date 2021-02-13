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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlLXByb2plY3QubW9kZWxzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtZ3VpL21vZGVscy9hY3RpdmUtcHJvamVjdC5tb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFTQSxvQ0FLQzs7O0lBSkMsK0JBQWU7O0lBQ2YscUNBQXFCOztJQUNyQiwwQ0FBK0I7O0lBQy9CLG9DQUFtQjs7Ozs7O0FBR3JCLGdDQUVDOzs7OztBQUVELG1DQUdDOzs7SUFGQyx1Q0FBdUI7Ozs7Ozs7QUFJekIsd0NBRUM7Ozs7QUFFRCwrQkFBNEQ7Ozs7QUFDNUQsOEJBQW9FOzs7O0FBQ3BFLDhCQUFvRTs7OztBQUNwRSxrQ0FBbUU7Ozs7QUFDbkUsOEJBQStFOzs7SUFBekIsa0NBQXVCOzs7OztBQUM3RSxrQ0FBcUU7Ozs7QUFDckUsK0JBQTZEOzs7O0FBRTdELGlDQUFpRjs7O0lBQXpCLHFDQUF1Qjs7Ozs7QUFDL0UseUNBQStFOzs7O0FBQy9FLHFDQUF3RTs7OztBQU94RSwyQkFHQzs7O0lBRkMsbUJBQVc7O0lBQ1gscUJBQXNCOzs7Ozs7QUFJeEIsOEJBZ0JDOzs7SUFkQywwQkFBZ0I7O0lBRWhCLDZCQUErTTs7SUFFL00sd0JBQWM7O0lBRWQsK0JBQTBNOztJQUUxTSx3QkFBUTs7SUFFUix3QkFBZ0I7O0lBRWhCLDZCQUErQjs7SUFDL0IsNEJBQStCOzs7OztBQUVqQyxpQ0FNQzs7O0lBSkMsdUNBR0M7Ozs7O0FBU0gscUNBR0M7OztJQUZDLG1DQUFrQjs7SUFDbEIseUNBQXdCOzs7OztBQUUxQiw2QkFpQkM7OztJQWhCQywyQkFBa0I7O0lBR2xCLDZCQUFvQjs7SUFHcEIsbUNBR0M7Ozs7O0FBU0gsK0JBR0M7OztJQUZDLDZCQUFrQjs7SUFDbEIsMEJBQWlCOzs7OztBQUduQixtQ0E0SEM7Ozs7Ozs7SUFwSEMsMENBQTRCOztJQUM1Qiw4Q0FBZ0M7Ozs7OztJQTJDaEMsNkJBQWdCOztJQUVoQiwrQkFBZ0I7O0lBR2hCLHFDQUFzQjs7SUFHdEIsb0NBQXFCOztJQUdyQixtQ0FBb0I7O0lBRXBCLG1DQUF3Qzs7SUFHeEMsb0NBQXlDOztJQUd6QyxvQ0FBOEM7O0lBTTlDLHdDQUF5Qzs7SUFTekMsd0NBQXlEOztJQUd6RCwyQ0FBOEM7O0lBRzlDLCtDQUFnRDs7Ozs7O0lBa0JoRCxzQ0FBd0I7O0lBSXhCLDJDQUE2Qjs7SUFJN0IsaURBQW1DOztJQUluQyxrREFBb0M7Ozs7O0FBSXRDLGdDQUdDOzs7SUFGQyw2QkFBMEI7O0lBQzFCLGdDQUF5Qjs7Ozs7QUFHM0IscUNBQXdFOzs7O0FBRXhFLGlDQStCQzs7O0lBOUJDLCtCQUFpQjs7SUFDakIsbUNBQXFCOztJQUVyQiw0QkFBYzs7SUFDZCx5Q0FBMkI7O0lBRTNCLG9DQUFzQjs7SUFDdEIsaUNBQXFCOztJQUVyQiw4QkFBNkI7O0lBQzdCLGtDQUFzQjs7SUFDdEIsc0NBQXlCOztJQUV6QixpQ0FBd0M7O0lBRXhDLHFDQUF5Qjs7SUFFekIsZ0NBQWtCOztJQUVsQixrREFBb0M7O0lBR3BDLGlDQUVDOztJQUVELDBDQUE2Qjs7SUFDN0IsMkNBQThCOztJQUM5Qix5Q0FBNEI7O0lBQzVCLDZDQUFnQzs7Ozs7QUFHbEMsK0JBRUM7OztJQURDLCtCQUF3Qjs7Ozs7QUFJMUIsK0JBUUM7OztJQVBDLGdDQUFxQjs7SUFDckIseUNBQStCOztJQUMvQixxQ0FBMEI7O0lBQzFCLCtCQUFvQjs7SUFDcEIsbUNBQXdCOztJQUN4QixnQ0FBb0M7O0lBQ3BDLDRCQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0Q2h1bmssIEluZlBlcnNpc3RlbnRJdGVtLCBJbmZUZW1wb3JhbEVudGl0eSwgUHJvRGZoQ2xhc3NQcm9qUmVsLCBTeXNBcHBDb250ZXh0SW50ZXJmYWNlLCBTeXNDbGFzc0ZpZWxkSW50ZXJmYWNlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IERmaFByb3BlcnR5LCBJbmZMYW5ndWFnZSwgV2FyRW50aXR5UHJldmlldyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBUeXBlcyB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QvdHlwZXMubW9kZWxzJztcbmltcG9ydCB7IEVudGl0eURldGFpbCB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QvZW50aXR5LWRldGFpbCc7XG5pbXBvcnQgeyBUYWJCYXNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC90YWItbGF5b3V0Lm1vZGVscyc7XG5pbXBvcnQgeyBQcm9qZWN0U2V0dGluZ3NEYXRhIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC9wcm9qZWN0LXNldHRpbmdzLWRhdGEubW9kZWxzJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3RQcmV2aWV3IHtcbiAgbGFiZWw/OiBzdHJpbmcsXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nLFxuICBkZWZhdWx0X2xhbmd1YWdlPzogSW5mTGFuZ3VhZ2UsXG4gIHBrX3Byb2plY3Q/OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlCeVBrPFQ+IHtcbiAgW3BrX2VudGl0eTogbnVtYmVyXTogVFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFZlcnNpb25FbnRpdHk8VD4ge1xuICBfbGF0ZXN0VmVyc2lvbjogbnVtYmVyLCAvLyB2ZXJzaW9uIG51bWJlciBvZiB0aGUgbGF0ZXN0IHZlcnNpb25cbiAgW3Y6IG51bWJlcl06IFRcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbnRpdHlWZXJzaW9uc0J5UGs8VD4ge1xuICBbcGtfZW50aXR5OiBudW1iZXJdOiBWZXJzaW9uRW50aXR5PFQ+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2h1bmtMaXN0IHsgW3BrX2VudGl0eTogbnVtYmVyXTogRGF0Q2h1bmsgfVxuZXhwb3J0IGludGVyZmFjZSBQZUl0TGlzdCB7IFtwa19lbnRpdHk6IG51bWJlcl06IEluZlBlcnNpc3RlbnRJdGVtIH1cbmV4cG9ydCBpbnRlcmZhY2UgVGVFbkxpc3QgeyBbcGtfZW50aXR5OiBudW1iZXJdOiBJbmZUZW1wb3JhbEVudGl0eSB9XG5leHBvcnQgaW50ZXJmYWNlIFByb3BlcnR5TGlzdCB7IFtwa19lbnRpdHk6IHN0cmluZ106IERmaFByb3BlcnR5OyB9XG5leHBvcnQgaW50ZXJmYWNlIFR5cGVQZUl0IGV4dGVuZHMgSW5mUGVyc2lzdGVudEl0ZW0geyBma190eXBlZF9jbGFzczogbnVtYmVyOyB9IC8vIFRPRE8gcmVtb3ZlIGlmIHJlcGxhY2VkIGJ5IFR5cGVQcmV2aWV3XG5leHBvcnQgaW50ZXJmYWNlIFR5cGVzQnlDbGFzcyB7IFtkZmhfcGtfY2xhc3M6IHN0cmluZ106IFR5cGVQZUl0W107IH1cbmV4cG9ydCBpbnRlcmZhY2UgVHlwZXNCeVBrIHsgW3BrX2VudGl0eTogc3RyaW5nXTogVHlwZVBlSXQ7IH1cblxuZXhwb3J0IGludGVyZmFjZSBUeXBlUHJldmlldyBleHRlbmRzIFdhckVudGl0eVByZXZpZXcgeyBma190eXBlZF9jbGFzczogbnVtYmVyOyB9XG5leHBvcnQgaW50ZXJmYWNlIFR5cGVQcmV2aWV3c0J5Q2xhc3MgeyBbZGZoX3BrX2NsYXNzOiBzdHJpbmddOiBUeXBlUHJldmlld1tdOyB9XG5leHBvcnQgaW50ZXJmYWNlIFR5cGVQcmV2aWV3TGlzdCB7IFtwa19lbnRpdHk6IHN0cmluZ106IFR5cGVQcmV2aWV3W107IH1cbi8vIGV4cG9ydCBpbnRlcmZhY2UgQ29tUXVlcnlCeVBrIHsgW2tleTogc3RyaW5nXTogUHJvUXVlcnkgfVxuXG4vLyBleHBvcnQgaW50ZXJmYWNlIEhhc1R5cGVQcm9wZXJ0eUxpc3QgeyBbZGZoX3BrX3Byb3BlcnR5OiBudW1iZXJdOiBIYXNUeXBlUHJvcGVydHlSZWFkYWJsZSB9XG5cbmV4cG9ydCB0eXBlIEljb25UeXBlID0gJ3RleHQnIHwgJ3RhYmxlJyB8ICdwZXJzaXN0ZW50LWVudGl0eScgfCAndGVtcG9yYWwtZW50aXR5JyB8ICdzb3VyY2UnIHwgJ2V4cHJlc3Npb24tcG9ydGlvbicgfCAnYW5hbHlzaXMnIHwgJ3F1ZXJ5JyB8ICd2aXN1YWwnIHwgJ3N0b3J5JyB8ICdzZXR0aW5ncyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFuZWwge1xuICBpZDogbnVtYmVyO1xuICB0YWJzOiBQYW5lbFRhYjxhbnk+W107XG59XG5cbmV4cG9ydCB0eXBlIExpc3RUeXBlID0gJycgfCAnZW50aXRpZXMnIHwgJ3NvdXJjZXMnIHwgJ2FuYWx5c2lzJyB8ICdxdWVyaWVzJyB8ICd2aXN1YWxzJyB8ICdzdG9yaWVzJyB8ICdzZXR0aW5ncyc7XG5leHBvcnQgaW50ZXJmYWNlIFBhbmVsVGFiPEQ+IHtcbiAgLy8gd2hldGVyIHRhYiBpcyBhY3RpdmUgb3Igbm90XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgLy8gdGhlIHJvb3QgY29tcG9uZW50IGluY2x1ZGVkIGluIHRoaXMgdGFiLCBpbiBkYXNoIHNlcGFyYXRlIG1pbnVzY2xlczogUGVJdERldGFpbENvbXBvbmVudCAtPiAnZW50aXR5LWRldGFpbCdcbiAgY29tcG9uZW50OiAndGV4dC1kZXRhaWwnIHwgJ3RhYmxlLWRldGFpbCcgfCAnZW50aXR5LWRldGFpbCcgfCAndGUtZW4tZGV0YWlsJyB8ICdhbmFseXNpcy1kZXRhaWwnIHwgJ3F1ZXJ5LWRldGFpbCcgfCAndmlzdWFsLWRldGFpbCcgfCAnb250b21lLXByb2ZpbGVzLXNldHRpbmdzJyB8ICdjbGFzc2VzLXNldHRpbmdzJyB8ICdjb250ci12b2NhYi1zZXR0aW5ncyc7XG4gIC8vIGljb24gdG8gYmUgZGlzcGxheWVkIGluIHRhYiwgZS5nLjogZ3YtaWNvbi1zb3VyY2VcbiAgaWNvbjogSWNvblR5cGVcbiAgLy8gbmFtZSBvZiB0aGUgcGF0aFNlZ21lbnQgdW5kZXIgJ2FjdGl2ZVByb2plY3QnLCB1c2VkIHRvIGdlbmVyYXRlIHRoZSBwYXRoOiBbJ2FjdGl2ZVByb2plY3QnLCBwYXRoU2VnbWVudCwgdWlJZF1cbiAgcGF0aFNlZ21lbnQ/OiAndGV4dERldGFpbHMnIHwgJ3RhYmxlRGV0YWlscycgfCAncGVJdERldGFpbHMnIHwgJ3RlRW5EZXRhaWxzJyB8ICdhbmFseXNpc0RldGFpbHMnIHwgJ3F1ZXJ5RGV0YWlscycgfCAndmlzdWFsRGV0YWlscycgfCAnb250b21lUHJvZmlsZXNTZXR0aW5ncycgfCAnY2xhc3Nlc1NldHRpbmdzJyB8ICdjb250clZvY2FiU2V0dGluZ3MnO1xuICAvLyBkYXRhIHRvIHBhc3MgdG8gY29tcG9uZW50IHZpYSBpbnB1dCB2YXJpYWJhbGVzXG4gIGRhdGE/OiBEXG4gIC8vIGdlbmVyYXRlZCBieSByZWR1Y2VyOiBiYXNlIHBhdGggd2hlcmUgdGhlIGNvbXBvbmVudCB3aWxsIGJlIGF0dGF0Y2ggaGlzIFN1YlN0b3JlXG4gIHBhdGg/OiBzdHJpbmdbXTtcbiAgLy8gZ2VuZXJhdGVkIG9uIHRoZSBmbHksIG5ldmVyIGluIHN0b3JlXG4gIHRhYlRpdGxlJD86IE9ic2VydmFibGU8c3RyaW5nPjtcbiAgbG9hZGluZyQ/OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xufVxuZXhwb3J0IGludGVyZmFjZSBQZUl0VGFiRGF0YSB7XG4gIC8vIFVzZWQgYnkgcGVJdCBkZXRhaWwgc3RhdGUgY3JlYXRvXG4gIHBlSXREZXRhaWxDb25maWc/OiB7XG4gICAgcGVJdERldGFpbD86IEVudGl0eURldGFpbFxuICAgIC8vIHN0YXRlU2V0dGluZ3M/OiBTdGF0ZVNldHRpbmdzXG4gIH1cbn1cbi8vIGV4cG9ydCBpbnRlcmZhY2UgVGVFbnRUYWJEYXRhIHtcbi8vICAgLy8gVXNlZCBieSB0ZUVudCBkZXRhaWwgc3RhdGUgY3JlYXRvXG4vLyAgIHRlRW50RGV0YWlsQ29uZmlnPzoge1xuLy8gICAgIHRlRW50RGV0YWlsPzogVGVFbnREZXRhaWxcbi8vICAgICAvLyBzdGF0ZVNldHRpbmdzPzogU3RhdGVTZXR0aW5nc1xuLy8gICB9XG4vLyB9XG5leHBvcnQgaW50ZXJmYWNlIEFuYWx5c2lzVGFiRGF0YSB7XG4gIHBrRW50aXR5PzogbnVtYmVyO1xuICBma0FuYWx5c2lzVHlwZT86IG51bWJlcjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgVGFiRGF0YSB7XG4gIHBrRW50aXR5PzogbnVtYmVyO1xuICAvLyBjbGFzc0FuZFR5cGVQaz86IENsYXNzQW5kVHlwZVBrO1xuXG4gIHBrUHJvcGVydHk/OiBudW1iZXI7XG5cbiAgLy8gVXNlZCBieSBwZUl0IGRldGFpbCBzdGF0ZSBjcmVhdG9cbiAgcGVJdERldGFpbENvbmZpZz86IHtcbiAgICBwZUl0RGV0YWlsPzogRW50aXR5RGV0YWlsXG4gICAgLy8gc3RhdGVTZXR0aW5ncz86IFN0YXRlU2V0dGluZ3NcbiAgfVxuXG4gIC8vIC8vIFVzZWQgYnkgdGVFbnQgZGV0YWlsIHN0YXRlIGNyZWF0b1xuICAvLyB0ZUVudERldGFpbENvbmZpZz86IHtcbiAgLy8gICB0ZUVudERldGFpbD86IFRlRW50RGV0YWlsXG4gIC8vICAgLy8gc3RhdGVTZXR0aW5ncz86IFN0YXRlU2V0dGluZ3PDmlxuICAvLyB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmFtU291cmNlIHtcbiAgcGtFbnRpdHk/OiBudW1iZXIsXG4gIGNodW5rPzogRGF0Q2h1bms7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdERldGFpbCBleHRlbmRzIFByb2plY3RQcmV2aWV3IHtcblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAqIENSTSBhbmQgUHJvamVjdCBDb25maWdcbiAgICovXG5cbiAgLy8gQ29uY2VwdGlvbmFsIFJlZmVyZW5jZSBNb2RlbFxuICAvLyBjcm0/OiBQcm9qZWN0Q3JtLFxuICBsb2FkaW5nQ29uZmlnRGF0YT86IGJvb2xlYW47XG4gIGNvbmZpZ0RhdGFJbml0aWFsaXplZD86IGJvb2xlYW47XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBJbmZvcm1hdGlvbiBDYWNoZVxuICAgKi9cblxuICAvLyBpbmY/OiBJbmY7XG5cbiAgLy8gLy8gZGF0YSB1bml0IHByZXZpZXdzXG4gIC8vIGVudGl0eVByZXZpZXdzPzogRW50aXR5UHJldmlld0xpc3Q7XG5cbiAgLy8gLy8gdHlwZXMgYnkgcGsgY2xhc3NcbiAgLy8gdHlwZXNCeUNsYXNzPzogVHlwZXNCeUNsYXNzO1xuXG4gIC8vIC8vIHR5cGVzIGJ5IHBrX2VudGl0eVxuICAvLyB0eXBlc0J5UGs/OiBUeXBlc0J5UGs7XG5cbiAgLy8gLy8gZGF0YSB1bml0IGRldGFpbHMgZm9yIGRpc3BsYXkgaW4gbW9kYWxcbiAgLy8gcGVJdE1vZGFscz86IFBlSXREZXRhaWxMaXN0O1xuXG4gIC8vIC8vIGNodW5rIExpc3RcbiAgLy8gY2h1bmtzPzogQ2h1bmtMaXN0O1xuXG4gIC8vIC8vIEluZlBlcnNpc3RlbnRJdGVtcyB3aXRoIHN0YXRlbWVudHMgYnkgcGtfZW50aXR5XG4gIC8vIHBlSXRHcmFwaHM/OiBQZUl0TGlzdDtcblxuICAvLyAvLyBJbmZQZXJzaXN0ZW50SXRlbXMgd2l0aCBzdGF0ZW1lbnRzIGJ5IHBrX2VudGl0eVxuICAvLyB0ZUVuR3JhcGhzPzogVGVFbkxpc3Q7XG5cbiAgLy8gLy8gQ29tUXVlcnkgbGlzdCBieSBwa19lbnRpdHlcbiAgLy8gY29tUXVlcnlWZXJzaW9uc0J5UGs/OiBFbnRpdHlWZXJzaW9uc0J5UGs8UHJvUXVlcnk+O1xuICAvLyBjb21RdWVyeUxvYWRpbmc/OiBib29sZWFuO1xuICAvLyBjb21RdWVyeVZlcnNpb25Mb2FkaW5nPzogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH07XG5cbiAgLy8gLy8gQ29tVmlzdWFsIGxpc3QgYnkgcGtfZW50aXR5XG4gIC8vIGNvbVZpc3VhbFZlcnNpb25zQnlQaz86IEVudGl0eVZlcnNpb25zQnlQazxQcm9WaXN1YWw+O1xuICAvLyBjb21WaXN1YWxMb2FkaW5nPzogYm9vbGVhbjtcbiAgLy8gY29tVmlzdWFsVmVyc2lvbkxvYWRpbmc/OiBib29sZWFuO1xuXG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgKiBMYXlvdXQg4oCTIFRhYnNcbiAgICovXG4gIGxpc3Q/OiBMaXN0VHlwZTtcblxuICBwYW5lbHM/OiBQYW5lbFtdXG5cbiAgLy8gaW5kZXggb2YgZm9jdXNlZCBQYW5lbFxuICBmb2N1c2VkUGFuZWw/OiBudW1iZXI7XG5cbiAgLy8gc2VyaWFsIG51bWJlciBmb3IgcGFuZWxzXG4gIHBhbmVsU2VyaWFsPzogbnVtYmVyO1xuXG4gIC8vIHNlcmlhbCBudW1iZXIgZm9yIHVpSWRcbiAgdWlJZFNlcmlhbD86IG51bWJlcjtcblxuICB0YWJMYXlvdXRzPzogeyBbdWlJZDogc3RyaW5nXTogVGFiQmFzZSB9XG5cbiAgLy8gcmVmZXJlbmNlIHRoZSB1aUlkIHdpdGhpbiB0aGUgcGF0aCBvZiB0aGUgdGFiICh1aUlkIGhhcyBub3RoaW5nIHRvIGRvIHdpdGggcGtfZW50aXR5KVxuICB0ZXh0RGV0YWlscz86IHsgW3VpSWQ6IHN0cmluZ106IFRhYkJhc2UgfVxuXG4gIC8vIHJlZmVyZW5jZSB0aGUgdWlJZCB3aXRoaW4gdGhlIHBhdGggb2YgdGhlIHRhYiAodWlJZCBoYXMgbm90aGluZyB0byBkbyB3aXRoIHBrX2VudGl0eSlcbiAgcGVJdERldGFpbHM/OiB7IFt1aUlkOiBzdHJpbmddOiBFbnRpdHlEZXRhaWwgfVxuXG4gIC8vIC8vIHJlZmVyZW5jZSB0aGUgdWlJZCB3aXRoaW4gdGhlIHBhdGggb2YgdGhlIHRhYiAodWlJZCBoYXMgbm90aGluZyB0byBkbyB3aXRoIHBrX2VudGl0eSlcbiAgLy8gdGVFbkRldGFpbHM/OiB7IFt1aUlkOiBzdHJpbmddOiBUZUVudERldGFpbCB9XG5cbiAgLy8gcmVmZXJlbmNlIHRoZSB1aUlkIHdpdGhpbiB0aGUgcGF0aCBvZiB0aGUgdGFiICh1aUlkIGhhcyBub3RoaW5nIHRvIGRvIHdpdGggcGtfZW50aXR5KVxuICBhbmFseXNpc0RldGFpbHM/OiB7IFt1aUlkOiBzdHJpbmddOiBhbnkgfVxuXG4gIC8vIC8vIHJlZmVyZW5jZSB0aGUgdWlJZCB3aXRoaW4gdGhlIHBhdGggb2YgdGhlIHRhYiAodWlJZCBoYXMgbm90aGluZyB0byBkbyB3aXRoIHBrX2VudGl0eSlcbiAgLy8gcXVlcnlEZXRhaWxzPzogeyBbdWlJZDogc3RyaW5nXTogUXVlcnlEZXRhaWwgfVxuXG4gIC8vIC8vIHJlZmVyZW5jZSB0aGUgdWlJZCB3aXRoaW4gdGhlIHBhdGggb2YgdGhlIHRhYiAodWlJZCBoYXMgbm90aGluZyB0byBkbyB3aXRoIHBrX2VudGl0eSlcbiAgLy8gdmlzdWFsRGV0YWlscz86IHsgW3VpSWQ6IHN0cmluZ106IFZpc3VhbERldGFpbCB9XG5cbiAgLy8gcmVmZXJlbmNlIHRoZSB1aUlkIHdpdGhpbiB0aGUgcGF0aCBvZiB0aGUgdGFiICh1aUlkIGhhcyBub3RoaW5nIHRvIGRvIHdpdGggcGtfZW50aXR5KVxuICBjbGFzc2VzU2V0dGluZ3M/OiB7IFt1aUlkOiBzdHJpbmddOiBQcm9qZWN0U2V0dGluZ3NEYXRhIH1cblxuICAvLyByZWZlcmVuY2UgdGhlIHVpSWQgd2l0aGluIHRoZSBwYXRoIG9mIHRoZSB0YWIgKHVpSWQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwa19lbnRpdHkpXG4gIGNvbnRyVm9jYWJTZXR0aW5ncz86IHsgW3VpSWQ6IHN0cmluZ106IFR5cGVzIH1cblxuICAvLyByZWZlcmVuY2UgdGhlIHVpSWQgd2l0aGluIHRoZSBwYXRoIG9mIHRoZSB0YWIgKHVpSWQgaGFzIG5vdGhpbmcgdG8gZG8gd2l0aCBwa19lbnRpdHkpXG4gIG9udG9tZVByb2ZpbGVzU2V0dGluZ3M/OiB7IFt1aUlkOiBzdHJpbmddOiBhbnkgfVxuXG4gIC8vIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gICogTGF5b3V0IOKAkyBNb2RhbHNcbiAgLy8gICovXG5cbiAgLy8gYWRkTW9kYWw/OiBDcmVhdGVPckFkZEVudGl0eTtcblxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICogVGhpbmdzIGZvciBNZW50aW9uaW5ncyAvIEFubm90YXRpb25zXG4gICAqL1xuXG5cbiAgLy8gLy8gdGhlIGNodW5rIHRoYXQgaXMgdXNlZCB0byBjcmVhdGUgbWVudGlvbmluZ3NcbiAgLy8gc2VsZWN0ZWRDaHVuaz86IERhdENodW5rO1xuXG4gIC8vIGlmIHRydWUsIHRoZSB0ZXh0IGVkaXRvciBiZWhhdmVzIHNvIHRoYXQgZWFjaCBub2RlIGNhbiBiZSBjbGlja2VkIHRvIGRlLS9hY3RpdmF0ZVxuICByZWZpbmluZ0NodW5rPzogYm9vbGVhbjtcblxuICAvLyB0cnVlLCB3aGVuIG1lbnRpb25pbmcgaXMgYmVpbmcgY3JlYXRlZC5cbiAgLy8gVE9ETzogY2hlY2ssIGlmIG5lZWRlZFxuICBjcmVhdGluZ01lbnRpb25pbmc/OiBib29sZWFuO1xuXG4gIC8vIEFycmF5IG9mIHBrX2VudGl0aWVzIG9mIG1lbnRpb25pbmdzIChhLmsuYS4gc3RhdGVtZW50cyBvZiBwcm9wZXJ0eSBcImlzIG1lbnRpb25lZCBpblwiKVxuICAvLyB0aGF0IGFyZSBmb2N1c2VkIGJ5IGEgY2xpY2sgb24gYSBjaHVuayAoaW4gdGV4dCBlZGl0b3IpXG4gIG1lbnRpb25pbmdzRm9jdXNlZEluVGV4dD86IG51bWJlcltdXG5cbiAgLy8gQXJyYXkgb2YgcGtfZW50aXRpZXMgb2YgbWVudGlvbmluZ3MgKGEuay5hLiBzdGF0ZW1lbnRzIG9mIHByb3BlcnR5IFwiaXMgbWVudGlvbmVkIGluXCIpXG4gIC8vIHRoYXQgYXJlIGZvY3VzZWQgYnkgY2xpY2sgb24gbWVudGlvbmluZyBpbiBhIGxpc3QvdGFibGUgdmlld1xuICBtZW50aW9uaW5nc0ZvY3VzZWRJblRhYmxlPzogbnVtYmVyW11cblxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2plY3RDcm0ge1xuICBjbGFzc2VzPzogQ2xhc3NDb25maWdMaXN0O1xuICBwcm9wZXJ0aWVzPzogUHJvcGVydHlMaXN0XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xhc3NDb25maWdMaXN0IHsgW2RmaF9wa19jbGFzczogbnVtYmVyXTogQ2xhc3NDb25maWcgfVxuXG5leHBvcnQgaW50ZXJmYWNlIENsYXNzQ29uZmlnIHtcbiAgcGtFbnRpdHk6IG51bWJlcjtcbiAgZGZoX3BrX2NsYXNzOiBudW1iZXI7XG5cbiAgbGFiZWw6IHN0cmluZztcbiAgZGZoX3N0YW5kYXJkX2xhYmVsOiBzdHJpbmc7XG5cbiAgcHJvZmlsZUxhYmVsczogc3RyaW5nO1xuICBwcm9maWxlUGtzOiBudW1iZXJbXTtcblxuICBwcm9qUmVsPzogUHJvRGZoQ2xhc3NQcm9qUmVsO1xuICBpc0luUHJvamVjdD86IGJvb2xlYW47IC8vIHJlZmxlY3RzIHRoZSBlbmFibGVkIC8gZGlzYWJsZWQgc3RhdGUgZnJvbSBkYXRhIHNldHRpbmdzIG9mIHRoZSBwcm9qZWN0XG4gIGNoYW5naW5nUHJvalJlbDogYm9vbGVhbjtcblxuICBzdWJjbGFzc09mPzogJ3BlSXQnIHwgJ3RlRW50JyB8ICdvdGhlcic7IC8vIHRvIGRpc3Rpbmd1aXNoIFRlRW50cyBmcm9tIFBlSXRzXG5cbiAgc3ViY2xhc3NPZlR5cGU/OiBib29sZWFuOyAvLyB0cnVlIGlmIHN1YmNsYXNzIG9mIEU1NSBUeXBlXG5cbiAgc2NvcGVOb3RlOiBzdHJpbmc7XG5cbiAgZGZoX2lkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiBzdHJpbmc7XG5cbiAgLy8gcHJvcGVydHlGaWVsZHM/OiBQcm9wZXJ0eUZpZWxkTGlzdDtcbiAgdWlDb250ZXh0cz86IHtcbiAgICBbcGs6IG51bWJlcl06IFVpQ29udGV4dFxuICB9XG5cbiAgcmVxdWlyZWRfYnlfc291cmNlcz86IGJvb2xlYW5cbiAgcmVxdWlyZWRfYnlfZW50aXRpZXM/OiBib29sZWFuXG4gIHJlcXVpcmVkX2J5X2Jhc2ljcz86IGJvb2xlYW5cbiAgZXhjbHVkZWRfZnJvbV9lbnRpdGllcz86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBVaUNvbnRleHQgZXh0ZW5kcyBTeXNBcHBDb250ZXh0SW50ZXJmYWNlIHtcbiAgdWlFbGVtZW50cz86IFVpRWxlbWVudFtdXG59XG5cbi8vIHNob3J0IHZlcnNpb24gb2YgQ29tVWlDb250ZXh0Q29uZmlnXG5leHBvcnQgaW50ZXJmYWNlIFVpRWxlbWVudCB7XG4gIGZrX3Byb3BlcnR5PzogbnVtYmVyLFxuICBwcm9wZXJ0eV9pc19vdXRnb2luZz86IGJvb2xlYW4sXG4gIHByb3BlcnR5RmllbGRLZXk/OiBzdHJpbmcsIC8vIFRPRE86IG1lcmdlIHRoZSBwcm9wZXJ0eUZpZWxkS2V5IGFuZCBwcm9wU2V0S2V5IHRvIGZpZWxkS2V5XG4gIHByb3BTZXRLZXk/OiBzdHJpbmcsXG4gIGZrX2NsYXNzX2ZpZWxkPzogbnVtYmVyLFxuICBjbGFzc19maWVsZD86IFN5c0NsYXNzRmllbGRJbnRlcmZhY2VcbiAgb3JkX251bTogbnVtYmVyXG59XG4iXX0=