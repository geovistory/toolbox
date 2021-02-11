export class DatTextProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatTextProperty`.
     */
    static getModelName() {
        return "DatTextProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatTextProperty for dynamic purposes.
    **/
    static factory(data) {
        return new DatTextProperty(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0VGV4dFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvRGF0VGV4dFByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlCQSxNQUFNLE9BQU8sZUFBZTtJQVMxQixZQUFZLElBQStCO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBOEI7UUFDbEQsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsY0FBYztvQkFDcEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsY0FBYztvQkFDL0IsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIERhdE5hbWVzcGFjZVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBEYXRUZXh0UHJvcGVydHlJbnRlcmZhY2Uge1xuICBcInN0cmluZ1wiPzogc3RyaW5nO1xuICBcInF1aWxsX2RvY1wiPzogYW55O1xuICBcImZrX3N5c3RlbV90eXBlXCI/OiBudW1iZXI7XG4gIFwiZmtfbGFuZ3VhZ2VcIj86IG51bWJlcjtcbiAgXCJma19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19uYW1lc3BhY2VcIj86IG51bWJlcjtcbiAgbmFtZXNwYWNlPzogRGF0TmFtZXNwYWNlO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0VGV4dFByb3BlcnR5IGltcGxlbWVudHMgRGF0VGV4dFByb3BlcnR5SW50ZXJmYWNlIHtcbiAgXCJzdHJpbmdcIjogc3RyaW5nO1xuICBcInF1aWxsX2RvY1wiOiBhbnk7XG4gIFwiZmtfc3lzdGVtX3R5cGVcIjogbnVtYmVyO1xuICBcImZrX2xhbmd1YWdlXCI6IG51bWJlcjtcbiAgXCJma19lbnRpdHlcIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfbmFtZXNwYWNlXCI6IG51bWJlcjtcbiAgbmFtZXNwYWNlPzogRGF0TmFtZXNwYWNlO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogRGF0VGV4dFByb3BlcnR5SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBEYXRUZXh0UHJvcGVydHlgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiRGF0VGV4dFByb3BlcnR5XCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgRGF0VGV4dFByb3BlcnR5IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IERhdFRleHRQcm9wZXJ0eUludGVyZmFjZSk6IERhdFRleHRQcm9wZXJ0eXtcbiAgICByZXR1cm4gbmV3IERhdFRleHRQcm9wZXJ0eShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0RhdFRleHRQcm9wZXJ0eScsXG4gICAgICBwbHVyYWw6ICdEYXRUZXh0UHJvcGVydGllcycsXG4gICAgICBwYXRoOiAnRGF0VGV4dFByb3BlcnRpZXMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJzdHJpbmdcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicXVpbGxfZG9jXCI6IHtcbiAgICAgICAgICBuYW1lOiAncXVpbGxfZG9jJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3N5c3RlbV90eXBlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfc3lzdGVtX3R5cGUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfbGFuZ3VhZ2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19sYW5ndWFnZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX25hbWVzcGFjZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX25hbWVzcGFjZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgbmFtZXNwYWNlOiB7XG4gICAgICAgICAgbmFtZTogJ25hbWVzcGFjZScsXG4gICAgICAgICAgdHlwZTogJ0RhdE5hbWVzcGFjZScsXG4gICAgICAgICAgbW9kZWw6ICdEYXROYW1lc3BhY2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfbmFtZXNwYWNlJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==