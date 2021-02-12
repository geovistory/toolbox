/**
 * @fileoverview added by tsickle
 * Generated from: state-gui/models/active-project/entity-detail.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9tb2RlbHMvYWN0aXZlLXByb2plY3QvZW50aXR5LWRldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLG9DQUFxRTtBQUFBLENBQUM7QUFHdEU7SUEwQkUsc0JBQVksSUFBbUI7Ozs7O1FBaEIvQixtQkFBYyxHQUFHLEtBQUssQ0FBQzs7UUFHdkIsa0JBQWEsR0FBRyxJQUFJLENBQUM7Ozs7UUFHckIsbUJBQWMsR0FBcUIsRUFBRSxDQUFBO1FBQ3JDLHdCQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjs7Ozs7UUFNbkQsZUFBVSxHQUFHLElBQUksQ0FBQztRQUloQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBR0gsbUJBQUM7QUFBRCxDQUFDLEFBL0JELElBK0JDOzs7O0lBMUJDLGdDQUFrQjs7Ozs7SUFLbEIsc0NBQXVCOztJQUd2QixxQ0FBcUI7Ozs7O0lBR3JCLHNDQUFxQzs7SUFDckMsMkNBQXdCOztJQU14QixrQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBSaWdodFBhbmVsVGFiID0gJ2xpbmtlZC1zb3VyY2VzJyB8ICdsaW5rZWQtZGlnaXRhbHMnIHwgJ2NvbnRlbnQtdHJlZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGVJdERldGFpbExpc3QgeyBbcGtfZW50aXR5OiBudW1iZXJdOiBFbnRpdHlEZXRhaWwgfTtcblxuXG5leHBvcnQgY2xhc3MgRW50aXR5RGV0YWlsIHtcblxuXG4gIC8vIF9maWVsZHM/OiBGaWVsZExpc3Q7XG5cbiAgcGtFbnRpdHk/OiBudW1iZXI7XG5cbiAgLyoqIExlZnQgUGFuZWwgVmlzaWJpbGl0eSAqL1xuXG4gIC8vIHRoZSBwcm9wZXJ0aWVzIHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIHBlSXRcbiAgc2hvd1Byb3BlcnRpZXM/PSBmYWxzZTtcblxuICAvLyB0aGUgcmlnaHQgYXJlYVxuICBzaG93UmlnaHRBcmVhPz0gdHJ1ZTtcblxuICAvKiogUmlnaHQgcGFuZWwgKi9cbiAgcmlnaHRQYW5lbFRhYnM/OiBSaWdodFBhbmVsVGFiW10gPSBbXVxuICByaWdodFBhbmVsQWN0aXZlVGFiPz0gMDsgLy8gaW5kZXggb2YgdGhlIGFjdGl2ZSB0YWJcblxuICAvLyB0aGUgYmFyIHRvIGFib3ZlIHRoZSBwcm9wZXJ0aWVzXG4gIC8vIHNob3dQcm9wZXJ0aWVzSGVhZGVyPz0gdHJ1ZTtcblxuICAvLyB0aGUgaGVhZGVyIHdpdGggbmFtZSBvZiBwZUl0XG4gIHNob3dIZWFkZXI/PSB0cnVlO1xuXG5cbiAgY29uc3RydWN0b3IoZGF0YT86IEVudGl0eURldGFpbCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cblxuXG59XG4iXX0=