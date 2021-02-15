import { InfActions } from "@kleiolab/lib-redux";
import { InfTimePrimitiveSlice } from "@kleiolab/lib-redux";
import { InfTextPropertySlice } from "@kleiolab/lib-redux";
import { InfPlaceSlice } from "@kleiolab/lib-redux";
import { InfPersistentItemSlice } from "@kleiolab/lib-redux";
import { InfLanguageSlice } from "@kleiolab/lib-redux";
import { InfLangStringSlice } from "@kleiolab/lib-redux";
import { InfDimensionSlice } from "@kleiolab/lib-redux";
import { InfAppellationSlice } from "@kleiolab/lib-redux";
import { DatChunk, DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProClassFieldConfig, ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel, ProProject, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { keys, omit, values } from 'ramda';
import { DatActions } from "@kleiolab/lib-redux";
import { DigitalSlice } from "@kleiolab/lib-redux";
import { ChunkSlice } from "@kleiolab/lib-redux";
import { ProActions } from "@kleiolab/lib-redux";
import { ProTextPropertySlice } from "@kleiolab/lib-redux";
import { ProProjectSlice } from "@kleiolab/lib-redux";
import { ProInfoProjRelSlice } from "@kleiolab/lib-redux";
import { ProDfhProfileProjRelSlice } from "@kleiolab/lib-redux";
import { ProDfhClassProjRelSlice } from "@kleiolab/lib-redux";
import { ProClassFieldConfigSlice } from "@kleiolab/lib-redux";
import { ProAnalysisSlice } from "@kleiolab/lib-redux";
import { ProAnalysis } from "@kleiolab/lib-sdk-lb4";
import { SchemaActionsFactory } from './schema-actions-factory';

class ModelFlattener<Payload, Model> {
  items: Model[]
  constructor(
    public actions: SchemaActionsFactory<Payload, Model>,
    public modelDefinition: any,
    public flattenCb: (items: Model[]) => void,
  ) { }

  flatten(items: Model[]) {
    if (items && items.length > 0) {

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

  pro_dfh_class_proj_rel = new ModelFlattener<ProDfhClassProjRelSlice, ProDfhClassProjRel>(
    this.proActions.dfh_class_proj_rel,
    ProDfhClassProjRel.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new ProDfhClassProjRel(item);
      })
    })

  pro_dfh_profile_proj_rel = new ModelFlattener<ProDfhProfileProjRelSlice, ProDfhProfileProjRel>(
    this.proActions.dfh_profile_proj_rel,
    ProDfhProfileProjRel.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new ProDfhProfileProjRel(item);
      })
    })


  persistent_item = new ModelFlattener<InfPersistentItemSlice, InfPersistentItem>(
    this.infActions.persistent_item,
    InfPersistentItem.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfPersistentItem(item);
        this.statement.flatten(item.incoming_statements)
        this.statement.flatten(item.outgoing_statements)
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
        this.statement.flatten(item.outgoing_statements)
        this.statement.flatten(item.incoming_statements)
        this.text_property.flatten(item.text_properties)
        this.info_proj_rel.flatten(item.entity_version_project_rels)
      })
    })


  statement = new ModelFlattener<InfPersistentItemSlice, InfStatement>(
    this.infActions.statement,
    InfStatement.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfStatement(item);
        this.info_proj_rel.flatten(item.entity_version_project_rels)

        // Subject
        if (item.subject_temporal_entity) this.temporal_entity.flatten([item.subject_temporal_entity])
        else if (item.subject_statement) this.statement.flatten([item.subject_statement])

        // Object
        if (item.object_persistent_item) this.persistent_item.flatten([item.object_persistent_item])
        else if (item.object_appellation) this.appellation.flatten([item.object_appellation])
        else if (item.object_place) this.place.flatten([item.object_place])
        else if (item.object_time_primitive) this.time_primitive.flatten([item.object_time_primitive])
        else if (item.object_language) this.language.flatten([item.object_language])
        else if (item.subject_chunk) this.chunk.flatten([item.subject_chunk])
        else if (item.object_lang_string) this.lang_string.flatten([item.object_lang_string])
        else if (item.object_dimension) this.dimension.flatten([item.object_dimension])
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

  lang_string = new ModelFlattener<InfLangStringSlice, InfLangString>(
    this.infActions.lang_string,
    InfLangString.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfLangString(item);
        this.language.flatten([item.language])
        this.info_proj_rel.flatten(item.entity_version_project_rels)
      })
    })

  dimension = new ModelFlattener<InfDimensionSlice, InfDimension>(
    this.infActions.dimension,
    InfDimension.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new InfDimension(item);
        this.info_proj_rel.flatten(item.entity_version_project_rels)
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
        this.statement.flatten(item.outgoing_statements)
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
    { relations: [] },
    (items) => {
      items.forEach(item => { })
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
      pro_dfh_profile_proj_rel: this.pro_dfh_profile_proj_rel,
      pro_dfh_class_proj_rel: this.pro_dfh_class_proj_rel,

      info_proj_rel: this.info_proj_rel,
      analysis: this.analysis,

      persistent_item: this.persistent_item,
      temporal_entity: this.temporal_entity,
      statement: this.statement,
      appellation: this.appellation,
      place: this.place,
      time_primitive: this.time_primitive,
      language: this.language,
      text_property: this.text_property,
      lang_string: this.lang_string,
      dimension: this.dimension,

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
