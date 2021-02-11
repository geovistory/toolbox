var DatColumn = /** @class */ (function () {
    function DatColumn(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatColumn`.
     */
    DatColumn.getModelName = function () {
        return "DatColumn";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatColumn for dynamic purposes.
    **/
    DatColumn.factory = function (data) {
        return new DatColumn(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    DatColumn.getModelDefinition = function () {
        return {
            name: 'DatColumn',
            plural: 'DatColumns',
            path: 'DatColumns',
            idName: 'pk_entity',
            properties: {
                "fk_digital": {
                    name: 'fk_digital',
                    type: 'number'
                },
                "fk_data_type": {
                    name: 'fk_data_type',
                    type: 'number'
                },
                "fk_column_content_type": {
                    name: 'fk_column_content_type',
                    type: 'number'
                },
                "fk_column_relationship_type": {
                    name: 'fk_column_relationship_type',
                    type: 'number'
                },
                "fk_original_column": {
                    name: 'fk_original_column',
                    type: 'number'
                },
                "is_imported": {
                    name: 'is_imported',
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
    return DatColumn;
}());
export { DatColumn };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0Q29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvRGF0Q29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQTtJQVVFLG1CQUFZLElBQXlCO1FBQ25DLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyxzQkFBWSxHQUExQjtRQUNFLE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLGlCQUFPLEdBQXJCLFVBQXNCLElBQXdCO1FBQzVDLE9BQU8sSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLDRCQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsV0FBVztZQUNqQixNQUFNLEVBQUUsWUFBWTtZQUNwQixJQUFJLEVBQUUsWUFBWTtZQUNsQixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHdCQUF3QixFQUFFO29CQUN4QixJQUFJLEVBQUUsd0JBQXdCO29CQUM5QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCw2QkFBNkIsRUFBRTtvQkFDN0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsb0JBQW9CLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxvQkFBb0I7b0JBQzFCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsY0FBYztvQkFDcEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsY0FBYztvQkFDL0IsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQXhGRCxJQXdGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBEYXROYW1lc3BhY2Vcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgRGF0Q29sdW1uSW50ZXJmYWNlIHtcbiAgXCJma19kaWdpdGFsXCI/OiBudW1iZXI7XG4gIFwiZmtfZGF0YV90eXBlXCI/OiBudW1iZXI7XG4gIFwiZmtfY29sdW1uX2NvbnRlbnRfdHlwZVwiPzogbnVtYmVyO1xuICBcImZrX2NvbHVtbl9yZWxhdGlvbnNoaXBfdHlwZVwiPzogbnVtYmVyO1xuICBcImZrX29yaWdpbmFsX2NvbHVtblwiPzogbnVtYmVyO1xuICBcImlzX2ltcG9ydGVkXCI/OiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZmtfbmFtZXNwYWNlXCI/OiBudW1iZXI7XG4gIG5hbWVzcGFjZT86IERhdE5hbWVzcGFjZTtcbn1cblxuZXhwb3J0IGNsYXNzIERhdENvbHVtbiBpbXBsZW1lbnRzIERhdENvbHVtbkludGVyZmFjZSB7XG4gIFwiZmtfZGlnaXRhbFwiOiBudW1iZXI7XG4gIFwiZmtfZGF0YV90eXBlXCI6IG51bWJlcjtcbiAgXCJma19jb2x1bW5fY29udGVudF90eXBlXCI6IG51bWJlcjtcbiAgXCJma19jb2x1bW5fcmVsYXRpb25zaGlwX3R5cGVcIjogbnVtYmVyO1xuICBcImZrX29yaWdpbmFsX2NvbHVtblwiOiBudW1iZXI7XG4gIFwiaXNfaW1wb3J0ZWRcIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfbmFtZXNwYWNlXCI6IG51bWJlcjtcbiAgbmFtZXNwYWNlPzogRGF0TmFtZXNwYWNlO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogRGF0Q29sdW1uSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBEYXRDb2x1bW5gLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRGF0Q29sdW1uXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGF0Q29sdW1uIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IERhdENvbHVtbkludGVyZmFjZSk6IERhdENvbHVtbntcbiAgICByZXR1cm4gbmV3IERhdENvbHVtbihkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0RhdENvbHVtbicsXG4gICAgICBwbHVyYWw6ICdEYXRDb2x1bW5zJyxcbiAgICAgIHBhdGg6ICdEYXRDb2x1bW5zJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiZmtfZGlnaXRhbFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2RpZ2l0YWwnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZGF0YV90eXBlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZGF0YV90eXBlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2NvbHVtbl9jb250ZW50X3R5cGVcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jb2x1bW5fY29udGVudF90eXBlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2NvbHVtbl9yZWxhdGlvbnNoaXBfdHlwZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NvbHVtbl9yZWxhdGlvbnNoaXBfdHlwZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19vcmlnaW5hbF9jb2x1bW5cIjoge1xuICAgICAgICAgIG5hbWU6ICdma19vcmlnaW5hbF9jb2x1bW4nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiaXNfaW1wb3J0ZWRcIjoge1xuICAgICAgICAgIG5hbWU6ICdpc19pbXBvcnRlZCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfbmFtZXNwYWNlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfbmFtZXNwYWNlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBuYW1lc3BhY2U6IHtcbiAgICAgICAgICBuYW1lOiAnbmFtZXNwYWNlJyxcbiAgICAgICAgICB0eXBlOiAnRGF0TmFtZXNwYWNlJyxcbiAgICAgICAgICBtb2RlbDogJ0RhdE5hbWVzcGFjZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19uYW1lc3BhY2UnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19