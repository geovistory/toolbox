import { ByPk } from "app/core/store/model";
import { InfAppellation, InfLanguage, InfPersistentItem, InfPlace, InfRole, InfTemporalEntity, InfTextProperty, InfTimePrimitive } from "../sdk";

export class InfPersistentItemSlice {
  by_pk_entity?: ByPk<InfPersistentItem>;
  loading?: boolean
}

export class InfTemporalEntitySlice {
  by_pk_entity?: ByPk<InfTemporalEntity>;
  loading?: boolean
}

export class InfRoleSlice {
  by_pk_entity?: ByPk<InfRole>;
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

export class InfTextPropertySlice {
  by_pk_entity?: ByPk<InfTextProperty>;
  loading?: boolean
}



export class InfSlices {
  persistent_item?: InfPersistentItemSlice;
}

export interface Inf {
  by_project?: ByPk<InfSlices>
}




