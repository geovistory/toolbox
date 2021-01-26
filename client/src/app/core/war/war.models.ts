import { ByPk } from '../redux-store/model';
import { WarEntityPreview } from '..';

export interface WarEntityPreviewSlice {
  by_pk_entity?: ByPk<WarEntityPreview>;
}

export interface War {
  entity_preview?: WarEntityPreviewSlice;
}




