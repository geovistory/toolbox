/**
 * @fileoverview added by tsickle
 * Generated from: lib/queries/services/configuration-pipes.service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvc2VydmljZXMvY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFckgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBS3hELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7O0FBTXBFLHVDQUdDOzs7SUFEQyxtREFBK0I7O0FBVWpDO0lBY0UsbUNBQ1UsQ0FBNEIsRUFDNUIsQ0FBeUI7UUFEekIsTUFBQyxHQUFELENBQUMsQ0FBMkI7UUFDNUIsTUFBQyxHQUFELENBQUMsQ0FBd0I7SUFDL0IsQ0FBQztJ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QUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9HO1FBQ0QsMkJBQTJCO2FBQ3RCLElBQUksYUFBYSxDQUFDLGtCQUFrQjtZQUN2QyxhQUFhLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNoRSxRQUFRLEdBQUcsYUFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0U7S0FDRjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaENvbmZpZywgUHJvQ29uZmlnLCBTeXNDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBkZmhMYWJlbEJ5RmtzS2V5LCBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSwgdGV4dFByb3BlcnR5QnlGa3NLZXkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IENsYXNzQ29uZmlnLCBEZmhDbGFzcywgRGZoTGFiZWwsIERmaFByb3BlcnR5LCBHdkxvYWRTdWJlbnRpdHlTdWJmaWVsZFBhZ2VSZXEsIEd2U3ViZmllbGRUeXBlLCBJbmZMYW5ndWFnZSwgUHJvQ2xhc3NGaWVsZENvbmZpZywgUHJvVGV4dFByb3BlcnR5LCBSZWxhdGVkUHJvZmlsZSwgU3lzQ29uZmlnRmllbGREaXNwbGF5LCBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBTeXNDb25maWdWYWx1ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0T3JFbXB0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgZmxhdHRlbiwgaW5kZXhCeSwgdW5pcSwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc2hhcmVSZXBsYXksIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWNoZSB9IGZyb20gJy4uL2RlY29yYXRvcnMvbWV0aG9kLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvRmllbGQnO1xuaW1wb3J0IHsgRmllbGRQbGFjZU9mRGlzcGxheSB9IGZyb20gJy4uL21vZGVscy9GaWVsZFBvc2l0aW9uJztcbmltcG9ydCB7IFNwZWNpYWxGaWVsZFR5cGUgfSBmcm9tICcuLi9tb2RlbHMvU3BlY2lhbEZpZWxkVHlwZSc7XG5pbXBvcnQgeyBTdWJmaWVsZCB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZCc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuLy8gdGhpcyBpcyB0aGVcbmV4cG9ydCB0eXBlIFRhYmxlTmFtZSA9ICdhcHBlbGxhdGlvbicgfCAnbGFuZ3VhZ2UnIHwgJ3BsYWNlJyB8ICd0aW1lX3ByaW1pdGl2ZScgfCAnbGFuZ19zdHJpbmcnIHwgJ2RpbWVuc2lvbicgfCAncGVyc2lzdGVudF9pdGVtJyB8ICd0ZW1wb3JhbF9lbnRpdHknXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGZoUHJvcGVydHlTdGF0dXMgZXh0ZW5kcyBEZmhQcm9wZXJ0eSB7XG4gIC8vIHRydWUsIGlmIHJlbW92ZWQgZnJvbSBhbGwgcHJvZmlsZXMgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFxuICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBib29sZWFuXG59XG5cbnR5cGUgTGFiZWxPcmlnaW4gPSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJyB8ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCdcbnR5cGUgUHJvZmlsZXMgPSB7XG4gIGZrX3Byb2ZpbGU6IG51bWJlcjtcbiAgcmVtb3ZlZF9mcm9tX2FwaTogYm9vbGVhbjtcbn1bXTtcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuLyoqXG4gKiBUaGlzIFNlcnZpY2UgcHJvdmlkZXMgYSBjb2xsZWN0aW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBjb25maWd1cmF0aW9uIGRhdGEuXG4gKiBXaGVuIHRhbGtpbmcgYWJvdXQgY29uZmlndXJhdGlvbiwgd2UgbWVhbiB0aGUgY29uY2VwdHVhbCByZWZlcmVuY2UgbW9kZWwgYW5kIHRoZSBhZGRpdGlvbmFsXG4gKiBjb25maWd1cmF0aW9ucyBvbiBzeXN0ZW0gYW5kIHByb2plY3QgbGV2ZWwuXG4gKiBGb3IgRXhhbXBsZVxuICogLSB0aGUgZmllbGRzIG9mIGEgY2xhc3NcbiAqIC0gdGhlIGxhYmVscyBvZiBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGE6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICApIHsgfVxuXG5cbiAgLyoqXG4gICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19wcm9maWxlXG4gICogb2YgYWxsIHByb2ZpbGVzIHRoYXQgYXJlIGVuYWJsZWQgYnkgdGhlIGdpdmVuIHByb2plY3QuXG4gICogVGhlIGFycmF5IHdpbGwgYWx3YXlzIGluY2x1ZGUgUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgLy8gQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHB1YmxpYyBwaXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX3Byb2ZpbGVfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWQkXG4gICAgICAgIC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJykucGlwZShcbiAgICAgICAgICBtYXAocHJvamVjdFByb2ZpbGVSZWxzID0+IHZhbHVlcyhwcm9qZWN0UHJvZmlsZVJlbHMpXG4gICAgICAgICAgICAuZmlsdGVyKHJlbCA9PiByZWwuZW5hYmxlZClcbiAgICAgICAgICAgIC5tYXAocmVsID0+IHJlbC5ma19wcm9maWxlKVxuICAgICAgICAgICksXG4gICAgICAgICAgbWFwKGVuYWJsZWQgPT4gWy4uLmVuYWJsZWQsIERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNdKSxcbiAgICAgICAgKSksXG4gICAgICBzaGFyZVJlcGxheSgpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgYWxsIGZpZWxkcyBvZiBnaXZlbiBjbGFzc1xuICAgKiBUaGUgRmllbGRzIGFyZSBub3Qgb3JkZXJlZCBhbmQgbm90IGZpbHRlcmVkXG4gICAqIElmIHlvdSB3YW50IHNwZWNpZmljIHN1YnNldHMgb2YgRmllbGRzIGFuZC9vciBvcmRlcmVkIEZpZWxkcywgdXNlIHRoZSBwaXBlc1xuICAgKiB0aGF0IGJ1aWxkIG9uIHRoaXMgcGlwZS5cbiAgICovXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUZpZWxkcyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgLy8gcGlwZSBzb3VyY2UgY2xhc3NcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLFxuICAgICAgLy8gcGlwZSBvdXRnb2luZyBwcm9wZXJ0aWVzXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX2RvbWFpbiQua2V5KHBrQ2xhc3MpLnBpcGUobWFwKGluZGV4ZWQgPT4gdmFsdWVzKGluZGV4ZWQpKSksXG4gICAgICAvLyBwaXBlIGluZ29pbmcgcHJvcGVydGllc1xuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19yYW5nZSQua2V5KHBrQ2xhc3MpLnBpcGUobWFwKGluZGV4ZWQgPT4gdmFsdWVzKGluZGV4ZWQpKSksXG4gICAgICAvLyBwaXBlIHN5cyBjb25maWdcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgIC8vIHBpcGUgZW5hYmxlZCBwcm9maWxlc1xuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCksXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbc291cmNlS2xhc3MsIG91dGdvaW5nUHJvcHMsIGluZ29pbmdQcm9wcywgc3lzQ29uZmlnLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG5cbiAgICAgICAgaWYgKHBrQ2xhc3MgPT09IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4pIHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGhhcyB0aW1lIHNwYW4gcHJvcGVydHlcbiAgICAgICAgICBpbmdvaW5nUHJvcHMgPSBbXVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgY2xhc3MgaXMgbm90IGFwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSwgYWRkIGFwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSAoMTExMSkgcHJvcGVydHlcbiAgICAgICAgICBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuICAgICAgICAgICAgaW5nb2luZ1Byb3BzLnB1c2goY3JlYXRlQXBwZWxsYXRpb25Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gaWYgaXMgdGVtcG9yYWwgZW50aXR5LCBhZGQgaGFzIHRpbWUgc3BhbiBwcm9wZXJ0eVxuICAgICAgICAgIGlmIChzb3VyY2VLbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4gICAgICAgICAgICBvdXRnb2luZ1Byb3BzLnB1c2goY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvdXRnb2luZ1Byb3BzLnB1c2goY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KHBrQ2xhc3MpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRnb2luZ1Byb3BzLCB0cnVlLCBlbmFibGVkUHJvZmlsZXMsIHN5c0NvbmZpZyksXG4gICAgICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKGluZ29pbmdQcm9wcywgZmFsc2UsIGVuYWJsZWRQcm9maWxlcywgc3lzQ29uZmlnKSxcbiAgICAgICAgICB0aGlzLnBpcGVGaWVsZENvbmZpZ3MocGtDbGFzcylcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcCgoW3N1YmZpZWxkczEsIHN1YmZpZWxkczIsIGZpZWxkQ29uZmlnc10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1YmZpZWxkcyA9IFsuLi5zdWJmaWVsZHMxLCAuLi5zdWJmaWVsZHMyXVxuXG4gICAgICAgICAgICBjb25zdCBmaWVsZENvbmZpZ0lkeCA9IGluZGV4QnkoKHgpID0+IFtcbiAgICAgICAgICAgICAgKHguZmtfZG9tYWluX2NsYXNzIHx8IHguZmtfcmFuZ2VfY2xhc3MpLFxuICAgICAgICAgICAgICB4LmZrX3Byb3BlcnR5LFxuICAgICAgICAgICAgICAhIXguZmtfZG9tYWluX2NsYXNzXG4gICAgICAgICAgICBdLmpvaW4oJ18nKSwgZmllbGRDb25maWdzKVxuXG4gICAgICAgICAgICBjb25zdCB1bmlxRmllbGRzOiB7IFt1aWQ6IHN0cmluZ106IEZpZWxkIH0gPSB7fVxuICAgICAgICAgICAgY29uc3QgdW5pcVN1YmZpZWxkQ2FjaGU6IHsgW3VpZDogc3RyaW5nXTogdHJ1ZSB9ID0ge31cblxuXG4gICAgICAgICAgICAvLyBncm91cCBieSBzb3VyY2UsIHBrUHJvcGVydHkgYW5kIGlzT3V0Z29pbmdcbiAgICAgICAgICAgIGZvciAoY29uc3QgcyBvZiBzdWJmaWVsZHMpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRJZCA9IFtzLnNvdXJjZUNsYXNzLCBzLnByb3BlcnR5LnBrUHJvcGVydHksIHMuaXNPdXRnb2luZ10uam9pbignXycpXG4gICAgICAgICAgICAgIGNvbnN0IHN1YmZpZWxkSWQgPSBbcy5zb3VyY2VDbGFzcywgcy5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBzLmlzT3V0Z29pbmcsIHMudGFyZ2V0Q2xhc3NdLmpvaW4oJ18nKVxuICAgICAgICAgICAgICBjb25zdCBmaWVsZENvbmZpZzogUHJvQ2xhc3NGaWVsZENvbmZpZyB8IHVuZGVmaW5lZCA9IGZpZWxkQ29uZmlnSWR4W2ZpZWxkSWRdO1xuICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgdGltZSB0aGUgZ3JvdXAgaXMgZXN0YWJsaXNoZWRcbiAgICAgICAgICAgICAgaWYgKCF1bmlxRmllbGRzW2ZpZWxkSWRdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzU3BlY2lhbEZpZWxkOiBTcGVjaWFsRmllbGRUeXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIYXNUeXBlRmllbGQpIGlzU3BlY2lhbEZpZWxkID0gJ2hhcy10eXBlJztcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnByb3BlcnR5LnBrUHJvcGVydHkgPT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOKSBpc1NwZWNpYWxGaWVsZCA9ICd0aW1lLXNwYW4nO1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0gPSB7XG4gICAgICAgICAgICAgICAgICBzb3VyY2VDbGFzczogcy5zb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUNsYXNzTGFiZWw6IHMuc291cmNlQ2xhc3NMYWJlbCxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZU1heFF1YW50aXR5OiBzLnNvdXJjZU1heFF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgc291cmNlTWluUXVhbnRpdHk6IHMuc291cmNlTWluUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNaW5RdWFudGl0eTogcy50YXJnZXRNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiBzLnRhcmdldE1heFF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IHMubGFiZWwsXG4gICAgICAgICAgICAgICAgICBpc0hhc1R5cGVGaWVsZDogcy5pc0hhc1R5cGVGaWVsZCxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBzLnByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogcy5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogcy5pZGVudGl0eURlZmluaW5nRm9yU291cmNlLFxuICAgICAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogcy5pZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgb250b0luZm9MYWJlbDogcy5vbnRvSW5mb0xhYmVsLFxuICAgICAgICAgICAgICAgICAgb250b0luZm9Vcmw6IHMub250b0luZm9VcmwsXG4gICAgICAgICAgICAgICAgICBhbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXMsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzOiBbcy50YXJnZXRDbGFzc10sXG4gICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbnM6IFtzXSxcbiAgICAgICAgICAgICAgICAgIGZpZWxkQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgcGxhY2VPZkRpc3BsYXk6IGdldFBsYWNlT2ZEaXNwbGF5KHN5c0NvbmZpZy5zcGVjaWFsRmllbGRzLCBzLCBmaWVsZENvbmZpZyksXG4gICAgICAgICAgICAgICAgICBpc1NwZWNpYWxGaWVsZFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG1hcmsgc3ViZmllbGQgYXMgYWRkZWRcbiAgICAgICAgICAgICAgICB1bmlxU3ViZmllbGRDYWNoZVtzdWJmaWVsZElkXSA9IHRydWU7XG5cblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGlnbm9yZSBkdXBsaWNhdGlvbnMgb2Ygc3ViZmllbGRzXG4gICAgICAgICAgICAgIGVsc2UgaWYgKCF1bmlxU3ViZmllbGRDYWNoZVtzdWJmaWVsZElkXSkge1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9PT0gZmFsc2UgP1xuICAgICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gZmFsc2UgOlxuICAgICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzO1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0udGFyZ2V0Q2xhc3Nlcy5wdXNoKHMudGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5saXN0RGVmaW5pdGlvbnMucHVzaChzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXModW5pcUZpZWxkcylcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogcGlwZSBhbGwgdGhlIHNwZWNpZmljIGZpZWxkcyBvZiBhIGNsYXNzLFxuICAgKiBvcmRlcmVkIGJ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoZmllbGRzID0+IGZpZWxkc1xuICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzKVxuICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uIC0gYi5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbilcbiAgICAgIClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICAqIHBpcGUgYWxsIHRoZSBiYXNpYyBmaWVsZHMgb2YgYSBjbGFzcyxcbiAgICAqIG9yZGVyZWQgYnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIGJhc2ljIGZpZWxkc1xuICAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcykucGlwZShcbiAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzXG4gICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gYmFzaWMgZmllbGRzXG4gICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMpXG4gICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBiYXNpYyBmaWVsZHNcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMucG9zaXRpb24gLSBiLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzLnBvc2l0aW9uKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG5cblxuXG4gIC8qKlxuICAgICAqIFBpcGVzIHRoZSBmaWVsZHMgZm9yIHRlbXBvcmFsIGVudGl0eSBmb3Jtc1xuICAgICAqIC0gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAqIC0gdGhlIHdoZW4gZmllbGRcbiAgICAgKiAtIGlmIGF2YWlsYWJsZTogdGhlIHR5cGUgZmllbGRcbiAgICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHNGb3JUZUVuRm9ybShwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MpLnBpcGUoXG4gICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgbWFwKGFsbEZpZWxkcyA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IGFsbEZpZWxkc1xuICAgICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcylcbiAgICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24gLSBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uKVxuXG4gICAgICAgIGNvbnN0IHdoZW5GaWVsZCA9IGFsbEZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHkgPT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOKVxuICAgICAgICBpZiAod2hlbkZpZWxkKSBmaWVsZHMucHVzaCh3aGVuRmllbGQpXG5cbiAgICAgICAgY29uc3QgdHlwZUZpZWxkID0gYWxsRmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaXNIYXNUeXBlRmllbGQpXG4gICAgICAgIGlmICh0eXBlRmllbGQpIGZpZWxkcy5wdXNoKHR5cGVGaWVsZClcblxuICAgICAgICByZXR1cm4gZmllbGRzO1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cblxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3MgaW4gdGhpcyBvcmRlcjpcbiAgICogLSBiYXNpYyBmaWVsZHNcbiAgICogLSBzcGVjaWZpYyBmaWVsZHNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MpLFxuICAgICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzcylcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbYSwgYl0pID0+IFsuLi5hLCAuLi5iXSlcbiAgICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGVzIHRoZSBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3MgaW4gdGhpcyBvcmRlcjpcbiAgKiAtIHNwZWNpZmljIGZpZWxkc1xuICAqIC0gYmFzaWMgZmllbGRzXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzcyksXG4gICAgICB0aGlzLnBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzcyksXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFxuICAgIHByb3BlcnRpZXM6IERmaFByb3BlcnR5W10sXG4gICAgaXNPdXRnb2luZzogYm9vbGVhbixcbiAgICBlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdLFxuICAgIHN5c0NvbmZpZzogU3lzQ29uZmlnVmFsdWVcbiAgKTogT2JzZXJ2YWJsZTxTdWJmaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgcHJvcGVydGllcy5tYXAocCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVTdWJmaWVsZChpc091dGdvaW5nLCBwLCBzeXNDb25maWcsIGVuYWJsZWRQcm9maWxlcyk7XG4gICAgICB9KVxuICAgIClcblxuICB9XG5cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZVN1YmZpZWxkSWRUb1N1YmZpZWxkKHNvdXJjZUNsYXNzOiBudW1iZXIsIHByb3BlcnR5OiBudW1iZXIsIHRhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPFN1YmZpZWxkPiB7XG4gICAgY29uc3QgZG9tYWluID0gaXNPdXRnb2luZyA/IHNvdXJjZUNsYXNzIDogdGFyZ2V0Q2xhc3M7XG4gICAgY29uc3QgcmFuZ2UgPSBpc091dGdvaW5nID8gdGFyZ2V0Q2xhc3MgOiBzb3VyY2VDbGFzcztcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5wa19wcm9wZXJ0eV9faGFzX2RvbWFpbl9faGFzX3JhbmdlJC5rZXkoW3Byb3BlcnR5LCBkb21haW4sIHJhbmdlXS5qb2luKCdfJykpXG4gICAgICAgIC5waXBlKGZpbHRlcih4ID0+IHtcbiAgICAgICAgICByZXR1cm4gISF4XG4gICAgICAgIH0pKSxcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQucGlwZShmaWx0ZXIoeCA9PiB7XG4gICAgICAgIHJldHVybiAhIXhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpLnBpcGUoZmlsdGVyKHggPT4ge1xuICAgICAgICByZXR1cm4gISF4XG4gICAgICB9KSksXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZGZoUHJvcCwgc3lzQ29uZiwgZW5hYmxlZFByb2ZpbGVzXSkgPT4gdGhpcy5waXBlU3ViZmllbGQoXG4gICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgIGRmaFByb3AsXG4gICAgICAgIHN5c0NvbmYsXG4gICAgICAgIGVuYWJsZWRQcm9maWxlc1xuICAgICAgKSlcbiAgICApXG4gIH1cblxuXG4gIHByaXZhdGUgcGlwZVN1YmZpZWxkKFxuICAgIGlzT3V0Z29pbmc6IGJvb2xlYW4sXG4gICAgcDogRGZoUHJvcGVydHksXG4gICAgc3lzQ29uZmlnOiBTeXNDb25maWdWYWx1ZSxcbiAgICBlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdXG4gICk6IE9ic2VydmFibGU8U3ViZmllbGQ+IHtcbiAgICBjb25zdCBvID0gaXNPdXRnb2luZztcbiAgICBjb25zdCB0YXJnZXRDbGFzcyA9IG8gPyBwLmhhc19yYW5nZSA6IHAuaGFzX2RvbWFpbjtcbiAgICBjb25zdCBzb3VyY2VDbGFzcyA9IG8gPyBwLmhhc19kb21haW4gOiBwLmhhc19yYW5nZTtcbiAgICBjb25zdCB0YXJnZXRNYXhRdWFudGl0eSA9IG8gP1xuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIgOlxuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyO1xuICAgIGNvbnN0IHNvdXJjZU1heFF1YW50aXR5ID0gbyA/XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIgOlxuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI7XG4gICAgY29uc3QgdGFyZ2V0TWluUXVhbnRpdHkgPSBvID9cbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyIDpcbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjtcbiAgICBjb25zdCBzb3VyY2VNaW5RdWFudGl0eSA9IG8gP1xuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyIDpcbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyO1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQ2xhc3NMYWJlbChzb3VyY2VDbGFzcykucGlwZSh0YXAoeCA9PiB7XG4gICAgICAgIHJldHVybiB4XG4gICAgICB9KSksXG4gICAgICB0aGlzLnBpcGVDbGFzc0xhYmVsKHRhcmdldENsYXNzKS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZVN1YmZpZWxkVHlwZU9mQ2xhc3Moc3lzQ29uZmlnLCB0YXJnZXRDbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHksIHAucGtfcHJvcGVydHkpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlRmllbGRMYWJlbChwLnBrX3Byb3BlcnR5LCBpc091dGdvaW5nID8gcC5oYXNfZG9tYWluIDogbnVsbCwgaXNPdXRnb2luZyA/IG51bGwgOiBwLmhhc19yYW5nZSkucGlwZSh0YXAoeCA9PiB7XG4gICAgICAgIHJldHVybiB4XG4gICAgICB9KSksXG4gICAgKVxuICAgICAgLnBpcGUobWFwKChbc291cmNlQ2xhc3NMYWJlbCwgdGFyZ2V0Q2xhc3NMYWJlbCwgbGlzdFR5cGUsIGxhYmVsXVxuICAgICAgKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vZGU6IFN1YmZpZWxkID0ge1xuICAgICAgICAgIGxpc3RUeXBlLFxuICAgICAgICAgIHNvdXJjZUNsYXNzLFxuICAgICAgICAgIHNvdXJjZUNsYXNzTGFiZWwsXG4gICAgICAgICAgc291cmNlTWF4UXVhbnRpdHksXG4gICAgICAgICAgc291cmNlTWluUXVhbnRpdHksXG4gICAgICAgICAgdGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgdGFyZ2V0Q2xhc3NMYWJlbCxcbiAgICAgICAgICB0YXJnZXRNaW5RdWFudGl0eSxcbiAgICAgICAgICB0YXJnZXRNYXhRdWFudGl0eSxcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICBpc0hhc1R5cGVGaWVsZDogbyAmJiBwLmlzX2hhc190eXBlX3N1YnByb3BlcnR5LFxuICAgICAgICAgIHByb3BlcnR5OiB7IHBrUHJvcGVydHk6IHAucGtfcHJvcGVydHkgfSxcbiAgICAgICAgICBpc091dGdvaW5nOiBvLFxuICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IG8gPyBwLmlkZW50aXR5X2RlZmluaW5nIDogZmFsc2UsXG4gICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogbyA/IGZhbHNlIDogcC5pZGVudGl0eV9kZWZpbmluZyxcbiAgICAgICAgICBvbnRvSW5mb0xhYmVsOiBwLmlkZW50aWZpZXJfaW5fbmFtZXNwYWNlLFxuICAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LycgKyBwLnBrX3Byb3BlcnR5LFxuICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGlzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyhlbmFibGVkUHJvZmlsZXMsIChwLnByb2ZpbGVzIHx8IFtdKSksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSB0eXBlIG9mIFN1YmZpZWxkIGZvciBhIGdpdmVuIGNsYXNzXG4gICAqXG4gICAqIEN1cnJlbnRseSAodG8gYmUgcmV2aXNlZCBpZiBnb29kKSBzdWJsY2Fzc2VzIG9mIEU1NSBUeXBlLFxuICAgKiB0aGF0IGFyZSB0aGUgdGFyZ2V0IG9mIGEgZmllbGQgd2l0aCB0YXJnZXRNYXhRYW50aXR5PTEsXG4gICAqIGdldCBTdWJmaWVsZCB0eXBlICdoYXNUeXBlJy5cbiAgICogVGhlcmVmb3JlIHRhcmdldE1heFF1YW50aXR5IGlzIG5lZWRlZC5cbiAgICpcbiAgICogSWYgd2UgYXJlIG5lc3Rpbmcgc3ViZmllbGRzLCB3ZSdsbCBlbmQgdXAgd2l0aCBjaXJjdWxhciBmaWVsZHMuXG4gICAqIEUuZy46IFBlcnNvbiAyMSAtPiBoYXMgYXBwZWxsYXRpb24gMTExMSAtPiBBcHBlVGVFbiAzNjUgLT4gaXMgYXBwZWxsYXRpb24gb2YgMTExMSAtPiBQZXJzb24gMjFcbiAgICogSW4gb3JkZXIgdG8gZGV0ZWN0IHRoZW0sIHdlIGNhbiBhZGRpdGlvbmFsbHkgcGFzcyBpbiB0aGUgcGFyZW50IHByb3BlcnR5LlxuICAgKlxuICAgKiBUaGlzIGJlaGF2aW9yIGhhcyB0byBiZSByZXZpc2VkLCBiZWNhdXNlIGl0IGNhbiBsZWFkIHRvIHByb2JsZW1zXG4gICAqIHdoZW4gdGhlIFN1YmZpZWxkIGJlbG9uZ3MgdG8gYSBGaWVsZCB3aXRoIG11bHRpcGxlIHRhcmdldCBjbGFzc2VzXG4gICAqIChhbmQgdGh1cyBTdWJmaWVsZHMpIGJlY2F1c2UgdGhlIFVJIHRoZW4gZG9lcyBub3QgYWxsb3cgdG8gY2hvb3NlXG4gICAqIHRoZSByaWdodCB0YXJnZXQgY2xhc3MuXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3ViZmllbGRUeXBlT2ZDbGFzcyhjb25maWc6IFN5c0NvbmZpZ1ZhbHVlLCBwa0NsYXNzOiBudW1iZXIsIHRhcmdldE1heFF1YW50aXR5OiBudW1iZXIsIHBhcmVudFByb3BlcnR5PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxHdlN1YmZpZWxkVHlwZT4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKFxuICAgICAgZmlsdGVyKGkgPT4gISFpKSxcbiAgICAgIHN3aXRjaE1hcCgoa2xhc3MpID0+IHRoaXMucGlwZVN1YmZpZWxkVHlwZShjb25maWcsIGtsYXNzLCB0YXJnZXRNYXhRdWFudGl0eSwgcGFyZW50UHJvcGVydHkpKVxuICAgIClcbiAgfVxuXG5cbiAgcGlwZVN1YmZpZWxkVHlwZShjb25maWc6IFN5c0NvbmZpZ1ZhbHVlLCBrbGFzczogRGZoQ2xhc3MsIHRhcmdldE1heFF1YW50aXR5OiBudW1iZXIsIHBhcmVudFByb3BlcnR5PzogbnVtYmVyKTogT2JzZXJ2YWJsZTxHdlN1YmZpZWxkVHlwZT4ge1xuXG4gICAgY29uc3QgcmVzID0gKHg6IEd2U3ViZmllbGRUeXBlKSA9PiBuZXcgQmVoYXZpb3JTdWJqZWN0KHgpXG4gICAgbGV0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZ1xuICAgIGlmIChjb25maWcpIGNsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNba2xhc3MucGtfY2xhc3NdO1xuICAgIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcbiAgICAgIHJldHVybiByZXMoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKVxuICAgIH1cblxuXG4gICAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gMzAgJiYgdGFyZ2V0TWF4UXVhbnRpdHkgPT0gMSkge1xuICAgICAgcmV0dXJuIHJlcyh7IHR5cGVJdGVtOiAndHJ1ZScgfSlcbiAgICB9XG4gICAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOCB8fCBrbGFzcy5iYXNpY190eXBlID09PSAzMCkge1xuICAgICAgcmV0dXJuIHJlcyh7IGVudGl0eVByZXZpZXc6ICd0cnVlJyB9KVxuICAgIH1cbiAgICAvLyBUT0RPIGFkZCB0aGlzIHRvIHN5c0NvbmZpZ1ZhbHVlXG4gICAgZWxzZSBpZiAoa2xhc3MucGtfY2xhc3MgPT09IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4pIHtcbiAgICAgIHJldHVybiByZXMoeyB0aW1lU3BhbjogJ3RydWUnIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gcGlwZSB0aGUgc3ViZmllbGRzIG9mIHRoZSB0ZW1wb3JhbEVudGl0eSBjbGFzc1xuICAgICAgcmV0dXJuIHRoaXMucGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMoa2xhc3MucGtfY2xhc3MpLnBpcGUoXG4gICAgICAgIG1hcChmaWVsZHMgPT4ge1xuICAgICAgICAgIGNvbnN0IHN1YmVudGl0eVN1YmZpZWxkUGFnZTogR3ZMb2FkU3ViZW50aXR5U3ViZmllbGRQYWdlUmVxW10gPSBbXVxuICAgICAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgICAgICAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViZmllbGQgb2YgZmllbGQubGlzdERlZmluaXRpb25zKSB7XG4gICAgICAgICAgICAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAgICAgICAgIGxldCBuZXN0ZWRTdWJmaWVsZFR5cGU6IEd2U3ViZmllbGRUeXBlID0geyBlbnRpdHlQcmV2aWV3OiAndHJ1ZScgfTtcbiAgICAgICAgICAgICAgaWYgKCFzdWJmaWVsZC5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkgbmVzdGVkU3ViZmllbGRUeXBlID0gc3ViZmllbGQubGlzdFR5cGU7XG4gICAgICAgICAgICAgIGxldCBpc0NpcmN1bGFyID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBwYXJlbnRQcm9wZXJ0eSAmJlxuICAgICAgICAgICAgICAgIHN1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHkgPT0gcGFyZW50UHJvcGVydHkgJiZcbiAgICAgICAgICAgICAgICBzdWJmaWVsZC50YXJnZXRNYXhRdWFudGl0eSA9PT0gMVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpc0NpcmN1bGFyID0gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IG5lc3RlZFBhZ2U6IEd2TG9hZFN1YmVudGl0eVN1YmZpZWxkUGFnZVJlcSA9IHtcbiAgICAgICAgICAgICAgICBzdWJmaWVsZFR5cGU6IG5lc3RlZFN1YmZpZWxkVHlwZSxcbiAgICAgICAgICAgICAgICBwYWdlOiB7XG4gICAgICAgICAgICAgICAgICBma1Byb3BlcnR5OiBzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogc3ViZmllbGQuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHN1YmZpZWxkLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgICAgaXNDaXJjdWxhclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdWJlbnRpdHlTdWJmaWVsZFBhZ2UucHVzaChuZXN0ZWRQYWdlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyB0ZW1wb3JhbEVudGl0eTogc3ViZW50aXR5U3ViZmllbGRQYWdlIH1cbiAgICAgICAgfSksXG5cbiAgICAgIClcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXRzIGNsYXNzIGZpZWxkIGNvbmZpZ3Mgb2YgZ2l2ZW4gcGtDbGFzc1xuICAgKlxuICAgKiAtIG9mIGFjdGl2ZSBwcm9qZWN0LCBpZiBhbnksIGVsc2VcbiAgICogLSBvZiBkZWZhdWx0IGNvbmZpZyBwcm9qZWN0LCBlbHNlXG4gICAqIC0gZW1wdHkgYXJyYXlcbiAgICpcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZENvbmZpZ3MocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxQcm9DbGFzc0ZpZWxkQ29uZmlnW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZmtQcm9qZWN0KSA9PiB7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdGtleSA9IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5KHtcbiAgICAgICAgICBma19jbGFzc19mb3JfY2xhc3NfZmllbGQ6IHBrQ2xhc3MsXG4gICAgICAgICAgZmtfcHJvamVjdDogZmtQcm9qZWN0XG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0a2V5ID0gcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXkoe1xuICAgICAgICAgIGZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZDogcGtDbGFzcyxcbiAgICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNUXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucy5wcm8kLmNsYXNzX2ZpZWxkX2NvbmZpZyQuYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkLmtleShhY3RpdmVQcm9qZWN0a2V5KSxcbiAgICAgICAgICB0aGlzLnMucHJvJC5jbGFzc19maWVsZF9jb25maWckLmJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJC5rZXkoZGVmYXVsdFByb2plY3RrZXkpXG4gICAgICAgIClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCgoW2FjdGl2ZVByb2plY3RGaWVsZHMsIGRlZmF1bHRQcm9qZWN0RmllbGRzXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWN0aXZlUHJvamVjdEZpZWxkcyAmJiB2YWx1ZXMoYWN0aXZlUHJvamVjdEZpZWxkcykubGVuZ3RoKSByZXR1cm4gYWN0aXZlUHJvamVjdEZpZWxkcztcblxuICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFByb2plY3RGaWVsZHNcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChpdGVtcykgPT4gdmFsdWVzKGl0ZW1zKS5zb3J0KChhLCBiKSA9PiAoYS5vcmRfbnVtID4gYi5vcmRfbnVtID8gMSA6IC0xKSkpLFxuICAgICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBjbGFzcyBsYWJlbCBmb3IgYWN0aXZlIHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc0xhYmVsKHBrQ2xhc3M/OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKHsgcGtDbGFzcywgZmtQcm9qZWN0LCBsYW5ndWFnZSwgdHlwZTogJ2xhYmVsJyB9KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBpID0gaXRlbXMuZmluZChpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICAgIHJldHVybiBpID8gaS50ZXh0IDogYCogbm8gbGFiZWwgKGlkOiAke3BrQ2xhc3N9KSAqYFxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogRGVsaXZlcnMgYXJyYXkgb2Ygb2JqZWN0cyB3aXRoXG4gICAqIHRleHQgfiB0aGUgdGV4dCBvZiB0aGUgcHJvcGVydHlcbiAgICogb3JpZ2luLCBpbiB0aGlzIG9yZGVyOlxuICAgKiAtIG9yaWdpbiA9PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnICAgICAgICAgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCcgICAgICAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgICAgICAgICAgKGZyb20gZGF0YV9mb3JfaGlzdG9yeS5sYWJlbClcbiAgICogLSBvcmlnaW4gPT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJyAgICAgICAgICAgICAgIChmcm9tIGRhdGFfZm9yX2hpc3RvcnkubGFiZWwpXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlTGFiZWxzKGQ6IHtcbiAgICBma1Byb2plY3Q6IG51bWJlcixcbiAgICB0eXBlOiAnbGFiZWwnIHwgJ2RlZmluaXRpb24nIHwgJ3Njb3BlTm90ZScsXG4gICAgbGFuZ3VhZ2U6IEluZkxhbmd1YWdlLFxuICAgIHBrQ2xhc3M/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eT86IG51bWJlcixcbiAgICBma1Byb3BlcnR5RG9tYWluPzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHlSYW5nZT86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8e1xuICAgIG9yaWdpbjogTGFiZWxPcmlnaW5cbiAgICB0ZXh0OiBzdHJpbmdcbiAgfVtdPiB7XG4gICAgbGV0IGZrX3N5c3RlbV90eXBlOiBudW1iZXI7XG5cbiAgICBpZiAoZC5wa0NsYXNzKSB7XG4gICAgICBzd2l0Y2ggKGQudHlwZSkge1xuICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgZmtfc3lzdGVtX3R5cGUgPSBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdma19zeXN0ZW1fdHlwZSBub3QgZm91bmQnKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkLmZrUHJvcGVydHkpIHtcbiAgICAgIHN3aXRjaCAoZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xhYmVsJzpcbiAgICAgICAgICBma19zeXN0ZW1fdHlwZSA9IFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUxcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZrX3N5c3RlbV90eXBlIG5vdCBmb3VuZCcpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIGxhYmVsIG9mIHByb2plY3QgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBkLmZrUHJvamVjdCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UucGtfZW50aXR5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiBkLmxhbmd1YWdlLnBrX2VudGl0eSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiAxODg4OSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgZnJvbSBvbnRvbWUgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVEZmhMYWJlbCh7XG4gICAgICAgIGxhbmd1YWdlOiBkLmxhbmd1YWdlLmlzbzYzOTEudHJpbSgpLFxuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBma19jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19wcm9wZXJ0eTogZC5ma1Byb3BlcnR5XG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIGZyb20gb250b21lIGluIGVuZ2xpc2hcbiAgICAgIHRoaXMucGlwZURmaExhYmVsKHtcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgIGZrX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX3Byb3BlcnR5OiBkLmZrUHJvcGVydHlcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIFByb1RleHRQcm9wZXJ0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb1RleHRQcm9wZXJ0eShkOiB7XG4gICAgZmtfcHJvamVjdDogbnVtYmVyLFxuICAgIGZrX3N5c3RlbV90eXBlOiBudW1iZXIsXG4gICAgZmtfbGFuZ3VhZ2U6IG51bWJlcixcbiAgICBma19kZmhfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW4/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlPzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxQcm9UZXh0UHJvcGVydHk+IHtcbiAgICBjb25zdCBrZXkgPSB0ZXh0UHJvcGVydHlCeUZrc0tleShkKVxuICAgIHJldHVybiB0aGlzLnMucHJvJC50ZXh0X3Byb3BlcnR5JC5ieV9ma3MkLmtleShrZXkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgRGZoTGFiZWxcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVEZmhMYWJlbChkOiB7XG4gICAgdHlwZTogJ2xhYmVsJyB8ICdkZWZpbml0aW9uJyB8ICdzY29wZU5vdGUnLFxuICAgIGxhbmd1YWdlOiBzdHJpbmcsXG4gICAgZmtfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfcHJvZmlsZT86IG51bWJlcixcbiAgICBma19wcm9wZXJ0eT86IG51bWJlcixcbiAgICBma19wcm9qZWN0PzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxEZmhMYWJlbD4ge1xuICAgIGNvbnN0IGtleSA9IGRmaExhYmVsQnlGa3NLZXkoZClcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQubGFiZWwkLmJ5X2ZrcyQua2V5KGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBiZXN0IGZpdHRpbmcgZmllbGQgbGFiZWwgZm9yIGFjdGl2ZSBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZExhYmVsKGZrUHJvcGVydHk6IG51bWJlciwgZmtQcm9wZXJ0eURvbWFpbjogbnVtYmVyLCBma1Byb3BlcnR5UmFuZ2U6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgaXNPdXRnb2luZyA9ICEhZmtQcm9wZXJ0eURvbWFpbjtcbiAgICAvLyBjb25zdCBzeXN0ZW1fdHlwZSA9IGlzT3V0Z29pbmcgPyAoc2luZ3VsYXIgPyAxODAgOiAxODEpIDogKHNpbmd1bGFyID8gMTgyIDogMTgzKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKFxuICAgICAgICB7XG4gICAgICAgICAgZmtQcm9qZWN0LFxuICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgZmtQcm9wZXJ0eSxcbiAgICAgICAgICBma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgIGZrUHJvcGVydHlSYW5nZVxuICAgICAgICB9XG4gICAgICApXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSBgKiBubyBsYWJlbCAoaWQ6ICR7ZmtQcm9wZXJ0eX0pICpgO1xuICAgICAgICAgICAgaXRlbXMuc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaXRlbSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpdGVtLnRleHRcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIGl0ZW0gJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpc091dGdvaW5nID8gaXRlbS50ZXh0IDogJyogcmV2ZXJzZSBvZjogJyArIGl0ZW0udGV4dCArICcqJ1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gbGFiZWxcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogbWFwcyB0aGUgY2xhc3MgdG8gdGhlIGNvcnJlc3BvbmRpbmcgbW9kZWwgKGRhdGFiYXNlIHRhYmxlKVxuICAgKiB0aGlzIGlzIHVzZWQgYnkgRm9ybXMgdG8gY3JlYXRlIG5ldyBkYXRhIGluIHRoZSBzaGFwZSBvZlxuICAgKiB0aGUgZGF0YSBtb2RlbFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRhYmxlTmFtZU9mQ2xhc3ModGFyZ2V0Q2xhc3NQazogbnVtYmVyKTogT2JzZXJ2YWJsZTxUYWJsZU5hbWU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQsXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleSh0YXJnZXRDbGFzc1BrKVxuICAgICkucGlwZShcbiAgICAgIGZpbHRlcihpID0+ICFpLmluY2x1ZGVzKHVuZGVmaW5lZCkpLFxuICAgICAgbWFwKChbY29uZmlnLCBrbGFzc10pID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3NDb25maWc6IENsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNbdGFyZ2V0Q2xhc3NQa107XG4gICAgICAgIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcblxuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpXG4gICAgICAgICAgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuXG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1swXTtcbiAgICAgICAgICBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gJ2FwcGVsbGF0aW9uJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUubGFuZ3VhZ2UpIHJldHVybiAnbGFuZ3VhZ2UnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5wbGFjZSkgcmV0dXJuICdwbGFjZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLnRpbWVQcmltaXRpdmUpIHJldHVybiAndGltZV9wcmltaXRpdmUnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gJ2xhbmdfc3RyaW5nJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gJ2RpbWVuc2lvbic7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3QgdHlwZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDggfHwga2xhc3MuYmFzaWNfdHlwZSA9PT0gMzApIHtcbiAgICAgICAgICByZXR1cm4gJ3BlcnNpc3RlbnRfaXRlbSdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJ3RlbXBvcmFsX2VudGl0eSdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuICAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0OlxuICAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIGVuYWJsZWQgYnkgY2xhc3NfcHJval9yZWxcbiAgICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZnVsbCB0byBjcmVhdGUgc2VsZWN0IGRyb3Bkb3ducyBvZiBjbGFzc2VzIHVzZXJzIHdpbGwga25vd1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNJbkVudGl0aWVzT3JTb3VyY2VzKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuICAgICAgc3RhcnRXaXRoKHt9KVxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJylcbiAgICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICAqIG9mIHRodGUgZ2l2ZW4gcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNFbmFibGVkQnlQcm9qZWN0UHJvZmlsZXMoKTogT2JzZXJ2YWJsZTxEZmhDbGFzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQuYWxsJCxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IGtsYXNzLnByb2ZpbGVzLnNvbWUocHJvZmlsZSA9PiBwcm9maWxlc01hcFtwcm9maWxlLmZrX3Byb2ZpbGVdKSlcbiAgICAgIH0pXG4gICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICogb2YgYWxsIHR5cGUgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICogb2YgdGh0ZSBnaXZlbiBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQ2xhc3Nlc0VuYWJsZWRCeVByb2plY3RQcm9maWxlcygpOiBPYnNlcnZhYmxlPERmaENsYXNzW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfYmFzaWNfdHlwZSQua2V5KDMwKSxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrbGFzcy5wcm9maWxlcy5zb21lKHByb2ZpbGUgPT4gcHJvZmlsZXNNYXBbcHJvZmlsZS5ma19wcm9maWxlXSkgJiZcbiAgICAgICAgICAgICAgLy8gRXhjbHVkZSBNYW5pZmVzdGF0aW9uIHByb2R1Y3QgdHlwZSBhbmQgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgIVtcbiAgICAgICAgICAgICAgICBEZmhDb25maWcuQ0xBU1NfUEtfTEFOR1VBR0UsXG4gICAgICAgICAgICAgICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFXG4gICAgICAgICAgICAgIF0uaW5jbHVkZXMoa2xhc3MucGtfY2xhc3MpXG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlcmUgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGFjdGl2ZSBwcm9qZWN0ICh1c2luZyBjbGFzc19wcm9qX3JlbClcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfY2xhc3NfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkLmtleShwa1Byb2plY3QgKyAnX3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVscykgPT4gdmFsdWVzKHJlbHMpLm1hcChyZWwgPT4gcmVsLmZrX2NsYXNzKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIFRlRW4gQ2xhc3Nlc1xuICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNlbGVjdGVkVGVFbkNsYXNzZXNJblByb2plY3QoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbiAgICAgIHN0YXJ0V2l0aCh7fSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyBlbmFibGVkIGluIGVudGl0aWVzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9jbGFzc19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChjcykgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB2YWx1ZXMoY3MpLm1hcChjID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KGMuZmtfY2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChkZmhDbGFzc2VzID0+IHRoaXMuZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzKSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgYXJyYXkgb2YgRGZoQ2xhc3MgZm9yIFRlRW4gQ2xhc3NlcyBhbmQgcmV0dXJucyBhcnJheSBvZiBwa19jbGFzc1xuICAgKiBAcGFyYW0gZGZoQ2xhc3NlcyBhcnJheSBvZiBEZmhDbGFzc1xuICAgKiBAcmV0dXJucyByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzIHdoZXJlIGNsYXNzIGlzIFRlRW4gY2xhc3NcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzOiBEZmhDbGFzc1tdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHBrczogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRmaENsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSBkZmhDbGFzc2VzW2ldO1xuICAgICAgaWYgKGMuYmFzaWNfdHlwZSA9PT0gOSkgcGtzLnB1c2goYy5wa19jbGFzcyk7XG4gICAgfVxuICAgIHJldHVybiBwa3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoY3MpID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdmFsdWVzKGNzKS5tYXAoYyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShjLmZrX2NsYXNzKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoZGZoQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXMpXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgfVxuXG5cblxuXG5cblxuICAvKipcbiAgICpcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzKGVuYWJsZWRJbj86ICdlbnRpdGllcycgfCAnc291cmNlcycpOiBPYnNlcnZhYmxlPHsgdHlwZWRDbGFzczogbnVtYmVyLCB0eXBlQ2xhc3M6IG51bWJlciB9W10+IHtcblxuICAgIGxldCBwa3MkOiBPYnNlcnZhYmxlPG51bWJlcltdPltdO1xuXG4gICAgY29uc3QgZnJvbVNvdXJjZXMkID0gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKGNsYXNzZXMgPT4gdmFsdWVzKGNsYXNzZXMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSxcbiAgICApXG5cbiAgICBjb25zdCBmcm9tRW50aXRpZXMkID0gdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKClcblxuICAgIGlmIChlbmFibGVkSW4gPT09ICdzb3VyY2VzJykge1xuICAgICAgcGtzJCA9IFtmcm9tU291cmNlcyRdO1xuICAgIH0gZWxzZSBpZiAoZW5hYmxlZEluID09PSAnZW50aXRpZXMnKSB7XG4gICAgICBwa3MkID0gW2Zyb21FbnRpdGllcyRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwa3MkID0gW2Zyb21Tb3VyY2VzJCwgZnJvbUVudGl0aWVzJF1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChwa3MkKS5waXBlKFxuICAgICAgbWFwKGFycmF5T2ZQa0FycmF5cyA9PiB1bmlxKGZsYXR0ZW48bnVtYmVyPihhcnJheU9mUGtBcnJheXMpKSksXG4gICAgICBzd2l0Y2hNYXAocGtzID0+IHRoaXMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3Nlcyhwa3MpKVxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMocGtUeXBlZENsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTx7IHR5cGVkQ2xhc3M6IG51bWJlciwgdHlwZUNsYXNzOiBudW1iZXIgfVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfZG9tYWluLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZWRDbGFzc2VzLm1hcChwayA9PiAoe1xuICAgICAgICAgIHR5cGVkQ2xhc3M6IHBrLFxuICAgICAgICAgIHR5cGVDbGFzczogYnlEb21haW5bcGtdID8gYnlEb21haW5bcGtdLmhhc19yYW5nZSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSlcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVDbGFzc09mVHlwZWRDbGFzcyhwa1R5cGVkQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19kb21haW4udG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gYnlEb21haW5bcGtUeXBlZENsYXNzXSA/IGJ5RG9tYWluW3BrVHlwZWRDbGFzc10uaGFzX3JhbmdlIDogdW5kZWZpbmVkXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHBrVHlwZUNsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX3JhbmdlLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZUNsYXNzZXMubWFwKHBrID0+IGJ5RG9tYWluW3BrXSA/IGJ5RG9tYWluW3BrXS5oYXNfZG9tYWluIDogdW5kZWZpbmVkKVxuICAgICAgfSkpXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlUHJvcGVydHlPZlR5cGVkQ2xhc3MocGtUeXBlZENsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgdHlwZVByb3AgPSB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKS5maW5kKHAgPT4gcC5oYXNfZG9tYWluID09PSBwa1R5cGVkQ2xhc3MpXG4gICAgICAgIHJldHVybiB0eXBlUHJvcCA/IHR5cGVQcm9wLnBrX3Byb3BlcnR5IDogdW5kZWZpbmVkO1xuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhwa1Byb3BlcnRpZXM6IG51bWJlcltdLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfcGtfcHJvcGVydHkkLmFsbCQucGlwZShcbiAgICAgIG1hcCh4ID0+IHtcbiAgICAgICAgaWYgKCFwa1Byb3BlcnRpZXMgfHwgIXBrUHJvcGVydGllcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgICAgICBjb25zdCByZXMgPSBbXVxuICAgICAgICBjb25zdCB0YXJnZXRDbGFzc2VzID0ge307XG4gICAgICAgIHBrUHJvcGVydGllcy5mb3JFYWNoKHBrUHJvcCA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcHMgPSB2YWx1ZXMoeFtwa1Byb3BdKTtcbiAgICAgICAgICBwcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBpc091dGdvaW5nID8gcHJvcC5oYXNfcmFuZ2UgOiBwcm9wLmhhc19kb21haW47XG4gICAgICAgICAgICBpZiAoIXRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdKSB7XG4gICAgICAgICAgICAgIHRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzLnB1c2godGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVIYXNEZWZpbml0aW9uUHJvcGVydHkoZG9tYWluQ2xhc3M6IG51bWJlcikge1xuICBjb25zdCBwcm9maWxlczogUHJvZmlsZXMgPSBbXG4gICAge1xuICAgICAgcmVtb3ZlZF9mcm9tX2FwaTogZmFsc2UsXG4gICAgICBma19wcm9maWxlOiBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICAgfVxuICBdXG5cbiAgY29uc3QgaGFzRGVmaW5pdGlvbjogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogZG9tYWluQ2xhc3MsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19QMThfSEFTX0RFRklOSVRJT04sXG4gICAgaGFzX3JhbmdlOiA3ODUsXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnUDE4JyxcbiAgICBpZGVudGl0eV9kZWZpbmluZzogZmFsc2UsXG4gICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuICAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbiAgICBwcm9maWxlc1xuICB9XG4gIHJldHVybiBoYXNEZWZpbml0aW9uXG59XG5cblxuZnVuY3Rpb24gY3JlYXRlQXBwZWxsYXRpb25Qcm9wZXJ0eShyYW5nZUNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuICBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSxcbiAgICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GLFxuICAgIGhhc19yYW5nZTogcmFuZ2VDbGFzcyxcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAwLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdoaXN0UDknLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiB0cnVlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzQXBwZVByb3Bcbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIYXNUaW1lU3BhblByb3BlcnR5KGRvbWFpbkNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuICBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogZG9tYWluQ2xhc3MsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOLFxuICAgIGhhc19yYW5nZTogRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTixcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdQNCcsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IGZhbHNlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzQXBwZVByb3Bcbn1cblxuXG5mdW5jdGlvbiBpc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMoZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSwgcHJvZmlsZXM6IFJlbGF0ZWRQcm9maWxlW10pOiBib29sZWFuIHtcbiAgcmV0dXJuICFwcm9maWxlcy5zb21lKHAgPT4gcC5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSAmJiBlbmFibGVkUHJvZmlsZXMuaW5jbHVkZXMocC5ma19wcm9maWxlKSlcblxufVxuXG5mdW5jdGlvbiBnZXRQbGFjZU9mRGlzcGxheShzcGVjaWFsRmllbGRzOiBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBzdWJmaWVsZDogU3ViZmllbGQsIHByb2plY3RGaWVsZENvbmZpZz86IFByb0NsYXNzRmllbGRDb25maWcpOiBGaWVsZFBsYWNlT2ZEaXNwbGF5IHtcbiAgbGV0IHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXk7XG5cbiAgc2V0dGluZ3MgPSBnZXRTZXR0aW5nc0Zyb21TeXNDb25maWcoc3ViZmllbGQsIHNwZWNpYWxGaWVsZHMsIHNldHRpbmdzKTtcblxuICAvLyBpZiB0aGlzIGlzIGEgc3BlY2lhbCBmaWVsZCwgY3JlYXRlIGNvcnJlc3BvbmRpbmcgZGlzcGxheSBzZXR0aW5ncyBhbmQgcmV0dXJuIGl0XG4gIGlmIChzZXR0aW5ncykge1xuICAgIGlmIChzZXR0aW5ncy5kaXNwbGF5SW5CYXNpY0ZpZWxkcykge1xuICAgICAgcmV0dXJuIHsgYmFzaWNGaWVsZHM6IHsgcG9zaXRpb246IHNldHRpbmdzLmRpc3BsYXlJbkJhc2ljRmllbGRzLnBvc2l0aW9uIH0gfVxuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MuaGlkZGVuKSB7XG4gICAgICByZXR1cm4geyBoaWRkZW46IHRydWUgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG90aGVyd2lzZSBkaXNwbGF5IHRoZSBmaWVsZCBpbiBzcGVjaWZpYyBmaWVsZHMgKGRlZmF1bHQpXG4gIGxldCBwb3NpdGlvbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgaWYgKHByb2plY3RGaWVsZENvbmZpZykgcG9zaXRpb24gPSBwcm9qZWN0RmllbGRDb25maWcub3JkX251bVxuICByZXR1cm4geyBzcGVjaWZpY0ZpZWxkczogeyBwb3NpdGlvbiB9IH1cblxufVxuZnVuY3Rpb24gZ2V0U2V0dGluZ3NGcm9tU3lzQ29uZmlnKFxuICBzdWJmaWVsZDogU3ViZmllbGQsIHNwZWNpYWxGaWVsZHM6IFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXkpIHtcbiAgaWYgKHN1YmZpZWxkLmlzT3V0Z29pbmcpIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgaGFzLXR5cGUtc3VicHJvcGVydHlcbiAgICBpZiAoc3ViZmllbGQuaXNIYXNUeXBlRmllbGQgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaGFzVHlwZVN1YnByb3BlcnRpZXMpIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5oYXNUeXBlU3VicHJvcGVydGllcztcbiAgICB9XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IHNvdXJjZSBjbGFzcyBhbmQgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgc291cmNlIGNsYXNzIGFuZCBwcm9wZXJ0eVxuICAgIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2V0dGluZ3M7XG59XG5cblxuXG5cblxuXG4vKipcbiAqIFBpcGVzIHRoZSBmaWVsZHMgZm9yIHRlbXBvcmFsIGVudGl0eSBmb3Jtc1xuICogLSB0aGUgc3BlY2lmaWMgZmllbGRzXG4gKiAtIHRoZSB3aGVuIGZpZWxkXG4gKiAtIGlmIGF2YWlsYWJsZTogdGhlIHR5cGUgZmllbGRcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkRGVmaW5pdGlvbnNGb3JUZUVuRm9ybShwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vICAgcmV0dXJuIG9mKFtdKVxuLy8gY29uc3QgaGFzVHlwZUxpc3REZWYkID0gdGhpcy5waXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3MpXG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZERlZmluaXRpb25zKHBrQ2xhc3MpXG4vLyAgICAgLnBpcGUoXG4vLyAgICAgICBtYXAoZmllbGRzID0+IGZpZWxkcy5maWx0ZXIoZiA9PiBmLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlKSlcbi8vICAgICApXG4vLyAgICxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gKS5waXBlKFxuLy8gICBtYXAoKFtmaWVsZHMsIGhhc1R5cGVMaXN0RGVmc10pID0+IHtcbi8vICAgICBjb25zdCB3aGVuID0gdGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTilcbi8vICAgICByZXR1cm4gW1xuLy8gICAgICAgLi4uZmllbGRzLFxuLy8gICAgICAgd2hlbixcbi8vICAgICAgIC4uLmhhc1R5cGVMaXN0RGVmcy5tYXAoKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgICAgICByZXR1cm4gdHlwZUZpZWxkO1xuLy8gICAgICAgfSlcbi8vICAgICBdXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLyoqXG4gKiBQaXBlIHRoZSBzcGVjaWZpYyBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNwZWNpZmljRmllbGREZWZpbml0aW9ucyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCB0cnVlKS5waXBlKFxuLy8gICAgIC8vIGZpbHRlciBvdXQgdGhlICdoYXMgdHlwZScgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKG91dGdvaW5nID0+IG91dGdvaW5nLmZpbHRlcihvID0+ICFvLmlzX2hhc190eXBlX3N1YnByb3BlcnR5KSlcbi8vICAgKSxcbi8vICAgdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgZmFsc2UpLnBpcGUoXG4vLyAgICAgLy8gZmlsdGVyIG91dCB0aGUgJ2hhcyBhcHBlbGxhdGlvbicgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKGluZ29pbmcgPT4gaW5nb2luZy5maWx0ZXIoaSA9PlxuLy8gICAgICAgaS5wa19wcm9wZXJ0eSAhPT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GXG4vLyAgICAgICAmJiBpLnBrX3Byb3BlcnR5ICE9PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfR0VPVlAxX0lTX1JFUFJPRFVDVElPTl9PRlxuLy8gICAgICkpXG4vLyAgICksXG4vLyAgIHRoaXMucGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzKVxuLy8gKS5waXBlKFxuLy8gICBzd2l0Y2hNYXAoKFtvdXRnb2luZywgaW5nb2luZywgZmllbGRDb25maWdzXSkgPT4ge1xuXG4vLyAgICAgY29uc3Qga2V5ID0gKGZjOiBQYXJ0aWFsPFByb0NsYXNzRmllbGRDb25maWc+KSA9PiBgJHtmYy5ma19wcm9wZXJ0eX1fJHtmYy5ma19kb21haW5fY2xhc3N9XyR7ZmMuZmtfcmFuZ2VfY2xhc3N9YDtcbi8vICAgICBjb25zdCBpbmRleGVkID0gaW5kZXhCeSgoZmMpID0+IGAke2ZjLmZrX3Byb3BlcnR5fV8ke2ZjLmZrX2RvbWFpbl9jbGFzc31fJHtmYy5ma19yYW5nZV9jbGFzc31gLCBmaWVsZENvbmZpZ3MpXG4vLyAgICAgY29uc3QgZ2V0RmllbGRDb25maWcgPSAobGlzdERlZjogU3ViZmllbGQpOiBQcm9DbGFzc0ZpZWxkQ29uZmlnID0+IHtcbi8vICAgICAgIHJldHVybiBpbmRleGVkW2tleSh7XG4vLyAgICAgICAgIGZrX3Byb3BlcnR5OiBsaXN0RGVmLnByb3BlcnR5LnBrUHJvcGVydHksXG4vLyAgICAgICAgIGZrX2RvbWFpbl9jbGFzczogbGlzdERlZi5pc091dGdvaW5nID8gbGlzdERlZi5zb3VyY2VDbGFzcyA6IG51bGwsXG4vLyAgICAgICAgIGZrX3JhbmdlX2NsYXNzOiBsaXN0RGVmLmlzT3V0Z29pbmcgPyBudWxsIDogbGlzdERlZi5zb3VyY2VDbGFzcyxcbi8vICAgICAgIH0pXVxuLy8gICAgIH1cblxuLy8gICAgIC8vIENyZWF0ZSBsaXN0IGRlZmluaXRpb25zXG4vLyAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoaW5nb2luZywgZmFsc2UpLFxuLy8gICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKG91dGdvaW5nLCB0cnVlKVxuLy8gICAgICkucGlwZShcbi8vICAgICAgIG1hcCgoW2luZ29pbmdMaXN0RGVmcywgb3V0Z29pbmdMaXN0RGVmc10pID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZmluaXRpb25zID0gWy4uLmluZ29pbmdMaXN0RGVmcywgLi4ub3V0Z29pbmdMaXN0RGVmc107XG5cbi8vICAgICAgICAgLy8gQ3JlYXRlIGZpZWxkIGRlZmluaXRpb25zXG4vLyAgICAgICAgIGNvbnN0IGZpZWxkRGVmczogeyBba2V5OiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbi8vICAgICAgICAgbGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZiA9PiB7XG5cbi8vICAgICAgICAgICBjb25zdCBrID0gbGlzdERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5ICsgJ18nICsgbGlzdERlZi5pc091dGdvaW5nO1xuXG4vLyAgICAgICAgICAgaWYgKCFmaWVsZERlZnNba10pIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXSA9IHtcbi8vICAgICAgICAgICAgICAgLi4ubGlzdERlZixcbi8vICAgICAgICAgICAgICAgcGxhY2VPZkRpc3BsYXk6IHt9LFxuLy8gICAgICAgICAgICAgICBhbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgZmllbGRDb25maWc6IGdldEZpZWxkQ29uZmlnKGxpc3REZWYpLFxuLy8gICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbnM6IFtsaXN0RGVmXSxcbi8vICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW2xpc3REZWYudGFyZ2V0Q2xhc3NdXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXS5saXN0RGVmaW5pdGlvbnMucHVzaChsaXN0RGVmKVxuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdLnRhcmdldENsYXNzZXMucHVzaChsaXN0RGVmLnRhcmdldENsYXNzKVxuLy8gICAgICAgICAgIH1cblxuLy8gICAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICB9KVxuLy8gICAgICAgICAvLyBPcmRlciB0aGUgZmllbGRzIGFjY29yZGluZyB0byBvcmRfbnVtIChmcm9tIHByb2plY3QncyBjb25maWcsIGtsZWlvbGFiJ3MgY29uZmlnKSBvciBwdXQgaXQgYXQgZW5kIG9mIGxpc3QuXG4vLyAgICAgICAgIHJldHVybiBzb3J0KFxuLy8gICAgICAgICAgIChhLCBiKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zdCBnZXRPcmROdW0gPSAoaXRlbTogRmllbGQpID0+IHtcbi8vICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5maWVsZENvbmZpZykgcmV0dXJuIGl0ZW0uZmllbGRDb25maWcub3JkX251bTtcbi8vICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGNvbnN0IG9yZE51bUEgPSBnZXRPcmROdW0oYSk7XG4vLyAgICAgICAgICAgICBjb25zdCBvcmROdW1CID0gZ2V0T3JkTnVtKGIpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIG9yZE51bUEgLSBvcmROdW1CO1xuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgdmFsdWVzKGZpZWxkRGVmcykpXG4vLyAgICAgICB9KVxuLy8gICAgIClcbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vKipcbiAqIFBpcGUgdGhlIGZpZWxkcyBmb3IgaWRlbnRpZmljYXRpb24gb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZURlZmF1bHRGaWVsZERlZmluaXRpb25zKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG5cbi8vIC8qKlxuLy8gICogUGlwZSB0aGUgZ2VuZXJpYyBmaWVsZCBoYXMgYXBwZWxsYXRpb25cbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eVN0YXR1cyA9IHtcbi8vICAgaGFzX2RvbWFpbjogRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSxcbi8vICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRixcbi8vICAgaGFzX3JhbmdlOiBwa0NsYXNzLFxuLy8gICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbi8vICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMCxcbi8vICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuLy8gICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4vLyAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnaGlzdFA5Jyxcbi8vICAgaWRlbnRpdHlfZGVmaW5pbmc6IHRydWUsXG4vLyAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbi8vICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuLy8gICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgcHJvZmlsZXM6IFtdXG4vLyB9XG4vLyBjb25zdCBoYXNBcHBlTGlzdERlZiQgPSB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoW2hhc0FwcGVQcm9wXSwgZmFsc2UpLnBpcGUoXG4vLyAgIGZpbHRlcihsaXN0RGVmcyA9PiAhIWxpc3REZWZzICYmICEhbGlzdERlZnNbMF0pLFxuLy8gICBtYXAobGlzdERlZnMgPT4gbGlzdERlZnNbMF0pXG4vLyApO1xuXG4vLyAvKipcbi8vICAqIFBpcGUgdGhlIGdlbmVyaWMgZmllbGQgaGFzIHR5cGVcbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc1R5cGVMaXN0RGVmJCA9IHRoaXMucGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzKVxuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIGhhc0FwcGVMaXN0RGVmJCxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKGZpbHRlcihjID0+ICEhYykpXG4vLyApLnBpcGUoXG4vLyAgIG1hcCgoW2hhc0FwcGVMaXN0RGVmLCBoYXNUeXBlTGlzdERlZnMsIGtsYXNzXSkgPT4ge1xuLy8gICAgIGNvbnN0IGZpZWxkczogRmllbGRbXSA9IFtdXG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gICogQWRkICdzaG9ydCB0aXRsZScgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICAqXG4vLyAgICAgLy8gICogTWFuaWZlc3RhdGlvbiBQcm9kdWN0IFR5cGUg4oCTIEYzLCAyMTlcbi8vICAgICAvLyAgKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICAqIEl0ZW0g4oCTIEY1LCAyMjFcbi8vICAgICAvLyAgKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAgKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1RdLmluY2x1ZGVzKHBrQ2xhc3MpKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9TSE9SVF9USVRMRSkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhcyBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RQOScgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgY2xhc3NlcyBleGNlcHQgJ0FwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdEMxMCcsIDM2NVxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbi8vICAgICAvLyAgIGNvbnN0IGFwcGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc0FwcGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNBcHBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgZmllbGRzLnB1c2goYXBwZUZpZWxkKTtcbi8vICAgICAvLyB9XG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhc1R5cGUnIGZpZWxkc1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKGhhc1R5cGVMaXN0RGVmcyAmJiBoYXNUeXBlTGlzdERlZnMubGVuZ3RoID4gMCkge1xuLy8gICAgIC8vICAgaGFzVHlwZUxpc3REZWZzLmZvckVhY2goKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgLy8gICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgICBmaWVsZHMucHVzaCh0eXBlRmllbGQpO1xuLy8gICAgIC8vICAgfSlcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdlbnRpdHkgZGVmaW5pdGlvbicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCBjbGFzc2VzIGV4Y2VwdCAnQXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0QzEwJywgMzY1XG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT04pKTtcbi8vICAgICAvLyB9XG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaWRlbnRpZmllciAvIGV4YWN0IHJlZmVyZW5jZSAvIHVybCAvIC4uLicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVCA9PT0gcGtDbGFzcykge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnY29tbWVudCcgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIE1hbmlmZXN0YXRpb24gUHJvZHVjdCBUeXBlIOKAkyBGMywgMjE5XG4vLyAgICAgLy8gKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICogSXRlbSDigJMgRjUsIDIyMVxuLy8gICAgIC8vICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gKiBFeHByZXNzaW9uIHBvcnRpb24g4oCTIGdlb3ZDNSwgNTAzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1QsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfRVhQUkVTU0lPTl9QT1JUSU9OXS5pbmNsdWRlcyhwa0NsYXNzKSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ3RpbWUtc3BhbicgZmllbGQgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgdGVtcG9yYWwgZW50aXR5IGNsYXNzZXNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgcmV0dXJuIGZpZWxkc1xuXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLy8gcHJpdmF0ZSBwaXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3M6IG51bWJlcikge1xuLy8gICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgdHJ1ZSkucGlwZShcbi8vICAgICAvLyBjaGVjayBpZiB0aGlzIGNsYXNzIGhhcyAnaGFzIHR5cGUnIHN1YnByb3BlcnR5XG4vLyAgICAgbWFwKG91dGdvaW5nID0+IHtcbi8vICAgICAgIHJldHVybiBvdXRnb2luZy5maWx0ZXIoKHByb3ApID0+IHByb3AuaXNfaGFzX3R5cGVfc3VicHJvcGVydHkpO1xuLy8gICAgIH0pLCBzd2l0Y2hNYXAoaGFzVHlwZVByb3BzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KGhhc1R5cGVQcm9wcy5tYXAoZGZoUHJvcCA9PiB7XG4vLyAgICAgICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFtkZmhQcm9wXSwgdHJ1ZSkucGlwZShmaWx0ZXIobGlzdERlZnMgPT4gISFsaXN0RGVmcyAmJiAhIWxpc3REZWZzWzBdKSwgbWFwKGxpc3REZWZzID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZiA9IGxpc3REZWZzWzBdO1xuLy8gICAgICAgICBsaXN0RGVmLmxpc3RUeXBlID0geyB0eXBlSXRlbTogJ3RydWUnIH07XG4vLyAgICAgICAgIHJldHVybiBsaXN0RGVmO1xuLy8gICAgICAgfSkpO1xuLy8gICAgIH0pKSkpO1xuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkU3ViZmllbGQocGtDbGFzc0ZpZWxkOiBudW1iZXIpOiBTdWJmaWVsZCB7XG4vLyAgIGNvbnN0IHRlbXBsYXRlID0ge1xuLy8gICAgIHByb3BlcnR5OiB7fSxcbi8vICAgICBzb3VyY2VDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZUNsYXNzTGFiZWw6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIGlzT3V0Z29pbmc6IHVuZGVmaW5lZCxcbi8vICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiB1bmRlZmluZWQsXG4vLyAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldE1heFF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VNYXhRdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZU1pblF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2Vcbi8vICAgfVxuLy8gICBzd2l0Y2ggKHBrQ2xhc3NGaWVsZCkge1xuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU46XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6IHsgdGltZVNwYW46ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ1doZW4nLFxuLy8gICAgICAgICBpc091dGdvaW5nOiB0cnVlLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1A0Jyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvNCcsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAxXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT046XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnRGVzY3JpcHRpb24nLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQ6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnQ29tbWVudHMnLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0V4YWN0IFJlZmVyZW5jZScsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfU0hPUlRfVElUTEU6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnU2hvcnQgVGl0bGUnLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGRlZmF1bHQ6XG4vLyAgICAgICBicmVhaztcbi8vICAgfVxuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihwa0NsYXNzRmllbGQ6IG51bWJlcik6IEZpZWxkIHtcbi8vICAgY29uc3QgbGlzdERlZiA9IHRoaXMuZ2V0Q2xhc3NGaWVsZFN1YmZpZWxkKHBrQ2xhc3NGaWVsZClcbi8vICAgcmV0dXJuIHsgLi4ubGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbbGlzdERlZl0gfVxuLy8gfVxuXG5cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWQoKSB7XG4vLyAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkJC5rZXkoJ3RydWUnKVxuLy8gICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4vLyB9XG5cblxuXG4vLyAvKipcbi8vICAqIFBpcGVzIGFsbCB0aGUgZW5hYmxlZCBwcm9wZXJ0aWVzIG9mIGEgY2xhc3Ncbi8vICAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8RGZoUHJvcGVydHlTdGF0dXNbXT4ge1xuXG5cbi8vICAgbGV0ICQ6IE9ic2VydmFibGU8QnlQazxEZmhQcm9wZXJ0eT4+XG4vLyAgIGlmIChpc091dGdvaW5nKSB7XG4vLyAgICAgJCA9IHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfZG9tYWluJC5rZXkocGtDbGFzcylcbi8vICAgfVxuLy8gICBlbHNlIHtcbi8vICAgICAkID0gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19yYW5nZSQua2V5KHBrQ2xhc3MpXG4vLyAgIH1cblxuLy8gICAvLyBmaWx0ZXIgcHJvcGVydGllcyB0aGF0IGFyZSBpbiBhdCBsZWFzdCBvbmUgcHJvZmlsZSBlbmFibGVkIGJ5IHByb2plY3Rcbi8vICAgY29uc3QgcHJvZmlsZXMkID0gdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcblxuXG4vLyAgIC8vIEZpbHRlciBvdXQgb25seSB0aGUgcHJvcGVydGllcyBmb3Igd2hpY2ggdGFyZ2V0IGNsYXNzIGlzIGFsbG93ZWRcbi8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoJCwgcHJvZmlsZXMkKVxuLy8gICAgIC5waXBlKFxuLy8gICAgICAgbWFwKChbcHJvcHMsIHByb2ZpbGVzXSkgPT4ge1xuLy8gICAgICAgICBjb25zdCBwOiBEZmhQcm9wZXJ0eVN0YXR1c1tdID0gW11cblxuLy8gICAgICAgICB2YWx1ZXMocHJvcHMpLmZvckVhY2gocHJvcCA9PiB7XG5cblxuLy8gICAgICAgICAgIGNvbnN0IHByb3BQcm9maWxlUmVsID0gcHJvcC5wcm9maWxlcyBhcyBQcm9maWxlc1xuXG4vLyAgICAgICAgICAgbGV0IGVuYWJsZWRJbkFQcm9maWxlID0gZmFsc2U7XG5cbi8vICAgICAgICAgICBsZXQgcmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHRydWU7XG5cbi8vICAgICAgICAgICBwcm9wUHJvZmlsZVJlbC5mb3JFYWNoKGl0ZW0gPT4ge1xuLy8gICAgICAgICAgICAgaWYgKHByb2ZpbGVzLmluY2x1ZGVzKGl0ZW0uZmtfcHJvZmlsZSkpIHtcbi8vICAgICAgICAgICAgICAgZW5hYmxlZEluQVByb2ZpbGUgPSB0cnVlO1xuLy8gICAgICAgICAgICAgICBpZiAoaXRlbS5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSkge1xuLy8gICAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBmYWxzZVxuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSlcblxuLy8gICAgICAgICAgIGlmIChlbmFibGVkSW5BUHJvZmlsZSkge1xuLy8gICAgICAgICAgICAgcC5wdXNoKHtcbi8vICAgICAgICAgICAgICAgLi4ucHJvcCxcbi8vICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pXG5cbi8vICAgICAgICAgcmV0dXJuIHBcbi8vICAgICAgIH0pXG4vLyAgICAgKVxuXG4vLyB9XG5cblxuLy8gLyoqXG4vLyAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuLy8gICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdFxuLy8gICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyBlbmFibGVkIGJ5IGNsYXNzX3Byb2pfcmVsXG4vLyAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIHJlcXVpcmVkIGJ5IHNvdXJjZXMgb3IgYnkgYmFzaWNzXG4vLyAgKlxuLy8gICogdGhpcyBpcyB1c2VmdWxsIHRvIGNoZWNrIGlmIGEgY2xhc3MgaXMgYXZhaWxhYmxlIGF0IGFsbFxuLy8gICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0luRW50aXRlc09yUmVxdWlyZWQoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4vLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNSZXF1aXJlZCgpXG4vLyAgICkucGlwZShcbi8vICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbi8vICAgICBzdGFydFdpdGgoe30pXG4vLyAgIClcbi8vIH1cbiJdfQ==