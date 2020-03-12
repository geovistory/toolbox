import { FluxStandardAction } from 'flux-standard-action';
import { Tab } from 'app/core/active-project/active-project.models';

// Class of this slice of store
export class TabBase {

  pkEntity?: number;

  tabTitle?: string;

  tabTooltip?: string;

  loading?: boolean;

  showRightArea?: boolean;

  constructor(data?: TabBase) {
    Object.assign(this, data);
  }
}

type Payload = Tab<any>;
interface MetaData {
  tabTitle?: string,
  tabTooltip?: string,
  loading?: boolean,
  showRightArea?: boolean
};
export type TabLayoutAction = FluxStandardAction<Payload, MetaData>;
