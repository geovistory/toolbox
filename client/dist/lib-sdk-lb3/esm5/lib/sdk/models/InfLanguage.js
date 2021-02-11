var InfLanguage = /** @class */ (function () {
    function InfLanguage(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLanguage`.
     */
    InfLanguage.getModelName = function () {
        return "InfLanguage";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfLanguage for dynamic purposes.
    **/
    InfLanguage.factory = function (data) {
        return new InfLanguage(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    InfLanguage.getModelDefinition = function () {
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
    };
    return InfLanguage;
}());
export { InfLanguage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mTGFuZ3VhZ2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9JbmZMYW5ndWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQkE7SUFXRSxxQkFBWSxJQUEyQjtRQUNyQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csd0JBQVksR0FBMUI7UUFDRSxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDVyxtQkFBTyxHQUFyQixVQUFzQixJQUEwQjtRQUM5QyxPQUFPLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRDs7Ozs7O09BTUc7SUFDVyw4QkFBa0IsR0FBaEM7UUFDRSxPQUFPO1lBQ0wsSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTSxFQUFFLGNBQWM7WUFDdEIsSUFBSSxFQUFFLGNBQWM7WUFDcEIsTUFBTSxFQUFFLFdBQVc7WUFDbkIsVUFBVSxFQUFFO2dCQUNWLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsYUFBYSxFQUFFO29CQUNiLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsT0FBTztvQkFDYixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsMkJBQTJCLEVBQUU7b0JBQzNCLElBQUksRUFBRSw2QkFBNkI7b0JBQ25DLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBN0ZELElBNkZDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb0luZm9Qcm9qUmVsXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEluZkxhbmd1YWdlSW50ZXJmYWNlIHtcbiAgXCJma19jbGFzc1wiPzogbnVtYmVyO1xuICBcInBrX2xhbmd1YWdlXCI/OiBzdHJpbmc7XG4gIFwibGFuZ190eXBlXCI/OiBzdHJpbmc7XG4gIFwic2NvcGVcIj86IHN0cmluZztcbiAgXCJpc282MzkyYlwiPzogc3RyaW5nO1xuICBcImlzbzYzOTJ0XCI/OiBzdHJpbmc7XG4gIFwiaXNvNjM5MVwiPzogc3RyaW5nO1xuICBcIm5vdGVzXCI/OiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZMYW5ndWFnZSBpbXBsZW1lbnRzIEluZkxhbmd1YWdlSW50ZXJmYWNlIHtcbiAgXCJma19jbGFzc1wiOiBudW1iZXI7XG4gIFwicGtfbGFuZ3VhZ2VcIjogc3RyaW5nO1xuICBcImxhbmdfdHlwZVwiOiBzdHJpbmc7XG4gIFwic2NvcGVcIjogc3RyaW5nO1xuICBcImlzbzYzOTJiXCI6IHN0cmluZztcbiAgXCJpc282MzkydFwiOiBzdHJpbmc7XG4gIFwiaXNvNjM5MVwiOiBzdHJpbmc7XG4gIFwibm90ZXNcIjogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJbmZMYW5ndWFnZUludGVyZmFjZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBtb2RlbCByZXByZXNlbnRlZCBieSB0aGlzICRyZXNvdXJjZSxcbiAgICogaS5lLiBgSW5mTGFuZ3VhZ2VgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiSW5mTGFuZ3VhZ2VcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbmZMYW5ndWFnZSBmb3IgZHluYW1pYyBwdXJwb3Nlcy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZmFjdG9yeShkYXRhOiBJbmZMYW5ndWFnZUludGVyZmFjZSk6IEluZkxhbmd1YWdle1xuICAgIHJldHVybiBuZXcgSW5mTGFuZ3VhZ2UoZGF0YSk7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBnZXRNb2RlbERlZmluaXRpb25cbiAgKiBAYXV0aG9yIEp1bGllbiBMZWR1blxuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBzb21lIG9mIHRoZSBtb2RlbFxuICAqIGRlZmluaXRpb25zLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbERlZmluaXRpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6ICdJbmZMYW5ndWFnZScsXG4gICAgICBwbHVyYWw6ICdJbmZMYW5ndWFnZXMnLFxuICAgICAgcGF0aDogJ0luZkxhbmd1YWdlcycsXG4gICAgICBpZE5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgcHJvcGVydGllczoge1xuICAgICAgICBcImZrX2NsYXNzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfbGFuZ3VhZ2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19sYW5ndWFnZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJsYW5nX3R5cGVcIjoge1xuICAgICAgICAgIG5hbWU6ICdsYW5nX3R5cGUnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwic2NvcGVcIjoge1xuICAgICAgICAgIG5hbWU6ICdzY29wZScsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJpc282MzkyYlwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lzbzYzOTJiJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImlzbzYzOTJ0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnaXNvNjM5MnQnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiaXNvNjM5MVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2lzbzYzOTEnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwibm90ZXNcIjoge1xuICAgICAgICAgIG5hbWU6ICdub3RlcycsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVsczoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMnLFxuICAgICAgICAgIHR5cGU6ICdQcm9JbmZvUHJvalJlbFtdJyxcbiAgICAgICAgICBtb2RlbDogJ1Byb0luZm9Qcm9qUmVsJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19