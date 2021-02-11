var SysClassFieldPropertyRel = /** @class */ (function () {
    // property?: DfhProperty;
    function SysClassFieldPropertyRel(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassFieldPropertyRel`.
     */
    SysClassFieldPropertyRel.getModelName = function () {
        return "SysClassFieldPropertyRel";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassFieldPropertyRel for dynamic purposes.
    **/
    SysClassFieldPropertyRel.factory = function (data) {
        return new SysClassFieldPropertyRel(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    SysClassFieldPropertyRel.getModelDefinition = function () {
        return {
            name: 'SysClassFieldPropertyRel',
            plural: 'SysClassFieldPropertyRels',
            path: 'SysClassFieldPropertyRels',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_class_field": {
                    name: 'fk_class_field',
                    type: 'number'
                },
                "fk_property": {
                    name: 'fk_property',
                    type: 'number'
                },
                "property_is_outgoing": {
                    name: 'property_is_outgoing',
                    type: 'boolean'
                },
                "ord_num": {
                    name: 'ord_num',
                    type: 'number'
                },
            },
            relations: {
                class_field: {
                    name: 'class_field',
                    type: 'SysClassField',
                    model: 'SysClassField',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_class_field',
                    keyTo: 'pk_entity'
                },
                property: {
                    name: 'property',
                    type: 'DfhProperty',
                    model: 'DfhProperty',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_property',
                    keyTo: 'pk_property'
                },
            }
        };
    };
    return SysClassFieldPropertyRel;
}());
export { SysClassFieldPropertyRel };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibW9kZWxzL1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkE7SUFPRSwwQkFBMEI7SUFDMUIsa0NBQVksSUFBd0M7UUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHFDQUFZLEdBQTFCO1FBQ0UsT0FBTywwQkFBMEIsQ0FBQztJQUNwQyxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyxnQ0FBTyxHQUFyQixVQUFzQixJQUF1QztRQUMzRCxPQUFPLElBQUksd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLDJDQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsMEJBQTBCO1lBQ2hDLE1BQU0sRUFBRSwyQkFBMkI7WUFDbkMsSUFBSSxFQUFFLDJCQUEyQjtZQUNqQyxNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxzQkFBc0IsRUFBRTtvQkFDdEIsSUFBSSxFQUFFLHNCQUFzQjtvQkFDNUIsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLEtBQUssRUFBRSxlQUFlO29CQUN0QixZQUFZLEVBQUUsV0FBVztvQkFDekIsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLEtBQUssRUFBRSxhQUFhO29CQUNwQixZQUFZLEVBQUUsV0FBVztvQkFDekIsT0FBTyxFQUFFLGFBQWE7b0JBQ3RCLEtBQUssRUFBRSxhQUFhO2lCQUNyQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCwrQkFBQztBQUFELENBQUMsQUFsRkQsSUFrRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgU3lzQ2xhc3NGaWVsZCxcbiAgLy8gRGZoUHJvcGVydHlcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsSW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19jbGFzc19maWVsZFwiPzogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwicHJvcGVydHlfaXNfb3V0Z29pbmdcIj86IGJvb2xlYW47XG4gIFwib3JkX251bVwiPzogbnVtYmVyO1xuICBjbGFzc19maWVsZD86IFN5c0NsYXNzRmllbGQ7XG4gIC8vIHByb3BlcnR5PzogRGZoUHJvcGVydHk7XG59XG5cbmV4cG9ydCBjbGFzcyBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWwgaW1wbGVtZW50cyBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxJbnRlcmZhY2Uge1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfY2xhc3NfZmllbGRcIjogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5XCI6IG51bWJlcjtcbiAgXCJwcm9wZXJ0eV9pc19vdXRnb2luZ1wiOiBib29sZWFuO1xuICBcIm9yZF9udW1cIjogbnVtYmVyO1xuICBjbGFzc19maWVsZD86IFN5c0NsYXNzRmllbGQ7XG4gIC8vIHByb3BlcnR5PzogRGZoUHJvcGVydHk7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWwgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsSW50ZXJmYWNlKTogU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsIHtcbiAgICByZXR1cm4gbmV3IFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCcsXG4gICAgICBwbHVyYWw6ICdTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxzJyxcbiAgICAgIHBhdGg6ICdTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2NsYXNzX2ZpZWxkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3NfZmllbGQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvcGVydHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwcm9wZXJ0eV9pc19vdXRnb2luZ1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3Byb3BlcnR5X2lzX291dGdvaW5nJyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcmRfbnVtXCI6IHtcbiAgICAgICAgICBuYW1lOiAnb3JkX251bScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgY2xhc3NfZmllbGQ6IHtcbiAgICAgICAgICBuYW1lOiAnY2xhc3NfZmllbGQnLFxuICAgICAgICAgIHR5cGU6ICdTeXNDbGFzc0ZpZWxkJyxcbiAgICAgICAgICBtb2RlbDogJ1N5c0NsYXNzRmllbGQnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX2NsYXNzX2ZpZWxkJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydHk6IHtcbiAgICAgICAgICBuYW1lOiAncHJvcGVydHknLFxuICAgICAgICAgIHR5cGU6ICdEZmhQcm9wZXJ0eScsXG4gICAgICAgICAgbW9kZWw6ICdEZmhQcm9wZXJ0eScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfcHJvcGVydHknLFxuICAgICAgICAgIGtleVRvOiAncGtfcHJvcGVydHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=