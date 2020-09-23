/* eslint-disable @typescript-eslint/camelcase */
import { DatNamespace } from '../../../models';
import { DatDigitalRepository } from '../../../repositories';
import { testdb } from '../../helpers/testdb';
import { getTypeId, DigitalType } from './sys-system-type.helper';


export async function createDigital(type: DigitalType, namespace: DatNamespace, digitalName: string) {
    return new DatDigitalRepository(testdb)
        .create({
            fk_namespace: namespace.pk_entity,
            fk_system_type: getTypeId(type),
            id_for_import_txt: digitalName
        });
}