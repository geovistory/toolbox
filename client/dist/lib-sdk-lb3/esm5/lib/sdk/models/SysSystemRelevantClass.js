/* tslint:disable */
var SysSystemRelevantClass = /** @class */ (function () {
    function SysSystemRelevantClass(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemRelevantClass`.
     */
    SysSystemRelevantClass.getModelName = function () {
        return "SysSystemRelevantClass";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysSystemRelevantClass for dynamic purposes.
    **/
    SysSystemRelevantClass.factory = function (data) {
        return new SysSystemRelevantClass(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    SysSystemRelevantClass.getModelDefinition = function () {
        return {
            name: 'SysSystemRelevantClass',
            plural: 'SysSystemRelevantClasses',
            path: 'SysSystemRelevantClasses',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "required_by_entities": {
                    name: 'required_by_entities',
                    type: 'boolean'
                },
                "required_by_sources": {
                    name: 'required_by_sources',
                    type: 'boolean'
                },
                "required_by_basics": {
                    name: 'required_by_basics',
                    type: 'boolean'
                },
                "excluded_from_entities": {
                    name: 'excluded_from_entities',
                    type: 'boolean'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {}
        };
    };
    return SysSystemRelevantClass;
}());
export { SysSystemRelevantClass };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzU3lzdGVtUmVsZXZhbnRDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL1N5c1N5c3RlbVJlbGV2YW50Q2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBWXBCO0lBT0UsZ0NBQVksSUFBc0M7UUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLG1DQUFZLEdBQTFCO1FBQ0UsT0FBTyx3QkFBd0IsQ0FBQztJQUNsQyxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyw4QkFBTyxHQUFyQixVQUFzQixJQUFxQztRQUN6RCxPQUFPLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLHlDQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsd0JBQXdCO1lBQzlCLE1BQU0sRUFBRSwwQkFBMEI7WUFDbEMsSUFBSSxFQUFFLDBCQUEwQjtZQUNoQyxNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxzQkFBc0IsRUFBRTtvQkFDdEIsSUFBSSxFQUFFLHNCQUFzQjtvQkFDNUIsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELHFCQUFxQixFQUFFO29CQUNyQixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixJQUFJLEVBQUUsU0FBUztpQkFDaEI7Z0JBQ0Qsb0JBQW9CLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxvQkFBb0I7b0JBQzFCLElBQUksRUFBRSxTQUFTO2lCQUNoQjtnQkFDRCx3QkFBd0IsRUFBRTtvQkFDeEIsSUFBSSxFQUFFLHdCQUF3QjtvQkFDOUIsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUFyRUQsSUFxRUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0ludGVyZmFjZSB7XG4gIFwiZmtfY2xhc3NcIj86IG51bWJlcjtcbiAgXCJyZXF1aXJlZF9ieV9lbnRpdGllc1wiPzogYm9vbGVhbjtcbiAgXCJyZXF1aXJlZF9ieV9zb3VyY2VzXCI/OiBib29sZWFuO1xuICBcInJlcXVpcmVkX2J5X2Jhc2ljc1wiPzogYm9vbGVhbjtcbiAgXCJleGNsdWRlZF9mcm9tX2VudGl0aWVzXCI/OiBib29sZWFuO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyBpbXBsZW1lbnRzIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NJbnRlcmZhY2Uge1xuICBcImZrX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJyZXF1aXJlZF9ieV9lbnRpdGllc1wiOiBib29sZWFuO1xuICBcInJlcXVpcmVkX2J5X3NvdXJjZXNcIjogYm9vbGVhbjtcbiAgXCJyZXF1aXJlZF9ieV9iYXNpY3NcIjogYm9vbGVhbjtcbiAgXCJleGNsdWRlZF9mcm9tX2VudGl0aWVzXCI6IGJvb2xlYW47XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgY29uc3RydWN0b3IoZGF0YT86IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiU3lzU3lzdGVtUmVsZXZhbnRDbGFzc1wiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogU3lzU3lzdGVtUmVsZXZhbnRDbGFzc0ludGVyZmFjZSk6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3N7XG4gICAgcmV0dXJuIG5ldyBTeXNTeXN0ZW1SZWxldmFudENsYXNzKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnU3lzU3lzdGVtUmVsZXZhbnRDbGFzcycsXG4gICAgICBwbHVyYWw6ICdTeXNTeXN0ZW1SZWxldmFudENsYXNzZXMnLFxuICAgICAgcGF0aDogJ1N5c1N5c3RlbVJlbGV2YW50Q2xhc3NlcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImZrX2NsYXNzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVxdWlyZWRfYnlfZW50aXRpZXNcIjoge1xuICAgICAgICAgIG5hbWU6ICdyZXF1aXJlZF9ieV9lbnRpdGllcycsXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVxdWlyZWRfYnlfc291cmNlc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3JlcXVpcmVkX2J5X3NvdXJjZXMnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgICBcInJlcXVpcmVkX2J5X2Jhc2ljc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3JlcXVpcmVkX2J5X2Jhc2ljcycsXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgIH0sXG4gICAgICAgIFwiZXhjbHVkZWRfZnJvbV9lbnRpdGllc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2V4Y2x1ZGVkX2Zyb21fZW50aXRpZXMnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==