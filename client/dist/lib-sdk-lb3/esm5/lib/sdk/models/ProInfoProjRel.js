/* tslint:disable */
var ProInfoProjRel = /** @class */ (function () {
    function ProInfoProjRel(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProInfoProjRel`.
     */
    ProInfoProjRel.getModelName = function () {
        return "ProInfoProjRel";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProInfoProjRel for dynamic purposes.
    **/
    ProInfoProjRel.factory = function (data) {
        return new ProInfoProjRel(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ProInfoProjRel.getModelDefinition = function () {
        return {
            name: 'ProInfoProjRel',
            plural: 'ProInfoProjRels',
            path: 'ProInfoProjRels',
            idName: 'pk_entity',
            properties: {
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_entity": {
                    name: 'fk_entity',
                    type: 'number'
                },
                "fk_entity_version": {
                    name: 'fk_entity_version',
                    type: 'string'
                },
                "fk_entity_version_concat": {
                    name: 'fk_entity_version_concat',
                    type: 'string'
                },
                "is_in_project": {
                    name: 'is_in_project',
                    type: 'boolean'
                },
                "is_standard_in_project": {
                    name: 'is_standard_in_project',
                    type: 'boolean'
                },
                "calendar": {
                    name: 'calendar',
                    type: 'string'
                },
                "ord_num_of_domain": {
                    name: 'ord_num_of_domain',
                    type: 'number'
                },
                "ord_num_of_range": {
                    name: 'ord_num_of_range',
                    type: 'number'
                },
                "ord_num_of_text_property": {
                    name: 'ord_num_of_text_property',
                    type: 'number'
                },
                "tmsp_last_modification": {
                    name: 'tmsp_last_modification',
                    type: 'string'
                },
                "fk_creator": {
                    name: 'fk_creator',
                    type: 'number'
                },
                "fk_last_modifier": {
                    name: 'fk_last_modifier',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "entity_version": {
                    name: 'entity_version',
                    type: 'number'
                },
                "tmsp_creation": {
                    name: 'tmsp_creation',
                    type: 'string'
                },
            },
            relations: {}
        };
    };
    return ProInfoProjRel;
}());
export { ProInfoProjRel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvSW5mb1Byb2pSZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9Qcm9JbmZvUHJvalJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFzQnBCO0lBaUJFLHdCQUFZLElBQThCO1FBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVywyQkFBWSxHQUExQjtRQUNFLE9BQU8sZ0JBQWdCLENBQUM7SUFDMUIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csc0JBQU8sR0FBckIsVUFBc0IsSUFBNkI7UUFDakQsT0FBTyxJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csaUNBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsTUFBTSxFQUFFLGlCQUFpQjtZQUN6QixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELDBCQUEwQixFQUFFO29CQUMxQixJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxTQUFTO2lCQUNoQjtnQkFDRCx3QkFBd0IsRUFBRTtvQkFDeEIsSUFBSSxFQUFFLHdCQUF3QjtvQkFDOUIsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCwwQkFBMEIsRUFBRTtvQkFDMUIsSUFBSSxFQUFFLDBCQUEwQjtvQkFDaEMsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsa0JBQWtCLEVBQUU7b0JBQ2xCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsZUFBZTtvQkFDckIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUF2SEQsSUF1SEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgUHJvSW5mb1Byb2pSZWxJbnRlcmZhY2Uge1xuICBcImZrX3Byb2plY3RcIjogbnVtYmVyO1xuICBcImZrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImZrX2VudGl0eV92ZXJzaW9uXCI/OiBzdHJpbmc7XG4gIFwiZmtfZW50aXR5X3ZlcnNpb25fY29uY2F0XCI/OiBzdHJpbmc7XG4gIFwiaXNfaW5fcHJvamVjdFwiPzogYm9vbGVhbjtcbiAgXCJpc19zdGFuZGFyZF9pbl9wcm9qZWN0XCI/OiBib29sZWFuO1xuICBcImNhbGVuZGFyXCI/OiBzdHJpbmc7XG4gIFwib3JkX251bV9vZl9kb21haW5cIj86IG51bWJlcjtcbiAgXCJvcmRfbnVtX29mX3JhbmdlXCI/OiBudW1iZXI7XG4gIFwib3JkX251bV9vZl90ZXh0X3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwidG1zcF9sYXN0X21vZGlmaWNhdGlvblwiPzogc3RyaW5nO1xuICBcImZrX2NyZWF0b3JcIj86IG51bWJlcjtcbiAgXCJma19sYXN0X21vZGlmaWVyXCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJlbnRpdHlfdmVyc2lvblwiPzogbnVtYmVyO1xuICBcInRtc3BfY3JlYXRpb25cIj86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFByb0luZm9Qcm9qUmVsIGltcGxlbWVudHMgUHJvSW5mb1Byb2pSZWxJbnRlcmZhY2Uge1xuICBcImZrX3Byb2plY3RcIjogbnVtYmVyO1xuICBcImZrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImZrX2VudGl0eV92ZXJzaW9uXCI/OiBzdHJpbmc7XG4gIFwiZmtfZW50aXR5X3ZlcnNpb25fY29uY2F0XCI/OiBzdHJpbmc7XG4gIFwiaXNfaW5fcHJvamVjdFwiPzogYm9vbGVhbjtcbiAgXCJpc19zdGFuZGFyZF9pbl9wcm9qZWN0XCI/OiBib29sZWFuO1xuICBcImNhbGVuZGFyXCI/OiBzdHJpbmc7XG4gIFwib3JkX251bV9vZl9kb21haW5cIj86IG51bWJlcjtcbiAgXCJvcmRfbnVtX29mX3JhbmdlXCI/OiBudW1iZXI7XG4gIFwib3JkX251bV9vZl90ZXh0X3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwidG1zcF9sYXN0X21vZGlmaWNhdGlvblwiPzogc3RyaW5nO1xuICBcImZrX2NyZWF0b3JcIj86IG51bWJlcjtcbiAgXCJma19sYXN0X21vZGlmaWVyXCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJlbnRpdHlfdmVyc2lvblwiPzogbnVtYmVyO1xuICBcInRtc3BfY3JlYXRpb25cIj86IHN0cmluZztcbiAgY29uc3RydWN0b3IoZGF0YT86IFByb0luZm9Qcm9qUmVsSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBQcm9JbmZvUHJvalJlbGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJQcm9JbmZvUHJvalJlbFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFByb0luZm9Qcm9qUmVsIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFByb0luZm9Qcm9qUmVsSW50ZXJmYWNlKTogUHJvSW5mb1Byb2pSZWwge1xuICAgIHJldHVybiBuZXcgUHJvSW5mb1Byb2pSZWwoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdQcm9JbmZvUHJvalJlbCcsXG4gICAgICBwbHVyYWw6ICdQcm9JbmZvUHJvalJlbHMnLFxuICAgICAgcGF0aDogJ1Byb0luZm9Qcm9qUmVscycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImZrX3Byb2plY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19lbnRpdHlfdmVyc2lvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2VudGl0eV92ZXJzaW9uJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2VudGl0eV92ZXJzaW9uX2NvbmNhdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2VudGl0eV92ZXJzaW9uX2NvbmNhdCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJpc19pbl9wcm9qZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnaXNfaW5fcHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgIH0sXG4gICAgICAgIFwiaXNfc3RhbmRhcmRfaW5fcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lzX3N0YW5kYXJkX2luX3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgICBcImNhbGVuZGFyXCI6IHtcbiAgICAgICAgICBuYW1lOiAnY2FsZW5kYXInLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwib3JkX251bV9vZl9kb21haW5cIjoge1xuICAgICAgICAgIG5hbWU6ICdvcmRfbnVtX29mX2RvbWFpbicsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcmRfbnVtX29mX3JhbmdlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnb3JkX251bV9vZl9yYW5nZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcmRfbnVtX29mX3RleHRfcHJvcGVydHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdvcmRfbnVtX29mX3RleHRfcHJvcGVydHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwidG1zcF9sYXN0X21vZGlmaWNhdGlvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ3Rtc3BfbGFzdF9tb2RpZmljYXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfY3JlYXRvclwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NyZWF0b3InLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfbGFzdF9tb2RpZmllclwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2xhc3RfbW9kaWZpZXInLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImVudGl0eV92ZXJzaW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZW50aXR5X3ZlcnNpb24nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwidG1zcF9jcmVhdGlvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ3Rtc3BfY3JlYXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=