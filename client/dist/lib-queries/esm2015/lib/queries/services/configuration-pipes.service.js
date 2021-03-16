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
/**
 * This Service provides a collection of pipes that aggregate or transform configuration data.
 * When talking about configuration, we mean the conceptual reference model and the additional
 * configurations on system and project level.
 * For Example
 * - the fields of a class
 * - the labels of classes and properties
 */
export class ConfigurationPipesService {
    /**
     * @param {?} a
     * @param {?} s
     */
    constructor(a, s) {
        this.a = a;
        this.s = s;
    }
    /**
     * returns observable number[] wher the numbers are the pk_profile
     * of all profiles that are enabled by the given project.
     * The array will always include PK_PROFILE_GEOVISTORY_BASIC
     * @return {?}
     */
    // @spyTag
    // @cache({ refCount: false })
    pipeProfilesEnabledByProject() {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => this.s.pro$.dfh_profile_proj_rel$.by_fk_project__enabled$
            .key(pkProject + '_true').pipe(map((/**
         * @param {?} projectProfileRels
         * @return {?}
         */
        projectProfileRels => values(projectProfileRels)
            .filter((/**
         * @param {?} rel
         * @return {?}
         */
        rel => rel.enabled))
            .map((/**
         * @param {?} rel
         * @return {?}
         */
        rel => rel.fk_profile)))), map((/**
         * @param {?} enabled
         * @return {?}
         */
        enabled => [...enabled, DfhConfig.PK_PROFILE_GEOVISTORY_BASIC]))))), shareReplay());
    }
    /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    pipeFields(pkClass, noNesting = false) {
        return combineLatest(
        // pipe source class
        this.s.dfh$.class$.by_pk_class$.key(pkClass), 
        // pipe outgoing properties
        this.s.dfh$.property$.by_has_domain$.key(pkClass).pipe(map((/**
         * @param {?} indexed
         * @return {?}
         */
        indexed => values(indexed)))), 
        // pipe ingoing properties
        this.s.dfh$.property$.by_has_range$.key(pkClass).pipe(map((/**
         * @param {?} indexed
         * @return {?}
         */
        indexed => values(indexed)))), 
        // pipe sys config
        this.s.sys$.config$.main$.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => !!x))), 
        // pipe enabled profiles
        this.pipeProfilesEnabledByProject()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([sourceKlass, outgoingProps, ingoingProps, sysConfig, enabledProfiles]) => {
            /** @type {?} */
            const isEnabled = (/**
             * @param {?} prop
             * @return {?}
             */
            (prop) => enabledProfiles.some((/**
             * @param {?} enabled
             * @return {?}
             */
            (enabled) => prop.profiles.map((/**
             * @param {?} p
             * @return {?}
             */
            p => p.fk_profile)).includes(enabled))));
            /** @type {?} */
            const outP = outgoingProps.filter((/**
             * @param {?} prop
             * @return {?}
             */
            (prop) => isEnabled(prop)));
            /** @type {?} */
            let inP = ingoingProps.filter((/**
             * @param {?} prop
             * @return {?}
             */
            (prop) => isEnabled(prop)));
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
            return combineLatest(this.pipePropertiesToSubfields(outP, true, enabledProfiles, sysConfig, noNesting), this.pipePropertiesToSubfields(inP, false, enabledProfiles, sysConfig, noNesting), this.pipeFieldConfigs(pkClass)).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([subfields1, subfields2, fieldConfigs]) => {
                /** @type {?} */
                const subfields = [...subfields1, ...subfields2];
                /** @type {?} */
                const fieldConfigIdx = indexBy((/**
                 * @param {?} x
                 * @return {?}
                 */
                (x) => [
                    (x.fk_domain_class || x.fk_range_class),
                    x.fk_property,
                    !!x.fk_domain_class
                ].join('_')), fieldConfigs);
                /** @type {?} */
                const uniqFields = {};
                /** @type {?} */
                const uniqSubfieldCache = {}
                // group by source, pkProperty and isOutgoing
                ;
                // group by source, pkProperty and isOutgoing
                for (const s of subfields) {
                    /** @type {?} */
                    const fieldId = [s.sourceClass, s.property.pkProperty, s.isOutgoing].join('_');
                    /** @type {?} */
                    const subfieldId = [s.sourceClass, s.property.pkProperty, s.isOutgoing, s.targetClass].join('_');
                    /** @type {?} */
                    const fieldConfig = fieldConfigIdx[fieldId];
                    // the first time the group is established
                    if (!uniqFields[fieldId]) {
                        /** @type {?} */
                        let isSpecialField = false;
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
                            fieldConfig,
                            placeOfDisplay: getPlaceOfDisplay(sysConfig.specialFields, s, fieldConfig),
                            isSpecialField,
                            targets: {
                                [s.targetClass]: {
                                    listType: s.listType,
                                    removedFromAllProfiles: s.removedFromAllProfiles,
                                    targetClass: s.targetClass,
                                    targetClassLabel: s.targetClassLabel
                                }
                            }
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
                return values(uniqFields);
            })));
        })));
    }
    /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeSpecificFieldOfClass(pkClass, noNesting = false) {
        return this.pipeFields(pkClass, noNesting).pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        fields => fields
            // filter fields that are displayd in specific fields
            .filter((/**
         * @param {?} field
         * @return {?}
         */
        field => field.placeOfDisplay.specificFields))
            // sort fields by the position defined in the specific fields
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.placeOfDisplay.specificFields.position - b.placeOfDisplay.specificFields.position)))));
    }
    /**
     * pipe all the basic fields of a class,
     * ordered by the position of the field within the basic fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeBasicFieldsOfClass(pkClass, noNesting = false) {
        return this.pipeFields(pkClass, noNesting).pipe(map((/**
         * @param {?} fields
         * @return {?}
         */
        fields => fields
            // filter fields that are displayd in basic fields
            .filter((/**
         * @param {?} field
         * @return {?}
         */
        field => field.placeOfDisplay.basicFields))
            // sort fields by the position defined in the basic fields
            .sort((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        (a, b) => a.placeOfDisplay.basicFields.position - b.placeOfDisplay.basicFields.position)))));
    }
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
    pipeFieldsForTeEnForm(pkClass, noNesting = false) {
        return this.pipeFields(pkClass, noNesting).pipe(
        // filter fields that are displayd in specific fields
        map((/**
         * @param {?} allFields
         * @return {?}
         */
        allFields => {
            /** @type {?} */
            const fields = allFields
                // filter fields that are displayd in specific fields and not removed from all profiles
                .filter((/**
             * @param {?} field
             * @return {?}
             */
            field => (field.placeOfDisplay.specificFields && field.allSubfieldsRemovedFromAllProfiles === false)))
                // sort fields by the position defined in the specific fields
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a.placeOfDisplay.specificFields.position - a.placeOfDisplay.specificFields.position));
            /** @type {?} */
            const whenField = allFields.find((/**
             * @param {?} field
             * @return {?}
             */
            field => field.property.pkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN));
            if (whenField)
                fields.push(whenField);
            /** @type {?} */
            const typeField = allFields.find((/**
             * @param {?} field
             * @return {?}
             */
            field => field.isHasTypeField));
            if (typeField)
                fields.push(typeField);
            return fields;
        })));
    }
    /**
     * Pipes the fields of given class in this order:
     * - basic fields
     * - specific fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeBasicAndSpecificFields(pkClass, noNesting = false) {
        return combineLatest(this.pipeBasicFieldsOfClass(pkClass, noNesting), this.pipeSpecificFieldOfClass(pkClass, noNesting))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([a, b]) => [...a, ...b])));
    }
    /**
     * Pipes the fields of given class in this order:
     * - specific fields
     * - basic fields
     * @param {?} pkClass
     * @param {?=} noNesting
     * @return {?}
     */
    // @spyTag
    pipeSpecificAndBasicFields(pkClass, noNesting = false) {
        return combineLatest(this.pipeSpecificFieldOfClass(pkClass, noNesting), this.pipeBasicFieldsOfClass(pkClass, noNesting))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([a, b]) => [...a, ...b])));
    }
    /**
     * @param {?} properties
     * @param {?} isOutgoing
     * @param {?} enabledProfiles
     * @param {?} sysConfig
     * @param {?=} noNesting
     * @return {?}
     */
    pipePropertiesToSubfields(properties, isOutgoing, enabledProfiles, sysConfig, noNesting = false) {
        return combineLatestOrEmpty(properties.map((/**
         * @param {?} p
         * @return {?}
         */
        p => {
            return this.pipeSubfield(isOutgoing, p, sysConfig, enabledProfiles, noNesting);
        })));
    }
    /**
     * @param {?} sourceClass
     * @param {?} property
     * @param {?} targetClass
     * @param {?} isOutgoing
     * @param {?=} noNesting
     * @return {?}
     */
    pipeSubfieldIdToSubfield(sourceClass, property, targetClass, isOutgoing, noNesting = false) {
        /** @type {?} */
        const domain = isOutgoing ? sourceClass : targetClass;
        /** @type {?} */
        const range = isOutgoing ? targetClass : sourceClass;
        return combineLatest(this.s.dfh$.property$.pk_property__has_domain__has_range$.key([property, domain, range].join('_'))
            .pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            return !!x;
        }))), this.s.sys$.config$.main$.pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            return !!x;
        }))), this.pipeProfilesEnabledByProject().pipe(filter((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            return !!x;
        })))).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([dfhProp, sysConf, enabledProfiles]) => this.pipeSubfield(isOutgoing, dfhProp, sysConf, enabledProfiles, noNesting))));
    }
    /**
     * @private
     * @param {?} isOutgoing
     * @param {?} p
     * @param {?} sysConfig
     * @param {?} enabledProfiles
     * @param {?=} noNesting
     * @return {?}
     */
    pipeSubfield(isOutgoing, p, sysConfig, enabledProfiles, noNesting = false) {
        /** @type {?} */
        const o = isOutgoing;
        /** @type {?} */
        const targetClass = o ? p.has_range : p.has_domain;
        /** @type {?} */
        const sourceClass = o ? p.has_domain : p.has_range;
        /** @type {?} */
        const targetMaxQuantity = o ?
            p.range_instances_max_quantifier :
            p.domain_instances_max_quantifier;
        /** @type {?} */
        const sourceMaxQuantity = o ?
            p.domain_instances_max_quantifier :
            p.range_instances_max_quantifier;
        /** @type {?} */
        const targetMinQuantity = o ?
            p.range_instances_min_quantifier :
            p.domain_instances_min_quantifier;
        /** @type {?} */
        const sourceMinQuantity = o ?
            p.domain_instances_min_quantifier :
            p.range_instances_min_quantifier;
        // console.log('pppp wanted: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
        return combineLatest(this.pipeClassLabel(sourceClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            // console.log('pppp found sourceClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))), this.pipeClassLabel(targetClass).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            // console.log('pppp found targetClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))), this.pipeSubfieldTypeOfClass(sysConfig, targetClass, targetMaxQuantity, p.pk_property, noNesting).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            // console.log('pppp found subfieldType: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))), this.pipeFieldLabel(p.pk_property, isOutgoing ? p.has_domain : null, isOutgoing ? null : p.has_range).pipe(tap((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            // console.log('pppp found fieldLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            return x;
        }))))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([sourceClassLabel, targetClassLabel, listType, label]) => {
            // console.log('pppp found: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            // console.log('pppp found: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
            /** @type {?} */
            const node = {
                listType,
                sourceClass,
                sourceClassLabel,
                sourceMaxQuantity,
                sourceMinQuantity,
                targetClass,
                targetClassLabel,
                targetMinQuantity,
                targetMaxQuantity,
                label,
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
    }
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
    pipeSubfieldTypeOfClass(config, pkClass, targetMaxQuantity, parentProperty, noNesting = false) {
        return this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        i => !!i)), switchMap((/**
         * @param {?} klass
         * @return {?}
         */
        (klass) => this.pipeSubfieldType(config, klass, targetMaxQuantity, parentProperty, noNesting))));
    }
    /**
     * @param {?} config
     * @param {?} klass
     * @param {?} targetMaxQuantity
     * @param {?=} parentProperty
     * @param {?=} noNesting
     * @return {?}
     */
    pipeSubfieldType(config, klass, targetMaxQuantity, parentProperty, noNesting = false) {
        /** @type {?} */
        const res = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => new BehaviorSubject(x));
        /** @type {?} */
        let classConfig;
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
            const noNest = true;
            return this.pipeSpecificAndBasicFields(klass.pk_class, noNest).pipe(map((/**
             * @param {?} fields
             * @return {?}
             */
            fields => {
                /** @type {?} */
                const subentitySubfieldPage = [];
                for (const field of fields) {
                    // for each of these subfields
                    // create page:GvSubfieldPage
                    /** @type {?} */
                    const nestedTargets = {};
                    for (const key in field.targets) {
                        if (Object.prototype.hasOwnProperty.call(field.targets, key)) {
                            /** @type {?} */
                            const listType = field.targets[key].listType;
                            // put temporalEntity to entityPreview
                            /** @type {?} */
                            const subTargetType = listType.temporalEntity ?
                                { entityPreview: 'true' } :
                                listType;
                            nestedTargets[key] = subTargetType;
                        }
                    }
                    /** @type {?} */
                    let isCircular = false;
                    if (parentProperty &&
                        field.property.pkProperty == parentProperty &&
                        field.targetMaxQuantity === 1) {
                        isCircular = true;
                    }
                    /** @type {?} */
                    const nestedPage = {
                        targets: nestedTargets,
                        page: {
                            fkProperty: field.property.pkProperty,
                            isOutgoing: field.isOutgoing,
                            limit: 1,
                            offset: 0,
                            isCircular
                        }
                    };
                    subentitySubfieldPage.push(nestedPage);
                }
                return { temporalEntity: subentitySubfieldPage };
            })));
        }
    }
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
    pipeFieldConfigs(pkClass) {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} fkProject
         * @return {?}
         */
        (fkProject) => {
            /** @type {?} */
            const activeProjectkey = proClassFieldConfgByProjectAndClassKey({
                fk_class_for_class_field: pkClass,
                fk_project: fkProject
            });
            /** @type {?} */
            const defaultProjectkey = proClassFieldConfgByProjectAndClassKey({
                fk_class_for_class_field: pkClass,
                fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT
            });
            return combineLatest(this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(activeProjectkey), this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(defaultProjectkey))
                .pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([activeProjectFields, defaultProjectFields]) => {
                if (activeProjectFields && values(activeProjectFields).length)
                    return activeProjectFields;
                return defaultProjectFields;
            })), map((/**
             * @param {?} items
             * @return {?}
             */
            (items) => values(items).sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => (a.ord_num > b.ord_num ? 1 : -1))))));
        })));
    }
    /********************************************** */
    /**
     * Delivers class label for active project
     * @param {?=} pkClass
     * @return {?}
     */
    // @spyTag
    pipeClassLabel(pkClass) {
        return combineLatest(this.a.pkProject$, this.a.pipeActiveDefaultLanguage()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([fkProject, language]) => this.pipeLabels({ pkClass, fkProject, language, type: 'label' })
            .pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        items => {
            /** @type {?} */
            const i = items.find((/**
             * @param {?} item
             * @return {?}
             */
            item => !!item));
            return i ? i.text : `* no label (id: ${pkClass}) *`;
        }))))));
    }
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
    pipeLabels(d) {
        /** @type {?} */
        let fk_system_type;
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
            fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of project in project lang';
            return { origin, text: item.string };
        }))), 
        // label of default project
        this.pipeProTextProperty({
            fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
            fk_language: d.language.pk_entity,
            fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of default project in project lang';
            return { origin, text: item.string };
        }))), 
        // label of default project
        this.pipeProTextProperty({
            fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
            fk_language: 18889,
            fk_system_type,
            fk_dfh_class: d.pkClass,
            fk_dfh_property: d.fkProperty,
            fk_dfh_property_domain: d.fkPropertyDomain,
            fk_dfh_property_range: d.fkPropertyRange
        }).pipe(map((/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of default project in english';
            return { origin, text: item.string };
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
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of ontome in project lang';
            return { origin, text: item.label };
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
        (item) => {
            if (!item)
                return undefined;
            /** @type {?} */
            const origin = 'of ontome in english';
            return { origin, text: item.label };
        }))));
    }
    /**
     * Pipes ProTextProperty
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    pipeProTextProperty(d) {
        /** @type {?} */
        const key = textPropertyByFksKey(d);
        return this.s.pro$.text_property$.by_fks$.key(key);
    }
    /**
     * Pipes DfhLabel
     * @param {?} d
     * @return {?}
     */
    // @spyTag
    pipeDfhLabel(d) {
        /** @type {?} */
        const key = dfhLabelByFksKey(d);
        return this.s.dfh$.label$.by_fks$.key(key);
    }
    /**
     * Delivers best fitting field label for active project
     * @param {?} fkProperty
     * @param {?} fkPropertyDomain
     * @param {?} fkPropertyRange
     * @return {?}
     */
    // @spyTag
    pipeFieldLabel(fkProperty, fkPropertyDomain, fkPropertyRange) {
        /** @type {?} */
        const isOutgoing = !!fkPropertyDomain;
        // const system_type = isOutgoing ? (singular ? 180 : 181) : (singular ? 182 : 183)
        return combineLatest(this.a.pkProject$, this.a.pipeActiveDefaultLanguage()).pipe(switchMap((/**
         * @param {?} __0
         * @return {?}
         */
        ([fkProject, language]) => this.pipeLabels({
            fkProject,
            type: 'label',
            language,
            fkProperty,
            fkPropertyDomain,
            fkPropertyRange
        })
            .pipe(map((/**
         * @param {?} items
         * @return {?}
         */
        items => {
            /** @type {?} */
            let label = `* no label (id: ${fkProperty}) *`;
            items.some((/**
             * @param {?} item
             * @return {?}
             */
            (item) => {
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
        }))))));
    }
    /**
     * maps the class to the corresponding model (database table)
     * this is used by Forms to create new data in the shape of
     * the data model
     * @param {?} targetClassPk
     * @return {?}
     */
    // @spyTag
    pipeTableNameOfClass(targetClassPk) {
        return combineLatest(this.s.sys$.config$.main$, this.s.dfh$.class$.by_pk_class$.key(targetClassPk)).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        i => !i.includes(undefined))), map((/**
         * @param {?} __0
         * @return {?}
         */
        ([config, klass]) => {
            /** @type {?} */
            const classConfig = config.classes[targetClassPk];
            if (classConfig && classConfig.valueObjectType) {
                /** @type {?} */
                const keys = Object.keys(classConfig.valueObjectType);
                if (classConfig.valueObjectType.appellation)
                    return;
                /** @type {?} */
                const key = keys[0];
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
    }
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
    pipeClassesInEntitiesOrSources() {
        return combineLatest(this.pipeClassesEnabledInEntities(), this.pipeClassesRequiredBySources()).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([a, b]) => indexBy((/**
         * @param {?} x
         * @return {?}
         */
        (x) => x.toString()), uniq([...a, ...b])))), startWith({}));
    }
    // @spyTag
    /**
     * @return {?}
     */
    pipeClassesRequiredBySources() {
        return this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
            .pipe(map((/**
         * @param {?} c
         * @return {?}
         */
        c => values(c).map((/**
         * @param {?} k
         * @return {?}
         */
        k => k.fk_class)))));
    }
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    pipeClassesEnabledByProjectProfiles() {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => combineLatest([
            this.s.dfh$.class$.by_pk_class$.all$,
            this.pipeProfilesEnabledByProject()
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([classesByPk, enabledProfiles]) => {
            /** @type {?} */
            const profilesMap = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            (k) => k.toString()), values(enabledProfiles));
            return values(classesByPk)
                .filter((/**
             * @param {?} klass
             * @return {?}
             */
            klass => klass.profiles.some((/**
             * @param {?} profile
             * @return {?}
             */
            profile => profilesMap[profile.fk_profile]))));
        }))))));
    }
    /**
     * returns observable number[] wher the numbers are the pk_class
     * of all type classes that are enabled by at least one of the activated profiles
     * of thte given project
     * @return {?}
     */
    // @spyTag
    pipeTypeClassesEnabledByProjectProfiles() {
        return combineLatest([
            this.s.dfh$.class$.by_basic_type$.key(30),
            this.pipeProfilesEnabledByProject()
        ]).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([classesByPk, enabledProfiles]) => {
            /** @type {?} */
            const profilesMap = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            (k) => k.toString()), values(enabledProfiles));
            return values(classesByPk)
                .filter((/**
             * @param {?} klass
             * @return {?}
             */
            klass => {
                return klass.profiles.some((/**
                 * @param {?} profile
                 * @return {?}
                 */
                profile => profilesMap[profile.fk_profile])) &&
                    // Exclude Manifestation product type and language
                    ![
                        DfhConfig.CLASS_PK_LANGUAGE,
                        DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE
                    ].includes(klass.pk_class);
            }));
        })));
    }
    /**
     * returns observable number[] where the numbers are the pk_class
     * of all classes that are enabled by active project (using class_proj_rel)
     * @return {?}
     */
    // @spyTag
    pipeClassesEnabledInEntities() {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
            .pipe(map((/**
         * @param {?} rels
         * @return {?}
         */
        (rels) => values(rels).map((/**
         * @param {?} rel
         * @return {?}
         */
        rel => rel.fk_class))))))));
    }
    /**
     * returns an object where the keys are the pks of the TeEn Classes
     * used by the given project
     * @return {?}
     */
    // @spyTag
    pipeSelectedTeEnClassesInProject() {
        return combineLatest(this.pipeTeEnClassesEnabledInEntities(), this.pipeTeEnClassesRequiredBySources()).pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([a, b]) => indexBy((/**
         * @param {?} x
         * @return {?}
         */
        (x) => x.toString()), uniq([...a, ...b])))), startWith({}));
    }
    /**
     * Gets array of pk_class with teEn classes enabled in entities
     * @return {?}
     */
    // @spyTag
    pipeTeEnClassesEnabledInEntities() {
        return this.a.pkProject$.pipe(switchMap((/**
         * @param {?} pkProject
         * @return {?}
         */
        pkProject => this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
            .pipe(switchMap((/**
         * @param {?} cs
         * @return {?}
         */
        (cs) => combineLatest(values(cs).map((/**
         * @param {?} c
         * @return {?}
         */
        c => this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !!item)))))).pipe(map((/**
         * @param {?} dfhClasses
         * @return {?}
         */
        dfhClasses => this.filterTeEnCasses(dfhClasses))))))))));
    }
    /**
     * Filters array of DfhClass for TeEn Classes and returns array of pk_class
     * @private
     * @param {?} dfhClasses array of DfhClass
     * @return {?} returns array of pk_class where class is TeEn class
     */
    filterTeEnCasses(dfhClasses) {
        /** @type {?} */
        const pks = [];
        for (let i = 0; i < dfhClasses.length; i++) {
            /** @type {?} */
            const c = dfhClasses[i];
            if (c.basic_type === 9)
                pks.push(c.pk_class);
        }
        return pks;
    }
    /**
     * Gets array of pk_class with teEn classes required by sources
     * @return {?}
     */
    // @spyTag
    pipeTeEnClassesRequiredBySources() {
        return this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
            .pipe(switchMap((/**
         * @param {?} cs
         * @return {?}
         */
        (cs) => combineLatest(values(cs).map((/**
         * @param {?} c
         * @return {?}
         */
        c => this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        item => !!item)))))).pipe(map((/**
         * @param {?} dfhClasses
         * @return {?}
         */
        dfhClasses => {
            return this.filterTeEnCasses(dfhClasses);
        }))))));
    }
    /**
     *
     * @param {?=} enabledIn
     * @return {?}
     */
    // @spyTag
    pipeTypeAndTypedClasses(enabledIn) {
        /** @type {?} */
        let pks$;
        /** @type {?} */
        const fromSources$ = this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true').pipe(map((/**
         * @param {?} classes
         * @return {?}
         */
        classes => values(classes).map((/**
         * @param {?} k
         * @return {?}
         */
        k => k.fk_class)))));
        /** @type {?} */
        const fromEntities$ = this.pipeClassesEnabledInEntities();
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
        arrayOfPkArrays => uniq(flatten(arrayOfPkArrays)))), switchMap((/**
         * @param {?} pks
         * @return {?}
         */
        pks => this.pipeTypeAndTypedClassesOfTypedClasses(pks))));
    }
    // @spyTag
    /**
     * @param {?} pkTypedClasses
     * @return {?}
     */
    pipeTypeAndTypedClassesOfTypedClasses(pkTypedClasses) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        (allHasTypeProps) => {
            /** @type {?} */
            const byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            k => k.has_domain.toString()), values(allHasTypeProps));
            return pkTypedClasses.map((/**
             * @param {?} pk
             * @return {?}
             */
            pk => ({
                typedClass: pk,
                typeClass: byDomain[pk] ? byDomain[pk].has_range : undefined
            })));
        })));
    }
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    pipeTypeClassOfTypedClass(pkTypedClass) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        (allHasTypeProps) => {
            /** @type {?} */
            const byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            k => k.has_domain.toString()), values(allHasTypeProps));
            return byDomain[pkTypedClass] ? byDomain[pkTypedClass].has_range : undefined;
        })));
    }
    // @spyTag
    /**
     * @param {?} pkTypeClasses
     * @return {?}
     */
    pipeTypedClassesOfTypeClasses(pkTypeClasses) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        (allHasTypeProps) => {
            /** @type {?} */
            const byDomain = indexBy((/**
             * @param {?} k
             * @return {?}
             */
            k => k.has_range.toString()), values(allHasTypeProps));
            return pkTypeClasses.map((/**
             * @param {?} pk
             * @return {?}
             */
            pk => byDomain[pk] ? byDomain[pk].has_domain : undefined));
        })));
    }
    // @spyTag
    /**
     * @param {?} pkTypedClass
     * @return {?}
     */
    pipeTypePropertyOfTypedClass(pkTypedClass) {
        return this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(map((/**
         * @param {?} allHasTypeProps
         * @return {?}
         */
        (allHasTypeProps) => {
            /** @type {?} */
            const typeProp = values(allHasTypeProps).find((/**
             * @param {?} p
             * @return {?}
             */
            p => p.has_domain === pkTypedClass));
            return typeProp ? typeProp.pk_property : undefined;
        })));
    }
    // @spyTag
    /**
     * @param {?} pkProperties
     * @param {?} isOutgoing
     * @return {?}
     */
    pipeTargetClassesOfProperties(pkProperties, isOutgoing) {
        return this.s.dfh$.property$.by_pk_property$.all$.pipe(map((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            if (!pkProperties || !pkProperties.length)
                return [];
            /** @type {?} */
            const res = [];
            /** @type {?} */
            const targetClasses = {};
            pkProperties.forEach((/**
             * @param {?} pkProp
             * @return {?}
             */
            pkProp => {
                /** @type {?} */
                const props = values(x[pkProp]);
                props.forEach((/**
                 * @param {?} prop
                 * @return {?}
                 */
                prop => {
                    /** @type {?} */
                    const targetClass = isOutgoing ? prop.has_range : prop.has_domain;
                    if (!targetClasses[targetClass]) {
                        targetClasses[targetClass] = true;
                        res.push(targetClass);
                    }
                }));
            }));
            return res;
        })));
    }
}
ConfigurationPipesService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ConfigurationPipesService.ctorParameters = () => [
    { type: ActiveProjectPipesService },
    { type: SchemaSelectorsService }
];
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
    const profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    const hasDefinition = {
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
        profiles
    };
    return hasDefinition;
}
/**
 * @param {?} domainClass
 * @return {?}
 */
export function createHasTimeSpanProperty(domainClass) {
    /** @type {?} */
    const profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    const hasAppeProp = {
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
        profiles
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
    p => p.removed_from_api === false && enabledProfiles.includes(p.fk_profile)));
}
/**
 * @param {?} specialFields
 * @param {?} subfield
 * @param {?=} projectFieldConfig
 * @return {?}
 */
function getPlaceOfDisplay(specialFields, subfield, projectFieldConfig) {
    /** @type {?} */
    let settings;
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
    let position = Number.POSITIVE_INFINITY;
    if (projectFieldConfig)
        position = projectFieldConfig.ord_num;
    return { specificFields: { position } };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzLyIsInNvdXJjZXMiOlsibGliL3F1ZXJpZXMvc2VydmljZXMvY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHNDQUFzQyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFckgsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEUsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBTXhELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7O0FBTXBFLHVDQUdDOzs7SUFEQyxtREFBK0I7O0FBUWpDOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLE9BQU8seUJBQXlCOzs7OztJQUVwQyxZQUNVLENBQTRCLEVBQzVCLENBQXlCO1FBRHpCLE1BQUMsR0FBRCxDQUFDLENBQTJCO1FB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WyJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERmaENvbmZpZywgUHJvQ29uZmlnLCBTeXNDb25maWcgfSBmcm9tICdAa2xlaW9sYWIvbGliLWNvbmZpZyc7XG5pbXBvcnQgeyBkZmhMYWJlbEJ5RmtzS2V5LCBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSwgdGV4dFByb3BlcnR5QnlGa3NLZXkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IENsYXNzQ29uZmlnLCBEZmhDbGFzcywgRGZoTGFiZWwsIERmaFByb3BlcnR5LCBHdlN1YmVudGl0RmllbGRQYWdlUmVxLCBHdlN1YmVudGl0eUZpZWxkVGFyZ2V0cywgR3ZTdWJlbnRpdHlUYXJnZXRUeXBlLCBHdlRhcmdldFR5cGUsIEluZkxhbmd1YWdlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9UZXh0UHJvcGVydHksIFJlbGF0ZWRQcm9maWxlLCBTeXNDb25maWdGaWVsZERpc3BsYXksIFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIFN5c0NvbmZpZ1ZhbHVlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3RPckVtcHR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBmbGF0dGVuLCBpbmRleEJ5LCB1bmlxLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzaGFyZVJlcGxheSwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL21vZGVscy9GaWVsZCc7XG5pbXBvcnQgeyBGaWVsZFBsYWNlT2ZEaXNwbGF5IH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkUG9zaXRpb24nO1xuaW1wb3J0IHsgUHJvZmlsZXMgfSBmcm9tICcuLi9tb2RlbHMvUHJvZmlsZXMnO1xuaW1wb3J0IHsgU3BlY2lhbEZpZWxkVHlwZSB9IGZyb20gJy4uL21vZGVscy9TcGVjaWFsRmllbGRUeXBlJztcbmltcG9ydCB7IFN1YmZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkJztcbmltcG9ydCB7IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UgfSBmcm9tICcuL2FjdGl2ZS1wcm9qZWN0LXBpcGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2NoZW1hU2VsZWN0b3JzU2VydmljZSB9IGZyb20gJy4vc2NoZW1hLXNlbGVjdG9ycy5zZXJ2aWNlJztcblxuXG4vLyB0aGlzIGlzIHRoZVxuZXhwb3J0IHR5cGUgVGFibGVOYW1lID0gJ2FwcGVsbGF0aW9uJyB8ICdsYW5ndWFnZScgfCAncGxhY2UnIHwgJ3RpbWVfcHJpbWl0aXZlJyB8ICdsYW5nX3N0cmluZycgfCAnZGltZW5zaW9uJyB8ICdwZXJzaXN0ZW50X2l0ZW0nIHwgJ3RlbXBvcmFsX2VudGl0eSdcblxuZXhwb3J0IGludGVyZmFjZSBEZmhQcm9wZXJ0eVN0YXR1cyBleHRlbmRzIERmaFByb3BlcnR5IHtcbiAgLy8gdHJ1ZSwgaWYgcmVtb3ZlZCBmcm9tIGFsbCBwcm9maWxlcyBvZiB0aGUgY3VycmVudCBwcm9qZWN0XG4gIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGJvb2xlYW5cbn1cblxudHlwZSBMYWJlbE9yaWdpbiA9ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfCAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfCAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnIHwgJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIG9udG9tZSBpbiBlbmdsaXNoJ1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjdGlvbiBvZiBwaXBlcyB0aGF0IGFnZ3JlZ2F0ZSBvciB0cmFuc2Zvcm0gY29uZmlndXJhdGlvbiBkYXRhLlxuICogV2hlbiB0YWxraW5nIGFib3V0IGNvbmZpZ3VyYXRpb24sIHdlIG1lYW4gdGhlIGNvbmNlcHR1YWwgcmVmZXJlbmNlIG1vZGVsIGFuZCB0aGUgYWRkaXRpb25hbFxuICogY29uZmlndXJhdGlvbnMgb24gc3lzdGVtIGFuZCBwcm9qZWN0IGxldmVsLlxuICogRm9yIEV4YW1wbGVcbiAqIC0gdGhlIGZpZWxkcyBvZiBhIGNsYXNzXG4gKiAtIHRoZSBsYWJlbHMgb2YgY2xhc3NlcyBhbmQgcHJvcGVydGllc1xuICovXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgKSB7IH1cblxuXG4gIC8qKlxuICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfcHJvZmlsZVxuICAqIG9mIGFsbCBwcm9maWxlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0LlxuICAqIFRoZSBhcnJheSB3aWxsIGFsd2F5cyBpbmNsdWRlIFBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIC8vIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwdWJsaWMgcGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9wcm9maWxlX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkJFxuICAgICAgICAua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpLnBpcGUoXG4gICAgICAgICAgbWFwKHByb2plY3RQcm9maWxlUmVscyA9PiB2YWx1ZXMocHJvamVjdFByb2ZpbGVSZWxzKVxuICAgICAgICAgICAgLmZpbHRlcihyZWwgPT4gcmVsLmVuYWJsZWQpXG4gICAgICAgICAgICAubWFwKHJlbCA9PiByZWwuZmtfcHJvZmlsZSlcbiAgICAgICAgICApLFxuICAgICAgICAgIG1hcChlbmFibGVkID0+IFsuLi5lbmFibGVkLCBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXSksXG4gICAgICAgICkpLFxuICAgICAgc2hhcmVSZXBsYXkoKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIGFsbCBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAgICogVGhlIEZpZWxkcyBhcmUgbm90IG9yZGVyZWQgYW5kIG5vdCBmaWx0ZXJlZFxuICAgKiBJZiB5b3Ugd2FudCBzcGVjaWZpYyBzdWJzZXRzIG9mIEZpZWxkcyBhbmQvb3Igb3JkZXJlZCBGaWVsZHMsIHVzZSB0aGUgcGlwZXNcbiAgICogdGhhdCBidWlsZCBvbiB0aGlzIHBpcGUuXG4gICAqL1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHMocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAvLyBwaXBlIHNvdXJjZSBjbGFzc1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcyksXG4gICAgICAvLyBwaXBlIG91dGdvaW5nIHByb3BlcnRpZXNcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfZG9tYWluJC5rZXkocGtDbGFzcykucGlwZShtYXAoaW5kZXhlZCA9PiB2YWx1ZXMoaW5kZXhlZCkpKSxcbiAgICAgIC8vIHBpcGUgaW5nb2luZyBwcm9wZXJ0aWVzXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX3JhbmdlJC5rZXkocGtDbGFzcykucGlwZShtYXAoaW5kZXhlZCA9PiB2YWx1ZXMoaW5kZXhlZCkpKSxcbiAgICAgIC8vIHBpcGUgc3lzIGNvbmZpZ1xuICAgICAgdGhpcy5zLnN5cyQuY29uZmlnJC5tYWluJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgLy8gcGlwZSBlbmFibGVkIHByb2ZpbGVzXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKSxcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtzb3VyY2VLbGFzcywgb3V0Z29pbmdQcm9wcywgaW5nb2luZ1Byb3BzLCBzeXNDb25maWcsIGVuYWJsZWRQcm9maWxlc10pID0+IHtcbiAgICAgICAgY29uc3QgaXNFbmFibGVkID0gKHByb3A6IERmaFByb3BlcnR5KTogYm9vbGVhbiA9PiBlbmFibGVkUHJvZmlsZXMuc29tZShcbiAgICAgICAgICAoZW5hYmxlZCkgPT4gcHJvcC5wcm9maWxlcy5tYXAocCA9PiBwLmZrX3Byb2ZpbGUpLmluY2x1ZGVzKGVuYWJsZWQpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IG91dFAgPSBvdXRnb2luZ1Byb3BzLmZpbHRlcigocHJvcCkgPT4gaXNFbmFibGVkKHByb3ApKVxuICAgICAgICBsZXQgaW5QID0gaW5nb2luZ1Byb3BzLmZpbHRlcigocHJvcCkgPT4gaXNFbmFibGVkKHByb3ApKVxuXG4gICAgICAgIGlmIChwa0NsYXNzID09PSBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOKSB7XG4gICAgICAgICAgLy8gcmVtb3ZlIHRoZSBoYXMgdGltZSBzcGFuIHByb3BlcnR5XG4gICAgICAgICAgaW5QID0gW11cblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIC8vIGlmIGNsYXNzIGlzIG5vdCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UsIGFkZCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UgKDExMTEpIHByb3BlcnR5XG4gICAgICAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbiAgICAgICAgICAvLyAgIGluZ29pbmdQcm9wcy5wdXNoKGNyZWF0ZUFwcGVsbGF0aW9uUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgLy8gaWYgaXMgdGVtcG9yYWwgZW50aXR5LCBhZGQgaGFzIHRpbWUgc3BhbiBwcm9wZXJ0eVxuICAgICAgICAgIGlmIChzb3VyY2VLbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4gICAgICAgICAgICBvdXRQLnB1c2goY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvdXRQLnB1c2goY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KHBrQ2xhc3MpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRQLCB0cnVlLCBlbmFibGVkUHJvZmlsZXMsIHN5c0NvbmZpZywgbm9OZXN0aW5nKSxcbiAgICAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoaW5QLCBmYWxzZSwgZW5hYmxlZFByb2ZpbGVzLCBzeXNDb25maWcsIG5vTmVzdGluZyksXG4gICAgICAgICAgdGhpcy5waXBlRmllbGRDb25maWdzKHBrQ2xhc3MpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoKFtzdWJmaWVsZHMxLCBzdWJmaWVsZHMyLCBmaWVsZENvbmZpZ3NdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWJmaWVsZHMgPSBbLi4uc3ViZmllbGRzMSwgLi4uc3ViZmllbGRzMl1cblxuICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWdJZHggPSBpbmRleEJ5KCh4KSA9PiBbXG4gICAgICAgICAgICAgICh4LmZrX2RvbWFpbl9jbGFzcyB8fCB4LmZrX3JhbmdlX2NsYXNzKSxcbiAgICAgICAgICAgICAgeC5ma19wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgISF4LmZrX2RvbWFpbl9jbGFzc1xuICAgICAgICAgICAgXS5qb2luKCdfJyksIGZpZWxkQ29uZmlncylcblxuICAgICAgICAgICAgY29uc3QgdW5pcUZpZWxkczogeyBbdWlkOiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbiAgICAgICAgICAgIGNvbnN0IHVuaXFTdWJmaWVsZENhY2hlOiB7IFt1aWQ6IHN0cmluZ106IHRydWUgfSA9IHt9XG5cblxuICAgICAgICAgICAgLy8gZ3JvdXAgYnkgc291cmNlLCBwa1Byb3BlcnR5IGFuZCBpc091dGdvaW5nXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3ViZmllbGRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkSWQgPSBbcy5zb3VyY2VDbGFzcywgcy5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBzLmlzT3V0Z29pbmddLmpvaW4oJ18nKVxuICAgICAgICAgICAgICBjb25zdCBzdWJmaWVsZElkID0gW3Muc291cmNlQ2xhc3MsIHMucHJvcGVydHkucGtQcm9wZXJ0eSwgcy5pc091dGdvaW5nLCBzLnRhcmdldENsYXNzXS5qb2luKCdfJylcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWc6IFByb0NsYXNzRmllbGRDb25maWcgfCB1bmRlZmluZWQgPSBmaWVsZENvbmZpZ0lkeFtmaWVsZElkXTtcbiAgICAgICAgICAgICAgLy8gdGhlIGZpcnN0IHRpbWUgdGhlIGdyb3VwIGlzIGVzdGFibGlzaGVkXG4gICAgICAgICAgICAgIGlmICghdW5pcUZpZWxkc1tmaWVsZElkXSkge1xuICAgICAgICAgICAgICAgIGxldCBpc1NwZWNpYWxGaWVsZDogU3BlY2lhbEZpZWxkVHlwZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSGFzVHlwZUZpZWxkKSBpc1NwZWNpYWxGaWVsZCA9ICdoYXMtdHlwZSc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTikgaXNTcGVjaWFsRmllbGQgPSAndGltZS1zcGFuJztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdID0ge1xuICAgICAgICAgICAgICAgICAgc291cmNlQ2xhc3M6IHMuc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsOiBzLnNvdXJjZUNsYXNzTGFiZWwsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eTogcy5zb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZU1pblF1YW50aXR5OiBzLnNvdXJjZU1pblF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHMudGFyZ2V0TWluUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogcy50YXJnZXRNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBzLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgaXNIYXNUeXBlRmllbGQ6IHMuaXNIYXNUeXBlRmllbGQsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcy5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHMuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZSxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvTGFiZWw6IHMub250b0luZm9MYWJlbCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvVXJsOiBzLm9udG9JbmZvVXJsLFxuICAgICAgICAgICAgICAgICAgYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlczogcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW3MudGFyZ2V0Q2xhc3NdLFxuICAgICAgICAgICAgICAgICAgZmllbGRDb25maWcsXG4gICAgICAgICAgICAgICAgICBwbGFjZU9mRGlzcGxheTogZ2V0UGxhY2VPZkRpc3BsYXkoc3lzQ29uZmlnLnNwZWNpYWxGaWVsZHMsIHMsIGZpZWxkQ29uZmlnKSxcbiAgICAgICAgICAgICAgICAgIGlzU3BlY2lhbEZpZWxkLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0czoge1xuICAgICAgICAgICAgICAgICAgICBbcy50YXJnZXRDbGFzc106IHtcbiAgICAgICAgICAgICAgICAgICAgICBsaXN0VHlwZTogcy5saXN0VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHMudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NMYWJlbDogcy50YXJnZXRDbGFzc0xhYmVsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtYXJrIHN1YmZpZWxkIGFzIGFkZGVkXG4gICAgICAgICAgICAgICAgdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0gPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBpZ25vcmUgZHVwbGljYXRpb25zIG9mIHN1YmZpZWxkc1xuICAgICAgICAgICAgICBlbHNlIGlmICghdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0pIHtcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlID9cbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IGZhbHNlIDpcbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLnRhcmdldENsYXNzZXMucHVzaChzLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0udGFyZ2V0c1tzLnRhcmdldENsYXNzXSA9IHtcbiAgICAgICAgICAgICAgICAgIGxpc3RUeXBlOiBzLmxpc3RUeXBlLFxuICAgICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3M6IHMudGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzc0xhYmVsOiBzLnRhcmdldENsYXNzTGFiZWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcyh1bmlxRmllbGRzKVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiBwaXBlIGFsbCB0aGUgc3BlY2lmaWMgZmllbGRzIG9mIGEgY2xhc3MsXG4gICAqIG9yZGVyZWQgYnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MsIG5vTmVzdGluZykucGlwZShcbiAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzXG4gICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMpXG4gICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24gLSBiLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgICogcGlwZSBhbGwgdGhlIGJhc2ljIGZpZWxkcyBvZiBhIGNsYXNzLFxuICAgICogb3JkZXJlZCBieSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgYmFzaWMgZmllbGRzXG4gICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcywgbm9OZXN0aW5nKS5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHNcbiAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBiYXNpYyBmaWVsZHNcbiAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcylcbiAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIGJhc2ljIGZpZWxkc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcy5wb3NpdGlvbiAtIGIucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMucG9zaXRpb24pXG4gICAgICApXG4gICAgKVxuICB9XG5cblxuXG5cbiAgLyoqXG4gICAgICogUGlwZXMgdGhlIGZpZWxkcyBmb3IgdGVtcG9yYWwgZW50aXR5IGZvcm1zXG4gICAgICogLSB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICogLSB0aGUgd2hlbiBmaWVsZFxuICAgICAqIC0gaWYgYXZhaWxhYmxlOiB0aGUgdHlwZSBmaWVsZFxuICAgICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUZpZWxkc0ZvclRlRW5Gb3JtKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MsIG5vTmVzdGluZykucGlwZShcbiAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICBtYXAoYWxsRmllbGRzID0+IHtcbiAgICAgICAgY29uc3QgZmllbGRzID0gYWxsRmllbGRzXG4gICAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHMgYW5kIG5vdCByZW1vdmVkIGZyb20gYWxsIHByb2ZpbGVzXG4gICAgICAgICAgLmZpbHRlcihmaWVsZCA9PiAoZmllbGQucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMgJiYgZmllbGQuYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9PT0gZmFsc2UpKVxuICAgICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbiAtIGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24pXG5cbiAgICAgICAgY29uc3Qgd2hlbkZpZWxkID0gYWxsRmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eSA9PT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4pXG4gICAgICAgIGlmICh3aGVuRmllbGQpIGZpZWxkcy5wdXNoKHdoZW5GaWVsZClcblxuICAgICAgICBjb25zdCB0eXBlRmllbGQgPSBhbGxGaWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5pc0hhc1R5cGVGaWVsZClcbiAgICAgICAgaWYgKHR5cGVGaWVsZCkgZmllbGRzLnB1c2godHlwZUZpZWxkKVxuXG4gICAgICAgIHJldHVybiBmaWVsZHM7XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuXG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIGZpZWxkcyBvZiBnaXZlbiBjbGFzcyBpbiB0aGlzIG9yZGVyOlxuICAgKiAtIGJhc2ljIGZpZWxkc1xuICAgKiAtIHNwZWNpZmljIGZpZWxkc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUJhc2ljQW5kU3BlY2lmaWNGaWVsZHMocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZyksXG4gICAgICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzLCBub05lc3RpbmcpXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuICAvKipcbiAgKiBQaXBlcyB0aGUgZmllbGRzIG9mIGdpdmVuIGNsYXNzIGluIHRoaXMgb3JkZXI6XG4gICogLSBzcGVjaWZpYyBmaWVsZHNcbiAgKiAtIGJhc2ljIGZpZWxkc1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkT2ZDbGFzcyhwa0NsYXNzLCBub05lc3RpbmcpLFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MsIG5vTmVzdGluZyksXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFxuICAgIHByb3BlcnRpZXM6IERmaFByb3BlcnR5W10sXG4gICAgaXNPdXRnb2luZzogYm9vbGVhbixcbiAgICBlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdLFxuICAgIHN5c0NvbmZpZzogU3lzQ29uZmlnVmFsdWUsXG4gICAgbm9OZXN0aW5nID0gZmFsc2VcbiAgKTogT2JzZXJ2YWJsZTxTdWJmaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgcHJvcGVydGllcy5tYXAocCA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpcGVTdWJmaWVsZChpc091dGdvaW5nLCBwLCBzeXNDb25maWcsIGVuYWJsZWRQcm9maWxlcywgbm9OZXN0aW5nKTtcbiAgICAgIH0pXG4gICAgKVxuXG4gIH1cblxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwaXBlU3ViZmllbGRJZFRvU3ViZmllbGQoc291cmNlQ2xhc3M6IG51bWJlciwgcHJvcGVydHk6IG51bWJlciwgdGFyZ2V0Q2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbiwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPFN1YmZpZWxkPiB7XG4gICAgY29uc3QgZG9tYWluID0gaXNPdXRnb2luZyA/IHNvdXJjZUNsYXNzIDogdGFyZ2V0Q2xhc3M7XG4gICAgY29uc3QgcmFuZ2UgPSBpc091dGdvaW5nID8gdGFyZ2V0Q2xhc3MgOiBzb3VyY2VDbGFzcztcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5wa19wcm9wZXJ0eV9faGFzX2RvbWFpbl9faGFzX3JhbmdlJC5rZXkoW3Byb3BlcnR5LCBkb21haW4sIHJhbmdlXS5qb2luKCdfJykpXG4gICAgICAgIC5waXBlKGZpbHRlcih4ID0+IHtcbiAgICAgICAgICByZXR1cm4gISF4XG4gICAgICAgIH0pKSxcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQucGlwZShmaWx0ZXIoeCA9PiB7XG4gICAgICAgIHJldHVybiAhIXhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpLnBpcGUoZmlsdGVyKHggPT4ge1xuICAgICAgICByZXR1cm4gISF4XG4gICAgICB9KSksXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZGZoUHJvcCwgc3lzQ29uZiwgZW5hYmxlZFByb2ZpbGVzXSkgPT4gdGhpcy5waXBlU3ViZmllbGQoXG4gICAgICAgIGlzT3V0Z29pbmcsXG4gICAgICAgIGRmaFByb3AsXG4gICAgICAgIHN5c0NvbmYsXG4gICAgICAgIGVuYWJsZWRQcm9maWxlcyxcbiAgICAgICAgbm9OZXN0aW5nXG4gICAgICApKVxuICAgIClcbiAgfVxuXG5cbiAgcHJpdmF0ZSBwaXBlU3ViZmllbGQoXG4gICAgaXNPdXRnb2luZzogYm9vbGVhbixcbiAgICBwOiBEZmhQcm9wZXJ0eSxcbiAgICBzeXNDb25maWc6IFN5c0NvbmZpZ1ZhbHVlLFxuICAgIGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sXG4gICAgbm9OZXN0aW5nID0gZmFsc2VcbiAgKTogT2JzZXJ2YWJsZTxTdWJmaWVsZD4ge1xuICAgIGNvbnN0IG8gPSBpc091dGdvaW5nO1xuICAgIGNvbnN0IHRhcmdldENsYXNzID0gbyA/IHAuaGFzX3JhbmdlIDogcC5oYXNfZG9tYWluO1xuICAgIGNvbnN0IHNvdXJjZUNsYXNzID0gbyA/IHAuaGFzX2RvbWFpbiA6IHAuaGFzX3JhbmdlO1xuICAgIGNvbnN0IHRhcmdldE1heFF1YW50aXR5ID0gbyA/XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllciA6XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI7XG4gICAgY29uc3Qgc291cmNlTWF4UXVhbnRpdHkgPSBvID9cbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllciA6XG4gICAgICBwLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjtcbiAgICBjb25zdCB0YXJnZXRNaW5RdWFudGl0eSA9IG8gP1xuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXIgOlxuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyO1xuICAgIGNvbnN0IHNvdXJjZU1pblF1YW50aXR5ID0gbyA/XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXIgOlxuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI7XG5cbiAgICAvLyBjb25zb2xlLmxvZygncHBwcCB3YW50ZWQ6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVDbGFzc0xhYmVsKHNvdXJjZUNsYXNzKS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BwcHAgZm91bmQgc291cmNlQ2xhc3NMYWJlbDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG5cbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZUNsYXNzTGFiZWwodGFyZ2V0Q2xhc3MpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCB0YXJnZXRDbGFzc0xhYmVsOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcblxuICAgICAgICByZXR1cm4geFxuICAgICAgfSkpLFxuICAgICAgdGhpcy5waXBlU3ViZmllbGRUeXBlT2ZDbGFzcyhzeXNDb25maWcsIHRhcmdldENsYXNzLCB0YXJnZXRNYXhRdWFudGl0eSwgcC5wa19wcm9wZXJ0eSwgbm9OZXN0aW5nKS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BwcHAgZm91bmQgc3ViZmllbGRUeXBlOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZUZpZWxkTGFiZWwocC5wa19wcm9wZXJ0eSwgaXNPdXRnb2luZyA/IHAuaGFzX2RvbWFpbiA6IG51bGwsIGlzT3V0Z29pbmcgPyBudWxsIDogcC5oYXNfcmFuZ2UpLnBpcGUodGFwKHggPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZCBmaWVsZExhYmVsOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICApXG4gICAgICAucGlwZShtYXAoKFtzb3VyY2VDbGFzc0xhYmVsLCB0YXJnZXRDbGFzc0xhYmVsLCBsaXN0VHlwZSwgbGFiZWxdXG4gICAgICApID0+IHtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZygncHBwcCBmb3VuZDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG5cbiAgICAgICAgY29uc3Qgbm9kZTogU3ViZmllbGQgPSB7XG4gICAgICAgICAgbGlzdFR5cGUsXG4gICAgICAgICAgc291cmNlQ2xhc3MsXG4gICAgICAgICAgc291cmNlQ2xhc3NMYWJlbCxcbiAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICBzb3VyY2VNaW5RdWFudGl0eSxcbiAgICAgICAgICB0YXJnZXRDbGFzcyxcbiAgICAgICAgICB0YXJnZXRDbGFzc0xhYmVsLFxuICAgICAgICAgIHRhcmdldE1pblF1YW50aXR5LFxuICAgICAgICAgIHRhcmdldE1heFF1YW50aXR5LFxuICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgIGlzSGFzVHlwZUZpZWxkOiBvICYmIHAuaXNfaGFzX3R5cGVfc3VicHJvcGVydHksXG4gICAgICAgICAgcHJvcGVydHk6IHsgcGtQcm9wZXJ0eTogcC5wa19wcm9wZXJ0eSB9LFxuICAgICAgICAgIGlzT3V0Z29pbmc6IG8sXG4gICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogbyA/IHAuaWRlbnRpdHlfZGVmaW5pbmcgOiBmYWxzZSxcbiAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBvID8gZmFsc2UgOiBwLmlkZW50aXR5X2RlZmluaW5nLFxuICAgICAgICAgIG9udG9JbmZvTGFiZWw6IHAuaWRlbnRpZmllcl9pbl9uYW1lc3BhY2UsXG4gICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvJyArIHAucGtfcHJvcGVydHksXG4gICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogaXNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzKGVuYWJsZWRQcm9maWxlcywgKHAucHJvZmlsZXMgfHwgW10pKSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgdGhlIHR5cGUgb2YgU3ViZmllbGQgZm9yIGEgZ2l2ZW4gY2xhc3NcbiAgICpcbiAgICogQ3VycmVudGx5ICh0byBiZSByZXZpc2VkIGlmIGdvb2QpIHN1YmxjYXNzZXMgb2YgRTU1IFR5cGUsXG4gICAqIHRoYXQgYXJlIHRoZSB0YXJnZXQgb2YgYSBmaWVsZCB3aXRoIHRhcmdldE1heFFhbnRpdHk9MSxcbiAgICogZ2V0IFN1YmZpZWxkIHR5cGUgJ2hhc1R5cGUnLlxuICAgKiBUaGVyZWZvcmUgdGFyZ2V0TWF4UXVhbnRpdHkgaXMgbmVlZGVkLlxuICAgKlxuICAgKiBJZiB3ZSBhcmUgbmVzdGluZyBzdWJmaWVsZHMsIHdlJ2xsIGVuZCB1cCB3aXRoIGNpcmN1bGFyIGZpZWxkcy5cbiAgICogRS5nLjogUGVyc29uIDIxIC0+IGhhcyBhcHBlbGxhdGlvbiAxMTExIC0+IEFwcGVUZUVuIDM2NSAtPiBpcyBhcHBlbGxhdGlvbiBvZiAxMTExIC0+IFBlcnNvbiAyMVxuICAgKiBJbiBvcmRlciB0byBkZXRlY3QgdGhlbSwgd2UgY2FuIGFkZGl0aW9uYWxseSBwYXNzIGluIHRoZSBwYXJlbnQgcHJvcGVydHkuXG4gICAqXG4gICAqIFRoaXMgYmVoYXZpb3IgaGFzIHRvIGJlIHJldmlzZWQsIGJlY2F1c2UgaXQgY2FuIGxlYWQgdG8gcHJvYmxlbXNcbiAgICogd2hlbiB0aGUgU3ViZmllbGQgYmVsb25ncyB0byBhIEZpZWxkIHdpdGggbXVsdGlwbGUgdGFyZ2V0IGNsYXNzZXNcbiAgICogKGFuZCB0aHVzIFN1YmZpZWxkcykgYmVjYXVzZSB0aGUgVUkgdGhlbiBkb2VzIG5vdCBhbGxvdyB0byBjaG9vc2VcbiAgICogdGhlIHJpZ2h0IHRhcmdldCBjbGFzcy5cbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTdWJmaWVsZFR5cGVPZkNsYXNzKGNvbmZpZzogU3lzQ29uZmlnVmFsdWUsIHBrQ2xhc3M6IG51bWJlciwgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlciwgcGFyZW50UHJvcGVydHk/OiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxHdlRhcmdldFR5cGU+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShcbiAgICAgIGZpbHRlcihpID0+ICEhaSksXG4gICAgICBzd2l0Y2hNYXAoKGtsYXNzKSA9PiB0aGlzLnBpcGVTdWJmaWVsZFR5cGUoY29uZmlnLCBrbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHksIHBhcmVudFByb3BlcnR5LCBub05lc3RpbmcpKVxuICAgIClcbiAgfVxuXG5cbiAgcGlwZVN1YmZpZWxkVHlwZShjb25maWc6IFN5c0NvbmZpZ1ZhbHVlLCBrbGFzczogRGZoQ2xhc3MsIHRhcmdldE1heFF1YW50aXR5OiBudW1iZXIsIHBhcmVudFByb3BlcnR5PzogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8R3ZUYXJnZXRUeXBlPiB7XG5cbiAgICBjb25zdCByZXMgPSAoeDogR3ZUYXJnZXRUeXBlKSA9PiBuZXcgQmVoYXZpb3JTdWJqZWN0KHgpXG4gICAgbGV0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZ1xuICAgIGlmIChjb25maWcpIGNsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNba2xhc3MucGtfY2xhc3NdO1xuICAgIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcbiAgICAgIHJldHVybiByZXMoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKVxuICAgIH1cblxuXG4gICAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gMzAgJiYgdGFyZ2V0TWF4UXVhbnRpdHkgPT0gMSkge1xuICAgICAgcmV0dXJuIHJlcyh7IHR5cGVJdGVtOiAndHJ1ZScgfSlcbiAgICB9XG4gICAgLy8gVE9ETyBhZGQgdGhpcyB0byBzeXNDb25maWdWYWx1ZVxuICAgIGVsc2UgaWYgKGtsYXNzLnBrX2NsYXNzID09PSBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOKSB7XG4gICAgICByZXR1cm4gcmVzKHsgdGltZVNwYW46ICd0cnVlJyB9KVxuICAgIH1cbiAgICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA4IHx8IGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwIHx8IG5vTmVzdGluZykge1xuICAgICAgcmV0dXJuIHJlcyh7IGVudGl0eVByZXZpZXc6ICd0cnVlJyB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIHBpcGUgdGhlIHN1YmZpZWxkcyBvZiB0aGUgdGVtcG9yYWxFbnRpdHkgY2xhc3NcbiAgICAgIGNvbnN0IG5vTmVzdCA9IHRydWU7XG4gICAgICByZXR1cm4gdGhpcy5waXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhrbGFzcy5wa19jbGFzcywgbm9OZXN0KS5waXBlKFxuICAgICAgICBtYXAoZmllbGRzID0+IHtcbiAgICAgICAgICBjb25zdCBzdWJlbnRpdHlTdWJmaWVsZFBhZ2U6IEd2U3ViZW50aXRGaWVsZFBhZ2VSZXFbXSA9IFtdXG4gICAgICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgICAgICAgIC8vIGZvciBlYWNoIG9mIHRoZXNlIHN1YmZpZWxkc1xuICAgICAgICAgICAgLy8gY3JlYXRlIHBhZ2U6R3ZTdWJmaWVsZFBhZ2VcblxuICAgICAgICAgICAgY29uc3QgbmVzdGVkVGFyZ2V0czogR3ZTdWJlbnRpdHlGaWVsZFRhcmdldHMgPSB7fTtcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIGZpZWxkLnRhcmdldHMpIHtcbiAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChmaWVsZC50YXJnZXRzLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdFR5cGUgPSBmaWVsZC50YXJnZXRzW2tleV0ubGlzdFR5cGU7XG4gICAgICAgICAgICAgICAgLy8gcHV0IHRlbXBvcmFsRW50aXR5IHRvIGVudGl0eVByZXZpZXdcbiAgICAgICAgICAgICAgICBjb25zdCBzdWJUYXJnZXRUeXBlOiBHdlN1YmVudGl0eVRhcmdldFR5cGUgPSBsaXN0VHlwZS50ZW1wb3JhbEVudGl0eSA/XG4gICAgICAgICAgICAgICAgICB7IGVudGl0eVByZXZpZXc6ICd0cnVlJyB9IDpcbiAgICAgICAgICAgICAgICAgIGxpc3RUeXBlXG4gICAgICAgICAgICAgICAgbmVzdGVkVGFyZ2V0c1trZXldID0gc3ViVGFyZ2V0VHlwZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaXNDaXJjdWxhciA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBwYXJlbnRQcm9wZXJ0eSAmJlxuICAgICAgICAgICAgICBmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09IHBhcmVudFByb3BlcnR5ICYmXG4gICAgICAgICAgICAgIGZpZWxkLnRhcmdldE1heFF1YW50aXR5ID09PSAxXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgaXNDaXJjdWxhciA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IG5lc3RlZFBhZ2U6IEd2U3ViZW50aXRGaWVsZFBhZ2VSZXEgPSB7XG4gICAgICAgICAgICAgIHRhcmdldHM6IG5lc3RlZFRhcmdldHMsXG4gICAgICAgICAgICAgIHBhZ2U6IHtcbiAgICAgICAgICAgICAgICBma1Byb3BlcnR5OiBmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IGZpZWxkLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGlzQ2lyY3VsYXJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3ViZW50aXR5U3ViZmllbGRQYWdlLnB1c2gobmVzdGVkUGFnZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHsgdGVtcG9yYWxFbnRpdHk6IHN1YmVudGl0eVN1YmZpZWxkUGFnZSB9XG4gICAgICAgIH0pLFxuXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogR2V0cyBjbGFzcyBmaWVsZCBjb25maWdzIG9mIGdpdmVuIHBrQ2xhc3NcbiAgICpcbiAgICogLSBvZiBhY3RpdmUgcHJvamVjdCwgaWYgYW55LCBlbHNlXG4gICAqIC0gb2YgZGVmYXVsdCBjb25maWcgcHJvamVjdCwgZWxzZVxuICAgKiAtIGVtcHR5IGFycmF5XG4gICAqXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGRDb25maWdzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8UHJvQ2xhc3NGaWVsZENvbmZpZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGZrUHJvamVjdCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3RrZXkgPSBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSh7XG4gICAgICAgICAgZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkOiBwa0NsYXNzLFxuICAgICAgICAgIGZrX3Byb2plY3Q6IGZrUHJvamVjdFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdGtleSA9IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5KHtcbiAgICAgICAgICBma19jbGFzc19mb3JfY2xhc3NfZmllbGQ6IHBrQ2xhc3MsXG4gICAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLnMucHJvJC5jbGFzc19maWVsZF9jb25maWckLmJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJC5rZXkoYWN0aXZlUHJvamVjdGtleSksXG4gICAgICAgICAgdGhpcy5zLnBybyQuY2xhc3NfZmllbGRfY29uZmlnJC5ieV9ma19wcm9qZWN0X19ma19jbGFzcyQua2V5KGRlZmF1bHRQcm9qZWN0a2V5KVxuICAgICAgICApXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFthY3RpdmVQcm9qZWN0RmllbGRzLCBkZWZhdWx0UHJvamVjdEZpZWxkc10pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjdGl2ZVByb2plY3RGaWVsZHMgJiYgdmFsdWVzKGFjdGl2ZVByb2plY3RGaWVsZHMpLmxlbmd0aCkgcmV0dXJuIGFjdGl2ZVByb2plY3RGaWVsZHM7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRQcm9qZWN0RmllbGRzXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcCgoaXRlbXMpID0+IHZhbHVlcyhpdGVtcykuc29ydCgoYSwgYikgPT4gKGEub3JkX251bSA+IGIub3JkX251bSA/IDEgOiAtMSkpKSxcbiAgICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblxuICAvKipcbiAgICogRGVsaXZlcnMgY2xhc3MgbGFiZWwgZm9yIGFjdGl2ZSBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3NMYWJlbChwa0NsYXNzPzogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5hLnBrUHJvamVjdCQsXG4gICAgICB0aGlzLmEucGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZmtQcm9qZWN0LCBsYW5ndWFnZV0pID0+IHRoaXMucGlwZUxhYmVscyh7IHBrQ2xhc3MsIGZrUHJvamVjdCwgbGFuZ3VhZ2UsIHR5cGU6ICdsYWJlbCcgfSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW1zID0+IHtcblxuICAgICAgICAgICAgY29uc3QgaSA9IGl0ZW1zLmZpbmQoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gaSA/IGkudGV4dCA6IGAqIG5vIGxhYmVsIChpZDogJHtwa0NsYXNzfSkgKmBcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGFycmF5IG9mIG9iamVjdHMgd2l0aFxuICAgKiB0ZXh0IH4gdGhlIHRleHQgb2YgdGhlIHByb3BlcnR5XG4gICAqIG9yaWdpbiwgaW4gdGhpcyBvcmRlcjpcbiAgICogLSBvcmlnaW4gPT0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyAgICAgICAgIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnICAgICAgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnICAgICAgICAgIChmcm9tIGRhdGFfZm9yX2hpc3RvcnkubGFiZWwpXG4gICAqIC0gb3JpZ2luID09ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCcgICAgICAgICAgICAgICAoZnJvbSBkYXRhX2Zvcl9oaXN0b3J5LmxhYmVsKVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUxhYmVscyhkOiB7XG4gICAgZmtQcm9qZWN0OiBudW1iZXIsXG4gICAgdHlwZTogJ2xhYmVsJyB8ICdkZWZpbml0aW9uJyB8ICdzY29wZU5vdGUnLFxuICAgIGxhbmd1YWdlOiBJbmZMYW5ndWFnZSxcbiAgICBwa0NsYXNzPzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eURvbWFpbj86IG51bWJlcixcbiAgICBma1Byb3BlcnR5UmFuZ2U/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPHtcbiAgICBvcmlnaW46IExhYmVsT3JpZ2luXG4gICAgdGV4dDogc3RyaW5nXG4gIH1bXT4ge1xuICAgIGxldCBma19zeXN0ZW1fdHlwZTogbnVtYmVyO1xuXG4gICAgaWYgKGQucGtDbGFzcykge1xuICAgICAgc3dpdGNoIChkLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGFiZWwnOlxuICAgICAgICAgIGZrX3N5c3RlbV90eXBlID0gU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignZmtfc3lzdGVtX3R5cGUgbm90IGZvdW5kJylcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZC5ma1Byb3BlcnR5KSB7XG4gICAgICBzd2l0Y2ggKGQudHlwZSkge1xuICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgZmtfc3lzdGVtX3R5cGUgPSBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdma19zeXN0ZW1fdHlwZSBub3QgZm91bmQnKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAvLyBsYWJlbCBvZiBwcm9qZWN0IGluIGRlZmF1bHQgbGFuZ3VhZ2Ugb2YgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogZC5ma1Byb2plY3QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiBkLmxhbmd1YWdlLnBrX2VudGl0eSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgb2YgZGVmYXVsdCBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNULFxuICAgICAgICBma19sYW5ndWFnZTogZC5sYW5ndWFnZS5wa19lbnRpdHksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgb2YgZGVmYXVsdCBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNULFxuICAgICAgICBma19sYW5ndWFnZTogMTg4ODksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIGZyb20gb250b21lIGluIGRlZmF1bHQgbGFuZ3VhZ2Ugb2YgcHJvamVjdFxuICAgICAgdGhpcy5waXBlRGZoTGFiZWwoe1xuICAgICAgICBsYW5ndWFnZTogZC5sYW5ndWFnZS5pc282MzkxLnRyaW0oKSxcbiAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgZmtfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0ubGFiZWwgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBmcm9tIG9udG9tZSBpbiBlbmdsaXNoXG4gICAgICB0aGlzLnBpcGVEZmhMYWJlbCh7XG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBma19jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19wcm9wZXJ0eTogZC5ma1Byb3BlcnR5XG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2Ygb250b21lIGluIGVuZ2xpc2gnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0ubGFiZWwgfVxuICAgICAgfSkpLFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyBQcm9UZXh0UHJvcGVydHlcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9UZXh0UHJvcGVydHkoZDoge1xuICAgIGZrX3Byb2plY3Q6IG51bWJlcixcbiAgICBma19zeXN0ZW1fdHlwZTogbnVtYmVyLFxuICAgIGZrX2xhbmd1YWdlOiBudW1iZXIsXG4gICAgZmtfZGZoX2NsYXNzPzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eT86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHlfZG9tYWluPzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZT86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8UHJvVGV4dFByb3BlcnR5PiB7XG4gICAgY29uc3Qga2V5ID0gdGV4dFByb3BlcnR5QnlGa3NLZXkoZClcbiAgICByZXR1cm4gdGhpcy5zLnBybyQudGV4dF9wcm9wZXJ0eSQuYnlfZmtzJC5rZXkoa2V5KVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIERmaExhYmVsXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRGZoTGFiZWwoZDoge1xuICAgIHR5cGU6ICdsYWJlbCcgfCAnZGVmaW5pdGlvbicgfCAnc2NvcGVOb3RlJyxcbiAgICBsYW5ndWFnZTogc3RyaW5nLFxuICAgIGZrX2NsYXNzPzogbnVtYmVyLFxuICAgIGZrX3Byb2ZpbGU/OiBudW1iZXIsXG4gICAgZmtfcHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtfcHJvamVjdD86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8RGZoTGFiZWw+IHtcbiAgICBjb25zdCBrZXkgPSBkZmhMYWJlbEJ5RmtzS2V5KGQpXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLmxhYmVsJC5ieV9ma3MkLmtleShrZXkpXG4gIH1cblxuICAvKipcbiAgICogRGVsaXZlcnMgYmVzdCBmaXR0aW5nIGZpZWxkIGxhYmVsIGZvciBhY3RpdmUgcHJvamVjdFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGRMYWJlbChma1Byb3BlcnR5OiBudW1iZXIsIGZrUHJvcGVydHlEb21haW46IG51bWJlciwgZmtQcm9wZXJ0eVJhbmdlOiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnN0IGlzT3V0Z29pbmcgPSAhIWZrUHJvcGVydHlEb21haW47XG4gICAgLy8gY29uc3Qgc3lzdGVtX3R5cGUgPSBpc091dGdvaW5nID8gKHNpbmd1bGFyID8gMTgwIDogMTgxKSA6IChzaW5ndWxhciA/IDE4MiA6IDE4MylcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5hLnBrUHJvamVjdCQsXG4gICAgICB0aGlzLmEucGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZmtQcm9qZWN0LCBsYW5ndWFnZV0pID0+IHRoaXMucGlwZUxhYmVscyhcbiAgICAgICAge1xuICAgICAgICAgIGZrUHJvamVjdCxcbiAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgIGZrUHJvcGVydHksXG4gICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgICBma1Byb3BlcnR5UmFuZ2VcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgbGV0IGxhYmVsID0gYCogbm8gbGFiZWwgKGlkOiAke2ZrUHJvcGVydHl9KSAqYDtcbiAgICAgICAgICAgIGl0ZW1zLnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGl0ZW0gJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaXRlbS50ZXh0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBpdGVtICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaXNPdXRnb2luZyA/IGl0ZW0udGV4dCA6ICcqIHJldmVyc2Ugb2Y6ICcgKyBpdGVtLnRleHQgKyAnKidcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIG1hcHMgdGhlIGNsYXNzIHRvIHRoZSBjb3JyZXNwb25kaW5nIG1vZGVsIChkYXRhYmFzZSB0YWJsZSlcbiAgICogdGhpcyBpcyB1c2VkIGJ5IEZvcm1zIHRvIGNyZWF0ZSBuZXcgZGF0YSBpbiB0aGUgc2hhcGUgb2ZcbiAgICogdGhlIGRhdGEgbW9kZWxcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUYWJsZU5hbWVPZkNsYXNzKHRhcmdldENsYXNzUGs6IG51bWJlcik6IE9ic2VydmFibGU8VGFibGVOYW1lPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLFxuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkodGFyZ2V0Q2xhc3NQaylcbiAgICApLnBpcGUoXG4gICAgICBmaWx0ZXIoaSA9PiAhaS5pbmNsdWRlcyh1bmRlZmluZWQpKSxcbiAgICAgIG1hcCgoW2NvbmZpZywga2xhc3NdKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZyA9IGNvbmZpZy5jbGFzc2VzW3RhcmdldENsYXNzUGtdO1xuICAgICAgICBpZiAoY2xhc3NDb25maWcgJiYgY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKSB7XG5cbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKVxuICAgICAgICAgIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuYXBwZWxsYXRpb24pIHJldHVyblxuICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbMF07XG4gICAgICAgICAgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuICdhcHBlbGxhdGlvbic7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gJ2xhbmd1YWdlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUucGxhY2UpIHJldHVybiAncGxhY2UnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS50aW1lUHJpbWl0aXZlKSByZXR1cm4gJ3RpbWVfcHJpbWl0aXZlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuICdsYW5nX3N0cmluZyc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuICdkaW1lbnNpb24nO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0IHR5cGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA4IHx8IGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwKSB7XG4gICAgICAgICAgcmV0dXJuICdwZXJzaXN0ZW50X2l0ZW0nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICd0ZW1wb3JhbF9lbnRpdHknXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIENsYXNzZXNcbiAgICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdDpcbiAgICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyBlbmFibGVkIGJ5IGNsYXNzX3Byb2pfcmVsXG4gICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgcmVxdWlyZWQgYnkgc291cmNlc1xuICAgKlxuICAgKiBUaGlzIGlzIHVzZWZ1bGwgdG8gY3JlYXRlIHNlbGVjdCBkcm9wZG93bnMgb2YgY2xhc3NlcyB1c2VycyB3aWxsIGtub3dcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzSW5FbnRpdGllc09yU291cmNlcygpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuICAgICAgdGhpcy5waXBlQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbiAgICAgIHN0YXJ0V2l0aCh7fSlcbiAgICApXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKCkge1xuICAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpXG4gICAgICAucGlwZShtYXAoYyA9PiB2YWx1ZXMoYykubWFwKGsgPT4gay5ma19jbGFzcykpKVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgICogb2YgYWxsIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhdCBsZWFzdCBvbmUgb2YgdGhlIGFjdGl2YXRlZCBwcm9maWxlc1xuICAgKiBvZiB0aHRlIGdpdmVuIHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzRW5hYmxlZEJ5UHJvamVjdFByb2ZpbGVzKCk6IE9ic2VydmFibGU8RGZoQ2xhc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmFsbCQsXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtjbGFzc2VzQnlQaywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlc01hcCA9IGluZGV4QnkoKGspID0+IGsudG9TdHJpbmcoKSwgdmFsdWVzKGVuYWJsZWRQcm9maWxlcykpXG4gICAgICAgIHJldHVybiB2YWx1ZXMoY2xhc3Nlc0J5UGspXG4gICAgICAgICAgLmZpbHRlcihrbGFzcyA9PiBrbGFzcy5wcm9maWxlcy5zb21lKHByb2ZpbGUgPT4gcHJvZmlsZXNNYXBbcHJvZmlsZS5ma19wcm9maWxlXSkpXG4gICAgICB9KVxuICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAqIG9mIGFsbCB0eXBlIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhdCBsZWFzdCBvbmUgb2YgdGhlIGFjdGl2YXRlZCBwcm9maWxlc1xuICAqIG9mIHRodGUgZ2l2ZW4gcHJvamVjdFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUNsYXNzZXNFbmFibGVkQnlQcm9qZWN0UHJvZmlsZXMoKTogT2JzZXJ2YWJsZTxEZmhDbGFzc1tdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X2Jhc2ljX3R5cGUkLmtleSgzMCksXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtjbGFzc2VzQnlQaywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlc01hcCA9IGluZGV4QnkoKGspID0+IGsudG9TdHJpbmcoKSwgdmFsdWVzKGVuYWJsZWRQcm9maWxlcykpXG4gICAgICAgIHJldHVybiB2YWx1ZXMoY2xhc3Nlc0J5UGspXG4gICAgICAgICAgLmZpbHRlcihrbGFzcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2xhc3MucHJvZmlsZXMuc29tZShwcm9maWxlID0+IHByb2ZpbGVzTWFwW3Byb2ZpbGUuZmtfcHJvZmlsZV0pICYmXG4gICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgTWFuaWZlc3RhdGlvbiBwcm9kdWN0IHR5cGUgYW5kIGxhbmd1YWdlXG4gICAgICAgICAgICAgICFbXG4gICAgICAgICAgICAgICAgRGZoQ29uZmlnLkNMQVNTX1BLX0xBTkdVQUdFLFxuICAgICAgICAgICAgICAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRVxuICAgICAgICAgICAgICBdLmluY2x1ZGVzKGtsYXNzLnBrX2NsYXNzKVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXJlIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgICogb2YgYWxsIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhY3RpdmUgcHJvamVjdCAodXNpbmcgY2xhc3NfcHJval9yZWwpXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX2NsYXNzX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlbHMpID0+IHZhbHVlcyhyZWxzKS5tYXAocmVsID0+IHJlbC5ma19jbGFzcykpXG4gICAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBUZUVuIENsYXNzZXNcbiAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTZWxlY3RlZFRlRW5DbGFzc2VzSW5Qcm9qZWN0KCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlVGVFbkNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuICAgICAgdGhpcy5waXBlVGVFbkNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4gICAgICBzdGFydFdpdGgoe30pXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYXJyYXkgb2YgcGtfY2xhc3Mgd2l0aCB0ZUVuIGNsYXNzZXMgZW5hYmxlZCBpbiBlbnRpdGllc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRlRW5DbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfY2xhc3NfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkLmtleShwa1Byb2plY3QgKyAnX3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoY3MpID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdmFsdWVzKGNzKS5tYXAoYyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShjLmZrX2NsYXNzKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoZGZoQ2xhc3NlcyA9PiB0aGlzLmZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlcykpXG4gICAgICAgICkpXG4gICAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIGFycmF5IG9mIERmaENsYXNzIGZvciBUZUVuIENsYXNzZXMgYW5kIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3NcbiAgICogQHBhcmFtIGRmaENsYXNzZXMgYXJyYXkgb2YgRGZoQ2xhc3NcbiAgICogQHJldHVybnMgcmV0dXJucyBhcnJheSBvZiBwa19jbGFzcyB3aGVyZSBjbGFzcyBpcyBUZUVuIGNsYXNzXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlczogRGZoQ2xhc3NbXSk6IG51bWJlcltdIHtcbiAgICBjb25zdCBwa3M6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZmhDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gZGZoQ2xhc3Nlc1tpXTtcbiAgICAgIGlmIChjLmJhc2ljX3R5cGUgPT09IDkpIHBrcy5wdXNoKGMucGtfY2xhc3MpO1xuICAgIH1cbiAgICByZXR1cm4gcGtzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYXJyYXkgb2YgcGtfY2xhc3Mgd2l0aCB0ZUVuIGNsYXNzZXMgcmVxdWlyZWQgYnkgc291cmNlc1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRlRW5DbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGNzKSA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHZhbHVlcyhjcykubWFwKGMgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkoYy5ma19jbGFzcykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICApKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKGRmaENsYXNzZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzKVxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgICApXG4gIH1cblxuXG5cblxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUFuZFR5cGVkQ2xhc3NlcyhlbmFibGVkSW4/OiAnZW50aXRpZXMnIHwgJ3NvdXJjZXMnKTogT2JzZXJ2YWJsZTx7IHR5cGVkQ2xhc3M6IG51bWJlciwgdHlwZUNsYXNzOiBudW1iZXIgfVtdPiB7XG5cbiAgICBsZXQgcGtzJDogT2JzZXJ2YWJsZTxudW1iZXJbXT5bXTtcblxuICAgIGNvbnN0IGZyb21Tb3VyY2VzJCA9IHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcChjbGFzc2VzID0+IHZhbHVlcyhjbGFzc2VzKS5tYXAoayA9PiBrLmZrX2NsYXNzKSksXG4gICAgKVxuXG4gICAgY29uc3QgZnJvbUVudGl0aWVzJCA9IHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpXG5cbiAgICBpZiAoZW5hYmxlZEluID09PSAnc291cmNlcycpIHtcbiAgICAgIHBrcyQgPSBbZnJvbVNvdXJjZXMkXTtcbiAgICB9IGVsc2UgaWYgKGVuYWJsZWRJbiA9PT0gJ2VudGl0aWVzJykge1xuICAgICAgcGtzJCA9IFtmcm9tRW50aXRpZXMkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGtzJCA9IFtmcm9tU291cmNlcyQsIGZyb21FbnRpdGllcyRdXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QocGtzJCkucGlwZShcbiAgICAgIG1hcChhcnJheU9mUGtBcnJheXMgPT4gdW5pcShmbGF0dGVuPG51bWJlcj4oYXJyYXlPZlBrQXJyYXlzKSkpLFxuICAgICAgc3dpdGNoTWFwKHBrcyA9PiB0aGlzLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMocGtzKSlcbiAgICApXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKHBrVHlwZWRDbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8eyB0eXBlZENsYXNzOiBudW1iZXIsIHR5cGVDbGFzczogbnVtYmVyIH1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX2RvbWFpbi50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBwa1R5cGVkQ2xhc3Nlcy5tYXAocGsgPT4gKHtcbiAgICAgICAgICB0eXBlZENsYXNzOiBwayxcbiAgICAgICAgICB0eXBlQ2xhc3M6IGJ5RG9tYWluW3BrXSA/IGJ5RG9tYWluW3BrXS5oYXNfcmFuZ2UgOiB1bmRlZmluZWRcbiAgICAgICAgfSkpXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQ2xhc3NPZlR5cGVkQ2xhc3MocGtUeXBlZENsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfZG9tYWluLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIGJ5RG9tYWluW3BrVHlwZWRDbGFzc10gPyBieURvbWFpbltwa1R5cGVkQ2xhc3NdLmhhc19yYW5nZSA6IHVuZGVmaW5lZFxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyhwa1R5cGVDbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcblxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19yYW5nZS50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBwa1R5cGVDbGFzc2VzLm1hcChwayA9PiBieURvbWFpbltwa10gPyBieURvbWFpbltwa10uaGFzX2RvbWFpbiA6IHVuZGVmaW5lZClcbiAgICAgIH0pKVxuICB9XG5cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZVByb3BlcnR5T2ZUeXBlZENsYXNzKHBrVHlwZWRDbGFzcyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGVQcm9wID0gdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykuZmluZChwID0+IHAuaGFzX2RvbWFpbiA9PT0gcGtUeXBlZENsYXNzKVxuICAgICAgICByZXR1cm4gdHlwZVByb3AgPyB0eXBlUHJvcC5wa19wcm9wZXJ0eSA6IHVuZGVmaW5lZDtcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMocGtQcm9wZXJ0aWVzOiBudW1iZXJbXSwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X3BrX3Byb3BlcnR5JC5hbGwkLnBpcGUoXG4gICAgICBtYXAoeCA9PiB7XG4gICAgICAgIGlmICghcGtQcm9wZXJ0aWVzIHx8ICFwa1Byb3BlcnRpZXMubGVuZ3RoKSByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3QgcmVzID0gW11cbiAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3NlcyA9IHt9O1xuICAgICAgICBwa1Byb3BlcnRpZXMuZm9yRWFjaChwa1Byb3AgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BzID0gdmFsdWVzKHhbcGtQcm9wXSk7XG4gICAgICAgICAgcHJvcHMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldENsYXNzID0gaXNPdXRnb2luZyA/IHByb3AuaGFzX3JhbmdlIDogcHJvcC5oYXNfZG9tYWluO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXRDbGFzc2VzW3RhcmdldENsYXNzXSkge1xuICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzW3RhcmdldENsYXNzXSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlcy5wdXNoKHRhcmdldENsYXNzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5cblxuZnVuY3Rpb24gY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KGRvbWFpbkNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuXG4gIGNvbnN0IGhhc0RlZmluaXRpb246IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IGRvbWFpbkNsYXNzLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfUDE4X0hBU19ERUZJTklUSU9OLFxuICAgIGhhc19yYW5nZTogNzg1LFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ1AxOCcsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IGZhbHNlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzRGVmaW5pdGlvblxufVxuXG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUhhc1RpbWVTcGFuUHJvcGVydHkoZG9tYWluQ2xhc3M6IG51bWJlcikge1xuICBjb25zdCBwcm9maWxlczogUHJvZmlsZXMgPSBbXG4gICAge1xuICAgICAgcmVtb3ZlZF9mcm9tX2FwaTogZmFsc2UsXG4gICAgICBma19wcm9maWxlOiBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICAgfVxuICBdXG4gIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eSA9IHtcbiAgICBoYXNfZG9tYWluOiBkb21haW5DbGFzcyxcbiAgICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4sXG4gICAgaGFzX3JhbmdlOiBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ1A0JyxcbiAgICBpZGVudGl0eV9kZWZpbmluZzogZmFsc2UsXG4gICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuICAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbiAgICBwcm9maWxlc1xuICB9XG4gIHJldHVybiBoYXNBcHBlUHJvcFxufVxuXG5cbmZ1bmN0aW9uIGlzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyhlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdLCBwcm9maWxlczogUmVsYXRlZFByb2ZpbGVbXSk6IGJvb2xlYW4ge1xuICByZXR1cm4gIXByb2ZpbGVzLnNvbWUocCA9PiBwLnJlbW92ZWRfZnJvbV9hcGkgPT09IGZhbHNlICYmIGVuYWJsZWRQcm9maWxlcy5pbmNsdWRlcyhwLmZrX3Byb2ZpbGUpKVxuXG59XG5cbmZ1bmN0aW9uIGdldFBsYWNlT2ZEaXNwbGF5KHNwZWNpYWxGaWVsZHM6IFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIHN1YmZpZWxkOiBTdWJmaWVsZCwgcHJvamVjdEZpZWxkQ29uZmlnPzogUHJvQ2xhc3NGaWVsZENvbmZpZyk6IEZpZWxkUGxhY2VPZkRpc3BsYXkge1xuICBsZXQgc2V0dGluZ3M6IFN5c0NvbmZpZ0ZpZWxkRGlzcGxheTtcblxuICBzZXR0aW5ncyA9IGdldFNldHRpbmdzRnJvbVN5c0NvbmZpZyhzdWJmaWVsZCwgc3BlY2lhbEZpZWxkcywgc2V0dGluZ3MpO1xuXG4gIC8vIGlmIHRoaXMgaXMgYSBzcGVjaWFsIGZpZWxkLCBjcmVhdGUgY29ycmVzcG9uZGluZyBkaXNwbGF5IHNldHRpbmdzIGFuZCByZXR1cm4gaXRcbiAgaWYgKHNldHRpbmdzKSB7XG4gICAgaWYgKHNldHRpbmdzLmRpc3BsYXlJbkJhc2ljRmllbGRzKSB7XG4gICAgICByZXR1cm4geyBiYXNpY0ZpZWxkczogeyBwb3NpdGlvbjogc2V0dGluZ3MuZGlzcGxheUluQmFzaWNGaWVsZHMucG9zaXRpb24gfSB9XG4gICAgfSBlbHNlIGlmIChzZXR0aW5ncy5oaWRkZW4pIHtcbiAgICAgIHJldHVybiB7IGhpZGRlbjogdHJ1ZSB9XG4gICAgfVxuICB9XG5cbiAgLy8gb3RoZXJ3aXNlIGRpc3BsYXkgdGhlIGZpZWxkIGluIHNwZWNpZmljIGZpZWxkcyAoZGVmYXVsdClcbiAgbGV0IHBvc2l0aW9uID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICBpZiAocHJvamVjdEZpZWxkQ29uZmlnKSBwb3NpdGlvbiA9IHByb2plY3RGaWVsZENvbmZpZy5vcmRfbnVtXG4gIHJldHVybiB7IHNwZWNpZmljRmllbGRzOiB7IHBvc2l0aW9uIH0gfVxuXG59XG5mdW5jdGlvbiBnZXRTZXR0aW5nc0Zyb21TeXNDb25maWcoXG4gIHN1YmZpZWxkOiBTdWJmaWVsZCwgc3BlY2lhbEZpZWxkczogU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgc2V0dGluZ3M6IFN5c0NvbmZpZ0ZpZWxkRGlzcGxheSkge1xuICBpZiAoc3ViZmllbGQuaXNPdXRnb2luZykge1xuICAgIC8vIGdldCBzZXR0aW5ncyBieSBoYXMtdHlwZS1zdWJwcm9wZXJ0eVxuICAgIGlmIChzdWJmaWVsZC5pc0hhc1R5cGVGaWVsZCAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5oYXNUeXBlU3VicHJvcGVydGllcykge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmhhc1R5cGVTdWJwcm9wZXJ0aWVzO1xuICAgIH1cbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgc291cmNlIGNsYXNzIGFuZCBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXSAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgICAvLyBnZXQgc2VldGluZ3MgYnkgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIGdldCBzZXR0aW5ncyBieSBzb3VyY2UgY2xhc3MgYW5kIHByb3BlcnR5XG4gICAgaWYgKHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXSAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgICAvLyBnZXQgc2VldGluZ3MgYnkgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIHJldHVybiBzZXR0aW5ncztcbn1cblxuXG5cblxuXG5cbi8qKlxuICogUGlwZXMgdGhlIGZpZWxkcyBmb3IgdGVtcG9yYWwgZW50aXR5IGZvcm1zXG4gKiAtIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAqIC0gdGhlIHdoZW4gZmllbGRcbiAqIC0gaWYgYXZhaWxhYmxlOiB0aGUgdHlwZSBmaWVsZFxuICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGREZWZpbml0aW9uc0ZvclRlRW5Gb3JtKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuLy8gICByZXR1cm4gb2YoW10pXG4vLyBjb25zdCBoYXNUeXBlTGlzdERlZiQgPSB0aGlzLnBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzcylcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICB0aGlzLnBpcGVTcGVjaWZpY0ZpZWxkRGVmaW5pdGlvbnMocGtDbGFzcylcbi8vICAgICAucGlwZShcbi8vICAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzLmZpbHRlcihmID0+IGYuYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9PT0gZmFsc2UpKVxuLy8gICAgIClcbi8vICAgLFxuLy8gICBoYXNUeXBlTGlzdERlZiQsXG4vLyApLnBpcGUoXG4vLyAgIG1hcCgoW2ZpZWxkcywgaGFzVHlwZUxpc3REZWZzXSkgPT4ge1xuLy8gICAgIGNvbnN0IHdoZW4gPSB0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOKVxuLy8gICAgIHJldHVybiBbXG4vLyAgICAgICAuLi5maWVsZHMsXG4vLyAgICAgICB3aGVuLFxuLy8gICAgICAgLi4uaGFzVHlwZUxpc3REZWZzLm1hcCgoaGFzVHlwZUxpc3REZWYpID0+IHtcbi8vICAgICAgICAgY29uc3QgdHlwZUZpZWxkOiBGaWVsZCA9IHsgLi4uaGFzVHlwZUxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2hhc1R5cGVMaXN0RGVmXSB9XG4vLyAgICAgICAgIHJldHVybiB0eXBlRmllbGQ7XG4vLyAgICAgICB9KVxuLy8gICAgIF1cbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vKipcbiAqIFBpcGUgdGhlIHNwZWNpZmljIGZpZWxkcyBvZiBnaXZlbiBjbGFzc1xuICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3BlY2lmaWNGaWVsZERlZmluaXRpb25zKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIHRydWUpLnBpcGUoXG4vLyAgICAgLy8gZmlsdGVyIG91dCB0aGUgJ2hhcyB0eXBlJyBwcm9wZXJ0eSwgc2luY2UgaXQgaXMgcGFydCBvZiB0aGUgZGVmYXVsdCBmaWVsZHNcbi8vICAgICBtYXAob3V0Z29pbmcgPT4gb3V0Z29pbmcuZmlsdGVyKG8gPT4gIW8uaXNfaGFzX3R5cGVfc3VicHJvcGVydHkpKVxuLy8gICApLFxuLy8gICB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCBmYWxzZSkucGlwZShcbi8vICAgICAvLyBmaWx0ZXIgb3V0IHRoZSAnaGFzIGFwcGVsbGF0aW9uJyBwcm9wZXJ0eSwgc2luY2UgaXQgaXMgcGFydCBvZiB0aGUgZGVmYXVsdCBmaWVsZHNcbi8vICAgICBtYXAoaW5nb2luZyA9PiBpbmdvaW5nLmZpbHRlcihpID0+XG4vLyAgICAgICBpLnBrX3Byb3BlcnR5ICE9PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSVNfQVBQRUxMQVRJT05fT0Zcbi8vICAgICAgICYmIGkucGtfcHJvcGVydHkgIT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19HRU9WUDFfSVNfUkVQUk9EVUNUSU9OX09GXG4vLyAgICAgKSlcbi8vICAgKSxcbi8vICAgdGhpcy5waXBlRmllbGRDb25maWdzKHBrQ2xhc3MpXG4vLyApLnBpcGUoXG4vLyAgIHN3aXRjaE1hcCgoW291dGdvaW5nLCBpbmdvaW5nLCBmaWVsZENvbmZpZ3NdKSA9PiB7XG5cbi8vICAgICBjb25zdCBrZXkgPSAoZmM6IFBhcnRpYWw8UHJvQ2xhc3NGaWVsZENvbmZpZz4pID0+IGAke2ZjLmZrX3Byb3BlcnR5fV8ke2ZjLmZrX2RvbWFpbl9jbGFzc31fJHtmYy5ma19yYW5nZV9jbGFzc31gO1xuLy8gICAgIGNvbnN0IGluZGV4ZWQgPSBpbmRleEJ5KChmYykgPT4gYCR7ZmMuZmtfcHJvcGVydHl9XyR7ZmMuZmtfZG9tYWluX2NsYXNzfV8ke2ZjLmZrX3JhbmdlX2NsYXNzfWAsIGZpZWxkQ29uZmlncylcbi8vICAgICBjb25zdCBnZXRGaWVsZENvbmZpZyA9IChsaXN0RGVmOiBTdWJmaWVsZCk6IFByb0NsYXNzRmllbGRDb25maWcgPT4ge1xuLy8gICAgICAgcmV0dXJuIGluZGV4ZWRba2V5KHtcbi8vICAgICAgICAgZmtfcHJvcGVydHk6IGxpc3REZWYucHJvcGVydHkucGtQcm9wZXJ0eSxcbi8vICAgICAgICAgZmtfZG9tYWluX2NsYXNzOiBsaXN0RGVmLmlzT3V0Z29pbmcgPyBsaXN0RGVmLnNvdXJjZUNsYXNzIDogbnVsbCxcbi8vICAgICAgICAgZmtfcmFuZ2VfY2xhc3M6IGxpc3REZWYuaXNPdXRnb2luZyA/IG51bGwgOiBsaXN0RGVmLnNvdXJjZUNsYXNzLFxuLy8gICAgICAgfSldXG4vLyAgICAgfVxuXG4vLyAgICAgLy8gQ3JlYXRlIGxpc3QgZGVmaW5pdGlvbnNcbi8vICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhpbmdvaW5nLCBmYWxzZSksXG4vLyAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMob3V0Z29pbmcsIHRydWUpXG4vLyAgICAgKS5waXBlKFxuLy8gICAgICAgbWFwKChbaW5nb2luZ0xpc3REZWZzLCBvdXRnb2luZ0xpc3REZWZzXSkgPT4ge1xuLy8gICAgICAgICBjb25zdCBsaXN0RGVmaW5pdGlvbnMgPSBbLi4uaW5nb2luZ0xpc3REZWZzLCAuLi5vdXRnb2luZ0xpc3REZWZzXTtcblxuLy8gICAgICAgICAvLyBDcmVhdGUgZmllbGQgZGVmaW5pdGlvbnNcbi8vICAgICAgICAgY29uc3QgZmllbGREZWZzOiB7IFtrZXk6IHN0cmluZ106IEZpZWxkIH0gPSB7fVxuLy8gICAgICAgICBsaXN0RGVmaW5pdGlvbnMuZm9yRWFjaChsaXN0RGVmID0+IHtcblxuLy8gICAgICAgICAgIGNvbnN0IGsgPSBsaXN0RGVmLnByb3BlcnR5LnBrUHJvcGVydHkgKyAnXycgKyBsaXN0RGVmLmlzT3V0Z29pbmc7XG5cbi8vICAgICAgICAgICBpZiAoIWZpZWxkRGVmc1trXSkge1xuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdID0ge1xuLy8gICAgICAgICAgICAgICAuLi5saXN0RGVmLFxuLy8gICAgICAgICAgICAgICBwbGFjZU9mRGlzcGxheToge30sXG4vLyAgICAgICAgICAgICAgIGFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlLFxuLy8gICAgICAgICAgICAgICBmaWVsZENvbmZpZzogZ2V0RmllbGRDb25maWcobGlzdERlZiksXG4vLyAgICAgICAgICAgICAgIGxpc3REZWZpbml0aW9uczogW2xpc3REZWZdLFxuLy8gICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzOiBbbGlzdERlZi50YXJnZXRDbGFzc11cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdLmxpc3REZWZpbml0aW9ucy5wdXNoKGxpc3REZWYpXG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10udGFyZ2V0Q2xhc3Nlcy5wdXNoKGxpc3REZWYudGFyZ2V0Q2xhc3MpXG4vLyAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgLy8gfVxuXG4vLyAgICAgICAgIH0pXG4vLyAgICAgICAgIC8vIE9yZGVyIHRoZSBmaWVsZHMgYWNjb3JkaW5nIHRvIG9yZF9udW0gKGZyb20gcHJvamVjdCdzIGNvbmZpZywga2xlaW9sYWIncyBjb25maWcpIG9yIHB1dCBpdCBhdCBlbmQgb2YgbGlzdC5cbi8vICAgICAgICAgcmV0dXJuIHNvcnQoXG4vLyAgICAgICAgICAgKGEsIGIpID0+IHtcbi8vICAgICAgICAgICAgIGNvbnN0IGdldE9yZE51bSA9IChpdGVtOiBGaWVsZCkgPT4ge1xuLy8gICAgICAgICAgICAgICBpZiAoaXRlbSAmJiBpdGVtLmZpZWxkQ29uZmlnKSByZXR1cm4gaXRlbS5maWVsZENvbmZpZy5vcmRfbnVtO1xuLy8gICAgICAgICAgICAgICByZXR1cm4gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgY29uc3Qgb3JkTnVtQSA9IGdldE9yZE51bShhKTtcbi8vICAgICAgICAgICAgIGNvbnN0IG9yZE51bUIgPSBnZXRPcmROdW0oYik7XG4vLyAgICAgICAgICAgICByZXR1cm4gb3JkTnVtQSAtIG9yZE51bUI7XG4vLyAgICAgICAgICAgfSxcbi8vICAgICAgICAgICB2YWx1ZXMoZmllbGREZWZzKSlcbi8vICAgICAgIH0pXG4vLyAgICAgKVxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8qKlxuICogUGlwZSB0aGUgZmllbGRzIGZvciBpZGVudGlmaWNhdGlvbiBvZiBnaXZlbiBjbGFzc1xuICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRGVmYXVsdEZpZWxkRGVmaW5pdGlvbnMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cblxuLy8gLyoqXG4vLyAgKiBQaXBlIHRoZSBnZW5lcmljIGZpZWxkIGhhcyBhcHBlbGxhdGlvblxuLy8gICogd2l0aCB0aGUgZ2l2ZW4gY2xhc3MgYXMgcmFuZ2Vcbi8vICAqL1xuLy8gY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5U3RhdHVzID0ge1xuLy8gICBoYXNfZG9tYWluOiBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFLFxuLy8gICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GLFxuLy8gICBoYXNfcmFuZ2U6IHBrQ2xhc3MsXG4vLyAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuLy8gICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAwLFxuLy8gICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4vLyAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbi8vICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdoaXN0UDknLFxuLy8gICBpZGVudGl0eV9kZWZpbmluZzogdHJ1ZSxcbi8vICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuLy8gICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4vLyAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlLFxuLy8gICBwcm9maWxlczogW11cbi8vIH1cbi8vIGNvbnN0IGhhc0FwcGVMaXN0RGVmJCA9IHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhbaGFzQXBwZVByb3BdLCBmYWxzZSkucGlwZShcbi8vICAgZmlsdGVyKGxpc3REZWZzID0+ICEhbGlzdERlZnMgJiYgISFsaXN0RGVmc1swXSksXG4vLyAgIG1hcChsaXN0RGVmcyA9PiBsaXN0RGVmc1swXSlcbi8vICk7XG5cbi8vIC8qKlxuLy8gICogUGlwZSB0aGUgZ2VuZXJpYyBmaWVsZCBoYXMgdHlwZVxuLy8gICogd2l0aCB0aGUgZ2l2ZW4gY2xhc3MgYXMgcmFuZ2Vcbi8vICAqL1xuLy8gY29uc3QgaGFzVHlwZUxpc3REZWYkID0gdGhpcy5waXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3MpXG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgaGFzQXBwZUxpc3REZWYkLFxuLy8gICBoYXNUeXBlTGlzdERlZiQsXG4vLyAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoZmlsdGVyKGMgPT4gISFjKSlcbi8vICkucGlwZShcbi8vICAgbWFwKChbaGFzQXBwZUxpc3REZWYsIGhhc1R5cGVMaXN0RGVmcywga2xhc3NdKSA9PiB7XG4vLyAgICAgY29uc3QgZmllbGRzOiBGaWVsZFtdID0gW11cblxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAgKiBBZGQgJ3Nob3J0IHRpdGxlJyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gICpcbi8vICAgICAvLyAgKiBNYW5pZmVzdGF0aW9uIFByb2R1Y3QgVHlwZSDigJMgRjMsIDIxOVxuLy8gICAgIC8vICAqIE1hbmlmZXN0YXRpb24gU2luZ2xldG9uIOKAkyBGNCwgMjIwXG4vLyAgICAgLy8gICogSXRlbSDigJMgRjUsIDIyMVxuLy8gICAgIC8vICAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICAqL1xuLy8gICAgIC8vIGlmIChbXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9QUk9EVUNUX1RZUEUsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9TSU5HTEVUT04sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfSVRFTSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVF0uaW5jbHVkZXMocGtDbGFzcykpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1NIT1JUX1RJVExFKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaGFzIGFwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdFA5JyB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCBjbGFzc2VzIGV4Y2VwdCAnQXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0QzEwJywgMzY1XG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuLy8gICAgIC8vICAgY29uc3QgYXBwZUZpZWxkOiBGaWVsZCA9IHsgLi4uaGFzQXBwZUxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2hhc0FwcGVMaXN0RGVmXSB9XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaChhcHBlRmllbGQpO1xuLy8gICAgIC8vIH1cblxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaGFzVHlwZScgZmllbGRzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoaGFzVHlwZUxpc3REZWZzICYmIGhhc1R5cGVMaXN0RGVmcy5sZW5ndGggPiAwKSB7XG4vLyAgICAgLy8gICBoYXNUeXBlTGlzdERlZnMuZm9yRWFjaCgoaGFzVHlwZUxpc3REZWYpID0+IHtcbi8vICAgICAvLyAgICAgY29uc3QgdHlwZUZpZWxkOiBGaWVsZCA9IHsgLi4uaGFzVHlwZUxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2hhc1R5cGVMaXN0RGVmXSB9XG4vLyAgICAgLy8gICAgIGZpZWxkcy5wdXNoKHR5cGVGaWVsZCk7XG4vLyAgICAgLy8gICB9KVxuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2VudGl0eSBkZWZpbml0aW9uJyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIGNsYXNzZXMgZXhjZXB0ICdBcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RDMTAnLCAzNjVcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FTlRJVFlfREVGSU5JVElPTikpO1xuLy8gICAgIC8vIH1cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdpZGVudGlmaWVyIC8gZXhhY3QgcmVmZXJlbmNlIC8gdXJsIC8gLi4uJyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNUID09PSBwa0NsYXNzKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FWEFDVF9SRUZFUkVOQ0UpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdjb21tZW50JyB0ZXh0LXByb3BlcnR5IHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogTWFuaWZlc3RhdGlvbiBQcm9kdWN0IFR5cGUg4oCTIEYzLCAyMTlcbi8vICAgICAvLyAqIE1hbmlmZXN0YXRpb24gU2luZ2xldG9uIOKAkyBGNCwgMjIwXG4vLyAgICAgLy8gKiBJdGVtIOKAkyBGNSwgMjIxXG4vLyAgICAgLy8gKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAqIEV4cHJlc3Npb24gcG9ydGlvbiDigJMgZ2VvdkM1LCA1MDNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChbXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9QUk9EVUNUX1RZUEUsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9TSU5HTEVUT04sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfSVRFTSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVCxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19FWFBSRVNTSU9OX1BPUlRJT05dLmluY2x1ZGVzKHBrQ2xhc3MpKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5UKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAndGltZS1zcGFuJyBmaWVsZCB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCB0ZW1wb3JhbCBlbnRpdHkgY2xhc3Nlc1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDkpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU4pKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICByZXR1cm4gZmllbGRzXG5cbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vLyBwcml2YXRlIHBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzczogbnVtYmVyKSB7XG4vLyAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCB0cnVlKS5waXBlKFxuLy8gICAgIC8vIGNoZWNrIGlmIHRoaXMgY2xhc3MgaGFzICdoYXMgdHlwZScgc3VicHJvcGVydHlcbi8vICAgICBtYXAob3V0Z29pbmcgPT4ge1xuLy8gICAgICAgcmV0dXJuIG91dGdvaW5nLmZpbHRlcigocHJvcCkgPT4gcHJvcC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSk7XG4vLyAgICAgfSksIHN3aXRjaE1hcChoYXNUeXBlUHJvcHMgPT4gY29tYmluZUxhdGVzdE9yRW1wdHkoaGFzVHlwZVByb3BzLm1hcChkZmhQcm9wID0+IHtcbi8vICAgICAgIHJldHVybiB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoW2RmaFByb3BdLCB0cnVlKS5waXBlKGZpbHRlcihsaXN0RGVmcyA9PiAhIWxpc3REZWZzICYmICEhbGlzdERlZnNbMF0pLCBtYXAobGlzdERlZnMgPT4ge1xuLy8gICAgICAgICBjb25zdCBsaXN0RGVmID0gbGlzdERlZnNbMF07XG4vLyAgICAgICAgIGxpc3REZWYubGlzdFR5cGUgPSB7IHR5cGVJdGVtOiAndHJ1ZScgfTtcbi8vICAgICAgICAgcmV0dXJuIGxpc3REZWY7XG4vLyAgICAgICB9KSk7XG4vLyAgICAgfSkpKSk7XG4vLyB9XG5cbi8vIGdldENsYXNzRmllbGRTdWJmaWVsZChwa0NsYXNzRmllbGQ6IG51bWJlcik6IFN1YmZpZWxkIHtcbi8vICAgY29uc3QgdGVtcGxhdGUgPSB7XG4vLyAgICAgcHJvcGVydHk6IHt9LFxuLy8gICAgIHNvdXJjZUNsYXNzOiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlQ2xhc3NMYWJlbDogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldENsYXNzOiB1bmRlZmluZWQsXG4vLyAgICAgaXNPdXRnb2luZzogdW5kZWZpbmVkLFxuLy8gICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IHVuZGVmaW5lZCxcbi8vICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRNaW5RdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZU1heFF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlTWluUXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZVxuLy8gICB9XG4vLyAgIHN3aXRjaCAocGtDbGFzc0ZpZWxkKSB7XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTjpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogeyB0aW1lU3BhbjogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnV2hlbicsXG4vLyAgICAgICAgIGlzT3V0Z29pbmc6IHRydWUsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDQnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS80Jyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IDFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FTlRJVFlfREVGSU5JVElPTjpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdEZXNjcmlwdGlvbicsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVDpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5ULFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdDb21tZW50cycsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9FWEFDVF9SRUZFUkVOQ0U6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnRXhhY3QgUmVmZXJlbmNlJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9TSE9SVF9USVRMRTpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdTaG9ydCBUaXRsZScsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgZGVmYXVsdDpcbi8vICAgICAgIGJyZWFrO1xuLy8gICB9XG4vLyB9XG5cbi8vIGdldENsYXNzRmllbGREZWZpbml0aW9uKHBrQ2xhc3NGaWVsZDogbnVtYmVyKTogRmllbGQge1xuLy8gICBjb25zdCBsaXN0RGVmID0gdGhpcy5nZXRDbGFzc0ZpZWxkU3ViZmllbGQocGtDbGFzc0ZpZWxkKVxuLy8gICByZXR1cm4geyAuLi5saXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtsaXN0RGVmXSB9XG4vLyB9XG5cblxuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNSZXF1aXJlZCgpIHtcbi8vICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWQkLmtleSgndHJ1ZScpXG4vLyAgICAgLnBpcGUobWFwKGMgPT4gdmFsdWVzKGMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSlcbi8vIH1cblxuXG5cbi8vIC8qKlxuLy8gICogUGlwZXMgYWxsIHRoZSBlbmFibGVkIHByb3BlcnRpZXMgb2YgYSBjbGFzc1xuLy8gICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzczogbnVtYmVyLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxEZmhQcm9wZXJ0eVN0YXR1c1tdPiB7XG5cblxuLy8gICBsZXQgJDogT2JzZXJ2YWJsZTxCeVBrPERmaFByb3BlcnR5Pj5cbi8vICAgaWYgKGlzT3V0Z29pbmcpIHtcbi8vICAgICAkID0gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19kb21haW4kLmtleShwa0NsYXNzKVxuLy8gICB9XG4vLyAgIGVsc2Uge1xuLy8gICAgICQgPSB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX3JhbmdlJC5rZXkocGtDbGFzcylcbi8vICAgfVxuXG4vLyAgIC8vIGZpbHRlciBwcm9wZXJ0aWVzIHRoYXQgYXJlIGluIGF0IGxlYXN0IG9uZSBwcm9maWxlIGVuYWJsZWQgYnkgcHJvamVjdFxuLy8gICBjb25zdCBwcm9maWxlcyQgPSB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuXG5cbi8vICAgLy8gRmlsdGVyIG91dCBvbmx5IHRoZSBwcm9wZXJ0aWVzIGZvciB3aGljaCB0YXJnZXQgY2xhc3MgaXMgYWxsb3dlZFxuLy8gICByZXR1cm4gY29tYmluZUxhdGVzdCgkLCBwcm9maWxlcyQpXG4vLyAgICAgLnBpcGUoXG4vLyAgICAgICBtYXAoKFtwcm9wcywgcHJvZmlsZXNdKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHA6IERmaFByb3BlcnR5U3RhdHVzW10gPSBbXVxuXG4vLyAgICAgICAgIHZhbHVlcyhwcm9wcykuZm9yRWFjaChwcm9wID0+IHtcblxuXG4vLyAgICAgICAgICAgY29uc3QgcHJvcFByb2ZpbGVSZWwgPSBwcm9wLnByb2ZpbGVzIGFzIFByb2ZpbGVzXG5cbi8vICAgICAgICAgICBsZXQgZW5hYmxlZEluQVByb2ZpbGUgPSBmYWxzZTtcblxuLy8gICAgICAgICAgIGxldCByZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gdHJ1ZTtcblxuLy8gICAgICAgICAgIHByb3BQcm9maWxlUmVsLmZvckVhY2goaXRlbSA9PiB7XG4vLyAgICAgICAgICAgICBpZiAocHJvZmlsZXMuaW5jbHVkZXMoaXRlbS5ma19wcm9maWxlKSkge1xuLy8gICAgICAgICAgICAgICBlbmFibGVkSW5BUHJvZmlsZSA9IHRydWU7XG4vLyAgICAgICAgICAgICAgIGlmIChpdGVtLnJlbW92ZWRfZnJvbV9hcGkgPT09IGZhbHNlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IGZhbHNlXG4vLyAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICB9KVxuXG4vLyAgICAgICAgICAgaWYgKGVuYWJsZWRJbkFQcm9maWxlKSB7XG4vLyAgICAgICAgICAgICBwLnB1c2goe1xuLy8gICAgICAgICAgICAgICAuLi5wcm9wLFxuLy8gICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfSlcblxuLy8gICAgICAgICByZXR1cm4gcFxuLy8gICAgICAgfSlcbi8vICAgICApXG5cbi8vIH1cblxuXG4vLyAvKipcbi8vICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBDbGFzc2VzXG4vLyAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0XG4vLyAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIGVuYWJsZWQgYnkgY2xhc3NfcHJval9yZWxcbi8vICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgcmVxdWlyZWQgYnkgc291cmNlcyBvciBieSBiYXNpY3Ncbi8vICAqXG4vLyAgKiB0aGlzIGlzIHVzZWZ1bGwgdG8gY2hlY2sgaWYgYSBjbGFzcyBpcyBhdmFpbGFibGUgYXQgYWxsXG4vLyAgKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzSW5FbnRpdGVzT3JSZXF1aXJlZCgpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbi8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgICAgdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4vLyAgICAgdGhpcy5waXBlQ2xhc3Nlc1JlcXVpcmVkKClcbi8vICAgKS5waXBlKFxuLy8gICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuLy8gICAgIHN0YXJ0V2l0aCh7fSlcbi8vICAgKVxuLy8gfVxuIl19