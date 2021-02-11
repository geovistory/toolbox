export class InfDimension {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfDimension`.
     */
    static getModelName() {
        return "InfDimension";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfDimension for dynamic purposes.
    **/
    static factory(data) {
        return new InfDimension(data);
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
            name: 'InfDimension',
            plural: 'InfDimensions',
            path: 'InfDimensions',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "fk_measurement_unit": {
                    name: 'fk_measurement_unit',
                    type: 'number'
                },
                "numeric_value": {
                    name: 'numeric_value',
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
                measurement_unit: {
                    name: 'measurement_unit',
                    type: 'InfPersistentItem',
                    model: 'InfPersistentItem',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_measurement_unit',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mRGltZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvSW5mRGltZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQSxNQUFNLE9BQU8sWUFBWTtJQVF2QixZQUFZLElBQTRCO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQTJCO1FBQy9DLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxjQUFjO1lBQ3BCLE1BQU0sRUFBRSxlQUFlO1lBQ3ZCLElBQUksRUFBRSxlQUFlO1lBQ3JCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHFCQUFxQixFQUFFO29CQUNyQixJQUFJLEVBQUUscUJBQXFCO29CQUMzQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCwyQkFBMkIsRUFBRTtvQkFDM0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsZ0JBQWdCO2lCQUN4QjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxxQkFBcUI7b0JBQ3RDLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBQcm9JbmZvUHJvalJlbCxcbiAgSW5mU3RhdGVtZW50LFxuICBJbmZQZXJzaXN0ZW50SXRlbVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBJbmZEaW1lbnNpb25JbnRlcmZhY2Uge1xuICBcImZrX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJma19tZWFzdXJlbWVudF91bml0XCI6IG51bWJlcjtcbiAgXCJudW1lcmljX3ZhbHVlXCI/OiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIGluY29taW5nX3N0YXRlbWVudHM/OiBJbmZTdGF0ZW1lbnRbXTtcbiAgbWVhc3VyZW1lbnRfdW5pdD86IEluZlBlcnNpc3RlbnRJdGVtO1xufVxuXG5leHBvcnQgY2xhc3MgSW5mRGltZW5zaW9uIGltcGxlbWVudHMgSW5mRGltZW5zaW9uSW50ZXJmYWNlIHtcbiAgXCJma19jbGFzc1wiOiBudW1iZXI7XG4gIFwiZmtfbWVhc3VyZW1lbnRfdW5pdFwiOiBudW1iZXI7XG4gIFwibnVtZXJpY192YWx1ZVwiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgaW5jb21pbmdfc3RhdGVtZW50cz86IEluZlN0YXRlbWVudFtdO1xuICBtZWFzdXJlbWVudF91bml0PzogSW5mUGVyc2lzdGVudEl0ZW07XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJbmZEaW1lbnNpb25JbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYEluZkRpbWVuc2lvbmAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJJbmZEaW1lbnNpb25cIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbmZEaW1lbnNpb24gZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogSW5mRGltZW5zaW9uSW50ZXJmYWNlKTogSW5mRGltZW5zaW9ue1xuICAgIHJldHVybiBuZXcgSW5mRGltZW5zaW9uKGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnSW5mRGltZW5zaW9uJyxcbiAgICAgIHBsdXJhbDogJ0luZkRpbWVuc2lvbnMnLFxuICAgICAgcGF0aDogJ0luZkRpbWVuc2lvbnMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJma19jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2NsYXNzJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX21lYXN1cmVtZW50X3VuaXRcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19tZWFzdXJlbWVudF91bml0JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcIm51bWVyaWNfdmFsdWVcIjoge1xuICAgICAgICAgIG5hbWU6ICdudW1lcmljX3ZhbHVlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzOiB7XG4gICAgICAgICAgbmFtZTogJ2VudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscycsXG4gICAgICAgICAgdHlwZTogJ1Byb0luZm9Qcm9qUmVsW10nLFxuICAgICAgICAgIG1vZGVsOiAnUHJvSW5mb1Byb2pSZWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIGluY29taW5nX3N0YXRlbWVudHM6IHtcbiAgICAgICAgICBuYW1lOiAnaW5jb21pbmdfc3RhdGVtZW50cycsXG4gICAgICAgICAgdHlwZTogJ0luZlN0YXRlbWVudFtdJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlN0YXRlbWVudCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX29iamVjdF9pbmZvJ1xuICAgICAgICB9LFxuICAgICAgICBtZWFzdXJlbWVudF91bml0OiB7XG4gICAgICAgICAgbmFtZTogJ21lYXN1cmVtZW50X3VuaXQnLFxuICAgICAgICAgIHR5cGU6ICdJbmZQZXJzaXN0ZW50SXRlbScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZQZXJzaXN0ZW50SXRlbScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19tZWFzdXJlbWVudF91bml0JyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==