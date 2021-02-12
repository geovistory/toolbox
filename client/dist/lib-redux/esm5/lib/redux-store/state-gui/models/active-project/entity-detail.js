/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-gui/models/active-project/entity-detail.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function PeItDetailList() { }
;
var EntityDetail = /** @class */ (function () {
    function EntityDetail(data) {
        /**
         * Left Panel Visibility
         */
        // the properties with information about the peIt
        this.showProperties = false;
        // the right area
        this.showRightArea = true;
        /**
         * Right panel
         */
        this.rightPanelTabs = [];
        this.rightPanelActiveTab = 0; // index of the active tab
        // index of the active tab
        // the bar to above the properties
        // showPropertiesHeader?= true;
        // the header with name of peIt
        this.showHeader = true;
        Object.assign(this, data);
    }
    return EntityDetail;
}());
export { EntityDetail };
if (false) {
    /** @type {?} */
    EntityDetail.prototype.pkEntity;
    /**
     * Left Panel Visibility
     * @type {?}
     */
    EntityDetail.prototype.showProperties;
    /** @type {?} */
    EntityDetail.prototype.showRightArea;
    /**
     * Right panel
     * @type {?}
     */
    EntityDetail.prototype.rightPanelTabs;
    /** @type {?} */
    EntityDetail.prototype.rightPanelActiveTab;
    /** @type {?} */
    EntityDetail.prototype.showHeader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL21vZGVscy9hY3RpdmUtcHJvamVjdC9lbnRpdHktZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsb0NBQXFFO0FBQUEsQ0FBQztBQUd0RTtJQTBCRSxzQkFBWSxJQUFtQjs7Ozs7UUFoQi9CLG1CQUFjLEdBQUcsS0FBSyxDQUFDOztRQUd2QixrQkFBYSxHQUFHLElBQUksQ0FBQzs7OztRQUdyQixtQkFBYyxHQUFxQixFQUFFLENBQUE7UUFDckMsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsMEJBQTBCOzs7OztRQU1uRCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBSWhCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFHSCxtQkFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7Ozs7SUExQkMsZ0NBQWtCOzs7OztJQUtsQixzQ0FBdUI7O0lBR3ZCLHFDQUFxQjs7Ozs7SUFHckIsc0NBQXFDOztJQUNyQywyQ0FBd0I7O0lBTXhCLGtDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB0eXBlIFJpZ2h0UGFuZWxUYWIgPSAnbGlua2VkLXNvdXJjZXMnIHwgJ2xpbmtlZC1kaWdpdGFscycgfCAnY29udGVudC10cmVlJztcblxuZXhwb3J0IGludGVyZmFjZSBQZUl0RGV0YWlsTGlzdCB7IFtwa19lbnRpdHk6IG51bWJlcl06IEVudGl0eURldGFpbCB9O1xuXG5cbmV4cG9ydCBjbGFzcyBFbnRpdHlEZXRhaWwge1xuXG5cbiAgLy8gX2ZpZWxkcz86IEZpZWxkTGlzdDtcblxuICBwa0VudGl0eT86IG51bWJlcjtcblxuICAvKiogTGVmdCBQYW5lbCBWaXNpYmlsaXR5ICovXG5cbiAgLy8gdGhlIHByb3BlcnRpZXMgd2l0aCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcGVJdFxuICBzaG93UHJvcGVydGllcz89IGZhbHNlO1xuXG4gIC8vIHRoZSByaWdodCBhcmVhXG4gIHNob3dSaWdodEFyZWE/PSB0cnVlO1xuXG4gIC8qKiBSaWdodCBwYW5lbCAqL1xuICByaWdodFBhbmVsVGFicz86IFJpZ2h0UGFuZWxUYWJbXSA9IFtdXG4gIHJpZ2h0UGFuZWxBY3RpdmVUYWI/PSAwOyAvLyBpbmRleCBvZiB0aGUgYWN0aXZlIHRhYlxuXG4gIC8vIHRoZSBiYXIgdG8gYWJvdmUgdGhlIHByb3BlcnRpZXNcbiAgLy8gc2hvd1Byb3BlcnRpZXNIZWFkZXI/PSB0cnVlO1xuXG4gIC8vIHRoZSBoZWFkZXIgd2l0aCBuYW1lIG9mIHBlSXRcbiAgc2hvd0hlYWRlcj89IHRydWU7XG5cblxuICBjb25zdHJ1Y3RvcihkYXRhPzogRW50aXR5RGV0YWlsKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuXG5cbn1cbiJdfQ==