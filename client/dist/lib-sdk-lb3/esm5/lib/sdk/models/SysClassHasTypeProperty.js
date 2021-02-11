/* tslint:disable */
var SysClassHasTypeProperty = /** @class */ (function () {
    function SysClassHasTypeProperty(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassHasTypeProperty`.
     */
    SysClassHasTypeProperty.getModelName = function () {
        return "SysClassHasTypeProperty";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassHasTypeProperty for dynamic purposes.
    **/
    SysClassHasTypeProperty.factory = function (data) {
        return new SysClassHasTypeProperty(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    SysClassHasTypeProperty.getModelDefinition = function () {
        return {
            name: 'SysClassHasTypeProperty',
            plural: 'SysClassHasTypeProperties',
            path: 'SysClassHasTypeProperties',
            idName: 'pk_entity',
            properties: {
                "pk_typed_class": {
                    name: 'pk_typed_class',
                    type: 'number'
                },
                "typed_class_label": {
                    name: 'typed_class_label',
                    type: 'string'
                },
                "dfh_pk_property": {
                    name: 'dfh_pk_property',
                    type: 'number'
                },
                "property_label": {
                    name: 'property_label',
                    type: 'string'
                },
                "pk_type_class": {
                    name: 'pk_type_class',
                    type: 'number'
                },
                "type_class_label": {
                    name: 'type_class_label',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {}
        };
    };
    return SysClassHasTypeProperty;
}());
export { SysClassHasTypeProperty };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9TeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFhcEI7SUFRRSxpQ0FBWSxJQUF1QztRQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csb0NBQVksR0FBMUI7UUFDRSxPQUFPLHlCQUF5QixDQUFDO0lBQ25DLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLCtCQUFPLEdBQXJCLFVBQXNCLElBQXNDO1FBQzFELE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csMENBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSx5QkFBeUI7WUFDL0IsTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGlCQUFpQixFQUFFO29CQUNqQixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxrQkFBa0IsRUFBRTtvQkFDbEIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFLEVBQ1Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQTFFRCxJQTBFQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eUludGVyZmFjZSB7XG4gIFwicGtfdHlwZWRfY2xhc3NcIj86IG51bWJlcjtcbiAgXCJ0eXBlZF9jbGFzc19sYWJlbFwiPzogc3RyaW5nO1xuICBcImRmaF9wa19wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcInByb3BlcnR5X2xhYmVsXCI/OiBzdHJpbmc7XG4gIFwicGtfdHlwZV9jbGFzc1wiPzogbnVtYmVyO1xuICBcInR5cGVfY2xhc3NfbGFiZWxcIj86IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5IGltcGxlbWVudHMgU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHlJbnRlcmZhY2Uge1xuICBcInBrX3R5cGVkX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJ0eXBlZF9jbGFzc19sYWJlbFwiOiBzdHJpbmc7XG4gIFwiZGZoX3BrX3Byb3BlcnR5XCI6IG51bWJlcjtcbiAgXCJwcm9wZXJ0eV9sYWJlbFwiOiBzdHJpbmc7XG4gIFwicGtfdHlwZV9jbGFzc1wiOiBudW1iZXI7XG4gIFwidHlwZV9jbGFzc19sYWJlbFwiOiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgY29uc3RydWN0b3IoZGF0YT86IFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eWAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eVwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5SW50ZXJmYWNlKTogU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHl7XG4gICAgcmV0dXJuIG5ldyBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1N5c0NsYXNzSGFzVHlwZVByb3BlcnR5JyxcbiAgICAgIHBsdXJhbDogJ1N5c0NsYXNzSGFzVHlwZVByb3BlcnRpZXMnLFxuICAgICAgcGF0aDogJ1N5c0NsYXNzSGFzVHlwZVByb3BlcnRpZXMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJwa190eXBlZF9jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX3R5cGVkX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInR5cGVkX2NsYXNzX2xhYmVsXCI6IHtcbiAgICAgICAgICBuYW1lOiAndHlwZWRfY2xhc3NfbGFiZWwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGZoX3BrX3Byb3BlcnR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZGZoX3BrX3Byb3BlcnR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInByb3BlcnR5X2xhYmVsXCI6IHtcbiAgICAgICAgICBuYW1lOiAncHJvcGVydHlfbGFiZWwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfdHlwZV9jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX3R5cGVfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwidHlwZV9jbGFzc19sYWJlbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ3R5cGVfY2xhc3NfbGFiZWwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19