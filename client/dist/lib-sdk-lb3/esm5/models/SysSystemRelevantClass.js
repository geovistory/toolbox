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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzU3lzdGVtUmVsZXZhbnRDbGFzcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9TeXNTeXN0ZW1SZWxldmFudENsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQVlwQjtJQU9FLGdDQUFZLElBQXNDO1FBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyxtQ0FBWSxHQUExQjtRQUNFLE9BQU8sd0JBQXdCLENBQUM7SUFDbEMsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csOEJBQU8sR0FBckIsVUFBc0IsSUFBcUM7UUFDekQsT0FBTyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDVyx5Q0FBa0IsR0FBaEM7UUFDRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLHdCQUF3QjtZQUM5QixNQUFNLEVBQUUsMEJBQTBCO1lBQ2xDLElBQUksRUFBRSwwQkFBMEI7WUFDaEMsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsc0JBQXNCLEVBQUU7b0JBQ3RCLElBQUksRUFBRSxzQkFBc0I7b0JBQzVCLElBQUksRUFBRSxTQUFTO2lCQUNoQjtnQkFDRCxxQkFBcUIsRUFBRTtvQkFDckIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELG9CQUFvQixFQUFFO29CQUNwQixJQUFJLEVBQUUsb0JBQW9CO29CQUMxQixJQUFJLEVBQUUsU0FBUztpQkFDaEI7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxTQUFTO2lCQUNoQjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBckVELElBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NJbnRlcmZhY2Uge1xuICBcImZrX2NsYXNzXCI/OiBudW1iZXI7XG4gIFwicmVxdWlyZWRfYnlfZW50aXRpZXNcIj86IGJvb2xlYW47XG4gIFwicmVxdWlyZWRfYnlfc291cmNlc1wiPzogYm9vbGVhbjtcbiAgXCJyZXF1aXJlZF9ieV9iYXNpY3NcIj86IGJvb2xlYW47XG4gIFwiZXhjbHVkZWRfZnJvbV9lbnRpdGllc1wiPzogYm9vbGVhbjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFN5c1N5c3RlbVJlbGV2YW50Q2xhc3MgaW1wbGVtZW50cyBTeXNTeXN0ZW1SZWxldmFudENsYXNzSW50ZXJmYWNlIHtcbiAgXCJma19jbGFzc1wiOiBudW1iZXI7XG4gIFwicmVxdWlyZWRfYnlfZW50aXRpZXNcIjogYm9vbGVhbjtcbiAgXCJyZXF1aXJlZF9ieV9zb3VyY2VzXCI6IGJvb2xlYW47XG4gIFwicmVxdWlyZWRfYnlfYmFzaWNzXCI6IGJvb2xlYW47XG4gIFwiZXhjbHVkZWRfZnJvbV9lbnRpdGllc1wiOiBib29sZWFuO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBTeXNTeXN0ZW1SZWxldmFudENsYXNzSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBTeXNTeXN0ZW1SZWxldmFudENsYXNzYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlN5c1N5c3RlbVJlbGV2YW50Q2xhc3NcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTeXNTeXN0ZW1SZWxldmFudENsYXNzIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFN5c1N5c3RlbVJlbGV2YW50Q2xhc3NJbnRlcmZhY2UpOiBTeXNTeXN0ZW1SZWxldmFudENsYXNze1xuICAgIHJldHVybiBuZXcgU3lzU3lzdGVtUmVsZXZhbnRDbGFzcyhkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1N5c1N5c3RlbVJlbGV2YW50Q2xhc3MnLFxuICAgICAgcGx1cmFsOiAnU3lzU3lzdGVtUmVsZXZhbnRDbGFzc2VzJyxcbiAgICAgIHBhdGg6ICdTeXNTeXN0ZW1SZWxldmFudENsYXNzZXMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJma19jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInJlcXVpcmVkX2J5X2VudGl0aWVzXCI6IHtcbiAgICAgICAgICBuYW1lOiAncmVxdWlyZWRfYnlfZW50aXRpZXMnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgICBcInJlcXVpcmVkX2J5X3NvdXJjZXNcIjoge1xuICAgICAgICAgIG5hbWU6ICdyZXF1aXJlZF9ieV9zb3VyY2VzJyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSxcbiAgICAgICAgXCJyZXF1aXJlZF9ieV9iYXNpY3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdyZXF1aXJlZF9ieV9iYXNpY3MnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgICBcImV4Y2x1ZGVkX2Zyb21fZW50aXRpZXNcIjoge1xuICAgICAgICAgIG5hbWU6ICdleGNsdWRlZF9mcm9tX2VudGl0aWVzJyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=