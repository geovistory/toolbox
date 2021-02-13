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
import { cache, spyTag } from '../decorators/method-decorators';
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
    /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeProfilesEnabledByProject = /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
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
    /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSpecificFieldOfClass = /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @return {?}
     */
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
    /**
     * pipe all the basic fields of a class,
     * ordered by the position of the field within the basic fields
     * @param {?} pkClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeBasicFieldsOfClass = /**
     * pipe all the basic fields of a class,
     * ordered by the position of the field within the basic fields
     * @param {?} pkClass
     * @return {?}
     */
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
    /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     * @param {?} pkClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeFieldsForTeEnForm = /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     * @param {?} pkClass
     * @return {?}
     */
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
    /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     * @param {?} pkClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeBasicAndSpecificFields = /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     * @param {?} pkClass
     * @return {?}
     */
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
    /**
     * Pipes the fields of given class in this order:
     * - specific fields
     * - basic fields
     * @param {?} pkClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSpecificAndBasicFields = /**
     * Pipes the fields of given class in this order:
     * - specific fields
     * - basic fields
     * @param {?} pkClass
     * @return {?}
     */
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
    /********************************************** */
    /**
     * Delivers class label for active project
     * @param {?=} pkClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeClassLabel = /********************************************** */
    /**
     * Delivers class label for active project
     * @param {?=} pkClass
     * @return {?}
     */
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
    /**
     * Pipes ProTextProperty
     * @param {?} d
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeProTextProperty = /**
     * Pipes ProTextProperty
     * @param {?} d
     * @return {?}
     */
    function (d) {
        /** @type {?} */
        var key = textPropertyByFksKey(d);
        return this.s.pro$.text_property$.by_fks$.key(key);
    };
    /**
     * Pipes DfhLabel
     */
    /**
     * Pipes DfhLabel
     * @param {?} d
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeDfhLabel = /**
     * Pipes DfhLabel
     * @param {?} d
     * @return {?}
     */
    function (d) {
        /** @type {?} */
        var key = dfhLabelByFksKey(d);
        return this.s.dfh$.label$.by_fks$.key(key);
    };
    /**
     * Delivers best fitting field label for active project
    */
    /**
     * Delivers best fitting field label for active project
     * @param {?} fkProperty
     * @param {?} fkPropertyDomain
     * @param {?} fkPropertyRange
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeFieldLabel = /**
     * Delivers best fitting field label for active project
     * @param {?} fkProperty
     * @param {?} fkPropertyDomain
     * @param {?} fkPropertyRange
     * @return {?}
     */
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
    /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     * @param {?} targetClassPk
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTableNameOfClass = /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     * @param {?} targetClassPk
     * @return {?}
     */
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
    /**
     * returns an object where the keys are the pks of the Classes
     * used by the given project:
     * - or because the class is enabled by class_proj_rel
     * - or because the class is required by sources
     *
     * This is usefull to create select dropdowns of classes users will know
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeClassesInEntitiesOrSources = /**
     * returns an object where the keys are the pks of the Classes
     * used by the given project:
     * - or because the class is enabled by class_proj_rel
     * - or because the class is required by sources
     *
     * This is usefull to create select dropdowns of classes users will know
     * @return {?}
     */
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
    /**
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeClassesRequiredBySources = /**
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
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeClassesEnabledByProjectProfiles = /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
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
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all type classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypeClassesEnabledByProjectProfiles = /**
     * returns observable number[] wher the numbers are the pk_class
     * of all type classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
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
    /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeClassesEnabledInEntities = /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     * @return {?}
     */
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
    /**
     * returns an object where the keys are the pks of the TeEn Classes
     * used by the given project
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSelectedTeEnClassesInProject = /**
     * returns an object where the keys are the pks of the TeEn Classes
     * used by the given project
     * @return {?}
     */
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
    /**
     * Gets array of pk_class with teEn classes enabled in entities
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTeEnClassesEnabledInEntities = /**
     * Gets array of pk_class with teEn classes enabled in entities
     * @return {?}
     */
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
    /**
     * Gets array of pk_class with teEn classes required by sources
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTeEnClassesRequiredBySources = /**
     * Gets array of pk_class with teEn classes required by sources
     * @return {?}
     */
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
    /**
     *
     * @param {?=} enabledIn
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypeAndTypedClasses = /**
     *
     * @param {?=} enabledIn
     * @return {?}
     */
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
    /**
     * @param {?} pkTypedClasses
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypeAndTypedClassesOfTypedClasses = /**
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
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypeClassOfTypedClass = /**
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
    /**
     * @param {?} pkTypeClasses
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypedClassesOfTypeClasses = /**
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
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTypePropertyOfTypedClass = /**
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
    /**
     * @param {?} pkProperties
     * @param {?} isOutgoing
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeTargetClassesOfProperties = /**
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
        spyTag, cache({ refCount: false }),
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
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSpecificFieldOfClass", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeBasicFieldsOfClass", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFieldsForTeEnForm", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeBasicAndSpecificFields", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
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
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSubfieldTypeOfClass", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFieldConfigs", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeClassLabel", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeLabels", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeProTextProperty", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeDfhLabel", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Number, Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFieldLabel", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTableNameOfClass", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeClassesInEntitiesOrSources", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConfigurationPipesService.prototype, "pipeClassesRequiredBySources", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeClassesEnabledByProjectProfiles", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypeClassesEnabledByProjectProfiles", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConfigurationPipesService.prototype, "pipeClassesEnabledInEntities", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSelectedTeEnClassesInProject", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConfigurationPipesService.prototype, "pipeTeEnClassesEnabledInEntities", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ConfigurationPipesService.prototype, "pipeTeEnClassesRequiredBySources", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypeAndTypedClasses", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypeAndTypedClassesOfTypedClasses", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypeClassOfTypedClass", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypedClassesOfTypeClasses", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeTypePropertyOfTypedClass", null);
    tslib_1.__decorate([
        spyTag, cache({ refCount: false }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFNaEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7QUFNcEUsdUNBR0M7OztJQURDLG1EQUErQjs7QUFVakM7SUFjRSxtQ0FDVSxDQUE0QixFQUM1QixDQUF5QjtRQUR6QixNQUFDLEdBQUQsQ0FBQyxDQUEyQjtRQUM1QixNQUFDLEdBQUQsQ0FBQyxDQUF3QjtJQUMvQixDQUFDO0lBR0w7Ozs7TUFJRTs7Ozs7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QUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDaEUsUUFBUSxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNFO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcsIFByb0NvbmZpZywgU3lzQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgZGZoTGFiZWxCeUZrc0tleSwgcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXksIHRleHRQcm9wZXJ0eUJ5RmtzS2V5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBDbGFzc0NvbmZpZywgRGZoQ2xhc3MsIERmaExhYmVsLCBEZmhQcm9wZXJ0eSwgSW5mTGFuZ3VhZ2UsIFByb0NsYXNzRmllbGRDb25maWcsIFByb1RleHRQcm9wZXJ0eSwgUmVsYXRlZFByb2ZpbGUsIFN5c0NvbmZpZ0ZpZWxkRGlzcGxheSwgU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgU3lzQ29uZmlnVmFsdWUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGZsYXR0ZW4sIGluZGV4QnksIHVuaXEsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlLCBzcHlUYWcgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IEZpZWxkLCB9IGZyb20gJy4uL21vZGVscy9GaWVsZCdcbmltcG9ydCB7IEZpZWxkUGxhY2VPZkRpc3BsYXkgfSBmcm9tICcuLi9tb2RlbHMvRmllbGRQb3NpdGlvbidcbmltcG9ydCB7IFNwZWNpYWxGaWVsZFR5cGUgfSBmcm9tICcuLi9tb2RlbHMvU3BlY2lhbEZpZWxkVHlwZSdcbmltcG9ydCB7IFN1YmZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkJ1xuaW1wb3J0IHsgU3ViZmllbGRUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkVHlwZSdcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcblxuXG4vLyB0aGlzIGlzIHRoZVxuZXhwb3J0IHR5cGUgVGFibGVOYW1lID0gJ2FwcGVsbGF0aW9uJyB8ICdsYW5ndWFnZScgfCAncGxhY2UnIHwgJ3RpbWVfcHJpbWl0aXZlJyB8ICdsYW5nX3N0cmluZycgfCAnZGltZW5zaW9uJyB8ICdwZXJzaXN0ZW50X2l0ZW0nIHwgJ3RlbXBvcmFsX2VudGl0eSdcblxuZXhwb3J0IGludGVyZmFjZSBEZmhQcm9wZXJ0eVN0YXR1cyBleHRlbmRzIERmaFByb3BlcnR5IHtcbiAgLy8gdHJ1ZSwgaWYgcmVtb3ZlZCBmcm9tIGFsbCBwcm9maWxlcyBvZiB0aGUgY3VycmVudCBwcm9qZWN0XG4gIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGJvb2xlYW5cbn1cblxudHlwZSBMYWJlbE9yaWdpbiA9ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfCAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfCAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnIHwgJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIG9udG9tZSBpbiBlbmdsaXNoJ1xudHlwZSBQcm9maWxlcyA9IHtcbiAgZmtfcHJvZmlsZTogbnVtYmVyO1xuICByZW1vdmVkX2Zyb21fYXBpOiBib29sZWFuO1xufVtdO1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG4vKipcbiAqIFRoaXMgU2VydmljZSBwcm92aWRlcyBhIGNvbGxlY3Rpb24gb2YgcGlwZXMgdGhhdCBhZ2dyZWdhdGUgb3IgdHJhbnNmb3JtIGNvbmZpZ3VyYXRpb24gZGF0YS5cbiAqIFdoZW4gdGFsa2luZyBhYm91dCBjb25maWd1cmF0aW9uLCB3ZSBtZWFuIHRoZSBjb25jZXB0dWFsIHJlZmVyZW5jZSBtb2RlbCBhbmQgdGhlIGFkZGl0aW9uYWxcbiAqIGNvbmZpZ3VyYXRpb25zIG9uIHN5c3RlbSBhbmQgcHJvamVjdCBsZXZlbC5cbiAqIEZvciBFeGFtcGxlXG4gKiAtIHRoZSBmaWVsZHMgb2YgYSBjbGFzc1xuICogLSB0aGUgbGFiZWxzIG9mIGNsYXNzZXMgYW5kIHByb3BlcnRpZXNcbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYTogQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICkgeyB9XG5cblxuICAvKipcbiAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX3Byb2ZpbGVcbiAgKiBvZiBhbGwgcHJvZmlsZXMgdGhhdCBhcmUgZW5hYmxlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdC5cbiAgKiBUaGUgYXJyYXkgd2lsbCBhbHdheXMgaW5jbHVkZSBQS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfcHJvZmlsZV9wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZCRcbiAgICAgICAgLmtleShwa1Byb2plY3QgKyAnX3RydWUnKS5waXBlKFxuICAgICAgICAgIG1hcChwcm9qZWN0UHJvZmlsZVJlbHMgPT4gdmFsdWVzKHByb2plY3RQcm9maWxlUmVscylcbiAgICAgICAgICAgIC5maWx0ZXIocmVsID0+IHJlbC5lbmFibGVkKVxuICAgICAgICAgICAgLm1hcChyZWwgPT4gcmVsLmZrX3Byb2ZpbGUpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBtYXAoZW5hYmxlZCA9PiBbLi4uZW5hYmxlZCwgRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ10pLFxuICAgICAgICApKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIGFsbCBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAgICogVGhlIEZpZWxkcyBhcmUgbm90IG9yZGVyZWQgYW5kIG5vdCBmaWx0ZXJlZFxuICAgKiBJZiB5b3Ugd2FudCBzcGVjaWZpYyBzdWJzZXRzIG9mIEZpZWxkcyBhbmQvb3Igb3JkZXJlZCBGaWVsZHMsIHVzZSB0aGUgcGlwZXNcbiAgICogdGhhdCBidWlsZCBvbiB0aGlzIHBpcGUuXG4gICAqL1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIHBpcGUgc291cmNlIGNsYXNzXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKSxcbiAgICAgIC8vIHBpcGUgb3V0Z29pbmcgcHJvcGVydGllc1xuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19kb21haW4kLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBpbmdvaW5nIHByb3BlcnRpZXNcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfcmFuZ2UkLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBzeXMgY29uZmlnXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAvLyBwaXBlIGVuYWJsZWQgcHJvZmlsZXNcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpLFxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW3NvdXJjZUtsYXNzLCBvdXRnb2luZ1Byb3BzLCBpbmdvaW5nUHJvcHMsIHN5c0NvbmZpZywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuXG4gICAgICAgIC8vIGlmIGNsYXNzIGlzIG5vdCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UsIGFkZCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UgKDExMTEpIHByb3BlcnR5XG4gICAgICAgIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4gICAgICAgICAgaW5nb2luZ1Byb3BzLnB1c2goY3JlYXRlQXBwZWxsYXRpb25Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBpcyB0ZW1wb3JhbCBlbnRpdHksIGFkZCBoYXMgdGltZSBzcGFuIHByb3BlcnR5XG4gICAgICAgIGlmIChzb3VyY2VLbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4gICAgICAgICAgb3V0Z29pbmdQcm9wcy5wdXNoKGNyZWF0ZUhhc1RpbWVTcGFuUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgIH1cblxuICAgICAgICBvdXRnb2luZ1Byb3BzLnB1c2goY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KHBrQ2xhc3MpKVxuXG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRnb2luZ1Byb3BzLCB0cnVlLCBlbmFibGVkUHJvZmlsZXMsIHN5c0NvbmZpZyksXG4gICAgICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKGluZ29pbmdQcm9wcywgZmFsc2UsIGVuYWJsZWRQcm9maWxlcywgc3lzQ29uZmlnKSxcbiAgICAgICAgICB0aGlzLnBpcGVGaWVsZENvbmZpZ3MocGtDbGFzcylcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcCgoW3N1YmZpZWxkczEsIHN1YmZpZWxkczIsIGZpZWxkQ29uZmlnc10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1YmZpZWxkcyA9IFsuLi5zdWJmaWVsZHMxLCAuLi5zdWJmaWVsZHMyXVxuXG4gICAgICAgICAgICBjb25zdCBmaWVsZENvbmZpZ0lkeCA9IGluZGV4QnkoKHgpID0+IFtcbiAgICAgICAgICAgICAgKHguZmtfZG9tYWluX2NsYXNzIHx8IHguZmtfcmFuZ2VfY2xhc3MpLFxuICAgICAgICAgICAgICB4LmZrX3Byb3BlcnR5LFxuICAgICAgICAgICAgICAhIXguZmtfZG9tYWluX2NsYXNzXG4gICAgICAgICAgICBdLmpvaW4oJ18nKSwgZmllbGRDb25maWdzKVxuXG4gICAgICAgICAgICBjb25zdCB1bmlxRmllbGRzOiB7IFt1aWQ6IHN0cmluZ106IEZpZWxkIH0gPSB7fVxuICAgICAgICAgICAgY29uc3QgdW5pcVN1YmZpZWxkQ2FjaGU6IHsgW3VpZDogc3RyaW5nXTogdHJ1ZSB9ID0ge31cblxuXG4gICAgICAgICAgICAvLyBncm91cCBieSBzb3VyY2UsIHBrUHJvcGVydHkgYW5kIGlzT3V0Z29pbmdcbiAgICAgICAgICAgIGZvciAoY29uc3QgcyBvZiBzdWJmaWVsZHMpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRJZCA9IFtzLnNvdXJjZUNsYXNzLCBzLnByb3BlcnR5LnBrUHJvcGVydHksIHMuaXNPdXRnb2luZ10uam9pbignXycpXG4gICAgICAgICAgICAgIGNvbnN0IHN1YmZpZWxkSWQgPSBbcy5zb3VyY2VDbGFzcywgcy5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBzLmlzT3V0Z29pbmcsIHMudGFyZ2V0Q2xhc3NdLmpvaW4oJ18nKVxuICAgICAgICAgICAgICBjb25zdCBmaWVsZENvbmZpZzogUHJvQ2xhc3NGaWVsZENvbmZpZyB8IHVuZGVmaW5lZCA9IGZpZWxkQ29uZmlnSWR4W2ZpZWxkSWRdO1xuICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgdGltZSB0aGUgZ3JvdXAgaXMgZXN0YWJsaXNoZWRcbiAgICAgICAgICAgICAgaWYgKCF1bmlxRmllbGRzW2ZpZWxkSWRdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzU3BlY2lhbEZpZWxkOiBTcGVjaWFsRmllbGRUeXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIYXNUeXBlRmllbGQpIGlzU3BlY2lhbEZpZWxkID0gJ2hhcy10eXBlJztcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnByb3BlcnR5LnBrUHJvcGVydHkgPT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOKSBpc1NwZWNpYWxGaWVsZCA9ICd0aW1lLXNwYW4nO1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0gPSB7XG4gICAgICAgICAgICAgICAgICBzb3VyY2VDbGFzczogcy5zb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUNsYXNzTGFiZWw6IHMuc291cmNlQ2xhc3NMYWJlbCxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZU1heFF1YW50aXR5OiBzLnNvdXJjZU1heFF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgc291cmNlTWluUXVhbnRpdHk6IHMuc291cmNlTWluUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNaW5RdWFudGl0eTogcy50YXJnZXRNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiBzLnRhcmdldE1heFF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IHMubGFiZWwsXG4gICAgICAgICAgICAgICAgICBpc0hhc1R5cGVGaWVsZDogcy5pc0hhc1R5cGVGaWVsZCxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBzLnByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogcy5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogcy5pZGVudGl0eURlZmluaW5nRm9yU291cmNlLFxuICAgICAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogcy5pZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgb250b0luZm9MYWJlbDogcy5vbnRvSW5mb0xhYmVsLFxuICAgICAgICAgICAgICAgICAgb250b0luZm9Vcmw6IHMub250b0luZm9VcmwsXG4gICAgICAgICAgICAgICAgICBhbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXMsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzOiBbcy50YXJnZXRDbGFzc10sXG4gICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbnM6IFtzXSxcbiAgICAgICAgICAgICAgICAgIGZpZWxkQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgcGxhY2VPZkRpc3BsYXk6IGdldFBsYWNlT2ZEaXNwbGF5KHN5c0NvbmZpZy5zcGVjaWFsRmllbGRzLCBzLCBmaWVsZENvbmZpZyksXG4gICAgICAgICAgICAgICAgICBpc1NwZWNpYWxGaWVsZFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG1hcmsgc3ViZmllbGQgYXMgYWRkZWRcbiAgICAgICAgICAgICAgICB1bmlxU3ViZmllbGRDYWNoZVtzdWJmaWVsZElkXSA9IHRydWU7XG5cblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGlnbm9yZSBkdXBsaWNhdGlvbnMgb2Ygc3ViZmllbGRzXG4gICAgICAgICAgICAgIGVsc2UgaWYgKCF1bmlxU3ViZmllbGRDYWNoZVtzdWJmaWVsZElkXSkge1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9PT0gZmFsc2UgP1xuICAgICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gZmFsc2UgOlxuICAgICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzO1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0udGFyZ2V0Q2xhc3Nlcy5wdXNoKHMudGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5saXN0RGVmaW5pdGlvbnMucHVzaChzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXModW5pcUZpZWxkcylcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogcGlwZSBhbGwgdGhlIHNwZWNpZmljIGZpZWxkcyBvZiBhIGNsYXNzLFxuICAgKiBvcmRlcmVkIGJ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoZmllbGRzID0+IGZpZWxkc1xuICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzKVxuICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uIC0gYi5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbilcbiAgICAgIClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICAqIHBpcGUgYWxsIHRoZSBiYXNpYyBmaWVsZHMgb2YgYSBjbGFzcyxcbiAgICAqIG9yZGVyZWQgYnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIGJhc2ljIGZpZWxkc1xuICAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcykucGlwZShcbiAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzXG4gICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gYmFzaWMgZmllbGRzXG4gICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMpXG4gICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBiYXNpYyBmaWVsZHNcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMucG9zaXRpb24gLSBiLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzLnBvc2l0aW9uKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG5cblxuXG4gIC8qKlxuICAgICAqIFBpcGVzIHRoZSBmaWVsZHMgZm9yIHRlbXBvcmFsIGVudGl0eSBmb3Jtc1xuICAgICAqIC0gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAqIC0gdGhlIHdoZW4gZmllbGRcbiAgICAgKiAtIGlmIGF2YWlsYWJsZTogdGhlIHR5cGUgZmllbGRcbiAgICAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHNGb3JUZUVuRm9ybShwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MpLnBpcGUoXG4gICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgbWFwKGFsbEZpZWxkcyA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IGFsbEZpZWxkc1xuICAgICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcylcbiAgICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24gLSBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uKVxuXG4gICAgICAgIGNvbnN0IHdoZW5GaWVsZCA9IGFsbEZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHkgPT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOKVxuICAgICAgICBpZiAod2hlbkZpZWxkKSBmaWVsZHMucHVzaCh3aGVuRmllbGQpXG5cbiAgICAgICAgY29uc3QgdHlwZUZpZWxkID0gYWxsRmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaXNIYXNUeXBlRmllbGQpXG4gICAgICAgIGlmICh0eXBlRmllbGQpIGZpZWxkcy5wdXNoKHR5cGVGaWVsZClcblxuICAgICAgICByZXR1cm4gZmllbGRzO1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cblxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3MgaW4gdGhpcyBvcmRlcjpcbiAgICogLSBiYXNpYyBmaWVsZHNcbiAgICogLSBzcGVjaWZpYyBmaWVsZHNcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MpLFxuICAgICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzcylcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbYSwgYl0pID0+IFsuLi5hLCAuLi5iXSlcbiAgICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGVzIHRoZSBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3MgaW4gdGhpcyBvcmRlcjpcbiAgKiAtIHNwZWNpZmljIGZpZWxkc1xuICAqIC0gYmFzaWMgZmllbGRzXG4gICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzcyksXG4gICAgICB0aGlzLnBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzcyksXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuXG5cblxuXG5cblxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwcml2YXRlIHBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoXG4gICAgcHJvcGVydGllczogRGZoUHJvcGVydHlbXSxcbiAgICBpc091dGdvaW5nOiBib29sZWFuLFxuICAgIGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sXG4gICAgc3lzQ29uZmlnOiBTeXNDb25maWdWYWx1ZVxuICApOiBPYnNlcnZhYmxlPFN1YmZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICBwcm9wZXJ0aWVzLm1hcChwID0+IHtcblxuICAgICAgICBjb25zdCBvID0gaXNPdXRnb2luZztcbiAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBvID8gcC5oYXNfcmFuZ2UgOiBwLmhhc19kb21haW47XG4gICAgICAgIGNvbnN0IHNvdXJjZUNsYXNzID0gbyA/IHAuaGFzX2RvbWFpbiA6IHAuaGFzX3JhbmdlO1xuICAgICAgICBjb25zdCB0YXJnZXRNYXhRdWFudGl0eSA9IG8gP1xuICAgICAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyIDpcbiAgICAgICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI7XG5cbiAgICAgICAgY29uc3Qgc291cmNlTWF4UXVhbnRpdHkgPSBvID9cbiAgICAgICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIgOlxuICAgICAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyO1xuXG4gICAgICAgIGNvbnN0IHRhcmdldE1pblF1YW50aXR5ID0gbyA/XG4gICAgICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXIgOlxuICAgICAgICAgIHAuZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjtcblxuICAgICAgICBjb25zdCBzb3VyY2VNaW5RdWFudGl0eSA9IG8gP1xuICAgICAgICAgIHAuZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllciA6XG4gICAgICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI7XG5cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5waXBlQ2xhc3NMYWJlbChzb3VyY2VDbGFzcyksXG4gICAgICAgICAgdGhpcy5waXBlQ2xhc3NMYWJlbCh0YXJnZXRDbGFzcyksXG4gICAgICAgICAgdGhpcy5waXBlU3ViZmllbGRUeXBlT2ZDbGFzcyhzeXNDb25maWcsIHRhcmdldENsYXNzLCB0YXJnZXRNYXhRdWFudGl0eSksXG4gICAgICAgICAgdGhpcy5waXBlRmllbGRMYWJlbChcbiAgICAgICAgICAgIHAucGtfcHJvcGVydHksXG4gICAgICAgICAgICBpc091dGdvaW5nID8gcC5oYXNfZG9tYWluIDogbnVsbCxcbiAgICAgICAgICAgIGlzT3V0Z29pbmcgPyBudWxsIDogcC5oYXNfcmFuZ2UsXG4gICAgICAgICAgKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKChbc291cmNlQ2xhc3NMYWJlbCwgdGFyZ2V0Q2xhc3NMYWJlbCwgbGlzdFR5cGUsIGxhYmVsXSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBub2RlOiBTdWJmaWVsZCA9IHtcbiAgICAgICAgICAgICAgbGlzdFR5cGUsXG4gICAgICAgICAgICAgIHNvdXJjZUNsYXNzLFxuICAgICAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsLFxuICAgICAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgc291cmNlTWluUXVhbnRpdHksXG4gICAgICAgICAgICAgIHRhcmdldENsYXNzLFxuICAgICAgICAgICAgICB0YXJnZXRDbGFzc0xhYmVsLFxuICAgICAgICAgICAgICB0YXJnZXRNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHksXG4gICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICBpc0hhc1R5cGVGaWVsZDogbyAmJiBwLmlzX2hhc190eXBlX3N1YnByb3BlcnR5LFxuICAgICAgICAgICAgICBwcm9wZXJ0eTogeyBwa1Byb3BlcnR5OiBwLnBrX3Byb3BlcnR5IH0sXG4gICAgICAgICAgICAgIGlzT3V0Z29pbmc6IG8sXG4gICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IG8gPyBwLmlkZW50aXR5X2RlZmluaW5nIDogZmFsc2UsIC8vIHJlcGxhY2UgZmFsc2Ugd2l0aCBwLmlkZW50aXR5X2RlZmluaW5nX2Zvcl9yYW5nZSB3aGVuIGF2YWlsYWJsZVxuICAgICAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBvID8gZmFsc2UgOiBwLmlkZW50aXR5X2RlZmluaW5nLCAvLyByZXBsYWNlIGZhbHNlIHdpdGggcC5pZGVudGl0eV9kZWZpbmluZ19mb3JfcmFuZ2Ugd2hlbiBhdmFpbGFibGVcbiAgICAgICAgICAgICAgb250b0luZm9MYWJlbDogcC5pZGVudGlmaWVyX2luX25hbWVzcGFjZSxcbiAgICAgICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvJyArIHAucGtfcHJvcGVydHksXG4gICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGlzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyhlbmFibGVkUHJvZmlsZXMsIChwLnByb2ZpbGVzIHx8IFtdKSksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgdHlwZSBvZiBTdWJmaWVsZCBmb3IgYSBnaXZlbiBjbGFzc1xuICAgKiBDdXJyZW50bHkgKHRvIGJlIHJldmlzZWQgaWYgZ29vZCkgc3VibGNhc3NlcyBvZiBFNTUgVHlwZSxcbiAgICogdGhhdCBhcmUgdGhlIHRhcmdldCBvZiBhIGZpZWxkIHdpdGggdGFyZ2V0TWF4UWFudGl0eT0xLFxuICAgKiBnZXQgU3ViZmllbGQgdHlwZSAnaGFzVHlwZScuXG4gICAqIFRoZXJlZm9yZSB0YXJnZXRNYXhRdWFudGl0eSBpcyBuZWVkZWQuXG4gICAqXG4gICAqIFRoaXMgYmVoYXZpb3IgaGFzIHRvIGJlIHJldmlzZWQsIGJlY2F1c2UgaXQgY2FuIGxlYWQgdG8gcHJvYmxlbXNcbiAgICogd2hlbiB0aGUgU3ViZmllbGQgYmVsb25ncyB0byBhIEZpZWxkIHdpdGggbXVsdGlwbGUgdGFyZ2V0IGNsYXNzZXNcbiAgICogKGFuZCB0aHVzIFN1YmZpZWxkcykgYmVjYXVzZSB0aGUgVUkgdGhlbiBkb2VzIG5vdCBhbGxvdyB0byBjaG9vc2VcbiAgICogdGhlIHJpZ2h0IHRhcmdldCBjbGFzcy5cbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTdWJmaWVsZFR5cGVPZkNsYXNzKGNvbmZpZzogU3lzQ29uZmlnVmFsdWUsIHBrQ2xhc3M6IG51bWJlciwgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8U3ViZmllbGRUeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoXG4gICAgICBmaWx0ZXIoaSA9PiAhIWkpLFxuICAgICAgbWFwKChrbGFzcykgPT4gZ2V0U3ViZmllbGRUeXBlKGNvbmZpZywga2xhc3MsIHRhcmdldE1heFF1YW50aXR5KSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXRzIGNsYXNzIGZpZWxkIGNvbmZpZ3Mgb2YgZ2l2ZW4gcGtDbGFzc1xuICAgKlxuICAgKiAtIG9mIGFjdGl2ZSBwcm9qZWN0LCBpZiBhbnksIGVsc2VcbiAgICogLSBvZiBkZWZhdWx0IGNvbmZpZyBwcm9qZWN0LCBlbHNlXG4gICAqIC0gZW1wdHkgYXJyYXlcbiAgICpcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZENvbmZpZ3MocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxQcm9DbGFzc0ZpZWxkQ29uZmlnW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZmtQcm9qZWN0KSA9PiB7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdGtleSA9IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5KHtcbiAgICAgICAgICBma19jbGFzc19mb3JfY2xhc3NfZmllbGQ6IHBrQ2xhc3MsXG4gICAgICAgICAgZmtfcHJvamVjdDogZmtQcm9qZWN0XG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0a2V5ID0gcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXkoe1xuICAgICAgICAgIGZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZDogcGtDbGFzcyxcbiAgICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNUXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucy5wcm8kLmNsYXNzX2ZpZWxkX2NvbmZpZyQuYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkLmtleShhY3RpdmVQcm9qZWN0a2V5KSxcbiAgICAgICAgICB0aGlzLnMucHJvJC5jbGFzc19maWVsZF9jb25maWckLmJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJC5rZXkoZGVmYXVsdFByb2plY3RrZXkpXG4gICAgICAgIClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCgoW2FjdGl2ZVByb2plY3RGaWVsZHMsIGRlZmF1bHRQcm9qZWN0RmllbGRzXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWN0aXZlUHJvamVjdEZpZWxkcyAmJiB2YWx1ZXMoYWN0aXZlUHJvamVjdEZpZWxkcykubGVuZ3RoKSByZXR1cm4gYWN0aXZlUHJvamVjdEZpZWxkcztcblxuICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFByb2plY3RGaWVsZHNcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChpdGVtcykgPT4gdmFsdWVzKGl0ZW1zKS5zb3J0KChhLCBiKSA9PiAoYS5vcmRfbnVtID4gYi5vcmRfbnVtID8gMSA6IC0xKSkpLFxuICAgICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBjbGFzcyBsYWJlbCBmb3IgYWN0aXZlIHByb2plY3RcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc0xhYmVsKHBrQ2xhc3M/OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKHsgcGtDbGFzcywgZmtQcm9qZWN0LCBsYW5ndWFnZSwgdHlwZTogJ2xhYmVsJyB9KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBpID0gaXRlbXMuZmluZChpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICAgIHJldHVybiBpID8gaS50ZXh0IDogYCogbm8gbGFiZWwgKGlkOiAke3BrQ2xhc3N9KSAqYFxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogRGVsaXZlcnMgYXJyYXkgb2Ygb2JqZWN0cyB3aXRoXG4gICAqIHRleHQgfiB0aGUgdGV4dCBvZiB0aGUgcHJvcGVydHlcbiAgICogb3JpZ2luLCBpbiB0aGlzIG9yZGVyOlxuICAgKiAtIG9yaWdpbiA9PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnICAgICAgICAgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCcgICAgICAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgICAgICAgICAgKGZyb20gZGF0YV9mb3JfaGlzdG9yeS5sYWJlbClcbiAgICogLSBvcmlnaW4gPT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJyAgICAgICAgICAgICAgIChmcm9tIGRhdGFfZm9yX2hpc3RvcnkubGFiZWwpXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlTGFiZWxzKGQ6IHtcbiAgICBma1Byb2plY3Q6IG51bWJlcixcbiAgICB0eXBlOiAnbGFiZWwnIHwgJ2RlZmluaXRpb24nIHwgJ3Njb3BlTm90ZScsXG4gICAgbGFuZ3VhZ2U6IEluZkxhbmd1YWdlLFxuICAgIHBrQ2xhc3M/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eT86IG51bWJlcixcbiAgICBma1Byb3BlcnR5RG9tYWluPzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHlSYW5nZT86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8e1xuICAgIG9yaWdpbjogTGFiZWxPcmlnaW5cbiAgICB0ZXh0OiBzdHJpbmdcbiAgfVtdPiB7XG4gICAgbGV0IGZrX3N5c3RlbV90eXBlOiBudW1iZXI7XG5cbiAgICBpZiAoZC5wa0NsYXNzKSB7XG4gICAgICBzd2l0Y2ggKGQudHlwZSkge1xuICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgZmtfc3lzdGVtX3R5cGUgPSBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdma19zeXN0ZW1fdHlwZSBub3QgZm91bmQnKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkLmZrUHJvcGVydHkpIHtcbiAgICAgIHN3aXRjaCAoZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xhYmVsJzpcbiAgICAgICAgICBma19zeXN0ZW1fdHlwZSA9IFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUxcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZrX3N5c3RlbV90eXBlIG5vdCBmb3VuZCcpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIGxhYmVsIG9mIHByb2plY3QgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBkLmZrUHJvamVjdCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UucGtfZW50aXR5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiBkLmxhbmd1YWdlLnBrX2VudGl0eSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiAxODg4OSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgZnJvbSBvbnRvbWUgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVEZmhMYWJlbCh7XG4gICAgICAgIGxhbmd1YWdlOiBkLmxhbmd1YWdlLmlzbzYzOTEudHJpbSgpLFxuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBma19jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19wcm9wZXJ0eTogZC5ma1Byb3BlcnR5XG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIGZyb20gb250b21lIGluIGVuZ2xpc2hcbiAgICAgIHRoaXMucGlwZURmaExhYmVsKHtcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgIGZrX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX3Byb3BlcnR5OiBkLmZrUHJvcGVydHlcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIFByb1RleHRQcm9wZXJ0eVxuICAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb1RleHRQcm9wZXJ0eShkOiB7XG4gICAgZmtfcHJvamVjdDogbnVtYmVyLFxuICAgIGZrX3N5c3RlbV90eXBlOiBudW1iZXIsXG4gICAgZmtfbGFuZ3VhZ2U6IG51bWJlcixcbiAgICBma19kZmhfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW4/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlPzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxQcm9UZXh0UHJvcGVydHk+IHtcbiAgICBjb25zdCBrZXkgPSB0ZXh0UHJvcGVydHlCeUZrc0tleShkKVxuICAgIHJldHVybiB0aGlzLnMucHJvJC50ZXh0X3Byb3BlcnR5JC5ieV9ma3MkLmtleShrZXkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgRGZoTGFiZWxcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVEZmhMYWJlbChkOiB7XG4gICAgdHlwZTogJ2xhYmVsJyB8ICdkZWZpbml0aW9uJyB8ICdzY29wZU5vdGUnLFxuICAgIGxhbmd1YWdlOiBzdHJpbmcsXG4gICAgZmtfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfcHJvZmlsZT86IG51bWJlcixcbiAgICBma19wcm9wZXJ0eT86IG51bWJlcixcbiAgICBma19wcm9qZWN0PzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxEZmhMYWJlbD4ge1xuICAgIGNvbnN0IGtleSA9IGRmaExhYmVsQnlGa3NLZXkoZClcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQubGFiZWwkLmJ5X2ZrcyQua2V5KGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBiZXN0IGZpdHRpbmcgZmllbGQgbGFiZWwgZm9yIGFjdGl2ZSBwcm9qZWN0XG4gICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZExhYmVsKGZrUHJvcGVydHk6IG51bWJlciwgZmtQcm9wZXJ0eURvbWFpbjogbnVtYmVyLCBma1Byb3BlcnR5UmFuZ2U6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgaXNPdXRnb2luZyA9ICEhZmtQcm9wZXJ0eURvbWFpbjtcbiAgICAvLyBjb25zdCBzeXN0ZW1fdHlwZSA9IGlzT3V0Z29pbmcgPyAoc2luZ3VsYXIgPyAxODAgOiAxODEpIDogKHNpbmd1bGFyID8gMTgyIDogMTgzKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKFxuICAgICAgICB7XG4gICAgICAgICAgZmtQcm9qZWN0LFxuICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgZmtQcm9wZXJ0eSxcbiAgICAgICAgICBma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgIGZrUHJvcGVydHlSYW5nZVxuICAgICAgICB9XG4gICAgICApXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSBgKiBubyBsYWJlbCAoaWQ6ICR7ZmtQcm9wZXJ0eX0pICpgO1xuICAgICAgICAgICAgaXRlbXMuc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaXRlbSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpdGVtLnRleHRcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIGl0ZW0gJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpc091dGdvaW5nID8gaXRlbS50ZXh0IDogJyogcmV2ZXJzZSBvZjogJyArIGl0ZW0udGV4dCArICcqJ1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gbGFiZWxcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogbWFwcyB0aGUgY2xhc3MgdG8gdGhlIGNvcnJlc3BvbmRpbmcgbW9kZWwgKGRhdGFiYXNlIHRhYmxlKVxuICAgKiB0aGlzIGlzIHVzZWQgYnkgRm9ybXMgdG8gY3JlYXRlIG5ldyBkYXRhIGluIHRoZSBzaGFwZSBvZlxuICAgKiB0aGUgZGF0YSBtb2RlbFxuICAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRhYmxlTmFtZU9mQ2xhc3ModGFyZ2V0Q2xhc3NQazogbnVtYmVyKTogT2JzZXJ2YWJsZTxUYWJsZU5hbWU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQsXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleSh0YXJnZXRDbGFzc1BrKVxuICAgICkucGlwZShcbiAgICAgIGZpbHRlcihpID0+ICFpLmluY2x1ZGVzKHVuZGVmaW5lZCkpLFxuICAgICAgbWFwKChbY29uZmlnLCBrbGFzc10pID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3NDb25maWc6IENsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNbdGFyZ2V0Q2xhc3NQa107XG4gICAgICAgIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcblxuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpXG4gICAgICAgICAgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuXG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1swXTtcbiAgICAgICAgICBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gJ2FwcGVsbGF0aW9uJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUubGFuZ3VhZ2UpIHJldHVybiAnbGFuZ3VhZ2UnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5wbGFjZSkgcmV0dXJuICdwbGFjZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLnRpbWVQcmltaXRpdmUpIHJldHVybiAndGltZV9wcmltaXRpdmUnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gJ2xhbmdfc3RyaW5nJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gJ2RpbWVuc2lvbic7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3QgdHlwZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDggfHwga2xhc3MuYmFzaWNfdHlwZSA9PT0gMzApIHtcbiAgICAgICAgICByZXR1cm4gJ3BlcnNpc3RlbnRfaXRlbSdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJ3RlbXBvcmFsX2VudGl0eSdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuICAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0OlxuICAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIGVuYWJsZWQgYnkgY2xhc3NfcHJval9yZWxcbiAgICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZnVsbCB0byBjcmVhdGUgc2VsZWN0IGRyb3Bkb3ducyBvZiBjbGFzc2VzIHVzZXJzIHdpbGwga25vd1xuICAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNJbkVudGl0aWVzT3JTb3VyY2VzKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuICAgICAgc3RhcnRXaXRoKHt9KVxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJylcbiAgICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICAqIG9mIHRodGUgZ2l2ZW4gcHJvamVjdFxuICAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNFbmFibGVkQnlQcm9qZWN0UHJvZmlsZXMoKTogT2JzZXJ2YWJsZTxEZmhDbGFzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQuYWxsJCxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IGtsYXNzLnByb2ZpbGVzLnNvbWUocHJvZmlsZSA9PiBwcm9maWxlc01hcFtwcm9maWxlLmZrX3Byb2ZpbGVdKSlcbiAgICAgIH0pXG4gICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICogb2YgYWxsIHR5cGUgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICogb2YgdGh0ZSBnaXZlbiBwcm9qZWN0XG4gICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQ2xhc3Nlc0VuYWJsZWRCeVByb2plY3RQcm9maWxlcygpOiBPYnNlcnZhYmxlPERmaENsYXNzW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfYmFzaWNfdHlwZSQua2V5KDMwKSxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrbGFzcy5wcm9maWxlcy5zb21lKHByb2ZpbGUgPT4gcHJvZmlsZXNNYXBbcHJvZmlsZS5ma19wcm9maWxlXSkgJiZcbiAgICAgICAgICAgICAgLy8gRXhjbHVkZSBNYW5pZmVzdGF0aW9uIHByb2R1Y3QgdHlwZSBhbmQgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgIVtcbiAgICAgICAgICAgICAgICBEZmhDb25maWcuQ0xBU1NfUEtfTEFOR1VBR0UsXG4gICAgICAgICAgICAgICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFXG4gICAgICAgICAgICAgIF0uaW5jbHVkZXMoa2xhc3MucGtfY2xhc3MpXG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlcmUgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGFjdGl2ZSBwcm9qZWN0ICh1c2luZyBjbGFzc19wcm9qX3JlbClcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfY2xhc3NfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkLmtleShwa1Byb2plY3QgKyAnX3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVscykgPT4gdmFsdWVzKHJlbHMpLm1hcChyZWwgPT4gcmVsLmZrX2NsYXNzKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIFRlRW4gQ2xhc3Nlc1xuICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3RcbiAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNlbGVjdGVkVGVFbkNsYXNzZXNJblByb2plY3QoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbiAgICAgIHN0YXJ0V2l0aCh7fSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyBlbmFibGVkIGluIGVudGl0aWVzXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9jbGFzc19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChjcykgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB2YWx1ZXMoY3MpLm1hcChjID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KGMuZmtfY2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChkZmhDbGFzc2VzID0+IHRoaXMuZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzKSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgYXJyYXkgb2YgRGZoQ2xhc3MgZm9yIFRlRW4gQ2xhc3NlcyBhbmQgcmV0dXJucyBhcnJheSBvZiBwa19jbGFzc1xuICAgKiBAcGFyYW0gZGZoQ2xhc3NlcyBhcnJheSBvZiBEZmhDbGFzc1xuICAgKiBAcmV0dXJucyByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzIHdoZXJlIGNsYXNzIGlzIFRlRW4gY2xhc3NcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzOiBEZmhDbGFzc1tdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHBrczogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRmaENsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSBkZmhDbGFzc2VzW2ldO1xuICAgICAgaWYgKGMuYmFzaWNfdHlwZSA9PT0gOSkgcGtzLnB1c2goYy5wa19jbGFzcyk7XG4gICAgfVxuICAgIHJldHVybiBwa3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoY3MpID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdmFsdWVzKGNzKS5tYXAoYyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShjLmZrX2NsYXNzKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoZGZoQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXMpXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgfVxuXG5cblxuXG5cblxuICAvKipcbiAgICpcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzKGVuYWJsZWRJbj86ICdlbnRpdGllcycgfCAnc291cmNlcycpOiBPYnNlcnZhYmxlPHsgdHlwZWRDbGFzczogbnVtYmVyLCB0eXBlQ2xhc3M6IG51bWJlciB9W10+IHtcblxuICAgIGxldCBwa3MkOiBPYnNlcnZhYmxlPG51bWJlcltdPltdO1xuXG4gICAgY29uc3QgZnJvbVNvdXJjZXMkID0gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKGNsYXNzZXMgPT4gdmFsdWVzKGNsYXNzZXMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSxcbiAgICApXG5cbiAgICBjb25zdCBmcm9tRW50aXRpZXMkID0gdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKClcblxuICAgIGlmIChlbmFibGVkSW4gPT09ICdzb3VyY2VzJykge1xuICAgICAgcGtzJCA9IFtmcm9tU291cmNlcyRdO1xuICAgIH0gZWxzZSBpZiAoZW5hYmxlZEluID09PSAnZW50aXRpZXMnKSB7XG4gICAgICBwa3MkID0gW2Zyb21FbnRpdGllcyRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwa3MkID0gW2Zyb21Tb3VyY2VzJCwgZnJvbUVudGl0aWVzJF1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChwa3MkKS5waXBlKFxuICAgICAgbWFwKGFycmF5T2ZQa0FycmF5cyA9PiB1bmlxKGZsYXR0ZW48bnVtYmVyPihhcnJheU9mUGtBcnJheXMpKSksXG4gICAgICBzd2l0Y2hNYXAocGtzID0+IHRoaXMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3Nlcyhwa3MpKVxuICAgIClcbiAgfVxuXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMocGtUeXBlZENsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTx7IHR5cGVkQ2xhc3M6IG51bWJlciwgdHlwZUNsYXNzOiBudW1iZXIgfVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfZG9tYWluLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZWRDbGFzc2VzLm1hcChwayA9PiAoe1xuICAgICAgICAgIHR5cGVkQ2xhc3M6IHBrLFxuICAgICAgICAgIHR5cGVDbGFzczogYnlEb21haW5bcGtdID8gYnlEb21haW5bcGtdLmhhc19yYW5nZSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSlcbiAgICAgIH0pKVxuICB9XG5cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVDbGFzc09mVHlwZWRDbGFzcyhwa1R5cGVkQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19kb21haW4udG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gYnlEb21haW5bcGtUeXBlZENsYXNzXSA/IGJ5RG9tYWluW3BrVHlwZWRDbGFzc10uaGFzX3JhbmdlIDogdW5kZWZpbmVkXG4gICAgICB9KSlcbiAgfVxuXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHBrVHlwZUNsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX3JhbmdlLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZUNsYXNzZXMubWFwKHBrID0+IGJ5RG9tYWluW3BrXSA/IGJ5RG9tYWluW3BrXS5oYXNfZG9tYWluIDogdW5kZWZpbmVkKVxuICAgICAgfSkpXG4gIH1cblxuXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlUHJvcGVydHlPZlR5cGVkQ2xhc3MocGtUeXBlZENsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgdHlwZVByb3AgPSB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKS5maW5kKHAgPT4gcC5oYXNfZG9tYWluID09PSBwa1R5cGVkQ2xhc3MpXG4gICAgICAgIHJldHVybiB0eXBlUHJvcCA/IHR5cGVQcm9wLnBrX3Byb3BlcnR5IDogdW5kZWZpbmVkO1xuICAgICAgfSkpXG4gIH1cblxuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhwa1Byb3BlcnRpZXM6IG51bWJlcltdLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfcGtfcHJvcGVydHkkLmFsbCQucGlwZShcbiAgICAgIG1hcCh4ID0+IHtcbiAgICAgICAgaWYgKCFwa1Byb3BlcnRpZXMgfHwgIXBrUHJvcGVydGllcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgICAgICBjb25zdCByZXMgPSBbXVxuICAgICAgICBjb25zdCB0YXJnZXRDbGFzc2VzID0ge307XG4gICAgICAgIHBrUHJvcGVydGllcy5mb3JFYWNoKHBrUHJvcCA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcHMgPSB2YWx1ZXMoeFtwa1Byb3BdKTtcbiAgICAgICAgICBwcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBpc091dGdvaW5nID8gcHJvcC5oYXNfcmFuZ2UgOiBwcm9wLmhhc19kb21haW47XG4gICAgICAgICAgICBpZiAoIXRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdKSB7XG4gICAgICAgICAgICAgIHRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzLnB1c2godGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0U3ViZmllbGRUeXBlKGNvbmZpZzogU3lzQ29uZmlnVmFsdWUsIGtsYXNzOiBEZmhDbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlcik6IFN1YmZpZWxkVHlwZSB7XG5cbiAgbGV0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZ1xuICBpZiAoY29uZmlnKSBjbGFzc0NvbmZpZyA9IGNvbmZpZy5jbGFzc2VzW2tsYXNzLnBrX2NsYXNzXTtcbiAgaWYgKGNsYXNzQ29uZmlnICYmIGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSkge1xuICAgIHJldHVybiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGVcbiAgfVxuXG4gIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwICYmIHRhcmdldE1heFF1YW50aXR5ID09IDEpIHtcbiAgICByZXR1cm4geyB0eXBlSXRlbTogJ3RydWUnIH1cbiAgfVxuICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA4IHx8IGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwKSB7XG4gICAgcmV0dXJuIHsgZW50aXR5UHJldmlldzogJ3RydWUnIH1cbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4geyB0ZW1wb3JhbEVudGl0eTogJ3RydWUnIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc0RlZmluaXRpb25Qcm9wZXJ0eShkb21haW5DbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cblxuICBjb25zdCBoYXNEZWZpbml0aW9uOiBEZmhQcm9wZXJ0eSA9IHtcbiAgICBoYXNfZG9tYWluOiBkb21haW5DbGFzcyxcbiAgICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX1AxOF9IQVNfREVGSU5JVElPTixcbiAgICBoYXNfcmFuZ2U6IDc4NSxcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdQMTgnLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiBmYWxzZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0RlZmluaXRpb25cbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVBcHBlbGxhdGlvblByb3BlcnR5KHJhbmdlQ2xhc3M6IG51bWJlcikge1xuICBjb25zdCBwcm9maWxlczogUHJvZmlsZXMgPSBbXG4gICAge1xuICAgICAgcmVtb3ZlZF9mcm9tX2FwaTogZmFsc2UsXG4gICAgICBma19wcm9maWxlOiBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICAgfVxuICBdXG4gIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eSA9IHtcbiAgICBoYXNfZG9tYWluOiBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSVNfQVBQRUxMQVRJT05fT0YsXG4gICAgaGFzX3JhbmdlOiByYW5nZUNsYXNzLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDAsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ2hpc3RQOScsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IHRydWUsXG4gICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuICAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbiAgICBwcm9maWxlc1xuICB9XG4gIHJldHVybiBoYXNBcHBlUHJvcFxufVxuXG5cblxuZnVuY3Rpb24gY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShkb21haW5DbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cbiAgY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IGRvbWFpbkNsYXNzLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTixcbiAgICBoYXNfcmFuZ2U6IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4sXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDAsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdQNCcsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IGZhbHNlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzQXBwZVByb3Bcbn1cblxuXG5mdW5jdGlvbiBpc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMoZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSwgcHJvZmlsZXM6IFJlbGF0ZWRQcm9maWxlW10pOiBib29sZWFuIHtcbiAgcmV0dXJuICFwcm9maWxlcy5zb21lKHAgPT4gcC5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSAmJiBlbmFibGVkUHJvZmlsZXMuaW5jbHVkZXMocC5ma19wcm9maWxlKSlcblxufVxuXG5mdW5jdGlvbiBnZXRQbGFjZU9mRGlzcGxheShzcGVjaWFsRmllbGRzOiBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBzdWJmaWVsZDogU3ViZmllbGQsIHByb2plY3RGaWVsZENvbmZpZz86IFByb0NsYXNzRmllbGRDb25maWcpOiBGaWVsZFBsYWNlT2ZEaXNwbGF5IHtcbiAgbGV0IHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXk7XG5cbiAgc2V0dGluZ3MgPSBnZXRTZXR0aW5nc0Zyb21TeXNDb25maWcoc3ViZmllbGQsIHNwZWNpYWxGaWVsZHMsIHNldHRpbmdzKTtcblxuICAvLyBpZiB0aGlzIGlzIGEgc3BlY2lhbCBmaWVsZCwgY3JlYXRlIGNvcnJlc3BvbmRpbmcgZGlzcGxheSBzZXR0aW5ncyBhbmQgcmV0dXJuIGl0XG4gIGlmIChzZXR0aW5ncykge1xuICAgIGlmIChzZXR0aW5ncy5kaXNwbGF5SW5CYXNpY0ZpZWxkcykge1xuICAgICAgcmV0dXJuIHsgYmFzaWNGaWVsZHM6IHsgcG9zaXRpb246IHNldHRpbmdzLmRpc3BsYXlJbkJhc2ljRmllbGRzLnBvc2l0aW9uIH0gfVxuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MuaGlkZGVuKSB7XG4gICAgICByZXR1cm4geyBoaWRkZW46IHRydWUgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG90aGVyd2lzZSBkaXNwbGF5IHRoZSBmaWVsZCBpbiBzcGVjaWZpYyBmaWVsZHMgKGRlZmF1bHQpXG4gIGxldCBwb3NpdGlvbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgaWYgKHByb2plY3RGaWVsZENvbmZpZykgcG9zaXRpb24gPSBwcm9qZWN0RmllbGRDb25maWcub3JkX251bVxuICByZXR1cm4geyBzcGVjaWZpY0ZpZWxkczogeyBwb3NpdGlvbiB9IH1cblxufVxuZnVuY3Rpb24gZ2V0U2V0dGluZ3NGcm9tU3lzQ29uZmlnKFxuICBzdWJmaWVsZDogU3ViZmllbGQsIHNwZWNpYWxGaWVsZHM6IFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXkpIHtcbiAgaWYgKHN1YmZpZWxkLmlzT3V0Z29pbmcpIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgaGFzLXR5cGUtc3VicHJvcGVydHlcbiAgICBpZiAoc3ViZmllbGQuaXNIYXNUeXBlRmllbGQgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaGFzVHlwZVN1YnByb3BlcnRpZXMpIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5oYXNUeXBlU3VicHJvcGVydGllcztcbiAgICB9XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IHNvdXJjZSBjbGFzcyBhbmQgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgc291cmNlIGNsYXNzIGFuZCBwcm9wZXJ0eVxuICAgIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2V0dGluZ3M7XG59XG5cblxuXG5cblxuXG4vKipcbiAqIFBpcGVzIHRoZSBmaWVsZHMgZm9yIHRlbXBvcmFsIGVudGl0eSBmb3Jtc1xuICogLSB0aGUgc3BlY2lmaWMgZmllbGRzXG4gKiAtIHRoZSB3aGVuIGZpZWxkXG4gKiAtIGlmIGF2YWlsYWJsZTogdGhlIHR5cGUgZmllbGRcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkRGVmaW5pdGlvbnNGb3JUZUVuRm9ybShwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vICAgcmV0dXJuIG9mKFtdKVxuLy8gY29uc3QgaGFzVHlwZUxpc3REZWYkID0gdGhpcy5waXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3MpXG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZERlZmluaXRpb25zKHBrQ2xhc3MpXG4vLyAgICAgLnBpcGUoXG4vLyAgICAgICBtYXAoZmllbGRzID0+IGZpZWxkcy5maWx0ZXIoZiA9PiBmLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlKSlcbi8vICAgICApXG4vLyAgICxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gKS5waXBlKFxuLy8gICBtYXAoKFtmaWVsZHMsIGhhc1R5cGVMaXN0RGVmc10pID0+IHtcbi8vICAgICBjb25zdCB3aGVuID0gdGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTilcbi8vICAgICByZXR1cm4gW1xuLy8gICAgICAgLi4uZmllbGRzLFxuLy8gICAgICAgd2hlbixcbi8vICAgICAgIC4uLmhhc1R5cGVMaXN0RGVmcy5tYXAoKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgICAgICByZXR1cm4gdHlwZUZpZWxkO1xuLy8gICAgICAgfSlcbi8vICAgICBdXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLyoqXG4gKiBQaXBlIHRoZSBzcGVjaWZpYyBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNwZWNpZmljRmllbGREZWZpbml0aW9ucyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCB0cnVlKS5waXBlKFxuLy8gICAgIC8vIGZpbHRlciBvdXQgdGhlICdoYXMgdHlwZScgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKG91dGdvaW5nID0+IG91dGdvaW5nLmZpbHRlcihvID0+ICFvLmlzX2hhc190eXBlX3N1YnByb3BlcnR5KSlcbi8vICAgKSxcbi8vICAgdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgZmFsc2UpLnBpcGUoXG4vLyAgICAgLy8gZmlsdGVyIG91dCB0aGUgJ2hhcyBhcHBlbGxhdGlvbicgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKGluZ29pbmcgPT4gaW5nb2luZy5maWx0ZXIoaSA9PlxuLy8gICAgICAgaS5wa19wcm9wZXJ0eSAhPT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GXG4vLyAgICAgICAmJiBpLnBrX3Byb3BlcnR5ICE9PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfR0VPVlAxX0lTX1JFUFJPRFVDVElPTl9PRlxuLy8gICAgICkpXG4vLyAgICksXG4vLyAgIHRoaXMucGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzKVxuLy8gKS5waXBlKFxuLy8gICBzd2l0Y2hNYXAoKFtvdXRnb2luZywgaW5nb2luZywgZmllbGRDb25maWdzXSkgPT4ge1xuXG4vLyAgICAgY29uc3Qga2V5ID0gKGZjOiBQYXJ0aWFsPFByb0NsYXNzRmllbGRDb25maWc+KSA9PiBgJHtmYy5ma19wcm9wZXJ0eX1fJHtmYy5ma19kb21haW5fY2xhc3N9XyR7ZmMuZmtfcmFuZ2VfY2xhc3N9YDtcbi8vICAgICBjb25zdCBpbmRleGVkID0gaW5kZXhCeSgoZmMpID0+IGAke2ZjLmZrX3Byb3BlcnR5fV8ke2ZjLmZrX2RvbWFpbl9jbGFzc31fJHtmYy5ma19yYW5nZV9jbGFzc31gLCBmaWVsZENvbmZpZ3MpXG4vLyAgICAgY29uc3QgZ2V0RmllbGRDb25maWcgPSAobGlzdERlZjogU3ViZmllbGQpOiBQcm9DbGFzc0ZpZWxkQ29uZmlnID0+IHtcbi8vICAgICAgIHJldHVybiBpbmRleGVkW2tleSh7XG4vLyAgICAgICAgIGZrX3Byb3BlcnR5OiBsaXN0RGVmLnByb3BlcnR5LnBrUHJvcGVydHksXG4vLyAgICAgICAgIGZrX2RvbWFpbl9jbGFzczogbGlzdERlZi5pc091dGdvaW5nID8gbGlzdERlZi5zb3VyY2VDbGFzcyA6IG51bGwsXG4vLyAgICAgICAgIGZrX3JhbmdlX2NsYXNzOiBsaXN0RGVmLmlzT3V0Z29pbmcgPyBudWxsIDogbGlzdERlZi5zb3VyY2VDbGFzcyxcbi8vICAgICAgIH0pXVxuLy8gICAgIH1cblxuLy8gICAgIC8vIENyZWF0ZSBsaXN0IGRlZmluaXRpb25zXG4vLyAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoaW5nb2luZywgZmFsc2UpLFxuLy8gICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKG91dGdvaW5nLCB0cnVlKVxuLy8gICAgICkucGlwZShcbi8vICAgICAgIG1hcCgoW2luZ29pbmdMaXN0RGVmcywgb3V0Z29pbmdMaXN0RGVmc10pID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZmluaXRpb25zID0gWy4uLmluZ29pbmdMaXN0RGVmcywgLi4ub3V0Z29pbmdMaXN0RGVmc107XG5cbi8vICAgICAgICAgLy8gQ3JlYXRlIGZpZWxkIGRlZmluaXRpb25zXG4vLyAgICAgICAgIGNvbnN0IGZpZWxkRGVmczogeyBba2V5OiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbi8vICAgICAgICAgbGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZiA9PiB7XG5cbi8vICAgICAgICAgICBjb25zdCBrID0gbGlzdERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5ICsgJ18nICsgbGlzdERlZi5pc091dGdvaW5nO1xuXG4vLyAgICAgICAgICAgaWYgKCFmaWVsZERlZnNba10pIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXSA9IHtcbi8vICAgICAgICAgICAgICAgLi4ubGlzdERlZixcbi8vICAgICAgICAgICAgICAgcGxhY2VPZkRpc3BsYXk6IHt9LFxuLy8gICAgICAgICAgICAgICBhbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgZmllbGRDb25maWc6IGdldEZpZWxkQ29uZmlnKGxpc3REZWYpLFxuLy8gICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbnM6IFtsaXN0RGVmXSxcbi8vICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW2xpc3REZWYudGFyZ2V0Q2xhc3NdXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXS5saXN0RGVmaW5pdGlvbnMucHVzaChsaXN0RGVmKVxuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdLnRhcmdldENsYXNzZXMucHVzaChsaXN0RGVmLnRhcmdldENsYXNzKVxuLy8gICAgICAgICAgIH1cblxuLy8gICAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICB9KVxuLy8gICAgICAgICAvLyBPcmRlciB0aGUgZmllbGRzIGFjY29yZGluZyB0byBvcmRfbnVtIChmcm9tIHByb2plY3QncyBjb25maWcsIGtsZWlvbGFiJ3MgY29uZmlnKSBvciBwdXQgaXQgYXQgZW5kIG9mIGxpc3QuXG4vLyAgICAgICAgIHJldHVybiBzb3J0KFxuLy8gICAgICAgICAgIChhLCBiKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zdCBnZXRPcmROdW0gPSAoaXRlbTogRmllbGQpID0+IHtcbi8vICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5maWVsZENvbmZpZykgcmV0dXJuIGl0ZW0uZmllbGRDb25maWcub3JkX251bTtcbi8vICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGNvbnN0IG9yZE51bUEgPSBnZXRPcmROdW0oYSk7XG4vLyAgICAgICAgICAgICBjb25zdCBvcmROdW1CID0gZ2V0T3JkTnVtKGIpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIG9yZE51bUEgLSBvcmROdW1CO1xuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgdmFsdWVzKGZpZWxkRGVmcykpXG4vLyAgICAgICB9KVxuLy8gICAgIClcbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vKipcbiAqIFBpcGUgdGhlIGZpZWxkcyBmb3IgaWRlbnRpZmljYXRpb24gb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZURlZmF1bHRGaWVsZERlZmluaXRpb25zKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG5cbi8vIC8qKlxuLy8gICogUGlwZSB0aGUgZ2VuZXJpYyBmaWVsZCBoYXMgYXBwZWxsYXRpb25cbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eVN0YXR1cyA9IHtcbi8vICAgaGFzX2RvbWFpbjogRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSxcbi8vICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRixcbi8vICAgaGFzX3JhbmdlOiBwa0NsYXNzLFxuLy8gICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbi8vICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMCxcbi8vICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuLy8gICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4vLyAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnaGlzdFA5Jyxcbi8vICAgaWRlbnRpdHlfZGVmaW5pbmc6IHRydWUsXG4vLyAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbi8vICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuLy8gICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgcHJvZmlsZXM6IFtdXG4vLyB9XG4vLyBjb25zdCBoYXNBcHBlTGlzdERlZiQgPSB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoW2hhc0FwcGVQcm9wXSwgZmFsc2UpLnBpcGUoXG4vLyAgIGZpbHRlcihsaXN0RGVmcyA9PiAhIWxpc3REZWZzICYmICEhbGlzdERlZnNbMF0pLFxuLy8gICBtYXAobGlzdERlZnMgPT4gbGlzdERlZnNbMF0pXG4vLyApO1xuXG4vLyAvKipcbi8vICAqIFBpcGUgdGhlIGdlbmVyaWMgZmllbGQgaGFzIHR5cGVcbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc1R5cGVMaXN0RGVmJCA9IHRoaXMucGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzKVxuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIGhhc0FwcGVMaXN0RGVmJCxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKGZpbHRlcihjID0+ICEhYykpXG4vLyApLnBpcGUoXG4vLyAgIG1hcCgoW2hhc0FwcGVMaXN0RGVmLCBoYXNUeXBlTGlzdERlZnMsIGtsYXNzXSkgPT4ge1xuLy8gICAgIGNvbnN0IGZpZWxkczogRmllbGRbXSA9IFtdXG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gICogQWRkICdzaG9ydCB0aXRsZScgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICAqXG4vLyAgICAgLy8gICogTWFuaWZlc3RhdGlvbiBQcm9kdWN0IFR5cGUg4oCTIEYzLCAyMTlcbi8vICAgICAvLyAgKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICAqIEl0ZW0g4oCTIEY1LCAyMjFcbi8vICAgICAvLyAgKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAgKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1RdLmluY2x1ZGVzKHBrQ2xhc3MpKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9TSE9SVF9USVRMRSkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhcyBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RQOScgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgY2xhc3NlcyBleGNlcHQgJ0FwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdEMxMCcsIDM2NVxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbi8vICAgICAvLyAgIGNvbnN0IGFwcGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc0FwcGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNBcHBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgZmllbGRzLnB1c2goYXBwZUZpZWxkKTtcbi8vICAgICAvLyB9XG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhc1R5cGUnIGZpZWxkc1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKGhhc1R5cGVMaXN0RGVmcyAmJiBoYXNUeXBlTGlzdERlZnMubGVuZ3RoID4gMCkge1xuLy8gICAgIC8vICAgaGFzVHlwZUxpc3REZWZzLmZvckVhY2goKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgLy8gICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgICBmaWVsZHMucHVzaCh0eXBlRmllbGQpO1xuLy8gICAgIC8vICAgfSlcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdlbnRpdHkgZGVmaW5pdGlvbicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCBjbGFzc2VzIGV4Y2VwdCAnQXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0QzEwJywgMzY1XG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT04pKTtcbi8vICAgICAvLyB9XG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaWRlbnRpZmllciAvIGV4YWN0IHJlZmVyZW5jZSAvIHVybCAvIC4uLicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVCA9PT0gcGtDbGFzcykge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnY29tbWVudCcgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIE1hbmlmZXN0YXRpb24gUHJvZHVjdCBUeXBlIOKAkyBGMywgMjE5XG4vLyAgICAgLy8gKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICogSXRlbSDigJMgRjUsIDIyMVxuLy8gICAgIC8vICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gKiBFeHByZXNzaW9uIHBvcnRpb24g4oCTIGdlb3ZDNSwgNTAzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1QsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfRVhQUkVTU0lPTl9QT1JUSU9OXS5pbmNsdWRlcyhwa0NsYXNzKSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ3RpbWUtc3BhbicgZmllbGQgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgdGVtcG9yYWwgZW50aXR5IGNsYXNzZXNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgcmV0dXJuIGZpZWxkc1xuXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLy8gcHJpdmF0ZSBwaXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3M6IG51bWJlcikge1xuLy8gICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgdHJ1ZSkucGlwZShcbi8vICAgICAvLyBjaGVjayBpZiB0aGlzIGNsYXNzIGhhcyAnaGFzIHR5cGUnIHN1YnByb3BlcnR5XG4vLyAgICAgbWFwKG91dGdvaW5nID0+IHtcbi8vICAgICAgIHJldHVybiBvdXRnb2luZy5maWx0ZXIoKHByb3ApID0+IHByb3AuaXNfaGFzX3R5cGVfc3VicHJvcGVydHkpO1xuLy8gICAgIH0pLCBzd2l0Y2hNYXAoaGFzVHlwZVByb3BzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KGhhc1R5cGVQcm9wcy5tYXAoZGZoUHJvcCA9PiB7XG4vLyAgICAgICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFtkZmhQcm9wXSwgdHJ1ZSkucGlwZShmaWx0ZXIobGlzdERlZnMgPT4gISFsaXN0RGVmcyAmJiAhIWxpc3REZWZzWzBdKSwgbWFwKGxpc3REZWZzID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZiA9IGxpc3REZWZzWzBdO1xuLy8gICAgICAgICBsaXN0RGVmLmxpc3RUeXBlID0geyB0eXBlSXRlbTogJ3RydWUnIH07XG4vLyAgICAgICAgIHJldHVybiBsaXN0RGVmO1xuLy8gICAgICAgfSkpO1xuLy8gICAgIH0pKSkpO1xuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkU3ViZmllbGQocGtDbGFzc0ZpZWxkOiBudW1iZXIpOiBTdWJmaWVsZCB7XG4vLyAgIGNvbnN0IHRlbXBsYXRlID0ge1xuLy8gICAgIHByb3BlcnR5OiB7fSxcbi8vICAgICBzb3VyY2VDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZUNsYXNzTGFiZWw6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIGlzT3V0Z29pbmc6IHVuZGVmaW5lZCxcbi8vICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiB1bmRlZmluZWQsXG4vLyAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldE1heFF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VNYXhRdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZU1pblF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2Vcbi8vICAgfVxuLy8gICBzd2l0Y2ggKHBrQ2xhc3NGaWVsZCkge1xuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU46XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6IHsgdGltZVNwYW46ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ1doZW4nLFxuLy8gICAgICAgICBpc091dGdvaW5nOiB0cnVlLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1A0Jyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvNCcsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAxXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT046XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnRGVzY3JpcHRpb24nLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQ6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnQ29tbWVudHMnLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0V4YWN0IFJlZmVyZW5jZScsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfU0hPUlRfVElUTEU6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnU2hvcnQgVGl0bGUnLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGRlZmF1bHQ6XG4vLyAgICAgICBicmVhaztcbi8vICAgfVxuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihwa0NsYXNzRmllbGQ6IG51bWJlcik6IEZpZWxkIHtcbi8vICAgY29uc3QgbGlzdERlZiA9IHRoaXMuZ2V0Q2xhc3NGaWVsZFN1YmZpZWxkKHBrQ2xhc3NGaWVsZClcbi8vICAgcmV0dXJuIHsgLi4ubGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbbGlzdERlZl0gfVxuLy8gfVxuXG5cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWQoKSB7XG4vLyAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkJC5rZXkoJ3RydWUnKVxuLy8gICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4vLyB9XG5cblxuXG4vLyAvKipcbi8vICAqIFBpcGVzIGFsbCB0aGUgZW5hYmxlZCBwcm9wZXJ0aWVzIG9mIGEgY2xhc3Ncbi8vICAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8RGZoUHJvcGVydHlTdGF0dXNbXT4ge1xuXG5cbi8vICAgbGV0ICQ6IE9ic2VydmFibGU8QnlQazxEZmhQcm9wZXJ0eT4+XG4vLyAgIGlmIChpc091dGdvaW5nKSB7XG4vLyAgICAgJCA9IHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfZG9tYWluJC5rZXkocGtDbGFzcylcbi8vICAgfVxuLy8gICBlbHNlIHtcbi8vICAgICAkID0gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19yYW5nZSQua2V5KHBrQ2xhc3MpXG4vLyAgIH1cblxuLy8gICAvLyBmaWx0ZXIgcHJvcGVydGllcyB0aGF0IGFyZSBpbiBhdCBsZWFzdCBvbmUgcHJvZmlsZSBlbmFibGVkIGJ5IHByb2plY3Rcbi8vICAgY29uc3QgcHJvZmlsZXMkID0gdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcblxuXG4vLyAgIC8vIEZpbHRlciBvdXQgb25seSB0aGUgcHJvcGVydGllcyBmb3Igd2hpY2ggdGFyZ2V0IGNsYXNzIGlzIGFsbG93ZWRcbi8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoJCwgcHJvZmlsZXMkKVxuLy8gICAgIC5waXBlKFxuLy8gICAgICAgbWFwKChbcHJvcHMsIHByb2ZpbGVzXSkgPT4ge1xuLy8gICAgICAgICBjb25zdCBwOiBEZmhQcm9wZXJ0eVN0YXR1c1tdID0gW11cblxuLy8gICAgICAgICB2YWx1ZXMocHJvcHMpLmZvckVhY2gocHJvcCA9PiB7XG5cblxuLy8gICAgICAgICAgIGNvbnN0IHByb3BQcm9maWxlUmVsID0gcHJvcC5wcm9maWxlcyBhcyBQcm9maWxlc1xuXG4vLyAgICAgICAgICAgbGV0IGVuYWJsZWRJbkFQcm9maWxlID0gZmFsc2U7XG5cbi8vICAgICAgICAgICBsZXQgcmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHRydWU7XG5cbi8vICAgICAgICAgICBwcm9wUHJvZmlsZVJlbC5mb3JFYWNoKGl0ZW0gPT4ge1xuLy8gICAgICAgICAgICAgaWYgKHByb2ZpbGVzLmluY2x1ZGVzKGl0ZW0uZmtfcHJvZmlsZSkpIHtcbi8vICAgICAgICAgICAgICAgZW5hYmxlZEluQVByb2ZpbGUgPSB0cnVlO1xuLy8gICAgICAgICAgICAgICBpZiAoaXRlbS5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSkge1xuLy8gICAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBmYWxzZVxuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSlcblxuLy8gICAgICAgICAgIGlmIChlbmFibGVkSW5BUHJvZmlsZSkge1xuLy8gICAgICAgICAgICAgcC5wdXNoKHtcbi8vICAgICAgICAgICAgICAgLi4ucHJvcCxcbi8vICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pXG5cbi8vICAgICAgICAgcmV0dXJuIHBcbi8vICAgICAgIH0pXG4vLyAgICAgKVxuXG4vLyB9XG5cblxuLy8gLyoqXG4vLyAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuLy8gICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdFxuLy8gICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyBlbmFibGVkIGJ5IGNsYXNzX3Byb2pfcmVsXG4vLyAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIHJlcXVpcmVkIGJ5IHNvdXJjZXMgb3IgYnkgYmFzaWNzXG4vLyAgKlxuLy8gICogdGhpcyBpcyB1c2VmdWxsIHRvIGNoZWNrIGlmIGEgY2xhc3MgaXMgYXZhaWxhYmxlIGF0IGFsbFxuLy8gICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0luRW50aXRlc09yUmVxdWlyZWQoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4vLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNSZXF1aXJlZCgpXG4vLyAgICkucGlwZShcbi8vICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbi8vICAgICBzdGFydFdpdGgoe30pXG4vLyAgIClcbi8vIH1cbiJdfQ==