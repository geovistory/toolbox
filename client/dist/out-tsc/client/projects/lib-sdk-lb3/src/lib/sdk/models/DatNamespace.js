/* tslint:disable */
export class DatNamespace {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatNamespace`.
     */
    static getModelName() {
        return "DatNamespace";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatNamespace for dynamic purposes.
    **/
    static factory(data) {
        return new DatNamespace(data);
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
            name: 'DatNamespace',
            plural: 'DatNamespaces',
            path: 'DatNamespaces',
            idName: 'pk_entity',
            properties: {
                "pk_entity": {
                    name: 'pk_entity',
                    type: 'number'
                },
                "fk_root_namespace": {
                    name: 'fk_root_namespace',
                    type: 'number'
                },
                "fk_project": {
                    name: 'fk_project',
                    type: 'number'
                },
                "standard_label": {
                    name: 'standard_label',
                    type: 'string'
                },
            },
            relations: {}
        };
    }
}
//# sourceMappingURL=DatNamespace.js.map