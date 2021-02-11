export class ProProject {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProProject`.
     */
    static getModelName() {
        return "ProProject";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProProject for dynamic purposes.
    **/
    static factory(data) {
        return new ProProject(data);
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
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvUHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9Qcm9Qcm9qZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCQSxNQUFNLE9BQU8sVUFBVTtJQVNyQixZQUFZLElBQTBCO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLFlBQVksQ0FBQztJQUN0QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQXlCO1FBQzdDLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxjQUFjO29CQUNwQixLQUFLLEVBQUUsWUFBWTtvQkFDbkIsWUFBWSxFQUFFLFNBQVM7b0JBQ3ZCLFlBQVksRUFBRSxzQkFBc0I7b0JBQ3BDLFVBQVUsRUFBRSxZQUFZO29CQUN4QixPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixLQUFLLEVBQUUsaUJBQWlCO29CQUN4QixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2dCQUNELDJCQUEyQixFQUFFO29CQUMzQixJQUFJLEVBQUUsNkJBQTZCO29CQUNuQyxJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsS0FBSyxFQUFFLGFBQWE7b0JBQ3BCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsYUFBYTtvQkFDOUIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixZQUFZLEVBQUUsU0FBUztvQkFDdkIsWUFBWSxFQUFFLGdCQUFnQjtvQkFDOUIsVUFBVSxFQUFFLFdBQVc7b0JBQ3ZCLE9BQU8sRUFBRSxXQUFXO29CQUNwQixLQUFLLEVBQUUsWUFBWTtpQkFDcEI7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixLQUFLLEVBQUUsY0FBYztvQkFDckIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxZQUFZO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBQdWJBY2NvdW50LFxuICBQcm9UZXh0UHJvcGVydHksXG4gIFByb0luZm9Qcm9qUmVsLFxuICBJbmZMYW5ndWFnZSxcbiAgSW5mUGVyc2lzdGVudEl0ZW0sXG4gIERhdE5hbWVzcGFjZVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBQcm9Qcm9qZWN0SW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJma19sYW5ndWFnZVwiPzogbnVtYmVyO1xuICBhY2NvdW50cz86IFB1YkFjY291bnRbXTtcbiAgdGV4dF9wcm9wZXJ0aWVzPzogUHJvVGV4dFByb3BlcnR5W107XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIGRlZmF1bHRfbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZTtcbiAgcGVyc2lzdGVudF9pdGVtcz86IEluZlBlcnNpc3RlbnRJdGVtW107XG4gIG5hbWVzcGFjZXM/OiBEYXROYW1lc3BhY2VbXTtcbn1cblxuZXhwb3J0IGNsYXNzIFByb1Byb2plY3QgaW1wbGVtZW50cyBQcm9Qcm9qZWN0SW50ZXJmYWNlIHtcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBcImZrX2xhbmd1YWdlXCI6IG51bWJlcjtcbiAgYWNjb3VudHM/OiBQdWJBY2NvdW50W107XG4gIHRleHRfcHJvcGVydGllcz86IFByb1RleHRQcm9wZXJ0eVtdO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBkZWZhdWx0X2xhbmd1YWdlPzogSW5mTGFuZ3VhZ2U7XG4gIHBlcnNpc3RlbnRfaXRlbXM/OiBJbmZQZXJzaXN0ZW50SXRlbVtdO1xuICBuYW1lc3BhY2VzPzogRGF0TmFtZXNwYWNlW107XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBQcm9Qcm9qZWN0SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBQcm9Qcm9qZWN0YC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlByb1Byb2plY3RcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBQcm9Qcm9qZWN0IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFByb1Byb2plY3RJbnRlcmZhY2UpOiBQcm9Qcm9qZWN0e1xuICAgIHJldHVybiBuZXcgUHJvUHJvamVjdChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Byb1Byb2plY3QnLFxuICAgICAgcGx1cmFsOiAnUHJvUHJvamVjdHMnLFxuICAgICAgcGF0aDogJ1Byb1Byb2plY3RzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2xhbmd1YWdlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfbGFuZ3VhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGFjY291bnRzOiB7XG4gICAgICAgICAgbmFtZTogJ2FjY291bnRzJyxcbiAgICAgICAgICB0eXBlOiAnUHViQWNjb3VudFtdJyxcbiAgICAgICAgICBtb2RlbDogJ1B1YkFjY291bnQnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgIG1vZGVsVGhyb3VnaDogJ1B1YkFjY291bnRQcm9qZWN0UmVsJyxcbiAgICAgICAgICBrZXlUaHJvdWdoOiAnYWNjb3VudF9pZCcsXG4gICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19wcm9qZWN0J1xuICAgICAgICB9LFxuICAgICAgICB0ZXh0X3Byb3BlcnRpZXM6IHtcbiAgICAgICAgICBuYW1lOiAndGV4dF9wcm9wZXJ0aWVzJyxcbiAgICAgICAgICB0eXBlOiAnUHJvVGV4dFByb3BlcnR5W10nLFxuICAgICAgICAgIG1vZGVsOiAnUHJvVGV4dFByb3BlcnR5JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfcHJvamVjdCdcbiAgICAgICAgfSxcbiAgICAgICAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzOiB7XG4gICAgICAgICAgbmFtZTogJ2VudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscycsXG4gICAgICAgICAgdHlwZTogJ1Byb0luZm9Qcm9qUmVsW10nLFxuICAgICAgICAgIG1vZGVsOiAnUHJvSW5mb1Byb2pSZWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19wcm9qZWN0J1xuICAgICAgICB9LFxuICAgICAgICBkZWZhdWx0X2xhbmd1YWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2RlZmF1bHRfbGFuZ3VhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdJbmZMYW5ndWFnZScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZMYW5ndWFnZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19sYW5ndWFnZScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIHBlcnNpc3RlbnRfaXRlbXM6IHtcbiAgICAgICAgICBuYW1lOiAncGVyc2lzdGVudF9pdGVtcycsXG4gICAgICAgICAgdHlwZTogJ0luZlBlcnNpc3RlbnRJdGVtW10nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mUGVyc2lzdGVudEl0ZW0nLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgIG1vZGVsVGhyb3VnaDogJ1Byb0luZm9Qcm9qUmVsJyxcbiAgICAgICAgICBrZXlUaHJvdWdoOiAnZmtfZW50aXR5JyxcbiAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX3Byb2plY3QnXG4gICAgICAgIH0sXG4gICAgICAgIG5hbWVzcGFjZXM6IHtcbiAgICAgICAgICBuYW1lOiAnbmFtZXNwYWNlcycsXG4gICAgICAgICAgdHlwZTogJ0RhdE5hbWVzcGFjZVtdJyxcbiAgICAgICAgICBtb2RlbDogJ0RhdE5hbWVzcGFjZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX3Byb2plY3QnXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=