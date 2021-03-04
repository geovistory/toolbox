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
     * @param {?=} noNesting
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeFields = /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    function (pkClass, noNesting) {
        var _this = this;
        if (noNesting === void 0) { noNesting = false; }
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
                // // if class is not appellation for language, add appellation for language (1111) property
                // if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
                //   ingoingProps.push(createAppellationProperty(pkClass))
                // }
                // if is temporal entity, add has time span property
                if (sourceKlass.basic_type === 9) {
                    outgoingProps.push(createHasTimeSpanProperty(pkClass));
                }
                outgoingProps.push(createHasDefinitionProperty(pkClass));
            }
            return combineLatest(_this.pipePropertiesToSubfields(outgoingProps, true, enabledProfiles, sysConfig, noNesting), _this.pipePropertiesToSubfields(ingoingProps, false, enabledProfiles, sysConfig, noNesting), _this.pipeFieldConfigs(pkClass)).pipe(map((/**
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
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSpecificFieldOfClass = /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    function (pkClass, noNesting) {
        if (noNesting === void 0) { noNesting = false; }
        return this.pipeFields(pkClass, noNesting).pipe(map((/**
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
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeBasicFieldsOfClass = /**
     * pipe all the basic fields of a class,
     * ordered by the position of the field within the basic fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    function (pkClass, noNesting) {
        if (noNesting === void 0) { noNesting = false; }
        return this.pipeFields(pkClass, noNesting).pipe(map((/**
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
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeFieldsForTeEnForm = /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    function (pkClass, noNesting) {
        if (noNesting === void 0) { noNesting = false; }
        return this.pipeFields(pkClass, noNesting).pipe(
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
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeBasicAndSpecificFields = /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    function (pkClass, noNesting) {
        if (noNesting === void 0) { noNesting = false; }
        return combineLatest(this.pipeBasicFieldsOfClass(pkClass, noNesting), this.pipeSpecificFieldOfClass(pkClass, noNesting))
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
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    ConfigurationPipesService.prototype.pipeSpecificAndBasicFields = /**
     * Pipes the fields of given class in this order:
     * - specific fields
     * - basic fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    function (pkClass, noNesting) {
        if (noNesting === void 0) { noNesting = false; }
        return combineLatest(this.pipeSpecificFieldOfClass(pkClass, noNesting), this.pipeBasicFieldsOfClass(pkClass, noNesting))
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
     * @param {?=} noNesting
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipePropertiesToSubfields = /**
     * @param {?} properties
     * @param {?} isOutgoing
     * @param {?} enabledProfiles
     * @param {?} sysConfig
     * @param {?=} noNesting
     * @return {?}
     */
    function (properties, isOutgoing, enabledProfiles, sysConfig, noNesting) {
        var _this = this;
        if (noNesting === void 0) { noNesting = false; }
        return combineLatestOrEmpty(properties.map((/**
         * @param {?} p
         * @return {?}
         */
        function (p) {
            return _this.pipeSubfield(isOutgoing, p, sysConfig, enabledProfiles, noNesting);
        })));
    };
    /**
     * @param {?} sourceClass
     * @param {?} property
     * @param {?} targetClass
     * @param {?} isOutgoing
     * @param {?=} noNesting
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSubfieldIdToSubfield = /**
     * @param {?} sourceClass
     * @param {?} property
     * @param {?} targetClass
     * @param {?} isOutgoing
     * @param {?=} noNesting
     * @return {?}
     */
    function (sourceClass, property, targetClass, isOutgoing, noNesting) {
        var _this = this;
        if (noNesting === void 0) { noNesting = false; }
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
            return _this.pipeSubfield(isOutgoing, dfhProp, sysConf, enabledProfiles, noNesting);
        })));
    };
    /**
     * @private
     * @param {?} isOutgoing
     * @param {?} p
     * @param {?} sysConfig
     * @param {?} enabledProfiles
     * @param {?=} noNesting
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSubfield = /**
     * @private
     * @param {?} isOutgoing
     * @param {?} p
     * @param {?} sysConfig
     * @param {?} enabledProfiles
     * @param {?=} noNesting
     * @return {?}
     */
    function (isOutgoing, p, sysConfig, enabledProfiles, noNesting) {
        if (noNesting === void 0) { noNesting = false; }
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
        // console.log('pppp wanted: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
        return combineLatest(this.pipeClassLabel(sourceClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            // console.log('pppp found sourceClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))), this.pipeClassLabel(targetClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            // console.log('pppp found targetClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))), this.pipeSubfieldTypeOfClass(sysConfig, targetClass, targetMaxQuantity, p.pk_property, noNesting).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            // console.log('pppp found subfieldType: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))), this.pipeFieldLabel(p.pk_property, isOutgoing ? p.has_domain : null, isOutgoing ? null : p.has_range).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        function (x) {
            // console.log('pppp found fieldLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            // console.log('pppp found: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            var _b = tslib_1.__read(_a, 4), sourceClassLabel = _b[0], targetClassLabel = _b[1], listType = _b[2], label = _b[3];
            // console.log('pppp found: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
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
     * @param {?=} noNesting
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
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    function (config, pkClass, targetMaxQuantity, parentProperty, noNesting) {
        var _this = this;
        if (noNesting === void 0) { noNesting = false; }
        return this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        function (i) { return !!i; })), switchMap((/**
         * @param {?} klass
         * @return {?}
         */
        function (klass) { return _this.pipeSubfieldType(config, klass, targetMaxQuantity, parentProperty, noNesting); })));
    };
    /**
     * @param {?} config
     * @param {?} klass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @param {?=} noNesting
     * @return {?}
     */
    ConfigurationPipesService.prototype.pipeSubfieldType = /**
     * @param {?} config
     * @param {?} klass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @param {?=} noNesting
     * @return {?}
     */
    function (config, klass, targetMaxQuantity, parentProperty, noNesting) {
        if (noNesting === void 0) { noNesting = false; }
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
        // TODO add this to sysConfigValue
        else if (klass.pk_class === DfhConfig.ClASS_PK_TIME_SPAN) {
            return res({ timeSpan: 'true' });
        }
        else if (klass.basic_type === 8 || klass.basic_type === 30 || noNesting) {
            return res({ entityPreview: 'true' });
        }
        else {
            // pipe the subfields of the temporalEntity class
            /** @type {?} */
            var noNest = true;
            return this.pipeBasicAndSpecificFields(klass.pk_class, noNest).pipe(map((/**
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
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFields", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSpecificFieldOfClass", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeBasicFieldsOfClass", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeFieldsForTeEnForm", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeBasicAndSpecificFields", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSpecificAndBasicFields", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Array, Boolean, Array, Object, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipePropertiesToSubfields", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Boolean, Object]),
        tslib_1.__metadata("design:returntype", Observable)
    ], ConfigurationPipesService.prototype, "pipeSubfieldIdToSubfield", null);
    tslib_1.__decorate([
        cache({ refCount: false }),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Number, Number, Number, Object]),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU14RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQU1wRSx1Q0FHQzs7O0lBREMsbURBQStCOztBQUlqQztJQWNFLG1DQUNVLENBQTRCLEVBQzVCLENBQXlCO1FBRHpCLE1BQUMsR0FBRCxDQUFDLENBQTJCO1FBQzVCLE1BQUMsR0FBRCxDQUFDLENBQXdCO0lBQy9CLENB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Q0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEcsUUFBUSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0c7UUFDRCwyQkFBMkI7YUFDdEIsSUFBSSxhQUFhLENBQUMsa0JBQWtCO1lBQ3ZDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2hFLFFBQVEsR0FBRyxhQUFhLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMzRTtLQUNGO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoQ29uZmlnLCBQcm9Db25maWcsIFN5c0NvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IGRmaExhYmVsQnlGa3NLZXksIHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5LCB0ZXh0UHJvcGVydHlCeUZrc0tleSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgQ2xhc3NDb25maWcsIERmaENsYXNzLCBEZmhMYWJlbCwgRGZoUHJvcGVydHksIEd2TG9hZFN1YmVudGl0eVN1YmZpZWxkUGFnZVJlcSwgR3ZTdWJmaWVsZFR5cGUsIEluZkxhbmd1YWdlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9UZXh0UHJvcGVydHksIFJlbGF0ZWRQcm9maWxlLCBTeXNDb25maWdGaWVsZERpc3BsYXksIFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIFN5c0NvbmZpZ1ZhbHVlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3RPckVtcHR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBmbGF0dGVuLCBpbmRleEJ5LCB1bmlxLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzaGFyZVJlcGxheSwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL21vZGVscy9GaWVsZCc7XG5pbXBvcnQgeyBGaWVsZFBsYWNlT2ZEaXNwbGF5IH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkUG9zaXRpb24nO1xuaW1wb3J0IHsgUHJvZmlsZXMgfSBmcm9tICcuLi9tb2RlbHMvUHJvZmlsZXMnO1xuaW1wb3J0IHsgU3BlY2lhbEZpZWxkVHlwZSB9IGZyb20gJy4uL21vZGVscy9TcGVjaWFsRmllbGRUeXBlJztcbmltcG9ydCB7IFN1YmZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcblxuXG4vLyB0aGlzIGlzIHRoZVxuZXhwb3J0IHR5cGUgVGFibGVOYW1lID0gJ2FwcGVsbGF0aW9uJyB8ICdsYW5ndWFnZScgfCAncGxhY2UnIHwgJ3RpbWVfcHJpbWl0aXZlJyB8ICdsYW5nX3N0cmluZycgfCAnZGltZW5zaW9uJyB8ICdwZXJzaXN0ZW50X2l0ZW0nIHwgJ3RlbXBvcmFsX2VudGl0eSdcblxuZXhwb3J0IGludGVyZmFjZSBEZmhQcm9wZXJ0eVN0YXR1cyBleHRlbmRzIERmaFByb3BlcnR5IHtcbiAgLy8gdHJ1ZSwgaWYgcmVtb3ZlZCBmcm9tIGFsbCBwcm9maWxlcyBvZiB0aGUgY3VycmVudCBwcm9qZWN0XG4gIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGJvb2xlYW5cbn1cblxudHlwZSBMYWJlbE9yaWdpbiA9ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfCAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfCAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnIHwgJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIG9udG9tZSBpbiBlbmdsaXNoJ1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjdGlvbiBvZiBwaXBlcyB0aGF0IGFnZ3JlZ2F0ZSBvciB0cmFuc2Zvcm0gY29uZmlndXJhdGlvbiBkYXRhLlxuICogV2hlbiB0YWxraW5nIGFib3V0IGNvbmZpZ3VyYXRpb24sIHdlIG1lYW4gdGhlIGNvbmNlcHR1YWwgcmVmZXJlbmNlIG1vZGVsIGFuZCB0aGUgYWRkaXRpb25hbFxuICogY29uZmlndXJhdGlvbnMgb24gc3lzdGVtIGFuZCBwcm9qZWN0IGxldmVsLlxuICogRm9yIEV4YW1wbGVcbiAqIC0gdGhlIGZpZWxkcyBvZiBhIGNsYXNzXG4gKiAtIHRoZSBsYWJlbHMgb2YgY2xhc3NlcyBhbmQgcHJvcGVydGllc1xuICovXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgKSB7IH1cblxuXG4gIC8qKlxuICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfcHJvZmlsZVxuICAqIG9mIGFsbCBwcm9maWxlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0LlxuICAqIFRoZSBhcnJheSB3aWxsIGFsd2F5cyBpbmNsdWRlIFBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIC8vIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwdWJsaWMgcGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9wcm9maWxlX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkJFxuICAgICAgICAua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpLnBpcGUoXG4gICAgICAgICAgbWFwKHByb2plY3RQcm9maWxlUmVscyA9PiB2YWx1ZXMocHJvamVjdFByb2ZpbGVSZWxzKVxuICAgICAgICAgICAgLmZpbHRlcihyZWwgPT4gcmVsLmVuYWJsZWQpXG4gICAgICAgICAgICAubWFwKHJlbCA9PiByZWwuZmtfcHJvZmlsZSlcbiAgICAgICAgICApLFxuICAgICAgICAgIG1hcChlbmFibGVkID0+IFsuLi5lbmFibGVkLCBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXSksXG4gICAgICAgICkpLFxuICAgICAgc2hhcmVSZXBsYXkoKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIGFsbCBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAgICogVGhlIEZpZWxkcyBhcmUgbm90IG9yZGVyZWQgYW5kIG5vdCBmaWx0ZXJlZFxuICAgKiBJZiB5b3Ugd2FudCBzcGVjaWZpYyBzdWJzZXRzIG9mIEZpZWxkcyBhbmQvb3Igb3JkZXJlZCBGaWVsZHMsIHVzZSB0aGUgcGlwZXNcbiAgICogdGhhdCBidWlsZCBvbiB0aGlzIHBpcGUuXG4gICAqL1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHMocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAvLyBwaXBlIHNvdXJjZSBjbGFzc1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcyksXG4gICAgICAvLyBwaXBlIG91dGdvaW5nIHByb3BlcnRpZXNcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfZG9tYWluJC5rZXkocGtDbGFzcykucGlwZShtYXAoaW5kZXhlZCA9PiB2YWx1ZXMoaW5kZXhlZCkpKSxcbiAgICAgIC8vIHBpcGUgaW5nb2luZyBwcm9wZXJ0aWVzXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX3JhbmdlJC5rZXkocGtDbGFzcykucGlwZShtYXAoaW5kZXhlZCA9PiB2YWx1ZXMoaW5kZXhlZCkpKSxcbiAgICAgIC8vIHBpcGUgc3lzIGNvbmZpZ1xuICAgICAgdGhpcy5zLnN5cyQuY29uZmlnJC5tYWluJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgLy8gcGlwZSBlbmFibGVkIHByb2ZpbGVzXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKSxcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtzb3VyY2VLbGFzcywgb3V0Z29pbmdQcm9wcywgaW5nb2luZ1Byb3BzLCBzeXNDb25maWcsIGVuYWJsZWRQcm9maWxlc10pID0+IHtcblxuICAgICAgICBpZiAocGtDbGFzcyA9PT0gRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTikge1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgaGFzIHRpbWUgc3BhbiBwcm9wZXJ0eVxuICAgICAgICAgIGluZ29pbmdQcm9wcyA9IFtdXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyAvLyBpZiBjbGFzcyBpcyBub3QgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlLCBhZGQgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlICgxMTExKSBwcm9wZXJ0eVxuICAgICAgICAgIC8vIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4gICAgICAgICAgLy8gICBpbmdvaW5nUHJvcHMucHVzaChjcmVhdGVBcHBlbGxhdGlvblByb3BlcnR5KHBrQ2xhc3MpKVxuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIC8vIGlmIGlzIHRlbXBvcmFsIGVudGl0eSwgYWRkIGhhcyB0aW1lIHNwYW4gcHJvcGVydHlcbiAgICAgICAgICBpZiAoc291cmNlS2xhc3MuYmFzaWNfdHlwZSA9PT0gOSkge1xuICAgICAgICAgICAgb3V0Z29pbmdQcm9wcy5wdXNoKGNyZWF0ZUhhc1RpbWVTcGFuUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb3V0Z29pbmdQcm9wcy5wdXNoKGNyZWF0ZUhhc0RlZmluaXRpb25Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMob3V0Z29pbmdQcm9wcywgdHJ1ZSwgZW5hYmxlZFByb2ZpbGVzLCBzeXNDb25maWcsIG5vTmVzdGluZyksXG4gICAgICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKGluZ29pbmdQcm9wcywgZmFsc2UsIGVuYWJsZWRQcm9maWxlcywgc3lzQ29uZmlnLCBub05lc3RpbmcpLFxuICAgICAgICAgIHRoaXMucGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKChbc3ViZmllbGRzMSwgc3ViZmllbGRzMiwgZmllbGRDb25maWdzXSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3ViZmllbGRzID0gWy4uLnN1YmZpZWxkczEsIC4uLnN1YmZpZWxkczJdXG5cbiAgICAgICAgICAgIGNvbnN0IGZpZWxkQ29uZmlnSWR4ID0gaW5kZXhCeSgoeCkgPT4gW1xuICAgICAgICAgICAgICAoeC5ma19kb21haW5fY2xhc3MgfHwgeC5ma19yYW5nZV9jbGFzcyksXG4gICAgICAgICAgICAgIHguZmtfcHJvcGVydHksXG4gICAgICAgICAgICAgICEheC5ma19kb21haW5fY2xhc3NcbiAgICAgICAgICAgIF0uam9pbignXycpLCBmaWVsZENvbmZpZ3MpXG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXFGaWVsZHM6IHsgW3VpZDogc3RyaW5nXTogRmllbGQgfSA9IHt9XG4gICAgICAgICAgICBjb25zdCB1bmlxU3ViZmllbGRDYWNoZTogeyBbdWlkOiBzdHJpbmddOiB0cnVlIH0gPSB7fVxuXG5cbiAgICAgICAgICAgIC8vIGdyb3VwIGJ5IHNvdXJjZSwgcGtQcm9wZXJ0eSBhbmQgaXNPdXRnb2luZ1xuICAgICAgICAgICAgZm9yIChjb25zdCBzIG9mIHN1YmZpZWxkcykge1xuICAgICAgICAgICAgICBjb25zdCBmaWVsZElkID0gW3Muc291cmNlQ2xhc3MsIHMucHJvcGVydHkucGtQcm9wZXJ0eSwgcy5pc091dGdvaW5nXS5qb2luKCdfJylcbiAgICAgICAgICAgICAgY29uc3Qgc3ViZmllbGRJZCA9IFtzLnNvdXJjZUNsYXNzLCBzLnByb3BlcnR5LnBrUHJvcGVydHksIHMuaXNPdXRnb2luZywgcy50YXJnZXRDbGFzc10uam9pbignXycpXG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkQ29uZmlnOiBQcm9DbGFzc0ZpZWxkQ29uZmlnIHwgdW5kZWZpbmVkID0gZmllbGRDb25maWdJZHhbZmllbGRJZF07XG4gICAgICAgICAgICAgIC8vIHRoZSBmaXJzdCB0aW1lIHRoZSBncm91cCBpcyBlc3RhYmxpc2hlZFxuICAgICAgICAgICAgICBpZiAoIXVuaXFGaWVsZHNbZmllbGRJZF0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNTcGVjaWFsRmllbGQ6IFNwZWNpYWxGaWVsZFR5cGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocy5pc0hhc1R5cGVGaWVsZCkgaXNTcGVjaWFsRmllbGQgPSAnaGFzLXR5cGUnO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMucHJvcGVydHkucGtQcm9wZXJ0eSA9PT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4pIGlzU3BlY2lhbEZpZWxkID0gJ3RpbWUtc3Bhbic7XG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXSA9IHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUNsYXNzOiBzLnNvdXJjZUNsYXNzLFxuICAgICAgICAgICAgICAgICAgc291cmNlQ2xhc3NMYWJlbDogcy5zb3VyY2VDbGFzc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgc291cmNlTWF4UXVhbnRpdHk6IHMuc291cmNlTWF4UXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICBzb3VyY2VNaW5RdWFudGl0eTogcy5zb3VyY2VNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldE1pblF1YW50aXR5OiBzLnRhcmdldE1pblF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IHMudGFyZ2V0TWF4UXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICBsYWJlbDogcy5sYWJlbCxcbiAgICAgICAgICAgICAgICAgIGlzSGFzVHlwZUZpZWxkOiBzLmlzSGFzVHlwZUZpZWxkLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IHMucHJvcGVydHksXG4gICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBzLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiBzLmlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2UsXG4gICAgICAgICAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBzLmlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQsXG4gICAgICAgICAgICAgICAgICBvbnRvSW5mb0xhYmVsOiBzLm9udG9JbmZvTGFiZWwsXG4gICAgICAgICAgICAgICAgICBvbnRvSW5mb1VybDogcy5vbnRvSW5mb1VybCxcbiAgICAgICAgICAgICAgICAgIGFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcyxcbiAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzZXM6IFtzLnRhcmdldENsYXNzXSxcbiAgICAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uczogW3NdLFxuICAgICAgICAgICAgICAgICAgZmllbGRDb25maWcsXG4gICAgICAgICAgICAgICAgICBwbGFjZU9mRGlzcGxheTogZ2V0UGxhY2VPZkRpc3BsYXkoc3lzQ29uZmlnLnNwZWNpYWxGaWVsZHMsIHMsIGZpZWxkQ29uZmlnKSxcbiAgICAgICAgICAgICAgICAgIGlzU3BlY2lhbEZpZWxkXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbWFyayBzdWJmaWVsZCBhcyBhZGRlZFxuICAgICAgICAgICAgICAgIHVuaXFTdWJmaWVsZENhY2hlW3N1YmZpZWxkSWRdID0gdHJ1ZTtcblxuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gaWdub3JlIGR1cGxpY2F0aW9ucyBvZiBzdWJmaWVsZHNcbiAgICAgICAgICAgICAgZWxzZSBpZiAoIXVuaXFTdWJmaWVsZENhY2hlW3N1YmZpZWxkSWRdKSB7XG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID09PSBmYWxzZSA/XG4gICAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBmYWxzZSA6XG4gICAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXM7XG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS50YXJnZXRDbGFzc2VzLnB1c2gocy50YXJnZXRDbGFzcylcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmxpc3REZWZpbml0aW9ucy5wdXNoKHMpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcyh1bmlxRmllbGRzKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBwaXBlIGFsbCB0aGUgc3BlY2lmaWMgZmllbGRzIG9mIGEgY2xhc3MsXG4gICAqIG9yZGVyZWQgYnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MsIG5vTmVzdGluZykucGlwZShcbiAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzXG4gICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMpXG4gICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24gLSBiLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgICogcGlwZSBhbGwgdGhlIGJhc2ljIGZpZWxkcyBvZiBhIGNsYXNzLFxuICAgICogb3JkZXJlZCBieSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgYmFzaWMgZmllbGRzXG4gICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcywgbm9OZXN0aW5nKS5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHNcbiAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBiYXNpYyBmaWVsZHNcbiAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcylcbiAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIGJhc2ljIGZpZWxkc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcy5wb3NpdGlvbiAtIGIucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMucG9zaXRpb24pXG4gICAgICApXG4gICAgKVxuICB9XG5cblxuXG5cbiAgLyoqXG4gICAgICogUGlwZXMgdGhlIGZpZWxkcyBmb3IgdGVtcG9yYWwgZW50aXR5IGZvcm1zXG4gICAgICogLSB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICogLSB0aGUgd2hlbiBmaWVsZFxuICAgICAqIC0gaWYgYXZhaWxhYmxlOiB0aGUgdHlwZSBmaWVsZFxuICAgICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUZpZWxkc0ZvclRlRW5Gb3JtKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MsIG5vTmVzdGluZykucGlwZShcbiAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICBtYXAoYWxsRmllbGRzID0+IHtcbiAgICAgICAgY29uc3QgZmllbGRzID0gYWxsRmllbGRzXG4gICAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzKVxuICAgICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbiAtIGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24pXG5cbiAgICAgICAgY29uc3Qgd2hlbkZpZWxkID0gYWxsRmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eSA9PT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4pXG4gICAgICAgIGlmICh3aGVuRmllbGQpIGZpZWxkcy5wdXNoKHdoZW5GaWVsZClcblxuICAgICAgICBjb25zdCB0eXBlRmllbGQgPSBhbGxGaWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pc0hhc1R5cGVGaWVsZClcbiAgICAgICAgaWYgKHR5cGVGaWVsZCkgZmllbGRzLnB1c2godHlwZUZpZWxkKVxuXG4gICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuXG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGZpZWxkcyBvZiBnaXZlbiBjbGFzcyBpbiB0aGlzIG9yZGVyOlxuICAgKiAtIGJhc2ljIGZpZWxkc1xuICAgKiAtIHNwZWNpZmljIGZpZWxkc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZyksXG4gICAgICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzLCBub05lc3RpbmcpXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuICAvKipcbiAgKiBQaXBlcyB0aGUgZmllbGRzIG9mIGdpdmVuIGNsYXNzIGluIHRoaXMgb3JkZXI6XG4gICogLSBzcGVjaWZpYyBmaWVsZHNcbiAgKiAtIGJhc2ljIGZpZWxkc1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzLCBub05lc3RpbmcpLFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZyksXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFxuICAgIHByb3BlcnRpZXM6IERmaFByb3BlcnR5W10sXG4gICAgaXNPdXRnb2luZzogYm9vbGVhbixcbiAgICBlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdLFxuICAgIHN5c0NvbmZpZzogU3lzQ29uZmlnVmFsdWUsXG4gICAgbm9OZXN0aW5nID0gZmFsc2VcbiAgKTogT2JzZXJ2YWJsZTxTdWJmaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgcHJvcGVydGllcy5tYXAocCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVTdWJmaWVsZChpc091dGdvaW5nLCBwLCBzeXNDb25maWcsIGVuYWJsZWRQcm9maWxlcywgbm9OZXN0aW5nKTtcbiAgICAgIH0pXG4gICAgKVxuXG4gIH1cblxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlU3ViZmllbGRJZFRvU3ViZmllbGQoc291cmNlQ2xhc3M6IG51bWJlciwgcHJvcGVydHk6IG51bWJlciwgdGFyZ2V0Q2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbiwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPFN1YmZpZWxkPiB7XG4gICAgY29uc3QgZG9tYWluID0gaXNPdXRnb2luZyA/IHNvdXJjZUNsYXNzIDogdGFyZ2V0Q2xhc3M7XG4gICAgY29uc3QgcmFuZ2UgPSBpc091dGdvaW5nID8gdGFyZ2V0Q2xhc3MgOiBzb3VyY2VDbGFzcztcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5wa19wcm9wZXJ0eV9faGFzX2RvbWFpbl9faGFzX3JhbmdlJC5rZXkoW3Byb3BlcnR5LCBkb21haW4sIHJhbmdlXS5qb2luKCdfJykpXG4gICAgICAgIC5waXBlKGZpbHRlcih4ID0+IHtcbiAgICAgICAgICByZXR1cm4gISF4XG4gICAgICAgIH0pKSxcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQucGlwZShmaWx0ZXIoeCA9PiB7XG4gICAgICAgIHJldHVybiAhIXhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpLnBpcGUoZmlsdGVyKHggPT4ge1xuICAgICAgICByZXR1cm4gISF4XG4gICAgICB9KSksXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZGZoUHJvcCwgc3lzQ29uZiwgZW5hYmxlZFByb2ZpbGVzXSkgPT4gdGhpcy5waXBlU3ViZmllbGQoXG4gICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgIGRmaFByb3AsXG4gICAgICAgIHN5c0NvbmYsXG4gICAgICAgIGVuYWJsZWRQcm9maWxlcyxcbiAgICAgICAgbm9OZXN0aW5nXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cbiAgcHJpdmF0ZSBwaXBlU3ViZmllbGQoXG4gICAgaXNPdXRnb2luZzogYm9vbGVhbixcbiAgICBwOiBEZmhQcm9wZXJ0eSxcbiAgICBzeXNDb25maWc6IFN5c0NvbmZpZ1ZhbHVlLFxuICAgIGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sXG4gICAgbm9OZXN0aW5nID0gZmFsc2VcbiAgKTogT2JzZXJ2YWJsZTxTdWJmaWVsZD4ge1xuICAgIGNvbnN0IG8gPSBpc091dGdvaW5nO1xuICAgIGNvbnN0IHRhcmdldENsYXNzID0gbyA/IHAuaGFzX3JhbmdlIDogcC5oYXNfZG9tYWluO1xuICAgIGNvbnN0IHNvdXJjZUNsYXNzID0gbyA/IHAuaGFzX2RvbWFpbiA6IHAuaGFzX3JhbmdlO1xuICAgIGNvbnN0IHRhcmdldE1heFF1YW50aXR5ID0gbyA/XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllciA6XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI7XG4gICAgY29uc3Qgc291cmNlTWF4UXVhbnRpdHkgPSBvID9cbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllciA6XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjtcbiAgICBjb25zdCB0YXJnZXRNaW5RdWFudGl0eSA9IG8gP1xuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXIgOlxuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyO1xuICAgIGNvbnN0IHNvdXJjZU1pblF1YW50aXR5ID0gbyA/XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXIgOlxuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI7XG5cbiAgICAvLyBjb25zb2xlLmxvZygncHBwcCB3YW50ZWQ6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVDbGFzc0xhYmVsKHNvdXJjZUNsYXNzKS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BwcHAgZm91bmQgc291cmNlQ2xhc3NMYWJlbDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG5cbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZUNsYXNzTGFiZWwodGFyZ2V0Q2xhc3MpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCB0YXJnZXRDbGFzc0xhYmVsOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcblxuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlU3ViZmllbGRUeXBlT2ZDbGFzcyhzeXNDb25maWcsIHRhcmdldENsYXNzLCB0YXJnZXRNYXhRdWFudGl0eSwgcC5wa19wcm9wZXJ0eSwgbm9OZXN0aW5nKS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BwcHAgZm91bmQgc3ViZmllbGRUeXBlOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZUZpZWxkTGFiZWwocC5wa19wcm9wZXJ0eSwgaXNPdXRnb2luZyA/IHAuaGFzX2RvbWFpbiA6IG51bGwsIGlzT3V0Z29pbmcgPyBudWxsIDogcC5oYXNfcmFuZ2UpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCBmaWVsZExhYmVsOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICApXG4gICAgICAucGlwZShtYXAoKFtzb3VyY2VDbGFzc0xhYmVsLCB0YXJnZXRDbGFzc0xhYmVsLCBsaXN0VHlwZSwgbGFiZWxdXG4gICAgICApID0+IHtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG5cbiAgICAgICAgY29uc3Qgbm9kZTogU3ViZmllbGQgPSB7XG4gICAgICAgICAgbGlzdFR5cGUsXG4gICAgICAgICAgc291cmNlQ2xhc3MsXG4gICAgICAgICAgc291cmNlQ2xhc3NMYWJlbCxcbiAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICBzb3VyY2VNaW5RdWFudGl0eSxcbiAgICAgICAgICB0YXJnZXRDbGFzcyxcbiAgICAgICAgICB0YXJnZXRDbGFzc0xhYmVsLFxuICAgICAgICAgIHRhcmdldE1pblF1YW50aXR5LFxuICAgICAgICAgIHRhcmdldE1heFF1YW50aXR5LFxuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIGlzSGFzVHlwZUZpZWxkOiBvICYmIHAuaXNfaGFzX3R5cGVfc3VicHJvcGVydHksXG4gICAgICAgICAgcHJvcGVydHk6IHsgcGtQcm9wZXJ0eTogcC5wa19wcm9wZXJ0eSB9LFxuICAgICAgICAgIGlzT3V0Z29pbmc6IG8sXG4gICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogbyA/IHAuaWRlbnRpdHlfZGVmaW5pbmcgOiBmYWxzZSxcbiAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBvID8gZmFsc2UgOiBwLmlkZW50aXR5X2RlZmluaW5nLFxuICAgICAgICAgIG9udG9JbmZvTGFiZWw6IHAuaWRlbnRpZmllcl9pbl9uYW1lc3BhY2UsXG4gICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvJyArIHAucGtfcHJvcGVydHksXG4gICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogaXNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzKGVuYWJsZWRQcm9maWxlcywgKHAucHJvZmlsZXMgfHwgW10pKSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgdGhlIHR5cGUgb2YgU3ViZmllbGQgZm9yIGEgZ2l2ZW4gY2xhc3NcbiAgICpcbiAgICogQ3VycmVudGx5ICh0byBiZSByZXZpc2VkIGlmIGdvb2QpIHN1YmxjYXNzZXMgb2YgRTU1IFR5cGUsXG4gICAqIHRoYXQgYXJlIHRoZSB0YXJnZXQgb2YgYSBmaWVsZCB3aXRoIHRhcmdldE1heFFhbnRpdHk9MSxcbiAgICogZ2V0IFN1YmZpZWxkIHR5cGUgJ2hhc1R5cGUnLlxuICAgKiBUaGVyZWZvcmUgdGFyZ2V0TWF4UXVhbnRpdHkgaXMgbmVlZGVkLlxuICAgKlxuICAgKiBJZiB3ZSBhcmUgbmVzdGluZyBzdWJmaWVsZHMsIHdlJ2xsIGVuZCB1cCB3aXRoIGNpcmN1bGFyIGZpZWxkcy5cbiAgICogRS5nLjogUGVyc29uIDIxIC0+IGhhcyBhcHBlbGxhdGlvbiAxMTExIC0+IEFwcGVUZUVuIDM2NSAtPiBpcyBhcHBlbGxhdGlvbiBvZiAxMTExIC0+IFBlcnNvbiAyMVxuICAgKiBJbiBvcmRlciB0byBkZXRlY3QgdGhlbSwgd2UgY2FuIGFkZGl0aW9uYWxseSBwYXNzIGluIHRoZSBwYXJlbnQgcHJvcGVydHkuXG4gICAqXG4gICAqIFRoaXMgYmVoYXZpb3IgaGFzIHRvIGJlIHJldmlzZWQsIGJlY2F1c2UgaXQgY2FuIGxlYWQgdG8gcHJvYmxlbXNcbiAgICogd2hlbiB0aGUgU3ViZmllbGQgYmVsb25ncyB0byBhIEZpZWxkIHdpdGggbXVsdGlwbGUgdGFyZ2V0IGNsYXNzZXNcbiAgICogKGFuZCB0aHVzIFN1YmZpZWxkcykgYmVjYXVzZSB0aGUgVUkgdGhlbiBkb2VzIG5vdCBhbGxvdyB0byBjaG9vc2VcbiAgICogdGhlIHJpZ2h0IHRhcmdldCBjbGFzcy5cbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTdWJmaWVsZFR5cGVPZkNsYXNzKGNvbmZpZzogU3lzQ29uZmlnVmFsdWUsIHBrQ2xhc3M6IG51bWJlciwgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlciwgcGFyZW50UHJvcGVydHk/OiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxHdlN1YmZpZWxkVHlwZT4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKFxuICAgICAgZmlsdGVyKGkgPT4gISFpKSxcbiAgICAgIHN3aXRjaE1hcCgoa2xhc3MpID0+IHRoaXMucGlwZVN1YmZpZWxkVHlwZShjb25maWcsIGtsYXNzLCB0YXJnZXRNYXhRdWFudGl0eSwgcGFyZW50UHJvcGVydHksIG5vTmVzdGluZykpXG4gICAgKVxuICB9XG5cblxuICBwaXBlU3ViZmllbGRUeXBlKGNvbmZpZzogU3lzQ29uZmlnVmFsdWUsIGtsYXNzOiBEZmhDbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlciwgcGFyZW50UHJvcGVydHk/OiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxHdlN1YmZpZWxkVHlwZT4ge1xuXG4gICAgY29uc3QgcmVzID0gKHg6IEd2U3ViZmllbGRUeXBlKSA9PiBuZXcgQmVoYXZpb3JTdWJqZWN0KHgpXG4gICAgbGV0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZ1xuICAgIGlmIChjb25maWcpIGNsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNba2xhc3MucGtfY2xhc3NdO1xuICAgIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcbiAgICAgIHJldHVybiByZXMoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKVxuICAgIH1cblxuXG4gICAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gMzAgJiYgdGFyZ2V0TWF4UXVhbnRpdHkgPT0gMSkge1xuICAgICAgcmV0dXJuIHJlcyh7IHR5cGVJdGVtOiAndHJ1ZScgfSlcbiAgICB9XG4gICAgLy8gVE9ETyBhZGQgdGhpcyB0byBzeXNDb25maWdWYWx1ZVxuICAgIGVsc2UgaWYgKGtsYXNzLnBrX2NsYXNzID09PSBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOKSB7XG4gICAgICByZXR1cm4gcmVzKHsgdGltZVNwYW46ICd0cnVlJyB9KVxuICAgIH1cbiAgICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA4IHx8IGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwIHx8IG5vTmVzdGluZykge1xuICAgICAgcmV0dXJuIHJlcyh7IGVudGl0eVByZXZpZXc6ICd0cnVlJyB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIHBpcGUgdGhlIHN1YmZpZWxkcyBvZiB0aGUgdGVtcG9yYWxFbnRpdHkgY2xhc3NcbiAgICAgIGNvbnN0IG5vTmVzdCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5waXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhrbGFzcy5wa19jbGFzcywgbm9OZXN0KS5waXBlKFxuICAgICAgICBtYXAoZmllbGRzID0+IHtcbiAgICAgICAgICBjb25zdCBzdWJlbnRpdHlTdWJmaWVsZFBhZ2U6IEd2TG9hZFN1YmVudGl0eVN1YmZpZWxkUGFnZVJlcVtdID0gW11cbiAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGZpZWxkcykge1xuICAgICAgICAgICAgLy8gZm9yIGVhY2ggb2YgdGhlc2Ugc3ViZmllbGRzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHN1YmZpZWxkIG9mIGZpZWxkLmxpc3REZWZpbml0aW9ucykge1xuICAgICAgICAgICAgICAvLyBjcmVhdGUgcGFnZTpHdlN1YmZpZWxkUGFnZVxuICAgICAgICAgICAgICBsZXQgbmVzdGVkU3ViZmllbGRUeXBlOiBHdlN1YmZpZWxkVHlwZSA9IHsgZW50aXR5UHJldmlldzogJ3RydWUnIH07XG4gICAgICAgICAgICAgIGlmICghc3ViZmllbGQubGlzdFR5cGUudGVtcG9yYWxFbnRpdHkpIG5lc3RlZFN1YmZpZWxkVHlwZSA9IHN1YmZpZWxkLmxpc3RUeXBlO1xuICAgICAgICAgICAgICBsZXQgaXNDaXJjdWxhciA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgcGFyZW50UHJvcGVydHkgJiZcbiAgICAgICAgICAgICAgICBzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09IHBhcmVudFByb3BlcnR5ICYmXG4gICAgICAgICAgICAgICAgc3ViZmllbGQudGFyZ2V0TWF4UXVhbnRpdHkgPT09IDFcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaXNDaXJjdWxhciA9IHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBuZXN0ZWRQYWdlOiBHdkxvYWRTdWJlbnRpdHlTdWJmaWVsZFBhZ2VSZXEgPSB7XG4gICAgICAgICAgICAgICAgc3ViZmllbGRUeXBlOiBuZXN0ZWRTdWJmaWVsZFR5cGUsXG4gICAgICAgICAgICAgICAgcGFnZToge1xuICAgICAgICAgICAgICAgICAgZmtQcm9wZXJ0eTogc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHN1YmZpZWxkLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBzdWJmaWVsZC50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgICAgICAgIGlzQ2lyY3VsYXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3ViZW50aXR5U3ViZmllbGRQYWdlLnB1c2gobmVzdGVkUGFnZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHsgdGVtcG9yYWxFbnRpdHk6IHN1YmVudGl0eVN1YmZpZWxkUGFnZSB9XG4gICAgICAgIH0pLFxuXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogR2V0cyBjbGFzcyBmaWVsZCBjb25maWdzIG9mIGdpdmVuIHBrQ2xhc3NcbiAgICpcbiAgICogLSBvZiBhY3RpdmUgcHJvamVjdCwgaWYgYW55LCBlbHNlXG4gICAqIC0gb2YgZGVmYXVsdCBjb25maWcgcHJvamVjdCwgZWxzZVxuICAgKiAtIGVtcHR5IGFycmF5XG4gICAqXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGRDb25maWdzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8UHJvQ2xhc3NGaWVsZENvbmZpZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGZrUHJvamVjdCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3RrZXkgPSBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSh7XG4gICAgICAgICAgZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkOiBwa0NsYXNzLFxuICAgICAgICAgIGZrX3Byb2plY3Q6IGZrUHJvamVjdFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdGtleSA9IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5KHtcbiAgICAgICAgICBma19jbGFzc19mb3JfY2xhc3NfZmllbGQ6IHBrQ2xhc3MsXG4gICAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLnMucHJvJC5jbGFzc19maWVsZF9jb25maWckLmJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJC5rZXkoYWN0aXZlUHJvamVjdGtleSksXG4gICAgICAgICAgdGhpcy5zLnBybyQuY2xhc3NfZmllbGRfY29uZmlnJC5ieV9ma19wcm9qZWN0X19ma19jbGFzcyQua2V5KGRlZmF1bHRQcm9qZWN0a2V5KVxuICAgICAgICApXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFthY3RpdmVQcm9qZWN0RmllbGRzLCBkZWZhdWx0UHJvamVjdEZpZWxkc10pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjdGl2ZVByb2plY3RGaWVsZHMgJiYgdmFsdWVzKGFjdGl2ZVByb2plY3RGaWVsZHMpLmxlbmd0aCkgcmV0dXJuIGFjdGl2ZVByb2plY3RGaWVsZHM7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRQcm9qZWN0RmllbGRzXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcCgoaXRlbXMpID0+IHZhbHVlcyhpdGVtcykuc29ydCgoYSwgYikgPT4gKGEub3JkX251bSA+IGIub3JkX251bSA/IDEgOiAtMSkpKSxcbiAgICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblxuICAvKipcbiAgICogRGVsaXZlcnMgY2xhc3MgbGFiZWwgZm9yIGFjdGl2ZSBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3NMYWJlbChwa0NsYXNzPzogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5hLnBrUHJvamVjdCQsXG4gICAgICB0aGlzLmEucGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZmtQcm9qZWN0LCBsYW5ndWFnZV0pID0+IHRoaXMucGlwZUxhYmVscyh7IHBrQ2xhc3MsIGZrUHJvamVjdCwgbGFuZ3VhZ2UsIHR5cGU6ICdsYWJlbCcgfSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW1zID0+IHtcblxuICAgICAgICAgICAgY29uc3QgaSA9IGl0ZW1zLmZpbmQoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gaSA/IGkudGV4dCA6IGAqIG5vIGxhYmVsIChpZDogJHtwa0NsYXNzfSkgKmBcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGFycmF5IG9mIG9iamVjdHMgd2l0aFxuICAgKiB0ZXh0IH4gdGhlIHRleHQgb2YgdGhlIHByb3BlcnR5XG4gICAqIG9yaWdpbiwgaW4gdGhpcyBvcmRlcjpcbiAgICogLSBvcmlnaW4gPT0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyAgICAgICAgIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnICAgICAgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnICAgICAgICAgIChmcm9tIGRhdGFfZm9yX2hpc3RvcnkubGFiZWwpXG4gICAqIC0gb3JpZ2luID09ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCcgICAgICAgICAgICAgICAoZnJvbSBkYXRhX2Zvcl9oaXN0b3J5LmxhYmVsKVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUxhYmVscyhkOiB7XG4gICAgZmtQcm9qZWN0OiBudW1iZXIsXG4gICAgdHlwZTogJ2xhYmVsJyB8ICdkZWZpbml0aW9uJyB8ICdzY29wZU5vdGUnLFxuICAgIGxhbmd1YWdlOiBJbmZMYW5ndWFnZSxcbiAgICBwa0NsYXNzPzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eURvbWFpbj86IG51bWJlcixcbiAgICBma1Byb3BlcnR5UmFuZ2U/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPHtcbiAgICBvcmlnaW46IExhYmVsT3JpZ2luXG4gICAgdGV4dDogc3RyaW5nXG4gIH1bXT4ge1xuICAgIGxldCBma19zeXN0ZW1fdHlwZTogbnVtYmVyO1xuXG4gICAgaWYgKGQucGtDbGFzcykge1xuICAgICAgc3dpdGNoIChkLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGFiZWwnOlxuICAgICAgICAgIGZrX3N5c3RlbV90eXBlID0gU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignZmtfc3lzdGVtX3R5cGUgbm90IGZvdW5kJylcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZC5ma1Byb3BlcnR5KSB7XG4gICAgICBzd2l0Y2ggKGQudHlwZSkge1xuICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgZmtfc3lzdGVtX3R5cGUgPSBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdma19zeXN0ZW1fdHlwZSBub3QgZm91bmQnKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAvLyBsYWJlbCBvZiBwcm9qZWN0IGluIGRlZmF1bHQgbGFuZ3VhZ2Ugb2YgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogZC5ma1Byb2plY3QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiBkLmxhbmd1YWdlLnBrX2VudGl0eSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgb2YgZGVmYXVsdCBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNULFxuICAgICAgICBma19sYW5ndWFnZTogZC5sYW5ndWFnZS5wa19lbnRpdHksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgb2YgZGVmYXVsdCBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNULFxuICAgICAgICBma19sYW5ndWFnZTogMTg4ODksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIGZyb20gb250b21lIGluIGRlZmF1bHQgbGFuZ3VhZ2Ugb2YgcHJvamVjdFxuICAgICAgdGhpcy5waXBlRGZoTGFiZWwoe1xuICAgICAgICBsYW5ndWFnZTogZC5sYW5ndWFnZS5pc282MzkxLnRyaW0oKSxcbiAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgZmtfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0ubGFiZWwgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBmcm9tIG9udG9tZSBpbiBlbmdsaXNoXG4gICAgICB0aGlzLnBpcGVEZmhMYWJlbCh7XG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBma19jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19wcm9wZXJ0eTogZC5ma1Byb3BlcnR5XG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2Ygb250b21lIGluIGVuZ2xpc2gnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0ubGFiZWwgfVxuICAgICAgfSkpLFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyBQcm9UZXh0UHJvcGVydHlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9UZXh0UHJvcGVydHkoZDoge1xuICAgIGZrX3Byb2plY3Q6IG51bWJlcixcbiAgICBma19zeXN0ZW1fdHlwZTogbnVtYmVyLFxuICAgIGZrX2xhbmd1YWdlOiBudW1iZXIsXG4gICAgZmtfZGZoX2NsYXNzPzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eT86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHlfZG9tYWluPzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZT86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8UHJvVGV4dFByb3BlcnR5PiB7XG4gICAgY29uc3Qga2V5ID0gdGV4dFByb3BlcnR5QnlGa3NLZXkoZClcbiAgICByZXR1cm4gdGhpcy5zLnBybyQudGV4dF9wcm9wZXJ0eSQuYnlfZmtzJC5rZXkoa2V5KVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIERmaExhYmVsXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRGZoTGFiZWwoZDoge1xuICAgIHR5cGU6ICdsYWJlbCcgfCAnZGVmaW5pdGlvbicgfCAnc2NvcGVOb3RlJyxcbiAgICBsYW5ndWFnZTogc3RyaW5nLFxuICAgIGZrX2NsYXNzPzogbnVtYmVyLFxuICAgIGZrX3Byb2ZpbGU/OiBudW1iZXIsXG4gICAgZmtfcHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtfcHJvamVjdD86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8RGZoTGFiZWw+IHtcbiAgICBjb25zdCBrZXkgPSBkZmhMYWJlbEJ5RmtzS2V5KGQpXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLmxhYmVsJC5ieV9ma3MkLmtleShrZXkpXG4gIH1cblxuICAvKipcbiAgICogRGVsaXZlcnMgYmVzdCBmaXR0aW5nIGZpZWxkIGxhYmVsIGZvciBhY3RpdmUgcHJvamVjdFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGRMYWJlbChma1Byb3BlcnR5OiBudW1iZXIsIGZrUHJvcGVydHlEb21haW46IG51bWJlciwgZmtQcm9wZXJ0eVJhbmdlOiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnN0IGlzT3V0Z29pbmcgPSAhIWZrUHJvcGVydHlEb21haW47XG4gICAgLy8gY29uc3Qgc3lzdGVtX3R5cGUgPSBpc091dGdvaW5nID8gKHNpbmd1bGFyID8gMTgwIDogMTgxKSA6IChzaW5ndWxhciA/IDE4MiA6IDE4MylcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5hLnBrUHJvamVjdCQsXG4gICAgICB0aGlzLmEucGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZmtQcm9qZWN0LCBsYW5ndWFnZV0pID0+IHRoaXMucGlwZUxhYmVscyhcbiAgICAgICAge1xuICAgICAgICAgIGZrUHJvamVjdCxcbiAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgIGZrUHJvcGVydHksXG4gICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgICBma1Byb3BlcnR5UmFuZ2VcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgbGV0IGxhYmVsID0gYCogbm8gbGFiZWwgKGlkOiAke2ZrUHJvcGVydHl9KSAqYDtcbiAgICAgICAgICAgIGl0ZW1zLnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGl0ZW0gJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaXRlbS50ZXh0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBpdGVtICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaXNPdXRnb2luZyA/IGl0ZW0udGV4dCA6ICcqIHJldmVyc2Ugb2Y6ICcgKyBpdGVtLnRleHQgKyAnKidcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIG1hcHMgdGhlIGNsYXNzIHRvIHRoZSBjb3JyZXNwb25kaW5nIG1vZGVsIChkYXRhYmFzZSB0YWJsZSlcbiAgICogdGhpcyBpcyB1c2VkIGJ5IEZvcm1zIHRvIGNyZWF0ZSBuZXcgZGF0YSBpbiB0aGUgc2hhcGUgb2ZcbiAgICogdGhlIGRhdGEgbW9kZWxcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUYWJsZU5hbWVPZkNsYXNzKHRhcmdldENsYXNzUGs6IG51bWJlcik6IE9ic2VydmFibGU8VGFibGVOYW1lPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLFxuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkodGFyZ2V0Q2xhc3NQaylcbiAgICApLnBpcGUoXG4gICAgICBmaWx0ZXIoaSA9PiAhaS5pbmNsdWRlcyh1bmRlZmluZWQpKSxcbiAgICAgIG1hcCgoW2NvbmZpZywga2xhc3NdKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZyA9IGNvbmZpZy5jbGFzc2VzW3RhcmdldENsYXNzUGtdO1xuICAgICAgICBpZiAoY2xhc3NDb25maWcgJiYgY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKSB7XG5cbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKVxuICAgICAgICAgIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuYXBwZWxsYXRpb24pIHJldHVyblxuICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbMF07XG4gICAgICAgICAgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuICdhcHBlbGxhdGlvbic7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gJ2xhbmd1YWdlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUucGxhY2UpIHJldHVybiAncGxhY2UnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS50aW1lUHJpbWl0aXZlKSByZXR1cm4gJ3RpbWVfcHJpbWl0aXZlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuICdsYW5nX3N0cmluZyc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuICdkaW1lbnNpb24nO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0IHR5cGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA4IHx8IGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwKSB7XG4gICAgICAgICAgcmV0dXJuICdwZXJzaXN0ZW50X2l0ZW0nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICd0ZW1wb3JhbF9lbnRpdHknXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIENsYXNzZXNcbiAgICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdDpcbiAgICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyBlbmFibGVkIGJ5IGNsYXNzX3Byb2pfcmVsXG4gICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgcmVxdWlyZWQgYnkgc291cmNlc1xuICAgKlxuICAgKiBUaGlzIGlzIHVzZWZ1bGwgdG8gY3JlYXRlIHNlbGVjdCBkcm9wZG93bnMgb2YgY2xhc3NlcyB1c2VycyB3aWxsIGtub3dcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzSW5FbnRpdGllc09yU291cmNlcygpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuICAgICAgdGhpcy5waXBlQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbiAgICAgIHN0YXJ0V2l0aCh7fSlcbiAgICApXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKCkge1xuICAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpXG4gICAgICAucGlwZShtYXAoYyA9PiB2YWx1ZXMoYykubWFwKGsgPT4gay5ma19jbGFzcykpKVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgICogb2YgYWxsIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhdCBsZWFzdCBvbmUgb2YgdGhlIGFjdGl2YXRlZCBwcm9maWxlc1xuICAgKiBvZiB0aHRlIGdpdmVuIHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzRW5hYmxlZEJ5UHJvamVjdFByb2ZpbGVzKCk6IE9ic2VydmFibGU8RGZoQ2xhc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmFsbCQsXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtjbGFzc2VzQnlQaywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlc01hcCA9IGluZGV4QnkoKGspID0+IGsudG9TdHJpbmcoKSwgdmFsdWVzKGVuYWJsZWRQcm9maWxlcykpXG4gICAgICAgIHJldHVybiB2YWx1ZXMoY2xhc3Nlc0J5UGspXG4gICAgICAgICAgLmZpbHRlcihrbGFzcyA9PiBrbGFzcy5wcm9maWxlcy5zb21lKHByb2ZpbGUgPT4gcHJvZmlsZXNNYXBbcHJvZmlsZS5ma19wcm9maWxlXSkpXG4gICAgICB9KVxuICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAqIG9mIGFsbCB0eXBlIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhdCBsZWFzdCBvbmUgb2YgdGhlIGFjdGl2YXRlZCBwcm9maWxlc1xuICAqIG9mIHRodGUgZ2l2ZW4gcHJvamVjdFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUNsYXNzZXNFbmFibGVkQnlQcm9qZWN0UHJvZmlsZXMoKTogT2JzZXJ2YWJsZTxEZmhDbGFzc1tdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X2Jhc2ljX3R5cGUkLmtleSgzMCksXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtjbGFzc2VzQnlQaywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlc01hcCA9IGluZGV4QnkoKGspID0+IGsudG9TdHJpbmcoKSwgdmFsdWVzKGVuYWJsZWRQcm9maWxlcykpXG4gICAgICAgIHJldHVybiB2YWx1ZXMoY2xhc3Nlc0J5UGspXG4gICAgICAgICAgLmZpbHRlcihrbGFzcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2xhc3MucHJvZmlsZXMuc29tZShwcm9maWxlID0+IHByb2ZpbGVzTWFwW3Byb2ZpbGUuZmtfcHJvZmlsZV0pICYmXG4gICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgTWFuaWZlc3RhdGlvbiBwcm9kdWN0IHR5cGUgYW5kIGxhbmd1YWdlXG4gICAgICAgICAgICAgICFbXG4gICAgICAgICAgICAgICAgRGZoQ29uZmlnLkNMQVNTX1BLX0xBTkdVQUdFLFxuICAgICAgICAgICAgICAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRVxuICAgICAgICAgICAgICBdLmluY2x1ZGVzKGtsYXNzLnBrX2NsYXNzKVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXJlIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgICogb2YgYWxsIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhY3RpdmUgcHJvamVjdCAodXNpbmcgY2xhc3NfcHJval9yZWwpXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX2NsYXNzX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlbHMpID0+IHZhbHVlcyhyZWxzKS5tYXAocmVsID0+IHJlbC5ma19jbGFzcykpXG4gICAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBUZUVuIENsYXNzZXNcbiAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTZWxlY3RlZFRlRW5DbGFzc2VzSW5Qcm9qZWN0KCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlVGVFbkNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuICAgICAgdGhpcy5waXBlVGVFbkNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4gICAgICBzdGFydFdpdGgoe30pXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYXJyYXkgb2YgcGtfY2xhc3Mgd2l0aCB0ZUVuIGNsYXNzZXMgZW5hYmxlZCBpbiBlbnRpdGllc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRlRW5DbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfY2xhc3NfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkLmtleShwa1Byb2plY3QgKyAnX3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoY3MpID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdmFsdWVzKGNzKS5tYXAoYyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShjLmZrX2NsYXNzKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoZGZoQ2xhc3NlcyA9PiB0aGlzLmZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlcykpXG4gICAgICAgICkpXG4gICAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIGFycmF5IG9mIERmaENsYXNzIGZvciBUZUVuIENsYXNzZXMgYW5kIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3NcbiAgICogQHBhcmFtIGRmaENsYXNzZXMgYXJyYXkgb2YgRGZoQ2xhc3NcbiAgICogQHJldHVybnMgcmV0dXJucyBhcnJheSBvZiBwa19jbGFzcyB3aGVyZSBjbGFzcyBpcyBUZUVuIGNsYXNzXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlczogRGZoQ2xhc3NbXSk6IG51bWJlcltdIHtcbiAgICBjb25zdCBwa3M6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZmhDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gZGZoQ2xhc3Nlc1tpXTtcbiAgICAgIGlmIChjLmJhc2ljX3R5cGUgPT09IDkpIHBrcy5wdXNoKGMucGtfY2xhc3MpO1xuICAgIH1cbiAgICByZXR1cm4gcGtzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYXJyYXkgb2YgcGtfY2xhc3Mgd2l0aCB0ZUVuIGNsYXNzZXMgcmVxdWlyZWQgYnkgc291cmNlc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRlRW5DbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGNzKSA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHZhbHVlcyhjcykubWFwKGMgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkoYy5ma19jbGFzcykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICApKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKGRmaENsYXNzZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzKVxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgICApXG4gIH1cblxuXG5cblxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUFuZFR5cGVkQ2xhc3NlcyhlbmFibGVkSW4/OiAnZW50aXRpZXMnIHwgJ3NvdXJjZXMnKTogT2JzZXJ2YWJsZTx7IHR5cGVkQ2xhc3M6IG51bWJlciwgdHlwZUNsYXNzOiBudW1iZXIgfVtdPiB7XG5cbiAgICBsZXQgcGtzJDogT2JzZXJ2YWJsZTxudW1iZXJbXT5bXTtcblxuICAgIGNvbnN0IGZyb21Tb3VyY2VzJCA9IHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcChjbGFzc2VzID0+IHZhbHVlcyhjbGFzc2VzKS5tYXAoayA9PiBrLmZrX2NsYXNzKSksXG4gICAgKVxuXG4gICAgY29uc3QgZnJvbUVudGl0aWVzJCA9IHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpXG5cbiAgICBpZiAoZW5hYmxlZEluID09PSAnc291cmNlcycpIHtcbiAgICAgIHBrcyQgPSBbZnJvbVNvdXJjZXMkXTtcbiAgICB9IGVsc2UgaWYgKGVuYWJsZWRJbiA9PT0gJ2VudGl0aWVzJykge1xuICAgICAgcGtzJCA9IFtmcm9tRW50aXRpZXMkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGtzJCA9IFtmcm9tU291cmNlcyQsIGZyb21FbnRpdGllcyRdXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QocGtzJCkucGlwZShcbiAgICAgIG1hcChhcnJheU9mUGtBcnJheXMgPT4gdW5pcShmbGF0dGVuPG51bWJlcj4oYXJyYXlPZlBrQXJyYXlzKSkpLFxuICAgICAgc3dpdGNoTWFwKHBrcyA9PiB0aGlzLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMocGtzKSlcbiAgICApXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKHBrVHlwZWRDbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8eyB0eXBlZENsYXNzOiBudW1iZXIsIHR5cGVDbGFzczogbnVtYmVyIH1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX2RvbWFpbi50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBwa1R5cGVkQ2xhc3Nlcy5tYXAocGsgPT4gKHtcbiAgICAgICAgICB0eXBlZENsYXNzOiBwayxcbiAgICAgICAgICB0eXBlQ2xhc3M6IGJ5RG9tYWluW3BrXSA/IGJ5RG9tYWluW3BrXS5oYXNfcmFuZ2UgOiB1bmRlZmluZWRcbiAgICAgICAgfSkpXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQ2xhc3NPZlR5cGVkQ2xhc3MocGtUeXBlZENsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfZG9tYWluLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIGJ5RG9tYWluW3BrVHlwZWRDbGFzc10gPyBieURvbWFpbltwa1R5cGVkQ2xhc3NdLmhhc19yYW5nZSA6IHVuZGVmaW5lZFxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyhwa1R5cGVDbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcblxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19yYW5nZS50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBwa1R5cGVDbGFzc2VzLm1hcChwayA9PiBieURvbWFpbltwa10gPyBieURvbWFpbltwa10uaGFzX2RvbWFpbiA6IHVuZGVmaW5lZClcbiAgICAgIH0pKVxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZVByb3BlcnR5T2ZUeXBlZENsYXNzKHBrVHlwZWRDbGFzcyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGVQcm9wID0gdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykuZmluZChwID0+IHAuaGFzX2RvbWFpbiA9PT0gcGtUeXBlZENsYXNzKVxuICAgICAgICByZXR1cm4gdHlwZVByb3AgPyB0eXBlUHJvcC5wa19wcm9wZXJ0eSA6IHVuZGVmaW5lZDtcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMocGtQcm9wZXJ0aWVzOiBudW1iZXJbXSwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X3BrX3Byb3BlcnR5JC5hbGwkLnBpcGUoXG4gICAgICBtYXAoeCA9PiB7XG4gICAgICAgIGlmICghcGtQcm9wZXJ0aWVzIHx8ICFwa1Byb3BlcnRpZXMubGVuZ3RoKSByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3QgcmVzID0gW11cbiAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3NlcyA9IHt9O1xuICAgICAgICBwa1Byb3BlcnRpZXMuZm9yRWFjaChwa1Byb3AgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BzID0gdmFsdWVzKHhbcGtQcm9wXSk7XG4gICAgICAgICAgcHJvcHMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldENsYXNzID0gaXNPdXRnb2luZyA/IHByb3AuaGFzX3JhbmdlIDogcHJvcC5oYXNfZG9tYWluO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXRDbGFzc2VzW3RhcmdldENsYXNzXSkge1xuICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzW3RhcmdldENsYXNzXSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlcy5wdXNoKHRhcmdldENsYXNzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5cblxuZnVuY3Rpb24gY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KGRvbWFpbkNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuXG4gIGNvbnN0IGhhc0RlZmluaXRpb246IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IGRvbWFpbkNsYXNzLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfUDE4X0hBU19ERUZJTklUSU9OLFxuICAgIGhhc19yYW5nZTogNzg1LFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ1AxOCcsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IGZhbHNlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzRGVmaW5pdGlvblxufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhhc1RpbWVTcGFuUHJvcGVydHkoZG9tYWluQ2xhc3M6IG51bWJlcikge1xuICBjb25zdCBwcm9maWxlczogUHJvZmlsZXMgPSBbXG4gICAge1xuICAgICAgcmVtb3ZlZF9mcm9tX2FwaTogZmFsc2UsXG4gICAgICBma19wcm9maWxlOiBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICAgfVxuICBdXG4gIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eSA9IHtcbiAgICBoYXNfZG9tYWluOiBkb21haW5DbGFzcyxcbiAgICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4sXG4gICAgaGFzX3JhbmdlOiBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ1A0JyxcbiAgICBpZGVudGl0eV9kZWZpbmluZzogZmFsc2UsXG4gICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuICAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbiAgICBwcm9maWxlc1xuICB9XG4gIHJldHVybiBoYXNBcHBlUHJvcFxufVxuXG5cbmZ1bmN0aW9uIGlzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyhlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdLCBwcm9maWxlczogUmVsYXRlZFByb2ZpbGVbXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gIXByb2ZpbGVzLnNvbWUocCA9PiBwLnJlbW92ZWRfZnJvbV9hcGkgPT09IGZhbHNlICYmIGVuYWJsZWRQcm9maWxlcy5pbmNsdWRlcyhwLmZrX3Byb2ZpbGUpKVxuXG59XG5cbmZ1bmN0aW9uIGdldFBsYWNlT2ZEaXNwbGF5KHNwZWNpYWxGaWVsZHM6IFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIHN1YmZpZWxkOiBTdWJmaWVsZCwgcHJvamVjdEZpZWxkQ29uZmlnPzogUHJvQ2xhc3NGaWVsZENvbmZpZyk6IEZpZWxkUGxhY2VPZkRpc3BsYXkge1xuICBsZXQgc2V0dGluZ3M6IFN5c0NvbmZpZ0ZpZWxkRGlzcGxheTtcblxuICBzZXR0aW5ncyA9IGdldFNldHRpbmdzRnJvbVN5c0NvbmZpZyhzdWJmaWVsZCwgc3BlY2lhbEZpZWxkcywgc2V0dGluZ3MpO1xuXG4gIC8vIGlmIHRoaXMgaXMgYSBzcGVjaWFsIGZpZWxkLCBjcmVhdGUgY29ycmVzcG9uZGluZyBkaXNwbGF5IHNldHRpbmdzIGFuZCByZXR1cm4gaXRcbiAgaWYgKHNldHRpbmdzKSB7XG4gICAgaWYgKHNldHRpbmdzLmRpc3BsYXlJbkJhc2ljRmllbGRzKSB7XG4gICAgICByZXR1cm4geyBiYXNpY0ZpZWxkczogeyBwb3NpdGlvbjogc2V0dGluZ3MuZGlzcGxheUluQmFzaWNGaWVsZHMucG9zaXRpb24gfSB9XG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5oaWRkZW4pIHtcbiAgICAgIHJldHVybiB7IGhpZGRlbjogdHJ1ZSB9XG4gICAgfVxuICB9XG5cbiAgLy8gb3RoZXJ3aXNlIGRpc3BsYXkgdGhlIGZpZWxkIGluIHNwZWNpZmljIGZpZWxkcyAoZGVmYXVsdClcbiAgbGV0IHBvc2l0aW9uID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICBpZiAocHJvamVjdEZpZWxkQ29uZmlnKSBwb3NpdGlvbiA9IHByb2plY3RGaWVsZENvbmZpZy5vcmRfbnVtXG4gIHJldHVybiB7IHNwZWNpZmljRmllbGRzOiB7IHBvc2l0aW9uIH0gfVxuXG59XG5mdW5jdGlvbiBnZXRTZXR0aW5nc0Zyb21TeXNDb25maWcoXG4gIHN1YmZpZWxkOiBTdWJmaWVsZCwgc3BlY2lhbEZpZWxkczogU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgc2V0dGluZ3M6IFN5c0NvbmZpZ0ZpZWxkRGlzcGxheSkge1xuICBpZiAoc3ViZmllbGQuaXNPdXRnb2luZykge1xuICAgIC8vIGdldCBzZXR0aW5ncyBieSBoYXMtdHlwZS1zdWJwcm9wZXJ0eVxuICAgIGlmIChzdWJmaWVsZC5pc0hhc1R5cGVGaWVsZCAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5oYXNUeXBlU3VicHJvcGVydGllcykge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmhhc1R5cGVTdWJwcm9wZXJ0aWVzO1xuICAgIH1cbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgc291cmNlIGNsYXNzIGFuZCBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXSAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgICAvLyBnZXQgc2VldGluZ3MgYnkgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIGdldCBzZXR0aW5ncyBieSBzb3VyY2UgY2xhc3MgYW5kIHByb3BlcnR5XG4gICAgaWYgKHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXSAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgICAvLyBnZXQgc2VldGluZ3MgYnkgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIHJldHVybiBzZXR0aW5ncztcbn1cblxuXG5cblxuXG5cbi8qKlxuICogUGlwZXMgdGhlIGZpZWxkcyBmb3IgdGVtcG9yYWwgZW50aXR5IGZvcm1zXG4gKiAtIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAqIC0gdGhlIHdoZW4gZmllbGRcbiAqIC0gaWYgYXZhaWxhYmxlOiB0aGUgdHlwZSBmaWVsZFxuICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGREZWZpbml0aW9uc0ZvclRlRW5Gb3JtKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuLy8gICByZXR1cm4gb2YoW10pXG4vLyBjb25zdCBoYXNUeXBlTGlzdERlZiQgPSB0aGlzLnBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzcylcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkRGVmaW5pdGlvbnMocGtDbGFzcylcbi8vICAgICAucGlwZShcbi8vICAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzLmZpbHRlcihmID0+IGYuYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9PT0gZmFsc2UpKVxuLy8gICAgIClcbi8vICAgLFxuLy8gICBoYXNUeXBlTGlzdERlZiQsXG4vLyApLnBpcGUoXG4vLyAgIG1hcCgoW2ZpZWxkcywgaGFzVHlwZUxpc3REZWZzXSkgPT4ge1xuLy8gICAgIGNvbnN0IHdoZW4gPSB0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOKVxuLy8gICAgIHJldHVybiBbXG4vLyAgICAgICAuLi5maWVsZHMsXG4vLyAgICAgICB3aGVuLFxuLy8gICAgICAgLi4uaGFzVHlwZUxpc3REZWZzLm1hcCgoaGFzVHlwZUxpc3REZWYpID0+IHtcbi8vICAgICAgICAgY29uc3QgdHlwZUZpZWxkOiBGaWVsZCA9IHsgLi4uaGFzVHlwZUxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2hhc1R5cGVMaXN0RGVmXSB9XG4vLyAgICAgICAgIHJldHVybiB0eXBlRmllbGQ7XG4vLyAgICAgICB9KVxuLy8gICAgIF1cbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vKipcbiAqIFBpcGUgdGhlIHNwZWNpZmljIGZpZWxkcyBvZiBnaXZlbiBjbGFzc1xuICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3BlY2lmaWNGaWVsZERlZmluaXRpb25zKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIHRydWUpLnBpcGUoXG4vLyAgICAgLy8gZmlsdGVyIG91dCB0aGUgJ2hhcyB0eXBlJyBwcm9wZXJ0eSwgc2luY2UgaXQgaXMgcGFydCBvZiB0aGUgZGVmYXVsdCBmaWVsZHNcbi8vICAgICBtYXAob3V0Z29pbmcgPT4gb3V0Z29pbmcuZmlsdGVyKG8gPT4gIW8uaXNfaGFzX3R5cGVfc3VicHJvcGVydHkpKVxuLy8gICApLFxuLy8gICB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCBmYWxzZSkucGlwZShcbi8vICAgICAvLyBmaWx0ZXIgb3V0IHRoZSAnaGFzIGFwcGVsbGF0aW9uJyBwcm9wZXJ0eSwgc2luY2UgaXQgaXMgcGFydCBvZiB0aGUgZGVmYXVsdCBmaWVsZHNcbi8vICAgICBtYXAoaW5nb2luZyA9PiBpbmdvaW5nLmZpbHRlcihpID0+XG4vLyAgICAgICBpLnBrX3Byb3BlcnR5ICE9PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSVNfQVBQRUxMQVRJT05fT0Zcbi8vICAgICAgICYmIGkucGtfcHJvcGVydHkgIT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19HRU9WUDFfSVNfUkVQUk9EVUNUSU9OX09GXG4vLyAgICAgKSlcbi8vICAgKSxcbi8vICAgdGhpcy5waXBlRmllbGRDb25maWdzKHBrQ2xhc3MpXG4vLyApLnBpcGUoXG4vLyAgIHN3aXRjaE1hcCgoW291dGdvaW5nLCBpbmdvaW5nLCBmaWVsZENvbmZpZ3NdKSA9PiB7XG5cbi8vICAgICBjb25zdCBrZXkgPSAoZmM6IFBhcnRpYWw8UHJvQ2xhc3NGaWVsZENvbmZpZz4pID0+IGAke2ZjLmZrX3Byb3BlcnR5fV8ke2ZjLmZrX2RvbWFpbl9jbGFzc31fJHtmYy5ma19yYW5nZV9jbGFzc31gO1xuLy8gICAgIGNvbnN0IGluZGV4ZWQgPSBpbmRleEJ5KChmYykgPT4gYCR7ZmMuZmtfcHJvcGVydHl9XyR7ZmMuZmtfZG9tYWluX2NsYXNzfV8ke2ZjLmZrX3JhbmdlX2NsYXNzfWAsIGZpZWxkQ29uZmlncylcbi8vICAgICBjb25zdCBnZXRGaWVsZENvbmZpZyA9IChsaXN0RGVmOiBTdWJmaWVsZCk6IFByb0NsYXNzRmllbGRDb25maWcgPT4ge1xuLy8gICAgICAgcmV0dXJuIGluZGV4ZWRba2V5KHtcbi8vICAgICAgICAgZmtfcHJvcGVydHk6IGxpc3REZWYucHJvcGVydHkucGtQcm9wZXJ0eSxcbi8vICAgICAgICAgZmtfZG9tYWluX2NsYXNzOiBsaXN0RGVmLmlzT3V0Z29pbmcgPyBsaXN0RGVmLnNvdXJjZUNsYXNzIDogbnVsbCxcbi8vICAgICAgICAgZmtfcmFuZ2VfY2xhc3M6IGxpc3REZWYuaXNPdXRnb2luZyA/IG51bGwgOiBsaXN0RGVmLnNvdXJjZUNsYXNzLFxuLy8gICAgICAgfSldXG4vLyAgICAgfVxuXG4vLyAgICAgLy8gQ3JlYXRlIGxpc3QgZGVmaW5pdGlvbnNcbi8vICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhpbmdvaW5nLCBmYWxzZSksXG4vLyAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMob3V0Z29pbmcsIHRydWUpXG4vLyAgICAgKS5waXBlKFxuLy8gICAgICAgbWFwKChbaW5nb2luZ0xpc3REZWZzLCBvdXRnb2luZ0xpc3REZWZzXSkgPT4ge1xuLy8gICAgICAgICBjb25zdCBsaXN0RGVmaW5pdGlvbnMgPSBbLi4uaW5nb2luZ0xpc3REZWZzLCAuLi5vdXRnb2luZ0xpc3REZWZzXTtcblxuLy8gICAgICAgICAvLyBDcmVhdGUgZmllbGQgZGVmaW5pdGlvbnNcbi8vICAgICAgICAgY29uc3QgZmllbGREZWZzOiB7IFtrZXk6IHN0cmluZ106IEZpZWxkIH0gPSB7fVxuLy8gICAgICAgICBsaXN0RGVmaW5pdGlvbnMuZm9yRWFjaChsaXN0RGVmID0+IHtcblxuLy8gICAgICAgICAgIGNvbnN0IGsgPSBsaXN0RGVmLnByb3BlcnR5LnBrUHJvcGVydHkgKyAnXycgKyBsaXN0RGVmLmlzT3V0Z29pbmc7XG5cbi8vICAgICAgICAgICBpZiAoIWZpZWxkRGVmc1trXSkge1xuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdID0ge1xuLy8gICAgICAgICAgICAgICAuLi5saXN0RGVmLFxuLy8gICAgICAgICAgICAgICBwbGFjZU9mRGlzcGxheToge30sXG4vLyAgICAgICAgICAgICAgIGFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICBmaWVsZENvbmZpZzogZ2V0RmllbGRDb25maWcobGlzdERlZiksXG4vLyAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uczogW2xpc3REZWZdLFxuLy8gICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzOiBbbGlzdERlZi50YXJnZXRDbGFzc11cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdLmxpc3REZWZpbml0aW9ucy5wdXNoKGxpc3REZWYpXG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10udGFyZ2V0Q2xhc3Nlcy5wdXNoKGxpc3REZWYudGFyZ2V0Q2xhc3MpXG4vLyAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgLy8gfVxuXG4vLyAgICAgICAgIH0pXG4vLyAgICAgICAgIC8vIE9yZGVyIHRoZSBmaWVsZHMgYWNjb3JkaW5nIHRvIG9yZF9udW0gKGZyb20gcHJvamVjdCdzIGNvbmZpZywga2xlaW9sYWIncyBjb25maWcpIG9yIHB1dCBpdCBhdCBlbmQgb2YgbGlzdC5cbi8vICAgICAgICAgcmV0dXJuIHNvcnQoXG4vLyAgICAgICAgICAgKGEsIGIpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnN0IGdldE9yZE51bSA9IChpdGVtOiBGaWVsZCkgPT4ge1xuLy8gICAgICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmZpZWxkQ29uZmlnKSByZXR1cm4gaXRlbS5maWVsZENvbmZpZy5vcmRfbnVtO1xuLy8gICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgY29uc3Qgb3JkTnVtQSA9IGdldE9yZE51bShhKTtcbi8vICAgICAgICAgICAgIGNvbnN0IG9yZE51bUIgPSBnZXRPcmROdW0oYik7XG4vLyAgICAgICAgICAgICByZXR1cm4gb3JkTnVtQSAtIG9yZE51bUI7XG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB2YWx1ZXMoZmllbGREZWZzKSlcbi8vICAgICAgIH0pXG4vLyAgICAgKVxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8qKlxuICogUGlwZSB0aGUgZmllbGRzIGZvciBpZGVudGlmaWNhdGlvbiBvZiBnaXZlbiBjbGFzc1xuICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRGVmYXVsdEZpZWxkRGVmaW5pdGlvbnMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cblxuLy8gLyoqXG4vLyAgKiBQaXBlIHRoZSBnZW5lcmljIGZpZWxkIGhhcyBhcHBlbGxhdGlvblxuLy8gICogd2l0aCB0aGUgZ2l2ZW4gY2xhc3MgYXMgcmFuZ2Vcbi8vICAqL1xuLy8gY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5U3RhdHVzID0ge1xuLy8gICBoYXNfZG9tYWluOiBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFLFxuLy8gICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GLFxuLy8gICBoYXNfcmFuZ2U6IHBrQ2xhc3MsXG4vLyAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuLy8gICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAwLFxuLy8gICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4vLyAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbi8vICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdoaXN0UDknLFxuLy8gICBpZGVudGl0eV9kZWZpbmluZzogdHJ1ZSxcbi8vICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuLy8gICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4vLyAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlLFxuLy8gICBwcm9maWxlczogW11cbi8vIH1cbi8vIGNvbnN0IGhhc0FwcGVMaXN0RGVmJCA9IHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhbaGFzQXBwZVByb3BdLCBmYWxzZSkucGlwZShcbi8vICAgZmlsdGVyKGxpc3REZWZzID0+ICEhbGlzdERlZnMgJiYgISFsaXN0RGVmc1swXSksXG4vLyAgIG1hcChsaXN0RGVmcyA9PiBsaXN0RGVmc1swXSlcbi8vICk7XG5cbi8vIC8qKlxuLy8gICogUGlwZSB0aGUgZ2VuZXJpYyBmaWVsZCBoYXMgdHlwZVxuLy8gICogd2l0aCB0aGUgZ2l2ZW4gY2xhc3MgYXMgcmFuZ2Vcbi8vICAqL1xuLy8gY29uc3QgaGFzVHlwZUxpc3REZWYkID0gdGhpcy5waXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3MpXG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgaGFzQXBwZUxpc3REZWYkLFxuLy8gICBoYXNUeXBlTGlzdERlZiQsXG4vLyAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoZmlsdGVyKGMgPT4gISFjKSlcbi8vICkucGlwZShcbi8vICAgbWFwKChbaGFzQXBwZUxpc3REZWYsIGhhc1R5cGVMaXN0RGVmcywga2xhc3NdKSA9PiB7XG4vLyAgICAgY29uc3QgZmllbGRzOiBGaWVsZFtdID0gW11cblxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAgKiBBZGQgJ3Nob3J0IHRpdGxlJyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gICpcbi8vICAgICAvLyAgKiBNYW5pZmVzdGF0aW9uIFByb2R1Y3QgVHlwZSDigJMgRjMsIDIxOVxuLy8gICAgIC8vICAqIE1hbmlmZXN0YXRpb24gU2luZ2xldG9uIOKAkyBGNCwgMjIwXG4vLyAgICAgLy8gICogSXRlbSDigJMgRjUsIDIyMVxuLy8gICAgIC8vICAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICAqL1xuLy8gICAgIC8vIGlmIChbXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9QUk9EVUNUX1RZUEUsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9TSU5HTEVUT04sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfSVRFTSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVF0uaW5jbHVkZXMocGtDbGFzcykpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1NIT1JUX1RJVExFKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaGFzIGFwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdFA5JyB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCBjbGFzc2VzIGV4Y2VwdCAnQXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0QzEwJywgMzY1XG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuLy8gICAgIC8vICAgY29uc3QgYXBwZUZpZWxkOiBGaWVsZCA9IHsgLi4uaGFzQXBwZUxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2hhc0FwcGVMaXN0RGVmXSB9XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaChhcHBlRmllbGQpO1xuLy8gICAgIC8vIH1cblxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaGFzVHlwZScgZmllbGRzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoaGFzVHlwZUxpc3REZWZzICYmIGhhc1R5cGVMaXN0RGVmcy5sZW5ndGggPiAwKSB7XG4vLyAgICAgLy8gICBoYXNUeXBlTGlzdERlZnMuZm9yRWFjaCgoaGFzVHlwZUxpc3REZWYpID0+IHtcbi8vICAgICAvLyAgICAgY29uc3QgdHlwZUZpZWxkOiBGaWVsZCA9IHsgLi4uaGFzVHlwZUxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2hhc1R5cGVMaXN0RGVmXSB9XG4vLyAgICAgLy8gICAgIGZpZWxkcy5wdXNoKHR5cGVGaWVsZCk7XG4vLyAgICAgLy8gICB9KVxuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2VudGl0eSBkZWZpbml0aW9uJyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIGNsYXNzZXMgZXhjZXB0ICdBcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RDMTAnLCAzNjVcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FTlRJVFlfREVGSU5JVElPTikpO1xuLy8gICAgIC8vIH1cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdpZGVudGlmaWVyIC8gZXhhY3QgcmVmZXJlbmNlIC8gdXJsIC8gLi4uJyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNUID09PSBwa0NsYXNzKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FWEFDVF9SRUZFUkVOQ0UpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdjb21tZW50JyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogTWFuaWZlc3RhdGlvbiBQcm9kdWN0IFR5cGUg4oCTIEYzLCAyMTlcbi8vICAgICAvLyAqIE1hbmlmZXN0YXRpb24gU2luZ2xldG9uIOKAkyBGNCwgMjIwXG4vLyAgICAgLy8gKiBJdGVtIOKAkyBGNSwgMjIxXG4vLyAgICAgLy8gKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAqIEV4cHJlc3Npb24gcG9ydGlvbiDigJMgZ2VvdkM1LCA1MDNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChbXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9QUk9EVUNUX1RZUEUsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9TSU5HTEVUT04sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfSVRFTSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVCxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19FWFBSRVNTSU9OX1BPUlRJT05dLmluY2x1ZGVzKHBrQ2xhc3MpKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5UKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAndGltZS1zcGFuJyBmaWVsZCB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCB0ZW1wb3JhbCBlbnRpdHkgY2xhc3Nlc1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDkpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU4pKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICByZXR1cm4gZmllbGRzXG5cbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vLyBwcml2YXRlIHBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzczogbnVtYmVyKSB7XG4vLyAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCB0cnVlKS5waXBlKFxuLy8gICAgIC8vIGNoZWNrIGlmIHRoaXMgY2xhc3MgaGFzICdoYXMgdHlwZScgc3VicHJvcGVydHlcbi8vICAgICBtYXAob3V0Z29pbmcgPT4ge1xuLy8gICAgICAgcmV0dXJuIG91dGdvaW5nLmZpbHRlcigocHJvcCkgPT4gcHJvcC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSk7XG4vLyAgICAgfSksIHN3aXRjaE1hcChoYXNUeXBlUHJvcHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoaGFzVHlwZVByb3BzLm1hcChkZmhQcm9wID0+IHtcbi8vICAgICAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoW2RmaFByb3BdLCB0cnVlKS5waXBlKGZpbHRlcihsaXN0RGVmcyA9PiAhIWxpc3REZWZzICYmICEhbGlzdERlZnNbMF0pLCBtYXAobGlzdERlZnMgPT4ge1xuLy8gICAgICAgICBjb25zdCBsaXN0RGVmID0gbGlzdERlZnNbMF07XG4vLyAgICAgICAgIGxpc3REZWYubGlzdFR5cGUgPSB7IHR5cGVJdGVtOiAndHJ1ZScgfTtcbi8vICAgICAgICAgcmV0dXJuIGxpc3REZWY7XG4vLyAgICAgICB9KSk7XG4vLyAgICAgfSkpKSk7XG4vLyB9XG5cbi8vIGdldENsYXNzRmllbGRTdWJmaWVsZChwa0NsYXNzRmllbGQ6IG51bWJlcik6IFN1YmZpZWxkIHtcbi8vICAgY29uc3QgdGVtcGxhdGUgPSB7XG4vLyAgICAgcHJvcGVydHk6IHt9LFxuLy8gICAgIHNvdXJjZUNsYXNzOiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlQ2xhc3NMYWJlbDogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldENsYXNzOiB1bmRlZmluZWQsXG4vLyAgICAgaXNPdXRnb2luZzogdW5kZWZpbmVkLFxuLy8gICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IHVuZGVmaW5lZCxcbi8vICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRNaW5RdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZU1heFF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlTWluUXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZVxuLy8gICB9XG4vLyAgIHN3aXRjaCAocGtDbGFzc0ZpZWxkKSB7XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTjpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogeyB0aW1lU3BhbjogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnV2hlbicsXG4vLyAgICAgICAgIGlzT3V0Z29pbmc6IHRydWUsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDQnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS80Jyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IDFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FTlRJVFlfREVGSU5JVElPTjpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdEZXNjcmlwdGlvbicsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVDpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5ULFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdDb21tZW50cycsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FWEFDVF9SRUZFUkVOQ0U6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnRXhhY3QgUmVmZXJlbmNlJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9TSE9SVF9USVRMRTpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdTaG9ydCBUaXRsZScsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgZGVmYXVsdDpcbi8vICAgICAgIGJyZWFrO1xuLy8gICB9XG4vLyB9XG5cbi8vIGdldENsYXNzRmllbGREZWZpbml0aW9uKHBrQ2xhc3NGaWVsZDogbnVtYmVyKTogRmllbGQge1xuLy8gICBjb25zdCBsaXN0RGVmID0gdGhpcy5nZXRDbGFzc0ZpZWxkU3ViZmllbGQocGtDbGFzc0ZpZWxkKVxuLy8gICByZXR1cm4geyAuLi5saXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtsaXN0RGVmXSB9XG4vLyB9XG5cblxuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNSZXF1aXJlZCgpIHtcbi8vICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWQkLmtleSgndHJ1ZScpXG4vLyAgICAgLnBpcGUobWFwKGMgPT4gdmFsdWVzKGMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSlcbi8vIH1cblxuXG5cbi8vIC8qKlxuLy8gICogUGlwZXMgYWxsIHRoZSBlbmFibGVkIHByb3BlcnRpZXMgb2YgYSBjbGFzc1xuLy8gICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxEZmhQcm9wZXJ0eVN0YXR1c1tdPiB7XG5cblxuLy8gICBsZXQgJDogT2JzZXJ2YWJsZTxCeVBrPERmaFByb3BlcnR5Pj5cbi8vICAgaWYgKGlzT3V0Z29pbmcpIHtcbi8vICAgICAkID0gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19kb21haW4kLmtleShwa0NsYXNzKVxuLy8gICB9XG4vLyAgIGVsc2Uge1xuLy8gICAgICQgPSB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX3JhbmdlJC5rZXkocGtDbGFzcylcbi8vICAgfVxuXG4vLyAgIC8vIGZpbHRlciBwcm9wZXJ0aWVzIHRoYXQgYXJlIGluIGF0IGxlYXN0IG9uZSBwcm9maWxlIGVuYWJsZWQgYnkgcHJvamVjdFxuLy8gICBjb25zdCBwcm9maWxlcyQgPSB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuXG5cbi8vICAgLy8gRmlsdGVyIG91dCBvbmx5IHRoZSBwcm9wZXJ0aWVzIGZvciB3aGljaCB0YXJnZXQgY2xhc3MgaXMgYWxsb3dlZFxuLy8gICByZXR1cm4gY29tYmluZUxhdGVzdCgkLCBwcm9maWxlcyQpXG4vLyAgICAgLnBpcGUoXG4vLyAgICAgICBtYXAoKFtwcm9wcywgcHJvZmlsZXNdKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHA6IERmaFByb3BlcnR5U3RhdHVzW10gPSBbXVxuXG4vLyAgICAgICAgIHZhbHVlcyhwcm9wcykuZm9yRWFjaChwcm9wID0+IHtcblxuXG4vLyAgICAgICAgICAgY29uc3QgcHJvcFByb2ZpbGVSZWwgPSBwcm9wLnByb2ZpbGVzIGFzIFByb2ZpbGVzXG5cbi8vICAgICAgICAgICBsZXQgZW5hYmxlZEluQVByb2ZpbGUgPSBmYWxzZTtcblxuLy8gICAgICAgICAgIGxldCByZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gdHJ1ZTtcblxuLy8gICAgICAgICAgIHByb3BQcm9maWxlUmVsLmZvckVhY2goaXRlbSA9PiB7XG4vLyAgICAgICAgICAgICBpZiAocHJvZmlsZXMuaW5jbHVkZXMoaXRlbS5ma19wcm9maWxlKSkge1xuLy8gICAgICAgICAgICAgICBlbmFibGVkSW5BUHJvZmlsZSA9IHRydWU7XG4vLyAgICAgICAgICAgICAgIGlmIChpdGVtLnJlbW92ZWRfZnJvbV9hcGkgPT09IGZhbHNlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IGZhbHNlXG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9KVxuXG4vLyAgICAgICAgICAgaWYgKGVuYWJsZWRJbkFQcm9maWxlKSB7XG4vLyAgICAgICAgICAgICBwLnB1c2goe1xuLy8gICAgICAgICAgICAgICAuLi5wcm9wLFxuLy8gICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfSlcblxuLy8gICAgICAgICByZXR1cm4gcFxuLy8gICAgICAgfSlcbi8vICAgICApXG5cbi8vIH1cblxuXG4vLyAvKipcbi8vICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBDbGFzc2VzXG4vLyAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0XG4vLyAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIGVuYWJsZWQgYnkgY2xhc3NfcHJval9yZWxcbi8vICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgcmVxdWlyZWQgYnkgc291cmNlcyBvciBieSBiYXNpY3Ncbi8vICAqXG4vLyAgKiB0aGlzIGlzIHVzZWZ1bGwgdG8gY2hlY2sgaWYgYSBjbGFzcyBpcyBhdmFpbGFibGUgYXQgYWxsXG4vLyAgKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzSW5FbnRpdGVzT3JSZXF1aXJlZCgpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbi8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgICAgdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4vLyAgICAgdGhpcy5waXBlQ2xhc3Nlc1JlcXVpcmVkKClcbi8vICAgKS5waXBlKFxuLy8gICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuLy8gICAgIHN0YXJ0V2l0aCh7fSlcbi8vICAgKVxuLy8gfVxuIl19