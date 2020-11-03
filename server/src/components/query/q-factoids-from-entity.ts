import { Factoid } from '../../controllers';
import { Postgres1DataSource } from '../../datasources';
import { GvSchemaObject } from '../../models/gv-schema-object.model';
import { SqlBuilderLb4Models } from '../../utils/sql-builders/sql-builder-lb4-models';


export class QFactoidsFromEntity extends SqlBuilderLb4Models {

    constructor(
        dataSource: Postgres1DataSource,
    ) {
        super(dataSource)
    }

    /**
     *
     * @param {*} pkProject
     * @param {*} pkEntity primary key of the entity we want factoids from.
     */
    async query(pkProject: string, pkEntity: string): Promise<Array<Factoid>> {

        this.sql = `
        WITH tw1 AS(
        -- factoid mappings of that person
        SELECT 
            t3.fk_factoid_mapping,
            t2.fk_row
        FROM 
            information.statement AS t1
        INNER JOIN projects.info_proj_rel AS t0 ON (t0.fk_entity = t1.pk_entity)
        INNER JOIN tables.cell AS t2 ON (pk_cell = fk_subject_tables_cell)
        INNER JOIN data.factoid_role_mapping AS t3 ON (t2.fk_column = t3.fk_column)
        INNER JOIN data.digital as t4 ON (t4.pk_entity = t2.fk_digital)
        INNER JOIN data.namespace as t5 ON (t5.pk_entity = t4.fk_namespace)
        WHERE
            fk_object_info = ${this.addParam(pkEntity)}
            AND t1.fk_property = 1334
            AND t0.fk_project = ${this.addParam(pkProject)}
            AND t0.is_in_project = TRUE
            AND t5.fk_project = ${this.addParam(pkProject)}
        )
        -- the roles (factoid_role_mappings) of all the factoid mappings
        SELECT
            t2.fk_digital as fkDigital,
            t1.fk_factoid_mapping as fkFactoidMapping,
            t2.fk_class AS fkClass,
            t3.fk_property AS fkProperty,
            coalesce(t5.numeric_value::text, t5.string_value) AS value,
            t6.fk_object_info
        FROM tw1 as t1
        INNER JOIN data.factoid_mapping AS t2 ON (t2.pk_entity = t1.fk_factoid_mapping)
        INNER JOIN data.factoid_role_mapping AS t3 ON (t2.pk_entity = t3.fk_factoid_mapping)
        INNER JOIN tables.cell AS t5 ON (t1.fk_row = t5.fk_row AND t5.fk_column = t3.fk_column) 
        LEFT JOIN information.statement as t6 ON (t6.fk_subject_tables_cell = t5.pk_cell AND t6.fk_property = 1334)
        -- Works for now because a cell can only be in one project. 
        -- If in the future a cell can be in multiple projects, think of filtering the statements (t6) on the project
        `;        
        
        this.getBuiltQuery()
        return this.execute<Array<Factoid>>();
    }
}
