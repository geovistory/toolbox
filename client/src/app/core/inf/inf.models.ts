import { ByPk } from "app/core/store/model";
import { InfPersistentItem, InfEntityAssociation } from "../sdk";

export class PersistentItemSlice {
    by_pk_entity?: ByPk<InfPersistentItem>;
    loading?: boolean
}

export class EntityAssociationSlice {
  by_pk_entity?: ByPk<InfEntityAssociation>;
  loading?: boolean
}

export class InfSlices {
    persistent_item?: PersistentItemSlice;
    entity_association?: EntityAssociationSlice;
}

export interface Inf {
    by_project?: ByPk<InfSlices>
}




