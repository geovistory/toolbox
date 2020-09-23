/* eslint-disable @typescript-eslint/camelcase */
import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { Postgres1DataSource } from '../datasources';
import { TabRow, TabRowRelations } from '../models/tab-row.model';

export class TabRowRepository extends DefaultCrudRepository<
    TabRow,
    typeof TabRow.prototype.pk_entity,
    TabRowRelations
    > {

    constructor(
        @inject('datasources.postgres1') dataSource: Postgres1DataSource
    ) {
        super(TabRow, dataSource);
    }
}
