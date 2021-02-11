export class InfTextProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTextProperty`.
     */
    static getModelName() {
        return "InfTextProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTextProperty for dynamic purposes.
    **/
    static factory(data) {
        return new InfTextProperty(data);
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
            name: 'InfTextProperty',
            plural: 'InfTextProperties',
            path: 'InfTextProperties',
            idName: 'pk_entity',
            properties: {
                "fk_class_field": {
                    name: 'fk_class_field',
                    type: 'number'
                },
                "fk_concerned_entity": {
                    name: 'fk_concerned_entity',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_entity'
                },
                persistent_item: {
                    name: 'persistent_item',
                    type: 'InfPersistentItem',
                    model: 'InfPersistentItem',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_concerned_entity',
                    keyTo: 'pk_entity'
                },
                temporal_entity: {
                    name: 'temporal_entity',
                    type: 'InfTemporalEntity',
                    model: 'InfTemporalEntity',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_concerned_entity',
                    keyTo: 'pk_entity'
                },
                language: {
                    name: 'language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
                class_field: {
                    name: 'class_field',
                    type: 'SysClassField',
                    model: 'SysClassField',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_class_field',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mVGV4dFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvSW5mVGV4dFByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQSxNQUFNLE9BQU8sZUFBZTtJQVkxQixZQUFZLElBQStCO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLGlCQUFpQixDQUFDO0lBQzNCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBOEI7UUFDbEQsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ0ksTUFBTSxDQUFDLGtCQUFrQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixNQUFNLEVBQUUsbUJBQW1CO1lBQzNCLElBQUksRUFBRSxtQkFBbUI7WUFDekIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxxQkFBcUIsRUFBRTtvQkFDckIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxLQUFLO2lCQUNaO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsMkJBQTJCLEVBQUU7b0JBQzNCLElBQUksRUFBRSw2QkFBNkI7b0JBQ25DLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLEtBQUssRUFBRSxtQkFBbUI7b0JBQzFCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUscUJBQXFCO29CQUN0QyxLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxpQkFBaUI7b0JBQ3ZCLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLEtBQUssRUFBRSxtQkFBbUI7b0JBQzFCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUscUJBQXFCO29CQUN0QyxLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsYUFBYTtvQkFDOUIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLEtBQUssRUFBRSxlQUFlO29CQUN0QixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLGdCQUFnQjtvQkFDakMsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb0luZm9Qcm9qUmVsLFxuICBJbmZQZXJzaXN0ZW50SXRlbSxcbiAgSW5mVGVtcG9yYWxFbnRpdHksXG4gIEluZkxhbmd1YWdlLFxuICBTeXNDbGFzc0ZpZWxkXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEluZlRleHRQcm9wZXJ0eUludGVyZmFjZSB7XG4gIFwiZmtfY2xhc3NfZmllbGRcIjogbnVtYmVyO1xuICBcImZrX2NvbmNlcm5lZF9lbnRpdHlcIjogbnVtYmVyO1xuICBcImZrX2xhbmd1YWdlXCI6IG51bWJlcjtcbiAgXCJxdWlsbF9kb2NcIjogYW55O1xuICBcInN0cmluZ1wiPzogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBwZXJzaXN0ZW50X2l0ZW0/OiBJbmZQZXJzaXN0ZW50SXRlbTtcbiAgdGVtcG9yYWxfZW50aXR5PzogSW5mVGVtcG9yYWxFbnRpdHk7XG4gIGxhbmd1YWdlPzogSW5mTGFuZ3VhZ2U7XG4gIGNsYXNzX2ZpZWxkPzogU3lzQ2xhc3NGaWVsZDtcbn1cblxuZXhwb3J0IGNsYXNzIEluZlRleHRQcm9wZXJ0eSBpbXBsZW1lbnRzIEluZlRleHRQcm9wZXJ0eUludGVyZmFjZSB7XG4gIFwiZmtfY2xhc3NfZmllbGRcIjogbnVtYmVyO1xuICBcImZrX2NvbmNlcm5lZF9lbnRpdHlcIjogbnVtYmVyO1xuICBcImZrX2xhbmd1YWdlXCI6IG51bWJlcjtcbiAgXCJxdWlsbF9kb2NcIjogYW55O1xuICBcInN0cmluZ1wiOiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgcGVyc2lzdGVudF9pdGVtPzogSW5mUGVyc2lzdGVudEl0ZW07XG4gIHRlbXBvcmFsX2VudGl0eT86IEluZlRlbXBvcmFsRW50aXR5O1xuICBsYW5ndWFnZT86IEluZkxhbmd1YWdlO1xuICBjbGFzc19maWVsZD86IFN5c0NsYXNzRmllbGQ7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJbmZUZXh0UHJvcGVydHlJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZlRleHRQcm9wZXJ0eWAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJJbmZUZXh0UHJvcGVydHlcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbmZUZXh0UHJvcGVydHkgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogSW5mVGV4dFByb3BlcnR5SW50ZXJmYWNlKTogSW5mVGV4dFByb3BlcnR5e1xuICAgIHJldHVybiBuZXcgSW5mVGV4dFByb3BlcnR5KGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnSW5mVGV4dFByb3BlcnR5JyxcbiAgICAgIHBsdXJhbDogJ0luZlRleHRQcm9wZXJ0aWVzJyxcbiAgICAgIHBhdGg6ICdJbmZUZXh0UHJvcGVydGllcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImZrX2NsYXNzX2ZpZWxkXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3NfZmllbGQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfY29uY2VybmVkX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NvbmNlcm5lZF9lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfbGFuZ3VhZ2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19sYW5ndWFnZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJxdWlsbF9kb2NcIjoge1xuICAgICAgICAgIG5hbWU6ICdxdWlsbF9kb2MnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwic3RyaW5nXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3RyaW5nJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzOiB7XG4gICAgICAgICAgbmFtZTogJ2VudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscycsXG4gICAgICAgICAgdHlwZTogJ1Byb0luZm9Qcm9qUmVsW10nLFxuICAgICAgICAgIG1vZGVsOiAnUHJvSW5mb1Byb2pSZWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIHBlcnNpc3RlbnRfaXRlbToge1xuICAgICAgICAgIG5hbWU6ICdwZXJzaXN0ZW50X2l0ZW0nLFxuICAgICAgICAgIHR5cGU6ICdJbmZQZXJzaXN0ZW50SXRlbScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZQZXJzaXN0ZW50SXRlbScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19jb25jZXJuZWRfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgdGVtcG9yYWxfZW50aXR5OiB7XG4gICAgICAgICAgbmFtZTogJ3RlbXBvcmFsX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ0luZlRlbXBvcmFsRW50aXR5JyxcbiAgICAgICAgICBtb2RlbDogJ0luZlRlbXBvcmFsRW50aXR5JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX2NvbmNlcm5lZF9lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBsYW5ndWFnZToge1xuICAgICAgICAgIG5hbWU6ICdsYW5ndWFnZScsXG4gICAgICAgICAgdHlwZTogJ0luZkxhbmd1YWdlJyxcbiAgICAgICAgICBtb2RlbDogJ0luZkxhbmd1YWdlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX2xhbmd1YWdlJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgY2xhc3NfZmllbGQ6IHtcbiAgICAgICAgICBuYW1lOiAnY2xhc3NfZmllbGQnLFxuICAgICAgICAgIHR5cGU6ICdTeXNDbGFzc0ZpZWxkJyxcbiAgICAgICAgICBtb2RlbDogJ1N5c0NsYXNzRmllbGQnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfY2xhc3NfZmllbGQnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19