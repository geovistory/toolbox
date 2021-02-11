export class DatChunk {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatChunk`.
     */
    static getModelName() {
        return "DatChunk";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatChunk for dynamic purposes.
    **/
    static factory(data) {
        return new DatChunk(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0Q2h1bmsuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9EYXRDaHVuay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQkEsTUFBTSxPQUFPLFFBQVE7SUFVbkIsWUFBWSxJQUF3QjtRQUNsQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUF1QjtRQUMzQyxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsV0FBVztZQUNuQixJQUFJLEVBQUUsV0FBVztZQUNqQixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLEtBQUssRUFBRSxZQUFZO29CQUNuQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLFNBQVM7b0JBQzFCLEtBQUssRUFBRSxTQUFTO2lCQUNqQjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsaUJBQWlCO2lCQUN6QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxjQUFjO29CQUNwQixLQUFLLEVBQUUsY0FBYztvQkFDckIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxjQUFjO29CQUMvQixLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgRGF0RGlnaXRhbCxcbiAgSW5mU3RhdGVtZW50LFxuICBEYXROYW1lc3BhY2Vcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgRGF0Q2h1bmtJbnRlcmZhY2Uge1xuICBcInF1aWxsX2RvY1wiPzogYW55O1xuICBcInN0cmluZ1wiPzogc3RyaW5nO1xuICBcImZrX3RleHRcIjogbnVtYmVyO1xuICBcImZrX2VudGl0eV92ZXJzaW9uXCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19uYW1lc3BhY2VcIj86IG51bWJlcjtcbiAgZGlnaXRhbD86IERhdERpZ2l0YWw7XG4gIG91dGdvaW5nX3N0YXRlbWVudHM/OiBJbmZTdGF0ZW1lbnRbXTtcbiAgbmFtZXNwYWNlPzogRGF0TmFtZXNwYWNlO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0Q2h1bmsgaW1wbGVtZW50cyBEYXRDaHVua0ludGVyZmFjZSB7XG4gIFwicXVpbGxfZG9jXCI6IGFueTtcbiAgXCJzdHJpbmdcIjogc3RyaW5nO1xuICBcImZrX3RleHRcIjogbnVtYmVyO1xuICBcImZrX2VudGl0eV92ZXJzaW9uXCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBcImZrX25hbWVzcGFjZVwiOiBudW1iZXI7XG4gIGRpZ2l0YWw/OiBEYXREaWdpdGFsO1xuICBvdXRnb2luZ19zdGF0ZW1lbnRzPzogSW5mU3RhdGVtZW50W107XG4gIG5hbWVzcGFjZT86IERhdE5hbWVzcGFjZTtcbiAgY29uc3RydWN0b3IoZGF0YT86IERhdENodW5rSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBEYXRDaHVua2AuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJEYXRDaHVua1wiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIERhdENodW5rIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IERhdENodW5rSW50ZXJmYWNlKTogRGF0Q2h1bmt7XG4gICAgcmV0dXJuIG5ldyBEYXRDaHVuayhkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0RhdENodW5rJyxcbiAgICAgIHBsdXJhbDogJ0RhdENodW5rcycsXG4gICAgICBwYXRoOiAnRGF0Q2h1bmtzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicXVpbGxfZG9jXCI6IHtcbiAgICAgICAgICBuYW1lOiAncXVpbGxfZG9jJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcInN0cmluZ1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3N0cmluZycsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJma190ZXh0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfdGV4dCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19lbnRpdHlfdmVyc2lvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2VudGl0eV92ZXJzaW9uJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19uYW1lc3BhY2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19uYW1lc3BhY2UnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGRpZ2l0YWw6IHtcbiAgICAgICAgICBuYW1lOiAnZGlnaXRhbCcsXG4gICAgICAgICAgdHlwZTogJ0RhdERpZ2l0YWwnLFxuICAgICAgICAgIG1vZGVsOiAnRGF0RGlnaXRhbCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma190ZXh0JyxcbiAgICAgICAgICBrZXlUbzogJ3BrX3RleHQnXG4gICAgICAgIH0sXG4gICAgICAgIG91dGdvaW5nX3N0YXRlbWVudHM6IHtcbiAgICAgICAgICBuYW1lOiAnb3V0Z29pbmdfc3RhdGVtZW50cycsXG4gICAgICAgICAgdHlwZTogJ0luZlN0YXRlbWVudFtdJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlN0YXRlbWVudCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX3N1YmplY3RfZGF0YSdcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZXNwYWNlOiB7XG4gICAgICAgICAgbmFtZTogJ25hbWVzcGFjZScsXG4gICAgICAgICAgdHlwZTogJ0RhdE5hbWVzcGFjZScsXG4gICAgICAgICAgbW9kZWw6ICdEYXROYW1lc3BhY2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfbmFtZXNwYWNlJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==