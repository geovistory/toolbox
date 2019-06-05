import { EntityPreview, InfRole, ProInfoProjRel, ActiveProjectService, InfTimePrimitive, TimePrimitive, InfTextProperty } from "app/core";
import { NestedTreeControl } from "@angular/cdk/tree";
import { Observable } from "rxjs";
import { PropertyTreeService } from "./properties-tree.service";

export type ListType = 'language' | 'appellation' | 'place' | 'time-span' | 'time-primitive' | 'text-property' | 'entity-preview' | 'temporal-entity';

export type CreateControlType = 'role';

/**
 * Node with nested structure.
 */
export interface ListDefinition {
  listType: ListType
  label: string;
  ontoInfoUrl: string
  ontoInfoLabel: string
  pkProperty: number
  isOutgoing: boolean
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
  properties: TemporalEntityProperties[]
}

export interface EntityPreviewItem extends RoleItemBasics {
  preview: EntityPreview
}

export interface TemporalEntityProperties {
  listDefinition: ListDefinition,
  items: AppellationItem[] | LanguageItem[] | EntityPreviewItem[]
}

export interface TextPropertyItem extends ItemBasics {
  textProperty: InfTextProperty;
}

export interface TimeSpanItem {
  properties: TimeSpanProperties[]
}

export interface TimeSpanProperties {
  listDefinition: ListDefinition,
  items: TimePrimitiveItem[]
 }


export interface PropertyListComponentInterface {
  pkEntity: number;
  listDefinition: ListDefinition;
  treeControl: NestedTreeControl<ListDefinition>;
  showOntoInfo$;
  readonly$;
  addButtonVisible;
  toggleButtonVisible;

  items$: Observable<ItemBasics[]>
  p: ActiveProjectService,
  t: PropertyTreeService

}
