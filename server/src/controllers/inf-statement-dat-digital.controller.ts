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
  DatDigital,
} from '../models';
import {InfStatementRepository} from '../repositories';

export class InfStatementDatDigitalController {
  constructor(
    @repository(InfStatementRepository) protected infStatementRepository: InfStatementRepository,
  ) { }

  @get('/inf-statements/{id}/dat-digital', {
    responses: {
      '200': {
        description: 'InfStatement has one DatDigital',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DatDigital),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DatDigital>,
  ): Promise<DatDigital> {
    return this.infStatementRepository.subject_digital(id).get(filter);
  }

  @post('/inf-statements/{id}/dat-digital', {
    responses: {
      '200': {
        description: 'InfStatement model instance',
        content: {'application/json': {schema: getModelSchemaRef(DatDigital)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfStatement.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatDigital, {
            title: 'NewDatDigitalInInfStatement',
            exclude: ['pk_entity'],
            optional: ['fk_subject_data']
          }),
        },
      },
    }) datDigital: Omit<DatDigital, 'pk_entity'>,
  ): Promise<DatDigital> {
    return this.infStatementRepository.subject_digital(id).create(datDigital);
  }

  @patch('/inf-statements/{id}/dat-digital', {
    responses: {
      '200': {
        description: 'InfStatement.DatDigital PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatDigital, {partial: true}),
        },
      },
    })
    datDigital: Partial<DatDigital>,
    @param.query.object('where', getWhereSchemaFor(DatDigital)) where?: Where<DatDigital>,
  ): Promise<Count> {
    return this.infStatementRepository.subject_digital(id).patch(datDigital, where);
  }

  @del('/inf-statements/{id}/dat-digital', {
    responses: {
      '200': {
        description: 'InfStatement.DatDigital DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DatDigital)) where?: Where<DatDigital>,
  ): Promise<Count> {
    return this.infStatementRepository.subject_digital(id).delete(where);
  }
}
