import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import {Roles} from '../components/authorization/keys';
import {QAlternativeLeafItems} from '../components/query/q-alternative-leaf-items';
import {QSubfieldPage} from '../components/query/q-subfield-page';
import {registerType} from '../components/spec-enhancer/model.spec.enhancer';
import {Postgres1DataSource} from '../datasources';
import {GvLoadSubfieldPageReq, GvPaginationAlternativeLeafItemsReq, GvPaginationObject, GvSubfieldId, GvLoadSubentitySubfieldPageReq, GvSubfieldPageScope, GvSubfieldPage} from '../models';
import {flatten, mergeDeepWith, concat} from 'ramda';

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
    @requestBody() req: GvLoadSubfieldPageReq
  ): Promise<GvPaginationObject> {

    const results: GvPaginationObject[] = []
    const res = await new QSubfieldPage(this.datasource).query(req)

    if (req.subfieldType.temporalEntity?.length) {
      if (res.schemas.inf?.temporal_entity?.length) {
        const subPageQueries = res.schemas.inf?.temporal_entity.map(subentity => {
          const fkSourceEntity = subentity.pk_entity as number;
          const subreqs = req.subfieldType.temporalEntity as GvLoadSubentitySubfieldPageReq[]
          const scope = req.page.scope.notInProject ? {inRepo: true} : req.page.scope
          return this.querySubfields(
            req.pkProject,
            fkSourceEntity,
            subreqs,
            scope
          )
        })

        const r = await Promise.all(subPageQueries)
        results.push(...flatten(r))
      }
    }
    let result = res
    for (const obj of results) {
      result = mergeDeepWith(concat, result, obj)
    }
    return result
  }

  private async querySubfields(
    pkProject: number,
    fkSourceEntity: number,
    subReqs: GvLoadSubentitySubfieldPageReq[],
    parentScope: GvSubfieldPageScope,
  ) {

    /**
     * generate the scope of the subpages
     */
    let scope: GvSubfieldPageScope;
    if (parentScope.notInProject)
      scope = {inRepo: true};
    else
      scope = parentScope;

    const promises$ = []
    for (const subReq of subReqs) {
      /**
       * convert GvLoadSubentitySubfieldPageReq to GvLoadSubfieldPageReq
       */
      const page: GvSubfieldPage = {
        ...subReq.page,
        scope,
        fkSourceEntity
      };
      const subfieldType = subReq.subfieldType;
      const req: GvLoadSubfieldPageReq = {
        page,
        subfieldType,
        pkProject
      }

      promises$.push(new QSubfieldPage(this.datasource).query(req));

    }


    return Promise.all(promises$)
  }

}

registerType(GvSubfieldId)
