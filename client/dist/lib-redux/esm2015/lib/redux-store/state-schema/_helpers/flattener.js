/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/flattener.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DatChunk, DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProClassFieldConfig, ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel, ProProject, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { keys, omit, values } from 'ramda';
/**
 * @template Payload, Model
 */
class ModelFlattener {
    /**
     * @param {?} actions
     * @param {?} modelDefinition
     * @param {?} flattenCb
     */
    constructor(actions, modelDefinition, flattenCb) {
        this.actions = actions;
        this.modelDefinition = modelDefinition;
        this.flattenCb = flattenCb;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    flatten(items) {
        if (items && items.length > 0) {
            this.flattenCb(items);
            // todo remove properties of those objects, using getModelDefinition()
            /** @type {?} */
            const keysToOmit = keys(this.modelDefinition.relations).map((/**
             * @param {?} item
             * @return {?}
             */
            item => item.toString()));
            this.items = [
                ...(this.items || []),
                ...(/** @type {?} */ (items.filter((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => !!item && Object.keys(item).length > 0))
                    .map((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => omit(keysToOmit, item)))))
            ];
        }
        return true;
    }
}
if (false) {
    /** @type {?} */
    ModelFlattener.prototype.items;
    /** @type {?} */
    ModelFlattener.prototype.actions;
    /** @type {?} */
    ModelFlattener.prototype.modelDefinition;
    /** @type {?} */
    ModelFlattener.prototype.flattenCb;
}
/**
 * @record
 */
function FlattenerInterface() { }
/**
 * Flattener is the class used to flatten nested objects.
 * Use storeFlattened() to call all actions to put the
 * flattened items into the store.
 */
export class Flattener {
    /**
     * @param {?} infActions
     * @param {?} datActions
     * @param {?} proActions
     */
    constructor(infActions, datActions, proActions) {
        this.infActions = infActions;
        this.datActions = datActions;
        this.proActions = proActions;
        this.info_proj_rel = new ModelFlattener(this.proActions.info_proj_rel, ProInfoProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProInfoProjRel(item);
            }));
        }));
        this.pro_dfh_class_proj_rel = new ModelFlattener(this.proActions.dfh_class_proj_rel, ProDfhClassProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProDfhClassProjRel(item);
            }));
        }));
        this.pro_dfh_profile_proj_rel = new ModelFlattener(this.proActions.dfh_profile_proj_rel, ProDfhProfileProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProDfhProfileProjRel(item);
            }));
        }));
        this.persistent_item = new ModelFlattener(this.infActions.persistent_item, InfPersistentItem.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfPersistentItem(item);
                this.statement.flatten(item.incoming_statements);
                this.statement.flatten(item.outgoing_statements);
                this.text_property.flatten(item.text_properties);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.temporal_entity = new ModelFlattener(this.infActions.temporal_entity, InfTemporalEntity.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfTemporalEntity(item);
                this.statement.flatten(item.outgoing_statements);
                this.statement.flatten(item.incoming_statements);
                this.text_property.flatten(item.text_properties);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.statement = new ModelFlattener(this.infActions.statement, InfStatement.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
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
            }));
        }));
        this.appellation = new ModelFlattener(this.infActions.appellation, InfAppellation.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfAppellation(item);
            }));
        }));
        this.place = new ModelFlattener(this.infActions.place, InfPlace.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfPlace(item);
            }));
        }));
        this.time_primitive = new ModelFlattener(this.infActions.time_primitive, InfTimePrimitive.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfTimePrimitive(item);
            }));
        }));
        this.language = new ModelFlattener(this.infActions.language, InfLanguage.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfLanguage(item);
            }));
        }));
        this.lang_string = new ModelFlattener(this.infActions.lang_string, InfLangString.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfLangString(item);
                this.language.flatten([item.language]);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.dimension = new ModelFlattener(this.infActions.dimension, InfDimension.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfDimension(item);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.text_property = new ModelFlattener(this.infActions.text_property, InfTextProperty.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new InfTextProperty(item);
                this.language.flatten([item.language]);
                this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.digital = new ModelFlattener(this.datActions.digital, DatDigital.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new DatDigital(item);
            }));
        }));
        this.chunk = new ModelFlattener(this.datActions.chunk, DatChunk.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new DatChunk(item);
                this.statement.flatten(item.outgoing_statements);
            }));
        }));
        this.pro_project = new ModelFlattener(this.proActions.project, ProProject.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProProject(item);
                this.language.flatten([item.default_language]);
            }));
        }));
        this.pro_text_property = new ModelFlattener(this.proActions.text_property, ProTextProperty.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProTextProperty(item);
                this.language.flatten([item.language]);
            }));
        }));
        this.pro_class_field_config = new ModelFlattener(this.proActions.class_field_config, ProClassFieldConfig.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => {
                item = new ProClassFieldConfig(item);
            }));
        }));
        this.analysis = new ModelFlattener(this.proActions.analysis, { relations: [] }, (/**
         * @param {?} items
         * @return {?}
         */
        (items) => {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            item => { }));
        }));
    }
    /**
     * @return {?}
     */
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
if (false) {
    /** @type {?} */
    Flattener.prototype.info_proj_rel;
    /** @type {?} */
    Flattener.prototype.pro_dfh_class_proj_rel;
    /** @type {?} */
    Flattener.prototype.pro_dfh_profile_proj_rel;
    /** @type {?} */
    Flattener.prototype.persistent_item;
    /** @type {?} */
    Flattener.prototype.temporal_entity;
    /** @type {?} */
    Flattener.prototype.statement;
    /** @type {?} */
    Flattener.prototype.appellation;
    /** @type {?} */
    Flattener.prototype.place;
    /** @type {?} */
    Flattener.prototype.time_primitive;
    /** @type {?} */
    Flattener.prototype.language;
    /** @type {?} */
    Flattener.prototype.lang_string;
    /** @type {?} */
    Flattener.prototype.dimension;
    /** @type {?} */
    Flattener.prototype.text_property;
    /** @type {?} */
    Flattener.prototype.digital;
    /** @type {?} */
    Flattener.prototype.chunk;
    /** @type {?} */
    Flattener.prototype.pro_project;
    /** @type {?} */
    Flattener.prototype.pro_text_property;
    /** @type {?} */
    Flattener.prototype.pro_class_field_config;
    /** @type {?} */
    Flattener.prototype.analysis;
    /** @type {?} */
    Flattener.prototype.infActions;
    /** @type {?} */
    Flattener.prototype.datActions;
    /** @type {?} */
    Flattener.prototype.proActions;
}
/** @type {?} */
export const storeFlattened = (/**
 * @param {?} flattened
 * @param {?=} pk
 * @param {?=} type
 * @return {?}
 */
(flattened, pk, type) => {
    values(flattened).forEach((/**
     * @param {?} model
     * @return {?}
     */
    model => {
        if (model.items) {
            if (type === 'UPSERT') {
                model.actions.upsertSucceeded(model.items, undefined, pk);
            }
            else {
                model.actions.loadSucceeded(model.items, undefined, pk);
            }
        }
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvZmxhdHRlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLG9CQUFvQixFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFcFUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7O0FBSzNDLE1BQU0sY0FBYzs7Ozs7O0lBRWxCLFlBQ1MsT0FBNkMsRUFDN0MsZUFBb0IsRUFDcEIsU0FBbUM7UUFGbkMsWUFBTyxHQUFQLE9BQU8sQ0FBc0M7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQUs7UUFDcEIsY0FBUyxHQUFULFNBQVMsQ0FBMEI7SUFDeEMsQ0FBQzs7Ozs7SUFFTCxPQUFPLENBQUMsS0FBYztRQUNwQixJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUU3QixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7a0JBRWhCLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHOzs7O1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUM7WUFDcEYsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDWCxHQUFHLENBQUMsSUFBSSxDQUFD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QUVKLDhCQVFJOztJQUVKLGtDQVNJOztJQUVKLDRCQU9JOztJQUVKLDBCQVFJOztJQUVKLGdDQVFJOztJQUVKLHNDQVFJOztJQUdKLDJDQU9JOztJQUdKLDZCQUtJOztJQUVGLCtCQUE2Qjs7SUFDN0IsK0JBQTZCOztJQUM3QiwrQkFBNkI7OztBQThCakMsTUFBTSxPQUFPLGNBQWM7Ozs7OztBQUFHLENBQUMsU0FBNkIsRUFBRSxFQUFHLEVBQUUsSUFBd0IsRUFBRSxFQUFFO0lBQzdGLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPOzs7O0lBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTthQUMxRDtpQkFBTTtnQkFDTCxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTthQUN4RDtTQUNGO0lBQ0gsQ0FBQyxFQUFDLENBQUE7QUFDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRDaHVuaywgRGF0RGlnaXRhbCwgSW5mQXBwZWxsYXRpb24sIEluZkRpbWVuc2lvbiwgSW5mTGFuZ1N0cmluZywgSW5mTGFuZ3VhZ2UsIEluZlBlcnNpc3RlbnRJdGVtLCBJbmZQbGFjZSwgSW5mU3RhdGVtZW50LCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGV4dFByb3BlcnR5LCBJbmZUaW1lUHJpbWl0aXZlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9EZmhDbGFzc1Byb2pSZWwsIFByb0RmaFByb2ZpbGVQcm9qUmVsLCBQcm9JbmZvUHJvalJlbCwgUHJvUHJvamVjdCwgUHJvVGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFByb0FuYWx5c2lzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGtleXMsIG9taXQsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IERhdEFjdGlvbnMsIEluZkFjdGlvbnMsIFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IENodW5rU2xpY2UsIERpZ2l0YWxTbGljZSwgSW5mQXBwZWxsYXRpb25TbGljZSwgSW5mRGltZW5zaW9uU2xpY2UsIEluZkxhbmdTdHJpbmdTbGljZSwgSW5mTGFuZ3VhZ2VTbGljZSwgSW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mUGxhY2VTbGljZSwgSW5mVGV4dFByb3BlcnR5U2xpY2UsIEluZlRpbWVQcmltaXRpdmVTbGljZSwgUHJvQW5hbHlzaXNTbGljZSwgUHJvQ2xhc3NGaWVsZENvbmZpZ1NsaWNlLCBQcm9EZmhDbGFzc1Byb2pSZWxTbGljZSwgUHJvRGZoUHJvZmlsZVByb2pSZWxTbGljZSwgUHJvSW5mb1Byb2pSZWxTbGljZSwgUHJvUHJvamVjdFNsaWNlLCBQcm9UZXh0UHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4vc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cbmNsYXNzIE1vZGVsRmxhdHRlbmVyPFBheWxvYWQsIE1vZGVsPiB7XG4gIGl0ZW1zOiBNb2RlbFtdXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBhY3Rpb25zOiBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4sXG4gICAgcHVibGljIG1vZGVsRGVmaW5pdGlvbjogYW55LFxuICAgIHB1YmxpYyBmbGF0dGVuQ2I6IChpdGVtczogTW9kZWxbXSkgPT4gdm9pZCxcbiAgKSB7IH1cblxuICBmbGF0dGVuKGl0ZW1zOiBNb2RlbFtdKSB7XG4gICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcblxuICAgICAgdGhpcy5mbGF0dGVuQ2IoaXRlbXMpO1xuICAgICAgLy8gdG9kbyByZW1vdmUgcHJvcGVydGllcyBvZiB0aG9zZSBvYmplY3RzLCB1c2luZyBnZXRNb2RlbERlZmluaXRpb24oKVxuICAgICAgY29uc3Qga2V5c1RvT21pdCA9IGtleXModGhpcy5tb2RlbERlZmluaXRpb24ucmVsYXRpb25zKS5tYXAoaXRlbSA9PiBpdGVtLnRvU3RyaW5nKCkpXG4gICAgICB0aGlzLml0ZW1zID0gW1xuICAgICAgICAuLi4odGhpcy5pdGVtcyB8fCBbXSksXG4gICAgICAgIC4uLml0ZW1zLmZpbHRlcihpdGVtID0+ICEhaXRlbSAmJiBPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggPiAwKVxuICAgICAgICAgIC5tYXAoaXRlbSA9PiBvbWl0KGtleXNUb09taXQsIGl0ZW0pKSBhcyBNb2RlbFtdXG4gICAgICBdXG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbn1cblxuaW50ZXJmYWNlIEZsYXR0ZW5lckludGVyZmFjZSB7XG4gIFtrZXk6IHN0cmluZ106IE1vZGVsRmxhdHRlbmVyPGFueSwgYW55PlxufVxuXG4vKipcbiAqIEZsYXR0ZW5lciBpcyB0aGUgY2xhc3MgdXNlZCB0byBmbGF0dGVuIG5lc3RlZCBvYmplY3RzLlxuICogVXNlIHN0b3JlRmxhdHRlbmVkKCkgdG8gY2FsbCBhbGwgYWN0aW9ucyB0byBwdXQgdGhlXG4gKiBmbGF0dGVuZWQgaXRlbXMgaW50byB0aGUgc3RvcmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBGbGF0dGVuZXIge1xuXG5cblxuICBpbmZvX3Byb2pfcmVsID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0luZm9Qcm9qUmVsU2xpY2UsIFByb0luZm9Qcm9qUmVsPihcbiAgICB0aGlzLnByb0FjdGlvbnMuaW5mb19wcm9qX3JlbCxcbiAgICBQcm9JbmZvUHJvalJlbC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvSW5mb1Byb2pSZWwoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgcHJvX2RmaF9jbGFzc19wcm9qX3JlbCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9EZmhDbGFzc1Byb2pSZWxTbGljZSwgUHJvRGZoQ2xhc3NQcm9qUmVsPihcbiAgICB0aGlzLnByb0FjdGlvbnMuZGZoX2NsYXNzX3Byb2pfcmVsLFxuICAgIFByb0RmaENsYXNzUHJvalJlbC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvRGZoQ2xhc3NQcm9qUmVsKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIHByb19kZmhfcHJvZmlsZV9wcm9qX3JlbCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9EZmhQcm9maWxlUHJvalJlbFNsaWNlLCBQcm9EZmhQcm9maWxlUHJvalJlbD4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmRmaF9wcm9maWxlX3Byb2pfcmVsLFxuICAgIFByb0RmaFByb2ZpbGVQcm9qUmVsLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9EZmhQcm9maWxlUHJvalJlbChpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIHBlcnNpc3RlbnRfaXRlbSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZQZXJzaXN0ZW50SXRlbT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnBlcnNpc3RlbnRfaXRlbSxcbiAgICBJbmZQZXJzaXN0ZW50SXRlbS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mUGVyc2lzdGVudEl0ZW0oaXRlbSk7XG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5pbmNvbWluZ19zdGF0ZW1lbnRzKVxuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0ub3V0Z29pbmdfc3RhdGVtZW50cylcbiAgICAgICAgdGhpcy50ZXh0X3Byb3BlcnR5LmZsYXR0ZW4oaXRlbS50ZXh0X3Byb3BlcnRpZXMpXG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIHRlbXBvcmFsX2VudGl0eSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZUZW1wb3JhbEVudGl0eT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnRlbXBvcmFsX2VudGl0eSxcbiAgICBJbmZUZW1wb3JhbEVudGl0eS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mVGVtcG9yYWxFbnRpdHkoaXRlbSk7XG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5vdXRnb2luZ19zdGF0ZW1lbnRzKVxuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0uaW5jb21pbmdfc3RhdGVtZW50cylcbiAgICAgICAgdGhpcy50ZXh0X3Byb3BlcnR5LmZsYXR0ZW4oaXRlbS50ZXh0X3Byb3BlcnRpZXMpXG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgc3RhdGVtZW50ID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlN0YXRlbWVudD4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudCxcbiAgICBJbmZTdGF0ZW1lbnQuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlN0YXRlbWVudChpdGVtKTtcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG5cbiAgICAgICAgLy8gU3ViamVjdFxuICAgICAgICBpZiAoaXRlbS5zdWJqZWN0X3RlbXBvcmFsX2VudGl0eSkgdGhpcy50ZW1wb3JhbF9lbnRpdHkuZmxhdHRlbihbaXRlbS5zdWJqZWN0X3RlbXBvcmFsX2VudGl0eV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0uc3ViamVjdF9zdGF0ZW1lbnQpIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oW2l0ZW0uc3ViamVjdF9zdGF0ZW1lbnRdKVxuXG4gICAgICAgIC8vIE9iamVjdFxuICAgICAgICBpZiAoaXRlbS5vYmplY3RfcGVyc2lzdGVudF9pdGVtKSB0aGlzLnBlcnNpc3RlbnRfaXRlbS5mbGF0dGVuKFtpdGVtLm9iamVjdF9wZXJzaXN0ZW50X2l0ZW1dKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9hcHBlbGxhdGlvbikgdGhpcy5hcHBlbGxhdGlvbi5mbGF0dGVuKFtpdGVtLm9iamVjdF9hcHBlbGxhdGlvbl0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X3BsYWNlKSB0aGlzLnBsYWNlLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X3BsYWNlXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfdGltZV9wcmltaXRpdmUpIHRoaXMudGltZV9wcmltaXRpdmUuZmxhdHRlbihbaXRlbS5vYmplY3RfdGltZV9wcmltaXRpdmVdKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9sYW5ndWFnZSkgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLm9iamVjdF9sYW5ndWFnZV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0uc3ViamVjdF9jaHVuaykgdGhpcy5jaHVuay5mbGF0dGVuKFtpdGVtLnN1YmplY3RfY2h1bmtdKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9sYW5nX3N0cmluZykgdGhpcy5sYW5nX3N0cmluZy5mbGF0dGVuKFtpdGVtLm9iamVjdF9sYW5nX3N0cmluZ10pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X2RpbWVuc2lvbikgdGhpcy5kaW1lbnNpb24uZmxhdHRlbihbaXRlbS5vYmplY3RfZGltZW5zaW9uXSlcbiAgICAgIH0pXG4gICAgfSlcblxuICBhcHBlbGxhdGlvbiA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZBcHBlbGxhdGlvblNsaWNlLCBJbmZBcHBlbGxhdGlvbj4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLmFwcGVsbGF0aW9uLFxuICAgIEluZkFwcGVsbGF0aW9uLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZBcHBlbGxhdGlvbihpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIHBsYWNlID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlBsYWNlU2xpY2UsIEluZlBsYWNlPihcbiAgICB0aGlzLmluZkFjdGlvbnMucGxhY2UsXG4gICAgSW5mUGxhY2UuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlBsYWNlKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIHRpbWVfcHJpbWl0aXZlID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlRpbWVQcmltaXRpdmVTbGljZSwgSW5mVGltZVByaW1pdGl2ZT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnRpbWVfcHJpbWl0aXZlLFxuICAgIEluZlRpbWVQcmltaXRpdmUuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlRpbWVQcmltaXRpdmUoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgbGFuZ3VhZ2UgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mTGFuZ3VhZ2VTbGljZSwgSW5mTGFuZ3VhZ2U+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5sYW5ndWFnZSxcbiAgICBJbmZMYW5ndWFnZS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mTGFuZ3VhZ2UoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgbGFuZ19zdHJpbmcgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mTGFuZ1N0cmluZ1NsaWNlLCBJbmZMYW5nU3RyaW5nPihcbiAgICB0aGlzLmluZkFjdGlvbnMubGFuZ19zdHJpbmcsXG4gICAgSW5mTGFuZ1N0cmluZy5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mTGFuZ1N0cmluZyhpdGVtKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLmxhbmd1YWdlXSlcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgZGltZW5zaW9uID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZkRpbWVuc2lvblNsaWNlLCBJbmZEaW1lbnNpb24+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5kaW1lbnNpb24sXG4gICAgSW5mRGltZW5zaW9uLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZEaW1lbnNpb24oaXRlbSk7XG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIHRleHRfcHJvcGVydHkgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mVGV4dFByb3BlcnR5U2xpY2UsIEluZlRleHRQcm9wZXJ0eT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnRleHRfcHJvcGVydHksXG4gICAgSW5mVGV4dFByb3BlcnR5LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZUZXh0UHJvcGVydHkoaXRlbSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5sYW5ndWFnZV0pXG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIGRpZ2l0YWwgPSBuZXcgTW9kZWxGbGF0dGVuZXI8RGlnaXRhbFNsaWNlLCBEYXREaWdpdGFsPihcbiAgICB0aGlzLmRhdEFjdGlvbnMuZGlnaXRhbCxcbiAgICBEYXREaWdpdGFsLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBEYXREaWdpdGFsKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIGNodW5rID0gbmV3IE1vZGVsRmxhdHRlbmVyPENodW5rU2xpY2UsIERhdENodW5rPihcbiAgICB0aGlzLmRhdEFjdGlvbnMuY2h1bmssXG4gICAgRGF0Q2h1bmsuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IERhdENodW5rKGl0ZW0pO1xuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0ub3V0Z29pbmdfc3RhdGVtZW50cylcbiAgICAgIH0pXG4gICAgfSlcblxuICBwcm9fcHJvamVjdCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9Qcm9qZWN0U2xpY2UsIFByb1Byb2plY3Q+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5wcm9qZWN0LFxuICAgIFByb1Byb2plY3QuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb1Byb2plY3QoaXRlbSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5kZWZhdWx0X2xhbmd1YWdlXSlcbiAgICAgIH0pXG4gICAgfSlcblxuICBwcm9fdGV4dF9wcm9wZXJ0eSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9UZXh0UHJvcGVydHlTbGljZSwgUHJvVGV4dFByb3BlcnR5PihcbiAgICB0aGlzLnByb0FjdGlvbnMudGV4dF9wcm9wZXJ0eSxcbiAgICBQcm9UZXh0UHJvcGVydHkuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb1RleHRQcm9wZXJ0eShpdGVtKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLmxhbmd1YWdlXSlcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIHByb19jbGFzc19maWVsZF9jb25maWcgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvQ2xhc3NGaWVsZENvbmZpZ1NsaWNlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnPihcbiAgICB0aGlzLnByb0FjdGlvbnMuY2xhc3NfZmllbGRfY29uZmlnLFxuICAgIFByb0NsYXNzRmllbGRDb25maWcuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb0NsYXNzRmllbGRDb25maWcoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cblxuICBhbmFseXNpcyA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9BbmFseXNpc1NsaWNlLCBQcm9BbmFseXNpcz4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmFuYWx5c2lzLFxuICAgIHsgcmVsYXRpb25zOiBbXSB9LFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHsgfSlcbiAgICB9KVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwdWJsaWMgZGF0QWN0aW9uczogRGF0QWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9uc1xuICApIHsgfVxuICBnZXRGbGF0dGVuZWQoKTogRmxhdHRlbmVySW50ZXJmYWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvX3Byb2plY3Q6IHRoaXMucHJvX3Byb2plY3QsXG4gICAgICBwcm9fdGV4dF9wcm9wZXJ0eTogdGhpcy5wcm9fdGV4dF9wcm9wZXJ0eSxcbiAgICAgIHByb19jbGFzc19maWVsZF9jb25maWc6IHRoaXMucHJvX2NsYXNzX2ZpZWxkX2NvbmZpZyxcbiAgICAgIHByb19kZmhfcHJvZmlsZV9wcm9qX3JlbDogdGhpcy5wcm9fZGZoX3Byb2ZpbGVfcHJval9yZWwsXG4gICAgICBwcm9fZGZoX2NsYXNzX3Byb2pfcmVsOiB0aGlzLnByb19kZmhfY2xhc3NfcHJval9yZWwsXG5cbiAgICAgIGluZm9fcHJval9yZWw6IHRoaXMuaW5mb19wcm9qX3JlbCxcbiAgICAgIGFuYWx5c2lzOiB0aGlzLmFuYWx5c2lzLFxuXG4gICAgICBwZXJzaXN0ZW50X2l0ZW06IHRoaXMucGVyc2lzdGVudF9pdGVtLFxuICAgICAgdGVtcG9yYWxfZW50aXR5OiB0aGlzLnRlbXBvcmFsX2VudGl0eSxcbiAgICAgIHN0YXRlbWVudDogdGhpcy5zdGF0ZW1lbnQsXG4gICAgICBhcHBlbGxhdGlvbjogdGhpcy5hcHBlbGxhdGlvbixcbiAgICAgIHBsYWNlOiB0aGlzLnBsYWNlLFxuICAgICAgdGltZV9wcmltaXRpdmU6IHRoaXMudGltZV9wcmltaXRpdmUsXG4gICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcbiAgICAgIHRleHRfcHJvcGVydHk6IHRoaXMudGV4dF9wcm9wZXJ0eSxcbiAgICAgIGxhbmdfc3RyaW5nOiB0aGlzLmxhbmdfc3RyaW5nLFxuICAgICAgZGltZW5zaW9uOiB0aGlzLmRpbWVuc2lvbixcblxuICAgICAgZGlnaXRhbDogdGhpcy5kaWdpdGFsLFxuICAgICAgY2h1bms6IHRoaXMuY2h1bmssXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzdG9yZUZsYXR0ZW5lZCA9IChmbGF0dGVuZWQ6IEZsYXR0ZW5lckludGVyZmFjZSwgcGs/LCB0eXBlPzogJ0xPQUQnIHwgJ1VQU0VSVCcpID0+IHtcbiAgdmFsdWVzKGZsYXR0ZW5lZCkuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgaWYgKG1vZGVsLml0ZW1zKSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ1VQU0VSVCcpIHtcbiAgICAgICAgbW9kZWwuYWN0aW9ucy51cHNlcnRTdWNjZWVkZWQobW9kZWwuaXRlbXMsIHVuZGVmaW5lZCwgcGspXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2RlbC5hY3Rpb25zLmxvYWRTdWNjZWVkZWQobW9kZWwuaXRlbXMsIHVuZGVmaW5lZCwgcGspXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuIl19