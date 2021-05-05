/* eslint-disable @typescript-eslint/camelcase */
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3';
import {get, param} from '@loopback/rest';
import {Roles} from '../../components/authorization';
import {QResource} from '../../components/query/q-resource';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';

@tags('project data')
export class CreateProjectDataController {
  constructor(
    @inject('datasources.postgres1')
    public datasource: Postgres1DataSource,

  ) { }



  @get('project-data/get-resource', {
    responses: {
      '200': {
        description: 'The resource and its project relation',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': GvPositiveSchemaObject
              },
            }
          }
        }
      },
    },
  })
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async getResource(
    @param.path.number('pkProject') pkProject: number,
    @param.path.number('pkEntity') pkEntity: number,

  ): Promise<GvPositiveSchemaObject> {

    return new QResource(this.datasource).query(pkProject, pkEntity)
  }

  @get('project-data/get-types-of-project', {
    responses: {
      '200': {
        description: 'The resource and its project relation',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                'x-ts-type': GvPositiveSchemaObject
              },
            }
          }
        }
      },
    },
  })
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async getTypesOfProject(
    @param.path.number('pkProject') pkProject: number,
    @param.path.number('pkEntity') pkEntity: number,

  ): Promise<GvPositiveSchemaObject> {

    return new QResource(this.datasource).query(pkProject, pkEntity)
  }






}

