import { DataState } from './data/data.model';
import { UiState } from './ui/ui.models';

export interface IAppState {
  data: DataState
  ui: UiState
}


