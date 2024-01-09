import {createDfhApiClass} from '../atomic/createDfhApiClass';
import {createDfhApiProperty} from '../atomic/dfh-api-property.helper';
import {createInfResource} from '../atomic/inf-resource.helper';
import {createInfStatement} from '../atomic/inf-statement.helper';
import {DfhApiClassMock} from '../data/gvDB/DfhApiClassMock';
import {DfhApiPropertyMock} from '../data/gvDB/DfhApiPropertyMock';
import {InfResourceMock} from '../data/gvDB/InfResourceMock';
import {InfStatementMock} from '../data/gvDB/InfStatementMock';

export async function createModelMockForMadrid() {
  await createDfhApiClass(DfhApiClassMock.EN_363_GEO_PLACE);

  // - Property: has geo. place type
  await createDfhApiProperty(DfhApiPropertyMock.EN_1110_HAS_GEO_PLACE_TYPE);
}
export async function createInstancesForMadrid() {

  // peIt (Geo Place (Madrid))
  const madrid = await createInfResource(InfResourceMock.GEO_PLACE_MADRID);
  // stmt (has geo. place type, (Madrid has type 'City'))
  const madridHasType = await createInfStatement(InfStatementMock.MADRID_HAS_GEO_PLACE_TYPE_CITY);

  return {madrid, madridHasType}
}
