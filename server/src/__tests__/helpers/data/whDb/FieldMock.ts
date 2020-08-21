import { FieldId } from '../../../../warehouse/primary-ds/FieldLabelService';
/**
 * Mock data related to fields
 */
export class FieldMock {

    // has spelling

    static readonly FIELD_HAS_SPELLING_ID: FieldId = { fkProject: 591, fkClass: 365, fkProperty: 1113, isOutgoing: true };
    static readonly FIELD_HAS_SPELLING: string = 'has spelling';

    // is appellation of

    static readonly FIELD_IS_APPE_OF_ID: FieldId = { fkProject: 591, fkClass: 365, fkProperty: 1111, isOutgoing: true };
    static readonly FIELD_IS_APPE_OF: string = 'is appellation of';

    // has appellation

    static readonly FIELD_HAS_APPE_ID: FieldId = { fkProject: 591, fkClass: 21, fkProperty: 1111, isOutgoing: false };
    static readonly FIELD_HAS_APPE: string = 'has appellation';

    // brought into life
    static readonly FIELD_BROUGH_INTO_LIFE_ID: FieldId = { fkProject: 591, fkClass: 61, fkProperty: 41, isOutgoing: true }
    static readonly FIELD_BROUGH_INTO_LIFE = 'brought into life'

    // stems from
    static readonly FIELD_STEMS_FROM_ID: FieldId = { fkProject: 591, fkClass: 61, fkProperty: 42, isOutgoing: true }
    static readonly FIELD_STEMS_FROM = 'stems from'

    // resulted in
    static readonly FIELD_RESULTED_IN_ID: FieldId = { fkProject: 591, fkClass: 66, fkProperty: 42, isOutgoing: false }
    static readonly FIELD_RESULTED_IN = 'resulted in'

    // has partner
    static readonly FIELD_HAS_PARTNER_ID: FieldId = { fkProject: 591, fkClass: 66, fkProperty: 52, isOutgoing: true }
    static readonly FIELD_HAS_PARTNER = 'has partner'


}
