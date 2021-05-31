import { InfAppellation, InfDimension, InfLangString, InfLanguage, InfPlace, InfTimePrimitive } from '@kleiolab/lib-sdk-lb3';
import { InfResource, InfStatement } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../root/models/model';

interface PaginationInfo {
  loading: {
    [key: string]: boolean
  },
  count: number,
  rows: {
    [key: string]: number
  }
}
export class InfResourceSlice {
  by_pk_entity?: ByPk<InfResource>;
  by_fk_class?: ByPk<ByPk<InfResource>>;
  loading?: boolean
}


export class InfStatementSlice {
  by_pk_entity?: ByPk<InfStatement>;
  by_subject?: ByPk<ByPk<InfStatement>>;
  by_object?: ByPk<ByPk<InfStatement>>;
  'by_subject+property'?: ByPk<ByPk<InfStatement>>;
  'by_object+property'?: ByPk<ByPk<InfStatement>>;
  by_fk_subject_data?: ByPk<ByPk<InfStatement>>;
  by_subfield_page?: ByPk<PaginationInfo>
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




export interface Inf {
  persistent_item?: InfResourceSlice;
  temporal_entity?: InfResourceSlice;
  statement?: InfStatementSlice;
  place?: InfPlaceSlice;
  time_primitive?: InfTimePrimitiveSlice;
  language?: InfLanguageSlice;
  appellation?: InfAppellationSlice;
  lang_string?: InfLangStringSlice;
  dimension?: InfDimensionSlice;

  pkEntityModelMap?: ByPk<{ modelName: string, fkClass: number }>
}




