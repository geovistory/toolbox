/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/flattener.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL2ZsYXR0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBVLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQzs7OztBQUszQyxNQUFNLGNBQWM7Ozs7OztJQUVsQixZQUNTLE9BQTZDLEVBQzdDLGVBQW9CLEVBQ3BCLFNBQW1DO1FBRm5DLFlBQU8sR0FBUCxPQUFPLENBQXNDO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFLO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQTBCO0lBQ3hDLENBQUM7Ozs7O0lBRUwsT0FBTyxDQUFDLEtBQWM7UUFDcEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O2tCQUVoQixVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRzs7OztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDO1lBQ3BGLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsR0FBRyxDQUFDLElBQUks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STs7SUFFSiw4QkFRSTs7SUFFSixrQ0FTSTs7SUFFSiw0QkFPSTs7SUFFSiwwQkFRSTs7SUFFSixnQ0FRSTs7SUFFSixzQ0FRSTs7SUFHSiwyQ0FPSTs7SUFHSiw2QkFLSTs7SUFFRiwrQkFBNkI7O0lBQzdCLCtCQUE2Qjs7SUFDN0IsK0JBQTZCOzs7QUE4QmpDLE1BQU0sT0FBTyxjQUFjOzs7Ozs7QUFBRyxDQUFDLFNBQTZCLEVBQUUsRUFBRyxFQUFFLElBQXdCLEVBQUUsRUFBRTtJQUM3RixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTzs7OztJQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7YUFDMUQ7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7YUFDeEQ7U0FDRjtJQUNILENBQUMsRUFBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0Q2h1bmssIERhdERpZ2l0YWwsIEluZkFwcGVsbGF0aW9uLCBJbmZEaW1lbnNpb24sIEluZkxhbmdTdHJpbmcsIEluZkxhbmd1YWdlLCBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGxhY2UsIEluZlN0YXRlbWVudCwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGltZVByaW1pdGl2ZSwgUHJvQ2xhc3NGaWVsZENvbmZpZywgUHJvRGZoQ2xhc3NQcm9qUmVsLCBQcm9EZmhQcm9maWxlUHJvalJlbCwgUHJvSW5mb1Byb2pSZWwsIFByb1Byb2plY3QsIFByb1RleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBQcm9BbmFseXNpcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBrZXlzLCBvbWl0LCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zLCBJbmZBY3Rpb25zLCBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBDaHVua1NsaWNlLCBEaWdpdGFsU2xpY2UsIEluZkFwcGVsbGF0aW9uU2xpY2UsIEluZkRpbWVuc2lvblNsaWNlLCBJbmZMYW5nU3RyaW5nU2xpY2UsIEluZkxhbmd1YWdlU2xpY2UsIEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlBsYWNlU2xpY2UsIEluZlRleHRQcm9wZXJ0eVNsaWNlLCBJbmZUaW1lUHJpbWl0aXZlU2xpY2UsIFByb0FuYWx5c2lzU2xpY2UsIFByb0NsYXNzRmllbGRDb25maWdTbGljZSwgUHJvRGZoQ2xhc3NQcm9qUmVsU2xpY2UsIFByb0RmaFByb2ZpbGVQcm9qUmVsU2xpY2UsIFByb0luZm9Qcm9qUmVsU2xpY2UsIFByb1Byb2plY3RTbGljZSwgUHJvVGV4dFByb3BlcnR5U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMnO1xuaW1wb3J0IHsgU2NoZW1hQWN0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5jbGFzcyBNb2RlbEZsYXR0ZW5lcjxQYXlsb2FkLCBNb2RlbD4ge1xuICBpdGVtczogTW9kZWxbXVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgYWN0aW9uczogU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+LFxuICAgIHB1YmxpYyBtb2RlbERlZmluaXRpb246IGFueSxcbiAgICBwdWJsaWMgZmxhdHRlbkNiOiAoaXRlbXM6IE1vZGVsW10pID0+IHZvaWQsXG4gICkgeyB9XG5cbiAgZmxhdHRlbihpdGVtczogTW9kZWxbXSkge1xuICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHRoaXMuZmxhdHRlbkNiKGl0ZW1zKTtcbiAgICAgIC8vIHRvZG8gcmVtb3ZlIHByb3BlcnRpZXMgb2YgdGhvc2Ugb2JqZWN0cywgdXNpbmcgZ2V0TW9kZWxEZWZpbml0aW9uKClcbiAgICAgIGNvbnN0IGtleXNUb09taXQgPSBrZXlzKHRoaXMubW9kZWxEZWZpbml0aW9uLnJlbGF0aW9ucykubWFwKGl0ZW0gPT4gaXRlbS50b1N0cmluZygpKVxuICAgICAgdGhpcy5pdGVtcyA9IFtcbiAgICAgICAgLi4uKHRoaXMuaXRlbXMgfHwgW10pLFxuICAgICAgICAuLi5pdGVtcy5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0gJiYgT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID4gMClcbiAgICAgICAgICAubWFwKGl0ZW0gPT4gb21pdChrZXlzVG9PbWl0LCBpdGVtKSkgYXMgTW9kZWxbXVxuICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG59XG5cbmludGVyZmFjZSBGbGF0dGVuZXJJbnRlcmZhY2Uge1xuICBba2V5OiBzdHJpbmddOiBNb2RlbEZsYXR0ZW5lcjxhbnksIGFueT5cbn1cblxuLyoqXG4gKiBGbGF0dGVuZXIgaXMgdGhlIGNsYXNzIHVzZWQgdG8gZmxhdHRlbiBuZXN0ZWQgb2JqZWN0cy5cbiAqIFVzZSBzdG9yZUZsYXR0ZW5lZCgpIHRvIGNhbGwgYWxsIGFjdGlvbnMgdG8gcHV0IHRoZVxuICogZmxhdHRlbmVkIGl0ZW1zIGludG8gdGhlIHN0b3JlLlxuICovXG5leHBvcnQgY2xhc3MgRmxhdHRlbmVyIHtcblxuXG5cbiAgaW5mb19wcm9qX3JlbCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9JbmZvUHJvalJlbFNsaWNlLCBQcm9JbmZvUHJvalJlbD4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmluZm9fcHJval9yZWwsXG4gICAgUHJvSW5mb1Byb2pSZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb0luZm9Qcm9qUmVsKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIHByb19kZmhfY2xhc3NfcHJval9yZWwgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvRGZoQ2xhc3NQcm9qUmVsU2xpY2UsIFByb0RmaENsYXNzUHJvalJlbD4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmRmaF9jbGFzc19wcm9qX3JlbCxcbiAgICBQcm9EZmhDbGFzc1Byb2pSZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb0RmaENsYXNzUHJvalJlbChpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBwcm9fZGZoX3Byb2ZpbGVfcHJval9yZWwgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvRGZoUHJvZmlsZVByb2pSZWxTbGljZSwgUHJvRGZoUHJvZmlsZVByb2pSZWw+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5kZmhfcHJvZmlsZV9wcm9qX3JlbCxcbiAgICBQcm9EZmhQcm9maWxlUHJvalJlbC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvRGZoUHJvZmlsZVByb2pSZWwoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cblxuICBwZXJzaXN0ZW50X2l0ZW0gPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mUGVyc2lzdGVudEl0ZW0+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5wZXJzaXN0ZW50X2l0ZW0sXG4gICAgSW5mUGVyc2lzdGVudEl0ZW0uZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlBlcnNpc3RlbnRJdGVtKGl0ZW0pO1xuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0uaW5jb21pbmdfc3RhdGVtZW50cylcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLm91dGdvaW5nX3N0YXRlbWVudHMpXG4gICAgICAgIHRoaXMudGV4dF9wcm9wZXJ0eS5mbGF0dGVuKGl0ZW0udGV4dF9wcm9wZXJ0aWVzKVxuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuICB0ZW1wb3JhbF9lbnRpdHkgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mVGVtcG9yYWxFbnRpdHk+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy50ZW1wb3JhbF9lbnRpdHksXG4gICAgSW5mVGVtcG9yYWxFbnRpdHkuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlRlbXBvcmFsRW50aXR5KGl0ZW0pO1xuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0ub3V0Z29pbmdfc3RhdGVtZW50cylcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLmluY29taW5nX3N0YXRlbWVudHMpXG4gICAgICAgIHRoaXMudGV4dF9wcm9wZXJ0eS5mbGF0dGVuKGl0ZW0udGV4dF9wcm9wZXJ0aWVzKVxuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIHN0YXRlbWVudCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZTdGF0ZW1lbnQ+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQsXG4gICAgSW5mU3RhdGVtZW50LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZTdGF0ZW1lbnQoaXRlbSk7XG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuXG4gICAgICAgIC8vIFN1YmplY3RcbiAgICAgICAgaWYgKGl0ZW0uc3ViamVjdF90ZW1wb3JhbF9lbnRpdHkpIHRoaXMudGVtcG9yYWxfZW50aXR5LmZsYXR0ZW4oW2l0ZW0uc3ViamVjdF90ZW1wb3JhbF9lbnRpdHldKVxuICAgICAgICBlbHNlIGlmIChpdGVtLnN1YmplY3Rfc3RhdGVtZW50KSB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKFtpdGVtLnN1YmplY3Rfc3RhdGVtZW50XSlcblxuICAgICAgICAvLyBPYmplY3RcbiAgICAgICAgaWYgKGl0ZW0ub2JqZWN0X3BlcnNpc3RlbnRfaXRlbSkgdGhpcy5wZXJzaXN0ZW50X2l0ZW0uZmxhdHRlbihbaXRlbS5vYmplY3RfcGVyc2lzdGVudF9pdGVtXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfYXBwZWxsYXRpb24pIHRoaXMuYXBwZWxsYXRpb24uZmxhdHRlbihbaXRlbS5vYmplY3RfYXBwZWxsYXRpb25dKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9wbGFjZSkgdGhpcy5wbGFjZS5mbGF0dGVuKFtpdGVtLm9iamVjdF9wbGFjZV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X3RpbWVfcHJpbWl0aXZlKSB0aGlzLnRpbWVfcHJpbWl0aXZlLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X3RpbWVfcHJpbWl0aXZlXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfbGFuZ3VhZ2UpIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5vYmplY3RfbGFuZ3VhZ2VdKVxuICAgICAgICBlbHNlIGlmIChpdGVtLnN1YmplY3RfY2h1bmspIHRoaXMuY2h1bmsuZmxhdHRlbihbaXRlbS5zdWJqZWN0X2NodW5rXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfbGFuZ19zdHJpbmcpIHRoaXMubGFuZ19zdHJpbmcuZmxhdHRlbihbaXRlbS5vYmplY3RfbGFuZ19zdHJpbmddKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9kaW1lbnNpb24pIHRoaXMuZGltZW5zaW9uLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X2RpbWVuc2lvbl0pXG4gICAgICB9KVxuICAgIH0pXG5cbiAgYXBwZWxsYXRpb24gPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mQXBwZWxsYXRpb25TbGljZSwgSW5mQXBwZWxsYXRpb24+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5hcHBlbGxhdGlvbixcbiAgICBJbmZBcHBlbGxhdGlvbi5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mQXBwZWxsYXRpb24oaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cblxuICBwbGFjZSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZQbGFjZVNsaWNlLCBJbmZQbGFjZT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnBsYWNlLFxuICAgIEluZlBsYWNlLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZQbGFjZShpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICB0aW1lX3ByaW1pdGl2ZSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZUaW1lUHJpbWl0aXZlU2xpY2UsIEluZlRpbWVQcmltaXRpdmU+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy50aW1lX3ByaW1pdGl2ZSxcbiAgICBJbmZUaW1lUHJpbWl0aXZlLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZUaW1lUHJpbWl0aXZlKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIGxhbmd1YWdlID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZkxhbmd1YWdlU2xpY2UsIEluZkxhbmd1YWdlPihcbiAgICB0aGlzLmluZkFjdGlvbnMubGFuZ3VhZ2UsXG4gICAgSW5mTGFuZ3VhZ2UuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZkxhbmd1YWdlKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIGxhbmdfc3RyaW5nID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZkxhbmdTdHJpbmdTbGljZSwgSW5mTGFuZ1N0cmluZz4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLmxhbmdfc3RyaW5nLFxuICAgIEluZkxhbmdTdHJpbmcuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZkxhbmdTdHJpbmcoaXRlbSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5sYW5ndWFnZV0pXG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIGRpbWVuc2lvbiA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZEaW1lbnNpb25TbGljZSwgSW5mRGltZW5zaW9uPihcbiAgICB0aGlzLmluZkFjdGlvbnMuZGltZW5zaW9uLFxuICAgIEluZkRpbWVuc2lvbi5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mRGltZW5zaW9uKGl0ZW0pO1xuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuICB0ZXh0X3Byb3BlcnR5ID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlRleHRQcm9wZXJ0eVNsaWNlLCBJbmZUZXh0UHJvcGVydHk+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy50ZXh0X3Byb3BlcnR5LFxuICAgIEluZlRleHRQcm9wZXJ0eS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mVGV4dFByb3BlcnR5KGl0ZW0pO1xuICAgICAgICB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0ubGFuZ3VhZ2VdKVxuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuICBkaWdpdGFsID0gbmV3IE1vZGVsRmxhdHRlbmVyPERpZ2l0YWxTbGljZSwgRGF0RGlnaXRhbD4oXG4gICAgdGhpcy5kYXRBY3Rpb25zLmRpZ2l0YWwsXG4gICAgRGF0RGlnaXRhbC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgRGF0RGlnaXRhbChpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBjaHVuayA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxDaHVua1NsaWNlLCBEYXRDaHVuaz4oXG4gICAgdGhpcy5kYXRBY3Rpb25zLmNodW5rLFxuICAgIERhdENodW5rLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBEYXRDaHVuayhpdGVtKTtcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLm91dGdvaW5nX3N0YXRlbWVudHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgcHJvX3Byb2plY3QgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvUHJvamVjdFNsaWNlLCBQcm9Qcm9qZWN0PihcbiAgICB0aGlzLnByb0FjdGlvbnMucHJvamVjdCxcbiAgICBQcm9Qcm9qZWN0LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9Qcm9qZWN0KGl0ZW0pO1xuICAgICAgICB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0uZGVmYXVsdF9sYW5ndWFnZV0pXG4gICAgICB9KVxuICAgIH0pXG5cbiAgcHJvX3RleHRfcHJvcGVydHkgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvVGV4dFByb3BlcnR5U2xpY2UsIFByb1RleHRQcm9wZXJ0eT4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLnRleHRfcHJvcGVydHksXG4gICAgUHJvVGV4dFByb3BlcnR5LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9UZXh0UHJvcGVydHkoaXRlbSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5sYW5ndWFnZV0pXG4gICAgICB9KVxuICAgIH0pXG5cblxuICBwcm9fY2xhc3NfZmllbGRfY29uZmlnID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0NsYXNzRmllbGRDb25maWdTbGljZSwgUHJvQ2xhc3NGaWVsZENvbmZpZz4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmNsYXNzX2ZpZWxkX2NvbmZpZyxcbiAgICBQcm9DbGFzc0ZpZWxkQ29uZmlnLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9DbGFzc0ZpZWxkQ29uZmlnKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgYW5hbHlzaXMgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvQW5hbHlzaXNTbGljZSwgUHJvQW5hbHlzaXM+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5hbmFseXNpcyxcbiAgICB7IHJlbGF0aW9uczogW10gfSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7IH0pXG4gICAgfSlcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnNcbiAgKSB7IH1cbiAgZ2V0RmxhdHRlbmVkKCk6IEZsYXR0ZW5lckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb19wcm9qZWN0OiB0aGlzLnByb19wcm9qZWN0LFxuICAgICAgcHJvX3RleHRfcHJvcGVydHk6IHRoaXMucHJvX3RleHRfcHJvcGVydHksXG4gICAgICBwcm9fY2xhc3NfZmllbGRfY29uZmlnOiB0aGlzLnByb19jbGFzc19maWVsZF9jb25maWcsXG4gICAgICBwcm9fZGZoX3Byb2ZpbGVfcHJval9yZWw6IHRoaXMucHJvX2RmaF9wcm9maWxlX3Byb2pfcmVsLFxuICAgICAgcHJvX2RmaF9jbGFzc19wcm9qX3JlbDogdGhpcy5wcm9fZGZoX2NsYXNzX3Byb2pfcmVsLFxuXG4gICAgICBpbmZvX3Byb2pfcmVsOiB0aGlzLmluZm9fcHJval9yZWwsXG4gICAgICBhbmFseXNpczogdGhpcy5hbmFseXNpcyxcblxuICAgICAgcGVyc2lzdGVudF9pdGVtOiB0aGlzLnBlcnNpc3RlbnRfaXRlbSxcbiAgICAgIHRlbXBvcmFsX2VudGl0eTogdGhpcy50ZW1wb3JhbF9lbnRpdHksXG4gICAgICBzdGF0ZW1lbnQ6IHRoaXMuc3RhdGVtZW50LFxuICAgICAgYXBwZWxsYXRpb246IHRoaXMuYXBwZWxsYXRpb24sXG4gICAgICBwbGFjZTogdGhpcy5wbGFjZSxcbiAgICAgIHRpbWVfcHJpbWl0aXZlOiB0aGlzLnRpbWVfcHJpbWl0aXZlLFxuICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICB0ZXh0X3Byb3BlcnR5OiB0aGlzLnRleHRfcHJvcGVydHksXG4gICAgICBsYW5nX3N0cmluZzogdGhpcy5sYW5nX3N0cmluZyxcbiAgICAgIGRpbWVuc2lvbjogdGhpcy5kaW1lbnNpb24sXG5cbiAgICAgIGRpZ2l0YWw6IHRoaXMuZGlnaXRhbCxcbiAgICAgIGNodW5rOiB0aGlzLmNodW5rLFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc3RvcmVGbGF0dGVuZWQgPSAoZmxhdHRlbmVkOiBGbGF0dGVuZXJJbnRlcmZhY2UsIHBrPywgdHlwZT86ICdMT0FEJyB8ICdVUFNFUlQnKSA9PiB7XG4gIHZhbHVlcyhmbGF0dGVuZWQpLmZvckVhY2gobW9kZWwgPT4ge1xuICAgIGlmIChtb2RlbC5pdGVtcykge1xuICAgICAgaWYgKHR5cGUgPT09ICdVUFNFUlQnKSB7XG4gICAgICAgIG1vZGVsLmFjdGlvbnMudXBzZXJ0U3VjY2VlZGVkKG1vZGVsLml0ZW1zLCB1bmRlZmluZWQsIHBrKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kZWwuYWN0aW9ucy5sb2FkU3VjY2VlZGVkKG1vZGVsLml0ZW1zLCB1bmRlZmluZWQsIHBrKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cbiJdfQ==