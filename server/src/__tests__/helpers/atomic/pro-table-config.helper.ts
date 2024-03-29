/* eslint-disable @typescript-eslint/camelcase */
import {ProTableConfig, TableConfig} from "../../../models";
import {ProTableConfigRepository} from "../../../repositories/pro-table-config.repository";
import {TestDbFactory} from '../TestDbFactory';

export async function createProTableConfig(fkProject: number, accountId: number | undefined, fkDigital: number, config: TableConfig) { //english
    const item: Partial<ProTableConfig> = {
        fk_project: fkProject,
        account_id: accountId,
        fk_digital: fkDigital,
        config
    };

    const repo = new ProTableConfigRepository(TestDbFactory.datasource)
    const created = await repo.create(item);
    return repo.findById(created.pk_entity as number)
}
