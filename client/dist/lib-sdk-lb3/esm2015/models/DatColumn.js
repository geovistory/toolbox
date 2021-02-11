export class DatColumn {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatColumn`.
     */
    static getModelName() {
        return "DatColumn";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatColumn for dynamic purposes.
    **/
    static factory(data) {
        return new DatColumn(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0Q29sdW1uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibW9kZWxzL0RhdENvbHVtbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrQkEsTUFBTSxPQUFPLFNBQVM7SUFVcEIsWUFBWSxJQUF5QjtRQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUF3QjtRQUM1QyxPQUFPLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsV0FBVztZQUNqQixNQUFNLEVBQUUsWUFBWTtZQUNwQixJQUFJLEVBQUUsWUFBWTtZQUNsQixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHdCQUF3QixFQUFFO29CQUN4QixJQUFJLEVBQUUsd0JBQXdCO29CQUM5QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCw2QkFBNkIsRUFBRTtvQkFDN0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsb0JBQW9CLEVBQUU7b0JBQ3BCLElBQUksRUFBRSxvQkFBb0I7b0JBQzFCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsY0FBYztvQkFDcEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsY0FBYztvQkFDL0IsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIERhdE5hbWVzcGFjZVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBEYXRDb2x1bW5JbnRlcmZhY2Uge1xuICBcImZrX2RpZ2l0YWxcIj86IG51bWJlcjtcbiAgXCJma19kYXRhX3R5cGVcIj86IG51bWJlcjtcbiAgXCJma19jb2x1bW5fY29udGVudF90eXBlXCI/OiBudW1iZXI7XG4gIFwiZmtfY29sdW1uX3JlbGF0aW9uc2hpcF90eXBlXCI/OiBudW1iZXI7XG4gIFwiZmtfb3JpZ2luYWxfY29sdW1uXCI/OiBudW1iZXI7XG4gIFwiaXNfaW1wb3J0ZWRcIj86IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19uYW1lc3BhY2VcIj86IG51bWJlcjtcbiAgbmFtZXNwYWNlPzogRGF0TmFtZXNwYWNlO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0Q29sdW1uIGltcGxlbWVudHMgRGF0Q29sdW1uSW50ZXJmYWNlIHtcbiAgXCJma19kaWdpdGFsXCI6IG51bWJlcjtcbiAgXCJma19kYXRhX3R5cGVcIjogbnVtYmVyO1xuICBcImZrX2NvbHVtbl9jb250ZW50X3R5cGVcIjogbnVtYmVyO1xuICBcImZrX2NvbHVtbl9yZWxhdGlvbnNoaXBfdHlwZVwiOiBudW1iZXI7XG4gIFwiZmtfb3JpZ2luYWxfY29sdW1uXCI6IG51bWJlcjtcbiAgXCJpc19pbXBvcnRlZFwiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19uYW1lc3BhY2VcIjogbnVtYmVyO1xuICBuYW1lc3BhY2U/OiBEYXROYW1lc3BhY2U7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBEYXRDb2x1bW5JbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYERhdENvbHVtbmAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJEYXRDb2x1bW5cIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEYXRDb2x1bW4gZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogRGF0Q29sdW1uSW50ZXJmYWNlKTogRGF0Q29sdW1ue1xuICAgIHJldHVybiBuZXcgRGF0Q29sdW1uKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnRGF0Q29sdW1uJyxcbiAgICAgIHBsdXJhbDogJ0RhdENvbHVtbnMnLFxuICAgICAgcGF0aDogJ0RhdENvbHVtbnMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJma19kaWdpdGFsXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZGlnaXRhbCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19kYXRhX3R5cGVcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19kYXRhX3R5cGUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfY29sdW1uX2NvbnRlbnRfdHlwZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NvbHVtbl9jb250ZW50X3R5cGUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfY29sdW1uX3JlbGF0aW9uc2hpcF90eXBlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY29sdW1uX3JlbGF0aW9uc2hpcF90eXBlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX29yaWdpbmFsX2NvbHVtblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX29yaWdpbmFsX2NvbHVtbicsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJpc19pbXBvcnRlZFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lzX2ltcG9ydGVkJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19uYW1lc3BhY2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19uYW1lc3BhY2UnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIG5hbWVzcGFjZToge1xuICAgICAgICAgIG5hbWU6ICduYW1lc3BhY2UnLFxuICAgICAgICAgIHR5cGU6ICdEYXROYW1lc3BhY2UnLFxuICAgICAgICAgIG1vZGVsOiAnRGF0TmFtZXNwYWNlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX25hbWVzcGFjZScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=