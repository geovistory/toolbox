import { InfEntityAssociation, InfPersistentItem, InfRole } from "app/core";
import { InfActions } from "app/core/inf/inf.actions";
import { EntityAssociationSlice, PersistentItemSlice } from "app/core/inf/inf.models";
import { keys, omit, values } from "ramda";
import { InfAppellation, InfTemporalEntity, DatDigital } from "../sdk";
import { StandardActionsFactory } from "./actions";
import { DatActions } from "../dat/dat.actions";
import { DigitalSlice } from "../dat/dat.models";

export class ModelFlattener<Payload, Model> {
  constructor(
    public actions: StandardActionsFactory<Payload, Model>,
    public modelDefinition: any,
    public flattenCb: (items: Model[]) => void,
  ) { }

  flatten(items: Model[]) {
    if (items) {

      this.flattenCb(items);
      // todo remove properties of those objects, using getModelDefinition()
      const keysToOmit = keys(this.modelDefinition.relations).map(item => item.toString())
      this.items = [
        ...(this.items || []),
        ...items.filter(item => !!item && Object.keys(item).length > 0)
          .map(item => omit(keysToOmit, item)) as Model[]
      ]
    }
    return true;
  }

  items: Model[]
}

interface FlattenerInterface {
  [key: string]: ModelFlattener<any, any>
}

/**
 * Flattener is the class used to flatten nested objects.
 * Use storeFlattened() to call all actions to put the
 * flattened items into the store.
 */
export class Flattener {

  constructor(
    public infActions: InfActions,
    public datActions: DatActions
  ) { }

  persistent_item = new ModelFlattener<PersistentItemSlice, InfPersistentItem>(
    this.infActions.persistent_item,
    InfPersistentItem.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfPersistentItem(item);
        this.entity_association.flatten(item.domain_entity_associations);
        this.role.flatten(item.pi_roles)
      })
    })

  temporal_entity = new ModelFlattener<PersistentItemSlice, InfTemporalEntity>(
    this.infActions.temporal_entity,
    InfTemporalEntity.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfTemporalEntity(item);
        this.role.flatten(item.te_roles)
      })
    })


  role = new ModelFlattener<PersistentItemSlice, InfRole>(
    this.infActions.role,
    InfRole.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfRole(item);
        this.temporal_entity.flatten([item.temporal_entity])
        this.persistent_item.flatten([item.persistent_item])
        this.appellation.flatten([item.appellation])
      })
    })

  entity_association = new ModelFlattener<EntityAssociationSlice, InfEntityAssociation>(
    this.infActions.entity_association,
    InfEntityAssociation.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfEntityAssociation(item);
        this.persistent_item.flatten([item.domain_pe_it])
        this.persistent_item.flatten([item.range_pe_it])
        this.digital.flatten([item.domain_digital])
      })
    })

  appellation = new ModelFlattener<EntityAssociationSlice, InfAppellation>(
    this.infActions.appellation,
    InfAppellation.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfAppellation(item);
      })
    })

  digital = new ModelFlattener<DigitalSlice, DatDigital>(
    this.datActions.digital,
    DatDigital.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new DatDigital(item);
      })
    })

  getFlattened(): FlattenerInterface {
    return {
      persistent_item: this.persistent_item,
      temporal_entity: this.temporal_entity,
      entity_association: this.entity_association,
      role: this.role,
      appellation: this.appellation,
      digital: this.digital
    }
  }
}

export const storeFlattened = (flattened: FlattenerInterface, pk?) => {
  values(flattened).forEach(model => {
    if (model.items) model.actions.loadSucceeded(model.items, undefined, pk)
  })
}
