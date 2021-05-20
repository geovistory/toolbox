import { DatDigital, ProClassFieldConfig, ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel } from '@kleiolab/lib-sdk-lb3';
import { ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { keys, omit, values } from 'ramda';
import { DatActions } from '../actions/dat.actions';
import { InfActions } from '../actions/inf.actions';
import { ProActions } from '../actions/pro.actions';
import { DigitalSlice } from '../models/dat.models';
import { ProAnalysisSlice, ProClassFieldConfigSlice, ProDfhClassProjRelSlice, ProDfhProfileProjRelSlice, ProInfoProjRelSlice } from '../models/pro.models';
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


  // appellation = new ModelFlattener<InfAppellationSlice, InfAppellation>(
  //   this.infActions.appellation,
  //   InfAppellation.getModelDefinition(),
  //   (items) => {
  //     items.forEach(item => {
  //       item = new InfAppellation(item);
  //     })
  //   })


  // place = new ModelFlattener<InfPlaceSlice, InfPlace>(
  //   this.infActions.place,
  //   InfPlace.getModelDefinition(),
  //   (items) => {
  //     items.forEach(item => {
  //       item = new InfPlace(item);
  //     })
  //   })

  // time_primitive = new ModelFlattener<InfTimePrimitiveSlice, InfTimePrimitive>(
  //   this.infActions.time_primitive,
  //   InfTimePrimitive.getModelDefinition(),
  //   (items) => {
  //     items.forEach(item => {
  //       item = new InfTimePrimitive(item);
  //     })
  //   })

  // language = new ModelFlattener<InfLanguageSlice, InfLanguage>(
  //   this.infActions.language,
  //   InfLanguage.getModelDefinition(),
  //   (items) => {
  //     items.forEach(item => {
  //       item = new InfLanguage(item);
  //     })
  //   })

  // lang_string = new ModelFlattener<InfLangStringSlice, InfLangString>(
  //   this.infActions.lang_string,
  //   InfLangString.getModelDefinition(),
  //   (items) => {
  //     items.forEach(item => {
  //       item = new InfLangString(item);
  //       this.language.flatten([item.language])
  //       this.info_proj_rel.flatten(item.entity_version_project_rels)
  //     })
  //   })

  // dimension = new ModelFlattener<InfDimensionSlice, InfDimension>(
  //   this.infActions.dimension,
  //   InfDimension.getModelDefinition(),
  //   (items) => {
  //     items.forEach(item => {
  //       item = new InfDimension(item);
  //       this.info_proj_rel.flatten(item.entity_version_project_rels)
  //     })
  //   })


  digital = new ModelFlattener<DigitalSlice, DatDigital>(
    this.datActions.digital,
    DatDigital.getModelDefinition(),
    (items) => {
      items.forEach(item => {
        item = new DatDigital(item);
      })
    })

  // chunk = new ModelFlattener<ChunkSlice, DatChunk>(
  //   this.datActions.chunk,
  //   DatChunk.getModelDefinition(),
  //   (items) => {
  //     items.forEach(item => {
  //       item = new DatChunk(item);
  //       this.statement.flatten(item.outgoing_statements)
  //     })
  //   })

  // pro_project = new ModelFlattener<ProProjectSlice, ProProject>(
  //   this.proActions.project,
  //   ProProject.getModelDefinition(),
  //   (items) => {
  //     items.forEach(item => {
  //       item = new ProProject(item);
  //       this.language.flatten([item.default_language])
  //     })
  //   })

  // pro_text_property = new ModelFlattener<ProTextPropertySlice, ProTextProperty>(
  //   this.proActions.text_property,
  //   ProTextProperty.getModelDefinition(),
  //   (items) => {
  //     items.forEach(item => {
  //       item = new ProTextProperty(item);
  //       this.language.flatten([item.language])
  //     })
  //   })


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
      // pro_project: this.pro_project,
      // pro_text_property: this.pro_text_property,
      pro_class_field_config: this.pro_class_field_config,
      pro_dfh_profile_proj_rel: this.pro_dfh_profile_proj_rel,
      pro_dfh_class_proj_rel: this.pro_dfh_class_proj_rel,

      info_proj_rel: this.info_proj_rel,
      analysis: this.analysis,

      // persistent_item: this.persistent_item,
      // temporal_entity: this.temporal_entity,
      // statement: this.statement,
      // appellation: this.appellation,
      // place: this.place,
      // time_primitive: this.time_primitive,
      // language: this.language,
      // text_property: this.text_property,
      // lang_string: this.lang_string,
      // dimension: this.dimension,

      digital: this.digital,
      // chunk: this.chunk,
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
