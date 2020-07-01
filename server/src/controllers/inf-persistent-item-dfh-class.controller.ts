import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InfPersistentItem,
  DfhClass,
} from '../models';
import {InfPersistentItemRepository} from '../repositories';

export class InfPersistentItemDfhClassController {
  constructor(
    @repository(InfPersistentItemRepository)
    public infPersistentItemRepository: InfPersistentItemRepository,
  ) { }

  @get('/inf-persistent-items/{id}/dfh-class', {
    responses: {
      '200': {
        description: 'DfhClass belonging to InfPersistentItem',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DfhClass)},
          },
        },
      },
    },
  })
  async getDfhClass(
    @param.path.number('id') id: typeof InfPersistentItem.prototype.pk_entity,
  ): Promise<DfhClass> {
    return this.infPersistentItemRepository.dfh_class(id);
  }
}
