var InfTextProperty = /** @class */ (function () {
    function InfTextProperty(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTextProperty`.
     */
    InfTextProperty.getModelName = function () {
        return "InfTextProperty";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTextProperty for dynamic purposes.
    **/
    InfTextProperty.factory = function (data) {
        return new InfTextProperty(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    InfTextProperty.getModelDefinition = function () {
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
    };
    return InfTextProperty;
}());
export { InfTextProperty };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mVGV4dFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvSW5mVGV4dFByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQTtJQVlFLHlCQUFZLElBQStCO1FBQ3pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyw0QkFBWSxHQUExQjtRQUNFLE9BQU8saUJBQWlCLENBQUM7SUFDM0IsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csdUJBQU8sR0FBckIsVUFBc0IsSUFBOEI7UUFDbEQsT0FBTyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csa0NBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QscUJBQXFCLEVBQUU7b0JBQ3JCLElBQUksRUFBRSxxQkFBcUI7b0JBQzNCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULDJCQUEyQixFQUFFO29CQUMzQixJQUFJLEVBQUUsNkJBQTZCO29CQUNuQyxJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLHFCQUFxQjtvQkFDdEMsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLHFCQUFxQjtvQkFDdEMsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLEtBQUssRUFBRSxhQUFhO29CQUNwQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLGFBQWE7b0JBQzlCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxlQUFlO29CQUNyQixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ2pDLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFsSEQsSUFrSEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgUHJvSW5mb1Byb2pSZWwsXG4gIEluZlBlcnNpc3RlbnRJdGVtLFxuICBJbmZUZW1wb3JhbEVudGl0eSxcbiAgSW5mTGFuZ3VhZ2UsXG4gIFN5c0NsYXNzRmllbGRcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgSW5mVGV4dFByb3BlcnR5SW50ZXJmYWNlIHtcbiAgXCJma19jbGFzc19maWVsZFwiOiBudW1iZXI7XG4gIFwiZmtfY29uY2VybmVkX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfbGFuZ3VhZ2VcIjogbnVtYmVyO1xuICBcInF1aWxsX2RvY1wiOiBhbnk7XG4gIFwic3RyaW5nXCI/OiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIHBlcnNpc3RlbnRfaXRlbT86IEluZlBlcnNpc3RlbnRJdGVtO1xuICB0ZW1wb3JhbF9lbnRpdHk/OiBJbmZUZW1wb3JhbEVudGl0eTtcbiAgbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZTtcbiAgY2xhc3NfZmllbGQ/OiBTeXNDbGFzc0ZpZWxkO1xufVxuXG5leHBvcnQgY2xhc3MgSW5mVGV4dFByb3BlcnR5IGltcGxlbWVudHMgSW5mVGV4dFByb3BlcnR5SW50ZXJmYWNlIHtcbiAgXCJma19jbGFzc19maWVsZFwiOiBudW1iZXI7XG4gIFwiZmtfY29uY2VybmVkX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfbGFuZ3VhZ2VcIjogbnVtYmVyO1xuICBcInF1aWxsX2RvY1wiOiBhbnk7XG4gIFwic3RyaW5nXCI6IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBwZXJzaXN0ZW50X2l0ZW0/OiBJbmZQZXJzaXN0ZW50SXRlbTtcbiAgdGVtcG9yYWxfZW50aXR5PzogSW5mVGVtcG9yYWxFbnRpdHk7XG4gIGxhbmd1YWdlPzogSW5mTGFuZ3VhZ2U7XG4gIGNsYXNzX2ZpZWxkPzogU3lzQ2xhc3NGaWVsZDtcbiAgY29uc3RydWN0b3IoZGF0YT86IEluZlRleHRQcm9wZXJ0eUludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgSW5mVGV4dFByb3BlcnR5YC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZlRleHRQcm9wZXJ0eVwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEluZlRleHRQcm9wZXJ0eSBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBJbmZUZXh0UHJvcGVydHlJbnRlcmZhY2UpOiBJbmZUZXh0UHJvcGVydHl7XG4gICAgcmV0dXJuIG5ldyBJbmZUZXh0UHJvcGVydHkoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdJbmZUZXh0UHJvcGVydHknLFxuICAgICAgcGx1cmFsOiAnSW5mVGV4dFByb3BlcnRpZXMnLFxuICAgICAgcGF0aDogJ0luZlRleHRQcm9wZXJ0aWVzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiZmtfY2xhc3NfZmllbGRcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jbGFzc19maWVsZCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19jb25jZXJuZWRfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY29uY2VybmVkX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19sYW5ndWFnZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInF1aWxsX2RvY1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3F1aWxsX2RvYycsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdHJpbmdcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM6IHtcbiAgICAgICAgICBuYW1lOiAnZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzJyxcbiAgICAgICAgICB0eXBlOiAnUHJvSW5mb1Byb2pSZWxbXScsXG4gICAgICAgICAgbW9kZWw6ICdQcm9JbmZvUHJvalJlbCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgcGVyc2lzdGVudF9pdGVtOiB7XG4gICAgICAgICAgbmFtZTogJ3BlcnNpc3RlbnRfaXRlbScsXG4gICAgICAgICAgdHlwZTogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX2NvbmNlcm5lZF9lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICB0ZW1wb3JhbF9lbnRpdHk6IHtcbiAgICAgICAgICBuYW1lOiAndGVtcG9yYWxfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnSW5mVGVtcG9yYWxFbnRpdHknLFxuICAgICAgICAgIG1vZGVsOiAnSW5mVGVtcG9yYWxFbnRpdHknLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfY29uY2VybmVkX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIG1vZGVsOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfbGFuZ3VhZ2UnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBjbGFzc19maWVsZDoge1xuICAgICAgICAgIG5hbWU6ICdjbGFzc19maWVsZCcsXG4gICAgICAgICAgdHlwZTogJ1N5c0NsYXNzRmllbGQnLFxuICAgICAgICAgIG1vZGVsOiAnU3lzQ2xhc3NGaWVsZCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19jbGFzc19maWVsZCcsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=