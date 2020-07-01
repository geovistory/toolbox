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
  InfTemporalEntity,
  InfStatement,
} from '../models';
import {InfTemporalEntityRepository} from '../repositories';

export class InfTemporalEntityInfStatementController {
  constructor(
    @repository(InfTemporalEntityRepository) protected infTemporalEntityRepository: InfTemporalEntityRepository,
  ) { }

  @get('/inf-temporal-entities/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'Array of InfTemporalEntity has many InfStatement',
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
    return this.infTemporalEntityRepository.outgoing_statements(id).find(filter);
  }

  @post('/inf-temporal-entities/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfTemporalEntity model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfStatement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfTemporalEntity.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfStatement, {
            title: 'NewInfStatementInInfTemporalEntity',
            exclude: ['pk_entity'],
            optional: ['fk_subject_info']
          }),
        },
      },
    }) infStatement: Omit<InfStatement, 'pk_entity'>,
  ): Promise<InfStatement> {
    return this.infTemporalEntityRepository.outgoing_statements(id).create(infStatement);
  }

  @patch('/inf-temporal-entities/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfTemporalEntity.InfStatement PATCH success count',
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
    return this.infTemporalEntityRepository.outgoing_statements(id).patch(infStatement, where);
  }

  @del('/inf-temporal-entities/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfTemporalEntity.InfStatement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfStatement)) where?: Where<InfStatement>,
  ): Promise<Count> {
    return this.infTemporalEntityRepository.outgoing_statements(id).delete(where);
  }
}
