import { ByPk } from "@kleiolab/lib-redux";
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";

export interface WarEntityPreviewSlice {
  by_pk_entity?: ByPk<WarEntityPreview>;
}

export interface War {
  entity_preview?: WarEntityPreviewSlice;
}




