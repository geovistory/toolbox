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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlCQTtJQU9FLDBCQUEwQjtJQUMxQixrQ0FBWSxJQUF3QztRQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1cscUNBQVksR0FBMUI7UUFDRSxPQUFPLDBCQUEwQixDQUFDO0lBQ3BDLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLGdDQUFPLEdBQXJCLFVBQXNCLElBQXVDO1FBQzNELE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csMkNBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSwwQkFBMEI7WUFDaEMsTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxJQUFJLEVBQUUsMkJBQTJCO1lBQ2pDLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHNCQUFzQixFQUFFO29CQUN0QixJQUFJLEVBQUUsc0JBQXNCO29CQUM1QixJQUFJLEVBQUUsU0FBUztpQkFDaEI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsZUFBZTtvQkFDckIsS0FBSyxFQUFFLGVBQWU7b0JBQ3RCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsYUFBYTtvQkFDdEIsS0FBSyxFQUFFLGFBQWE7aUJBQ3JCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILCtCQUFDO0FBQUQsQ0FBQyxBQWxGRCxJQWtGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBTeXNDbGFzc0ZpZWxkLFxuICAvLyBEZmhQcm9wZXJ0eVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxJbnRlcmZhY2Uge1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImZrX2NsYXNzX2ZpZWxkXCI/OiBudW1iZXI7XG4gIFwiZmtfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJwcm9wZXJ0eV9pc19vdXRnb2luZ1wiPzogYm9vbGVhbjtcbiAgXCJvcmRfbnVtXCI/OiBudW1iZXI7XG4gIGNsYXNzX2ZpZWxkPzogU3lzQ2xhc3NGaWVsZDtcbiAgLy8gcHJvcGVydHk/OiBEZmhQcm9wZXJ0eTtcbn1cblxuZXhwb3J0IGNsYXNzIFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCBpbXBsZW1lbnRzIFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbEludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19jbGFzc19maWVsZFwiOiBudW1iZXI7XG4gIFwiZmtfcHJvcGVydHlcIjogbnVtYmVyO1xuICBcInByb3BlcnR5X2lzX291dGdvaW5nXCI6IGJvb2xlYW47XG4gIFwib3JkX251bVwiOiBudW1iZXI7XG4gIGNsYXNzX2ZpZWxkPzogU3lzQ2xhc3NGaWVsZDtcbiAgLy8gcHJvcGVydHk/OiBEZmhQcm9wZXJ0eTtcbiAgY29uc3RydWN0b3IoZGF0YT86IFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxJbnRlcmZhY2UpOiBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWwge1xuICAgIHJldHVybiBuZXcgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsJyxcbiAgICAgIHBsdXJhbDogJ1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbHMnLFxuICAgICAgcGF0aDogJ1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbHMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfY2xhc3NfZmllbGRcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jbGFzc19maWVsZCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19wcm9wZXJ0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb3BlcnR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInByb3BlcnR5X2lzX291dGdvaW5nXCI6IHtcbiAgICAgICAgICBuYW1lOiAncHJvcGVydHlfaXNfb3V0Z29pbmcnLFxuICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICB9LFxuICAgICAgICBcIm9yZF9udW1cIjoge1xuICAgICAgICAgIG5hbWU6ICdvcmRfbnVtJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBjbGFzc19maWVsZDoge1xuICAgICAgICAgIG5hbWU6ICdjbGFzc19maWVsZCcsXG4gICAgICAgICAgdHlwZTogJ1N5c0NsYXNzRmllbGQnLFxuICAgICAgICAgIG1vZGVsOiAnU3lzQ2xhc3NGaWVsZCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfY2xhc3NfZmllbGQnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBwcm9wZXJ0eToge1xuICAgICAgICAgIG5hbWU6ICdwcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ0RmaFByb3BlcnR5JyxcbiAgICAgICAgICBtb2RlbDogJ0RmaFByb3BlcnR5JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgIGtleUZyb206ICdma19wcm9wZXJ0eScsXG4gICAgICAgICAga2V5VG86ICdwa19wcm9wZXJ0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==