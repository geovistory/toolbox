import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import objectHash from 'object-hash';
import {concat, mergeDeepWith, values} from 'ramda';
import {Roles} from '../../components/authorization/keys';
import {QFieldPage3} from '../../components/query/q-field-page-3';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {Postgres1DataSource} from '../../datasources';
import {GvFieldId, GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvPaginationObject, GvSubentitFieldPageReq} from '../../models';
import {TrueEnum} from '../../models/enums/TrueEnum';
import {GvFieldSourceEntity} from '../../models/field/gv-field-source-entity';
interface ReqsBySource {
  reqs: GvFieldPageReq[];
  source: GvFieldSourceEntity;
}

export class SubfieldPageController {
  mergeReqsBySourceInSql = true
  mergeReqsByTargetInSql = false
  joinNestedInSql = false

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
    ) reqs: GvFieldPageReq[],
  ): Promise<GvPaginationObject> {


    // const t0 = performance.now()
    const result = this.mergeReqsBySourceInSql ?
      await this.queryPages(reqs) :
      await this.loadPages(reqs);

    // const t1 = performance.now()
    // console.log('Call to loadSubfieldPages took ms ', t1 - t0)
    return result;
  }


  private async loadPages(reqs: GvFieldPageReq[]) {
    // const results: GvPaginationObject[] = [];
    // for (const req of reqs) {
    //   results.push((await this.loadPage(req)));
    // }
    const results = await Promise.all(reqs.map(r => this.loadPage(r)))

    const result: GvPaginationObject = mergePaginationObjects(results);

    if (this.joinNestedInSql) return result

    const nestedReqs = nestedRequestsFromPaginationObject(result)
    const nestedResults = await Promise.all(nestedReqs.map(r => this.loadPage(r)))
    return mergePaginationObjects([result, ...nestedResults]);
  }



  async queryPages(reqs: GvFieldPageReq[]): Promise<GvPaginationObject> {
    // let t0 = performance.now()
    const result: GvPaginationObject = await this.queryFields(reqs);
    // let t1 = performance.now()
    // console.log('A Call to queryFields took ms ', t1 - t0)

    if (this.joinNestedInSql) return result

    // t0 = performance.now()

    const nestedReqs = nestedRequestsFromPaginationObject(result)
    // t1 = performance.now()
    // console.log('A Call to nestedRequestsFromPaginationObject took ms ', t1 - t0)

    // t0 = performance.now()
    const nestedResult = await this.queryNestedFields(nestedReqs)
    // t1 = performance.now()
    // console.log('A Call to queryNestedFields took ms ', t1 - t0)

    // t0 = performance.now()
    const merged = mergePaginationObjects([result, nestedResult]);
    // t1 = performance.now()
    // console.log('A Call to mergePaginationObjects took ms ', t1 - t0)
    return merged
  }


  private async queryFields(reqs: GvFieldPageReq[]) {
    this.replaceHasTimeSpanWithSixProps(reqs)

    const rs = groupReqsBySource(reqs);

    if (this.mergeReqsByTargetInSql) {
      const grouped = groupReqsByField(rs)

      const results = await Promise.all(
        grouped.map(r => new QFieldPage3(this.datasource, this.joinNestedInSql).queryFields(r.reqs, r.sources))
      );
      const result: GvPaginationObject = mergePaginationObjects(results);
      return result;
    }

    const results = await Promise.all(
      rs.map(r => new QFieldPage3(this.datasource, this.joinNestedInSql).queryFields(r.reqs, [r.source]))
    );
    const result: GvPaginationObject = mergePaginationObjects(results);
    return result;
  }
  private async queryNestedFields(reqs: GvFieldPageReq[]) {

    // let t0 = performance.now()
    const rs = groupReqsBySource(reqs);
    // logToFile(JSON.stringify(rs, null, 2), 'by-source')
    // let t1 = performance.now()
    // console.log('   Call to groupReqsBySource took ms ', t1 - t0)


    // t0 = performance.now()
    const grouped = groupReqsByField(rs)
    // t1 = performance.now()
    // console.log('   Call to groupReqsByField took ms ', t1 - t0)

    // t0 = performance.now()

    const results = await Promise.all(
      grouped.map(r => new QFieldPage3(this.datasource, this.joinNestedInSql).queryFields(r.reqs, r.sources))
    );
    // t1 = performance.now()
    // console.log('   Call to queryFields took ms ', t1 - t0)

    // t0 = performance.now()

    const result: GvPaginationObject = mergePaginationObjects(results);
    // t1 = performance.now()
    // console.log('   Call to mergePaginationObjects took ms ', t1 - t0)

    return result;
  }



  replaceHasTimeSpanWithSixProps(reqs: GvFieldPageReq[]) {
    const index = reqs.findIndex((req) => req.page.property.fkProperty === 4 && req.page.isOutgoing === true)
    if (index > -1) {
      const hasTimeSpanReq = reqs[index]
      const sixReqs = this.createTimeSpanFieldRequests(hasTimeSpanReq)
      reqs.splice(index, 1, ...sixReqs)
    }
  }

  private async loadPage(req: GvFieldPageReq): Promise<GvPaginationObject> {

    // if (equals(req.targets, {50: {timeSpan: TrueEnum.true}})) {
    //   const requests = this.createTimeSpanFieldRequests(req)
    //   return this.loadPages(requests)
    // }
    const res = await new QFieldPage3(this.datasource, this.joinNestedInSql).query(req);
    const requests: GvFieldPageReq[] = nestedRequestsFromPaginationObject(res);


    const subPages = await this.loadPages(requests)
    return mergeDeepWith(concat, res, subPages);

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



function groupReqsBySource(reqs: GvFieldPageReq[]): ReqsBySource[] {
  const reqsBySource: {[uid: string]: {reqs: GvFieldPageReq[]; source: GvFieldSourceEntity;};} = {};

  for (const r of reqs) {
    const sourceUid = JSON.stringify(r.page.source);
    const rNoSource: GvFieldPageReq = {
      ...r,
      page: {...r.page, source: {}}
    }
    if (reqsBySource[sourceUid]) {
      reqsBySource[sourceUid].reqs.push(rNoSource);
    } else {
      reqsBySource[sourceUid] = {
        reqs: [rNoSource],
        source: r.page.source
      };
    }
  }
  const rs = values(reqsBySource);
  return rs;
}

function groupReqsByField(reqs: ReqsBySource[]) {
  const byReqs: {[uid: string]: {reqs: GvFieldPageReq[]; sources: GvFieldSourceEntity[];};} = {};

  for (const r of reqs) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hash = objectHash(r.reqs)
    if (byReqs[hash]) {
      byReqs[hash].sources.push(r.source);
    } else {
      byReqs[hash] = {
        reqs: r.reqs,
        sources: [r.source]
      };
    }
  }
  const rs = values(byReqs);
  return rs;
}

function mergePaginationObjects(results: GvPaginationObject[]) {
  let result: GvPaginationObject = {subfieldPages: []};
  for (const obj of results) {
    result = mergeDeepWith(concat, result, obj);
  }
  return result;
}
function nestedRequestsFromPaginationObject(res: GvPaginationObject): GvFieldPageReq[] {
  const requests: GvFieldPageReq[] = [];
  for (const subfieldPageInfo of res.subfieldPages) {
    for (const statementWT of subfieldPageInfo.paginatedStatements) {
      const req = subfieldPageInfo.req;
      const e = statementWT.target.entity?.resource;
      if (e) {
        const source: GvFieldSourceEntity = {fkInfo: e.pk_entity};
        const fkClass = e.fk_class;
        const targetType = req.targets[fkClass];
        if (targetType?.nestedResource?.length) {
          const subreqs = targetType.nestedResource;
          const scope = req.page.scope.notInProject ? {inRepo: true} : req.page.scope;
          const nestedreqs = nestedRequestsFromNestedResource(
            req.pkProject,
            source,
            subreqs,
            scope
          );
          requests.push(...nestedreqs);
        }
      }
    }
  }
  return requests;
}

export function nestedRequestsFromNestedResource(
  pkProject: number,
  source: GvFieldSourceEntity,
  subReqs: GvSubentitFieldPageReq[],
  parentScope: GvFieldPageScope,
): GvFieldPageReq[] {

  /**
   * generate the scope of the subpages
   */
  let scope: GvFieldPageScope;
  if (parentScope.notInProject)
    scope = {inRepo: true};
  else
    scope = parentScope;

  // const promises$ = []
  const results = []
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

    results.push(req)
  }
  return results;

  // return Promise.all(promises$)
}
