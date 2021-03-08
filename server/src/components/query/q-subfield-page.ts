/* eslint-disable @typescript-eslint/camelcase */
import {ModelDefinition} from '@loopback/repository';
import {keys} from 'lodash';
import {Postgres1DataSource} from '../../datasources';
import {GvLoadSubfieldPageReq, GvPaginationObject, GvPaginationStatementFilter, GvSubfieldPage, GvSubfieldPageScope, GvSubfieldType, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTimePrimitive, ProInfoProjRel, TrueEnum, WarEntityPreview} from '../../models';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


type With = {
  sql: string;
  name: string;
};

type ObjectWiths = {
  statement: string[];
  appellation: string[];
  lang_string: string[];
  language: string[];
  time_primitive: string[];
  place: string[];
  dimension: string[];
  temporal_entity: string[];
  persistent_item: string[];

  info_proj_rel: string[];

  entity_preview: string[];

  subfieldPages: string[];
};


type StatementTargetMeta = {
  modelDefinition: ModelDefinition,
  modelPk: string,
  statementObjectFk: string,
  statementSubjectFk: string,
  classFk: string,
  tableName: string,
  objectWith: string[],
}
type GvSubfieldTypeKey = keyof Omit<GvSubfieldType, 'timeSpan' | 'textProperty'>;

type Config = {
  [key in GvSubfieldTypeKey]: StatementTargetMeta
}

type ModelToFindClassConfig = {
  [key in GvSubfieldTypeKey]: StatementTargetMeta[]
}
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type GvSubfieldPageWithoutFkSource = PartialBy<GvSubfieldPage, 'fkSourceEntity'>
export class QSubfieldPage extends SqlBuilderLb4Models {

  withClauses: With[] = [];
  withCount = 0
  get nextWith() {
    return 'tw' + this.withCount++
  }

  objectWiths: ObjectWiths = {
    statement: [],
    appellation: [],
    lang_string: [],
    language: [],
    time_primitive: [],
    place: [],
    dimension: [],

    temporal_entity: [],
    persistent_item: [],

    info_proj_rel: [],

    entity_preview: [],

    subfieldPages: [],
  }

  subentityWiths = []

  config: Config;
  tableToFindClass: ModelToFindClassConfig
  constructor(
    public dataSource: Postgres1DataSource,
  ) {
    super(dataSource)

    this.config = {
      appellation: {
        modelDefinition: InfAppellation.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.appellation',
        classFk: 'fk_class',
        objectWith: this.objectWiths.appellation
      },
      language: {
        modelDefinition: InfLanguage.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.language',
        classFk: 'fk_class',
        objectWith: this.objectWiths.language
      },
      dimension: {
        modelDefinition: InfDimension.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.dimension',
        classFk: 'fk_class',
        objectWith: this.objectWiths.dimension
      },
      langString: {
        modelDefinition: InfLangString.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.lang_string',
        classFk: 'fk_class',
        objectWith: this.objectWiths.lang_string
      },
      place: {
        modelDefinition: InfPlace.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.v_place',
        classFk: 'fk_class',
        objectWith: this.objectWiths.place
      },
      timePrimitive: {
        modelDefinition: InfTimePrimitive.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.time_primitive',
        classFk: 'fk_class',
        objectWith: this.objectWiths.time_primitive
      },
      temporalEntity: {
        modelDefinition: InfTemporalEntity.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.temporal_entity',
        classFk: 'fk_class',
        objectWith: this.objectWiths.temporal_entity
      },
      entityPreview: {
        modelDefinition: WarEntityPreview.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'war.entity_preview',
        classFk: 'fk_class',
        objectWith: this.objectWiths.entity_preview
      },
      typeItem: {
        modelDefinition: WarEntityPreview.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'war.entity_preview',
        classFk: 'fk_class',
        objectWith: this.objectWiths.entity_preview
      },
    }
    const configPersistentItem: StatementTargetMeta = {
      modelDefinition: InfPersistentItem.definition,
      modelPk: 'pk_entity',
      statementObjectFk: 'fk_object_info',
      statementSubjectFk: 'fk_subject_info',
      tableName: 'information.persistent_item',
      classFk: 'fk_class',
      objectWith: this.objectWiths.persistent_item
    }

    this.tableToFindClass = {
      appellation: [this.config.appellation],
      place: [this.config.place],
      dimension: [this.config.dimension],
      langString: [this.config.langString],
      language: [this.config.language],
      temporalEntity: [this.config.temporalEntity],
      timePrimitive: [this.config.timePrimitive],
      typeItem: [
        this.config.temporalEntity,
        configPersistentItem
      ],
      entityPreview: [
        this.config.temporalEntity,
        configPersistentItem
      ],
    }
  }



  async query(req: GvLoadSubfieldPageReq): Promise<GvPaginationObject> {


    const select = this.createSelects(req);

    const models = this.groupPartsByModel()

    this.sql = `
      WITH
      ------------------------------------
      --- do select logic
      ------------------------------------
      ${select},
      ------------------------------------
      --- group parts by model
      ------------------------------------
      ${models}
      ------------------------------------
      --- build final object
      ------------------------------------
      select
      json_build_object(
        'schemas', json_build_object(
          'inf', json_strip_nulls(json_build_object(
            'statement', statement.json,
            'lang_string', lang_string.json,
            'appellation', appellation.json,
            'language', language.json,
            'time_primitive', time_primitive.json,
            'place', place.json,
            'dimension', dimension.json,
            'temporal_entity', temporal_entity.json
          )),
          'war', json_strip_nulls(json_build_object(
            'entity_preview', entity_preview.json
          )),
          'pro', json_strip_nulls(json_build_object(
            'info_proj_rel', info_proj_rel.json
          ))
        ),
        'subfieldPages', subfieldPages.json
      ) as data
      FROM
      (select 0 ) as one_row
      LEFT JOIN subfieldPages ON true
      LEFT JOIN statement ON true
      LEFT JOIN appellation ON true
      LEFT JOIN lang_string ON true
      LEFT JOIN language ON true
      LEFT JOIN time_primitive ON true
      LEFT JOIN place ON true
      LEFT JOIN dimension ON true
      LEFT JOIN temporal_entity ON true
      LEFT JOIN info_proj_rel ON true
      LEFT JOIN entity_preview ON true;
    `;
    return this.executeAndReturnFirstData<GvPaginationObject>()

  }



  createSelects(req: GvLoadSubfieldPageReq) {

    if (req.subfieldType.timeSpan) {

      const requests = this.createTimeSpanFieldRequests(req)
      return requests.map(request => this.createSelectForPage(request)).join(',\n')
    }

    return this.createSelectForPage(req);
  }



  /**
   * Select all statements of field without limit and offset
   * this is the base for retieving the total count of the page
   * and for selecting the statement-page according to limit and offset.
   *
   * This select depends on the scope:
   * inRepo: selects all statements with is_in_project_count > 0
   * inProject: selects only statements with info_proj_rel.is_in_project=true
   * notInProject: selects all statements except for the ones inProject
   */
  private createSelectForPage(req: GvLoadSubfieldPageReq) {

    const page = req.page;
    const filterObject: GvPaginationStatementFilter = {
      fk_subject_info: page.isOutgoing ? page.fkSourceEntity : undefined,
      fk_object_info: page.isOutgoing ? undefined : page.fkSourceEntity,
      fk_property: page.fkProperty
    };
    const scope = page.scope
    const twAllStatements = this.nextWith
    let sqlAllStatements: string;

    // inner join target already to filter on its class!
    const innerJoinTarget = this.joinTargetFilteredByClass(page, req.subfieldType, 't1')

    if (scope.inProject) {
      // this is for scope inProject: TODO other scopes
      sqlAllStatements = `
      -- all statements
      ${twAllStatements} AS (
        SELECT ${this.createSelect('t1', InfStatement.definition)}
        FROM
        information.v_statement t1
        INNER JOIN projects.info_proj_rel t2
        ON t1.pk_entity = t2.fk_entity
        ${innerJoinTarget}
        WHERE
        ${[
          ...this.getFiltersByObject('t1', filterObject),
          `t2.fk_project = ${this.addParam(scope.inProject)}`,
          `t2.is_in_project = true`
        ].join(' AND ')}
        )`
    }
    else if (scope.notInProject) {
      // this is for scope inProject: TODO other scopes
      sqlAllStatements = `
        -- all statements
        ${twAllStatements} AS (
          SELECT ${this.createSelect('t1', InfStatement.definition)}
          FROM
          information.v_statement t1
          ${innerJoinTarget}
          WHERE
          ${[
          ...this.getFiltersByObject('t1', filterObject),
          `t1.is_in_project_count > 0`
        ].join(' AND ')}
        EXCEPT
          SELECT ${this.createSelect('t1', InfStatement.definition)}
          FROM
          information.v_statement t1
          INNER JOIN projects.info_proj_rel t2
          ON t1.pk_entity = t2.fk_entity
          ${innerJoinTarget}
          WHERE
          ${[
          ...this.getFiltersByObject('t1', filterObject),
          `t2.fk_project = ${this.addParam(scope.notInProject)}`,
          `t2.is_in_project = true`
        ].join(' AND ')}
       )`
    }
    else {
      // TODO
      throw new Error("scope not yet implemented: " + JSON.stringify(scope));
    }

    return [
      sqlAllStatements,
      this.joinPage(twAllStatements, page, scope, req.subfieldType)
    ].join(',\n')
  }



  // /**
  //  * Select all statements of field without limit and offset
  //  * this is the base for retieving the total count of the page
  //  * and for selecting the statement-page according to limit and offset.
  //  *
  //  * This select depends on the scope:
  //  * inRepo: selects all statements with is_in_project_count > 0
  //  * inProject: selects only statements with info_proj_rel.is_in_project=true
  //  * notInProject: selects all statements except for the ones inProject
  //  */
  // private joinSubentityPage(page: GvSubfieldPageWithoutFkSource, scope: GvSubfieldPageScope, twSource: string, subfieldType: GvSubentitySubfieldType) {
  //   const twAllStatements = this.nextWith;
  //   let sqlAllStatements: string;
  //   const statementFk = page.isOutgoing ? 'fk_subject_info' : 'fk_object_info';
  //   const filterObject: GvPaginationStatementFilter = {
  //     fk_property: page.fkProperty
  //   };
  //   // inner join target already to filter on its class!
  //   const innerJoinTarget = this.joinTargetFilteredByClass(page, subfieldType, 't1')

  //   if (scope.inProject) {
  //     // this is for scope inProject: TODO other scopes
  //     sqlAllStatements = `
  //       -- all statements
  //       ${twAllStatements} AS (
  //         SELECT ${this.createSelect('t1', InfStatement.definition)}
  //         FROM
  //         ${twSource}
  //         INNER JOIN information.v_statement t1
  //         ON ${twSource}.pk = t1.${statementFk}
  //         INNER JOIN projects.info_proj_rel t2
  //         ON  t1.pk_entity = t2.fk_entity
  //         ${innerJoinTarget}
  //         WHERE
  //         t2.fk_project = ${scope.inProject}
  //         AND t2.is_in_project = true
  //         AND ${this.getFiltersByObject('t1', filterObject).join('\nAND ')}
  //       )`;
  //   }
  //   else {
  //     // TODO
  //     throw new Error("scope not yet implemented: " + JSON.stringify(scope));
  //   }

  //   const subPageSql = this.joinPage(twAllStatements, page, scope, subfieldType, twSource);
  //   const subentityFieldsSql = [sqlAllStatements, subPageSql].join(',\n');
  //   return subentityFieldsSql;
  // }

  joinTargetFilteredByClass(
    p: GvSubfieldPageWithoutFkSource,
    subfiedfType: GvSubfieldType,
    stmtTable: string
  ) {
    const key = keys(subfiedfType)[0] as GvSubfieldTypeKey
    const config = this.tableToFindClass[key]
    if (!config) throw new Error("tableToFindClass missing for: " + key);
    const join = `
    JOIN LATERAL (
      ${config.map(c => `
      SELECT ${c.modelPk} pk_entity, ${c.classFk} fk_class
      FROM ${c.tableName}
      WHERE ${c.modelPk} = ${stmtTable}.${p.isOutgoing ? c.statementObjectFk : c.statementSubjectFk}
      `).join('UNION ALL \n')}
    ) target
    ON target.fk_class = ${p.targetClass}

    `
    return join
  }

  private joinPage(
    twAllStatements: string,
    page: GvSubfieldPageWithoutFkSource,
    scope: GvSubfieldPageScope,
    subfieldType: GvSubfieldType,
    twSource?: string
  ) {
    const sqls: string[] = []

    /**
     * counts the total number of statements (before applying limit and offset)
     */
    const twCount = this.nextWith;
    const sqlCount = `
      -- count
      ${twCount} AS (
        SELECT
        count(*)
        FROM
        ${twAllStatements}
        GROUP BY
        TRUE
      )`;
    sqls.push(sqlCount);

    /**
     * selects the page-statements by applying limit and offset
     */
    const twPageStatements = this.nextWith;
    const sqlPaginatedStatements = `
      -- paginated statements
      ${twPageStatements} AS (
        SELECT
        ${this.createSelect('t1', InfStatement.definition)}
        FROM
        ${twAllStatements} t1
        LIMIT ${this.addParam(page.limit)} -- add limit
        OFFSET ${this.addParam(page.offset)} -- add offset
    )`;
    sqls.push(sqlPaginatedStatements);

    /**
    * converts the twPageStatements to objects
    */
    const twStatementObjects = this.nextWith;
    const sqlStatementObjects = `
        -- statements as objects
        ${twStatementObjects} AS (
          SELECT
            ${this.createBuildObject('t1', InfStatement.definition)} objects
          FROM
            ${twPageStatements} t1
        )`;
    sqls.push(sqlStatementObjects);
    this.objectWiths.statement.push(twStatementObjects);

    /**
     * converts the twInfoProjRelObjects to objects
     * only if scope.inProject (!)
     */
    if (scope.inProject) {
      const twInfoProjRelObjects = this.nextWith;
      const sqlInfoProjRelsObjects = `
      -- info_proj_rel as objects
      ${twInfoProjRelObjects} AS (
        SELECT
        ${this.createBuildObject('t1', ProInfoProjRel.definition)} objects
        FROM
        projects.info_proj_rel t1,
        ${twPageStatements} t2
        WHERE
        t1.fk_entity = t2.pk_entity
        AND
        t1.fk_project = ${this.addParam(scope.inProject)}
    )`;
      sqls.push(sqlInfoProjRelsObjects);
      this.objectWiths.info_proj_rel.push(twInfoProjRelObjects);
    }


    /**
     * builds the GvSubfieldPageInfo object
     */
    const twPkStatementArray = this.nextWith;
    const twSourceEntity = this.nextWith;
    const twSubfieldPages = this.nextWith;

    let sqlSourceEntity: string
    if (page.fkSourceEntity) {
      sqlSourceEntity = `
      ${twSourceEntity} AS (
        SELECT ${page.fkSourceEntity} as fk
      )
      `
    } else {
      sqlSourceEntity = `
      ${twSourceEntity} AS (
        SELECT DISTINCT pk as fk
        FROM ${twSource}
        LIMIT 1
      )`
    }
    const sqlGvSubfieldPageInfoObjects = `
        ${sqlSourceEntity},
        ${twPkStatementArray} AS (
          SELECT json_agg(t1.pk_entity) obj
          FROM ${twPageStatements} t1
          GROUP BY true
        ),
        -- GvSubfieldPageInfo as objects
        ${twSubfieldPages}  AS (
          SELECT jsonb_build_object (
            'page', 	jsonb_set(
                      '${JSON.stringify(page)}',
                      '{fkSourceEntity}',
                      COALESCE(
                        ('${JSON.stringify(page)}'::jsonb)->'fkSourceEntity',
                        to_jsonb(sourceEntity.fk)
                      )
            ),
            'count', COALESCE(count.count,0),
            'paginatedStatements', COALESCE(paginatedStatements.obj, '[]'::json)
            ) objects
          FROM
          --(select 0) as one_row
          --LEFT JOIN
           ${twSourceEntity} sourceEntity --ON true
          LEFT JOIN ${twCount} count ON true
          LEFT JOIN ${twPkStatementArray} paginatedStatements ON TRUE

       )`;
    sqls.push(sqlGvSubfieldPageInfoObjects);
    this.objectWiths.subfieldPages.push(twSubfieldPages);

    /**
     * joins the targets of twPageStatements
     */
    sqls.push(this.joinTargetOfStatement(page, subfieldType, twPageStatements));

    return sqls.join(',\n');
  }

  joinTargetOfStatement(page: GvSubfieldPageWithoutFkSource, subfiedfType: GvSubfieldType, twStatements: string): string {
    const sqls = []
    const key = keys(subfiedfType)[0] as GvSubfieldTypeKey
    const config = this.config[key]
    if (!config) throw new Error("This subfield type is not implemented: " + key);
    const x = this.joinSimpleTarget(page.isOutgoing, twStatements, config, page.scope, subfiedfType)
    sqls.push(x.sql);

    if (subfiedfType.dimension) sqls.push(this.joinMeasurementUnit(x.tw));
    else if (subfiedfType.langString) sqls.push(this.joinLanguage(x.tw));
    else if (subfiedfType.temporalEntity) sqls.push(this.joinProjRel(page.scope, x.tw))


    return sqls.join(',\n')
  }

  private joinSimpleTarget(
    isOutgoing: boolean,
    twStatements: string,
    spec: StatementTargetMeta,
    parentScope: GvSubfieldPageScope,
    parentSubfieldType: GvSubfieldType
  ) {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, objectWith} = spec
    const sqls: string[] = []
    const twTarget = this.nextWith;
    objectWith.push(twTarget);
    const sqlTarget = `
        -- ${tableName}
        ${twTarget} AS (
          SELECT
            ${this.createBuildObject('t1', modelDefinition)} objects,
            t1.${modelPk} pk
          FROM
            ${tableName} t1,
            ${twStatements} t2
          WHERE t1.${modelPk} = t2.${isOutgoing ? statementObjectFk : statementSubjectFk}
      )`;
    sqls.push(sqlTarget)


    const sql = sqls.join(',\n')
    return {sql, tw: twTarget}
  }

  private joinProjRel(
    parentScope: GvSubfieldPageScope,
    twTarget: string,
  ) {
    const sqls = []



    /**
     * selects the twInfoProjRelObjects
     * only if scope.inProject (!)
     */
    if (parentScope.inProject) {
      const twInfoProjRelObjects = this.nextWith;
      const sqlInfoProjRelsObjects = `
          -- info_proj_rel as objects
          ${twInfoProjRelObjects} AS (
            SELECT
            ${this.createBuildObject('t1', ProInfoProjRel.definition)} objects
            FROM
            projects.info_proj_rel t1,
            ${twTarget} t2
            WHERE
            t1.fk_entity = t2.pk
            AND
            t1.fk_project = ${this.addParam(parentScope.inProject)}
        )`;
      sqls.push(sqlInfoProjRelsObjects);
      this.objectWiths.info_proj_rel.push(twInfoProjRelObjects);
    }
    return sqls.join(',\n')
  }


  // private joinSubentity(
  //   parentSubfieldType: GvSubfieldType,
  //   parentScope: GvSubfieldPageScope,
  //   twTarget: string,
  // ) {
  //   const sqls = []

  //   if (parentSubfieldType.temporalEntity?.length) {


  //     /**
  //      * selects the twInfoProjRelObjects
  //      * only if scope.inProject (!)
  //      */
  //     if (parentScope.inProject) {
  //       const twInfoProjRelObjects = this.nextWith;
  //       const sqlInfoProjRelsObjects = `
  //         -- info_proj_rel as objects
  //         ${twInfoProjRelObjects} AS (
  //           SELECT
  //           ${this.createBuildObject('t1', ProInfoProjRel.definition)} objects
  //           FROM
  //           projects.info_proj_rel t1,
  //           ${twTarget} t2
  //           WHERE
  //           t1.fk_entity = t2.pk
  //           AND
  //           t1.fk_project = ${this.addParam(parentScope.inProject)}
  //       )`;
  //       sqls.push(sqlInfoProjRelsObjects);
  //       this.objectWiths.info_proj_rel.push(twInfoProjRelObjects);
  //     }


  //     const subReqs = parentSubfieldType.temporalEntity;
  //     /**
  //      * generate the scope of the subpages
  //      */
  //     let scope: GvSubfieldPageScope;
  //     if (parentScope.notInProject)
  //       scope = {inRepo: true};
  //     else
  //       scope = parentScope;

  //     for (const subReq of subReqs) {
  //       /**
  //        * convert GvLoadSubentitySubfieldPageReq to GvLoadSubfieldPageReq
  //        */
  //       const page: GvSubfieldPageWithoutFkSource = {...subReq.page, scope};
  //       const subfieldType = subReq.subfieldType;
  //       let subentityFieldsSql: string;
  //       if (subfieldType.timeSpan) {
  //         subentityFieldsSql = this.createTimeSpanSubFieldRequests(page).map(item => {
  //           return this.joinSubentityPage(item.page, scope, twTarget, item.subfieldType);
  //         }).join(',\n');
  //       }
  //       else {
  //         subentityFieldsSql = this.joinSubentityPage(page, scope, twTarget, subfieldType);
  //       }

  //       sqls.push(subentityFieldsSql);
  //     }
  //   }

  //   return sqls.join(',\n')
  // }

  private joinMeasurementUnit(leftTw: string) {
    const {tableName, modelDefinition, modelPk, objectWith} = this.config.entityPreview as StatementTargetMeta
    const tw = this.nextWith;
    objectWith.push(tw);
    return `
        -- ${tableName}
        ${tw} AS (
          SELECT ${this.createBuildObject('t1', modelDefinition)} objects
          FROM
            ${tableName} t1,
            ${leftTw} t2
          WHERE t1.${modelPk} = (t2.objects->>'fk_measurement_unit')::int
      )`;
  }

  private joinLanguage(leftTw: string) {
    const {tableName, modelDefinition, modelPk, objectWith} = this.config.language as StatementTargetMeta
    const tw = this.nextWith;
    objectWith.push(tw);
    return `
        -- ${tableName}
        ${tw} AS (
          SELECT ${this.createBuildObject('t1', modelDefinition)} objects
          FROM
            ${tableName} t1,
            ${leftTw} t2
          WHERE t1.${modelPk} = (t2.objects->>'fk_language')::int
      )`;
  }

  groupPartsByModel() {
    return keys(this.objectWiths).map((model) => {
      const modelWiths = this.objectWiths[model as keyof ObjectWiths];

      if (modelWiths.length === 0) {
        return ` ${model} AS ( SELECT '[]'::json as json )`
      } else {
        return ` ${model} AS (
          SELECT json_agg(t1.objects) as json
          FROM (
            ${modelWiths.map(tw => `
              SELECT objects FROM ${tw}
            `).join(' UNION ALL ')}
          ) as t1
          GROUP BY true
        )`
      }
    }).join(', \n')
  }



  getFiltersByObject(tableAlias: string, filterObject: GvPaginationStatementFilter) {
    const filters: string[] = []
    let column: keyof GvPaginationStatementFilter;
    for (column in filterObject) {
      const value = filterObject[column];
      if (value) {
        filters.push(`${tableAlias}.${column}=${this.addParam(value)}`)
      }
    }
    return filters;
  }

  private createTimeSpanFieldRequests(req: GvLoadSubfieldPageReq): GvLoadSubfieldPageReq[] {
    return [71, 72, 150, 151, 152, 153].map(timeSpanProperty => {
      const request: GvLoadSubfieldPageReq = {
        ...req,
        page: {
          ...req.page,
          fkProperty: timeSpanProperty,
          targetClass: 335
        },
        subfieldType: {timePrimitive: TrueEnum.true}
      };
      return request;
    });
  }

  private createTimeSpanSubFieldRequests(p: GvSubfieldPageWithoutFkSource) {
    return [71, 72, 150, 151, 152, 153].map(timeSpanProperty => {

      const page: GvSubfieldPageWithoutFkSource = {
        ...p,
        fkProperty: timeSpanProperty,
        targetClass: 335
      }
      const subfieldType: GvSubfieldType = {timePrimitive: TrueEnum.true}
      return {
        page,
        subfieldType
      };
    });
  }
}
