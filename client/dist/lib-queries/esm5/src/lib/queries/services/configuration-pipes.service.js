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
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
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
    // @cache({ refCount: false })
    /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
    // @spyTag
    // @cache({ refCount: false })
    ConfigurationPipesService.prototype.pipeProfilesEnabledByProject = /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
    // @spyTag
    // @cache({ refCount: false })
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
        function (enabled) { return tslib_1.__spread(enabled, [DfhConfig.PK_PROFILE_GEOVISTORY_BASIC]); }))); })), shareReplay());
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
            if (pkClass === DfhConfig.ClASS_PK_TIME_SPAN) {
                // remove the has time span property
                ingoingProps = [];
            }
            else {
                // if class is not appellation for language, add appellation for language (1111) property
                if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
                    ingoingProps.push(createAppellationProperty(pkClass));
                }
                // if is temporal entity, add has time span property
                if (sourceKlass.basic_type === 9) {
                    outgoingProps.push(createHasTimeSpanProperty(pkClass));
                }
                outgoingProps.push(createHasDefinitionProperty(pkClass));
            }
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
     * @param {?} properties
     * @param {?} isOutgoing
     * @param {?} enabledProfiles
     * @param {?} sysConfig
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipePropertiesToSubfields = /**
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
            return _this.pipeSubfield(isOutgoing, p, sysConfig, enabledProfiles);
        })));
    };
    /**
     * @param {?} sourceClass
     * @param {?} property
     * @param {?} targetClass
     * @param {?} isOutgoing
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSubfieldIdToSubfield = /**
     * @param {?} sourceClass
     * @param {?} property
     * @param {?} targetClass
     * @param {?} isOutgoing
     * @return {?}
     */
    function (sourceClass, property, targetClass, isOutgoing) {
        var _this = this;
        /** @type {?} */
        var domain = isOutgoing ? sourceClass : targetClass;
        /** @type {?} */
        var range = isOutgoing ? targetClass : sourceClass;
        return combineLatest(this.s.dfh$.property$.pk_property__has_domain__has_range$.key([property, domain, range].join('_'))
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return !!x;
        }))), this.s.sys$.config$.main$.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return !!x;
        }))), this.pipeProfilesEnabledByProject().pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return !!x;
        })))).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = tslib_1.__read(_a, 3), dfhProp = _b[0], sysConf = _b[1], enabledProfiles = _b[2];
            return _this.pipeSubfield(isOutgoing, dfhProp, sysConf, enabledProfiles);
        })));
    };
    /**
     * @private
     * @param {?} isOutgoing
     * @param {?} p
     * @param {?} sysConfig
     * @param {?} enabledProfiles
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSubfield = /**
     * @private
     * @param {?} isOutgoing
     * @param {?} p
     * @param {?} sysConfig
     * @param {?} enabledProfiles
     * @return {?}
     */
    function (isOutgoing, p, sysConfig, enabledProfiles) {
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
        return combineLatest(this.pipeClassLabel(sourceClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return x;
        }))), this.pipeClassLabel(targetClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return x;
        }))), this.pipeSubfieldTypeOfClass(sysConfig, targetClass, targetMaxQuantity, p.pk_property).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return x;
        }))), this.pipeFieldLabel(p.pk_property, isOutgoing ? p.has_domain : null, isOutgoing ? null : p.has_range).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            return x;
        }))))
            .pipe(map((/**
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
                identityDefiningForTarget: o ? false : p.identity_defining,
                ontoInfoLabel: p.identifier_in_namespace,
                ontoInfoUrl: 'https://ontome.dataforhistory.org/property/' + p.pk_property,
                removedFromAllProfiles: isRemovedFromAllProfiles(enabledProfiles, (p.profiles || [])),
            };
            return node;
        })));
    };
    /**
     * Pipes the type of Subfield for a given class
     *
     * Currently (to be revised if good) sublcasses of E55 Type,
     * that are the target of a field with targetMaxQantity=1,
     * get Subfield type 'hasType'.
     * Therefore targetMaxQuantity is needed.
     *
     * If we are nesting subfields, we'll end up with circular fields.
     * E.g.: Person 21 -> has appellation 1111 -> AppeTeEn 365 -> is appellation of 1111 -> Person 21
     * In order to detect them, we can additionally pass in the parent property.
     *
     * This behavior has to be revised, because it can lead to problems
     * when the Subfield belongs to a Field with multiple target classes
     * (and thus Subfields) because the UI then does not allow to choose
     * the right target class.
     */
    // @spyTag
    /**
     * Pipes the type of Subfield for a given class
     *
     * Currently (to be revised if good) sublcasses of E55 Type,
     * that are the target of a field with targetMaxQantity=1,
     * get Subfield type 'hasType'.
     * Therefore targetMaxQuantity is needed.
     *
     * If we are nesting subfields, we'll end up with circular fields.
     * E.g.: Person 21 -> has appellation 1111 -> AppeTeEn 365 -> is appellation of 1111 -> Person 21
     * In order to detect them, we can additionally pass in the parent property.
     *
     * This behavior has to be revised, because it can lead to problems
     * when the Subfield belongs to a Field with multiple target classes
     * (and thus Subfields) because the UI then does not allow to choose
     * the right target class.
     * @param {?} config
     * @param {?} pkClass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSubfieldTypeOfClass = /**
     * Pipes the type of Subfield for a given class
     *
     * Currently (to be revised if good) sublcasses of E55 Type,
     * that are the target of a field with targetMaxQantity=1,
     * get Subfield type 'hasType'.
     * Therefore targetMaxQuantity is needed.
     *
     * If we are nesting subfields, we'll end up with circular fields.
     * E.g.: Person 21 -> has appellation 1111 -> AppeTeEn 365 -> is appellation of 1111 -> Person 21
     * In order to detect them, we can additionally pass in the parent property.
     *
     * This behavior has to be revised, because it can lead to problems
     * when the Subfield belongs to a Field with multiple target classes
     * (and thus Subfields) because the UI then does not allow to choose
     * the right target class.
     * @param {?} config
     * @param {?} pkClass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @return {?}
     */
    // @spyTag
    function (config, pkClass, targetMaxQuantity, parentProperty) {
        var _this = this;
        return this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return !!i; })), switchMap((/**
         * @param {?} klass
         * @return {?}
         */
        function (klass) { return _this.pipeSubfieldType(config, klass, targetMaxQuantity, parentProperty); })));
    };
    /**
     * @param {?} config
     * @param {?} klass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSubfieldType = /**
     * @param {?} config
     * @param {?} klass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @return {?}
     */
    function (config, klass, targetMaxQuantity, parentProperty) {
        /** @type {?} */
        var res = (/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return new BehaviorSubject(x); });
        /** @type {?} */
        var classConfig;
        if (config)
            classConfig = config.classes[klass.pk_class];
        if (classConfig && classConfig.valueObjectType) {
            return res(classConfig.valueObjectType);
        }
        else if (klass.basic_type === 30 && targetMaxQuantity == 1) {
            return res({ typeItem: 'true' });
        }
        else if (klass.basic_type === 8 || klass.basic_type === 30) {
            return res({ entityPreview: 'true' });
        }
        // TODO add this to sysConfigValue
        else if (klass.pk_class === DfhConfig.ClASS_PK_TIME_SPAN) {
            return res({ timeSpan: 'true' });
        }
        else {
            // pipe the subfields of the temporalEntity class
            return this.pipeBasicAndSpecificFields(klass.pk_class).pipe(map((/**
             * @param {?} fields
             * @return {?}
             */
            function (fields) {
                var e_2, _a, e_3, _b;
                /** @type {?} */
                var subentitySubfieldPage = [];
                try {
                    for (var fields_1 = tslib_1.__values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                        var field = fields_1_1.value;
                        try {
                            // for each of these subfields
                            for (var _c = (e_3 = void 0, tslib_1.__values(field.listDefinitions)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var subfield = _d.value;
                                // create page:GvSubfieldPage
                                /** @type {?} */
                                var nestedSubfieldType = { entityPreview: 'true' };
                                if (!subfield.listType.temporalEntity)
                                    nestedSubfieldType = subfield.listType;
                                /** @type {?} */
                                var isCircular = false;
                                if (parentProperty &&
                                    subfield.property.pkProperty == parentProperty &&
                                    subfield.targetMaxQuantity === 1) {
                                    isCircular = true;
                                }
                                /** @type {?} */
                                var nestedPage = {
                                    subfieldType: nestedSubfieldType,
                                    page: {
                                        fkProperty: subfield.property.pkProperty,
                                        isOutgoing: subfield.isOutgoing,
                                        limit: 1,
                                        offset: 0,
                                        targetClass: subfield.targetClass,
                                        isCircular: isCircular
                                    }
                                };
                                subentitySubfieldPage.push(nestedPage);
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return { temporalEntity: subentitySubfieldPage };
            })));
        }
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
        tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Boolean]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSubfieldIdToSubfield", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number, Number]),
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
export function createHasTimeSpanProperty(domainClass) {
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
        domain_instances_max_quantifier: -1,
        domain_instances_min_quantifier: 1,
        range_instances_max_quantifier: 1,
        range_instances_min_quantifier: 1,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUt4RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQU1wRSx1Q0FHQzs7O0lBREMsbURBQStCOztBQVVqQztJQWNFLG1DQUNVLENBQTRCLEVBQzVCLENBQXlCO1FBRHpCLE1BQUMsR0FBRCxDQUFDLENBQTJCO1FBQzVCLE1BQUMsR0FBRCxDQUFDLENBQXdCO0lBQy9CLENB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QWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvRztRQUNELDJCQUEyQjthQUN0QixJQUFJLGFBQWEsQ0FBQyxrQkFBa0I7WUFDdkMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDaEUsUUFBUSxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNFO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcsIFByb0NvbmZpZywgU3lzQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgZGZoTGFiZWxCeUZrc0tleSwgcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXksIHRleHRQcm9wZXJ0eUJ5RmtzS2V5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBDbGFzc0NvbmZpZywgRGZoQ2xhc3MsIERmaExhYmVsLCBEZmhQcm9wZXJ0eSwgR3ZMb2FkU3ViZW50aXR5U3ViZmllbGRQYWdlUmVxLCBHdlN1YmZpZWxkVHlwZSwgSW5mTGFuZ3VhZ2UsIFByb0NsYXNzRmllbGRDb25maWcsIFByb1RleHRQcm9wZXJ0eSwgUmVsYXRlZFByb2ZpbGUsIFN5c0NvbmZpZ0ZpZWxkRGlzcGxheSwgU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgU3lzQ29uZmlnVmFsdWUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGZsYXR0ZW4sIGluZGV4QnksIHVuaXEsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkJztcbmltcG9ydCB7IEZpZWxkUGxhY2VPZkRpc3BsYXkgfSBmcm9tICcuLi9tb2RlbHMvRmllbGRQb3NpdGlvbic7XG5pbXBvcnQgeyBTcGVjaWFsRmllbGRUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL1NwZWNpYWxGaWVsZFR5cGUnO1xuaW1wb3J0IHsgU3ViZmllbGQgfSBmcm9tICcuLi9tb2RlbHMvU3ViZmllbGQnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5cbi8vIHRoaXMgaXMgdGhlXG5leHBvcnQgdHlwZSBUYWJsZU5hbWUgPSAnYXBwZWxsYXRpb24nIHwgJ2xhbmd1YWdlJyB8ICdwbGFjZScgfCAndGltZV9wcmltaXRpdmUnIHwgJ2xhbmdfc3RyaW5nJyB8ICdkaW1lbnNpb24nIHwgJ3BlcnNpc3RlbnRfaXRlbScgfCAndGVtcG9yYWxfZW50aXR5J1xuXG5leHBvcnQgaW50ZXJmYWNlIERmaFByb3BlcnR5U3RhdHVzIGV4dGVuZHMgRGZoUHJvcGVydHkge1xuICAvLyB0cnVlLCBpZiByZW1vdmVkIGZyb20gYWxsIHByb2ZpbGVzIG9mIHRoZSBjdXJyZW50IHByb2plY3RcbiAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogYm9vbGVhblxufVxuXG50eXBlIExhYmVsT3JpZ2luID0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCcgfCAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgfCAnb2Ygb250b21lIGluIGVuZ2xpc2gnXG50eXBlIFByb2ZpbGVzID0ge1xuICBma19wcm9maWxlOiBudW1iZXI7XG4gIHJlbW92ZWRfZnJvbV9hcGk6IGJvb2xlYW47XG59W107XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjdGlvbiBvZiBwaXBlcyB0aGF0IGFnZ3JlZ2F0ZSBvciB0cmFuc2Zvcm0gY29uZmlndXJhdGlvbiBkYXRhLlxuICogV2hlbiB0YWxraW5nIGFib3V0IGNvbmZpZ3VyYXRpb24sIHdlIG1lYW4gdGhlIGNvbmNlcHR1YWwgcmVmZXJlbmNlIG1vZGVsIGFuZCB0aGUgYWRkaXRpb25hbFxuICogY29uZmlndXJhdGlvbnMgb24gc3lzdGVtIGFuZCBwcm9qZWN0IGxldmVsLlxuICogRm9yIEV4YW1wbGVcbiAqIC0gdGhlIGZpZWxkcyBvZiBhIGNsYXNzXG4gKiAtIHRoZSBsYWJlbHMgb2YgY2xhc3NlcyBhbmQgcHJvcGVydGllc1xuICovXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgKSB7IH1cblxuXG4gIC8qKlxuICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfcHJvZmlsZVxuICAqIG9mIGFsbCBwcm9maWxlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0LlxuICAqIFRoZSBhcnJheSB3aWxsIGFsd2F5cyBpbmNsdWRlIFBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIC8vIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwdWJsaWMgcGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9wcm9maWxlX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkJFxuICAgICAgICAua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpLnBpcGUoXG4gICAgICAgICAgbWFwKHByb2plY3RQcm9maWxlUmVscyA9PiB2YWx1ZXMocHJvamVjdFByb2ZpbGVSZWxzKVxuICAgICAgICAgICAgLmZpbHRlcihyZWwgPT4gcmVsLmVuYWJsZWQpXG4gICAgICAgICAgICAubWFwKHJlbCA9PiByZWwuZmtfcHJvZmlsZSlcbiAgICAgICAgICApLFxuICAgICAgICAgIG1hcChlbmFibGVkID0+IFsuLi5lbmFibGVkLCBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXSksXG4gICAgICAgICkpLFxuICAgICAgc2hhcmVSZXBsYXkoKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIGFsbCBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAgICogVGhlIEZpZWxkcyBhcmUgbm90IG9yZGVyZWQgYW5kIG5vdCBmaWx0ZXJlZFxuICAgKiBJZiB5b3Ugd2FudCBzcGVjaWZpYyBzdWJzZXRzIG9mIEZpZWxkcyBhbmQvb3Igb3JkZXJlZCBGaWVsZHMsIHVzZSB0aGUgcGlwZXNcbiAgICogdGhhdCBidWlsZCBvbiB0aGlzIHBpcGUuXG4gICAqL1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIHBpcGUgc291cmNlIGNsYXNzXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKSxcbiAgICAgIC8vIHBpcGUgb3V0Z29pbmcgcHJvcGVydGllc1xuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19kb21haW4kLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBpbmdvaW5nIHByb3BlcnRpZXNcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfcmFuZ2UkLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBzeXMgY29uZmlnXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAvLyBwaXBlIGVuYWJsZWQgcHJvZmlsZXNcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpLFxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW3NvdXJjZUtsYXNzLCBvdXRnb2luZ1Byb3BzLCBpbmdvaW5nUHJvcHMsIHN5c0NvbmZpZywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuXG4gICAgICAgIGlmIChwa0NsYXNzID09PSBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBoYXMgdGltZSBzcGFuIHByb3BlcnR5XG4gICAgICAgICAgaW5nb2luZ1Byb3BzID0gW11cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGNsYXNzIGlzIG5vdCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UsIGFkZCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UgKDExMTEpIHByb3BlcnR5XG4gICAgICAgICAgaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbiAgICAgICAgICAgIGluZ29pbmdQcm9wcy5wdXNoKGNyZWF0ZUFwcGVsbGF0aW9uUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGlmIGlzIHRlbXBvcmFsIGVudGl0eSwgYWRkIGhhcyB0aW1lIHNwYW4gcHJvcGVydHlcbiAgICAgICAgICBpZiAoc291cmNlS2xhc3MuYmFzaWNfdHlwZSA9PT0gOSkge1xuICAgICAgICAgICAgb3V0Z29pbmdQcm9wcy5wdXNoKGNyZWF0ZUhhc1RpbWVTcGFuUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb3V0Z29pbmdQcm9wcy5wdXNoKGNyZWF0ZUhhc0RlZmluaXRpb25Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMob3V0Z29pbmdQcm9wcywgdHJ1ZSwgZW5hYmxlZFByb2ZpbGVzLCBzeXNDb25maWcpLFxuICAgICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhpbmdvaW5nUHJvcHMsIGZhbHNlLCBlbmFibGVkUHJvZmlsZXMsIHN5c0NvbmZpZyksXG4gICAgICAgICAgdGhpcy5waXBlRmllbGRDb25maWdzKHBrQ2xhc3MpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoKFtzdWJmaWVsZHMxLCBzdWJmaWVsZHMyLCBmaWVsZENvbmZpZ3NdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWJmaWVsZHMgPSBbLi4uc3ViZmllbGRzMSwgLi4uc3ViZmllbGRzMl1cblxuICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWdJZHggPSBpbmRleEJ5KCh4KSA9PiBbXG4gICAgICAgICAgICAgICh4LmZrX2RvbWFpbl9jbGFzcyB8fCB4LmZrX3JhbmdlX2NsYXNzKSxcbiAgICAgICAgICAgICAgeC5ma19wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgISF4LmZrX2RvbWFpbl9jbGFzc1xuICAgICAgICAgICAgXS5qb2luKCdfJyksIGZpZWxkQ29uZmlncylcblxuICAgICAgICAgICAgY29uc3QgdW5pcUZpZWxkczogeyBbdWlkOiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbiAgICAgICAgICAgIGNvbnN0IHVuaXFTdWJmaWVsZENhY2hlOiB7IFt1aWQ6IHN0cmluZ106IHRydWUgfSA9IHt9XG5cblxuICAgICAgICAgICAgLy8gZ3JvdXAgYnkgc291cmNlLCBwa1Byb3BlcnR5IGFuZCBpc091dGdvaW5nXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3ViZmllbGRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkSWQgPSBbcy5zb3VyY2VDbGFzcywgcy5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBzLmlzT3V0Z29pbmddLmpvaW4oJ18nKVxuICAgICAgICAgICAgICBjb25zdCBzdWJmaWVsZElkID0gW3Muc291cmNlQ2xhc3MsIHMucHJvcGVydHkucGtQcm9wZXJ0eSwgcy5pc091dGdvaW5nLCBzLnRhcmdldENsYXNzXS5qb2luKCdfJylcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWc6IFByb0NsYXNzRmllbGRDb25maWcgfCB1bmRlZmluZWQgPSBmaWVsZENvbmZpZ0lkeFtmaWVsZElkXTtcbiAgICAgICAgICAgICAgLy8gdGhlIGZpcnN0IHRpbWUgdGhlIGdyb3VwIGlzIGVzdGFibGlzaGVkXG4gICAgICAgICAgICAgIGlmICghdW5pcUZpZWxkc1tmaWVsZElkXSkge1xuICAgICAgICAgICAgICAgIGxldCBpc1NwZWNpYWxGaWVsZDogU3BlY2lhbEZpZWxkVHlwZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSGFzVHlwZUZpZWxkKSBpc1NwZWNpYWxGaWVsZCA9ICdoYXMtdHlwZSc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTikgaXNTcGVjaWFsRmllbGQgPSAndGltZS1zcGFuJztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdID0ge1xuICAgICAgICAgICAgICAgICAgc291cmNlQ2xhc3M6IHMuc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsOiBzLnNvdXJjZUNsYXNzTGFiZWwsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eTogcy5zb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZU1pblF1YW50aXR5OiBzLnNvdXJjZU1pblF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHMudGFyZ2V0TWluUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogcy50YXJnZXRNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBzLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgaXNIYXNUeXBlRmllbGQ6IHMuaXNIYXNUeXBlRmllbGQsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcy5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHMuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZSxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvTGFiZWw6IHMub250b0luZm9MYWJlbCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvVXJsOiBzLm9udG9JbmZvVXJsLFxuICAgICAgICAgICAgICAgICAgYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlczogcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW3MudGFyZ2V0Q2xhc3NdLFxuICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb25zOiBbc10sXG4gICAgICAgICAgICAgICAgICBmaWVsZENvbmZpZyxcbiAgICAgICAgICAgICAgICAgIHBsYWNlT2ZEaXNwbGF5OiBnZXRQbGFjZU9mRGlzcGxheShzeXNDb25maWcuc3BlY2lhbEZpZWxkcywgcywgZmllbGRDb25maWcpLFxuICAgICAgICAgICAgICAgICAgaXNTcGVjaWFsRmllbGRcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtYXJrIHN1YmZpZWxkIGFzIGFkZGVkXG4gICAgICAgICAgICAgICAgdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0gPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBpZ25vcmUgZHVwbGljYXRpb25zIG9mIHN1YmZpZWxkc1xuICAgICAgICAgICAgICBlbHNlIGlmICghdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0pIHtcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlID9cbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IGZhbHNlIDpcbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLnRhcmdldENsYXNzZXMucHVzaChzLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0ubGlzdERlZmluaXRpb25zLnB1c2gocylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzKHVuaXFGaWVsZHMpXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIHBpcGUgYWxsIHRoZSBzcGVjaWZpYyBmaWVsZHMgb2YgYSBjbGFzcyxcbiAgICogb3JkZXJlZCBieSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucGlwZUZpZWxkcyhwa0NsYXNzKS5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHNcbiAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcylcbiAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbiAtIGIucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24pXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAgKiBwaXBlIGFsbCB0aGUgYmFzaWMgZmllbGRzIG9mIGEgY2xhc3MsXG4gICAgKiBvcmRlcmVkIGJ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBiYXNpYyBmaWVsZHNcbiAgICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUJhc2ljRmllbGRzT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoZmllbGRzID0+IGZpZWxkc1xuICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIGJhc2ljIGZpZWxkc1xuICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzKVxuICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgYmFzaWMgZmllbGRzXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzLnBvc2l0aW9uIC0gYi5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcy5wb3NpdGlvbilcbiAgICAgIClcbiAgICApXG4gIH1cblxuXG5cblxuICAvKipcbiAgICAgKiBQaXBlcyB0aGUgZmllbGRzIGZvciB0ZW1wb3JhbCBlbnRpdHkgZm9ybXNcbiAgICAgKiAtIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgKiAtIHRoZSB3aGVuIGZpZWxkXG4gICAgICogLSBpZiBhdmFpbGFibGU6IHRoZSB0eXBlIGZpZWxkXG4gICAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlRmllbGRzRm9yVGVFbkZvcm0ocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUZpZWxkcyhwa0NsYXNzKS5waXBlKFxuICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgIG1hcChhbGxGaWVsZHMgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZHMgPSBhbGxGaWVsZHNcbiAgICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMpXG4gICAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uIC0gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbilcblxuICAgICAgICBjb25zdCB3aGVuRmllbGQgPSBhbGxGaWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTilcbiAgICAgICAgaWYgKHdoZW5GaWVsZCkgZmllbGRzLnB1c2god2hlbkZpZWxkKVxuXG4gICAgICAgIGNvbnN0IHR5cGVGaWVsZCA9IGFsbEZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlzSGFzVHlwZUZpZWxkKVxuICAgICAgICBpZiAodHlwZUZpZWxkKSBmaWVsZHMucHVzaCh0eXBlRmllbGQpXG5cbiAgICAgICAgcmV0dXJuIGZpZWxkcztcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG5cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgZmllbGRzIG9mIGdpdmVuIGNsYXNzIGluIHRoaXMgb3JkZXI6XG4gICAqIC0gYmFzaWMgZmllbGRzXG4gICAqIC0gc3BlY2lmaWMgZmllbGRzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUJhc2ljRmllbGRzT2ZDbGFzcyhwa0NsYXNzKSxcbiAgICAgIHRoaXMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3MpXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuICAvKipcbiAgKiBQaXBlcyB0aGUgZmllbGRzIG9mIGdpdmVuIGNsYXNzIGluIHRoaXMgb3JkZXI6XG4gICogLSBzcGVjaWZpYyBmaWVsZHNcbiAgKiAtIGJhc2ljIGZpZWxkc1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3MpLFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MpLFxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKFthLCBiXSkgPT4gWy4uLmEsIC4uLmJdKVxuICAgICAgKVxuICB9XG5cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhcbiAgICBwcm9wZXJ0aWVzOiBEZmhQcm9wZXJ0eVtdLFxuICAgIGlzT3V0Z29pbmc6IGJvb2xlYW4sXG4gICAgZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSxcbiAgICBzeXNDb25maWc6IFN5c0NvbmZpZ1ZhbHVlXG4gICk6IE9ic2VydmFibGU8U3ViZmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgIHByb3BlcnRpZXMubWFwKHAgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waXBlU3ViZmllbGQoaXNPdXRnb2luZywgcCwgc3lzQ29uZmlnLCBlbmFibGVkUHJvZmlsZXMpO1xuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVTdWJmaWVsZElkVG9TdWJmaWVsZChzb3VyY2VDbGFzczogbnVtYmVyLCBwcm9wZXJ0eTogbnVtYmVyLCB0YXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxTdWJmaWVsZD4ge1xuICAgIGNvbnN0IGRvbWFpbiA9IGlzT3V0Z29pbmcgPyBzb3VyY2VDbGFzcyA6IHRhcmdldENsYXNzO1xuICAgIGNvbnN0IHJhbmdlID0gaXNPdXRnb2luZyA/IHRhcmdldENsYXNzIDogc291cmNlQ2xhc3M7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQucGtfcHJvcGVydHlfX2hhc19kb21haW5fX2hhc19yYW5nZSQua2V5KFtwcm9wZXJ0eSwgZG9tYWluLCByYW5nZV0uam9pbignXycpKVxuICAgICAgICAucGlwZShmaWx0ZXIoeCA9PiB7XG4gICAgICAgICAgcmV0dXJuICEheFxuICAgICAgICB9KSksXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLnBpcGUoZmlsdGVyKHggPT4ge1xuICAgICAgICByZXR1cm4gISF4XG4gICAgICB9KSksXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKS5waXBlKGZpbHRlcih4ID0+IHtcbiAgICAgICAgcmV0dXJuICEheFxuICAgICAgfSkpLFxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2RmaFByb3AsIHN5c0NvbmYsIGVuYWJsZWRQcm9maWxlc10pID0+IHRoaXMucGlwZVN1YmZpZWxkKFxuICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICBkZmhQcm9wLFxuICAgICAgICBzeXNDb25mLFxuICAgICAgICBlbmFibGVkUHJvZmlsZXNcbiAgICAgICkpXG4gICAgKVxuICB9XG5cblxuICBwcml2YXRlIHBpcGVTdWJmaWVsZChcbiAgICBpc091dGdvaW5nOiBib29sZWFuLFxuICAgIHA6IERmaFByb3BlcnR5LFxuICAgIHN5c0NvbmZpZzogU3lzQ29uZmlnVmFsdWUsXG4gICAgZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXVxuICApOiBPYnNlcnZhYmxlPFN1YmZpZWxkPiB7XG4gICAgY29uc3QgbyA9IGlzT3V0Z29pbmc7XG4gICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBvID8gcC5oYXNfcmFuZ2UgOiBwLmhhc19kb21haW47XG4gICAgY29uc3Qgc291cmNlQ2xhc3MgPSBvID8gcC5oYXNfZG9tYWluIDogcC5oYXNfcmFuZ2U7XG4gICAgY29uc3QgdGFyZ2V0TWF4UXVhbnRpdHkgPSBvID9cbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyIDpcbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjtcbiAgICBjb25zdCBzb3VyY2VNYXhRdWFudGl0eSA9IG8gP1xuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyIDpcbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyO1xuICAgIGNvbnN0IHRhcmdldE1pblF1YW50aXR5ID0gbyA/XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllciA6XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI7XG4gICAgY29uc3Qgc291cmNlTWluUXVhbnRpdHkgPSBvID9cbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllciA6XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUNsYXNzTGFiZWwoc291cmNlQ2xhc3MpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlQ2xhc3NMYWJlbCh0YXJnZXRDbGFzcykucGlwZSh0YXAoeCA9PiB7XG4gICAgICAgIHJldHVybiB4XG4gICAgICB9KSksXG4gICAgICB0aGlzLnBpcGVTdWJmaWVsZFR5cGVPZkNsYXNzKHN5c0NvbmZpZywgdGFyZ2V0Q2xhc3MsIHRhcmdldE1heFF1YW50aXR5LCBwLnBrX3Byb3BlcnR5KS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZUZpZWxkTGFiZWwocC5wa19wcm9wZXJ0eSwgaXNPdXRnb2luZyA/IHAuaGFzX2RvbWFpbiA6IG51bGwsIGlzT3V0Z29pbmcgPyBudWxsIDogcC5oYXNfcmFuZ2UpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgIClcbiAgICAgIC5waXBlKG1hcCgoW3NvdXJjZUNsYXNzTGFiZWwsIHRhcmdldENsYXNzTGFiZWwsIGxpc3RUeXBlLCBsYWJlbF1cbiAgICAgICkgPT4ge1xuICAgICAgICBjb25zdCBub2RlOiBTdWJmaWVsZCA9IHtcbiAgICAgICAgICBsaXN0VHlwZSxcbiAgICAgICAgICBzb3VyY2VDbGFzcyxcbiAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsLFxuICAgICAgICAgIHNvdXJjZU1heFF1YW50aXR5LFxuICAgICAgICAgIHNvdXJjZU1pblF1YW50aXR5LFxuICAgICAgICAgIHRhcmdldENsYXNzLFxuICAgICAgICAgIHRhcmdldENsYXNzTGFiZWwsXG4gICAgICAgICAgdGFyZ2V0TWluUXVhbnRpdHksXG4gICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHksXG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgaXNIYXNUeXBlRmllbGQ6IG8gJiYgcC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSxcbiAgICAgICAgICBwcm9wZXJ0eTogeyBwa1Byb3BlcnR5OiBwLnBrX3Byb3BlcnR5IH0sXG4gICAgICAgICAgaXNPdXRnb2luZzogbyxcbiAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiBvID8gcC5pZGVudGl0eV9kZWZpbmluZyA6IGZhbHNlLFxuICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IG8gPyBmYWxzZSA6IHAuaWRlbnRpdHlfZGVmaW5pbmcsXG4gICAgICAgICAgb250b0luZm9MYWJlbDogcC5pZGVudGlmaWVyX2luX25hbWVzcGFjZSxcbiAgICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8nICsgcC5wa19wcm9wZXJ0eSxcbiAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBpc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMoZW5hYmxlZFByb2ZpbGVzLCAocC5wcm9maWxlcyB8fCBbXSkpLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgdHlwZSBvZiBTdWJmaWVsZCBmb3IgYSBnaXZlbiBjbGFzc1xuICAgKlxuICAgKiBDdXJyZW50bHkgKHRvIGJlIHJldmlzZWQgaWYgZ29vZCkgc3VibGNhc3NlcyBvZiBFNTUgVHlwZSxcbiAgICogdGhhdCBhcmUgdGhlIHRhcmdldCBvZiBhIGZpZWxkIHdpdGggdGFyZ2V0TWF4UWFudGl0eT0xLFxuICAgKiBnZXQgU3ViZmllbGQgdHlwZSAnaGFzVHlwZScuXG4gICAqIFRoZXJlZm9yZSB0YXJnZXRNYXhRdWFudGl0eSBpcyBuZWVkZWQuXG4gICAqXG4gICAqIElmIHdlIGFyZSBuZXN0aW5nIHN1YmZpZWxkcywgd2UnbGwgZW5kIHVwIHdpdGggY2lyY3VsYXIgZmllbGRzLlxuICAgKiBFLmcuOiBQZXJzb24gMjEgLT4gaGFzIGFwcGVsbGF0aW9uIDExMTEgLT4gQXBwZVRlRW4gMzY1IC0+IGlzIGFwcGVsbGF0aW9uIG9mIDExMTEgLT4gUGVyc29uIDIxXG4gICAqIEluIG9yZGVyIHRvIGRldGVjdCB0aGVtLCB3ZSBjYW4gYWRkaXRpb25hbGx5IHBhc3MgaW4gdGhlIHBhcmVudCBwcm9wZXJ0eS5cbiAgICpcbiAgICogVGhpcyBiZWhhdmlvciBoYXMgdG8gYmUgcmV2aXNlZCwgYmVjYXVzZSBpdCBjYW4gbGVhZCB0byBwcm9ibGVtc1xuICAgKiB3aGVuIHRoZSBTdWJmaWVsZCBiZWxvbmdzIHRvIGEgRmllbGQgd2l0aCBtdWx0aXBsZSB0YXJnZXQgY2xhc3Nlc1xuICAgKiAoYW5kIHRodXMgU3ViZmllbGRzKSBiZWNhdXNlIHRoZSBVSSB0aGVuIGRvZXMgbm90IGFsbG93IHRvIGNob29zZVxuICAgKiB0aGUgcmlnaHQgdGFyZ2V0IGNsYXNzLlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVN1YmZpZWxkVHlwZU9mQ2xhc3MoY29uZmlnOiBTeXNDb25maWdWYWx1ZSwgcGtDbGFzczogbnVtYmVyLCB0YXJnZXRNYXhRdWFudGl0eTogbnVtYmVyLCBwYXJlbnRQcm9wZXJ0eT86IG51bWJlcik6IE9ic2VydmFibGU8R3ZTdWJmaWVsZFR5cGU+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShcbiAgICAgIGZpbHRlcihpID0+ICEhaSksXG4gICAgICBzd2l0Y2hNYXAoKGtsYXNzKSA9PiB0aGlzLnBpcGVTdWJmaWVsZFR5cGUoY29uZmlnLCBrbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHksIHBhcmVudFByb3BlcnR5KSlcbiAgICApXG4gIH1cblxuXG4gIHBpcGVTdWJmaWVsZFR5cGUoY29uZmlnOiBTeXNDb25maWdWYWx1ZSwga2xhc3M6IERmaENsYXNzLCB0YXJnZXRNYXhRdWFudGl0eTogbnVtYmVyLCBwYXJlbnRQcm9wZXJ0eT86IG51bWJlcik6IE9ic2VydmFibGU8R3ZTdWJmaWVsZFR5cGU+IHtcblxuICAgIGNvbnN0IHJlcyA9ICh4OiBHdlN1YmZpZWxkVHlwZSkgPT4gbmV3IEJlaGF2aW9yU3ViamVjdCh4KVxuICAgIGxldCBjbGFzc0NvbmZpZzogQ2xhc3NDb25maWdcbiAgICBpZiAoY29uZmlnKSBjbGFzc0NvbmZpZyA9IGNvbmZpZy5jbGFzc2VzW2tsYXNzLnBrX2NsYXNzXTtcbiAgICBpZiAoY2xhc3NDb25maWcgJiYgY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKSB7XG4gICAgICByZXR1cm4gcmVzKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSlcbiAgICB9XG5cblxuICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwICYmIHRhcmdldE1heFF1YW50aXR5ID09IDEpIHtcbiAgICAgIHJldHVybiByZXMoeyB0eXBlSXRlbTogJ3RydWUnIH0pXG4gICAgfVxuICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDggfHwga2xhc3MuYmFzaWNfdHlwZSA9PT0gMzApIHtcbiAgICAgIHJldHVybiByZXMoeyBlbnRpdHlQcmV2aWV3OiAndHJ1ZScgfSlcbiAgICB9XG4gICAgLy8gVE9ETyBhZGQgdGhpcyB0byBzeXNDb25maWdWYWx1ZVxuICAgIGVsc2UgaWYgKGtsYXNzLnBrX2NsYXNzID09PSBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOKSB7XG4gICAgICByZXR1cm4gcmVzKHsgdGltZVNwYW46ICd0cnVlJyB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIHBpcGUgdGhlIHN1YmZpZWxkcyBvZiB0aGUgdGVtcG9yYWxFbnRpdHkgY2xhc3NcbiAgICAgIHJldHVybiB0aGlzLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKGtsYXNzLnBrX2NsYXNzKS5waXBlKFxuICAgICAgICBtYXAoZmllbGRzID0+IHtcbiAgICAgICAgICBjb25zdCBzdWJlbnRpdHlTdWJmaWVsZFBhZ2U6IEd2TG9hZFN1YmVudGl0eVN1YmZpZWxkUGFnZVJlcVtdID0gW11cbiAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGZpZWxkcykge1xuICAgICAgICAgICAgLy8gZm9yIGVhY2ggb2YgdGhlc2Ugc3ViZmllbGRzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN1YmZpZWxkIG9mIGZpZWxkLmxpc3REZWZpbml0aW9ucykge1xuICAgICAgICAgICAgICAvLyBjcmVhdGUgcGFnZTpHdlN1YmZpZWxkUGFnZVxuICAgICAgICAgICAgICBsZXQgbmVzdGVkU3ViZmllbGRUeXBlOiBHdlN1YmZpZWxkVHlwZSA9IHsgZW50aXR5UHJldmlldzogJ3RydWUnIH07XG4gICAgICAgICAgICAgIGlmICghc3ViZmllbGQubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIG5lc3RlZFN1YmZpZWxkVHlwZSA9IHN1YmZpZWxkLmxpc3RUeXBlO1xuICAgICAgICAgICAgICBsZXQgaXNDaXJjdWxhciA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgcGFyZW50UHJvcGVydHkgJiZcbiAgICAgICAgICAgICAgICBzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09IHBhcmVudFByb3BlcnR5ICYmXG4gICAgICAgICAgICAgICAgc3ViZmllbGQudGFyZ2V0TWF4UXVhbnRpdHkgPT09IDFcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaXNDaXJjdWxhciA9IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBuZXN0ZWRQYWdlOiBHdkxvYWRTdWJlbnRpdHlTdWJmaWVsZFBhZ2VSZXEgPSB7XG4gICAgICAgICAgICAgICAgc3ViZmllbGRUeXBlOiBuZXN0ZWRTdWJmaWVsZFR5cGUsXG4gICAgICAgICAgICAgICAgcGFnZToge1xuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eTogc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHN1YmZpZWxkLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBzdWJmaWVsZC50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgICAgICAgIGlzQ2lyY3VsYXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3ViZW50aXR5U3ViZmllbGRQYWdlLnB1c2gobmVzdGVkUGFnZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHsgdGVtcG9yYWxFbnRpdHk6IHN1YmVudGl0eVN1YmZpZWxkUGFnZSB9XG4gICAgICAgIH0pLFxuXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogR2V0cyBjbGFzcyBmaWVsZCBjb25maWdzIG9mIGdpdmVuIHBrQ2xhc3NcbiAgICpcbiAgICogLSBvZiBhY3RpdmUgcHJvamVjdCwgaWYgYW55LCBlbHNlXG4gICAqIC0gb2YgZGVmYXVsdCBjb25maWcgcHJvamVjdCwgZWxzZVxuICAgKiAtIGVtcHR5IGFycmF5XG4gICAqXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGRDb25maWdzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8UHJvQ2xhc3NGaWVsZENvbmZpZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGZrUHJvamVjdCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3RrZXkgPSBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSh7XG4gICAgICAgICAgZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkOiBwa0NsYXNzLFxuICAgICAgICAgIGZrX3Byb2plY3Q6IGZrUHJvamVjdFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdGtleSA9IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5KHtcbiAgICAgICAgICBma19jbGFzc19mb3JfY2xhc3NfZmllbGQ6IHBrQ2xhc3MsXG4gICAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLnMucHJvJC5jbGFzc19maWVsZF9jb25maWckLmJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJC5rZXkoYWN0aXZlUHJvamVjdGtleSksXG4gICAgICAgICAgdGhpcy5zLnBybyQuY2xhc3NfZmllbGRfY29uZmlnJC5ieV9ma19wcm9qZWN0X19ma19jbGFzcyQua2V5KGRlZmF1bHRQcm9qZWN0a2V5KVxuICAgICAgICApXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFthY3RpdmVQcm9qZWN0RmllbGRzLCBkZWZhdWx0UHJvamVjdEZpZWxkc10pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjdGl2ZVByb2plY3RGaWVsZHMgJiYgdmFsdWVzKGFjdGl2ZVByb2plY3RGaWVsZHMpLmxlbmd0aCkgcmV0dXJuIGFjdGl2ZVByb2plY3RGaWVsZHM7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRQcm9qZWN0RmllbGRzXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcCgoaXRlbXMpID0+IHZhbHVlcyhpdGVtcykuc29ydCgoYSwgYikgPT4gKGEub3JkX251bSA+IGIub3JkX251bSA/IDEgOiAtMSkpKSxcbiAgICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblxuICAvKipcbiAgICogRGVsaXZlcnMgY2xhc3MgbGFiZWwgZm9yIGFjdGl2ZSBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3NMYWJlbChwa0NsYXNzPzogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5hLnBrUHJvamVjdCQsXG4gICAgICB0aGlzLmEucGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZmtQcm9qZWN0LCBsYW5ndWFnZV0pID0+IHRoaXMucGlwZUxhYmVscyh7IHBrQ2xhc3MsIGZrUHJvamVjdCwgbGFuZ3VhZ2UsIHR5cGU6ICdsYWJlbCcgfSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW1zID0+IHtcblxuICAgICAgICAgICAgY29uc3QgaSA9IGl0ZW1zLmZpbmQoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gaSA/IGkudGV4dCA6IGAqIG5vIGxhYmVsIChpZDogJHtwa0NsYXNzfSkgKmBcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGFycmF5IG9mIG9iamVjdHMgd2l0aFxuICAgKiB0ZXh0IH4gdGhlIHRleHQgb2YgdGhlIHByb3BlcnR5XG4gICAqIG9yaWdpbiwgaW4gdGhpcyBvcmRlcjpcbiAgICogLSBvcmlnaW4gPT0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyAgICAgICAgIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnICAgICAgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnICAgICAgICAgIChmcm9tIGRhdGFfZm9yX2hpc3RvcnkubGFiZWwpXG4gICAqIC0gb3JpZ2luID09ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCcgICAgICAgICAgICAgICAoZnJvbSBkYXRhX2Zvcl9oaXN0b3J5LmxhYmVsKVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUxhYmVscyhkOiB7XG4gICAgZmtQcm9qZWN0OiBudW1iZXIsXG4gICAgdHlwZTogJ2xhYmVsJyB8ICdkZWZpbml0aW9uJyB8ICdzY29wZU5vdGUnLFxuICAgIGxhbmd1YWdlOiBJbmZMYW5ndWFnZSxcbiAgICBwa0NsYXNzPzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eURvbWFpbj86IG51bWJlcixcbiAgICBma1Byb3BlcnR5UmFuZ2U/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPHtcbiAgICBvcmlnaW46IExhYmVsT3JpZ2luXG4gICAgdGV4dDogc3RyaW5nXG4gIH1bXT4ge1xuICAgIGxldCBma19zeXN0ZW1fdHlwZTogbnVtYmVyO1xuXG4gICAgaWYgKGQucGtDbGFzcykge1xuICAgICAgc3dpdGNoIChkLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGFiZWwnOlxuICAgICAgICAgIGZrX3N5c3RlbV90eXBlID0gU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignZmtfc3lzdGVtX3R5cGUgbm90IGZvdW5kJylcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZC5ma1Byb3BlcnR5KSB7XG4gICAgICBzd2l0Y2ggKGQudHlwZSkge1xuICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgZmtfc3lzdGVtX3R5cGUgPSBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdma19zeXN0ZW1fdHlwZSBub3QgZm91bmQnKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAvLyBsYWJlbCBvZiBwcm9qZWN0IGluIGRlZmF1bHQgbGFuZ3VhZ2Ugb2YgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogZC5ma1Byb2plY3QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiBkLmxhbmd1YWdlLnBrX2VudGl0eSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgb2YgZGVmYXVsdCBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNULFxuICAgICAgICBma19sYW5ndWFnZTogZC5sYW5ndWFnZS5wa19lbnRpdHksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgb2YgZGVmYXVsdCBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNULFxuICAgICAgICBma19sYW5ndWFnZTogMTg4ODksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIGZyb20gb250b21lIGluIGRlZmF1bHQgbGFuZ3VhZ2Ugb2YgcHJvamVjdFxuICAgICAgdGhpcy5waXBlRGZoTGFiZWwoe1xuICAgICAgICBsYW5ndWFnZTogZC5sYW5ndWFnZS5pc282MzkxLnRyaW0oKSxcbiAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgZmtfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0ubGFiZWwgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBmcm9tIG9udG9tZSBpbiBlbmdsaXNoXG4gICAgICB0aGlzLnBpcGVEZmhMYWJlbCh7XG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBma19jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19wcm9wZXJ0eTogZC5ma1Byb3BlcnR5XG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2Ygb250b21lIGluIGVuZ2xpc2gnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0ubGFiZWwgfVxuICAgICAgfSkpLFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyBQcm9UZXh0UHJvcGVydHlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9UZXh0UHJvcGVydHkoZDoge1xuICAgIGZrX3Byb2plY3Q6IG51bWJlcixcbiAgICBma19zeXN0ZW1fdHlwZTogbnVtYmVyLFxuICAgIGZrX2xhbmd1YWdlOiBudW1iZXIsXG4gICAgZmtfZGZoX2NsYXNzPzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eT86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHlfZG9tYWluPzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZT86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8UHJvVGV4dFByb3BlcnR5PiB7XG4gICAgY29uc3Qga2V5ID0gdGV4dFByb3BlcnR5QnlGa3NLZXkoZClcbiAgICByZXR1cm4gdGhpcy5zLnBybyQudGV4dF9wcm9wZXJ0eSQuYnlfZmtzJC5rZXkoa2V5KVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIERmaExhYmVsXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRGZoTGFiZWwoZDoge1xuICAgIHR5cGU6ICdsYWJlbCcgfCAnZGVmaW5pdGlvbicgfCAnc2NvcGVOb3RlJyxcbiAgICBsYW5ndWFnZTogc3RyaW5nLFxuICAgIGZrX2NsYXNzPzogbnVtYmVyLFxuICAgIGZrX3Byb2ZpbGU/OiBudW1iZXIsXG4gICAgZmtfcHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtfcHJvamVjdD86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8RGZoTGFiZWw+IHtcbiAgICBjb25zdCBrZXkgPSBkZmhMYWJlbEJ5RmtzS2V5KGQpXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLmxhYmVsJC5ieV9ma3MkLmtleShrZXkpXG4gIH1cblxuICAvKipcbiAgICogRGVsaXZlcnMgYmVzdCBmaXR0aW5nIGZpZWxkIGxhYmVsIGZvciBhY3RpdmUgcHJvamVjdFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGRMYWJlbChma1Byb3BlcnR5OiBudW1iZXIsIGZrUHJvcGVydHlEb21haW46IG51bWJlciwgZmtQcm9wZXJ0eVJhbmdlOiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnN0IGlzT3V0Z29pbmcgPSAhIWZrUHJvcGVydHlEb21haW47XG4gICAgLy8gY29uc3Qgc3lzdGVtX3R5cGUgPSBpc091dGdvaW5nID8gKHNpbmd1bGFyID8gMTgwIDogMTgxKSA6IChzaW5ndWxhciA/IDE4MiA6IDE4MylcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5hLnBrUHJvamVjdCQsXG4gICAgICB0aGlzLmEucGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZmtQcm9qZWN0LCBsYW5ndWFnZV0pID0+IHRoaXMucGlwZUxhYmVscyhcbiAgICAgICAge1xuICAgICAgICAgIGZrUHJvamVjdCxcbiAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgIGZrUHJvcGVydHksXG4gICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgICBma1Byb3BlcnR5UmFuZ2VcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgbGV0IGxhYmVsID0gYCogbm8gbGFiZWwgKGlkOiAke2ZrUHJvcGVydHl9KSAqYDtcbiAgICAgICAgICAgIGl0ZW1zLnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGl0ZW0gJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaXRlbS50ZXh0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBpdGVtICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaXNPdXRnb2luZyA/IGl0ZW0udGV4dCA6ICcqIHJldmVyc2Ugb2Y6ICcgKyBpdGVtLnRleHQgKyAnKidcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIG1hcHMgdGhlIGNsYXNzIHRvIHRoZSBjb3JyZXNwb25kaW5nIG1vZGVsIChkYXRhYmFzZSB0YWJsZSlcbiAgICogdGhpcyBpcyB1c2VkIGJ5IEZvcm1zIHRvIGNyZWF0ZSBuZXcgZGF0YSBpbiB0aGUgc2hhcGUgb2ZcbiAgICogdGhlIGRhdGEgbW9kZWxcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUYWJsZU5hbWVPZkNsYXNzKHRhcmdldENsYXNzUGs6IG51bWJlcik6IE9ic2VydmFibGU8VGFibGVOYW1lPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLFxuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkodGFyZ2V0Q2xhc3NQaylcbiAgICApLnBpcGUoXG4gICAgICBmaWx0ZXIoaSA9PiAhaS5pbmNsdWRlcyh1bmRlZmluZWQpKSxcbiAgICAgIG1hcCgoW2NvbmZpZywga2xhc3NdKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZyA9IGNvbmZpZy5jbGFzc2VzW3RhcmdldENsYXNzUGtdO1xuICAgICAgICBpZiAoY2xhc3NDb25maWcgJiYgY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKSB7XG5cbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKVxuICAgICAgICAgIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuYXBwZWxsYXRpb24pIHJldHVyblxuICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbMF07XG4gICAgICAgICAgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuICdhcHBlbGxhdGlvbic7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gJ2xhbmd1YWdlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUucGxhY2UpIHJldHVybiAncGxhY2UnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS50aW1lUHJpbWl0aXZlKSByZXR1cm4gJ3RpbWVfcHJpbWl0aXZlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuICdsYW5nX3N0cmluZyc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuICdkaW1lbnNpb24nO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0IHR5cGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA4IHx8IGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwKSB7XG4gICAgICAgICAgcmV0dXJuICdwZXJzaXN0ZW50X2l0ZW0nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICd0ZW1wb3JhbF9lbnRpdHknXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIENsYXNzZXNcbiAgICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdDpcbiAgICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyBlbmFibGVkIGJ5IGNsYXNzX3Byb2pfcmVsXG4gICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgcmVxdWlyZWQgYnkgc291cmNlc1xuICAgKlxuICAgKiBUaGlzIGlzIHVzZWZ1bGwgdG8gY3JlYXRlIHNlbGVjdCBkcm9wZG93bnMgb2YgY2xhc3NlcyB1c2VycyB3aWxsIGtub3dcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzSW5FbnRpdGllc09yU291cmNlcygpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuICAgICAgdGhpcy5waXBlQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbiAgICAgIHN0YXJ0V2l0aCh7fSlcbiAgICApXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKCkge1xuICAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpXG4gICAgICAucGlwZShtYXAoYyA9PiB2YWx1ZXMoYykubWFwKGsgPT4gay5ma19jbGFzcykpKVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgICogb2YgYWxsIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhdCBsZWFzdCBvbmUgb2YgdGhlIGFjdGl2YXRlZCBwcm9maWxlc1xuICAgKiBvZiB0aHRlIGdpdmVuIHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzRW5hYmxlZEJ5UHJvamVjdFByb2ZpbGVzKCk6IE9ic2VydmFibGU8RGZoQ2xhc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmFsbCQsXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtjbGFzc2VzQnlQaywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlc01hcCA9IGluZGV4QnkoKGspID0+IGsudG9TdHJpbmcoKSwgdmFsdWVzKGVuYWJsZWRQcm9maWxlcykpXG4gICAgICAgIHJldHVybiB2YWx1ZXMoY2xhc3Nlc0J5UGspXG4gICAgICAgICAgLmZpbHRlcihrbGFzcyA9PiBrbGFzcy5wcm9maWxlcy5zb21lKHByb2ZpbGUgPT4gcHJvZmlsZXNNYXBbcHJvZmlsZS5ma19wcm9maWxlXSkpXG4gICAgICB9KVxuICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAqIG9mIGFsbCB0eXBlIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhdCBsZWFzdCBvbmUgb2YgdGhlIGFjdGl2YXRlZCBwcm9maWxlc1xuICAqIG9mIHRodGUgZ2l2ZW4gcHJvamVjdFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUNsYXNzZXNFbmFibGVkQnlQcm9qZWN0UHJvZmlsZXMoKTogT2JzZXJ2YWJsZTxEZmhDbGFzc1tdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X2Jhc2ljX3R5cGUkLmtleSgzMCksXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtjbGFzc2VzQnlQaywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlc01hcCA9IGluZGV4QnkoKGspID0+IGsudG9TdHJpbmcoKSwgdmFsdWVzKGVuYWJsZWRQcm9maWxlcykpXG4gICAgICAgIHJldHVybiB2YWx1ZXMoY2xhc3Nlc0J5UGspXG4gICAgICAgICAgLmZpbHRlcihrbGFzcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2xhc3MucHJvZmlsZXMuc29tZShwcm9maWxlID0+IHByb2ZpbGVzTWFwW3Byb2ZpbGUuZmtfcHJvZmlsZV0pICYmXG4gICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgTWFuaWZlc3RhdGlvbiBwcm9kdWN0IHR5cGUgYW5kIGxhbmd1YWdlXG4gICAgICAgICAgICAgICFbXG4gICAgICAgICAgICAgICAgRGZoQ29uZmlnLkNMQVNTX1BLX0xBTkdVQUdFLFxuICAgICAgICAgICAgICAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRVxuICAgICAgICAgICAgICBdLmluY2x1ZGVzKGtsYXNzLnBrX2NsYXNzKVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXJlIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgICogb2YgYWxsIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhY3RpdmUgcHJvamVjdCAodXNpbmcgY2xhc3NfcHJval9yZWwpXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX2NsYXNzX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlbHMpID0+IHZhbHVlcyhyZWxzKS5tYXAocmVsID0+IHJlbC5ma19jbGFzcykpXG4gICAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBUZUVuIENsYXNzZXNcbiAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTZWxlY3RlZFRlRW5DbGFzc2VzSW5Qcm9qZWN0KCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlVGVFbkNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuICAgICAgdGhpcy5waXBlVGVFbkNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4gICAgICBzdGFydFdpdGgoe30pXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYXJyYXkgb2YgcGtfY2xhc3Mgd2l0aCB0ZUVuIGNsYXNzZXMgZW5hYmxlZCBpbiBlbnRpdGllc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRlRW5DbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfY2xhc3NfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkLmtleShwa1Byb2plY3QgKyAnX3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoY3MpID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdmFsdWVzKGNzKS5tYXAoYyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShjLmZrX2NsYXNzKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoZGZoQ2xhc3NlcyA9PiB0aGlzLmZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlcykpXG4gICAgICAgICkpXG4gICAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIGFycmF5IG9mIERmaENsYXNzIGZvciBUZUVuIENsYXNzZXMgYW5kIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3NcbiAgICogQHBhcmFtIGRmaENsYXNzZXMgYXJyYXkgb2YgRGZoQ2xhc3NcbiAgICogQHJldHVybnMgcmV0dXJucyBhcnJheSBvZiBwa19jbGFzcyB3aGVyZSBjbGFzcyBpcyBUZUVuIGNsYXNzXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlczogRGZoQ2xhc3NbXSk6IG51bWJlcltdIHtcbiAgICBjb25zdCBwa3M6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZmhDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gZGZoQ2xhc3Nlc1tpXTtcbiAgICAgIGlmIChjLmJhc2ljX3R5cGUgPT09IDkpIHBrcy5wdXNoKGMucGtfY2xhc3MpO1xuICAgIH1cbiAgICByZXR1cm4gcGtzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYXJyYXkgb2YgcGtfY2xhc3Mgd2l0aCB0ZUVuIGNsYXNzZXMgcmVxdWlyZWQgYnkgc291cmNlc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRlRW5DbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGNzKSA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHZhbHVlcyhjcykubWFwKGMgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkoYy5ma19jbGFzcykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICApKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKGRmaENsYXNzZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzKVxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgICApXG4gIH1cblxuXG5cblxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUFuZFR5cGVkQ2xhc3NlcyhlbmFibGVkSW4/OiAnZW50aXRpZXMnIHwgJ3NvdXJjZXMnKTogT2JzZXJ2YWJsZTx7IHR5cGVkQ2xhc3M6IG51bWJlciwgdHlwZUNsYXNzOiBudW1iZXIgfVtdPiB7XG5cbiAgICBsZXQgcGtzJDogT2JzZXJ2YWJsZTxudW1iZXJbXT5bXTtcblxuICAgIGNvbnN0IGZyb21Tb3VyY2VzJCA9IHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcChjbGFzc2VzID0+IHZhbHVlcyhjbGFzc2VzKS5tYXAoayA9PiBrLmZrX2NsYXNzKSksXG4gICAgKVxuXG4gICAgY29uc3QgZnJvbUVudGl0aWVzJCA9IHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpXG5cbiAgICBpZiAoZW5hYmxlZEluID09PSAnc291cmNlcycpIHtcbiAgICAgIHBrcyQgPSBbZnJvbVNvdXJjZXMkXTtcbiAgICB9IGVsc2UgaWYgKGVuYWJsZWRJbiA9PT0gJ2VudGl0aWVzJykge1xuICAgICAgcGtzJCA9IFtmcm9tRW50aXRpZXMkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGtzJCA9IFtmcm9tU291cmNlcyQsIGZyb21FbnRpdGllcyRdXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QocGtzJCkucGlwZShcbiAgICAgIG1hcChhcnJheU9mUGtBcnJheXMgPT4gdW5pcShmbGF0dGVuPG51bWJlcj4oYXJyYXlPZlBrQXJyYXlzKSkpLFxuICAgICAgc3dpdGNoTWFwKHBrcyA9PiB0aGlzLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMocGtzKSlcbiAgICApXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKHBrVHlwZWRDbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8eyB0eXBlZENsYXNzOiBudW1iZXIsIHR5cGVDbGFzczogbnVtYmVyIH1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX2RvbWFpbi50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBwa1R5cGVkQ2xhc3Nlcy5tYXAocGsgPT4gKHtcbiAgICAgICAgICB0eXBlZENsYXNzOiBwayxcbiAgICAgICAgICB0eXBlQ2xhc3M6IGJ5RG9tYWluW3BrXSA/IGJ5RG9tYWluW3BrXS5oYXNfcmFuZ2UgOiB1bmRlZmluZWRcbiAgICAgICAgfSkpXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQ2xhc3NPZlR5cGVkQ2xhc3MocGtUeXBlZENsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfZG9tYWluLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIGJ5RG9tYWluW3BrVHlwZWRDbGFzc10gPyBieURvbWFpbltwa1R5cGVkQ2xhc3NdLmhhc19yYW5nZSA6IHVuZGVmaW5lZFxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyhwa1R5cGVDbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcblxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19yYW5nZS50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBwa1R5cGVDbGFzc2VzLm1hcChwayA9PiBieURvbWFpbltwa10gPyBieURvbWFpbltwa10uaGFzX2RvbWFpbiA6IHVuZGVmaW5lZClcbiAgICAgIH0pKVxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZVByb3BlcnR5T2ZUeXBlZENsYXNzKHBrVHlwZWRDbGFzcyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGVQcm9wID0gdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykuZmluZChwID0+IHAuaGFzX2RvbWFpbiA9PT0gcGtUeXBlZENsYXNzKVxuICAgICAgICByZXR1cm4gdHlwZVByb3AgPyB0eXBlUHJvcC5wa19wcm9wZXJ0eSA6IHVuZGVmaW5lZDtcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMocGtQcm9wZXJ0aWVzOiBudW1iZXJbXSwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X3BrX3Byb3BlcnR5JC5hbGwkLnBpcGUoXG4gICAgICBtYXAoeCA9PiB7XG4gICAgICAgIGlmICghcGtQcm9wZXJ0aWVzIHx8ICFwa1Byb3BlcnRpZXMubGVuZ3RoKSByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3QgcmVzID0gW11cbiAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3NlcyA9IHt9O1xuICAgICAgICBwa1Byb3BlcnRpZXMuZm9yRWFjaChwa1Byb3AgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BzID0gdmFsdWVzKHhbcGtQcm9wXSk7XG4gICAgICAgICAgcHJvcHMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldENsYXNzID0gaXNPdXRnb2luZyA/IHByb3AuaGFzX3JhbmdlIDogcHJvcC5oYXNfZG9tYWluO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXRDbGFzc2VzW3RhcmdldENsYXNzXSkge1xuICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzW3RhcmdldENsYXNzXSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlcy5wdXNoKHRhcmdldENsYXNzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5cblxuZnVuY3Rpb24gY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KGRvbWFpbkNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuXG4gIGNvbnN0IGhhc0RlZmluaXRpb246IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IGRvbWFpbkNsYXNzLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfUDE4X0hBU19ERUZJTklUSU9OLFxuICAgIGhhc19yYW5nZTogNzg1LFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ1AxOCcsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IGZhbHNlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzRGVmaW5pdGlvblxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUFwcGVsbGF0aW9uUHJvcGVydHkocmFuZ2VDbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cbiAgY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRixcbiAgICBoYXNfcmFuZ2U6IHJhbmdlQ2xhc3MsXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMCxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnaGlzdFA5JyxcbiAgICBpZGVudGl0eV9kZWZpbmluZzogdHJ1ZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0FwcGVQcm9wXG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShkb21haW5DbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cbiAgY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IGRvbWFpbkNsYXNzLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTixcbiAgICBoYXNfcmFuZ2U6IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4sXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnUDQnLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiBmYWxzZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0FwcGVQcm9wXG59XG5cblxuZnVuY3Rpb24gaXNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzKGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sIHByb2ZpbGVzOiBSZWxhdGVkUHJvZmlsZVtdKTogYm9vbGVhbiB7XG4gIHJldHVybiAhcHJvZmlsZXMuc29tZShwID0+IHAucmVtb3ZlZF9mcm9tX2FwaSA9PT0gZmFsc2UgJiYgZW5hYmxlZFByb2ZpbGVzLmluY2x1ZGVzKHAuZmtfcHJvZmlsZSkpXG5cbn1cblxuZnVuY3Rpb24gZ2V0UGxhY2VPZkRpc3BsYXkoc3BlY2lhbEZpZWxkczogU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgc3ViZmllbGQ6IFN1YmZpZWxkLCBwcm9qZWN0RmllbGRDb25maWc/OiBQcm9DbGFzc0ZpZWxkQ29uZmlnKTogRmllbGRQbGFjZU9mRGlzcGxheSB7XG4gIGxldCBzZXR0aW5nczogU3lzQ29uZmlnRmllbGREaXNwbGF5O1xuXG4gIHNldHRpbmdzID0gZ2V0U2V0dGluZ3NGcm9tU3lzQ29uZmlnKHN1YmZpZWxkLCBzcGVjaWFsRmllbGRzLCBzZXR0aW5ncyk7XG5cbiAgLy8gaWYgdGhpcyBpcyBhIHNwZWNpYWwgZmllbGQsIGNyZWF0ZSBjb3JyZXNwb25kaW5nIGRpc3BsYXkgc2V0dGluZ3MgYW5kIHJldHVybiBpdFxuICBpZiAoc2V0dGluZ3MpIHtcbiAgICBpZiAoc2V0dGluZ3MuZGlzcGxheUluQmFzaWNGaWVsZHMpIHtcbiAgICAgIHJldHVybiB7IGJhc2ljRmllbGRzOiB7IHBvc2l0aW9uOiBzZXR0aW5ncy5kaXNwbGF5SW5CYXNpY0ZpZWxkcy5wb3NpdGlvbiB9IH1cbiAgICB9IGVsc2UgaWYgKHNldHRpbmdzLmhpZGRlbikge1xuICAgICAgcmV0dXJuIHsgaGlkZGVuOiB0cnVlIH1cbiAgICB9XG4gIH1cblxuICAvLyBvdGhlcndpc2UgZGlzcGxheSB0aGUgZmllbGQgaW4gc3BlY2lmaWMgZmllbGRzIChkZWZhdWx0KVxuICBsZXQgcG9zaXRpb24gPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gIGlmIChwcm9qZWN0RmllbGRDb25maWcpIHBvc2l0aW9uID0gcHJvamVjdEZpZWxkQ29uZmlnLm9yZF9udW1cbiAgcmV0dXJuIHsgc3BlY2lmaWNGaWVsZHM6IHsgcG9zaXRpb24gfSB9XG5cbn1cbmZ1bmN0aW9uIGdldFNldHRpbmdzRnJvbVN5c0NvbmZpZyhcbiAgc3ViZmllbGQ6IFN1YmZpZWxkLCBzcGVjaWFsRmllbGRzOiBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBzZXR0aW5nczogU3lzQ29uZmlnRmllbGREaXNwbGF5KSB7XG4gIGlmIChzdWJmaWVsZC5pc091dGdvaW5nKSB7XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IGhhcy10eXBlLXN1YnByb3BlcnR5XG4gICAgaWYgKHN1YmZpZWxkLmlzSGFzVHlwZUZpZWxkICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmhhc1R5cGVTdWJwcm9wZXJ0aWVzKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuaGFzVHlwZVN1YnByb3BlcnRpZXM7XG4gICAgfVxuICAgIC8vIGdldCBzZXR0aW5ncyBieSBzb3VyY2UgY2xhc3MgYW5kIHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIGdldCBzZWV0aW5ncyBieSBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IHNvdXJjZSBjbGFzcyBhbmQgcHJvcGVydHlcbiAgICBpZiAoc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIGdldCBzZWV0aW5ncyBieSBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzO1xufVxuXG5cblxuXG5cblxuLyoqXG4gKiBQaXBlcyB0aGUgZmllbGRzIGZvciB0ZW1wb3JhbCBlbnRpdHkgZm9ybXNcbiAqIC0gdGhlIHNwZWNpZmljIGZpZWxkc1xuICogLSB0aGUgd2hlbiBmaWVsZFxuICogLSBpZiBhdmFpbGFibGU6IHRoZSB0eXBlIGZpZWxkXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZERlZmluaXRpb25zRm9yVGVFbkZvcm0ocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4vLyAgIHJldHVybiBvZihbXSlcbi8vIGNvbnN0IGhhc1R5cGVMaXN0RGVmJCA9IHRoaXMucGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzKVxuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIHRoaXMucGlwZVNwZWNpZmljRmllbGREZWZpbml0aW9ucyhwa0NsYXNzKVxuLy8gICAgIC5waXBlKFxuLy8gICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHMuZmlsdGVyKGYgPT4gZi5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID09PSBmYWxzZSkpXG4vLyAgICAgKVxuLy8gICAsXG4vLyAgIGhhc1R5cGVMaXN0RGVmJCxcbi8vICkucGlwZShcbi8vICAgbWFwKChbZmllbGRzLCBoYXNUeXBlTGlzdERlZnNdKSA9PiB7XG4vLyAgICAgY29uc3Qgd2hlbiA9IHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU4pXG4vLyAgICAgcmV0dXJuIFtcbi8vICAgICAgIC4uLmZpZWxkcyxcbi8vICAgICAgIHdoZW4sXG4vLyAgICAgICAuLi5oYXNUeXBlTGlzdERlZnMubWFwKChoYXNUeXBlTGlzdERlZikgPT4ge1xuLy8gICAgICAgICBjb25zdCB0eXBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNUeXBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzVHlwZUxpc3REZWZdIH1cbi8vICAgICAgICAgcmV0dXJuIHR5cGVGaWVsZDtcbi8vICAgICAgIH0pXG4vLyAgICAgXVxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8qKlxuICogUGlwZSB0aGUgc3BlY2lmaWMgZmllbGRzIG9mIGdpdmVuIGNsYXNzXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTcGVjaWZpY0ZpZWxkRGVmaW5pdGlvbnMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgdHJ1ZSkucGlwZShcbi8vICAgICAvLyBmaWx0ZXIgb3V0IHRoZSAnaGFzIHR5cGUnIHByb3BlcnR5LCBzaW5jZSBpdCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IGZpZWxkc1xuLy8gICAgIG1hcChvdXRnb2luZyA9PiBvdXRnb2luZy5maWx0ZXIobyA9PiAhby5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSkpXG4vLyAgICksXG4vLyAgIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIGZhbHNlKS5waXBlKFxuLy8gICAgIC8vIGZpbHRlciBvdXQgdGhlICdoYXMgYXBwZWxsYXRpb24nIHByb3BlcnR5LCBzaW5jZSBpdCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IGZpZWxkc1xuLy8gICAgIG1hcChpbmdvaW5nID0+IGluZ29pbmcuZmlsdGVyKGkgPT5cbi8vICAgICAgIGkucGtfcHJvcGVydHkgIT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRlxuLy8gICAgICAgJiYgaS5wa19wcm9wZXJ0eSAhPT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0dFT1ZQMV9JU19SRVBST0RVQ1RJT05fT0Zcbi8vICAgICApKVxuLy8gICApLFxuLy8gICB0aGlzLnBpcGVGaWVsZENvbmZpZ3MocGtDbGFzcylcbi8vICkucGlwZShcbi8vICAgc3dpdGNoTWFwKChbb3V0Z29pbmcsIGluZ29pbmcsIGZpZWxkQ29uZmlnc10pID0+IHtcblxuLy8gICAgIGNvbnN0IGtleSA9IChmYzogUGFydGlhbDxQcm9DbGFzc0ZpZWxkQ29uZmlnPikgPT4gYCR7ZmMuZmtfcHJvcGVydHl9XyR7ZmMuZmtfZG9tYWluX2NsYXNzfV8ke2ZjLmZrX3JhbmdlX2NsYXNzfWA7XG4vLyAgICAgY29uc3QgaW5kZXhlZCA9IGluZGV4QnkoKGZjKSA9PiBgJHtmYy5ma19wcm9wZXJ0eX1fJHtmYy5ma19kb21haW5fY2xhc3N9XyR7ZmMuZmtfcmFuZ2VfY2xhc3N9YCwgZmllbGRDb25maWdzKVxuLy8gICAgIGNvbnN0IGdldEZpZWxkQ29uZmlnID0gKGxpc3REZWY6IFN1YmZpZWxkKTogUHJvQ2xhc3NGaWVsZENvbmZpZyA9PiB7XG4vLyAgICAgICByZXR1cm4gaW5kZXhlZFtrZXkoe1xuLy8gICAgICAgICBma19wcm9wZXJ0eTogbGlzdERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuLy8gICAgICAgICBma19kb21haW5fY2xhc3M6IGxpc3REZWYuaXNPdXRnb2luZyA/IGxpc3REZWYuc291cmNlQ2xhc3MgOiBudWxsLFxuLy8gICAgICAgICBma19yYW5nZV9jbGFzczogbGlzdERlZi5pc091dGdvaW5nID8gbnVsbCA6IGxpc3REZWYuc291cmNlQ2xhc3MsXG4vLyAgICAgICB9KV1cbi8vICAgICB9XG5cbi8vICAgICAvLyBDcmVhdGUgbGlzdCBkZWZpbml0aW9uc1xuLy8gICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKGluZ29pbmcsIGZhbHNlKSxcbi8vICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRnb2luZywgdHJ1ZSlcbi8vICAgICApLnBpcGUoXG4vLyAgICAgICBtYXAoKFtpbmdvaW5nTGlzdERlZnMsIG91dGdvaW5nTGlzdERlZnNdKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IGxpc3REZWZpbml0aW9ucyA9IFsuLi5pbmdvaW5nTGlzdERlZnMsIC4uLm91dGdvaW5nTGlzdERlZnNdO1xuXG4vLyAgICAgICAgIC8vIENyZWF0ZSBmaWVsZCBkZWZpbml0aW9uc1xuLy8gICAgICAgICBjb25zdCBmaWVsZERlZnM6IHsgW2tleTogc3RyaW5nXTogRmllbGQgfSA9IHt9XG4vLyAgICAgICAgIGxpc3REZWZpbml0aW9ucy5mb3JFYWNoKGxpc3REZWYgPT4ge1xuXG4vLyAgICAgICAgICAgY29uc3QgayA9IGxpc3REZWYucHJvcGVydHkucGtQcm9wZXJ0eSArICdfJyArIGxpc3REZWYuaXNPdXRnb2luZztcblxuLy8gICAgICAgICAgIGlmICghZmllbGREZWZzW2tdKSB7XG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10gPSB7XG4vLyAgICAgICAgICAgICAgIC4uLmxpc3REZWYsXG4vLyAgICAgICAgICAgICAgIHBsYWNlT2ZEaXNwbGF5OiB7fSxcbi8vICAgICAgICAgICAgICAgYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2UsXG4vLyAgICAgICAgICAgICAgIGZpZWxkQ29uZmlnOiBnZXRGaWVsZENvbmZpZyhsaXN0RGVmKSxcbi8vICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb25zOiBbbGlzdERlZl0sXG4vLyAgICAgICAgICAgICAgIHRhcmdldENsYXNzZXM6IFtsaXN0RGVmLnRhcmdldENsYXNzXVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10ubGlzdERlZmluaXRpb25zLnB1c2gobGlzdERlZilcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXS50YXJnZXRDbGFzc2VzLnB1c2gobGlzdERlZi50YXJnZXRDbGFzcylcbi8vICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAvLyB9XG5cbi8vICAgICAgICAgfSlcbi8vICAgICAgICAgLy8gT3JkZXIgdGhlIGZpZWxkcyBhY2NvcmRpbmcgdG8gb3JkX251bSAoZnJvbSBwcm9qZWN0J3MgY29uZmlnLCBrbGVpb2xhYidzIGNvbmZpZykgb3IgcHV0IGl0IGF0IGVuZCBvZiBsaXN0LlxuLy8gICAgICAgICByZXR1cm4gc29ydChcbi8vICAgICAgICAgICAoYSwgYikgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3QgZ2V0T3JkTnVtID0gKGl0ZW06IEZpZWxkKSA9PiB7XG4vLyAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZmllbGRDb25maWcpIHJldHVybiBpdGVtLmZpZWxkQ29uZmlnLm9yZF9udW07XG4vLyAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBjb25zdCBvcmROdW1BID0gZ2V0T3JkTnVtKGEpO1xuLy8gICAgICAgICAgICAgY29uc3Qgb3JkTnVtQiA9IGdldE9yZE51bShiKTtcbi8vICAgICAgICAgICAgIHJldHVybiBvcmROdW1BIC0gb3JkTnVtQjtcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHZhbHVlcyhmaWVsZERlZnMpKVxuLy8gICAgICAgfSlcbi8vICAgICApXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLyoqXG4gKiBQaXBlIHRoZSBmaWVsZHMgZm9yIGlkZW50aWZpY2F0aW9uIG9mIGdpdmVuIGNsYXNzXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVEZWZhdWx0RmllbGREZWZpbml0aW9ucyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuXG4vLyAvKipcbi8vICAqIFBpcGUgdGhlIGdlbmVyaWMgZmllbGQgaGFzIGFwcGVsbGF0aW9uXG4vLyAgKiB3aXRoIHRoZSBnaXZlbiBjbGFzcyBhcyByYW5nZVxuLy8gICovXG4vLyBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHlTdGF0dXMgPSB7XG4vLyAgIGhhc19kb21haW46IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UsXG4vLyAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSVNfQVBQRUxMQVRJT05fT0YsXG4vLyAgIGhhc19yYW5nZTogcGtDbGFzcyxcbi8vICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4vLyAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDAsXG4vLyAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbi8vICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuLy8gICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ2hpc3RQOScsXG4vLyAgIGlkZW50aXR5X2RlZmluaW5nOiB0cnVlLFxuLy8gICBpc19pbmhlcml0ZWQ6IHRydWUsXG4vLyAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbi8vICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2UsXG4vLyAgIHByb2ZpbGVzOiBbXVxuLy8gfVxuLy8gY29uc3QgaGFzQXBwZUxpc3REZWYkID0gdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFtoYXNBcHBlUHJvcF0sIGZhbHNlKS5waXBlKFxuLy8gICBmaWx0ZXIobGlzdERlZnMgPT4gISFsaXN0RGVmcyAmJiAhIWxpc3REZWZzWzBdKSxcbi8vICAgbWFwKGxpc3REZWZzID0+IGxpc3REZWZzWzBdKVxuLy8gKTtcblxuLy8gLyoqXG4vLyAgKiBQaXBlIHRoZSBnZW5lcmljIGZpZWxkIGhhcyB0eXBlXG4vLyAgKiB3aXRoIHRoZSBnaXZlbiBjbGFzcyBhcyByYW5nZVxuLy8gICovXG4vLyBjb25zdCBoYXNUeXBlTGlzdERlZiQgPSB0aGlzLnBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzcylcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICBoYXNBcHBlTGlzdERlZiQsXG4vLyAgIGhhc1R5cGVMaXN0RGVmJCxcbi8vICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShmaWx0ZXIoYyA9PiAhIWMpKVxuLy8gKS5waXBlKFxuLy8gICBtYXAoKFtoYXNBcHBlTGlzdERlZiwgaGFzVHlwZUxpc3REZWZzLCBrbGFzc10pID0+IHtcbi8vICAgICBjb25zdCBmaWVsZHM6IEZpZWxkW10gPSBbXVxuXG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICAqIEFkZCAnc2hvcnQgdGl0bGUnIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAgKlxuLy8gICAgIC8vICAqIE1hbmlmZXN0YXRpb24gUHJvZHVjdCBUeXBlIOKAkyBGMywgMjE5XG4vLyAgICAgLy8gICogTWFuaWZlc3RhdGlvbiBTaW5nbGV0b24g4oCTIEY0LCAyMjBcbi8vICAgICAvLyAgKiBJdGVtIOKAkyBGNSwgMjIxXG4vLyAgICAgLy8gICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gICovXG4vLyAgICAgLy8gaWYgKFtcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1NJTkdMRVRPTixcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19JVEVNLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNUXS5pbmNsdWRlcyhwa0NsYXNzKSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfU0hPUlRfVElUTEUpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdoYXMgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0UDknIHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIGNsYXNzZXMgZXhjZXB0ICdBcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RDMTAnLCAzNjVcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4vLyAgICAgLy8gICBjb25zdCBhcHBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNBcHBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzQXBwZUxpc3REZWZdIH1cbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKGFwcGVGaWVsZCk7XG4vLyAgICAgLy8gfVxuXG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdoYXNUeXBlJyBmaWVsZHNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChoYXNUeXBlTGlzdERlZnMgJiYgaGFzVHlwZUxpc3REZWZzLmxlbmd0aCA+IDApIHtcbi8vICAgICAvLyAgIGhhc1R5cGVMaXN0RGVmcy5mb3JFYWNoKChoYXNUeXBlTGlzdERlZikgPT4ge1xuLy8gICAgIC8vICAgICBjb25zdCB0eXBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNUeXBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzVHlwZUxpc3REZWZdIH1cbi8vICAgICAvLyAgICAgZmllbGRzLnB1c2godHlwZUZpZWxkKTtcbi8vICAgICAvLyAgIH0pXG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnZW50aXR5IGRlZmluaXRpb24nIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgY2xhc3NlcyBleGNlcHQgJ0FwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdEMxMCcsIDM2NVxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VOVElUWV9ERUZJTklUSU9OKSk7XG4vLyAgICAgLy8gfVxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2lkZW50aWZpZXIgLyBleGFjdCByZWZlcmVuY2UgLyB1cmwgLyAuLi4nIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1QgPT09IHBrQ2xhc3MpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VYQUNUX1JFRkVSRU5DRSkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2NvbW1lbnQnIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBNYW5pZmVzdGF0aW9uIFByb2R1Y3QgVHlwZSDigJMgRjMsIDIxOVxuLy8gICAgIC8vICogTWFuaWZlc3RhdGlvbiBTaW5nbGV0b24g4oCTIEY0LCAyMjBcbi8vICAgICAvLyAqIEl0ZW0g4oCTIEY1LCAyMjFcbi8vICAgICAvLyAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICogRXhwcmVzc2lvbiBwb3J0aW9uIOKAkyBnZW92QzUsIDUwM1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKFtcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1NJTkdMRVRPTixcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19JVEVNLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNULFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0VYUFJFU1NJT05fUE9SVElPTl0uaW5jbHVkZXMocGtDbGFzcykpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICd0aW1lLXNwYW4nIGZpZWxkIHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIHRlbXBvcmFsIGVudGl0eSBjbGFzc2VzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTikpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIHJldHVybiBmaWVsZHNcblxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8vIHByaXZhdGUgcGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzOiBudW1iZXIpIHtcbi8vICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIHRydWUpLnBpcGUoXG4vLyAgICAgLy8gY2hlY2sgaWYgdGhpcyBjbGFzcyBoYXMgJ2hhcyB0eXBlJyBzdWJwcm9wZXJ0eVxuLy8gICAgIG1hcChvdXRnb2luZyA9PiB7XG4vLyAgICAgICByZXR1cm4gb3V0Z29pbmcuZmlsdGVyKChwcm9wKSA9PiBwcm9wLmlzX2hhc190eXBlX3N1YnByb3BlcnR5KTtcbi8vICAgICB9KSwgc3dpdGNoTWFwKGhhc1R5cGVQcm9wcyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShoYXNUeXBlUHJvcHMubWFwKGRmaFByb3AgPT4ge1xuLy8gICAgICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhbZGZoUHJvcF0sIHRydWUpLnBpcGUoZmlsdGVyKGxpc3REZWZzID0+ICEhbGlzdERlZnMgJiYgISFsaXN0RGVmc1swXSksIG1hcChsaXN0RGVmcyA9PiB7XG4vLyAgICAgICAgIGNvbnN0IGxpc3REZWYgPSBsaXN0RGVmc1swXTtcbi8vICAgICAgICAgbGlzdERlZi5saXN0VHlwZSA9IHsgdHlwZUl0ZW06ICd0cnVlJyB9O1xuLy8gICAgICAgICByZXR1cm4gbGlzdERlZjtcbi8vICAgICAgIH0pKTtcbi8vICAgICB9KSkpKTtcbi8vIH1cblxuLy8gZ2V0Q2xhc3NGaWVsZFN1YmZpZWxkKHBrQ2xhc3NGaWVsZDogbnVtYmVyKTogU3ViZmllbGQge1xuLy8gICBjb25zdCB0ZW1wbGF0ZSA9IHtcbi8vICAgICBwcm9wZXJ0eToge30sXG4vLyAgICAgc291cmNlQ2xhc3M6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VDbGFzc0xhYmVsOiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0Q2xhc3M6IHVuZGVmaW5lZCxcbi8vICAgICBpc091dGdvaW5nOiB1bmRlZmluZWQsXG4vLyAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogdW5kZWZpbmVkLFxuLy8gICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRNYXhRdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldE1pblF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlTWF4UXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VNaW5RdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlXG4vLyAgIH1cbi8vICAgc3dpdGNoIChwa0NsYXNzRmllbGQpIHtcbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiB7IHRpbWVTcGFuOiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdXaGVuJyxcbi8vICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZSxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQNCcsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzQnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VOVElUWV9ERUZJTklUSU9OOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0Rlc2NyaXB0aW9uJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5UOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0NvbW1lbnRzJyxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VYQUNUX1JFRkVSRU5DRTpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdFeGFjdCBSZWZlcmVuY2UnLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1NIT1JUX1RJVExFOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ1Nob3J0IFRpdGxlJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBkZWZhdWx0OlxuLy8gICAgICAgYnJlYWs7XG4vLyAgIH1cbi8vIH1cblxuLy8gZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24ocGtDbGFzc0ZpZWxkOiBudW1iZXIpOiBGaWVsZCB7XG4vLyAgIGNvbnN0IGxpc3REZWYgPSB0aGlzLmdldENsYXNzRmllbGRTdWJmaWVsZChwa0NsYXNzRmllbGQpXG4vLyAgIHJldHVybiB7IC4uLmxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2xpc3REZWZdIH1cbi8vIH1cblxuXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc1JlcXVpcmVkKCkge1xuLy8gICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZCQua2V5KCd0cnVlJylcbi8vICAgICAucGlwZShtYXAoYyA9PiB2YWx1ZXMoYykubWFwKGsgPT4gay5ma19jbGFzcykpKVxuLy8gfVxuXG5cblxuLy8gLyoqXG4vLyAgKiBQaXBlcyBhbGwgdGhlIGVuYWJsZWQgcHJvcGVydGllcyBvZiBhIGNsYXNzXG4vLyAgKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPERmaFByb3BlcnR5U3RhdHVzW10+IHtcblxuXG4vLyAgIGxldCAkOiBPYnNlcnZhYmxlPEJ5UGs8RGZoUHJvcGVydHk+PlxuLy8gICBpZiAoaXNPdXRnb2luZykge1xuLy8gICAgICQgPSB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX2RvbWFpbiQua2V5KHBrQ2xhc3MpXG4vLyAgIH1cbi8vICAgZWxzZSB7XG4vLyAgICAgJCA9IHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfcmFuZ2UkLmtleShwa0NsYXNzKVxuLy8gICB9XG5cbi8vICAgLy8gZmlsdGVyIHByb3BlcnRpZXMgdGhhdCBhcmUgaW4gYXQgbGVhc3Qgb25lIHByb2ZpbGUgZW5hYmxlZCBieSBwcm9qZWN0XG4vLyAgIGNvbnN0IHByb2ZpbGVzJCA9IHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG5cblxuLy8gICAvLyBGaWx0ZXIgb3V0IG9ubHkgdGhlIHByb3BlcnRpZXMgZm9yIHdoaWNoIHRhcmdldCBjbGFzcyBpcyBhbGxvd2VkXG4vLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KCQsIHByb2ZpbGVzJClcbi8vICAgICAucGlwZShcbi8vICAgICAgIG1hcCgoW3Byb3BzLCBwcm9maWxlc10pID0+IHtcbi8vICAgICAgICAgY29uc3QgcDogRGZoUHJvcGVydHlTdGF0dXNbXSA9IFtdXG5cbi8vICAgICAgICAgdmFsdWVzKHByb3BzKS5mb3JFYWNoKHByb3AgPT4ge1xuXG5cbi8vICAgICAgICAgICBjb25zdCBwcm9wUHJvZmlsZVJlbCA9IHByb3AucHJvZmlsZXMgYXMgUHJvZmlsZXNcblxuLy8gICAgICAgICAgIGxldCBlbmFibGVkSW5BUHJvZmlsZSA9IGZhbHNlO1xuXG4vLyAgICAgICAgICAgbGV0IHJlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSB0cnVlO1xuXG4vLyAgICAgICAgICAgcHJvcFByb2ZpbGVSZWwuZm9yRWFjaChpdGVtID0+IHtcbi8vICAgICAgICAgICAgIGlmIChwcm9maWxlcy5pbmNsdWRlcyhpdGVtLmZrX3Byb2ZpbGUpKSB7XG4vLyAgICAgICAgICAgICAgIGVuYWJsZWRJbkFQcm9maWxlID0gdHJ1ZTtcbi8vICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmVtb3ZlZF9mcm9tX2FwaSA9PT0gZmFsc2UpIHtcbi8vICAgICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gZmFsc2Vcbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0pXG5cbi8vICAgICAgICAgICBpZiAoZW5hYmxlZEluQVByb2ZpbGUpIHtcbi8vICAgICAgICAgICAgIHAucHVzaCh7XG4vLyAgICAgICAgICAgICAgIC4uLnByb3AsXG4vLyAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9KVxuXG4vLyAgICAgICAgIHJldHVybiBwXG4vLyAgICAgICB9KVxuLy8gICAgIClcblxuLy8gfVxuXG5cbi8vIC8qKlxuLy8gICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIENsYXNzZXNcbi8vICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3Rcbi8vICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgZW5hYmxlZCBieSBjbGFzc19wcm9qX3JlbFxuLy8gICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyByZXF1aXJlZCBieSBzb3VyY2VzIG9yIGJ5IGJhc2ljc1xuLy8gICpcbi8vICAqIHRoaXMgaXMgdXNlZnVsbCB0byBjaGVjayBpZiBhIGNsYXNzIGlzIGF2YWlsYWJsZSBhdCBhbGxcbi8vICAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNJbkVudGl0ZXNPclJlcXVpcmVkKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuLy8gICByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgICB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbi8vICAgICB0aGlzLnBpcGVDbGFzc2VzUmVxdWlyZWQoKVxuLy8gICApLnBpcGUoXG4vLyAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4vLyAgICAgc3RhcnRXaXRoKHt9KVxuLy8gICApXG4vLyB9XG4iXX0=