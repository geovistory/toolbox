import { InfTemporalEntity } from '@kleiolab/lib-sdk-lb3';

export const mockNaming: InfTemporalEntity = {
  outgoing_statements: [
    {
      fk_property: 1113,
      object_appellation: {
        fk_class: 40,
        quill_doc: {
          latestId: 19,
          ops: [
            {
              attributes: {
                charid: '2'
              },
              insert: 'M'
            },
            {
              attributes: {
                charid: '3'
              },
              insert: 'a'
            },
            {
              attributes: {
                charid: '4'
              },
              insert: 't'
            },
            {
              attributes: {
                charid: '5'
              },
              insert: 't'
            },
            {
              attributes: {
                charid: '6'
              },
              insert: 'h'
            },
            {
              attributes: {
                charid: '7'
              },
              insert: 'ä'
            },
            {
              attributes: {
                charid: '8'
              },
              insert: 'u'
            },
            {
              attributes: {
                charid: '9'
              },
              insert: 's'
            },
            {
              attributes: {
                charid: '10'
              },
              insert: ' '
            },
            {
              attributes: {
                charid: '11'
              },
              insert: 'P'
            },
            {
              attributes: {
                charid: '15'
              },
              insert: 'o'
            },
            {
              attributes: {
                charid: '16'
              },
              insert: 'x'
            },
            {
              attributes: {
                charid: '17'
              },
              insert: 'n'
            },
            {
              attributes: {
                charid: '18'
              },
              insert: 'e'
            },
            {
              attributes: {
                charid: '19'
              },
              insert: 'r'
            },
            {
              attributes: {
                blockid: '1'
              },
              insert: '\n'
            }
          ]
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

      }, ...{} as any,

    },
    {
      fk_property: 1111,
      fk_object_info: 738123
    },
    {
      fk_property: 152,
      object_time_primitive: {
        julian_day: 2406621,
        duration: '1 year',
        calendar: 'gregorian',
        fk_class: 335
      }
    },
    {
      fk_property: 153,
      object_time_primitive: {
        julian_day: 2407351,
        duration: '1 year',
        calendar: 'gregorian',
        fk_class: 335
      }
    },
    {
      fk_property: 1430,
      fk_object_info: 746080
    }
  ],
  fk_class: 365,
  ...{} as any,

}
