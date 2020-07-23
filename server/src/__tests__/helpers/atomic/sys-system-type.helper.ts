import {testdb} from '../../../datasources/testdb.datasource';
import {SysSystemTypeRepository} from '../../../repositories';

let initialized = false;

const types = [
  {name: "projectDescription", id: 638, definition: 'Description of an entity.'},
  {name: "projectLabel", id: 639, definition: 'Label of an entity.'},
  {name: "digitalTable", id: 3287, definition: 'Table. Type of Digital stored in the table data.digital'},
  {name: "value", id: 3291, definition: 'Value.  Semistructured data of one of the data types specified with fk_data_type'},
  {name: "string", id: 3292, definition: 'Text. Data type'},
  {name: "number", id: 3293, definition: 'Float. Data type'},
  {name: "label", id: 3295, definition: 'Label of an entity.'},
]

export function getTypeId(name: string) {
  let target = types.filter(t => t.name === name)[0];
  if (!target) throw new Error('Unknown type <' + name + '> ')
  return types.filter(t => t.name === name)[0].id;
}

export function resetTypeInitialization() {
  initialized = false;
}

export async function createTypes() {
  if (initialized) return;

  for (const type of types) {
    await testdb.execute("SELECT setval('system.entity_pk_entity_seq', " + (type.id - 1) + ", true);");
    await new SysSystemTypeRepository(testdb).create({definition: type.definition});
  }
  initialized = true;
}

