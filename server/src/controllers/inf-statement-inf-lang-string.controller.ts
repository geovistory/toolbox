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
  InfLangString,
} from '../models';
import {InfStatementRepository} from '../repositories';

export class InfStatementInfLangStringController {
  constructor(
    @repository(InfStatementRepository) protected infStatementRepository: InfStatementRepository,
  ) { }

  @get('/inf-statements/{id}/inf-lang-string', {
    responses: {
      '200': {
        description: 'InfStatement has one InfLangString',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InfLangString),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfLangString>,
  ): Promise<InfLangString> {
    return this.infStatementRepository.object_lang_string(id).get(filter);
  }

  @post('/inf-statements/{id}/inf-lang-string', {
    responses: {
      '200': {
        description: 'InfStatement model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfLangString)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfStatement.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfLangString, {
            title: 'NewInfLangStringInInfStatement',
            exclude: ['pk_entity'],
            optional: ['fk_object_info']
          }),
        },
      },
    }) infLangString: Omit<InfLangString, 'pk_entity'>,
  ): Promise<InfLangString> {
    return this.infStatementRepository.object_lang_string(id).create(infLangString);
  }

  @patch('/inf-statements/{id}/inf-lang-string', {
    responses: {
      '200': {
        description: 'InfStatement.InfLangString PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfLangString, {partial: true}),
        },
      },
    })
    infLangString: Partial<InfLangString>,
    @param.query.object('where', getWhereSchemaFor(InfLangString)) where?: Where<InfLangString>,
  ): Promise<Count> {
    return this.infStatementRepository.object_lang_string(id).patch(infLangString, where);
  }

  @del('/inf-statements/{id}/inf-lang-string', {
    responses: {
      '200': {
        description: 'InfStatement.InfLangString DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfLangString)) where?: Where<InfLangString>,
  ): Promise<Count> {
    return this.infStatementRepository.object_lang_string(id).delete(where);
  }
}
