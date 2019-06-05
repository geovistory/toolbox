
// Class of this slice of store
export class TabBase {

  pkEntity?: number;

  tabTitle?: string;

  loading?: boolean;

  showRightArea?: boolean;

  constructor(data?: TabBase) {
    Object.assign(this, data);
  }
}
