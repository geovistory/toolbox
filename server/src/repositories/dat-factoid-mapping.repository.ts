import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { Postgres1DataSource } from '../datasources';
import { DatFactoidMapping, DatFactoidMappingRelations } from '../models/dat-factoid-mapping.model';

export class DatFactoidMappingRepository extends DefaultCrudRepository<
    DatFactoidMapping,
    typeof DatFactoidMapping.prototype.pk_entity,
    DatFactoidMappingRelations
> {
    constructor(
        @inject('datasources.postgres1') dataSource: Postgres1DataSource,
    ) {
        super(DatFactoidMapping, dataSource);
    }
}
