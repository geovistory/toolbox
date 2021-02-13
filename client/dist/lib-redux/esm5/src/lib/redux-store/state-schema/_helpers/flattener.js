/**
 * @fileoverview added by tsickle
 * Generated from: state-schema/_helpers/flattener.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhdHRlbmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1yZWR1eC9zcmMvbGliL3JlZHV4LXN0b3JlLyIsInNvdXJjZXMiOlsic3RhdGUtc2NoZW1hL19oZWxwZXJzL2ZsYXR0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsb0JBQW9CLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVwVSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7Ozs7QUFTM0M7Ozs7SUFFRSx3QkFDUyxPQUE2QyxFQUM3QyxlQUFvQixFQUNwQixTQUFtQztRQUZuQyxZQUFPLEdBQVAsT0FBTyxDQUFzQztRQUM3QyxvQkFBZSxHQUFmLGVBQWUsQ0FBSztRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUEwQjtJQUN4QyxDQUFDOzs7OztJQUVMLGdDQUFPOzs7O0lBQVAsVUFBUSxLQUFjO1FBQ3BCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBRTdCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7OztnQkFFaEIsWUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUc7Ozs7WUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBZixDQUFlLEVBQUM7WUFDcEYsSUFBSSxDQUFDLEtBQUssb0JBQ0wsQ0FBQyxJQUFJLENB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SUFDekYsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU87Ozs7SUFBQyxVQUFBLEtBQUs7UUFDN0IsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2YsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTthQUMxRDtpQkFBTTtnQkFDTCxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTthQUN4RDtTQUNGO0lBQ0gsQ0FBQyxFQUFDLENBQUE7QUFDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRDaHVuaywgRGF0RGlnaXRhbCwgSW5mQXBwZWxsYXRpb24sIEluZkRpbWVuc2lvbiwgSW5mTGFuZ1N0cmluZywgSW5mTGFuZ3VhZ2UsIEluZlBlcnNpc3RlbnRJdGVtLCBJbmZQbGFjZSwgSW5mU3RhdGVtZW50LCBJbmZUZW1wb3JhbEVudGl0eSwgSW5mVGV4dFByb3BlcnR5LCBJbmZUaW1lUHJpbWl0aXZlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9EZmhDbGFzc1Byb2pSZWwsIFByb0RmaFByb2ZpbGVQcm9qUmVsLCBQcm9JbmZvUHJvalJlbCwgUHJvUHJvamVjdCwgUHJvVGV4dFByb3BlcnR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGIzJztcbmltcG9ydCB7IFByb0FuYWx5c2lzIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGtleXMsIG9taXQsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IERhdEFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2RhdC5hY3Rpb25zJztcbmltcG9ydCB7IEluZkFjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL2luZi5hY3Rpb25zJztcbmltcG9ydCB7IFByb0FjdGlvbnMgfSBmcm9tICcuLi9hY3Rpb25zL3Byby5hY3Rpb25zJztcbmltcG9ydCB7IENodW5rU2xpY2UsIERpZ2l0YWxTbGljZSB9IGZyb20gJy4uL21vZGVscy9kYXQubW9kZWxzJztcbmltcG9ydCB7IEluZkFwcGVsbGF0aW9uU2xpY2UsIEluZkRpbWVuc2lvblNsaWNlLCBJbmZMYW5nU3RyaW5nU2xpY2UsIEluZkxhbmd1YWdlU2xpY2UsIEluZlBlcnNpc3RlbnRJdGVtU2xpY2UsIEluZlBsYWNlU2xpY2UsIEluZlRleHRQcm9wZXJ0eVNsaWNlLCBJbmZUaW1lUHJpbWl0aXZlU2xpY2UgfSBmcm9tICcuLi9tb2RlbHMvaW5mLm1vZGVscyc7XG5pbXBvcnQgeyBQcm9BbmFseXNpc1NsaWNlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnU2xpY2UsIFByb0RmaENsYXNzUHJvalJlbFNsaWNlLCBQcm9EZmhQcm9maWxlUHJvalJlbFNsaWNlLCBQcm9JbmZvUHJvalJlbFNsaWNlLCBQcm9Qcm9qZWN0U2xpY2UsIFByb1RleHRQcm9wZXJ0eVNsaWNlIH0gZnJvbSAnLi4vbW9kZWxzL3Byby5tb2RlbHMnO1xuaW1wb3J0IHsgU2NoZW1hQWN0aW9uc0ZhY3RvcnkgfSBmcm9tICcuL3NjaGVtYS1hY3Rpb25zLWZhY3RvcnknO1xuXG5jbGFzcyBNb2RlbEZsYXR0ZW5lcjxQYXlsb2FkLCBNb2RlbD4ge1xuICBpdGVtczogTW9kZWxbXVxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgYWN0aW9uczogU2NoZW1hQWN0aW9uc0ZhY3Rvcnk8UGF5bG9hZCwgTW9kZWw+LFxuICAgIHB1YmxpYyBtb2RlbERlZmluaXRpb246IGFueSxcbiAgICBwdWJsaWMgZmxhdHRlbkNiOiAoaXRlbXM6IE1vZGVsW10pID0+IHZvaWQsXG4gICkgeyB9XG5cbiAgZmxhdHRlbihpdGVtczogTW9kZWxbXSkge1xuICAgIGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgIHRoaXMuZmxhdHRlbkNiKGl0ZW1zKTtcbiAgICAgIC8vIHRvZG8gcmVtb3ZlIHByb3BlcnRpZXMgb2YgdGhvc2Ugb2JqZWN0cywgdXNpbmcgZ2V0TW9kZWxEZWZpbml0aW9uKClcbiAgICAgIGNvbnN0IGtleXNUb09taXQgPSBrZXlzKHRoaXMubW9kZWxEZWZpbml0aW9uLnJlbGF0aW9ucykubWFwKGl0ZW0gPT4gaXRlbS50b1N0cmluZygpKVxuICAgICAgdGhpcy5pdGVtcyA9IFtcbiAgICAgICAgLi4uKHRoaXMuaXRlbXMgfHwgW10pLFxuICAgICAgICAuLi5pdGVtcy5maWx0ZXIoaXRlbSA9PiAhIWl0ZW0gJiYgT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID4gMClcbiAgICAgICAgICAubWFwKGl0ZW0gPT4gb21pdChrZXlzVG9PbWl0LCBpdGVtKSkgYXMgTW9kZWxbXVxuICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG59XG5cbmludGVyZmFjZSBGbGF0dGVuZXJJbnRlcmZhY2Uge1xuICBba2V5OiBzdHJpbmddOiBNb2RlbEZsYXR0ZW5lcjxhbnksIGFueT5cbn1cblxuLyoqXG4gKiBGbGF0dGVuZXIgaXMgdGhlIGNsYXNzIHVzZWQgdG8gZmxhdHRlbiBuZXN0ZWQgb2JqZWN0cy5cbiAqIFVzZSBzdG9yZUZsYXR0ZW5lZCgpIHRvIGNhbGwgYWxsIGFjdGlvbnMgdG8gcHV0IHRoZVxuICogZmxhdHRlbmVkIGl0ZW1zIGludG8gdGhlIHN0b3JlLlxuICovXG5leHBvcnQgY2xhc3MgRmxhdHRlbmVyIHtcblxuXG5cbiAgaW5mb19wcm9qX3JlbCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxQcm9JbmZvUHJvalJlbFNsaWNlLCBQcm9JbmZvUHJvalJlbD4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmluZm9fcHJval9yZWwsXG4gICAgUHJvSW5mb1Byb2pSZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb0luZm9Qcm9qUmVsKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIHByb19kZmhfY2xhc3NfcHJval9yZWwgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvRGZoQ2xhc3NQcm9qUmVsU2xpY2UsIFByb0RmaENsYXNzUHJvalJlbD4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmRmaF9jbGFzc19wcm9qX3JlbCxcbiAgICBQcm9EZmhDbGFzc1Byb2pSZWwuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IFByb0RmaENsYXNzUHJvalJlbChpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBwcm9fZGZoX3Byb2ZpbGVfcHJval9yZWwgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvRGZoUHJvZmlsZVByb2pSZWxTbGljZSwgUHJvRGZoUHJvZmlsZVByb2pSZWw+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5kZmhfcHJvZmlsZV9wcm9qX3JlbCxcbiAgICBQcm9EZmhQcm9maWxlUHJvalJlbC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgUHJvRGZoUHJvZmlsZVByb2pSZWwoaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cblxuICBwZXJzaXN0ZW50X2l0ZW0gPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mUGVyc2lzdGVudEl0ZW0+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5wZXJzaXN0ZW50X2l0ZW0sXG4gICAgSW5mUGVyc2lzdGVudEl0ZW0uZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlBlcnNpc3RlbnRJdGVtKGl0ZW0pO1xuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0uaW5jb21pbmdfc3RhdGVtZW50cylcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLm91dGdvaW5nX3N0YXRlbWVudHMpXG4gICAgICAgIHRoaXMudGV4dF9wcm9wZXJ0eS5mbGF0dGVuKGl0ZW0udGV4dF9wcm9wZXJ0aWVzKVxuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuICB0ZW1wb3JhbF9lbnRpdHkgPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mUGVyc2lzdGVudEl0ZW1TbGljZSwgSW5mVGVtcG9yYWxFbnRpdHk+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy50ZW1wb3JhbF9lbnRpdHksXG4gICAgSW5mVGVtcG9yYWxFbnRpdHkuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZlRlbXBvcmFsRW50aXR5KGl0ZW0pO1xuICAgICAgICB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKGl0ZW0ub3V0Z29pbmdfc3RhdGVtZW50cylcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLmluY29taW5nX3N0YXRlbWVudHMpXG4gICAgICAgIHRoaXMudGV4dF9wcm9wZXJ0eS5mbGF0dGVuKGl0ZW0udGV4dF9wcm9wZXJ0aWVzKVxuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuXG4gIHN0YXRlbWVudCA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZQZXJzaXN0ZW50SXRlbVNsaWNlLCBJbmZTdGF0ZW1lbnQ+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5zdGF0ZW1lbnQsXG4gICAgSW5mU3RhdGVtZW50LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZTdGF0ZW1lbnQoaXRlbSk7XG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuXG4gICAgICAgIC8vIFN1YmplY3RcbiAgICAgICAgaWYgKGl0ZW0uc3ViamVjdF90ZW1wb3JhbF9lbnRpdHkpIHRoaXMudGVtcG9yYWxfZW50aXR5LmZsYXR0ZW4oW2l0ZW0uc3ViamVjdF90ZW1wb3JhbF9lbnRpdHldKVxuICAgICAgICBlbHNlIGlmIChpdGVtLnN1YmplY3Rfc3RhdGVtZW50KSB0aGlzLnN0YXRlbWVudC5mbGF0dGVuKFtpdGVtLnN1YmplY3Rfc3RhdGVtZW50XSlcblxuICAgICAgICAvLyBPYmplY3RcbiAgICAgICAgaWYgKGl0ZW0ub2JqZWN0X3BlcnNpc3RlbnRfaXRlbSkgdGhpcy5wZXJzaXN0ZW50X2l0ZW0uZmxhdHRlbihbaXRlbS5vYmplY3RfcGVyc2lzdGVudF9pdGVtXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfYXBwZWxsYXRpb24pIHRoaXMuYXBwZWxsYXRpb24uZmxhdHRlbihbaXRlbS5vYmplY3RfYXBwZWxsYXRpb25dKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9wbGFjZSkgdGhpcy5wbGFjZS5mbGF0dGVuKFtpdGVtLm9iamVjdF9wbGFjZV0pXG4gICAgICAgIGVsc2UgaWYgKGl0ZW0ub2JqZWN0X3RpbWVfcHJpbWl0aXZlKSB0aGlzLnRpbWVfcHJpbWl0aXZlLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X3RpbWVfcHJpbWl0aXZlXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfbGFuZ3VhZ2UpIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5vYmplY3RfbGFuZ3VhZ2VdKVxuICAgICAgICBlbHNlIGlmIChpdGVtLnN1YmplY3RfY2h1bmspIHRoaXMuY2h1bmsuZmxhdHRlbihbaXRlbS5zdWJqZWN0X2NodW5rXSlcbiAgICAgICAgZWxzZSBpZiAoaXRlbS5vYmplY3RfbGFuZ19zdHJpbmcpIHRoaXMubGFuZ19zdHJpbmcuZmxhdHRlbihbaXRlbS5vYmplY3RfbGFuZ19zdHJpbmddKVxuICAgICAgICBlbHNlIGlmIChpdGVtLm9iamVjdF9kaW1lbnNpb24pIHRoaXMuZGltZW5zaW9uLmZsYXR0ZW4oW2l0ZW0ub2JqZWN0X2RpbWVuc2lvbl0pXG4gICAgICB9KVxuICAgIH0pXG5cbiAgYXBwZWxsYXRpb24gPSBuZXcgTW9kZWxGbGF0dGVuZXI8SW5mQXBwZWxsYXRpb25TbGljZSwgSW5mQXBwZWxsYXRpb24+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy5hcHBlbGxhdGlvbixcbiAgICBJbmZBcHBlbGxhdGlvbi5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mQXBwZWxsYXRpb24oaXRlbSk7XG4gICAgICB9KVxuICAgIH0pXG5cblxuICBwbGFjZSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZQbGFjZVNsaWNlLCBJbmZQbGFjZT4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLnBsYWNlLFxuICAgIEluZlBsYWNlLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZQbGFjZShpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICB0aW1lX3ByaW1pdGl2ZSA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZUaW1lUHJpbWl0aXZlU2xpY2UsIEluZlRpbWVQcmltaXRpdmU+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy50aW1lX3ByaW1pdGl2ZSxcbiAgICBJbmZUaW1lUHJpbWl0aXZlLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBJbmZUaW1lUHJpbWl0aXZlKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIGxhbmd1YWdlID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZkxhbmd1YWdlU2xpY2UsIEluZkxhbmd1YWdlPihcbiAgICB0aGlzLmluZkFjdGlvbnMubGFuZ3VhZ2UsXG4gICAgSW5mTGFuZ3VhZ2UuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZkxhbmd1YWdlKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG4gIGxhbmdfc3RyaW5nID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZkxhbmdTdHJpbmdTbGljZSwgSW5mTGFuZ1N0cmluZz4oXG4gICAgdGhpcy5pbmZBY3Rpb25zLmxhbmdfc3RyaW5nLFxuICAgIEluZkxhbmdTdHJpbmcuZ2V0TW9kZWxEZWZpbml0aW9uKCksXG4gICAgKGl0ZW1zKSA9PiB7XG4gICAgICBpdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtID0gbmV3IEluZkxhbmdTdHJpbmcoaXRlbSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5sYW5ndWFnZV0pXG4gICAgICAgIHRoaXMuaW5mb19wcm9qX3JlbC5mbGF0dGVuKGl0ZW0uZW50aXR5X3ZlcnNpb25fcHJvamVjdF9yZWxzKVxuICAgICAgfSlcbiAgICB9KVxuXG4gIGRpbWVuc2lvbiA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxJbmZEaW1lbnNpb25TbGljZSwgSW5mRGltZW5zaW9uPihcbiAgICB0aGlzLmluZkFjdGlvbnMuZGltZW5zaW9uLFxuICAgIEluZkRpbWVuc2lvbi5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mRGltZW5zaW9uKGl0ZW0pO1xuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuICB0ZXh0X3Byb3BlcnR5ID0gbmV3IE1vZGVsRmxhdHRlbmVyPEluZlRleHRQcm9wZXJ0eVNsaWNlLCBJbmZUZXh0UHJvcGVydHk+KFxuICAgIHRoaXMuaW5mQWN0aW9ucy50ZXh0X3Byb3BlcnR5LFxuICAgIEluZlRleHRQcm9wZXJ0eS5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgSW5mVGV4dFByb3BlcnR5KGl0ZW0pO1xuICAgICAgICB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0ubGFuZ3VhZ2VdKVxuICAgICAgICB0aGlzLmluZm9fcHJval9yZWwuZmxhdHRlbihpdGVtLmVudGl0eV92ZXJzaW9uX3Byb2plY3RfcmVscylcbiAgICAgIH0pXG4gICAgfSlcblxuICBkaWdpdGFsID0gbmV3IE1vZGVsRmxhdHRlbmVyPERpZ2l0YWxTbGljZSwgRGF0RGlnaXRhbD4oXG4gICAgdGhpcy5kYXRBY3Rpb25zLmRpZ2l0YWwsXG4gICAgRGF0RGlnaXRhbC5nZXRNb2RlbERlZmluaXRpb24oKSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBuZXcgRGF0RGlnaXRhbChpdGVtKTtcbiAgICAgIH0pXG4gICAgfSlcblxuICBjaHVuayA9IG5ldyBNb2RlbEZsYXR0ZW5lcjxDaHVua1NsaWNlLCBEYXRDaHVuaz4oXG4gICAgdGhpcy5kYXRBY3Rpb25zLmNodW5rLFxuICAgIERhdENodW5rLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBEYXRDaHVuayhpdGVtKTtcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnQuZmxhdHRlbihpdGVtLm91dGdvaW5nX3N0YXRlbWVudHMpXG4gICAgICB9KVxuICAgIH0pXG5cbiAgcHJvX3Byb2plY3QgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvUHJvamVjdFNsaWNlLCBQcm9Qcm9qZWN0PihcbiAgICB0aGlzLnByb0FjdGlvbnMucHJvamVjdCxcbiAgICBQcm9Qcm9qZWN0LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9Qcm9qZWN0KGl0ZW0pO1xuICAgICAgICB0aGlzLmxhbmd1YWdlLmZsYXR0ZW4oW2l0ZW0uZGVmYXVsdF9sYW5ndWFnZV0pXG4gICAgICB9KVxuICAgIH0pXG5cbiAgcHJvX3RleHRfcHJvcGVydHkgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvVGV4dFByb3BlcnR5U2xpY2UsIFByb1RleHRQcm9wZXJ0eT4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLnRleHRfcHJvcGVydHksXG4gICAgUHJvVGV4dFByb3BlcnR5LmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9UZXh0UHJvcGVydHkoaXRlbSk7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2UuZmxhdHRlbihbaXRlbS5sYW5ndWFnZV0pXG4gICAgICB9KVxuICAgIH0pXG5cblxuICBwcm9fY2xhc3NfZmllbGRfY29uZmlnID0gbmV3IE1vZGVsRmxhdHRlbmVyPFByb0NsYXNzRmllbGRDb25maWdTbGljZSwgUHJvQ2xhc3NGaWVsZENvbmZpZz4oXG4gICAgdGhpcy5wcm9BY3Rpb25zLmNsYXNzX2ZpZWxkX2NvbmZpZyxcbiAgICBQcm9DbGFzc0ZpZWxkQ29uZmlnLmdldE1vZGVsRGVmaW5pdGlvbigpLFxuICAgIChpdGVtcykgPT4ge1xuICAgICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaXRlbSA9IG5ldyBQcm9DbGFzc0ZpZWxkQ29uZmlnKGl0ZW0pO1xuICAgICAgfSlcbiAgICB9KVxuXG5cbiAgYW5hbHlzaXMgPSBuZXcgTW9kZWxGbGF0dGVuZXI8UHJvQW5hbHlzaXNTbGljZSwgUHJvQW5hbHlzaXM+KFxuICAgIHRoaXMucHJvQWN0aW9ucy5hbmFseXNpcyxcbiAgICB7IHJlbGF0aW9uczogW10gfSxcbiAgICAoaXRlbXMpID0+IHtcbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7IH0pXG4gICAgfSlcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGluZkFjdGlvbnM6IEluZkFjdGlvbnMsXG4gICAgcHVibGljIGRhdEFjdGlvbnM6IERhdEFjdGlvbnMsXG4gICAgcHVibGljIHByb0FjdGlvbnM6IFByb0FjdGlvbnNcbiAgKSB7IH1cbiAgZ2V0RmxhdHRlbmVkKCk6IEZsYXR0ZW5lckludGVyZmFjZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHByb19wcm9qZWN0OiB0aGlzLnByb19wcm9qZWN0LFxuICAgICAgcHJvX3RleHRfcHJvcGVydHk6IHRoaXMucHJvX3RleHRfcHJvcGVydHksXG4gICAgICBwcm9fY2xhc3NfZmllbGRfY29uZmlnOiB0aGlzLnByb19jbGFzc19maWVsZF9jb25maWcsXG4gICAgICBwcm9fZGZoX3Byb2ZpbGVfcHJval9yZWw6IHRoaXMucHJvX2RmaF9wcm9maWxlX3Byb2pfcmVsLFxuICAgICAgcHJvX2RmaF9jbGFzc19wcm9qX3JlbDogdGhpcy5wcm9fZGZoX2NsYXNzX3Byb2pfcmVsLFxuXG4gICAgICBpbmZvX3Byb2pfcmVsOiB0aGlzLmluZm9fcHJval9yZWwsXG4gICAgICBhbmFseXNpczogdGhpcy5hbmFseXNpcyxcblxuICAgICAgcGVyc2lzdGVudF9pdGVtOiB0aGlzLnBlcnNpc3RlbnRfaXRlbSxcbiAgICAgIHRlbXBvcmFsX2VudGl0eTogdGhpcy50ZW1wb3JhbF9lbnRpdHksXG4gICAgICBzdGF0ZW1lbnQ6IHRoaXMuc3RhdGVtZW50LFxuICAgICAgYXBwZWxsYXRpb246IHRoaXMuYXBwZWxsYXRpb24sXG4gICAgICBwbGFjZTogdGhpcy5wbGFjZSxcbiAgICAgIHRpbWVfcHJpbWl0aXZlOiB0aGlzLnRpbWVfcHJpbWl0aXZlLFxuICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXG4gICAgICB0ZXh0X3Byb3BlcnR5OiB0aGlzLnRleHRfcHJvcGVydHksXG4gICAgICBsYW5nX3N0cmluZzogdGhpcy5sYW5nX3N0cmluZyxcbiAgICAgIGRpbWVuc2lvbjogdGhpcy5kaW1lbnNpb24sXG5cbiAgICAgIGRpZ2l0YWw6IHRoaXMuZGlnaXRhbCxcbiAgICAgIGNodW5rOiB0aGlzLmNodW5rLFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc3RvcmVGbGF0dGVuZWQgPSAoZmxhdHRlbmVkOiBGbGF0dGVuZXJJbnRlcmZhY2UsIHBrPywgdHlwZT86ICdMT0FEJyB8ICdVUFNFUlQnKSA9PiB7XG4gIHZhbHVlcyhmbGF0dGVuZWQpLmZvckVhY2gobW9kZWwgPT4ge1xuICAgIGlmIChtb2RlbC5pdGVtcykge1xuICAgICAgaWYgKHR5cGUgPT09ICdVUFNFUlQnKSB7XG4gICAgICAgIG1vZGVsLmFjdGlvbnMudXBzZXJ0U3VjY2VlZGVkKG1vZGVsLml0ZW1zLCB1bmRlZmluZWQsIHBrKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kZWwuYWN0aW9ucy5sb2FkU3VjY2VlZGVkKG1vZGVsLml0ZW1zLCB1bmRlZmluZWQsIHBrKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cbiJdfQ==