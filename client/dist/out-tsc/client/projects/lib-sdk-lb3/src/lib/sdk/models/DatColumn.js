export class DatColumn {
    constructor(data) {
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `DatColumn`.
     */
    static getModelName() {
        return "DatColumn";
    }
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of DatColumn for dynamic purposes.
    **/
    static factory(data) {
        return new DatColumn(data);
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
            name: 'DatColumn',
            plural: 'DatColumns',
            path: 'DatColumns',
            idName: 'pk_entity',
            properties: {
                "fk_digital": {
                    name: 'fk_digital',
                    type: 'number'
                },
                "fk_data_type": {
                    name: 'fk_data_type',
                    type: 'number'
                },
                "fk_column_content_type": {
                    name: 'fk_column_content_type',
                    type: 'number'
                },
                "fk_column_relationship_type": {
                    name: 'fk_column_relationship_type',
                    type: 'number'
                },
                "fk_original_column": {
                    name: 'fk_original_column',
                    type: 'number'
                },
                "is_imported": {
                    name: 'is_imported',
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
    }
}
//# sourceMappingURL=DatColumn.js.map