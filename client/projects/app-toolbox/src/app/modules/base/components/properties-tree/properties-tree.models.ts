import { NestedTreeControl } from '@angular/cdk/tree';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project";
import { TimePrimitive } from '@kleiolab/lib-utils';
import { InfLanguage } from "@kleiolab/lib-sdk-lb4";
import { InfTemporalEntity } from "@kleiolab/lib-sdk-lb4";
import { InfTextProperty } from "@kleiolab/lib-sdk-lb4";
import { ProInfoProjRel } from "@kleiolab/lib-sdk-lb4";
import { InfStatement } from "@kleiolab/lib-sdk-lb4";
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";
import { SysConfigValueObjectType } from "@kleiolab/lib-sdk-lb4";
import { ProClassFieldConfig } from "@kleiolab/lib-sdk-lb4";
import { Observable } from 'rxjs';
import { PropertiesTreeService } from './properties-tree.service';

export type ItemType = 'language' | 'appellation' | 'place' | 'time-span' | 'timePrimitive' | 'langString' | 'text-property' | 'dimension' | 'entity-preview' | 'has-type';
export interface SubfieldType extends SysConfigValueObjectType {
  temporalEntity?: 'true'
  entityPreview?: 'true'
  typeItem?: 'true'
  timeSpan?: 'true'


  textProperty?: 'true' // TODO remove
}

export interface FieldProperty {
  pkProperty?: number;
  pkPropertyOfProperty?: number;
}

export interface FieldBase {
  // the label of the field (taken from the corresponding property label)
  label: string;

  // url to property on ontome
  ontoInfoUrl: string

  // short label (= ontome identifier in namespace)
  ontoInfoLabel: string

  // reference to the dfh_property or dfh_property_of_property
  property: FieldProperty

  // true if the property of that field has dfh_has_type_subproperty
  isHasTypeField: boolean;

  // direction of the property in this field (true if sourceClass = property domain)
  isOutgoing: boolean

  // the source class of the field (if is outgoing domain else range)
  sourceClass: number

  // label of the source class
  sourceClassLabel: string

  // minimum number of statements having the property of this field and the same entity as source
  // (and thus different targets)
  targetMinQuantity: number

  // maximum number of statements having the property of this field and the same entity as source
  // (and thus different targets). Value -1 stands for n (infinit)
  targetMaxQuantity: number

  // minimum number of statements having the property of this field and the same entity as target
  // (and thus different sources)
  sourceMinQuantity: number

  // maximum number of statements having the property of this field and the same entity as target
  // (and thus different sources). Value -1 stands for n (infinit)
  sourceMaxQuantity: number

  // if true, the identity of the source entity is defined by the statement(s) of this field
  identityDefiningForSource: boolean

  // if true, the identity of the target entity is defined by the statement(s) of this field
  identityDefiningForTarget: boolean
}

interface FieldPosition {
  position?: number;
}
export interface FieldPlaceOfDisplay {
  basicFields?: FieldPosition;
  specificFields?: FieldPosition;
  hidden?: true;
}

export type SpecialFieldType = 'time-span' | 'has-type' | false;

/**
 * A Field contains all information to create the different GUI's to display and edit
 * statements of an entity.
 *
 * The Fields of an entity depend on the properties of its class. Each Field contains or represents
 * the properties that have the given class as as domain or range and share the same pk_property.
 *
 * Explanation:
 * The identity (uniqueness) of a property is defined by its domain, pk_propery and its range,
 * It is possible that one class has two outgoing properties with the same pk_property but different
 * ranges. The Field then contains both of them.
 *
 * The Subfields (listDefinitions) are then representing only one property with a uniqur domain, pk_propery and range
 * All Subfields of a Field share all properties defined in FieldBase.
 *
 * In practice the Field a wrapper for SubFileds containing all information that is equal amongst all Subfields.
 */
export interface Field extends FieldBase {

  // defines where the field is being displayed
  placeOfDisplay: FieldPlaceOfDisplay
  // configuration of the field (containing position in list), given by the project or the default-configuration-project
  fieldConfig?: ProClassFieldConfig

  // the target classes of the field (if is outgoing range else domain)
  targetClasses: number[]

  // subfields (they share the source class and property but have different target class and thus list type)
  listDefinitions: Subfield[]

  // true if all subfields are removed from all profiles activated by the project
  allSubfieldsRemovedFromAllProfiles: boolean

  // special fields are not using the default subfield approach to show/edit data
  isSpecialField: SpecialFieldType;

}
/**
 * A Subfiel contains contains information to create the different GUI's to display and edit
 * statements of an entity.
 *
 * Each Subfield stands for one property with a unique domain, pk_propery and range.
 *
 * Since the display of the statement and its target value depends on the target class, the Subfield
 * has a SubfieldType. This SubfieldType determines what components are used to create, edit or display
 * the statement and its target.
 */
export interface Subfield extends FieldBase {

  // determines what components are used to create, edit or display
  // the statement and its target.
  listType: SubfieldType

  // the target class of the sub-field (if is outgoing range else domain)
  targetClass: number

  // label of the target class
  targetClassLabel: string

  // true if the property is removed from all profiles activated by the project
  removedFromAllProfiles: boolean
}

export interface PropertyItemTypeMap {
  [key: string]: { listType: ItemType, isOutgoing: boolean }
}


export interface ItemBasics {
  projRel: ProInfoProjRel
  ordNum: number
  label: string
}

// Items connected through a statement
export interface BasicStatementItem extends ItemBasics {
  statement: InfStatement
  isOutgoing?: boolean
  error?: string
}

export interface AppellationItem extends BasicStatementItem {
  fkClass: number;
  label: string
}

export interface LanguageItem extends BasicStatementItem {
  fkClass: number;
  label: string
}

export interface PlaceItem extends BasicStatementItem {
  fkClass: number;
  label: string
}
export interface DimensionItem extends BasicStatementItem {
  fkClass: number;
  label: string
}

export interface LangStringItem extends BasicStatementItem {
  fkClass: number;
  label: string
  fkLanguage: number;
  language: InfLanguage
}

export interface TimePrimitiveItem extends BasicStatementItem {
  fkClass: number;
  label: string
  timePrimitive: TimePrimitive;
}

export interface TemporalEntityTableI {
  rows$: Observable<TemporalEntityItem[]>
  columns$: Observable<Field[]>
}
export interface TemporalEntityItem extends BasicStatementItem {
  // fkClass: number; // fk_class of TemporalEntity
  row: TemporalEntityRow
  pkEntity: number; // pk of TemporalEntity
  teEnProjRel: ProInfoProjRel
}

export interface TemporalEntityRow { [key: string]: TemporalEntityCell }
export interface TemporalEntityCell {
  pkProperty: number
  isOutgoing: boolean
  label: string
  entityPreview: WarEntityPreview
  items?: StatementItem[]
  firstItem?: StatementItem
  itemsCount: number
  isTimeSpan?: boolean;
}

export interface EntityPreviewItem extends BasicStatementItem {
  preview: WarEntityPreview
  fkClass: number
}

export interface EntityProperties {
  listDefinition: Subfield,
  items: ItemList
}

export interface TextPropertyItem extends ItemBasics {
  textProperty: InfTextProperty;
  language: InfLanguage
}

export interface TimeSpanItem {
  label: string
  properties: TimeSpanProperty[]
}

export interface TimeSpanProperty {
  listDefinition: Subfield,
  items: TimePrimitiveItem[]
}
export type StatementItem = AppellationItem | EntityPreviewItem | LanguageItem | PlaceItem | TimePrimitiveItem;
export type Item = AppellationItem | EntityPreviewItem | LanguageItem | PlaceItem | TextPropertyItem | TimeSpanItem;
export type ItemList = Item[];

export interface PropertyListComponentInterface {
  pkEntity: number;
  listDefinition: Subfield;
  treeControl: NestedTreeControl<Subfield>;
  showOntoInfo$;
  readonly$;
  addButtonVisible;
  toggleButtonVisible;

  items$: Observable<ItemList>
  p: ActiveProjectService,
  t: PropertiesTreeService

}


export interface AddListComponentInterface {
  pkEntity: number;
  listDefinition: Subfield;
  showOntoInfo$;
  readonly$;
  addButtonVisible;
  toggleButtonVisible;

  items$: Observable<ItemList>
  p: ActiveProjectService,
  // t: PropertiesTreeService

}


/**
 * This interface is used for creating objects containing all the
 * information related to a temporal entity that should be removed
 * from project, when the temporal entity is removed
 */
export interface TemporalEntityRemoveProperties {
  temporalEntity: InfTemporalEntity
  statements: InfStatement[]
  textProperties: InfTextProperty[]
}

