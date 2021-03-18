/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import { DatFactoidMapping, DatFactoidPropertyMapping } from '../data/gvDB/local-model.helpers';
import { testdb } from '../testdb';
import { dealWithPkEntity } from './_sequences.helper';

export async function createDatFactoidMapping(factoidMapping: Partial<DatFactoidMapping>) {
    await dealWithPkEntity(factoidMapping, 'data');
    await testdb.execute(`INSERT INTO data.factoid_mapping (pk_entity, fk_digital, fk_class) 
    VALUES (${factoidMapping.pk_entity}, ${factoidMapping.fk_digital}, ${factoidMapping.fk_class});`);
}

export async function createDatFactoidPropertyMapping(factoidPropertyMapping: Partial<DatFactoidPropertyMapping>) {
    await dealWithPkEntity(factoidPropertyMapping, 'data');
    await testdb.execute(`INSERT INTO data.factoid_property_mapping (pk_entity, fk_property, fk_column, fk_factoid_mapping) 
    VALUES (${factoidPropertyMapping.pk_entity}, ${factoidPropertyMapping.fk_property}, ${factoidPropertyMapping.fk_column}, ${factoidPropertyMapping.fk_factoid_mapping});`);
}
