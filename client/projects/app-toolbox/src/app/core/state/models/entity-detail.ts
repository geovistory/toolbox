// TODO DELETE
export type RightPanelTab = 'linked-sources' | 'linked-digitals' | 'content-tree';

export interface PeItDetailList { [pk_entity: number]: EntityDetail };


export class EntityDetail {


  // _fields?: FieldList;

  pkEntity?: number;

  /** Left Panel Visibility */

  // the properties with information about the peIt
  showProperties?= false;

  // the right area
  showRightArea?= true;

  /** Right panel */
  rightPanelTabs?: RightPanelTab[] = []
  rightPanelActiveTab?= 0; // index of the active tab

  // the bar to above the properties
  // showPropertiesHeader?= true;

  // the header with name of peIt
  showHeader?= true;


  constructor(data?: EntityDetail) {
    Object.assign(this, data);
  }


}
