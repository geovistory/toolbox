import {createDfhApiClass} from '../atomic/dfh-api-class.helper';
import {DfhApiClassMock} from '../data/gvDB/DfhApiClassMock';
import {createInfPersistentItem} from '../atomic/inf-persistent-item.helper';
import {InfPersistentItemMock} from '../data/gvDB/InfPersistentItemMock';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';
import {createDfhApiProperty} from '../atomic/dfh-api-property.helper';
import {DfhApiPropertyMock} from '../data/gvDB/DfhApiPropertyMock';

export async function createModelMockForMadrid() {
  await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE);

  // - Property: has geo. place type
  await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE);
}
export async function createInstancesForMadrid() {

  // peIt (Geo Place (Madrid))
  const madrid = await createInfPersistentItem(InfPersistentItemMock.GEO_PLACE_MADRID);
  // stmt (has geo. place type, (Madrid has type 'City'))
  const madridHasType = await createInfStatement(InfStatementMock.MADRID_HAS_GEO_PLACE_TYPE_CITY);

  return {madrid, madridHasType}
}
