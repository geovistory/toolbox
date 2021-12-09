import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {post, tags} from '@loopback/openapi-v3';
import {param} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {Roles} from '../../components/authorization';
import {QEntityAddToProject} from '../../components/query/q-entity-add-to-project';
import {QEntityRemoveFromProject} from '../../components/query/q-entity-remove-from-project';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';

@tags('project data')
export class AddOrRemoveEntityController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,
    @inject(SecurityBindings.USER, {optional: true}) public user: UserProfile,

  ) { }



  @post('project-data/add-entity', {
    responses: {
      '200': {
        description: 'Add entity and some of its statements',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPositiveSchemaObject
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async addEntityToProject(
    @param.query.number('pkProject', {required: true}) pkProject: number,
    @param.query.number('pkEntity', {required: true}) pkEntity: number,
  ): Promise<GvPositiveSchemaObject> {
    return new QEntityAddToProject(this.datasource).query(pkProject, pkEntity, parseInt(this.user[securityId]))
  }

  @post('project-data/remove-entity', {
    responses: {
      '200': {
        description: 'Remove entitiy and some of its statements',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GvPositiveSchemaObject
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async removeEntityFromProject(
    @param.query.number('pkProject', {required: true}) pkProject: number,
    @param.query.number('pkEntity', {required: true}) pkEntity: number,
  ): Promise<GvPositiveSchemaObject> {
    return new QEntityRemoveFromProject(this.datasource).query(pkProject, pkEntity, parseInt(this.user[securityId]))
  }
}
