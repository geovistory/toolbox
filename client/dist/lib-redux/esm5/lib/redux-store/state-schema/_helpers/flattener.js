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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC8iLCJzb3VyY2VzIjpbImxpYi9yZWR1eC1zdG9yZS9zdGF0ZS1zY2hlbWEvX2hlbHBlcnMvZmxhdHRlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxrQkFBa0IsRUFBRSxvQkFBb0IsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRXBVLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQzs7OztBQVMzQzs7OztJQUVFLHdCQUNTLE9BQTZDLEVBQzdDLGVBQW9CLEVBQ3BCLFNBQW1DO1FBRm5DLFlBQU8sR0FBUCxPQUFPLENBQXNDO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFLO1FBQ3BCLGNBQVMsR0FBVCxTQUFTLENBQTBCO0lBQ3hDLENBQUM7Ozs7O0lBRUwsZ0NBQU87Ozs7SUFBUCxVQUFRLEtBQWM7UUFDcEIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzs7O2dCQUVoQixZQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRzs7OztZQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFmLENBQWUsRUFBQztZQUNwRixJQUFJLENBQUMsS0FBSyxvQkFDTCxDQUFDLElBQUksQ0FBQyxL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RixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTzs7OztJQUFDLFVBQUEsS0FBSztRQUM3QixJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDZixJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFBO2FBQzFEO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFBO2FBQ3hEO1NBQ0Y7SUFDSCxDQUFDLEVBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdENodW5rLCBEYXREaWdpdGFsLCBJbmZBcHBlbGxhdGlvbiwgSW5mRGltZW5zaW9uLCBJbmZMYW5nU3RyaW5nLCBJbmZMYW5ndWFnZSwgSW5mUGVyc2lzdGVudEl0ZW0sIEluZlBsYWNlLCBJbmZTdGF0ZW1lbnQsIEluZlRlbXBvcmFsRW50aXR5LCBJbmZUZXh0UHJvcGVydHksIEluZlRpbWVQcmltaXRpdmUsIFByb0NsYXNzRmllbGRDb25maWcsIFByb0RmaENsYXNzUHJvalJlbCwgUHJvRGZoUHJvZmlsZVByb2pSZWwsIFByb0luZm9Qcm9qUmVsLCBQcm9Qcm9qZWN0LCBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXMgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsga2V5cywgb21pdCwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgRGF0QWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvZGF0LmFjdGlvbnMnO1xuaW1wb3J0IHsgSW5mQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvaW5mLmFjdGlvbnMnO1xuaW1wb3J0IHsgUHJvQWN0aW9ucyB9IGZyb20gJy4uL2FjdGlvbnMvcHJvLmFjdGlvbnMnO1xuaW1wb3J0IHsgQ2h1bmtTbGljZSwgRGlnaXRhbFNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL2RhdC5tb2RlbHMnO1xuaW1wb3J0IHsgSW5mQXBwZWxsYXRpb25TbGljZSwgSW5mRGltZW5zaW9uU2xpY2UsIEluZkxhbmdTdHJpbmdTbGljZSwgSW5mTGFuZ3VhZ2VTbGljZSwgSW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mUGxhY2VTbGljZSwgSW5mVGV4dFByb3BlcnR5U2xpY2UsIEluZlRpbWVQcmltaXRpdmVTbGljZSB9IGZyb20gJy4uL21vZGVscy9pbmYubW9kZWxzJztcbmltcG9ydCB7IFByb0FuYWx5c2lzU2xpY2UsIFByb0NsYXNzRmllbGRDb25maWdTbGljZSwgUHJvRGZoQ2xhc3NQcm9qUmVsU2xpY2UsIFByb0RmaFByb2ZpbGVQcm9qUmVsU2xpY2UsIFByb0luZm9Qcm9qUmVsU2xpY2UsIFByb1Byb2plY3RTbGljZSwgUHJvVGV4dFByb3BlcnR5U2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvcHJvLm1vZGVscyc7XG5pbXBvcnQgeyBTY2hlbWFBY3Rpb25zRmFjdG9yeSB9IGZyb20gJy4vc2NoZW1hLWFjdGlvbnMtZmFjdG9yeSc7XG5cbmNsYXNzIE1vZGVsRmxhdHRlbmVyPFBheWxvYWQsIE1vZGVsPiB7XG4gIGl0ZW1zOiBNb2RlbFtdXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBhY3Rpb25zOiBTY2hlbWFBY3Rpb25zRmFjdG9yeTxQYXlsb2FkLCBNb2RlbD4sXG4gICAgcHVibGljIG1vZGVsRGVmaW5pdGlvbjogYW55LFxuICAgIHB1YmxpYyBmbGF0dGVuQ2I6IChpdGVtczogTW9kZWxbXSkgPT4gdm9pZCxcbiAgKSB7IH1cblxuICBmbGF0dGVuKGl0ZW1zOiBNb2RlbFtdKSB7XG4gICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcblxuICAgICAgdGhpcy5mbGF0dGVuQ2IoaXRlbXMpO1xuICAgICAgLy8gdG9kbyByZW1vdmUgcHJvcGVydGllcyBvZiB0aG9zZSBvYmplY3RzLCB1c2luZyBnZXRNb2RlbERlZmluaXRpb24oKVxuICAgICAgY29uc3Qga2V5c1RvT21pdCA9IGtleXModGhpcy5tb2RlbERlZmluaXRpb24ucmVsYXRpb25zKS5tYXAoaXRlbSA9PiBpdGVtLnRvU3RyaW5nKCkpXG4gICAgICB0aGlzLml0ZW1zID0gW1xuICAgICAgICAuLi4odGhpcy5pdGVtcyB8fCBbXSksXG4gICAgICAgIC4uLml0ZW1zLmZpbHRlcihpdGVtID0+ICEhaXRlbSAmJiBPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggPiAwKVxuICAgICAgICAgIC5tYXAoaXRlbSA9PiBvbWl0KGtleXNUb09taXQsIGl0ZW0pKSBhcyBNb2RlbFtdXG4gICAgICBdXG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbn1cblxuaW50ZXJmYWNlIEZsYXR0ZW5lckludGVyZmFjZSB7XG4gIFtrZXk6IHN0cmluZ106IE1vZGVsRmxhdHRlbmVyPGFueSwgYW55PlxufVxuXG4vKipcbiAqIEZsYXR0ZW5lciBpcyB0aGUgY2xhc3MgdXNlZCB0byBmbGF0dGVuIG5lc3RlZCBvYmplY3RzLlxuICogVXNlIHN0b3JlRmxhdHRlbmVkKCkgdG8gY2FsbCBhbGwgYWN0aW9ucyB0byBwdXQgdGhlXG4gKiBmbGF0dGVuZWQgaXRlbXMgaW50byB0aGUgc3RvcmUuXG4gKi9cbmV4cG9ydCBjbGFzcyBGbGF0dGVuZXIge1xuXG5cblxuICBpbmZvX3Byb2pfcmVsID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0luZm9Qcm9qUmVsU2xpY2UsIFByb0luZm9Qcm9qUmVsPihcbiAgICB0aGlzLnByb0FjdGlvbnMuaW5mb19wcm9qX3JlbCxcbiAgICBQcm9JbmZvUHJvalJlbC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvSW5mb1Byb2pSZWwoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgcHJvX2RmaF9jbGFzc19wcm9qX3JlbCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9EZmhDbGFzc1Byb2pSZWxTbGljZSwgUHJvRGZoQ2xhc3NQcm9qUmVsPihcbiAgICB0aGlzLnByb0FjdGlvbnMuZGZoX2NsYXNzX3Byb2pfcmVsLFxuICAgIFByb0RmaENsYXNzUHJvalJlbC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvRGZoQ2xhc3NQcm9qUmVsKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIHByb19kZmhfcHJvZmlsZV9wcm9qX3JlbCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9EZmhQcm9maWxlUHJvalJlbFNsaWNlLCBQcm9EZmhQcm9maWxlUHJvalJlbD4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmRmaF9wcm9maWxlX3Byb2pfcmVsLFxuICAgIFByb0RmaFByb2ZpbGVQcm9qUmVsLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9EZmhQcm9maWxlUHJvalJlbChpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIHBlcnNpc3RlbnRfaXRlbSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZQZXJzaXN0ZW50SXRlbT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnBlcnNpc3RlbnRfaXRlbSxcbiAgICBJbmZQZXJzaXN0ZW50SXRlbS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mUGVyc2lzdGVudEl0ZW0oaXRlbSk7XG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5pbmNvbWluZ19zdGF0ZW1lbnRzKVxuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0ub3V0Z29pbmdfc3RhdGVtZW50cylcbiAgICAgICAgdGhpcy50ZXh0X3Byb3BlcnR5LmZsYXR0ZW4oaXRlbS50ZXh0X3Byb3BlcnRpZXMpXG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIHRlbXBvcmFsX2VudGl0eSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZUZW1wb3JhbEVudGl0eT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnRlbXBvcmFsX2VudGl0eSxcbiAgICBJbmZUZW1wb3JhbEVudGl0eS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mVGVtcG9yYWxFbnRpdHkoaXRlbSk7XG4gICAgICAgIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oaXRlbS5vdXRnb2luZ19zdGF0ZW1lbnRzKVxuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0uaW5jb21pbmdfc3RhdGVtZW50cylcbiAgICAgICAgdGhpcy50ZXh0X3Byb3BlcnR5LmZsYXR0ZW4oaXRlbS50ZXh0X3Byb3BlcnRpZXMpXG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgc3RhdGVtZW50ID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlN0YXRlbWVudD4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnN0YXRlbWVudCxcbiAgICBJbmZTdGF0ZW1lbnQuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlN0YXRlbWVudChpdGVtKTtcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG5cbiAgICAgICAgLy8gU3ViamVjdFxuICAgICAgICBpZiAoaXRlbS5zdWJqZWN0X3RlbXBvcmFsX2VudGl0eSkgdGhpcy50ZW1wb3JhbF9lbnRpdHkuZmxhdHRlbihbaXRlbS5zdWJqZWN0X3RlbXBvcmFsX2VudGl0eV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0uc3ViamVjdF9zdGF0ZW1lbnQpIHRoaXMuc3RhdGVtZW50LmZsYXR0ZW4oW2l0ZW0uc3ViamVjdF9zdGF0ZW1lbnRdKVxuXG4gICAgICAgIC8vIE9iamVjdFxuICAgICAgICBpZiAoaXRlbS5vYmplY3RfcGVyc2lzdGVudF9pdGVtKSB0aGlzLnBlcnNpc3RlbnRfaXRlbS5mbGF0dGVuKFtpdGVtLm9iamVjdF9wZXJzaXN0ZW50X2l0ZW1dKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9hcHBlbGxhdGlvbikgdGhpcy5hcHBlbGxhdGlvbi5mbGF0dGVuKFtpdGVtLm9iamVjdF9hcHBlbGxhdGlvbl0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X3BsYWNlKSB0aGlzLnBsYWNlLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X3BsYWNlXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfdGltZV9wcmltaXRpdmUpIHRoaXMudGltZV9wcmltaXRpdmUuZmxhdHRlbihbaXRlbS5vYmplY3RfdGltZV9wcmltaXRpdmVdKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9sYW5ndWFnZSkgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLm9iamVjdF9sYW5ndWFnZV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0uc3ViamVjdF9jaHVuaykgdGhpcy5jaHVuay5mbGF0dGVuKFtpdGVtLnN1YmplY3RfY2h1bmtdKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9sYW5nX3N0cmluZykgdGhpcy5sYW5nX3N0cmluZy5mbGF0dGVuKFtpdGVtLm9iamVjdF9sYW5nX3N0cmluZ10pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X2RpbWVuc2lvbikgdGhpcy5kaW1lbnNpb24uZmxhdHRlbihbaXRlbS5vYmplY3RfZGltZW5zaW9uXSlcbiAgICAgIH0pXG4gICAgfSlcblxuICBhcHBlbGxhdGlvbiA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZBcHBlbGxhdGlvblNsaWNlLCBJbmZBcHBlbGxhdGlvbj4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLmFwcGVsbGF0aW9uLFxuICAgIEluZkFwcGVsbGF0aW9uLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZBcHBlbGxhdGlvbihpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIHBsYWNlID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlBsYWNlU2xpY2UsIEluZlBsYWNlPihcbiAgICB0aGlzLmluZkFjdGlvbnMucGxhY2UsXG4gICAgSW5mUGxhY2UuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlBsYWNlKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIHRpbWVfcHJpbWl0aXZlID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlRpbWVQcmltaXRpdmVTbGljZSwgSW5mVGltZVByaW1pdGl2ZT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnRpbWVfcHJpbWl0aXZlLFxuICAgIEluZlRpbWVQcmltaXRpdmUuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlRpbWVQcmltaXRpdmUoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgbGFuZ3VhZ2UgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mTGFuZ3VhZ2VTbGljZSwgSW5mTGFuZ3VhZ2U+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5sYW5ndWFnZSxcbiAgICBJbmZMYW5ndWFnZS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mTGFuZ3VhZ2UoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cbiAgbGFuZ19zdHJpbmcgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mTGFuZ1N0cmluZ1NsaWNlLCBJbmZMYW5nU3RyaW5nPihcbiAgICB0aGlzLmluZkFjdGlvbnMubGFuZ19zdHJpbmcsXG4gICAgSW5mTGFuZ1N0cmluZy5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mTGFuZ1N0cmluZyhpdGVtKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLmxhbmd1YWdlXSlcbiAgICAgICAgdGhpcy5pbmZvX3Byb2pfcmVsLmZsYXR0ZW4oaXRlbS5lbnRpdHlfdmVyc2lvbl9wcm9qZWN0X3JlbHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgZGltZW5zaW9uID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZkRpbWVuc2lvblNsaWNlLCBJbmZEaW1lbnNpb24+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5kaW1lbnNpb24sXG4gICAgSW5mRGltZW5zaW9uLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZEaW1lbnNpb24oaXRlbSk7XG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIHRleHRfcHJvcGVydHkgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mVGV4dFByb3BlcnR5U2xpY2UsIEluZlRleHRQcm9wZXJ0eT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnRleHRfcHJvcGVydHksXG4gICAgSW5mVGV4dFByb3BlcnR5LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZUZXh0UHJvcGVydHkoaXRlbSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5sYW5ndWFnZV0pXG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIGRpZ2l0YWwgPSBuZXcgTW9kZWxGbGF0dGVuZXI8RGlnaXRhbFNsaWNlLCBEYXREaWdpdGFsPihcbiAgICB0aGlzLmRhdEFjdGlvbnMuZGlnaXRhbCxcbiAgICBEYXREaWdpdGFsLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBEYXREaWdpdGFsKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIGNodW5rID0gbmV3IE1vZGVsRmxhdHRlbmVyPENodW5rU2xpY2UsIERhdENodW5rPihcbiAgICB0aGlzLmRhdEFjdGlvbnMuY2h1bmssXG4gICAgRGF0Q2h1bmsuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IERhdENodW5rKGl0ZW0pO1xuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0ub3V0Z29pbmdfc3RhdGVtZW50cylcbiAgICAgIH0pXG4gICAgfSlcblxuICBwcm9fcHJvamVjdCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9Qcm9qZWN0U2xpY2UsIFByb1Byb2plY3Q+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5wcm9qZWN0LFxuICAgIFByb1Byb2plY3QuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb1Byb2plY3QoaXRlbSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5kZWZhdWx0X2xhbmd1YWdlXSlcbiAgICAgIH0pXG4gICAgfSlcblxuICBwcm9fdGV4dF9wcm9wZXJ0eSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9UZXh0UHJvcGVydHlTbGljZSwgUHJvVGV4dFByb3BlcnR5PihcbiAgICB0aGlzLnByb0FjdGlvbnMudGV4dF9wcm9wZXJ0eSxcbiAgICBQcm9UZXh0UHJvcGVydHkuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb1RleHRQcm9wZXJ0eShpdGVtKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZS5mbGF0dGVuKFtpdGVtLmxhbmd1YWdlXSlcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIHByb19jbGFzc19maWVsZF9jb25maWcgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvQ2xhc3NGaWVsZENvbmZpZ1NsaWNlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnPihcbiAgICB0aGlzLnByb0FjdGlvbnMuY2xhc3NfZmllbGRfY29uZmlnLFxuICAgIFByb0NsYXNzRmllbGRDb25maWcuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb0NsYXNzRmllbGRDb25maWcoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cblxuICBhbmFseXNpcyA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9BbmFseXNpc1NsaWNlLCBQcm9BbmFseXNpcz4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmFuYWx5c2lzLFxuICAgIHsgcmVsYXRpb25zOiBbXSB9LFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHsgfSlcbiAgICB9KVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaW5mQWN0aW9uczogSW5mQWN0aW9ucyxcbiAgICBwdWJsaWMgZGF0QWN0aW9uczogRGF0QWN0aW9ucyxcbiAgICBwdWJsaWMgcHJvQWN0aW9uczogUHJvQWN0aW9uc1xuICApIHsgfVxuICBnZXRGbGF0dGVuZWQoKTogRmxhdHRlbmVySW50ZXJmYWNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgcHJvX3Byb2plY3Q6IHRoaXMucHJvX3Byb2plY3QsXG4gICAgICBwcm9fdGV4dF9wcm9wZXJ0eTogdGhpcy5wcm9fdGV4dF9wcm9wZXJ0eSxcbiAgICAgIHByb19jbGFzc19maWVsZF9jb25maWc6IHRoaXMucHJvX2NsYXNzX2ZpZWxkX2NvbmZpZyxcbiAgICAgIHByb19kZmhfcHJvZmlsZV9wcm9qX3JlbDogdGhpcy5wcm9fZGZoX3Byb2ZpbGVfcHJval9yZWwsXG4gICAgICBwcm9fZGZoX2NsYXNzX3Byb2pfcmVsOiB0aGlzLnByb19kZmhfY2xhc3NfcHJval9yZWwsXG5cbiAgICAgIGluZm9fcHJval9yZWw6IHRoaXMuaW5mb19wcm9qX3JlbCxcbiAgICAgIGFuYWx5c2lzOiB0aGlzLmFuYWx5c2lzLFxuXG4gICAgICBwZXJzaXN0ZW50X2l0ZW06IHRoaXMucGVyc2lzdGVudF9pdGVtLFxuICAgICAgdGVtcG9yYWxfZW50aXR5OiB0aGlzLnRlbXBvcmFsX2VudGl0eSxcbiAgICAgIHN0YXRlbWVudDogdGhpcy5zdGF0ZW1lbnQsXG4gICAgICBhcHBlbGxhdGlvbjogdGhpcy5hcHBlbGxhdGlvbixcbiAgICAgIHBsYWNlOiB0aGlzLnBsYWNlLFxuICAgICAgdGltZV9wcmltaXRpdmU6IHRoaXMudGltZV9wcmltaXRpdmUsXG4gICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcbiAgICAgIHRleHRfcHJvcGVydHk6IHRoaXMudGV4dF9wcm9wZXJ0eSxcbiAgICAgIGxhbmdfc3RyaW5nOiB0aGlzLmxhbmdfc3RyaW5nLFxuICAgICAgZGltZW5zaW9uOiB0aGlzLmRpbWVuc2lvbixcblxuICAgICAgZGlnaXRhbDogdGhpcy5kaWdpdGFsLFxuICAgICAgY2h1bms6IHRoaXMuY2h1bmssXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzdG9yZUZsYXR0ZW5lZCA9IChmbGF0dGVuZWQ6IEZsYXR0ZW5lckludGVyZmFjZSwgcGs/LCB0eXBlPzogJ0xPQUQnIHwgJ1VQU0VSVCcpID0+IHtcbiAgdmFsdWVzKGZsYXR0ZW5lZCkuZm9yRWFjaChtb2RlbCA9PiB7XG4gICAgaWYgKG1vZGVsLml0ZW1zKSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ1VQU0VSVCcpIHtcbiAgICAgICAgbW9kZWwuYWN0aW9ucy51cHNlcnRTdWNjZWVkZWQobW9kZWwuaXRlbXMsIHVuZGVmaW5lZCwgcGspXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2RlbC5hY3Rpb25zLmxvYWRTdWNjZWVkZWQobW9kZWwuaXRlbXMsIHVuZGVmaW5lZCwgcGspXG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuIl19