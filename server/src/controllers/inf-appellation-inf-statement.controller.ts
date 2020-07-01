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
  InfAppellation,
  InfStatement,
} from '../models';
import {InfAppellationRepository} from '../repositories';

export class InfAppellationInfStatementController {
  constructor(
    @repository(InfAppellationRepository) protected infAppellationRepository: InfAppellationRepository,
  ) { }

  @get('/inf-appellations/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'Array of InfAppellation has many InfStatement',
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
    return this.infAppellationRepository.incoming_statements(id).find(filter);
  }

  @post('/inf-appellations/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfAppellation model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfStatement)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfAppellation.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfStatement, {
            title: 'NewInfStatementInInfAppellation',
            exclude: ['pk_entity'],
            optional: ['fk_object_info']
          }),
        },
      },
    }) infStatement: Omit<InfStatement, 'pk_entity'>,
  ): Promise<InfStatement> {
    return this.infAppellationRepository.incoming_statements(id).create(infStatement);
  }

  @patch('/inf-appellations/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfAppellation.InfStatement PATCH success count',
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
    return this.infAppellationRepository.incoming_statements(id).patch(infStatement, where);
  }

  @del('/inf-appellations/{id}/inf-statements', {
    responses: {
      '200': {
        description: 'InfAppellation.InfStatement DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfStatement)) where?: Where<InfStatement>,
  ): Promise<Count> {
    return this.infAppellationRepository.incoming_statements(id).delete(where);
  }
}
