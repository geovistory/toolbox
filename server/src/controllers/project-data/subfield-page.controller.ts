import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {concat, mergeDeepWith} from 'ramda';
import {Roles} from '../../components/authorization/keys';
import {fieldPageReqsToSqlArray} from '../../components/query/fieldpage/fieldPageReqsToSqlArray';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {Postgres1DataSource} from '../../datasources';
import {GvFieldId, GvFieldPage, GvFieldPageReq, GvFieldPageScope, GvPaginationObject, GvSubentitFieldPageReq} from '../../models';
import {GvSubfieldPageInfo} from '../../models/field-response/GvSubfieldPageInfo';
import {GvFieldSourceEntity} from '../../models/field/gv-field-source-entity';
import {SqlBuilderLb4Models} from '../../utils/sql-builders/sql-builder-lb4-models';


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
    ) reqs: GvFieldPageReq[],
  ): Promise<GvPaginationObject> {

    const pages = await this.queryPagesRecursive(reqs);

    return mergePaginationObjects(pages)

  }


  private async queryPagesRecursive(reqs: GvFieldPageReq[], paginationObjects: GvPaginationObject[] = []): Promise<GvPaginationObject[]> {

    // create request groups
    const sqls = fieldPageReqsToSqlArray(reqs);

    if (sqls.length < 1) return []

    // execute each group
    const pagesInGroup: GvPaginationObject = {subfieldPages: []}
    for (const sql of sqls) {
      const q = new SqlBuilderLb4Models(this.datasource);
      q.sql = sql;
      const resultingPages = await q.execute<GvSubfieldPageInfo[]>();
      pagesInGroup.subfieldPages.push(...resultingPages);
    }
    paginationObjects.push(pagesInGroup)

    if (paginationObjects.length > 5) {
      // max levels of nesting reached
      return paginationObjects
    }

    // extract nested requests of last object
    const lastObject = paginationObjects[paginationObjects.length - 1]
    const nestedReqs = nestedRequestsFromPaginationObject(lastObject)
    if (nestedReqs.length) {
      // nested requests -> query them

      const nestedPaginationObjects = await this.queryPagesRecursive(nestedReqs, paginationObjects)
      return nestedPaginationObjects

    } else {
      // no nested requests -> return the objects

      return paginationObjects
    }

  }


}

registerType(GvFieldId)


function mergePaginationObjects(results: GvPaginationObject[]) {
  let result: GvPaginationObject = {subfieldPages: []};
  for (const obj of results) {
    result = mergeDeepWith(concat, result, obj);
  }
  return result;
}

/**
 * Extracts nested requests from pagination object and returns
 * an array of GvFieldPageReq, with the correct scope
 * @param res
 * @returns
 */
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

  // generate the scope of the subpages
  let scope: GvFieldPageScope;
  if (parentScope.notInProject)
    scope = {inRepo: true};
  else
    scope = parentScope;

  const results = []
  for (const subReq of subReqs) {
    // convert GvLoadSubentitySubfieldPageReq to GvLoadSubfieldPageReq
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

}
