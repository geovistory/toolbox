export class SysClassFieldPropertyRel {
    // property?: DfhProperty;
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysClassFieldPropertyRel`.
     */
    static getModelName() {
        return "SysClassFieldPropertyRel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysClassFieldPropertyRel for dynamic purposes.
    **/
    static factory(data) {
        return new SysClassFieldPropertyRel(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibW9kZWxzL1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkEsTUFBTSxPQUFPLHdCQUF3QjtJQU9uQywwQkFBMEI7SUFDMUIsWUFBWSxJQUF3QztRQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTywwQkFBMEIsQ0FBQztJQUNwQyxDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXVDO1FBQzNELE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLDBCQUEwQjtZQUNoQyxNQUFNLEVBQUUsMkJBQTJCO1lBQ25DLElBQUksRUFBRSwyQkFBMkI7WUFDakMsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsc0JBQXNCLEVBQUU7b0JBQ3RCLElBQUksRUFBRSxzQkFBc0I7b0JBQzVCLElBQUksRUFBRSxTQUFTO2lCQUNoQjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxlQUFlO29CQUNyQixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsWUFBWSxFQUFFLFdBQVc7b0JBQ3pCLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxhQUFhO29CQUNuQixLQUFLLEVBQUUsYUFBYTtvQkFDcEIsWUFBWSxFQUFFLFdBQVc7b0JBQ3pCLE9BQU8sRUFBRSxhQUFhO29CQUN0QixLQUFLLEVBQUUsYUFBYTtpQkFDckI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgU3lzQ2xhc3NGaWVsZCxcbiAgLy8gRGZoUHJvcGVydHlcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsSW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19jbGFzc19maWVsZFwiPzogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5XCI/OiBudW1iZXI7XG4gIFwicHJvcGVydHlfaXNfb3V0Z29pbmdcIj86IGJvb2xlYW47XG4gIFwib3JkX251bVwiPzogbnVtYmVyO1xuICBjbGFzc19maWVsZD86IFN5c0NsYXNzRmllbGQ7XG4gIC8vIHByb3BlcnR5PzogRGZoUHJvcGVydHk7XG59XG5cbmV4cG9ydCBjbGFzcyBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWwgaW1wbGVtZW50cyBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxJbnRlcmZhY2Uge1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfY2xhc3NfZmllbGRcIjogbnVtYmVyO1xuICBcImZrX3Byb3BlcnR5XCI6IG51bWJlcjtcbiAgXCJwcm9wZXJ0eV9pc19vdXRnb2luZ1wiOiBib29sZWFuO1xuICBcIm9yZF9udW1cIjogbnVtYmVyO1xuICBjbGFzc19maWVsZD86IFN5c0NsYXNzRmllbGQ7XG4gIC8vIHByb3BlcnR5PzogRGZoUHJvcGVydHk7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWwgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsSW50ZXJmYWNlKTogU3lzQ2xhc3NGaWVsZFByb3BlcnR5UmVsIHtcbiAgICByZXR1cm4gbmV3IFN5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1N5c0NsYXNzRmllbGRQcm9wZXJ0eVJlbCcsXG4gICAgICBwbHVyYWw6ICdTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxzJyxcbiAgICAgIHBhdGg6ICdTeXNDbGFzc0ZpZWxkUHJvcGVydHlSZWxzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2NsYXNzX2ZpZWxkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3NfZmllbGQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfcHJvcGVydHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwcm9wZXJ0eV9pc19vdXRnb2luZ1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3Byb3BlcnR5X2lzX291dGdvaW5nJyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcmRfbnVtXCI6IHtcbiAgICAgICAgICBuYW1lOiAnb3JkX251bScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgY2xhc3NfZmllbGQ6IHtcbiAgICAgICAgICBuYW1lOiAnY2xhc3NfZmllbGQnLFxuICAgICAgICAgIHR5cGU6ICdTeXNDbGFzc0ZpZWxkJyxcbiAgICAgICAgICBtb2RlbDogJ1N5c0NsYXNzRmllbGQnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX2NsYXNzX2ZpZWxkJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydHk6IHtcbiAgICAgICAgICBuYW1lOiAncHJvcGVydHknLFxuICAgICAgICAgIHR5cGU6ICdEZmhQcm9wZXJ0eScsXG4gICAgICAgICAgbW9kZWw6ICdEZmhQcm9wZXJ0eScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICBrZXlGcm9tOiAnZmtfcHJvcGVydHknLFxuICAgICAgICAgIGtleVRvOiAncGtfcHJvcGVydHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=