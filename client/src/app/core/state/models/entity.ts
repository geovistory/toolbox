
export type RightPanelTab = 'linked-sources' | 'linked-digitals' | 'content-tree';

export class Entity {

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

  // the button to add a new property
  // showAddAPropertyButton?= true;

  // pkUiContext?: number;
  // isViewMode?= false;

  // label?: ClassInstanceLabel;
  // toggle?= 'collapsed' as CollapsedExpanded;
  // ingoingPropertyFields?: PropertyField[];
  // outgoingPropertyFields?: PropertyField[];
  // selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
  // propertyToAdd?: PropertyField; // role set that is currently chosen in order to add a role of this kind

  // showRemoveVerification?: boolean;

  constructor(data?: Entity) {
    Object.assign(this, data);
  }

}

