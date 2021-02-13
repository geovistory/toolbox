import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../root/models/model';

export interface WarEntityPreviewSlice {
  by_pk_entity?: ByPk<WarEntityPreview>;
}

export interface War {
  entity_preview?: WarEntityPreviewSlice;
}




