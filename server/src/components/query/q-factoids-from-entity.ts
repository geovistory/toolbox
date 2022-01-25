import {FactoidEntity, FactoidStatement} from '../../controllers';
import {Postgres1DataSource} from '../../datasources';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';

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
                t3.fk_factoid_mapping as fk_factoid_mapping,
                t2.fk_row as fk_row,
                t2.fk_column as fk_column
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
                t8.fk_object_info as pkEntity,
                t5.pk_cell as fkCell,
                t3.fk_default as fkDefault
            FROM tw1 as t1
            INNER JOIN data.factoid_mapping AS t2 ON (t2.pk_entity = t1.fk_factoid_mapping)
            INNER JOIN data.factoid_property_mapping AS t3 ON (t2.pk_entity = t3.fk_factoid_mapping)
            INNER JOIN tables.cell AS t5 ON (t1.fk_row = t5.fk_row AND t5.fk_column = t3.fk_column)
            LEFT JOIN LATERAL (
                    SELECT *
                    FROM information.statement as t6
                    INNER JOIN projects.info_proj_rel AS t7 ON (t6.pk_entity = t7.fk_entity) AND t7.is_in_project = TRUE AND t7.fk_project = ${this.addParam(pkProject)}
                    WHERE t6.fk_subject_tables_cell = t5.pk_cell AND t6.fk_property = 1334
            ) t8 ON true

        -- Works for now because a cell can only be in one project.
        -- If in the future a cell can be in multiple projects, think of filtering the statements (t6) on the project
        `;

        this.getBuiltQuery();
        const firstQuery = this.execute<Array<RetrievedLine>>()


        // fetch all the factoids that has the entity as the default value in the factoid property mapping but has no matching in the table
        this.params = [];
        this.sql = `
            select distinct
                c1.value as value1
                ,fm.fk_digital as fkDigital
                ,fm.pk_entity as fkFactoidMapping
                ,fm.fk_class as fkClass
                ,fpm2.fk_property as fkProperty
                ,fpm2.is_outgoing as isOutgoing
                ,case when c2.pk_cell is not null then coalesce(c2.numeric_value::text, c2.string_value) else '' end as value
                ,c1.fk_row as fkRow
                ,fpm2.fk_column as fkColumn
                ,ss.fk_object_info as pkEntity
                ,c2.pk_cell as fkCell
                ,case when ss.fk_object_info is not null then null else fpm2.fk_default end as fkDefault
            from
                data.factoid_property_mapping fpm
                left join (
                    -- all the cells that are in the columns of fpm that have the entity as default:
                    select
                        c.pk_cell,
                        c.fk_row,
                        c.fk_column,
                        coalesce(c.numeric_value::text, c.string_value) as value
                    from data.factoid_property_mapping fpm
                    left join tables.cell c on c.fk_column = fpm.fk_column
                    where fpm.fk_default = ${this.addParam(pkEntity)}
                    -- except the ones that have a matching in the project:
                    except
                    select
                        c.pk_cell,
                        c.fk_row,
                        c.fk_column,
                        coalesce(c.numeric_value::text, c.string_value) as value
                    from data.factoid_property_mapping fpm
                    left join tables.cell c on c.fk_column = fpm.fk_column
                    left join information.statement s on s.fk_subject_tables_cell = c.pk_cell and s.fk_property = 1334
                    inner join projects.info_proj_rel ipr on s.pk_entity = ipr.fk_entity and ipr.is_in_project = true
                    where fpm.fk_default = ${this.addParam(pkEntity)}
                    ) as c1 on c1.fk_column = fpm.fk_column
                -- we want the fm of these fpm:
                left join data.factoid_mapping fm on fm.pk_entity = fpm.fk_factoid_mapping
                -- we look for the others fpm of these fm:
                left join data.factoid_property_mapping fpm2 on fpm2.fk_factoid_mapping = fm.pk_entity
                -- and the cells they point (via column and row):
                left join tables.cell c2 on c2.fk_column = fpm2.fk_column and c2.fk_row = c1.fk_row
                -- if the cells has a mathcing, we need it:
                left join (
                    select s.fk_object_info, fk_subject_tables_cell
                    from information.statement s
                    inner join projects.info_proj_rel ipr2 on (ipr2.fk_entity = s.pk_entity and ipr2.is_in_project = true)
                    where s.fk_property = 1334
                ) ss on ss.fk_subject_tables_cell = c2.pk_cell
            where fpm.fk_default = ${this.addParam(pkEntity)} and c1.pk_cell is not null
        `;


        this.getBuiltQuery();
        const secondQuery = this.execute<Array<RetrievedLine>>()


        return Promise.all([firstQuery, secondQuery])
            .then(([result1, result2]) => result1.concat(result2))
            .then(result => {
                const factoidsEntities: Array<FactoidEntity> = [];
                result.forEach(line => {
                    let target = factoidsEntities
                        .filter(fe => fe.pkClass === line.fkclass && fe.pkRow === parseInt(line.fkrow) && fe.pkFactoidMapping === line.fkfactoidmapping)[0];
                    if (!target) {
                        target = new FactoidEntity(line.fkdigital, line.fkclass, parseInt(line.fkrow), line.fkfactoidmapping);
                        factoidsEntities.push(target);
                    }

                    const statement = new FactoidStatement(line.fkproperty, line.isoutgoing, line.value, parseInt(line.pkentity), parseInt(line.fkcell), parseInt(line.fkdefault));
                    if (parseInt(line.pkentity) === parseInt(pkEntity) || (line.pkentity == null && parseInt(line.fkdefault) === parseInt(pkEntity))) target.headerStatements.push(statement);
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
        return this.execute<Array<{length: string}>>();
    }

    async getDefaultFactoidNumber(pkEntity: string) {
        this.params = [];
        this.sql = `
        select
            count(DISTINCT (fpm.fk_factoid_mapping, c.fk_row)) as length
        from data.factoid_property_mapping fpm
        left join data.factoid_mapping fm on fm.pk_entity = fpm.fk_factoid_mapping
        left join data.factoid_property_mapping fpm2 on fpm2.fk_factoid_mapping = fm.pk_entity
        left join tables.cell c on c.fk_column = fpm2.fk_column
        left join information.statement s on s.fk_subject_tables_cell = c.pk_cell and s.fk_property = 1334
        left join projects.info_proj_rel ipr on s.pk_entity = ipr.fk_entity and ipr.is_in_project = true
        inner join (
            select * from (
                select
                    max(c.fk_row) as fk_row,
                    c.pk_cell,
                    bool_or(ipr.is_in_project) as stmt_exists
                from data.factoid_property_mapping fpm
                left join tables.cell c on c.fk_column = fpm.fk_column
                left join information.statement s on s.fk_subject_tables_cell = c.pk_cell and s.fk_property = 1334
                left join projects.info_proj_rel ipr on ipr.fk_entity = s.pk_entity
                where
                    fpm.fk_default = ${this.addParam(pkEntity)}
                group by c.pk_cell) as t0
            where t0.stmt_exists = false
        ) ij on ij.fk_row = c.fk_row
        where
            fpm.fk_default = ${this.addParam(pkEntity)}
        `;

        this.getBuiltQuery()
        return this.execute<Array<{length: string}>>();
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
