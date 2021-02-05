import { ByPk } from '../redux-store/model';
import { WarEntityPreview } from '../sdk-lb4';

export interface WarEntityPreviewSlice {
  by_pk_entity?: ByPk<WarEntityPreview>;
}

export interface War {
  entity_preview?: WarEntityPreviewSlice;
}




