/* eslint-disable @typescript-eslint/camelcase */
import {ModelDefinition} from '@loopback/repository';
import {keys} from 'lodash';
import {equals, groupBy, uniq} from 'ramda';
import {Postgres1DataSource} from '../../datasources';
import {GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvPaginationObject, GvPaginationStatementFilter, GvTargetType, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTimePrimitive, ProInfoProjRel, TrueEnum, WarEntityPreview} from '../../models';
import {GvFieldTargets} from '../../models/field/gv-field-targets';
import {DatObject, DfhObject, InfObject, ProObject, SysObject, WarObject} from '../../models/gv-schema-object.model';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


type With = {
  sql: string;
  name: string;
};
type InfObjectKey = keyof InfObject;
type InfObjWiths = {[key in InfObjectKey]: string[]}
type ProObjectKey = keyof ProObject;
type ProObjWiths = {[key in ProObjectKey]: string[]}
type DatObjectKey = keyof DatObject;
type DatObjWiths = {[key in DatObjectKey]: string[]}
type WarObjectKey = keyof WarObject;
type WarObjWiths = {[key in WarObjectKey]: string[]}
type DfhObjectKey = keyof DfhObject;
type DfhObjWiths = {[key in DfhObjectKey]: string[]}
type SysObjectKey = keyof SysObject;
type SysObjWiths = {[key in SysObjectKey]: string[]}

interface ObjectWiths {
  schemas: {
    inf: InfObjWiths,
    pro: ProObjWiths,
    dat: DatObjWiths,
    war: WarObjWiths,
    dfh: DfhObjWiths,
    sys: SysObjWiths,
  }
  subfieldPages: string[];
};


type StatementTargetMeta = {
  modelDefinition: ModelDefinition,
  modelPk: string,
  projectFk?: string
  statementObjectFk: string,
  statementSubjectFk: string,
  classFk: string,
  tableName: string,
  objectWith: string[],
}
type GvTargetTypeKey = keyof Omit<GvTargetType, 'timeSpan' | 'textProperty'>;

type Config = {
  [key in GvTargetTypeKey]: StatementTargetMeta
}

type ModelToFindClassConfig = {
  [key in GvTargetTypeKey]: StatementTargetMeta[]
}
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// type GvFieldPageWithoutFkSource = PartialBy<GvFieldPage, 'source'>
export class QFieldPage extends SqlBuilderLb4Models {

  withClauses: With[] = [];
  withCount = 0
  get nextWith() {
    return 'tw' + this.withCount++
  }

  objectWiths: ObjectWiths = {
    schemas: {
      inf: {
        text_property: [],
        statement: [],
        appellation: [],
        lang_string: [],
        language: [],
        time_primitive: [],
        place: [],
        dimension: [],

        temporal_entity: [],
        persistent_item: [],
      },
      dat: {
        class_column_mapping: [],
        text_property: [],
        column: [],
        digital: []
      },
      pro: {
        analysis: [],
        text_property: [],
        class_field_config: [],
        dfh_class_proj_rel: [],
        dfh_profile_proj_rel: [],
        project: [],
        info_proj_rel: [],
      },
      dfh: {
        profile: [],
        property: [],
        label: [],
        klass: []
      },
      sys: {
        config: [],
        klass: [],
        label: [],
        property: []
      },
      war: {
        entity_preview: [],
      },
    },
    subfieldPages: [],
  }

  subentityWiths = []

  config: Config;
  tableToFindOriginalItems: ModelToFindClassConfig
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
        objectWith: this.objectWiths.schemas.inf.appellation
      },
      language: {
        modelDefinition: InfLanguage.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.language',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.language
      },
      dimension: {
        modelDefinition: InfDimension.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.dimension',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.dimension
      },
      langString: {
        modelDefinition: InfLangString.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.lang_string',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.lang_string
      },
      place: {
        modelDefinition: InfPlace.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.v_place',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.place
      },
      timePrimitive: {
        modelDefinition: InfTimePrimitive.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.time_primitive',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.time_primitive
      },
      temporalEntity: {
        modelDefinition: InfTemporalEntity.definition,
        modelPk: 'pk_entity',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'information.temporal_entity',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.inf.temporal_entity
      },
      entityPreview: {
        modelDefinition: WarEntityPreview.definition,
        modelPk: 'pk_entity',
        projectFk: 'fk_project',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'war.entity_preview',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.war.entity_preview
      },
      typeItem: {
        modelDefinition: WarEntityPreview.definition,
        modelPk: 'pk_entity',
        projectFk: 'fk_project',
        statementObjectFk: 'fk_object_info',
        statementSubjectFk: 'fk_subject_info',
        tableName: 'war.entity_preview',
        classFk: 'fk_class',
        objectWith: this.objectWiths.schemas.war.entity_preview
      },
    }
    const configPersistentItem: StatementTargetMeta = {
      modelDefinition: InfPersistentItem.definition,
      modelPk: 'pk_entity',
      statementObjectFk: 'fk_object_info',
      statementSubjectFk: 'fk_subject_info',
      tableName: 'information.persistent_item',
      classFk: 'fk_class',
      objectWith: this.objectWiths.schemas.inf.persistent_item
    }

    this.tableToFindOriginalItems = {
      appellation: [this.config.appellation],
      place: [this.config.place],
      dimension: [this.config.dimension],
      langString: [this.config.langString],
      language: [this.config.language],
      temporalEntity: [this.config.temporalEntity],
      timePrimitive: [this.config.timePrimitive],
      typeItem: [
        // list all models that can be represented by typeItem
        // this.config.temporalEntity,
        configPersistentItem
      ],
      entityPreview: [
        // list all models that can be represented by entityPreview
        this.config.temporalEntity,
        configPersistentItem
      ],
    }
  }



  async query(req: GvFieldPageReq): Promise<GvPaginationObject> {


    const select = this.createSelects(req);

    const models = this.groupPartsByModel()
    const finalObject = this.buildFinalObject()


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
      ${finalObject}

    `;
    return this.executeAndReturnFirstData<GvPaginationObject>()

  }



  createSelects(req: GvFieldPageReq) {

    if (equals(req.targets, {50: {timeSpan: TrueEnum.true}})) {

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
  private createSelectForPage(req: GvFieldPageReq) {

    const page = req.page;
    const filterObject: GvPaginationStatementFilter = {
      fk_subject_info: page.isOutgoing ? page.source.fkInfo : undefined,
      fk_object_info: page.isOutgoing ? undefined : page.source.fkInfo,
      fk_subject_data: page.isOutgoing ? page.source.fkData : undefined,
      fk_object_data: page.isOutgoing ? undefined : page.source.fkData,
      fk_subject_tables_cell: page.isOutgoing ? page.source.fkTablesCell : undefined,
      fk_object_tables_cell: page.isOutgoing ? undefined : page.source.fkTablesCell,
      fk_subject_tables_row: page.isOutgoing ? page.source.fkTablesRow : undefined,
      fk_object_tables_row: page.isOutgoing ? undefined : page.source.fkTablesRow,
      fk_property: page.property.fkProperty,
      fk_property_of_property: page.property.fkPropertyOfProperty
    };
    const scope = page.scope
    const twAllStatements = this.nextWith
    let sqlAllStatements: string;

    // inner join target already to filter on its class!
    const innerJoinTarget = this.joinTargetFilteredByClass(page, req.targets, 't1')

    if (scope.inProject) {
      // this is for scope inProject: TODO other scopes
      sqlAllStatements = `
      -- all statements
      ${twAllStatements} AS (
        SELECT ${this.createSelect('t1', InfStatement.definition)},
        target.fk_class
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
          SELECT ${this.createSelect('t1', InfStatement.definition)},
          target.fk_class
          FROM
          information.v_statement t1
          ${innerJoinTarget}
          WHERE
          ${[
          ...this.getFiltersByObject('t1', filterObject),
          `t1.is_in_project_count > 0`
        ].join(' AND ')}
        EXCEPT
          SELECT ${this.createSelect('t1', InfStatement.definition)},
          target.fk_class
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
    else if (scope.inRepo) {
      sqlAllStatements = `
      -- all statements
      ${twAllStatements} AS (
        SELECT ${this.createSelect('t1', InfStatement.definition)},
        target.fk_class
        FROM
        information.v_statement t1
        ${innerJoinTarget}
        WHERE
        ${[
          ...this.getFiltersByObject('t1', filterObject),
          `t1.is_in_project_count > 0`
        ].join(' AND ')}
     )`
    }
    else {
      throw new Error("scope not implemented: " + JSON.stringify(scope));
    }

    return [
      sqlAllStatements,
      this.joinPage(twAllStatements, page, scope, req.targets)
    ].join(',\n')
  }


  joinTargetFilteredByClass(
    p: GvFieldPage,
    targets: GvFieldTargets,
    stmtTable: string
  ) {
    const targetArray = keys(targets).map((key) => ({fkClass: key, target: keys(targets[parseInt(key)])[0] as GvTargetTypeKey}))
    const classesByTarget = groupBy((t) => t.target, targetArray)
    const configs: {meta: StatementTargetMeta[], classes: number[]}[] = [];
    keys(classesByTarget).forEach((key) => {
      const meta = this.tableToFindOriginalItems[key as GvTargetTypeKey]
      if (!meta) throw new Error("tableToFindClass missing for: " + key);
      const classes = classesByTarget[key].map(val => parseInt(val.fkClass))
      configs.push({meta, classes})
    })
    const join = `
    JOIN LATERAL (
      ${configs.map(config => config.meta.map(m => `
      SELECT ${m.modelPk} pk_entity, ${m.classFk} fk_class
      FROM ${m.tableName}
      WHERE ${m.modelPk} = ${stmtTable}.${p.isOutgoing ? m.statementObjectFk : m.statementSubjectFk}
      AND ${m.classFk} IN (${this.addParams(config.classes)})
      `).join('UNION ALL \n')
    ).join('UNION ALL \n')}
    ) target ON TRUE
    `
    return join
  }

  private joinPage(
    twAllStatements: string,
    page: GvFieldPage,
    scope: GvFieldPageScope,
    targets: GvFieldTargets,
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
    this.objectWiths.schemas.inf.statement.push(twStatementObjects);

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
      this.objectWiths.schemas.pro.info_proj_rel.push(twInfoProjRelObjects);
    }


    /**
     * builds the GvSubfieldPageInfo object
     */
    const twPkStatementArray = this.nextWith;
    const twSubfieldPages = this.nextWith;

    const sqlGvSubfieldPageInfoObjects = `
        ${twPkStatementArray} AS (
          SELECT json_agg(t1.pk_entity) obj
          FROM ${twPageStatements} t1
          GROUP BY true
        ),
        -- GvSubfieldPageInfo as objects
        ${twSubfieldPages}  AS (
          SELECT jsonb_build_object (
            'page', '${JSON.stringify(page)}'::json,
            'count', COALESCE(count.count,0),
            'paginatedStatements', COALESCE(paginatedStatements.obj, '[]'::json)
            ) objects
          FROM
          (select 0) as one_row
          LEFT JOIN ${twCount} count ON true
          LEFT JOIN ${twPkStatementArray} paginatedStatements ON TRUE

       )`;
    sqls.push(sqlGvSubfieldPageInfoObjects);
    this.objectWiths.subfieldPages.push(twSubfieldPages);

    /**
     * joins the targets of twPageStatements
     */
    sqls.push(this.joinTargetOfStatement(page, targets, twPageStatements));

    return sqls.join(',\n');
  }

  joinTargetOfStatement(page: GvFieldPage, targets: GvFieldTargets, twStatements: string): string {
    const sqls = []
    const targetArray = keys(targets).map((key) => ({fkClass: key, target: keys(targets[parseInt(key)])[0] as GvTargetTypeKey}))
    const targetTypes: GvTargetTypeKey[] = uniq(targetArray.map(t => t.target))

    for (const targetType of targetTypes) {
      const config = this.config[targetType]
      if (!config) throw new Error("This subfield type is not implemented: " + targetType);
      const x = this.joinSimpleTarget(page.isOutgoing, twStatements, config, page.scope)
      sqls.push(x.sql);

      if (targetType === 'dimension') sqls.push(this.joinMeasurementUnit(x.tw));
      else if (targetType === 'langString') sqls.push(this.joinLanguage(x.tw));
      else if (targetType === 'temporalEntity' && page.scope.inProject) sqls.push(this.joinProjRel(page.scope, x.tw))

      if (config.modelDefinition === WarEntityPreview.definition) sqls.push(this.joinOriginOfEntityPreview(page.isOutgoing, twStatements, targetType, page.scope))
    }

    return sqls.join(',\n')
  }

  private joinSimpleTarget(
    isOutgoing: boolean,
    twStatements: string,
    spec: StatementTargetMeta,
    scope: GvFieldPageScope
  ) {

    const {tableName, modelDefinition, modelPk, statementObjectFk, statementSubjectFk, objectWith} = spec
    const sqls: string[] = []
    const twTarget = this.nextWith;
    objectWith.push(twTarget);
    let whereProject = ''
    if (spec.projectFk) {
      const fkProject = scope.inProject ?? scope.notInProject ?? null;
      whereProject = `AND (t1.${spec.projectFk} IS NOT DISTINCT FROM ${fkProject})`
    }
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
          ${whereProject}
      )`;
    sqls.push(sqlTarget)


    const sql = sqls.join(',\n')
    return {sql, tw: twTarget}
  }

  private joinProjRel(
    parentScope: GvFieldPageScope,
    twTarget: string,
  ) {
    const twInfoProjRelObjects = this.nextWith;
    this.objectWiths.schemas.pro.info_proj_rel.push(twInfoProjRelObjects);
    return `
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
  }

  /**
   * joins the original item represented by the entity preview.
   * E.g.: if the entityPreview is from a temporal_entity,
   * it joins the temporal_entity.
   *
   * This may is handy, because the entityPreview may be missing for two reasons:
   * - the entityPreview not yet generated by the warehous at time of querying
   * - the entityPreview is not available for the requested project, since the
   *   entity is not in the project
   *
   * The original item may then be used to get the fk_class of the item
   * independent from the entityPreview
   */
  private joinOriginOfEntityPreview(
    isOutgoing: boolean,
    twStatements: string,
    targetKey: GvTargetTypeKey,
    scope: GvFieldPageScope
  ): string {
    const originSpec = this.tableToFindOriginalItems[targetKey]
    return originSpec.map(
      spec => this.joinSimpleTarget(isOutgoing, twStatements, spec, scope).sql
    ).join(',\n')
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
    const sqls: string[] = []
    const addGroup = (model: string, withs: string[]) => {

      if (withs.length) {
        sqls.push(` "${model}" AS (
          SELECT json_agg(t1.objects) as json
          FROM (
            ${withs.map(tw => `
              SELECT objects FROM ${tw}
            `).join(' UNION ALL ')}
          ) as t1
          GROUP BY true
        )`)
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recursive = (object: any, prefix = '') => {

      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const element = object[key];
          const tw = prefix + key
          if (Array.isArray(element)) {
            addGroup(tw, element)
          }
          else {
            recursive(element, tw + '_')
          }
        }
      }
    }
    recursive(this.objectWiths)

    return sqls.join(',\n')
  }
  buildFinalObject(): string {
    const leftJoins: string[] = []
    const addLefJoin = (tw: string) => {
      leftJoins.push(`LEFT JOIN "${tw}" ON true`)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recursive = (object: any, prefix = ''): string => {

      const keyVals: string[] = []
      for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          const element = object[key];
          const tw = prefix + key
          if (Array.isArray(element)) {
            if (element.length) {
              addLefJoin(tw)
              keyVals.push(`'${key}', "${tw}".json`)
            }
          }
          else {
            keyVals.push(`'${key}', ${recursive(element, tw + '_')}`)
          }
        }
      }
      return `json_strip_nulls(json_build_object(
        ${keyVals.join(',\n')}
      ))`
    }

    const buildOject = recursive(this.objectWiths)

    return `select
    ${buildOject} as data
    FROM
    (select 0 ) as one_row
    ${leftJoins.join('\n')};`
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

  private createTimeSpanFieldRequests(req: GvFieldPageReq): GvFieldPageReq[] {
    return [71, 72, 150, 151, 152, 153].map(timeSpanProperty => {
      const request: GvFieldPageReq = {
        ...req,
        page: {
          ...req.page,
          property: {fkProperty: timeSpanProperty},
        },
        targets: {335: {timePrimitive: TrueEnum.true}}
      };
      return request;
    });
  }


}
