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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL2ZsYXR0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBVLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQzs7OztBQVMzQyxNQUFNLGNBQWM7Ozs7OztJQUVsQixZQUNTLE9BQTZDLEVBQzdDLGVBQW9CLEVBQ3BCLFNBQW1DO1FBRm5DLFlBQU8sR0FBUCxPQUFPLENBQXNDO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFLO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQTBCO0lBQ3hDLENBQUM7Ozs7O0lBRUwsT0FBTyxDQUFDLEtBQWM7UUFDcEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O2tCQUVoQixVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRzs7OztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFDO1lBQ3BGLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsR0FBRyxDQUFDLElBQUks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STs7SUFFSiw4QkFRSTs7SUFFSixrQ0FTSTs7SUFFSiw0QkFPSTs7SUFFSiwwQkFRSTs7SUFFSixnQ0FRSTs7SUFFSixzQ0FRSTs7SUFHSiwyQ0FPSTs7SUFHSiw2QkFLSTs7SUFFRiwrQkFBNkI7O0lBQzdCLCtCQUE2Qjs7SUFDN0IsK0JBQTZCOzs7QUE4QmpDLE1BQU0sT0FBTyxjQUFjOzs7Ozs7QUFBRyxDQUFDLFNBQTZCLEVBQUUsRUFBRyxFQUFFLElBQXdCLEVBQUUsRUFBRTtJQUM3RixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTzs7OztJQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2hDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNmLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDckIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7YUFDMUQ7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7YUFDeEQ7U0FDRjtJQUNILENBQUMsRUFBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0Q2h1bmssIERhdERpZ2l0YWwsIEluZkFwcGVsbGF0aW9uLCBJbmZEaW1lbnNpb24sIEluZkxhbmdTdHJpbmcsIEluZkxhbmd1YWdlLCBJbmZQZXJzaXN0ZW50SXRlbSwgSW5mUGxhY2UsIEluZlN0YXRlbWVudCwgSW5mVGVtcG9yYWxFbnRpdHksIEluZlRleHRQcm9wZXJ0eSwgSW5mVGltZVByaW1pdGl2ZSwgUHJvQ2xhc3NGaWVsZENvbmZpZywgUHJvRGZoQ2xhc3NQcm9qUmVsLCBQcm9EZmhQcm9maWxlUHJvalJlbCwgUHJvSW5mb1Byb2pSZWwsIFByb1Byb2plY3QsIFByb1RleHRQcm9wZXJ0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiMyc7XG5pbXBvcnQgeyBQcm9BbmFseXNpcyB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBrZXlzLCBvbWl0LCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBEYXRBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9kYXQuYWN0aW9ucyc7XG5pbXBvcnQgeyBJbmZBY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9pbmYuYWN0aW9ucyc7XG5pbXBvcnQgeyBQcm9BY3Rpb25zIH0gZnJvbSAnLi4vYWN0aW9ucy9wcm8uYWN0aW9ucyc7XG5pbXBvcnQgeyBDaHVua1NsaWNlLCBEaWdpdGFsU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvZGF0Lm1vZGVscyc7XG5pbXBvcnQgeyBJbmZBcHBlbGxhdGlvblNsaWNlLCBJbmZEaW1lbnNpb25TbGljZSwgSW5mTGFuZ1N0cmluZ1NsaWNlLCBJbmZMYW5ndWFnZVNsaWNlLCBJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZQbGFjZVNsaWNlLCBJbmZUZXh0UHJvcGVydHlTbGljZSwgSW5mVGltZVByaW1pdGl2ZVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL2luZi5tb2RlbHMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXNTbGljZSwgUHJvQ2xhc3NGaWVsZENvbmZpZ1NsaWNlLCBQcm9EZmhDbGFzc1Byb2pSZWxTbGljZSwgUHJvRGZoUHJvZmlsZVByb2pSZWxTbGljZSwgUHJvSW5mb1Byb2pSZWxTbGljZSwgUHJvUHJvamVjdFNsaWNlLCBQcm9UZXh0UHJvcGVydHlTbGljZSB9IGZyb20gJy4uL21vZGVscy9wcm8ubW9kZWxzJztcbmltcG9ydCB7IFNjaGVtYUFjdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuY2xhc3MgTW9kZWxGbGF0dGVuZXI8UGF5bG9hZCwgTW9kZWw+IHtcbiAgaXRlbXM6IE1vZGVsW11cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFjdGlvbnM6IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIE1vZGVsPixcbiAgICBwdWJsaWMgbW9kZWxEZWZpbml0aW9uOiBhbnksXG4gICAgcHVibGljIGZsYXR0ZW5DYjogKGl0ZW1zOiBNb2RlbFtdKSA9PiB2b2lkLFxuICApIHsgfVxuXG4gIGZsYXR0ZW4oaXRlbXM6IE1vZGVsW10pIHtcbiAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuXG4gICAgICB0aGlzLmZsYXR0ZW5DYihpdGVtcyk7XG4gICAgICAvLyB0b2RvIHJlbW92ZSBwcm9wZXJ0aWVzIG9mIHRob3NlIG9iamVjdHMsIHVzaW5nIGdldE1vZGVsRGVmaW5pdGlvbigpXG4gICAgICBjb25zdCBrZXlzVG9PbWl0ID0ga2V5cyh0aGlzLm1vZGVsRGVmaW5pdGlvbi5yZWxhdGlvbnMpLm1hcChpdGVtID0+IGl0ZW0udG9TdHJpbmcoKSlcbiAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgIC4uLih0aGlzLml0ZW1zIHx8IFtdKSxcbiAgICAgICAgLi4uaXRlbXMuZmlsdGVyKGl0ZW0gPT4gISFpdGVtICYmIE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA+IDApXG4gICAgICAgICAgLm1hcChpdGVtID0+IG9taXQoa2V5c1RvT21pdCwgaXRlbSkpIGFzIE1vZGVsW11cbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxufVxuXG5pbnRlcmZhY2UgRmxhdHRlbmVySW50ZXJmYWNlIHtcbiAgW2tleTogc3RyaW5nXTogTW9kZWxGbGF0dGVuZXI8YW55LCBhbnk+XG59XG5cbi8qKlxuICogRmxhdHRlbmVyIGlzIHRoZSBjbGFzcyB1c2VkIHRvIGZsYXR0ZW4gbmVzdGVkIG9iamVjdHMuXG4gKiBVc2Ugc3RvcmVGbGF0dGVuZWQoKSB0byBjYWxsIGFsbCBhY3Rpb25zIHRvIHB1dCB0aGVcbiAqIGZsYXR0ZW5lZCBpdGVtcyBpbnRvIHRoZSBzdG9yZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZsYXR0ZW5lciB7XG5cblxuXG4gIGluZm9fcHJval9yZWwgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvSW5mb1Byb2pSZWxTbGljZSwgUHJvSW5mb1Byb2pSZWw+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5pbmZvX3Byb2pfcmVsLFxuICAgIFByb0luZm9Qcm9qUmVsLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9JbmZvUHJvalJlbChpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBwcm9fZGZoX2NsYXNzX3Byb2pfcmVsID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0RmaENsYXNzUHJvalJlbFNsaWNlLCBQcm9EZmhDbGFzc1Byb2pSZWw+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5kZmhfY2xhc3NfcHJval9yZWwsXG4gICAgUHJvRGZoQ2xhc3NQcm9qUmVsLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9EZmhDbGFzc1Byb2pSZWwoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgcHJvX2RmaF9wcm9maWxlX3Byb2pfcmVsID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0RmaFByb2ZpbGVQcm9qUmVsU2xpY2UsIFByb0RmaFByb2ZpbGVQcm9qUmVsPihcbiAgICB0aGlzLnByb0FjdGlvbnMuZGZoX3Byb2ZpbGVfcHJval9yZWwsXG4gICAgUHJvRGZoUHJvZmlsZVByb2pSZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb0RmaFByb2ZpbGVQcm9qUmVsKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgcGVyc2lzdGVudF9pdGVtID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlBlcnNpc3RlbnRJdGVtPihcbiAgICB0aGlzLmluZkFjdGlvbnMucGVyc2lzdGVudF9pdGVtLFxuICAgIEluZlBlcnNpc3RlbnRJdGVtLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZQZXJzaXN0ZW50SXRlbShpdGVtKTtcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLmluY29taW5nX3N0YXRlbWVudHMpXG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5vdXRnb2luZ19zdGF0ZW1lbnRzKVxuICAgICAgICB0aGlzLnRleHRfcHJvcGVydHkuZmxhdHRlbihpdGVtLnRleHRfcHJvcGVydGllcylcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgdGVtcG9yYWxfZW50aXR5ID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlRlbXBvcmFsRW50aXR5PihcbiAgICB0aGlzLmluZkFjdGlvbnMudGVtcG9yYWxfZW50aXR5LFxuICAgIEluZlRlbXBvcmFsRW50aXR5LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZUZW1wb3JhbEVudGl0eShpdGVtKTtcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLm91dGdvaW5nX3N0YXRlbWVudHMpXG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5pbmNvbWluZ19zdGF0ZW1lbnRzKVxuICAgICAgICB0aGlzLnRleHRfcHJvcGVydHkuZmxhdHRlbihpdGVtLnRleHRfcHJvcGVydGllcylcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cblxuICBzdGF0ZW1lbnQgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mU3RhdGVtZW50PihcbiAgICB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LFxuICAgIEluZlN0YXRlbWVudC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mU3RhdGVtZW50KGl0ZW0pO1xuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcblxuICAgICAgICAvLyBTdWJqZWN0XG4gICAgICAgIGlmIChpdGVtLnN1YmplY3RfdGVtcG9yYWxfZW50aXR5KSB0aGlzLnRlbXBvcmFsX2VudGl0eS5mbGF0dGVuKFtpdGVtLnN1YmplY3RfdGVtcG9yYWxfZW50aXR5XSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5zdWJqZWN0X3N0YXRlbWVudCkgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihbaXRlbS5zdWJqZWN0X3N0YXRlbWVudF0pXG5cbiAgICAgICAgLy8gT2JqZWN0XG4gICAgICAgIGlmIChpdGVtLm9iamVjdF9wZXJzaXN0ZW50X2l0ZW0pIHRoaXMucGVyc2lzdGVudF9pdGVtLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X3BlcnNpc3RlbnRfaXRlbV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X2FwcGVsbGF0aW9uKSB0aGlzLmFwcGVsbGF0aW9uLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X2FwcGVsbGF0aW9uXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfcGxhY2UpIHRoaXMucGxhY2UuZmxhdHRlbihbaXRlbS5vYmplY3RfcGxhY2VdKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF90aW1lX3ByaW1pdGl2ZSkgdGhpcy50aW1lX3ByaW1pdGl2ZS5mbGF0dGVuKFtpdGVtLm9iamVjdF90aW1lX3ByaW1pdGl2ZV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X2xhbmd1YWdlKSB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X2xhbmd1YWdlXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5zdWJqZWN0X2NodW5rKSB0aGlzLmNodW5rLmZsYXR0ZW4oW2l0ZW0uc3ViamVjdF9jaHVua10pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X2xhbmdfc3RyaW5nKSB0aGlzLmxhbmdfc3RyaW5nLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X2xhbmdfc3RyaW5nXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfZGltZW5zaW9uKSB0aGlzLmRpbWVuc2lvbi5mbGF0dGVuKFtpdGVtLm9iamVjdF9kaW1lbnNpb25dKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIGFwcGVsbGF0aW9uID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZkFwcGVsbGF0aW9uU2xpY2UsIEluZkFwcGVsbGF0aW9uPihcbiAgICB0aGlzLmluZkFjdGlvbnMuYXBwZWxsYXRpb24sXG4gICAgSW5mQXBwZWxsYXRpb24uZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZkFwcGVsbGF0aW9uKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgcGxhY2UgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mUGxhY2VTbGljZSwgSW5mUGxhY2U+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5wbGFjZSxcbiAgICBJbmZQbGFjZS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mUGxhY2UoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgdGltZV9wcmltaXRpdmUgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mVGltZVByaW1pdGl2ZVNsaWNlLCBJbmZUaW1lUHJpbWl0aXZlPihcbiAgICB0aGlzLmluZkFjdGlvbnMudGltZV9wcmltaXRpdmUsXG4gICAgSW5mVGltZVByaW1pdGl2ZS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mVGltZVByaW1pdGl2ZShpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBsYW5ndWFnZSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZMYW5ndWFnZVNsaWNlLCBJbmZMYW5ndWFnZT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLmxhbmd1YWdlLFxuICAgIEluZkxhbmd1YWdlLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZMYW5ndWFnZShpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBsYW5nX3N0cmluZyA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZMYW5nU3RyaW5nU2xpY2UsIEluZkxhbmdTdHJpbmc+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5sYW5nX3N0cmluZyxcbiAgICBJbmZMYW5nU3RyaW5nLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZMYW5nU3RyaW5nKGl0ZW0pO1xuICAgICAgICB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0ubGFuZ3VhZ2VdKVxuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuICBkaW1lbnNpb24gPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mRGltZW5zaW9uU2xpY2UsIEluZkRpbWVuc2lvbj4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLmRpbWVuc2lvbixcbiAgICBJbmZEaW1lbnNpb24uZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZkRpbWVuc2lvbihpdGVtKTtcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgdGV4dF9wcm9wZXJ0eSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZUZXh0UHJvcGVydHlTbGljZSwgSW5mVGV4dFByb3BlcnR5PihcbiAgICB0aGlzLmluZkFjdGlvbnMudGV4dF9wcm9wZXJ0eSxcbiAgICBJbmZUZXh0UHJvcGVydHkuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlRleHRQcm9wZXJ0eShpdGVtKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLmxhbmd1YWdlXSlcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgZGlnaXRhbCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxEaWdpdGFsU2xpY2UsIERhdERpZ2l0YWw+KFxuICAgIHRoaXMuZGF0QWN0aW9ucy5kaWdpdGFsLFxuICAgIERhdERpZ2l0YWwuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IERhdERpZ2l0YWwoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgY2h1bmsgPSBuZXcgTW9kZWxGbGF0dGVuZXI8Q2h1bmtTbGljZSwgRGF0Q2h1bms+KFxuICAgIHRoaXMuZGF0QWN0aW9ucy5jaHVuayxcbiAgICBEYXRDaHVuay5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgRGF0Q2h1bmsoaXRlbSk7XG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5vdXRnb2luZ19zdGF0ZW1lbnRzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIHByb19wcm9qZWN0ID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb1Byb2plY3RTbGljZSwgUHJvUHJvamVjdD4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLnByb2plY3QsXG4gICAgUHJvUHJvamVjdC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvUHJvamVjdChpdGVtKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLmRlZmF1bHRfbGFuZ3VhZ2VdKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIHByb190ZXh0X3Byb3BlcnR5ID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb1RleHRQcm9wZXJ0eVNsaWNlLCBQcm9UZXh0UHJvcGVydHk+KFxuICAgIHRoaXMucHJvQWN0aW9ucy50ZXh0X3Byb3BlcnR5LFxuICAgIFByb1RleHRQcm9wZXJ0eS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvVGV4dFByb3BlcnR5KGl0ZW0pO1xuICAgICAgICB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0ubGFuZ3VhZ2VdKVxuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgcHJvX2NsYXNzX2ZpZWxkX2NvbmZpZyA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9DbGFzc0ZpZWxkQ29uZmlnU2xpY2UsIFByb0NsYXNzRmllbGRDb25maWc+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5jbGFzc19maWVsZF9jb25maWcsXG4gICAgUHJvQ2xhc3NGaWVsZENvbmZpZy5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvQ2xhc3NGaWVsZENvbmZpZyhpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIGFuYWx5c2lzID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0FuYWx5c2lzU2xpY2UsIFByb0FuYWx5c2lzPihcbiAgICB0aGlzLnByb0FjdGlvbnMuYW5hbHlzaXMsXG4gICAgeyByZWxhdGlvbnM6IFtdIH0sXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4geyB9KVxuICAgIH0pXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHB1YmxpYyBkYXRBY3Rpb25zOiBEYXRBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zXG4gICkgeyB9XG4gIGdldEZsYXR0ZW5lZCgpOiBGbGF0dGVuZXJJbnRlcmZhY2Uge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9fcHJvamVjdDogdGhpcy5wcm9fcHJvamVjdCxcbiAgICAgIHByb190ZXh0X3Byb3BlcnR5OiB0aGlzLnByb190ZXh0X3Byb3BlcnR5LFxuICAgICAgcHJvX2NsYXNzX2ZpZWxkX2NvbmZpZzogdGhpcy5wcm9fY2xhc3NfZmllbGRfY29uZmlnLFxuICAgICAgcHJvX2RmaF9wcm9maWxlX3Byb2pfcmVsOiB0aGlzLnByb19kZmhfcHJvZmlsZV9wcm9qX3JlbCxcbiAgICAgIHByb19kZmhfY2xhc3NfcHJval9yZWw6IHRoaXMucHJvX2RmaF9jbGFzc19wcm9qX3JlbCxcblxuICAgICAgaW5mb19wcm9qX3JlbDogdGhpcy5pbmZvX3Byb2pfcmVsLFxuICAgICAgYW5hbHlzaXM6IHRoaXMuYW5hbHlzaXMsXG5cbiAgICAgIHBlcnNpc3RlbnRfaXRlbTogdGhpcy5wZXJzaXN0ZW50X2l0ZW0sXG4gICAgICB0ZW1wb3JhbF9lbnRpdHk6IHRoaXMudGVtcG9yYWxfZW50aXR5LFxuICAgICAgc3RhdGVtZW50OiB0aGlzLnN0YXRlbWVudCxcbiAgICAgIGFwcGVsbGF0aW9uOiB0aGlzLmFwcGVsbGF0aW9uLFxuICAgICAgcGxhY2U6IHRoaXMucGxhY2UsXG4gICAgICB0aW1lX3ByaW1pdGl2ZTogdGhpcy50aW1lX3ByaW1pdGl2ZSxcbiAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgdGV4dF9wcm9wZXJ0eTogdGhpcy50ZXh0X3Byb3BlcnR5LFxuICAgICAgbGFuZ19zdHJpbmc6IHRoaXMubGFuZ19zdHJpbmcsXG4gICAgICBkaW1lbnNpb246IHRoaXMuZGltZW5zaW9uLFxuXG4gICAgICBkaWdpdGFsOiB0aGlzLmRpZ2l0YWwsXG4gICAgICBjaHVuazogdGhpcy5jaHVuayxcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlRmxhdHRlbmVkID0gKGZsYXR0ZW5lZDogRmxhdHRlbmVySW50ZXJmYWNlLCBwaz8sIHR5cGU/OiAnTE9BRCcgfCAnVVBTRVJUJykgPT4ge1xuICB2YWx1ZXMoZmxhdHRlbmVkKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICBpZiAobW9kZWwuaXRlbXMpIHtcbiAgICAgIGlmICh0eXBlID09PSAnVVBTRVJUJykge1xuICAgICAgICBtb2RlbC5hY3Rpb25zLnVwc2VydFN1Y2NlZWRlZChtb2RlbC5pdGVtcywgdW5kZWZpbmVkLCBwaylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZGVsLmFjdGlvbnMubG9hZFN1Y2NlZWRlZChtb2RlbC5pdGVtcywgdW5kZWZpbmVkLCBwaylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG4iXX0=