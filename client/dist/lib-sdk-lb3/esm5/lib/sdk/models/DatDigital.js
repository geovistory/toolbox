var DatDigital = /** @class */ (function () {
    function DatDigital(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatDigital`.
     */
    DatDigital.getModelName = function () {
        return "DatDigital";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatDigital for dynamic purposes.
    **/
    DatDigital.factory = function (data) {
        return new DatDigital(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    DatDigital.getModelDefinition = function () {
        return {
            name: 'DatDigital',
            plural: 'DatDigitals',
            path: 'DatDigitals',
            idName: 'pk_entity',
            properties: {
                "entity_version": {
                    name: 'entity_version',
                    type: 'number'
                },
                "pk_text": {
                    name: 'pk_text',
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
                "fk_system_type": {
                    name: 'fk_system_type',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_namespace": {
                    name: 'fk_namespace',
                    type: 'number'
                },
            },
            relations: {
                namespace: {
                    name: 'namespace',
                    type: 'DatNamespace',
                    model: 'DatNamespace',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_namespace',
                    keyTo: 'pk_entity'
                },
            }
        };
    };
    return DatDigital;
}());
export { DatDigital };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0RGlnaXRhbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbImxpYi9zZGsvbW9kZWxzL0RhdERpZ2l0YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJBO0lBU0Usb0JBQVksSUFBMEI7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNEOzs7T0FHRztJQUNXLHVCQUFZLEdBQTFCO1FBQ0UsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ1csa0JBQU8sR0FBckIsVUFBc0IsSUFBeUI7UUFDN0MsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ0Q7Ozs7OztPQU1HO0lBQ1csNkJBQWtCLEdBQWhDO1FBQ0UsT0FBTztZQUNMLElBQUksRUFBRSxZQUFZO1lBQ2xCLE1BQU0sRUFBRSxhQUFhO1lBQ3JCLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULElBQUksRUFBRSxTQUFTO29CQUNmLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLEtBQUs7aUJBQ1o7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxJQUFJLEVBQUUsY0FBYztvQkFDcEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRTtnQkFDVCxTQUFTLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxjQUFjO29CQUNwQixLQUFLLEVBQUUsY0FBYztvQkFDckIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxjQUFjO29CQUMvQixLQUFLLEVBQUUsV0FBVztpQkFDbkI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBbkZELElBbUZDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIERhdE5hbWVzcGFjZVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBEYXREaWdpdGFsSW50ZXJmYWNlIHtcbiAgXCJlbnRpdHlfdmVyc2lvblwiPzogbnVtYmVyO1xuICBcInBrX3RleHRcIj86IG51bWJlcjtcbiAgXCJxdWlsbF9kb2NcIj86IGFueTtcbiAgXCJzdHJpbmdcIj86IHN0cmluZztcbiAgXCJma19zeXN0ZW1fdHlwZVwiPzogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImZrX25hbWVzcGFjZVwiPzogbnVtYmVyO1xuICBuYW1lc3BhY2U/OiBEYXROYW1lc3BhY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBEYXREaWdpdGFsIGltcGxlbWVudHMgRGF0RGlnaXRhbEludGVyZmFjZSB7XG4gIFwiZW50aXR5X3ZlcnNpb25cIjogbnVtYmVyO1xuICBcInBrX3RleHRcIjogbnVtYmVyO1xuICBcInF1aWxsX2RvY1wiOiBhbnk7XG4gIFwic3RyaW5nXCI6IHN0cmluZztcbiAgXCJma19zeXN0ZW1fdHlwZVwiOiBudW1iZXI7XG4gIFwicGtfZW50aXR5XCI6IG51bWJlcjtcbiAgXCJma19uYW1lc3BhY2VcIjogbnVtYmVyO1xuICBuYW1lc3BhY2U/OiBEYXROYW1lc3BhY2U7XG4gIGNvbnN0cnVjdG9yKGRhdGE/OiBEYXREaWdpdGFsSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBEYXREaWdpdGFsYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIkRhdERpZ2l0YWxcIjtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGZhY3RvcnlcbiAgKiBAYXV0aG9yIEpvbmF0aGFuIENhc2FycnViaWFzXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgY3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBEYXREaWdpdGFsIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IERhdERpZ2l0YWxJbnRlcmZhY2UpOiBEYXREaWdpdGFse1xuICAgIHJldHVybiBuZXcgRGF0RGlnaXRhbChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0RhdERpZ2l0YWwnLFxuICAgICAgcGx1cmFsOiAnRGF0RGlnaXRhbHMnLFxuICAgICAgcGF0aDogJ0RhdERpZ2l0YWxzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiZW50aXR5X3ZlcnNpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbicsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa190ZXh0XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfdGV4dCcsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJxdWlsbF9kb2NcIjoge1xuICAgICAgICAgIG5hbWU6ICdxdWlsbF9kb2MnLFxuICAgICAgICAgIHR5cGU6ICdhbnknXG4gICAgICAgIH0sXG4gICAgICAgIFwic3RyaW5nXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3RyaW5nJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3N5c3RlbV90eXBlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfc3lzdGVtX3R5cGUnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX25hbWVzcGFjZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX25hbWVzcGFjZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgbmFtZXNwYWNlOiB7XG4gICAgICAgICAgbmFtZTogJ25hbWVzcGFjZScsXG4gICAgICAgICAgdHlwZTogJ0RhdE5hbWVzcGFjZScsXG4gICAgICAgICAgbW9kZWw6ICdEYXROYW1lc3BhY2UnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2JlbG9uZ3NUbycsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAnZmtfbmFtZXNwYWNlJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==