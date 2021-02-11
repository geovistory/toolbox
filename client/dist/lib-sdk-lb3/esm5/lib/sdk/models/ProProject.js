var ProProject = /** @class */ (function () {
    function ProProject(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProProject`.
     */
    ProProject.getModelName = function () {
        return "ProProject";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProProject for dynamic purposes.
    **/
    ProProject.factory = function (data) {
        return new ProProject(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ProProject.getModelDefinition = function () {
        return {
            name: 'ProProject',
            plural: 'ProProjects',
            path: 'ProProjects',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
            },
            relations: {
                accounts: {
                    name: 'accounts',
                    type: 'PubAccount[]',
                    model: 'PubAccount',
                    relationType: 'hasMany',
                    modelThrough: 'PubAccountProjectRel',
                    keyThrough: 'account_id',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                text_properties: {
                    name: 'text_properties',
                    type: 'ProTextProperty[]',
                    model: 'ProTextProperty',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                default_language: {
                    name: 'default_language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
                persistent_items: {
                    name: 'persistent_items',
                    type: 'InfPersistentItem[]',
                    model: 'InfPersistentItem',
                    relationType: 'hasMany',
                    modelThrough: 'ProInfoProjRel',
                    keyThrough: 'fk_entity',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                namespaces: {
                    name: 'namespaces',
                    type: 'DatNamespace[]',
                    model: 'DatNamespace',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
            }
        };
    };
    return ProProject;
}());
export { ProProject };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvUHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL1Byb1Byb2plY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JBO0lBU0Usb0JBQVksSUFBMEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHVCQUFZLEdBQTFCO1FBQ0UsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csa0JBQU8sR0FBckIsVUFBc0IsSUFBeUI7UUFDN0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csNkJBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxjQUFjO29CQUNwQixLQUFLLEVBQUUsWUFBWTtvQkFDbkIsWUFBWSxFQUFFLFNBQVM7b0JBQ3ZCLFlBQVksRUFBRSxzQkFBc0I7b0JBQ3BDLFVBQVUsRUFBRSxZQUFZO29CQUN4QixPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixLQUFLLEVBQUUsaUJBQWlCO29CQUN4QixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2dCQUNELDJCQUEyQixFQUFFO29CQUMzQixJQUFJLEVBQUUsNkJBQTZCO29CQUNuQyxJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsYUFBYTtvQkFDOUIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixZQUFZLEVBQUUsU0FBUztvQkFDdkIsWUFBWSxFQUFFLGdCQUFnQjtvQkFDOUIsVUFBVSxFQUFFLFdBQVc7b0JBQ3ZCLE9BQU8sRUFBRSxXQUFXO29CQUNwQixLQUFLLEVBQUUsWUFBWTtpQkFDcEI7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixLQUFLLEVBQUUsY0FBYztvQkFDckIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxZQUFZO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUEzR0QsSUEyR0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZSAqL1xuaW1wb3J0IHtcbiAgUHViQWNjb3VudCxcbiAgUHJvVGV4dFByb3BlcnR5LFxuICBQcm9JbmZvUHJvalJlbCxcbiAgSW5mTGFuZ3VhZ2UsXG4gIEluZlBlcnNpc3RlbnRJdGVtLFxuICBEYXROYW1lc3BhY2Vcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgUHJvUHJvamVjdEludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZmtfbGFuZ3VhZ2VcIj86IG51bWJlcjtcbiAgYWNjb3VudHM/OiBQdWJBY2NvdW50W107XG4gIHRleHRfcHJvcGVydGllcz86IFByb1RleHRQcm9wZXJ0eVtdO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBkZWZhdWx0X2xhbmd1YWdlPzogSW5mTGFuZ3VhZ2U7XG4gIHBlcnNpc3RlbnRfaXRlbXM/OiBJbmZQZXJzaXN0ZW50SXRlbVtdO1xuICBuYW1lc3BhY2VzPzogRGF0TmFtZXNwYWNlW107XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9Qcm9qZWN0IGltcGxlbWVudHMgUHJvUHJvamVjdEludGVyZmFjZSB7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19sYW5ndWFnZVwiOiBudW1iZXI7XG4gIGFjY291bnRzPzogUHViQWNjb3VudFtdO1xuICB0ZXh0X3Byb3BlcnRpZXM/OiBQcm9UZXh0UHJvcGVydHlbXTtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgZGVmYXVsdF9sYW5ndWFnZT86IEluZkxhbmd1YWdlO1xuICBwZXJzaXN0ZW50X2l0ZW1zPzogSW5mUGVyc2lzdGVudEl0ZW1bXTtcbiAgbmFtZXNwYWNlcz86IERhdE5hbWVzcGFjZVtdO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogUHJvUHJvamVjdEludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgUHJvUHJvamVjdGAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJQcm9Qcm9qZWN0XCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUHJvUHJvamVjdCBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBQcm9Qcm9qZWN0SW50ZXJmYWNlKTogUHJvUHJvamVjdHtcbiAgICByZXR1cm4gbmV3IFByb1Byb2plY3QoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdQcm9Qcm9qZWN0JyxcbiAgICAgIHBsdXJhbDogJ1Byb1Byb2plY3RzJyxcbiAgICAgIHBhdGg6ICdQcm9Qcm9qZWN0cycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19sYW5ndWFnZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBhY2NvdW50czoge1xuICAgICAgICAgIG5hbWU6ICdhY2NvdW50cycsXG4gICAgICAgICAgdHlwZTogJ1B1YkFjY291bnRbXScsXG4gICAgICAgICAgbW9kZWw6ICdQdWJBY2NvdW50JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBtb2RlbFRocm91Z2g6ICdQdWJBY2NvdW50UHJvamVjdFJlbCcsXG4gICAgICAgICAga2V5VGhyb3VnaDogJ2FjY291bnRfaWQnLFxuICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfcHJvamVjdCdcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dF9wcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgbmFtZTogJ3RleHRfcHJvcGVydGllcycsXG4gICAgICAgICAgdHlwZTogJ1Byb1RleHRQcm9wZXJ0eVtdJyxcbiAgICAgICAgICBtb2RlbDogJ1Byb1RleHRQcm9wZXJ0eScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX3Byb2plY3QnXG4gICAgICAgIH0sXG4gICAgICAgIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVsczoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMnLFxuICAgICAgICAgIHR5cGU6ICdQcm9JbmZvUHJvalJlbFtdJyxcbiAgICAgICAgICBtb2RlbDogJ1Byb0luZm9Qcm9qUmVsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfcHJvamVjdCdcbiAgICAgICAgfSxcbiAgICAgICAgZGVmYXVsdF9sYW5ndWFnZToge1xuICAgICAgICAgIG5hbWU6ICdkZWZhdWx0X2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIG1vZGVsOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfbGFuZ3VhZ2UnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgICBwZXJzaXN0ZW50X2l0ZW1zOiB7XG4gICAgICAgICAgbmFtZTogJ3BlcnNpc3RlbnRfaXRlbXMnLFxuICAgICAgICAgIHR5cGU6ICdJbmZQZXJzaXN0ZW50SXRlbVtdJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBtb2RlbFRocm91Z2g6ICdQcm9JbmZvUHJvalJlbCcsXG4gICAgICAgICAga2V5VGhyb3VnaDogJ2ZrX2VudGl0eScsXG4gICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19wcm9qZWN0J1xuICAgICAgICB9LFxuICAgICAgICBuYW1lc3BhY2VzOiB7XG4gICAgICAgICAgbmFtZTogJ25hbWVzcGFjZXMnLFxuICAgICAgICAgIHR5cGU6ICdEYXROYW1lc3BhY2VbXScsXG4gICAgICAgICAgbW9kZWw6ICdEYXROYW1lc3BhY2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19wcm9qZWN0J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19