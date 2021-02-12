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
export class EntityDetail {
    /**
     * @param {?=} data
     */
    constructor(data) {
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
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvIiwic291cmNlcyI6WyJsaWIvcmVkdXgtc3RvcmUvc3RhdGUtZ3VpL21vZGVscy9hY3RpdmUtcHJvamVjdC9lbnRpdHktZGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBRUEsb0NBQXFFO0FBQUEsQ0FBQztBQUd0RSxNQUFNLE9BQU8sWUFBWTs7OztJQTBCdkIsWUFBWSxJQUFtQjs7Ozs7UUFoQi9CLG1CQUFjLEdBQUcsS0FBSyxDQUFDOztRQUd2QixrQkFBYSxHQUFHLElBQUksQ0FBQzs7OztRQUdyQixtQkFBYyxHQUFxQixFQUFFLENBQUE7UUFDckMsd0JBQW1CLEdBQUcsQ0FBQyxDQUFDLENBQUMsMEJBQTBCOzs7OztRQU1uRCxlQUFVLEdBQUcsSUFBSSxDQUFDO1FBSWhCLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FHRjs7O0lBMUJDLGdDQUFrQjs7Ozs7SUFLbEIsc0NBQXVCOztJQUd2QixxQ0FBcUI7Ozs7O0lBR3JCLHNDQUFxQzs7SUFDckMsMkNBQXdCOztJQU14QixrQ0FBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBSaWdodFBhbmVsVGFiID0gJ2xpbmtlZC1zb3VyY2VzJyB8ICdsaW5rZWQtZGlnaXRhbHMnIHwgJ2NvbnRlbnQtdHJlZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGVJdERldGFpbExpc3QgeyBbcGtfZW50aXR5OiBudW1iZXJdOiBFbnRpdHlEZXRhaWwgfTtcblxuXG5leHBvcnQgY2xhc3MgRW50aXR5RGV0YWlsIHtcblxuXG4gIC8vIF9maWVsZHM/OiBGaWVsZExpc3Q7XG5cbiAgcGtFbnRpdHk/OiBudW1iZXI7XG5cbiAgLyoqIExlZnQgUGFuZWwgVmlzaWJpbGl0eSAqL1xuXG4gIC8vIHRoZSBwcm9wZXJ0aWVzIHdpdGggaW5mb3JtYXRpb24gYWJvdXQgdGhlIHBlSXRcbiAgc2hvd1Byb3BlcnRpZXM/PSBmYWxzZTtcblxuICAvLyB0aGUgcmlnaHQgYXJlYVxuICBzaG93UmlnaHRBcmVhPz0gdHJ1ZTtcblxuICAvKiogUmlnaHQgcGFuZWwgKi9cbiAgcmlnaHRQYW5lbFRhYnM/OiBSaWdodFBhbmVsVGFiW10gPSBbXVxuICByaWdodFBhbmVsQWN0aXZlVGFiPz0gMDsgLy8gaW5kZXggb2YgdGhlIGFjdGl2ZSB0YWJcblxuICAvLyB0aGUgYmFyIHRvIGFib3ZlIHRoZSBwcm9wZXJ0aWVzXG4gIC8vIHNob3dQcm9wZXJ0aWVzSGVhZGVyPz0gdHJ1ZTtcblxuICAvLyB0aGUgaGVhZGVyIHdpdGggbmFtZSBvZiBwZUl0XG4gIHNob3dIZWFkZXI/PSB0cnVlO1xuXG5cbiAgY29uc3RydWN0b3IoZGF0YT86IEVudGl0eURldGFpbCkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cblxuXG59XG4iXX0=