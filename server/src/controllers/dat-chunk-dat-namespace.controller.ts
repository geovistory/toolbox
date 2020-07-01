import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DatChunk,
  DatNamespace,
} from '../models';
import {DatChunkRepository} from '../repositories';

export class DatChunkDatNamespaceController {
  constructor(
    @repository(DatChunkRepository)
    public datChunkRepository: DatChunkRepository,
  ) { }

  @get('/dat-chunks/{id}/dat-namespace', {
    responses: {
      '200': {
        description: 'DatNamespace belonging to DatChunk',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DatNamespace)},
          },
        },
      },
    },
  })
  async getDatNamespace(
    @param.path.number('id') id: typeof DatChunk.prototype.pk_entity,
  ): Promise<DatNamespace> {
    return this.datChunkRepository.namespace(id);
  }
}
