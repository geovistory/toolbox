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
  InfTextProperty,
  InfLanguage,
} from '../models';
import {InfTextPropertyRepository} from '../repositories';

export class InfTextPropertyInfLanguageController {
  constructor(
    @repository(InfTextPropertyRepository) protected infTextPropertyRepository: InfTextPropertyRepository,
  ) { }

  @get('/inf-text-properties/{id}/inf-language', {
    responses: {
      '200': {
        description: 'InfTextProperty has one InfLanguage',
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
    return this.infTextPropertyRepository.language(id).get(filter);
  }

  @post('/inf-text-properties/{id}/inf-language', {
    responses: {
      '200': {
        description: 'InfTextProperty model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfLanguage)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof InfTextProperty.prototype.pk_entity,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfLanguage, {
            title: 'NewInfLanguageInInfTextProperty',
            exclude: ['pk_entity'],
            optional: ['fk_language']
          }),
        },
      },
    }) infLanguage: Omit<InfLanguage, 'pk_entity'>,
  ): Promise<InfLanguage> {
    return this.infTextPropertyRepository.language(id).create(infLanguage);
  }

  @patch('/inf-text-properties/{id}/inf-language', {
    responses: {
      '200': {
        description: 'InfTextProperty.InfLanguage PATCH success count',
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
    return this.infTextPropertyRepository.language(id).patch(infLanguage, where);
  }

  @del('/inf-text-properties/{id}/inf-language', {
    responses: {
      '200': {
        description: 'InfTextProperty.InfLanguage DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfLanguage)) where?: Where<InfLanguage>,
  ): Promise<Count> {
    return this.infTextPropertyRepository.language(id).delete(where);
  }
}
