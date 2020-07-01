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
  InfAppellation,
} from '../models';
import {InfStatementRepository} from '../repositories';

export class InfStatementInfAppellationController {
  constructor(
    @repository(InfStatementRepository) protected infStatementRepository: InfStatementRepository,
  ) { }

  @get('/inf-statements/{id}/inf-appellation', {
    responses: {
      '200': {
        description: 'InfStatement has one InfAppellation',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InfAppellation),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfAppellation>,
  ): Promise<InfAppellation> {
    return this.infStatementRepository.object_appellation(id).get(filter);
  }

  @post('/inf-statements/{id}/inf-appellation', {
    responses: {
      '200': {
        description: 'InfStatement model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfAppellation)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfStatement.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfAppellation, {
            title: 'NewInfAppellationInInfStatement',
            exclude: ['pk_entity'],
            optional: ['fk_object_info']
          }),
        },
      },
    }) infAppellation: Omit<InfAppellation, 'pk_entity'>,
  ): Promise<InfAppellation> {
    return this.infStatementRepository.object_appellation(id).create(infAppellation);
  }

  @patch('/inf-statements/{id}/inf-appellation', {
    responses: {
      '200': {
        description: 'InfStatement.InfAppellation PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfAppellation, {partial: true}),
        },
      },
    })
    infAppellation: Partial<InfAppellation>,
    @param.query.object('where', getWhereSchemaFor(InfAppellation)) where?: Where<InfAppellation>,
  ): Promise<Count> {
    return this.infStatementRepository.object_appellation(id).patch(infAppellation, where);
  }

  @del('/inf-statements/{id}/inf-appellation', {
    responses: {
      '200': {
        description: 'InfStatement.InfAppellation DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfAppellation)) where?: Where<InfAppellation>,
  ): Promise<Count> {
    return this.infStatementRepository.object_appellation(id).delete(where);
  }
}
