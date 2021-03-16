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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU14RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQU1wRSx1Q0FHQzs7O0lBREMsbURBQStCOztBQVFqQzs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7SUFFcEMsWUFDVSxDQUE0QixFQUM1QixDQUF5QjtRQUR6QixNQUFDLEdBQUQsQ0FBQyxDQUEy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bnQiOlsiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcsIFByb0NvbmZpZywgU3lzQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgZGZoTGFiZWxCeUZrc0tleSwgcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXksIHRleHRQcm9wZXJ0eUJ5RmtzS2V5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBDbGFzc0NvbmZpZywgRGZoQ2xhc3MsIERmaExhYmVsLCBEZmhQcm9wZXJ0eSwgR3ZTdWJlbnRpdEZpZWxkUGFnZVJlcSwgR3ZTdWJlbnRpdHlGaWVsZFRhcmdldHMsIEd2U3ViZW50aXR5VGFyZ2V0VHlwZSwgR3ZUYXJnZXRUeXBlLCBJbmZMYW5ndWFnZSwgUHJvQ2xhc3NGaWVsZENvbmZpZywgUHJvVGV4dFByb3BlcnR5LCBSZWxhdGVkUHJvZmlsZSwgU3lzQ29uZmlnRmllbGREaXNwbGF5LCBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBTeXNDb25maWdWYWx1ZSB9IGZyb20gJ0BrbGVpb2xhYi9saWItc2RrLWxiNCc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0T3JFbXB0eSB9IGZyb20gJ0BrbGVpb2xhYi9saWItdXRpbHMnO1xuaW1wb3J0IHsgZmxhdHRlbiwgaW5kZXhCeSwgdW5pcSwgdmFsdWVzIH0gZnJvbSAncmFtZGEnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc2hhcmVSZXBsYXksIHN0YXJ0V2l0aCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWNoZSB9IGZyb20gJy4uL2RlY29yYXRvcnMvbWV0aG9kLWRlY29yYXRvcnMnO1xuaW1wb3J0IHsgRmllbGQgfSBmcm9tICcuLi9tb2RlbHMvRmllbGQnO1xuaW1wb3J0IHsgRmllbGRQbGFjZU9mRGlzcGxheSB9IGZyb20gJy4uL21vZGVscy9GaWVsZFBvc2l0aW9uJztcbmltcG9ydCB7IFByb2ZpbGVzIH0gZnJvbSAnLi4vbW9kZWxzL1Byb2ZpbGVzJztcbmltcG9ydCB7IFNwZWNpYWxGaWVsZFR5cGUgfSBmcm9tICcuLi9tb2RlbHMvU3BlY2lhbEZpZWxkVHlwZSc7XG5pbXBvcnQgeyBTdWJmaWVsZCB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZCc7XG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuLy8gdGhpcyBpcyB0aGVcbmV4cG9ydCB0eXBlIFRhYmxlTmFtZSA9ICdhcHBlbGxhdGlvbicgfCAnbGFuZ3VhZ2UnIHwgJ3BsYWNlJyB8ICd0aW1lX3ByaW1pdGl2ZScgfCAnbGFuZ19zdHJpbmcnIHwgJ2RpbWVuc2lvbicgfCAncGVyc2lzdGVudF9pdGVtJyB8ICd0ZW1wb3JhbF9lbnRpdHknXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGZoUHJvcGVydHlTdGF0dXMgZXh0ZW5kcyBEZmhQcm9wZXJ0eSB7XG4gIC8vIHRydWUsIGlmIHJlbW92ZWQgZnJvbSBhbGwgcHJvZmlsZXMgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFxuICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBib29sZWFuXG59XG5cbnR5cGUgTGFiZWxPcmlnaW4gPSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJyB8ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCdcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuXG4vKipcbiAqIFRoaXMgU2VydmljZSBwcm92aWRlcyBhIGNvbGxlY3Rpb24gb2YgcGlwZXMgdGhhdCBhZ2dyZWdhdGUgb3IgdHJhbnNmb3JtIGNvbmZpZ3VyYXRpb24gZGF0YS5cbiAqIFdoZW4gdGFsa2luZyBhYm91dCBjb25maWd1cmF0aW9uLCB3ZSBtZWFuIHRoZSBjb25jZXB0dWFsIHJlZmVyZW5jZSBtb2RlbCBhbmQgdGhlIGFkZGl0aW9uYWxcbiAqIGNvbmZpZ3VyYXRpb25zIG9uIHN5c3RlbSBhbmQgcHJvamVjdCBsZXZlbC5cbiAqIEZvciBFeGFtcGxlXG4gKiAtIHRoZSBmaWVsZHMgb2YgYSBjbGFzc1xuICogLSB0aGUgbGFiZWxzIG9mIGNsYXNzZXMgYW5kIHByb3BlcnRpZXNcbiAqL1xuZXhwb3J0IGNsYXNzIENvbmZpZ3VyYXRpb25QaXBlc1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYTogQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSxcbiAgICBwcml2YXRlIHM6IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UsXG4gICkgeyB9XG5cblxuICAvKipcbiAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX3Byb2ZpbGVcbiAgKiBvZiBhbGwgcHJvZmlsZXMgdGhhdCBhcmUgZW5hYmxlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdC5cbiAgKiBUaGUgYXJyYXkgd2lsbCBhbHdheXMgaW5jbHVkZSBQS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICAvLyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcHVibGljIHBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfcHJvZmlsZV9wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZCRcbiAgICAgICAgLmtleShwa1Byb2plY3QgKyAnX3RydWUnKS5waXBlKFxuICAgICAgICAgIG1hcChwcm9qZWN0UHJvZmlsZVJlbHMgPT4gdmFsdWVzKHByb2plY3RQcm9maWxlUmVscylcbiAgICAgICAgICAgIC5maWx0ZXIocmVsID0+IHJlbC5lbmFibGVkKVxuICAgICAgICAgICAgLm1hcChyZWwgPT4gcmVsLmZrX3Byb2ZpbGUpXG4gICAgICAgICAgKSxcbiAgICAgICAgICBtYXAoZW5hYmxlZCA9PiBbLi4uZW5hYmxlZCwgRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ10pLFxuICAgICAgICApKSxcbiAgICAgIHNoYXJlUmVwbGF5KClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZSBhbGwgZmllbGRzIG9mIGdpdmVuIGNsYXNzXG4gICAqIFRoZSBGaWVsZHMgYXJlIG5vdCBvcmRlcmVkIGFuZCBub3QgZmlsdGVyZWRcbiAgICogSWYgeW91IHdhbnQgc3BlY2lmaWMgc3Vic2V0cyBvZiBGaWVsZHMgYW5kL29yIG9yZGVyZWQgRmllbGRzLCB1c2UgdGhlIHBpcGVzXG4gICAqIHRoYXQgYnVpbGQgb24gdGhpcyBwaXBlLlxuICAgKi9cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlRmllbGRzKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgLy8gcGlwZSBzb3VyY2UgY2xhc3NcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLFxuICAgICAgLy8gcGlwZSBvdXRnb2luZyBwcm9wZXJ0aWVzXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX2RvbWFpbiQua2V5KHBrQ2xhc3MpLnBpcGUobWFwKGluZGV4ZWQgPT4gdmFsdWVzKGluZGV4ZWQpKSksXG4gICAgICAvLyBwaXBlIGluZ29pbmcgcHJvcGVydGllc1xuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19yYW5nZSQua2V5KHBrQ2xhc3MpLnBpcGUobWFwKGluZGV4ZWQgPT4gdmFsdWVzKGluZGV4ZWQpKSksXG4gICAgICAvLyBwaXBlIHN5cyBjb25maWdcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQucGlwZShmaWx0ZXIoeCA9PiAhIXgpKSxcbiAgICAgIC8vIHBpcGUgZW5hYmxlZCBwcm9maWxlc1xuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCksXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbc291cmNlS2xhc3MsIG91dGdvaW5nUHJvcHMsIGluZ29pbmdQcm9wcywgc3lzQ29uZmlnLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IChwcm9wOiBEZmhQcm9wZXJ0eSk6IGJvb2xlYW4gPT4gZW5hYmxlZFByb2ZpbGVzLnNvbWUoXG4gICAgICAgICAgKGVuYWJsZWQpID0+IHByb3AucHJvZmlsZXMubWFwKHAgPT4gcC5ma19wcm9maWxlKS5pbmNsdWRlcyhlbmFibGVkKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBvdXRQID0gb3V0Z29pbmdQcm9wcy5maWx0ZXIoKHByb3ApID0+IGlzRW5hYmxlZChwcm9wKSlcbiAgICAgICAgbGV0IGluUCA9IGluZ29pbmdQcm9wcy5maWx0ZXIoKHByb3ApID0+IGlzRW5hYmxlZChwcm9wKSlcblxuICAgICAgICBpZiAocGtDbGFzcyA9PT0gRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTikge1xuICAgICAgICAgIC8vIHJlbW92ZSB0aGUgaGFzIHRpbWUgc3BhbiBwcm9wZXJ0eVxuICAgICAgICAgIGluUCA9IFtdXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyAvLyBpZiBjbGFzcyBpcyBub3QgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlLCBhZGQgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlICgxMTExKSBwcm9wZXJ0eVxuICAgICAgICAgIC8vIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4gICAgICAgICAgLy8gICBpbmdvaW5nUHJvcHMucHVzaChjcmVhdGVBcHBlbGxhdGlvblByb3BlcnR5KHBrQ2xhc3MpKVxuICAgICAgICAgIC8vIH1cblxuICAgICAgICAgIC8vIGlmIGlzIHRlbXBvcmFsIGVudGl0eSwgYWRkIGhhcyB0aW1lIHNwYW4gcHJvcGVydHlcbiAgICAgICAgICBpZiAoc291cmNlS2xhc3MuYmFzaWNfdHlwZSA9PT0gOSkge1xuICAgICAgICAgICAgb3V0UC5wdXNoKGNyZWF0ZUhhc1RpbWVTcGFuUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb3V0UC5wdXNoKGNyZWF0ZUhhc0RlZmluaXRpb25Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMob3V0UCwgdHJ1ZSwgZW5hYmxlZFByb2ZpbGVzLCBzeXNDb25maWcsIG5vTmVzdGluZyksXG4gICAgICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKGluUCwgZmFsc2UsIGVuYWJsZWRQcm9maWxlcywgc3lzQ29uZmlnLCBub05lc3RpbmcpLFxuICAgICAgICAgIHRoaXMucGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKChbc3ViZmllbGRzMSwgc3ViZmllbGRzMiwgZmllbGRDb25maWdzXSkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3ViZmllbGRzID0gWy4uLnN1YmZpZWxkczEsIC4uLnN1YmZpZWxkczJdXG5cbiAgICAgICAgICAgIGNvbnN0IGZpZWxkQ29uZmlnSWR4ID0gaW5kZXhCeSgoeCkgPT4gW1xuICAgICAgICAgICAgICAoeC5ma19kb21haW5fY2xhc3MgfHwgeC5ma19yYW5nZV9jbGFzcyksXG4gICAgICAgICAgICAgIHguZmtfcHJvcGVydHksXG4gICAgICAgICAgICAgICEheC5ma19kb21haW5fY2xhc3NcbiAgICAgICAgICAgIF0uam9pbignXycpLCBmaWVsZENvbmZpZ3MpXG5cbiAgICAgICAgICAgIGNvbnN0IHVuaXFGaWVsZHM6IHsgW3VpZDogc3RyaW5nXTogRmllbGQgfSA9IHt9XG4gICAgICAgICAgICBjb25zdCB1bmlxU3ViZmllbGRDYWNoZTogeyBbdWlkOiBzdHJpbmddOiB0cnVlIH0gPSB7fVxuXG5cbiAgICAgICAgICAgIC8vIGdyb3VwIGJ5IHNvdXJjZSwgcGtQcm9wZXJ0eSBhbmQgaXNPdXRnb2luZ1xuICAgICAgICAgICAgZm9yIChjb25zdCBzIG9mIHN1YmZpZWxkcykge1xuICAgICAgICAgICAgICBjb25zdCBmaWVsZElkID0gW3Muc291cmNlQ2xhc3MsIHMucHJvcGVydHkucGtQcm9wZXJ0eSwgcy5pc091dGdvaW5nXS5qb2luKCdfJylcbiAgICAgICAgICAgICAgY29uc3Qgc3ViZmllbGRJZCA9IFtzLnNvdXJjZUNsYXNzLCBzLnByb3BlcnR5LnBrUHJvcGVydHksIHMuaXNPdXRnb2luZywgcy50YXJnZXRDbGFzc10uam9pbignXycpXG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkQ29uZmlnOiBQcm9DbGFzc0ZpZWxkQ29uZmlnIHwgdW5kZWZpbmVkID0gZmllbGRDb25maWdJZHhbZmllbGRJZF07XG4gICAgICAgICAgICAgIC8vIHRoZSBmaXJzdCB0aW1lIHRoZSBncm91cCBpcyBlc3RhYmxpc2hlZFxuICAgICAgICAgICAgICBpZiAoIXVuaXFGaWVsZHNbZmllbGRJZF0pIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNTcGVjaWFsRmllbGQ6IFNwZWNpYWxGaWVsZFR5cGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocy5pc0hhc1R5cGVGaWVsZCkgaXNTcGVjaWFsRmllbGQgPSAnaGFzLXR5cGUnO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMucHJvcGVydHkucGtQcm9wZXJ0eSA9PT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4pIGlzU3BlY2lhbEZpZWxkID0gJ3RpbWUtc3Bhbic7XG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXSA9IHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUNsYXNzOiBzLnNvdXJjZUNsYXNzLFxuICAgICAgICAgICAgICAgICAgc291cmNlQ2xhc3NMYWJlbDogcy5zb3VyY2VDbGFzc0xhYmVsLFxuICAgICAgICAgICAgICAgICAgc291cmNlTWF4UXVhbnRpdHk6IHMuc291cmNlTWF4UXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICBzb3VyY2VNaW5RdWFudGl0eTogcy5zb3VyY2VNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldE1pblF1YW50aXR5OiBzLnRhcmdldE1pblF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IHMudGFyZ2V0TWF4UXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICBsYWJlbDogcy5sYWJlbCxcbiAgICAgICAgICAgICAgICAgIGlzSGFzVHlwZUZpZWxkOiBzLmlzSGFzVHlwZUZpZWxkLFxuICAgICAgICAgICAgICAgICAgcHJvcGVydHk6IHMucHJvcGVydHksXG4gICAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBzLmlzT3V0Z29pbmcsXG4gICAgICAgICAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiBzLmlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2UsXG4gICAgICAgICAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBzLmlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQsXG4gICAgICAgICAgICAgICAgICBvbnRvSW5mb0xhYmVsOiBzLm9udG9JbmZvTGFiZWwsXG4gICAgICAgICAgICAgICAgICBvbnRvSW5mb1VybDogcy5vbnRvSW5mb1VybCxcbiAgICAgICAgICAgICAgICAgIGFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcyxcbiAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzZXM6IFtzLnRhcmdldENsYXNzXSxcbiAgICAgICAgICAgICAgICAgIGZpZWxkQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgcGxhY2VPZkRpc3BsYXk6IGdldFBsYWNlT2ZEaXNwbGF5KHN5c0NvbmZpZy5zcGVjaWFsRmllbGRzLCBzLCBmaWVsZENvbmZpZyksXG4gICAgICAgICAgICAgICAgICBpc1NwZWNpYWxGaWVsZCxcbiAgICAgICAgICAgICAgICAgIHRhcmdldHM6IHtcbiAgICAgICAgICAgICAgICAgICAgW3MudGFyZ2V0Q2xhc3NdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGlzdFR5cGU6IHMubGlzdFR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBzLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzTGFiZWw6IHMudGFyZ2V0Q2xhc3NMYWJlbFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbWFyayBzdWJmaWVsZCBhcyBhZGRlZFxuICAgICAgICAgICAgICAgIHVuaXFTdWJmaWVsZENhY2hlW3N1YmZpZWxkSWRdID0gdHJ1ZTtcblxuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gaWdub3JlIGR1cGxpY2F0aW9ucyBvZiBzdWJmaWVsZHNcbiAgICAgICAgICAgICAgZWxzZSBpZiAoIXVuaXFTdWJmaWVsZENhY2hlW3N1YmZpZWxkSWRdKSB7XG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID09PSBmYWxzZSA/XG4gICAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBmYWxzZSA6XG4gICAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXM7XG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS50YXJnZXRDbGFzc2VzLnB1c2gocy50YXJnZXRDbGFzcylcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLnRhcmdldHNbcy50YXJnZXRDbGFzc10gPSB7XG4gICAgICAgICAgICAgICAgICBsaXN0VHlwZTogcy5saXN0VHlwZSxcbiAgICAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcyxcbiAgICAgICAgICAgICAgICAgIHRhcmdldENsYXNzOiBzLnRhcmdldENsYXNzLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NMYWJlbDogcy50YXJnZXRDbGFzc0xhYmVsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXModW5pcUZpZWxkcylcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogcGlwZSBhbGwgdGhlIHNwZWNpZmljIGZpZWxkcyBvZiBhIGNsYXNzLFxuICAgKiBvcmRlcmVkIGJ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucGlwZUZpZWxkcyhwa0NsYXNzLCBub05lc3RpbmcpLnBpcGUoXG4gICAgICBtYXAoZmllbGRzID0+IGZpZWxkc1xuICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzKVxuICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uIC0gYi5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbilcbiAgICAgIClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICAqIHBpcGUgYWxsIHRoZSBiYXNpYyBmaWVsZHMgb2YgYSBjbGFzcyxcbiAgICAqIG9yZGVyZWQgYnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIGJhc2ljIGZpZWxkc1xuICAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MsIG5vTmVzdGluZykucGlwZShcbiAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzXG4gICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gYmFzaWMgZmllbGRzXG4gICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMpXG4gICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBiYXNpYyBmaWVsZHNcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMucG9zaXRpb24gLSBiLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzLnBvc2l0aW9uKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG5cblxuXG4gIC8qKlxuICAgICAqIFBpcGVzIHRoZSBmaWVsZHMgZm9yIHRlbXBvcmFsIGVudGl0eSBmb3Jtc1xuICAgICAqIC0gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAqIC0gdGhlIHdoZW4gZmllbGRcbiAgICAgKiAtIGlmIGF2YWlsYWJsZTogdGhlIHR5cGUgZmllbGRcbiAgICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHNGb3JUZUVuRm9ybShwa0NsYXNzOiBudW1iZXIsIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUZpZWxkcyhwa0NsYXNzLCBub05lc3RpbmcpLnBpcGUoXG4gICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgbWFwKGFsbEZpZWxkcyA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IGFsbEZpZWxkc1xuICAgICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzIGFuZCBub3QgcmVtb3ZlZCBmcm9tIGFsbCBwcm9maWxlc1xuICAgICAgICAgIC5maWx0ZXIoZmllbGQgPT4gKGZpZWxkLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzICYmIGZpZWxkLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlKSlcbiAgICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24gLSBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uKVxuXG4gICAgICAgIGNvbnN0IHdoZW5GaWVsZCA9IGFsbEZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHkgPT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOKVxuICAgICAgICBpZiAod2hlbkZpZWxkKSBmaWVsZHMucHVzaCh3aGVuRmllbGQpXG5cbiAgICAgICAgY29uc3QgdHlwZUZpZWxkID0gYWxsRmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaXNIYXNUeXBlRmllbGQpXG4gICAgICAgIGlmICh0eXBlRmllbGQpIGZpZWxkcy5wdXNoKHR5cGVGaWVsZClcblxuICAgICAgICByZXR1cm4gZmllbGRzO1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cblxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3MgaW4gdGhpcyBvcmRlcjpcbiAgICogLSBiYXNpYyBmaWVsZHNcbiAgICogLSBzcGVjaWZpYyBmaWVsZHNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKHBrQ2xhc3M6IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUJhc2ljRmllbGRzT2ZDbGFzcyhwa0NsYXNzLCBub05lc3RpbmcpLFxuICAgICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzcywgbm9OZXN0aW5nKVxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKFthLCBiXSkgPT4gWy4uLmEsIC4uLmJdKVxuICAgICAgKVxuICB9XG5cbiAgLyoqXG4gICogUGlwZXMgdGhlIGZpZWxkcyBvZiBnaXZlbiBjbGFzcyBpbiB0aGlzIG9yZGVyOlxuICAqIC0gc3BlY2lmaWMgZmllbGRzXG4gICogLSBiYXNpYyBmaWVsZHNcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNwZWNpZmljQW5kQmFzaWNGaWVsZHMocGtDbGFzczogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzcywgbm9OZXN0aW5nKSxcbiAgICAgIHRoaXMucGlwZUJhc2ljRmllbGRzT2ZDbGFzcyhwa0NsYXNzLCBub05lc3RpbmcpLFxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKFthLCBiXSkgPT4gWy4uLmEsIC4uLmJdKVxuICAgICAgKVxuICB9XG5cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhcbiAgICBwcm9wZXJ0aWVzOiBEZmhQcm9wZXJ0eVtdLFxuICAgIGlzT3V0Z29pbmc6IGJvb2xlYW4sXG4gICAgZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSxcbiAgICBzeXNDb25maWc6IFN5c0NvbmZpZ1ZhbHVlLFxuICAgIG5vTmVzdGluZyA9IGZhbHNlXG4gICk6IE9ic2VydmFibGU8U3ViZmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0T3JFbXB0eShcbiAgICAgIHByb3BlcnRpZXMubWFwKHAgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5waXBlU3ViZmllbGQoaXNPdXRnb2luZywgcCwgc3lzQ29uZmlnLCBlbmFibGVkUHJvZmlsZXMsIG5vTmVzdGluZyk7XG4gICAgICB9KVxuICAgIClcblxuICB9XG5cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSlcbiAgcGlwZVN1YmZpZWxkSWRUb1N1YmZpZWxkKHNvdXJjZUNsYXNzOiBudW1iZXIsIHByb3BlcnR5OiBudW1iZXIsIHRhcmdldENsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4sIG5vTmVzdGluZyA9IGZhbHNlKTogT2JzZXJ2YWJsZTxTdWJmaWVsZD4ge1xuICAgIGNvbnN0IGRvbWFpbiA9IGlzT3V0Z29pbmcgPyBzb3VyY2VDbGFzcyA6IHRhcmdldENsYXNzO1xuICAgIGNvbnN0IHJhbmdlID0gaXNPdXRnb2luZyA/IHRhcmdldENsYXNzIDogc291cmNlQ2xhc3M7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQucGtfcHJvcGVydHlfX2hhc19kb21haW5fX2hhc19yYW5nZSQua2V5KFtwcm9wZXJ0eSwgZG9tYWluLCByYW5nZV0uam9pbignXycpKVxuICAgICAgICAucGlwZShmaWx0ZXIoeCA9PiB7XG4gICAgICAgICAgcmV0dXJuICEheFxuICAgICAgICB9KSksXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLnBpcGUoZmlsdGVyKHggPT4ge1xuICAgICAgICByZXR1cm4gISF4XG4gICAgICB9KSksXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKS5waXBlKGZpbHRlcih4ID0+IHtcbiAgICAgICAgcmV0dXJuICEheFxuICAgICAgfSkpLFxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2RmaFByb3AsIHN5c0NvbmYsIGVuYWJsZWRQcm9maWxlc10pID0+IHRoaXMucGlwZVN1YmZpZWxkKFxuICAgICAgICBpc091dGdvaW5nLFxuICAgICAgICBkZmhQcm9wLFxuICAgICAgICBzeXNDb25mLFxuICAgICAgICBlbmFibGVkUHJvZmlsZXMsXG4gICAgICAgIG5vTmVzdGluZ1xuICAgICAgKSlcbiAgICApXG4gIH1cblxuXG4gIHByaXZhdGUgcGlwZVN1YmZpZWxkKFxuICAgIGlzT3V0Z29pbmc6IGJvb2xlYW4sXG4gICAgcDogRGZoUHJvcGVydHksXG4gICAgc3lzQ29uZmlnOiBTeXNDb25maWdWYWx1ZSxcbiAgICBlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdLFxuICAgIG5vTmVzdGluZyA9IGZhbHNlXG4gICk6IE9ic2VydmFibGU8U3ViZmllbGQ+IHtcbiAgICBjb25zdCBvID0gaXNPdXRnb2luZztcbiAgICBjb25zdCB0YXJnZXRDbGFzcyA9IG8gPyBwLmhhc19yYW5nZSA6IHAuaGFzX2RvbWFpbjtcbiAgICBjb25zdCBzb3VyY2VDbGFzcyA9IG8gPyBwLmhhc19kb21haW4gOiBwLmhhc19yYW5nZTtcbiAgICBjb25zdCB0YXJnZXRNYXhRdWFudGl0eSA9IG8gP1xuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIgOlxuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyO1xuICAgIGNvbnN0IHNvdXJjZU1heFF1YW50aXR5ID0gbyA/XG4gICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIgOlxuICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI7XG4gICAgY29uc3QgdGFyZ2V0TWluUXVhbnRpdHkgPSBvID9cbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyIDpcbiAgICAgIHAuZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjtcbiAgICBjb25zdCBzb3VyY2VNaW5RdWFudGl0eSA9IG8gP1xuICAgICAgcC5kb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyIDpcbiAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyO1xuXG4gICAgLy8gY29uc29sZS5sb2coJ3BwcHAgd2FudGVkOiAnLCBbc291cmNlQ2xhc3MsIHAucGtfcHJvcGVydHksIHRhcmdldENsYXNzLCBpc091dGdvaW5nXSlcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQ2xhc3NMYWJlbChzb3VyY2VDbGFzcykucGlwZSh0YXAoeCA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIGZvdW5kIHNvdXJjZUNsYXNzTGFiZWw6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuXG4gICAgICAgIHJldHVybiB4XG4gICAgICB9KSksXG4gICAgICB0aGlzLnBpcGVDbGFzc0xhYmVsKHRhcmdldENsYXNzKS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BwcHAgZm91bmQgdGFyZ2V0Q2xhc3NMYWJlbDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG5cbiAgICAgICAgcmV0dXJuIHhcbiAgICAgIH0pKSxcbiAgICAgIHRoaXMucGlwZVN1YmZpZWxkVHlwZU9mQ2xhc3Moc3lzQ29uZmlnLCB0YXJnZXRDbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHksIHAucGtfcHJvcGVydHksIG5vTmVzdGluZykucGlwZSh0YXAoeCA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwcHBwIGZvdW5kIHN1YmZpZWxkVHlwZTogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG4gICAgICAgIHJldHVybiB4XG4gICAgICB9KSksXG4gICAgICB0aGlzLnBpcGVGaWVsZExhYmVsKHAucGtfcHJvcGVydHksIGlzT3V0Z29pbmcgPyBwLmhhc19kb21haW4gOiBudWxsLCBpc091dGdvaW5nID8gbnVsbCA6IHAuaGFzX3JhbmdlKS5waXBlKHRhcCh4ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BwcHAgZm91bmQgZmllbGRMYWJlbDogJywgW3NvdXJjZUNsYXNzLCBwLnBrX3Byb3BlcnR5LCB0YXJnZXRDbGFzcywgaXNPdXRnb2luZ10pXG4gICAgICAgIHJldHVybiB4XG4gICAgICB9KSksXG4gICAgKVxuICAgICAgLnBpcGUobWFwKChbc291cmNlQ2xhc3NMYWJlbCwgdGFyZ2V0Q2xhc3NMYWJlbCwgbGlzdFR5cGUsIGxhYmVsXVxuICAgICAgKSA9PiB7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BwcHAgZm91bmQ6ICcsIFtzb3VyY2VDbGFzcywgcC5wa19wcm9wZXJ0eSwgdGFyZ2V0Q2xhc3MsIGlzT3V0Z29pbmddKVxuXG4gICAgICAgIGNvbnN0IG5vZGU6IFN1YmZpZWxkID0ge1xuICAgICAgICAgIGxpc3RUeXBlLFxuICAgICAgICAgIHNvdXJjZUNsYXNzLFxuICAgICAgICAgIHNvdXJjZUNsYXNzTGFiZWwsXG4gICAgICAgICAgc291cmNlTWF4UXVhbnRpdHksXG4gICAgICAgICAgc291cmNlTWluUXVhbnRpdHksXG4gICAgICAgICAgdGFyZ2V0Q2xhc3MsXG4gICAgICAgICAgdGFyZ2V0Q2xhc3NMYWJlbCxcbiAgICAgICAgICB0YXJnZXRNaW5RdWFudGl0eSxcbiAgICAgICAgICB0YXJnZXRNYXhRdWFudGl0eSxcbiAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICBpc0hhc1R5cGVGaWVsZDogbyAmJiBwLmlzX2hhc190eXBlX3N1YnByb3BlcnR5LFxuICAgICAgICAgIHByb3BlcnR5OiB7IHBrUHJvcGVydHk6IHAucGtfcHJvcGVydHkgfSxcbiAgICAgICAgICBpc091dGdvaW5nOiBvLFxuICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IG8gPyBwLmlkZW50aXR5X2RlZmluaW5nIDogZmFsc2UsXG4gICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogbyA/IGZhbHNlIDogcC5pZGVudGl0eV9kZWZpbmluZyxcbiAgICAgICAgICBvbnRvSW5mb0xhYmVsOiBwLmlkZW50aWZpZXJfaW5fbmFtZXNwYWNlLFxuICAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LycgKyBwLnBrX3Byb3BlcnR5LFxuICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGlzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyhlbmFibGVkUHJvZmlsZXMsIChwLnByb2ZpbGVzIHx8IFtdKSksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlO1xuICAgICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSB0eXBlIG9mIFN1YmZpZWxkIGZvciBhIGdpdmVuIGNsYXNzXG4gICAqXG4gICAqIEN1cnJlbnRseSAodG8gYmUgcmV2aXNlZCBpZiBnb29kKSBzdWJsY2Fzc2VzIG9mIEU1NSBUeXBlLFxuICAgKiB0aGF0IGFyZSB0aGUgdGFyZ2V0IG9mIGEgZmllbGQgd2l0aCB0YXJnZXRNYXhRYW50aXR5PTEsXG4gICAqIGdldCBTdWJmaWVsZCB0eXBlICdoYXNUeXBlJy5cbiAgICogVGhlcmVmb3JlIHRhcmdldE1heFF1YW50aXR5IGlzIG5lZWRlZC5cbiAgICpcbiAgICogSWYgd2UgYXJlIG5lc3Rpbmcgc3ViZmllbGRzLCB3ZSdsbCBlbmQgdXAgd2l0aCBjaXJjdWxhciBmaWVsZHMuXG4gICAqIEUuZy46IFBlcnNvbiAyMSAtPiBoYXMgYXBwZWxsYXRpb24gMTExMSAtPiBBcHBlVGVFbiAzNjUgLT4gaXMgYXBwZWxsYXRpb24gb2YgMTExMSAtPiBQZXJzb24gMjFcbiAgICogSW4gb3JkZXIgdG8gZGV0ZWN0IHRoZW0sIHdlIGNhbiBhZGRpdGlvbmFsbHkgcGFzcyBpbiB0aGUgcGFyZW50IHByb3BlcnR5LlxuICAgKlxuICAgKiBUaGlzIGJlaGF2aW9yIGhhcyB0byBiZSByZXZpc2VkLCBiZWNhdXNlIGl0IGNhbiBsZWFkIHRvIHByb2JsZW1zXG4gICAqIHdoZW4gdGhlIFN1YmZpZWxkIGJlbG9uZ3MgdG8gYSBGaWVsZCB3aXRoIG11bHRpcGxlIHRhcmdldCBjbGFzc2VzXG4gICAqIChhbmQgdGh1cyBTdWJmaWVsZHMpIGJlY2F1c2UgdGhlIFVJIHRoZW4gZG9lcyBub3QgYWxsb3cgdG8gY2hvb3NlXG4gICAqIHRoZSByaWdodCB0YXJnZXQgY2xhc3MuXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3ViZmllbGRUeXBlT2ZDbGFzcyhjb25maWc6IFN5c0NvbmZpZ1ZhbHVlLCBwa0NsYXNzOiBudW1iZXIsIHRhcmdldE1heFF1YW50aXR5OiBudW1iZXIsIHBhcmVudFByb3BlcnR5PzogbnVtYmVyLCBub05lc3RpbmcgPSBmYWxzZSk6IE9ic2VydmFibGU8R3ZUYXJnZXRUeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoXG4gICAgICBmaWx0ZXIoaSA9PiAhIWkpLFxuICAgICAgc3dpdGNoTWFwKChrbGFzcykgPT4gdGhpcy5waXBlU3ViZmllbGRUeXBlKGNvbmZpZywga2xhc3MsIHRhcmdldE1heFF1YW50aXR5LCBwYXJlbnRQcm9wZXJ0eSwgbm9OZXN0aW5nKSlcbiAgICApXG4gIH1cblxuXG4gIHBpcGVTdWJmaWVsZFR5cGUoY29uZmlnOiBTeXNDb25maWdWYWx1ZSwga2xhc3M6IERmaENsYXNzLCB0YXJnZXRNYXhRdWFudGl0eTogbnVtYmVyLCBwYXJlbnRQcm9wZXJ0eT86IG51bWJlciwgbm9OZXN0aW5nID0gZmFsc2UpOiBPYnNlcnZhYmxlPEd2VGFyZ2V0VHlwZT4ge1xuXG4gICAgY29uc3QgcmVzID0gKHg6IEd2VGFyZ2V0VHlwZSkgPT4gbmV3IEJlaGF2aW9yU3ViamVjdCh4KVxuICAgIGxldCBjbGFzc0NvbmZpZzogQ2xhc3NDb25maWdcbiAgICBpZiAoY29uZmlnKSBjbGFzc0NvbmZpZyA9IGNvbmZpZy5jbGFzc2VzW2tsYXNzLnBrX2NsYXNzXTtcbiAgICBpZiAoY2xhc3NDb25maWcgJiYgY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKSB7XG4gICAgICByZXR1cm4gcmVzKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSlcbiAgICB9XG5cblxuICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwICYmIHRhcmdldE1heFF1YW50aXR5ID09IDEpIHtcbiAgICAgIHJldHVybiByZXMoeyB0eXBlSXRlbTogJ3RydWUnIH0pXG4gICAgfVxuICAgIC8vIFRPRE8gYWRkIHRoaXMgdG8gc3lzQ29uZmlnVmFsdWVcbiAgICBlbHNlIGlmIChrbGFzcy5wa19jbGFzcyA9PT0gRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTikge1xuICAgICAgcmV0dXJuIHJlcyh7IHRpbWVTcGFuOiAndHJ1ZScgfSlcbiAgICB9XG4gICAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOCB8fCBrbGFzcy5iYXNpY190eXBlID09PSAzMCB8fCBub05lc3RpbmcpIHtcbiAgICAgIHJldHVybiByZXMoeyBlbnRpdHlQcmV2aWV3OiAndHJ1ZScgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBwaXBlIHRoZSBzdWJmaWVsZHMgb2YgdGhlIHRlbXBvcmFsRW50aXR5IGNsYXNzXG4gICAgICBjb25zdCBub05lc3QgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXMucGlwZVNwZWNpZmljQW5kQmFzaWNGaWVsZHMoa2xhc3MucGtfY2xhc3MsIG5vTmVzdCkucGlwZShcbiAgICAgICAgbWFwKGZpZWxkcyA9PiB7XG4gICAgICAgICAgY29uc3Qgc3ViZW50aXR5U3ViZmllbGRQYWdlOiBHdlN1YmVudGl0RmllbGRQYWdlUmVxW10gPSBbXVxuICAgICAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgICAgICAvLyBmb3IgZWFjaCBvZiB0aGVzZSBzdWJmaWVsZHNcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBwYWdlOkd2U3ViZmllbGRQYWdlXG5cbiAgICAgICAgICAgIGNvbnN0IG5lc3RlZFRhcmdldHM6IEd2U3ViZW50aXR5RmllbGRUYXJnZXRzID0ge307XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBmaWVsZC50YXJnZXRzKSB7XG4gICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZmllbGQudGFyZ2V0cywga2V5KSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RUeXBlID0gZmllbGQudGFyZ2V0c1trZXldLmxpc3RUeXBlO1xuICAgICAgICAgICAgICAgIC8vIHB1dCB0ZW1wb3JhbEVudGl0eSB0byBlbnRpdHlQcmV2aWV3XG4gICAgICAgICAgICAgICAgY29uc3Qgc3ViVGFyZ2V0VHlwZTogR3ZTdWJlbnRpdHlUYXJnZXRUeXBlID0gbGlzdFR5cGUudGVtcG9yYWxFbnRpdHkgP1xuICAgICAgICAgICAgICAgICAgeyBlbnRpdHlQcmV2aWV3OiAndHJ1ZScgfSA6XG4gICAgICAgICAgICAgICAgICBsaXN0VHlwZVxuICAgICAgICAgICAgICAgIG5lc3RlZFRhcmdldHNba2V5XSA9IHN1YlRhcmdldFR5cGVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGlzQ2lyY3VsYXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgcGFyZW50UHJvcGVydHkgJiZcbiAgICAgICAgICAgICAgZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eSA9PSBwYXJlbnRQcm9wZXJ0eSAmJlxuICAgICAgICAgICAgICBmaWVsZC50YXJnZXRNYXhRdWFudGl0eSA9PT0gMVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGlzQ2lyY3VsYXIgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuZXN0ZWRQYWdlOiBHdlN1YmVudGl0RmllbGRQYWdlUmVxID0ge1xuICAgICAgICAgICAgICB0YXJnZXRzOiBuZXN0ZWRUYXJnZXRzLFxuICAgICAgICAgICAgICBwYWdlOiB7XG4gICAgICAgICAgICAgICAgZmtQcm9wZXJ0eTogZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBpc091dGdvaW5nOiBmaWVsZC5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgIGxpbWl0OiAxLFxuICAgICAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgICAgICBpc0NpcmN1bGFyXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN1YmVudGl0eVN1YmZpZWxkUGFnZS5wdXNoKG5lc3RlZFBhZ2UpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7IHRlbXBvcmFsRW50aXR5OiBzdWJlbnRpdHlTdWJmaWVsZFBhZ2UgfVxuICAgICAgICB9KSxcblxuICAgICAgKVxuICAgIH1cbiAgfVxuXG5cbiAgLyoqXG4gICAqIEdldHMgY2xhc3MgZmllbGQgY29uZmlncyBvZiBnaXZlbiBwa0NsYXNzXG4gICAqXG4gICAqIC0gb2YgYWN0aXZlIHByb2plY3QsIGlmIGFueSwgZWxzZVxuICAgKiAtIG9mIGRlZmF1bHQgY29uZmlnIHByb2plY3QsIGVsc2VcbiAgICogLSBlbXB0eSBhcnJheVxuICAgKlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPFByb0NsYXNzRmllbGRDb25maWdbXT4ge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChma1Byb2plY3QpID0+IHtcblxuICAgICAgICBjb25zdCBhY3RpdmVQcm9qZWN0a2V5ID0gcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXkoe1xuICAgICAgICAgIGZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZDogcGtDbGFzcyxcbiAgICAgICAgICBma19wcm9qZWN0OiBma1Byb2plY3RcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3RrZXkgPSBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSh7XG4gICAgICAgICAgZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkOiBwa0NsYXNzLFxuICAgICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1RcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5zLnBybyQuY2xhc3NfZmllbGRfY29uZmlnJC5ieV9ma19wcm9qZWN0X19ma19jbGFzcyQua2V5KGFjdGl2ZVByb2plY3RrZXkpLFxuICAgICAgICAgIHRoaXMucy5wcm8kLmNsYXNzX2ZpZWxkX2NvbmZpZyQuYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkLmtleShkZWZhdWx0UHJvamVjdGtleSlcbiAgICAgICAgKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKChbYWN0aXZlUHJvamVjdEZpZWxkcywgZGVmYXVsdFByb2plY3RGaWVsZHNdKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhY3RpdmVQcm9qZWN0RmllbGRzICYmIHZhbHVlcyhhY3RpdmVQcm9qZWN0RmllbGRzKS5sZW5ndGgpIHJldHVybiBhY3RpdmVQcm9qZWN0RmllbGRzO1xuXG4gICAgICAgICAgICAgIHJldHVybiBkZWZhdWx0UHJvamVjdEZpZWxkc1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKGl0ZW1zKSA9PiB2YWx1ZXMoaXRlbXMpLnNvcnQoKGEsIGIpID0+IChhLm9yZF9udW0gPiBiLm9yZF9udW0gPyAxIDogLTEpKSksXG4gICAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xuXG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGNsYXNzIGxhYmVsIGZvciBhY3RpdmUgcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzTGFiZWwocGtDbGFzcz86IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMuYS5wa1Byb2plY3QkLFxuICAgICAgdGhpcy5hLnBpcGVBY3RpdmVEZWZhdWx0TGFuZ3VhZ2UoKVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2ZrUHJvamVjdCwgbGFuZ3VhZ2VdKSA9PiB0aGlzLnBpcGVMYWJlbHMoeyBwa0NsYXNzLCBma1Byb2plY3QsIGxhbmd1YWdlLCB0eXBlOiAnbGFiZWwnIH0pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGkgPSBpdGVtcy5maW5kKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICAgcmV0dXJuIGkgPyBpLnRleHQgOiBgKiBubyBsYWJlbCAoaWQ6ICR7cGtDbGFzc30pICpgXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBhcnJheSBvZiBvYmplY3RzIHdpdGhcbiAgICogdGV4dCB+IHRoZSB0ZXh0IG9mIHRoZSBwcm9wZXJ0eVxuICAgKiBvcmlnaW4sIGluIHRoaXMgb3JkZXI6XG4gICAqIC0gb3JpZ2luID09ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgICAgICAgICAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJyAgICAgIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyAgICAgICAgICAoZnJvbSBkYXRhX2Zvcl9oaXN0b3J5LmxhYmVsKVxuICAgKiAtIG9yaWdpbiA9PSAnb2Ygb250b21lIGluIGVuZ2xpc2gnICAgICAgICAgICAgICAgKGZyb20gZGF0YV9mb3JfaGlzdG9yeS5sYWJlbClcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVMYWJlbHMoZDoge1xuICAgIGZrUHJvamVjdDogbnVtYmVyLFxuICAgIHR5cGU6ICdsYWJlbCcgfCAnZGVmaW5pdGlvbicgfCAnc2NvcGVOb3RlJyxcbiAgICBsYW5ndWFnZTogSW5mTGFuZ3VhZ2UsXG4gICAgcGtDbGFzcz86IG51bWJlcixcbiAgICBma1Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHlEb21haW4/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eVJhbmdlPzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTx7XG4gICAgb3JpZ2luOiBMYWJlbE9yaWdpblxuICAgIHRleHQ6IHN0cmluZ1xuICB9W10+IHtcbiAgICBsZXQgZmtfc3lzdGVtX3R5cGU6IG51bWJlcjtcblxuICAgIGlmIChkLnBrQ2xhc3MpIHtcbiAgICAgIHN3aXRjaCAoZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xhYmVsJzpcbiAgICAgICAgICBma19zeXN0ZW1fdHlwZSA9IFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUxcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZrX3N5c3RlbV90eXBlIG5vdCBmb3VuZCcpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGQuZmtQcm9wZXJ0eSkge1xuICAgICAgc3dpdGNoIChkLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGFiZWwnOlxuICAgICAgICAgIGZrX3N5c3RlbV90eXBlID0gU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignZmtfc3lzdGVtX3R5cGUgbm90IGZvdW5kJylcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgLy8gbGFiZWwgb2YgcHJvamVjdCBpbiBkZWZhdWx0IGxhbmd1YWdlIG9mIHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IGQuZmtQcm9qZWN0LFxuICAgICAgICBma19sYW5ndWFnZTogZC5sYW5ndWFnZS5wa19lbnRpdHksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIG9mIGRlZmF1bHQgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UucGtfZW50aXR5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIG9mIGRlZmF1bHQgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IDE4ODg5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBmcm9tIG9udG9tZSBpbiBkZWZhdWx0IGxhbmd1YWdlIG9mIHByb2plY3RcbiAgICAgIHRoaXMucGlwZURmaExhYmVsKHtcbiAgICAgICAgbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UuaXNvNjM5MS50cmltKCksXG4gICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgIGZrX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX3Byb3BlcnR5OiBkLmZrUHJvcGVydHlcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLmxhYmVsIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgZnJvbSBvbnRvbWUgaW4gZW5nbGlzaFxuICAgICAgdGhpcy5waXBlRGZoTGFiZWwoe1xuICAgICAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgZmtfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLmxhYmVsIH1cbiAgICAgIH0pKSxcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgUHJvVGV4dFByb3BlcnR5XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlUHJvVGV4dFByb3BlcnR5KGQ6IHtcbiAgICBma19wcm9qZWN0OiBudW1iZXIsXG4gICAgZmtfc3lzdGVtX3R5cGU6IG51bWJlcixcbiAgICBma19sYW5ndWFnZTogbnVtYmVyLFxuICAgIGZrX2RmaF9jbGFzcz86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbj86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPFByb1RleHRQcm9wZXJ0eT4ge1xuICAgIGNvbnN0IGtleSA9IHRleHRQcm9wZXJ0eUJ5RmtzS2V5KGQpXG4gICAgcmV0dXJuIHRoaXMucy5wcm8kLnRleHRfcHJvcGVydHkkLmJ5X2ZrcyQua2V5KGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyBEZmhMYWJlbFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZURmaExhYmVsKGQ6IHtcbiAgICB0eXBlOiAnbGFiZWwnIHwgJ2RlZmluaXRpb24nIHwgJ3Njb3BlTm90ZScsXG4gICAgbGFuZ3VhZ2U6IHN0cmluZyxcbiAgICBma19jbGFzcz86IG51bWJlcixcbiAgICBma19wcm9maWxlPzogbnVtYmVyLFxuICAgIGZrX3Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrX3Byb2plY3Q/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPERmaExhYmVsPiB7XG4gICAgY29uc3Qga2V5ID0gZGZoTGFiZWxCeUZrc0tleShkKVxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5sYWJlbCQuYnlfZmtzJC5rZXkoa2V5KVxuICB9XG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGJlc3QgZml0dGluZyBmaWVsZCBsYWJlbCBmb3IgYWN0aXZlIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkTGFiZWwoZmtQcm9wZXJ0eTogbnVtYmVyLCBma1Byb3BlcnR5RG9tYWluOiBudW1iZXIsIGZrUHJvcGVydHlSYW5nZTogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcbiAgICBjb25zdCBpc091dGdvaW5nID0gISFma1Byb3BlcnR5RG9tYWluO1xuICAgIC8vIGNvbnN0IHN5c3RlbV90eXBlID0gaXNPdXRnb2luZyA/IChzaW5ndWxhciA/IDE4MCA6IDE4MSkgOiAoc2luZ3VsYXIgPyAxODIgOiAxODMpXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMuYS5wa1Byb2plY3QkLFxuICAgICAgdGhpcy5hLnBpcGVBY3RpdmVEZWZhdWx0TGFuZ3VhZ2UoKVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW2ZrUHJvamVjdCwgbGFuZ3VhZ2VdKSA9PiB0aGlzLnBpcGVMYWJlbHMoXG4gICAgICAgIHtcbiAgICAgICAgICBma1Byb2plY3QsXG4gICAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgICBsYW5ndWFnZSxcbiAgICAgICAgICBma1Byb3BlcnR5LFxuICAgICAgICAgIGZrUHJvcGVydHlEb21haW4sXG4gICAgICAgICAgZmtQcm9wZXJ0eVJhbmdlXG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW1zID0+IHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IGAqIG5vIGxhYmVsIChpZDogJHtma1Byb3BlcnR5fSkgKmA7XG4gICAgICAgICAgICBpdGVtcy5zb21lKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpdGVtICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfHxcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZycgfHxcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGl0ZW0udGV4dFxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgaXRlbSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgfHxcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2Ygb250b21lIGluIGVuZ2xpc2gnXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBsYWJlbCA9IGlzT3V0Z29pbmcgPyBpdGVtLnRleHQgOiAnKiByZXZlcnNlIG9mOiAnICsgaXRlbS50ZXh0ICsgJyonXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBsYWJlbFxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBtYXBzIHRoZSBjbGFzcyB0byB0aGUgY29ycmVzcG9uZGluZyBtb2RlbCAoZGF0YWJhc2UgdGFibGUpXG4gICAqIHRoaXMgaXMgdXNlZCBieSBGb3JtcyB0byBjcmVhdGUgbmV3IGRhdGEgaW4gdGhlIHNoYXBlIG9mXG4gICAqIHRoZSBkYXRhIG1vZGVsXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGFibGVOYW1lT2ZDbGFzcyh0YXJnZXRDbGFzc1BrOiBudW1iZXIpOiBPYnNlcnZhYmxlPFRhYmxlTmFtZT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5zLnN5cyQuY29uZmlnJC5tYWluJCxcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHRhcmdldENsYXNzUGspXG4gICAgKS5waXBlKFxuICAgICAgZmlsdGVyKGkgPT4gIWkuaW5jbHVkZXModW5kZWZpbmVkKSksXG4gICAgICBtYXAoKFtjb25maWcsIGtsYXNzXSkgPT4ge1xuICAgICAgICBjb25zdCBjbGFzc0NvbmZpZzogQ2xhc3NDb25maWcgPSBjb25maWcuY2xhc3Nlc1t0YXJnZXRDbGFzc1BrXTtcbiAgICAgICAgaWYgKGNsYXNzQ29uZmlnICYmIGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSkge1xuXG4gICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSlcbiAgICAgICAgICBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm5cbiAgICAgICAgICBjb25zdCBrZXkgPSBrZXlzWzBdO1xuICAgICAgICAgIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuYXBwZWxsYXRpb24pIHJldHVybiAnYXBwZWxsYXRpb24nO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5sYW5ndWFnZSkgcmV0dXJuICdsYW5ndWFnZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLnBsYWNlKSByZXR1cm4gJ3BsYWNlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUudGltZVByaW1pdGl2ZSkgcmV0dXJuICd0aW1lX3ByaW1pdGl2ZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmxhbmdTdHJpbmcpIHJldHVybiAnbGFuZ19zdHJpbmcnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5kaW1lbnNpb24pIHJldHVybiAnZGltZW5zaW9uJztcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybigndW5zdXBwb3J0ZWQgbGlzdCB0eXBlJylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOCB8fCBrbGFzcy5iYXNpY190eXBlID09PSAzMCkge1xuICAgICAgICAgIHJldHVybiAncGVyc2lzdGVudF9pdGVtJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiAndGVtcG9yYWxfZW50aXR5J1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBDbGFzc2VzXG4gICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3Q6XG4gICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgZW5hYmxlZCBieSBjbGFzc19wcm9qX3JlbFxuICAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIHJlcXVpcmVkIGJ5IHNvdXJjZXNcbiAgICpcbiAgICogVGhpcyBpcyB1c2VmdWxsIHRvIGNyZWF0ZSBzZWxlY3QgZHJvcGRvd25zIG9mIGNsYXNzZXMgdXNlcnMgd2lsbCBrbm93XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0luRW50aXRpZXNPclNvdXJjZXMoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbiAgICAgIHRoaXMucGlwZUNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4gICAgICBzdGFydFdpdGgoe30pXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKVxuICAgICAgLnBpcGUobWFwKGMgPT4gdmFsdWVzKGMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSlcbiAgfVxuXG4gIC8qKlxuICAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICAqIG9mIGFsbCBjbGFzc2VzIHRoYXQgYXJlIGVuYWJsZWQgYnkgYXQgbGVhc3Qgb25lIG9mIHRoZSBhY3RpdmF0ZWQgcHJvZmlsZXNcbiAgICogb2YgdGh0ZSBnaXZlbiBwcm9qZWN0XG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0VuYWJsZWRCeVByb2plY3RQcm9maWxlcygpOiBPYnNlcnZhYmxlPERmaENsYXNzW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5hbGwkLFxuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbY2xhc3Nlc0J5UGssIGVuYWJsZWRQcm9maWxlc10pID0+IHtcbiAgICAgICAgY29uc3QgcHJvZmlsZXNNYXAgPSBpbmRleEJ5KChrKSA9PiBrLnRvU3RyaW5nKCksIHZhbHVlcyhlbmFibGVkUHJvZmlsZXMpKVxuICAgICAgICByZXR1cm4gdmFsdWVzKGNsYXNzZXNCeVBrKVxuICAgICAgICAgIC5maWx0ZXIoa2xhc3MgPT4ga2xhc3MucHJvZmlsZXMuc29tZShwcm9maWxlID0+IHByb2ZpbGVzTWFwW3Byb2ZpbGUuZmtfcHJvZmlsZV0pKVxuICAgICAgfSlcbiAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgKiBvZiBhbGwgdHlwZSBjbGFzc2VzIHRoYXQgYXJlIGVuYWJsZWQgYnkgYXQgbGVhc3Qgb25lIG9mIHRoZSBhY3RpdmF0ZWQgcHJvZmlsZXNcbiAgKiBvZiB0aHRlIGdpdmVuIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVDbGFzc2VzRW5hYmxlZEJ5UHJvamVjdFByb2ZpbGVzKCk6IE9ic2VydmFibGU8RGZoQ2xhc3NbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9iYXNpY190eXBlJC5rZXkoMzApLFxuICAgICAgdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbY2xhc3Nlc0J5UGssIGVuYWJsZWRQcm9maWxlc10pID0+IHtcbiAgICAgICAgY29uc3QgcHJvZmlsZXNNYXAgPSBpbmRleEJ5KChrKSA9PiBrLnRvU3RyaW5nKCksIHZhbHVlcyhlbmFibGVkUHJvZmlsZXMpKVxuICAgICAgICByZXR1cm4gdmFsdWVzKGNsYXNzZXNCeVBrKVxuICAgICAgICAgIC5maWx0ZXIoa2xhc3MgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtsYXNzLnByb2ZpbGVzLnNvbWUocHJvZmlsZSA9PiBwcm9maWxlc01hcFtwcm9maWxlLmZrX3Byb2ZpbGVdKSAmJlxuICAgICAgICAgICAgICAvLyBFeGNsdWRlIE1hbmlmZXN0YXRpb24gcHJvZHVjdCB0eXBlIGFuZCBsYW5ndWFnZVxuICAgICAgICAgICAgICAhW1xuICAgICAgICAgICAgICAgIERmaENvbmZpZy5DTEFTU19QS19MQU5HVUFHRSxcbiAgICAgICAgICAgICAgICBEZmhDb25maWcuQ0xBU1NfUEtfTUFOSUZFU1RBVElPTl9QUk9EVUNUX1RZUEVcbiAgICAgICAgICAgICAgXS5pbmNsdWRlcyhrbGFzcy5wa19jbGFzcylcbiAgICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyZSB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICAqIG9mIGFsbCBjbGFzc2VzIHRoYXQgYXJlIGVuYWJsZWQgYnkgYWN0aXZlIHByb2plY3QgKHVzaW5nIGNsYXNzX3Byb2pfcmVsKVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9jbGFzc19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZWxzKSA9PiB2YWx1ZXMocmVscykubWFwKHJlbCA9PiByZWwuZmtfY2xhc3MpKVxuICAgICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgVGVFbiBDbGFzc2VzXG4gICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdFxuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU2VsZWN0ZWRUZUVuQ2xhc3Nlc0luUHJvamVjdCgpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVRlRW5DbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbiAgICAgIHRoaXMucGlwZVRlRW5DbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuICAgICAgc3RhcnRXaXRoKHt9KVxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFycmF5IG9mIHBrX2NsYXNzIHdpdGggdGVFbiBjbGFzc2VzIGVuYWJsZWQgaW4gZW50aXRpZXNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUZUVuQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX2NsYXNzX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGNzKSA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHZhbHVlcyhjcykubWFwKGMgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkoYy5ma19jbGFzcykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICApKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKGRmaENsYXNzZXMgPT4gdGhpcy5maWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXMpKVxuICAgICAgICApKVxuICAgICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgICogRmlsdGVycyBhcnJheSBvZiBEZmhDbGFzcyBmb3IgVGVFbiBDbGFzc2VzIGFuZCByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzXG4gICAqIEBwYXJhbSBkZmhDbGFzc2VzIGFycmF5IG9mIERmaENsYXNzXG4gICAqIEByZXR1cm5zIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3Mgd2hlcmUgY2xhc3MgaXMgVGVFbiBjbGFzc1xuICAgKi9cbiAgcHJpdmF0ZSBmaWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXM6IERmaENsYXNzW10pOiBudW1iZXJbXSB7XG4gICAgY29uc3QgcGtzOiBudW1iZXJbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGZoQ2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYyA9IGRmaENsYXNzZXNbaV07XG4gICAgICBpZiAoYy5iYXNpY190eXBlID09PSA5KSBwa3MucHVzaChjLnBrX2NsYXNzKTtcbiAgICB9XG4gICAgcmV0dXJuIHBrcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFycmF5IG9mIHBrX2NsYXNzIHdpdGggdGVFbiBjbGFzc2VzIHJlcXVpcmVkIGJ5IHNvdXJjZXNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUZUVuQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKCkge1xuICAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChjcykgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB2YWx1ZXMoY3MpLm1hcChjID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KGMuZmtfY2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChkZmhDbGFzc2VzID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlcylcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgICAgKVxuICB9XG5cblxuXG5cblxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVBbmRUeXBlZENsYXNzZXMoZW5hYmxlZEluPzogJ2VudGl0aWVzJyB8ICdzb3VyY2VzJyk6IE9ic2VydmFibGU8eyB0eXBlZENsYXNzOiBudW1iZXIsIHR5cGVDbGFzczogbnVtYmVyIH1bXT4ge1xuXG4gICAgbGV0IHBrcyQ6IE9ic2VydmFibGU8bnVtYmVyW10+W107XG5cbiAgICBjb25zdCBmcm9tU291cmNlcyQgPSB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoY2xhc3NlcyA9PiB2YWx1ZXMoY2xhc3NlcykubWFwKGsgPT4gay5ma19jbGFzcykpLFxuICAgIClcblxuICAgIGNvbnN0IGZyb21FbnRpdGllcyQgPSB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKVxuXG4gICAgaWYgKGVuYWJsZWRJbiA9PT0gJ3NvdXJjZXMnKSB7XG4gICAgICBwa3MkID0gW2Zyb21Tb3VyY2VzJF07XG4gICAgfSBlbHNlIGlmIChlbmFibGVkSW4gPT09ICdlbnRpdGllcycpIHtcbiAgICAgIHBrcyQgPSBbZnJvbUVudGl0aWVzJF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBrcyQgPSBbZnJvbVNvdXJjZXMkLCBmcm9tRW50aXRpZXMkXVxuICAgIH1cblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KHBrcyQpLnBpcGUoXG4gICAgICBtYXAoYXJyYXlPZlBrQXJyYXlzID0+IHVuaXEoZmxhdHRlbjxudW1iZXI+KGFycmF5T2ZQa0FycmF5cykpKSxcbiAgICAgIHN3aXRjaE1hcChwa3MgPT4gdGhpcy5waXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKHBrcykpXG4gICAgKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3Nlcyhwa1R5cGVkQ2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPHsgdHlwZWRDbGFzczogbnVtYmVyLCB0eXBlQ2xhc3M6IG51bWJlciB9W10+IHtcblxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19kb21haW4udG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gcGtUeXBlZENsYXNzZXMubWFwKHBrID0+ICh7XG4gICAgICAgICAgdHlwZWRDbGFzczogcGssXG4gICAgICAgICAgdHlwZUNsYXNzOiBieURvbWFpbltwa10gPyBieURvbWFpbltwa10uaGFzX3JhbmdlIDogdW5kZWZpbmVkXG4gICAgICAgIH0pKVxuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUNsYXNzT2ZUeXBlZENsYXNzKHBrVHlwZWRDbGFzcyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX2RvbWFpbi50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBieURvbWFpbltwa1R5cGVkQ2xhc3NdID8gYnlEb21haW5bcGtUeXBlZENsYXNzXS5oYXNfcmFuZ2UgOiB1bmRlZmluZWRcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVkQ2xhc3Nlc09mVHlwZUNsYXNzZXMocGtUeXBlQ2xhc3NlczogbnVtYmVyW10pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfcmFuZ2UudG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gcGtUeXBlQ2xhc3Nlcy5tYXAocGsgPT4gYnlEb21haW5bcGtdID8gYnlEb21haW5bcGtdLmhhc19kb21haW4gOiB1bmRlZmluZWQpXG4gICAgICB9KSlcbiAgfVxuXG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVQcm9wZXJ0eU9mVHlwZWRDbGFzcyhwa1R5cGVkQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCB0eXBlUHJvcCA9IHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpLmZpbmQocCA9PiBwLmhhc19kb21haW4gPT09IHBrVHlwZWRDbGFzcylcbiAgICAgICAgcmV0dXJuIHR5cGVQcm9wID8gdHlwZVByb3AucGtfcHJvcGVydHkgOiB1bmRlZmluZWQ7XG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUYXJnZXRDbGFzc2VzT2ZQcm9wZXJ0aWVzKHBrUHJvcGVydGllczogbnVtYmVyW10sIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9wa19wcm9wZXJ0eSQuYWxsJC5waXBlKFxuICAgICAgbWFwKHggPT4ge1xuICAgICAgICBpZiAoIXBrUHJvcGVydGllcyB8fCAhcGtQcm9wZXJ0aWVzLmxlbmd0aCkgcmV0dXJuIFtdO1xuXG4gICAgICAgIGNvbnN0IHJlcyA9IFtdXG4gICAgICAgIGNvbnN0IHRhcmdldENsYXNzZXMgPSB7fTtcbiAgICAgICAgcGtQcm9wZXJ0aWVzLmZvckVhY2gocGtQcm9wID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9wcyA9IHZhbHVlcyh4W3BrUHJvcF0pO1xuICAgICAgICAgIHByb3BzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDbGFzcyA9IGlzT3V0Z29pbmcgPyBwcm9wLmhhc19yYW5nZSA6IHByb3AuaGFzX2RvbWFpbjtcbiAgICAgICAgICAgIGlmICghdGFyZ2V0Q2xhc3Nlc1t0YXJnZXRDbGFzc10pIHtcbiAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3Nlc1t0YXJnZXRDbGFzc10gPSB0cnVlO1xuICAgICAgICAgICAgICByZXMucHVzaCh0YXJnZXRDbGFzcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSlcbiAgICApXG4gIH1cbn1cblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc0RlZmluaXRpb25Qcm9wZXJ0eShkb21haW5DbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cblxuICBjb25zdCBoYXNEZWZpbml0aW9uOiBEZmhQcm9wZXJ0eSA9IHtcbiAgICBoYXNfZG9tYWluOiBkb21haW5DbGFzcyxcbiAgICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX1AxOF9IQVNfREVGSU5JVElPTixcbiAgICBoYXNfcmFuZ2U6IDc4NSxcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdQMTgnLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiBmYWxzZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0RlZmluaXRpb25cbn1cblxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIYXNUaW1lU3BhblByb3BlcnR5KGRvbWFpbkNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuICBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogZG9tYWluQ2xhc3MsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOLFxuICAgIGhhc19yYW5nZTogRGZoQ29uZmlnLkNsQVNTX1BLX1RJTUVfU1BBTixcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdQNCcsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IGZhbHNlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzQXBwZVByb3Bcbn1cblxuXG5mdW5jdGlvbiBpc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMoZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSwgcHJvZmlsZXM6IFJlbGF0ZWRQcm9maWxlW10pOiBib29sZWFuIHtcbiAgcmV0dXJuICFwcm9maWxlcy5zb21lKHAgPT4gcC5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSAmJiBlbmFibGVkUHJvZmlsZXMuaW5jbHVkZXMocC5ma19wcm9maWxlKSlcblxufVxuXG5mdW5jdGlvbiBnZXRQbGFjZU9mRGlzcGxheShzcGVjaWFsRmllbGRzOiBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBzdWJmaWVsZDogU3ViZmllbGQsIHByb2plY3RGaWVsZENvbmZpZz86IFByb0NsYXNzRmllbGRDb25maWcpOiBGaWVsZFBsYWNlT2ZEaXNwbGF5IHtcbiAgbGV0IHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXk7XG5cbiAgc2V0dGluZ3MgPSBnZXRTZXR0aW5nc0Zyb21TeXNDb25maWcoc3ViZmllbGQsIHNwZWNpYWxGaWVsZHMsIHNldHRpbmdzKTtcblxuICAvLyBpZiB0aGlzIGlzIGEgc3BlY2lhbCBmaWVsZCwgY3JlYXRlIGNvcnJlc3BvbmRpbmcgZGlzcGxheSBzZXR0aW5ncyBhbmQgcmV0dXJuIGl0XG4gIGlmIChzZXR0aW5ncykge1xuICAgIGlmIChzZXR0aW5ncy5kaXNwbGF5SW5CYXNpY0ZpZWxkcykge1xuICAgICAgcmV0dXJuIHsgYmFzaWNGaWVsZHM6IHsgcG9zaXRpb246IHNldHRpbmdzLmRpc3BsYXlJbkJhc2ljRmllbGRzLnBvc2l0aW9uIH0gfVxuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MuaGlkZGVuKSB7XG4gICAgICByZXR1cm4geyBoaWRkZW46IHRydWUgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG90aGVyd2lzZSBkaXNwbGF5IHRoZSBmaWVsZCBpbiBzcGVjaWZpYyBmaWVsZHMgKGRlZmF1bHQpXG4gIGxldCBwb3NpdGlvbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgaWYgKHByb2plY3RGaWVsZENvbmZpZykgcG9zaXRpb24gPSBwcm9qZWN0RmllbGRDb25maWcub3JkX251bVxuICByZXR1cm4geyBzcGVjaWZpY0ZpZWxkczogeyBwb3NpdGlvbiB9IH1cblxufVxuZnVuY3Rpb24gZ2V0U2V0dGluZ3NGcm9tU3lzQ29uZmlnKFxuICBzdWJmaWVsZDogU3ViZmllbGQsIHNwZWNpYWxGaWVsZHM6IFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXkpIHtcbiAgaWYgKHN1YmZpZWxkLmlzT3V0Z29pbmcpIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgaGFzLXR5cGUtc3VicHJvcGVydHlcbiAgICBpZiAoc3ViZmllbGQuaXNIYXNUeXBlRmllbGQgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaGFzVHlwZVN1YnByb3BlcnRpZXMpIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5oYXNUeXBlU3VicHJvcGVydGllcztcbiAgICB9XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IHNvdXJjZSBjbGFzcyBhbmQgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgc291cmNlIGNsYXNzIGFuZCBwcm9wZXJ0eVxuICAgIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2V0dGluZ3M7XG59XG5cblxuXG5cblxuXG4vKipcbiAqIFBpcGVzIHRoZSBmaWVsZHMgZm9yIHRlbXBvcmFsIGVudGl0eSBmb3Jtc1xuICogLSB0aGUgc3BlY2lmaWMgZmllbGRzXG4gKiAtIHRoZSB3aGVuIGZpZWxkXG4gKiAtIGlmIGF2YWlsYWJsZTogdGhlIHR5cGUgZmllbGRcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkRGVmaW5pdGlvbnNGb3JUZUVuRm9ybShwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vICAgcmV0dXJuIG9mKFtdKVxuLy8gY29uc3QgaGFzVHlwZUxpc3REZWYkID0gdGhpcy5waXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3MpXG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZERlZmluaXRpb25zKHBrQ2xhc3MpXG4vLyAgICAgLnBpcGUoXG4vLyAgICAgICBtYXAoZmllbGRzID0+IGZpZWxkcy5maWx0ZXIoZiA9PiBmLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlKSlcbi8vICAgICApXG4vLyAgICxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gKS5waXBlKFxuLy8gICBtYXAoKFtmaWVsZHMsIGhhc1R5cGVMaXN0RGVmc10pID0+IHtcbi8vICAgICBjb25zdCB3aGVuID0gdGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTilcbi8vICAgICByZXR1cm4gW1xuLy8gICAgICAgLi4uZmllbGRzLFxuLy8gICAgICAgd2hlbixcbi8vICAgICAgIC4uLmhhc1R5cGVMaXN0RGVmcy5tYXAoKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgICAgICByZXR1cm4gdHlwZUZpZWxkO1xuLy8gICAgICAgfSlcbi8vICAgICBdXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLyoqXG4gKiBQaXBlIHRoZSBzcGVjaWZpYyBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNwZWNpZmljRmllbGREZWZpbml0aW9ucyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCB0cnVlKS5waXBlKFxuLy8gICAgIC8vIGZpbHRlciBvdXQgdGhlICdoYXMgdHlwZScgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKG91dGdvaW5nID0+IG91dGdvaW5nLmZpbHRlcihvID0+ICFvLmlzX2hhc190eXBlX3N1YnByb3BlcnR5KSlcbi8vICAgKSxcbi8vICAgdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgZmFsc2UpLnBpcGUoXG4vLyAgICAgLy8gZmlsdGVyIG91dCB0aGUgJ2hhcyBhcHBlbGxhdGlvbicgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKGluZ29pbmcgPT4gaW5nb2luZy5maWx0ZXIoaSA9PlxuLy8gICAgICAgaS5wa19wcm9wZXJ0eSAhPT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GXG4vLyAgICAgICAmJiBpLnBrX3Byb3BlcnR5ICE9PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfR0VPVlAxX0lTX1JFUFJPRFVDVElPTl9PRlxuLy8gICAgICkpXG4vLyAgICksXG4vLyAgIHRoaXMucGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzKVxuLy8gKS5waXBlKFxuLy8gICBzd2l0Y2hNYXAoKFtvdXRnb2luZywgaW5nb2luZywgZmllbGRDb25maWdzXSkgPT4ge1xuXG4vLyAgICAgY29uc3Qga2V5ID0gKGZjOiBQYXJ0aWFsPFByb0NsYXNzRmllbGRDb25maWc+KSA9PiBgJHtmYy5ma19wcm9wZXJ0eX1fJHtmYy5ma19kb21haW5fY2xhc3N9XyR7ZmMuZmtfcmFuZ2VfY2xhc3N9YDtcbi8vICAgICBjb25zdCBpbmRleGVkID0gaW5kZXhCeSgoZmMpID0+IGAke2ZjLmZrX3Byb3BlcnR5fV8ke2ZjLmZrX2RvbWFpbl9jbGFzc31fJHtmYy5ma19yYW5nZV9jbGFzc31gLCBmaWVsZENvbmZpZ3MpXG4vLyAgICAgY29uc3QgZ2V0RmllbGRDb25maWcgPSAobGlzdERlZjogU3ViZmllbGQpOiBQcm9DbGFzc0ZpZWxkQ29uZmlnID0+IHtcbi8vICAgICAgIHJldHVybiBpbmRleGVkW2tleSh7XG4vLyAgICAgICAgIGZrX3Byb3BlcnR5OiBsaXN0RGVmLnByb3BlcnR5LnBrUHJvcGVydHksXG4vLyAgICAgICAgIGZrX2RvbWFpbl9jbGFzczogbGlzdERlZi5pc091dGdvaW5nID8gbGlzdERlZi5zb3VyY2VDbGFzcyA6IG51bGwsXG4vLyAgICAgICAgIGZrX3JhbmdlX2NsYXNzOiBsaXN0RGVmLmlzT3V0Z29pbmcgPyBudWxsIDogbGlzdERlZi5zb3VyY2VDbGFzcyxcbi8vICAgICAgIH0pXVxuLy8gICAgIH1cblxuLy8gICAgIC8vIENyZWF0ZSBsaXN0IGRlZmluaXRpb25zXG4vLyAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoaW5nb2luZywgZmFsc2UpLFxuLy8gICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKG91dGdvaW5nLCB0cnVlKVxuLy8gICAgICkucGlwZShcbi8vICAgICAgIG1hcCgoW2luZ29pbmdMaXN0RGVmcywgb3V0Z29pbmdMaXN0RGVmc10pID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZmluaXRpb25zID0gWy4uLmluZ29pbmdMaXN0RGVmcywgLi4ub3V0Z29pbmdMaXN0RGVmc107XG5cbi8vICAgICAgICAgLy8gQ3JlYXRlIGZpZWxkIGRlZmluaXRpb25zXG4vLyAgICAgICAgIGNvbnN0IGZpZWxkRGVmczogeyBba2V5OiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbi8vICAgICAgICAgbGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZiA9PiB7XG5cbi8vICAgICAgICAgICBjb25zdCBrID0gbGlzdERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5ICsgJ18nICsgbGlzdERlZi5pc091dGdvaW5nO1xuXG4vLyAgICAgICAgICAgaWYgKCFmaWVsZERlZnNba10pIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXSA9IHtcbi8vICAgICAgICAgICAgICAgLi4ubGlzdERlZixcbi8vICAgICAgICAgICAgICAgcGxhY2VPZkRpc3BsYXk6IHt9LFxuLy8gICAgICAgICAgICAgICBhbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgZmllbGRDb25maWc6IGdldEZpZWxkQ29uZmlnKGxpc3REZWYpLFxuLy8gICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbnM6IFtsaXN0RGVmXSxcbi8vICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW2xpc3REZWYudGFyZ2V0Q2xhc3NdXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXS5saXN0RGVmaW5pdGlvbnMucHVzaChsaXN0RGVmKVxuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdLnRhcmdldENsYXNzZXMucHVzaChsaXN0RGVmLnRhcmdldENsYXNzKVxuLy8gICAgICAgICAgIH1cblxuLy8gICAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICB9KVxuLy8gICAgICAgICAvLyBPcmRlciB0aGUgZmllbGRzIGFjY29yZGluZyB0byBvcmRfbnVtIChmcm9tIHByb2plY3QncyBjb25maWcsIGtsZWlvbGFiJ3MgY29uZmlnKSBvciBwdXQgaXQgYXQgZW5kIG9mIGxpc3QuXG4vLyAgICAgICAgIHJldHVybiBzb3J0KFxuLy8gICAgICAgICAgIChhLCBiKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zdCBnZXRPcmROdW0gPSAoaXRlbTogRmllbGQpID0+IHtcbi8vICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5maWVsZENvbmZpZykgcmV0dXJuIGl0ZW0uZmllbGRDb25maWcub3JkX251bTtcbi8vICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGNvbnN0IG9yZE51bUEgPSBnZXRPcmROdW0oYSk7XG4vLyAgICAgICAgICAgICBjb25zdCBvcmROdW1CID0gZ2V0T3JkTnVtKGIpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIG9yZE51bUEgLSBvcmROdW1CO1xuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgdmFsdWVzKGZpZWxkRGVmcykpXG4vLyAgICAgICB9KVxuLy8gICAgIClcbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vKipcbiAqIFBpcGUgdGhlIGZpZWxkcyBmb3IgaWRlbnRpZmljYXRpb24gb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZURlZmF1bHRGaWVsZERlZmluaXRpb25zKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG5cbi8vIC8qKlxuLy8gICogUGlwZSB0aGUgZ2VuZXJpYyBmaWVsZCBoYXMgYXBwZWxsYXRpb25cbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eVN0YXR1cyA9IHtcbi8vICAgaGFzX2RvbWFpbjogRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSxcbi8vICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRixcbi8vICAgaGFzX3JhbmdlOiBwa0NsYXNzLFxuLy8gICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbi8vICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMCxcbi8vICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuLy8gICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4vLyAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnaGlzdFA5Jyxcbi8vICAgaWRlbnRpdHlfZGVmaW5pbmc6IHRydWUsXG4vLyAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbi8vICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuLy8gICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgcHJvZmlsZXM6IFtdXG4vLyB9XG4vLyBjb25zdCBoYXNBcHBlTGlzdERlZiQgPSB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoW2hhc0FwcGVQcm9wXSwgZmFsc2UpLnBpcGUoXG4vLyAgIGZpbHRlcihsaXN0RGVmcyA9PiAhIWxpc3REZWZzICYmICEhbGlzdERlZnNbMF0pLFxuLy8gICBtYXAobGlzdERlZnMgPT4gbGlzdERlZnNbMF0pXG4vLyApO1xuXG4vLyAvKipcbi8vICAqIFBpcGUgdGhlIGdlbmVyaWMgZmllbGQgaGFzIHR5cGVcbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc1R5cGVMaXN0RGVmJCA9IHRoaXMucGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzKVxuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIGhhc0FwcGVMaXN0RGVmJCxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKGZpbHRlcihjID0+ICEhYykpXG4vLyApLnBpcGUoXG4vLyAgIG1hcCgoW2hhc0FwcGVMaXN0RGVmLCBoYXNUeXBlTGlzdERlZnMsIGtsYXNzXSkgPT4ge1xuLy8gICAgIGNvbnN0IGZpZWxkczogRmllbGRbXSA9IFtdXG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gICogQWRkICdzaG9ydCB0aXRsZScgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICAqXG4vLyAgICAgLy8gICogTWFuaWZlc3RhdGlvbiBQcm9kdWN0IFR5cGUg4oCTIEYzLCAyMTlcbi8vICAgICAvLyAgKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICAqIEl0ZW0g4oCTIEY1LCAyMjFcbi8vICAgICAvLyAgKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAgKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1RdLmluY2x1ZGVzKHBrQ2xhc3MpKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9TSE9SVF9USVRMRSkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhcyBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RQOScgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgY2xhc3NlcyBleGNlcHQgJ0FwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdEMxMCcsIDM2NVxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbi8vICAgICAvLyAgIGNvbnN0IGFwcGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc0FwcGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNBcHBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgZmllbGRzLnB1c2goYXBwZUZpZWxkKTtcbi8vICAgICAvLyB9XG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhc1R5cGUnIGZpZWxkc1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKGhhc1R5cGVMaXN0RGVmcyAmJiBoYXNUeXBlTGlzdERlZnMubGVuZ3RoID4gMCkge1xuLy8gICAgIC8vICAgaGFzVHlwZUxpc3REZWZzLmZvckVhY2goKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgLy8gICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgICBmaWVsZHMucHVzaCh0eXBlRmllbGQpO1xuLy8gICAgIC8vICAgfSlcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdlbnRpdHkgZGVmaW5pdGlvbicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCBjbGFzc2VzIGV4Y2VwdCAnQXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0QzEwJywgMzY1XG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT04pKTtcbi8vICAgICAvLyB9XG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaWRlbnRpZmllciAvIGV4YWN0IHJlZmVyZW5jZSAvIHVybCAvIC4uLicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVCA9PT0gcGtDbGFzcykge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnY29tbWVudCcgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIE1hbmlmZXN0YXRpb24gUHJvZHVjdCBUeXBlIOKAkyBGMywgMjE5XG4vLyAgICAgLy8gKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICogSXRlbSDigJMgRjUsIDIyMVxuLy8gICAgIC8vICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gKiBFeHByZXNzaW9uIHBvcnRpb24g4oCTIGdlb3ZDNSwgNTAzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1QsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfRVhQUkVTU0lPTl9QT1JUSU9OXS5pbmNsdWRlcyhwa0NsYXNzKSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ3RpbWUtc3BhbicgZmllbGQgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgdGVtcG9yYWwgZW50aXR5IGNsYXNzZXNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgcmV0dXJuIGZpZWxkc1xuXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLy8gcHJpdmF0ZSBwaXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3M6IG51bWJlcikge1xuLy8gICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgdHJ1ZSkucGlwZShcbi8vICAgICAvLyBjaGVjayBpZiB0aGlzIGNsYXNzIGhhcyAnaGFzIHR5cGUnIHN1YnByb3BlcnR5XG4vLyAgICAgbWFwKG91dGdvaW5nID0+IHtcbi8vICAgICAgIHJldHVybiBvdXRnb2luZy5maWx0ZXIoKHByb3ApID0+IHByb3AuaXNfaGFzX3R5cGVfc3VicHJvcGVydHkpO1xuLy8gICAgIH0pLCBzd2l0Y2hNYXAoaGFzVHlwZVByb3BzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KGhhc1R5cGVQcm9wcy5tYXAoZGZoUHJvcCA9PiB7XG4vLyAgICAgICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFtkZmhQcm9wXSwgdHJ1ZSkucGlwZShmaWx0ZXIobGlzdERlZnMgPT4gISFsaXN0RGVmcyAmJiAhIWxpc3REZWZzWzBdKSwgbWFwKGxpc3REZWZzID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZiA9IGxpc3REZWZzWzBdO1xuLy8gICAgICAgICBsaXN0RGVmLmxpc3RUeXBlID0geyB0eXBlSXRlbTogJ3RydWUnIH07XG4vLyAgICAgICAgIHJldHVybiBsaXN0RGVmO1xuLy8gICAgICAgfSkpO1xuLy8gICAgIH0pKSkpO1xuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkU3ViZmllbGQocGtDbGFzc0ZpZWxkOiBudW1iZXIpOiBTdWJmaWVsZCB7XG4vLyAgIGNvbnN0IHRlbXBsYXRlID0ge1xuLy8gICAgIHByb3BlcnR5OiB7fSxcbi8vICAgICBzb3VyY2VDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZUNsYXNzTGFiZWw6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIGlzT3V0Z29pbmc6IHVuZGVmaW5lZCxcbi8vICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiB1bmRlZmluZWQsXG4vLyAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldE1heFF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VNYXhRdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZU1pblF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2Vcbi8vICAgfVxuLy8gICBzd2l0Y2ggKHBrQ2xhc3NGaWVsZCkge1xuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU46XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6IHsgdGltZVNwYW46ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ1doZW4nLFxuLy8gICAgICAgICBpc091dGdvaW5nOiB0cnVlLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1A0Jyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvNCcsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAxXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT046XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnRGVzY3JpcHRpb24nLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQ6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnQ29tbWVudHMnLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0V4YWN0IFJlZmVyZW5jZScsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfU0hPUlRfVElUTEU6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnU2hvcnQgVGl0bGUnLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGRlZmF1bHQ6XG4vLyAgICAgICBicmVhaztcbi8vICAgfVxuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihwa0NsYXNzRmllbGQ6IG51bWJlcik6IEZpZWxkIHtcbi8vICAgY29uc3QgbGlzdERlZiA9IHRoaXMuZ2V0Q2xhc3NGaWVsZFN1YmZpZWxkKHBrQ2xhc3NGaWVsZClcbi8vICAgcmV0dXJuIHsgLi4ubGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbbGlzdERlZl0gfVxuLy8gfVxuXG5cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWQoKSB7XG4vLyAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkJC5rZXkoJ3RydWUnKVxuLy8gICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4vLyB9XG5cblxuXG4vLyAvKipcbi8vICAqIFBpcGVzIGFsbCB0aGUgZW5hYmxlZCBwcm9wZXJ0aWVzIG9mIGEgY2xhc3Ncbi8vICAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8RGZoUHJvcGVydHlTdGF0dXNbXT4ge1xuXG5cbi8vICAgbGV0ICQ6IE9ic2VydmFibGU8QnlQazxEZmhQcm9wZXJ0eT4+XG4vLyAgIGlmIChpc091dGdvaW5nKSB7XG4vLyAgICAgJCA9IHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfZG9tYWluJC5rZXkocGtDbGFzcylcbi8vICAgfVxuLy8gICBlbHNlIHtcbi8vICAgICAkID0gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19yYW5nZSQua2V5KHBrQ2xhc3MpXG4vLyAgIH1cblxuLy8gICAvLyBmaWx0ZXIgcHJvcGVydGllcyB0aGF0IGFyZSBpbiBhdCBsZWFzdCBvbmUgcHJvZmlsZSBlbmFibGVkIGJ5IHByb2plY3Rcbi8vICAgY29uc3QgcHJvZmlsZXMkID0gdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcblxuXG4vLyAgIC8vIEZpbHRlciBvdXQgb25seSB0aGUgcHJvcGVydGllcyBmb3Igd2hpY2ggdGFyZ2V0IGNsYXNzIGlzIGFsbG93ZWRcbi8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoJCwgcHJvZmlsZXMkKVxuLy8gICAgIC5waXBlKFxuLy8gICAgICAgbWFwKChbcHJvcHMsIHByb2ZpbGVzXSkgPT4ge1xuLy8gICAgICAgICBjb25zdCBwOiBEZmhQcm9wZXJ0eVN0YXR1c1tdID0gW11cblxuLy8gICAgICAgICB2YWx1ZXMocHJvcHMpLmZvckVhY2gocHJvcCA9PiB7XG5cblxuLy8gICAgICAgICAgIGNvbnN0IHByb3BQcm9maWxlUmVsID0gcHJvcC5wcm9maWxlcyBhcyBQcm9maWxlc1xuXG4vLyAgICAgICAgICAgbGV0IGVuYWJsZWRJbkFQcm9maWxlID0gZmFsc2U7XG5cbi8vICAgICAgICAgICBsZXQgcmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHRydWU7XG5cbi8vICAgICAgICAgICBwcm9wUHJvZmlsZVJlbC5mb3JFYWNoKGl0ZW0gPT4ge1xuLy8gICAgICAgICAgICAgaWYgKHByb2ZpbGVzLmluY2x1ZGVzKGl0ZW0uZmtfcHJvZmlsZSkpIHtcbi8vICAgICAgICAgICAgICAgZW5hYmxlZEluQVByb2ZpbGUgPSB0cnVlO1xuLy8gICAgICAgICAgICAgICBpZiAoaXRlbS5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSkge1xuLy8gICAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBmYWxzZVxuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSlcblxuLy8gICAgICAgICAgIGlmIChlbmFibGVkSW5BUHJvZmlsZSkge1xuLy8gICAgICAgICAgICAgcC5wdXNoKHtcbi8vICAgICAgICAgICAgICAgLi4ucHJvcCxcbi8vICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pXG5cbi8vICAgICAgICAgcmV0dXJuIHBcbi8vICAgICAgIH0pXG4vLyAgICAgKVxuXG4vLyB9XG5cblxuLy8gLyoqXG4vLyAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuLy8gICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdFxuLy8gICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyBlbmFibGVkIGJ5IGNsYXNzX3Byb2pfcmVsXG4vLyAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIHJlcXVpcmVkIGJ5IHNvdXJjZXMgb3IgYnkgYmFzaWNzXG4vLyAgKlxuLy8gICogdGhpcyBpcyB1c2VmdWxsIHRvIGNoZWNrIGlmIGEgY2xhc3MgaXMgYXZhaWxhYmxlIGF0IGFsbFxuLy8gICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0luRW50aXRlc09yUmVxdWlyZWQoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4vLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNSZXF1aXJlZCgpXG4vLyAgICkucGlwZShcbi8vICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbi8vICAgICBzdGFydFdpdGgoe30pXG4vLyAgIClcbi8vIH1cbiJdfQ==