import { NestedTreeControl } from '@angular/cdk/tree';
import { ActiveProjectService, EntityPreview, InfLanguage, InfStatement, InfTemporalEntity, InfTextProperty, ProClassFieldConfig, ProInfoProjRel, TimePrimitive } from 'app/core';
import { Observable } from 'rxjs';
import { PropertiesTreeService } from './properties-tree.service';

export type ItemType = 'language' | 'appellation' | 'place' | 'time-span' | 'timePrimitive' | 'langString' | 'text-property' | 'dimension' | 'entity-preview' | 'has-type';
export type ListType = ItemType | 'temporal-entity' | 'persistent-item';


// /**
//  * This interface is a intermediate solution, useful as long as
//  * the identity of properties is not changed to always using the
//  * identifier of the property of origin
//  */
// export interface ProClassFieldConfig extends ProClassFieldConfig {
//   fk_property_of_origin: number
// }

export interface FieldProperty {
  pkProperty?: number;
  pkPropertyOfProperty?: number;
}

export interface FieldDefinition {
  listType: ListType
  label: string;
  ontoInfoUrl: string
  ontoInfoLabel: string

  fkClassField: number

  property: FieldProperty

  // pkProperty: number
  isOutgoing: boolean
  sourceClass: number
  targetClasses?: number[]
  targetMaxQuantity?: number
  targetMinQuantity?: number
  listDefinitions: ListDefinition[]
  identityDefiningForSource: boolean
  fieldConfig?: ProClassFieldConfig
  removedFromAllProfiles: boolean
}

export interface ListDefinition {
  listType: ListType
  label: string;
  ontoInfoUrl: string
  ontoInfoLabel: string

  fkClassField: number

  property: FieldProperty

  // pkProperty: number
  isOutgoing: boolean

  identityDefiningForSource: boolean

  identityDefiningForTarget: boolean

  sourceClass: number
  sourceClassLabel: string

  targetClass: number
  targetClassLabel?: string
  targetMaxQuantity: number
  targetMinQuantity: number
  sourceMaxQuantity: number
  sourceMinQuantity: number

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
  language: InfLanguage
}

export interface TimePrimitiveItem extends BasicStatementItem {
  fkClass: number;
  label: string
  timePrimitive: TimePrimitive;
}

export interface TemporalEntityTableI {
  rows$: Observable<TemporalEntityItem[]>
  columns$: Observable<FieldDefinition[]>
}
export interface TemporalEntityItem extends BasicStatementItem {
  // fkClass: number; // fk_class of TemporalEntity
  row: TemporalEntityRow
  pkEntity: number; // pk of TemporalEntity
  teEnProjRel: ProInfoProjRel
}
// export interface TemporalEntityCellDefinition {
//   fieldDefinition: FieldDefinition,
//   lists: EntityProperties[]
//   cellValue: TemporalEntityCellValue
// }
export interface TemporalEntityRow { [key: string]: TemporalEntityCell }
export interface TemporalEntityCell {
  pkProperty: number
  isOutgoing: boolean
  label: string
  entityPreview: EntityPreview
  items?: StatementItem[]
  firstItem?: StatementItem
  itemsCount: number
  isTimeSpan?: boolean;
}

export interface EntityPreviewItem extends BasicStatementItem {
  preview: EntityPreview
  fkClass: number
}

export interface EntityProperties {
  listDefinition: ListDefinition,
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
  listDefinition: ListDefinition,
  items: TimePrimitiveItem[]
}
export type StatementItem = AppellationItem | EntityPreviewItem | LanguageItem | PlaceItem | TimePrimitiveItem;
export type Item = AppellationItem | EntityPreviewItem | LanguageItem | PlaceItem | TextPropertyItem | TimeSpanItem;
export type ItemList = Item[];

export interface PropertyListComponentInterface {
  pkEntity: number;
  listDefinition: ListDefinition;
  treeControl: NestedTreeControl<ListDefinition>;
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
  listDefinition: ListDefinition;
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

