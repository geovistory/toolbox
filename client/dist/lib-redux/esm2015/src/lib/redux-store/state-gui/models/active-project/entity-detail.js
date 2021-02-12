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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50aXR5LWRldGFpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItcmVkdXgvc3JjL2xpYi9yZWR1eC1zdG9yZS8iLCJzb3VyY2VzIjpbInN0YXRlLWd1aS9tb2RlbHMvYWN0aXZlLXByb2plY3QvZW50aXR5LWRldGFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUVBLG9DQUFxRTtBQUFBLENBQUM7QUFHdEUsTUFBTSxPQUFPLFlBQVk7Ozs7SUEwQnZCLFlBQVksSUFBbUI7Ozs7O1FBaEIvQixtQkFBYyxHQUFHLEtBQUssQ0FBQzs7UUFHdkIsa0JBQWEsR0FBRyxJQUFJLENBQUM7Ozs7UUFHckIsbUJBQWMsR0FBcUIsRUFBRSxDQUFBO1FBQ3JDLHdCQUFtQixHQUFHLENBQUMsQ0FBQyxDQUFDLDBCQUEwQjs7Ozs7UUFNbkQsZUFBVSxHQUFHLElBQUksQ0FBQztRQUloQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0NBR0Y7OztJQTFCQyxnQ0FBa0I7Ozs7O0lBS2xCLHNDQUF1Qjs7SUFHdkIscUNBQXFCOzs7OztJQUdyQixzQ0FBcUM7O0lBQ3JDLDJDQUF3Qjs7SUFNeEIsa0NBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgUmlnaHRQYW5lbFRhYiA9ICdsaW5rZWQtc291cmNlcycgfCAnbGlua2VkLWRpZ2l0YWxzJyB8ICdjb250ZW50LXRyZWUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBlSXREZXRhaWxMaXN0IHsgW3BrX2VudGl0eTogbnVtYmVyXTogRW50aXR5RGV0YWlsIH07XG5cblxuZXhwb3J0IGNsYXNzIEVudGl0eURldGFpbCB7XG5cblxuICAvLyBfZmllbGRzPzogRmllbGRMaXN0O1xuXG4gIHBrRW50aXR5PzogbnVtYmVyO1xuXG4gIC8qKiBMZWZ0IFBhbmVsIFZpc2liaWxpdHkgKi9cblxuICAvLyB0aGUgcHJvcGVydGllcyB3aXRoIGluZm9ybWF0aW9uIGFib3V0IHRoZSBwZUl0XG4gIHNob3dQcm9wZXJ0aWVzPz0gZmFsc2U7XG5cbiAgLy8gdGhlIHJpZ2h0IGFyZWFcbiAgc2hvd1JpZ2h0QXJlYT89IHRydWU7XG5cbiAgLyoqIFJpZ2h0IHBhbmVsICovXG4gIHJpZ2h0UGFuZWxUYWJzPzogUmlnaHRQYW5lbFRhYltdID0gW11cbiAgcmlnaHRQYW5lbEFjdGl2ZVRhYj89IDA7IC8vIGluZGV4IG9mIHRoZSBhY3RpdmUgdGFiXG5cbiAgLy8gdGhlIGJhciB0byBhYm92ZSB0aGUgcHJvcGVydGllc1xuICAvLyBzaG93UHJvcGVydGllc0hlYWRlcj89IHRydWU7XG5cbiAgLy8gdGhlIGhlYWRlciB3aXRoIG5hbWUgb2YgcGVJdFxuICBzaG93SGVhZGVyPz0gdHJ1ZTtcblxuXG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBFbnRpdHlEZXRhaWwpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG5cblxufVxuIl19