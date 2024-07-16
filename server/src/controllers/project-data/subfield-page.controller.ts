import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {Roles} from '../../components/authorization/keys';
import {registerType} from '../../components/spec-enhancer/model.spec.enhancer';
import {Postgres1DataSource} from '../../datasources';
import {GvFieldId, GvFieldPageReq, GvPaginationObject} from '../../models';


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


    const rows: {pages: GvPaginationObject}[] = await this.datasource.execute(
      'SELECT pages FROM commons.get_field_pages($1) AS pages;',
      [JSON.stringify(reqs)]
    );

    return rows[0].pages;

  }



}

registerType(GvFieldId)
