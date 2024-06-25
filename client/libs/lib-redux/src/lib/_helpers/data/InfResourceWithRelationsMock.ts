import { InfResourceWithRelations } from '@kleiolab/lib-sdk-lb4';
import { InfLanguageMock } from './auto-gen/gvDB/InfLanguageMock';
import { InfResourceMock } from './auto-gen/gvDB/InfResourceMock';
import { InfStatementMock } from './auto-gen/gvDB/InfStatementMock';
import { WarEntityPreviewMock } from './auto-gen/gvDB/WarEntityPreviewMock';
import { C_899_DEFINITION_ID, P_63_HAS_LANGUAGE_ID, P_1864_HAS_VALUE_VERSION_ID, C_339_STRING_ID } from './auto-gen/ontome-ids';

const birth: InfResourceWithRelations = {
  outgoing_statements: [
    {
      'fk_property': 86,
      'fk_object_info': WarEntityPreviewMock.PERSON_1.pk_entity,
    },
    {
      // entity_version_project_rels: [
      //   {
      //     calendar: 'gregorian'
      //   }
      // ],
      fk_property: 153,
      object_time_primitive: {
        julian_day: 2407351,
        duration: '1 year',
        fk_class: 335,
        calendar: 'gregorian'
      }
    },
  ],
  'fk_class': 61,
}


const mockNaming: InfResourceWithRelations = {
  outgoing_statements: [
    {
      fk_property: 1113,
      object_appellation: {
        fk_class: 40,
        quill_doc: {
          latestId: 19,
          ops: [{ attributes: { charid: '2' }, insert: 'M' }, { attributes: { charid: '3' }, insert: 'a' }, { attributes: { charid: '4' }, insert: 't' }, { attributes: { charid: '5' }, insert: 't' }, { attributes: { charid: '6' }, insert: 'h' }, { attributes: { charid: '7' }, insert: 'ä' }, { attributes: { charid: '8' }, insert: 'u' }, { attributes: { charid: '9' }, insert: 's' }, { attributes: { charid: '10' }, insert: ' ' }, { attributes: { charid: '11' }, insert: 'P' }, { attributes: { charid: '15' }, insert: 'o' }, { attributes: { charid: '16' }, insert: 'x' }, { attributes: { charid: '17' }, insert: 'n' }, { attributes: { charid: '18' }, insert: 'e' }, { attributes: { charid: '19' }, insert: 'r' }, { attributes: { blockid: '1' }, insert: '\n' }]
        }
      }
    },
    {
      fk_property: 1112,
      object_language: {
        fk_class: 54,
        pk_language: 'nld',
        lang_type: 'living',
        scope: 'individual',
        iso6392b: 'dut',
        iso6392t: 'nld',
        iso6391: 'nl ',
        notes: 'Dutch',
        pk_entity: 21740,

      },
    },
    {
      fk_property: 1111,
      fk_object_info: 2001
    },
    {
      fk_property: 152,
      object_time_primitive: {
        julian_day: 2406621,
        duration: '1 year',
        fk_class: 335,
        calendar: 'gregorian'
      }
    },
    {
      fk_property: 153,
      object_time_primitive: {
        julian_day: 2407351,
        duration: '1 year',
        fk_class: 335,
        calendar: 'gregorian'
      }
    },
    {
      fk_property: 1430,
      fk_object_info: 4020
    }
  ],
  fk_class: 365,

}
const mockPerson: InfResourceWithRelations = {
  'outgoing_statements': [
    {
      'fk_property': 1762,
      object_resource: {
        fk_class: C_899_DEFINITION_ID,
        outgoing_statements: [
          {
            fk_property: P_63_HAS_LANGUAGE_ID,
            object_language: InfLanguageMock.FRENCH
          },
          {
            fk_property: P_1864_HAS_VALUE_VERSION_ID,
            object_appellation: {
              fk_class: C_339_STRING_ID,
              'quill_doc': {
                'latestId': 3,
                'ops': [
                  {
                    'attributes': {
                      'charid': '3'
                    },
                    'insert': 'a'
                  },
                  {
                    'attributes': {
                      'blockid': '2'
                    },
                    'insert': '\n'
                  }
                ]
              }
            }
          }
        ]
      }
    }
  ],
  'fk_class': 21
}

const mockGeoPlaceWithType: InfResourceWithRelations = {
  outgoing_statements: [
    {
      'fk_property': InfStatementMock.MADRID_HAS_GEO_PLACE_TYPE_CITY.fk_property,
      'fk_object_info': InfStatementMock.MADRID_HAS_GEO_PLACE_TYPE_CITY.fk_object_info,
    }
  ],
  'fk_class': InfResourceMock.GEO_PLACE_MADRID.fk_class,
}



export const InfResourceWithRelationsMock = {
  birth,
  mockNaming,
  mockPerson,
  mockGeoPlaceWithType
}
