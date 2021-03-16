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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvc2VydmljZXMvY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFckgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTXhELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7O0FBTXBFLHVDQUdDOzs7SUFEQyxtREFBK0I7O0FBSWpDO0lBY0UsbUNBQ1UsQ0FBNEIsRUFDNUIsQ0FBeUI7UUFEekIsTUFBQyxHQUFELENBQUMsQ0FBMkI7UUFDNUIsTUFBQyxHQUFELENBQUMsQ0FBd0I7SUFDL0IsQ0FBQztJ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Q0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEcsUUFBUSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0c7UUFDRCwyQkFBMkI7YUFDdEIsSUFBSSxhQUFhLENBQUMsa0JBQWtCO1lBQ3ZDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2hFLFFBQVEsR0FBRyxhQUFhLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMzRTtLQUNGO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoQ29uZmlnLCBQcm9Db25maWcsIFN5c0NvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IGRmaExhYmVsQnlGa3NLZXksIHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5LCB0ZXh0UHJvcGVydHlCeUZrc0tleSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgQ2xhc3NDb25maWcsIERmaENsYXNzLCBEZmhMYWJlbCwgRGZoUHJvcGVydHksIEd2U3ViZW50aXRGaWVsZFBhZ2VSZXEsIEd2U3ViZW50aXR5RmllbGRUYXJnZXRzLCBHdlN1YmVudGl0eVRhcmdldFR5cGUsIEd2VGFyZ2V0VHlwZSwgSW5mTGFuZ3VhZ2UsIFByb0NsYXNzRmllbGRDb25maWcsIFByb1RleHRQcm9wZXJ0eSwgUmVsYXRlZFByb2ZpbGUsIFN5c0NvbmZpZ0ZpZWxkRGlzcGxheSwgU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgU3lzQ29uZmlnVmFsdWUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGZsYXR0ZW4sIGluZGV4QnksIHVuaXEsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgY29tYmluZUxhdGVzdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzdGFydFdpdGgsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgY2FjaGUgfSBmcm9tICcuLi9kZWNvcmF0b3JzL21ldGhvZC1kZWNvcmF0b3JzJztcbmltcG9ydCB7IEZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkJztcbmltcG9ydCB7IEZpZWxkUGxhY2VPZkRpc3BsYXkgfSBmcm9tICcuLi9tb2RlbHMvRmllbGRQb3NpdGlvbic7XG5pbXBvcnQgeyBQcm9maWxlcyB9IGZyb20gJy4uL21vZGVscy9Qcm9maWxlcyc7XG5pbXBvcnQgeyBTcGVjaWFsRmllbGRUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL1NwZWNpYWxGaWVsZFR5cGUnO1xuaW1wb3J0IHsgU3ViZmllbGQgfSBmcm9tICcuLi9tb2RlbHMvU3ViZmllbGQnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5cbi8vIHRoaXMgaXMgdGhlXG5leHBvcnQgdHlwZSBUYWJsZU5hbWUgPSAnYXBwZWxsYXRpb24nIHwgJ2xhbmd1YWdlJyB8ICdwbGFjZScgfCAndGltZV9wcmltaXRpdmUnIHwgJ2xhbmdfc3RyaW5nJyB8ICdkaW1lbnNpb24nIHwgJ3BlcnNpc3RlbnRfaXRlbScgfCAndGVtcG9yYWxfZW50aXR5J1xuXG5leHBvcnQgaW50ZXJmYWNlIERmaFByb3BlcnR5U3RhdHVzIGV4dGVuZHMgRGZoUHJvcGVydHkge1xuICAvLyB0cnVlLCBpZiByZW1vdmVkIGZyb20gYWxsIHByb2ZpbGVzIG9mIHRoZSBjdXJyZW50IHByb2plY3RcbiAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogYm9vbGVhblxufVxuXG50eXBlIExhYmVsT3JpZ2luID0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCcgfCAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgfCAnb2Ygb250b21lIGluIGVuZ2xpc2gnXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuLyoqXG4gKiBUaGlzIFNlcnZpY2UgcHJvdmlkZXMgYSBjb2xsZWN0aW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBjb25maWd1cmF0aW9uIGRhdGEuXG4gKiBXaGVuIHRhbGtpbmcgYWJvdXQgY29uZmlndXJhdGlvbiwgd2UgbWVhbiB0aGUgY29uY2VwdHVhbCByZWZlcmVuY2UgbW9kZWwgYW5kIHRoZSBhZGRpdGlvbmFsXG4gKiBjb25maWd1cmF0aW9ucyBvbiBzeXN0ZW0gYW5kIHByb2plY3QgbGV2ZWwuXG4gKiBGb3IgRXhhbXBsZVxuICogLSB0aGUgZmllbGRzIG9mIGEgY2xhc3NcbiAqIC0gdGhlIGxhYmVscyBvZiBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGE6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICApIHsgfVxuXG5cbiAgLyoqXG4gICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19wcm9maWxlXG4gICogb2YgYWxsIHByb2ZpbGVzIHRoYXQgYXJlIGVuYWJsZWQgYnkgdGhlIGdpdmVuIHByb2plY3QuXG4gICogVGhlIGFycmF5IHdpbGwgYWx3YXlzIGluY2x1ZGUgUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgLy8gQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHB1YmxpYyBwaXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX3Byb2ZpbGVfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWQkXG4gICAgICAgIC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJykucGlwZShcbiAgICAgICAgICBtYXAocHJvamVjdFByb2ZpbGVSZWxzID0+IHZhbHVlcyhwcm9qZWN0UHJvZmlsZVJlbHMpXG4gICAgICAgICAgICAuZmlsdGVyKHJlbCA9PiByZWwuZW5hYmxlZClcbiAgICAgICAgICAgIC5tYXAocmVsID0+IHJlbC5ma19wcm9maWxlKVxuICAgICAgICAgICksXG4gICAgICAgICAgbWFwKGVuYWJsZWQgPT4gWy4uLmVuYWJsZWQsIERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNdKSxcbiAgICAgICAgKSksXG4gICAgICBzaGFyZVJlcGxheSgpXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGUgYWxsIGZpZWxkcyBvZiBnaXZlbiBjbGFzc1xuICAgKiBUaGUgRmllbGRzIGFyZSBub3Qgb3JkZXJlZCBhbmQgbm90IGZpbHRlcmVkXG4gICAqIElmIHlvdSB3YW50IHNwZWNpZmljIHN1YnNldHMgb2YgRmllbGRzIGFuZC9vciBvcmRlcmVkIEZpZWxkcywgdXNlIHRoZSBwaXBlc1xuICAgKiB0aGF0IGJ1aWxkIG9uIHRoaXMgcGlwZS5cbiAgICovXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUZpZWxkcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIHBpcGUgc291cmNlIGNsYXNzXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKSxcbiAgICAgIC8vIHBpcGUgb3V0Z29pbmcgcHJvcGVydGllc1xuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19kb21haW4kLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBpbmdvaW5nIHByb3BlcnRpZXNcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfcmFuZ2UkLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBzeXMgY29uZmlnXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAvLyBwaXBlIGVuYWJsZWQgcHJvZmlsZXNcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpLFxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW3NvdXJjZUtsYXNzLCBvdXRnb2luZ1Byb3BzLCBpbmdvaW5nUHJvcHMsIHN5c0NvbmZpZywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBpc0VuYWJsZWQgPSAocHJvcDogRGZoUHJvcGVydHkpOiBib29sZWFuID0+IGVuYWJsZWRQcm9maWxlcy5zb21lKFxuICAgICAgICAgIChlbmFibGVkKSA9PiBwcm9wLnByb2ZpbGVzLm1hcChwID0+IHAuZmtfcHJvZmlsZSkuaW5jbHVkZXMoZW5hYmxlZClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3V0UCA9IG91dGdvaW5nUHJvcHMuZmlsdGVyKChwcm9wKSA9PiBpc0VuYWJsZWQocHJvcCkpXG4gICAgICAgIGxldCBpblAgPSBpbmdvaW5nUHJvcHMuZmlsdGVyKChwcm9wKSA9PiBpc0VuYWJsZWQocHJvcCkpXG5cbiAgICAgICAgaWYgKHBrQ2xhc3MgPT09IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4pIHtcbiAgICAgICAgICAvLyByZW1vdmUgdGhlIGhhcyB0aW1lIHNwYW4gcHJvcGVydHlcbiAgICAgICAgICBpblAgPSBbXVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gLy8gaWYgY2xhc3MgaXMgbm90IGFwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSwgYWRkIGFwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSAoMTExMSkgcHJvcGVydHlcbiAgICAgICAgICAvLyBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuICAgICAgICAgIC8vICAgaW5nb2luZ1Byb3BzLnB1c2goY3JlYXRlQXBwZWxsYXRpb25Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAvLyBpZiBpcyB0ZW1wb3JhbCBlbnRpdHksIGFkZCBoYXMgdGltZSBzcGFuIHByb3BlcnR5XG4gICAgICAgICAgaWYgKHNvdXJjZUtsYXNzLmJhc2ljX3R5cGUgPT09IDkpIHtcbiAgICAgICAgICAgIG91dFAucHVzaChjcmVhdGVIYXNUaW1lU3BhblByb3BlcnR5KHBrQ2xhc3MpKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG91dFAucHVzaChjcmVhdGVIYXNEZWZpbml0aW9uUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKG91dFAsIHRydWUsIGVuYWJsZWRQcm9maWxlcywgc3lzQ29uZmlnLCBub05lc3RpbmcpLFxuICAgICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhpblAsIGZhbHNlLCBlbmFibGVkUHJvZmlsZXMsIHN5c0NvbmZpZywgbm9OZXN0aW5nKSxcbiAgICAgICAgICB0aGlzLnBpcGVGaWVsZENvbmZpZ3MocGtDbGFzcylcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcCgoW3N1YmZpZWxkczEsIHN1YmZpZWxkczIsIGZpZWxkQ29uZmlnc10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1YmZpZWxkcyA9IFsuLi5zdWJmaWVsZHMxLCAuLi5zdWJmaWVsZHMyXVxuXG4gICAgICAgICAgICBjb25zdCBmaWVsZENvbmZpZ0lkeCA9IGluZGV4QnkoKHgpID0+IFtcbiAgICAgICAgICAgICAgKHguZmtfZG9tYWluX2NsYXNzIHx8IHguZmtfcmFuZ2VfY2xhc3MpLFxuICAgICAgICAgICAgICB4LmZrX3Byb3BlcnR5LFxuICAgICAgICAgICAgICAhIXguZmtfZG9tYWluX2NsYXNzXG4gICAgICAgICAgICBdLmpvaW4oJ18nKSwgZmllbGRDb25maWdzKVxuXG4gICAgICAgICAgICBjb25zdCB1bmlxRmllbGRzOiB7IFt1aWQ6IHN0cmluZ106IEZpZWxkIH0gPSB7fVxuICAgICAgICAgICAgY29uc3QgdW5pcVN1YmZpZWxkQ2FjaGU6IHsgW3VpZDogc3RyaW5nXTogdHJ1ZSB9ID0ge31cblxuXG4gICAgICAgICAgICAvLyBncm91cCBieSBzb3VyY2UsIHBrUHJvcGVydHkgYW5kIGlzT3V0Z29pbmdcbiAgICAgICAgICAgIGZvciAoY29uc3QgcyBvZiBzdWJmaWVsZHMpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRJZCA9IFtzLnNvdXJjZUNsYXNzLCBzLnByb3BlcnR5LmZrUHJvcGVydHksIHMuaXNPdXRnb2luZ10uam9pbignXycpXG4gICAgICAgICAgICAgIGNvbnN0IHN1YmZpZWxkSWQgPSBbcy5zb3VyY2VDbGFzcywgcy5wcm9wZXJ0eS5ma1Byb3BlcnR5LCBzLmlzT3V0Z29pbmcsIHMudGFyZ2V0Q2xhc3NdLmpvaW4oJ18nKVxuICAgICAgICAgICAgICBjb25zdCBmaWVsZENvbmZpZzogUHJvQ2xhc3NGaWVsZENvbmZpZyB8IHVuZGVmaW5lZCA9IGZpZWxkQ29uZmlnSWR4W2ZpZWxkSWRdO1xuICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgdGltZSB0aGUgZ3JvdXAgaXMgZXN0YWJsaXNoZWRcbiAgICAgICAgICAgICAgaWYgKCF1bmlxRmllbGRzW2ZpZWxkSWRdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzU3BlY2lhbEZpZWxkOiBTcGVjaWFsRmllbGRUeXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIYXNUeXBlRmllbGQpIGlzU3BlY2lhbEZpZWxkID0gJ2hhcy10eXBlJztcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnByb3BlcnR5LmZrUHJvcGVydHkgPT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOKSBpc1NwZWNpYWxGaWVsZCA9ICd0aW1lLXNwYW4nO1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0gPSB7XG4gICAgICAgICAgICAgICAgICBzb3VyY2VDbGFzczogcy5zb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUNsYXNzTGFiZWw6IHMuc291cmNlQ2xhc3NMYWJlbCxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZU1heFF1YW50aXR5OiBzLnNvdXJjZU1heFF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgc291cmNlTWluUXVhbnRpdHk6IHMuc291cmNlTWluUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNaW5RdWFudGl0eTogcy50YXJnZXRNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiBzLnRhcmdldE1heFF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IHMubGFiZWwsXG4gICAgICAgICAgICAgICAgICBpc0hhc1R5cGVGaWVsZDogcy5pc0hhc1R5cGVGaWVsZCxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBzLnByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogcy5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogcy5pZGVudGl0eURlZmluaW5nRm9yU291cmNlLFxuICAgICAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogcy5pZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgb250b0luZm9MYWJlbDogcy5vbnRvSW5mb0xhYmVsLFxuICAgICAgICAgICAgICAgICAgb250b0luZm9Vcmw6IHMub250b0luZm9VcmwsXG4gICAgICAgICAgICAgICAgICBhbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXMsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzOiBbcy50YXJnZXRDbGFzc10sXG4gICAgICAgICAgICAgICAgICBmaWVsZENvbmZpZyxcbiAgICAgICAgICAgICAgICAgIHBsYWNlT2ZEaXNwbGF5OiBnZXRQbGFjZU9mRGlzcGxheShzeXNDb25maWcuc3BlY2lhbEZpZWxkcywgcywgZmllbGRDb25maWcpLFxuICAgICAgICAgICAgICAgICAgaXNTcGVjaWFsRmllbGQsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRzOiB7XG4gICAgICAgICAgICAgICAgICAgIFtzLnRhcmdldENsYXNzXToge1xuICAgICAgICAgICAgICAgICAgICAgIGxpc3RUeXBlOiBzLmxpc3RUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogcy50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzc0xhYmVsOiBzLnRhcmdldENsYXNzTGFiZWxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG1hcmsgc3ViZmllbGQgYXMgYWRkZWRcbiAgICAgICAgICAgICAgICB1bmlxU3ViZmllbGRDYWNoZVtzdWJmaWVsZElkXSA9IHRydWU7XG5cblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGlnbm9yZSBkdXBsaWNhdGlvbnMgb2Ygc3ViZmllbGRzXG4gICAgICAgICAgICAgIGVsc2UgaWYgKCF1bmlxU3ViZmllbGRDYWNoZVtzdWJmaWVsZElkXSkge1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9PT0gZmFsc2UgP1xuICAgICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gZmFsc2UgOlxuICAgICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzO1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0udGFyZ2V0Q2xhc3Nlcy5wdXNoKHMudGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS50YXJnZXRzW3MudGFyZ2V0Q2xhc3NdID0ge1xuICAgICAgICAgICAgICAgICAgbGlzdFR5cGU6IHMubGlzdFR5cGUsXG4gICAgICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXMsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzczogcy50YXJnZXRDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzTGFiZWw6IHMudGFyZ2V0Q2xhc3NMYWJlbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzKHVuaXFGaWVsZHMpXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIHBpcGUgYWxsIHRoZSBzcGVjaWZpYyBmaWVsZHMgb2YgYSBjbGFzcyxcbiAgICogb3JkZXJlZCBieSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcywgbm9OZXN0aW5nKS5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHNcbiAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcylcbiAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbiAtIGIucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24pXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAgKiBwaXBlIGFsbCB0aGUgYmFzaWMgZmllbGRzIG9mIGEgY2xhc3MsXG4gICAgKiBvcmRlcmVkIGJ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBiYXNpYyBmaWVsZHNcbiAgICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUJhc2ljRmllbGRzT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUZpZWxkcyhwa0NsYXNzLCBub05lc3RpbmcpLnBpcGUoXG4gICAgICBtYXAoZmllbGRzID0+IGZpZWxkc1xuICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIGJhc2ljIGZpZWxkc1xuICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzKVxuICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgYmFzaWMgZmllbGRzXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzLnBvc2l0aW9uIC0gYi5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcy5wb3NpdGlvbilcbiAgICAgIClcbiAgICApXG4gIH1cblxuXG5cblxuICAvKipcbiAgICAgKiBQaXBlcyB0aGUgZmllbGRzIGZvciB0ZW1wb3JhbCBlbnRpdHkgZm9ybXNcbiAgICAgKiAtIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgKiAtIHRoZSB3aGVuIGZpZWxkXG4gICAgICogLSBpZiBhdmFpbGFibGU6IHRoZSB0eXBlIGZpZWxkXG4gICAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlRmllbGRzRm9yVGVFbkZvcm0ocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcywgbm9OZXN0aW5nKS5waXBlKFxuICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgIG1hcChhbGxGaWVsZHMgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZHMgPSBhbGxGaWVsZHNcbiAgICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkcyBhbmQgbm90IHJlbW92ZWQgZnJvbSBhbGwgcHJvZmlsZXNcbiAgICAgICAgICAuZmlsdGVyKGZpZWxkID0+IChmaWVsZC5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcyAmJiBmaWVsZC5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID09PSBmYWxzZSkpXG4gICAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uIC0gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbilcblxuICAgICAgICBjb25zdCB3aGVuRmllbGQgPSBhbGxGaWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTilcbiAgICAgICAgaWYgKHdoZW5GaWVsZCkgZmllbGRzLnB1c2god2hlbkZpZWxkKVxuXG4gICAgICAgIGNvbnN0IHR5cGVGaWVsZCA9IGFsbEZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlzSGFzVHlwZUZpZWxkKVxuICAgICAgICBpZiAodHlwZUZpZWxkKSBmaWVsZHMucHVzaCh0eXBlRmllbGQpXG5cbiAgICAgICAgcmV0dXJuIGZpZWxkcztcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG5cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgZmllbGRzIG9mIGdpdmVuIGNsYXNzIGluIHRoaXMgb3JkZXI6XG4gICAqIC0gYmFzaWMgZmllbGRzXG4gICAqIC0gc3BlY2lmaWMgZmllbGRzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzcywgbm9OZXN0aW5nKSxcbiAgICAgIHRoaXMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZylcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbYSwgYl0pID0+IFsuLi5hLCAuLi5iXSlcbiAgICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGVzIHRoZSBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3MgaW4gdGhpcyBvcmRlcjpcbiAgKiAtIHNwZWNpZmljIGZpZWxkc1xuICAqIC0gYmFzaWMgZmllbGRzXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZyksXG4gICAgICB0aGlzLnBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzcywgbm9OZXN0aW5nKSxcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbYSwgYl0pID0+IFsuLi5hLCAuLi5iXSlcbiAgICAgIClcbiAgfVxuXG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoXG4gICAgcHJvcGVydGllczogRGZoUHJvcGVydHlbXSxcbiAgICBpc091dGdvaW5nOiBib29sZWFuLFxuICAgIGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sXG4gICAgc3lzQ29uZmlnOiBTeXNDb25maWdWYWx1ZSxcbiAgICBub05lc3RpbmcgPSBmYWxzZVxuICApOiBPYnNlcnZhYmxlPFN1YmZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICBwcm9wZXJ0aWVzLm1hcChwID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGlwZVN1YmZpZWxkKGlzT3V0Z29pbmcsIHAsIHN5c0NvbmZpZywgZW5hYmxlZFByb2ZpbGVzLCBub05lc3RpbmcpO1xuICAgICAgfSlcbiAgICApXG5cbiAgfVxuXG5cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pXG4gIHBpcGVTdWJmaWVsZElkVG9TdWJmaWVsZChzb3VyY2VDbGFzczogbnVtYmVyLCBwcm9wZXJ0eTogbnVtYmVyLCB0YXJnZXRDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8U3ViZmllbGQ+IHtcbiAgICBjb25zdCBkb21haW4gPSBpc091dGdvaW5nID8gc291cmNlQ2xhc3MgOiB0YXJnZXRDbGFzcztcbiAgICBjb25zdCByYW5nZSA9IGlzT3V0Z29pbmcgPyB0YXJnZXRDbGFzcyA6IHNvdXJjZUNsYXNzO1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLnBrX3Byb3BlcnR5X19oYXNfZG9tYWluX19oYXNfcmFuZ2UkLmtleShbcHJvcGVydHksIGRvbWFpbiwgcmFuZ2VdLmpvaW4oJ18nKSlcbiAgICAgICAgLnBpcGUoZmlsdGVyKHggPT4ge1xuICAgICAgICAgIHJldHVybiAhIXhcbiAgICAgICAgfSkpLFxuICAgICAgdGhpcy5zLnN5cyQuY29uZmlnJC5tYWluJC5waXBlKGZpbHRlcih4ID0+IHtcbiAgICAgICAgcmV0dXJuICEheFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCkucGlwZShmaWx0ZXIoeCA9PiB7XG4gICAgICAgIHJldHVybiAhIXhcbiAgICAgIH0pKSxcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtkZmhQcm9wLCBzeXNDb25mLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB0aGlzLnBpcGVTdWJmaWVsZChcbiAgICAgICAgaXNPdXRnb2luZyxcbiAgICAgICAgZGZoUHJvcCxcbiAgICAgICAgc3lzQ29uZixcbiAgICAgICAgZW5hYmxlZFByb2ZpbGVzLFxuICAgICAgICBub05lc3RpbmdcbiAgICAgICkpXG4gICAgKVxuICB9XG5cblxuICBwcml2YXRlIHBpcGVTdWJmaWVsZChcbiAgICBpc091dGdvaW5nOiBib29sZWFuLFxuICAgIHA6IERmaFByb3BlcnR5LFxuICAgIHN5c0NvbmZpZzogU3lzQ29uZmlnVmFsdWUsXG4gICAgZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSxcbiAgICBub05lc3RpbmcgPSBmYWxzZVxuICApOiBPYnNlcnZhYmxlPFN1YmZpZWxkPiB7XG4gICAgY29uc3QgbyA9IGlzT3V0Z29pbmc7XG4gICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBvID8gcC5oYXNfcmFuZ2UgOiBwLmhhc19kb21haW47XG4gICAgY29uc3Qgc291cmNlQ2xhc3MgPSBvID8gcC5oYXNfZG9tYWluIDogcC5oYXNfcmFuZ2U7XG4gICAgY29uc3QgdGFyZ2V0TWF4UXVhbnRpdHkgPSBvID9cbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyIDpcbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjtcbiAgICBjb25zdCBzb3VyY2VNYXhRdWFudGl0eSA9IG8gP1xuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyIDpcbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyO1xuICAgIGNvbnN0IHRhcmdldE1pblF1YW50aXR5ID0gbyA/XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllciA6XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI7XG4gICAgY29uc3Qgc291cmNlTWluUXVhbnRpdHkgPSBvID9cbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllciA6XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjtcblxuICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIHdhbnRlZDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUNsYXNzTGFiZWwoc291cmNlQ2xhc3MpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCBzb3VyY2VDbGFzc0xhYmVsOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcblxuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlQ2xhc3NMYWJlbCh0YXJnZXRDbGFzcykucGlwZSh0YXAoeCA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIGZvdW5kIHRhcmdldENsYXNzTGFiZWw6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuXG4gICAgICAgIHJldHVybiB4XG4gICAgICB9KSksXG4gICAgICB0aGlzLnBpcGVTdWJmaWVsZFR5cGVPZkNsYXNzKHN5c0NvbmZpZywgdGFyZ2V0Q2xhc3MsIHRhcmdldE1heFF1YW50aXR5LCBwLnBrX3Byb3BlcnR5LCBub05lc3RpbmcpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCBzdWJmaWVsZFR5cGU6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlRmllbGRMYWJlbChwLnBrX3Byb3BlcnR5LCBpc091dGdvaW5nID8gcC5oYXNfZG9tYWluIDogbnVsbCwgaXNPdXRnb2luZyA/IG51bGwgOiBwLmhhc19yYW5nZSkucGlwZSh0YXAoeCA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIGZvdW5kIGZpZWxkTGFiZWw6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgIClcbiAgICAgIC5waXBlKG1hcCgoW3NvdXJjZUNsYXNzTGFiZWwsIHRhcmdldENsYXNzTGFiZWwsIGxpc3RUeXBlLCBsYWJlbF1cbiAgICAgICkgPT4ge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIGZvdW5kOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcblxuICAgICAgICBjb25zdCBub2RlOiBTdWJmaWVsZCA9IHtcbiAgICAgICAgICBsaXN0VHlwZSxcbiAgICAgICAgICBzb3VyY2VDbGFzcyxcbiAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsLFxuICAgICAgICAgIHNvdXJjZU1heFF1YW50aXR5LFxuICAgICAgICAgIHNvdXJjZU1pblF1YW50aXR5LFxuICAgICAgICAgIHRhcmdldENsYXNzLFxuICAgICAgICAgIHRhcmdldENsYXNzTGFiZWwsXG4gICAgICAgICAgdGFyZ2V0TWluUXVhbnRpdHksXG4gICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHksXG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgaXNIYXNUeXBlRmllbGQ6IG8gJiYgcC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSxcbiAgICAgICAgICBwcm9wZXJ0eTogeyBma1Byb3BlcnR5OiBwLnBrX3Byb3BlcnR5IH0sXG4gICAgICAgICAgaXNPdXRnb2luZzogbyxcbiAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiBvID8gcC5pZGVudGl0eV9kZWZpbmluZyA6IGZhbHNlLFxuICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IG8gPyBmYWxzZSA6IHAuaWRlbnRpdHlfZGVmaW5pbmcsXG4gICAgICAgICAgb250b0luZm9MYWJlbDogcC5pZGVudGlmaWVyX2luX25hbWVzcGFjZSxcbiAgICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8nICsgcC5wa19wcm9wZXJ0eSxcbiAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBpc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMoZW5hYmxlZFByb2ZpbGVzLCAocC5wcm9maWxlcyB8fCBbXSkpLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgdHlwZSBvZiBTdWJmaWVsZCBmb3IgYSBnaXZlbiBjbGFzc1xuICAgKlxuICAgKiBDdXJyZW50bHkgKHRvIGJlIHJldmlzZWQgaWYgZ29vZCkgc3VibGNhc3NlcyBvZiBFNTUgVHlwZSxcbiAgICogdGhhdCBhcmUgdGhlIHRhcmdldCBvZiBhIGZpZWxkIHdpdGggdGFyZ2V0TWF4UWFudGl0eT0xLFxuICAgKiBnZXQgU3ViZmllbGQgdHlwZSAnaGFzVHlwZScuXG4gICAqIFRoZXJlZm9yZSB0YXJnZXRNYXhRdWFudGl0eSBpcyBuZWVkZWQuXG4gICAqXG4gICAqIElmIHdlIGFyZSBuZXN0aW5nIHN1YmZpZWxkcywgd2UnbGwgZW5kIHVwIHdpdGggY2lyY3VsYXIgZmllbGRzLlxuICAgKiBFLmcuOiBQZXJzb24gMjEgLT4gaGFzIGFwcGVsbGF0aW9uIDExMTEgLT4gQXBwZVRlRW4gMzY1IC0+IGlzIGFwcGVsbGF0aW9uIG9mIDExMTEgLT4gUGVyc29uIDIxXG4gICAqIEluIG9yZGVyIHRvIGRldGVjdCB0aGVtLCB3ZSBjYW4gYWRkaXRpb25hbGx5IHBhc3MgaW4gdGhlIHBhcmVudCBwcm9wZXJ0eS5cbiAgICpcbiAgICogVGhpcyBiZWhhdmlvciBoYXMgdG8gYmUgcmV2aXNlZCwgYmVjYXVzZSBpdCBjYW4gbGVhZCB0byBwcm9ibGVtc1xuICAgKiB3aGVuIHRoZSBTdWJmaWVsZCBiZWxvbmdzIHRvIGEgRmllbGQgd2l0aCBtdWx0aXBsZSB0YXJnZXQgY2xhc3Nlc1xuICAgKiAoYW5kIHRodXMgU3ViZmllbGRzKSBiZWNhdXNlIHRoZSBVSSB0aGVuIGRvZXMgbm90IGFsbG93IHRvIGNob29zZVxuICAgKiB0aGUgcmlnaHQgdGFyZ2V0IGNsYXNzLlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVN1YmZpZWxkVHlwZU9mQ2xhc3MoY29uZmlnOiBTeXNDb25maWdWYWx1ZSwgcGtDbGFzczogbnVtYmVyLCB0YXJnZXRNYXhRdWFudGl0eTogbnVtYmVyLCBwYXJlbnRQcm9wZXJ0eT86IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEd2VGFyZ2V0VHlwZT4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKFxuICAgICAgZmlsdGVyKGkgPT4gISFpKSxcbiAgICAgIHN3aXRjaE1hcCgoa2xhc3MpID0+IHRoaXMucGlwZVN1YmZpZWxkVHlwZShjb25maWcsIGtsYXNzLCB0YXJnZXRNYXhRdWFudGl0eSwgcGFyZW50UHJvcGVydHksIG5vTmVzdGluZykpXG4gICAgKVxuICB9XG5cblxuICBwaXBlU3ViZmllbGRUeXBlKGNvbmZpZzogU3lzQ29uZmlnVmFsdWUsIGtsYXNzOiBEZmhDbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlciwgcGFyZW50UHJvcGVydHk/OiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxHdlRhcmdldFR5cGU+IHtcblxuICAgIGNvbnN0IHJlcyA9ICh4OiBHdlRhcmdldFR5cGUpID0+IG5ldyBCZWhhdmlvclN1YmplY3QoeClcbiAgICBsZXQgY2xhc3NDb25maWc6IENsYXNzQ29uZmlnXG4gICAgaWYgKGNvbmZpZykgY2xhc3NDb25maWcgPSBjb25maWcuY2xhc3Nlc1trbGFzcy5wa19jbGFzc107XG4gICAgaWYgKGNsYXNzQ29uZmlnICYmIGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSkge1xuICAgICAgcmV0dXJuIHJlcyhjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpXG4gICAgfVxuXG5cbiAgICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSAzMCAmJiB0YXJnZXRNYXhRdWFudGl0eSA9PSAxKSB7XG4gICAgICByZXR1cm4gcmVzKHsgdHlwZUl0ZW06ICd0cnVlJyB9KVxuICAgIH1cbiAgICAvLyBUT0RPIGFkZCB0aGlzIHRvIHN5c0NvbmZpZ1ZhbHVlXG4gICAgZWxzZSBpZiAoa2xhc3MucGtfY2xhc3MgPT09IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4pIHtcbiAgICAgIHJldHVybiByZXMoeyB0aW1lU3BhbjogJ3RydWUnIH0pXG4gICAgfVxuICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDggfHwga2xhc3MuYmFzaWNfdHlwZSA9PT0gMzAgfHwgbm9OZXN0aW5nKSB7XG4gICAgICByZXR1cm4gcmVzKHsgZW50aXR5UHJldmlldzogJ3RydWUnIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gcGlwZSB0aGUgc3ViZmllbGRzIG9mIHRoZSB0ZW1wb3JhbEVudGl0eSBjbGFzc1xuICAgICAgY29uc3Qgbm9OZXN0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0aGlzLnBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKGtsYXNzLnBrX2NsYXNzLCBub05lc3QpLnBpcGUoXG4gICAgICAgIG1hcChmaWVsZHMgPT4ge1xuICAgICAgICAgIGNvbnN0IHN1YmVudGl0eVN1YmZpZWxkUGFnZTogR3ZTdWJlbnRpdEZpZWxkUGFnZVJlcVtdID0gW11cbiAgICAgICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGZpZWxkcykge1xuICAgICAgICAgICAgLy8gZm9yIGVhY2ggb2YgdGhlc2Ugc3ViZmllbGRzXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGFnZTpHdlN1YmZpZWxkUGFnZVxuXG4gICAgICAgICAgICBjb25zdCBuZXN0ZWRUYXJnZXRzOiBHdlN1YmVudGl0eUZpZWxkVGFyZ2V0cyA9IHt9O1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZmllbGQudGFyZ2V0cykge1xuICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGZpZWxkLnRhcmdldHMsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0VHlwZSA9IGZpZWxkLnRhcmdldHNba2V5XS5saXN0VHlwZTtcbiAgICAgICAgICAgICAgICAvLyBwdXQgdGVtcG9yYWxFbnRpdHkgdG8gZW50aXR5UHJldmlld1xuICAgICAgICAgICAgICAgIGNvbnN0IHN1YlRhcmdldFR5cGU6IEd2U3ViZW50aXR5VGFyZ2V0VHlwZSA9IGxpc3RUeXBlLnRlbXBvcmFsRW50aXR5ID9cbiAgICAgICAgICAgICAgICAgIHsgZW50aXR5UHJldmlldzogJ3RydWUnIH0gOlxuICAgICAgICAgICAgICAgICAgbGlzdFR5cGVcbiAgICAgICAgICAgICAgICBuZXN0ZWRUYXJnZXRzW2tleV0gPSBzdWJUYXJnZXRUeXBlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpc0NpcmN1bGFyID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHBhcmVudFByb3BlcnR5ICYmXG4gICAgICAgICAgICAgIGZpZWxkLnByb3BlcnR5LmZrUHJvcGVydHkgPT0gcGFyZW50UHJvcGVydHkgJiZcbiAgICAgICAgICAgICAgZmllbGQudGFyZ2V0TWF4UXVhbnRpdHkgPT09IDFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBpc0NpcmN1bGFyID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbmVzdGVkUGFnZTogR3ZTdWJlbnRpdEZpZWxkUGFnZVJlcSA9IHtcbiAgICAgICAgICAgICAgdGFyZ2V0czogbmVzdGVkVGFyZ2V0cyxcbiAgICAgICAgICAgICAgcGFnZToge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5OiBmaWVsZC5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBmaWVsZC5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgICAgICBpc0NpcmN1bGFyXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YmVudGl0eVN1YmZpZWxkUGFnZS5wdXNoKG5lc3RlZFBhZ2UpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7IHRlbXBvcmFsRW50aXR5OiBzdWJlbnRpdHlTdWJmaWVsZFBhZ2UgfVxuICAgICAgICB9KSxcblxuICAgICAgKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldHMgY2xhc3MgZmllbGQgY29uZmlncyBvZiBnaXZlbiBwa0NsYXNzXG4gICAqXG4gICAqIC0gb2YgYWN0aXZlIHByb2plY3QsIGlmIGFueSwgZWxzZVxuICAgKiAtIG9mIGRlZmF1bHQgY29uZmlnIHByb2plY3QsIGVsc2VcbiAgICogLSBlbXB0eSBhcnJheVxuICAgKlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPFByb0NsYXNzRmllbGRDb25maWdbXT4ge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChma1Byb2plY3QpID0+IHtcblxuICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0a2V5ID0gcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXkoe1xuICAgICAgICAgIGZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZDogcGtDbGFzcyxcbiAgICAgICAgICBma19wcm9qZWN0OiBma1Byb2plY3RcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3RrZXkgPSBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSh7XG4gICAgICAgICAgZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkOiBwa0NsYXNzLFxuICAgICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1RcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5zLnBybyQuY2xhc3NfZmllbGRfY29uZmlnJC5ieV9ma19wcm9qZWN0X19ma19jbGFzcyQua2V5KGFjdGl2ZVByb2plY3RrZXkpLFxuICAgICAgICAgIHRoaXMucy5wcm8kLmNsYXNzX2ZpZWxkX2NvbmZpZyQuYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkLmtleShkZWZhdWx0UHJvamVjdGtleSlcbiAgICAgICAgKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKChbYWN0aXZlUHJvamVjdEZpZWxkcywgZGVmYXVsdFByb2plY3RGaWVsZHNdKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY3RpdmVQcm9qZWN0RmllbGRzICYmIHZhbHVlcyhhY3RpdmVQcm9qZWN0RmllbGRzKS5sZW5ndGgpIHJldHVybiBhY3RpdmVQcm9qZWN0RmllbGRzO1xuXG4gICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0UHJvamVjdEZpZWxkc1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKGl0ZW1zKSA9PiB2YWx1ZXMoaXRlbXMpLnNvcnQoKGEsIGIpID0+IChhLm9yZF9udW0gPiBiLm9yZF9udW0gPyAxIDogLTEpKSksXG4gICAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGNsYXNzIGxhYmVsIGZvciBhY3RpdmUgcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzTGFiZWwocGtDbGFzcz86IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMuYS5wa1Byb2plY3QkLFxuICAgICAgdGhpcy5hLnBpcGVBY3RpdmVEZWZhdWx0TGFuZ3VhZ2UoKVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2ZrUHJvamVjdCwgbGFuZ3VhZ2VdKSA9PiB0aGlzLnBpcGVMYWJlbHMoeyBwa0NsYXNzLCBma1Byb2plY3QsIGxhbmd1YWdlLCB0eXBlOiAnbGFiZWwnIH0pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGkgPSBpdGVtcy5maW5kKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICAgcmV0dXJuIGkgPyBpLnRleHQgOiBgKiBubyBsYWJlbCAoaWQ6ICR7cGtDbGFzc30pICpgXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBhcnJheSBvZiBvYmplY3RzIHdpdGhcbiAgICogdGV4dCB+IHRoZSB0ZXh0IG9mIHRoZSBwcm9wZXJ0eVxuICAgKiBvcmlnaW4sIGluIHRoaXMgb3JkZXI6XG4gICAqIC0gb3JpZ2luID09ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgICAgICAgICAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJyAgICAgIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyAgICAgICAgICAoZnJvbSBkYXRhX2Zvcl9oaXN0b3J5LmxhYmVsKVxuICAgKiAtIG9yaWdpbiA9PSAnb2Ygb250b21lIGluIGVuZ2xpc2gnICAgICAgICAgICAgICAgKGZyb20gZGF0YV9mb3JfaGlzdG9yeS5sYWJlbClcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVMYWJlbHMoZDoge1xuICAgIGZrUHJvamVjdDogbnVtYmVyLFxuICAgIHR5cGU6ICdsYWJlbCcgfCAnZGVmaW5pdGlvbicgfCAnc2NvcGVOb3RlJyxcbiAgICBsYW5ndWFnZTogSW5mTGFuZ3VhZ2UsXG4gICAgcGtDbGFzcz86IG51bWJlcixcbiAgICBma1Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHlEb21haW4/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eVJhbmdlPzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTx7XG4gICAgb3JpZ2luOiBMYWJlbE9yaWdpblxuICAgIHRleHQ6IHN0cmluZ1xuICB9W10+IHtcbiAgICBsZXQgZmtfc3lzdGVtX3R5cGU6IG51bWJlcjtcblxuICAgIGlmIChkLnBrQ2xhc3MpIHtcbiAgICAgIHN3aXRjaCAoZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xhYmVsJzpcbiAgICAgICAgICBma19zeXN0ZW1fdHlwZSA9IFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUxcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZrX3N5c3RlbV90eXBlIG5vdCBmb3VuZCcpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGQuZmtQcm9wZXJ0eSkge1xuICAgICAgc3dpdGNoIChkLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGFiZWwnOlxuICAgICAgICAgIGZrX3N5c3RlbV90eXBlID0gU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignZmtfc3lzdGVtX3R5cGUgbm90IGZvdW5kJylcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgLy8gbGFiZWwgb2YgcHJvamVjdCBpbiBkZWZhdWx0IGxhbmd1YWdlIG9mIHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IGQuZmtQcm9qZWN0LFxuICAgICAgICBma19sYW5ndWFnZTogZC5sYW5ndWFnZS5wa19lbnRpdHksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIG9mIGRlZmF1bHQgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UucGtfZW50aXR5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIG9mIGRlZmF1bHQgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IDE4ODg5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBmcm9tIG9udG9tZSBpbiBkZWZhdWx0IGxhbmd1YWdlIG9mIHByb2plY3RcbiAgICAgIHRoaXMucGlwZURmaExhYmVsKHtcbiAgICAgICAgbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UuaXNvNjM5MS50cmltKCksXG4gICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgIGZrX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX3Byb3BlcnR5OiBkLmZrUHJvcGVydHlcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLmxhYmVsIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgZnJvbSBvbnRvbWUgaW4gZW5nbGlzaFxuICAgICAgdGhpcy5waXBlRGZoTGFiZWwoe1xuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgZmtfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLmxhYmVsIH1cbiAgICAgIH0pKSxcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgUHJvVGV4dFByb3BlcnR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvVGV4dFByb3BlcnR5KGQ6IHtcbiAgICBma19wcm9qZWN0OiBudW1iZXIsXG4gICAgZmtfc3lzdGVtX3R5cGU6IG51bWJlcixcbiAgICBma19sYW5ndWFnZTogbnVtYmVyLFxuICAgIGZrX2RmaF9jbGFzcz86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbj86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPFByb1RleHRQcm9wZXJ0eT4ge1xuICAgIGNvbnN0IGtleSA9IHRleHRQcm9wZXJ0eUJ5RmtzS2V5KGQpXG4gICAgcmV0dXJuIHRoaXMucy5wcm8kLnRleHRfcHJvcGVydHkkLmJ5X2ZrcyQua2V5KGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyBEZmhMYWJlbFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZURmaExhYmVsKGQ6IHtcbiAgICB0eXBlOiAnbGFiZWwnIHwgJ2RlZmluaXRpb24nIHwgJ3Njb3BlTm90ZScsXG4gICAgbGFuZ3VhZ2U6IHN0cmluZyxcbiAgICBma19jbGFzcz86IG51bWJlcixcbiAgICBma19wcm9maWxlPzogbnVtYmVyLFxuICAgIGZrX3Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrX3Byb2plY3Q/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPERmaExhYmVsPiB7XG4gICAgY29uc3Qga2V5ID0gZGZoTGFiZWxCeUZrc0tleShkKVxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5sYWJlbCQuYnlfZmtzJC5rZXkoa2V5KVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGJlc3QgZml0dGluZyBmaWVsZCBsYWJlbCBmb3IgYWN0aXZlIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkTGFiZWwoZmtQcm9wZXJ0eTogbnVtYmVyLCBma1Byb3BlcnR5RG9tYWluOiBudW1iZXIsIGZrUHJvcGVydHlSYW5nZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBjb25zdCBpc091dGdvaW5nID0gISFma1Byb3BlcnR5RG9tYWluO1xuICAgIC8vIGNvbnN0IHN5c3RlbV90eXBlID0gaXNPdXRnb2luZyA/IChzaW5ndWxhciA/IDE4MCA6IDE4MSkgOiAoc2luZ3VsYXIgPyAxODIgOiAxODMpXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMuYS5wa1Byb2plY3QkLFxuICAgICAgdGhpcy5hLnBpcGVBY3RpdmVEZWZhdWx0TGFuZ3VhZ2UoKVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2ZrUHJvamVjdCwgbGFuZ3VhZ2VdKSA9PiB0aGlzLnBpcGVMYWJlbHMoXG4gICAgICAgIHtcbiAgICAgICAgICBma1Byb2plY3QsXG4gICAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICBma1Byb3BlcnR5LFxuICAgICAgICAgIGZrUHJvcGVydHlEb21haW4sXG4gICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlXG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IGAqIG5vIGxhYmVsIChpZDogJHtma1Byb3BlcnR5fSkgKmA7XG4gICAgICAgICAgICBpdGVtcy5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpdGVtICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfHxcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfHxcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGl0ZW0udGV4dFxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgaXRlbSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgfHxcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2Ygb250b21lIGluIGVuZ2xpc2gnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGlzT3V0Z29pbmcgPyBpdGVtLnRleHQgOiAnKiByZXZlcnNlIG9mOiAnICsgaXRlbS50ZXh0ICsgJyonXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBsYWJlbFxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBtYXBzIHRoZSBjbGFzcyB0byB0aGUgY29ycmVzcG9uZGluZyBtb2RlbCAoZGF0YWJhc2UgdGFibGUpXG4gICAqIHRoaXMgaXMgdXNlZCBieSBGb3JtcyB0byBjcmVhdGUgbmV3IGRhdGEgaW4gdGhlIHNoYXBlIG9mXG4gICAqIHRoZSBkYXRhIG1vZGVsXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGFibGVOYW1lT2ZDbGFzcyh0YXJnZXRDbGFzc1BrOiBudW1iZXIpOiBPYnNlcnZhYmxlPFRhYmxlTmFtZT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLnN5cyQuY29uZmlnJC5tYWluJCxcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHRhcmdldENsYXNzUGspXG4gICAgKS5waXBlKFxuICAgICAgZmlsdGVyKGkgPT4gIWkuaW5jbHVkZXModW5kZWZpbmVkKSksXG4gICAgICBtYXAoKFtjb25maWcsIGtsYXNzXSkgPT4ge1xuICAgICAgICBjb25zdCBjbGFzc0NvbmZpZzogQ2xhc3NDb25maWcgPSBjb25maWcuY2xhc3Nlc1t0YXJnZXRDbGFzc1BrXTtcbiAgICAgICAgaWYgKGNsYXNzQ29uZmlnICYmIGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSkge1xuXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSlcbiAgICAgICAgICBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm5cbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzWzBdO1xuICAgICAgICAgIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiAnYXBwZWxsYXRpb24nO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuICdsYW5ndWFnZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLnBsYWNlKSByZXR1cm4gJ3BsYWNlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUudGltZVByaW1pdGl2ZSkgcmV0dXJuICd0aW1lX3ByaW1pdGl2ZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiAnbGFuZ19zdHJpbmcnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5kaW1lbnNpb24pIHJldHVybiAnZGltZW5zaW9uJztcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdCB0eXBlJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOCB8fCBrbGFzcy5iYXNpY190eXBlID09PSAzMCkge1xuICAgICAgICAgIHJldHVybiAncGVyc2lzdGVudF9pdGVtJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiAndGVtcG9yYWxfZW50aXR5J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBDbGFzc2VzXG4gICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3Q6XG4gICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgZW5hYmxlZCBieSBjbGFzc19wcm9qX3JlbFxuICAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIHJlcXVpcmVkIGJ5IHNvdXJjZXNcbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWxsIHRvIGNyZWF0ZSBzZWxlY3QgZHJvcGRvd25zIG9mIGNsYXNzZXMgdXNlcnMgd2lsbCBrbm93XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0luRW50aXRpZXNPclNvdXJjZXMoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbiAgICAgIHRoaXMucGlwZUNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4gICAgICBzdGFydFdpdGgoe30pXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKVxuICAgICAgLnBpcGUobWFwKGMgPT4gdmFsdWVzKGMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSlcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICAqIG9mIGFsbCBjbGFzc2VzIHRoYXQgYXJlIGVuYWJsZWQgYnkgYXQgbGVhc3Qgb25lIG9mIHRoZSBhY3RpdmF0ZWQgcHJvZmlsZXNcbiAgICogb2YgdGh0ZSBnaXZlbiBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0VuYWJsZWRCeVByb2plY3RQcm9maWxlcygpOiBPYnNlcnZhYmxlPERmaENsYXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5hbGwkLFxuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbY2xhc3Nlc0J5UGssIGVuYWJsZWRQcm9maWxlc10pID0+IHtcbiAgICAgICAgY29uc3QgcHJvZmlsZXNNYXAgPSBpbmRleEJ5KChrKSA9PiBrLnRvU3RyaW5nKCksIHZhbHVlcyhlbmFibGVkUHJvZmlsZXMpKVxuICAgICAgICByZXR1cm4gdmFsdWVzKGNsYXNzZXNCeVBrKVxuICAgICAgICAgIC5maWx0ZXIoa2xhc3MgPT4ga2xhc3MucHJvZmlsZXMuc29tZShwcm9maWxlID0+IHByb2ZpbGVzTWFwW3Byb2ZpbGUuZmtfcHJvZmlsZV0pKVxuICAgICAgfSlcbiAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgKiBvZiBhbGwgdHlwZSBjbGFzc2VzIHRoYXQgYXJlIGVuYWJsZWQgYnkgYXQgbGVhc3Qgb25lIG9mIHRoZSBhY3RpdmF0ZWQgcHJvZmlsZXNcbiAgKiBvZiB0aHRlIGdpdmVuIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVDbGFzc2VzRW5hYmxlZEJ5UHJvamVjdFByb2ZpbGVzKCk6IE9ic2VydmFibGU8RGZoQ2xhc3NbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9iYXNpY190eXBlJC5rZXkoMzApLFxuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbY2xhc3Nlc0J5UGssIGVuYWJsZWRQcm9maWxlc10pID0+IHtcbiAgICAgICAgY29uc3QgcHJvZmlsZXNNYXAgPSBpbmRleEJ5KChrKSA9PiBrLnRvU3RyaW5nKCksIHZhbHVlcyhlbmFibGVkUHJvZmlsZXMpKVxuICAgICAgICByZXR1cm4gdmFsdWVzKGNsYXNzZXNCeVBrKVxuICAgICAgICAgIC5maWx0ZXIoa2xhc3MgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtsYXNzLnByb2ZpbGVzLnNvbWUocHJvZmlsZSA9PiBwcm9maWxlc01hcFtwcm9maWxlLmZrX3Byb2ZpbGVdKSAmJlxuICAgICAgICAgICAgICAvLyBFeGNsdWRlIE1hbmlmZXN0YXRpb24gcHJvZHVjdCB0eXBlIGFuZCBsYW5ndWFnZVxuICAgICAgICAgICAgICAhW1xuICAgICAgICAgICAgICAgIERmaENvbmZpZy5DTEFTU19QS19MQU5HVUFHRSxcbiAgICAgICAgICAgICAgICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9QUk9EVUNUX1RZUEVcbiAgICAgICAgICAgICAgXS5pbmNsdWRlcyhrbGFzcy5wa19jbGFzcylcbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyZSB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICAqIG9mIGFsbCBjbGFzc2VzIHRoYXQgYXJlIGVuYWJsZWQgYnkgYWN0aXZlIHByb2plY3QgKHVzaW5nIGNsYXNzX3Byb2pfcmVsKVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9jbGFzc19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZWxzKSA9PiB2YWx1ZXMocmVscykubWFwKHJlbCA9PiByZWwuZmtfY2xhc3MpKVxuICAgICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgVGVFbiBDbGFzc2VzXG4gICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU2VsZWN0ZWRUZUVuQ2xhc3Nlc0luUHJvamVjdCgpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVRlRW5DbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbiAgICAgIHRoaXMucGlwZVRlRW5DbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuICAgICAgc3RhcnRXaXRoKHt9KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFycmF5IG9mIHBrX2NsYXNzIHdpdGggdGVFbiBjbGFzc2VzIGVuYWJsZWQgaW4gZW50aXRpZXNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUZUVuQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX2NsYXNzX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGNzKSA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHZhbHVlcyhjcykubWFwKGMgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkoYy5ma19jbGFzcykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICApKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKGRmaENsYXNzZXMgPT4gdGhpcy5maWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXMpKVxuICAgICAgICApKVxuICAgICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgICogRmlsdGVycyBhcnJheSBvZiBEZmhDbGFzcyBmb3IgVGVFbiBDbGFzc2VzIGFuZCByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzXG4gICAqIEBwYXJhbSBkZmhDbGFzc2VzIGFycmF5IG9mIERmaENsYXNzXG4gICAqIEByZXR1cm5zIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3Mgd2hlcmUgY2xhc3MgaXMgVGVFbiBjbGFzc1xuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXM6IERmaENsYXNzW10pOiBudW1iZXJbXSB7XG4gICAgY29uc3QgcGtzOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGZoQ2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYyA9IGRmaENsYXNzZXNbaV07XG4gICAgICBpZiAoYy5iYXNpY190eXBlID09PSA5KSBwa3MucHVzaChjLnBrX2NsYXNzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBrcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFycmF5IG9mIHBrX2NsYXNzIHdpdGggdGVFbiBjbGFzc2VzIHJlcXVpcmVkIGJ5IHNvdXJjZXNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUZUVuQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKCkge1xuICAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChjcykgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB2YWx1ZXMoY3MpLm1hcChjID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KGMuZmtfY2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChkZmhDbGFzc2VzID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlcylcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgICAgKVxuICB9XG5cblxuXG5cblxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVBbmRUeXBlZENsYXNzZXMoZW5hYmxlZEluPzogJ2VudGl0aWVzJyB8ICdzb3VyY2VzJyk6IE9ic2VydmFibGU8eyB0eXBlZENsYXNzOiBudW1iZXIsIHR5cGVDbGFzczogbnVtYmVyIH1bXT4ge1xuXG4gICAgbGV0IHBrcyQ6IE9ic2VydmFibGU8bnVtYmVyW10+W107XG5cbiAgICBjb25zdCBmcm9tU291cmNlcyQgPSB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoY2xhc3NlcyA9PiB2YWx1ZXMoY2xhc3NlcykubWFwKGsgPT4gay5ma19jbGFzcykpLFxuICAgIClcblxuICAgIGNvbnN0IGZyb21FbnRpdGllcyQgPSB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKVxuXG4gICAgaWYgKGVuYWJsZWRJbiA9PT0gJ3NvdXJjZXMnKSB7XG4gICAgICBwa3MkID0gW2Zyb21Tb3VyY2VzJF07XG4gICAgfSBlbHNlIGlmIChlbmFibGVkSW4gPT09ICdlbnRpdGllcycpIHtcbiAgICAgIHBrcyQgPSBbZnJvbUVudGl0aWVzJF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBrcyQgPSBbZnJvbVNvdXJjZXMkLCBmcm9tRW50aXRpZXMkXVxuICAgIH1cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHBrcyQpLnBpcGUoXG4gICAgICBtYXAoYXJyYXlPZlBrQXJyYXlzID0+IHVuaXEoZmxhdHRlbjxudW1iZXI+KGFycmF5T2ZQa0FycmF5cykpKSxcbiAgICAgIHN3aXRjaE1hcChwa3MgPT4gdGhpcy5waXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKHBrcykpXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3Nlcyhwa1R5cGVkQ2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPHsgdHlwZWRDbGFzczogbnVtYmVyLCB0eXBlQ2xhc3M6IG51bWJlciB9W10+IHtcblxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19kb21haW4udG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gcGtUeXBlZENsYXNzZXMubWFwKHBrID0+ICh7XG4gICAgICAgICAgdHlwZWRDbGFzczogcGssXG4gICAgICAgICAgdHlwZUNsYXNzOiBieURvbWFpbltwa10gPyBieURvbWFpbltwa10uaGFzX3JhbmdlIDogdW5kZWZpbmVkXG4gICAgICAgIH0pKVxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUNsYXNzT2ZUeXBlZENsYXNzKHBrVHlwZWRDbGFzcyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX2RvbWFpbi50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBieURvbWFpbltwa1R5cGVkQ2xhc3NdID8gYnlEb21haW5bcGtUeXBlZENsYXNzXS5oYXNfcmFuZ2UgOiB1bmRlZmluZWRcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXMocGtUeXBlQ2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfcmFuZ2UudG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gcGtUeXBlQ2xhc3Nlcy5tYXAocGsgPT4gYnlEb21haW5bcGtdID8gYnlEb21haW5bcGtdLmhhc19kb21haW4gOiB1bmRlZmluZWQpXG4gICAgICB9KSlcbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVQcm9wZXJ0eU9mVHlwZWRDbGFzcyhwa1R5cGVkQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCB0eXBlUHJvcCA9IHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpLmZpbmQocCA9PiBwLmhhc19kb21haW4gPT09IHBrVHlwZWRDbGFzcylcbiAgICAgICAgcmV0dXJuIHR5cGVQcm9wID8gdHlwZVByb3AucGtfcHJvcGVydHkgOiB1bmRlZmluZWQ7XG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKHBrUHJvcGVydGllczogbnVtYmVyW10sIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9wa19wcm9wZXJ0eSQuYWxsJC5waXBlKFxuICAgICAgbWFwKHggPT4ge1xuICAgICAgICBpZiAoIXBrUHJvcGVydGllcyB8fCAhcGtQcm9wZXJ0aWVzLmxlbmd0aCkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IHJlcyA9IFtdXG4gICAgICAgIGNvbnN0IHRhcmdldENsYXNzZXMgPSB7fTtcbiAgICAgICAgcGtQcm9wZXJ0aWVzLmZvckVhY2gocGtQcm9wID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9wcyA9IHZhbHVlcyh4W3BrUHJvcF0pO1xuICAgICAgICAgIHByb3BzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDbGFzcyA9IGlzT3V0Z29pbmcgPyBwcm9wLmhhc19yYW5nZSA6IHByb3AuaGFzX2RvbWFpbjtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0Q2xhc3Nlc1t0YXJnZXRDbGFzc10pIHtcbiAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3Nlc1t0YXJnZXRDbGFzc10gPSB0cnVlO1xuICAgICAgICAgICAgICByZXMucHVzaCh0YXJnZXRDbGFzcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSlcbiAgICApXG4gIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc0RlZmluaXRpb25Qcm9wZXJ0eShkb21haW5DbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cblxuICBjb25zdCBoYXNEZWZpbml0aW9uOiBEZmhQcm9wZXJ0eSA9IHtcbiAgICBoYXNfZG9tYWluOiBkb21haW5DbGFzcyxcbiAgICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX1AxOF9IQVNfREVGSU5JVElPTixcbiAgICBoYXNfcmFuZ2U6IDc4NSxcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdQMTgnLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiBmYWxzZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0RlZmluaXRpb25cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIYXNUaW1lU3BhblByb3BlcnR5KGRvbWFpbkNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuICBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogZG9tYWluQ2xhc3MsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOLFxuICAgIGhhc19yYW5nZTogRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTixcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdQNCcsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IGZhbHNlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzQXBwZVByb3Bcbn1cblxuXG5mdW5jdGlvbiBpc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMoZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSwgcHJvZmlsZXM6IFJlbGF0ZWRQcm9maWxlW10pOiBib29sZWFuIHtcbiAgcmV0dXJuICFwcm9maWxlcy5zb21lKHAgPT4gcC5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSAmJiBlbmFibGVkUHJvZmlsZXMuaW5jbHVkZXMocC5ma19wcm9maWxlKSlcblxufVxuXG5mdW5jdGlvbiBnZXRQbGFjZU9mRGlzcGxheShzcGVjaWFsRmllbGRzOiBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBzdWJmaWVsZDogU3ViZmllbGQsIHByb2plY3RGaWVsZENvbmZpZz86IFByb0NsYXNzRmllbGRDb25maWcpOiBGaWVsZFBsYWNlT2ZEaXNwbGF5IHtcbiAgbGV0IHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXk7XG5cbiAgc2V0dGluZ3MgPSBnZXRTZXR0aW5nc0Zyb21TeXNDb25maWcoc3ViZmllbGQsIHNwZWNpYWxGaWVsZHMsIHNldHRpbmdzKTtcblxuICAvLyBpZiB0aGlzIGlzIGEgc3BlY2lhbCBmaWVsZCwgY3JlYXRlIGNvcnJlc3BvbmRpbmcgZGlzcGxheSBzZXR0aW5ncyBhbmQgcmV0dXJuIGl0XG4gIGlmIChzZXR0aW5ncykge1xuICAgIGlmIChzZXR0aW5ncy5kaXNwbGF5SW5CYXNpY0ZpZWxkcykge1xuICAgICAgcmV0dXJuIHsgYmFzaWNGaWVsZHM6IHsgcG9zaXRpb246IHNldHRpbmdzLmRpc3BsYXlJbkJhc2ljRmllbGRzLnBvc2l0aW9uIH0gfVxuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MuaGlkZGVuKSB7XG4gICAgICByZXR1cm4geyBoaWRkZW46IHRydWUgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG90aGVyd2lzZSBkaXNwbGF5IHRoZSBmaWVsZCBpbiBzcGVjaWZpYyBmaWVsZHMgKGRlZmF1bHQpXG4gIGxldCBwb3NpdGlvbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgaWYgKHByb2plY3RGaWVsZENvbmZpZykgcG9zaXRpb24gPSBwcm9qZWN0RmllbGRDb25maWcub3JkX251bVxuICByZXR1cm4geyBzcGVjaWZpY0ZpZWxkczogeyBwb3NpdGlvbiB9IH1cblxufVxuZnVuY3Rpb24gZ2V0U2V0dGluZ3NGcm9tU3lzQ29uZmlnKFxuICBzdWJmaWVsZDogU3ViZmllbGQsIHNwZWNpYWxGaWVsZHM6IFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXkpIHtcbiAgaWYgKHN1YmZpZWxkLmlzT3V0Z29pbmcpIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgaGFzLXR5cGUtc3VicHJvcGVydHlcbiAgICBpZiAoc3ViZmllbGQuaXNIYXNUeXBlRmllbGQgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaGFzVHlwZVN1YnByb3BlcnRpZXMpIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5oYXNUeXBlU3VicHJvcGVydGllcztcbiAgICB9XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IHNvdXJjZSBjbGFzcyBhbmQgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LmZrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LmZrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgc291cmNlIGNsYXNzIGFuZCBwcm9wZXJ0eVxuICAgIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5ma1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LmZrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LmZrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2V0dGluZ3M7XG59XG5cblxuXG5cblxuXG4vKipcbiAqIFBpcGVzIHRoZSBmaWVsZHMgZm9yIHRlbXBvcmFsIGVudGl0eSBmb3Jtc1xuICogLSB0aGUgc3BlY2lmaWMgZmllbGRzXG4gKiAtIHRoZSB3aGVuIGZpZWxkXG4gKiAtIGlmIGF2YWlsYWJsZTogdGhlIHR5cGUgZmllbGRcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkRGVmaW5pdGlvbnNGb3JUZUVuRm9ybShwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vICAgcmV0dXJuIG9mKFtdKVxuLy8gY29uc3QgaGFzVHlwZUxpc3REZWYkID0gdGhpcy5waXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3MpXG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZERlZmluaXRpb25zKHBrQ2xhc3MpXG4vLyAgICAgLnBpcGUoXG4vLyAgICAgICBtYXAoZmllbGRzID0+IGZpZWxkcy5maWx0ZXIoZiA9PiBmLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlKSlcbi8vICAgICApXG4vLyAgICxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gKS5waXBlKFxuLy8gICBtYXAoKFtmaWVsZHMsIGhhc1R5cGVMaXN0RGVmc10pID0+IHtcbi8vICAgICBjb25zdCB3aGVuID0gdGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTilcbi8vICAgICByZXR1cm4gW1xuLy8gICAgICAgLi4uZmllbGRzLFxuLy8gICAgICAgd2hlbixcbi8vICAgICAgIC4uLmhhc1R5cGVMaXN0RGVmcy5tYXAoKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgICAgICByZXR1cm4gdHlwZUZpZWxkO1xuLy8gICAgICAgfSlcbi8vICAgICBdXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLyoqXG4gKiBQaXBlIHRoZSBzcGVjaWZpYyBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNwZWNpZmljRmllbGREZWZpbml0aW9ucyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCB0cnVlKS5waXBlKFxuLy8gICAgIC8vIGZpbHRlciBvdXQgdGhlICdoYXMgdHlwZScgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKG91dGdvaW5nID0+IG91dGdvaW5nLmZpbHRlcihvID0+ICFvLmlzX2hhc190eXBlX3N1YnByb3BlcnR5KSlcbi8vICAgKSxcbi8vICAgdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgZmFsc2UpLnBpcGUoXG4vLyAgICAgLy8gZmlsdGVyIG91dCB0aGUgJ2hhcyBhcHBlbGxhdGlvbicgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKGluZ29pbmcgPT4gaW5nb2luZy5maWx0ZXIoaSA9PlxuLy8gICAgICAgaS5wa19wcm9wZXJ0eSAhPT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GXG4vLyAgICAgICAmJiBpLnBrX3Byb3BlcnR5ICE9PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfR0VPVlAxX0lTX1JFUFJPRFVDVElPTl9PRlxuLy8gICAgICkpXG4vLyAgICksXG4vLyAgIHRoaXMucGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzKVxuLy8gKS5waXBlKFxuLy8gICBzd2l0Y2hNYXAoKFtvdXRnb2luZywgaW5nb2luZywgZmllbGRDb25maWdzXSkgPT4ge1xuXG4vLyAgICAgY29uc3Qga2V5ID0gKGZjOiBQYXJ0aWFsPFByb0NsYXNzRmllbGRDb25maWc+KSA9PiBgJHtmYy5ma19wcm9wZXJ0eX1fJHtmYy5ma19kb21haW5fY2xhc3N9XyR7ZmMuZmtfcmFuZ2VfY2xhc3N9YDtcbi8vICAgICBjb25zdCBpbmRleGVkID0gaW5kZXhCeSgoZmMpID0+IGAke2ZjLmZrX3Byb3BlcnR5fV8ke2ZjLmZrX2RvbWFpbl9jbGFzc31fJHtmYy5ma19yYW5nZV9jbGFzc31gLCBmaWVsZENvbmZpZ3MpXG4vLyAgICAgY29uc3QgZ2V0RmllbGRDb25maWcgPSAobGlzdERlZjogU3ViZmllbGQpOiBQcm9DbGFzc0ZpZWxkQ29uZmlnID0+IHtcbi8vICAgICAgIHJldHVybiBpbmRleGVkW2tleSh7XG4vLyAgICAgICAgIGZrX3Byb3BlcnR5OiBsaXN0RGVmLnByb3BlcnR5LnBrUHJvcGVydHksXG4vLyAgICAgICAgIGZrX2RvbWFpbl9jbGFzczogbGlzdERlZi5pc091dGdvaW5nID8gbGlzdERlZi5zb3VyY2VDbGFzcyA6IG51bGwsXG4vLyAgICAgICAgIGZrX3JhbmdlX2NsYXNzOiBsaXN0RGVmLmlzT3V0Z29pbmcgPyBudWxsIDogbGlzdERlZi5zb3VyY2VDbGFzcyxcbi8vICAgICAgIH0pXVxuLy8gICAgIH1cblxuLy8gICAgIC8vIENyZWF0ZSBsaXN0IGRlZmluaXRpb25zXG4vLyAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoaW5nb2luZywgZmFsc2UpLFxuLy8gICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKG91dGdvaW5nLCB0cnVlKVxuLy8gICAgICkucGlwZShcbi8vICAgICAgIG1hcCgoW2luZ29pbmdMaXN0RGVmcywgb3V0Z29pbmdMaXN0RGVmc10pID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZmluaXRpb25zID0gWy4uLmluZ29pbmdMaXN0RGVmcywgLi4ub3V0Z29pbmdMaXN0RGVmc107XG5cbi8vICAgICAgICAgLy8gQ3JlYXRlIGZpZWxkIGRlZmluaXRpb25zXG4vLyAgICAgICAgIGNvbnN0IGZpZWxkRGVmczogeyBba2V5OiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbi8vICAgICAgICAgbGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZiA9PiB7XG5cbi8vICAgICAgICAgICBjb25zdCBrID0gbGlzdERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5ICsgJ18nICsgbGlzdERlZi5pc091dGdvaW5nO1xuXG4vLyAgICAgICAgICAgaWYgKCFmaWVsZERlZnNba10pIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXSA9IHtcbi8vICAgICAgICAgICAgICAgLi4ubGlzdERlZixcbi8vICAgICAgICAgICAgICAgcGxhY2VPZkRpc3BsYXk6IHt9LFxuLy8gICAgICAgICAgICAgICBhbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgZmllbGRDb25maWc6IGdldEZpZWxkQ29uZmlnKGxpc3REZWYpLFxuLy8gICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbnM6IFtsaXN0RGVmXSxcbi8vICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW2xpc3REZWYudGFyZ2V0Q2xhc3NdXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXS5saXN0RGVmaW5pdGlvbnMucHVzaChsaXN0RGVmKVxuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdLnRhcmdldENsYXNzZXMucHVzaChsaXN0RGVmLnRhcmdldENsYXNzKVxuLy8gICAgICAgICAgIH1cblxuLy8gICAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICB9KVxuLy8gICAgICAgICAvLyBPcmRlciB0aGUgZmllbGRzIGFjY29yZGluZyB0byBvcmRfbnVtIChmcm9tIHByb2plY3QncyBjb25maWcsIGtsZWlvbGFiJ3MgY29uZmlnKSBvciBwdXQgaXQgYXQgZW5kIG9mIGxpc3QuXG4vLyAgICAgICAgIHJldHVybiBzb3J0KFxuLy8gICAgICAgICAgIChhLCBiKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zdCBnZXRPcmROdW0gPSAoaXRlbTogRmllbGQpID0+IHtcbi8vICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5maWVsZENvbmZpZykgcmV0dXJuIGl0ZW0uZmllbGRDb25maWcub3JkX251bTtcbi8vICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGNvbnN0IG9yZE51bUEgPSBnZXRPcmROdW0oYSk7XG4vLyAgICAgICAgICAgICBjb25zdCBvcmROdW1CID0gZ2V0T3JkTnVtKGIpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIG9yZE51bUEgLSBvcmROdW1CO1xuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgdmFsdWVzKGZpZWxkRGVmcykpXG4vLyAgICAgICB9KVxuLy8gICAgIClcbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vKipcbiAqIFBpcGUgdGhlIGZpZWxkcyBmb3IgaWRlbnRpZmljYXRpb24gb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZURlZmF1bHRGaWVsZERlZmluaXRpb25zKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG5cbi8vIC8qKlxuLy8gICogUGlwZSB0aGUgZ2VuZXJpYyBmaWVsZCBoYXMgYXBwZWxsYXRpb25cbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eVN0YXR1cyA9IHtcbi8vICAgaGFzX2RvbWFpbjogRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSxcbi8vICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRixcbi8vICAgaGFzX3JhbmdlOiBwa0NsYXNzLFxuLy8gICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbi8vICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMCxcbi8vICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuLy8gICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4vLyAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnaGlzdFA5Jyxcbi8vICAgaWRlbnRpdHlfZGVmaW5pbmc6IHRydWUsXG4vLyAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbi8vICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuLy8gICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgcHJvZmlsZXM6IFtdXG4vLyB9XG4vLyBjb25zdCBoYXNBcHBlTGlzdERlZiQgPSB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoW2hhc0FwcGVQcm9wXSwgZmFsc2UpLnBpcGUoXG4vLyAgIGZpbHRlcihsaXN0RGVmcyA9PiAhIWxpc3REZWZzICYmICEhbGlzdERlZnNbMF0pLFxuLy8gICBtYXAobGlzdERlZnMgPT4gbGlzdERlZnNbMF0pXG4vLyApO1xuXG4vLyAvKipcbi8vICAqIFBpcGUgdGhlIGdlbmVyaWMgZmllbGQgaGFzIHR5cGVcbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc1R5cGVMaXN0RGVmJCA9IHRoaXMucGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzKVxuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIGhhc0FwcGVMaXN0RGVmJCxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKGZpbHRlcihjID0+ICEhYykpXG4vLyApLnBpcGUoXG4vLyAgIG1hcCgoW2hhc0FwcGVMaXN0RGVmLCBoYXNUeXBlTGlzdERlZnMsIGtsYXNzXSkgPT4ge1xuLy8gICAgIGNvbnN0IGZpZWxkczogRmllbGRbXSA9IFtdXG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gICogQWRkICdzaG9ydCB0aXRsZScgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICAqXG4vLyAgICAgLy8gICogTWFuaWZlc3RhdGlvbiBQcm9kdWN0IFR5cGUg4oCTIEYzLCAyMTlcbi8vICAgICAvLyAgKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICAqIEl0ZW0g4oCTIEY1LCAyMjFcbi8vICAgICAvLyAgKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAgKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1RdLmluY2x1ZGVzKHBrQ2xhc3MpKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9TSE9SVF9USVRMRSkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhcyBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RQOScgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgY2xhc3NlcyBleGNlcHQgJ0FwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdEMxMCcsIDM2NVxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbi8vICAgICAvLyAgIGNvbnN0IGFwcGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc0FwcGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNBcHBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgZmllbGRzLnB1c2goYXBwZUZpZWxkKTtcbi8vICAgICAvLyB9XG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhc1R5cGUnIGZpZWxkc1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKGhhc1R5cGVMaXN0RGVmcyAmJiBoYXNUeXBlTGlzdERlZnMubGVuZ3RoID4gMCkge1xuLy8gICAgIC8vICAgaGFzVHlwZUxpc3REZWZzLmZvckVhY2goKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgLy8gICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgICBmaWVsZHMucHVzaCh0eXBlRmllbGQpO1xuLy8gICAgIC8vICAgfSlcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdlbnRpdHkgZGVmaW5pdGlvbicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCBjbGFzc2VzIGV4Y2VwdCAnQXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0QzEwJywgMzY1XG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT04pKTtcbi8vICAgICAvLyB9XG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaWRlbnRpZmllciAvIGV4YWN0IHJlZmVyZW5jZSAvIHVybCAvIC4uLicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVCA9PT0gcGtDbGFzcykge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnY29tbWVudCcgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIE1hbmlmZXN0YXRpb24gUHJvZHVjdCBUeXBlIOKAkyBGMywgMjE5XG4vLyAgICAgLy8gKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICogSXRlbSDigJMgRjUsIDIyMVxuLy8gICAgIC8vICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gKiBFeHByZXNzaW9uIHBvcnRpb24g4oCTIGdlb3ZDNSwgNTAzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1QsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfRVhQUkVTU0lPTl9QT1JUSU9OXS5pbmNsdWRlcyhwa0NsYXNzKSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ3RpbWUtc3BhbicgZmllbGQgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgdGVtcG9yYWwgZW50aXR5IGNsYXNzZXNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgcmV0dXJuIGZpZWxkc1xuXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLy8gcHJpdmF0ZSBwaXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3M6IG51bWJlcikge1xuLy8gICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgdHJ1ZSkucGlwZShcbi8vICAgICAvLyBjaGVjayBpZiB0aGlzIGNsYXNzIGhhcyAnaGFzIHR5cGUnIHN1YnByb3BlcnR5XG4vLyAgICAgbWFwKG91dGdvaW5nID0+IHtcbi8vICAgICAgIHJldHVybiBvdXRnb2luZy5maWx0ZXIoKHByb3ApID0+IHByb3AuaXNfaGFzX3R5cGVfc3VicHJvcGVydHkpO1xuLy8gICAgIH0pLCBzd2l0Y2hNYXAoaGFzVHlwZVByb3BzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KGhhc1R5cGVQcm9wcy5tYXAoZGZoUHJvcCA9PiB7XG4vLyAgICAgICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFtkZmhQcm9wXSwgdHJ1ZSkucGlwZShmaWx0ZXIobGlzdERlZnMgPT4gISFsaXN0RGVmcyAmJiAhIWxpc3REZWZzWzBdKSwgbWFwKGxpc3REZWZzID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZiA9IGxpc3REZWZzWzBdO1xuLy8gICAgICAgICBsaXN0RGVmLmxpc3RUeXBlID0geyB0eXBlSXRlbTogJ3RydWUnIH07XG4vLyAgICAgICAgIHJldHVybiBsaXN0RGVmO1xuLy8gICAgICAgfSkpO1xuLy8gICAgIH0pKSkpO1xuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkU3ViZmllbGQocGtDbGFzc0ZpZWxkOiBudW1iZXIpOiBTdWJmaWVsZCB7XG4vLyAgIGNvbnN0IHRlbXBsYXRlID0ge1xuLy8gICAgIHByb3BlcnR5OiB7fSxcbi8vICAgICBzb3VyY2VDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZUNsYXNzTGFiZWw6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIGlzT3V0Z29pbmc6IHVuZGVmaW5lZCxcbi8vICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiB1bmRlZmluZWQsXG4vLyAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldE1heFF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VNYXhRdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZU1pblF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2Vcbi8vICAgfVxuLy8gICBzd2l0Y2ggKHBrQ2xhc3NGaWVsZCkge1xuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU46XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6IHsgdGltZVNwYW46ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ1doZW4nLFxuLy8gICAgICAgICBpc091dGdvaW5nOiB0cnVlLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1A0Jyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvNCcsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAxXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT046XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnRGVzY3JpcHRpb24nLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQ6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnQ29tbWVudHMnLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0V4YWN0IFJlZmVyZW5jZScsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfU0hPUlRfVElUTEU6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnU2hvcnQgVGl0bGUnLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGRlZmF1bHQ6XG4vLyAgICAgICBicmVhaztcbi8vICAgfVxuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihwa0NsYXNzRmllbGQ6IG51bWJlcik6IEZpZWxkIHtcbi8vICAgY29uc3QgbGlzdERlZiA9IHRoaXMuZ2V0Q2xhc3NGaWVsZFN1YmZpZWxkKHBrQ2xhc3NGaWVsZClcbi8vICAgcmV0dXJuIHsgLi4ubGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbbGlzdERlZl0gfVxuLy8gfVxuXG5cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWQoKSB7XG4vLyAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkJC5rZXkoJ3RydWUnKVxuLy8gICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4vLyB9XG5cblxuXG4vLyAvKipcbi8vICAqIFBpcGVzIGFsbCB0aGUgZW5hYmxlZCBwcm9wZXJ0aWVzIG9mIGEgY2xhc3Ncbi8vICAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8RGZoUHJvcGVydHlTdGF0dXNbXT4ge1xuXG5cbi8vICAgbGV0ICQ6IE9ic2VydmFibGU8QnlQazxEZmhQcm9wZXJ0eT4+XG4vLyAgIGlmIChpc091dGdvaW5nKSB7XG4vLyAgICAgJCA9IHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfZG9tYWluJC5rZXkocGtDbGFzcylcbi8vICAgfVxuLy8gICBlbHNlIHtcbi8vICAgICAkID0gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19yYW5nZSQua2V5KHBrQ2xhc3MpXG4vLyAgIH1cblxuLy8gICAvLyBmaWx0ZXIgcHJvcGVydGllcyB0aGF0IGFyZSBpbiBhdCBsZWFzdCBvbmUgcHJvZmlsZSBlbmFibGVkIGJ5IHByb2plY3Rcbi8vICAgY29uc3QgcHJvZmlsZXMkID0gdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcblxuXG4vLyAgIC8vIEZpbHRlciBvdXQgb25seSB0aGUgcHJvcGVydGllcyBmb3Igd2hpY2ggdGFyZ2V0IGNsYXNzIGlzIGFsbG93ZWRcbi8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoJCwgcHJvZmlsZXMkKVxuLy8gICAgIC5waXBlKFxuLy8gICAgICAgbWFwKChbcHJvcHMsIHByb2ZpbGVzXSkgPT4ge1xuLy8gICAgICAgICBjb25zdCBwOiBEZmhQcm9wZXJ0eVN0YXR1c1tdID0gW11cblxuLy8gICAgICAgICB2YWx1ZXMocHJvcHMpLmZvckVhY2gocHJvcCA9PiB7XG5cblxuLy8gICAgICAgICAgIGNvbnN0IHByb3BQcm9maWxlUmVsID0gcHJvcC5wcm9maWxlcyBhcyBQcm9maWxlc1xuXG4vLyAgICAgICAgICAgbGV0IGVuYWJsZWRJbkFQcm9maWxlID0gZmFsc2U7XG5cbi8vICAgICAgICAgICBsZXQgcmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHRydWU7XG5cbi8vICAgICAgICAgICBwcm9wUHJvZmlsZVJlbC5mb3JFYWNoKGl0ZW0gPT4ge1xuLy8gICAgICAgICAgICAgaWYgKHByb2ZpbGVzLmluY2x1ZGVzKGl0ZW0uZmtfcHJvZmlsZSkpIHtcbi8vICAgICAgICAgICAgICAgZW5hYmxlZEluQVByb2ZpbGUgPSB0cnVlO1xuLy8gICAgICAgICAgICAgICBpZiAoaXRlbS5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSkge1xuLy8gICAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBmYWxzZVxuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSlcblxuLy8gICAgICAgICAgIGlmIChlbmFibGVkSW5BUHJvZmlsZSkge1xuLy8gICAgICAgICAgICAgcC5wdXNoKHtcbi8vICAgICAgICAgICAgICAgLi4ucHJvcCxcbi8vICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pXG5cbi8vICAgICAgICAgcmV0dXJuIHBcbi8vICAgICAgIH0pXG4vLyAgICAgKVxuXG4vLyB9XG5cblxuLy8gLyoqXG4vLyAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuLy8gICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdFxuLy8gICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyBlbmFibGVkIGJ5IGNsYXNzX3Byb2pfcmVsXG4vLyAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIHJlcXVpcmVkIGJ5IHNvdXJjZXMgb3IgYnkgYmFzaWNzXG4vLyAgKlxuLy8gICogdGhpcyBpcyB1c2VmdWxsIHRvIGNoZWNrIGlmIGEgY2xhc3MgaXMgYXZhaWxhYmxlIGF0IGFsbFxuLy8gICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0luRW50aXRlc09yUmVxdWlyZWQoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4vLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNSZXF1aXJlZCgpXG4vLyAgICkucGlwZShcbi8vICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbi8vICAgICBzdGFydFdpdGgoe30pXG4vLyAgIClcbi8vIH1cbiJdfQ==