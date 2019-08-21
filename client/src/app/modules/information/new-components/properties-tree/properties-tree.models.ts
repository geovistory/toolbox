import { NestedTreeControl } from "@angular/cdk/tree";
import { ActiveProjectService, EntityPreview, InfLanguage, InfRole, InfTemporalEntity, InfTextProperty, ProClassFieldConfig, ProInfoProjRel, TimePrimitive } from "app/core";
import { Observable } from "rxjs";
import { PropertiesTreeService } from "./properties-tree.service";

export type ListType = 'language' | 'appellation' | 'place' | 'time-span' | 'time-primitive' | 'text-property' | 'entity-preview' | 'temporal-entity';

export type CreateControlType = 'role';

/**
 * This interface is a intermediate solution, useful as long as
 * the identity of properties is not changed to always using the
 * identifier of the property of origin
 */
export interface ClassFieldConfig extends ProClassFieldConfig {
  fk_property_of_origin: number
}

export interface FieldDefinition {
  listType: ListType
  label: string;
  ontoInfoUrl: string
  ontoInfoLabel: string
  pkProperty: number
  isOutgoing: boolean
  targetClasses?: number[]
  targetMaxQuantity?: number
  listDefinitions: ListDefinition[]
}

export interface ListDefinition {
  listType: ListType
  label: string;
  ontoInfoUrl: string
  ontoInfoLabel: string
  fkClassField: number
  pkProperty: number
  fkPropertyOfOrigin: number // TODO remove after pkProperty Change
  isOutgoing: boolean
  isIdentityDefining: boolean
  sourceClass: number

  targetClass: number
  targetClassLabel?: string
  targetMaxQuantity?: number
}

export interface ItemBasics {
  projRel: ProInfoProjRel
  ordNum: number
  label: string
}

// Items connected through a role
export interface RoleItemBasics extends ItemBasics {
  role: InfRole
}

export interface AppellationItem extends RoleItemBasics {
  label: string
}

export interface LanguageItem extends RoleItemBasics {
  label: string
}

export interface PlaceItem extends RoleItemBasics {
  label: string
}

export interface TimePrimitiveItem extends RoleItemBasics {
  label: string
  timePrimitive: TimePrimitive;
}

export interface TemporalEntityItem extends RoleItemBasics {
  cellDefinitions: TemporalEntityCellDefinition[]
}
export interface TemporalEntityCellDefinition {
  fieldDefinition: FieldDefinition,
  lists: EntityProperties[]
  cellValue: TemporalEntityCellValue
}
export interface TemporalEntityCellValue {
  pkProperty: number
  label: string
  entityPreview: EntityPreview
  itemsCount: number
}

export interface EntityPreviewItem extends RoleItemBasics {
  preview: EntityPreview
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
  t: PropertiesTreeService

}


/**
 * This interface is used for creating objects containing all the
 * information related to a temporal entity that should be removed
 * from project, when the temporal entity is removed
 */
export interface TemporalEntityRemoveProperties {
  temporalEntity: InfTemporalEntity
  roles: InfRole[]
  textProperties: InfTextProperty[]
}

