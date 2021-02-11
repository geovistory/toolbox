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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBYXBCLE1BQU0sT0FBTyx1QkFBdUI7SUFRbEMsWUFBWSxJQUF1QztRQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyx5QkFBeUIsQ0FBQztJQUNuQyxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXNDO1FBQzFELE9BQU8sSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixNQUFNLEVBQUUsMkJBQTJCO1lBQ25DLElBQUksRUFBRSwyQkFBMkI7WUFDakMsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsaUJBQWlCLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUUsRUFDVjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHlJbnRlcmZhY2Uge1xuICBcInBrX3R5cGVkX2NsYXNzXCI/OiBudW1iZXI7XG4gIFwidHlwZWRfY2xhc3NfbGFiZWxcIj86IHN0cmluZztcbiAgXCJkZmhfcGtfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJwcm9wZXJ0eV9sYWJlbFwiPzogc3RyaW5nO1xuICBcInBrX3R5cGVfY2xhc3NcIj86IG51bWJlcjtcbiAgXCJ0eXBlX2NsYXNzX2xhYmVsXCI/OiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eSBpbXBsZW1lbnRzIFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5SW50ZXJmYWNlIHtcbiAgXCJwa190eXBlZF9jbGFzc1wiOiBudW1iZXI7XG4gIFwidHlwZWRfY2xhc3NfbGFiZWxcIjogc3RyaW5nO1xuICBcImRmaF9wa19wcm9wZXJ0eVwiOiBudW1iZXI7XG4gIFwicHJvcGVydHlfbGFiZWxcIjogc3RyaW5nO1xuICBcInBrX3R5cGVfY2xhc3NcIjogbnVtYmVyO1xuICBcInR5cGVfY2xhc3NfbGFiZWxcIjogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eUludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHlgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHlcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eSBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eUludGVyZmFjZSk6IFN5c0NsYXNzSGFzVHlwZVByb3BlcnR5e1xuICAgIHJldHVybiBuZXcgU3lzQ2xhc3NIYXNUeXBlUHJvcGVydHkoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0eScsXG4gICAgICBwbHVyYWw6ICdTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0aWVzJyxcbiAgICAgIHBhdGg6ICdTeXNDbGFzc0hhc1R5cGVQcm9wZXJ0aWVzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicGtfdHlwZWRfY2xhc3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa190eXBlZF9jbGFzcycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0eXBlZF9jbGFzc19sYWJlbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ3R5cGVkX2NsYXNzX2xhYmVsJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImRmaF9wa19wcm9wZXJ0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2RmaF9wa19wcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwcm9wZXJ0eV9sYWJlbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ3Byb3BlcnR5X2xhYmVsJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX3R5cGVfY2xhc3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa190eXBlX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInR5cGVfY2xhc3NfbGFiZWxcIjoge1xuICAgICAgICAgIG5hbWU6ICd0eXBlX2NsYXNzX2xhYmVsJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==