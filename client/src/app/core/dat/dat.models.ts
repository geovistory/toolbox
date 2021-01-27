import { ByPk } from "app/core/redux-store/model";
import { DatNamespace } from "../sdk";
import { DatClassColumnMapping } from '../sdk-lb4/model/datClassColumnMapping';
import { DatColumn } from '../sdk/models/DatColumn';
import { DatTextProperty } from '../sdk/models/DatTextProperty';
import { DatDigital } from '../sdk-lb4/model/models';

export class DigitalSlice {
  by_pk_entity__entity_version?: ByPk<DatDigital>;
  by_pk_entity?: ByPk<ByPk<DatDigital>>;
  by_pk_text?: ByPk<ByPk<DatDigital>>;
  loading?: boolean
}
export class ChunkSlice {
  by_pk_entity?: ByPk<DatDigital>;
  by_fk_text?: ByPk<ByPk<DatDigital>>;
  loading?: boolean
}

export class ColumnSlice {
  by_pk_entity?: ByPk<DatColumn>;
  by_fk_digital?: ByPk<ByPk<DatColumn>>;
}

export class ClassColumnMappingSlice {
  by_pk_entity?: ByPk<DatClassColumnMapping>;
  by_fk_column?: ByPk<ByPk<DatClassColumnMapping>>;
}

export class TextPropertySlice {
  by_pk_entity?: ByPk<DatTextProperty>;
  by_fk_digital?: ByPk<ByPk<DatTextProperty>>;
}

export class NamespaceSlice {
  by_pk_entity?: ByPk<DatNamespace>;
  by_fk_project?: ByPk<ByPk<DatNamespace>>;
  loading?: boolean
}

export interface Dat {
  digital?: DigitalSlice;
  chunk?: ChunkSlice;
  column?: ColumnSlice;
  text_property?: TextPropertySlice;
}




