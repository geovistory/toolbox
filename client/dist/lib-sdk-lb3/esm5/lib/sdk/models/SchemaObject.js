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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hT2JqZWN0LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvU2NoZW1hT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQVdwQjtJQU1FLHNCQUFZLElBQTRCO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyx5QkFBWSxHQUExQjtRQUNFLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLG9CQUFPLEdBQXJCLFVBQXNCLElBQTJCO1FBQy9DLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLCtCQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYztZQUNwQixNQUFNLEVBQUUsZUFBZTtZQUN2QixJQUFJLEVBQUUsZUFBZTtZQUNyQixNQUFNLEVBQUUsS0FBSztZQUNiLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELEtBQUssRUFBRTtvQkFDTCxJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxLQUFLO29CQUNYLElBQUksRUFBRSxLQUFLO2lCQUNaO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBaEVELElBZ0VDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFNjaGVtYU9iamVjdEludGVyZmFjZSB7XG4gIFwiaW5mXCI/OiBhbnk7XG4gIFwicHJvXCI/OiBhbnk7XG4gIFwiZGF0XCI/OiBhbnk7XG4gIFwic3lzXCI/OiBhbnk7XG4gIFwiZGZoXCI/OiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBTY2hlbWFPYmplY3QgaW1wbGVtZW50cyBTY2hlbWFPYmplY3RJbnRlcmZhY2Uge1xuICBcImluZlwiOiBhbnk7XG4gIFwicHJvXCI6IGFueTtcbiAgXCJkYXRcIjogYW55O1xuICBcInN5c1wiOiBhbnk7XG4gIFwiZGZoXCI6IGFueTtcbiAgY29uc3RydWN0b3IoZGF0YT86IFNjaGVtYU9iamVjdEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgU2NoZW1hT2JqZWN0YC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlNjaGVtYU9iamVjdFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFNjaGVtYU9iamVjdCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBTY2hlbWFPYmplY3RJbnRlcmZhY2UpOiBTY2hlbWFPYmplY3R7XG4gICAgcmV0dXJuIG5ldyBTY2hlbWFPYmplY3QoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdTY2hlbWFPYmplY3QnLFxuICAgICAgcGx1cmFsOiAnU2NoZW1hT2JqZWN0cycsXG4gICAgICBwYXRoOiAnU2NoZW1hT2JqZWN0cycsXG4gICAgICBpZE5hbWU6ICdpbmYnLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImluZlwiOiB7XG4gICAgICAgICAgbmFtZTogJ2luZicsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJwcm9cIjoge1xuICAgICAgICAgIG5hbWU6ICdwcm8nLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGF0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZGF0JyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcInN5c1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3N5cycsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZmhcIjoge1xuICAgICAgICAgIG5hbWU6ICdkZmgnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=