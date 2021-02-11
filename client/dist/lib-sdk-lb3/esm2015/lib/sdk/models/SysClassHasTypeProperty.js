/* tslint:disable */
export class SysClassHasTypeProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassHasTypeProperty`.
     */
    static getModelName() {
        return "SysClassHasTypeProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassHasTypeProperty for dynamic purposes.
    **/
    static factory(data) {
        return new SysClassHasTypeProperty(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9TeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFhcEIsTUFBTSxPQUFPLHVCQUF1QjtJQVFsQyxZQUFZLElBQXVDO1FBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLHlCQUF5QixDQUFDO0lBQ25DLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBc0M7UUFDMUQsT0FBTyxJQUFJLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUseUJBQXlCO1lBQy9CLE1BQU0sRUFBRSwyQkFBMkI7WUFDbkMsSUFBSSxFQUFFLDJCQUEyQjtZQUNqQyxNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxpQkFBaUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsZUFBZTtvQkFDckIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsa0JBQWtCLEVBQUU7b0JBQ2xCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eUludGVyZmFjZSB7XG4gIFwicGtfdHlwZWRfY2xhc3NcIj86IG51bWJlcjtcbiAgXCJ0eXBlZF9jbGFzc19sYWJlbFwiPzogc3RyaW5nO1xuICBcImRmaF9wa19wcm9wZXJ0eVwiPzogbnVtYmVyO1xuICBcInByb3BlcnR5X2xhYmVsXCI/OiBzdHJpbmc7XG4gIFwicGtfdHlwZV9jbGFzc1wiPzogbnVtYmVyO1xuICBcInR5cGVfY2xhc3NfbGFiZWxcIj86IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNsYXNzIFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5IGltcGxlbWVudHMgU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHlJbnRlcmZhY2Uge1xuICBcInBrX3R5cGVkX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJ0eXBlZF9jbGFzc19sYWJlbFwiOiBzdHJpbmc7XG4gIFwiZGZoX3BrX3Byb3BlcnR5XCI6IG51bWJlcjtcbiAgXCJwcm9wZXJ0eV9sYWJlbFwiOiBzdHJpbmc7XG4gIFwicGtfdHlwZV9jbGFzc1wiOiBudW1iZXI7XG4gIFwidHlwZV9jbGFzc19sYWJlbFwiOiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgY29uc3RydWN0b3IoZGF0YT86IFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eWAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eVwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5SW50ZXJmYWNlKTogU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHl7XG4gICAgcmV0dXJuIG5ldyBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1N5c0NsYXNzSGFzVHlwZVByb3BlcnR5JyxcbiAgICAgIHBsdXJhbDogJ1N5c0NsYXNzSGFzVHlwZVByb3BlcnRpZXMnLFxuICAgICAgcGF0aDogJ1N5c0NsYXNzSGFzVHlwZVByb3BlcnRpZXMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJwa190eXBlZF9jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX3R5cGVkX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInR5cGVkX2NsYXNzX2xhYmVsXCI6IHtcbiAgICAgICAgICBuYW1lOiAndHlwZWRfY2xhc3NfbGFiZWwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZGZoX3BrX3Byb3BlcnR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZGZoX3BrX3Byb3BlcnR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInByb3BlcnR5X2xhYmVsXCI6IHtcbiAgICAgICAgICBuYW1lOiAncHJvcGVydHlfbGFiZWwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfdHlwZV9jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX3R5cGVfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwidHlwZV9jbGFzc19sYWJlbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ3R5cGVfY2xhc3NfbGFiZWwnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19