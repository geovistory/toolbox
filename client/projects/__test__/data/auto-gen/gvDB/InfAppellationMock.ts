import {InfAppellation} from '@kleiolab/lib-sdk-lb4';
import {QuillDoc} from '@kleiolab/lib-sdk-lb4';
import {DfhApiClassMock} from './DfhApiClassMock';
import {OmitEntity} from './local-model.helpers';

/**
 * pk_entity prefix: 500
 */

export class InfAppellationMock {
  static readonly JACK_THE_FOO: OmitEntity<InfAppellation> = ({
    pk_entity: 5001,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Jack the foo',
    quill_doc: createQuillDoc('Jack the foo')
  })
  static readonly JACK: OmitEntity<InfAppellation> = ({
    pk_entity: 5002,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Jack',
    quill_doc: createQuillDoc('Jack')
  })
  static readonly CITY: OmitEntity<InfAppellation> = ({
    pk_entity: 5003,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'City',
    quill_doc: createQuillDoc('City')
  })
  static readonly STADT: OmitEntity<InfAppellation> = ({
    pk_entity: 5004,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Stadt',
    quill_doc: createQuillDoc('Stadt')
  })
  static readonly ALERT_IV: OmitEntity<InfAppellation> = ({
    pk_entity: 5005,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Albert IV',
    quill_doc: createQuillDoc('Albert IV')
  })
  static readonly RUDOLF: OmitEntity<InfAppellation> = ({
    pk_entity: 5006,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Rudolf of Habsbourg',
    quill_doc: createQuillDoc('Rudolf of Habsbourg')
  })
  static readonly JEAN: OmitEntity<InfAppellation> = ({
    pk_entity: 5007,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Jean',
    quill_doc: createQuillDoc('Jean')
  })
  static readonly HANS: OmitEntity<InfAppellation> = ({
    pk_entity: 5008,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Hans',
    quill_doc: createQuillDoc('Hans')
  })
  static readonly PIERRE: OmitEntity<InfAppellation> = ({
    pk_entity: 5009,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Pierre',
    quill_doc: createQuillDoc('Pierre')
  })
  static readonly ANGELA: OmitEntity<InfAppellation> = ({
    pk_entity: 5010,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Angela',
    quill_doc: createQuillDoc('Angela')
  })
  static readonly SOURCE_HABSBOURG_EMPIRE: OmitEntity<InfAppellation> = ({
    pk_entity: 5011,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Habsbourg Empire',
    quill_doc: createQuillDoc('Habsbourg Empire')
  })
  static readonly SOURCE_UNIONS: OmitEntity<InfAppellation> = ({
    pk_entity: 5012,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Unions',
    quill_doc: createQuillDoc('Unions')
  })
  static readonly ALBERT: OmitEntity<InfAppellation> = ({
    pk_entity: 5013,
    fk_class: DfhApiClassMock.EN_40_APPELLATION.dfh_pk_class,
    string: 'Albert',
    quill_doc: createQuillDoc('Albert')
  })

  static readonly VALUE_VERSION_1: OmitEntity<InfAppellation> = ({
    pk_entity: 5014,
    fk_class: DfhApiClassMock.EN_339_STRING.dfh_pk_class,
    string: 'This person is the famous jack the foo, invented by KleioLab',
    quill_doc: createQuillDoc('This person is the famous jack the foo, invented by KleioLab')
  })
  static readonly VALUE_VERSION_2: OmitEntity<InfAppellation> = ({
    pk_entity: 5015,
    fk_class: DfhApiClassMock.EN_339_STRING.dfh_pk_class,
    string: 'This person is the famous jack the foo, invented by KleioLab and used in Geovistory mock data.',
    quill_doc: createQuillDoc('This person is the famous jack the foo, invented by KleioLab and used in Geovistory mock data.')
  })

  static readonly TEXT_VALUE_RODOLF_FOO_V1: OmitEntity<InfAppellation> = {
    pk_entity: 5016,
    fk_class: DfhApiClassMock.EN_339_STRING.dfh_pk_class,
    quill_doc: {"ops": [{"insert": "R", "attributes": {"charid": "1"}}, {"insert": "u", "attributes": {"charid": "2"}}, {"insert": "d", "attributes": {"charid": "3"}}, {"insert": "o", "attributes": {"charid": "4"}}, {"insert": "l", "attributes": {"charid": "5"}}, {"insert": "f", "attributes": {"charid": "6"}}, {"insert": " ", "attributes": {"charid": "7"}}, {"insert": "F", "attributes": {"charid": "8"}}, {"insert": "o", "attributes": {"charid": "9"}}, {"insert": "o", "attributes": {"charid": "10"}}, {"insert": "\n", "attributes": {"blockid": "11"}}], "latestId": 11}
  }

  static readonly CHUNK_RUDOLF: OmitEntity<InfAppellation> = {
    pk_entity: 5017,
    fk_class: DfhApiClassMock.EN_456_CHUNK.dfh_pk_class,
    quill_doc: {"ops": [{"insert": "R", "attributes": {"charid": "1"}}, {"insert": "u", "attributes": {"charid": "2"}}, {"insert": "d", "attributes": {"charid": "3"}}, {"insert": "o", "attributes": {"charid": "4"}}, {"insert": "l", "attributes": {"charid": "5"}}, {"insert": "f", "attributes": {"charid": "6"}},], "latestId": 12},
  }
}

export function createQuillDoc(string: string): QuillDoc {
  return {
    latestId: string.length + 1,
    ops: [
      ...string.split('').map((char, i) => ({insert: char, attributes: {charid: '' + (i + 1)}})),
      {insert: '\n', attributes: {blockid: '' + (string.length + 1)}}
    ]
  };
}
