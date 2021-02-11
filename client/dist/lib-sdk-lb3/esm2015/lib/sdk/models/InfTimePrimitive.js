export class InfTimePrimitive {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfTimePrimitive`.
     */
    static getModelName() {
        return "InfTimePrimitive";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfTimePrimitive for dynamic purposes.
    **/
    static factory(data) {
        return new InfTimePrimitive(data);
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
            name: 'InfTimePrimitive',
            plural: 'InfTimePrimitives',
            path: 'InfTimePrimitives',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "julian_day": {
                    name: 'julian_day',
                    type: 'number'
                },
                "duration": {
                    name: 'duration',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mVGltZVByaW1pdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL0luZlRpbWVQcmltaXRpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY0EsTUFBTSxPQUFPLGdCQUFnQjtJQU0zQixZQUFZLElBQWdDO1FBQzFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDSSxNQUFNLENBQUMsWUFBWTtRQUN4QixPQUFPLGtCQUFrQixDQUFDO0lBQzVCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBK0I7UUFDbkQsT0FBTyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDSSxNQUFNLENBQUMsa0JBQWtCO1FBQzlCLE9BQU87WUFDTCxJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLE1BQU0sRUFBRSxtQkFBbUI7WUFDM0IsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULDJCQUEyQixFQUFFO29CQUMzQixJQUFJLEVBQUUsNkJBQTZCO29CQUNuQyxJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixLQUFLLEVBQUUsZ0JBQWdCO29CQUN2QixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2FBQ0Y7U0FDRixDQUFBO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb0luZm9Qcm9qUmVsXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEluZlRpbWVQcmltaXRpdmVJbnRlcmZhY2Uge1xuICBcImZrX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJqdWxpYW5fZGF5XCI6IG51bWJlcjtcbiAgXCJkdXJhdGlvblwiOiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZUaW1lUHJpbWl0aXZlIGltcGxlbWVudHMgSW5mVGltZVByaW1pdGl2ZUludGVyZmFjZSB7XG4gIFwiZmtfY2xhc3NcIjogbnVtYmVyO1xuICBcImp1bGlhbl9kYXlcIjogbnVtYmVyO1xuICBcImR1cmF0aW9uXCI6IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogSW5mVGltZVByaW1pdGl2ZUludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgSW5mVGltZVByaW1pdGl2ZWAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJJbmZUaW1lUHJpbWl0aXZlXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW5mVGltZVByaW1pdGl2ZSBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBJbmZUaW1lUHJpbWl0aXZlSW50ZXJmYWNlKTogSW5mVGltZVByaW1pdGl2ZXtcbiAgICByZXR1cm4gbmV3IEluZlRpbWVQcmltaXRpdmUoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdJbmZUaW1lUHJpbWl0aXZlJyxcbiAgICAgIHBsdXJhbDogJ0luZlRpbWVQcmltaXRpdmVzJyxcbiAgICAgIHBhdGg6ICdJbmZUaW1lUHJpbWl0aXZlcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImZrX2NsYXNzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwianVsaWFuX2RheVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2p1bGlhbl9kYXknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZHVyYXRpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICdkdXJhdGlvbicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVsczoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMnLFxuICAgICAgICAgIHR5cGU6ICdQcm9JbmZvUHJvalJlbFtdJyxcbiAgICAgICAgICBtb2RlbDogJ1Byb0luZm9Qcm9qUmVsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19