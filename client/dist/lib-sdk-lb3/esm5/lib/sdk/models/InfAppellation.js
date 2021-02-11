var InfAppellation = /** @class */ (function () {
    function InfAppellation(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `InfAppellation`.
     */
    InfAppellation.getModelName = function () {
        return "InfAppellation";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of InfAppellation for dynamic purposes.
    **/
    InfAppellation.factory = function (data) {
        return new InfAppellation(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    InfAppellation.getModelDefinition = function () {
        return {
            name: 'InfAppellation',
            plural: 'InfAppellations',
            path: 'InfAppellations',
            idName: 'pk_entity',
            properties: {
                "quill_doc": {
                    name: 'quill_doc',
                    type: 'any'
                },
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
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
            }
        };
    };
    return InfAppellation;
}());
export { InfAppellation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5mQXBwZWxsYXRpb24uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXNkay1sYjMvIiwic291cmNlcyI6WyJsaWIvc2RrL21vZGVscy9JbmZBcHBlbGxhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQkE7SUFPRSx3QkFBWSxJQUE4QjtRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Q7OztPQUdHO0lBQ1csMkJBQVksR0FBMUI7UUFDRSxPQUFPLGdCQUFnQixDQUFDO0lBQzFCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLHNCQUFPLEdBQXJCLFVBQXNCLElBQTZCO1FBQ2pELE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLGlDQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLE1BQU0sRUFBRSxpQkFBaUI7WUFDekIsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsS0FBSztpQkFDWjtnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVU7b0JBQ2hCLElBQUksRUFBRSxRQUFRO2lCQUNmO2dCQUNELFFBQVEsRUFBRTtvQkFDUixJQUFJLEVBQUUsUUFBUTtvQkFDZCxJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsMkJBQTJCLEVBQUU7b0JBQzNCLElBQUksRUFBRSw2QkFBNkI7b0JBQ25DLElBQUksRUFBRSxrQkFBa0I7b0JBQ3hCLEtBQUssRUFBRSxnQkFBZ0I7b0JBQ3ZCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsV0FBVztpQkFDbkI7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLElBQUksRUFBRSxxQkFBcUI7b0JBQzNCLElBQUksRUFBRSxnQkFBZ0I7b0JBQ3RCLEtBQUssRUFBRSxjQUFjO29CQUNyQixZQUFZLEVBQUUsU0FBUztvQkFDZixPQUFPLEVBQUUsV0FBVztvQkFDNUIsS0FBSyxFQUFFLGdCQUFnQjtpQkFDeEI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gscUJBQUM7QUFBRCxDQUFDLEFBN0VELElBNkVDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFByb0luZm9Qcm9qUmVsLFxuICBJbmZTdGF0ZW1lbnRcbn0gZnJvbSAnLi4vaW5kZXgnO1xuXG5kZWNsYXJlIHZhciBPYmplY3Q6IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgSW5mQXBwZWxsYXRpb25JbnRlcmZhY2Uge1xuICBcInF1aWxsX2RvY1wiOiBhbnk7XG4gIFwiZmtfY2xhc3NcIjogbnVtYmVyO1xuICBcInN0cmluZ1wiPzogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM/OiBQcm9JbmZvUHJvalJlbFtdO1xuICBpbmNvbWluZ19zdGF0ZW1lbnRzPzogSW5mU3RhdGVtZW50W107XG59XG5cbmV4cG9ydCBjbGFzcyBJbmZBcHBlbGxhdGlvbiBpbXBsZW1lbnRzIEluZkFwcGVsbGF0aW9uSW50ZXJmYWNlIHtcbiAgXCJxdWlsbF9kb2NcIjogYW55O1xuICBcImZrX2NsYXNzXCI6IG51bWJlcjtcbiAgXCJzdHJpbmdcIjogc3RyaW5nO1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIGluY29taW5nX3N0YXRlbWVudHM/OiBJbmZTdGF0ZW1lbnRbXTtcbiAgY29uc3RydWN0b3IoZGF0YT86IEluZkFwcGVsbGF0aW9uSW50ZXJmYWNlKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBkYXRhKTtcbiAgfVxuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIG1vZGVsIHJlcHJlc2VudGVkIGJ5IHRoaXMgJHJlc291cmNlLFxuICAgKiBpLmUuIGBJbmZBcHBlbGxhdGlvbmAuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsTmFtZSgpIHtcbiAgICByZXR1cm4gXCJJbmZBcHBlbGxhdGlvblwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIEluZkFwcGVsbGF0aW9uIGZvciBkeW5hbWljIHB1cnBvc2VzLlxuICAqKi9cbiAgcHVibGljIHN0YXRpYyBmYWN0b3J5KGRhdGE6IEluZkFwcGVsbGF0aW9uSW50ZXJmYWNlKTogSW5mQXBwZWxsYXRpb257XG4gICAgcmV0dXJuIG5ldyBJbmZBcHBlbGxhdGlvbihkYXRhKTtcbiAgfVxuICAvKipcbiAgKiBAbWV0aG9kIGdldE1vZGVsRGVmaW5pdGlvblxuICAqIEBhdXRob3IgSnVsaWVuIExlZHVuXG4gICogQGxpY2Vuc2UgTUlUXG4gICogVGhpcyBtZXRob2QgcmV0dXJucyBhbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHNvbWUgb2YgdGhlIG1vZGVsXG4gICogZGVmaW5pdGlvbnMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGdldE1vZGVsRGVmaW5pdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogJ0luZkFwcGVsbGF0aW9uJyxcbiAgICAgIHBsdXJhbDogJ0luZkFwcGVsbGF0aW9ucycsXG4gICAgICBwYXRoOiAnSW5mQXBwZWxsYXRpb25zJyxcbiAgICAgIGlkTmFtZTogJ3BrX2VudGl0eScsXG4gICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIFwicXVpbGxfZG9jXCI6IHtcbiAgICAgICAgICBuYW1lOiAncXVpbGxfZG9jJyxcbiAgICAgICAgICB0eXBlOiAnYW55J1xuICAgICAgICB9LFxuICAgICAgICBcImZrX2NsYXNzXCI6IHtcbiAgICAgICAgICBuYW1lOiAnZmtfY2xhc3MnLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwic3RyaW5nXCI6IHtcbiAgICAgICAgICBuYW1lOiAnc3RyaW5nJyxcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJ1xuICAgICAgICB9LFxuICAgICAgICBcInBrX2VudGl0eVwiOiB7XG4gICAgICAgICAgbmFtZTogJ3BrX2VudGl0eScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzOiB7XG4gICAgICAgICAgbmFtZTogJ2VudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscycsXG4gICAgICAgICAgdHlwZTogJ1Byb0luZm9Qcm9qUmVsW10nLFxuICAgICAgICAgIG1vZGVsOiAnUHJvSW5mb1Byb2pSZWwnLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19lbnRpdHknXG4gICAgICAgIH0sXG4gICAgICAgIGluY29taW5nX3N0YXRlbWVudHM6IHtcbiAgICAgICAgICBuYW1lOiAnaW5jb21pbmdfc3RhdGVtZW50cycsXG4gICAgICAgICAgdHlwZTogJ0luZlN0YXRlbWVudFtdJyxcbiAgICAgICAgICBtb2RlbDogJ0luZlN0YXRlbWVudCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX29iamVjdF9pbmZvJ1xuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19