var InfDimension = /** @class */ (function () {
    function InfDimension(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfDimension`.
     */
    InfDimension.getModelName = function () {
        return "InfDimension";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfDimension for dynamic purposes.
    **/
    InfDimension.factory = function (data) {
        return new InfDimension(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    InfDimension.getModelDefinition = function () {
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
    };
    return InfDimension;
}());
export { InfDimension };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mRGltZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvSW5mRGltZW5zaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtCQTtJQVFFLHNCQUFZLElBQTRCO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyx5QkFBWSxHQUExQjtRQUNFLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLG9CQUFPLEdBQXJCLFVBQXNCLElBQTJCO1FBQy9DLE9BQU8sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLCtCQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsY0FBYztZQUNwQixNQUFNLEVBQUUsZUFBZTtZQUN2QixJQUFJLEVBQUUsZUFBZTtZQUNyQixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxxQkFBcUIsRUFBRTtvQkFDckIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLElBQUksRUFBRSxlQUFlO29CQUNyQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsMkJBQTJCLEVBQUU7b0JBQzNCLElBQUksRUFBRSw2QkFBNkI7b0JBQ25DLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxxQkFBcUI7b0JBQzNCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLEtBQUssRUFBRSxjQUFjO29CQUNyQixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLGdCQUFnQjtpQkFDeEI7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLEtBQUssRUFBRSxtQkFBbUI7b0JBQzFCLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUscUJBQXFCO29CQUN0QyxLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBdEZELElBc0ZDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb0luZm9Qcm9qUmVsLFxuICBJbmZTdGF0ZW1lbnQsXG4gIEluZlBlcnNpc3RlbnRJdGVtXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEluZkRpbWVuc2lvbkludGVyZmFjZSB7XG4gIFwiZmtfY2xhc3NcIjogbnVtYmVyO1xuICBcImZrX21lYXN1cmVtZW50X3VuaXRcIjogbnVtYmVyO1xuICBcIm51bWVyaWNfdmFsdWVcIj86IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgaW5jb21pbmdfc3RhdGVtZW50cz86IEluZlN0YXRlbWVudFtdO1xuICBtZWFzdXJlbWVudF91bml0PzogSW5mUGVyc2lzdGVudEl0ZW07XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZEaW1lbnNpb24gaW1wbGVtZW50cyBJbmZEaW1lbnNpb25JbnRlcmZhY2Uge1xuICBcImZrX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJma19tZWFzdXJlbWVudF91bml0XCI6IG51bWJlcjtcbiAgXCJudW1lcmljX3ZhbHVlXCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBpbmNvbWluZ19zdGF0ZW1lbnRzPzogSW5mU3RhdGVtZW50W107XG4gIG1lYXN1cmVtZW50X3VuaXQ/OiBJbmZQZXJzaXN0ZW50SXRlbTtcbiAgY29uc3RydWN0b3IoZGF0YT86IEluZkRpbWVuc2lvbkludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgSW5mRGltZW5zaW9uYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZkRpbWVuc2lvblwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEluZkRpbWVuc2lvbiBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBJbmZEaW1lbnNpb25JbnRlcmZhY2UpOiBJbmZEaW1lbnNpb257XG4gICAgcmV0dXJuIG5ldyBJbmZEaW1lbnNpb24oZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdJbmZEaW1lbnNpb24nLFxuICAgICAgcGx1cmFsOiAnSW5mRGltZW5zaW9ucycsXG4gICAgICBwYXRoOiAnSW5mRGltZW5zaW9ucycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImZrX2NsYXNzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfbWVhc3VyZW1lbnRfdW5pdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX21lYXN1cmVtZW50X3VuaXQnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwibnVtZXJpY192YWx1ZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ251bWVyaWNfdmFsdWUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM6IHtcbiAgICAgICAgICBuYW1lOiAnZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzJyxcbiAgICAgICAgICB0eXBlOiAnUHJvSW5mb1Byb2pSZWxbXScsXG4gICAgICAgICAgbW9kZWw6ICdQcm9JbmZvUHJvalJlbCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgaW5jb21pbmdfc3RhdGVtZW50czoge1xuICAgICAgICAgIG5hbWU6ICdpbmNvbWluZ19zdGF0ZW1lbnRzJyxcbiAgICAgICAgICB0eXBlOiAnSW5mU3RhdGVtZW50W10nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mU3RhdGVtZW50JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfb2JqZWN0X2luZm8nXG4gICAgICAgIH0sXG4gICAgICAgIG1lYXN1cmVtZW50X3VuaXQ6IHtcbiAgICAgICAgICBuYW1lOiAnbWVhc3VyZW1lbnRfdW5pdCcsXG4gICAgICAgICAgdHlwZTogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlBlcnNpc3RlbnRJdGVtJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX21lYXN1cmVtZW50X3VuaXQnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19