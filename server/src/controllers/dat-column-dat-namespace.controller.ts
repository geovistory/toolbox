import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DatColumn,
  DatNamespace,
} from '../models';
import {DatColumnRepository} from '../repositories';

export class DatColumnDatNamespaceController {
  constructor(
    @repository(DatColumnRepository)
    public datColumnRepository: DatColumnRepository,
  ) { }

  @get('/dat-columns/{id}/dat-namespace', {
    responses: {
      '200': {
        description: 'DatNamespace belonging to DatColumn',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DatNamespace)},
          },
        },
      },
    },
  })
  async getDatNamespace(
    @param.path.number('id') id: typeof DatColumn.prototype.pk_entity,
  ): Promise<DatNamespace> {
    return this.datColumnRepository.namespave(id);
  }
}
