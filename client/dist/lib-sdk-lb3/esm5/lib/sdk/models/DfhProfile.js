/* tslint:disable */
var DfhProfile = /** @class */ (function () {
    function DfhProfile(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhProfile`.
     */
    DfhProfile.getModelName = function () {
        return "DfhProfile";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DfhProfile for dynamic purposes.
    **/
    DfhProfile.factory = function (data) {
        return new DfhProfile(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    DfhProfile.getModelDefinition = function () {
        return {
            name: 'DfhProfile',
            plural: 'DfhProfiles',
            path: 'DfhProfiles',
            idName: 'pk_profile',
            properties: {
                "pk_profile": {
                    name: 'pk_profile',
                    type: 'number'
                },
                "owned_by_project": {
                    name: 'owned_by_project',
                    type: 'number'
                },
                "is_ongoing_forced_publication": {
                    name: 'is_ongoing_forced_publication',
                    type: 'boolean'
                },
                "date_profile_published": {
                    name: 'date_profile_published',
                    type: 'string'
                },
                "date_profile_deprecated": {
                    name: 'date_profile_deprecated',
                    type: 'string'
                },
                "tmsp_last_dfh_update": {
                    name: 'tmsp_last_dfh_update',
                    type: 'string'
                },
            },
            relations: {}
        };
    };
    return DfhProfile;
}());
export { DfhProfile };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGZoUHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL0RmaFByb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBWXBCO0lBT0Usb0JBQVksSUFBMEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHVCQUFZLEdBQTFCO1FBQ0UsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csa0JBQU8sR0FBckIsVUFBc0IsSUFBeUI7UUFDN0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csNkJBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLFVBQVUsRUFBRTtnQkFDVixZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCwrQkFBK0IsRUFBRTtvQkFDL0IsSUFBSSxFQUFFLCtCQUErQjtvQkFDckMsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELHdCQUF3QixFQUFFO29CQUN4QixJQUFJLEVBQUUsd0JBQXdCO29CQUM5QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCx5QkFBeUIsRUFBRTtvQkFDekIsSUFBSSxFQUFFLHlCQUF5QjtvQkFDL0IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsc0JBQXNCLEVBQUU7b0JBQ3RCLElBQUksRUFBRSxzQkFBc0I7b0JBQzVCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBckVELElBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIERmaFByb2ZpbGVJbnRlcmZhY2Uge1xuICBcInBrX3Byb2ZpbGVcIj86IG51bWJlcjtcbiAgXCJvd25lZF9ieV9wcm9qZWN0XCI/OiBudW1iZXI7XG4gIFwiaXNfb25nb2luZ19mb3JjZWRfcHVibGljYXRpb25cIj86IGJvb2xlYW47XG4gIFwiZGF0ZV9wcm9maWxlX3B1Ymxpc2hlZFwiPzogc3RyaW5nO1xuICBcImRhdGVfcHJvZmlsZV9kZXByZWNhdGVkXCI/OiBzdHJpbmc7XG4gIFwidG1zcF9sYXN0X2RmaF91cGRhdGVcIj86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIERmaFByb2ZpbGUgaW1wbGVtZW50cyBEZmhQcm9maWxlSW50ZXJmYWNlIHtcbiAgXCJwa19wcm9maWxlXCI6IG51bWJlcjtcbiAgXCJvd25lZF9ieV9wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJpc19vbmdvaW5nX2ZvcmNlZF9wdWJsaWNhdGlvblwiOiBib29sZWFuO1xuICBcImRhdGVfcHJvZmlsZV9wdWJsaXNoZWRcIjogc3RyaW5nO1xuICBcImRhdGVfcHJvZmlsZV9kZXByZWNhdGVkXCI6IHN0cmluZztcbiAgXCJ0bXNwX2xhc3RfZGZoX3VwZGF0ZVwiOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBEZmhQcm9maWxlSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBEZmhQcm9maWxlYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkRmaFByb2ZpbGVcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEZmhQcm9maWxlIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IERmaFByb2ZpbGVJbnRlcmZhY2UpOiBEZmhQcm9maWxle1xuICAgIHJldHVybiBuZXcgRGZoUHJvZmlsZShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0RmaFByb2ZpbGUnLFxuICAgICAgcGx1cmFsOiAnRGZoUHJvZmlsZXMnLFxuICAgICAgcGF0aDogJ0RmaFByb2ZpbGVzJyxcbiAgICAgIGlkTmFtZTogJ3BrX3Byb2ZpbGUnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcInBrX3Byb2ZpbGVcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19wcm9maWxlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcIm93bmVkX2J5X3Byb2plY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdvd25lZF9ieV9wcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImlzX29uZ29pbmdfZm9yY2VkX3B1YmxpY2F0aW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnaXNfb25nb2luZ19mb3JjZWRfcHVibGljYXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgICBcImRhdGVfcHJvZmlsZV9wdWJsaXNoZWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdkYXRlX3Byb2ZpbGVfcHVibGlzaGVkJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImRhdGVfcHJvZmlsZV9kZXByZWNhdGVkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZGF0ZV9wcm9maWxlX2RlcHJlY2F0ZWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwidG1zcF9sYXN0X2RmaF91cGRhdGVcIjoge1xuICAgICAgICAgIG5hbWU6ICd0bXNwX2xhc3RfZGZoX3VwZGF0ZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==