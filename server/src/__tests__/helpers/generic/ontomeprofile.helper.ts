import {createDfhApiClass} from '../atomic/createDfhApiClass';
import {createDfhApiProfile} from '../atomic/dfh-api-profile.helper';
import {createDfhApiProperty} from '../atomic/dfh-api-property.helper';
import {OntomeProfileMock} from '../data/gvDB/local-model.helpers';

export async function createOntomeProfileMock(mock: OntomeProfileMock) {
  const profile = await createDfhApiProfile(mock.profile)
  const classes = await Promise.all(mock.classes.map(c => createDfhApiClass(c)))
  const properties = await Promise.all(mock.properties.map(p => createDfhApiProperty(p)))
  return {profile, classes, properties}
}
