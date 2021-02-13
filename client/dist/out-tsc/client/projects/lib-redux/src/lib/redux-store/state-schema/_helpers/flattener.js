import { DatChunk, DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProClassFieldConfig, ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel, ProProject, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { keys, omit, values } from 'ramda';
class ModelFlattener {
    constructor(actions, modelDefinition, flattenCb) {
        this.actions = actions;
        this.modelDefinition = modelDefinition;
        this.flattenCb = flattenCb;
    }
    flatten(items) {
        if (items && items.length > 0) {
            this.flattenCb(items);
            // todo remove properties of those objects, using getModelDefinition()
            const keysToOmit = keys(this.modelDefinition.relations).map(item => item.toString());
            this.items = [
                ...(this.items || []),
                ...items.filter(item => !!item && Object.keys(item).length > 0)
                    .map(item => omit(keysToOmit, item))
            ];
        }
        return true;
    }
}
/**
 * Flattener is the class used to flatten nested objects.
 * Use storeFlattened() to call all actions to put the
 * flattened items into the store.
 */
export class Flattener {
    constructor(infActions, datActions, proActions) {
        this.infActions = infActions;
        this.datActions = datActions;
        this.proActions = proActions;
        this.info_proj_rel = new ModelFlattener(this.proActions.info_proj_rel, ProInfoProjRel.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new ProInfoProjRel(item);
            });
        });
        this.pro_dfh_class_proj_rel = new ModelFlattener(this.proActions.dfh_class_proj_rel, ProDfhClassProjRel.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new ProDfhClassProjRel(item);
            });
        });
        this.pro_dfh_profile_proj_rel = new ModelFlattener(this.proActions.dfh_profile_proj_rel, ProDfhProfileProjRel.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new ProDfhProfileProjRel(item);
            });
        });
        this.persistent_item = new ModelFlattener(this.infActions.persistent_item, InfPersistentItem.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfPersistentItem(item);
                this.statement.flatten(item.incoming_statements);
                this.statement.flatten(item.outgoing_statements);
                this.text_property.flatten(item.text_properties);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            });
        });
        this.temporal_entity = new ModelFlattener(this.infActions.temporal_entity, InfTemporalEntity.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfTemporalEntity(item);
                this.statement.flatten(item.outgoing_statements);
                this.statement.flatten(item.incoming_statements);
                this.text_property.flatten(item.text_properties);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            });
        });
        this.statement = new ModelFlattener(this.infActions.statement, InfStatement.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfStatement(item);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
                // Subject
                if (item.subject_temporal_entity)
                    this.temporal_entity.flatten([item.subject_temporal_entity]);
                else if (item.subject_statement)
                    this.statement.flatten([item.subject_statement]);
                // Object
                if (item.object_persistent_item)
                    this.persistent_item.flatten([item.object_persistent_item]);
                else if (item.object_appellation)
                    this.appellation.flatten([item.object_appellation]);
                else if (item.object_place)
                    this.place.flatten([item.object_place]);
                else if (item.object_time_primitive)
                    this.time_primitive.flatten([item.object_time_primitive]);
                else if (item.object_language)
                    this.language.flatten([item.object_language]);
                else if (item.subject_chunk)
                    this.chunk.flatten([item.subject_chunk]);
                else if (item.object_lang_string)
                    this.lang_string.flatten([item.object_lang_string]);
                else if (item.object_dimension)
                    this.dimension.flatten([item.object_dimension]);
            });
        });
        this.appellation = new ModelFlattener(this.infActions.appellation, InfAppellation.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfAppellation(item);
            });
        });
        this.place = new ModelFlattener(this.infActions.place, InfPlace.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfPlace(item);
            });
        });
        this.time_primitive = new ModelFlattener(this.infActions.time_primitive, InfTimePrimitive.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfTimePrimitive(item);
            });
        });
        this.language = new ModelFlattener(this.infActions.language, InfLanguage.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfLanguage(item);
            });
        });
        this.lang_string = new ModelFlattener(this.infActions.lang_string, InfLangString.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfLangString(item);
                this.language.flatten([item.language]);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            });
        });
        this.dimension = new ModelFlattener(this.infActions.dimension, InfDimension.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfDimension(item);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            });
        });
        this.text_property = new ModelFlattener(this.infActions.text_property, InfTextProperty.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new InfTextProperty(item);
                this.language.flatten([item.language]);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            });
        });
        this.digital = new ModelFlattener(this.datActions.digital, DatDigital.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new DatDigital(item);
            });
        });
        this.chunk = new ModelFlattener(this.datActions.chunk, DatChunk.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new DatChunk(item);
                this.statement.flatten(item.outgoing_statements);
            });
        });
        this.pro_project = new ModelFlattener(this.proActions.project, ProProject.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new ProProject(item);
                this.language.flatten([item.default_language]);
            });
        });
        this.pro_text_property = new ModelFlattener(this.proActions.text_property, ProTextProperty.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new ProTextProperty(item);
                this.language.flatten([item.language]);
            });
        });
        this.pro_class_field_config = new ModelFlattener(this.proActions.class_field_config, ProClassFieldConfig.getModelDefinition(), (items) => {
            items.forEach(item => {
                item = new ProClassFieldConfig(item);
            });
        });
        this.analysis = new ModelFlattener(this.proActions.analysis, { relations: [] }, (items) => {
            items.forEach(item => { });
        });
    }
    getFlattened() {
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
        };
    }
}
export const storeFlattened = (flattened, pk, type) => {
    values(flattened).forEach(model => {
        if (model.items) {
            if (type === 'UPSERT') {
                model.actions.upsertSucceeded(model.items, undefined, pk);
            }
            else {
                model.actions.loadSucceeded(model.items, undefined, pk);
            }
        }
    });
};
//# sourceMappingURL=flattener.js.map