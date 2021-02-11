export class InfPersistentItem {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfPersistentItem`.
     */
    static getModelName() {
        return "InfPersistentItem";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfPersistentItem for dynamic purposes.
    **/
    static factory(data) {
        return new InfPersistentItem(data);
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
            name: 'InfPersistentItem',
            plural: 'InfPersistentItems',
            path: 'InfPersistentItems',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
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
                incoming_statements: {
                    name: 'incoming_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_object_info'
                },
                outgoing_statements: {
                    name: 'outgoing_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_subject_info'
                },
                dfh_class: {
                    name: 'dfh_class',
                    type: 'DfhClass',
                    model: 'DfhClass',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_class',
                    keyTo: 'pk_class'
                },
                text_properties: {
                    name: 'text_properties',
                    type: 'InfTextProperty[]',
                    model: 'InfTextProperty',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_concerned_entity'
                },
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mUGVyc2lzdGVudEl0ZW0uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9JbmZQZXJzaXN0ZW50SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkEsTUFBTSxPQUFPLGlCQUFpQjtJQU81QixZQUFZLElBQWlDO1FBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBZ0M7UUFDcEQsT0FBTyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE1BQU0sRUFBRSxvQkFBb0I7WUFDNUIsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsMkJBQTJCLEVBQUU7b0JBQzNCLElBQUksRUFBRSw2QkFBNkI7b0JBQ25DLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLFlBQVksRUFBRSxTQUFTO29CQUN2QixPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELG1CQUFtQixFQUFFO29CQUNuQixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixLQUFLLEVBQUUsY0FBYztvQkFDckIsWUFBWSxFQUFFLFNBQVM7b0JBQ3ZCLE9BQU8sRUFBRSxXQUFXO29CQUNwQixLQUFLLEVBQUUsZ0JBQWdCO2lCQUN4QjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxTQUFTO29CQUN2QixPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLGlCQUFpQjtpQkFDekI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsS0FBSyxFQUFFLFVBQVU7b0JBQ2pCLFlBQVksRUFBRSxXQUFXO29CQUN6QixPQUFPLEVBQUUsVUFBVTtvQkFDbkIsS0FBSyxFQUFFLFVBQVU7aUJBQ2xCO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsbUJBQW1CO29CQUN6QixLQUFLLEVBQUUsaUJBQWlCO29CQUN4QixZQUFZLEVBQUUsU0FBUztvQkFDdkIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLEtBQUssRUFBRSxxQkFBcUI7aUJBQzdCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb0luZm9Qcm9qUmVsLFxuICBJbmZTdGF0ZW1lbnQsXG4gIEluZlRleHRQcm9wZXJ0eVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBJbmZQZXJzaXN0ZW50SXRlbUludGVyZmFjZSB7XG4gIFwiZmtfY2xhc3NcIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBpbmNvbWluZ19zdGF0ZW1lbnRzPzogSW5mU3RhdGVtZW50W107XG4gIG91dGdvaW5nX3N0YXRlbWVudHM/OiBJbmZTdGF0ZW1lbnRbXTtcbiAgdGV4dF9wcm9wZXJ0aWVzPzogSW5mVGV4dFByb3BlcnR5W107XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZQZXJzaXN0ZW50SXRlbSBpbXBsZW1lbnRzIEluZlBlcnNpc3RlbnRJdGVtSW50ZXJmYWNlIHtcbiAgXCJma19jbGFzc1wiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgaW5jb21pbmdfc3RhdGVtZW50cz86IEluZlN0YXRlbWVudFtdO1xuICBvdXRnb2luZ19zdGF0ZW1lbnRzPzogSW5mU3RhdGVtZW50W107XG4gIHRleHRfcHJvcGVydGllcz86IEluZlRleHRQcm9wZXJ0eVtdO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogSW5mUGVyc2lzdGVudEl0ZW1JbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZlBlcnNpc3RlbnRJdGVtYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZlBlcnNpc3RlbnRJdGVtXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW5mUGVyc2lzdGVudEl0ZW0gZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogSW5mUGVyc2lzdGVudEl0ZW1JbnRlcmZhY2UpOiBJbmZQZXJzaXN0ZW50SXRlbSB7XG4gICAgcmV0dXJuIG5ldyBJbmZQZXJzaXN0ZW50SXRlbShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgIHBsdXJhbDogJ0luZlBlcnNpc3RlbnRJdGVtcycsXG4gICAgICBwYXRoOiAnSW5mUGVyc2lzdGVudEl0ZW1zJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiZmtfY2xhc3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jbGFzcycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVsczoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMnLFxuICAgICAgICAgIHR5cGU6ICdQcm9JbmZvUHJvalJlbFtdJyxcbiAgICAgICAgICBtb2RlbDogJ1Byb0luZm9Qcm9qUmVsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgaW5jb21pbmdfc3RhdGVtZW50czoge1xuICAgICAgICAgIG5hbWU6ICdpbmNvbWluZ19zdGF0ZW1lbnRzJyxcbiAgICAgICAgICB0eXBlOiAnSW5mU3RhdGVtZW50W10nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mU3RhdGVtZW50JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX29iamVjdF9pbmZvJ1xuICAgICAgICB9LFxuICAgICAgICBvdXRnb2luZ19zdGF0ZW1lbnRzOiB7XG4gICAgICAgICAgbmFtZTogJ291dGdvaW5nX3N0YXRlbWVudHMnLFxuICAgICAgICAgIHR5cGU6ICdJbmZTdGF0ZW1lbnRbXScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZTdGF0ZW1lbnQnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfc3ViamVjdF9pbmZvJ1xuICAgICAgICB9LFxuICAgICAgICBkZmhfY2xhc3M6IHtcbiAgICAgICAgICBuYW1lOiAnZGZoX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnRGZoQ2xhc3MnLFxuICAgICAgICAgIG1vZGVsOiAnRGZoQ2xhc3MnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAga2V5RnJvbTogJ2ZrX2NsYXNzJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2NsYXNzJ1xuICAgICAgICB9LFxuICAgICAgICB0ZXh0X3Byb3BlcnRpZXM6IHtcbiAgICAgICAgICBuYW1lOiAndGV4dF9wcm9wZXJ0aWVzJyxcbiAgICAgICAgICB0eXBlOiAnSW5mVGV4dFByb3BlcnR5W10nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mVGV4dFByb3BlcnR5JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2NvbmNlcm5lZF9lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=