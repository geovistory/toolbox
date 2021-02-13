/* tslint:disable */
export class SysSystemRelevantClass {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `SysSystemRelevantClass`.
     */
    static getModelName() {
        return "SysSystemRelevantClass";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of SysSystemRelevantClass for dynamic purposes.
    **/
    static factory(data) {
        return new SysSystemRelevantClass(data);
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
            name: 'SysSystemRelevantClass',
            plural: 'SysSystemRelevantClasses',
            path: 'SysSystemRelevantClasses',
            idName: 'pk_entity',
            properties: {
                "fk_class": {
                    name: 'fk_class',
                    type: 'number'
                },
                "required_by_entities": {
                    name: 'required_by_entities',
                    type: 'boolean'
                },
                "required_by_sources": {
                    name: 'required_by_sources',
                    type: 'boolean'
                },
                "required_by_basics": {
                    name: 'required_by_basics',
                    type: 'boolean'
                },
                "excluded_from_entities": {
                    name: 'excluded_from_entities',
                    type: 'boolean'
                },
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
            },
            relations: {}
        };
    }
}
//# sourceMappingURL=SysSystemRelevantClass.js.map