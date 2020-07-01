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
  DfhClass,
  DfhProperty,
} from '../models';
import {DfhClassRepository} from '../repositories';

export class DfhClassDfhPropertyController {
  constructor(
    @repository(DfhClassRepository) protected dfhClassRepository: DfhClassRepository,
  ) { }

  @get('/dfh-classes/{id}/dfh-properties', {
    responses: {
      '200': {
        description: 'Array of DfhClass has many DfhProperty',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DfhProperty)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<DfhProperty>,
  ): Promise<DfhProperty[]> {
    return this.dfhClassRepository.ingoing_properties(id).find(filter);
  }

  @post('/dfh-classes/{id}/dfh-properties', {
    responses: {
      '200': {
        description: 'DfhClass model instance',
        content: {'application/json': {schema: getModelSchemaRef(DfhProperty)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DfhClass.prototype.pk_class,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DfhProperty, {
            title: 'NewDfhPropertyInDfhClass',
            exclude: ['pk_property'],
            optional: ['has_range']
          }),
        },
      },
    }) dfhProperty: Omit<DfhProperty, 'pk_property'>,
  ): Promise<DfhProperty> {
    return this.dfhClassRepository.ingoing_properties(id).create(dfhProperty);
  }

  @patch('/dfh-classes/{id}/dfh-properties', {
    responses: {
      '200': {
        description: 'DfhClass.DfhProperty PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DfhProperty, {partial: true}),
        },
      },
    })
    dfhProperty: Partial<DfhProperty>,
    @param.query.object('where', getWhereSchemaFor(DfhProperty)) where?: Where<DfhProperty>,
  ): Promise<Count> {
    return this.dfhClassRepository.ingoing_properties(id).patch(dfhProperty, where);
  }

  @del('/dfh-classes/{id}/dfh-properties', {
    responses: {
      '200': {
        description: 'DfhClass.DfhProperty DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(DfhProperty)) where?: Where<DfhProperty>,
  ): Promise<Count> {
    return this.dfhClassRepository.ingoing_properties(id).delete(where);
  }
}
