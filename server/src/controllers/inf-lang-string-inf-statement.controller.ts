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
  InfLangString,
  InfStatement,
} from '../models';
import {InfLangStringRepository} from '../repositories';

export class InfLangStringInfStatementController {
  constructor(
    @repository(InfLangStringRepository) protected infLangStringRepository: InfLangStringRepository,
  ) { }

  @get('/inf-lang-strings/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'Array of InfLangString has many InfStatement',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InfStatement)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfStatement>,
  ): Promise<InfStatement[]> {
    return this.infLangStringRepository.incoming_statements(id).find(filter);
  }

  @post('/inf-lang-strings/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfLangString model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfStatement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfLangString.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfStatement, {
            title: 'NewInfStatementInInfLangString',
            exclude: ['pk_entity'],
            optional: ['fk_object_info']
          }),
        },
      },
    }) infStatement: Omit<InfStatement, 'pk_entity'>,
  ): Promise<InfStatement> {
    return this.infLangStringRepository.incoming_statements(id).create(infStatement);
  }

  @patch('/inf-lang-strings/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfLangString.InfStatement PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfStatement, {partial: true}),
        },
      },
    })
    infStatement: Partial<InfStatement>,
    @param.query.object('where', getWhereSchemaFor(InfStatement)) where?: Where<InfStatement>,
  ): Promise<Count> {
    return this.infLangStringRepository.incoming_statements(id).patch(infStatement, where);
  }

  @del('/inf-lang-strings/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfLangString.InfStatement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfStatement)) where?: Where<InfStatement>,
  ): Promise<Count> {
    return this.infLangStringRepository.incoming_statements(id).delete(where);
  }
}
