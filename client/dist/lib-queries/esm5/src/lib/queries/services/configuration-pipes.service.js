/**
 * @fileoverview added by tsickle
 * Generated from: services/configuration-pipes.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DfhConfig, ProConfig, SysConfig } from '@kleiolab/lib-config';
import { dfhLabelByFksKey, proClassFieldConfgByProjectAndClassKey, textPropertyByFksKey } from '@kleiolab/lib-redux';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { flatten, indexBy, uniq, values } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, switchMap } from 'rxjs/operators';
import { cache } from '../decorators/method-decorators';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { SchemaSelectorsService } from './schema-selectors.service';
import * as i0 from "@angular/core";
import * as i1 from "./active-project-pipes.service";
import * as i2 from "./schema-selectors.service";
/**
 * @record
 */
export function DfhPropertyStatus() { }
if (false) {
    /** @type {?} */
    DfhPropertyStatus.prototype.removedFromAllProfiles;
}
var ConfigurationPipesService = /** @class */ (function () {
    function ConfigurationPipesService(a, s) {
        this.a = a;
        this.s = s;
    }
    /**
    * returns observable number[] wher the numbers are the pk_profile
    * of all profiles that are enabled by the given project.
    * The array will always include PK_PROFILE_GEOVISTORY_BASIC
    */
    // @spyTag
    /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeProfilesEnabledByProject = /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
    // @spyTag
    function () {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return _this.s.pro$.dfh_profile_proj_rel$.by_fk_project__enabled$
            .key(pkProject + '_true').pipe(map((/**
         * @param {?} projectProfileRels
         * @return {?}
         */
        function (projectProfileRels) { return values(projectProfileRels)
            .filter((/**
         * @param {?} rel
         * @return {?}
         */
        function (rel) { return rel.enabled; }))
            .map((/**
         * @param {?} rel
         * @return {?}
         */
        function (rel) { return rel.fk_profile; })); })), map((/**
         * @param {?} enabled
         * @return {?}
         */
        function (enabled) { return tslib_1.__spread(enabled, [DfhConfig.PK_PROFILE_GEOVISTORY_BASIC]); }))); })));
    };
    /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     */
    /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     * @param {?} pkClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeFields = /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     * @param {?} pkClass
     * @return {?}
     */
    function (pkClass) {
        var _this = this;
        return combineLatest(
        // pipe source class
        this.s.dfh$.class$.by_pk_class$.key(pkClass), 
        // pipe outgoing properties
        this.s.dfh$.property$.by_has_domain$.key(pkClass).pipe(map((/**
         * @param {?} indexed
         * @return {?}
         */
        function (indexed) { return values(indexed); }))), 
        // pipe ingoing properties
        this.s.dfh$.property$.by_has_range$.key(pkClass).pipe(map((/**
         * @param {?} indexed
         * @return {?}
         */
        function (indexed) { return values(indexed); }))), 
        // pipe sys config
        this.s.sys$.config$.main$.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return !!x; }))), 
        // pipe enabled profiles
        this.pipeProfilesEnabledByProject()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 5), sourceKlass = _b[0], outgoingProps = _b[1], ingoingProps = _b[2], sysConfig = _b[3], enabledProfiles = _b[4];
            // if class is not appellation for language, add appellation for language (1111) property
            if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
                ingoingProps.push(createAppellationProperty(pkClass));
            }
            // if is temporal entity, add has time span property
            if (sourceKlass.basic_type === 9) {
                outgoingProps.push(createHasTimeSpanProperty(pkClass));
            }
            outgoingProps.push(createHasDefinitionProperty(pkClass));
            return combineLatest(_this.pipePropertiesToSubfields(outgoingProps, true, enabledProfiles, sysConfig), _this.pipePropertiesToSubfields(ingoingProps, false, enabledProfiles, sysConfig), _this.pipeFieldConfigs(pkClass)).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var e_1, _b;
                var _c = tslib_1.__read(_a, 3), subfields1 = _c[0], subfields2 = _c[1], fieldConfigs = _c[2];
                /** @type {?} */
                var subfields = tslib_1.__spread(subfields1, subfields2);
                /** @type {?} */
                var fieldConfigIdx = indexBy((/**
                 * @param {?} x
                 * @return {?}
                 */
                function (x) { return [
                    (x.fk_domain_class || x.fk_range_class),
                    x.fk_property,
                    !!x.fk_domain_class
                ].join('_'); }), fieldConfigs);
                /** @type {?} */
                var uniqFields = {};
                /** @type {?} */
                var uniqSubfieldCache = {}
                // group by source, pkProperty and isOutgoing
                ;
                try {
                    // group by source, pkProperty and isOutgoing
                    for (var subfields_1 = tslib_1.__values(subfields), subfields_1_1 = subfields_1.next(); !subfields_1_1.done; subfields_1_1 = subfields_1.next()) {
                        var s = subfields_1_1.value;
                        /** @type {?} */
                        var fieldId = [s.sourceClass, s.property.pkProperty, s.isOutgoing].join('_');
                        /** @type {?} */
                        var subfieldId = [s.sourceClass, s.property.pkProperty, s.isOutgoing, s.targetClass].join('_');
                        /** @type {?} */
                        var fieldConfig = fieldConfigIdx[fieldId];
                        // the first time the group is established
                        if (!uniqFields[fieldId]) {
                            /** @type {?} */
                            var isSpecialField = false;
                            if (s.isHasTypeField)
                                isSpecialField = 'has-type';
                            else if (s.property.pkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN)
                                isSpecialField = 'time-span';
                            uniqFields[fieldId] = {
                                sourceClass: s.sourceClass,
                                sourceClassLabel: s.sourceClassLabel,
                                sourceMaxQuantity: s.sourceMaxQuantity,
                                sourceMinQuantity: s.sourceMinQuantity,
                                targetMinQuantity: s.targetMinQuantity,
                                targetMaxQuantity: s.targetMaxQuantity,
                                label: s.label,
                                isHasTypeField: s.isHasTypeField,
                                property: s.property,
                                isOutgoing: s.isOutgoing,
                                identityDefiningForSource: s.identityDefiningForSource,
                                identityDefiningForTarget: s.identityDefiningForTarget,
                                ontoInfoLabel: s.ontoInfoLabel,
                                ontoInfoUrl: s.ontoInfoUrl,
                                allSubfieldsRemovedFromAllProfiles: s.removedFromAllProfiles,
                                targetClasses: [s.targetClass],
                                listDefinitions: [s],
                                fieldConfig: fieldConfig,
                                placeOfDisplay: getPlaceOfDisplay(sysConfig.specialFields, s, fieldConfig),
                                isSpecialField: isSpecialField
                            };
                            // mark subfield as added
                            uniqSubfieldCache[subfieldId] = true;
                        }
                        // ignore duplications of subfields
                        else if (!uniqSubfieldCache[subfieldId]) {
                            uniqFields[fieldId].allSubfieldsRemovedFromAllProfiles === false ?
                                uniqFields[fieldId].allSubfieldsRemovedFromAllProfiles = false :
                                uniqFields[fieldId].allSubfieldsRemovedFromAllProfiles = s.removedFromAllProfiles;
                            uniqFields[fieldId].targetClasses.push(s.targetClass);
                            uniqFields[fieldId].listDefinitions.push(s);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (subfields_1_1 && !subfields_1_1.done && (_b = subfields_1.return)) _b.call(subfields_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return values(uniqFields);
            })));
        })));
    };
    /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     */
    // @spyTag
    /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSpecificFieldOfClass = /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return this.pipeFields(pkClass).pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        function (fields) { return fields
            // filter fields that are displayd in specific fields
            .filter((/**
         * @param {?} field
         * @return {?}
         */
        function (field) { return field.placeOfDisplay.specificFields; }))
            // sort fields by the position defined in the specific fields
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.placeOfDisplay.specificFields.position - b.placeOfDisplay.specificFields.position; })); })));
    };
    /**
      * pipe all the basic fields of a class,
      * ordered by the position of the field within the basic fields
      */
    // @spyTag
    /**
     * pipe all the basic fields of a class,
     * ordered by the position of the field within the basic fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeBasicFieldsOfClass = /**
     * pipe all the basic fields of a class,
     * ordered by the position of the field within the basic fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return this.pipeFields(pkClass).pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        function (fields) { return fields
            // filter fields that are displayd in basic fields
            .filter((/**
         * @param {?} field
         * @return {?}
         */
        function (field) { return field.placeOfDisplay.basicFields; }))
            // sort fields by the position defined in the basic fields
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a.placeOfDisplay.basicFields.position - b.placeOfDisplay.basicFields.position; })); })));
    };
    /**
       * Pipes the fields for temporal entity forms
       * - the specific fields
       * - the when field
       * - if available: the type field
       */
    // @spyTag
    /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeFieldsForTeEnForm = /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return this.pipeFields(pkClass).pipe(
        // filter fields that are displayd in specific fields
        map((/**
         * @param {?} allFields
         * @return {?}
         */
        function (allFields) {
            /** @type {?} */
            var fields = allFields
                // filter fields that are displayd in specific fields
                .filter((/**
             * @param {?} field
             * @return {?}
             */
            function (field) { return field.placeOfDisplay.specificFields; }))
                // sort fields by the position defined in the specific fields
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return a.placeOfDisplay.specificFields.position - a.placeOfDisplay.specificFields.position; }));
            /** @type {?} */
            var whenField = allFields.find((/**
             * @param {?} field
             * @return {?}
             */
            function (field) { return field.property.pkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN; }));
            if (whenField)
                fields.push(whenField);
            /** @type {?} */
            var typeField = allFields.find((/**
             * @param {?} field
             * @return {?}
             */
            function (field) { return field.isHasTypeField; }));
            if (typeField)
                fields.push(typeField);
            return fields;
        })));
    };
    /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     */
    // @spyTag
    /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeBasicAndSpecificFields = /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return combineLatest(this.pipeBasicFieldsOfClass(pkClass), this.pipeSpecificFieldOfClass(pkClass))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), a = _b[0], b = _b[1];
            return tslib_1.__spread(a, b);
        })));
    };
    /**
    * Pipes the fields of given class in this order:
    * - specific fields
    * - basic fields
    */
    // @spyTag
    /**
     * Pipes the fields of given class in this order:
     * - specific fields
     * - basic fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSpecificAndBasicFields = /**
     * Pipes the fields of given class in this order:
     * - specific fields
     * - basic fields
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        return combineLatest(this.pipeSpecificFieldOfClass(pkClass), this.pipeBasicFieldsOfClass(pkClass))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), a = _b[0], b = _b[1];
            return tslib_1.__spread(a, b);
        })));
    };
    /**
     * @private
     * @param {?} properties
     * @param {?} isOutgoing
     * @param {?} enabledProfiles
     * @param {?} sysConfig
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipePropertiesToSubfields = /**
     * @private
     * @param {?} properties
     * @param {?} isOutgoing
     * @param {?} enabledProfiles
     * @param {?} sysConfig
     * @return {?}
     */
    function (properties, isOutgoing, enabledProfiles, sysConfig) {
        var _this = this;
        return combineLatestOrEmpty(properties.map((/**
         * @param {?} p
         * @return {?}
         */
        function (p) {
            /** @type {?} */
            var o = isOutgoing;
            /** @type {?} */
            var targetClass = o ? p.has_range : p.has_domain;
            /** @type {?} */
            var sourceClass = o ? p.has_domain : p.has_range;
            /** @type {?} */
            var targetMaxQuantity = o ?
                p.range_instances_max_quantifier :
                p.domain_instances_max_quantifier;
            /** @type {?} */
            var sourceMaxQuantity = o ?
                p.domain_instances_max_quantifier :
                p.range_instances_max_quantifier;
            /** @type {?} */
            var targetMinQuantity = o ?
                p.range_instances_min_quantifier :
                p.domain_instances_min_quantifier;
            /** @type {?} */
            var sourceMinQuantity = o ?
                p.domain_instances_min_quantifier :
                p.range_instances_min_quantifier;
            return combineLatest(_this.pipeClassLabel(sourceClass), _this.pipeClassLabel(targetClass), _this.pipeSubfieldTypeOfClass(sysConfig, targetClass, targetMaxQuantity), _this.pipeFieldLabel(p.pk_property, isOutgoing ? p.has_domain : null, isOutgoing ? null : p.has_range)).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = tslib_1.__read(_a, 4), sourceClassLabel = _b[0], targetClassLabel = _b[1], listType = _b[2], label = _b[3];
                /** @type {?} */
                var node = {
                    listType: listType,
                    sourceClass: sourceClass,
                    sourceClassLabel: sourceClassLabel,
                    sourceMaxQuantity: sourceMaxQuantity,
                    sourceMinQuantity: sourceMinQuantity,
                    targetClass: targetClass,
                    targetClassLabel: targetClassLabel,
                    targetMinQuantity: targetMinQuantity,
                    targetMaxQuantity: targetMaxQuantity,
                    label: label,
                    isHasTypeField: o && p.is_has_type_subproperty,
                    property: { pkProperty: p.pk_property },
                    isOutgoing: o,
                    identityDefiningForSource: o ? p.identity_defining : false,
                    // replace false with p.identity_defining_for_range when available
                    identityDefiningForTarget: o ? false : p.identity_defining,
                    // replace false with p.identity_defining_for_range when available
                    ontoInfoLabel: p.identifier_in_namespace,
                    ontoInfoUrl: 'https://ontome.dataforhistory.org/property/' + p.pk_property,
                    removedFromAllProfiles: isRemovedFromAllProfiles(enabledProfiles, (p.profiles || [])),
                };
                return node;
            })));
        })));
    };
    /**
     * Pipes the type of Subfield for a given class
     * Currently (to be revised if good) sublcasses of E55 Type,
     * that are the target of a field with targetMaxQantity=1,
     * get Subfield type 'hasType'.
     * Therefore targetMaxQuantity is needed.
     *
     * This behavior has to be revised, because it can lead to problems
     * when the Subfield belongs to a Field with multiple target classes
     * (and thus Subfields) because the UI then does not allow to choose
     * the right target class.
     */
    // @spyTag
    /**
     * Pipes the type of Subfield for a given class
     * Currently (to be revised if good) sublcasses of E55 Type,
     * that are the target of a field with targetMaxQantity=1,
     * get Subfield type 'hasType'.
     * Therefore targetMaxQuantity is needed.
     *
     * This behavior has to be revised, because it can lead to problems
     * when the Subfield belongs to a Field with multiple target classes
     * (and thus Subfields) because the UI then does not allow to choose
     * the right target class.
     * @param {?} config
     * @param {?} pkClass
     * @param {?} targetMaxQuantity
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSubfieldTypeOfClass = /**
     * Pipes the type of Subfield for a given class
     * Currently (to be revised if good) sublcasses of E55 Type,
     * that are the target of a field with targetMaxQantity=1,
     * get Subfield type 'hasType'.
     * Therefore targetMaxQuantity is needed.
     *
     * This behavior has to be revised, because it can lead to problems
     * when the Subfield belongs to a Field with multiple target classes
     * (and thus Subfields) because the UI then does not allow to choose
     * the right target class.
     * @param {?} config
     * @param {?} pkClass
     * @param {?} targetMaxQuantity
     * @return {?}
     */
    // @spyTag
    function (config, pkClass, targetMaxQuantity) {
        return this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return !!i; })), map((/**
         * @param {?} klass
         * @return {?}
         */
        function (klass) { return getSubfieldType(config, klass, targetMaxQuantity); })));
    };
    /**
     * Gets class field configs of given pkClass
     *
     * - of active project, if any, else
     * - of default config project, else
     * - empty array
     *
     */
    // @spyTag
    /**
     * Gets class field configs of given pkClass
     *
     * - of active project, if any, else
     * - of default config project, else
     * - empty array
     *
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeFieldConfigs = /**
     * Gets class field configs of given pkClass
     *
     * - of active project, if any, else
     * - of default config project, else
     * - empty array
     *
     * @param {?} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} fkProject
         * @return {?}
         */
        function (fkProject) {
            /** @type {?} */
            var activeProjectkey = proClassFieldConfgByProjectAndClassKey({
                fk_class_for_class_field: pkClass,
                fk_project: fkProject
            });
            /** @type {?} */
            var defaultProjectkey = proClassFieldConfgByProjectAndClassKey({
                fk_class_for_class_field: pkClass,
                fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT
            });
            return combineLatest(_this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(activeProjectkey), _this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(defaultProjectkey))
                .pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = tslib_1.__read(_a, 2), activeProjectFields = _b[0], defaultProjectFields = _b[1];
                if (activeProjectFields && values(activeProjectFields).length)
                    return activeProjectFields;
                return defaultProjectFields;
            })), map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) { return values(items).sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            function (a, b) { return (a.ord_num > b.ord_num ? 1 : -1); })); })));
        })));
    };
    /********************************************** */
    /**
     * Delivers class label for active project
     */
    // @spyTag
    /********************************************** */
    /**
     * Delivers class label for active project
     * @param {?=} pkClass
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeClassLabel = /********************************************** */
    /**
     * Delivers class label for active project
     * @param {?=} pkClass
     * @return {?}
     */
    // @spyTag
    function (pkClass) {
        var _this = this;
        return combineLatest(this.a.pkProject$, this.a.pipeActiveDefaultLanguage()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), fkProject = _b[0], language = _b[1];
            return _this.pipeLabels({ pkClass: pkClass, fkProject: fkProject, language: language, type: 'label' })
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                /** @type {?} */
                var i = items.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return !!item; }));
                return i ? i.text : "* no label (id: " + pkClass + ") *";
            })));
        })));
    };
    /**
     * Delivers array of objects with
     * text ~ the text of the property
     * origin, in this order:
     * - origin == 'of project in project lang'         (from projects.text_property)
     * - origin == 'of default project in project lang' (from projects.text_property)
     * - origin == 'of default project in english'      (from projects.text_property)
     * - origin == 'of ontome in project lang'          (from data_for_history.label)
     * - origin == 'of ontome in english'               (from data_for_history.label)
     */
    // @spyTag
    /**
     * Delivers array of objects with
     * text ~ the text of the property
     * origin, in this order:
     * - origin == 'of project in project lang'         (from projects.text_property)
     * - origin == 'of default project in project lang' (from projects.text_property)
     * - origin == 'of default project in english'      (from projects.text_property)
     * - origin == 'of ontome in project lang'          (from data_for_history.label)
     * - origin == 'of ontome in english'               (from data_for_history.label)
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeLabels = /**
     * Delivers array of objects with
     * text ~ the text of the property
     * origin, in this order:
     * - origin == 'of project in project lang'         (from projects.text_property)
     * - origin == 'of default project in project lang' (from projects.text_property)
     * - origin == 'of default project in english'      (from projects.text_property)
     * - origin == 'of ontome in project lang'          (from data_for_history.label)
     * - origin == 'of ontome in english'               (from data_for_history.label)
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    function (d) {
        /** @type {?} */
        var fk_system_type;
        if (d.pkClass) {
            switch (d.type) {
                case 'label':
                    fk_system_type = SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL;
                    break;
                default:
                    console.warn('fk_system_type not found');
                    break;
            }
        }
        else if (d.fkProperty) {
            switch (d.type) {
                case 'label':
                    fk_system_type = SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL;
                    break;
                default:
                    console.warn('fk_system_type not found');
                    break;
            }
        }
        return combineLatest(
        // label of project in default language of project
        this.pipeProTextProperty({
            fk_project: d.fkProject,
            fk_language: d.language.pk_entity,
            fk_system_type: fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of project in project lang';
            return { origin: origin, text: item.string };
        }))), 
        // label of default project
        this.pipeProTextProperty({
            fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
            fk_language: d.language.pk_entity,
            fk_system_type: fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of default project in project lang';
            return { origin: origin, text: item.string };
        }))), 
        // label of default project
        this.pipeProTextProperty({
            fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
            fk_language: 18889,
            fk_system_type: fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of default project in english';
            return { origin: origin, text: item.string };
        }))), 
        // label from ontome in default language of project
        this.pipeDfhLabel({
            language: d.language.iso6391.trim(),
            type: 'label',
            fk_class: d.pkClass,
            fk_property: d.fkProperty
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of ontome in project lang';
            return { origin: origin, text: item.label };
        }))), 
        // label from ontome in english
        this.pipeDfhLabel({
            language: 'en',
            type: 'label',
            fk_class: d.pkClass,
            fk_property: d.fkProperty
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item)
                return undefined;
            /** @type {?} */
            var origin = 'of ontome in english';
            return { origin: origin, text: item.label };
        }))));
    };
    /**
     * Pipes ProTextProperty
     */
    // @spyTag
    /**
     * Pipes ProTextProperty
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeProTextProperty = /**
     * Pipes ProTextProperty
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    function (d) {
        /** @type {?} */
        var key = textPropertyByFksKey(d);
        return this.s.pro$.text_property$.by_fks$.key(key);
    };
    /**
     * Pipes DfhLabel
     */
    // @spyTag
    /**
     * Pipes DfhLabel
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeDfhLabel = /**
     * Pipes DfhLabel
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    function (d) {
        /** @type {?} */
        var key = dfhLabelByFksKey(d);
        return this.s.dfh$.label$.by_fks$.key(key);
    };
    /**
     * Delivers best fitting field label for active project
    */
    // @spyTag
    /**
     * Delivers best fitting field label for active project
     * @param {?} fkProperty
     * @param {?} fkPropertyDomain
     * @param {?} fkPropertyRange
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeFieldLabel = /**
     * Delivers best fitting field label for active project
     * @param {?} fkProperty
     * @param {?} fkPropertyDomain
     * @param {?} fkPropertyRange
     * @return {?}
     */
    // @spyTag
    function (fkProperty, fkPropertyDomain, fkPropertyRange) {
        var _this = this;
        /** @type {?} */
        var isOutgoing = !!fkPropertyDomain;
        // const system_type = isOutgoing ? (singular ? 180 : 181) : (singular ? 182 : 183)
        return combineLatest(this.a.pkProject$, this.a.pipeActiveDefaultLanguage()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), fkProject = _b[0], language = _b[1];
            return _this.pipeLabels({
                fkProject: fkProject,
                type: 'label',
                language: language,
                fkProperty: fkProperty,
                fkPropertyDomain: fkPropertyDomain,
                fkPropertyRange: fkPropertyRange
            })
                .pipe(map((/**
             * @param {?} items
             * @return {?}
             */
            function (items) {
                /** @type {?} */
                var label = "* no label (id: " + fkProperty + ") *";
                items.some((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) {
                    if (item &&
                        (item.origin === 'of project in project lang' ||
                            item.origin === 'of default project in project lang' ||
                            item.origin === 'of default project in english')) {
                        label = item.text;
                        return true;
                    }
                    else if (item &&
                        (item.origin === 'of ontome in project lang' ||
                            item.origin === 'of ontome in english')) {
                        label = isOutgoing ? item.text : '* reverse of: ' + item.text + '*';
                        return true;
                    }
                }));
                return label;
            })));
        })));
    };
    /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     */
    // @spyTag
    /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     * @param {?} targetClassPk
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTableNameOfClass = /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     * @param {?} targetClassPk
     * @return {?}
     */
    // @spyTag
    function (targetClassPk) {
        return combineLatest(this.s.sys$.config$.main$, this.s.dfh$.class$.by_pk_class$.key(targetClassPk)).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return !i.includes(undefined); })), map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), config = _b[0], klass = _b[1];
            /** @type {?} */
            var classConfig = config.classes[targetClassPk];
            if (classConfig && classConfig.valueObjectType) {
                /** @type {?} */
                var keys = Object.keys(classConfig.valueObjectType);
                if (classConfig.valueObjectType.appellation)
                    return;
                /** @type {?} */
                var key = keys[0];
                if (classConfig.valueObjectType.appellation)
                    return 'appellation';
                else if (classConfig.valueObjectType.language)
                    return 'language';
                else if (classConfig.valueObjectType.place)
                    return 'place';
                else if (classConfig.valueObjectType.timePrimitive)
                    return 'time_primitive';
                else if (classConfig.valueObjectType.langString)
                    return 'lang_string';
                else if (classConfig.valueObjectType.dimension)
                    return 'dimension';
                else {
                    console.warn('unsupported list type');
                }
            }
            else if (klass.basic_type === 8 || klass.basic_type === 30) {
                return 'persistent_item';
            }
            else {
                return 'temporal_entity';
            }
        })));
    };
    /**
     * returns an object where the keys are the pks of the Classes
     * used by the given project:
     * - or because the class is enabled by class_proj_rel
     * - or because the class is required by sources
     *
     * This is usefull to create select dropdowns of classes users will know
     */
    // @spyTag
    /**
     * returns an object where the keys are the pks of the Classes
     * used by the given project:
     * - or because the class is enabled by class_proj_rel
     * - or because the class is required by sources
     *
     * This is usefull to create select dropdowns of classes users will know
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeClassesInEntitiesOrSources = /**
     * returns an object where the keys are the pks of the Classes
     * used by the given project:
     * - or because the class is enabled by class_proj_rel
     * - or because the class is required by sources
     *
     * This is usefull to create select dropdowns of classes users will know
     * @return {?}
     */
    // @spyTag
    function () {
        return combineLatest(this.pipeClassesEnabledInEntities(), this.pipeClassesRequiredBySources()).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), a = _b[0], b = _b[1];
            return indexBy((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.toString(); }), uniq(tslib_1.__spread(a, b)));
        })), startWith({}));
    };
    // @spyTag
    // @spyTag
    /**
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeClassesRequiredBySources = 
    // @spyTag
    /**
     * @return {?}
     */
    function () {
        return this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
            .pipe(map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return values(c).map((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return k.fk_class; })); })));
    };
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     */
    // @spyTag
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeClassesEnabledByProjectProfiles = /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    function () {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return combineLatest([
            _this.s.dfh$.class$.by_pk_class$.all$,
            _this.pipeProfilesEnabledByProject()
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), classesByPk = _b[0], enabledProfiles = _b[1];
            /** @type {?} */
            var profilesMap = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.toString(); }), values(enabledProfiles));
            return values(classesByPk)
                .filter((/**
             * @param {?} klass
             * @return {?}
             */
            function (klass) { return klass.profiles.some((/**
             * @param {?} profile
             * @return {?}
             */
            function (profile) { return profilesMap[profile.fk_profile]; })); }));
        }))); })));
    };
    /**
    * returns observable number[] wher the numbers are the pk_class
    * of all type classes that are enabled by at least one of the activated profiles
    * of thte given project
    */
    // @spyTag
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all type classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTypeClassesEnabledByProjectProfiles = /**
     * returns observable number[] wher the numbers are the pk_class
     * of all type classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    function () {
        return combineLatest([
            this.s.dfh$.class$.by_basic_type$.key(30),
            this.pipeProfilesEnabledByProject()
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), classesByPk = _b[0], enabledProfiles = _b[1];
            /** @type {?} */
            var profilesMap = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.toString(); }), values(enabledProfiles));
            return values(classesByPk)
                .filter((/**
             * @param {?} klass
             * @return {?}
             */
            function (klass) {
                return klass.profiles.some((/**
                 * @param {?} profile
                 * @return {?}
                 */
                function (profile) { return profilesMap[profile.fk_profile]; })) &&
                    // Exclude Manifestation product type and language
                    ![
                        DfhConfig.CLASS_PK_LANGUAGE,
                        DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE
                    ].includes(klass.pk_class);
            }));
        })));
    };
    /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     */
    // @spyTag
    /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeClassesEnabledInEntities = /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     * @return {?}
     */
    // @spyTag
    function () {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return _this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
            .pipe(map((/**
         * @param {?} rels
         * @return {?}
         */
        function (rels) { return values(rels).map((/**
         * @param {?} rel
         * @return {?}
         */
        function (rel) { return rel.fk_class; })); }))); })));
    };
    /**
    * returns an object where the keys are the pks of the TeEn Classes
    * used by the given project
    */
    // @spyTag
    /**
     * returns an object where the keys are the pks of the TeEn Classes
     * used by the given project
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSelectedTeEnClassesInProject = /**
     * returns an object where the keys are the pks of the TeEn Classes
     * used by the given project
     * @return {?}
     */
    // @spyTag
    function () {
        return combineLatest(this.pipeTeEnClassesEnabledInEntities(), this.pipeTeEnClassesRequiredBySources()).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 2), a = _b[0], b = _b[1];
            return indexBy((/**
             * @param {?} x
             * @return {?}
             */
            function (x) { return x.toString(); }), uniq(tslib_1.__spread(a, b)));
        })), startWith({}));
    };
    /**
     * Gets array of pk_class with teEn classes enabled in entities
     */
    // @spyTag
    /**
     * Gets array of pk_class with teEn classes enabled in entities
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTeEnClassesEnabledInEntities = /**
     * Gets array of pk_class with teEn classes enabled in entities
     * @return {?}
     */
    // @spyTag
    function () {
        var _this = this;
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        function (pkProject) { return _this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
            .pipe(switchMap((/**
         * @param {?} cs
         * @return {?}
         */
        function (cs) { return combineLatest(values(cs).map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return _this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !!item; }))); }))).pipe(map((/**
         * @param {?} dfhClasses
         * @return {?}
         */
        function (dfhClasses) { return _this.filterTeEnCasses(dfhClasses); }))); }))); })));
    };
    /**
     * Filters array of DfhClass for TeEn Classes and returns array of pk_class
     * @param dfhClasses array of DfhClass
     * @returns returns array of pk_class where class is TeEn class
     */
    /**
     * Filters array of DfhClass for TeEn Classes and returns array of pk_class
     * @private
     * @param {?} dfhClasses array of DfhClass
     * @return {?} returns array of pk_class where class is TeEn class
     */
    ConfigurationPipesService.prototype.filterTeEnCasses = /**
     * Filters array of DfhClass for TeEn Classes and returns array of pk_class
     * @private
     * @param {?} dfhClasses array of DfhClass
     * @return {?} returns array of pk_class where class is TeEn class
     */
    function (dfhClasses) {
        /** @type {?} */
        var pks = [];
        for (var i = 0; i < dfhClasses.length; i++) {
            /** @type {?} */
            var c = dfhClasses[i];
            if (c.basic_type === 9)
                pks.push(c.pk_class);
        }
        return pks;
    };
    /**
     * Gets array of pk_class with teEn classes required by sources
     */
    // @spyTag
    /**
     * Gets array of pk_class with teEn classes required by sources
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTeEnClassesRequiredBySources = /**
     * Gets array of pk_class with teEn classes required by sources
     * @return {?}
     */
    // @spyTag
    function () {
        var _this = this;
        return this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
            .pipe(switchMap((/**
         * @param {?} cs
         * @return {?}
         */
        function (cs) { return combineLatest(values(cs).map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return _this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return !!item; }))); }))).pipe(map((/**
         * @param {?} dfhClasses
         * @return {?}
         */
        function (dfhClasses) {
            return _this.filterTeEnCasses(dfhClasses);
        }))); })));
    };
    /**
     *
     */
    // @spyTag
    /**
     *
     * @param {?=} enabledIn
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeTypeAndTypedClasses = /**
     *
     * @param {?=} enabledIn
     * @return {?}
     */
    // @spyTag
    function (enabledIn) {
        var _this = this;
        /** @type {?} */
        var pks$;
        /** @type {?} */
        var fromSources$ = this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true').pipe(map((/**
         * @param {?} classes
         * @return {?}
         */
        function (classes) { return values(classes).map((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return k.fk_class; })); })));
        /** @type {?} */
        var fromEntities$ = this.pipeClassesEnabledInEntities();
        if (enabledIn === 'sources') {
            pks$ = [fromSources$];
        }
        else if (enabledIn === 'entities') {
            pks$ = [fromEntities$];
        }
        else {
            pks$ = [fromSources$, fromEntities$];
        }
        return combineLatest(pks$).pipe(map((/**
         * @param {?} arrayOfPkArrays
         * @return {?}
         */
        function (arrayOfPkArrays) { return uniq(flatten(arrayOfPkArrays)); })), switchMap((/**
         * @param {?} pks
         * @return {?}
         */
        function (pks) { return _this.pipeTypeAndTypedClassesOfTypedClasses(pks); })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkTypedClasses
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypeAndTypedClassesOfTypedClasses = 
    // @spyTag
    /**
     * @param {?} pkTypedClasses
     * @return {?}
     */
    function (pkTypedClasses) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        function (allHasTypeProps) {
            /** @type {?} */
            var byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.has_domain.toString(); }), values(allHasTypeProps));
            return pkTypedClasses.map((/**
             * @param {?} pk
             * @return {?}
             */
            function (pk) { return ({
                typedClass: pk,
                typeClass: byDomain[pk] ? byDomain[pk].has_range : undefined
            }); }));
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypeClassOfTypedClass = 
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    function (pkTypedClass) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        function (allHasTypeProps) {
            /** @type {?} */
            var byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.has_domain.toString(); }), values(allHasTypeProps));
            return byDomain[pkTypedClass] ? byDomain[pkTypedClass].has_range : undefined;
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkTypeClasses
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypedClassesOfTypeClasses = 
    // @spyTag
    /**
     * @param {?} pkTypeClasses
     * @return {?}
     */
    function (pkTypeClasses) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        function (allHasTypeProps) {
            /** @type {?} */
            var byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return k.has_range.toString(); }), values(allHasTypeProps));
            return pkTypeClasses.map((/**
             * @param {?} pk
             * @return {?}
             */
            function (pk) { return byDomain[pk] ? byDomain[pk].has_domain : undefined; }));
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypePropertyOfTypedClass = 
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    function (pkTypedClass) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        function (allHasTypeProps) {
            /** @type {?} */
            var typeProp = values(allHasTypeProps).find((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p.has_domain === pkTypedClass; }));
            return typeProp ? typeProp.pk_property : undefined;
        })));
    };
    // @spyTag
    // @spyTag
    /**
     * @param {?} pkProperties
     * @param {?} isOutgoing
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTargetClassesOfProperties = 
    // @spyTag
    /**
     * @param {?} pkProperties
     * @param {?} isOutgoing
     * @return {?}
     */
    function (pkProperties, isOutgoing) {
        return this.s.dfh$.property$.by_pk_property$.all$.pipe(map((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            if (!pkProperties || !pkProperties.length)
                return [];
            /** @type {?} */
            var res = [];
            /** @type {?} */
            var targetClasses = {};
            pkProperties.forEach((/**
             * @param {?} pkProp
             * @return {?}
             */
            function (pkProp) {
                /** @type {?} */
                var props = values(x[pkProp]);
                props.forEach((/**
                 * @param {?} prop
                 * @return {?}
                 */
                function (prop) {
                    /** @type {?} */
                    var targetClass = isOutgoing ? prop.has_range : prop.has_domain;
                    if (!targetClasses[targetClass]) {
                        targetClasses[targetClass] = true;
                        res.push(targetClass);
                    }
                }));
            }));
            return res;
        })));
    };
    ConfigurationPipesService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    ConfigurationPipesService.ctorParameters = function () { return [
        { type: ActiveProjectPipesService },
        { type: SchemaSelectorsService }
    ]; };
    /** @nocollapse */ ConfigurationPipesService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ConfigurationPipesService_Factory() { return new ConfigurationPipesService(i0.ɵɵinject(i1.ActiveProjectPipesService), i0.ɵɵinject(i2.SchemaSelectorsService)); }, token: ConfigurationPipesService, providedIn: "root" });
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeProfilesEnabledByProject", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFields", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSpecificFieldOfClass", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeBasicFieldsOfClass", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFieldsForTeEnForm", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeBasicAndSpecificFields", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSpecificAndBasicFields", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array, Boolean, Array, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipePropertiesToSubfields", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSubfieldTypeOfClass", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFieldConfigs", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeClassLabel", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeLabels", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeProTextProperty", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeDfhLabel", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFieldLabel", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTableNameOfClass", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeClassesInEntitiesOrSources", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConfigurationPipesService.prototype, "pipeClassesRequiredBySources", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeClassesEnabledByProjectProfiles", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypeClassesEnabledByProjectProfiles", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConfigurationPipesService.prototype, "pipeClassesEnabledInEntities", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSelectedTeEnClassesInProject", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConfigurationPipesService.prototype, "pipeTeEnClassesEnabledInEntities", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConfigurationPipesService.prototype, "pipeTeEnClassesRequiredBySources", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypeAndTypedClasses", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypeAndTypedClassesOfTypedClasses", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypeClassOfTypedClass", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypedClassesOfTypeClasses", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypePropertyOfTypedClass", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array, Boolean]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTargetClassesOfProperties", null);
    return ConfigurationPipesService;
}());
export { ConfigurationPipesService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    ConfigurationPipesService.prototype.a;
    /**
     * @type {?}
     * @private
     */
    ConfigurationPipesService.prototype.s;
}
/**
 * @param {?} config
 * @param {?} klass
 * @param {?} targetMaxQuantity
 * @return {?}
 */
function getSubfieldType(config, klass, targetMaxQuantity) {
    /** @type {?} */
    var classConfig;
    if (config)
        classConfig = config.classes[klass.pk_class];
    if (classConfig && classConfig.valueObjectType) {
        return classConfig.valueObjectType;
    }
    else if (klass.basic_type === 30 && targetMaxQuantity == 1) {
        return { typeItem: 'true' };
    }
    else if (klass.basic_type === 8 || klass.basic_type === 30) {
        return { entityPreview: 'true' };
    }
    else {
        return { temporalEntity: 'true' };
    }
}
/**
 * @param {?} domainClass
 * @return {?}
 */
function createHasDefinitionProperty(domainClass) {
    /** @type {?} */
    var profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    var hasDefinition = {
        has_domain: domainClass,
        pk_property: DfhConfig.PROPERTY_PK_P18_HAS_DEFINITION,
        has_range: 785,
        domain_instances_max_quantifier: -1,
        domain_instances_min_quantifier: 1,
        range_instances_max_quantifier: 1,
        range_instances_min_quantifier: 1,
        identifier_in_namespace: 'P18',
        identity_defining: false,
        is_inherited: true,
        is_has_type_subproperty: false,
        profiles: profiles
    };
    return hasDefinition;
}
/**
 * @param {?} rangeClass
 * @return {?}
 */
function createAppellationProperty(rangeClass) {
    /** @type {?} */
    var profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    var hasAppeProp = {
        has_domain: DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE,
        pk_property: DfhConfig.PROPERTY_PK_IS_APPELLATION_OF,
        has_range: rangeClass,
        domain_instances_max_quantifier: -1,
        domain_instances_min_quantifier: 0,
        range_instances_max_quantifier: 1,
        range_instances_min_quantifier: 1,
        identifier_in_namespace: 'histP9',
        identity_defining: true,
        is_inherited: true,
        is_has_type_subproperty: false,
        profiles: profiles
    };
    return hasAppeProp;
}
/**
 * @param {?} domainClass
 * @return {?}
 */
function createHasTimeSpanProperty(domainClass) {
    /** @type {?} */
    var profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    var hasAppeProp = {
        has_domain: domainClass,
        pk_property: DfhConfig.PROPERTY_PK_HAS_TIME_SPAN,
        has_range: DfhConfig.ClASS_PK_TIME_SPAN,
        domain_instances_max_quantifier: 1,
        domain_instances_min_quantifier: 1,
        range_instances_max_quantifier: 1,
        range_instances_min_quantifier: 0,
        identifier_in_namespace: 'P4',
        identity_defining: false,
        is_inherited: true,
        is_has_type_subproperty: false,
        profiles: profiles
    };
    return hasAppeProp;
}
/**
 * @param {?} enabledProfiles
 * @param {?} profiles
 * @return {?}
 */
function isRemovedFromAllProfiles(enabledProfiles, profiles) {
    return !profiles.some((/**
     * @param {?} p
     * @return {?}
     */
    function (p) { return p.removed_from_api === false && enabledProfiles.includes(p.fk_profile); }));
}
/**
 * @param {?} specialFields
 * @param {?} subfield
 * @param {?=} projectFieldConfig
 * @return {?}
 */
function getPlaceOfDisplay(specialFields, subfield, projectFieldConfig) {
    /** @type {?} */
    var settings;
    settings = getSettingsFromSysConfig(subfield, specialFields, settings);
    // if this is a special field, create corresponding display settings and return it
    if (settings) {
        if (settings.displayInBasicFields) {
            return { basicFields: { position: settings.displayInBasicFields.position } };
        }
        else if (settings.hidden) {
            return { hidden: true };
        }
    }
    // otherwise display the field in specific fields (default)
    /** @type {?} */
    var position = Number.POSITIVE_INFINITY;
    if (projectFieldConfig)
        position = projectFieldConfig.ord_num;
    return { specificFields: { position: position } };
}
/**
 * @param {?} subfield
 * @param {?} specialFields
 * @param {?} settings
 * @return {?}
 */
function getSettingsFromSysConfig(subfield, specialFields, settings) {
    if (subfield.isOutgoing) {
        // get settings by has-type-subproperty
        if (subfield.isHasTypeField &&
            specialFields.hasTypeSubproperties) {
            settings = specialFields.hasTypeSubproperties;
        }
        // get settings by source class and property
        else if (specialFields.bySourceClass &&
            specialFields.bySourceClass[subfield.sourceClass] &&
            specialFields.bySourceClass[subfield.sourceClass].outgoingProperties &&
            specialFields.bySourceClass[subfield.sourceClass].outgoingProperties[subfield.property.pkProperty]) {
            settings = specialFields.bySourceClass[subfield.sourceClass].outgoingProperties[subfield.property.pkProperty];
        }
        // get seetings by property
        else if (specialFields.outgoingProperties &&
            specialFields.outgoingProperties[subfield.property.pkProperty]) {
            settings = specialFields.outgoingProperties[subfield.property.pkProperty];
        }
    }
    else {
        // get settings by source class and property
        if (specialFields.bySourceClass &&
            specialFields.bySourceClass[subfield.sourceClass] &&
            specialFields.bySourceClass[subfield.sourceClass].incomingProperties &&
            specialFields.bySourceClass[subfield.sourceClass].incomingProperties[subfield.property.pkProperty]) {
            settings = specialFields.bySourceClass[subfield.sourceClass].incomingProperties[subfield.property.pkProperty];
        }
        // get seetings by property
        else if (specialFields.incomingProperties &&
            specialFields.incomingProperties[subfield.property.pkProperty]) {
            settings = specialFields.incomingProperties[subfield.property.pkProperty];
        }
    }
    return settings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU14RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQU1wRSx1Q0FHQzs7O0lBREMsbURBQStCOztBQVVqQztJQWNFLG1DQUNVLENBQTRCLEVBQzVCLENBQXlCO1FBRHpCLE1BQUMsR0FBRCxDQUFDLENBQTJCO1FBQzVCLE1BQUMsR0FBRCxDQUFDLENBQXdCO0lBQy9CLENBQUM7SUFHTDs7OztNQUlFO0lBQ0YsVUFBVTs7Ozs7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QUFDLGtCQUFrQjtZQUN2QyxhQUFhLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNoRSxRQUFRLEdBQUcsYUFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0U7S0FDRjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaENvbmZpZywgUHJvQ29uZmlnLCBTeXNDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBkZmhMYWJlbEJ5RmtzS2V5LCBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSwgdGV4dFByb3BlcnR5QnlGa3NLZXkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IENsYXNzQ29uZmlnLCBEZmhDbGFzcywgRGZoTGFiZWwsIERmaFByb3BlcnR5LCBJbmZMYW5ndWFnZSwgUHJvQ2xhc3NGaWVsZENvbmZpZywgUHJvVGV4dFByb3BlcnR5LCBSZWxhdGVkUHJvZmlsZSwgU3lzQ29uZmlnRmllbGREaXNwbGF5LCBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBTeXNDb25maWdWYWx1ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0T3JFbXB0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgZmxhdHRlbiwgaW5kZXhCeSwgdW5pcSwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkJztcbmltcG9ydCB7IEZpZWxkUGxhY2VPZkRpc3BsYXkgfSBmcm9tICcuLi9tb2RlbHMvRmllbGRQb3NpdGlvbic7XG5pbXBvcnQgeyBTcGVjaWFsRmllbGRUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL1NwZWNpYWxGaWVsZFR5cGUnO1xuaW1wb3J0IHsgU3ViZmllbGQgfSBmcm9tICcuLi9tb2RlbHMvU3ViZmllbGQnO1xuaW1wb3J0IHsgU3ViZmllbGRUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkVHlwZSc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuLy8gdGhpcyBpcyB0aGVcbmV4cG9ydCB0eXBlIFRhYmxlTmFtZSA9ICdhcHBlbGxhdGlvbicgfCAnbGFuZ3VhZ2UnIHwgJ3BsYWNlJyB8ICd0aW1lX3ByaW1pdGl2ZScgfCAnbGFuZ19zdHJpbmcnIHwgJ2RpbWVuc2lvbicgfCAncGVyc2lzdGVudF9pdGVtJyB8ICd0ZW1wb3JhbF9lbnRpdHknXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGZoUHJvcGVydHlTdGF0dXMgZXh0ZW5kcyBEZmhQcm9wZXJ0eSB7XG4gIC8vIHRydWUsIGlmIHJlbW92ZWQgZnJvbSBhbGwgcHJvZmlsZXMgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFxuICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBib29sZWFuXG59XG5cbnR5cGUgTGFiZWxPcmlnaW4gPSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJyB8ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCdcbnR5cGUgUHJvZmlsZXMgPSB7XG4gIGZrX3Byb2ZpbGU6IG51bWJlcjtcbiAgcmVtb3ZlZF9mcm9tX2FwaTogYm9vbGVhbjtcbn1bXTtcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuLyoqXG4gKiBUaGlzIFNlcnZpY2UgcHJvdmlkZXMgYSBjb2xsZWN0aW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBjb25maWd1cmF0aW9uIGRhdGEuXG4gKiBXaGVuIHRhbGtpbmcgYWJvdXQgY29uZmlndXJhdGlvbiwgd2UgbWVhbiB0aGUgY29uY2VwdHVhbCByZWZlcmVuY2UgbW9kZWwgYW5kIHRoZSBhZGRpdGlvbmFsXG4gKiBjb25maWd1cmF0aW9ucyBvbiBzeXN0ZW0gYW5kIHByb2plY3QgbGV2ZWwuXG4gKiBGb3IgRXhhbXBsZVxuICogLSB0aGUgZmllbGRzIG9mIGEgY2xhc3NcbiAqIC0gdGhlIGxhYmVscyBvZiBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGE6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICApIHsgfVxuXG5cbiAgLyoqXG4gICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19wcm9maWxlXG4gICogb2YgYWxsIHByb2ZpbGVzIHRoYXQgYXJlIGVuYWJsZWQgYnkgdGhlIGdpdmVuIHByb2plY3QuXG4gICogVGhlIGFycmF5IHdpbGwgYWx3YXlzIGluY2x1ZGUgUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHB1YmxpYyBwaXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX3Byb2ZpbGVfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWQkXG4gICAgICAgIC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJykucGlwZShcbiAgICAgICAgICBtYXAocHJvamVjdFByb2ZpbGVSZWxzID0+IHZhbHVlcyhwcm9qZWN0UHJvZmlsZVJlbHMpXG4gICAgICAgICAgICAuZmlsdGVyKHJlbCA9PiByZWwuZW5hYmxlZClcbiAgICAgICAgICAgIC5tYXAocmVsID0+IHJlbC5ma19wcm9maWxlKVxuICAgICAgICAgICksXG4gICAgICAgICAgbWFwKGVuYWJsZWQgPT4gWy4uLmVuYWJsZWQsIERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNdKSxcbiAgICAgICAgKSksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgYWxsIGZpZWxkcyBvZiBnaXZlbiBjbGFzc1xuICAgKiBUaGUgRmllbGRzIGFyZSBub3Qgb3JkZXJlZCBhbmQgbm90IGZpbHRlcmVkXG4gICAqIElmIHlvdSB3YW50IHNwZWNpZmljIHN1YnNldHMgb2YgRmllbGRzIGFuZC9vciBvcmRlcmVkIEZpZWxkcywgdXNlIHRoZSBwaXBlc1xuICAgKiB0aGF0IGJ1aWxkIG9uIHRoaXMgcGlwZS5cbiAgICovXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUZpZWxkcyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgLy8gcGlwZSBzb3VyY2UgY2xhc3NcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLFxuICAgICAgLy8gcGlwZSBvdXRnb2luZyBwcm9wZXJ0aWVzXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX2RvbWFpbiQua2V5KHBrQ2xhc3MpLnBpcGUobWFwKGluZGV4ZWQgPT4gdmFsdWVzKGluZGV4ZWQpKSksXG4gICAgICAvLyBwaXBlIGluZ29pbmcgcHJvcGVydGllc1xuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19yYW5nZSQua2V5KHBrQ2xhc3MpLnBpcGUobWFwKGluZGV4ZWQgPT4gdmFsdWVzKGluZGV4ZWQpKSksXG4gICAgICAvLyBwaXBlIHN5cyBjb25maWdcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgIC8vIHBpcGUgZW5hYmxlZCBwcm9maWxlc1xuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCksXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbc291cmNlS2xhc3MsIG91dGdvaW5nUHJvcHMsIGluZ29pbmdQcm9wcywgc3lzQ29uZmlnLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG5cbiAgICAgICAgLy8gaWYgY2xhc3MgaXMgbm90IGFwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSwgYWRkIGFwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSAoMTExMSkgcHJvcGVydHlcbiAgICAgICAgaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbiAgICAgICAgICBpbmdvaW5nUHJvcHMucHVzaChjcmVhdGVBcHBlbGxhdGlvblByb3BlcnR5KHBrQ2xhc3MpKVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIGlzIHRlbXBvcmFsIGVudGl0eSwgYWRkIGhhcyB0aW1lIHNwYW4gcHJvcGVydHlcbiAgICAgICAgaWYgKHNvdXJjZUtsYXNzLmJhc2ljX3R5cGUgPT09IDkpIHtcbiAgICAgICAgICBvdXRnb2luZ1Byb3BzLnB1c2goY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgfVxuXG4gICAgICAgIG91dGdvaW5nUHJvcHMucHVzaChjcmVhdGVIYXNEZWZpbml0aW9uUHJvcGVydHkocGtDbGFzcykpXG5cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKG91dGdvaW5nUHJvcHMsIHRydWUsIGVuYWJsZWRQcm9maWxlcywgc3lzQ29uZmlnKSxcbiAgICAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoaW5nb2luZ1Byb3BzLCBmYWxzZSwgZW5hYmxlZFByb2ZpbGVzLCBzeXNDb25maWcpLFxuICAgICAgICAgIHRoaXMucGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKChbc3ViZmllbGRzMSwgc3ViZmllbGRzMiwgZmllbGRDb25maWdzXSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3ViZmllbGRzID0gWy4uLnN1YmZpZWxkczEsIC4uLnN1YmZpZWxkczJdXG5cbiAgICAgICAgICAgIGNvbnN0IGZpZWxkQ29uZmlnSWR4ID0gaW5kZXhCeSgoeCkgPT4gW1xuICAgICAgICAgICAgICAoeC5ma19kb21haW5fY2xhc3MgfHwgeC5ma19yYW5nZV9jbGFzcyksXG4gICAgICAgICAgICAgIHguZmtfcHJvcGVydHksXG4gICAgICAgICAgICAgICEheC5ma19kb21haW5fY2xhc3NcbiAgICAgICAgICAgIF0uam9pbignXycpLCBmaWVsZENvbmZpZ3MpXG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXFGaWVsZHM6IHsgW3VpZDogc3RyaW5nXTogRmllbGQgfSA9IHt9XG4gICAgICAgICAgICBjb25zdCB1bmlxU3ViZmllbGRDYWNoZTogeyBbdWlkOiBzdHJpbmddOiB0cnVlIH0gPSB7fVxuXG5cbiAgICAgICAgICAgIC8vIGdyb3VwIGJ5IHNvdXJjZSwgcGtQcm9wZXJ0eSBhbmQgaXNPdXRnb2luZ1xuICAgICAgICAgICAgZm9yIChjb25zdCBzIG9mIHN1YmZpZWxkcykge1xuICAgICAgICAgICAgICBjb25zdCBmaWVsZElkID0gW3Muc291cmNlQ2xhc3MsIHMucHJvcGVydHkucGtQcm9wZXJ0eSwgcy5pc091dGdvaW5nXS5qb2luKCdfJylcbiAgICAgICAgICAgICAgY29uc3Qgc3ViZmllbGRJZCA9IFtzLnNvdXJjZUNsYXNzLCBzLnByb3BlcnR5LnBrUHJvcGVydHksIHMuaXNPdXRnb2luZywgcy50YXJnZXRDbGFzc10uam9pbignXycpXG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkQ29uZmlnOiBQcm9DbGFzc0ZpZWxkQ29uZmlnIHwgdW5kZWZpbmVkID0gZmllbGRDb25maWdJZHhbZmllbGRJZF07XG4gICAgICAgICAgICAgIC8vIHRoZSBmaXJzdCB0aW1lIHRoZSBncm91cCBpcyBlc3RhYmxpc2hlZFxuICAgICAgICAgICAgICBpZiAoIXVuaXFGaWVsZHNbZmllbGRJZF0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNTcGVjaWFsRmllbGQ6IFNwZWNpYWxGaWVsZFR5cGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocy5pc0hhc1R5cGVGaWVsZCkgaXNTcGVjaWFsRmllbGQgPSAnaGFzLXR5cGUnO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMucHJvcGVydHkucGtQcm9wZXJ0eSA9PT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4pIGlzU3BlY2lhbEZpZWxkID0gJ3RpbWUtc3Bhbic7XG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXSA9IHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUNsYXNzOiBzLnNvdXJjZUNsYXNzLFxuICAgICAgICAgICAgICAgICAgc291cmNlQ2xhc3NMYWJlbDogcy5zb3VyY2VDbGFzc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgc291cmNlTWF4UXVhbnRpdHk6IHMuc291cmNlTWF4UXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICBzb3VyY2VNaW5RdWFudGl0eTogcy5zb3VyY2VNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldE1pblF1YW50aXR5OiBzLnRhcmdldE1pblF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IHMudGFyZ2V0TWF4UXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICBsYWJlbDogcy5sYWJlbCxcbiAgICAgICAgICAgICAgICAgIGlzSGFzVHlwZUZpZWxkOiBzLmlzSGFzVHlwZUZpZWxkLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IHMucHJvcGVydHksXG4gICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBzLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiBzLmlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2UsXG4gICAgICAgICAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBzLmlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQsXG4gICAgICAgICAgICAgICAgICBvbnRvSW5mb0xhYmVsOiBzLm9udG9JbmZvTGFiZWwsXG4gICAgICAgICAgICAgICAgICBvbnRvSW5mb1VybDogcy5vbnRvSW5mb1VybCxcbiAgICAgICAgICAgICAgICAgIGFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcyxcbiAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzZXM6IFtzLnRhcmdldENsYXNzXSxcbiAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uczogW3NdLFxuICAgICAgICAgICAgICAgICAgZmllbGRDb25maWcsXG4gICAgICAgICAgICAgICAgICBwbGFjZU9mRGlzcGxheTogZ2V0UGxhY2VPZkRpc3BsYXkoc3lzQ29uZmlnLnNwZWNpYWxGaWVsZHMsIHMsIGZpZWxkQ29uZmlnKSxcbiAgICAgICAgICAgICAgICAgIGlzU3BlY2lhbEZpZWxkXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbWFyayBzdWJmaWVsZCBhcyBhZGRlZFxuICAgICAgICAgICAgICAgIHVuaXFTdWJmaWVsZENhY2hlW3N1YmZpZWxkSWRdID0gdHJ1ZTtcblxuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gaWdub3JlIGR1cGxpY2F0aW9ucyBvZiBzdWJmaWVsZHNcbiAgICAgICAgICAgICAgZWxzZSBpZiAoIXVuaXFTdWJmaWVsZENhY2hlW3N1YmZpZWxkSWRdKSB7XG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID09PSBmYWxzZSA/XG4gICAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBmYWxzZSA6XG4gICAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXM7XG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS50YXJnZXRDbGFzc2VzLnB1c2gocy50YXJnZXRDbGFzcylcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmxpc3REZWZpbml0aW9ucy5wdXNoKHMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcyh1bmlxRmllbGRzKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBwaXBlIGFsbCB0aGUgc3BlY2lmaWMgZmllbGRzIG9mIGEgY2xhc3MsXG4gICAqIG9yZGVyZWQgYnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcykucGlwZShcbiAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzXG4gICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMpXG4gICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24gLSBiLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgICogcGlwZSBhbGwgdGhlIGJhc2ljIGZpZWxkcyBvZiBhIGNsYXNzLFxuICAgICogb3JkZXJlZCBieSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgYmFzaWMgZmllbGRzXG4gICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUZpZWxkcyhwa0NsYXNzKS5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHNcbiAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBiYXNpYyBmaWVsZHNcbiAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcylcbiAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIGJhc2ljIGZpZWxkc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcy5wb3NpdGlvbiAtIGIucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMucG9zaXRpb24pXG4gICAgICApXG4gICAgKVxuICB9XG5cblxuXG5cbiAgLyoqXG4gICAgICogUGlwZXMgdGhlIGZpZWxkcyBmb3IgdGVtcG9yYWwgZW50aXR5IGZvcm1zXG4gICAgICogLSB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICogLSB0aGUgd2hlbiBmaWVsZFxuICAgICAqIC0gaWYgYXZhaWxhYmxlOiB0aGUgdHlwZSBmaWVsZFxuICAgICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUZpZWxkc0ZvclRlRW5Gb3JtKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcykucGlwZShcbiAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICBtYXAoYWxsRmllbGRzID0+IHtcbiAgICAgICAgY29uc3QgZmllbGRzID0gYWxsRmllbGRzXG4gICAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzKVxuICAgICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbiAtIGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24pXG5cbiAgICAgICAgY29uc3Qgd2hlbkZpZWxkID0gYWxsRmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eSA9PT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4pXG4gICAgICAgIGlmICh3aGVuRmllbGQpIGZpZWxkcy5wdXNoKHdoZW5GaWVsZClcblxuICAgICAgICBjb25zdCB0eXBlRmllbGQgPSBhbGxGaWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pc0hhc1R5cGVGaWVsZClcbiAgICAgICAgaWYgKHR5cGVGaWVsZCkgZmllbGRzLnB1c2godHlwZUZpZWxkKVxuXG4gICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuXG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGZpZWxkcyBvZiBnaXZlbiBjbGFzcyBpbiB0aGlzIG9yZGVyOlxuICAgKiAtIGJhc2ljIGZpZWxkc1xuICAgKiAtIHNwZWNpZmljIGZpZWxkc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzcyksXG4gICAgICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzKVxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKFthLCBiXSkgPT4gWy4uLmEsIC4uLmJdKVxuICAgICAgKVxuICB9XG5cbiAgLyoqXG4gICogUGlwZXMgdGhlIGZpZWxkcyBvZiBnaXZlbiBjbGFzcyBpbiB0aGlzIG9yZGVyOlxuICAqIC0gc3BlY2lmaWMgZmllbGRzXG4gICogLSBiYXNpYyBmaWVsZHNcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNwZWNpZmljQW5kQmFzaWNGaWVsZHMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzKSxcbiAgICAgIHRoaXMucGlwZUJhc2ljRmllbGRzT2ZDbGFzcyhwa0NsYXNzKSxcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbYSwgYl0pID0+IFsuLi5hLCAuLi5iXSlcbiAgICAgIClcbiAgfVxuXG5cblxuXG5cblxuXG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHByaXZhdGUgcGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhcbiAgICBwcm9wZXJ0aWVzOiBEZmhQcm9wZXJ0eVtdLFxuICAgIGlzT3V0Z29pbmc6IGJvb2xlYW4sXG4gICAgZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSxcbiAgICBzeXNDb25maWc6IFN5c0NvbmZpZ1ZhbHVlXG4gICk6IE9ic2VydmFibGU8U3ViZmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgIHByb3BlcnRpZXMubWFwKHAgPT4ge1xuXG4gICAgICAgIGNvbnN0IG8gPSBpc091dGdvaW5nO1xuICAgICAgICBjb25zdCB0YXJnZXRDbGFzcyA9IG8gPyBwLmhhc19yYW5nZSA6IHAuaGFzX2RvbWFpbjtcbiAgICAgICAgY29uc3Qgc291cmNlQ2xhc3MgPSBvID8gcC5oYXNfZG9tYWluIDogcC5oYXNfcmFuZ2U7XG4gICAgICAgIGNvbnN0IHRhcmdldE1heFF1YW50aXR5ID0gbyA/XG4gICAgICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIgOlxuICAgICAgICAgIHAuZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjtcblxuICAgICAgICBjb25zdCBzb3VyY2VNYXhRdWFudGl0eSA9IG8gP1xuICAgICAgICAgIHAuZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllciA6XG4gICAgICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0TWluUXVhbnRpdHkgPSBvID9cbiAgICAgICAgICBwLnJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllciA6XG4gICAgICAgICAgcC5kb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZU1pblF1YW50aXR5ID0gbyA/XG4gICAgICAgICAgcC5kb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyIDpcbiAgICAgICAgICBwLnJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjtcblxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLnBpcGVDbGFzc0xhYmVsKHNvdXJjZUNsYXNzKSxcbiAgICAgICAgICB0aGlzLnBpcGVDbGFzc0xhYmVsKHRhcmdldENsYXNzKSxcbiAgICAgICAgICB0aGlzLnBpcGVTdWJmaWVsZFR5cGVPZkNsYXNzKHN5c0NvbmZpZywgdGFyZ2V0Q2xhc3MsIHRhcmdldE1heFF1YW50aXR5KSxcbiAgICAgICAgICB0aGlzLnBpcGVGaWVsZExhYmVsKFxuICAgICAgICAgICAgcC5wa19wcm9wZXJ0eSxcbiAgICAgICAgICAgIGlzT3V0Z29pbmcgPyBwLmhhc19kb21haW4gOiBudWxsLFxuICAgICAgICAgICAgaXNPdXRnb2luZyA/IG51bGwgOiBwLmhhc19yYW5nZSxcbiAgICAgICAgICApXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoKFtzb3VyY2VDbGFzc0xhYmVsLCB0YXJnZXRDbGFzc0xhYmVsLCBsaXN0VHlwZSwgbGFiZWxdKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG5vZGU6IFN1YmZpZWxkID0ge1xuICAgICAgICAgICAgICBsaXN0VHlwZSxcbiAgICAgICAgICAgICAgc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgIHNvdXJjZUNsYXNzTGFiZWwsXG4gICAgICAgICAgICAgIHNvdXJjZU1heFF1YW50aXR5LFxuICAgICAgICAgICAgICBzb3VyY2VNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgIHRhcmdldENsYXNzTGFiZWwsXG4gICAgICAgICAgICAgIHRhcmdldE1pblF1YW50aXR5LFxuICAgICAgICAgICAgICB0YXJnZXRNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICAgIGlzSGFzVHlwZUZpZWxkOiBvICYmIHAuaXNfaGFzX3R5cGVfc3VicHJvcGVydHksXG4gICAgICAgICAgICAgIHByb3BlcnR5OiB7IHBrUHJvcGVydHk6IHAucGtfcHJvcGVydHkgfSxcbiAgICAgICAgICAgICAgaXNPdXRnb2luZzogbyxcbiAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogbyA/IHAuaWRlbnRpdHlfZGVmaW5pbmcgOiBmYWxzZSwgLy8gcmVwbGFjZSBmYWxzZSB3aXRoIHAuaWRlbnRpdHlfZGVmaW5pbmdfZm9yX3JhbmdlIHdoZW4gYXZhaWxhYmxlXG4gICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IG8gPyBmYWxzZSA6IHAuaWRlbnRpdHlfZGVmaW5pbmcsIC8vIHJlcGxhY2UgZmFsc2Ugd2l0aCBwLmlkZW50aXR5X2RlZmluaW5nX2Zvcl9yYW5nZSB3aGVuIGF2YWlsYWJsZVxuICAgICAgICAgICAgICBvbnRvSW5mb0xhYmVsOiBwLmlkZW50aWZpZXJfaW5fbmFtZXNwYWNlLFxuICAgICAgICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8nICsgcC5wa19wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogaXNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzKGVuYWJsZWRQcm9maWxlcywgKHAucHJvZmlsZXMgfHwgW10pKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSB0eXBlIG9mIFN1YmZpZWxkIGZvciBhIGdpdmVuIGNsYXNzXG4gICAqIEN1cnJlbnRseSAodG8gYmUgcmV2aXNlZCBpZiBnb29kKSBzdWJsY2Fzc2VzIG9mIEU1NSBUeXBlLFxuICAgKiB0aGF0IGFyZSB0aGUgdGFyZ2V0IG9mIGEgZmllbGQgd2l0aCB0YXJnZXRNYXhRYW50aXR5PTEsXG4gICAqIGdldCBTdWJmaWVsZCB0eXBlICdoYXNUeXBlJy5cbiAgICogVGhlcmVmb3JlIHRhcmdldE1heFF1YW50aXR5IGlzIG5lZWRlZC5cbiAgICpcbiAgICogVGhpcyBiZWhhdmlvciBoYXMgdG8gYmUgcmV2aXNlZCwgYmVjYXVzZSBpdCBjYW4gbGVhZCB0byBwcm9ibGVtc1xuICAgKiB3aGVuIHRoZSBTdWJmaWVsZCBiZWxvbmdzIHRvIGEgRmllbGQgd2l0aCBtdWx0aXBsZSB0YXJnZXQgY2xhc3Nlc1xuICAgKiAoYW5kIHRodXMgU3ViZmllbGRzKSBiZWNhdXNlIHRoZSBVSSB0aGVuIGRvZXMgbm90IGFsbG93IHRvIGNob29zZVxuICAgKiB0aGUgcmlnaHQgdGFyZ2V0IGNsYXNzLlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVN1YmZpZWxkVHlwZU9mQ2xhc3MoY29uZmlnOiBTeXNDb25maWdWYWx1ZSwgcGtDbGFzczogbnVtYmVyLCB0YXJnZXRNYXhRdWFudGl0eTogbnVtYmVyKTogT2JzZXJ2YWJsZTxTdWJmaWVsZFR5cGU+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShcbiAgICAgIGZpbHRlcihpID0+ICEhaSksXG4gICAgICBtYXAoKGtsYXNzKSA9PiBnZXRTdWJmaWVsZFR5cGUoY29uZmlnLCBrbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHkpKVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldHMgY2xhc3MgZmllbGQgY29uZmlncyBvZiBnaXZlbiBwa0NsYXNzXG4gICAqXG4gICAqIC0gb2YgYWN0aXZlIHByb2plY3QsIGlmIGFueSwgZWxzZVxuICAgKiAtIG9mIGRlZmF1bHQgY29uZmlnIHByb2plY3QsIGVsc2VcbiAgICogLSBlbXB0eSBhcnJheVxuICAgKlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPFByb0NsYXNzRmllbGRDb25maWdbXT4ge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChma1Byb2plY3QpID0+IHtcblxuICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0a2V5ID0gcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXkoe1xuICAgICAgICAgIGZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZDogcGtDbGFzcyxcbiAgICAgICAgICBma19wcm9qZWN0OiBma1Byb2plY3RcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3RrZXkgPSBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSh7XG4gICAgICAgICAgZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkOiBwa0NsYXNzLFxuICAgICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1RcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5zLnBybyQuY2xhc3NfZmllbGRfY29uZmlnJC5ieV9ma19wcm9qZWN0X19ma19jbGFzcyQua2V5KGFjdGl2ZVByb2plY3RrZXkpLFxuICAgICAgICAgIHRoaXMucy5wcm8kLmNsYXNzX2ZpZWxkX2NvbmZpZyQuYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkLmtleShkZWZhdWx0UHJvamVjdGtleSlcbiAgICAgICAgKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKChbYWN0aXZlUHJvamVjdEZpZWxkcywgZGVmYXVsdFByb2plY3RGaWVsZHNdKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY3RpdmVQcm9qZWN0RmllbGRzICYmIHZhbHVlcyhhY3RpdmVQcm9qZWN0RmllbGRzKS5sZW5ndGgpIHJldHVybiBhY3RpdmVQcm9qZWN0RmllbGRzO1xuXG4gICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0UHJvamVjdEZpZWxkc1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKGl0ZW1zKSA9PiB2YWx1ZXMoaXRlbXMpLnNvcnQoKGEsIGIpID0+IChhLm9yZF9udW0gPiBiLm9yZF9udW0gPyAxIDogLTEpKSksXG4gICAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGNsYXNzIGxhYmVsIGZvciBhY3RpdmUgcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzTGFiZWwocGtDbGFzcz86IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMuYS5wa1Byb2plY3QkLFxuICAgICAgdGhpcy5hLnBpcGVBY3RpdmVEZWZhdWx0TGFuZ3VhZ2UoKVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2ZrUHJvamVjdCwgbGFuZ3VhZ2VdKSA9PiB0aGlzLnBpcGVMYWJlbHMoeyBwa0NsYXNzLCBma1Byb2plY3QsIGxhbmd1YWdlLCB0eXBlOiAnbGFiZWwnIH0pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGkgPSBpdGVtcy5maW5kKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICAgcmV0dXJuIGkgPyBpLnRleHQgOiBgKiBubyBsYWJlbCAoaWQ6ICR7cGtDbGFzc30pICpgXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBhcnJheSBvZiBvYmplY3RzIHdpdGhcbiAgICogdGV4dCB+IHRoZSB0ZXh0IG9mIHRoZSBwcm9wZXJ0eVxuICAgKiBvcmlnaW4sIGluIHRoaXMgb3JkZXI6XG4gICAqIC0gb3JpZ2luID09ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgICAgICAgICAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJyAgICAgIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyAgICAgICAgICAoZnJvbSBkYXRhX2Zvcl9oaXN0b3J5LmxhYmVsKVxuICAgKiAtIG9yaWdpbiA9PSAnb2Ygb250b21lIGluIGVuZ2xpc2gnICAgICAgICAgICAgICAgKGZyb20gZGF0YV9mb3JfaGlzdG9yeS5sYWJlbClcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVMYWJlbHMoZDoge1xuICAgIGZrUHJvamVjdDogbnVtYmVyLFxuICAgIHR5cGU6ICdsYWJlbCcgfCAnZGVmaW5pdGlvbicgfCAnc2NvcGVOb3RlJyxcbiAgICBsYW5ndWFnZTogSW5mTGFuZ3VhZ2UsXG4gICAgcGtDbGFzcz86IG51bWJlcixcbiAgICBma1Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHlEb21haW4/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eVJhbmdlPzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTx7XG4gICAgb3JpZ2luOiBMYWJlbE9yaWdpblxuICAgIHRleHQ6IHN0cmluZ1xuICB9W10+IHtcbiAgICBsZXQgZmtfc3lzdGVtX3R5cGU6IG51bWJlcjtcblxuICAgIGlmIChkLnBrQ2xhc3MpIHtcbiAgICAgIHN3aXRjaCAoZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xhYmVsJzpcbiAgICAgICAgICBma19zeXN0ZW1fdHlwZSA9IFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUxcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZrX3N5c3RlbV90eXBlIG5vdCBmb3VuZCcpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGQuZmtQcm9wZXJ0eSkge1xuICAgICAgc3dpdGNoIChkLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGFiZWwnOlxuICAgICAgICAgIGZrX3N5c3RlbV90eXBlID0gU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignZmtfc3lzdGVtX3R5cGUgbm90IGZvdW5kJylcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgLy8gbGFiZWwgb2YgcHJvamVjdCBpbiBkZWZhdWx0IGxhbmd1YWdlIG9mIHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IGQuZmtQcm9qZWN0LFxuICAgICAgICBma19sYW5ndWFnZTogZC5sYW5ndWFnZS5wa19lbnRpdHksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIG9mIGRlZmF1bHQgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UucGtfZW50aXR5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIG9mIGRlZmF1bHQgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IDE4ODg5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBmcm9tIG9udG9tZSBpbiBkZWZhdWx0IGxhbmd1YWdlIG9mIHByb2plY3RcbiAgICAgIHRoaXMucGlwZURmaExhYmVsKHtcbiAgICAgICAgbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UuaXNvNjM5MS50cmltKCksXG4gICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgIGZrX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX3Byb3BlcnR5OiBkLmZrUHJvcGVydHlcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLmxhYmVsIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgZnJvbSBvbnRvbWUgaW4gZW5nbGlzaFxuICAgICAgdGhpcy5waXBlRGZoTGFiZWwoe1xuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgZmtfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLmxhYmVsIH1cbiAgICAgIH0pKSxcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgUHJvVGV4dFByb3BlcnR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvVGV4dFByb3BlcnR5KGQ6IHtcbiAgICBma19wcm9qZWN0OiBudW1iZXIsXG4gICAgZmtfc3lzdGVtX3R5cGU6IG51bWJlcixcbiAgICBma19sYW5ndWFnZTogbnVtYmVyLFxuICAgIGZrX2RmaF9jbGFzcz86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbj86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPFByb1RleHRQcm9wZXJ0eT4ge1xuICAgIGNvbnN0IGtleSA9IHRleHRQcm9wZXJ0eUJ5RmtzS2V5KGQpXG4gICAgcmV0dXJuIHRoaXMucy5wcm8kLnRleHRfcHJvcGVydHkkLmJ5X2ZrcyQua2V5KGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyBEZmhMYWJlbFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZURmaExhYmVsKGQ6IHtcbiAgICB0eXBlOiAnbGFiZWwnIHwgJ2RlZmluaXRpb24nIHwgJ3Njb3BlTm90ZScsXG4gICAgbGFuZ3VhZ2U6IHN0cmluZyxcbiAgICBma19jbGFzcz86IG51bWJlcixcbiAgICBma19wcm9maWxlPzogbnVtYmVyLFxuICAgIGZrX3Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrX3Byb2plY3Q/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPERmaExhYmVsPiB7XG4gICAgY29uc3Qga2V5ID0gZGZoTGFiZWxCeUZrc0tleShkKVxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5sYWJlbCQuYnlfZmtzJC5rZXkoa2V5KVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGJlc3QgZml0dGluZyBmaWVsZCBsYWJlbCBmb3IgYWN0aXZlIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkTGFiZWwoZmtQcm9wZXJ0eTogbnVtYmVyLCBma1Byb3BlcnR5RG9tYWluOiBudW1iZXIsIGZrUHJvcGVydHlSYW5nZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBjb25zdCBpc091dGdvaW5nID0gISFma1Byb3BlcnR5RG9tYWluO1xuICAgIC8vIGNvbnN0IHN5c3RlbV90eXBlID0gaXNPdXRnb2luZyA/IChzaW5ndWxhciA/IDE4MCA6IDE4MSkgOiAoc2luZ3VsYXIgPyAxODIgOiAxODMpXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMuYS5wa1Byb2plY3QkLFxuICAgICAgdGhpcy5hLnBpcGVBY3RpdmVEZWZhdWx0TGFuZ3VhZ2UoKVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2ZrUHJvamVjdCwgbGFuZ3VhZ2VdKSA9PiB0aGlzLnBpcGVMYWJlbHMoXG4gICAgICAgIHtcbiAgICAgICAgICBma1Byb2plY3QsXG4gICAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICBma1Byb3BlcnR5LFxuICAgICAgICAgIGZrUHJvcGVydHlEb21haW4sXG4gICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlXG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IGAqIG5vIGxhYmVsIChpZDogJHtma1Byb3BlcnR5fSkgKmA7XG4gICAgICAgICAgICBpdGVtcy5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpdGVtICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfHxcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfHxcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGl0ZW0udGV4dFxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgaXRlbSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgfHxcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2Ygb250b21lIGluIGVuZ2xpc2gnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGlzT3V0Z29pbmcgPyBpdGVtLnRleHQgOiAnKiByZXZlcnNlIG9mOiAnICsgaXRlbS50ZXh0ICsgJyonXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBsYWJlbFxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBtYXBzIHRoZSBjbGFzcyB0byB0aGUgY29ycmVzcG9uZGluZyBtb2RlbCAoZGF0YWJhc2UgdGFibGUpXG4gICAqIHRoaXMgaXMgdXNlZCBieSBGb3JtcyB0byBjcmVhdGUgbmV3IGRhdGEgaW4gdGhlIHNoYXBlIG9mXG4gICAqIHRoZSBkYXRhIG1vZGVsXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGFibGVOYW1lT2ZDbGFzcyh0YXJnZXRDbGFzc1BrOiBudW1iZXIpOiBPYnNlcnZhYmxlPFRhYmxlTmFtZT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLnN5cyQuY29uZmlnJC5tYWluJCxcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHRhcmdldENsYXNzUGspXG4gICAgKS5waXBlKFxuICAgICAgZmlsdGVyKGkgPT4gIWkuaW5jbHVkZXModW5kZWZpbmVkKSksXG4gICAgICBtYXAoKFtjb25maWcsIGtsYXNzXSkgPT4ge1xuICAgICAgICBjb25zdCBjbGFzc0NvbmZpZzogQ2xhc3NDb25maWcgPSBjb25maWcuY2xhc3Nlc1t0YXJnZXRDbGFzc1BrXTtcbiAgICAgICAgaWYgKGNsYXNzQ29uZmlnICYmIGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSkge1xuXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSlcbiAgICAgICAgICBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm5cbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzWzBdO1xuICAgICAgICAgIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiAnYXBwZWxsYXRpb24nO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuICdsYW5ndWFnZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLnBsYWNlKSByZXR1cm4gJ3BsYWNlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUudGltZVByaW1pdGl2ZSkgcmV0dXJuICd0aW1lX3ByaW1pdGl2ZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiAnbGFuZ19zdHJpbmcnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5kaW1lbnNpb24pIHJldHVybiAnZGltZW5zaW9uJztcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdCB0eXBlJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOCB8fCBrbGFzcy5iYXNpY190eXBlID09PSAzMCkge1xuICAgICAgICAgIHJldHVybiAncGVyc2lzdGVudF9pdGVtJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiAndGVtcG9yYWxfZW50aXR5J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBDbGFzc2VzXG4gICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3Q6XG4gICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgZW5hYmxlZCBieSBjbGFzc19wcm9qX3JlbFxuICAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIHJlcXVpcmVkIGJ5IHNvdXJjZXNcbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWxsIHRvIGNyZWF0ZSBzZWxlY3QgZHJvcGRvd25zIG9mIGNsYXNzZXMgdXNlcnMgd2lsbCBrbm93XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0luRW50aXRpZXNPclNvdXJjZXMoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbiAgICAgIHRoaXMucGlwZUNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4gICAgICBzdGFydFdpdGgoe30pXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKVxuICAgICAgLnBpcGUobWFwKGMgPT4gdmFsdWVzKGMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSlcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICAqIG9mIGFsbCBjbGFzc2VzIHRoYXQgYXJlIGVuYWJsZWQgYnkgYXQgbGVhc3Qgb25lIG9mIHRoZSBhY3RpdmF0ZWQgcHJvZmlsZXNcbiAgICogb2YgdGh0ZSBnaXZlbiBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0VuYWJsZWRCeVByb2plY3RQcm9maWxlcygpOiBPYnNlcnZhYmxlPERmaENsYXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5hbGwkLFxuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbY2xhc3Nlc0J5UGssIGVuYWJsZWRQcm9maWxlc10pID0+IHtcbiAgICAgICAgY29uc3QgcHJvZmlsZXNNYXAgPSBpbmRleEJ5KChrKSA9PiBrLnRvU3RyaW5nKCksIHZhbHVlcyhlbmFibGVkUHJvZmlsZXMpKVxuICAgICAgICByZXR1cm4gdmFsdWVzKGNsYXNzZXNCeVBrKVxuICAgICAgICAgIC5maWx0ZXIoa2xhc3MgPT4ga2xhc3MucHJvZmlsZXMuc29tZShwcm9maWxlID0+IHByb2ZpbGVzTWFwW3Byb2ZpbGUuZmtfcHJvZmlsZV0pKVxuICAgICAgfSlcbiAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgKiBvZiBhbGwgdHlwZSBjbGFzc2VzIHRoYXQgYXJlIGVuYWJsZWQgYnkgYXQgbGVhc3Qgb25lIG9mIHRoZSBhY3RpdmF0ZWQgcHJvZmlsZXNcbiAgKiBvZiB0aHRlIGdpdmVuIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVDbGFzc2VzRW5hYmxlZEJ5UHJvamVjdFByb2ZpbGVzKCk6IE9ic2VydmFibGU8RGZoQ2xhc3NbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9iYXNpY190eXBlJC5rZXkoMzApLFxuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbY2xhc3Nlc0J5UGssIGVuYWJsZWRQcm9maWxlc10pID0+IHtcbiAgICAgICAgY29uc3QgcHJvZmlsZXNNYXAgPSBpbmRleEJ5KChrKSA9PiBrLnRvU3RyaW5nKCksIHZhbHVlcyhlbmFibGVkUHJvZmlsZXMpKVxuICAgICAgICByZXR1cm4gdmFsdWVzKGNsYXNzZXNCeVBrKVxuICAgICAgICAgIC5maWx0ZXIoa2xhc3MgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtsYXNzLnByb2ZpbGVzLnNvbWUocHJvZmlsZSA9PiBwcm9maWxlc01hcFtwcm9maWxlLmZrX3Byb2ZpbGVdKSAmJlxuICAgICAgICAgICAgICAvLyBFeGNsdWRlIE1hbmlmZXN0YXRpb24gcHJvZHVjdCB0eXBlIGFuZCBsYW5ndWFnZVxuICAgICAgICAgICAgICAhW1xuICAgICAgICAgICAgICAgIERmaENvbmZpZy5DTEFTU19QS19MQU5HVUFHRSxcbiAgICAgICAgICAgICAgICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9QUk9EVUNUX1RZUEVcbiAgICAgICAgICAgICAgXS5pbmNsdWRlcyhrbGFzcy5wa19jbGFzcylcbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyZSB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICAqIG9mIGFsbCBjbGFzc2VzIHRoYXQgYXJlIGVuYWJsZWQgYnkgYWN0aXZlIHByb2plY3QgKHVzaW5nIGNsYXNzX3Byb2pfcmVsKVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9jbGFzc19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZWxzKSA9PiB2YWx1ZXMocmVscykubWFwKHJlbCA9PiByZWwuZmtfY2xhc3MpKVxuICAgICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgVGVFbiBDbGFzc2VzXG4gICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU2VsZWN0ZWRUZUVuQ2xhc3Nlc0luUHJvamVjdCgpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVRlRW5DbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbiAgICAgIHRoaXMucGlwZVRlRW5DbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuICAgICAgc3RhcnRXaXRoKHt9KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFycmF5IG9mIHBrX2NsYXNzIHdpdGggdGVFbiBjbGFzc2VzIGVuYWJsZWQgaW4gZW50aXRpZXNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUZUVuQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX2NsYXNzX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGNzKSA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHZhbHVlcyhjcykubWFwKGMgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkoYy5ma19jbGFzcykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICApKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKGRmaENsYXNzZXMgPT4gdGhpcy5maWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXMpKVxuICAgICAgICApKVxuICAgICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgICogRmlsdGVycyBhcnJheSBvZiBEZmhDbGFzcyBmb3IgVGVFbiBDbGFzc2VzIGFuZCByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzXG4gICAqIEBwYXJhbSBkZmhDbGFzc2VzIGFycmF5IG9mIERmaENsYXNzXG4gICAqIEByZXR1cm5zIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3Mgd2hlcmUgY2xhc3MgaXMgVGVFbiBjbGFzc1xuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXM6IERmaENsYXNzW10pOiBudW1iZXJbXSB7XG4gICAgY29uc3QgcGtzOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGZoQ2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYyA9IGRmaENsYXNzZXNbaV07XG4gICAgICBpZiAoYy5iYXNpY190eXBlID09PSA5KSBwa3MucHVzaChjLnBrX2NsYXNzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBrcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFycmF5IG9mIHBrX2NsYXNzIHdpdGggdGVFbiBjbGFzc2VzIHJlcXVpcmVkIGJ5IHNvdXJjZXNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUZUVuQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKCkge1xuICAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChjcykgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB2YWx1ZXMoY3MpLm1hcChjID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KGMuZmtfY2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChkZmhDbGFzc2VzID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlcylcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgICAgKVxuICB9XG5cblxuXG5cblxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVBbmRUeXBlZENsYXNzZXMoZW5hYmxlZEluPzogJ2VudGl0aWVzJyB8ICdzb3VyY2VzJyk6IE9ic2VydmFibGU8eyB0eXBlZENsYXNzOiBudW1iZXIsIHR5cGVDbGFzczogbnVtYmVyIH1bXT4ge1xuXG4gICAgbGV0IHBrcyQ6IE9ic2VydmFibGU8bnVtYmVyW10+W107XG5cbiAgICBjb25zdCBmcm9tU291cmNlcyQgPSB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoY2xhc3NlcyA9PiB2YWx1ZXMoY2xhc3NlcykubWFwKGsgPT4gay5ma19jbGFzcykpLFxuICAgIClcblxuICAgIGNvbnN0IGZyb21FbnRpdGllcyQgPSB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKVxuXG4gICAgaWYgKGVuYWJsZWRJbiA9PT0gJ3NvdXJjZXMnKSB7XG4gICAgICBwa3MkID0gW2Zyb21Tb3VyY2VzJF07XG4gICAgfSBlbHNlIGlmIChlbmFibGVkSW4gPT09ICdlbnRpdGllcycpIHtcbiAgICAgIHBrcyQgPSBbZnJvbUVudGl0aWVzJF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBrcyQgPSBbZnJvbVNvdXJjZXMkLCBmcm9tRW50aXRpZXMkXVxuICAgIH1cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHBrcyQpLnBpcGUoXG4gICAgICBtYXAoYXJyYXlPZlBrQXJyYXlzID0+IHVuaXEoZmxhdHRlbjxudW1iZXI+KGFycmF5T2ZQa0FycmF5cykpKSxcbiAgICAgIHN3aXRjaE1hcChwa3MgPT4gdGhpcy5waXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKHBrcykpXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3Nlcyhwa1R5cGVkQ2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPHsgdHlwZWRDbGFzczogbnVtYmVyLCB0eXBlQ2xhc3M6IG51bWJlciB9W10+IHtcblxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19kb21haW4udG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gcGtUeXBlZENsYXNzZXMubWFwKHBrID0+ICh7XG4gICAgICAgICAgdHlwZWRDbGFzczogcGssXG4gICAgICAgICAgdHlwZUNsYXNzOiBieURvbWFpbltwa10gPyBieURvbWFpbltwa10uaGFzX3JhbmdlIDogdW5kZWZpbmVkXG4gICAgICAgIH0pKVxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUNsYXNzT2ZUeXBlZENsYXNzKHBrVHlwZWRDbGFzcyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX2RvbWFpbi50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBieURvbWFpbltwa1R5cGVkQ2xhc3NdID8gYnlEb21haW5bcGtUeXBlZENsYXNzXS5oYXNfcmFuZ2UgOiB1bmRlZmluZWRcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXMocGtUeXBlQ2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfcmFuZ2UudG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gcGtUeXBlQ2xhc3Nlcy5tYXAocGsgPT4gYnlEb21haW5bcGtdID8gYnlEb21haW5bcGtdLmhhc19kb21haW4gOiB1bmRlZmluZWQpXG4gICAgICB9KSlcbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVQcm9wZXJ0eU9mVHlwZWRDbGFzcyhwa1R5cGVkQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCB0eXBlUHJvcCA9IHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpLmZpbmQocCA9PiBwLmhhc19kb21haW4gPT09IHBrVHlwZWRDbGFzcylcbiAgICAgICAgcmV0dXJuIHR5cGVQcm9wID8gdHlwZVByb3AucGtfcHJvcGVydHkgOiB1bmRlZmluZWQ7XG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKHBrUHJvcGVydGllczogbnVtYmVyW10sIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9wa19wcm9wZXJ0eSQuYWxsJC5waXBlKFxuICAgICAgbWFwKHggPT4ge1xuICAgICAgICBpZiAoIXBrUHJvcGVydGllcyB8fCAhcGtQcm9wZXJ0aWVzLmxlbmd0aCkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IHJlcyA9IFtdXG4gICAgICAgIGNvbnN0IHRhcmdldENsYXNzZXMgPSB7fTtcbiAgICAgICAgcGtQcm9wZXJ0aWVzLmZvckVhY2gocGtQcm9wID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9wcyA9IHZhbHVlcyh4W3BrUHJvcF0pO1xuICAgICAgICAgIHByb3BzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDbGFzcyA9IGlzT3V0Z29pbmcgPyBwcm9wLmhhc19yYW5nZSA6IHByb3AuaGFzX2RvbWFpbjtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0Q2xhc3Nlc1t0YXJnZXRDbGFzc10pIHtcbiAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3Nlc1t0YXJnZXRDbGFzc10gPSB0cnVlO1xuICAgICAgICAgICAgICByZXMucHVzaCh0YXJnZXRDbGFzcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSlcbiAgICApXG4gIH1cbn1cblxuXG5mdW5jdGlvbiBnZXRTdWJmaWVsZFR5cGUoY29uZmlnOiBTeXNDb25maWdWYWx1ZSwga2xhc3M6IERmaENsYXNzLCB0YXJnZXRNYXhRdWFudGl0eTogbnVtYmVyKTogU3ViZmllbGRUeXBlIHtcblxuICBsZXQgY2xhc3NDb25maWc6IENsYXNzQ29uZmlnXG4gIGlmIChjb25maWcpIGNsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNba2xhc3MucGtfY2xhc3NdO1xuICBpZiAoY2xhc3NDb25maWcgJiYgY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKSB7XG4gICAgcmV0dXJuIGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZVxuICB9XG5cbiAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gMzAgJiYgdGFyZ2V0TWF4UXVhbnRpdHkgPT0gMSkge1xuICAgIHJldHVybiB7IHR5cGVJdGVtOiAndHJ1ZScgfVxuICB9XG4gIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDggfHwga2xhc3MuYmFzaWNfdHlwZSA9PT0gMzApIHtcbiAgICByZXR1cm4geyBlbnRpdHlQcmV2aWV3OiAndHJ1ZScgfVxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiB7IHRlbXBvcmFsRW50aXR5OiAndHJ1ZScgfVxuICB9XG59XG5cblxuZnVuY3Rpb24gY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KGRvbWFpbkNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuXG4gIGNvbnN0IGhhc0RlZmluaXRpb246IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IGRvbWFpbkNsYXNzLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfUDE4X0hBU19ERUZJTklUSU9OLFxuICAgIGhhc19yYW5nZTogNzg1LFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ1AxOCcsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IGZhbHNlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzRGVmaW5pdGlvblxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUFwcGVsbGF0aW9uUHJvcGVydHkocmFuZ2VDbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cbiAgY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRixcbiAgICBoYXNfcmFuZ2U6IHJhbmdlQ2xhc3MsXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMCxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnaGlzdFA5JyxcbiAgICBpZGVudGl0eV9kZWZpbmluZzogdHJ1ZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0FwcGVQcm9wXG59XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVIYXNUaW1lU3BhblByb3BlcnR5KGRvbWFpbkNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuICBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogZG9tYWluQ2xhc3MsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOLFxuICAgIGhhc19yYW5nZTogRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTixcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMCxcbiAgICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ1A0JyxcbiAgICBpZGVudGl0eV9kZWZpbmluZzogZmFsc2UsXG4gICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuICAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbiAgICBwcm9maWxlc1xuICB9XG4gIHJldHVybiBoYXNBcHBlUHJvcFxufVxuXG5cbmZ1bmN0aW9uIGlzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyhlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdLCBwcm9maWxlczogUmVsYXRlZFByb2ZpbGVbXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gIXByb2ZpbGVzLnNvbWUocCA9PiBwLnJlbW92ZWRfZnJvbV9hcGkgPT09IGZhbHNlICYmIGVuYWJsZWRQcm9maWxlcy5pbmNsdWRlcyhwLmZrX3Byb2ZpbGUpKVxuXG59XG5cbmZ1bmN0aW9uIGdldFBsYWNlT2ZEaXNwbGF5KHNwZWNpYWxGaWVsZHM6IFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIHN1YmZpZWxkOiBTdWJmaWVsZCwgcHJvamVjdEZpZWxkQ29uZmlnPzogUHJvQ2xhc3NGaWVsZENvbmZpZyk6IEZpZWxkUGxhY2VPZkRpc3BsYXkge1xuICBsZXQgc2V0dGluZ3M6IFN5c0NvbmZpZ0ZpZWxkRGlzcGxheTtcblxuICBzZXR0aW5ncyA9IGdldFNldHRpbmdzRnJvbVN5c0NvbmZpZyhzdWJmaWVsZCwgc3BlY2lhbEZpZWxkcywgc2V0dGluZ3MpO1xuXG4gIC8vIGlmIHRoaXMgaXMgYSBzcGVjaWFsIGZpZWxkLCBjcmVhdGUgY29ycmVzcG9uZGluZyBkaXNwbGF5IHNldHRpbmdzIGFuZCByZXR1cm4gaXRcbiAgaWYgKHNldHRpbmdzKSB7XG4gICAgaWYgKHNldHRpbmdzLmRpc3BsYXlJbkJhc2ljRmllbGRzKSB7XG4gICAgICByZXR1cm4geyBiYXNpY0ZpZWxkczogeyBwb3NpdGlvbjogc2V0dGluZ3MuZGlzcGxheUluQmFzaWNGaWVsZHMucG9zaXRpb24gfSB9XG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5oaWRkZW4pIHtcbiAgICAgIHJldHVybiB7IGhpZGRlbjogdHJ1ZSB9XG4gICAgfVxuICB9XG5cbiAgLy8gb3RoZXJ3aXNlIGRpc3BsYXkgdGhlIGZpZWxkIGluIHNwZWNpZmljIGZpZWxkcyAoZGVmYXVsdClcbiAgbGV0IHBvc2l0aW9uID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICBpZiAocHJvamVjdEZpZWxkQ29uZmlnKSBwb3NpdGlvbiA9IHByb2plY3RGaWVsZENvbmZpZy5vcmRfbnVtXG4gIHJldHVybiB7IHNwZWNpZmljRmllbGRzOiB7IHBvc2l0aW9uIH0gfVxuXG59XG5mdW5jdGlvbiBnZXRTZXR0aW5nc0Zyb21TeXNDb25maWcoXG4gIHN1YmZpZWxkOiBTdWJmaWVsZCwgc3BlY2lhbEZpZWxkczogU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgc2V0dGluZ3M6IFN5c0NvbmZpZ0ZpZWxkRGlzcGxheSkge1xuICBpZiAoc3ViZmllbGQuaXNPdXRnb2luZykge1xuICAgIC8vIGdldCBzZXR0aW5ncyBieSBoYXMtdHlwZS1zdWJwcm9wZXJ0eVxuICAgIGlmIChzdWJmaWVsZC5pc0hhc1R5cGVGaWVsZCAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5oYXNUeXBlU3VicHJvcGVydGllcykge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmhhc1R5cGVTdWJwcm9wZXJ0aWVzO1xuICAgIH1cbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgc291cmNlIGNsYXNzIGFuZCBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXSAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgICAvLyBnZXQgc2VldGluZ3MgYnkgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIGdldCBzZXR0aW5ncyBieSBzb3VyY2UgY2xhc3MgYW5kIHByb3BlcnR5XG4gICAgaWYgKHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXSAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgICAvLyBnZXQgc2VldGluZ3MgYnkgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIHJldHVybiBzZXR0aW5ncztcbn1cblxuXG5cblxuXG5cbi8qKlxuICogUGlwZXMgdGhlIGZpZWxkcyBmb3IgdGVtcG9yYWwgZW50aXR5IGZvcm1zXG4gKiAtIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAqIC0gdGhlIHdoZW4gZmllbGRcbiAqIC0gaWYgYXZhaWxhYmxlOiB0aGUgdHlwZSBmaWVsZFxuICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGREZWZpbml0aW9uc0ZvclRlRW5Gb3JtKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuLy8gICByZXR1cm4gb2YoW10pXG4vLyBjb25zdCBoYXNUeXBlTGlzdERlZiQgPSB0aGlzLnBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzcylcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkRGVmaW5pdGlvbnMocGtDbGFzcylcbi8vICAgICAucGlwZShcbi8vICAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzLmZpbHRlcihmID0+IGYuYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9PT0gZmFsc2UpKVxuLy8gICAgIClcbi8vICAgLFxuLy8gICBoYXNUeXBlTGlzdERlZiQsXG4vLyApLnBpcGUoXG4vLyAgIG1hcCgoW2ZpZWxkcywgaGFzVHlwZUxpc3REZWZzXSkgPT4ge1xuLy8gICAgIGNvbnN0IHdoZW4gPSB0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOKVxuLy8gICAgIHJldHVybiBbXG4vLyAgICAgICAuLi5maWVsZHMsXG4vLyAgICAgICB3aGVuLFxuLy8gICAgICAgLi4uaGFzVHlwZUxpc3REZWZzLm1hcCgoaGFzVHlwZUxpc3REZWYpID0+IHtcbi8vICAgICAgICAgY29uc3QgdHlwZUZpZWxkOiBGaWVsZCA9IHsgLi4uaGFzVHlwZUxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2hhc1R5cGVMaXN0RGVmXSB9XG4vLyAgICAgICAgIHJldHVybiB0eXBlRmllbGQ7XG4vLyAgICAgICB9KVxuLy8gICAgIF1cbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vKipcbiAqIFBpcGUgdGhlIHNwZWNpZmljIGZpZWxkcyBvZiBnaXZlbiBjbGFzc1xuICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3BlY2lmaWNGaWVsZERlZmluaXRpb25zKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIHRydWUpLnBpcGUoXG4vLyAgICAgLy8gZmlsdGVyIG91dCB0aGUgJ2hhcyB0eXBlJyBwcm9wZXJ0eSwgc2luY2UgaXQgaXMgcGFydCBvZiB0aGUgZGVmYXVsdCBmaWVsZHNcbi8vICAgICBtYXAob3V0Z29pbmcgPT4gb3V0Z29pbmcuZmlsdGVyKG8gPT4gIW8uaXNfaGFzX3R5cGVfc3VicHJvcGVydHkpKVxuLy8gICApLFxuLy8gICB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCBmYWxzZSkucGlwZShcbi8vICAgICAvLyBmaWx0ZXIgb3V0IHRoZSAnaGFzIGFwcGVsbGF0aW9uJyBwcm9wZXJ0eSwgc2luY2UgaXQgaXMgcGFydCBvZiB0aGUgZGVmYXVsdCBmaWVsZHNcbi8vICAgICBtYXAoaW5nb2luZyA9PiBpbmdvaW5nLmZpbHRlcihpID0+XG4vLyAgICAgICBpLnBrX3Byb3BlcnR5ICE9PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSVNfQVBQRUxMQVRJT05fT0Zcbi8vICAgICAgICYmIGkucGtfcHJvcGVydHkgIT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19HRU9WUDFfSVNfUkVQUk9EVUNUSU9OX09GXG4vLyAgICAgKSlcbi8vICAgKSxcbi8vICAgdGhpcy5waXBlRmllbGRDb25maWdzKHBrQ2xhc3MpXG4vLyApLnBpcGUoXG4vLyAgIHN3aXRjaE1hcCgoW291dGdvaW5nLCBpbmdvaW5nLCBmaWVsZENvbmZpZ3NdKSA9PiB7XG5cbi8vICAgICBjb25zdCBrZXkgPSAoZmM6IFBhcnRpYWw8UHJvQ2xhc3NGaWVsZENvbmZpZz4pID0+IGAke2ZjLmZrX3Byb3BlcnR5fV8ke2ZjLmZrX2RvbWFpbl9jbGFzc31fJHtmYy5ma19yYW5nZV9jbGFzc31gO1xuLy8gICAgIGNvbnN0IGluZGV4ZWQgPSBpbmRleEJ5KChmYykgPT4gYCR7ZmMuZmtfcHJvcGVydHl9XyR7ZmMuZmtfZG9tYWluX2NsYXNzfV8ke2ZjLmZrX3JhbmdlX2NsYXNzfWAsIGZpZWxkQ29uZmlncylcbi8vICAgICBjb25zdCBnZXRGaWVsZENvbmZpZyA9IChsaXN0RGVmOiBTdWJmaWVsZCk6IFByb0NsYXNzRmllbGRDb25maWcgPT4ge1xuLy8gICAgICAgcmV0dXJuIGluZGV4ZWRba2V5KHtcbi8vICAgICAgICAgZmtfcHJvcGVydHk6IGxpc3REZWYucHJvcGVydHkucGtQcm9wZXJ0eSxcbi8vICAgICAgICAgZmtfZG9tYWluX2NsYXNzOiBsaXN0RGVmLmlzT3V0Z29pbmcgPyBsaXN0RGVmLnNvdXJjZUNsYXNzIDogbnVsbCxcbi8vICAgICAgICAgZmtfcmFuZ2VfY2xhc3M6IGxpc3REZWYuaXNPdXRnb2luZyA/IG51bGwgOiBsaXN0RGVmLnNvdXJjZUNsYXNzLFxuLy8gICAgICAgfSldXG4vLyAgICAgfVxuXG4vLyAgICAgLy8gQ3JlYXRlIGxpc3QgZGVmaW5pdGlvbnNcbi8vICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhpbmdvaW5nLCBmYWxzZSksXG4vLyAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMob3V0Z29pbmcsIHRydWUpXG4vLyAgICAgKS5waXBlKFxuLy8gICAgICAgbWFwKChbaW5nb2luZ0xpc3REZWZzLCBvdXRnb2luZ0xpc3REZWZzXSkgPT4ge1xuLy8gICAgICAgICBjb25zdCBsaXN0RGVmaW5pdGlvbnMgPSBbLi4uaW5nb2luZ0xpc3REZWZzLCAuLi5vdXRnb2luZ0xpc3REZWZzXTtcblxuLy8gICAgICAgICAvLyBDcmVhdGUgZmllbGQgZGVmaW5pdGlvbnNcbi8vICAgICAgICAgY29uc3QgZmllbGREZWZzOiB7IFtrZXk6IHN0cmluZ106IEZpZWxkIH0gPSB7fVxuLy8gICAgICAgICBsaXN0RGVmaW5pdGlvbnMuZm9yRWFjaChsaXN0RGVmID0+IHtcblxuLy8gICAgICAgICAgIGNvbnN0IGsgPSBsaXN0RGVmLnByb3BlcnR5LnBrUHJvcGVydHkgKyAnXycgKyBsaXN0RGVmLmlzT3V0Z29pbmc7XG5cbi8vICAgICAgICAgICBpZiAoIWZpZWxkRGVmc1trXSkge1xuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdID0ge1xuLy8gICAgICAgICAgICAgICAuLi5saXN0RGVmLFxuLy8gICAgICAgICAgICAgICBwbGFjZU9mRGlzcGxheToge30sXG4vLyAgICAgICAgICAgICAgIGFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICBmaWVsZENvbmZpZzogZ2V0RmllbGRDb25maWcobGlzdERlZiksXG4vLyAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uczogW2xpc3REZWZdLFxuLy8gICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzOiBbbGlzdERlZi50YXJnZXRDbGFzc11cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdLmxpc3REZWZpbml0aW9ucy5wdXNoKGxpc3REZWYpXG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10udGFyZ2V0Q2xhc3Nlcy5wdXNoKGxpc3REZWYudGFyZ2V0Q2xhc3MpXG4vLyAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgLy8gfVxuXG4vLyAgICAgICAgIH0pXG4vLyAgICAgICAgIC8vIE9yZGVyIHRoZSBmaWVsZHMgYWNjb3JkaW5nIHRvIG9yZF9udW0gKGZyb20gcHJvamVjdCdzIGNvbmZpZywga2xlaW9sYWIncyBjb25maWcpIG9yIHB1dCBpdCBhdCBlbmQgb2YgbGlzdC5cbi8vICAgICAgICAgcmV0dXJuIHNvcnQoXG4vLyAgICAgICAgICAgKGEsIGIpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnN0IGdldE9yZE51bSA9IChpdGVtOiBGaWVsZCkgPT4ge1xuLy8gICAgICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmZpZWxkQ29uZmlnKSByZXR1cm4gaXRlbS5maWVsZENvbmZpZy5vcmRfbnVtO1xuLy8gICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgY29uc3Qgb3JkTnVtQSA9IGdldE9yZE51bShhKTtcbi8vICAgICAgICAgICAgIGNvbnN0IG9yZE51bUIgPSBnZXRPcmROdW0oYik7XG4vLyAgICAgICAgICAgICByZXR1cm4gb3JkTnVtQSAtIG9yZE51bUI7XG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB2YWx1ZXMoZmllbGREZWZzKSlcbi8vICAgICAgIH0pXG4vLyAgICAgKVxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8qKlxuICogUGlwZSB0aGUgZmllbGRzIGZvciBpZGVudGlmaWNhdGlvbiBvZiBnaXZlbiBjbGFzc1xuICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRGVmYXVsdEZpZWxkRGVmaW5pdGlvbnMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cblxuLy8gLyoqXG4vLyAgKiBQaXBlIHRoZSBnZW5lcmljIGZpZWxkIGhhcyBhcHBlbGxhdGlvblxuLy8gICogd2l0aCB0aGUgZ2l2ZW4gY2xhc3MgYXMgcmFuZ2Vcbi8vICAqL1xuLy8gY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5U3RhdHVzID0ge1xuLy8gICBoYXNfZG9tYWluOiBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFLFxuLy8gICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GLFxuLy8gICBoYXNfcmFuZ2U6IHBrQ2xhc3MsXG4vLyAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuLy8gICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAwLFxuLy8gICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4vLyAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbi8vICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdoaXN0UDknLFxuLy8gICBpZGVudGl0eV9kZWZpbmluZzogdHJ1ZSxcbi8vICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuLy8gICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4vLyAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlLFxuLy8gICBwcm9maWxlczogW11cbi8vIH1cbi8vIGNvbnN0IGhhc0FwcGVMaXN0RGVmJCA9IHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhbaGFzQXBwZVByb3BdLCBmYWxzZSkucGlwZShcbi8vICAgZmlsdGVyKGxpc3REZWZzID0+ICEhbGlzdERlZnMgJiYgISFsaXN0RGVmc1swXSksXG4vLyAgIG1hcChsaXN0RGVmcyA9PiBsaXN0RGVmc1swXSlcbi8vICk7XG5cbi8vIC8qKlxuLy8gICogUGlwZSB0aGUgZ2VuZXJpYyBmaWVsZCBoYXMgdHlwZVxuLy8gICogd2l0aCB0aGUgZ2l2ZW4gY2xhc3MgYXMgcmFuZ2Vcbi8vICAqL1xuLy8gY29uc3QgaGFzVHlwZUxpc3REZWYkID0gdGhpcy5waXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3MpXG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgaGFzQXBwZUxpc3REZWYkLFxuLy8gICBoYXNUeXBlTGlzdERlZiQsXG4vLyAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoZmlsdGVyKGMgPT4gISFjKSlcbi8vICkucGlwZShcbi8vICAgbWFwKChbaGFzQXBwZUxpc3REZWYsIGhhc1R5cGVMaXN0RGVmcywga2xhc3NdKSA9PiB7XG4vLyAgICAgY29uc3QgZmllbGRzOiBGaWVsZFtdID0gW11cblxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAgKiBBZGQgJ3Nob3J0IHRpdGxlJyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gICpcbi8vICAgICAvLyAgKiBNYW5pZmVzdGF0aW9uIFByb2R1Y3QgVHlwZSDigJMgRjMsIDIxOVxuLy8gICAgIC8vICAqIE1hbmlmZXN0YXRpb24gU2luZ2xldG9uIOKAkyBGNCwgMjIwXG4vLyAgICAgLy8gICogSXRlbSDigJMgRjUsIDIyMVxuLy8gICAgIC8vICAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICAqL1xuLy8gICAgIC8vIGlmIChbXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9QUk9EVUNUX1RZUEUsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9TSU5HTEVUT04sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfSVRFTSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVF0uaW5jbHVkZXMocGtDbGFzcykpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1NIT1JUX1RJVExFKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaGFzIGFwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdFA5JyB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCBjbGFzc2VzIGV4Y2VwdCAnQXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0QzEwJywgMzY1XG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuLy8gICAgIC8vICAgY29uc3QgYXBwZUZpZWxkOiBGaWVsZCA9IHsgLi4uaGFzQXBwZUxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2hhc0FwcGVMaXN0RGVmXSB9XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaChhcHBlRmllbGQpO1xuLy8gICAgIC8vIH1cblxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaGFzVHlwZScgZmllbGRzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoaGFzVHlwZUxpc3REZWZzICYmIGhhc1R5cGVMaXN0RGVmcy5sZW5ndGggPiAwKSB7XG4vLyAgICAgLy8gICBoYXNUeXBlTGlzdERlZnMuZm9yRWFjaCgoaGFzVHlwZUxpc3REZWYpID0+IHtcbi8vICAgICAvLyAgICAgY29uc3QgdHlwZUZpZWxkOiBGaWVsZCA9IHsgLi4uaGFzVHlwZUxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2hhc1R5cGVMaXN0RGVmXSB9XG4vLyAgICAgLy8gICAgIGZpZWxkcy5wdXNoKHR5cGVGaWVsZCk7XG4vLyAgICAgLy8gICB9KVxuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2VudGl0eSBkZWZpbml0aW9uJyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIGNsYXNzZXMgZXhjZXB0ICdBcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RDMTAnLCAzNjVcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FTlRJVFlfREVGSU5JVElPTikpO1xuLy8gICAgIC8vIH1cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdpZGVudGlmaWVyIC8gZXhhY3QgcmVmZXJlbmNlIC8gdXJsIC8gLi4uJyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNUID09PSBwa0NsYXNzKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FWEFDVF9SRUZFUkVOQ0UpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdjb21tZW50JyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogTWFuaWZlc3RhdGlvbiBQcm9kdWN0IFR5cGUg4oCTIEYzLCAyMTlcbi8vICAgICAvLyAqIE1hbmlmZXN0YXRpb24gU2luZ2xldG9uIOKAkyBGNCwgMjIwXG4vLyAgICAgLy8gKiBJdGVtIOKAkyBGNSwgMjIxXG4vLyAgICAgLy8gKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAqIEV4cHJlc3Npb24gcG9ydGlvbiDigJMgZ2VvdkM1LCA1MDNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChbXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9QUk9EVUNUX1RZUEUsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9TSU5HTEVUT04sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfSVRFTSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVCxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19FWFBSRVNTSU9OX1BPUlRJT05dLmluY2x1ZGVzKHBrQ2xhc3MpKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5UKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAndGltZS1zcGFuJyBmaWVsZCB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCB0ZW1wb3JhbCBlbnRpdHkgY2xhc3Nlc1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDkpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU4pKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICByZXR1cm4gZmllbGRzXG5cbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vLyBwcml2YXRlIHBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzczogbnVtYmVyKSB7XG4vLyAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCB0cnVlKS5waXBlKFxuLy8gICAgIC8vIGNoZWNrIGlmIHRoaXMgY2xhc3MgaGFzICdoYXMgdHlwZScgc3VicHJvcGVydHlcbi8vICAgICBtYXAob3V0Z29pbmcgPT4ge1xuLy8gICAgICAgcmV0dXJuIG91dGdvaW5nLmZpbHRlcigocHJvcCkgPT4gcHJvcC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSk7XG4vLyAgICAgfSksIHN3aXRjaE1hcChoYXNUeXBlUHJvcHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoaGFzVHlwZVByb3BzLm1hcChkZmhQcm9wID0+IHtcbi8vICAgICAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoW2RmaFByb3BdLCB0cnVlKS5waXBlKGZpbHRlcihsaXN0RGVmcyA9PiAhIWxpc3REZWZzICYmICEhbGlzdERlZnNbMF0pLCBtYXAobGlzdERlZnMgPT4ge1xuLy8gICAgICAgICBjb25zdCBsaXN0RGVmID0gbGlzdERlZnNbMF07XG4vLyAgICAgICAgIGxpc3REZWYubGlzdFR5cGUgPSB7IHR5cGVJdGVtOiAndHJ1ZScgfTtcbi8vICAgICAgICAgcmV0dXJuIGxpc3REZWY7XG4vLyAgICAgICB9KSk7XG4vLyAgICAgfSkpKSk7XG4vLyB9XG5cbi8vIGdldENsYXNzRmllbGRTdWJmaWVsZChwa0NsYXNzRmllbGQ6IG51bWJlcik6IFN1YmZpZWxkIHtcbi8vICAgY29uc3QgdGVtcGxhdGUgPSB7XG4vLyAgICAgcHJvcGVydHk6IHt9LFxuLy8gICAgIHNvdXJjZUNsYXNzOiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlQ2xhc3NMYWJlbDogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldENsYXNzOiB1bmRlZmluZWQsXG4vLyAgICAgaXNPdXRnb2luZzogdW5kZWZpbmVkLFxuLy8gICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IHVuZGVmaW5lZCxcbi8vICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRNaW5RdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZU1heFF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlTWluUXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZVxuLy8gICB9XG4vLyAgIHN3aXRjaCAocGtDbGFzc0ZpZWxkKSB7XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTjpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogeyB0aW1lU3BhbjogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnV2hlbicsXG4vLyAgICAgICAgIGlzT3V0Z29pbmc6IHRydWUsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDQnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS80Jyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IDFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FTlRJVFlfREVGSU5JVElPTjpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdEZXNjcmlwdGlvbicsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVDpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5ULFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdDb21tZW50cycsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FWEFDVF9SRUZFUkVOQ0U6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnRXhhY3QgUmVmZXJlbmNlJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9TSE9SVF9USVRMRTpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdTaG9ydCBUaXRsZScsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgZGVmYXVsdDpcbi8vICAgICAgIGJyZWFrO1xuLy8gICB9XG4vLyB9XG5cbi8vIGdldENsYXNzRmllbGREZWZpbml0aW9uKHBrQ2xhc3NGaWVsZDogbnVtYmVyKTogRmllbGQge1xuLy8gICBjb25zdCBsaXN0RGVmID0gdGhpcy5nZXRDbGFzc0ZpZWxkU3ViZmllbGQocGtDbGFzc0ZpZWxkKVxuLy8gICByZXR1cm4geyAuLi5saXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtsaXN0RGVmXSB9XG4vLyB9XG5cblxuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNSZXF1aXJlZCgpIHtcbi8vICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWQkLmtleSgndHJ1ZScpXG4vLyAgICAgLnBpcGUobWFwKGMgPT4gdmFsdWVzKGMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSlcbi8vIH1cblxuXG5cbi8vIC8qKlxuLy8gICogUGlwZXMgYWxsIHRoZSBlbmFibGVkIHByb3BlcnRpZXMgb2YgYSBjbGFzc1xuLy8gICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxEZmhQcm9wZXJ0eVN0YXR1c1tdPiB7XG5cblxuLy8gICBsZXQgJDogT2JzZXJ2YWJsZTxCeVBrPERmaFByb3BlcnR5Pj5cbi8vICAgaWYgKGlzT3V0Z29pbmcpIHtcbi8vICAgICAkID0gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19kb21haW4kLmtleShwa0NsYXNzKVxuLy8gICB9XG4vLyAgIGVsc2Uge1xuLy8gICAgICQgPSB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX3JhbmdlJC5rZXkocGtDbGFzcylcbi8vICAgfVxuXG4vLyAgIC8vIGZpbHRlciBwcm9wZXJ0aWVzIHRoYXQgYXJlIGluIGF0IGxlYXN0IG9uZSBwcm9maWxlIGVuYWJsZWQgYnkgcHJvamVjdFxuLy8gICBjb25zdCBwcm9maWxlcyQgPSB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuXG5cbi8vICAgLy8gRmlsdGVyIG91dCBvbmx5IHRoZSBwcm9wZXJ0aWVzIGZvciB3aGljaCB0YXJnZXQgY2xhc3MgaXMgYWxsb3dlZFxuLy8gICByZXR1cm4gY29tYmluZUxhdGVzdCgkLCBwcm9maWxlcyQpXG4vLyAgICAgLnBpcGUoXG4vLyAgICAgICBtYXAoKFtwcm9wcywgcHJvZmlsZXNdKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHA6IERmaFByb3BlcnR5U3RhdHVzW10gPSBbXVxuXG4vLyAgICAgICAgIHZhbHVlcyhwcm9wcykuZm9yRWFjaChwcm9wID0+IHtcblxuXG4vLyAgICAgICAgICAgY29uc3QgcHJvcFByb2ZpbGVSZWwgPSBwcm9wLnByb2ZpbGVzIGFzIFByb2ZpbGVzXG5cbi8vICAgICAgICAgICBsZXQgZW5hYmxlZEluQVByb2ZpbGUgPSBmYWxzZTtcblxuLy8gICAgICAgICAgIGxldCByZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gdHJ1ZTtcblxuLy8gICAgICAgICAgIHByb3BQcm9maWxlUmVsLmZvckVhY2goaXRlbSA9PiB7XG4vLyAgICAgICAgICAgICBpZiAocHJvZmlsZXMuaW5jbHVkZXMoaXRlbS5ma19wcm9maWxlKSkge1xuLy8gICAgICAgICAgICAgICBlbmFibGVkSW5BUHJvZmlsZSA9IHRydWU7XG4vLyAgICAgICAgICAgICAgIGlmIChpdGVtLnJlbW92ZWRfZnJvbV9hcGkgPT09IGZhbHNlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IGZhbHNlXG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9KVxuXG4vLyAgICAgICAgICAgaWYgKGVuYWJsZWRJbkFQcm9maWxlKSB7XG4vLyAgICAgICAgICAgICBwLnB1c2goe1xuLy8gICAgICAgICAgICAgICAuLi5wcm9wLFxuLy8gICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfSlcblxuLy8gICAgICAgICByZXR1cm4gcFxuLy8gICAgICAgfSlcbi8vICAgICApXG5cbi8vIH1cblxuXG4vLyAvKipcbi8vICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBDbGFzc2VzXG4vLyAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0XG4vLyAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIGVuYWJsZWQgYnkgY2xhc3NfcHJval9yZWxcbi8vICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgcmVxdWlyZWQgYnkgc291cmNlcyBvciBieSBiYXNpY3Ncbi8vICAqXG4vLyAgKiB0aGlzIGlzIHVzZWZ1bGwgdG8gY2hlY2sgaWYgYSBjbGFzcyBpcyBhdmFpbGFibGUgYXQgYWxsXG4vLyAgKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzSW5FbnRpdGVzT3JSZXF1aXJlZCgpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbi8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgICAgdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4vLyAgICAgdGhpcy5waXBlQ2xhc3Nlc1JlcXVpcmVkKClcbi8vICAgKS5waXBlKFxuLy8gICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuLy8gICAgIHN0YXJ0V2l0aCh7fSlcbi8vICAgKVxuLy8gfVxuIl19