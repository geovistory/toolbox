var DatChunk = /** @class */ (function () {
    function DatChunk(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatChunk`.
     */
    DatChunk.getModelName = function () {
        return "DatChunk";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatChunk for dynamic purposes.
    **/
    DatChunk.factory = function (data) {
        return new DatChunk(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    DatChunk.getModelDefinition = function () {
        return {
            name: 'DatChunk',
            plural: 'DatChunks',
            path: 'DatChunks',
            idName: 'pk_entity',
            properties: {
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "fk_text": {
                    name: 'fk_text',
                    type: 'number'
                },
                "fk_entity_version": {
                    name: 'fk_entity_version',
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
                digital: {
                    name: 'digital',
                    type: 'DatDigital',
                    model: 'DatDigital',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_text',
                    keyTo: 'pk_text'
                },
                outgoing_statements: {
                    name: 'outgoing_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_subject_data'
                },
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
    return DatChunk;
}());
export { DatChunk };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0Q2h1bmsuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvRGF0Q2h1bmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0JBO0lBVUUsa0JBQVksSUFBd0I7UUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHFCQUFZLEdBQTFCO1FBQ0UsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csZ0JBQU8sR0FBckIsVUFBc0IsSUFBdUI7UUFDM0MsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csMkJBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLElBQUksRUFBRSxXQUFXO1lBQ2pCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLElBQUksRUFBRSxjQUFjO29CQUNwQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsU0FBUztvQkFDMUIsS0FBSyxFQUFFLFNBQVM7aUJBQ2pCO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixLQUFLLEVBQUUsY0FBYztvQkFDckIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxpQkFBaUI7aUJBQ3pCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLEtBQUssRUFBRSxjQUFjO29CQUNyQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLGNBQWM7b0JBQy9CLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxlQUFDO0FBQUQsQ0FBQyxBQWhHRCxJQWdHQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBEYXREaWdpdGFsLFxuICBJbmZTdGF0ZW1lbnQsXG4gIERhdE5hbWVzcGFjZVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBEYXRDaHVua0ludGVyZmFjZSB7XG4gIFwicXVpbGxfZG9jXCI/OiBhbnk7XG4gIFwic3RyaW5nXCI/OiBzdHJpbmc7XG4gIFwiZmtfdGV4dFwiOiBudW1iZXI7XG4gIFwiZmtfZW50aXR5X3ZlcnNpb25cIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImZrX25hbWVzcGFjZVwiPzogbnVtYmVyO1xuICBkaWdpdGFsPzogRGF0RGlnaXRhbDtcbiAgb3V0Z29pbmdfc3RhdGVtZW50cz86IEluZlN0YXRlbWVudFtdO1xuICBuYW1lc3BhY2U/OiBEYXROYW1lc3BhY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBEYXRDaHVuayBpbXBsZW1lbnRzIERhdENodW5rSW50ZXJmYWNlIHtcbiAgXCJxdWlsbF9kb2NcIjogYW55O1xuICBcInN0cmluZ1wiOiBzdHJpbmc7XG4gIFwiZmtfdGV4dFwiOiBudW1iZXI7XG4gIFwiZmtfZW50aXR5X3ZlcnNpb25cIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfbmFtZXNwYWNlXCI6IG51bWJlcjtcbiAgZGlnaXRhbD86IERhdERpZ2l0YWw7XG4gIG91dGdvaW5nX3N0YXRlbWVudHM/OiBJbmZTdGF0ZW1lbnRbXTtcbiAgbmFtZXNwYWNlPzogRGF0TmFtZXNwYWNlO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogRGF0Q2h1bmtJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYERhdENodW5rYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkRhdENodW5rXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGF0Q2h1bmsgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogRGF0Q2h1bmtJbnRlcmZhY2UpOiBEYXRDaHVua3tcbiAgICByZXR1cm4gbmV3IERhdENodW5rKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnRGF0Q2h1bmsnLFxuICAgICAgcGx1cmFsOiAnRGF0Q2h1bmtzJyxcbiAgICAgIHBhdGg6ICdEYXRDaHVua3MnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJxdWlsbF9kb2NcIjoge1xuICAgICAgICAgIG5hbWU6ICdxdWlsbF9kb2MnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwic3RyaW5nXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3RyaW5nJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3RleHRcIjoge1xuICAgICAgICAgIG5hbWU6ICdma190ZXh0JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2VudGl0eV92ZXJzaW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZW50aXR5X3ZlcnNpb24nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX25hbWVzcGFjZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX25hbWVzcGFjZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgZGlnaXRhbDoge1xuICAgICAgICAgIG5hbWU6ICdkaWdpdGFsJyxcbiAgICAgICAgICB0eXBlOiAnRGF0RGlnaXRhbCcsXG4gICAgICAgICAgbW9kZWw6ICdEYXREaWdpdGFsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX3RleHQnLFxuICAgICAgICAgIGtleVRvOiAncGtfdGV4dCdcbiAgICAgICAgfSxcbiAgICAgICAgb3V0Z29pbmdfc3RhdGVtZW50czoge1xuICAgICAgICAgIG5hbWU6ICdvdXRnb2luZ19zdGF0ZW1lbnRzJyxcbiAgICAgICAgICB0eXBlOiAnSW5mU3RhdGVtZW50W10nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mU3RhdGVtZW50JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfc3ViamVjdF9kYXRhJ1xuICAgICAgICB9LFxuICAgICAgICBuYW1lc3BhY2U6IHtcbiAgICAgICAgICBuYW1lOiAnbmFtZXNwYWNlJyxcbiAgICAgICAgICB0eXBlOiAnRGF0TmFtZXNwYWNlJyxcbiAgICAgICAgICBtb2RlbDogJ0RhdE5hbWVzcGFjZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19uYW1lc3BhY2UnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19