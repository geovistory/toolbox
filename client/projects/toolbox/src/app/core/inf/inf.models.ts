import { ByPk } from 'projects/toolbox/src/app/core/redux-store/model';
import { InfAppellation, InfLanguage, InfPersistentItem, InfPlace, InfTemporalEntity, InfTextProperty, InfTimePrimitive, InfLangString, InfDimension } from '../sdk';
import { InfStatement } from '../sdk-lb4/model/infStatement';
interface PaginationInfo {
  loading: {
    [key: string]: boolean
  },
  count: number,
  rows: {
    [key: string]: number
  }
}
export class InfPersistentItemSlice {
  by_pk_entity?: ByPk<InfPersistentItem>;
  by_fk_class?: ByPk<ByPk<InfPersistentItem>>;
  loading?: boolean
}

export class InfTemporalEntitySlice {
  by_pk_entity?: ByPk<InfTemporalEntity>;
  by_fk_class?: ByPk<ByPk<InfPersistentItem>>;
  loading?: boolean
}

export class InfStatementSlice {
  by_pk_entity?: ByPk<InfStatement>;
  by_subject?: ByPk<ByPk<InfStatement>>;
  by_object?: ByPk<ByPk<InfStatement>>;
  'by_subject+property'?: ByPk<ByPk<InfStatement>>;
  'by_object+property'?: ByPk<ByPk<InfStatement>>;
  by_fk_subject_data?: ByPk<ByPk<InfStatement>>;
  pag_by_fk_property__fk_target_class__fk_object_info__ofProject?: ByPk<PaginationInfo>
  pag_by_fk_property__fk_target_class__fk_subject_info__ofProject?: ByPk<PaginationInfo>
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
  by_fk_concerned_entity__fk_class_field?: ByPk<ByPk<InfTextProperty>>;
  by_fk_concerned_entity?: ByPk<ByPk<InfTextProperty>>;
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

  pkEntityModelMap?: ByPk<{ modelName: string }>
}




