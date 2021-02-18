import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import {Roles} from '../components/authorization/keys';
import {QAlternativeLeafItems} from '../components/query/q-alternative-leaf-items';
import {Postgres1DataSource} from '../datasources';
import {GvPaginationAlternativeLeafItemsReq} from '../models/paginated-statements/gv-pagination-alternative-leaf-items-req';
import {GvPaginationObject} from '../models/paginated-statements/gv-pagination-object';
import {GvLoadSubfieldPageReq} from '../models/paginated-statements/gv-load-subfield-page-req';

export class PaginatedStatementsController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
  ) { }

  @post('paginated-statements/alternative-leaf-items', {
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

  @post('paginated-statements/load-subfield-page', {
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

    throw new Error("not yet implemented" + JSON.stringify(req));
  }
}
