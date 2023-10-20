import { DataState } from './data/data.model';
import { SucceedActionMeta } from './data/_lib/crud-actions-factory';
import { UiState } from './ui/ui.models';
import { ByPk } from './_lib/ByPk';

export interface IAppState {
  data: DataState
  ui: UiState

  pending?: ByPk<boolean>
  resolved?: ByPk<SucceedActionMeta<any>>
}


