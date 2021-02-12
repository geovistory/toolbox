/**
 * @fileoverview added by tsickle
 * Generated from: lib/redux-store/state-schema/_helpers/flattener.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DatChunk, DatDigital, InfAppellation, InfDimension, InfLangString, InfLanguage, InfPersistentItem, InfPlace, InfStatement, InfTemporalEntity, InfTextProperty, InfTimePrimitive, ProClassFieldConfig, ProDfhClassProjRel, ProDfhProfileProjRel, ProInfoProjRel, ProProject, ProTextProperty } from '@kleiolab/lib-sdk-lb3';
import { keys, omit, values } from 'ramda';
/**
 * @template Payload, Model
 */
var /**
 * @template Payload, Model
 */
ModelFlattener = /** @class */ (function () {
    function ModelFlattener(actions, modelDefinition, flattenCb) {
        this.actions = actions;
        this.modelDefinition = modelDefinition;
        this.flattenCb = flattenCb;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    ModelFlattener.prototype.flatten = /**
     * @param {?} items
     * @return {?}
     */
    function (items) {
        if (items && items.length > 0) {
            this.flattenCb(items);
            // todo remove properties of those objects, using getModelDefinition()
            /** @type {?} */
            var keysToOmit_1 = keys(this.modelDefinition.relations).map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.toString(); }));
            this.items = tslib_1.__spread((this.items || []), (/** @type {?} */ (items.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return !!item && Object.keys(item).length > 0; }))
                .map((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return omit(keysToOmit_1, item); })))));
        }
        return true;
    };
    return ModelFlattener;
}());
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
var /**
 * Flattener is the class used to flatten nested objects.
 * Use storeFlattened() to call all actions to put the
 * flattened items into the store.
 */
Flattener = /** @class */ (function () {
    function Flattener(infActions, datActions, proActions) {
        var _this = this;
        this.infActions = infActions;
        this.datActions = datActions;
        this.proActions = proActions;
        this.info_proj_rel = new ModelFlattener(this.proActions.info_proj_rel, ProInfoProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProInfoProjRel(item);
            }));
        }));
        this.pro_dfh_class_proj_rel = new ModelFlattener(this.proActions.dfh_class_proj_rel, ProDfhClassProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProDfhClassProjRel(item);
            }));
        }));
        this.pro_dfh_profile_proj_rel = new ModelFlattener(this.proActions.dfh_profile_proj_rel, ProDfhProfileProjRel.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProDfhProfileProjRel(item);
            }));
        }));
        this.persistent_item = new ModelFlattener(this.infActions.persistent_item, InfPersistentItem.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfPersistentItem(item);
                _this.statement.flatten(item.incoming_statements);
                _this.statement.flatten(item.outgoing_statements);
                _this.text_property.flatten(item.text_properties);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.temporal_entity = new ModelFlattener(this.infActions.temporal_entity, InfTemporalEntity.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfTemporalEntity(item);
                _this.statement.flatten(item.outgoing_statements);
                _this.statement.flatten(item.incoming_statements);
                _this.text_property.flatten(item.text_properties);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.statement = new ModelFlattener(this.infActions.statement, InfStatement.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfStatement(item);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
                // Subject
                if (item.subject_temporal_entity)
                    _this.temporal_entity.flatten([item.subject_temporal_entity]);
                else if (item.subject_statement)
                    _this.statement.flatten([item.subject_statement]);
                // Object
                if (item.object_persistent_item)
                    _this.persistent_item.flatten([item.object_persistent_item]);
                else if (item.object_appellation)
                    _this.appellation.flatten([item.object_appellation]);
                else if (item.object_place)
                    _this.place.flatten([item.object_place]);
                else if (item.object_time_primitive)
                    _this.time_primitive.flatten([item.object_time_primitive]);
                else if (item.object_language)
                    _this.language.flatten([item.object_language]);
                else if (item.subject_chunk)
                    _this.chunk.flatten([item.subject_chunk]);
                else if (item.object_lang_string)
                    _this.lang_string.flatten([item.object_lang_string]);
                else if (item.object_dimension)
                    _this.dimension.flatten([item.object_dimension]);
            }));
        }));
        this.appellation = new ModelFlattener(this.infActions.appellation, InfAppellation.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfAppellation(item);
            }));
        }));
        this.place = new ModelFlattener(this.infActions.place, InfPlace.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfPlace(item);
            }));
        }));
        this.time_primitive = new ModelFlattener(this.infActions.time_primitive, InfTimePrimitive.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfTimePrimitive(item);
            }));
        }));
        this.language = new ModelFlattener(this.infActions.language, InfLanguage.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfLanguage(item);
            }));
        }));
        this.lang_string = new ModelFlattener(this.infActions.lang_string, InfLangString.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfLangString(item);
                _this.language.flatten([item.language]);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.dimension = new ModelFlattener(this.infActions.dimension, InfDimension.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfDimension(item);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.text_property = new ModelFlattener(this.infActions.text_property, InfTextProperty.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new InfTextProperty(item);
                _this.language.flatten([item.language]);
                _this.info_proj_rel.flatten(item.entity_version_project_rels);
            }));
        }));
        this.digital = new ModelFlattener(this.datActions.digital, DatDigital.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new DatDigital(item);
            }));
        }));
        this.chunk = new ModelFlattener(this.datActions.chunk, DatChunk.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new DatChunk(item);
                _this.statement.flatten(item.outgoing_statements);
            }));
        }));
        this.pro_project = new ModelFlattener(this.proActions.project, ProProject.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProProject(item);
                _this.language.flatten([item.default_language]);
            }));
        }));
        this.pro_text_property = new ModelFlattener(this.proActions.text_property, ProTextProperty.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProTextProperty(item);
                _this.language.flatten([item.language]);
            }));
        }));
        this.pro_class_field_config = new ModelFlattener(this.proActions.class_field_config, ProClassFieldConfig.getModelDefinition(), (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                item = new ProClassFieldConfig(item);
            }));
        }));
        this.analysis = new ModelFlattener(this.proActions.analysis, { relations: [] }, (/**
         * @param {?} items
         * @return {?}
         */
        function (items) {
            items.forEach((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { }));
        }));
    }
    /**
     * @return {?}
     */
    Flattener.prototype.getFlattened = /**
     * @return {?}
     */
    function () {
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
    };
    return Flattener;
}());
/**
 * Flattener is the class used to flatten nested objects.
 * Use storeFlattened() to call all actions to put the
 * flattened items into the store.
 */
export { Flattener };
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
export var storeFlattened = (/**
 * @param {?} flattened
 * @param {?=} pk
 * @param {?=} type
 * @return {?}
 */
function (flattened, pk, type) {
    values(flattened).forEach((/**
     * @param {?} model
     * @return {?}
     */
    function (model) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvZmxhdHRlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBVLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQzs7OztBQUszQzs7OztJQUVFLHdCQUNTLE9BQTZDLEVBQzdDLGVBQW9CLEVBQ3BCLFNBQW1DO1FBRm5DLFlBQU8sR0FBUCxPQUFPLENBQXNDO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFLO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQTBCO0lBQ3hDLENBQUM7Ozs7O0lBRUwsZ0NBQU87Ozs7SUFBUCxVQUFRLEtBQWM7UUFDcEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O2dCQUVoQixZQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFmLENBQWUsRUFBQztZQUNwRixJQUFJLENBQUMsS0FBSyxvQkFDTCxDQUFDLElBQUksQ0FBQyxL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RixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTzs7OztJQUFDLFVBQUEsS0FBSztRQUM3QixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFBO2FBQzFEO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFBO2FBQ3hEO1NBQ0Y7SUFDSCxDQUFDLEVBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdENodW5rLCBEYXREaWdpdGFsLCBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZTdGF0ZW1lbnQsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUsIFByb0NsYXNzRmllbGRDb25maWcsIFByb0RmaENsYXNzUHJvalJlbCwgUHJvRGZoUHJvZmlsZVByb2pSZWwsIFByb0luZm9Qcm9qUmVsLCBQcm9Qcm9qZWN0LCBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsga2V5cywgb21pdCwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgRGF0QWN0aW9ucywgSW5mQWN0aW9ucywgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgQ2h1bmtTbGljZSwgRGlnaXRhbFNsaWNlLCBJbmZBcHBlbGxhdGlvblNsaWNlLCBJbmZEaW1lbnNpb25TbGljZSwgSW5mTGFuZ1N0cmluZ1NsaWNlLCBJbmZMYW5ndWFnZVNsaWNlLCBJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZQbGFjZVNsaWNlLCBJbmZUZXh0UHJvcGVydHlTbGljZSwgSW5mVGltZVByaW1pdGl2ZVNsaWNlLCBQcm9BbmFseXNpc1NsaWNlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnU2xpY2UsIFByb0RmaENsYXNzUHJvalJlbFNsaWNlLCBQcm9EZmhQcm9maWxlUHJvalJlbFNsaWNlLCBQcm9JbmZvUHJvalJlbFNsaWNlLCBQcm9Qcm9qZWN0U2xpY2UsIFByb1RleHRQcm9wZXJ0eVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzJztcbmltcG9ydCB7IFNjaGVtYUFjdGlvbnNGYWN0b3J5IH0gZnJvbSAnLi9zY2hlbWEtYWN0aW9ucy1mYWN0b3J5JztcblxuY2xhc3MgTW9kZWxGbGF0dGVuZXI8UGF5bG9hZCwgTW9kZWw+IHtcbiAgaXRlbXM6IE1vZGVsW11cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGFjdGlvbnM6IFNjaGVtYUFjdGlvbnNGYWN0b3J5PFBheWxvYWQsIE1vZGVsPixcbiAgICBwdWJsaWMgbW9kZWxEZWZpbml0aW9uOiBhbnksXG4gICAgcHVibGljIGZsYXR0ZW5DYjogKGl0ZW1zOiBNb2RlbFtdKSA9PiB2b2lkLFxuICApIHsgfVxuXG4gIGZsYXR0ZW4oaXRlbXM6IE1vZGVsW10pIHtcbiAgICBpZiAoaXRlbXMgJiYgaXRlbXMubGVuZ3RoID4gMCkge1xuXG4gICAgICB0aGlzLmZsYXR0ZW5DYihpdGVtcyk7XG4gICAgICAvLyB0b2RvIHJlbW92ZSBwcm9wZXJ0aWVzIG9mIHRob3NlIG9iamVjdHMsIHVzaW5nIGdldE1vZGVsRGVmaW5pdGlvbigpXG4gICAgICBjb25zdCBrZXlzVG9PbWl0ID0ga2V5cyh0aGlzLm1vZGVsRGVmaW5pdGlvbi5yZWxhdGlvbnMpLm1hcChpdGVtID0+IGl0ZW0udG9TdHJpbmcoKSlcbiAgICAgIHRoaXMuaXRlbXMgPSBbXG4gICAgICAgIC4uLih0aGlzLml0ZW1zIHx8IFtdKSxcbiAgICAgICAgLi4uaXRlbXMuZmlsdGVyKGl0ZW0gPT4gISFpdGVtICYmIE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA+IDApXG4gICAgICAgICAgLm1hcChpdGVtID0+IG9taXQoa2V5c1RvT21pdCwgaXRlbSkpIGFzIE1vZGVsW11cbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxufVxuXG5pbnRlcmZhY2UgRmxhdHRlbmVySW50ZXJmYWNlIHtcbiAgW2tleTogc3RyaW5nXTogTW9kZWxGbGF0dGVuZXI8YW55LCBhbnk+XG59XG5cbi8qKlxuICogRmxhdHRlbmVyIGlzIHRoZSBjbGFzcyB1c2VkIHRvIGZsYXR0ZW4gbmVzdGVkIG9iamVjdHMuXG4gKiBVc2Ugc3RvcmVGbGF0dGVuZWQoKSB0byBjYWxsIGFsbCBhY3Rpb25zIHRvIHB1dCB0aGVcbiAqIGZsYXR0ZW5lZCBpdGVtcyBpbnRvIHRoZSBzdG9yZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZsYXR0ZW5lciB7XG5cblxuXG4gIGluZm9fcHJval9yZWwgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvSW5mb1Byb2pSZWxTbGljZSwgUHJvSW5mb1Byb2pSZWw+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5pbmZvX3Byb2pfcmVsLFxuICAgIFByb0luZm9Qcm9qUmVsLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9JbmZvUHJvalJlbChpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBwcm9fZGZoX2NsYXNzX3Byb2pfcmVsID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0RmaENsYXNzUHJvalJlbFNsaWNlLCBQcm9EZmhDbGFzc1Byb2pSZWw+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5kZmhfY2xhc3NfcHJval9yZWwsXG4gICAgUHJvRGZoQ2xhc3NQcm9qUmVsLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9EZmhDbGFzc1Byb2pSZWwoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgcHJvX2RmaF9wcm9maWxlX3Byb2pfcmVsID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0RmaFByb2ZpbGVQcm9qUmVsU2xpY2UsIFByb0RmaFByb2ZpbGVQcm9qUmVsPihcbiAgICB0aGlzLnByb0FjdGlvbnMuZGZoX3Byb2ZpbGVfcHJval9yZWwsXG4gICAgUHJvRGZoUHJvZmlsZVByb2pSZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb0RmaFByb2ZpbGVQcm9qUmVsKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgcGVyc2lzdGVudF9pdGVtID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlBlcnNpc3RlbnRJdGVtPihcbiAgICB0aGlzLmluZkFjdGlvbnMucGVyc2lzdGVudF9pdGVtLFxuICAgIEluZlBlcnNpc3RlbnRJdGVtLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZQZXJzaXN0ZW50SXRlbShpdGVtKTtcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLmluY29taW5nX3N0YXRlbWVudHMpXG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5vdXRnb2luZ19zdGF0ZW1lbnRzKVxuICAgICAgICB0aGlzLnRleHRfcHJvcGVydHkuZmxhdHRlbihpdGVtLnRleHRfcHJvcGVydGllcylcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgdGVtcG9yYWxfZW50aXR5ID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlRlbXBvcmFsRW50aXR5PihcbiAgICB0aGlzLmluZkFjdGlvbnMudGVtcG9yYWxfZW50aXR5LFxuICAgIEluZlRlbXBvcmFsRW50aXR5LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZUZW1wb3JhbEVudGl0eShpdGVtKTtcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLm91dGdvaW5nX3N0YXRlbWVudHMpXG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5pbmNvbWluZ19zdGF0ZW1lbnRzKVxuICAgICAgICB0aGlzLnRleHRfcHJvcGVydHkuZmxhdHRlbihpdGVtLnRleHRfcHJvcGVydGllcylcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cblxuICBzdGF0ZW1lbnQgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mU3RhdGVtZW50PihcbiAgICB0aGlzLmluZkFjdGlvbnMuc3RhdGVtZW50LFxuICAgIEluZlN0YXRlbWVudC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mU3RhdGVtZW50KGl0ZW0pO1xuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcblxuICAgICAgICAvLyBTdWJqZWN0XG4gICAgICAgIGlmIChpdGVtLnN1YmplY3RfdGVtcG9yYWxfZW50aXR5KSB0aGlzLnRlbXBvcmFsX2VudGl0eS5mbGF0dGVuKFtpdGVtLnN1YmplY3RfdGVtcG9yYWxfZW50aXR5XSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5zdWJqZWN0X3N0YXRlbWVudCkgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihbaXRlbS5zdWJqZWN0X3N0YXRlbWVudF0pXG5cbiAgICAgICAgLy8gT2JqZWN0XG4gICAgICAgIGlmIChpdGVtLm9iamVjdF9wZXJzaXN0ZW50X2l0ZW0pIHRoaXMucGVyc2lzdGVudF9pdGVtLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X3BlcnNpc3RlbnRfaXRlbV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X2FwcGVsbGF0aW9uKSB0aGlzLmFwcGVsbGF0aW9uLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X2FwcGVsbGF0aW9uXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfcGxhY2UpIHRoaXMucGxhY2UuZmxhdHRlbihbaXRlbS5vYmplY3RfcGxhY2VdKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF90aW1lX3ByaW1pdGl2ZSkgdGhpcy50aW1lX3ByaW1pdGl2ZS5mbGF0dGVuKFtpdGVtLm9iamVjdF90aW1lX3ByaW1pdGl2ZV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X2xhbmd1YWdlKSB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X2xhbmd1YWdlXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5zdWJqZWN0X2NodW5rKSB0aGlzLmNodW5rLmZsYXR0ZW4oW2l0ZW0uc3ViamVjdF9jaHVua10pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X2xhbmdfc3RyaW5nKSB0aGlzLmxhbmdfc3RyaW5nLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X2xhbmdfc3RyaW5nXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfZGltZW5zaW9uKSB0aGlzLmRpbWVuc2lvbi5mbGF0dGVuKFtpdGVtLm9iamVjdF9kaW1lbnNpb25dKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIGFwcGVsbGF0aW9uID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZkFwcGVsbGF0aW9uU2xpY2UsIEluZkFwcGVsbGF0aW9uPihcbiAgICB0aGlzLmluZkFjdGlvbnMuYXBwZWxsYXRpb24sXG4gICAgSW5mQXBwZWxsYXRpb24uZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZkFwcGVsbGF0aW9uKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgcGxhY2UgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mUGxhY2VTbGljZSwgSW5mUGxhY2U+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5wbGFjZSxcbiAgICBJbmZQbGFjZS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mUGxhY2UoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgdGltZV9wcmltaXRpdmUgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mVGltZVByaW1pdGl2ZVNsaWNlLCBJbmZUaW1lUHJpbWl0aXZlPihcbiAgICB0aGlzLmluZkFjdGlvbnMudGltZV9wcmltaXRpdmUsXG4gICAgSW5mVGltZVByaW1pdGl2ZS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mVGltZVByaW1pdGl2ZShpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBsYW5ndWFnZSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZMYW5ndWFnZVNsaWNlLCBJbmZMYW5ndWFnZT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLmxhbmd1YWdlLFxuICAgIEluZkxhbmd1YWdlLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZMYW5ndWFnZShpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBsYW5nX3N0cmluZyA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZMYW5nU3RyaW5nU2xpY2UsIEluZkxhbmdTdHJpbmc+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5sYW5nX3N0cmluZyxcbiAgICBJbmZMYW5nU3RyaW5nLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZMYW5nU3RyaW5nKGl0ZW0pO1xuICAgICAgICB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0ubGFuZ3VhZ2VdKVxuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuICBkaW1lbnNpb24gPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mRGltZW5zaW9uU2xpY2UsIEluZkRpbWVuc2lvbj4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLmRpbWVuc2lvbixcbiAgICBJbmZEaW1lbnNpb24uZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZkRpbWVuc2lvbihpdGVtKTtcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgdGV4dF9wcm9wZXJ0eSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZUZXh0UHJvcGVydHlTbGljZSwgSW5mVGV4dFByb3BlcnR5PihcbiAgICB0aGlzLmluZkFjdGlvbnMudGV4dF9wcm9wZXJ0eSxcbiAgICBJbmZUZXh0UHJvcGVydHkuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlRleHRQcm9wZXJ0eShpdGVtKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLmxhbmd1YWdlXSlcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgZGlnaXRhbCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxEaWdpdGFsU2xpY2UsIERhdERpZ2l0YWw+KFxuICAgIHRoaXMuZGF0QWN0aW9ucy5kaWdpdGFsLFxuICAgIERhdERpZ2l0YWwuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IERhdERpZ2l0YWwoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgY2h1bmsgPSBuZXcgTW9kZWxGbGF0dGVuZXI8Q2h1bmtTbGljZSwgRGF0Q2h1bms+KFxuICAgIHRoaXMuZGF0QWN0aW9ucy5jaHVuayxcbiAgICBEYXRDaHVuay5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgRGF0Q2h1bmsoaXRlbSk7XG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5vdXRnb2luZ19zdGF0ZW1lbnRzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIHByb19wcm9qZWN0ID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb1Byb2plY3RTbGljZSwgUHJvUHJvamVjdD4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLnByb2plY3QsXG4gICAgUHJvUHJvamVjdC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvUHJvamVjdChpdGVtKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLmRlZmF1bHRfbGFuZ3VhZ2VdKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIHByb190ZXh0X3Byb3BlcnR5ID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb1RleHRQcm9wZXJ0eVNsaWNlLCBQcm9UZXh0UHJvcGVydHk+KFxuICAgIHRoaXMucHJvQWN0aW9ucy50ZXh0X3Byb3BlcnR5LFxuICAgIFByb1RleHRQcm9wZXJ0eS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvVGV4dFByb3BlcnR5KGl0ZW0pO1xuICAgICAgICB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0ubGFuZ3VhZ2VdKVxuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgcHJvX2NsYXNzX2ZpZWxkX2NvbmZpZyA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9DbGFzc0ZpZWxkQ29uZmlnU2xpY2UsIFByb0NsYXNzRmllbGRDb25maWc+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5jbGFzc19maWVsZF9jb25maWcsXG4gICAgUHJvQ2xhc3NGaWVsZENvbmZpZy5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvQ2xhc3NGaWVsZENvbmZpZyhpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIGFuYWx5c2lzID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0FuYWx5c2lzU2xpY2UsIFByb0FuYWx5c2lzPihcbiAgICB0aGlzLnByb0FjdGlvbnMuYW5hbHlzaXMsXG4gICAgeyByZWxhdGlvbnM6IFtdIH0sXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4geyB9KVxuICAgIH0pXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBpbmZBY3Rpb25zOiBJbmZBY3Rpb25zLFxuICAgIHB1YmxpYyBkYXRBY3Rpb25zOiBEYXRBY3Rpb25zLFxuICAgIHB1YmxpYyBwcm9BY3Rpb25zOiBQcm9BY3Rpb25zXG4gICkgeyB9XG4gIGdldEZsYXR0ZW5lZCgpOiBGbGF0dGVuZXJJbnRlcmZhY2Uge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9fcHJvamVjdDogdGhpcy5wcm9fcHJvamVjdCxcbiAgICAgIHByb190ZXh0X3Byb3BlcnR5OiB0aGlzLnByb190ZXh0X3Byb3BlcnR5LFxuICAgICAgcHJvX2NsYXNzX2ZpZWxkX2NvbmZpZzogdGhpcy5wcm9fY2xhc3NfZmllbGRfY29uZmlnLFxuICAgICAgcHJvX2RmaF9wcm9maWxlX3Byb2pfcmVsOiB0aGlzLnByb19kZmhfcHJvZmlsZV9wcm9qX3JlbCxcbiAgICAgIHByb19kZmhfY2xhc3NfcHJval9yZWw6IHRoaXMucHJvX2RmaF9jbGFzc19wcm9qX3JlbCxcblxuICAgICAgaW5mb19wcm9qX3JlbDogdGhpcy5pbmZvX3Byb2pfcmVsLFxuICAgICAgYW5hbHlzaXM6IHRoaXMuYW5hbHlzaXMsXG5cbiAgICAgIHBlcnNpc3RlbnRfaXRlbTogdGhpcy5wZXJzaXN0ZW50X2l0ZW0sXG4gICAgICB0ZW1wb3JhbF9lbnRpdHk6IHRoaXMudGVtcG9yYWxfZW50aXR5LFxuICAgICAgc3RhdGVtZW50OiB0aGlzLnN0YXRlbWVudCxcbiAgICAgIGFwcGVsbGF0aW9uOiB0aGlzLmFwcGVsbGF0aW9uLFxuICAgICAgcGxhY2U6IHRoaXMucGxhY2UsXG4gICAgICB0aW1lX3ByaW1pdGl2ZTogdGhpcy50aW1lX3ByaW1pdGl2ZSxcbiAgICAgIGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxuICAgICAgdGV4dF9wcm9wZXJ0eTogdGhpcy50ZXh0X3Byb3BlcnR5LFxuICAgICAgbGFuZ19zdHJpbmc6IHRoaXMubGFuZ19zdHJpbmcsXG4gICAgICBkaW1lbnNpb246IHRoaXMuZGltZW5zaW9uLFxuXG4gICAgICBkaWdpdGFsOiB0aGlzLmRpZ2l0YWwsXG4gICAgICBjaHVuazogdGhpcy5jaHVuayxcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlRmxhdHRlbmVkID0gKGZsYXR0ZW5lZDogRmxhdHRlbmVySW50ZXJmYWNlLCBwaz8sIHR5cGU/OiAnTE9BRCcgfCAnVVBTRVJUJykgPT4ge1xuICB2YWx1ZXMoZmxhdHRlbmVkKS5mb3JFYWNoKG1vZGVsID0+IHtcbiAgICBpZiAobW9kZWwuaXRlbXMpIHtcbiAgICAgIGlmICh0eXBlID09PSAnVVBTRVJUJykge1xuICAgICAgICBtb2RlbC5hY3Rpb25zLnVwc2VydFN1Y2NlZWRlZChtb2RlbC5pdGVtcywgdW5kZWZpbmVkLCBwaylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZGVsLmFjdGlvbnMubG9hZFN1Y2NlZWRlZChtb2RlbC5pdGVtcywgdW5kZWZpbmVkLCBwaylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG59XG4iXX0=