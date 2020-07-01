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
  InfPersistentItem,
} from '../models';
import {DfhClassRepository} from '../repositories';

export class DfhClassInfPersistentItemController {
  constructor(
    @repository(DfhClassRepository) protected dfhClassRepository: DfhClassRepository,
  ) { }

  @get('/dfh-classes/{id}/inf-persistent-items', {
    responses: {
      '200': {
        description: 'Array of DfhClass has many InfPersistentItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(InfPersistentItem)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<InfPersistentItem>,
  ): Promise<InfPersistentItem[]> {
    return this.dfhClassRepository.persistent_items(id).find(filter);
  }

  @post('/dfh-classes/{id}/inf-persistent-items', {
    responses: {
      '200': {
        description: 'DfhClass model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfPersistentItem)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof DfhClass.prototype.pk_class,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfPersistentItem, {
            title: 'NewInfPersistentItemInDfhClass',
            exclude: ['pk_entity'],
            optional: ['fk_class']
          }),
        },
      },
    }) infPersistentItem: Omit<InfPersistentItem, 'pk_entity'>,
  ): Promise<InfPersistentItem> {
    return this.dfhClassRepository.persistent_items(id).create(infPersistentItem);
  }

  @patch('/dfh-classes/{id}/inf-persistent-items', {
    responses: {
      '200': {
        description: 'DfhClass.InfPersistentItem PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfPersistentItem, {partial: true}),
        },
      },
    })
    infPersistentItem: Partial<InfPersistentItem>,
    @param.query.object('where', getWhereSchemaFor(InfPersistentItem)) where?: Where<InfPersistentItem>,
  ): Promise<Count> {
    return this.dfhClassRepository.persistent_items(id).patch(infPersistentItem, where);
  }

  @del('/dfh-classes/{id}/inf-persistent-items', {
    responses: {
      '200': {
        description: 'DfhClass.InfPersistentItem DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(InfPersistentItem)) where?: Where<InfPersistentItem>,
  ): Promise<Count> {
    return this.dfhClassRepository.persistent_items(id).delete(where);
  }
}
