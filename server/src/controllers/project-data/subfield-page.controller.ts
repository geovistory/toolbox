import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {concat, equals, flatten, mergeDeepWith} from 'ramda';
import {Roles} from '../../components/authorization/keys';
import {QFieldPage2} from '../../components/query/q-field-page-2';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {Postgres1DataSource} from '../../datasources';
import {GvFieldId, GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvPaginationObject, GvSubentitFieldPageReq} from '../../models';
import {TrueEnum} from '../../models/enums/TrueEnum';
import {GvFieldSourceEntity} from '../../models/field/gv-field-source-entity';

export class SubfieldPageController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) { }

  @post('subfield-page/load-subfield-page', {
    responses: {
      '200': {
        description: "Get GvPaginationObject for a subfield.",
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPaginationObject,
            }
          }
        },
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async loadSubfieldPages(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GvFieldPageReq),
            }
          }
        },
      }
    ) reqs: GvFieldPageReq[]
  ): Promise<GvPaginationObject> {
    const results = await Promise.all(reqs.map(req => this.loadSubfieldPage(req)));
    let result: GvPaginationObject = {subfieldPages: []};
    for (const obj of results) {
      result = mergeDeepWith(concat, result, obj);
    }
    return result;
  }


  private async loadSubfieldPage(req: GvFieldPageReq) {

    if (equals(req.targets, {50: {timeSpan: TrueEnum.true}})) {
      const requests = this.createTimeSpanFieldRequests(req)
      return this.loadSubfieldPages(requests)
    }

    const res = await new QFieldPage2(this.datasource).query(req);

    const results: GvPaginationObject[] = [];
    const subPageQueries: Promise<GvPaginationObject[]>[] = [];

    for (const subfieldPageInfo of res.subfieldPages) {
      for (const statementWT of subfieldPageInfo.paginatedStatements) {
        const e = statementWT.target.entity?.resource;
        if (e) {
          const source: GvFieldSourceEntity = {fkInfo: e.pk_entity};
          const fkClass = e.fk_class;
          const targetType = req.targets[fkClass];
          if (targetType?.nestedResource?.length) {
            const subreqs = targetType.nestedResource as GvSubentitFieldPageReq[];
            const scope = req.page.scope.notInProject ? {inRepo: true} : req.page.scope;
            subPageQueries.push(this.querySubfields(
              req.pkProject,
              source,
              subreqs,
              scope
            ));
          }
        }
      }
    }

    if (subPageQueries.length) {
      const r = await Promise.all(subPageQueries);
      results.push(...flatten(r));
    }

    let result = res;
    for (const obj of results) {
      result = mergeDeepWith(concat, result, obj);
    }
    return result;
  }

  private async querySubfields(
    pkProject: number,
    source: GvFieldSourceEntity,
    subReqs: GvSubentitFieldPageReq[],
    parentScope: GvFieldPageScope,
  ) {

    /**
     * generate the scope of the subpages
     */
    let scope: GvFieldPageScope;
    if (parentScope.notInProject)
      scope = {inRepo: true};
    else
      scope = parentScope;

    const promises$ = []
    for (const subReq of subReqs) {
      /**
       * convert GvLoadSubentitySubfieldPageReq to GvLoadSubfieldPageReq
       */
      const page: GvFieldPage = {
        ...subReq.page,
        scope,
        source
      };
      const targets = subReq.targets;
      const req: GvFieldPageReq = {
        page,
        targets,
        pkProject
      }

      promises$.push(new QFieldPage2(this.datasource).query(req));

    }


    return Promise.all(promises$)
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

registerType(GvFieldId)
