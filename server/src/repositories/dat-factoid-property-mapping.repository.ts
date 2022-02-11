import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { Postgres1DataSource } from '../datasources';
import { DatFactoidPropertyMapping, DatFactoidPropertyMappingRelations } from '../models/dat-factoid-property-mapping.model';

export class DatFactoidPropertyMappingRepository extends DefaultCrudRepository<
    DatFactoidPropertyMapping,
    typeof DatFactoidPropertyMapping.prototype.pk_entity,
    DatFactoidPropertyMappingRelations
> {
    constructor(
        @inject('datasources.postgres1') dataSource: Postgres1DataSource,
    ) {
        super(DatFactoidPropertyMapping, dataSource);
    }
}
