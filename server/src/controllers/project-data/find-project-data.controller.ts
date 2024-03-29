import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {tags} from '@loopback/openapi-v3';
import {get, param} from '@loopback/rest';
import {Roles} from '../../components/authorization';
import {QChunksOfDigital} from '../../components/query/q-chunks-of-digital';
import {QPlatformVocabularyInstances} from '../../components/query/q-platform-vocabulary-instances';
import {QResource} from '../../components/query/q-resource';
import {QTypesOfProject} from '../../components/query/q-types-of-project';
import {Postgres1DataSource} from '../../datasources/postgres1.datasource';
import {logAsyncPerformance} from '../../decorators/logAsyncPerformance.decorator';
import {GvPositiveSchemaObject} from '../../models/gv-positive-schema-object.model';

@tags('project data')
export class FindProjectDataController {
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
              'x-ts-type': GvPositiveSchemaObject
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  async getResource(
    @param.query.number('pkProject', {required: true}) pkProject: number,
    @param.query.number('pkEntity', {required: true}) pkEntity: number,
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
              'x-ts-type': GvPositiveSchemaObject
            }
          }
        }
      },
    },
  })
  @authenticate('basic')
  @authorize({allowedRoles: [Roles.PROJECT_MEMBER]})
  @logAsyncPerformance('getTypesOfProject')
  async getTypesOfProject(
    @param.query.number('pkProject', {required: true}) pkProject: number,

  ): Promise<GvPositiveSchemaObject> {

    return new QTypesOfProject(this.datasource).query(pkProject)
  }


  @get('project-data/get-platform-vocabulary-instances', {
    responses: {
      '200': {
        description: 'The resource and its project relation',
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
  @logAsyncPerformance('getPlatformVocabularyInstances')
  async getPlatformVocabularyInstances(
    @param.query.number('vocabProject', {required: true}) vocabProject: number,
    @param.query.number('parentOrAncestorClass', {required: true}) parentOrAncestorClass: number,
  ): Promise<GvPositiveSchemaObject> {

    return new QPlatformVocabularyInstances(this.datasource).query(vocabProject, parentOrAncestorClass)
  }




  @get('project-data/get-chunks-of-digital', {
    responses: {
      '200': {
        description: 'The resource and its project relation',
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
  async getChunksOfDigital(
    @param.query.number('pkProject', {required: true}) pkProject: number,
    @param.query.number('pkDigital', {required: true}) pkDigital: number,

  ): Promise<GvPositiveSchemaObject> {

    return new QChunksOfDigital(this.datasource).query(pkProject, pkDigital)
  }



}

