var DatTextProperty = /** @class */ (function () {
    function DatTextProperty(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatTextProperty`.
     */
    DatTextProperty.getModelName = function () {
        return "DatTextProperty";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatTextProperty for dynamic purposes.
    **/
    DatTextProperty.factory = function (data) {
        return new DatTextProperty(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    DatTextProperty.getModelDefinition = function () {
        return {
            name: 'DatTextProperty',
            plural: 'DatTextProperties',
            path: 'DatTextProperties',
            idName: 'pk_entity',
            properties: {
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "fk_system_type": {
                    name: 'fk_system_type',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
                "fk_entity": {
                    name: 'fk_entity',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_namespace": {
                    name: 'fk_namespace',
                    type: 'number'
                },
            },
            relations: {
                namespace: {
                    name: 'namespace',
                    type: 'DatNamespace',
                    model: 'DatNamespace',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_namespace',
                    keyTo: 'pk_entity'
                },
            }
        };
    };
    return DatTextProperty;
}());
export { DatTextProperty };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0VGV4dFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvRGF0VGV4dFByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlCQTtJQVNFLHlCQUFZLElBQStCO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyw0QkFBWSxHQUExQjtRQUNFLE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csdUJBQU8sR0FBckIsVUFBc0IsSUFBOEI7UUFDbEQsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csa0NBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLEtBQUssRUFBRSxjQUFjO29CQUNyQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLGNBQWM7b0JBQy9CLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFuRkQsSUFtRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgRGF0TmFtZXNwYWNlXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIERhdFRleHRQcm9wZXJ0eUludGVyZmFjZSB7XG4gIFwic3RyaW5nXCI/OiBzdHJpbmc7XG4gIFwicXVpbGxfZG9jXCI/OiBhbnk7XG4gIFwiZmtfc3lzdGVtX3R5cGVcIj86IG51bWJlcjtcbiAgXCJma19sYW5ndWFnZVwiPzogbnVtYmVyO1xuICBcImZrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImZrX25hbWVzcGFjZVwiPzogbnVtYmVyO1xuICBuYW1lc3BhY2U/OiBEYXROYW1lc3BhY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRUZXh0UHJvcGVydHkgaW1wbGVtZW50cyBEYXRUZXh0UHJvcGVydHlJbnRlcmZhY2Uge1xuICBcInN0cmluZ1wiOiBzdHJpbmc7XG4gIFwicXVpbGxfZG9jXCI6IGFueTtcbiAgXCJma19zeXN0ZW1fdHlwZVwiOiBudW1iZXI7XG4gIFwiZmtfbGFuZ3VhZ2VcIjogbnVtYmVyO1xuICBcImZrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19uYW1lc3BhY2VcIjogbnVtYmVyO1xuICBuYW1lc3BhY2U/OiBEYXROYW1lc3BhY2U7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBEYXRUZXh0UHJvcGVydHlJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYERhdFRleHRQcm9wZXJ0eWAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJEYXRUZXh0UHJvcGVydHlcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEYXRUZXh0UHJvcGVydHkgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogRGF0VGV4dFByb3BlcnR5SW50ZXJmYWNlKTogRGF0VGV4dFByb3BlcnR5e1xuICAgIHJldHVybiBuZXcgRGF0VGV4dFByb3BlcnR5KGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnRGF0VGV4dFByb3BlcnR5JyxcbiAgICAgIHBsdXJhbDogJ0RhdFRleHRQcm9wZXJ0aWVzJyxcbiAgICAgIHBhdGg6ICdEYXRUZXh0UHJvcGVydGllcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcInN0cmluZ1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3N0cmluZycsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJxdWlsbF9kb2NcIjoge1xuICAgICAgICAgIG5hbWU6ICdxdWlsbF9kb2MnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfc3lzdGVtX3R5cGVcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19zeXN0ZW1fdHlwZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19sYW5ndWFnZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfbmFtZXNwYWNlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfbmFtZXNwYWNlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBuYW1lc3BhY2U6IHtcbiAgICAgICAgICBuYW1lOiAnbmFtZXNwYWNlJyxcbiAgICAgICAgICB0eXBlOiAnRGF0TmFtZXNwYWNlJyxcbiAgICAgICAgICBtb2RlbDogJ0RhdE5hbWVzcGFjZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19uYW1lc3BhY2UnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19