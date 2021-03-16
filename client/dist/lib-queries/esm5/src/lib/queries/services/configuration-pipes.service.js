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
            /** @type {?} */
            var isEnabled = (/**
             * @param {?} prop
             * @return {?}
             */
            function (prop) { return enabledProfiles.some((/**
             * @param {?} enabled
             * @return {?}
             */
            function (enabled) { return prop.profiles.map((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p.fk_profile; })).includes(enabled); })); });
            /** @type {?} */
            var outP = outgoingProps.filter((/**
             * @param {?} prop
             * @return {?}
             */
            function (prop) { return isEnabled(prop); }));
            /** @type {?} */
            var inP = ingoingProps.filter((/**
             * @param {?} prop
             * @return {?}
             */
            function (prop) { return isEnabled(prop); }));
            if (pkClass === DfhConfig.ClASS_PK_TIME_SPAN) {
                // remove the has time span property
                inP = [];
            }
            else {
                // // if class is not appellation for language, add appellation for language (1111) property
                // if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
                //   ingoingProps.push(createAppellationProperty(pkClass))
                // }
                // if is temporal entity, add has time span property
                if (sourceKlass.basic_type === 9) {
                    outP.push(createHasTimeSpanProperty(pkClass));
                }
                outP.push(createHasDefinitionProperty(pkClass));
            }
            return combineLatest(_this.pipePropertiesToSubfields(outP, true, enabledProfiles, sysConfig, noNesting), _this.pipePropertiesToSubfields(inP, false, enabledProfiles, sysConfig, noNesting), _this.pipeFieldConfigs(pkClass)).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var e_1, _b, _c;
                var _d = tslib_1.__read(_a, 3), subfields1 = _d[0], subfields2 = _d[1], fieldConfigs = _d[2];
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
                        var fieldId = [s.sourceClass, s.property.fkProperty, s.isOutgoing].join('_');
                        /** @type {?} */
                        var subfieldId = [s.sourceClass, s.property.fkProperty, s.isOutgoing, s.targetClass].join('_');
                        /** @type {?} */
                        var fieldConfig = fieldConfigIdx[fieldId];
                        // the first time the group is established
                        if (!uniqFields[fieldId]) {
                            /** @type {?} */
                            var isSpecialField = false;
                            if (s.isHasTypeField)
                                isSpecialField = 'has-type';
                            else if (s.property.fkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN)
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
                                fieldConfig: fieldConfig,
                                placeOfDisplay: getPlaceOfDisplay(sysConfig.specialFields, s, fieldConfig),
                                isSpecialField: isSpecialField,
                                targets: (_c = {},
                                    _c[s.targetClass] = {
                                        listType: s.listType,
                                        removedFromAllProfiles: s.removedFromAllProfiles,
                                        targetClass: s.targetClass,
                                        targetClassLabel: s.targetClassLabel
                                    },
                                    _c)
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
                            uniqFields[fieldId].targets[s.targetClass] = {
                                listType: s.listType,
                                removedFromAllProfiles: s.removedFromAllProfiles,
                                targetClass: s.targetClass,
                                targetClassLabel: s.targetClassLabel
                            };
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
                // filter fields that are displayd in specific fields and not removed from all profiles
                .filter((/**
             * @param {?} field
             * @return {?}
             */
            function (field) { return (field.placeOfDisplay.specificFields && field.allSubfieldsRemovedFromAllProfiles === false); }))
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
            function (field) { return field.property.fkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN; }));
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
                property: { fkProperty: p.pk_property },
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
            return this.pipeSpecificAndBasicFields(klass.pk_class, noNest).pipe(map((/**
             * @param {?} fields
             * @return {?}
             */
            function (fields) {
                var e_2, _a;
                /** @type {?} */
                var subentitySubfieldPage = [];
                try {
                    for (var fields_1 = tslib_1.__values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                        var field = fields_1_1.value;
                        // for each of these subfields
                        // create page:GvSubfieldPage
                        /** @type {?} */
                        var nestedTargets = {};
                        for (var key in field.targets) {
                            if (Object.prototype.hasOwnProperty.call(field.targets, key)) {
                                /** @type {?} */
                                var listType = field.targets[key].listType;
                                // put temporalEntity to entityPreview
                                /** @type {?} */
                                var subTargetType = listType.temporalEntity ?
                                    { entityPreview: 'true' } :
                                    listType;
                                nestedTargets[key] = subTargetType;
                            }
                        }
                        /** @type {?} */
                        var isCircular = false;
                        if (parentProperty &&
                            field.property.fkProperty == parentProperty &&
                            field.targetMaxQuantity === 1) {
                            isCircular = true;
                        }
                        /** @type {?} */
                        var nestedPage = {
                            targets: nestedTargets,
                            page: {
                                property: field.property,
                                isOutgoing: field.isOutgoing,
                                limit: 1,
                                offset: 0,
                                isCircular: isCircular
                            }
                        };
                        subentitySubfieldPage.push(nestedPage);
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
            specialFields.bySourceClass[subfield.sourceClass].outgoingProperties[subfield.property.fkProperty]) {
            settings = specialFields.bySourceClass[subfield.sourceClass].outgoingProperties[subfield.property.fkProperty];
        }
        // get seetings by property
        else if (specialFields.outgoingProperties &&
            specialFields.outgoingProperties[subfield.property.fkProperty]) {
            settings = specialFields.outgoingProperties[subfield.property.fkProperty];
        }
    }
    else {
        // get settings by source class and property
        if (specialFields.bySourceClass &&
            specialFields.bySourceClass[subfield.sourceClass] &&
            specialFields.bySourceClass[subfield.sourceClass].incomingProperties &&
            specialFields.bySourceClass[subfield.sourceClass].incomingProperties[subfield.property.fkProperty]) {
            settings = specialFields.bySourceClass[subfield.sourceClass].incomingProperties[subfield.property.fkProperty];
        }
        // get seetings by property
        else if (specialFields.incomingProperties &&
            specialFields.incomingProperties[subfield.property.fkProperty]) {
            settings = specialFields.incomingProperties[subfield.property.fkProperty];
        }
    }
    return settings;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU14RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQU1wRSx1Q0FHQzs7O0lBREMsbURBQStCOztBQUlqQztJQWNFLG1DQUNVLENBQTRCLEVBQzVCLENBQXlCO1FBRHpCLE1BQUMsR0FBRCxDQUFDLENBQTJCO1FBQzVCLE1BQUMsR0FBRCxDQUFDLENBQXdCO0lBQy9CLENB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QUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3BHLFFBQVEsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQy9HO1FBQ0QsMkJBQTJCO2FBQ3RCLElBQUksYUFBYSxDQUFDLGtCQUFrQjtZQUN2QyxhQUFhLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNoRSxRQUFRLEdBQUcsYUFBYSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDM0U7S0FDRjtJQUNELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaENvbmZpZywgUHJvQ29uZmlnLCBTeXNDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBkZmhMYWJlbEJ5RmtzS2V5LCBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSwgdGV4dFByb3BlcnR5QnlGa3NLZXkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IENsYXNzQ29uZmlnLCBEZmhDbGFzcywgRGZoTGFiZWwsIERmaFByb3BlcnR5LCBHdlN1YmVudGl0RmllbGRQYWdlUmVxLCBHdlN1YmVudGl0eUZpZWxkVGFyZ2V0cywgR3ZTdWJlbnRpdHlUYXJnZXRUeXBlLCBHdlRhcmdldFR5cGUsIEluZkxhbmd1YWdlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9UZXh0UHJvcGVydHksIFJlbGF0ZWRQcm9maWxlLCBTeXNDb25maWdGaWVsZERpc3BsYXksIFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIFN5c0NvbmZpZ1ZhbHVlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3RPckVtcHR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBmbGF0dGVuLCBpbmRleEJ5LCB1bmlxLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzaGFyZVJlcGxheSwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL21vZGVscy9GaWVsZCc7XG5pbXBvcnQgeyBGaWVsZFBsYWNlT2ZEaXNwbGF5IH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkUG9zaXRpb24nO1xuaW1wb3J0IHsgUHJvZmlsZXMgfSBmcm9tICcuLi9tb2RlbHMvUHJvZmlsZXMnO1xuaW1wb3J0IHsgU3BlY2lhbEZpZWxkVHlwZSB9IGZyb20gJy4uL21vZGVscy9TcGVjaWFsRmllbGRUeXBlJztcbmltcG9ydCB7IFN1YmZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcblxuXG4vLyB0aGlzIGlzIHRoZVxuZXhwb3J0IHR5cGUgVGFibGVOYW1lID0gJ2FwcGVsbGF0aW9uJyB8ICdsYW5ndWFnZScgfCAncGxhY2UnIHwgJ3RpbWVfcHJpbWl0aXZlJyB8ICdsYW5nX3N0cmluZycgfCAnZGltZW5zaW9uJyB8ICdwZXJzaXN0ZW50X2l0ZW0nIHwgJ3RlbXBvcmFsX2VudGl0eSdcblxuZXhwb3J0IGludGVyZmFjZSBEZmhQcm9wZXJ0eVN0YXR1cyBleHRlbmRzIERmaFByb3BlcnR5IHtcbiAgLy8gdHJ1ZSwgaWYgcmVtb3ZlZCBmcm9tIGFsbCBwcm9maWxlcyBvZiB0aGUgY3VycmVudCBwcm9qZWN0XG4gIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGJvb2xlYW5cbn1cblxudHlwZSBMYWJlbE9yaWdpbiA9ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfCAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfCAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnIHwgJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIG9udG9tZSBpbiBlbmdsaXNoJ1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjdGlvbiBvZiBwaXBlcyB0aGF0IGFnZ3JlZ2F0ZSBvciB0cmFuc2Zvcm0gY29uZmlndXJhdGlvbiBkYXRhLlxuICogV2hlbiB0YWxraW5nIGFib3V0IGNvbmZpZ3VyYXRpb24sIHdlIG1lYW4gdGhlIGNvbmNlcHR1YWwgcmVmZXJlbmNlIG1vZGVsIGFuZCB0aGUgYWRkaXRpb25hbFxuICogY29uZmlndXJhdGlvbnMgb24gc3lzdGVtIGFuZCBwcm9qZWN0IGxldmVsLlxuICogRm9yIEV4YW1wbGVcbiAqIC0gdGhlIGZpZWxkcyBvZiBhIGNsYXNzXG4gKiAtIHRoZSBsYWJlbHMgb2YgY2xhc3NlcyBhbmQgcHJvcGVydGllc1xuICovXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgKSB7IH1cblxuXG4gIC8qKlxuICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfcHJvZmlsZVxuICAqIG9mIGFsbCBwcm9maWxlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0LlxuICAqIFRoZSBhcnJheSB3aWxsIGFsd2F5cyBpbmNsdWRlIFBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIC8vIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwdWJsaWMgcGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9wcm9maWxlX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkJFxuICAgICAgICAua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpLnBpcGUoXG4gICAgICAgICAgbWFwKHByb2plY3RQcm9maWxlUmVscyA9PiB2YWx1ZXMocHJvamVjdFByb2ZpbGVSZWxzKVxuICAgICAgICAgICAgLmZpbHRlcihyZWwgPT4gcmVsLmVuYWJsZWQpXG4gICAgICAgICAgICAubWFwKHJlbCA9PiByZWwuZmtfcHJvZmlsZSlcbiAgICAgICAgICApLFxuICAgICAgICAgIG1hcChlbmFibGVkID0+IFsuLi5lbmFibGVkLCBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXSksXG4gICAgICAgICkpLFxuICAgICAgc2hhcmVSZXBsYXkoKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIGFsbCBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAgICogVGhlIEZpZWxkcyBhcmUgbm90IG9yZGVyZWQgYW5kIG5vdCBmaWx0ZXJlZFxuICAgKiBJZiB5b3Ugd2FudCBzcGVjaWZpYyBzdWJzZXRzIG9mIEZpZWxkcyBhbmQvb3Igb3JkZXJlZCBGaWVsZHMsIHVzZSB0aGUgcGlwZXNcbiAgICogdGhhdCBidWlsZCBvbiB0aGlzIHBpcGUuXG4gICAqL1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHMocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAvLyBwaXBlIHNvdXJjZSBjbGFzc1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcyksXG4gICAgICAvLyBwaXBlIG91dGdvaW5nIHByb3BlcnRpZXNcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfZG9tYWluJC5rZXkocGtDbGFzcykucGlwZShtYXAoaW5kZXhlZCA9PiB2YWx1ZXMoaW5kZXhlZCkpKSxcbiAgICAgIC8vIHBpcGUgaW5nb2luZyBwcm9wZXJ0aWVzXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX3JhbmdlJC5rZXkocGtDbGFzcykucGlwZShtYXAoaW5kZXhlZCA9PiB2YWx1ZXMoaW5kZXhlZCkpKSxcbiAgICAgIC8vIHBpcGUgc3lzIGNvbmZpZ1xuICAgICAgdGhpcy5zLnN5cyQuY29uZmlnJC5tYWluJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgLy8gcGlwZSBlbmFibGVkIHByb2ZpbGVzXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKSxcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtzb3VyY2VLbGFzcywgb3V0Z29pbmdQcm9wcywgaW5nb2luZ1Byb3BzLCBzeXNDb25maWcsIGVuYWJsZWRQcm9maWxlc10pID0+IHtcbiAgICAgICAgY29uc3QgaXNFbmFibGVkID0gKHByb3A6IERmaFByb3BlcnR5KTogYm9vbGVhbiA9PiBlbmFibGVkUHJvZmlsZXMuc29tZShcbiAgICAgICAgICAoZW5hYmxlZCkgPT4gcHJvcC5wcm9maWxlcy5tYXAocCA9PiBwLmZrX3Byb2ZpbGUpLmluY2x1ZGVzKGVuYWJsZWQpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG91dFAgPSBvdXRnb2luZ1Byb3BzLmZpbHRlcigocHJvcCkgPT4gaXNFbmFibGVkKHByb3ApKVxuICAgICAgICBsZXQgaW5QID0gaW5nb2luZ1Byb3BzLmZpbHRlcigocHJvcCkgPT4gaXNFbmFibGVkKHByb3ApKVxuXG4gICAgICAgIGlmIChwa0NsYXNzID09PSBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBoYXMgdGltZSBzcGFuIHByb3BlcnR5XG4gICAgICAgICAgaW5QID0gW11cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIC8vIGlmIGNsYXNzIGlzIG5vdCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UsIGFkZCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UgKDExMTEpIHByb3BlcnR5XG4gICAgICAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbiAgICAgICAgICAvLyAgIGluZ29pbmdQcm9wcy5wdXNoKGNyZWF0ZUFwcGVsbGF0aW9uUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgLy8gaWYgaXMgdGVtcG9yYWwgZW50aXR5LCBhZGQgaGFzIHRpbWUgc3BhbiBwcm9wZXJ0eVxuICAgICAgICAgIGlmIChzb3VyY2VLbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4gICAgICAgICAgICBvdXRQLnB1c2goY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvdXRQLnB1c2goY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KHBrQ2xhc3MpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRQLCB0cnVlLCBlbmFibGVkUHJvZmlsZXMsIHN5c0NvbmZpZywgbm9OZXN0aW5nKSxcbiAgICAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoaW5QLCBmYWxzZSwgZW5hYmxlZFByb2ZpbGVzLCBzeXNDb25maWcsIG5vTmVzdGluZyksXG4gICAgICAgICAgdGhpcy5waXBlRmllbGRDb25maWdzKHBrQ2xhc3MpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoKFtzdWJmaWVsZHMxLCBzdWJmaWVsZHMyLCBmaWVsZENvbmZpZ3NdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWJmaWVsZHMgPSBbLi4uc3ViZmllbGRzMSwgLi4uc3ViZmllbGRzMl1cblxuICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWdJZHggPSBpbmRleEJ5KCh4KSA9PiBbXG4gICAgICAgICAgICAgICh4LmZrX2RvbWFpbl9jbGFzcyB8fCB4LmZrX3JhbmdlX2NsYXNzKSxcbiAgICAgICAgICAgICAgeC5ma19wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgISF4LmZrX2RvbWFpbl9jbGFzc1xuICAgICAgICAgICAgXS5qb2luKCdfJyksIGZpZWxkQ29uZmlncylcblxuICAgICAgICAgICAgY29uc3QgdW5pcUZpZWxkczogeyBbdWlkOiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbiAgICAgICAgICAgIGNvbnN0IHVuaXFTdWJmaWVsZENhY2hlOiB7IFt1aWQ6IHN0cmluZ106IHRydWUgfSA9IHt9XG5cblxuICAgICAgICAgICAgLy8gZ3JvdXAgYnkgc291cmNlLCBwa1Byb3BlcnR5IGFuZCBpc091dGdvaW5nXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3ViZmllbGRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkSWQgPSBbcy5zb3VyY2VDbGFzcywgcy5wcm9wZXJ0eS5ma1Byb3BlcnR5LCBzLmlzT3V0Z29pbmddLmpvaW4oJ18nKVxuICAgICAgICAgICAgICBjb25zdCBzdWJmaWVsZElkID0gW3Muc291cmNlQ2xhc3MsIHMucHJvcGVydHkuZmtQcm9wZXJ0eSwgcy5pc091dGdvaW5nLCBzLnRhcmdldENsYXNzXS5qb2luKCdfJylcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWc6IFByb0NsYXNzRmllbGRDb25maWcgfCB1bmRlZmluZWQgPSBmaWVsZENvbmZpZ0lkeFtmaWVsZElkXTtcbiAgICAgICAgICAgICAgLy8gdGhlIGZpcnN0IHRpbWUgdGhlIGdyb3VwIGlzIGVzdGFibGlzaGVkXG4gICAgICAgICAgICAgIGlmICghdW5pcUZpZWxkc1tmaWVsZElkXSkge1xuICAgICAgICAgICAgICAgIGxldCBpc1NwZWNpYWxGaWVsZDogU3BlY2lhbEZpZWxkVHlwZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSGFzVHlwZUZpZWxkKSBpc1NwZWNpYWxGaWVsZCA9ICdoYXMtdHlwZSc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wcm9wZXJ0eS5ma1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTikgaXNTcGVjaWFsRmllbGQgPSAndGltZS1zcGFuJztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdID0ge1xuICAgICAgICAgICAgICAgICAgc291cmNlQ2xhc3M6IHMuc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsOiBzLnNvdXJjZUNsYXNzTGFiZWwsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eTogcy5zb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZU1pblF1YW50aXR5OiBzLnNvdXJjZU1pblF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHMudGFyZ2V0TWluUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogcy50YXJnZXRNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBzLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgaXNIYXNUeXBlRmllbGQ6IHMuaXNIYXNUeXBlRmllbGQsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcy5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHMuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZSxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvTGFiZWw6IHMub250b0luZm9MYWJlbCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvVXJsOiBzLm9udG9JbmZvVXJsLFxuICAgICAgICAgICAgICAgICAgYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlczogcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW3MudGFyZ2V0Q2xhc3NdLFxuICAgICAgICAgICAgICAgICAgZmllbGRDb25maWcsXG4gICAgICAgICAgICAgICAgICBwbGFjZU9mRGlzcGxheTogZ2V0UGxhY2VPZkRpc3BsYXkoc3lzQ29uZmlnLnNwZWNpYWxGaWVsZHMsIHMsIGZpZWxkQ29uZmlnKSxcbiAgICAgICAgICAgICAgICAgIGlzU3BlY2lhbEZpZWxkLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0czoge1xuICAgICAgICAgICAgICAgICAgICBbcy50YXJnZXRDbGFzc106IHtcbiAgICAgICAgICAgICAgICAgICAgICBsaXN0VHlwZTogcy5saXN0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHMudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NMYWJlbDogcy50YXJnZXRDbGFzc0xhYmVsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtYXJrIHN1YmZpZWxkIGFzIGFkZGVkXG4gICAgICAgICAgICAgICAgdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0gPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBpZ25vcmUgZHVwbGljYXRpb25zIG9mIHN1YmZpZWxkc1xuICAgICAgICAgICAgICBlbHNlIGlmICghdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0pIHtcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlID9cbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IGZhbHNlIDpcbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLnRhcmdldENsYXNzZXMucHVzaChzLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0udGFyZ2V0c1tzLnRhcmdldENsYXNzXSA9IHtcbiAgICAgICAgICAgICAgICAgIGxpc3RUeXBlOiBzLmxpc3RUeXBlLFxuICAgICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHMudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzc0xhYmVsOiBzLnRhcmdldENsYXNzTGFiZWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcyh1bmlxRmllbGRzKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBwaXBlIGFsbCB0aGUgc3BlY2lmaWMgZmllbGRzIG9mIGEgY2xhc3MsXG4gICAqIG9yZGVyZWQgYnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MsIG5vTmVzdGluZykucGlwZShcbiAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzXG4gICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMpXG4gICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24gLSBiLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgICogcGlwZSBhbGwgdGhlIGJhc2ljIGZpZWxkcyBvZiBhIGNsYXNzLFxuICAgICogb3JkZXJlZCBieSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgYmFzaWMgZmllbGRzXG4gICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcywgbm9OZXN0aW5nKS5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHNcbiAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBiYXNpYyBmaWVsZHNcbiAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcylcbiAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIGJhc2ljIGZpZWxkc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcy5wb3NpdGlvbiAtIGIucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMucG9zaXRpb24pXG4gICAgICApXG4gICAgKVxuICB9XG5cblxuXG5cbiAgLyoqXG4gICAgICogUGlwZXMgdGhlIGZpZWxkcyBmb3IgdGVtcG9yYWwgZW50aXR5IGZvcm1zXG4gICAgICogLSB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICogLSB0aGUgd2hlbiBmaWVsZFxuICAgICAqIC0gaWYgYXZhaWxhYmxlOiB0aGUgdHlwZSBmaWVsZFxuICAgICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUZpZWxkc0ZvclRlRW5Gb3JtKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MsIG5vTmVzdGluZykucGlwZShcbiAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICBtYXAoYWxsRmllbGRzID0+IHtcbiAgICAgICAgY29uc3QgZmllbGRzID0gYWxsRmllbGRzXG4gICAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHMgYW5kIG5vdCByZW1vdmVkIGZyb20gYWxsIHByb2ZpbGVzXG4gICAgICAgICAgLmZpbHRlcihmaWVsZCA9PiAoZmllbGQucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMgJiYgZmllbGQuYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9PT0gZmFsc2UpKVxuICAgICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbiAtIGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24pXG5cbiAgICAgICAgY29uc3Qgd2hlbkZpZWxkID0gYWxsRmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQucHJvcGVydHkuZmtQcm9wZXJ0eSA9PT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4pXG4gICAgICAgIGlmICh3aGVuRmllbGQpIGZpZWxkcy5wdXNoKHdoZW5GaWVsZClcblxuICAgICAgICBjb25zdCB0eXBlRmllbGQgPSBhbGxGaWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pc0hhc1R5cGVGaWVsZClcbiAgICAgICAgaWYgKHR5cGVGaWVsZCkgZmllbGRzLnB1c2godHlwZUZpZWxkKVxuXG4gICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuXG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGZpZWxkcyBvZiBnaXZlbiBjbGFzcyBpbiB0aGlzIG9yZGVyOlxuICAgKiAtIGJhc2ljIGZpZWxkc1xuICAgKiAtIHNwZWNpZmljIGZpZWxkc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZyksXG4gICAgICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzLCBub05lc3RpbmcpXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuICAvKipcbiAgKiBQaXBlcyB0aGUgZmllbGRzIG9mIGdpdmVuIGNsYXNzIGluIHRoaXMgb3JkZXI6XG4gICogLSBzcGVjaWZpYyBmaWVsZHNcbiAgKiAtIGJhc2ljIGZpZWxkc1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzLCBub05lc3RpbmcpLFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZyksXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFxuICAgIHByb3BlcnRpZXM6IERmaFByb3BlcnR5W10sXG4gICAgaXNPdXRnb2luZzogYm9vbGVhbixcbiAgICBlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdLFxuICAgIHN5c0NvbmZpZzogU3lzQ29uZmlnVmFsdWUsXG4gICAgbm9OZXN0aW5nID0gZmFsc2VcbiAgKTogT2JzZXJ2YWJsZTxTdWJmaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgcHJvcGVydGllcy5tYXAocCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVTdWJmaWVsZChpc091dGdvaW5nLCBwLCBzeXNDb25maWcsIGVuYWJsZWRQcm9maWxlcywgbm9OZXN0aW5nKTtcbiAgICAgIH0pXG4gICAgKVxuXG4gIH1cblxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlU3ViZmllbGRJZFRvU3ViZmllbGQoc291cmNlQ2xhc3M6IG51bWJlciwgcHJvcGVydHk6IG51bWJlciwgdGFyZ2V0Q2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbiwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPFN1YmZpZWxkPiB7XG4gICAgY29uc3QgZG9tYWluID0gaXNPdXRnb2luZyA/IHNvdXJjZUNsYXNzIDogdGFyZ2V0Q2xhc3M7XG4gICAgY29uc3QgcmFuZ2UgPSBpc091dGdvaW5nID8gdGFyZ2V0Q2xhc3MgOiBzb3VyY2VDbGFzcztcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5wa19wcm9wZXJ0eV9faGFzX2RvbWFpbl9faGFzX3JhbmdlJC5rZXkoW3Byb3BlcnR5LCBkb21haW4sIHJhbmdlXS5qb2luKCdfJykpXG4gICAgICAgIC5waXBlKGZpbHRlcih4ID0+IHtcbiAgICAgICAgICByZXR1cm4gISF4XG4gICAgICAgIH0pKSxcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQucGlwZShmaWx0ZXIoeCA9PiB7XG4gICAgICAgIHJldHVybiAhIXhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpLnBpcGUoZmlsdGVyKHggPT4ge1xuICAgICAgICByZXR1cm4gISF4XG4gICAgICB9KSksXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZGZoUHJvcCwgc3lzQ29uZiwgZW5hYmxlZFByb2ZpbGVzXSkgPT4gdGhpcy5waXBlU3ViZmllbGQoXG4gICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgIGRmaFByb3AsXG4gICAgICAgIHN5c0NvbmYsXG4gICAgICAgIGVuYWJsZWRQcm9maWxlcyxcbiAgICAgICAgbm9OZXN0aW5nXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cbiAgcHJpdmF0ZSBwaXBlU3ViZmllbGQoXG4gICAgaXNPdXRnb2luZzogYm9vbGVhbixcbiAgICBwOiBEZmhQcm9wZXJ0eSxcbiAgICBzeXNDb25maWc6IFN5c0NvbmZpZ1ZhbHVlLFxuICAgIGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sXG4gICAgbm9OZXN0aW5nID0gZmFsc2VcbiAgKTogT2JzZXJ2YWJsZTxTdWJmaWVsZD4ge1xuICAgIGNvbnN0IG8gPSBpc091dGdvaW5nO1xuICAgIGNvbnN0IHRhcmdldENsYXNzID0gbyA/IHAuaGFzX3JhbmdlIDogcC5oYXNfZG9tYWluO1xuICAgIGNvbnN0IHNvdXJjZUNsYXNzID0gbyA/IHAuaGFzX2RvbWFpbiA6IHAuaGFzX3JhbmdlO1xuICAgIGNvbnN0IHRhcmdldE1heFF1YW50aXR5ID0gbyA/XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllciA6XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI7XG4gICAgY29uc3Qgc291cmNlTWF4UXVhbnRpdHkgPSBvID9cbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllciA6XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjtcbiAgICBjb25zdCB0YXJnZXRNaW5RdWFudGl0eSA9IG8gP1xuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXIgOlxuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyO1xuICAgIGNvbnN0IHNvdXJjZU1pblF1YW50aXR5ID0gbyA/XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXIgOlxuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI7XG5cbiAgICAvLyBjb25zb2xlLmxvZygncHBwcCB3YW50ZWQ6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVDbGFzc0xhYmVsKHNvdXJjZUNsYXNzKS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BwcHAgZm91bmQgc291cmNlQ2xhc3NMYWJlbDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG5cbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZUNsYXNzTGFiZWwodGFyZ2V0Q2xhc3MpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCB0YXJnZXRDbGFzc0xhYmVsOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcblxuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlU3ViZmllbGRUeXBlT2ZDbGFzcyhzeXNDb25maWcsIHRhcmdldENsYXNzLCB0YXJnZXRNYXhRdWFudGl0eSwgcC5wa19wcm9wZXJ0eSwgbm9OZXN0aW5nKS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BwcHAgZm91bmQgc3ViZmllbGRUeXBlOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZUZpZWxkTGFiZWwocC5wa19wcm9wZXJ0eSwgaXNPdXRnb2luZyA/IHAuaGFzX2RvbWFpbiA6IG51bGwsIGlzT3V0Z29pbmcgPyBudWxsIDogcC5oYXNfcmFuZ2UpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCBmaWVsZExhYmVsOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICApXG4gICAgICAucGlwZShtYXAoKFtzb3VyY2VDbGFzc0xhYmVsLCB0YXJnZXRDbGFzc0xhYmVsLCBsaXN0VHlwZSwgbGFiZWxdXG4gICAgICApID0+IHtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG5cbiAgICAgICAgY29uc3Qgbm9kZTogU3ViZmllbGQgPSB7XG4gICAgICAgICAgbGlzdFR5cGUsXG4gICAgICAgICAgc291cmNlQ2xhc3MsXG4gICAgICAgICAgc291cmNlQ2xhc3NMYWJlbCxcbiAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICBzb3VyY2VNaW5RdWFudGl0eSxcbiAgICAgICAgICB0YXJnZXRDbGFzcyxcbiAgICAgICAgICB0YXJnZXRDbGFzc0xhYmVsLFxuICAgICAgICAgIHRhcmdldE1pblF1YW50aXR5LFxuICAgICAgICAgIHRhcmdldE1heFF1YW50aXR5LFxuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIGlzSGFzVHlwZUZpZWxkOiBvICYmIHAuaXNfaGFzX3R5cGVfc3VicHJvcGVydHksXG4gICAgICAgICAgcHJvcGVydHk6IHsgZmtQcm9wZXJ0eTogcC5wa19wcm9wZXJ0eSB9LFxuICAgICAgICAgIGlzT3V0Z29pbmc6IG8sXG4gICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogbyA/IHAuaWRlbnRpdHlfZGVmaW5pbmcgOiBmYWxzZSxcbiAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBvID8gZmFsc2UgOiBwLmlkZW50aXR5X2RlZmluaW5nLFxuICAgICAgICAgIG9udG9JbmZvTGFiZWw6IHAuaWRlbnRpZmllcl9pbl9uYW1lc3BhY2UsXG4gICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvJyArIHAucGtfcHJvcGVydHksXG4gICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogaXNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzKGVuYWJsZWRQcm9maWxlcywgKHAucHJvZmlsZXMgfHwgW10pKSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgdGhlIHR5cGUgb2YgU3ViZmllbGQgZm9yIGEgZ2l2ZW4gY2xhc3NcbiAgICpcbiAgICogQ3VycmVudGx5ICh0byBiZSByZXZpc2VkIGlmIGdvb2QpIHN1YmxjYXNzZXMgb2YgRTU1IFR5cGUsXG4gICAqIHRoYXQgYXJlIHRoZSB0YXJnZXQgb2YgYSBmaWVsZCB3aXRoIHRhcmdldE1heFFhbnRpdHk9MSxcbiAgICogZ2V0IFN1YmZpZWxkIHR5cGUgJ2hhc1R5cGUnLlxuICAgKiBUaGVyZWZvcmUgdGFyZ2V0TWF4UXVhbnRpdHkgaXMgbmVlZGVkLlxuICAgKlxuICAgKiBJZiB3ZSBhcmUgbmVzdGluZyBzdWJmaWVsZHMsIHdlJ2xsIGVuZCB1cCB3aXRoIGNpcmN1bGFyIGZpZWxkcy5cbiAgICogRS5nLjogUGVyc29uIDIxIC0+IGhhcyBhcHBlbGxhdGlvbiAxMTExIC0+IEFwcGVUZUVuIDM2NSAtPiBpcyBhcHBlbGxhdGlvbiBvZiAxMTExIC0+IFBlcnNvbiAyMVxuICAgKiBJbiBvcmRlciB0byBkZXRlY3QgdGhlbSwgd2UgY2FuIGFkZGl0aW9uYWxseSBwYXNzIGluIHRoZSBwYXJlbnQgcHJvcGVydHkuXG4gICAqXG4gICAqIFRoaXMgYmVoYXZpb3IgaGFzIHRvIGJlIHJldmlzZWQsIGJlY2F1c2UgaXQgY2FuIGxlYWQgdG8gcHJvYmxlbXNcbiAgICogd2hlbiB0aGUgU3ViZmllbGQgYmVsb25ncyB0byBhIEZpZWxkIHdpdGggbXVsdGlwbGUgdGFyZ2V0IGNsYXNzZXNcbiAgICogKGFuZCB0aHVzIFN1YmZpZWxkcykgYmVjYXVzZSB0aGUgVUkgdGhlbiBkb2VzIG5vdCBhbGxvdyB0byBjaG9vc2VcbiAgICogdGhlIHJpZ2h0IHRhcmdldCBjbGFzcy5cbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTdWJmaWVsZFR5cGVPZkNsYXNzKGNvbmZpZzogU3lzQ29uZmlnVmFsdWUsIHBrQ2xhc3M6IG51bWJlciwgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlciwgcGFyZW50UHJvcGVydHk/OiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxHdlRhcmdldFR5cGU+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShcbiAgICAgIGZpbHRlcihpID0+ICEhaSksXG4gICAgICBzd2l0Y2hNYXAoKGtsYXNzKSA9PiB0aGlzLnBpcGVTdWJmaWVsZFR5cGUoY29uZmlnLCBrbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHksIHBhcmVudFByb3BlcnR5LCBub05lc3RpbmcpKVxuICAgIClcbiAgfVxuXG5cbiAgcGlwZVN1YmZpZWxkVHlwZShjb25maWc6IFN5c0NvbmZpZ1ZhbHVlLCBrbGFzczogRGZoQ2xhc3MsIHRhcmdldE1heFF1YW50aXR5OiBudW1iZXIsIHBhcmVudFByb3BlcnR5PzogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8R3ZUYXJnZXRUeXBlPiB7XG5cbiAgICBjb25zdCByZXMgPSAoeDogR3ZUYXJnZXRUeXBlKSA9PiBuZXcgQmVoYXZpb3JTdWJqZWN0KHgpXG4gICAgbGV0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZ1xuICAgIGlmIChjb25maWcpIGNsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNba2xhc3MucGtfY2xhc3NdO1xuICAgIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcbiAgICAgIHJldHVybiByZXMoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKVxuICAgIH1cblxuXG4gICAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gMzAgJiYgdGFyZ2V0TWF4UXVhbnRpdHkgPT0gMSkge1xuICAgICAgcmV0dXJuIHJlcyh7IHR5cGVJdGVtOiAndHJ1ZScgfSlcbiAgICB9XG4gICAgLy8gVE9ETyBhZGQgdGhpcyB0byBzeXNDb25maWdWYWx1ZVxuICAgIGVsc2UgaWYgKGtsYXNzLnBrX2NsYXNzID09PSBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOKSB7XG4gICAgICByZXR1cm4gcmVzKHsgdGltZVNwYW46ICd0cnVlJyB9KVxuICAgIH1cbiAgICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA4IHx8IGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwIHx8IG5vTmVzdGluZykge1xuICAgICAgcmV0dXJuIHJlcyh7IGVudGl0eVByZXZpZXc6ICd0cnVlJyB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIHBpcGUgdGhlIHN1YmZpZWxkcyBvZiB0aGUgdGVtcG9yYWxFbnRpdHkgY2xhc3NcbiAgICAgIGNvbnN0IG5vTmVzdCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5waXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhrbGFzcy5wa19jbGFzcywgbm9OZXN0KS5waXBlKFxuICAgICAgICBtYXAoZmllbGRzID0+IHtcbiAgICAgICAgICBjb25zdCBzdWJlbnRpdHlTdWJmaWVsZFBhZ2U6IEd2U3ViZW50aXRGaWVsZFBhZ2VSZXFbXSA9IFtdXG4gICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgICAgICAgIC8vIGZvciBlYWNoIG9mIHRoZXNlIHN1YmZpZWxkc1xuICAgICAgICAgICAgLy8gY3JlYXRlIHBhZ2U6R3ZTdWJmaWVsZFBhZ2VcblxuICAgICAgICAgICAgY29uc3QgbmVzdGVkVGFyZ2V0czogR3ZTdWJlbnRpdHlGaWVsZFRhcmdldHMgPSB7fTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGZpZWxkLnRhcmdldHMpIHtcbiAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmaWVsZC50YXJnZXRzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFR5cGUgPSBmaWVsZC50YXJnZXRzW2tleV0ubGlzdFR5cGU7XG4gICAgICAgICAgICAgICAgLy8gcHV0IHRlbXBvcmFsRW50aXR5IHRvIGVudGl0eVByZXZpZXdcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJUYXJnZXRUeXBlOiBHdlN1YmVudGl0eVRhcmdldFR5cGUgPSBsaXN0VHlwZS50ZW1wb3JhbEVudGl0eSA/XG4gICAgICAgICAgICAgICAgICB7IGVudGl0eVByZXZpZXc6ICd0cnVlJyB9IDpcbiAgICAgICAgICAgICAgICAgIGxpc3RUeXBlXG4gICAgICAgICAgICAgICAgbmVzdGVkVGFyZ2V0c1trZXldID0gc3ViVGFyZ2V0VHlwZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaXNDaXJjdWxhciA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBwYXJlbnRQcm9wZXJ0eSAmJlxuICAgICAgICAgICAgICBmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5ID09IHBhcmVudFByb3BlcnR5ICYmXG4gICAgICAgICAgICAgIGZpZWxkLnRhcmdldE1heFF1YW50aXR5ID09PSAxXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgaXNDaXJjdWxhciA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5lc3RlZFBhZ2U6IEd2U3ViZW50aXRGaWVsZFBhZ2VSZXEgPSB7XG4gICAgICAgICAgICAgIHRhcmdldHM6IG5lc3RlZFRhcmdldHMsXG4gICAgICAgICAgICAgIHBhZ2U6IHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eTogZmllbGQucHJvcGVydHksXG4gICAgICAgICAgICAgICAgaXNPdXRnb2luZzogZmllbGQuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICBsaW1pdDogMSxcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgICAgICAgaXNDaXJjdWxhclxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJlbnRpdHlTdWJmaWVsZFBhZ2UucHVzaChuZXN0ZWRQYWdlKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyB0ZW1wb3JhbEVudGl0eTogc3ViZW50aXR5U3ViZmllbGRQYWdlIH1cbiAgICAgICAgfSksXG5cbiAgICAgIClcbiAgICB9XG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXRzIGNsYXNzIGZpZWxkIGNvbmZpZ3Mgb2YgZ2l2ZW4gcGtDbGFzc1xuICAgKlxuICAgKiAtIG9mIGFjdGl2ZSBwcm9qZWN0LCBpZiBhbnksIGVsc2VcbiAgICogLSBvZiBkZWZhdWx0IGNvbmZpZyBwcm9qZWN0LCBlbHNlXG4gICAqIC0gZW1wdHkgYXJyYXlcbiAgICpcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZENvbmZpZ3MocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxQcm9DbGFzc0ZpZWxkQ29uZmlnW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZmtQcm9qZWN0KSA9PiB7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdGtleSA9IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5KHtcbiAgICAgICAgICBma19jbGFzc19mb3JfY2xhc3NfZmllbGQ6IHBrQ2xhc3MsXG4gICAgICAgICAgZmtfcHJvamVjdDogZmtQcm9qZWN0XG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0a2V5ID0gcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXkoe1xuICAgICAgICAgIGZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZDogcGtDbGFzcyxcbiAgICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNUXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucy5wcm8kLmNsYXNzX2ZpZWxkX2NvbmZpZyQuYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkLmtleShhY3RpdmVQcm9qZWN0a2V5KSxcbiAgICAgICAgICB0aGlzLnMucHJvJC5jbGFzc19maWVsZF9jb25maWckLmJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJC5rZXkoZGVmYXVsdFByb2plY3RrZXkpXG4gICAgICAgIClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCgoW2FjdGl2ZVByb2plY3RGaWVsZHMsIGRlZmF1bHRQcm9qZWN0RmllbGRzXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWN0aXZlUHJvamVjdEZpZWxkcyAmJiB2YWx1ZXMoYWN0aXZlUHJvamVjdEZpZWxkcykubGVuZ3RoKSByZXR1cm4gYWN0aXZlUHJvamVjdEZpZWxkcztcblxuICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFByb2plY3RGaWVsZHNcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChpdGVtcykgPT4gdmFsdWVzKGl0ZW1zKS5zb3J0KChhLCBiKSA9PiAoYS5vcmRfbnVtID4gYi5vcmRfbnVtID8gMSA6IC0xKSkpLFxuICAgICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBjbGFzcyBsYWJlbCBmb3IgYWN0aXZlIHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc0xhYmVsKHBrQ2xhc3M/OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKHsgcGtDbGFzcywgZmtQcm9qZWN0LCBsYW5ndWFnZSwgdHlwZTogJ2xhYmVsJyB9KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBpID0gaXRlbXMuZmluZChpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICAgIHJldHVybiBpID8gaS50ZXh0IDogYCogbm8gbGFiZWwgKGlkOiAke3BrQ2xhc3N9KSAqYFxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogRGVsaXZlcnMgYXJyYXkgb2Ygb2JqZWN0cyB3aXRoXG4gICAqIHRleHQgfiB0aGUgdGV4dCBvZiB0aGUgcHJvcGVydHlcbiAgICogb3JpZ2luLCBpbiB0aGlzIG9yZGVyOlxuICAgKiAtIG9yaWdpbiA9PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnICAgICAgICAgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCcgICAgICAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgICAgICAgICAgKGZyb20gZGF0YV9mb3JfaGlzdG9yeS5sYWJlbClcbiAgICogLSBvcmlnaW4gPT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJyAgICAgICAgICAgICAgIChmcm9tIGRhdGFfZm9yX2hpc3RvcnkubGFiZWwpXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlTGFiZWxzKGQ6IHtcbiAgICBma1Byb2plY3Q6IG51bWJlcixcbiAgICB0eXBlOiAnbGFiZWwnIHwgJ2RlZmluaXRpb24nIHwgJ3Njb3BlTm90ZScsXG4gICAgbGFuZ3VhZ2U6IEluZkxhbmd1YWdlLFxuICAgIHBrQ2xhc3M/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eT86IG51bWJlcixcbiAgICBma1Byb3BlcnR5RG9tYWluPzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHlSYW5nZT86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8e1xuICAgIG9yaWdpbjogTGFiZWxPcmlnaW5cbiAgICB0ZXh0OiBzdHJpbmdcbiAgfVtdPiB7XG4gICAgbGV0IGZrX3N5c3RlbV90eXBlOiBudW1iZXI7XG5cbiAgICBpZiAoZC5wa0NsYXNzKSB7XG4gICAgICBzd2l0Y2ggKGQudHlwZSkge1xuICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgZmtfc3lzdGVtX3R5cGUgPSBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdma19zeXN0ZW1fdHlwZSBub3QgZm91bmQnKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkLmZrUHJvcGVydHkpIHtcbiAgICAgIHN3aXRjaCAoZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xhYmVsJzpcbiAgICAgICAgICBma19zeXN0ZW1fdHlwZSA9IFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUxcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZrX3N5c3RlbV90eXBlIG5vdCBmb3VuZCcpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIGxhYmVsIG9mIHByb2plY3QgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBkLmZrUHJvamVjdCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UucGtfZW50aXR5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiBkLmxhbmd1YWdlLnBrX2VudGl0eSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiAxODg4OSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgZnJvbSBvbnRvbWUgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVEZmhMYWJlbCh7XG4gICAgICAgIGxhbmd1YWdlOiBkLmxhbmd1YWdlLmlzbzYzOTEudHJpbSgpLFxuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBma19jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19wcm9wZXJ0eTogZC5ma1Byb3BlcnR5XG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIGZyb20gb250b21lIGluIGVuZ2xpc2hcbiAgICAgIHRoaXMucGlwZURmaExhYmVsKHtcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgIGZrX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX3Byb3BlcnR5OiBkLmZrUHJvcGVydHlcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIFByb1RleHRQcm9wZXJ0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb1RleHRQcm9wZXJ0eShkOiB7XG4gICAgZmtfcHJvamVjdDogbnVtYmVyLFxuICAgIGZrX3N5c3RlbV90eXBlOiBudW1iZXIsXG4gICAgZmtfbGFuZ3VhZ2U6IG51bWJlcixcbiAgICBma19kZmhfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW4/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlPzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxQcm9UZXh0UHJvcGVydHk+IHtcbiAgICBjb25zdCBrZXkgPSB0ZXh0UHJvcGVydHlCeUZrc0tleShkKVxuICAgIHJldHVybiB0aGlzLnMucHJvJC50ZXh0X3Byb3BlcnR5JC5ieV9ma3MkLmtleShrZXkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgRGZoTGFiZWxcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVEZmhMYWJlbChkOiB7XG4gICAgdHlwZTogJ2xhYmVsJyB8ICdkZWZpbml0aW9uJyB8ICdzY29wZU5vdGUnLFxuICAgIGxhbmd1YWdlOiBzdHJpbmcsXG4gICAgZmtfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfcHJvZmlsZT86IG51bWJlcixcbiAgICBma19wcm9wZXJ0eT86IG51bWJlcixcbiAgICBma19wcm9qZWN0PzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxEZmhMYWJlbD4ge1xuICAgIGNvbnN0IGtleSA9IGRmaExhYmVsQnlGa3NLZXkoZClcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQubGFiZWwkLmJ5X2ZrcyQua2V5KGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBiZXN0IGZpdHRpbmcgZmllbGQgbGFiZWwgZm9yIGFjdGl2ZSBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZExhYmVsKGZrUHJvcGVydHk6IG51bWJlciwgZmtQcm9wZXJ0eURvbWFpbjogbnVtYmVyLCBma1Byb3BlcnR5UmFuZ2U6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgaXNPdXRnb2luZyA9ICEhZmtQcm9wZXJ0eURvbWFpbjtcbiAgICAvLyBjb25zdCBzeXN0ZW1fdHlwZSA9IGlzT3V0Z29pbmcgPyAoc2luZ3VsYXIgPyAxODAgOiAxODEpIDogKHNpbmd1bGFyID8gMTgyIDogMTgzKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKFxuICAgICAgICB7XG4gICAgICAgICAgZmtQcm9qZWN0LFxuICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgZmtQcm9wZXJ0eSxcbiAgICAgICAgICBma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgIGZrUHJvcGVydHlSYW5nZVxuICAgICAgICB9XG4gICAgICApXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSBgKiBubyBsYWJlbCAoaWQ6ICR7ZmtQcm9wZXJ0eX0pICpgO1xuICAgICAgICAgICAgaXRlbXMuc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaXRlbSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpdGVtLnRleHRcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIGl0ZW0gJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpc091dGdvaW5nID8gaXRlbS50ZXh0IDogJyogcmV2ZXJzZSBvZjogJyArIGl0ZW0udGV4dCArICcqJ1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gbGFiZWxcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogbWFwcyB0aGUgY2xhc3MgdG8gdGhlIGNvcnJlc3BvbmRpbmcgbW9kZWwgKGRhdGFiYXNlIHRhYmxlKVxuICAgKiB0aGlzIGlzIHVzZWQgYnkgRm9ybXMgdG8gY3JlYXRlIG5ldyBkYXRhIGluIHRoZSBzaGFwZSBvZlxuICAgKiB0aGUgZGF0YSBtb2RlbFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRhYmxlTmFtZU9mQ2xhc3ModGFyZ2V0Q2xhc3NQazogbnVtYmVyKTogT2JzZXJ2YWJsZTxUYWJsZU5hbWU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQsXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleSh0YXJnZXRDbGFzc1BrKVxuICAgICkucGlwZShcbiAgICAgIGZpbHRlcihpID0+ICFpLmluY2x1ZGVzKHVuZGVmaW5lZCkpLFxuICAgICAgbWFwKChbY29uZmlnLCBrbGFzc10pID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3NDb25maWc6IENsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNbdGFyZ2V0Q2xhc3NQa107XG4gICAgICAgIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcblxuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpXG4gICAgICAgICAgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuXG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1swXTtcbiAgICAgICAgICBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gJ2FwcGVsbGF0aW9uJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUubGFuZ3VhZ2UpIHJldHVybiAnbGFuZ3VhZ2UnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5wbGFjZSkgcmV0dXJuICdwbGFjZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLnRpbWVQcmltaXRpdmUpIHJldHVybiAndGltZV9wcmltaXRpdmUnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gJ2xhbmdfc3RyaW5nJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gJ2RpbWVuc2lvbic7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3QgdHlwZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDggfHwga2xhc3MuYmFzaWNfdHlwZSA9PT0gMzApIHtcbiAgICAgICAgICByZXR1cm4gJ3BlcnNpc3RlbnRfaXRlbSdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJ3RlbXBvcmFsX2VudGl0eSdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuICAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0OlxuICAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIGVuYWJsZWQgYnkgY2xhc3NfcHJval9yZWxcbiAgICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZnVsbCB0byBjcmVhdGUgc2VsZWN0IGRyb3Bkb3ducyBvZiBjbGFzc2VzIHVzZXJzIHdpbGwga25vd1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNJbkVudGl0aWVzT3JTb3VyY2VzKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuICAgICAgc3RhcnRXaXRoKHt9KVxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJylcbiAgICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICAqIG9mIHRodGUgZ2l2ZW4gcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNFbmFibGVkQnlQcm9qZWN0UHJvZmlsZXMoKTogT2JzZXJ2YWJsZTxEZmhDbGFzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQuYWxsJCxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IGtsYXNzLnByb2ZpbGVzLnNvbWUocHJvZmlsZSA9PiBwcm9maWxlc01hcFtwcm9maWxlLmZrX3Byb2ZpbGVdKSlcbiAgICAgIH0pXG4gICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICogb2YgYWxsIHR5cGUgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICogb2YgdGh0ZSBnaXZlbiBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQ2xhc3Nlc0VuYWJsZWRCeVByb2plY3RQcm9maWxlcygpOiBPYnNlcnZhYmxlPERmaENsYXNzW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfYmFzaWNfdHlwZSQua2V5KDMwKSxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrbGFzcy5wcm9maWxlcy5zb21lKHByb2ZpbGUgPT4gcHJvZmlsZXNNYXBbcHJvZmlsZS5ma19wcm9maWxlXSkgJiZcbiAgICAgICAgICAgICAgLy8gRXhjbHVkZSBNYW5pZmVzdGF0aW9uIHByb2R1Y3QgdHlwZSBhbmQgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgIVtcbiAgICAgICAgICAgICAgICBEZmhDb25maWcuQ0xBU1NfUEtfTEFOR1VBR0UsXG4gICAgICAgICAgICAgICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFXG4gICAgICAgICAgICAgIF0uaW5jbHVkZXMoa2xhc3MucGtfY2xhc3MpXG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlcmUgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGFjdGl2ZSBwcm9qZWN0ICh1c2luZyBjbGFzc19wcm9qX3JlbClcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfY2xhc3NfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkLmtleShwa1Byb2plY3QgKyAnX3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVscykgPT4gdmFsdWVzKHJlbHMpLm1hcChyZWwgPT4gcmVsLmZrX2NsYXNzKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIFRlRW4gQ2xhc3Nlc1xuICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNlbGVjdGVkVGVFbkNsYXNzZXNJblByb2plY3QoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbiAgICAgIHN0YXJ0V2l0aCh7fSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyBlbmFibGVkIGluIGVudGl0aWVzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9jbGFzc19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChjcykgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB2YWx1ZXMoY3MpLm1hcChjID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KGMuZmtfY2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChkZmhDbGFzc2VzID0+IHRoaXMuZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzKSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgYXJyYXkgb2YgRGZoQ2xhc3MgZm9yIFRlRW4gQ2xhc3NlcyBhbmQgcmV0dXJucyBhcnJheSBvZiBwa19jbGFzc1xuICAgKiBAcGFyYW0gZGZoQ2xhc3NlcyBhcnJheSBvZiBEZmhDbGFzc1xuICAgKiBAcmV0dXJucyByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzIHdoZXJlIGNsYXNzIGlzIFRlRW4gY2xhc3NcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzOiBEZmhDbGFzc1tdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHBrczogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRmaENsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSBkZmhDbGFzc2VzW2ldO1xuICAgICAgaWYgKGMuYmFzaWNfdHlwZSA9PT0gOSkgcGtzLnB1c2goYy5wa19jbGFzcyk7XG4gICAgfVxuICAgIHJldHVybiBwa3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoY3MpID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdmFsdWVzKGNzKS5tYXAoYyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShjLmZrX2NsYXNzKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoZGZoQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXMpXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgfVxuXG5cblxuXG5cblxuICAvKipcbiAgICpcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzKGVuYWJsZWRJbj86ICdlbnRpdGllcycgfCAnc291cmNlcycpOiBPYnNlcnZhYmxlPHsgdHlwZWRDbGFzczogbnVtYmVyLCB0eXBlQ2xhc3M6IG51bWJlciB9W10+IHtcblxuICAgIGxldCBwa3MkOiBPYnNlcnZhYmxlPG51bWJlcltdPltdO1xuXG4gICAgY29uc3QgZnJvbVNvdXJjZXMkID0gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKGNsYXNzZXMgPT4gdmFsdWVzKGNsYXNzZXMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSxcbiAgICApXG5cbiAgICBjb25zdCBmcm9tRW50aXRpZXMkID0gdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKClcblxuICAgIGlmIChlbmFibGVkSW4gPT09ICdzb3VyY2VzJykge1xuICAgICAgcGtzJCA9IFtmcm9tU291cmNlcyRdO1xuICAgIH0gZWxzZSBpZiAoZW5hYmxlZEluID09PSAnZW50aXRpZXMnKSB7XG4gICAgICBwa3MkID0gW2Zyb21FbnRpdGllcyRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwa3MkID0gW2Zyb21Tb3VyY2VzJCwgZnJvbUVudGl0aWVzJF1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChwa3MkKS5waXBlKFxuICAgICAgbWFwKGFycmF5T2ZQa0FycmF5cyA9PiB1bmlxKGZsYXR0ZW48bnVtYmVyPihhcnJheU9mUGtBcnJheXMpKSksXG4gICAgICBzd2l0Y2hNYXAocGtzID0+IHRoaXMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3Nlcyhwa3MpKVxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMocGtUeXBlZENsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTx7IHR5cGVkQ2xhc3M6IG51bWJlciwgdHlwZUNsYXNzOiBudW1iZXIgfVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfZG9tYWluLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZWRDbGFzc2VzLm1hcChwayA9PiAoe1xuICAgICAgICAgIHR5cGVkQ2xhc3M6IHBrLFxuICAgICAgICAgIHR5cGVDbGFzczogYnlEb21haW5bcGtdID8gYnlEb21haW5bcGtdLmhhc19yYW5nZSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSlcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVDbGFzc09mVHlwZWRDbGFzcyhwa1R5cGVkQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19kb21haW4udG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gYnlEb21haW5bcGtUeXBlZENsYXNzXSA/IGJ5RG9tYWluW3BrVHlwZWRDbGFzc10uaGFzX3JhbmdlIDogdW5kZWZpbmVkXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHBrVHlwZUNsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX3JhbmdlLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZUNsYXNzZXMubWFwKHBrID0+IGJ5RG9tYWluW3BrXSA/IGJ5RG9tYWluW3BrXS5oYXNfZG9tYWluIDogdW5kZWZpbmVkKVxuICAgICAgfSkpXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlUHJvcGVydHlPZlR5cGVkQ2xhc3MocGtUeXBlZENsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgdHlwZVByb3AgPSB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKS5maW5kKHAgPT4gcC5oYXNfZG9tYWluID09PSBwa1R5cGVkQ2xhc3MpXG4gICAgICAgIHJldHVybiB0eXBlUHJvcCA/IHR5cGVQcm9wLnBrX3Byb3BlcnR5IDogdW5kZWZpbmVkO1xuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhwa1Byb3BlcnRpZXM6IG51bWJlcltdLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfcGtfcHJvcGVydHkkLmFsbCQucGlwZShcbiAgICAgIG1hcCh4ID0+IHtcbiAgICAgICAgaWYgKCFwa1Byb3BlcnRpZXMgfHwgIXBrUHJvcGVydGllcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgICAgICBjb25zdCByZXMgPSBbXVxuICAgICAgICBjb25zdCB0YXJnZXRDbGFzc2VzID0ge307XG4gICAgICAgIHBrUHJvcGVydGllcy5mb3JFYWNoKHBrUHJvcCA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcHMgPSB2YWx1ZXMoeFtwa1Byb3BdKTtcbiAgICAgICAgICBwcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBpc091dGdvaW5nID8gcHJvcC5oYXNfcmFuZ2UgOiBwcm9wLmhhc19kb21haW47XG4gICAgICAgICAgICBpZiAoIXRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdKSB7XG4gICAgICAgICAgICAgIHRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzLnB1c2godGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cblxuXG5mdW5jdGlvbiBjcmVhdGVIYXNEZWZpbml0aW9uUHJvcGVydHkoZG9tYWluQ2xhc3M6IG51bWJlcikge1xuICBjb25zdCBwcm9maWxlczogUHJvZmlsZXMgPSBbXG4gICAge1xuICAgICAgcmVtb3ZlZF9mcm9tX2FwaTogZmFsc2UsXG4gICAgICBma19wcm9maWxlOiBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICAgfVxuICBdXG5cbiAgY29uc3QgaGFzRGVmaW5pdGlvbjogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogZG9tYWluQ2xhc3MsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19QMThfSEFTX0RFRklOSVRJT04sXG4gICAgaGFzX3JhbmdlOiA3ODUsXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnUDE4JyxcbiAgICBpZGVudGl0eV9kZWZpbmluZzogZmFsc2UsXG4gICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuICAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbiAgICBwcm9maWxlc1xuICB9XG4gIHJldHVybiBoYXNEZWZpbml0aW9uXG59XG5cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShkb21haW5DbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cbiAgY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IGRvbWFpbkNsYXNzLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTixcbiAgICBoYXNfcmFuZ2U6IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4sXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnUDQnLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiBmYWxzZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0FwcGVQcm9wXG59XG5cblxuZnVuY3Rpb24gaXNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzKGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sIHByb2ZpbGVzOiBSZWxhdGVkUHJvZmlsZVtdKTogYm9vbGVhbiB7XG4gIHJldHVybiAhcHJvZmlsZXMuc29tZShwID0+IHAucmVtb3ZlZF9mcm9tX2FwaSA9PT0gZmFsc2UgJiYgZW5hYmxlZFByb2ZpbGVzLmluY2x1ZGVzKHAuZmtfcHJvZmlsZSkpXG5cbn1cblxuZnVuY3Rpb24gZ2V0UGxhY2VPZkRpc3BsYXkoc3BlY2lhbEZpZWxkczogU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgc3ViZmllbGQ6IFN1YmZpZWxkLCBwcm9qZWN0RmllbGRDb25maWc/OiBQcm9DbGFzc0ZpZWxkQ29uZmlnKTogRmllbGRQbGFjZU9mRGlzcGxheSB7XG4gIGxldCBzZXR0aW5nczogU3lzQ29uZmlnRmllbGREaXNwbGF5O1xuXG4gIHNldHRpbmdzID0gZ2V0U2V0dGluZ3NGcm9tU3lzQ29uZmlnKHN1YmZpZWxkLCBzcGVjaWFsRmllbGRzLCBzZXR0aW5ncyk7XG5cbiAgLy8gaWYgdGhpcyBpcyBhIHNwZWNpYWwgZmllbGQsIGNyZWF0ZSBjb3JyZXNwb25kaW5nIGRpc3BsYXkgc2V0dGluZ3MgYW5kIHJldHVybiBpdFxuICBpZiAoc2V0dGluZ3MpIHtcbiAgICBpZiAoc2V0dGluZ3MuZGlzcGxheUluQmFzaWNGaWVsZHMpIHtcbiAgICAgIHJldHVybiB7IGJhc2ljRmllbGRzOiB7IHBvc2l0aW9uOiBzZXR0aW5ncy5kaXNwbGF5SW5CYXNpY0ZpZWxkcy5wb3NpdGlvbiB9IH1cbiAgICB9IGVsc2UgaWYgKHNldHRpbmdzLmhpZGRlbikge1xuICAgICAgcmV0dXJuIHsgaGlkZGVuOiB0cnVlIH1cbiAgICB9XG4gIH1cblxuICAvLyBvdGhlcndpc2UgZGlzcGxheSB0aGUgZmllbGQgaW4gc3BlY2lmaWMgZmllbGRzIChkZWZhdWx0KVxuICBsZXQgcG9zaXRpb24gPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gIGlmIChwcm9qZWN0RmllbGRDb25maWcpIHBvc2l0aW9uID0gcHJvamVjdEZpZWxkQ29uZmlnLm9yZF9udW1cbiAgcmV0dXJuIHsgc3BlY2lmaWNGaWVsZHM6IHsgcG9zaXRpb24gfSB9XG5cbn1cbmZ1bmN0aW9uIGdldFNldHRpbmdzRnJvbVN5c0NvbmZpZyhcbiAgc3ViZmllbGQ6IFN1YmZpZWxkLCBzcGVjaWFsRmllbGRzOiBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBzZXR0aW5nczogU3lzQ29uZmlnRmllbGREaXNwbGF5KSB7XG4gIGlmIChzdWJmaWVsZC5pc091dGdvaW5nKSB7XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IGhhcy10eXBlLXN1YnByb3BlcnR5XG4gICAgaWYgKHN1YmZpZWxkLmlzSGFzVHlwZUZpZWxkICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmhhc1R5cGVTdWJwcm9wZXJ0aWVzKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuaGFzVHlwZVN1YnByb3BlcnRpZXM7XG4gICAgfVxuICAgIC8vIGdldCBzZXR0aW5ncyBieSBzb3VyY2UgY2xhc3MgYW5kIHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkuZmtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkuZmtQcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIGdldCBzZWV0aW5ncyBieSBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IHNvdXJjZSBjbGFzcyBhbmQgcHJvcGVydHlcbiAgICBpZiAoc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkuZmtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkuZmtQcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIGdldCBzZWV0aW5ncyBieSBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzO1xufVxuXG5cblxuXG5cblxuLyoqXG4gKiBQaXBlcyB0aGUgZmllbGRzIGZvciB0ZW1wb3JhbCBlbnRpdHkgZm9ybXNcbiAqIC0gdGhlIHNwZWNpZmljIGZpZWxkc1xuICogLSB0aGUgd2hlbiBmaWVsZFxuICogLSBpZiBhdmFpbGFibGU6IHRoZSB0eXBlIGZpZWxkXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZERlZmluaXRpb25zRm9yVGVFbkZvcm0ocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4vLyAgIHJldHVybiBvZihbXSlcbi8vIGNvbnN0IGhhc1R5cGVMaXN0RGVmJCA9IHRoaXMucGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzKVxuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIHRoaXMucGlwZVNwZWNpZmljRmllbGREZWZpbml0aW9ucyhwa0NsYXNzKVxuLy8gICAgIC5waXBlKFxuLy8gICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHMuZmlsdGVyKGYgPT4gZi5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID09PSBmYWxzZSkpXG4vLyAgICAgKVxuLy8gICAsXG4vLyAgIGhhc1R5cGVMaXN0RGVmJCxcbi8vICkucGlwZShcbi8vICAgbWFwKChbZmllbGRzLCBoYXNUeXBlTGlzdERlZnNdKSA9PiB7XG4vLyAgICAgY29uc3Qgd2hlbiA9IHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU4pXG4vLyAgICAgcmV0dXJuIFtcbi8vICAgICAgIC4uLmZpZWxkcyxcbi8vICAgICAgIHdoZW4sXG4vLyAgICAgICAuLi5oYXNUeXBlTGlzdERlZnMubWFwKChoYXNUeXBlTGlzdERlZikgPT4ge1xuLy8gICAgICAgICBjb25zdCB0eXBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNUeXBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzVHlwZUxpc3REZWZdIH1cbi8vICAgICAgICAgcmV0dXJuIHR5cGVGaWVsZDtcbi8vICAgICAgIH0pXG4vLyAgICAgXVxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8qKlxuICogUGlwZSB0aGUgc3BlY2lmaWMgZmllbGRzIG9mIGdpdmVuIGNsYXNzXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTcGVjaWZpY0ZpZWxkRGVmaW5pdGlvbnMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgdHJ1ZSkucGlwZShcbi8vICAgICAvLyBmaWx0ZXIgb3V0IHRoZSAnaGFzIHR5cGUnIHByb3BlcnR5LCBzaW5jZSBpdCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IGZpZWxkc1xuLy8gICAgIG1hcChvdXRnb2luZyA9PiBvdXRnb2luZy5maWx0ZXIobyA9PiAhby5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSkpXG4vLyAgICksXG4vLyAgIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIGZhbHNlKS5waXBlKFxuLy8gICAgIC8vIGZpbHRlciBvdXQgdGhlICdoYXMgYXBwZWxsYXRpb24nIHByb3BlcnR5LCBzaW5jZSBpdCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IGZpZWxkc1xuLy8gICAgIG1hcChpbmdvaW5nID0+IGluZ29pbmcuZmlsdGVyKGkgPT5cbi8vICAgICAgIGkucGtfcHJvcGVydHkgIT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRlxuLy8gICAgICAgJiYgaS5wa19wcm9wZXJ0eSAhPT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0dFT1ZQMV9JU19SRVBST0RVQ1RJT05fT0Zcbi8vICAgICApKVxuLy8gICApLFxuLy8gICB0aGlzLnBpcGVGaWVsZENvbmZpZ3MocGtDbGFzcylcbi8vICkucGlwZShcbi8vICAgc3dpdGNoTWFwKChbb3V0Z29pbmcsIGluZ29pbmcsIGZpZWxkQ29uZmlnc10pID0+IHtcblxuLy8gICAgIGNvbnN0IGtleSA9IChmYzogUGFydGlhbDxQcm9DbGFzc0ZpZWxkQ29uZmlnPikgPT4gYCR7ZmMuZmtfcHJvcGVydHl9XyR7ZmMuZmtfZG9tYWluX2NsYXNzfV8ke2ZjLmZrX3JhbmdlX2NsYXNzfWA7XG4vLyAgICAgY29uc3QgaW5kZXhlZCA9IGluZGV4QnkoKGZjKSA9PiBgJHtmYy5ma19wcm9wZXJ0eX1fJHtmYy5ma19kb21haW5fY2xhc3N9XyR7ZmMuZmtfcmFuZ2VfY2xhc3N9YCwgZmllbGRDb25maWdzKVxuLy8gICAgIGNvbnN0IGdldEZpZWxkQ29uZmlnID0gKGxpc3REZWY6IFN1YmZpZWxkKTogUHJvQ2xhc3NGaWVsZENvbmZpZyA9PiB7XG4vLyAgICAgICByZXR1cm4gaW5kZXhlZFtrZXkoe1xuLy8gICAgICAgICBma19wcm9wZXJ0eTogbGlzdERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuLy8gICAgICAgICBma19kb21haW5fY2xhc3M6IGxpc3REZWYuaXNPdXRnb2luZyA/IGxpc3REZWYuc291cmNlQ2xhc3MgOiBudWxsLFxuLy8gICAgICAgICBma19yYW5nZV9jbGFzczogbGlzdERlZi5pc091dGdvaW5nID8gbnVsbCA6IGxpc3REZWYuc291cmNlQ2xhc3MsXG4vLyAgICAgICB9KV1cbi8vICAgICB9XG5cbi8vICAgICAvLyBDcmVhdGUgbGlzdCBkZWZpbml0aW9uc1xuLy8gICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKGluZ29pbmcsIGZhbHNlKSxcbi8vICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRnb2luZywgdHJ1ZSlcbi8vICAgICApLnBpcGUoXG4vLyAgICAgICBtYXAoKFtpbmdvaW5nTGlzdERlZnMsIG91dGdvaW5nTGlzdERlZnNdKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IGxpc3REZWZpbml0aW9ucyA9IFsuLi5pbmdvaW5nTGlzdERlZnMsIC4uLm91dGdvaW5nTGlzdERlZnNdO1xuXG4vLyAgICAgICAgIC8vIENyZWF0ZSBmaWVsZCBkZWZpbml0aW9uc1xuLy8gICAgICAgICBjb25zdCBmaWVsZERlZnM6IHsgW2tleTogc3RyaW5nXTogRmllbGQgfSA9IHt9XG4vLyAgICAgICAgIGxpc3REZWZpbml0aW9ucy5mb3JFYWNoKGxpc3REZWYgPT4ge1xuXG4vLyAgICAgICAgICAgY29uc3QgayA9IGxpc3REZWYucHJvcGVydHkucGtQcm9wZXJ0eSArICdfJyArIGxpc3REZWYuaXNPdXRnb2luZztcblxuLy8gICAgICAgICAgIGlmICghZmllbGREZWZzW2tdKSB7XG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10gPSB7XG4vLyAgICAgICAgICAgICAgIC4uLmxpc3REZWYsXG4vLyAgICAgICAgICAgICAgIHBsYWNlT2ZEaXNwbGF5OiB7fSxcbi8vICAgICAgICAgICAgICAgYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2UsXG4vLyAgICAgICAgICAgICAgIGZpZWxkQ29uZmlnOiBnZXRGaWVsZENvbmZpZyhsaXN0RGVmKSxcbi8vICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb25zOiBbbGlzdERlZl0sXG4vLyAgICAgICAgICAgICAgIHRhcmdldENsYXNzZXM6IFtsaXN0RGVmLnRhcmdldENsYXNzXVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10ubGlzdERlZmluaXRpb25zLnB1c2gobGlzdERlZilcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXS50YXJnZXRDbGFzc2VzLnB1c2gobGlzdERlZi50YXJnZXRDbGFzcylcbi8vICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAvLyB9XG5cbi8vICAgICAgICAgfSlcbi8vICAgICAgICAgLy8gT3JkZXIgdGhlIGZpZWxkcyBhY2NvcmRpbmcgdG8gb3JkX251bSAoZnJvbSBwcm9qZWN0J3MgY29uZmlnLCBrbGVpb2xhYidzIGNvbmZpZykgb3IgcHV0IGl0IGF0IGVuZCBvZiBsaXN0LlxuLy8gICAgICAgICByZXR1cm4gc29ydChcbi8vICAgICAgICAgICAoYSwgYikgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3QgZ2V0T3JkTnVtID0gKGl0ZW06IEZpZWxkKSA9PiB7XG4vLyAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZmllbGRDb25maWcpIHJldHVybiBpdGVtLmZpZWxkQ29uZmlnLm9yZF9udW07XG4vLyAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBjb25zdCBvcmROdW1BID0gZ2V0T3JkTnVtKGEpO1xuLy8gICAgICAgICAgICAgY29uc3Qgb3JkTnVtQiA9IGdldE9yZE51bShiKTtcbi8vICAgICAgICAgICAgIHJldHVybiBvcmROdW1BIC0gb3JkTnVtQjtcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHZhbHVlcyhmaWVsZERlZnMpKVxuLy8gICAgICAgfSlcbi8vICAgICApXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLyoqXG4gKiBQaXBlIHRoZSBmaWVsZHMgZm9yIGlkZW50aWZpY2F0aW9uIG9mIGdpdmVuIGNsYXNzXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVEZWZhdWx0RmllbGREZWZpbml0aW9ucyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuXG4vLyAvKipcbi8vICAqIFBpcGUgdGhlIGdlbmVyaWMgZmllbGQgaGFzIGFwcGVsbGF0aW9uXG4vLyAgKiB3aXRoIHRoZSBnaXZlbiBjbGFzcyBhcyByYW5nZVxuLy8gICovXG4vLyBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHlTdGF0dXMgPSB7XG4vLyAgIGhhc19kb21haW46IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UsXG4vLyAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSVNfQVBQRUxMQVRJT05fT0YsXG4vLyAgIGhhc19yYW5nZTogcGtDbGFzcyxcbi8vICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4vLyAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDAsXG4vLyAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbi8vICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuLy8gICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ2hpc3RQOScsXG4vLyAgIGlkZW50aXR5X2RlZmluaW5nOiB0cnVlLFxuLy8gICBpc19pbmhlcml0ZWQ6IHRydWUsXG4vLyAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbi8vICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2UsXG4vLyAgIHByb2ZpbGVzOiBbXVxuLy8gfVxuLy8gY29uc3QgaGFzQXBwZUxpc3REZWYkID0gdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFtoYXNBcHBlUHJvcF0sIGZhbHNlKS5waXBlKFxuLy8gICBmaWx0ZXIobGlzdERlZnMgPT4gISFsaXN0RGVmcyAmJiAhIWxpc3REZWZzWzBdKSxcbi8vICAgbWFwKGxpc3REZWZzID0+IGxpc3REZWZzWzBdKVxuLy8gKTtcblxuLy8gLyoqXG4vLyAgKiBQaXBlIHRoZSBnZW5lcmljIGZpZWxkIGhhcyB0eXBlXG4vLyAgKiB3aXRoIHRoZSBnaXZlbiBjbGFzcyBhcyByYW5nZVxuLy8gICovXG4vLyBjb25zdCBoYXNUeXBlTGlzdERlZiQgPSB0aGlzLnBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzcylcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICBoYXNBcHBlTGlzdERlZiQsXG4vLyAgIGhhc1R5cGVMaXN0RGVmJCxcbi8vICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShmaWx0ZXIoYyA9PiAhIWMpKVxuLy8gKS5waXBlKFxuLy8gICBtYXAoKFtoYXNBcHBlTGlzdERlZiwgaGFzVHlwZUxpc3REZWZzLCBrbGFzc10pID0+IHtcbi8vICAgICBjb25zdCBmaWVsZHM6IEZpZWxkW10gPSBbXVxuXG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICAqIEFkZCAnc2hvcnQgdGl0bGUnIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAgKlxuLy8gICAgIC8vICAqIE1hbmlmZXN0YXRpb24gUHJvZHVjdCBUeXBlIOKAkyBGMywgMjE5XG4vLyAgICAgLy8gICogTWFuaWZlc3RhdGlvbiBTaW5nbGV0b24g4oCTIEY0LCAyMjBcbi8vICAgICAvLyAgKiBJdGVtIOKAkyBGNSwgMjIxXG4vLyAgICAgLy8gICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gICovXG4vLyAgICAgLy8gaWYgKFtcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1NJTkdMRVRPTixcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19JVEVNLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNUXS5pbmNsdWRlcyhwa0NsYXNzKSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfU0hPUlRfVElUTEUpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdoYXMgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0UDknIHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIGNsYXNzZXMgZXhjZXB0ICdBcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RDMTAnLCAzNjVcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4vLyAgICAgLy8gICBjb25zdCBhcHBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNBcHBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzQXBwZUxpc3REZWZdIH1cbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKGFwcGVGaWVsZCk7XG4vLyAgICAgLy8gfVxuXG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdoYXNUeXBlJyBmaWVsZHNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChoYXNUeXBlTGlzdERlZnMgJiYgaGFzVHlwZUxpc3REZWZzLmxlbmd0aCA+IDApIHtcbi8vICAgICAvLyAgIGhhc1R5cGVMaXN0RGVmcy5mb3JFYWNoKChoYXNUeXBlTGlzdERlZikgPT4ge1xuLy8gICAgIC8vICAgICBjb25zdCB0eXBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNUeXBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzVHlwZUxpc3REZWZdIH1cbi8vICAgICAvLyAgICAgZmllbGRzLnB1c2godHlwZUZpZWxkKTtcbi8vICAgICAvLyAgIH0pXG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnZW50aXR5IGRlZmluaXRpb24nIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgY2xhc3NlcyBleGNlcHQgJ0FwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdEMxMCcsIDM2NVxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VOVElUWV9ERUZJTklUSU9OKSk7XG4vLyAgICAgLy8gfVxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2lkZW50aWZpZXIgLyBleGFjdCByZWZlcmVuY2UgLyB1cmwgLyAuLi4nIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1QgPT09IHBrQ2xhc3MpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VYQUNUX1JFRkVSRU5DRSkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2NvbW1lbnQnIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBNYW5pZmVzdGF0aW9uIFByb2R1Y3QgVHlwZSDigJMgRjMsIDIxOVxuLy8gICAgIC8vICogTWFuaWZlc3RhdGlvbiBTaW5nbGV0b24g4oCTIEY0LCAyMjBcbi8vICAgICAvLyAqIEl0ZW0g4oCTIEY1LCAyMjFcbi8vICAgICAvLyAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICogRXhwcmVzc2lvbiBwb3J0aW9uIOKAkyBnZW92QzUsIDUwM1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKFtcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1NJTkdMRVRPTixcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19JVEVNLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNULFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0VYUFJFU1NJT05fUE9SVElPTl0uaW5jbHVkZXMocGtDbGFzcykpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICd0aW1lLXNwYW4nIGZpZWxkIHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIHRlbXBvcmFsIGVudGl0eSBjbGFzc2VzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTikpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIHJldHVybiBmaWVsZHNcblxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8vIHByaXZhdGUgcGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzOiBudW1iZXIpIHtcbi8vICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIHRydWUpLnBpcGUoXG4vLyAgICAgLy8gY2hlY2sgaWYgdGhpcyBjbGFzcyBoYXMgJ2hhcyB0eXBlJyBzdWJwcm9wZXJ0eVxuLy8gICAgIG1hcChvdXRnb2luZyA9PiB7XG4vLyAgICAgICByZXR1cm4gb3V0Z29pbmcuZmlsdGVyKChwcm9wKSA9PiBwcm9wLmlzX2hhc190eXBlX3N1YnByb3BlcnR5KTtcbi8vICAgICB9KSwgc3dpdGNoTWFwKGhhc1R5cGVQcm9wcyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShoYXNUeXBlUHJvcHMubWFwKGRmaFByb3AgPT4ge1xuLy8gICAgICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhbZGZoUHJvcF0sIHRydWUpLnBpcGUoZmlsdGVyKGxpc3REZWZzID0+ICEhbGlzdERlZnMgJiYgISFsaXN0RGVmc1swXSksIG1hcChsaXN0RGVmcyA9PiB7XG4vLyAgICAgICAgIGNvbnN0IGxpc3REZWYgPSBsaXN0RGVmc1swXTtcbi8vICAgICAgICAgbGlzdERlZi5saXN0VHlwZSA9IHsgdHlwZUl0ZW06ICd0cnVlJyB9O1xuLy8gICAgICAgICByZXR1cm4gbGlzdERlZjtcbi8vICAgICAgIH0pKTtcbi8vICAgICB9KSkpKTtcbi8vIH1cblxuLy8gZ2V0Q2xhc3NGaWVsZFN1YmZpZWxkKHBrQ2xhc3NGaWVsZDogbnVtYmVyKTogU3ViZmllbGQge1xuLy8gICBjb25zdCB0ZW1wbGF0ZSA9IHtcbi8vICAgICBwcm9wZXJ0eToge30sXG4vLyAgICAgc291cmNlQ2xhc3M6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VDbGFzc0xhYmVsOiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0Q2xhc3M6IHVuZGVmaW5lZCxcbi8vICAgICBpc091dGdvaW5nOiB1bmRlZmluZWQsXG4vLyAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogdW5kZWZpbmVkLFxuLy8gICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRNYXhRdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldE1pblF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlTWF4UXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VNaW5RdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlXG4vLyAgIH1cbi8vICAgc3dpdGNoIChwa0NsYXNzRmllbGQpIHtcbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiB7IHRpbWVTcGFuOiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdXaGVuJyxcbi8vICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZSxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQNCcsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzQnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VOVElUWV9ERUZJTklUSU9OOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0Rlc2NyaXB0aW9uJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5UOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0NvbW1lbnRzJyxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VYQUNUX1JFRkVSRU5DRTpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdFeGFjdCBSZWZlcmVuY2UnLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1NIT1JUX1RJVExFOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ1Nob3J0IFRpdGxlJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBkZWZhdWx0OlxuLy8gICAgICAgYnJlYWs7XG4vLyAgIH1cbi8vIH1cblxuLy8gZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24ocGtDbGFzc0ZpZWxkOiBudW1iZXIpOiBGaWVsZCB7XG4vLyAgIGNvbnN0IGxpc3REZWYgPSB0aGlzLmdldENsYXNzRmllbGRTdWJmaWVsZChwa0NsYXNzRmllbGQpXG4vLyAgIHJldHVybiB7IC4uLmxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2xpc3REZWZdIH1cbi8vIH1cblxuXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc1JlcXVpcmVkKCkge1xuLy8gICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZCQua2V5KCd0cnVlJylcbi8vICAgICAucGlwZShtYXAoYyA9PiB2YWx1ZXMoYykubWFwKGsgPT4gay5ma19jbGFzcykpKVxuLy8gfVxuXG5cblxuLy8gLyoqXG4vLyAgKiBQaXBlcyBhbGwgdGhlIGVuYWJsZWQgcHJvcGVydGllcyBvZiBhIGNsYXNzXG4vLyAgKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPERmaFByb3BlcnR5U3RhdHVzW10+IHtcblxuXG4vLyAgIGxldCAkOiBPYnNlcnZhYmxlPEJ5UGs8RGZoUHJvcGVydHk+PlxuLy8gICBpZiAoaXNPdXRnb2luZykge1xuLy8gICAgICQgPSB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX2RvbWFpbiQua2V5KHBrQ2xhc3MpXG4vLyAgIH1cbi8vICAgZWxzZSB7XG4vLyAgICAgJCA9IHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfcmFuZ2UkLmtleShwa0NsYXNzKVxuLy8gICB9XG5cbi8vICAgLy8gZmlsdGVyIHByb3BlcnRpZXMgdGhhdCBhcmUgaW4gYXQgbGVhc3Qgb25lIHByb2ZpbGUgZW5hYmxlZCBieSBwcm9qZWN0XG4vLyAgIGNvbnN0IHByb2ZpbGVzJCA9IHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG5cblxuLy8gICAvLyBGaWx0ZXIgb3V0IG9ubHkgdGhlIHByb3BlcnRpZXMgZm9yIHdoaWNoIHRhcmdldCBjbGFzcyBpcyBhbGxvd2VkXG4vLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KCQsIHByb2ZpbGVzJClcbi8vICAgICAucGlwZShcbi8vICAgICAgIG1hcCgoW3Byb3BzLCBwcm9maWxlc10pID0+IHtcbi8vICAgICAgICAgY29uc3QgcDogRGZoUHJvcGVydHlTdGF0dXNbXSA9IFtdXG5cbi8vICAgICAgICAgdmFsdWVzKHByb3BzKS5mb3JFYWNoKHByb3AgPT4ge1xuXG5cbi8vICAgICAgICAgICBjb25zdCBwcm9wUHJvZmlsZVJlbCA9IHByb3AucHJvZmlsZXMgYXMgUHJvZmlsZXNcblxuLy8gICAgICAgICAgIGxldCBlbmFibGVkSW5BUHJvZmlsZSA9IGZhbHNlO1xuXG4vLyAgICAgICAgICAgbGV0IHJlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSB0cnVlO1xuXG4vLyAgICAgICAgICAgcHJvcFByb2ZpbGVSZWwuZm9yRWFjaChpdGVtID0+IHtcbi8vICAgICAgICAgICAgIGlmIChwcm9maWxlcy5pbmNsdWRlcyhpdGVtLmZrX3Byb2ZpbGUpKSB7XG4vLyAgICAgICAgICAgICAgIGVuYWJsZWRJbkFQcm9maWxlID0gdHJ1ZTtcbi8vICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmVtb3ZlZF9mcm9tX2FwaSA9PT0gZmFsc2UpIHtcbi8vICAgICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gZmFsc2Vcbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0pXG5cbi8vICAgICAgICAgICBpZiAoZW5hYmxlZEluQVByb2ZpbGUpIHtcbi8vICAgICAgICAgICAgIHAucHVzaCh7XG4vLyAgICAgICAgICAgICAgIC4uLnByb3AsXG4vLyAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9KVxuXG4vLyAgICAgICAgIHJldHVybiBwXG4vLyAgICAgICB9KVxuLy8gICAgIClcblxuLy8gfVxuXG5cbi8vIC8qKlxuLy8gICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIENsYXNzZXNcbi8vICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3Rcbi8vICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgZW5hYmxlZCBieSBjbGFzc19wcm9qX3JlbFxuLy8gICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyByZXF1aXJlZCBieSBzb3VyY2VzIG9yIGJ5IGJhc2ljc1xuLy8gICpcbi8vICAqIHRoaXMgaXMgdXNlZnVsbCB0byBjaGVjayBpZiBhIGNsYXNzIGlzIGF2YWlsYWJsZSBhdCBhbGxcbi8vICAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNJbkVudGl0ZXNPclJlcXVpcmVkKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuLy8gICByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgICB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbi8vICAgICB0aGlzLnBpcGVDbGFzc2VzUmVxdWlyZWQoKVxuLy8gICApLnBpcGUoXG4vLyAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4vLyAgICAgc3RhcnRXaXRoKHt9KVxuLy8gICApXG4vLyB9XG4iXX0=