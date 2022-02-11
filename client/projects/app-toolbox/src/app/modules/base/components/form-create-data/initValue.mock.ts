import { InfData } from '@kleiolab/lib-sdk-lb4';
import { InfLangStringMock } from 'projects/__test__/data/auto-gen/gvDB/InfLangStringMock';
import { InfResourceWithRelationsMock } from 'projects/__test__/data/InfResourceWithRelationsMock';

export const georeferenceMock: InfData = {
  resource: {
    outgoing_statements: [
      {
        fk_property: 148,
        object_place: {
          fk_class: 51,
          lat: 234,
          long: 23423,
        },
      }
    ],
    fk_class: 84,
  }
}

export const appeInALangMock: InfData = {
  resource: InfResourceWithRelationsMock.mockNaming
}
export const birthMock: InfData = {
  resource: InfResourceWithRelationsMock.birth
}
export const personMock: InfData = {
  resource: InfResourceWithRelationsMock.mockPerson
}

export const geoPlaceMock: InfData = {
  resource: InfResourceWithRelationsMock.mockGeoPlaceWithType
}

export const langStringMock: InfData = {
  langString: InfLangStringMock.EN_SHORT_TITLE_THE_MURDERER
}
