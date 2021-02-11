/* tslint:disable */
export class DfhProfile {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DfhProfile`.
     */
    static getModelName() {
        return "DfhProfile";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DfhProfile for dynamic purposes.
    **/
    static factory(data) {
        return new DfhProfile(data);
    }
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    static getModelDefinition() {
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGZoUHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL0RmaFByb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBWXBCLE1BQU0sT0FBTyxVQUFVO0lBT3JCLFlBQVksSUFBMEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxZQUFZO1FBQ3hCLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBeUI7UUFDN0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLFlBQVk7WUFDbEIsTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTSxFQUFFLFlBQVk7WUFDcEIsVUFBVSxFQUFFO2dCQUNWLFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsa0JBQWtCLEVBQUU7b0JBQ2xCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELCtCQUErQixFQUFFO29CQUMvQixJQUFJLEVBQUUsK0JBQStCO29CQUNyQyxJQUFJLEVBQUUsU0FBUztpQkFDaEI7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHlCQUF5QixFQUFFO29CQUN6QixJQUFJLEVBQUUseUJBQXlCO29CQUMvQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxzQkFBc0IsRUFBRTtvQkFDdEIsSUFBSSxFQUFFLHNCQUFzQjtvQkFDNUIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBEZmhQcm9maWxlSW50ZXJmYWNlIHtcbiAgXCJwa19wcm9maWxlXCI/OiBudW1iZXI7XG4gIFwib3duZWRfYnlfcHJvamVjdFwiPzogbnVtYmVyO1xuICBcImlzX29uZ29pbmdfZm9yY2VkX3B1YmxpY2F0aW9uXCI/OiBib29sZWFuO1xuICBcImRhdGVfcHJvZmlsZV9wdWJsaXNoZWRcIj86IHN0cmluZztcbiAgXCJkYXRlX3Byb2ZpbGVfZGVwcmVjYXRlZFwiPzogc3RyaW5nO1xuICBcInRtc3BfbGFzdF9kZmhfdXBkYXRlXCI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBEZmhQcm9maWxlIGltcGxlbWVudHMgRGZoUHJvZmlsZUludGVyZmFjZSB7XG4gIFwicGtfcHJvZmlsZVwiOiBudW1iZXI7XG4gIFwib3duZWRfYnlfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiaXNfb25nb2luZ19mb3JjZWRfcHVibGljYXRpb25cIjogYm9vbGVhbjtcbiAgXCJkYXRlX3Byb2ZpbGVfcHVibGlzaGVkXCI6IHN0cmluZztcbiAgXCJkYXRlX3Byb2ZpbGVfZGVwcmVjYXRlZFwiOiBzdHJpbmc7XG4gIFwidG1zcF9sYXN0X2RmaF91cGRhdGVcIjogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogRGZoUHJvZmlsZUludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgRGZoUHJvZmlsZWAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJEZmhQcm9maWxlXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGZoUHJvZmlsZSBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBEZmhQcm9maWxlSW50ZXJmYWNlKTogRGZoUHJvZmlsZXtcbiAgICByZXR1cm4gbmV3IERmaFByb2ZpbGUoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdEZmhQcm9maWxlJyxcbiAgICAgIHBsdXJhbDogJ0RmaFByb2ZpbGVzJyxcbiAgICAgIHBhdGg6ICdEZmhQcm9maWxlcycsXG4gICAgICBpZE5hbWU6ICdwa19wcm9maWxlJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJwa19wcm9maWxlXCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfcHJvZmlsZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJvd25lZF9ieV9wcm9qZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnb3duZWRfYnlfcHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJpc19vbmdvaW5nX2ZvcmNlZF9wdWJsaWNhdGlvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lzX29uZ29pbmdfZm9yY2VkX3B1YmxpY2F0aW9uJyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSxcbiAgICAgICAgXCJkYXRlX3Byb2ZpbGVfcHVibGlzaGVkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZGF0ZV9wcm9maWxlX3B1Ymxpc2hlZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJkYXRlX3Byb2ZpbGVfZGVwcmVjYXRlZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2RhdGVfcHJvZmlsZV9kZXByZWNhdGVkJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInRtc3BfbGFzdF9kZmhfdXBkYXRlXCI6IHtcbiAgICAgICAgICBuYW1lOiAndG1zcF9sYXN0X2RmaF91cGRhdGUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=