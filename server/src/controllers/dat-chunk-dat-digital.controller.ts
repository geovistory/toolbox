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
  DatDigital,
} from '../models';
import {DatChunkRepository} from '../repositories';

export class DatChunkDatDigitalController {
  constructor(
    @repository(DatChunkRepository)
    public datChunkRepository: DatChunkRepository,
  ) { }

  @get('/dat-chunks/{id}/dat-digital', {
    responses: {
      '200': {
        description: 'DatDigital belonging to DatChunk',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DatDigital)},
          },
        },
      },
    },
  })
  async getDatDigital(
    @param.path.number('id') id: typeof DatChunk.prototype.pk_entity,
  ): Promise<DatDigital> {
    return this.datChunkRepository.digital(id);
  }
}
