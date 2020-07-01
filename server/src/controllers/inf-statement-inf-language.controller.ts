import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  InfStatement,
  InfLanguage,
} from '../models';
import {InfStatementRepository} from '../repositories';

export class InfStatementInfLanguageController {
  constructor(
    @repository(InfStatementRepository) protected infStatementRepository: InfStatementRepository,
  ) { }

  @get('/inf-statements/{id}/inf-language', {
    responses: {
      '200': {
        description: 'InfStatement has one InfLanguage',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InfLanguage),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfLanguage>,
  ): Promise<InfLanguage> {
    return this.infStatementRepository.object_language(id).get(filter);
  }

  @post('/inf-statements/{id}/inf-language', {
    responses: {
      '200': {
        description: 'InfStatement model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfLanguage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfStatement.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfLanguage, {
            title: 'NewInfLanguageInInfStatement',
            exclude: ['pk_entity'],
            optional: ['fk_object_info']
          }),
        },
      },
    }) infLanguage: Omit<InfLanguage, 'pk_entity'>,
  ): Promise<InfLanguage> {
    return this.infStatementRepository.object_language(id).create(infLanguage);
  }

  @patch('/inf-statements/{id}/inf-language', {
    responses: {
      '200': {
        description: 'InfStatement.InfLanguage PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfLanguage, {partial: true}),
        },
      },
    })
    infLanguage: Partial<InfLanguage>,
    @param.query.object('where', getWhereSchemaFor(InfLanguage)) where?: Where<InfLanguage>,
  ): Promise<Count> {
    return this.infStatementRepository.object_language(id).patch(infLanguage, where);
  }

  @del('/inf-statements/{id}/inf-language', {
    responses: {
      '200': {
        description: 'InfStatement.InfLanguage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfLanguage)) where?: Where<InfLanguage>,
  ): Promise<Count> {
    return this.infStatementRepository.object_language(id).delete(where);
  }
}
