import { InfEntityAssociation, InfPersistentItem, InfRole } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { InfAppellationSlice, InfEntityAssociationSlice, InfLanguageSlice, InfPersistentItemSlice, InfPlaceSlice, InfTextPropertySlice, InfTimePrimitiveSlice } from 'app/core/inf/inf.models';
import { keys, omit, values } from 'ramda';
import { DatActions } from '../dat/dat.actions';
import { ChunkSlice, DigitalSlice } from '../dat/dat.models';
import { ProActions } from '../pro/pro.actions';
import { ProAnalysisSlice, ProDfhClassProjRelSlice, ProInfoProjRelSlice, ProProjectSlice, ProTextPropertySlice, ProClassFieldConfigSlice } from '../pro/pro.models';
import { DatChunk, DatDigital, InfAppellation, InfLanguage, InfPlace, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProAnalysis, ProDfhClassProjRel, ProInfoProjRel, ProProject, ProTextProperty, ProClassFieldConfig } from '../sdk';
import { StandardActionsFactory } from './actions';

export class ModelFlattener<Payload, Model> {
  items: Model[]
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



  info_proj_rel = new ModelFlattener<ProInfoProjRelSlice, ProInfoProjRel>(
    this.proActions.info_proj_rel,
    ProInfoProjRel.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new ProInfoProjRel(item);
      })
    })

  dfh_class_proj_rel = new ModelFlattener<ProDfhClassProjRelSlice, ProDfhClassProjRel>(
    this.proActions.dfh_class_proj_rel,
    ProInfoProjRel.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new ProDfhClassProjRel(item);
      })
    })


  persistent_item = new ModelFlattener<InfPersistentItemSlice, InfPersistentItem>(
    this.infActions.persistent_item,
    InfPersistentItem.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfPersistentItem(item);
        this.entity_association.flatten(item.domain_entity_associations);
        this.role.flatten(item.pi_roles)
        this.text_property.flatten(item.text_properties)
        this.info_proj_rel.flatten(item.entity_version_project_rels)
      })
    })

  temporal_entity = new ModelFlattener<InfPersistentItemSlice, InfTemporalEntity>(
    this.infActions.temporal_entity,
    InfTemporalEntity.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfTemporalEntity(item);
        this.role.flatten(item.te_roles)
        this.role.flatten(item.ingoing_roles)
        this.text_property.flatten(item.text_properties)
        this.info_proj_rel.flatten(item.entity_version_project_rels)
      })
    })


  role = new ModelFlattener<InfPersistentItemSlice, InfRole>(
    this.infActions.role,
    InfRole.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfRole(item);
        this.temporal_entity.flatten([item.temporal_entity])
        this.persistent_item.flatten([item.persistent_item])
        this.appellation.flatten([item.appellation])
        this.place.flatten([item.place])
        this.time_primitive.flatten([item.time_primitive])
        this.language.flatten([item.language])
        this.info_proj_rel.flatten(item.entity_version_project_rels)
      })
    })

  entity_association = new ModelFlattener<InfEntityAssociationSlice, InfEntityAssociation>(
    this.infActions.entity_association,
    InfEntityAssociation.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfEntityAssociation(item);
        this.persistent_item.flatten([item.domain_pe_it])
        this.persistent_item.flatten([item.range_pe_it])
        this.digital.flatten([item.domain_digital])
        this.chunk.flatten([item.domain_chunk])
        this.chunk.flatten([item.range_chunk])
        this.info_proj_rel.flatten(item.entity_version_project_rels)
      })
    })

  appellation = new ModelFlattener<InfAppellationSlice, InfAppellation>(
    this.infActions.appellation,
    InfAppellation.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfAppellation(item);
      })
    })


  place = new ModelFlattener<InfPlaceSlice, InfPlace>(
    this.infActions.place,
    InfPlace.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfPlace(item);
      })
    })

  time_primitive = new ModelFlattener<InfTimePrimitiveSlice, InfTimePrimitive>(
    this.infActions.time_primitive,
    InfTimePrimitive.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfTimePrimitive(item);
      })
    })

  language = new ModelFlattener<InfLanguageSlice, InfLanguage>(
    this.infActions.language,
    InfLanguage.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfLanguage(item);
      })
    })

  text_property = new ModelFlattener<InfTextPropertySlice, InfTextProperty>(
    this.infActions.text_property,
    InfTextProperty.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfTextProperty(item);
        this.language.flatten([item.language])
        this.info_proj_rel.flatten(item.entity_version_project_rels)
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

  chunk = new ModelFlattener<ChunkSlice, DatChunk>(
    this.datActions.chunk,
    DatChunk.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new DatChunk(item);
        this.entity_association.flatten(item.data_info_associations)
      })
    })

  pro_project = new ModelFlattener<ProProjectSlice, ProProject>(
    this.proActions.project,
    ProProject.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new ProProject(item);
        this.language.flatten([item.default_language])
      })
    })

  pro_text_property = new ModelFlattener<ProTextPropertySlice, ProTextProperty>(
    this.proActions.text_property,
    ProTextProperty.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new ProTextProperty(item);
        this.language.flatten([item.language])
      })
    })


  pro_class_field_config = new ModelFlattener<ProClassFieldConfigSlice, ProClassFieldConfig>(
    this.proActions.class_field_config,
    ProClassFieldConfig.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new ProClassFieldConfig(item);
      })
    })


  analysis = new ModelFlattener<ProAnalysisSlice, ProAnalysis>(
    this.proActions.analysis,
    ProAnalysis.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new ProAnalysis(item);
      })
    })
  constructor(
    public infActions: InfActions,
    public datActions: DatActions,
    public proActions: ProActions
  ) { }
  getFlattened(): FlattenerInterface {
    return {
      pro_project: this.pro_project,
      pro_text_property: this.pro_text_property,
      pro_class_field_config: this.pro_class_field_config,

      dfh_class_proj_rel: this.dfh_class_proj_rel,
      info_proj_rel: this.info_proj_rel,
      analysis: this.analysis,

      persistent_item: this.persistent_item,
      temporal_entity: this.temporal_entity,
      entity_association: this.entity_association,
      role: this.role,
      appellation: this.appellation,
      place: this.place,
      time_primitive: this.time_primitive,
      language: this.language,
      text_property: this.text_property,

      digital: this.digital,
      chunk: this.chunk,
    }
  }
}

export const storeFlattened = (flattened: FlattenerInterface, pk?, type?: 'LOAD' | 'UPSERT') => {
  values(flattened).forEach(model => {
    if (model.items) {
      if (type === 'UPSERT') {
        model.actions.upsertSucceeded(model.items, undefined, pk)
      } else {
        model.actions.loadSucceeded(model.items, undefined, pk)
      }
    }
  })
}
