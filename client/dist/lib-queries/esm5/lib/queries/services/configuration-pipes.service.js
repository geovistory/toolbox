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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvc2VydmljZXMvY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFckgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTXhELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7O0FBTXBFLHVDQUdDOzs7SUFEQyxtREFBK0I7O0FBSWpDO0lBY0UsbUNBQ1UsQ0FBNEIsRUFDNUIsQ0FBeUI7UUFEekIsTUFBQyxHQUFELENBQUMsQ0FBMkI7UUFDNUIsTUFBQyxHQUFELENBQUMsQ0FBd0I7SUFDL0IsQ0FBQztJ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LGFBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwRyxRQUFRLEdBQUcsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMvRztRQUNELDJCQUEyQjthQUN0QixJQUFJLGFBQWEsQ0FBQyxrQkFBa0I7WUFDdkMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDaEUsUUFBUSxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNFO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcsIFByb0NvbmZpZywgU3lzQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgZGZoTGFiZWxCeUZrc0tleSwgcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXksIHRleHRQcm9wZXJ0eUJ5RmtzS2V5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBDbGFzc0NvbmZpZywgRGZoQ2xhc3MsIERmaExhYmVsLCBEZmhQcm9wZXJ0eSwgR3ZMb2FkU3ViZW50aXR5U3ViZmllbGRQYWdlUmVxLCBHdlN1YmZpZWxkVHlwZSwgSW5mTGFuZ3VhZ2UsIFByb0NsYXNzRmllbGRDb25maWcsIFByb1RleHRQcm9wZXJ0eSwgUmVsYXRlZFByb2ZpbGUsIFN5c0NvbmZpZ0ZpZWxkRGlzcGxheSwgU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgU3lzQ29uZmlnVmFsdWUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGZsYXR0ZW4sIGluZGV4QnksIHVuaXEsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkJztcbmltcG9ydCB7IEZpZWxkUGxhY2VPZkRpc3BsYXkgfSBmcm9tICcuLi9tb2RlbHMvRmllbGRQb3NpdGlvbic7XG5pbXBvcnQgeyBQcm9maWxlcyB9IGZyb20gJy4uL21vZGVscy9Qcm9maWxlcyc7XG5pbXBvcnQgeyBTcGVjaWFsRmllbGRUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL1NwZWNpYWxGaWVsZFR5cGUnO1xuaW1wb3J0IHsgU3ViZmllbGQgfSBmcm9tICcuLi9tb2RlbHMvU3ViZmllbGQnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5cbi8vIHRoaXMgaXMgdGhlXG5leHBvcnQgdHlwZSBUYWJsZU5hbWUgPSAnYXBwZWxsYXRpb24nIHwgJ2xhbmd1YWdlJyB8ICdwbGFjZScgfCAndGltZV9wcmltaXRpdmUnIHwgJ2xhbmdfc3RyaW5nJyB8ICdkaW1lbnNpb24nIHwgJ3BlcnNpc3RlbnRfaXRlbScgfCAndGVtcG9yYWxfZW50aXR5J1xuXG5leHBvcnQgaW50ZXJmYWNlIERmaFByb3BlcnR5U3RhdHVzIGV4dGVuZHMgRGZoUHJvcGVydHkge1xuICAvLyB0cnVlLCBpZiByZW1vdmVkIGZyb20gYWxsIHByb2ZpbGVzIG9mIHRoZSBjdXJyZW50IHByb2plY3RcbiAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogYm9vbGVhblxufVxuXG50eXBlIExhYmVsT3JpZ2luID0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCcgfCAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgfCAnb2Ygb250b21lIGluIGVuZ2xpc2gnXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuLyoqXG4gKiBUaGlzIFNlcnZpY2UgcHJvdmlkZXMgYSBjb2xsZWN0aW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBjb25maWd1cmF0aW9uIGRhdGEuXG4gKiBXaGVuIHRhbGtpbmcgYWJvdXQgY29uZmlndXJhdGlvbiwgd2UgbWVhbiB0aGUgY29uY2VwdHVhbCByZWZlcmVuY2UgbW9kZWwgYW5kIHRoZSBhZGRpdGlvbmFsXG4gKiBjb25maWd1cmF0aW9ucyBvbiBzeXN0ZW0gYW5kIHByb2plY3QgbGV2ZWwuXG4gKiBGb3IgRXhhbXBsZVxuICogLSB0aGUgZmllbGRzIG9mIGEgY2xhc3NcbiAqIC0gdGhlIGxhYmVscyBvZiBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGE6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICApIHsgfVxuXG5cbiAgLyoqXG4gICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19wcm9maWxlXG4gICogb2YgYWxsIHByb2ZpbGVzIHRoYXQgYXJlIGVuYWJsZWQgYnkgdGhlIGdpdmVuIHByb2plY3QuXG4gICogVGhlIGFycmF5IHdpbGwgYWx3YXlzIGluY2x1ZGUgUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgLy8gQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHB1YmxpYyBwaXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX3Byb2ZpbGVfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWQkXG4gICAgICAgIC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJykucGlwZShcbiAgICAgICAgICBtYXAocHJvamVjdFByb2ZpbGVSZWxzID0+IHZhbHVlcyhwcm9qZWN0UHJvZmlsZVJlbHMpXG4gICAgICAgICAgICAuZmlsdGVyKHJlbCA9PiByZWwuZW5hYmxlZClcbiAgICAgICAgICAgIC5tYXAocmVsID0+IHJlbC5ma19wcm9maWxlKVxuICAgICAgICAgICksXG4gICAgICAgICAgbWFwKGVuYWJsZWQgPT4gWy4uLmVuYWJsZWQsIERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNdKSxcbiAgICAgICAgKSksXG4gICAgICBzaGFyZVJlcGxheSgpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgYWxsIGZpZWxkcyBvZiBnaXZlbiBjbGFzc1xuICAgKiBUaGUgRmllbGRzIGFyZSBub3Qgb3JkZXJlZCBhbmQgbm90IGZpbHRlcmVkXG4gICAqIElmIHlvdSB3YW50IHNwZWNpZmljIHN1YnNldHMgb2YgRmllbGRzIGFuZC9vciBvcmRlcmVkIEZpZWxkcywgdXNlIHRoZSBwaXBlc1xuICAgKiB0aGF0IGJ1aWxkIG9uIHRoaXMgcGlwZS5cbiAgICovXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUZpZWxkcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIHBpcGUgc291cmNlIGNsYXNzXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKSxcbiAgICAgIC8vIHBpcGUgb3V0Z29pbmcgcHJvcGVydGllc1xuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19kb21haW4kLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBpbmdvaW5nIHByb3BlcnRpZXNcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfcmFuZ2UkLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBzeXMgY29uZmlnXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAvLyBwaXBlIGVuYWJsZWQgcHJvZmlsZXNcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpLFxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW3NvdXJjZUtsYXNzLCBvdXRnb2luZ1Byb3BzLCBpbmdvaW5nUHJvcHMsIHN5c0NvbmZpZywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuXG4gICAgICAgIGlmIChwa0NsYXNzID09PSBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBoYXMgdGltZSBzcGFuIHByb3BlcnR5XG4gICAgICAgICAgaW5nb2luZ1Byb3BzID0gW11cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIC8vIGlmIGNsYXNzIGlzIG5vdCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UsIGFkZCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UgKDExMTEpIHByb3BlcnR5XG4gICAgICAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbiAgICAgICAgICAvLyAgIGluZ29pbmdQcm9wcy5wdXNoKGNyZWF0ZUFwcGVsbGF0aW9uUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgLy8gaWYgaXMgdGVtcG9yYWwgZW50aXR5LCBhZGQgaGFzIHRpbWUgc3BhbiBwcm9wZXJ0eVxuICAgICAgICAgIGlmIChzb3VyY2VLbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4gICAgICAgICAgICBvdXRnb2luZ1Byb3BzLnB1c2goY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvdXRnb2luZ1Byb3BzLnB1c2goY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KHBrQ2xhc3MpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRnb2luZ1Byb3BzLCB0cnVlLCBlbmFibGVkUHJvZmlsZXMsIHN5c0NvbmZpZywgbm9OZXN0aW5nKSxcbiAgICAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoaW5nb2luZ1Byb3BzLCBmYWxzZSwgZW5hYmxlZFByb2ZpbGVzLCBzeXNDb25maWcsIG5vTmVzdGluZyksXG4gICAgICAgICAgdGhpcy5waXBlRmllbGRDb25maWdzKHBrQ2xhc3MpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoKFtzdWJmaWVsZHMxLCBzdWJmaWVsZHMyLCBmaWVsZENvbmZpZ3NdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWJmaWVsZHMgPSBbLi4uc3ViZmllbGRzMSwgLi4uc3ViZmllbGRzMl1cblxuICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWdJZHggPSBpbmRleEJ5KCh4KSA9PiBbXG4gICAgICAgICAgICAgICh4LmZrX2RvbWFpbl9jbGFzcyB8fCB4LmZrX3JhbmdlX2NsYXNzKSxcbiAgICAgICAgICAgICAgeC5ma19wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgISF4LmZrX2RvbWFpbl9jbGFzc1xuICAgICAgICAgICAgXS5qb2luKCdfJyksIGZpZWxkQ29uZmlncylcblxuICAgICAgICAgICAgY29uc3QgdW5pcUZpZWxkczogeyBbdWlkOiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbiAgICAgICAgICAgIGNvbnN0IHVuaXFTdWJmaWVsZENhY2hlOiB7IFt1aWQ6IHN0cmluZ106IHRydWUgfSA9IHt9XG5cblxuICAgICAgICAgICAgLy8gZ3JvdXAgYnkgc291cmNlLCBwa1Byb3BlcnR5IGFuZCBpc091dGdvaW5nXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3ViZmllbGRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkSWQgPSBbcy5zb3VyY2VDbGFzcywgcy5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBzLmlzT3V0Z29pbmddLmpvaW4oJ18nKVxuICAgICAgICAgICAgICBjb25zdCBzdWJmaWVsZElkID0gW3Muc291cmNlQ2xhc3MsIHMucHJvcGVydHkucGtQcm9wZXJ0eSwgcy5pc091dGdvaW5nLCBzLnRhcmdldENsYXNzXS5qb2luKCdfJylcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWc6IFByb0NsYXNzRmllbGRDb25maWcgfCB1bmRlZmluZWQgPSBmaWVsZENvbmZpZ0lkeFtmaWVsZElkXTtcbiAgICAgICAgICAgICAgLy8gdGhlIGZpcnN0IHRpbWUgdGhlIGdyb3VwIGlzIGVzdGFibGlzaGVkXG4gICAgICAgICAgICAgIGlmICghdW5pcUZpZWxkc1tmaWVsZElkXSkge1xuICAgICAgICAgICAgICAgIGxldCBpc1NwZWNpYWxGaWVsZDogU3BlY2lhbEZpZWxkVHlwZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSGFzVHlwZUZpZWxkKSBpc1NwZWNpYWxGaWVsZCA9ICdoYXMtdHlwZSc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTikgaXNTcGVjaWFsRmllbGQgPSAndGltZS1zcGFuJztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdID0ge1xuICAgICAgICAgICAgICAgICAgc291cmNlQ2xhc3M6IHMuc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsOiBzLnNvdXJjZUNsYXNzTGFiZWwsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eTogcy5zb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZU1pblF1YW50aXR5OiBzLnNvdXJjZU1pblF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHMudGFyZ2V0TWluUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogcy50YXJnZXRNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBzLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgaXNIYXNUeXBlRmllbGQ6IHMuaXNIYXNUeXBlRmllbGQsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcy5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHMuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZSxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvTGFiZWw6IHMub250b0luZm9MYWJlbCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvVXJsOiBzLm9udG9JbmZvVXJsLFxuICAgICAgICAgICAgICAgICAgYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlczogcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW3MudGFyZ2V0Q2xhc3NdLFxuICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb25zOiBbc10sXG4gICAgICAgICAgICAgICAgICBmaWVsZENvbmZpZyxcbiAgICAgICAgICAgICAgICAgIHBsYWNlT2ZEaXNwbGF5OiBnZXRQbGFjZU9mRGlzcGxheShzeXNDb25maWcuc3BlY2lhbEZpZWxkcywgcywgZmllbGRDb25maWcpLFxuICAgICAgICAgICAgICAgICAgaXNTcGVjaWFsRmllbGRcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtYXJrIHN1YmZpZWxkIGFzIGFkZGVkXG4gICAgICAgICAgICAgICAgdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0gPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBpZ25vcmUgZHVwbGljYXRpb25zIG9mIHN1YmZpZWxkc1xuICAgICAgICAgICAgICBlbHNlIGlmICghdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0pIHtcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlID9cbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IGZhbHNlIDpcbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLnRhcmdldENsYXNzZXMucHVzaChzLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0ubGlzdERlZmluaXRpb25zLnB1c2gocylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzKHVuaXFGaWVsZHMpXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIHBpcGUgYWxsIHRoZSBzcGVjaWZpYyBmaWVsZHMgb2YgYSBjbGFzcyxcbiAgICogb3JkZXJlZCBieSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcywgbm9OZXN0aW5nKS5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHNcbiAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcylcbiAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbiAtIGIucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24pXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAgKiBwaXBlIGFsbCB0aGUgYmFzaWMgZmllbGRzIG9mIGEgY2xhc3MsXG4gICAgKiBvcmRlcmVkIGJ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBiYXNpYyBmaWVsZHNcbiAgICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUJhc2ljRmllbGRzT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUZpZWxkcyhwa0NsYXNzLCBub05lc3RpbmcpLnBpcGUoXG4gICAgICBtYXAoZmllbGRzID0+IGZpZWxkc1xuICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIGJhc2ljIGZpZWxkc1xuICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzKVxuICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgYmFzaWMgZmllbGRzXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzLnBvc2l0aW9uIC0gYi5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcy5wb3NpdGlvbilcbiAgICAgIClcbiAgICApXG4gIH1cblxuXG5cblxuICAvKipcbiAgICAgKiBQaXBlcyB0aGUgZmllbGRzIGZvciB0ZW1wb3JhbCBlbnRpdHkgZm9ybXNcbiAgICAgKiAtIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgKiAtIHRoZSB3aGVuIGZpZWxkXG4gICAgICogLSBpZiBhdmFpbGFibGU6IHRoZSB0eXBlIGZpZWxkXG4gICAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlRmllbGRzRm9yVGVFbkZvcm0ocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcywgbm9OZXN0aW5nKS5waXBlKFxuICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgIG1hcChhbGxGaWVsZHMgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZHMgPSBhbGxGaWVsZHNcbiAgICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMpXG4gICAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uIC0gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbilcblxuICAgICAgICBjb25zdCB3aGVuRmllbGQgPSBhbGxGaWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTilcbiAgICAgICAgaWYgKHdoZW5GaWVsZCkgZmllbGRzLnB1c2god2hlbkZpZWxkKVxuXG4gICAgICAgIGNvbnN0IHR5cGVGaWVsZCA9IGFsbEZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlzSGFzVHlwZUZpZWxkKVxuICAgICAgICBpZiAodHlwZUZpZWxkKSBmaWVsZHMucHVzaCh0eXBlRmllbGQpXG5cbiAgICAgICAgcmV0dXJuIGZpZWxkcztcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG5cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgZmllbGRzIG9mIGdpdmVuIGNsYXNzIGluIHRoaXMgb3JkZXI6XG4gICAqIC0gYmFzaWMgZmllbGRzXG4gICAqIC0gc3BlY2lmaWMgZmllbGRzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzcywgbm9OZXN0aW5nKSxcbiAgICAgIHRoaXMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZylcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbYSwgYl0pID0+IFsuLi5hLCAuLi5iXSlcbiAgICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGVzIHRoZSBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3MgaW4gdGhpcyBvcmRlcjpcbiAgKiAtIHNwZWNpZmljIGZpZWxkc1xuICAqIC0gYmFzaWMgZmllbGRzXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZyksXG4gICAgICB0aGlzLnBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzcywgbm9OZXN0aW5nKSxcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbYSwgYl0pID0+IFsuLi5hLCAuLi5iXSlcbiAgICAgIClcbiAgfVxuXG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoXG4gICAgcHJvcGVydGllczogRGZoUHJvcGVydHlbXSxcbiAgICBpc091dGdvaW5nOiBib29sZWFuLFxuICAgIGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sXG4gICAgc3lzQ29uZmlnOiBTeXNDb25maWdWYWx1ZSxcbiAgICBub05lc3RpbmcgPSBmYWxzZVxuICApOiBPYnNlcnZhYmxlPFN1YmZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICBwcm9wZXJ0aWVzLm1hcChwID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZVN1YmZpZWxkKGlzT3V0Z29pbmcsIHAsIHN5c0NvbmZpZywgZW5hYmxlZFByb2ZpbGVzLCBub05lc3RpbmcpO1xuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVTdWJmaWVsZElkVG9TdWJmaWVsZChzb3VyY2VDbGFzczogbnVtYmVyLCBwcm9wZXJ0eTogbnVtYmVyLCB0YXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8U3ViZmllbGQ+IHtcbiAgICBjb25zdCBkb21haW4gPSBpc091dGdvaW5nID8gc291cmNlQ2xhc3MgOiB0YXJnZXRDbGFzcztcbiAgICBjb25zdCByYW5nZSA9IGlzT3V0Z29pbmcgPyB0YXJnZXRDbGFzcyA6IHNvdXJjZUNsYXNzO1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLnBrX3Byb3BlcnR5X19oYXNfZG9tYWluX19oYXNfcmFuZ2UkLmtleShbcHJvcGVydHksIGRvbWFpbiwgcmFuZ2VdLmpvaW4oJ18nKSlcbiAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4ge1xuICAgICAgICAgIHJldHVybiAhIXhcbiAgICAgICAgfSkpLFxuICAgICAgdGhpcy5zLnN5cyQuY29uZmlnJC5tYWluJC5waXBlKGZpbHRlcih4ID0+IHtcbiAgICAgICAgcmV0dXJuICEheFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCkucGlwZShmaWx0ZXIoeCA9PiB7XG4gICAgICAgIHJldHVybiAhIXhcbiAgICAgIH0pKSxcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtkZmhQcm9wLCBzeXNDb25mLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB0aGlzLnBpcGVTdWJmaWVsZChcbiAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgZGZoUHJvcCxcbiAgICAgICAgc3lzQ29uZixcbiAgICAgICAgZW5hYmxlZFByb2ZpbGVzLFxuICAgICAgICBub05lc3RpbmdcbiAgICAgICkpXG4gICAgKVxuICB9XG5cblxuICBwcml2YXRlIHBpcGVTdWJmaWVsZChcbiAgICBpc091dGdvaW5nOiBib29sZWFuLFxuICAgIHA6IERmaFByb3BlcnR5LFxuICAgIHN5c0NvbmZpZzogU3lzQ29uZmlnVmFsdWUsXG4gICAgZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSxcbiAgICBub05lc3RpbmcgPSBmYWxzZVxuICApOiBPYnNlcnZhYmxlPFN1YmZpZWxkPiB7XG4gICAgY29uc3QgbyA9IGlzT3V0Z29pbmc7XG4gICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBvID8gcC5oYXNfcmFuZ2UgOiBwLmhhc19kb21haW47XG4gICAgY29uc3Qgc291cmNlQ2xhc3MgPSBvID8gcC5oYXNfZG9tYWluIDogcC5oYXNfcmFuZ2U7XG4gICAgY29uc3QgdGFyZ2V0TWF4UXVhbnRpdHkgPSBvID9cbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyIDpcbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjtcbiAgICBjb25zdCBzb3VyY2VNYXhRdWFudGl0eSA9IG8gP1xuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyIDpcbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyO1xuICAgIGNvbnN0IHRhcmdldE1pblF1YW50aXR5ID0gbyA/XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllciA6XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI7XG4gICAgY29uc3Qgc291cmNlTWluUXVhbnRpdHkgPSBvID9cbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllciA6XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjtcblxuICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIHdhbnRlZDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUNsYXNzTGFiZWwoc291cmNlQ2xhc3MpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCBzb3VyY2VDbGFzc0xhYmVsOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcblxuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlQ2xhc3NMYWJlbCh0YXJnZXRDbGFzcykucGlwZSh0YXAoeCA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIGZvdW5kIHRhcmdldENsYXNzTGFiZWw6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuXG4gICAgICAgIHJldHVybiB4XG4gICAgICB9KSksXG4gICAgICB0aGlzLnBpcGVTdWJmaWVsZFR5cGVPZkNsYXNzKHN5c0NvbmZpZywgdGFyZ2V0Q2xhc3MsIHRhcmdldE1heFF1YW50aXR5LCBwLnBrX3Byb3BlcnR5LCBub05lc3RpbmcpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCBzdWJmaWVsZFR5cGU6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlRmllbGRMYWJlbChwLnBrX3Byb3BlcnR5LCBpc091dGdvaW5nID8gcC5oYXNfZG9tYWluIDogbnVsbCwgaXNPdXRnb2luZyA/IG51bGwgOiBwLmhhc19yYW5nZSkucGlwZSh0YXAoeCA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIGZvdW5kIGZpZWxkTGFiZWw6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgIClcbiAgICAgIC5waXBlKG1hcCgoW3NvdXJjZUNsYXNzTGFiZWwsIHRhcmdldENsYXNzTGFiZWwsIGxpc3RUeXBlLCBsYWJlbF1cbiAgICAgICkgPT4ge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIGZvdW5kOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcblxuICAgICAgICBjb25zdCBub2RlOiBTdWJmaWVsZCA9IHtcbiAgICAgICAgICBsaXN0VHlwZSxcbiAgICAgICAgICBzb3VyY2VDbGFzcyxcbiAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsLFxuICAgICAgICAgIHNvdXJjZU1heFF1YW50aXR5LFxuICAgICAgICAgIHNvdXJjZU1pblF1YW50aXR5LFxuICAgICAgICAgIHRhcmdldENsYXNzLFxuICAgICAgICAgIHRhcmdldENsYXNzTGFiZWwsXG4gICAgICAgICAgdGFyZ2V0TWluUXVhbnRpdHksXG4gICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHksXG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgaXNIYXNUeXBlRmllbGQ6IG8gJiYgcC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSxcbiAgICAgICAgICBwcm9wZXJ0eTogeyBwa1Byb3BlcnR5OiBwLnBrX3Byb3BlcnR5IH0sXG4gICAgICAgICAgaXNPdXRnb2luZzogbyxcbiAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiBvID8gcC5pZGVudGl0eV9kZWZpbmluZyA6IGZhbHNlLFxuICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IG8gPyBmYWxzZSA6IHAuaWRlbnRpdHlfZGVmaW5pbmcsXG4gICAgICAgICAgb250b0luZm9MYWJlbDogcC5pZGVudGlmaWVyX2luX25hbWVzcGFjZSxcbiAgICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8nICsgcC5wa19wcm9wZXJ0eSxcbiAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBpc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMoZW5hYmxlZFByb2ZpbGVzLCAocC5wcm9maWxlcyB8fCBbXSkpLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgdHlwZSBvZiBTdWJmaWVsZCBmb3IgYSBnaXZlbiBjbGFzc1xuICAgKlxuICAgKiBDdXJyZW50bHkgKHRvIGJlIHJldmlzZWQgaWYgZ29vZCkgc3VibGNhc3NlcyBvZiBFNTUgVHlwZSxcbiAgICogdGhhdCBhcmUgdGhlIHRhcmdldCBvZiBhIGZpZWxkIHdpdGggdGFyZ2V0TWF4UWFudGl0eT0xLFxuICAgKiBnZXQgU3ViZmllbGQgdHlwZSAnaGFzVHlwZScuXG4gICAqIFRoZXJlZm9yZSB0YXJnZXRNYXhRdWFudGl0eSBpcyBuZWVkZWQuXG4gICAqXG4gICAqIElmIHdlIGFyZSBuZXN0aW5nIHN1YmZpZWxkcywgd2UnbGwgZW5kIHVwIHdpdGggY2lyY3VsYXIgZmllbGRzLlxuICAgKiBFLmcuOiBQZXJzb24gMjEgLT4gaGFzIGFwcGVsbGF0aW9uIDExMTEgLT4gQXBwZVRlRW4gMzY1IC0+IGlzIGFwcGVsbGF0aW9uIG9mIDExMTEgLT4gUGVyc29uIDIxXG4gICAqIEluIG9yZGVyIHRvIGRldGVjdCB0aGVtLCB3ZSBjYW4gYWRkaXRpb25hbGx5IHBhc3MgaW4gdGhlIHBhcmVudCBwcm9wZXJ0eS5cbiAgICpcbiAgICogVGhpcyBiZWhhdmlvciBoYXMgdG8gYmUgcmV2aXNlZCwgYmVjYXVzZSBpdCBjYW4gbGVhZCB0byBwcm9ibGVtc1xuICAgKiB3aGVuIHRoZSBTdWJmaWVsZCBiZWxvbmdzIHRvIGEgRmllbGQgd2l0aCBtdWx0aXBsZSB0YXJnZXQgY2xhc3Nlc1xuICAgKiAoYW5kIHRodXMgU3ViZmllbGRzKSBiZWNhdXNlIHRoZSBVSSB0aGVuIGRvZXMgbm90IGFsbG93IHRvIGNob29zZVxuICAgKiB0aGUgcmlnaHQgdGFyZ2V0IGNsYXNzLlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVN1YmZpZWxkVHlwZU9mQ2xhc3MoY29uZmlnOiBTeXNDb25maWdWYWx1ZSwgcGtDbGFzczogbnVtYmVyLCB0YXJnZXRNYXhRdWFudGl0eTogbnVtYmVyLCBwYXJlbnRQcm9wZXJ0eT86IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEd2U3ViZmllbGRUeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoXG4gICAgICBmaWx0ZXIoaSA9PiAhIWkpLFxuICAgICAgc3dpdGNoTWFwKChrbGFzcykgPT4gdGhpcy5waXBlU3ViZmllbGRUeXBlKGNvbmZpZywga2xhc3MsIHRhcmdldE1heFF1YW50aXR5LCBwYXJlbnRQcm9wZXJ0eSwgbm9OZXN0aW5nKSlcbiAgICApXG4gIH1cblxuXG4gIHBpcGVTdWJmaWVsZFR5cGUoY29uZmlnOiBTeXNDb25maWdWYWx1ZSwga2xhc3M6IERmaENsYXNzLCB0YXJnZXRNYXhRdWFudGl0eTogbnVtYmVyLCBwYXJlbnRQcm9wZXJ0eT86IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEd2U3ViZmllbGRUeXBlPiB7XG5cbiAgICBjb25zdCByZXMgPSAoeDogR3ZTdWJmaWVsZFR5cGUpID0+IG5ldyBCZWhhdmlvclN1YmplY3QoeClcbiAgICBsZXQgY2xhc3NDb25maWc6IENsYXNzQ29uZmlnXG4gICAgaWYgKGNvbmZpZykgY2xhc3NDb25maWcgPSBjb25maWcuY2xhc3Nlc1trbGFzcy5wa19jbGFzc107XG4gICAgaWYgKGNsYXNzQ29uZmlnICYmIGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSkge1xuICAgICAgcmV0dXJuIHJlcyhjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpXG4gICAgfVxuXG5cbiAgICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSAzMCAmJiB0YXJnZXRNYXhRdWFudGl0eSA9PSAxKSB7XG4gICAgICByZXR1cm4gcmVzKHsgdHlwZUl0ZW06ICd0cnVlJyB9KVxuICAgIH1cbiAgICAvLyBUT0RPIGFkZCB0aGlzIHRvIHN5c0NvbmZpZ1ZhbHVlXG4gICAgZWxzZSBpZiAoa2xhc3MucGtfY2xhc3MgPT09IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4pIHtcbiAgICAgIHJldHVybiByZXMoeyB0aW1lU3BhbjogJ3RydWUnIH0pXG4gICAgfVxuICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDggfHwga2xhc3MuYmFzaWNfdHlwZSA9PT0gMzAgfHwgbm9OZXN0aW5nKSB7XG4gICAgICByZXR1cm4gcmVzKHsgZW50aXR5UHJldmlldzogJ3RydWUnIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gcGlwZSB0aGUgc3ViZmllbGRzIG9mIHRoZSB0ZW1wb3JhbEVudGl0eSBjbGFzc1xuICAgICAgY29uc3Qgbm9OZXN0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKGtsYXNzLnBrX2NsYXNzLCBub05lc3QpLnBpcGUoXG4gICAgICAgIG1hcChmaWVsZHMgPT4ge1xuICAgICAgICAgIGNvbnN0IHN1YmVudGl0eVN1YmZpZWxkUGFnZTogR3ZMb2FkU3ViZW50aXR5U3ViZmllbGRQYWdlUmVxW10gPSBbXVxuICAgICAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgICAgICAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICAgICAgICAgIGZvciAoY29uc3Qgc3ViZmllbGQgb2YgZmllbGQubGlzdERlZmluaXRpb25zKSB7XG4gICAgICAgICAgICAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG4gICAgICAgICAgICAgIGxldCBuZXN0ZWRTdWJmaWVsZFR5cGU6IEd2U3ViZmllbGRUeXBlID0geyBlbnRpdHlQcmV2aWV3OiAndHJ1ZScgfTtcbiAgICAgICAgICAgICAgaWYgKCFzdWJmaWVsZC5saXN0VHlwZS50ZW1wb3JhbEVudGl0eSkgbmVzdGVkU3ViZmllbGRUeXBlID0gc3ViZmllbGQubGlzdFR5cGU7XG4gICAgICAgICAgICAgIGxldCBpc0NpcmN1bGFyID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBwYXJlbnRQcm9wZXJ0eSAmJlxuICAgICAgICAgICAgICAgIHN1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHkgPT0gcGFyZW50UHJvcGVydHkgJiZcbiAgICAgICAgICAgICAgICBzdWJmaWVsZC50YXJnZXRNYXhRdWFudGl0eSA9PT0gMVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpc0NpcmN1bGFyID0gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IG5lc3RlZFBhZ2U6IEd2TG9hZFN1YmVudGl0eVN1YmZpZWxkUGFnZVJlcSA9IHtcbiAgICAgICAgICAgICAgICBzdWJmaWVsZFR5cGU6IG5lc3RlZFN1YmZpZWxkVHlwZSxcbiAgICAgICAgICAgICAgICBwYWdlOiB7XG4gICAgICAgICAgICAgICAgICBma1Byb3BlcnR5OiBzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogc3ViZmllbGQuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHN1YmZpZWxkLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgICAgaXNDaXJjdWxhclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdWJlbnRpdHlTdWJmaWVsZFBhZ2UucHVzaChuZXN0ZWRQYWdlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyB0ZW1wb3JhbEVudGl0eTogc3ViZW50aXR5U3ViZmllbGRQYWdlIH1cbiAgICAgICAgfSksXG5cbiAgICAgIClcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXRzIGNsYXNzIGZpZWxkIGNvbmZpZ3Mgb2YgZ2l2ZW4gcGtDbGFzc1xuICAgKlxuICAgKiAtIG9mIGFjdGl2ZSBwcm9qZWN0LCBpZiBhbnksIGVsc2VcbiAgICogLSBvZiBkZWZhdWx0IGNvbmZpZyBwcm9qZWN0LCBlbHNlXG4gICAqIC0gZW1wdHkgYXJyYXlcbiAgICpcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZENvbmZpZ3MocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxQcm9DbGFzc0ZpZWxkQ29uZmlnW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZmtQcm9qZWN0KSA9PiB7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdGtleSA9IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5KHtcbiAgICAgICAgICBma19jbGFzc19mb3JfY2xhc3NfZmllbGQ6IHBrQ2xhc3MsXG4gICAgICAgICAgZmtfcHJvamVjdDogZmtQcm9qZWN0XG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0a2V5ID0gcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXkoe1xuICAgICAgICAgIGZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZDogcGtDbGFzcyxcbiAgICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNUXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucy5wcm8kLmNsYXNzX2ZpZWxkX2NvbmZpZyQuYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkLmtleShhY3RpdmVQcm9qZWN0a2V5KSxcbiAgICAgICAgICB0aGlzLnMucHJvJC5jbGFzc19maWVsZF9jb25maWckLmJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJC5rZXkoZGVmYXVsdFByb2plY3RrZXkpXG4gICAgICAgIClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCgoW2FjdGl2ZVByb2plY3RGaWVsZHMsIGRlZmF1bHRQcm9qZWN0RmllbGRzXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWN0aXZlUHJvamVjdEZpZWxkcyAmJiB2YWx1ZXMoYWN0aXZlUHJvamVjdEZpZWxkcykubGVuZ3RoKSByZXR1cm4gYWN0aXZlUHJvamVjdEZpZWxkcztcblxuICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFByb2plY3RGaWVsZHNcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChpdGVtcykgPT4gdmFsdWVzKGl0ZW1zKS5zb3J0KChhLCBiKSA9PiAoYS5vcmRfbnVtID4gYi5vcmRfbnVtID8gMSA6IC0xKSkpLFxuICAgICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBjbGFzcyBsYWJlbCBmb3IgYWN0aXZlIHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc0xhYmVsKHBrQ2xhc3M/OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKHsgcGtDbGFzcywgZmtQcm9qZWN0LCBsYW5ndWFnZSwgdHlwZTogJ2xhYmVsJyB9KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBpID0gaXRlbXMuZmluZChpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICAgIHJldHVybiBpID8gaS50ZXh0IDogYCogbm8gbGFiZWwgKGlkOiAke3BrQ2xhc3N9KSAqYFxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogRGVsaXZlcnMgYXJyYXkgb2Ygb2JqZWN0cyB3aXRoXG4gICAqIHRleHQgfiB0aGUgdGV4dCBvZiB0aGUgcHJvcGVydHlcbiAgICogb3JpZ2luLCBpbiB0aGlzIG9yZGVyOlxuICAgKiAtIG9yaWdpbiA9PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnICAgICAgICAgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCcgICAgICAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgICAgICAgICAgKGZyb20gZGF0YV9mb3JfaGlzdG9yeS5sYWJlbClcbiAgICogLSBvcmlnaW4gPT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJyAgICAgICAgICAgICAgIChmcm9tIGRhdGFfZm9yX2hpc3RvcnkubGFiZWwpXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlTGFiZWxzKGQ6IHtcbiAgICBma1Byb2plY3Q6IG51bWJlcixcbiAgICB0eXBlOiAnbGFiZWwnIHwgJ2RlZmluaXRpb24nIHwgJ3Njb3BlTm90ZScsXG4gICAgbGFuZ3VhZ2U6IEluZkxhbmd1YWdlLFxuICAgIHBrQ2xhc3M/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eT86IG51bWJlcixcbiAgICBma1Byb3BlcnR5RG9tYWluPzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHlSYW5nZT86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8e1xuICAgIG9yaWdpbjogTGFiZWxPcmlnaW5cbiAgICB0ZXh0OiBzdHJpbmdcbiAgfVtdPiB7XG4gICAgbGV0IGZrX3N5c3RlbV90eXBlOiBudW1iZXI7XG5cbiAgICBpZiAoZC5wa0NsYXNzKSB7XG4gICAgICBzd2l0Y2ggKGQudHlwZSkge1xuICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgZmtfc3lzdGVtX3R5cGUgPSBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdma19zeXN0ZW1fdHlwZSBub3QgZm91bmQnKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkLmZrUHJvcGVydHkpIHtcbiAgICAgIHN3aXRjaCAoZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xhYmVsJzpcbiAgICAgICAgICBma19zeXN0ZW1fdHlwZSA9IFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUxcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZrX3N5c3RlbV90eXBlIG5vdCBmb3VuZCcpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIGxhYmVsIG9mIHByb2plY3QgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBkLmZrUHJvamVjdCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UucGtfZW50aXR5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiBkLmxhbmd1YWdlLnBrX2VudGl0eSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiAxODg4OSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgZnJvbSBvbnRvbWUgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVEZmhMYWJlbCh7XG4gICAgICAgIGxhbmd1YWdlOiBkLmxhbmd1YWdlLmlzbzYzOTEudHJpbSgpLFxuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBma19jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19wcm9wZXJ0eTogZC5ma1Byb3BlcnR5XG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIGZyb20gb250b21lIGluIGVuZ2xpc2hcbiAgICAgIHRoaXMucGlwZURmaExhYmVsKHtcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgIGZrX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX3Byb3BlcnR5OiBkLmZrUHJvcGVydHlcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIFByb1RleHRQcm9wZXJ0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb1RleHRQcm9wZXJ0eShkOiB7XG4gICAgZmtfcHJvamVjdDogbnVtYmVyLFxuICAgIGZrX3N5c3RlbV90eXBlOiBudW1iZXIsXG4gICAgZmtfbGFuZ3VhZ2U6IG51bWJlcixcbiAgICBma19kZmhfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW4/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlPzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxQcm9UZXh0UHJvcGVydHk+IHtcbiAgICBjb25zdCBrZXkgPSB0ZXh0UHJvcGVydHlCeUZrc0tleShkKVxuICAgIHJldHVybiB0aGlzLnMucHJvJC50ZXh0X3Byb3BlcnR5JC5ieV9ma3MkLmtleShrZXkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgRGZoTGFiZWxcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVEZmhMYWJlbChkOiB7XG4gICAgdHlwZTogJ2xhYmVsJyB8ICdkZWZpbml0aW9uJyB8ICdzY29wZU5vdGUnLFxuICAgIGxhbmd1YWdlOiBzdHJpbmcsXG4gICAgZmtfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfcHJvZmlsZT86IG51bWJlcixcbiAgICBma19wcm9wZXJ0eT86IG51bWJlcixcbiAgICBma19wcm9qZWN0PzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxEZmhMYWJlbD4ge1xuICAgIGNvbnN0IGtleSA9IGRmaExhYmVsQnlGa3NLZXkoZClcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQubGFiZWwkLmJ5X2ZrcyQua2V5KGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBiZXN0IGZpdHRpbmcgZmllbGQgbGFiZWwgZm9yIGFjdGl2ZSBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZExhYmVsKGZrUHJvcGVydHk6IG51bWJlciwgZmtQcm9wZXJ0eURvbWFpbjogbnVtYmVyLCBma1Byb3BlcnR5UmFuZ2U6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgaXNPdXRnb2luZyA9ICEhZmtQcm9wZXJ0eURvbWFpbjtcbiAgICAvLyBjb25zdCBzeXN0ZW1fdHlwZSA9IGlzT3V0Z29pbmcgPyAoc2luZ3VsYXIgPyAxODAgOiAxODEpIDogKHNpbmd1bGFyID8gMTgyIDogMTgzKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKFxuICAgICAgICB7XG4gICAgICAgICAgZmtQcm9qZWN0LFxuICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgZmtQcm9wZXJ0eSxcbiAgICAgICAgICBma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgIGZrUHJvcGVydHlSYW5nZVxuICAgICAgICB9XG4gICAgICApXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSBgKiBubyBsYWJlbCAoaWQ6ICR7ZmtQcm9wZXJ0eX0pICpgO1xuICAgICAgICAgICAgaXRlbXMuc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaXRlbSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpdGVtLnRleHRcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIGl0ZW0gJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpc091dGdvaW5nID8gaXRlbS50ZXh0IDogJyogcmV2ZXJzZSBvZjogJyArIGl0ZW0udGV4dCArICcqJ1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gbGFiZWxcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogbWFwcyB0aGUgY2xhc3MgdG8gdGhlIGNvcnJlc3BvbmRpbmcgbW9kZWwgKGRhdGFiYXNlIHRhYmxlKVxuICAgKiB0aGlzIGlzIHVzZWQgYnkgRm9ybXMgdG8gY3JlYXRlIG5ldyBkYXRhIGluIHRoZSBzaGFwZSBvZlxuICAgKiB0aGUgZGF0YSBtb2RlbFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRhYmxlTmFtZU9mQ2xhc3ModGFyZ2V0Q2xhc3NQazogbnVtYmVyKTogT2JzZXJ2YWJsZTxUYWJsZU5hbWU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQsXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleSh0YXJnZXRDbGFzc1BrKVxuICAgICkucGlwZShcbiAgICAgIGZpbHRlcihpID0+ICFpLmluY2x1ZGVzKHVuZGVmaW5lZCkpLFxuICAgICAgbWFwKChbY29uZmlnLCBrbGFzc10pID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3NDb25maWc6IENsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNbdGFyZ2V0Q2xhc3NQa107XG4gICAgICAgIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcblxuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpXG4gICAgICAgICAgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuXG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1swXTtcbiAgICAgICAgICBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gJ2FwcGVsbGF0aW9uJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUubGFuZ3VhZ2UpIHJldHVybiAnbGFuZ3VhZ2UnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5wbGFjZSkgcmV0dXJuICdwbGFjZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLnRpbWVQcmltaXRpdmUpIHJldHVybiAndGltZV9wcmltaXRpdmUnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gJ2xhbmdfc3RyaW5nJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gJ2RpbWVuc2lvbic7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3QgdHlwZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDggfHwga2xhc3MuYmFzaWNfdHlwZSA9PT0gMzApIHtcbiAgICAgICAgICByZXR1cm4gJ3BlcnNpc3RlbnRfaXRlbSdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJ3RlbXBvcmFsX2VudGl0eSdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuICAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0OlxuICAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIGVuYWJsZWQgYnkgY2xhc3NfcHJval9yZWxcbiAgICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZnVsbCB0byBjcmVhdGUgc2VsZWN0IGRyb3Bkb3ducyBvZiBjbGFzc2VzIHVzZXJzIHdpbGwga25vd1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNJbkVudGl0aWVzT3JTb3VyY2VzKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuICAgICAgc3RhcnRXaXRoKHt9KVxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJylcbiAgICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICAqIG9mIHRodGUgZ2l2ZW4gcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNFbmFibGVkQnlQcm9qZWN0UHJvZmlsZXMoKTogT2JzZXJ2YWJsZTxEZmhDbGFzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQuYWxsJCxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IGtsYXNzLnByb2ZpbGVzLnNvbWUocHJvZmlsZSA9PiBwcm9maWxlc01hcFtwcm9maWxlLmZrX3Byb2ZpbGVdKSlcbiAgICAgIH0pXG4gICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICogb2YgYWxsIHR5cGUgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICogb2YgdGh0ZSBnaXZlbiBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQ2xhc3Nlc0VuYWJsZWRCeVByb2plY3RQcm9maWxlcygpOiBPYnNlcnZhYmxlPERmaENsYXNzW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfYmFzaWNfdHlwZSQua2V5KDMwKSxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrbGFzcy5wcm9maWxlcy5zb21lKHByb2ZpbGUgPT4gcHJvZmlsZXNNYXBbcHJvZmlsZS5ma19wcm9maWxlXSkgJiZcbiAgICAgICAgICAgICAgLy8gRXhjbHVkZSBNYW5pZmVzdGF0aW9uIHByb2R1Y3QgdHlwZSBhbmQgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgIVtcbiAgICAgICAgICAgICAgICBEZmhDb25maWcuQ0xBU1NfUEtfTEFOR1VBR0UsXG4gICAgICAgICAgICAgICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFXG4gICAgICAgICAgICAgIF0uaW5jbHVkZXMoa2xhc3MucGtfY2xhc3MpXG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlcmUgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGFjdGl2ZSBwcm9qZWN0ICh1c2luZyBjbGFzc19wcm9qX3JlbClcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfY2xhc3NfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkLmtleShwa1Byb2plY3QgKyAnX3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVscykgPT4gdmFsdWVzKHJlbHMpLm1hcChyZWwgPT4gcmVsLmZrX2NsYXNzKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIFRlRW4gQ2xhc3Nlc1xuICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNlbGVjdGVkVGVFbkNsYXNzZXNJblByb2plY3QoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbiAgICAgIHN0YXJ0V2l0aCh7fSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyBlbmFibGVkIGluIGVudGl0aWVzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9jbGFzc19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChjcykgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB2YWx1ZXMoY3MpLm1hcChjID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KGMuZmtfY2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChkZmhDbGFzc2VzID0+IHRoaXMuZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzKSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgYXJyYXkgb2YgRGZoQ2xhc3MgZm9yIFRlRW4gQ2xhc3NlcyBhbmQgcmV0dXJucyBhcnJheSBvZiBwa19jbGFzc1xuICAgKiBAcGFyYW0gZGZoQ2xhc3NlcyBhcnJheSBvZiBEZmhDbGFzc1xuICAgKiBAcmV0dXJucyByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzIHdoZXJlIGNsYXNzIGlzIFRlRW4gY2xhc3NcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzOiBEZmhDbGFzc1tdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHBrczogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRmaENsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSBkZmhDbGFzc2VzW2ldO1xuICAgICAgaWYgKGMuYmFzaWNfdHlwZSA9PT0gOSkgcGtzLnB1c2goYy5wa19jbGFzcyk7XG4gICAgfVxuICAgIHJldHVybiBwa3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoY3MpID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdmFsdWVzKGNzKS5tYXAoYyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShjLmZrX2NsYXNzKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoZGZoQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXMpXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgfVxuXG5cblxuXG5cblxuICAvKipcbiAgICpcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzKGVuYWJsZWRJbj86ICdlbnRpdGllcycgfCAnc291cmNlcycpOiBPYnNlcnZhYmxlPHsgdHlwZWRDbGFzczogbnVtYmVyLCB0eXBlQ2xhc3M6IG51bWJlciB9W10+IHtcblxuICAgIGxldCBwa3MkOiBPYnNlcnZhYmxlPG51bWJlcltdPltdO1xuXG4gICAgY29uc3QgZnJvbVNvdXJjZXMkID0gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKGNsYXNzZXMgPT4gdmFsdWVzKGNsYXNzZXMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSxcbiAgICApXG5cbiAgICBjb25zdCBmcm9tRW50aXRpZXMkID0gdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKClcblxuICAgIGlmIChlbmFibGVkSW4gPT09ICdzb3VyY2VzJykge1xuICAgICAgcGtzJCA9IFtmcm9tU291cmNlcyRdO1xuICAgIH0gZWxzZSBpZiAoZW5hYmxlZEluID09PSAnZW50aXRpZXMnKSB7XG4gICAgICBwa3MkID0gW2Zyb21FbnRpdGllcyRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwa3MkID0gW2Zyb21Tb3VyY2VzJCwgZnJvbUVudGl0aWVzJF1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChwa3MkKS5waXBlKFxuICAgICAgbWFwKGFycmF5T2ZQa0FycmF5cyA9PiB1bmlxKGZsYXR0ZW48bnVtYmVyPihhcnJheU9mUGtBcnJheXMpKSksXG4gICAgICBzd2l0Y2hNYXAocGtzID0+IHRoaXMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3Nlcyhwa3MpKVxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMocGtUeXBlZENsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTx7IHR5cGVkQ2xhc3M6IG51bWJlciwgdHlwZUNsYXNzOiBudW1iZXIgfVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfZG9tYWluLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZWRDbGFzc2VzLm1hcChwayA9PiAoe1xuICAgICAgICAgIHR5cGVkQ2xhc3M6IHBrLFxuICAgICAgICAgIHR5cGVDbGFzczogYnlEb21haW5bcGtdID8gYnlEb21haW5bcGtdLmhhc19yYW5nZSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSlcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVDbGFzc09mVHlwZWRDbGFzcyhwa1R5cGVkQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19kb21haW4udG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gYnlEb21haW5bcGtUeXBlZENsYXNzXSA/IGJ5RG9tYWluW3BrVHlwZWRDbGFzc10uaGFzX3JhbmdlIDogdW5kZWZpbmVkXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHBrVHlwZUNsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX3JhbmdlLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZUNsYXNzZXMubWFwKHBrID0+IGJ5RG9tYWluW3BrXSA/IGJ5RG9tYWluW3BrXS5oYXNfZG9tYWluIDogdW5kZWZpbmVkKVxuICAgICAgfSkpXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlUHJvcGVydHlPZlR5cGVkQ2xhc3MocGtUeXBlZENsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgdHlwZVByb3AgPSB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKS5maW5kKHAgPT4gcC5oYXNfZG9tYWluID09PSBwa1R5cGVkQ2xhc3MpXG4gICAgICAgIHJldHVybiB0eXBlUHJvcCA/IHR5cGVQcm9wLnBrX3Byb3BlcnR5IDogdW5kZWZpbmVkO1xuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhwa1Byb3BlcnRpZXM6IG51bWJlcltdLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfcGtfcHJvcGVydHkkLmFsbCQucGlwZShcbiAgICAgIG1hcCh4ID0+IHtcbiAgICAgICAgaWYgKCFwa1Byb3BlcnRpZXMgfHwgIXBrUHJvcGVydGllcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgICAgICBjb25zdCByZXMgPSBbXVxuICAgICAgICBjb25zdCB0YXJnZXRDbGFzc2VzID0ge307XG4gICAgICAgIHBrUHJvcGVydGllcy5mb3JFYWNoKHBrUHJvcCA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcHMgPSB2YWx1ZXMoeFtwa1Byb3BdKTtcbiAgICAgICAgICBwcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBpc091dGdvaW5nID8gcHJvcC5oYXNfcmFuZ2UgOiBwcm9wLmhhc19kb21haW47XG4gICAgICAgICAgICBpZiAoIXRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdKSB7XG4gICAgICAgICAgICAgIHRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzLnB1c2godGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVIYXNEZWZpbml0aW9uUHJvcGVydHkoZG9tYWluQ2xhc3M6IG51bWJlcikge1xuICBjb25zdCBwcm9maWxlczogUHJvZmlsZXMgPSBbXG4gICAge1xuICAgICAgcmVtb3ZlZF9mcm9tX2FwaTogZmFsc2UsXG4gICAgICBma19wcm9maWxlOiBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICAgfVxuICBdXG5cbiAgY29uc3QgaGFzRGVmaW5pdGlvbjogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogZG9tYWluQ2xhc3MsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19QMThfSEFTX0RFRklOSVRJT04sXG4gICAgaGFzX3JhbmdlOiA3ODUsXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnUDE4JyxcbiAgICBpZGVudGl0eV9kZWZpbmluZzogZmFsc2UsXG4gICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuICAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbiAgICBwcm9maWxlc1xuICB9XG4gIHJldHVybiBoYXNEZWZpbml0aW9uXG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShkb21haW5DbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cbiAgY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IGRvbWFpbkNsYXNzLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTixcbiAgICBoYXNfcmFuZ2U6IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4sXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnUDQnLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiBmYWxzZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0FwcGVQcm9wXG59XG5cblxuZnVuY3Rpb24gaXNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzKGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sIHByb2ZpbGVzOiBSZWxhdGVkUHJvZmlsZVtdKTogYm9vbGVhbiB7XG4gIHJldHVybiAhcHJvZmlsZXMuc29tZShwID0+IHAucmVtb3ZlZF9mcm9tX2FwaSA9PT0gZmFsc2UgJiYgZW5hYmxlZFByb2ZpbGVzLmluY2x1ZGVzKHAuZmtfcHJvZmlsZSkpXG5cbn1cblxuZnVuY3Rpb24gZ2V0UGxhY2VPZkRpc3BsYXkoc3BlY2lhbEZpZWxkczogU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgc3ViZmllbGQ6IFN1YmZpZWxkLCBwcm9qZWN0RmllbGRDb25maWc/OiBQcm9DbGFzc0ZpZWxkQ29uZmlnKTogRmllbGRQbGFjZU9mRGlzcGxheSB7XG4gIGxldCBzZXR0aW5nczogU3lzQ29uZmlnRmllbGREaXNwbGF5O1xuXG4gIHNldHRpbmdzID0gZ2V0U2V0dGluZ3NGcm9tU3lzQ29uZmlnKHN1YmZpZWxkLCBzcGVjaWFsRmllbGRzLCBzZXR0aW5ncyk7XG5cbiAgLy8gaWYgdGhpcyBpcyBhIHNwZWNpYWwgZmllbGQsIGNyZWF0ZSBjb3JyZXNwb25kaW5nIGRpc3BsYXkgc2V0dGluZ3MgYW5kIHJldHVybiBpdFxuICBpZiAoc2V0dGluZ3MpIHtcbiAgICBpZiAoc2V0dGluZ3MuZGlzcGxheUluQmFzaWNGaWVsZHMpIHtcbiAgICAgIHJldHVybiB7IGJhc2ljRmllbGRzOiB7IHBvc2l0aW9uOiBzZXR0aW5ncy5kaXNwbGF5SW5CYXNpY0ZpZWxkcy5wb3NpdGlvbiB9IH1cbiAgICB9IGVsc2UgaWYgKHNldHRpbmdzLmhpZGRlbikge1xuICAgICAgcmV0dXJuIHsgaGlkZGVuOiB0cnVlIH1cbiAgICB9XG4gIH1cblxuICAvLyBvdGhlcndpc2UgZGlzcGxheSB0aGUgZmllbGQgaW4gc3BlY2lmaWMgZmllbGRzIChkZWZhdWx0KVxuICBsZXQgcG9zaXRpb24gPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gIGlmIChwcm9qZWN0RmllbGRDb25maWcpIHBvc2l0aW9uID0gcHJvamVjdEZpZWxkQ29uZmlnLm9yZF9udW1cbiAgcmV0dXJuIHsgc3BlY2lmaWNGaWVsZHM6IHsgcG9zaXRpb24gfSB9XG5cbn1cbmZ1bmN0aW9uIGdldFNldHRpbmdzRnJvbVN5c0NvbmZpZyhcbiAgc3ViZmllbGQ6IFN1YmZpZWxkLCBzcGVjaWFsRmllbGRzOiBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBzZXR0aW5nczogU3lzQ29uZmlnRmllbGREaXNwbGF5KSB7XG4gIGlmIChzdWJmaWVsZC5pc091dGdvaW5nKSB7XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IGhhcy10eXBlLXN1YnByb3BlcnR5XG4gICAgaWYgKHN1YmZpZWxkLmlzSGFzVHlwZUZpZWxkICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmhhc1R5cGVTdWJwcm9wZXJ0aWVzKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuaGFzVHlwZVN1YnByb3BlcnRpZXM7XG4gICAgfVxuICAgIC8vIGdldCBzZXR0aW5ncyBieSBzb3VyY2UgY2xhc3MgYW5kIHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIGdldCBzZWV0aW5ncyBieSBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IHNvdXJjZSBjbGFzcyBhbmQgcHJvcGVydHlcbiAgICBpZiAoc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIGdldCBzZWV0aW5ncyBieSBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzO1xufVxuXG5cblxuXG5cblxuLyoqXG4gKiBQaXBlcyB0aGUgZmllbGRzIGZvciB0ZW1wb3JhbCBlbnRpdHkgZm9ybXNcbiAqIC0gdGhlIHNwZWNpZmljIGZpZWxkc1xuICogLSB0aGUgd2hlbiBmaWVsZFxuICogLSBpZiBhdmFpbGFibGU6IHRoZSB0eXBlIGZpZWxkXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZERlZmluaXRpb25zRm9yVGVFbkZvcm0ocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4vLyAgIHJldHVybiBvZihbXSlcbi8vIGNvbnN0IGhhc1R5cGVMaXN0RGVmJCA9IHRoaXMucGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzKVxuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIHRoaXMucGlwZVNwZWNpZmljRmllbGREZWZpbml0aW9ucyhwa0NsYXNzKVxuLy8gICAgIC5waXBlKFxuLy8gICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHMuZmlsdGVyKGYgPT4gZi5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID09PSBmYWxzZSkpXG4vLyAgICAgKVxuLy8gICAsXG4vLyAgIGhhc1R5cGVMaXN0RGVmJCxcbi8vICkucGlwZShcbi8vICAgbWFwKChbZmllbGRzLCBoYXNUeXBlTGlzdERlZnNdKSA9PiB7XG4vLyAgICAgY29uc3Qgd2hlbiA9IHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU4pXG4vLyAgICAgcmV0dXJuIFtcbi8vICAgICAgIC4uLmZpZWxkcyxcbi8vICAgICAgIHdoZW4sXG4vLyAgICAgICAuLi5oYXNUeXBlTGlzdERlZnMubWFwKChoYXNUeXBlTGlzdERlZikgPT4ge1xuLy8gICAgICAgICBjb25zdCB0eXBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNUeXBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzVHlwZUxpc3REZWZdIH1cbi8vICAgICAgICAgcmV0dXJuIHR5cGVGaWVsZDtcbi8vICAgICAgIH0pXG4vLyAgICAgXVxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8qKlxuICogUGlwZSB0aGUgc3BlY2lmaWMgZmllbGRzIG9mIGdpdmVuIGNsYXNzXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTcGVjaWZpY0ZpZWxkRGVmaW5pdGlvbnMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgdHJ1ZSkucGlwZShcbi8vICAgICAvLyBmaWx0ZXIgb3V0IHRoZSAnaGFzIHR5cGUnIHByb3BlcnR5LCBzaW5jZSBpdCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IGZpZWxkc1xuLy8gICAgIG1hcChvdXRnb2luZyA9PiBvdXRnb2luZy5maWx0ZXIobyA9PiAhby5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSkpXG4vLyAgICksXG4vLyAgIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIGZhbHNlKS5waXBlKFxuLy8gICAgIC8vIGZpbHRlciBvdXQgdGhlICdoYXMgYXBwZWxsYXRpb24nIHByb3BlcnR5LCBzaW5jZSBpdCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IGZpZWxkc1xuLy8gICAgIG1hcChpbmdvaW5nID0+IGluZ29pbmcuZmlsdGVyKGkgPT5cbi8vICAgICAgIGkucGtfcHJvcGVydHkgIT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRlxuLy8gICAgICAgJiYgaS5wa19wcm9wZXJ0eSAhPT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0dFT1ZQMV9JU19SRVBST0RVQ1RJT05fT0Zcbi8vICAgICApKVxuLy8gICApLFxuLy8gICB0aGlzLnBpcGVGaWVsZENvbmZpZ3MocGtDbGFzcylcbi8vICkucGlwZShcbi8vICAgc3dpdGNoTWFwKChbb3V0Z29pbmcsIGluZ29pbmcsIGZpZWxkQ29uZmlnc10pID0+IHtcblxuLy8gICAgIGNvbnN0IGtleSA9IChmYzogUGFydGlhbDxQcm9DbGFzc0ZpZWxkQ29uZmlnPikgPT4gYCR7ZmMuZmtfcHJvcGVydHl9XyR7ZmMuZmtfZG9tYWluX2NsYXNzfV8ke2ZjLmZrX3JhbmdlX2NsYXNzfWA7XG4vLyAgICAgY29uc3QgaW5kZXhlZCA9IGluZGV4QnkoKGZjKSA9PiBgJHtmYy5ma19wcm9wZXJ0eX1fJHtmYy5ma19kb21haW5fY2xhc3N9XyR7ZmMuZmtfcmFuZ2VfY2xhc3N9YCwgZmllbGRDb25maWdzKVxuLy8gICAgIGNvbnN0IGdldEZpZWxkQ29uZmlnID0gKGxpc3REZWY6IFN1YmZpZWxkKTogUHJvQ2xhc3NGaWVsZENvbmZpZyA9PiB7XG4vLyAgICAgICByZXR1cm4gaW5kZXhlZFtrZXkoe1xuLy8gICAgICAgICBma19wcm9wZXJ0eTogbGlzdERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuLy8gICAgICAgICBma19kb21haW5fY2xhc3M6IGxpc3REZWYuaXNPdXRnb2luZyA/IGxpc3REZWYuc291cmNlQ2xhc3MgOiBudWxsLFxuLy8gICAgICAgICBma19yYW5nZV9jbGFzczogbGlzdERlZi5pc091dGdvaW5nID8gbnVsbCA6IGxpc3REZWYuc291cmNlQ2xhc3MsXG4vLyAgICAgICB9KV1cbi8vICAgICB9XG5cbi8vICAgICAvLyBDcmVhdGUgbGlzdCBkZWZpbml0aW9uc1xuLy8gICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKGluZ29pbmcsIGZhbHNlKSxcbi8vICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRnb2luZywgdHJ1ZSlcbi8vICAgICApLnBpcGUoXG4vLyAgICAgICBtYXAoKFtpbmdvaW5nTGlzdERlZnMsIG91dGdvaW5nTGlzdERlZnNdKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IGxpc3REZWZpbml0aW9ucyA9IFsuLi5pbmdvaW5nTGlzdERlZnMsIC4uLm91dGdvaW5nTGlzdERlZnNdO1xuXG4vLyAgICAgICAgIC8vIENyZWF0ZSBmaWVsZCBkZWZpbml0aW9uc1xuLy8gICAgICAgICBjb25zdCBmaWVsZERlZnM6IHsgW2tleTogc3RyaW5nXTogRmllbGQgfSA9IHt9XG4vLyAgICAgICAgIGxpc3REZWZpbml0aW9ucy5mb3JFYWNoKGxpc3REZWYgPT4ge1xuXG4vLyAgICAgICAgICAgY29uc3QgayA9IGxpc3REZWYucHJvcGVydHkucGtQcm9wZXJ0eSArICdfJyArIGxpc3REZWYuaXNPdXRnb2luZztcblxuLy8gICAgICAgICAgIGlmICghZmllbGREZWZzW2tdKSB7XG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10gPSB7XG4vLyAgICAgICAgICAgICAgIC4uLmxpc3REZWYsXG4vLyAgICAgICAgICAgICAgIHBsYWNlT2ZEaXNwbGF5OiB7fSxcbi8vICAgICAgICAgICAgICAgYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2UsXG4vLyAgICAgICAgICAgICAgIGZpZWxkQ29uZmlnOiBnZXRGaWVsZENvbmZpZyhsaXN0RGVmKSxcbi8vICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb25zOiBbbGlzdERlZl0sXG4vLyAgICAgICAgICAgICAgIHRhcmdldENsYXNzZXM6IFtsaXN0RGVmLnRhcmdldENsYXNzXVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10ubGlzdERlZmluaXRpb25zLnB1c2gobGlzdERlZilcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXS50YXJnZXRDbGFzc2VzLnB1c2gobGlzdERlZi50YXJnZXRDbGFzcylcbi8vICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAvLyB9XG5cbi8vICAgICAgICAgfSlcbi8vICAgICAgICAgLy8gT3JkZXIgdGhlIGZpZWxkcyBhY2NvcmRpbmcgdG8gb3JkX251bSAoZnJvbSBwcm9qZWN0J3MgY29uZmlnLCBrbGVpb2xhYidzIGNvbmZpZykgb3IgcHV0IGl0IGF0IGVuZCBvZiBsaXN0LlxuLy8gICAgICAgICByZXR1cm4gc29ydChcbi8vICAgICAgICAgICAoYSwgYikgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3QgZ2V0T3JkTnVtID0gKGl0ZW06IEZpZWxkKSA9PiB7XG4vLyAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZmllbGRDb25maWcpIHJldHVybiBpdGVtLmZpZWxkQ29uZmlnLm9yZF9udW07XG4vLyAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBjb25zdCBvcmROdW1BID0gZ2V0T3JkTnVtKGEpO1xuLy8gICAgICAgICAgICAgY29uc3Qgb3JkTnVtQiA9IGdldE9yZE51bShiKTtcbi8vICAgICAgICAgICAgIHJldHVybiBvcmROdW1BIC0gb3JkTnVtQjtcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHZhbHVlcyhmaWVsZERlZnMpKVxuLy8gICAgICAgfSlcbi8vICAgICApXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLyoqXG4gKiBQaXBlIHRoZSBmaWVsZHMgZm9yIGlkZW50aWZpY2F0aW9uIG9mIGdpdmVuIGNsYXNzXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVEZWZhdWx0RmllbGREZWZpbml0aW9ucyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuXG4vLyAvKipcbi8vICAqIFBpcGUgdGhlIGdlbmVyaWMgZmllbGQgaGFzIGFwcGVsbGF0aW9uXG4vLyAgKiB3aXRoIHRoZSBnaXZlbiBjbGFzcyBhcyByYW5nZVxuLy8gICovXG4vLyBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHlTdGF0dXMgPSB7XG4vLyAgIGhhc19kb21haW46IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UsXG4vLyAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSVNfQVBQRUxMQVRJT05fT0YsXG4vLyAgIGhhc19yYW5nZTogcGtDbGFzcyxcbi8vICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4vLyAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDAsXG4vLyAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbi8vICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuLy8gICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ2hpc3RQOScsXG4vLyAgIGlkZW50aXR5X2RlZmluaW5nOiB0cnVlLFxuLy8gICBpc19pbmhlcml0ZWQ6IHRydWUsXG4vLyAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbi8vICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2UsXG4vLyAgIHByb2ZpbGVzOiBbXVxuLy8gfVxuLy8gY29uc3QgaGFzQXBwZUxpc3REZWYkID0gdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFtoYXNBcHBlUHJvcF0sIGZhbHNlKS5waXBlKFxuLy8gICBmaWx0ZXIobGlzdERlZnMgPT4gISFsaXN0RGVmcyAmJiAhIWxpc3REZWZzWzBdKSxcbi8vICAgbWFwKGxpc3REZWZzID0+IGxpc3REZWZzWzBdKVxuLy8gKTtcblxuLy8gLyoqXG4vLyAgKiBQaXBlIHRoZSBnZW5lcmljIGZpZWxkIGhhcyB0eXBlXG4vLyAgKiB3aXRoIHRoZSBnaXZlbiBjbGFzcyBhcyByYW5nZVxuLy8gICovXG4vLyBjb25zdCBoYXNUeXBlTGlzdERlZiQgPSB0aGlzLnBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzcylcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICBoYXNBcHBlTGlzdERlZiQsXG4vLyAgIGhhc1R5cGVMaXN0RGVmJCxcbi8vICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShmaWx0ZXIoYyA9PiAhIWMpKVxuLy8gKS5waXBlKFxuLy8gICBtYXAoKFtoYXNBcHBlTGlzdERlZiwgaGFzVHlwZUxpc3REZWZzLCBrbGFzc10pID0+IHtcbi8vICAgICBjb25zdCBmaWVsZHM6IEZpZWxkW10gPSBbXVxuXG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICAqIEFkZCAnc2hvcnQgdGl0bGUnIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAgKlxuLy8gICAgIC8vICAqIE1hbmlmZXN0YXRpb24gUHJvZHVjdCBUeXBlIOKAkyBGMywgMjE5XG4vLyAgICAgLy8gICogTWFuaWZlc3RhdGlvbiBTaW5nbGV0b24g4oCTIEY0LCAyMjBcbi8vICAgICAvLyAgKiBJdGVtIOKAkyBGNSwgMjIxXG4vLyAgICAgLy8gICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gICovXG4vLyAgICAgLy8gaWYgKFtcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1NJTkdMRVRPTixcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19JVEVNLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNUXS5pbmNsdWRlcyhwa0NsYXNzKSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfU0hPUlRfVElUTEUpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdoYXMgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0UDknIHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIGNsYXNzZXMgZXhjZXB0ICdBcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RDMTAnLCAzNjVcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4vLyAgICAgLy8gICBjb25zdCBhcHBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNBcHBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzQXBwZUxpc3REZWZdIH1cbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKGFwcGVGaWVsZCk7XG4vLyAgICAgLy8gfVxuXG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdoYXNUeXBlJyBmaWVsZHNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChoYXNUeXBlTGlzdERlZnMgJiYgaGFzVHlwZUxpc3REZWZzLmxlbmd0aCA+IDApIHtcbi8vICAgICAvLyAgIGhhc1R5cGVMaXN0RGVmcy5mb3JFYWNoKChoYXNUeXBlTGlzdERlZikgPT4ge1xuLy8gICAgIC8vICAgICBjb25zdCB0eXBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNUeXBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzVHlwZUxpc3REZWZdIH1cbi8vICAgICAvLyAgICAgZmllbGRzLnB1c2godHlwZUZpZWxkKTtcbi8vICAgICAvLyAgIH0pXG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnZW50aXR5IGRlZmluaXRpb24nIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgY2xhc3NlcyBleGNlcHQgJ0FwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdEMxMCcsIDM2NVxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VOVElUWV9ERUZJTklUSU9OKSk7XG4vLyAgICAgLy8gfVxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2lkZW50aWZpZXIgLyBleGFjdCByZWZlcmVuY2UgLyB1cmwgLyAuLi4nIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1QgPT09IHBrQ2xhc3MpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VYQUNUX1JFRkVSRU5DRSkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2NvbW1lbnQnIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBNYW5pZmVzdGF0aW9uIFByb2R1Y3QgVHlwZSDigJMgRjMsIDIxOVxuLy8gICAgIC8vICogTWFuaWZlc3RhdGlvbiBTaW5nbGV0b24g4oCTIEY0LCAyMjBcbi8vICAgICAvLyAqIEl0ZW0g4oCTIEY1LCAyMjFcbi8vICAgICAvLyAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICogRXhwcmVzc2lvbiBwb3J0aW9uIOKAkyBnZW92QzUsIDUwM1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKFtcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1NJTkdMRVRPTixcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19JVEVNLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNULFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0VYUFJFU1NJT05fUE9SVElPTl0uaW5jbHVkZXMocGtDbGFzcykpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICd0aW1lLXNwYW4nIGZpZWxkIHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIHRlbXBvcmFsIGVudGl0eSBjbGFzc2VzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTikpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIHJldHVybiBmaWVsZHNcblxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8vIHByaXZhdGUgcGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzOiBudW1iZXIpIHtcbi8vICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIHRydWUpLnBpcGUoXG4vLyAgICAgLy8gY2hlY2sgaWYgdGhpcyBjbGFzcyBoYXMgJ2hhcyB0eXBlJyBzdWJwcm9wZXJ0eVxuLy8gICAgIG1hcChvdXRnb2luZyA9PiB7XG4vLyAgICAgICByZXR1cm4gb3V0Z29pbmcuZmlsdGVyKChwcm9wKSA9PiBwcm9wLmlzX2hhc190eXBlX3N1YnByb3BlcnR5KTtcbi8vICAgICB9KSwgc3dpdGNoTWFwKGhhc1R5cGVQcm9wcyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShoYXNUeXBlUHJvcHMubWFwKGRmaFByb3AgPT4ge1xuLy8gICAgICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhbZGZoUHJvcF0sIHRydWUpLnBpcGUoZmlsdGVyKGxpc3REZWZzID0+ICEhbGlzdERlZnMgJiYgISFsaXN0RGVmc1swXSksIG1hcChsaXN0RGVmcyA9PiB7XG4vLyAgICAgICAgIGNvbnN0IGxpc3REZWYgPSBsaXN0RGVmc1swXTtcbi8vICAgICAgICAgbGlzdERlZi5saXN0VHlwZSA9IHsgdHlwZUl0ZW06ICd0cnVlJyB9O1xuLy8gICAgICAgICByZXR1cm4gbGlzdERlZjtcbi8vICAgICAgIH0pKTtcbi8vICAgICB9KSkpKTtcbi8vIH1cblxuLy8gZ2V0Q2xhc3NGaWVsZFN1YmZpZWxkKHBrQ2xhc3NGaWVsZDogbnVtYmVyKTogU3ViZmllbGQge1xuLy8gICBjb25zdCB0ZW1wbGF0ZSA9IHtcbi8vICAgICBwcm9wZXJ0eToge30sXG4vLyAgICAgc291cmNlQ2xhc3M6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VDbGFzc0xhYmVsOiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0Q2xhc3M6IHVuZGVmaW5lZCxcbi8vICAgICBpc091dGdvaW5nOiB1bmRlZmluZWQsXG4vLyAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogdW5kZWZpbmVkLFxuLy8gICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRNYXhRdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldE1pblF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlTWF4UXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VNaW5RdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlXG4vLyAgIH1cbi8vICAgc3dpdGNoIChwa0NsYXNzRmllbGQpIHtcbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiB7IHRpbWVTcGFuOiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdXaGVuJyxcbi8vICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZSxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQNCcsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzQnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VOVElUWV9ERUZJTklUSU9OOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0Rlc2NyaXB0aW9uJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5UOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0NvbW1lbnRzJyxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VYQUNUX1JFRkVSRU5DRTpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdFeGFjdCBSZWZlcmVuY2UnLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1NIT1JUX1RJVExFOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ1Nob3J0IFRpdGxlJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBkZWZhdWx0OlxuLy8gICAgICAgYnJlYWs7XG4vLyAgIH1cbi8vIH1cblxuLy8gZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24ocGtDbGFzc0ZpZWxkOiBudW1iZXIpOiBGaWVsZCB7XG4vLyAgIGNvbnN0IGxpc3REZWYgPSB0aGlzLmdldENsYXNzRmllbGRTdWJmaWVsZChwa0NsYXNzRmllbGQpXG4vLyAgIHJldHVybiB7IC4uLmxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2xpc3REZWZdIH1cbi8vIH1cblxuXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc1JlcXVpcmVkKCkge1xuLy8gICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZCQua2V5KCd0cnVlJylcbi8vICAgICAucGlwZShtYXAoYyA9PiB2YWx1ZXMoYykubWFwKGsgPT4gay5ma19jbGFzcykpKVxuLy8gfVxuXG5cblxuLy8gLyoqXG4vLyAgKiBQaXBlcyBhbGwgdGhlIGVuYWJsZWQgcHJvcGVydGllcyBvZiBhIGNsYXNzXG4vLyAgKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPERmaFByb3BlcnR5U3RhdHVzW10+IHtcblxuXG4vLyAgIGxldCAkOiBPYnNlcnZhYmxlPEJ5UGs8RGZoUHJvcGVydHk+PlxuLy8gICBpZiAoaXNPdXRnb2luZykge1xuLy8gICAgICQgPSB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX2RvbWFpbiQua2V5KHBrQ2xhc3MpXG4vLyAgIH1cbi8vICAgZWxzZSB7XG4vLyAgICAgJCA9IHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfcmFuZ2UkLmtleShwa0NsYXNzKVxuLy8gICB9XG5cbi8vICAgLy8gZmlsdGVyIHByb3BlcnRpZXMgdGhhdCBhcmUgaW4gYXQgbGVhc3Qgb25lIHByb2ZpbGUgZW5hYmxlZCBieSBwcm9qZWN0XG4vLyAgIGNvbnN0IHByb2ZpbGVzJCA9IHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG5cblxuLy8gICAvLyBGaWx0ZXIgb3V0IG9ubHkgdGhlIHByb3BlcnRpZXMgZm9yIHdoaWNoIHRhcmdldCBjbGFzcyBpcyBhbGxvd2VkXG4vLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KCQsIHByb2ZpbGVzJClcbi8vICAgICAucGlwZShcbi8vICAgICAgIG1hcCgoW3Byb3BzLCBwcm9maWxlc10pID0+IHtcbi8vICAgICAgICAgY29uc3QgcDogRGZoUHJvcGVydHlTdGF0dXNbXSA9IFtdXG5cbi8vICAgICAgICAgdmFsdWVzKHByb3BzKS5mb3JFYWNoKHByb3AgPT4ge1xuXG5cbi8vICAgICAgICAgICBjb25zdCBwcm9wUHJvZmlsZVJlbCA9IHByb3AucHJvZmlsZXMgYXMgUHJvZmlsZXNcblxuLy8gICAgICAgICAgIGxldCBlbmFibGVkSW5BUHJvZmlsZSA9IGZhbHNlO1xuXG4vLyAgICAgICAgICAgbGV0IHJlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSB0cnVlO1xuXG4vLyAgICAgICAgICAgcHJvcFByb2ZpbGVSZWwuZm9yRWFjaChpdGVtID0+IHtcbi8vICAgICAgICAgICAgIGlmIChwcm9maWxlcy5pbmNsdWRlcyhpdGVtLmZrX3Byb2ZpbGUpKSB7XG4vLyAgICAgICAgICAgICAgIGVuYWJsZWRJbkFQcm9maWxlID0gdHJ1ZTtcbi8vICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmVtb3ZlZF9mcm9tX2FwaSA9PT0gZmFsc2UpIHtcbi8vICAgICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gZmFsc2Vcbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0pXG5cbi8vICAgICAgICAgICBpZiAoZW5hYmxlZEluQVByb2ZpbGUpIHtcbi8vICAgICAgICAgICAgIHAucHVzaCh7XG4vLyAgICAgICAgICAgICAgIC4uLnByb3AsXG4vLyAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9KVxuXG4vLyAgICAgICAgIHJldHVybiBwXG4vLyAgICAgICB9KVxuLy8gICAgIClcblxuLy8gfVxuXG5cbi8vIC8qKlxuLy8gICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIENsYXNzZXNcbi8vICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3Rcbi8vICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgZW5hYmxlZCBieSBjbGFzc19wcm9qX3JlbFxuLy8gICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyByZXF1aXJlZCBieSBzb3VyY2VzIG9yIGJ5IGJhc2ljc1xuLy8gICpcbi8vICAqIHRoaXMgaXMgdXNlZnVsbCB0byBjaGVjayBpZiBhIGNsYXNzIGlzIGF2YWlsYWJsZSBhdCBhbGxcbi8vICAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNJbkVudGl0ZXNPclJlcXVpcmVkKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuLy8gICByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgICB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbi8vICAgICB0aGlzLnBpcGVDbGFzc2VzUmVxdWlyZWQoKVxuLy8gICApLnBpcGUoXG4vLyAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4vLyAgICAgc3RhcnRXaXRoKHt9KVxuLy8gICApXG4vLyB9XG4iXX0=