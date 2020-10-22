/* eslint-disable @typescript-eslint/camelcase */
import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { Postgres1DataSource } from '../datasources';
import { DatClassColumnMapping, DatClassColumnMappingRelations } from '../models';

export class DatClassColumnMappingRepository extends DefaultCrudRepository<
    DatClassColumnMapping,
    typeof DatClassColumnMapping.prototype.pk_entity,
    DatClassColumnMappingRelations
    > {

    constructor(
        @inject('datasources.postgres1') dataSource: Postgres1DataSource) {
        super(DatClassColumnMapping, dataSource);
    }
}
