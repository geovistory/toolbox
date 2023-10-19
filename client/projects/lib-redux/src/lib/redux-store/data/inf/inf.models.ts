import { ByPk } from '../../state.model';
import { InfAppellationSlice } from './appellation/inf-appellation.models';
import { InfDimensionSlice } from './dimension/inf-dimension.models';
import { InfLanguageSlice } from './language/inf-language.models';
import { InfLangStringSlice } from './lang_string/inf-lang-string.models';
import { InfPlaceSlice } from './place/inf-place.models';
import { InfResourceSlice } from './resource/inf-resource.models';
import { InfStatementSlice } from './statement/inf-statement.models';
import { InfTimePrimitiveSlice } from './time_primitive/inf-time-primitive.models';

export interface InfState {
  resource?: InfResourceSlice;
  statement?: InfStatementSlice;
  place?: InfPlaceSlice;
  time_primitive?: InfTimePrimitiveSlice;
  language?: InfLanguageSlice;
  appellation?: InfAppellationSlice;
  lang_string?: InfLangStringSlice;
  dimension?: InfDimensionSlice;

  pkEntityModelMap?: ByPk<{ modelName: string; fkClass: number; }>;
}
