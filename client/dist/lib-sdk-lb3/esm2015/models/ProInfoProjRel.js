/* tslint:disable */
export class ProInfoProjRel {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProInfoProjRel`.
     */
    static getModelName() {
        return "ProInfoProjRel";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProInfoProjRel for dynamic purposes.
    **/
    static factory(data) {
        return new ProInfoProjRel(data);
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
            name: 'ProInfoProjRel',
            plural: 'ProInfoProjRels',
            path: 'ProInfoProjRels',
            idName: 'pk_entity',
            properties: {
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "fk_entity": {
                    name: 'fk_entity',
                    type: 'number'
                },
                "fk_entity_version": {
                    name: 'fk_entity_version',
                    type: 'string'
                },
                "fk_entity_version_concat": {
                    name: 'fk_entity_version_concat',
                    type: 'string'
                },
                "is_in_project": {
                    name: 'is_in_project',
                    type: 'boolean'
                },
                "is_standard_in_project": {
                    name: 'is_standard_in_project',
                    type: 'boolean'
                },
                "calendar": {
                    name: 'calendar',
                    type: 'string'
                },
                "ord_num_of_domain": {
                    name: 'ord_num_of_domain',
                    type: 'number'
                },
                "ord_num_of_range": {
                    name: 'ord_num_of_range',
                    type: 'number'
                },
                "ord_num_of_text_property": {
                    name: 'ord_num_of_text_property',
                    type: 'number'
                },
                "tmsp_last_modification": {
                    name: 'tmsp_last_modification',
                    type: 'string'
                },
                "fk_creator": {
                    name: 'fk_creator',
                    type: 'number'
                },
                "fk_last_modifier": {
                    name: 'fk_last_modifier',
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
            },
            relations: {}
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvSW5mb1Byb2pSZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJtb2RlbHMvUHJvSW5mb1Byb2pSZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBc0JwQixNQUFNLE9BQU8sY0FBYztJQWlCekIsWUFBWSxJQUE4QjtRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ0ksTUFBTSxDQUFDLFlBQVk7UUFDeEIsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQTZCO1FBQ2pELE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxrQkFBa0I7UUFDOUIsT0FBTztZQUNMLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsTUFBTSxFQUFFLGlCQUFpQjtZQUN6QixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLE1BQU0sRUFBRSxXQUFXO1lBQ25CLFVBQVUsRUFBRTtnQkFDVixZQUFZLEVBQUU7b0JBQ1osSUFBSSxFQUFFLFlBQVk7b0JBQ2xCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELDBCQUEwQixFQUFFO29CQUMxQixJQUFJLEVBQUUsMEJBQTBCO29CQUNoQyxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLElBQUksRUFBRSxTQUFTO2lCQUNoQjtnQkFDRCx3QkFBd0IsRUFBRTtvQkFDeEIsSUFBSSxFQUFFLHdCQUF3QjtvQkFDOUIsSUFBSSxFQUFFLFNBQVM7aUJBQ2hCO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxtQkFBbUI7b0JBQ3pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGtCQUFrQixFQUFFO29CQUNsQixJQUFJLEVBQUUsa0JBQWtCO29CQUN4QixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCwwQkFBMEIsRUFBRTtvQkFDMUIsSUFBSSxFQUFFLDBCQUEwQjtvQkFDaEMsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsd0JBQXdCLEVBQUU7b0JBQ3hCLElBQUksRUFBRSx3QkFBd0I7b0JBQzlCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFlBQVksRUFBRTtvQkFDWixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0Qsa0JBQWtCLEVBQUU7b0JBQ2xCLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2hCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELGVBQWUsRUFBRTtvQkFDZixJQUFJLEVBQUUsZUFBZTtvQkFDckIsSUFBSSxFQUFFLFFBQVE7aUJBQ2Y7YUFDRjtZQUNELFNBQVMsRUFBRSxFQUNWO1NBQ0YsQ0FBQTtJQUNILENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5cbmRlY2xhcmUgdmFyIE9iamVjdDogYW55O1xuZXhwb3J0IGludGVyZmFjZSBQcm9JbmZvUHJvalJlbEludGVyZmFjZSB7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiZmtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZmtfZW50aXR5X3ZlcnNpb25cIj86IHN0cmluZztcbiAgXCJma19lbnRpdHlfdmVyc2lvbl9jb25jYXRcIj86IHN0cmluZztcbiAgXCJpc19pbl9wcm9qZWN0XCI/OiBib29sZWFuO1xuICBcImlzX3N0YW5kYXJkX2luX3Byb2plY3RcIj86IGJvb2xlYW47XG4gIFwiY2FsZW5kYXJcIj86IHN0cmluZztcbiAgXCJvcmRfbnVtX29mX2RvbWFpblwiPzogbnVtYmVyO1xuICBcIm9yZF9udW1fb2ZfcmFuZ2VcIj86IG51bWJlcjtcbiAgXCJvcmRfbnVtX29mX3RleHRfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJ0bXNwX2xhc3RfbW9kaWZpY2F0aW9uXCI/OiBzdHJpbmc7XG4gIFwiZmtfY3JlYXRvclwiPzogbnVtYmVyO1xuICBcImZrX2xhc3RfbW9kaWZpZXJcIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImVudGl0eV92ZXJzaW9uXCI/OiBudW1iZXI7XG4gIFwidG1zcF9jcmVhdGlvblwiPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUHJvSW5mb1Byb2pSZWwgaW1wbGVtZW50cyBQcm9JbmZvUHJvalJlbEludGVyZmFjZSB7XG4gIFwiZmtfcHJvamVjdFwiOiBudW1iZXI7XG4gIFwiZmtfZW50aXR5XCI/OiBudW1iZXI7XG4gIFwiZmtfZW50aXR5X3ZlcnNpb25cIj86IHN0cmluZztcbiAgXCJma19lbnRpdHlfdmVyc2lvbl9jb25jYXRcIj86IHN0cmluZztcbiAgXCJpc19pbl9wcm9qZWN0XCI/OiBib29sZWFuO1xuICBcImlzX3N0YW5kYXJkX2luX3Byb2plY3RcIj86IGJvb2xlYW47XG4gIFwiY2FsZW5kYXJcIj86IHN0cmluZztcbiAgXCJvcmRfbnVtX29mX2RvbWFpblwiPzogbnVtYmVyO1xuICBcIm9yZF9udW1fb2ZfcmFuZ2VcIj86IG51bWJlcjtcbiAgXCJvcmRfbnVtX29mX3RleHRfcHJvcGVydHlcIj86IG51bWJlcjtcbiAgXCJ0bXNwX2xhc3RfbW9kaWZpY2F0aW9uXCI/OiBzdHJpbmc7XG4gIFwiZmtfY3JlYXRvclwiPzogbnVtYmVyO1xuICBcImZrX2xhc3RfbW9kaWZpZXJcIjogbnVtYmVyO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImVudGl0eV92ZXJzaW9uXCI/OiBudW1iZXI7XG4gIFwidG1zcF9jcmVhdGlvblwiPzogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihkYXRhPzogUHJvSW5mb1Byb2pSZWxJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFByb0luZm9Qcm9qUmVsYC5cbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxOYW1lKCkge1xuICAgIHJldHVybiBcIlByb0luZm9Qcm9qUmVsXCI7XG4gIH1cbiAgLyoqXG4gICogQG1ldGhvZCBmYWN0b3J5XG4gICogQGF1dGhvciBKb25hdGhhbiBDYXNhcnJ1Ymlhc1xuICAqIEBsaWNlbnNlIE1JVFxuICAqIFRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgUHJvSW5mb1Byb2pSZWwgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogUHJvSW5mb1Byb2pSZWxJbnRlcmZhY2UpOiBQcm9JbmZvUHJvalJlbCB7XG4gICAgcmV0dXJuIG5ldyBQcm9JbmZvUHJvalJlbChkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ1Byb0luZm9Qcm9qUmVsJyxcbiAgICAgIHBsdXJhbDogJ1Byb0luZm9Qcm9qUmVscycsXG4gICAgICBwYXRoOiAnUHJvSW5mb1Byb2pSZWxzJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwiZmtfcHJvamVjdFwiOiB7XG4gICAgICAgICAgbmFtZTogJ2ZrX3Byb2plY3QnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZW50aXR5XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZW50aXR5JyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2VudGl0eV92ZXJzaW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZW50aXR5X3ZlcnNpb24nLFxuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfZW50aXR5X3ZlcnNpb25fY29uY2F0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfZW50aXR5X3ZlcnNpb25fY29uY2F0JyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcImlzX2luX3Byb2plY3RcIjoge1xuICAgICAgICAgIG5hbWU6ICdpc19pbl9wcm9qZWN0JyxcbiAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgfSxcbiAgICAgICAgXCJpc19zdGFuZGFyZF9pbl9wcm9qZWN0XCI6IHtcbiAgICAgICAgICBuYW1lOiAnaXNfc3RhbmRhcmRfaW5fcHJvamVjdCcsXG4gICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgIH0sXG4gICAgICAgIFwiY2FsZW5kYXJcIjoge1xuICAgICAgICAgIG5hbWU6ICdjYWxlbmRhcicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJvcmRfbnVtX29mX2RvbWFpblwiOiB7XG4gICAgICAgICAgbmFtZTogJ29yZF9udW1fb2ZfZG9tYWluJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcIm9yZF9udW1fb2ZfcmFuZ2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdvcmRfbnVtX29mX3JhbmdlJyxcbiAgICAgICAgICB0eXBlOiAnbnVtYmVyJ1xuICAgICAgICB9LFxuICAgICAgICBcIm9yZF9udW1fb2ZfdGV4dF9wcm9wZXJ0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ29yZF9udW1fb2ZfdGV4dF9wcm9wZXJ0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0bXNwX2xhc3RfbW9kaWZpY2F0aW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAndG1zcF9sYXN0X21vZGlmaWNhdGlvbicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19jcmVhdG9yXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY3JlYXRvcicsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJma19sYXN0X21vZGlmaWVyXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfbGFzdF9tb2RpZmllcicsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZW50aXR5X3ZlcnNpb25cIjoge1xuICAgICAgICAgIG5hbWU6ICdlbnRpdHlfdmVyc2lvbicsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgICAgXCJ0bXNwX2NyZWF0aW9uXCI6IHtcbiAgICAgICAgICBuYW1lOiAndG1zcF9jcmVhdGlvbicsXG4gICAgICAgICAgdHlwZTogJ3N0cmluZydcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==