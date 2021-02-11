var ProProject = /** @class */ (function () {
    function ProProject(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `ProProject`.
     */
    ProProject.getModelName = function () {
        return "ProProject";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of ProProject for dynamic purposes.
    **/
    ProProject.factory = function (data) {
        return new ProProject(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    ProProject.getModelDefinition = function () {
        return {
            name: 'ProProject',
            plural: 'ProProjects',
            path: 'ProProjects',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_language": {
                    name: 'fk_language',
                    type: 'number'
                },
            },
            relations: {
                accounts: {
                    name: 'accounts',
                    type: 'PubAccount[]',
                    model: 'PubAccount',
                    relationType: 'hasMany',
                    modelThrough: 'PubAccountProjectRel',
                    keyThrough: 'account_id',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                text_properties: {
                    name: 'text_properties',
                    type: 'ProTextProperty[]',
                    model: 'ProTextProperty',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                entity_version_project_rels: {
                    name: 'entity_version_project_rels',
                    type: 'ProInfoProjRel[]',
                    model: 'ProInfoProjRel',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                default_language: {
                    name: 'default_language',
                    type: 'InfLanguage',
                    model: 'InfLanguage',
                    relationType: 'belongsTo',
                    keyFrom: 'fk_language',
                    keyTo: 'pk_entity'
                },
                persistent_items: {
                    name: 'persistent_items',
                    type: 'InfPersistentItem[]',
                    model: 'InfPersistentItem',
                    relationType: 'hasMany',
                    modelThrough: 'ProInfoProjRel',
                    keyThrough: 'fk_entity',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
                namespaces: {
                    name: 'namespaces',
                    type: 'DatNamespace[]',
                    model: 'DatNamespace',
                    relationType: 'hasMany',
                    keyFrom: 'pk_entity',
                    keyTo: 'fk_project'
                },
            }
        };
    };
    return ProProject;
}());
export { ProProject };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvUHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BrbGVpb2xhYi9saWItc2RrLWxiMy8iLCJzb3VyY2VzIjpbIm1vZGVscy9Qcm9Qcm9qZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCQTtJQVNFLG9CQUFZLElBQTBCO1FBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRDs7O09BR0c7SUFDVyx1QkFBWSxHQUExQjtRQUNFLE9BQU8sWUFBWSxDQUFDO0lBQ3RCLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNXLGtCQUFPLEdBQXJCLFVBQXNCLElBQXlCO1FBQzdDLE9BQU8sSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNEOzs7Ozs7T0FNRztJQUNXLDZCQUFrQixHQUFoQztRQUNFLE9BQU87WUFDTCxJQUFJLEVBQUUsWUFBWTtZQUNsQixNQUFNLEVBQUUsYUFBYTtZQUNyQixJQUFJLEVBQUUsYUFBYTtZQUNuQixNQUFNLEVBQUUsV0FBVztZQUNuQixVQUFVLEVBQUU7Z0JBQ1YsV0FBVyxFQUFFO29CQUNYLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsUUFBUTtpQkFDZjtnQkFDRCxhQUFhLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxRQUFRO2lCQUNmO2FBQ0Y7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFO29CQUNSLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsY0FBYztvQkFDcEIsS0FBSyxFQUFFLFlBQVk7b0JBQ25CLFlBQVksRUFBRSxTQUFTO29CQUN2QixZQUFZLEVBQUUsc0JBQXNCO29CQUNwQyxVQUFVLEVBQUUsWUFBWTtvQkFDeEIsT0FBTyxFQUFFLFdBQVc7b0JBQ3BCLEtBQUssRUFBRSxZQUFZO2lCQUNwQjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsSUFBSSxFQUFFLGlCQUFpQjtvQkFDdkIsSUFBSSxFQUFFLG1CQUFtQjtvQkFDekIsS0FBSyxFQUFFLGlCQUFpQjtvQkFDeEIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxZQUFZO2lCQUNwQjtnQkFDRCwyQkFBMkIsRUFBRTtvQkFDM0IsSUFBSSxFQUFFLDZCQUE2QjtvQkFDbkMsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsS0FBSyxFQUFFLGdCQUFnQjtvQkFDdkIsWUFBWSxFQUFFLFNBQVM7b0JBQ2YsT0FBTyxFQUFFLFdBQVc7b0JBQzVCLEtBQUssRUFBRSxZQUFZO2lCQUNwQjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLEtBQUssRUFBRSxhQUFhO29CQUNwQixZQUFZLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLGFBQWE7b0JBQzlCLEtBQUssRUFBRSxXQUFXO2lCQUNuQjtnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDaEIsSUFBSSxFQUFFLGtCQUFrQjtvQkFDeEIsSUFBSSxFQUFFLHFCQUFxQjtvQkFDM0IsS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsWUFBWSxFQUFFLFNBQVM7b0JBQ3ZCLFlBQVksRUFBRSxnQkFBZ0I7b0JBQzlCLFVBQVUsRUFBRSxXQUFXO29CQUN2QixPQUFPLEVBQUUsV0FBVztvQkFDcEIsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2dCQUNELFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsSUFBSSxFQUFFLGdCQUFnQjtvQkFDdEIsS0FBSyxFQUFFLGNBQWM7b0JBQ3JCLFlBQVksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxXQUFXO29CQUM1QixLQUFLLEVBQUUsWUFBWTtpQkFDcEI7YUFDRjtTQUNGLENBQUE7SUFDSCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBM0dELElBMkdDIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIFB1YkFjY291bnQsXG4gIFByb1RleHRQcm9wZXJ0eSxcbiAgUHJvSW5mb1Byb2pSZWwsXG4gIEluZkxhbmd1YWdlLFxuICBJbmZQZXJzaXN0ZW50SXRlbSxcbiAgRGF0TmFtZXNwYWNlXG59IGZyb20gJy4uL2luZGV4JztcblxuZGVjbGFyZSB2YXIgT2JqZWN0OiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIFByb1Byb2plY3RJbnRlcmZhY2Uge1xuICBcInBrX2VudGl0eVwiPzogbnVtYmVyO1xuICBcImZrX2xhbmd1YWdlXCI/OiBudW1iZXI7XG4gIGFjY291bnRzPzogUHViQWNjb3VudFtdO1xuICB0ZXh0X3Byb3BlcnRpZXM/OiBQcm9UZXh0UHJvcGVydHlbXTtcbiAgZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzPzogUHJvSW5mb1Byb2pSZWxbXTtcbiAgZGVmYXVsdF9sYW5ndWFnZT86IEluZkxhbmd1YWdlO1xuICBwZXJzaXN0ZW50X2l0ZW1zPzogSW5mUGVyc2lzdGVudEl0ZW1bXTtcbiAgbmFtZXNwYWNlcz86IERhdE5hbWVzcGFjZVtdO1xufVxuXG5leHBvcnQgY2xhc3MgUHJvUHJvamVjdCBpbXBsZW1lbnRzIFByb1Byb2plY3RJbnRlcmZhY2Uge1xuICBcInBrX2VudGl0eVwiOiBudW1iZXI7XG4gIFwiZmtfbGFuZ3VhZ2VcIjogbnVtYmVyO1xuICBhY2NvdW50cz86IFB1YkFjY291bnRbXTtcbiAgdGV4dF9wcm9wZXJ0aWVzPzogUHJvVGV4dFByb3BlcnR5W107XG4gIGVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscz86IFByb0luZm9Qcm9qUmVsW107XG4gIGRlZmF1bHRfbGFuZ3VhZ2U/OiBJbmZMYW5ndWFnZTtcbiAgcGVyc2lzdGVudF9pdGVtcz86IEluZlBlcnNpc3RlbnRJdGVtW107XG4gIG5hbWVzcGFjZXM/OiBEYXROYW1lc3BhY2VbXTtcbiAgY29uc3RydWN0b3IoZGF0YT86IFByb1Byb2plY3RJbnRlcmZhY2UpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbW9kZWwgcmVwcmVzZW50ZWQgYnkgdGhpcyAkcmVzb3VyY2UsXG4gICAqIGkuZS4gYFByb1Byb2plY3RgLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRNb2RlbE5hbWUoKSB7XG4gICAgcmV0dXJuIFwiUHJvUHJvamVjdFwiO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZmFjdG9yeVxuICAqIEBhdXRob3IgSm9uYXRoYW4gQ2FzYXJydWJpYXNcbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIGluc3RhbmNlIG9mIFByb1Byb2plY3QgZm9yIGR5bmFtaWMgcHVycG9zZXMuXG4gICoqL1xuICBwdWJsaWMgc3RhdGljIGZhY3RvcnkoZGF0YTogUHJvUHJvamVjdEludGVyZmFjZSk6IFByb1Byb2plY3R7XG4gICAgcmV0dXJuIG5ldyBQcm9Qcm9qZWN0KGRhdGEpO1xuICB9XG4gIC8qKlxuICAqIEBtZXRob2QgZ2V0TW9kZWxEZWZpbml0aW9uXG4gICogQGF1dGhvciBKdWxpZW4gTGVkdW5cbiAgKiBAbGljZW5zZSBNSVRcbiAgKiBUaGlzIG1ldGhvZCByZXR1cm5zIGFuIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgc29tZSBvZiB0aGUgbW9kZWxcbiAgKiBkZWZpbml0aW9ucy5cbiAgKiovXG4gIHB1YmxpYyBzdGF0aWMgZ2V0TW9kZWxEZWZpbml0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAnUHJvUHJvamVjdCcsXG4gICAgICBwbHVyYWw6ICdQcm9Qcm9qZWN0cycsXG4gICAgICBwYXRoOiAnUHJvUHJvamVjdHMnLFxuICAgICAgaWROYW1lOiAncGtfZW50aXR5JyxcbiAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgXCJwa19lbnRpdHlcIjoge1xuICAgICAgICAgIG5hbWU6ICdwa19lbnRpdHknLFxuICAgICAgICAgIHR5cGU6ICdudW1iZXInXG4gICAgICAgIH0sXG4gICAgICAgIFwiZmtfbGFuZ3VhZ2VcIjoge1xuICAgICAgICAgIG5hbWU6ICdma19sYW5ndWFnZScsXG4gICAgICAgICAgdHlwZTogJ251bWJlcidcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICByZWxhdGlvbnM6IHtcbiAgICAgICAgYWNjb3VudHM6IHtcbiAgICAgICAgICBuYW1lOiAnYWNjb3VudHMnLFxuICAgICAgICAgIHR5cGU6ICdQdWJBY2NvdW50W10nLFxuICAgICAgICAgIG1vZGVsOiAnUHViQWNjb3VudCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgbW9kZWxUaHJvdWdoOiAnUHViQWNjb3VudFByb2plY3RSZWwnLFxuICAgICAgICAgIGtleVRocm91Z2g6ICdhY2NvdW50X2lkJyxcbiAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX3Byb2plY3QnXG4gICAgICAgIH0sXG4gICAgICAgIHRleHRfcHJvcGVydGllczoge1xuICAgICAgICAgIG5hbWU6ICd0ZXh0X3Byb3BlcnRpZXMnLFxuICAgICAgICAgIHR5cGU6ICdQcm9UZXh0UHJvcGVydHlbXScsXG4gICAgICAgICAgbW9kZWw6ICdQcm9UZXh0UHJvcGVydHknLFxuICAgICAgICAgIHJlbGF0aW9uVHlwZTogJ2hhc01hbnknLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ3BrX2VudGl0eScsXG4gICAgICAgICAga2V5VG86ICdma19wcm9qZWN0J1xuICAgICAgICB9LFxuICAgICAgICBlbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHM6IHtcbiAgICAgICAgICBuYW1lOiAnZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzJyxcbiAgICAgICAgICB0eXBlOiAnUHJvSW5mb1Byb2pSZWxbXScsXG4gICAgICAgICAgbW9kZWw6ICdQcm9JbmZvUHJvalJlbCcsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgICAgICAgICBrZXlGcm9tOiAncGtfZW50aXR5JyxcbiAgICAgICAgICBrZXlUbzogJ2ZrX3Byb2plY3QnXG4gICAgICAgIH0sXG4gICAgICAgIGRlZmF1bHRfbGFuZ3VhZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnZGVmYXVsdF9sYW5ndWFnZScsXG4gICAgICAgICAgdHlwZTogJ0luZkxhbmd1YWdlJyxcbiAgICAgICAgICBtb2RlbDogJ0luZkxhbmd1YWdlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdiZWxvbmdzVG8nLFxuICAgICAgICAgICAgICAgICAga2V5RnJvbTogJ2ZrX2xhbmd1YWdlJyxcbiAgICAgICAgICBrZXlUbzogJ3BrX2VudGl0eSdcbiAgICAgICAgfSxcbiAgICAgICAgcGVyc2lzdGVudF9pdGVtczoge1xuICAgICAgICAgIG5hbWU6ICdwZXJzaXN0ZW50X2l0ZW1zJyxcbiAgICAgICAgICB0eXBlOiAnSW5mUGVyc2lzdGVudEl0ZW1bXScsXG4gICAgICAgICAgbW9kZWw6ICdJbmZQZXJzaXN0ZW50SXRlbScsXG4gICAgICAgICAgcmVsYXRpb25UeXBlOiAnaGFzTWFueScsXG4gICAgICAgICAgbW9kZWxUaHJvdWdoOiAnUHJvSW5mb1Byb2pSZWwnLFxuICAgICAgICAgIGtleVRocm91Z2g6ICdma19lbnRpdHknLFxuICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfcHJvamVjdCdcbiAgICAgICAgfSxcbiAgICAgICAgbmFtZXNwYWNlczoge1xuICAgICAgICAgIG5hbWU6ICduYW1lc3BhY2VzJyxcbiAgICAgICAgICB0eXBlOiAnRGF0TmFtZXNwYWNlW10nLFxuICAgICAgICAgIG1vZGVsOiAnRGF0TmFtZXNwYWNlJyxcbiAgICAgICAgICByZWxhdGlvblR5cGU6ICdoYXNNYW55JyxcbiAgICAgICAgICAgICAgICAgIGtleUZyb206ICdwa19lbnRpdHknLFxuICAgICAgICAgIGtleVRvOiAnZmtfcHJvamVjdCdcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==