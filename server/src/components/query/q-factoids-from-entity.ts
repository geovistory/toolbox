import { FactoidEntity, FactoidStatement } from '../../controllers';
import { Postgres1DataSource } from '../../datasources';
import { P_1874_AT_POSITION_ID, P_1875_ANNOTATED_ENTITY_ID } from '../../ontome-ids';
import { SqlBuilderLb4Models } from '../../utils/sql-builders/sql-builder-lb4-models';

class RetrievedLine {
    fkdigital: number;
    fkfactoidmapping: number;
    fkclass: number;
    fkproperty: number;
    isoutgoing: boolean;
    value: string;
    fkrow: string;
    fkcolumn: string;
    pkentity: string;
    fkcell: string;
    header: boolean;
    fkdefault: string;
}


export class QFactoidsFromEntity extends SqlBuilderLb4Models {


    propAnnotationToCell = P_1874_AT_POSITION_ID
    propAnnotationToEntity = P_1875_ANNOTATED_ENTITY_ID

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
    async query(pkProject: string, pkEntity: string, offset: number, size: number): Promise<Array<FactoidEntity>> {

        // fetch all the factoids that has the entity as the matched value in the table
        this.params = [];
        this.sql = `
        WITH tw1 AS(
            -- factoid mappings of that person

            SELECT DISTINCT ON (fk_factoid_mapping, fk_row)
                t5.fk_factoid_mapping as fk_factoid_mapping,
                t4.fk_row as fk_row,
                t4.fk_column as fk_column
            FROM
                information.statement AS t1
            INNER JOIN projects.info_proj_rel AS t0 ON (t0.fk_entity = t1.pk_entity)
            INNER JOIN information.statement AS t2 ON t2.fk_subject_info = t1.fk_subject_info
            INNER JOIN projects.info_proj_rel AS t3 ON (t3.fk_entity = t2.pk_entity)
            INNER JOIN tables.cell AS t4 ON (pk_cell = t2.fk_object_tables_cell)
            INNER JOIN data.factoid_property_mapping AS t5 ON (t4.fk_column = t5.fk_column)
            INNER JOIN data.digital as t6 ON (t6.pk_entity = t4.fk_digital)
            INNER JOIN data.namespace as t7 ON (t7.pk_entity = t6.fk_namespace)
            WHERE
                t1.fk_object_info = ${this.addParam(pkEntity)}
                AND t1.fk_property = ${this.addParam(this.propAnnotationToEntity)}
                AND t2.fk_property = ${this.addParam(this.propAnnotationToCell)}
                AND t0.fk_project = ${this.addParam(pkProject)}
                AND t0.is_in_project = TRUE
                AND t7.fk_project = ${this.addParam(pkProject)}
        )
        -- the properties (factoid_property_mappings) of all the factoid mappings
        SELECT
            t2.fk_digital as fkDigital,
            t1.fk_factoid_mapping as fkFactoidMapping,
            t2.fk_class AS fkClass,
            t3.fk_property AS fkProperty,
            t3.is_outgoing as isOutgoing,
            coalesce(t5.numeric_value::text, t5.string_value) AS value,
            t5.fk_row as fkRow,
            t8.pkentity as pkEntity,
            t5.pk_cell as fkCell,
            t3.fk_default as fkDefault
        FROM tw1 as t1
        INNER JOIN data.factoid_mapping AS t2 ON (t2.pk_entity = t1.fk_factoid_mapping)
        INNER JOIN data.factoid_property_mapping AS t3 ON (t2.pk_entity = t3.fk_factoid_mapping)
        INNER JOIN tables.cell AS t5 ON (t1.fk_row = t5.fk_row AND t5.fk_column = t3.fk_column)
        LEFT JOIN LATERAL (
            SELECT t8.fk_object_info as pkEntity
            FROM information.statement as t6
            INNER JOIN projects.info_proj_rel AS t7
                ON (t6.pk_entity = t7.fk_entity)
                AND t7.is_in_project = TRUE
                AND t7.fk_project = ${this.addParam(pkProject)}
            INNER JOIN information.statement as t8
                ON t8.fk_subject_info = t6.fk_subject_info
                AND t8.fk_property = ${this.addParam(this.propAnnotationToEntity)}
            INNER JOIN projects.info_proj_rel AS t9
                    ON (t8.pk_entity = t9.fk_entity)
                    AND t9.is_in_project = TRUE
                    AND t9.fk_project = ${this.addParam(pkProject)}
            WHERE t6.fk_object_tables_cell = t5.pk_cell
            AND t6.fk_property = ${this.addParam(this.propAnnotationToCell)}
        ) t8 ON true

        -- Works for now because a cell can only be in one project.
        -- If in the future a cell can be in multiple projects, think of filtering the statements (t6) on the project
        `;

        const factoidsEntities: Array<FactoidEntity> = [];

        this.getBuiltQuery();
        const result = await this.execute<Array<RetrievedLine>>();
        const localFactoidEntities: Array<FactoidEntity> = [];

        result.forEach(line => {
            // maybe it is already created ? if yes, take it, if not, create it
            const existingIndex = localFactoidEntities.findIndex(lfe => lfe.pkDigital == line.fkdigital && lfe.pkClass == line.fkclass && lfe.pkRow === parseInt(line.fkrow) && lfe.pkFactoidMapping == line.fkfactoidmapping)
            const localFactoidEntity = existingIndex == -1 ? new FactoidEntity(line.fkdigital, line.fkclass, parseInt(line.fkrow), line.fkfactoidmapping) : localFactoidEntities[existingIndex];

            /* The following code could be refactored, but for the maintenance sake, we let it as it is */

            // we take care of the statement
            // We create it
            const statement = new FactoidStatement(line.fkproperty, line.isoutgoing, line.value, parseInt(line.pkentity), parseInt(line.fkcell), parseInt(line.fkdefault));
            // Could it be a header statement:
            const couldBeHeader = parseInt(line.pkentity) === parseInt(pkEntity) || (line.pkentity == null && parseInt(line.fkdefault) === parseInt(pkEntity))
            // If it could be a header and the Factoid entity has none: Put in the header:
            if (couldBeHeader && localFactoidEntity.headerStatements.length == 0) localFactoidEntity.headerStatements.push(statement)
            // If it could be a header and the Factoid already has one: Put in the body:
            else if (couldBeHeader && localFactoidEntity.headerStatements.length != 0) localFactoidEntity.bodyStatements.push(statement)
            // If none of this is the case, we put it in the body:
            else localFactoidEntity.bodyStatements.push(statement)

            // we add it to the local list only if it is new
            if (existingIndex == -1) localFactoidEntities.push(localFactoidEntity)
        })

        // we add them to the global list. The distinction between local and global is made so that it does not wrap Factoid entities in case of the classes are the same for the same columns
        factoidsEntities.push(...localFactoidEntities)


        // fetch all the factoids that has the entity as the default value in the factoid property mapping but has no matching in the table

        // First we query all the couples (digital, column) that has the wanted default matchings (only in the project!)
        this.params = []
        this.sql = `
            select distinct
                fm.fk_digital as pkdigital,
                fm.pk_entity as pkfm,
                fpm.fk_column as pkcolumn,
                fpm.pk_entity as pkfpm
            from
                data.factoid_property_mapping fpm
                inner join data.factoid_mapping fm on fpm.fk_factoid_mapping = fm.pk_entity
                inner join data.digital d on d.pk_entity = fm.fk_digital
                inner join data."namespace" n on n.pk_entity  = d.fk_namespace
            where
                fpm.fk_default = ${this.addParam(pkEntity)}
            and n.fk_project = ${this.addParam(pkProject)}
        `
        this.getBuiltQuery();
        const digColsFpms = await this.execute<Array<{ pkdigital: number, pkcolumn: number, pkfpm: number, pkfm: number }>>();

        const defaults = [];
        for (const digcol of digColsFpms) {
            this.params = [];
            this.sql = `
            with cells as (
                select
                    ${digcol.pkdigital} as pkdigital,
                    r.pk_row as pkrow,
                    c.pk_cell as pkcell,
                    ${digcol.pkcolumn} as pkcolumn,
                    coalesce(c.numeric_value::text, c.string_value) AS value
                from
                    tables.row r
                    left join tables.cell_${digcol.pkdigital} c on c.fk_row = r.pk_row and c.fk_column = ${digcol.pkcolumn}
                where
                    r.fk_digital = ${digcol.pkdigital}
            )
            ,tw1 AS (
                -- all the cells that are in the columns of fpm that have the entity as default:
                select
                    c.pkcell,
                    c.pkrow,
                    c.pkcolumn,
                    c.value,
                    fpm.pk_entity
                FROM
                    data.factoid_property_mapping fpm
                    LEFT JOIN cells c ON c.pkcolumn = ${digcol.pkcolumn}
                WHERE
                    fpm.fk_default = ${this.addParam(pkEntity)}
                AND fpm.fk_column = ${digcol.pkcolumn}
            )
            ,tw2 AS (
                    SELECT tw1.*
                    FROM tw1
                    -- left join the matchings in the project:
                    LEFT JOIN LATERAL (
                        SELECT s.pk_entity
                        FROM information.statement s
                        INNER JOIN	projects.info_proj_rel ipr
                            ON s.pk_entity = ipr.fk_entity
                            AND ipr.is_in_project = TRUE
                            AND ipr.fk_project = ${this.addParam(pkProject)}
                        WHERE s.fk_object_tables_cell = tw1.pkcell
                        AND s.fk_property = ${this.addParam(P_1874_AT_POSITION_ID)}
                    ) as statements ON true

                    -- exclude the ones that have a matching in the project:
                    WHERE statements.pk_entity IS NULL
            )

            SELECT distinct
                tw2.value as value1
                ,fm.fk_digital as fkDigital
                ,fm.pk_entity as fkFactoidMapping
                ,fm.fk_class as fkClass
                ,fpm2.fk_property as fkProperty
                ,fpm2.is_outgoing as isOutgoing
                ,case when c2.pk_cell is not null then coalesce(c2.numeric_value::text, c2.string_value) else '' end as value
                ,tw2.pkrow as fkRow
                ,fpm2.fk_column as fkColumn
                ,ss.fk_object_info as pkEntity
                ,c2.pk_cell as fkCell
                ,case when ss.fk_object_info is not null then null else fpm2.fk_default end as fkDefault
            FROM
                data.factoid_property_mapping fpm
                LEFT JOIN tw2 ON tw2.pkcolumn = fpm.fk_column
                -- we want the fm of these fpm:
                LEFT JOIN data.factoid_mapping fm ON fm.pk_entity = fpm.fk_factoid_mapping
                -- we look for the others fpm of these fm:
                LEFT JOIN data.factoid_property_mapping fpm2 ON fpm2.fk_factoid_mapping = fm.pk_entity
                -- and the cells they point (via column and row):
                LEFT JOIN tables.cell c2 ON c2.fk_column = fpm2.fk_column
                    AND c2.fk_row = tw2.pkrow
                    -- if the cells has a mathcing, we need it:
                LEFT JOIN (
                    SELECT
                        t3.fk_object_info,
                        t1.fk_object_tables_cell,
                        t2.is_in_project
                    FROM
                        information.statement t1,
                        projects.info_proj_rel t2,
                        information.statement t3,
                        projects.info_proj_rel t4


                    WHERE t1.fk_property = ${this.addParam(P_1874_AT_POSITION_ID)}
                    AND t2.fk_entity = t1.pk_entity
                    AND t2.is_in_project = TRUE

                    AND t3.fk_property = ${this.addParam(P_1875_ANNOTATED_ENTITY_ID)}
                    AND t3.fk_subject_info = t1.fk_subject_info
                    AND t4.fk_entity = t3.pk_entity
                    AND t4.is_in_project = TRUE
                ) ss ON ss.fk_object_tables_cell = c2.pk_cell
            WHERE
                fpm.fk_default = ${this.addParam(pkEntity)}
                and fpm.pk_entity = ${digcol.pkfpm}
            `

            this.getBuiltQuery();
            const result = await this.execute<Array<RetrievedLine>>();
            const localFactoidEntities: Array<FactoidEntity> = [];

            result.forEach(line => {
                // maybe it is already created ? if yes, take it, if not, create it
                const existingIndex = localFactoidEntities.findIndex(lfe => lfe.pkRow === parseInt(line.fkrow))
                const localFactoidEntity = existingIndex == -1 ? new FactoidEntity(line.fkdigital, line.fkclass, parseInt(line.fkrow), line.fkfactoidmapping) : localFactoidEntities[existingIndex];

                /* The following code could be refactored, but for the maintenance sake, we let it as it is */

                // we take care of the statement
                // We create it
                const statement = new FactoidStatement(line.fkproperty, line.isoutgoing, line.value, parseInt(line.pkentity), parseInt(line.fkcell), parseInt(line.fkdefault));
                // Could it be a header statement:
                const isHeader = (parseInt(line.pkentity) === parseInt(pkEntity) || (line.pkentity == null && parseInt(line.fkdefault) === parseInt(pkEntity))) && digcol.pkcolumn == parseInt(line.fkcolumn)
                // If it could be a header and the Factoid entity has none: Put in the header:
                if (isHeader && localFactoidEntity.headerStatements.length == 0) localFactoidEntity.headerStatements.push(statement)
                // If it could be a header and the Factoid already has one: Put in the body:
                else if (isHeader && localFactoidEntity.headerStatements.length != 0) localFactoidEntity.bodyStatements.push(statement)
                // If none of this is the case, we put it in the body:
                else localFactoidEntity.bodyStatements.push(statement)

                // we add it to the local list only if it is new
                if (existingIndex == -1) localFactoidEntities.push(localFactoidEntity)
            })

            // we add them to the global list. The distinction between local and global is made so that it does not wrap Factoid entities in case of the classes are the same for the same columns
            factoidsEntities.push(...localFactoidEntities)
        }

        return factoidsEntities
    }

    async getFactoidNumber(pkProject: string, pkEntity: string) {
        this.params = [];
        this.sql = `
            SELECT
                count(DISTINCT (t3.fk_factoid_mapping, t2.fk_row)) as length
            FROM
                information.statement AS t1
            INNER JOIN projects.info_proj_rel AS t0 ON (t0.fk_entity = t1.pk_entity)
            INNER JOIN tables.cell AS t2 ON (pk_cell = fk_subject_tables_cell)
            INNER JOIN data.factoid_property_mapping AS t3 ON (t2.fk_column = t3.fk_column)
            INNER JOIN data.digital as t4 ON (t4.pk_entity = t2.fk_digital)
            INNER JOIN data.namespace as t5 ON (t5.pk_entity = t4.fk_namespace)
            WHERE
                fk_object_info = ${this.addParam(pkEntity)}
                AND t1.fk_property = 1334
                AND t0.fk_project = ${this.addParam(pkProject)}
                AND t0.is_in_project = TRUE
                AND t5.fk_project = ${this.addParam(pkProject)}
            `;

        this.getBuiltQuery()
        return this.execute<Array<{ length: string }>>();
    }

    async getDefaultFactoidNumber(pkProject: string, pkEntity: string) {
        this.params = [];
        this.sql = `

            WITH tw1 AS (
                -- all the cells that are in the columns of fpm that have the entity as default:
                SELECT
                    c.pk_cell,
                    c.fk_row,
                    c.fk_column,
                    coalesce(c.numeric_value::text, c.string_value) AS value,
                    fpm.pk_entity
                FROM
                    data.factoid_property_mapping fpm
                    LEFT JOIN tables.cell c ON c.fk_column = fpm.fk_column
                WHERE
                    fpm.fk_default = ${this.addParam(pkEntity)}
            ),
            tw2 AS (
                    SELECT tw1.*
                    FROM tw1
                    -- left join the matchings in the project:
                    LEFT JOIN LATERAL (
                        SELECT s.pk_entity
                        FROM information.statement s
                        INNER JOIN	projects.info_proj_rel ipr
                            ON s.pk_entity = ipr.fk_entity
                            AND ipr.is_in_project = TRUE
                            AND ipr.fk_project = ${this.addParam(pkProject)}
                        WHERE s.fk_subject_tables_cell = tw1.pk_cell
                        AND s.fk_property = 1334
                    ) as statements ON true

                    -- exclude the ones that have a matching in the project:
                    WHERE statements.pk_entity IS NULL
            )
            SELECT
                count(DISTINCT (fpm.fk_factoid_mapping, tw2.fk_row)) as length
            FROM
                data.factoid_property_mapping fpm
                LEFT JOIN tw2 ON tw2.fk_column = fpm.fk_column
                -- we want the fm of these fpm:
                LEFT JOIN data.factoid_mapping fm ON fm.pk_entity = fpm.fk_factoid_mapping
                -- we look for the others fpm of these fm:
                LEFT JOIN data.factoid_property_mapping fpm2 ON fpm2.fk_factoid_mapping = fm.pk_entity
                -- and the cells they point (via column and row):
                LEFT JOIN tables.cell c2 ON c2.fk_column = fpm2.fk_column
                    AND c2.fk_row = tw2.fk_row
                    -- if the cells has a mathcing, we need it:
                LEFT JOIN (
                    SELECT
                        s.fk_object_info,
                        fk_subject_tables_cell
                    FROM
                        information.statement s
                        INNER JOIN projects.info_proj_rel ipr2 ON (ipr2.fk_entity = s.pk_entity
                                AND ipr2.is_in_project = TRUE)
                    WHERE
                        s.fk_property = 1334) ss ON ss.fk_subject_tables_cell = c2.pk_cell
            WHERE
                fpm.fk_default = ${this.addParam(pkEntity)}


        `;

        this.getBuiltQuery()
        return this.execute<Array<{ length: string }>>();
    }


    async getFactoidMappingAsDefaultValue(pkEntity: string, offset: number, size: number): Promise<Array<FactoidEntity>> {


        this.getBuiltQuery();
        return this.execute<Array<RetrievedLine>>().then(result => {
            const factoidsEntities: Array<FactoidEntity> = [];
            result.forEach(line => {
                let target = factoidsEntities
                    .filter(fe => fe.pkClass === line.fkclass && fe.pkRow === parseInt(line.fkrow) && fe.pkFactoidMapping === line.fkfactoidmapping)[0];
                if (!target) {
                    target = new FactoidEntity(line.fkdigital, line.fkclass, parseInt(line.fkrow), line.fkfactoidmapping);
                    factoidsEntities.push(target);
                }

                const statement = new FactoidStatement(line.fkproperty, line.isoutgoing, line.value, parseInt(line.pkentity), parseInt(line.fkcell), parseInt(line.fkdefault));
                if (parseInt(line.pkentity) === parseInt(pkEntity)) target.headerStatements.push(statement);
                else target.bodyStatements.push(statement);


                // if (line.header) {
                //     target.bodyStatements = target.bodyStatements.filter(stm => stm.pkCell !== statement.pkCell);
                //     target.headerStatements.push(statement);
                // } else if (!target.headerStatements.some(stm => stm.pkCell === statement.pkCell)) target.bodyStatements.push(statement);
            });
            return factoidsEntities.sort((a, b) => a.pkClass - b.pkClass)
                .slice(offset, offset + size);
        });
    }
}
