/* tslint:disable */
var SchemaObject = /** @class */ (function () {
    function SchemaObject(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SchemaObject`.
     */
    SchemaObject.getModelName = function () {
        return "SchemaObject";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SchemaObject for dynamic purposes.
    **/
    SchemaObject.factory = function (data) {
        return new SchemaObject(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    SchemaObject.getModelDefinition = function () {
        return {
            name: 'SchemaObject',
            plural: 'SchemaObjects',
            path: 'SchemaObjects',
            idName: 'inf',
            properties: {
                "inf": {
                    name: 'inf',
                    type: 'any'
                },
                "pro": {
                    name: 'pro',
                    type: 'any'
                },
                "dat": {
                    name: 'dat',
                    type: 'any'
                },
                "sys": {
                    name: 'sys',
                    type: 'any'
                },
                "dfh": {
                    name: 'dfh',
                    type: 'any'
                },
            },
            relations: {}
        };
    };
    return SchemaObject;
}());
export { SchemaObject };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hT2JqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibW9kZWxzL1NjaGVtYU9iamVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFXcEI7SUFNRSxzQkFBWSxJQUE0QjtRQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1cseUJBQVksR0FBMUI7UUFDRSxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyxvQkFBTyxHQUFyQixVQUFzQixJQUEyQjtRQUMvQyxPQUFPLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDVywrQkFBa0IsR0FBaEM7UUFDRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLGNBQWM7WUFDcEIsTUFBTSxFQUFFLGVBQWU7WUFDdkIsSUFBSSxFQUFFLGVBQWU7WUFDckIsTUFBTSxFQUFFLEtBQUs7WUFDYixVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsS0FBSztpQkFDWjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQWhFRCxJQWdFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBTY2hlbWFPYmplY3RJbnRlcmZhY2Uge1xuICBcImluZlwiPzogYW55O1xuICBcInByb1wiPzogYW55O1xuICBcImRhdFwiPzogYW55O1xuICBcInN5c1wiPzogYW55O1xuICBcImRmaFwiPzogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgU2NoZW1hT2JqZWN0IGltcGxlbWVudHMgU2NoZW1hT2JqZWN0SW50ZXJmYWNlIHtcbiAgXCJpbmZcIjogYW55O1xuICBcInByb1wiOiBhbnk7XG4gIFwiZGF0XCI6IGFueTtcbiAgXCJzeXNcIjogYW55O1xuICBcImRmaFwiOiBhbnk7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBTY2hlbWFPYmplY3RJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFNjaGVtYU9iamVjdGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJTY2hlbWFPYmplY3RcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTY2hlbWFPYmplY3QgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogU2NoZW1hT2JqZWN0SW50ZXJmYWNlKTogU2NoZW1hT2JqZWN0e1xuICAgIHJldHVybiBuZXcgU2NoZW1hT2JqZWN0KGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnU2NoZW1hT2JqZWN0JyxcbiAgICAgIHBsdXJhbDogJ1NjaGVtYU9iamVjdHMnLFxuICAgICAgcGF0aDogJ1NjaGVtYU9iamVjdHMnLFxuICAgICAgaWROYW1lOiAnaW5mJyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJpbmZcIjoge1xuICAgICAgICAgIG5hbWU6ICdpbmYnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwicHJvXCI6IHtcbiAgICAgICAgICBuYW1lOiAncHJvJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcImRhdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2RhdCcsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJzeXNcIjoge1xuICAgICAgICAgIG5hbWU6ICdzeXMnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGZoXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZGZoJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19