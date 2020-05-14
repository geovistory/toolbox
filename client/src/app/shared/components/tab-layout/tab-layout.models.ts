import { TabLayoutMode } from './tab-layout';

// Class of this slice of store
export class TabBase {

  pkEntity?: number;

  tabTitle?: string;

  tabTooltip?: string;

  loading?: boolean;

  layoutMode?: TabLayoutMode;

  constructor(data?: TabBase) {
    Object.assign(this, data);
  }
}
