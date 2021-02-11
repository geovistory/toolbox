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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGZoUHJvZmlsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9EZmhQcm9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQVlwQixNQUFNLE9BQU8sVUFBVTtJQU9yQixZQUFZLElBQTBCO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXlCO1FBQzdDLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxZQUFZO1lBQ3BCLFVBQVUsRUFBRTtnQkFDVixZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCwrQkFBK0IsRUFBRTtvQkFDL0IsSUFBSSxFQUFFLCtCQUErQjtvQkFDckMsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELHdCQUF3QixFQUFFO29CQUN4QixJQUFJLEVBQUUsd0JBQXdCO29CQUM5QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCx5QkFBeUIsRUFBRTtvQkFDekIsSUFBSSxFQUFFLHlCQUF5QjtvQkFDL0IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsc0JBQXNCLEVBQUU7b0JBQ3RCLElBQUksRUFBRSxzQkFBc0I7b0JBQzVCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgRGZoUHJvZmlsZUludGVyZmFjZSB7XG4gIFwicGtfcHJvZmlsZVwiPzogbnVtYmVyO1xuICBcIm93bmVkX2J5X3Byb2plY3RcIj86IG51bWJlcjtcbiAgXCJpc19vbmdvaW5nX2ZvcmNlZF9wdWJsaWNhdGlvblwiPzogYm9vbGVhbjtcbiAgXCJkYXRlX3Byb2ZpbGVfcHVibGlzaGVkXCI/OiBzdHJpbmc7XG4gIFwiZGF0ZV9wcm9maWxlX2RlcHJlY2F0ZWRcIj86IHN0cmluZztcbiAgXCJ0bXNwX2xhc3RfZGZoX3VwZGF0ZVwiPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRGZoUHJvZmlsZSBpbXBsZW1lbnRzIERmaFByb2ZpbGVJbnRlcmZhY2Uge1xuICBcInBrX3Byb2ZpbGVcIjogbnVtYmVyO1xuICBcIm93bmVkX2J5X3Byb2plY3RcIjogbnVtYmVyO1xuICBcImlzX29uZ29pbmdfZm9yY2VkX3B1YmxpY2F0aW9uXCI6IGJvb2xlYW47XG4gIFwiZGF0ZV9wcm9maWxlX3B1Ymxpc2hlZFwiOiBzdHJpbmc7XG4gIFwiZGF0ZV9wcm9maWxlX2RlcHJlY2F0ZWRcIjogc3RyaW5nO1xuICBcInRtc3BfbGFzdF9kZmhfdXBkYXRlXCI6IHN0cmluZztcbiAgY29uc3RydWN0b3IoZGF0YT86IERmaFByb2ZpbGVJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYERmaFByb2ZpbGVgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRGZoUHJvZmlsZVwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIERmaFByb2ZpbGUgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogRGZoUHJvZmlsZUludGVyZmFjZSk6IERmaFByb2ZpbGV7XG4gICAgcmV0dXJuIG5ldyBEZmhQcm9maWxlKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnRGZoUHJvZmlsZScsXG4gICAgICBwbHVyYWw6ICdEZmhQcm9maWxlcycsXG4gICAgICBwYXRoOiAnRGZoUHJvZmlsZXMnLFxuICAgICAgaWROYW1lOiAncGtfcHJvZmlsZScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicGtfcHJvZmlsZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX3Byb2ZpbGUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwib3duZWRfYnlfcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ293bmVkX2J5X3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiaXNfb25nb2luZ19mb3JjZWRfcHVibGljYXRpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICdpc19vbmdvaW5nX2ZvcmNlZF9wdWJsaWNhdGlvbicsXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGF0ZV9wcm9maWxlX3B1Ymxpc2hlZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2RhdGVfcHJvZmlsZV9wdWJsaXNoZWQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGF0ZV9wcm9maWxlX2RlcHJlY2F0ZWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdkYXRlX3Byb2ZpbGVfZGVwcmVjYXRlZCcsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0bXNwX2xhc3RfZGZoX3VwZGF0ZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3Rtc3BfbGFzdF9kZmhfdXBkYXRlJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19