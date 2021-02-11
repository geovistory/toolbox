export class InfLanguage {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLanguage`.
     */
    static getModelName() {
        return "InfLanguage";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfLanguage for dynamic purposes.
    **/
    static factory(data) {
        return new InfLanguage(data);
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
            name: 'InfLanguage',
            plural: 'InfLanguages',
            path: 'InfLanguages',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "pk_language": {
                    name: 'pk_language',
                    type: 'string'
                },
                "lang_type": {
                    name: 'lang_type',
                    type: 'string'
                },
                "scope": {
                    name: 'scope',
                    type: 'string'
                },
                "iso6392b": {
                    name: 'iso6392b',
                    type: 'string'
                },
                "iso6392t": {
                    name: 'iso6392t',
                    type: 'string'
                },
                "iso6391": {
                    name: 'iso6391',
                    type: 'string'
                },
                "notes": {
                    name: 'notes',
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
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mTGFuZ3VhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9JbmZMYW5ndWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQkEsTUFBTSxPQUFPLFdBQVc7SUFXdEIsWUFBWSxJQUEyQjtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUEwQjtRQUM5QyxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsYUFBYTtZQUNuQixNQUFNLEVBQUUsY0FBYztZQUN0QixJQUFJLEVBQUUsY0FBYztZQUNwQixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLElBQUksRUFBRSxPQUFPO29CQUNiLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCwyQkFBMkIsRUFBRTtvQkFDM0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBQcm9JbmZvUHJvalJlbFxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBJbmZMYW5ndWFnZUludGVyZmFjZSB7XG4gIFwiZmtfY2xhc3NcIj86IG51bWJlcjtcbiAgXCJwa19sYW5ndWFnZVwiPzogc3RyaW5nO1xuICBcImxhbmdfdHlwZVwiPzogc3RyaW5nO1xuICBcInNjb3BlXCI/OiBzdHJpbmc7XG4gIFwiaXNvNjM5MmJcIj86IHN0cmluZztcbiAgXCJpc282MzkydFwiPzogc3RyaW5nO1xuICBcImlzbzYzOTFcIj86IHN0cmluZztcbiAgXCJub3Rlc1wiPzogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xufVxuXG5leHBvcnQgY2xhc3MgSW5mTGFuZ3VhZ2UgaW1wbGVtZW50cyBJbmZMYW5ndWFnZUludGVyZmFjZSB7XG4gIFwiZmtfY2xhc3NcIjogbnVtYmVyO1xuICBcInBrX2xhbmd1YWdlXCI6IHN0cmluZztcbiAgXCJsYW5nX3R5cGVcIjogc3RyaW5nO1xuICBcInNjb3BlXCI6IHN0cmluZztcbiAgXCJpc282MzkyYlwiOiBzdHJpbmc7XG4gIFwiaXNvNjM5MnRcIjogc3RyaW5nO1xuICBcImlzbzYzOTFcIjogc3RyaW5nO1xuICBcIm5vdGVzXCI6IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogSW5mTGFuZ3VhZ2VJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZkxhbmd1YWdlYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZkxhbmd1YWdlXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW5mTGFuZ3VhZ2UgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogSW5mTGFuZ3VhZ2VJbnRlcmZhY2UpOiBJbmZMYW5ndWFnZXtcbiAgICByZXR1cm4gbmV3IEluZkxhbmd1YWdlKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgcGx1cmFsOiAnSW5mTGFuZ3VhZ2VzJyxcbiAgICAgIHBhdGg6ICdJbmZMYW5ndWFnZXMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJma19jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2xhbmd1YWdlXCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfbGFuZ3VhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwibGFuZ190eXBlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbGFuZ190eXBlJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInNjb3BlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc2NvcGUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiaXNvNjM5MmJcIjoge1xuICAgICAgICAgIG5hbWU6ICdpc282MzkyYicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJpc282MzkydFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lzbzYzOTJ0JyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImlzbzYzOTFcIjoge1xuICAgICAgICAgIG5hbWU6ICdpc282MzkxJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcIm5vdGVzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnbm90ZXMnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM6IHtcbiAgICAgICAgICBuYW1lOiAnZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzJyxcbiAgICAgICAgICB0eXBlOiAnUHJvSW5mb1Byb2pSZWxbXScsXG4gICAgICAgICAgbW9kZWw6ICdQcm9JbmZvUHJvalJlbCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==