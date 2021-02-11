var InfLangString = /** @class */ (function () {
    function InfLangString(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfLangString`.
     */
    InfLangString.getModelName = function () {
        return "InfLangString";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfLangString for dynamic purposes.
    **/
    InfLangString.factory = function (data) {
        return new InfLangString(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    InfLangString.getModelDefinition = function () {
        return {
            name: 'InfLangString',
            plural: 'InfLangStrings',
            path: 'InfLangStrings',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
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
                incoming_statements: {
                    name: 'incoming_statements',
                    type: 'InfStatement[]',
                    model: 'InfStatement',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_object_info'
                },
                language: {
                    name: 'language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
            }
        };
    };
    return InfLangString;
}());
export { InfLangString };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mTGFuZ1N0cmluZy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL0luZkxhbmdTdHJpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJBO0lBU0UsdUJBQVksSUFBNkI7UUFDdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLDBCQUFZLEdBQTFCO1FBQ0UsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1cscUJBQU8sR0FBckIsVUFBc0IsSUFBNEI7UUFDaEQsT0FBTyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csZ0NBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxlQUFlO1lBQ3JCLE1BQU0sRUFBRSxnQkFBZ0I7WUFDeEIsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCwyQkFBMkIsRUFBRTtvQkFDM0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxtQkFBbUIsRUFBRTtvQkFDbkIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsZ0JBQWdCO2lCQUN4QjtnQkFDRCxRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxhQUFhO29CQUNuQixLQUFLLEVBQUUsYUFBYTtvQkFDcEIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxhQUFhO29CQUM5QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBM0ZELElBMkZDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb0luZm9Qcm9qUmVsLFxuICBJbmZTdGF0ZW1lbnQsXG4gIEluZkxhbmd1YWdlXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIEluZkxhbmdTdHJpbmdJbnRlcmZhY2Uge1xuICBcImZrX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJma19sYW5ndWFnZVwiOiBudW1iZXI7XG4gIFwicXVpbGxfZG9jXCI/OiBhbnk7XG4gIFwic3RyaW5nXCI/OiBzdHJpbmc7XG4gIFwicGtfZW50aXR5XCI/OiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIGluY29taW5nX3N0YXRlbWVudHM/OiBJbmZTdGF0ZW1lbnRbXTtcbiAgbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZTtcbn1cblxuZXhwb3J0IGNsYXNzIEluZkxhbmdTdHJpbmcgaW1wbGVtZW50cyBJbmZMYW5nU3RyaW5nSW50ZXJmYWNlIHtcbiAgXCJma19jbGFzc1wiOiBudW1iZXI7XG4gIFwiZmtfbGFuZ3VhZ2VcIjogbnVtYmVyO1xuICBcInF1aWxsX2RvY1wiOiBhbnk7XG4gIFwic3RyaW5nXCI6IHN0cmluZztcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBpbmNvbWluZ19zdGF0ZW1lbnRzPzogSW5mU3RhdGVtZW50W107XG4gIGxhbmd1YWdlPzogSW5mTGFuZ3VhZ2U7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBJbmZMYW5nU3RyaW5nSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBJbmZMYW5nU3RyaW5nYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkluZkxhbmdTdHJpbmdcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbmZMYW5nU3RyaW5nIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEluZkxhbmdTdHJpbmdJbnRlcmZhY2UpOiBJbmZMYW5nU3RyaW5ne1xuICAgIHJldHVybiBuZXcgSW5mTGFuZ1N0cmluZyhkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0luZkxhbmdTdHJpbmcnLFxuICAgICAgcGx1cmFsOiAnSW5mTGFuZ1N0cmluZ3MnLFxuICAgICAgcGF0aDogJ0luZkxhbmdTdHJpbmdzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiZmtfY2xhc3NcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19jbGFzcycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19sYW5ndWFnZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcInF1aWxsX2RvY1wiOiB7XG4gICAgICAgICAgbmFtZTogJ3F1aWxsX2RvYycsXG4gICAgICAgICAgdHlwZTogJ2FueSdcbiAgICAgICAgfSxcbiAgICAgICAgXCJzdHJpbmdcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHJlbGF0aW9uczoge1xuICAgICAgICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM6IHtcbiAgICAgICAgICBuYW1lOiAnZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzJyxcbiAgICAgICAgICB0eXBlOiAnUHJvSW5mb1Byb2pSZWxbXScsXG4gICAgICAgICAgbW9kZWw6ICdQcm9JbmZvUHJvalJlbCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgaW5jb21pbmdfc3RhdGVtZW50czoge1xuICAgICAgICAgIG5hbWU6ICdpbmNvbWluZ19zdGF0ZW1lbnRzJyxcbiAgICAgICAgICB0eXBlOiAnSW5mU3RhdGVtZW50W10nLFxuICAgICAgICAgIG1vZGVsOiAnSW5mU3RhdGVtZW50JyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfb2JqZWN0X2luZm8nXG4gICAgICAgIH0sXG4gICAgICAgIGxhbmd1YWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIG1vZGVsOiAnSW5mTGFuZ3VhZ2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfbGFuZ3VhZ2UnLFxuICAgICAgICAgIGtleVRvOiAncGtfZW50aXR5J1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19