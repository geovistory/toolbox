var InfTemporalEntity = /** @class */ (function () {
    function InfTemporalEntity(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTemporalEntity`.
     */
    InfTemporalEntity.getModelName = function () {
        return "InfTemporalEntity";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTemporalEntity for dynamic purposes.
    **/
    InfTemporalEntity.factory = function (data) {
        return new InfTemporalEntity(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    InfTemporalEntity.getModelDefinition = function () {
        return {
            name: 'InfTemporalEntity',
            plural: 'InfTemporalEntities',
            path: 'InfTemporalEntities',
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
                outgoing_statements: {
                    name: 'outgoing_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_subject_info'
                },
                incoming_statements: {
                    name: 'incoming_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_object_info'
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
    };
    return InfTemporalEntity;
}());
export { InfTemporalEntity };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mVGVtcG9yYWxFbnRpdHkuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9JbmZUZW1wb3JhbEVudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkE7SUFPRSwyQkFBWSxJQUFpQztRQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csOEJBQVksR0FBMUI7UUFDRSxPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLHlCQUFPLEdBQXJCLFVBQXNCLElBQWdDO1FBQ3BELE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csb0NBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxtQkFBbUI7WUFDekIsTUFBTSxFQUFFLHFCQUFxQjtZQUM3QixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCwyQkFBMkIsRUFBRTtvQkFDM0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsaUJBQWlCO2lCQUN6QjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsZ0JBQWdCO2lCQUN4QjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsS0FBSyxFQUFFLGlCQUFpQjtvQkFDeEIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxxQkFBcUI7aUJBQzdCO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQXJGRCxJQXFGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBQcm9JbmZvUHJvalJlbCxcbiAgSW5mU3RhdGVtZW50LFxuICBJbmZUZXh0UHJvcGVydHlcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgSW5mVGVtcG9yYWxFbnRpdHlJbnRlcmZhY2Uge1xuICBcImZrX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgb3V0Z29pbmdfc3RhdGVtZW50cz86IEluZlN0YXRlbWVudFtdO1xuICBpbmNvbWluZ19zdGF0ZW1lbnRzPzogSW5mU3RhdGVtZW50W107XG4gIHRleHRfcHJvcGVydGllcz86IEluZlRleHRQcm9wZXJ0eVtdO1xufVxuXG5leHBvcnQgY2xhc3MgSW5mVGVtcG9yYWxFbnRpdHkgaW1wbGVtZW50cyBJbmZUZW1wb3JhbEVudGl0eUludGVyZmFjZSB7XG4gIFwiZmtfY2xhc3NcIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIG91dGdvaW5nX3N0YXRlbWVudHM/OiBJbmZTdGF0ZW1lbnRbXTtcbiAgaW5jb21pbmdfc3RhdGVtZW50cz86IEluZlN0YXRlbWVudFtdO1xuICB0ZXh0X3Byb3BlcnRpZXM/OiBJbmZUZXh0UHJvcGVydHlbXTtcbiAgY29uc3RydWN0b3IoZGF0YT86IEluZlRlbXBvcmFsRW50aXR5SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBJbmZUZW1wb3JhbEVudGl0eWAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJJbmZUZW1wb3JhbEVudGl0eVwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEluZlRlbXBvcmFsRW50aXR5IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEluZlRlbXBvcmFsRW50aXR5SW50ZXJmYWNlKTogSW5mVGVtcG9yYWxFbnRpdHl7XG4gICAgcmV0dXJuIG5ldyBJbmZUZW1wb3JhbEVudGl0eShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0luZlRlbXBvcmFsRW50aXR5JyxcbiAgICAgIHBsdXJhbDogJ0luZlRlbXBvcmFsRW50aXRpZXMnLFxuICAgICAgcGF0aDogJ0luZlRlbXBvcmFsRW50aXRpZXMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJma19jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzOiB7XG4gICAgICAgICAgbmFtZTogJ2VudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscycsXG4gICAgICAgICAgdHlwZTogJ1Byb0luZm9Qcm9qUmVsW10nLFxuICAgICAgICAgIG1vZGVsOiAnUHJvSW5mb1Byb2pSZWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIG91dGdvaW5nX3N0YXRlbWVudHM6IHtcbiAgICAgICAgICBuYW1lOiAnb3V0Z29pbmdfc3RhdGVtZW50cycsXG4gICAgICAgICAgdHlwZTogJ0luZlN0YXRlbWVudFtdJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlN0YXRlbWVudCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX3N1YmplY3RfaW5mbydcbiAgICAgICAgfSxcbiAgICAgICAgaW5jb21pbmdfc3RhdGVtZW50czoge1xuICAgICAgICAgIG5hbWU6ICdpbmNvbWluZ19zdGF0ZW1lbnRzJyxcbiAgICAgICAgICB0eXBlOiAnSW5mU3RhdGVtZW50W10nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mU3RhdGVtZW50JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfb2JqZWN0X2luZm8nXG4gICAgICAgIH0sXG4gICAgICAgIHRleHRfcHJvcGVydGllczoge1xuICAgICAgICAgIG5hbWU6ICd0ZXh0X3Byb3BlcnRpZXMnLFxuICAgICAgICAgIHR5cGU6ICdJbmZUZXh0UHJvcGVydHlbXScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZUZXh0UHJvcGVydHknLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19jb25jZXJuZWRfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19