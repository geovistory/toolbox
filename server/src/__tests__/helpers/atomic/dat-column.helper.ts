/* eslint-disable @typescript-eslint/camelcase */
import { DatDigital } from '../../../models';
import { DatColumnRepository, DatNamespaceRepository } from '../../../repositories';
import { testdb } from '../../helpers/testdb';
import { getTypeId } from './sys-system-type.helper';


export async function createColumn(digital: DatDigital, type: 'string' | 'number') {
    let datNamespaceRepository: DatNamespaceRepository;
    return new DatColumnRepository(testdb, async () => datNamespaceRepository)
        .create({
            fk_digital: digital.pk_entity,
            fk_namespace: digital.fk_namespace,
            fk_data_type: getTypeId(type),
        });
}