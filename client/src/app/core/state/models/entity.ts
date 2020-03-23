import { DfhClass, InfPersistentItem } from 'app/core/sdk';
import { ClassInstanceLabel } from './class-instance-label';
import { FieldList } from './field-list';
import { PropertyField } from './property-field';
import { CollapsedExpanded, SelectPropStateType } from './types';

export class Entity {

  _fields?: FieldList;

  pkEntity?: number;
  fkClass?: number;
  dfhClass?: DfhClass;

  parentPeIt?: InfPersistentItem;

  /** gui */

  /** Visibility */

  // the right area
  showRightArea?= true;

  // the bar to above the properties
  showPropertiesHeader?= true;

  // the header with name of peIt
  showHeader?= true;

  // the button to add a new property
  showAddAPropertyButton?= true;

  pkUiContext?: number;
  isViewMode?= false;

  label?: ClassInstanceLabel;
  toggle?= 'collapsed' as CollapsedExpanded;
  ingoingPropertyFields?: PropertyField[];
  outgoingPropertyFields?: PropertyField[];
  selectPropState?: SelectPropStateType; // state of child components for adding or creating properties
  propertyToAdd?: PropertyField; // role set that is currently chosen in order to add a role of this kind

  showRemoveVerification?: boolean;

  constructor(data?: Entity) {
    Object.assign(this, data);
  }

}

