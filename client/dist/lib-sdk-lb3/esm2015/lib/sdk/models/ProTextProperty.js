export class ProTextProperty {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProTextProperty`.
     */
    static getModelName() {
        return "ProTextProperty";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProTextProperty for dynamic purposes.
    **/
    static factory(data) {
        return new ProTextProperty(data);
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
            name: 'ProTextProperty',
            plural: 'ProTextProperties',
            path: 'ProTextProperties',
            idName: 'pk_entity',
            properties: {
                "string": {
                    name: 'string',
                    type: 'string'
                },
                "fk_system_type": {
                    name: 'fk_system_type',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_dfh_class": {
                    name: 'fk_dfh_class',
                    type: 'number'
                },
                "fk_dfh_property": {
                    name: 'fk_dfh_property',
                    type: 'number'
                },
                "fk_dfh_property_domain": {
                    name: 'fk_dfh_property_domain',
                    type: 'number'
                },
                "fk_dfh_property_range": {
                    name: 'fk_dfh_property_range',
                    type: 'number'
                },
                "fk_pro_project": {
                    name: 'fk_pro_project',
                    type: 'number'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "entity_version": {
                    name: 'entity_version',
                    type: 'number'
                },
                "tmsp_creation": {
                    name: 'tmsp_creation',
                    type: 'string'
                },
                "tmsp_last_modification": {
                    name: 'tmsp_last_modification',
                    type: 'string'
                },
            },
            relations: {
                project: {
                    name: 'project',
                    type: 'ProProject',
                    model: 'ProProject',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_project',
                    keyTo: 'pk_entity'
                },
                language: {
                    name: 'language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
                systemType: {
                    name: 'systemType',
                    type: 'SysSystemType',
                    model: 'SysSystemType',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_system_type',
                    keyTo: 'pk_entity'
                },
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvVGV4dFByb3BlcnR5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1zZGstbGIzLyIsInNvdXJjZXMiOlsibGliL3Nkay9tb2RlbHMvUHJvVGV4dFByb3BlcnR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJCQSxNQUFNLE9BQU8sZUFBZTtJQWlCMUIsWUFBWSxJQUErQjtRQUN6QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQThCO1FBQ2xELE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxpQkFBaUI7WUFDdkIsTUFBTSxFQUFFLG1CQUFtQjtZQUMzQixJQUFJLEVBQUUsbUJBQW1CO1lBQ3pCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixRQUFRLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGFBQWEsRUFBRTtvQkFDYixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsSUFBSSxFQUFFLGNBQWM7b0JBQ3BCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGlCQUFpQixFQUFFO29CQUNqQixJQUFJLEVBQUUsaUJBQWlCO29CQUN2QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCx3QkFBd0IsRUFBRTtvQkFDeEIsSUFBSSxFQUFFLHdCQUF3QjtvQkFDOUIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsdUJBQXVCLEVBQUU7b0JBQ3ZCLElBQUksRUFBRSx1QkFBdUI7b0JBQzdCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGdCQUFnQixFQUFFO29CQUNoQixJQUFJLEVBQUUsZ0JBQWdCO29CQUN0QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELHdCQUF3QixFQUFFO29CQUN4QixJQUFJLEVBQUUsd0JBQXdCO29CQUM5QixJQUFJLEVBQUUsUUFBUTtpQkFDZjthQUNGO1lBQ0QsU0FBUyxFQUFFO2dCQUNULE9BQU8sRUFBRTtvQkFDUCxJQUFJLEVBQUUsU0FBUztvQkFDZixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFlBQVksRUFBRSxXQUFXO29CQUNqQixPQUFPLEVBQUUsWUFBWTtvQkFDN0IsS0FBSyxFQUFFLFdBQVc7aUJBQ25CO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLEtBQUssRUFBRSxhQUFhO29CQUNwQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLGFBQWE7b0JBQzlCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxlQUFlO29CQUNyQixLQUFLLEVBQUUsZUFBZTtvQkFDdEIsWUFBWSxFQUFFLFdBQVc7b0JBQ2pCLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ2pDLEtBQUssRUFBRSxXQUFXO2lCQUNuQjthQUNGO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBQcm9Qcm9qZWN0LFxuICBJbmZMYW5ndWFnZSxcbiAgU3lzU3lzdGVtVHlwZVxufSBmcm9tICcuLi9pbmRleCc7XG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBQcm9UZXh0UHJvcGVydHlJbnRlcmZhY2Uge1xuICBcInN0cmluZ1wiOiBzdHJpbmc7XG4gIFwiZmtfc3lzdGVtX3R5cGVcIjogbnVtYmVyO1xuICBcImZrX2xhbmd1YWdlXCI6IG51bWJlcjtcbiAgXCJma19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJma19kZmhfY2xhc3NcIj86IG51bWJlcjtcbiAgXCJma19kZmhfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJma19kZmhfcHJvcGVydHlfZG9tYWluXCI/OiBudW1iZXI7XG4gIFwiZmtfZGZoX3Byb3BlcnR5X3JhbmdlXCI/OiBudW1iZXI7XG4gIFwiZmtfcHJvX3Byb2plY3RcIj86IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIj86IG51bWJlcjtcbiAgXCJlbnRpdHlfdmVyc2lvblwiPzogbnVtYmVyO1xuICBcInRtc3BfY3JlYXRpb25cIj86IHN0cmluZztcbiAgXCJ0bXNwX2xhc3RfbW9kaWZpY2F0aW9uXCI/OiBzdHJpbmc7XG4gIHByb2plY3Q/OiBQcm9Qcm9qZWN0O1xuICBsYW5ndWFnZT86IEluZkxhbmd1YWdlO1xuICBzeXN0ZW1UeXBlPzogU3lzU3lzdGVtVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIFByb1RleHRQcm9wZXJ0eSBpbXBsZW1lbnRzIFByb1RleHRQcm9wZXJ0eUludGVyZmFjZSB7XG4gIFwic3RyaW5nXCI6IHN0cmluZztcbiAgXCJma19zeXN0ZW1fdHlwZVwiOiBudW1iZXI7XG4gIFwiZmtfbGFuZ3VhZ2VcIjogbnVtYmVyO1xuICBcImZrX3Byb2plY3RcIjogbnVtYmVyO1xuICBcImZrX2RmaF9jbGFzc1wiOiBudW1iZXI7XG4gIFwiZmtfZGZoX3Byb3BlcnR5XCI6IG51bWJlcjtcbiAgXCJma19kZmhfcHJvcGVydHlfZG9tYWluXCI6IG51bWJlcjtcbiAgXCJma19kZmhfcHJvcGVydHlfcmFuZ2VcIjogbnVtYmVyO1xuICBcImZrX3Byb19wcm9qZWN0XCI6IG51bWJlcjtcbiAgXCJwa19lbnRpdHlcIjogbnVtYmVyO1xuICBcImVudGl0eV92ZXJzaW9uXCI6IG51bWJlcjtcbiAgXCJ0bXNwX2NyZWF0aW9uXCI6IHN0cmluZztcbiAgXCJ0bXNwX2xhc3RfbW9kaWZpY2F0aW9uXCI6IHN0cmluZztcbiAgcHJvamVjdD86IFByb1Byb2plY3Q7XG4gIGxhbmd1YWdlPzogSW5mTGFuZ3VhZ2U7XG4gIHN5c3RlbVR5cGU/OiBTeXNTeXN0ZW1UeXBlO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogUHJvVGV4dFByb3BlcnR5SW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBQcm9UZXh0UHJvcGVydHlgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiUHJvVGV4dFByb3BlcnR5XCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUHJvVGV4dFByb3BlcnR5IGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IFByb1RleHRQcm9wZXJ0eUludGVyZmFjZSk6IFByb1RleHRQcm9wZXJ0eXtcbiAgICByZXR1cm4gbmV3IFByb1RleHRQcm9wZXJ0eShkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Byb1RleHRQcm9wZXJ0eScsXG4gICAgICBwbHVyYWw6ICdQcm9UZXh0UHJvcGVydGllcycsXG4gICAgICBwYXRoOiAnUHJvVGV4dFByb3BlcnRpZXMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJzdHJpbmdcIjoge1xuICAgICAgICAgIG5hbWU6ICdzdHJpbmcnLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfc3lzdGVtX3R5cGVcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19zeXN0ZW1fdHlwZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19sYW5ndWFnZVwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2xhbmd1YWdlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb2plY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19wcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2RmaF9jbGFzc1wiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2RmaF9jbGFzcycsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19kZmhfcHJvcGVydHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19kZmhfcHJvcGVydHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZGZoX3Byb3BlcnR5X2RvbWFpblwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX2RmaF9wcm9wZXJ0eV9kb21haW4nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZGZoX3Byb3BlcnR5X3JhbmdlXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZGZoX3Byb3BlcnR5X3JhbmdlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX3Byb19wcm9qZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfcHJvX3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwicGtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAncGtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImVudGl0eV92ZXJzaW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZW50aXR5X3ZlcnNpb24nLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwidG1zcF9jcmVhdGlvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ3Rtc3BfY3JlYXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwidG1zcF9sYXN0X21vZGlmaWNhdGlvblwiOiB7XG4gICAgICAgICAgbmFtZTogJ3Rtc3BfbGFzdF9tb2RpZmljYXRpb24nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcmVsYXRpb25zOiB7XG4gICAgICAgIHByb2plY3Q6IHtcbiAgICAgICAgICBuYW1lOiAncHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ1Byb1Byb2plY3QnLFxuICAgICAgICAgIG1vZGVsOiAnUHJvUHJvamVjdCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19wcm9qZWN0JyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgbGFuZ3VhZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnbGFuZ3VhZ2UnLFxuICAgICAgICAgIHR5cGU6ICdJbmZMYW5ndWFnZScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZMYW5ndWFnZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19sYW5ndWFnZScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIHN5c3RlbVR5cGU6IHtcbiAgICAgICAgICBuYW1lOiAnc3lzdGVtVHlwZScsXG4gICAgICAgICAgdHlwZTogJ1N5c1N5c3RlbVR5cGUnLFxuICAgICAgICAgIG1vZGVsOiAnU3lzU3lzdGVtVHlwZScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnYmVsb25nc1RvJyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdma19zeXN0ZW1fdHlwZScsXG4gICAgICAgICAga2V5VG86ICdwa19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=