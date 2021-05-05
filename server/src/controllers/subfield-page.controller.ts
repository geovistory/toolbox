import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import {Roles} from '../components/authorization/keys';
import {QAlternativeLeafItems} from '../components/query/q-alternative-leaf-items';
import {QFieldPage} from '../components/query/q-field-page';
import {registerType} from '../components/spec-enhancer/model.spec.enhancer';
import {Postgres1DataSource} from '../datasources';
import {GvFieldPageReq, GvPaginationAlternativeLeafItemsReq, GvPaginationObject, GvFieldId, GvSubentitFieldPageReq, GvFieldPageScope, GvFieldPage} from '../models';
import {flatten, mergeDeepWith, concat} from 'ramda';
import {GvFieldSourceEntity} from '../models/field/gv-field-source-entity';

export class SubfieldPageController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) { }

  @post('subfield-page/alternative-leaf-items', {
    responses: {
      '200': {
        description: "Get PaginationObject to build a list of leaf items not (yet) in project.",
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
  async alternativeLeafItems(
    @requestBody() req: GvPaginationAlternativeLeafItemsReq
  ): Promise<GvPaginationObject> {
    const q = new QAlternativeLeafItems(this.datasource)
    return q.query(req.pkProject, req.filterObject, req.limit, req.offset)
  }

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
  async loadSubfieldPage(
    @requestBody() req: GvFieldPageReq
  ): Promise<GvPaginationObject> {

    const results: GvPaginationObject[] = []
    const res = await new QFieldPage(this.datasource).query(req)

    if (res.schemas.inf?.resource?.length) {
      const subPageQueries: Promise<GvPaginationObject[]>[] = []
      res.schemas.inf?.resource.forEach(e => {
        const source: GvFieldSourceEntity = {fkInfo: e.pk_entity as number};
        const fkClass = e.fk_class as number;
        const targetType = req.targets[fkClass]
        if (targetType?.nestedResource?.length) {
          const subreqs = targetType.nestedResource as GvSubentitFieldPageReq[]
          const scope = req.page.scope.notInProject ? {inRepo: true} : req.page.scope
          subPageQueries.push(this.querySubfields(
            req.pkProject,
            source,
            subreqs,
            scope
          ))
        }
      })

      const r = await Promise.all(subPageQueries)
      results.push(...flatten(r))
    }
    let result = res
    for (const obj of results) {
      result = mergeDeepWith(concat, result, obj)
    }
    return result
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

      promises$.push(new QFieldPage(this.datasource).query(req));

    }


    return Promise.all(promises$)
  }

}

registerType(GvFieldId)
