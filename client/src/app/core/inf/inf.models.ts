import { ByPk } from 'app/core/redux-store/model';
import { InfAppellation, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, InfLangString, InfDimension } from '../sdk';

export class InfPersistentItemSlice {
  by_pk_entity?: ByPk<InfPersistentItem>;
  loading?: boolean
}

export class InfTemporalEntitySlice {
  by_pk_entity?: ByPk<InfTemporalEntity>;
  loading?: boolean
}

export class InfStatementSlice {
  by_pk_entity?: ByPk<InfStatement>;
  loading?: boolean
}

export class InfPlaceSlice {
  by_pk_entity?: ByPk<InfPlace>;
  loading?: boolean
}

export class InfTimePrimitiveSlice {
  by_pk_entity?: ByPk<InfTimePrimitive>;
  loading?: boolean
}

export class InfLanguageSlice {
  by_pk_entity?: ByPk<InfLanguage>;
  loading?: boolean
}

export class InfAppellationSlice {
  by_pk_entity?: ByPk<InfAppellation>;
  loading?: boolean
}


export class InfLangStringSlice {
  by_pk_entity?: ByPk<InfLangString>;
  loading?: boolean
}


export class InfDimensionSlice {
  by_pk_entity?: ByPk<InfDimension>;
  loading?: boolean
}

export class InfTextPropertySlice {
  by_pk_entity?: ByPk<InfTextProperty>;
  loading?: boolean
}


export interface Inf {
  persistent_item?: InfPersistentItemSlice;
  temporal_entity?: InfTemporalEntitySlice;
  statement?: InfStatementSlice;
  place?: InfPlaceSlice;
  time_primitive?: InfTimePrimitiveSlice;
  language?: InfLanguageSlice;
  appellation?: InfAppellationSlice;
  lang_string?: InfLangStringSlice;
  dimension?: InfDimensionSlice;
  text_property?: InfTextPropertySlice;
}




