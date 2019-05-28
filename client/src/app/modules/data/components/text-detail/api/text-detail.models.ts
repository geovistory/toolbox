
// Class of this slice of store
export class TextDetail {

  pkEntity?:number; // pk entity of comVisual

  tabTitle?: string;

  showRightArea?: boolean;

  constructor(data?: TextDetail) {
      Object.assign(this, data);
  }
}
