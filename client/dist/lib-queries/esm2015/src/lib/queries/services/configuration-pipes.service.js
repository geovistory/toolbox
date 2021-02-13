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
        enabled => [...enabled, DfhConfig.PK_PROFILE_GEOVISTORY_BASIC]))))));
    }
    /**
     * Pipe all fields of given class
     * The Fields are not ordered and not filtered
     * If you want specific subsets of Fields and/or ordered Fields, use the pipes
     * that build on this pipe.
     * @param {?} pkClass
     * @return {?}
     */
    pipeFields(pkClass) {
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
            // if class is not appellation for language, add appellation for language (1111) property
            if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
                ingoingProps.push(createAppellationProperty(pkClass));
            }
            // if is temporal entity, add has time span property
            if (sourceKlass.basic_type === 9) {
                outgoingProps.push(createHasTimeSpanProperty(pkClass));
            }
            outgoingProps.push(createHasDefinitionProperty(pkClass));
            return combineLatest(this.pipePropertiesToSubfields(outgoingProps, true, enabledProfiles, sysConfig), this.pipePropertiesToSubfields(ingoingProps, false, enabledProfiles, sysConfig), this.pipeFieldConfigs(pkClass)).pipe(map((/**
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
                            listDefinitions: [s],
                            fieldConfig,
                            placeOfDisplay: getPlaceOfDisplay(sysConfig.specialFields, s, fieldConfig),
                            isSpecialField
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
                return values(uniqFields);
            })));
        })));
    }
    /**
     * pipe all the specific fields of a class,
     * ordered by the position of the field within the specific fields
     * @param {?} pkClass
     * @return {?}
     */
    pipeSpecificFieldOfClass(pkClass) {
        return this.pipeFields(pkClass).pipe(map((/**
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
     * @return {?}
     */
    pipeBasicFieldsOfClass(pkClass) {
        return this.pipeFields(pkClass).pipe(map((/**
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
     * @return {?}
     */
    pipeFieldsForTeEnForm(pkClass) {
        return this.pipeFields(pkClass).pipe(
        // filter fields that are displayd in specific fields
        map((/**
         * @param {?} allFields
         * @return {?}
         */
        allFields => {
            /** @type {?} */
            const fields = allFields
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
     * @return {?}
     */
    pipeBasicAndSpecificFields(pkClass) {
        return combineLatest(this.pipeBasicFieldsOfClass(pkClass), this.pipeSpecificFieldOfClass(pkClass))
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
     * @return {?}
     */
    pipeSpecificAndBasicFields(pkClass) {
        return combineLatest(this.pipeSpecificFieldOfClass(pkClass), this.pipeBasicFieldsOfClass(pkClass))
            .pipe(map((/**
         * @param {?} __0
         * @return {?}
         */
        ([a, b]) => [...a, ...b])));
    }
    /**
     * @private
     * @param {?} properties
     * @param {?} isOutgoing
     * @param {?} enabledProfiles
     * @param {?} sysConfig
     * @return {?}
     */
    pipePropertiesToSubfields(properties, isOutgoing, enabledProfiles, sysConfig) {
        return combineLatestOrEmpty(properties.map((/**
         * @param {?} p
         * @return {?}
         */
        p => {
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
            return combineLatest(this.pipeClassLabel(sourceClass), this.pipeClassLabel(targetClass), this.pipeSubfieldTypeOfClass(sysConfig, targetClass, targetMaxQuantity), this.pipeFieldLabel(p.pk_property, isOutgoing ? p.has_domain : null, isOutgoing ? null : p.has_range)).pipe(map((/**
             * @param {?} __0
             * @return {?}
             */
            ([sourceClassLabel, targetClassLabel, listType, label]) => {
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
    }
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
    pipeSubfieldTypeOfClass(config, pkClass, targetMaxQuantity) {
        return this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(filter((/**
         * @param {?} i
         * @return {?}
         */
        i => !!i)), map((/**
         * @param {?} klass
         * @return {?}
         */
        (klass) => getSubfieldType(config, klass, targetMaxQuantity))));
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
    let classConfig;
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
 * @param {?} rangeClass
 * @return {?}
 */
function createAppellationProperty(rangeClass) {
    /** @type {?} */
    const profiles = [
        {
            removed_from_api: false,
            fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
        }
    ];
    /** @type {?} */
    const hasAppeProp = {
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
        profiles
    };
    return hasAppeProp;
}
/**
 * @param {?} domainClass
 * @return {?}
 */
function createHasTimeSpanProperty(domainClass) {
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
        domain_instances_max_quantifier: 1,
        domain_instances_min_quantifier: 1,
        range_instances_max_quantifier: 1,
        range_instances_min_quantifier: 0,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFNaEUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7QUFNcEUsdUNBR0M7OztJQURDLG1EQUErQjs7QUFjakM7Ozs7Ozs7R0FPRztBQUNILE1BQU0sT0FBTyx5QkFBeUI7Ozs7O0lBRXBDLFlBQ1UsQ0FBNEIsRUFDNUIsQ0FBeUI7UUFEekIsTUFBQyxHQUFELENBQUMsQ0FBMkI7UUFDNUIsTUFBQyxHQUFELENB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QyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEcsUUFBUSxHQUFHLGFBQWEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDL0c7UUFDRCwyQkFBMkI7YUFDdEIsSUFBSSxhQUFhLENBQUMsa0JBQWtCO1lBQ3ZDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2hFLFFBQVEsR0FBRyxhQUFhLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMzRTtLQUNGO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGZoQ29uZmlnLCBQcm9Db25maWcsIFN5c0NvbmZpZyB9IGZyb20gJ0BrbGVpb2xhYi9saWItY29uZmlnJztcbmltcG9ydCB7IGRmaExhYmVsQnlGa3NLZXksIHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5LCB0ZXh0UHJvcGVydHlCeUZrc0tleSB9IGZyb20gJ0BrbGVpb2xhYi9saWItcmVkdXgnO1xuaW1wb3J0IHsgQ2xhc3NDb25maWcsIERmaENsYXNzLCBEZmhMYWJlbCwgRGZoUHJvcGVydHksIEluZkxhbmd1YWdlLCBQcm9DbGFzc0ZpZWxkQ29uZmlnLCBQcm9UZXh0UHJvcGVydHksIFJlbGF0ZWRQcm9maWxlLCBTeXNDb25maWdGaWVsZERpc3BsYXksIFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIFN5c0NvbmZpZ1ZhbHVlIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1zZGstbGI0JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3RPckVtcHR5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi11dGlscyc7XG5pbXBvcnQgeyBmbGF0dGVuLCBpbmRleEJ5LCB1bmlxLCB2YWx1ZXMgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWNoZSwgc3B5VGFnIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBGaWVsZCwgfSBmcm9tICcuLi9tb2RlbHMvRmllbGQnXG5pbXBvcnQgeyBGaWVsZFBsYWNlT2ZEaXNwbGF5IH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkUG9zaXRpb24nXG5pbXBvcnQgeyBTcGVjaWFsRmllbGRUeXBlIH0gZnJvbSAnLi4vbW9kZWxzL1NwZWNpYWxGaWVsZFR5cGUnXG5pbXBvcnQgeyBTdWJmaWVsZCB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZCdcbmltcG9ydCB7IFN1YmZpZWxkVHlwZSB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZFR5cGUnXG5pbXBvcnQgeyBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlIH0gZnJvbSAnLi9hY3RpdmUtcHJvamVjdC1waXBlcy5zZXJ2aWNlJztcbmltcG9ydCB7IFNjaGVtYVNlbGVjdG9yc1NlcnZpY2UgfSBmcm9tICcuL3NjaGVtYS1zZWxlY3RvcnMuc2VydmljZSc7XG5cblxuLy8gdGhpcyBpcyB0aGVcbmV4cG9ydCB0eXBlIFRhYmxlTmFtZSA9ICdhcHBlbGxhdGlvbicgfCAnbGFuZ3VhZ2UnIHwgJ3BsYWNlJyB8ICd0aW1lX3ByaW1pdGl2ZScgfCAnbGFuZ19zdHJpbmcnIHwgJ2RpbWVuc2lvbicgfCAncGVyc2lzdGVudF9pdGVtJyB8ICd0ZW1wb3JhbF9lbnRpdHknXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGZoUHJvcGVydHlTdGF0dXMgZXh0ZW5kcyBEZmhQcm9wZXJ0eSB7XG4gIC8vIHRydWUsIGlmIHJlbW92ZWQgZnJvbSBhbGwgcHJvZmlsZXMgb2YgdGhlIGN1cnJlbnQgcHJvamVjdFxuICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBib29sZWFuXG59XG5cbnR5cGUgTGFiZWxPcmlnaW4gPSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHwgJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJyB8ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCdcbnR5cGUgUHJvZmlsZXMgPSB7XG4gIGZrX3Byb2ZpbGU6IG51bWJlcjtcbiAgcmVtb3ZlZF9mcm9tX2FwaTogYm9vbGVhbjtcbn1bXTtcblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcblxuLyoqXG4gKiBUaGlzIFNlcnZpY2UgcHJvdmlkZXMgYSBjb2xsZWN0aW9uIG9mIHBpcGVzIHRoYXQgYWdncmVnYXRlIG9yIHRyYW5zZm9ybSBjb25maWd1cmF0aW9uIGRhdGEuXG4gKiBXaGVuIHRhbGtpbmcgYWJvdXQgY29uZmlndXJhdGlvbiwgd2UgbWVhbiB0aGUgY29uY2VwdHVhbCByZWZlcmVuY2UgbW9kZWwgYW5kIHRoZSBhZGRpdGlvbmFsXG4gKiBjb25maWd1cmF0aW9ucyBvbiBzeXN0ZW0gYW5kIHByb2plY3QgbGV2ZWwuXG4gKiBGb3IgRXhhbXBsZVxuICogLSB0aGUgZmllbGRzIG9mIGEgY2xhc3NcbiAqIC0gdGhlIGxhYmVscyBvZiBjbGFzc2VzIGFuZCBwcm9wZXJ0aWVzXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uUGlwZXNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGE6IEFjdGl2ZVByb2plY3RQaXBlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSBzOiBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlLFxuICApIHsgfVxuXG5cbiAgLyoqXG4gICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19wcm9maWxlXG4gICogb2YgYWxsIHByb2ZpbGVzIHRoYXQgYXJlIGVuYWJsZWQgYnkgdGhlIGdpdmVuIHByb2plY3QuXG4gICogVGhlIGFycmF5IHdpbGwgYWx3YXlzIGluY2x1ZGUgUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX3Byb2ZpbGVfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWQkXG4gICAgICAgIC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJykucGlwZShcbiAgICAgICAgICBtYXAocHJvamVjdFByb2ZpbGVSZWxzID0+IHZhbHVlcyhwcm9qZWN0UHJvZmlsZVJlbHMpXG4gICAgICAgICAgICAuZmlsdGVyKHJlbCA9PiByZWwuZW5hYmxlZClcbiAgICAgICAgICAgIC5tYXAocmVsID0+IHJlbC5ma19wcm9maWxlKVxuICAgICAgICAgICksXG4gICAgICAgICAgbWFwKGVuYWJsZWQgPT4gWy4uLmVuYWJsZWQsIERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNdKSxcbiAgICAgICAgKSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogUGlwZSBhbGwgZmllbGRzIG9mIGdpdmVuIGNsYXNzXG4gICAqIFRoZSBGaWVsZHMgYXJlIG5vdCBvcmRlcmVkIGFuZCBub3QgZmlsdGVyZWRcbiAgICogSWYgeW91IHdhbnQgc3BlY2lmaWMgc3Vic2V0cyBvZiBGaWVsZHMgYW5kL29yIG9yZGVyZWQgRmllbGRzLCB1c2UgdGhlIHBpcGVzXG4gICAqIHRoYXQgYnVpbGQgb24gdGhpcyBwaXBlLlxuICAgKi9cbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlRmllbGRzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAvLyBwaXBlIHNvdXJjZSBjbGFzc1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcyksXG4gICAgICAvLyBwaXBlIG91dGdvaW5nIHByb3BlcnRpZXNcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfZG9tYWluJC5rZXkocGtDbGFzcykucGlwZShtYXAoaW5kZXhlZCA9PiB2YWx1ZXMoaW5kZXhlZCkpKSxcbiAgICAgIC8vIHBpcGUgaW5nb2luZyBwcm9wZXJ0aWVzXG4gICAgICB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX3JhbmdlJC5rZXkocGtDbGFzcykucGlwZShtYXAoaW5kZXhlZCA9PiB2YWx1ZXMoaW5kZXhlZCkpKSxcbiAgICAgIC8vIHBpcGUgc3lzIGNvbmZpZ1xuICAgICAgdGhpcy5zLnN5cyQuY29uZmlnJC5tYWluJC5waXBlKGZpbHRlcih4ID0+ICEheCkpLFxuICAgICAgLy8gcGlwZSBlbmFibGVkIHByb2ZpbGVzXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKSxcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtzb3VyY2VLbGFzcywgb3V0Z29pbmdQcm9wcywgaW5nb2luZ1Byb3BzLCBzeXNDb25maWcsIGVuYWJsZWRQcm9maWxlc10pID0+IHtcblxuICAgICAgICAvLyBpZiBjbGFzcyBpcyBub3QgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlLCBhZGQgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlICgxMTExKSBwcm9wZXJ0eVxuICAgICAgICBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuICAgICAgICAgIGluZ29pbmdQcm9wcy5wdXNoKGNyZWF0ZUFwcGVsbGF0aW9uUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgaXMgdGVtcG9yYWwgZW50aXR5LCBhZGQgaGFzIHRpbWUgc3BhbiBwcm9wZXJ0eVxuICAgICAgICBpZiAoc291cmNlS2xhc3MuYmFzaWNfdHlwZSA9PT0gOSkge1xuICAgICAgICAgIG91dGdvaW5nUHJvcHMucHVzaChjcmVhdGVIYXNUaW1lU3BhblByb3BlcnR5KHBrQ2xhc3MpKVxuICAgICAgICB9XG5cbiAgICAgICAgb3V0Z29pbmdQcm9wcy5wdXNoKGNyZWF0ZUhhc0RlZmluaXRpb25Qcm9wZXJ0eShwa0NsYXNzKSlcblxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMob3V0Z29pbmdQcm9wcywgdHJ1ZSwgZW5hYmxlZFByb2ZpbGVzLCBzeXNDb25maWcpLFxuICAgICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhpbmdvaW5nUHJvcHMsIGZhbHNlLCBlbmFibGVkUHJvZmlsZXMsIHN5c0NvbmZpZyksXG4gICAgICAgICAgdGhpcy5waXBlRmllbGRDb25maWdzKHBrQ2xhc3MpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoKFtzdWJmaWVsZHMxLCBzdWJmaWVsZHMyLCBmaWVsZENvbmZpZ3NdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWJmaWVsZHMgPSBbLi4uc3ViZmllbGRzMSwgLi4uc3ViZmllbGRzMl1cblxuICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWdJZHggPSBpbmRleEJ5KCh4KSA9PiBbXG4gICAgICAgICAgICAgICh4LmZrX2RvbWFpbl9jbGFzcyB8fCB4LmZrX3JhbmdlX2NsYXNzKSxcbiAgICAgICAgICAgICAgeC5ma19wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgISF4LmZrX2RvbWFpbl9jbGFzc1xuICAgICAgICAgICAgXS5qb2luKCdfJyksIGZpZWxkQ29uZmlncylcblxuICAgICAgICAgICAgY29uc3QgdW5pcUZpZWxkczogeyBbdWlkOiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbiAgICAgICAgICAgIGNvbnN0IHVuaXFTdWJmaWVsZENhY2hlOiB7IFt1aWQ6IHN0cmluZ106IHRydWUgfSA9IHt9XG5cblxuICAgICAgICAgICAgLy8gZ3JvdXAgYnkgc291cmNlLCBwa1Byb3BlcnR5IGFuZCBpc091dGdvaW5nXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHMgb2Ygc3ViZmllbGRzKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpZWxkSWQgPSBbcy5zb3VyY2VDbGFzcywgcy5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBzLmlzT3V0Z29pbmddLmpvaW4oJ18nKVxuICAgICAgICAgICAgICBjb25zdCBzdWJmaWVsZElkID0gW3Muc291cmNlQ2xhc3MsIHMucHJvcGVydHkucGtQcm9wZXJ0eSwgcy5pc091dGdvaW5nLCBzLnRhcmdldENsYXNzXS5qb2luKCdfJylcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRDb25maWc6IFByb0NsYXNzRmllbGRDb25maWcgfCB1bmRlZmluZWQgPSBmaWVsZENvbmZpZ0lkeFtmaWVsZElkXTtcbiAgICAgICAgICAgICAgLy8gdGhlIGZpcnN0IHRpbWUgdGhlIGdyb3VwIGlzIGVzdGFibGlzaGVkXG4gICAgICAgICAgICAgIGlmICghdW5pcUZpZWxkc1tmaWVsZElkXSkge1xuICAgICAgICAgICAgICAgIGxldCBpc1NwZWNpYWxGaWVsZDogU3BlY2lhbEZpZWxkVHlwZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSGFzVHlwZUZpZWxkKSBpc1NwZWNpYWxGaWVsZCA9ICdoYXMtdHlwZSc7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTikgaXNTcGVjaWFsRmllbGQgPSAndGltZS1zcGFuJztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdID0ge1xuICAgICAgICAgICAgICAgICAgc291cmNlQ2xhc3M6IHMuc291cmNlQ2xhc3MsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsOiBzLnNvdXJjZUNsYXNzTGFiZWwsXG4gICAgICAgICAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eTogcy5zb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZU1pblF1YW50aXR5OiBzLnNvdXJjZU1pblF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHMudGFyZ2V0TWluUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogcy50YXJnZXRNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiBzLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgaXNIYXNUeXBlRmllbGQ6IHMuaXNIYXNUeXBlRmllbGQsXG4gICAgICAgICAgICAgICAgICBwcm9wZXJ0eTogcy5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGlzT3V0Z29pbmc6IHMuaXNPdXRnb2luZyxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZSxcbiAgICAgICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IHMuaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvTGFiZWw6IHMub250b0luZm9MYWJlbCxcbiAgICAgICAgICAgICAgICAgIG9udG9JbmZvVXJsOiBzLm9udG9JbmZvVXJsLFxuICAgICAgICAgICAgICAgICAgYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlczogcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzLFxuICAgICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW3MudGFyZ2V0Q2xhc3NdLFxuICAgICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb25zOiBbc10sXG4gICAgICAgICAgICAgICAgICBmaWVsZENvbmZpZyxcbiAgICAgICAgICAgICAgICAgIHBsYWNlT2ZEaXNwbGF5OiBnZXRQbGFjZU9mRGlzcGxheShzeXNDb25maWcuc3BlY2lhbEZpZWxkcywgcywgZmllbGRDb25maWcpLFxuICAgICAgICAgICAgICAgICAgaXNTcGVjaWFsRmllbGRcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBtYXJrIHN1YmZpZWxkIGFzIGFkZGVkXG4gICAgICAgICAgICAgICAgdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0gPSB0cnVlO1xuXG5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvLyBpZ25vcmUgZHVwbGljYXRpb25zIG9mIHN1YmZpZWxkc1xuICAgICAgICAgICAgICBlbHNlIGlmICghdW5pcVN1YmZpZWxkQ2FjaGVbc3ViZmllbGRJZF0pIHtcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlID9cbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IGZhbHNlIDpcbiAgICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHMucmVtb3ZlZEZyb21BbGxQcm9maWxlcztcbiAgICAgICAgICAgICAgICB1bmlxRmllbGRzW2ZpZWxkSWRdLnRhcmdldENsYXNzZXMucHVzaChzLnRhcmdldENsYXNzKVxuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0ubGlzdERlZmluaXRpb25zLnB1c2gocylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzKHVuaXFGaWVsZHMpXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cbiAgLyoqXG4gICAqIHBpcGUgYWxsIHRoZSBzcGVjaWZpYyBmaWVsZHMgb2YgYSBjbGFzcyxcbiAgICogb3JkZXJlZCBieSB0aGUgcG9zaXRpb24gb2YgdGhlIGZpZWxkIHdpdGhpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucGlwZUZpZWxkcyhwa0NsYXNzKS5waXBlKFxuICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHNcbiAgICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcylcbiAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbiAtIGIucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24pXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAgKiBwaXBlIGFsbCB0aGUgYmFzaWMgZmllbGRzIG9mIGEgY2xhc3MsXG4gICAgKiBvcmRlcmVkIGJ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBiYXNpYyBmaWVsZHNcbiAgICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwdWJsaWMgcGlwZUJhc2ljRmllbGRzT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoZmllbGRzID0+IGZpZWxkc1xuICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIGJhc2ljIGZpZWxkc1xuICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzKVxuICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgYmFzaWMgZmllbGRzXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzLnBvc2l0aW9uIC0gYi5wbGFjZU9mRGlzcGxheS5iYXNpY0ZpZWxkcy5wb3NpdGlvbilcbiAgICAgIClcbiAgICApXG4gIH1cblxuXG5cblxuICAvKipcbiAgICAgKiBQaXBlcyB0aGUgZmllbGRzIGZvciB0ZW1wb3JhbCBlbnRpdHkgZm9ybXNcbiAgICAgKiAtIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICAgKiAtIHRoZSB3aGVuIGZpZWxkXG4gICAgICogLSBpZiBhdmFpbGFibGU6IHRoZSB0eXBlIGZpZWxkXG4gICAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlRmllbGRzRm9yVGVFbkZvcm0ocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZUZpZWxkcyhwa0NsYXNzKS5waXBlKFxuICAgICAgLy8gZmlsdGVyIGZpZWxkcyB0aGF0IGFyZSBkaXNwbGF5ZCBpbiBzcGVjaWZpYyBmaWVsZHNcbiAgICAgIG1hcChhbGxGaWVsZHMgPT4ge1xuICAgICAgICBjb25zdCBmaWVsZHMgPSBhbGxGaWVsZHNcbiAgICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMpXG4gICAgICAgICAgLy8gc29ydCBmaWVsZHMgYnkgdGhlIHBvc2l0aW9uIGRlZmluZWQgaW4gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uIC0gYS5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbilcblxuICAgICAgICBjb25zdCB3aGVuRmllbGQgPSBhbGxGaWVsZHMuZmluZChmaWVsZCA9PiBmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5ID09PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTilcbiAgICAgICAgaWYgKHdoZW5GaWVsZCkgZmllbGRzLnB1c2god2hlbkZpZWxkKVxuXG4gICAgICAgIGNvbnN0IHR5cGVGaWVsZCA9IGFsbEZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLmlzSGFzVHlwZUZpZWxkKVxuICAgICAgICBpZiAodHlwZUZpZWxkKSBmaWVsZHMucHVzaCh0eXBlRmllbGQpXG5cbiAgICAgICAgcmV0dXJuIGZpZWxkcztcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG5cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgZmllbGRzIG9mIGdpdmVuIGNsYXNzIGluIHRoaXMgb3JkZXI6XG4gICAqIC0gYmFzaWMgZmllbGRzXG4gICAqIC0gc3BlY2lmaWMgZmllbGRzXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQmFzaWNBbmRTcGVjaWZpY0ZpZWxkcyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUJhc2ljRmllbGRzT2ZDbGFzcyhwa0NsYXNzKSxcbiAgICAgIHRoaXMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3MpXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuICAvKipcbiAgKiBQaXBlcyB0aGUgZmllbGRzIG9mIGdpdmVuIGNsYXNzIGluIHRoaXMgb3JkZXI6XG4gICogLSBzcGVjaWZpYyBmaWVsZHNcbiAgKiAtIGJhc2ljIGZpZWxkc1xuICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3BlY2lmaWNBbmRCYXNpY0ZpZWxkcyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZVNwZWNpZmljRmllbGRPZkNsYXNzKHBrQ2xhc3MpLFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MpLFxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKFthLCBiXSkgPT4gWy4uLmEsIC4uLmJdKVxuICAgICAgKVxuICB9XG5cblxuXG5cblxuXG5cblxuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHJpdmF0ZSBwaXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFxuICAgIHByb3BlcnRpZXM6IERmaFByb3BlcnR5W10sXG4gICAgaXNPdXRnb2luZzogYm9vbGVhbixcbiAgICBlbmFibGVkUHJvZmlsZXM6IG51bWJlcltdLFxuICAgIHN5c0NvbmZpZzogU3lzQ29uZmlnVmFsdWVcbiAgKTogT2JzZXJ2YWJsZTxTdWJmaWVsZFtdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3RPckVtcHR5KFxuICAgICAgcHJvcGVydGllcy5tYXAocCA9PiB7XG5cbiAgICAgICAgY29uc3QgbyA9IGlzT3V0Z29pbmc7XG4gICAgICAgIGNvbnN0IHRhcmdldENsYXNzID0gbyA/IHAuaGFzX3JhbmdlIDogcC5oYXNfZG9tYWluO1xuICAgICAgICBjb25zdCBzb3VyY2VDbGFzcyA9IG8gPyBwLmhhc19kb21haW4gOiBwLmhhc19yYW5nZTtcbiAgICAgICAgY29uc3QgdGFyZ2V0TWF4UXVhbnRpdHkgPSBvID9cbiAgICAgICAgICBwLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllciA6XG4gICAgICAgICAgcC5kb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZU1heFF1YW50aXR5ID0gbyA/XG4gICAgICAgICAgcC5kb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyIDpcbiAgICAgICAgICBwLnJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjtcblxuICAgICAgICBjb25zdCB0YXJnZXRNaW5RdWFudGl0eSA9IG8gP1xuICAgICAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyIDpcbiAgICAgICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI7XG5cbiAgICAgICAgY29uc3Qgc291cmNlTWluUXVhbnRpdHkgPSBvID9cbiAgICAgICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXIgOlxuICAgICAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyO1xuXG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucGlwZUNsYXNzTGFiZWwoc291cmNlQ2xhc3MpLFxuICAgICAgICAgIHRoaXMucGlwZUNsYXNzTGFiZWwodGFyZ2V0Q2xhc3MpLFxuICAgICAgICAgIHRoaXMucGlwZVN1YmZpZWxkVHlwZU9mQ2xhc3Moc3lzQ29uZmlnLCB0YXJnZXRDbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHkpLFxuICAgICAgICAgIHRoaXMucGlwZUZpZWxkTGFiZWwoXG4gICAgICAgICAgICBwLnBrX3Byb3BlcnR5LFxuICAgICAgICAgICAgaXNPdXRnb2luZyA/IHAuaGFzX2RvbWFpbiA6IG51bGwsXG4gICAgICAgICAgICBpc091dGdvaW5nID8gbnVsbCA6IHAuaGFzX3JhbmdlLFxuICAgICAgICAgIClcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcCgoW3NvdXJjZUNsYXNzTGFiZWwsIHRhcmdldENsYXNzTGFiZWwsIGxpc3RUeXBlLCBsYWJlbF0pID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgbm9kZTogU3ViZmllbGQgPSB7XG4gICAgICAgICAgICAgIGxpc3RUeXBlLFxuICAgICAgICAgICAgICBzb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgc291cmNlQ2xhc3NMYWJlbCxcbiAgICAgICAgICAgICAgc291cmNlTWF4UXVhbnRpdHksXG4gICAgICAgICAgICAgIHNvdXJjZU1pblF1YW50aXR5LFxuICAgICAgICAgICAgICB0YXJnZXRDbGFzcyxcbiAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NMYWJlbCxcbiAgICAgICAgICAgICAgdGFyZ2V0TWluUXVhbnRpdHksXG4gICAgICAgICAgICAgIHRhcmdldE1heFF1YW50aXR5LFxuICAgICAgICAgICAgICBsYWJlbCxcbiAgICAgICAgICAgICAgaXNIYXNUeXBlRmllbGQ6IG8gJiYgcC5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgcHJvcGVydHk6IHsgcGtQcm9wZXJ0eTogcC5wa19wcm9wZXJ0eSB9LFxuICAgICAgICAgICAgICBpc091dGdvaW5nOiBvLFxuICAgICAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiBvID8gcC5pZGVudGl0eV9kZWZpbmluZyA6IGZhbHNlLCAvLyByZXBsYWNlIGZhbHNlIHdpdGggcC5pZGVudGl0eV9kZWZpbmluZ19mb3JfcmFuZ2Ugd2hlbiBhdmFpbGFibGVcbiAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogbyA/IGZhbHNlIDogcC5pZGVudGl0eV9kZWZpbmluZywgLy8gcmVwbGFjZSBmYWxzZSB3aXRoIHAuaWRlbnRpdHlfZGVmaW5pbmdfZm9yX3JhbmdlIHdoZW4gYXZhaWxhYmxlXG4gICAgICAgICAgICAgIG9udG9JbmZvTGFiZWw6IHAuaWRlbnRpZmllcl9pbl9uYW1lc3BhY2UsXG4gICAgICAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LycgKyBwLnBrX3Byb3BlcnR5LFxuICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBpc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMoZW5hYmxlZFByb2ZpbGVzLCAocC5wcm9maWxlcyB8fCBbXSkpLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogUGlwZXMgdGhlIHR5cGUgb2YgU3ViZmllbGQgZm9yIGEgZ2l2ZW4gY2xhc3NcbiAgICogQ3VycmVudGx5ICh0byBiZSByZXZpc2VkIGlmIGdvb2QpIHN1YmxjYXNzZXMgb2YgRTU1IFR5cGUsXG4gICAqIHRoYXQgYXJlIHRoZSB0YXJnZXQgb2YgYSBmaWVsZCB3aXRoIHRhcmdldE1heFFhbnRpdHk9MSxcbiAgICogZ2V0IFN1YmZpZWxkIHR5cGUgJ2hhc1R5cGUnLlxuICAgKiBUaGVyZWZvcmUgdGFyZ2V0TWF4UXVhbnRpdHkgaXMgbmVlZGVkLlxuICAgKlxuICAgKiBUaGlzIGJlaGF2aW9yIGhhcyB0byBiZSByZXZpc2VkLCBiZWNhdXNlIGl0IGNhbiBsZWFkIHRvIHByb2JsZW1zXG4gICAqIHdoZW4gdGhlIFN1YmZpZWxkIGJlbG9uZ3MgdG8gYSBGaWVsZCB3aXRoIG11bHRpcGxlIHRhcmdldCBjbGFzc2VzXG4gICAqIChhbmQgdGh1cyBTdWJmaWVsZHMpIGJlY2F1c2UgdGhlIFVJIHRoZW4gZG9lcyBub3QgYWxsb3cgdG8gY2hvb3NlXG4gICAqIHRoZSByaWdodCB0YXJnZXQgY2xhc3MuXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlU3ViZmllbGRUeXBlT2ZDbGFzcyhjb25maWc6IFN5c0NvbmZpZ1ZhbHVlLCBwa0NsYXNzOiBudW1iZXIsIHRhcmdldE1heFF1YW50aXR5OiBudW1iZXIpOiBPYnNlcnZhYmxlPFN1YmZpZWxkVHlwZT4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKFxuICAgICAgZmlsdGVyKGkgPT4gISFpKSxcbiAgICAgIG1hcCgoa2xhc3MpID0+IGdldFN1YmZpZWxkVHlwZShjb25maWcsIGtsYXNzLCB0YXJnZXRNYXhRdWFudGl0eSkpXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogR2V0cyBjbGFzcyBmaWVsZCBjb25maWdzIG9mIGdpdmVuIHBrQ2xhc3NcbiAgICpcbiAgICogLSBvZiBhY3RpdmUgcHJvamVjdCwgaWYgYW55LCBlbHNlXG4gICAqIC0gb2YgZGVmYXVsdCBjb25maWcgcHJvamVjdCwgZWxzZVxuICAgKiAtIGVtcHR5IGFycmF5XG4gICAqXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGRDb25maWdzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8UHJvQ2xhc3NGaWVsZENvbmZpZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGZrUHJvamVjdCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVByb2plY3RrZXkgPSBwcm9DbGFzc0ZpZWxkQ29uZmdCeVByb2plY3RBbmRDbGFzc0tleSh7XG4gICAgICAgICAgZmtfY2xhc3NfZm9yX2NsYXNzX2ZpZWxkOiBwa0NsYXNzLFxuICAgICAgICAgIGZrX3Byb2plY3Q6IGZrUHJvamVjdFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdGtleSA9IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5KHtcbiAgICAgICAgICBma19jbGFzc19mb3JfY2xhc3NfZmllbGQ6IHBrQ2xhc3MsXG4gICAgICAgICAgZmtfcHJvamVjdDogUHJvQ29uZmlnLlBLX1BST0pFQ1RfT0ZfREVGQVVMVF9DT05GSUdfUFJPSkVDVFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB0aGlzLnMucHJvJC5jbGFzc19maWVsZF9jb25maWckLmJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJC5rZXkoYWN0aXZlUHJvamVjdGtleSksXG4gICAgICAgICAgdGhpcy5zLnBybyQuY2xhc3NfZmllbGRfY29uZmlnJC5ieV9ma19wcm9qZWN0X19ma19jbGFzcyQua2V5KGRlZmF1bHRQcm9qZWN0a2V5KVxuICAgICAgICApXG4gICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBtYXAoKFthY3RpdmVQcm9qZWN0RmllbGRzLCBkZWZhdWx0UHJvamVjdEZpZWxkc10pID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFjdGl2ZVByb2plY3RGaWVsZHMgJiYgdmFsdWVzKGFjdGl2ZVByb2plY3RGaWVsZHMpLmxlbmd0aCkgcmV0dXJuIGFjdGl2ZVByb2plY3RGaWVsZHM7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRQcm9qZWN0RmllbGRzXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG1hcCgoaXRlbXMpID0+IHZhbHVlcyhpdGVtcykuc29ydCgoYSwgYikgPT4gKGEub3JkX251bSA+IGIub3JkX251bSA/IDEgOiAtMSkpKSxcbiAgICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXG5cblxuICAvKipcbiAgICogRGVsaXZlcnMgY2xhc3MgbGFiZWwgZm9yIGFjdGl2ZSBwcm9qZWN0XG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3NMYWJlbChwa0NsYXNzPzogbnVtYmVyKTogT2JzZXJ2YWJsZTxzdHJpbmc+IHtcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5hLnBrUHJvamVjdCQsXG4gICAgICB0aGlzLmEucGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZmtQcm9qZWN0LCBsYW5ndWFnZV0pID0+IHRoaXMucGlwZUxhYmVscyh7IHBrQ2xhc3MsIGZrUHJvamVjdCwgbGFuZ3VhZ2UsIHR5cGU6ICdsYWJlbCcgfSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGl0ZW1zID0+IHtcblxuICAgICAgICAgICAgY29uc3QgaSA9IGl0ZW1zLmZpbmQoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgICByZXR1cm4gaSA/IGkudGV4dCA6IGAqIG5vIGxhYmVsIChpZDogJHtwa0NsYXNzfSkgKmBcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgIClcbiAgfVxuXG5cbiAgLyoqXG4gICAqIERlbGl2ZXJzIGFycmF5IG9mIG9iamVjdHMgd2l0aFxuICAgKiB0ZXh0IH4gdGhlIHRleHQgb2YgdGhlIHByb3BlcnR5XG4gICAqIG9yaWdpbiwgaW4gdGhpcyBvcmRlcjpcbiAgICogLSBvcmlnaW4gPT0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyAgICAgICAgIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnICAgICAgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnICAgICAgICAgIChmcm9tIGRhdGFfZm9yX2hpc3RvcnkubGFiZWwpXG4gICAqIC0gb3JpZ2luID09ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCcgICAgICAgICAgICAgICAoZnJvbSBkYXRhX2Zvcl9oaXN0b3J5LmxhYmVsKVxuICAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUxhYmVscyhkOiB7XG4gICAgZmtQcm9qZWN0OiBudW1iZXIsXG4gICAgdHlwZTogJ2xhYmVsJyB8ICdkZWZpbml0aW9uJyB8ICdzY29wZU5vdGUnLFxuICAgIGxhbmd1YWdlOiBJbmZMYW5ndWFnZSxcbiAgICBwa0NsYXNzPzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eURvbWFpbj86IG51bWJlcixcbiAgICBma1Byb3BlcnR5UmFuZ2U/OiBudW1iZXIsXG4gIH0pOiBPYnNlcnZhYmxlPHtcbiAgICBvcmlnaW46IExhYmVsT3JpZ2luXG4gICAgdGV4dDogc3RyaW5nXG4gIH1bXT4ge1xuICAgIGxldCBma19zeXN0ZW1fdHlwZTogbnVtYmVyO1xuXG4gICAgaWYgKGQucGtDbGFzcykge1xuICAgICAgc3dpdGNoIChkLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGFiZWwnOlxuICAgICAgICAgIGZrX3N5c3RlbV90eXBlID0gU3lzQ29uZmlnLlBLX1NZU1RFTV9UWVBFX19URVhUX1BST1BFUlRZX19MQUJFTFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGNvbnNvbGUud2FybignZmtfc3lzdGVtX3R5cGUgbm90IGZvdW5kJylcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoZC5ma1Byb3BlcnR5KSB7XG4gICAgICBzd2l0Y2ggKGQudHlwZSkge1xuICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgZmtfc3lzdGVtX3R5cGUgPSBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdma19zeXN0ZW1fdHlwZSBub3QgZm91bmQnKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAvLyBsYWJlbCBvZiBwcm9qZWN0IGluIGRlZmF1bHQgbGFuZ3VhZ2Ugb2YgcHJvamVjdFxuICAgICAgdGhpcy5waXBlUHJvVGV4dFByb3BlcnR5KHtcbiAgICAgICAgZmtfcHJvamVjdDogZC5ma1Byb2plY3QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiBkLmxhbmd1YWdlLnBrX2VudGl0eSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgb2YgZGVmYXVsdCBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNULFxuICAgICAgICBma19sYW5ndWFnZTogZC5sYW5ndWFnZS5wa19lbnRpdHksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgb2YgZGVmYXVsdCBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNULFxuICAgICAgICBma19sYW5ndWFnZTogMTg4ODksXG4gICAgICAgIGZrX3N5c3RlbV90eXBlLFxuICAgICAgICBma19kZmhfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5OiBkLmZrUHJvcGVydHksXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW46IGQuZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlOiBkLmZrUHJvcGVydHlSYW5nZVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJztcbiAgICAgICAgcmV0dXJuIHsgb3JpZ2luLCB0ZXh0OiBpdGVtLnN0cmluZyB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIGZyb20gb250b21lIGluIGRlZmF1bHQgbGFuZ3VhZ2Ugb2YgcHJvamVjdFxuICAgICAgdGhpcy5waXBlRGZoTGFiZWwoe1xuICAgICAgICBsYW5ndWFnZTogZC5sYW5ndWFnZS5pc282MzkxLnRyaW0oKSxcbiAgICAgICAgdHlwZTogJ2xhYmVsJyxcbiAgICAgICAgZmtfY2xhc3M6IGQucGtDbGFzcyxcbiAgICAgICAgZmtfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eVxuICAgICAgfSkucGlwZShtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgaWYgKCFpdGVtKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBvcmlnaW46IExhYmVsT3JpZ2luID0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0ubGFiZWwgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBmcm9tIG9udG9tZSBpbiBlbmdsaXNoXG4gICAgICB0aGlzLnBpcGVEZmhMYWJlbCh7XG4gICAgICAgIGxhbmd1YWdlOiAnZW4nLFxuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBma19jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19wcm9wZXJ0eTogZC5ma1Byb3BlcnR5XG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2Ygb250b21lIGluIGVuZ2xpc2gnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0ubGFiZWwgfVxuICAgICAgfSkpLFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlcyBQcm9UZXh0UHJvcGVydHlcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9UZXh0UHJvcGVydHkoZDoge1xuICAgIGZrX3Byb2plY3Q6IG51bWJlcixcbiAgICBma19zeXN0ZW1fdHlwZTogbnVtYmVyLFxuICAgIGZrX2xhbmd1YWdlOiBudW1iZXIsXG4gICAgZmtfZGZoX2NsYXNzPzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eT86IG51bWJlcixcbiAgICBma19kZmhfcHJvcGVydHlfZG9tYWluPzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZT86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8UHJvVGV4dFByb3BlcnR5PiB7XG4gICAgY29uc3Qga2V5ID0gdGV4dFByb3BlcnR5QnlGa3NLZXkoZClcbiAgICByZXR1cm4gdGhpcy5zLnBybyQudGV4dF9wcm9wZXJ0eSQuYnlfZmtzJC5rZXkoa2V5KVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIERmaExhYmVsXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRGZoTGFiZWwoZDoge1xuICAgIHR5cGU6ICdsYWJlbCcgfCAnZGVmaW5pdGlvbicgfCAnc2NvcGVOb3RlJyxcbiAgICBsYW5ndWFnZTogc3RyaW5nLFxuICAgIGZrX2NsYXNzPzogbnVtYmVyLFxuICAgIGZrX3Byb2ZpbGU/OiBudW1iZXIsXG4gICAgZmtfcHJvcGVydHk/OiBudW1iZXIsXG4gICAgZmtfcHJvamVjdD86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8RGZoTGFiZWw+IHtcbiAgICBjb25zdCBrZXkgPSBkZmhMYWJlbEJ5RmtzS2V5KGQpXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLmxhYmVsJC5ieV9ma3MkLmtleShrZXkpXG4gIH1cblxuICAvKipcbiAgICogRGVsaXZlcnMgYmVzdCBmaXR0aW5nIGZpZWxkIGxhYmVsIGZvciBhY3RpdmUgcHJvamVjdFxuICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlRmllbGRMYWJlbChma1Byb3BlcnR5OiBudW1iZXIsIGZrUHJvcGVydHlEb21haW46IG51bWJlciwgZmtQcm9wZXJ0eVJhbmdlOiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuICAgIGNvbnN0IGlzT3V0Z29pbmcgPSAhIWZrUHJvcGVydHlEb21haW47XG4gICAgLy8gY29uc3Qgc3lzdGVtX3R5cGUgPSBpc091dGdvaW5nID8gKHNpbmd1bGFyID8gMTgwIDogMTgxKSA6IChzaW5ndWxhciA/IDE4MiA6IDE4MylcblxuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5hLnBrUHJvamVjdCQsXG4gICAgICB0aGlzLmEucGlwZUFjdGl2ZURlZmF1bHRMYW5ndWFnZSgpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChbZmtQcm9qZWN0LCBsYW5ndWFnZV0pID0+IHRoaXMucGlwZUxhYmVscyhcbiAgICAgICAge1xuICAgICAgICAgIGZrUHJvamVjdCxcbiAgICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICAgIGxhbmd1YWdlLFxuICAgICAgICAgIGZrUHJvcGVydHksXG4gICAgICAgICAgZmtQcm9wZXJ0eURvbWFpbixcbiAgICAgICAgICBma1Byb3BlcnR5UmFuZ2VcbiAgICAgICAgfVxuICAgICAgKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuICAgICAgICAgICAgbGV0IGxhYmVsID0gYCogbm8gbGFiZWwgKGlkOiAke2ZrUHJvcGVydHl9KSAqYDtcbiAgICAgICAgICAgIGl0ZW1zLnNvbWUoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGl0ZW0gJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaXRlbS50ZXh0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICBpdGVtICYmXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBvbnRvbWUgaW4gcHJvamVjdCBsYW5nJyB8fFxuICAgICAgICAgICAgICAgICAgaXRlbS5vcmlnaW4gPT09ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gaXNPdXRnb2luZyA/IGl0ZW0udGV4dCA6ICcqIHJldmVyc2Ugb2Y6ICcgKyBpdGVtLnRleHQgKyAnKidcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGxhYmVsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICApXG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIG1hcHMgdGhlIGNsYXNzIHRvIHRoZSBjb3JyZXNwb25kaW5nIG1vZGVsIChkYXRhYmFzZSB0YWJsZSlcbiAgICogdGhpcyBpcyB1c2VkIGJ5IEZvcm1zIHRvIGNyZWF0ZSBuZXcgZGF0YSBpbiB0aGUgc2hhcGUgb2ZcbiAgICogdGhlIGRhdGEgbW9kZWxcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUYWJsZU5hbWVPZkNsYXNzKHRhcmdldENsYXNzUGs6IG51bWJlcik6IE9ic2VydmFibGU8VGFibGVOYW1lPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLFxuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkodGFyZ2V0Q2xhc3NQaylcbiAgICApLnBpcGUoXG4gICAgICBmaWx0ZXIoaSA9PiAhaS5pbmNsdWRlcyh1bmRlZmluZWQpKSxcbiAgICAgIG1hcCgoW2NvbmZpZywga2xhc3NdKSA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZyA9IGNvbmZpZy5jbGFzc2VzW3RhcmdldENsYXNzUGtdO1xuICAgICAgICBpZiAoY2xhc3NDb25maWcgJiYgY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKSB7XG5cbiAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlKVxuICAgICAgICAgIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuYXBwZWxsYXRpb24pIHJldHVyblxuICAgICAgICAgIGNvbnN0IGtleSA9IGtleXNbMF07XG4gICAgICAgICAgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuICdhcHBlbGxhdGlvbic7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmxhbmd1YWdlKSByZXR1cm4gJ2xhbmd1YWdlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUucGxhY2UpIHJldHVybiAncGxhY2UnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS50aW1lUHJpbWl0aXZlKSByZXR1cm4gJ3RpbWVfcHJpbWl0aXZlJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUubGFuZ1N0cmluZykgcmV0dXJuICdsYW5nX3N0cmluZyc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmRpbWVuc2lvbikgcmV0dXJuICdkaW1lbnNpb24nO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCd1bnN1cHBvcnRlZCBsaXN0IHR5cGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA4IHx8IGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwKSB7XG4gICAgICAgICAgcmV0dXJuICdwZXJzaXN0ZW50X2l0ZW0nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICd0ZW1wb3JhbF9lbnRpdHknXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIENsYXNzZXNcbiAgICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdDpcbiAgICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyBlbmFibGVkIGJ5IGNsYXNzX3Byb2pfcmVsXG4gICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgcmVxdWlyZWQgYnkgc291cmNlc1xuICAgKlxuICAgKiBUaGlzIGlzIHVzZWZ1bGwgdG8gY3JlYXRlIHNlbGVjdCBkcm9wZG93bnMgb2YgY2xhc3NlcyB1c2VycyB3aWxsIGtub3dcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzSW5FbnRpdGllc09yU291cmNlcygpOiBPYnNlcnZhYmxlPHsgW2tleTogc3RyaW5nXTogbnVtYmVyIH0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuICAgICAgdGhpcy5waXBlQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbiAgICAgIHN0YXJ0V2l0aCh7fSlcbiAgICApXG4gIH1cblxuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKCkge1xuICAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkX2J5X3NvdXJjZXMkLmtleSgndHJ1ZScpXG4gICAgICAucGlwZShtYXAoYyA9PiB2YWx1ZXMoYykubWFwKGsgPT4gay5ma19jbGFzcykpKVxuICB9XG5cbiAgLyoqXG4gICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgICogb2YgYWxsIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhdCBsZWFzdCBvbmUgb2YgdGhlIGFjdGl2YXRlZCBwcm9maWxlc1xuICAgKiBvZiB0aHRlIGdpdmVuIHByb2plY3RcbiAgICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzRW5hYmxlZEJ5UHJvamVjdFByb2ZpbGVzKCk6IE9ic2VydmFibGU8RGZoQ2xhc3NbXT4ge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmFsbCQsXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtjbGFzc2VzQnlQaywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlc01hcCA9IGluZGV4QnkoKGspID0+IGsudG9TdHJpbmcoKSwgdmFsdWVzKGVuYWJsZWRQcm9maWxlcykpXG4gICAgICAgIHJldHVybiB2YWx1ZXMoY2xhc3Nlc0J5UGspXG4gICAgICAgICAgLmZpbHRlcihrbGFzcyA9PiBrbGFzcy5wcm9maWxlcy5zb21lKHByb2ZpbGUgPT4gcHJvZmlsZXNNYXBbcHJvZmlsZS5ma19wcm9maWxlXSkpXG4gICAgICB9KVxuICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAqIG9mIGFsbCB0eXBlIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhdCBsZWFzdCBvbmUgb2YgdGhlIGFjdGl2YXRlZCBwcm9maWxlc1xuICAqIG9mIHRodGUgZ2l2ZW4gcHJvamVjdFxuICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUNsYXNzZXNFbmFibGVkQnlQcm9qZWN0UHJvZmlsZXMoKTogT2JzZXJ2YWJsZTxEZmhDbGFzc1tdPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X2Jhc2ljX3R5cGUkLmtleSgzMCksXG4gICAgICB0aGlzLnBpcGVQcm9maWxlc0VuYWJsZWRCeVByb2plY3QoKVxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtjbGFzc2VzQnlQaywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9maWxlc01hcCA9IGluZGV4QnkoKGspID0+IGsudG9TdHJpbmcoKSwgdmFsdWVzKGVuYWJsZWRQcm9maWxlcykpXG4gICAgICAgIHJldHVybiB2YWx1ZXMoY2xhc3Nlc0J5UGspXG4gICAgICAgICAgLmZpbHRlcihrbGFzcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2xhc3MucHJvZmlsZXMuc29tZShwcm9maWxlID0+IHByb2ZpbGVzTWFwW3Byb2ZpbGUuZmtfcHJvZmlsZV0pICYmXG4gICAgICAgICAgICAgIC8vIEV4Y2x1ZGUgTWFuaWZlc3RhdGlvbiBwcm9kdWN0IHR5cGUgYW5kIGxhbmd1YWdlXG4gICAgICAgICAgICAgICFbXG4gICAgICAgICAgICAgICAgRGZoQ29uZmlnLkNMQVNTX1BLX0xBTkdVQUdFLFxuICAgICAgICAgICAgICAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRVxuICAgICAgICAgICAgICBdLmluY2x1ZGVzKGtsYXNzLnBrX2NsYXNzKVxuICAgICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXJlIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfY2xhc3NcbiAgICogb2YgYWxsIGNsYXNzZXMgdGhhdCBhcmUgZW5hYmxlZCBieSBhY3RpdmUgcHJvamVjdCAodXNpbmcgY2xhc3NfcHJval9yZWwpXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCkge1xuICAgIHJldHVybiB0aGlzLmEucGtQcm9qZWN0JC5waXBlKHN3aXRjaE1hcChwa1Byb2plY3QgPT4gdGhpcy5zLnBybyQuZGZoX2NsYXNzX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJC5rZXkocGtQcm9qZWN0ICsgJ190cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoKHJlbHMpID0+IHZhbHVlcyhyZWxzKS5tYXAocmVsID0+IHJlbC5ma19jbGFzcykpXG4gICAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAqIHJldHVybnMgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXlzIGFyZSB0aGUgcGtzIG9mIHRoZSBUZUVuIENsYXNzZXNcbiAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0XG4gICovXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTZWxlY3RlZFRlRW5DbGFzc2VzSW5Qcm9qZWN0KCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlVGVFbkNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuICAgICAgdGhpcy5waXBlVGVFbkNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpXG4gICAgKS5waXBlKFxuICAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4gICAgICBzdGFydFdpdGgoe30pXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYXJyYXkgb2YgcGtfY2xhc3Mgd2l0aCB0ZUVuIGNsYXNzZXMgZW5hYmxlZCBpbiBlbnRpdGllc1xuICAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRlRW5DbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfY2xhc3NfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkLmtleShwa1Byb2plY3QgKyAnX3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoY3MpID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdmFsdWVzKGNzKS5tYXAoYyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShjLmZrX2NsYXNzKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoZGZoQ2xhc3NlcyA9PiB0aGlzLmZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlcykpXG4gICAgICAgICkpXG4gICAgICApXG4gICAgKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBGaWx0ZXJzIGFycmF5IG9mIERmaENsYXNzIGZvciBUZUVuIENsYXNzZXMgYW5kIHJldHVybnMgYXJyYXkgb2YgcGtfY2xhc3NcbiAgICogQHBhcmFtIGRmaENsYXNzZXMgYXJyYXkgb2YgRGZoQ2xhc3NcbiAgICogQHJldHVybnMgcmV0dXJucyBhcnJheSBvZiBwa19jbGFzcyB3aGVyZSBjbGFzcyBpcyBUZUVuIGNsYXNzXG4gICAqL1xuICBwcml2YXRlIGZpbHRlclRlRW5DYXNzZXMoZGZoQ2xhc3NlczogRGZoQ2xhc3NbXSk6IG51bWJlcltdIHtcbiAgICBjb25zdCBwa3M6IG51bWJlcltdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZmhDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gZGZoQ2xhc3Nlc1tpXTtcbiAgICAgIGlmIChjLmJhc2ljX3R5cGUgPT09IDkpIHBrcy5wdXNoKGMucGtfY2xhc3MpO1xuICAgIH1cbiAgICByZXR1cm4gcGtzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYXJyYXkgb2YgcGtfY2xhc3Mgd2l0aCB0ZUVuIGNsYXNzZXMgcmVxdWlyZWQgYnkgc291cmNlc1xuICAgKi9cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRlRW5DbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJylcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGNzKSA9PiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHZhbHVlcyhjcykubWFwKGMgPT4gdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkoYy5ma19jbGFzcykucGlwZShcbiAgICAgICAgICAgIGZpbHRlcihpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICApKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKGRmaENsYXNzZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzKVxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgICApXG4gIH1cblxuXG5cblxuXG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUFuZFR5cGVkQ2xhc3NlcyhlbmFibGVkSW4/OiAnZW50aXRpZXMnIHwgJ3NvdXJjZXMnKTogT2JzZXJ2YWJsZTx7IHR5cGVkQ2xhc3M6IG51bWJlciwgdHlwZUNsYXNzOiBudW1iZXIgfVtdPiB7XG5cbiAgICBsZXQgcGtzJDogT2JzZXJ2YWJsZTxudW1iZXJbXT5bXTtcblxuICAgIGNvbnN0IGZyb21Tb3VyY2VzJCA9IHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcChjbGFzc2VzID0+IHZhbHVlcyhjbGFzc2VzKS5tYXAoayA9PiBrLmZrX2NsYXNzKSksXG4gICAgKVxuXG4gICAgY29uc3QgZnJvbUVudGl0aWVzJCA9IHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpXG5cbiAgICBpZiAoZW5hYmxlZEluID09PSAnc291cmNlcycpIHtcbiAgICAgIHBrcyQgPSBbZnJvbVNvdXJjZXMkXTtcbiAgICB9IGVsc2UgaWYgKGVuYWJsZWRJbiA9PT0gJ2VudGl0aWVzJykge1xuICAgICAgcGtzJCA9IFtmcm9tRW50aXRpZXMkXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGtzJCA9IFtmcm9tU291cmNlcyQsIGZyb21FbnRpdGllcyRdXG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QocGtzJCkucGlwZShcbiAgICAgIG1hcChhcnJheU9mUGtBcnJheXMgPT4gdW5pcShmbGF0dGVuPG51bWJlcj4oYXJyYXlPZlBrQXJyYXlzKSkpLFxuICAgICAgc3dpdGNoTWFwKHBrcyA9PiB0aGlzLnBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMocGtzKSlcbiAgICApXG4gIH1cblxuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZUFuZFR5cGVkQ2xhc3Nlc09mVHlwZWRDbGFzc2VzKHBrVHlwZWRDbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8eyB0eXBlZENsYXNzOiBudW1iZXIsIHR5cGVDbGFzczogbnVtYmVyIH1bXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX2RvbWFpbi50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBwa1R5cGVkQ2xhc3Nlcy5tYXAocGsgPT4gKHtcbiAgICAgICAgICB0eXBlZENsYXNzOiBwayxcbiAgICAgICAgICB0eXBlQ2xhc3M6IGJ5RG9tYWluW3BrXSA/IGJ5RG9tYWluW3BrXS5oYXNfcmFuZ2UgOiB1bmRlZmluZWRcbiAgICAgICAgfSkpXG4gICAgICB9KSlcbiAgfVxuXG4gIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQ2xhc3NPZlR5cGVkQ2xhc3MocGtUeXBlZENsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfZG9tYWluLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIGJ5RG9tYWluW3BrVHlwZWRDbGFzc10gPyBieURvbWFpbltwa1R5cGVkQ2xhc3NdLmhhc19yYW5nZSA6IHVuZGVmaW5lZFxuICAgICAgfSkpXG4gIH1cblxuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZWRDbGFzc2VzT2ZUeXBlQ2xhc3Nlcyhwa1R5cGVDbGFzc2VzOiBudW1iZXJbXSk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcblxuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19yYW5nZS50b1N0cmluZygpLCB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKSk7XG4gICAgICAgIHJldHVybiBwa1R5cGVDbGFzc2VzLm1hcChwayA9PiBieURvbWFpbltwa10gPyBieURvbWFpbltwa10uaGFzX2RvbWFpbiA6IHVuZGVmaW5lZClcbiAgICAgIH0pKVxuICB9XG5cblxuICBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVHlwZVByb3BlcnR5T2ZUeXBlZENsYXNzKHBrVHlwZWRDbGFzcyk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IHR5cGVQcm9wID0gdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykuZmluZChwID0+IHAuaGFzX2RvbWFpbiA9PT0gcGtUeXBlZENsYXNzKVxuICAgICAgICByZXR1cm4gdHlwZVByb3AgPyB0eXBlUHJvcC5wa19wcm9wZXJ0eSA6IHVuZGVmaW5lZDtcbiAgICAgIH0pKVxuICB9XG5cbiAgQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRhcmdldENsYXNzZXNPZlByb3BlcnRpZXMocGtQcm9wZXJ0aWVzOiBudW1iZXJbXSwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X3BrX3Byb3BlcnR5JC5hbGwkLnBpcGUoXG4gICAgICBtYXAoeCA9PiB7XG4gICAgICAgIGlmICghcGtQcm9wZXJ0aWVzIHx8ICFwa1Byb3BlcnRpZXMubGVuZ3RoKSByZXR1cm4gW107XG5cbiAgICAgICAgY29uc3QgcmVzID0gW11cbiAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3NlcyA9IHt9O1xuICAgICAgICBwa1Byb3BlcnRpZXMuZm9yRWFjaChwa1Byb3AgPT4ge1xuICAgICAgICAgIGNvbnN0IHByb3BzID0gdmFsdWVzKHhbcGtQcm9wXSk7XG4gICAgICAgICAgcHJvcHMuZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldENsYXNzID0gaXNPdXRnb2luZyA/IHByb3AuaGFzX3JhbmdlIDogcHJvcC5oYXNfZG9tYWluO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXRDbGFzc2VzW3RhcmdldENsYXNzXSkge1xuICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzW3RhcmdldENsYXNzXSA9IHRydWU7XG4gICAgICAgICAgICAgIHJlcy5wdXNoKHRhcmdldENsYXNzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGdldFN1YmZpZWxkVHlwZShjb25maWc6IFN5c0NvbmZpZ1ZhbHVlLCBrbGFzczogRGZoQ2xhc3MsIHRhcmdldE1heFF1YW50aXR5OiBudW1iZXIpOiBTdWJmaWVsZFR5cGUge1xuXG4gIGxldCBjbGFzc0NvbmZpZzogQ2xhc3NDb25maWdcbiAgaWYgKGNvbmZpZykgY2xhc3NDb25maWcgPSBjb25maWcuY2xhc3Nlc1trbGFzcy5wa19jbGFzc107XG4gIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcbiAgICByZXR1cm4gY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlXG4gIH1cblxuICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSAzMCAmJiB0YXJnZXRNYXhRdWFudGl0eSA9PSAxKSB7XG4gICAgcmV0dXJuIHsgdHlwZUl0ZW06ICd0cnVlJyB9XG4gIH1cbiAgZWxzZSBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOCB8fCBrbGFzcy5iYXNpY190eXBlID09PSAzMCkge1xuICAgIHJldHVybiB7IGVudGl0eVByZXZpZXc6ICd0cnVlJyB9XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuIHsgdGVtcG9yYWxFbnRpdHk6ICd0cnVlJyB9XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVIYXNEZWZpbml0aW9uUHJvcGVydHkoZG9tYWluQ2xhc3M6IG51bWJlcikge1xuICBjb25zdCBwcm9maWxlczogUHJvZmlsZXMgPSBbXG4gICAge1xuICAgICAgcmVtb3ZlZF9mcm9tX2FwaTogZmFsc2UsXG4gICAgICBma19wcm9maWxlOiBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICAgfVxuICBdXG5cbiAgY29uc3QgaGFzRGVmaW5pdGlvbjogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogZG9tYWluQ2xhc3MsXG4gICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19QMThfSEFTX0RFRklOSVRJT04sXG4gICAgaGFzX3JhbmdlOiA3ODUsXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnUDE4JyxcbiAgICBpZGVudGl0eV9kZWZpbmluZzogZmFsc2UsXG4gICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuICAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbiAgICBwcm9maWxlc1xuICB9XG4gIHJldHVybiBoYXNEZWZpbml0aW9uXG59XG5cblxuZnVuY3Rpb24gY3JlYXRlQXBwZWxsYXRpb25Qcm9wZXJ0eShyYW5nZUNsYXNzOiBudW1iZXIpIHtcbiAgY29uc3QgcHJvZmlsZXM6IFByb2ZpbGVzID0gW1xuICAgIHtcbiAgICAgIHJlbW92ZWRfZnJvbV9hcGk6IGZhbHNlLFxuICAgICAgZmtfcHJvZmlsZTogRGZoQ29uZmlnLlBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAgIH1cbiAgXVxuICBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHkgPSB7XG4gICAgaGFzX2RvbWFpbjogRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSxcbiAgICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GLFxuICAgIGhhc19yYW5nZTogcmFuZ2VDbGFzcyxcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAwLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdoaXN0UDknLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiB0cnVlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzQXBwZVByb3Bcbn1cblxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc1RpbWVTcGFuUHJvcGVydHkoZG9tYWluQ2xhc3M6IG51bWJlcikge1xuICBjb25zdCBwcm9maWxlczogUHJvZmlsZXMgPSBbXG4gICAge1xuICAgICAgcmVtb3ZlZF9mcm9tX2FwaTogZmFsc2UsXG4gICAgICBma19wcm9maWxlOiBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICAgfVxuICBdXG4gIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eSA9IHtcbiAgICBoYXNfZG9tYWluOiBkb21haW5DbGFzcyxcbiAgICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX0hBU19USU1FX1NQQU4sXG4gICAgaGFzX3JhbmdlOiBEZmhDb25maWcuQ2xBU1NfUEtfVElNRV9TUEFOLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IDEsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAwLFxuICAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnUDQnLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiBmYWxzZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0FwcGVQcm9wXG59XG5cblxuZnVuY3Rpb24gaXNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzKGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sIHByb2ZpbGVzOiBSZWxhdGVkUHJvZmlsZVtdKTogYm9vbGVhbiB7XG4gIHJldHVybiAhcHJvZmlsZXMuc29tZShwID0+IHAucmVtb3ZlZF9mcm9tX2FwaSA9PT0gZmFsc2UgJiYgZW5hYmxlZFByb2ZpbGVzLmluY2x1ZGVzKHAuZmtfcHJvZmlsZSkpXG5cbn1cblxuZnVuY3Rpb24gZ2V0UGxhY2VPZkRpc3BsYXkoc3BlY2lhbEZpZWxkczogU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgc3ViZmllbGQ6IFN1YmZpZWxkLCBwcm9qZWN0RmllbGRDb25maWc/OiBQcm9DbGFzc0ZpZWxkQ29uZmlnKTogRmllbGRQbGFjZU9mRGlzcGxheSB7XG4gIGxldCBzZXR0aW5nczogU3lzQ29uZmlnRmllbGREaXNwbGF5O1xuXG4gIHNldHRpbmdzID0gZ2V0U2V0dGluZ3NGcm9tU3lzQ29uZmlnKHN1YmZpZWxkLCBzcGVjaWFsRmllbGRzLCBzZXR0aW5ncyk7XG5cbiAgLy8gaWYgdGhpcyBpcyBhIHNwZWNpYWwgZmllbGQsIGNyZWF0ZSBjb3JyZXNwb25kaW5nIGRpc3BsYXkgc2V0dGluZ3MgYW5kIHJldHVybiBpdFxuICBpZiAoc2V0dGluZ3MpIHtcbiAgICBpZiAoc2V0dGluZ3MuZGlzcGxheUluQmFzaWNGaWVsZHMpIHtcbiAgICAgIHJldHVybiB7IGJhc2ljRmllbGRzOiB7IHBvc2l0aW9uOiBzZXR0aW5ncy5kaXNwbGF5SW5CYXNpY0ZpZWxkcy5wb3NpdGlvbiB9IH1cbiAgICB9IGVsc2UgaWYgKHNldHRpbmdzLmhpZGRlbikge1xuICAgICAgcmV0dXJuIHsgaGlkZGVuOiB0cnVlIH1cbiAgICB9XG4gIH1cblxuICAvLyBvdGhlcndpc2UgZGlzcGxheSB0aGUgZmllbGQgaW4gc3BlY2lmaWMgZmllbGRzIChkZWZhdWx0KVxuICBsZXQgcG9zaXRpb24gPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gIGlmIChwcm9qZWN0RmllbGRDb25maWcpIHBvc2l0aW9uID0gcHJvamVjdEZpZWxkQ29uZmlnLm9yZF9udW1cbiAgcmV0dXJuIHsgc3BlY2lmaWNGaWVsZHM6IHsgcG9zaXRpb24gfSB9XG5cbn1cbmZ1bmN0aW9uIGdldFNldHRpbmdzRnJvbVN5c0NvbmZpZyhcbiAgc3ViZmllbGQ6IFN1YmZpZWxkLCBzcGVjaWFsRmllbGRzOiBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBzZXR0aW5nczogU3lzQ29uZmlnRmllbGREaXNwbGF5KSB7XG4gIGlmIChzdWJmaWVsZC5pc091dGdvaW5nKSB7XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IGhhcy10eXBlLXN1YnByb3BlcnR5XG4gICAgaWYgKHN1YmZpZWxkLmlzSGFzVHlwZUZpZWxkICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmhhc1R5cGVTdWJwcm9wZXJ0aWVzKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuaGFzVHlwZVN1YnByb3BlcnRpZXM7XG4gICAgfVxuICAgIC8vIGdldCBzZXR0aW5ncyBieSBzb3VyY2UgY2xhc3MgYW5kIHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5vdXRnb2luZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIGdldCBzZWV0aW5ncyBieSBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IHNvdXJjZSBjbGFzcyBhbmQgcHJvcGVydHlcbiAgICBpZiAoc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllcyAmJlxuICAgICAgc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV0pIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5ieVNvdXJjZUNsYXNzW3N1YmZpZWxkLnNvdXJjZUNsYXNzXS5pbmNvbWluZ1Byb3BlcnRpZXNbc3ViZmllbGQucHJvcGVydHkucGtQcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIGdldCBzZWV0aW5ncyBieSBwcm9wZXJ0eVxuICAgIGVsc2UgaWYgKHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNldHRpbmdzO1xufVxuXG5cblxuXG5cblxuLyoqXG4gKiBQaXBlcyB0aGUgZmllbGRzIGZvciB0ZW1wb3JhbCBlbnRpdHkgZm9ybXNcbiAqIC0gdGhlIHNwZWNpZmljIGZpZWxkc1xuICogLSB0aGUgd2hlbiBmaWVsZFxuICogLSBpZiBhdmFpbGFibGU6IHRoZSB0eXBlIGZpZWxkXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZERlZmluaXRpb25zRm9yVGVFbkZvcm0ocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4vLyAgIHJldHVybiBvZihbXSlcbi8vIGNvbnN0IGhhc1R5cGVMaXN0RGVmJCA9IHRoaXMucGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzKVxuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIHRoaXMucGlwZVNwZWNpZmljRmllbGREZWZpbml0aW9ucyhwa0NsYXNzKVxuLy8gICAgIC5waXBlKFxuLy8gICAgICAgbWFwKGZpZWxkcyA9PiBmaWVsZHMuZmlsdGVyKGYgPT4gZi5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID09PSBmYWxzZSkpXG4vLyAgICAgKVxuLy8gICAsXG4vLyAgIGhhc1R5cGVMaXN0RGVmJCxcbi8vICkucGlwZShcbi8vICAgbWFwKChbZmllbGRzLCBoYXNUeXBlTGlzdERlZnNdKSA9PiB7XG4vLyAgICAgY29uc3Qgd2hlbiA9IHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU4pXG4vLyAgICAgcmV0dXJuIFtcbi8vICAgICAgIC4uLmZpZWxkcyxcbi8vICAgICAgIHdoZW4sXG4vLyAgICAgICAuLi5oYXNUeXBlTGlzdERlZnMubWFwKChoYXNUeXBlTGlzdERlZikgPT4ge1xuLy8gICAgICAgICBjb25zdCB0eXBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNUeXBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzVHlwZUxpc3REZWZdIH1cbi8vICAgICAgICAgcmV0dXJuIHR5cGVGaWVsZDtcbi8vICAgICAgIH0pXG4vLyAgICAgXVxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8qKlxuICogUGlwZSB0aGUgc3BlY2lmaWMgZmllbGRzIG9mIGdpdmVuIGNsYXNzXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTcGVjaWZpY0ZpZWxkRGVmaW5pdGlvbnMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgdHJ1ZSkucGlwZShcbi8vICAgICAvLyBmaWx0ZXIgb3V0IHRoZSAnaGFzIHR5cGUnIHByb3BlcnR5LCBzaW5jZSBpdCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IGZpZWxkc1xuLy8gICAgIG1hcChvdXRnb2luZyA9PiBvdXRnb2luZy5maWx0ZXIobyA9PiAhby5pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSkpXG4vLyAgICksXG4vLyAgIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIGZhbHNlKS5waXBlKFxuLy8gICAgIC8vIGZpbHRlciBvdXQgdGhlICdoYXMgYXBwZWxsYXRpb24nIHByb3BlcnR5LCBzaW5jZSBpdCBpcyBwYXJ0IG9mIHRoZSBkZWZhdWx0IGZpZWxkc1xuLy8gICAgIG1hcChpbmdvaW5nID0+IGluZ29pbmcuZmlsdGVyKGkgPT5cbi8vICAgICAgIGkucGtfcHJvcGVydHkgIT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRlxuLy8gICAgICAgJiYgaS5wa19wcm9wZXJ0eSAhPT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0dFT1ZQMV9JU19SRVBST0RVQ1RJT05fT0Zcbi8vICAgICApKVxuLy8gICApLFxuLy8gICB0aGlzLnBpcGVGaWVsZENvbmZpZ3MocGtDbGFzcylcbi8vICkucGlwZShcbi8vICAgc3dpdGNoTWFwKChbb3V0Z29pbmcsIGluZ29pbmcsIGZpZWxkQ29uZmlnc10pID0+IHtcblxuLy8gICAgIGNvbnN0IGtleSA9IChmYzogUGFydGlhbDxQcm9DbGFzc0ZpZWxkQ29uZmlnPikgPT4gYCR7ZmMuZmtfcHJvcGVydHl9XyR7ZmMuZmtfZG9tYWluX2NsYXNzfV8ke2ZjLmZrX3JhbmdlX2NsYXNzfWA7XG4vLyAgICAgY29uc3QgaW5kZXhlZCA9IGluZGV4QnkoKGZjKSA9PiBgJHtmYy5ma19wcm9wZXJ0eX1fJHtmYy5ma19kb21haW5fY2xhc3N9XyR7ZmMuZmtfcmFuZ2VfY2xhc3N9YCwgZmllbGRDb25maWdzKVxuLy8gICAgIGNvbnN0IGdldEZpZWxkQ29uZmlnID0gKGxpc3REZWY6IFN1YmZpZWxkKTogUHJvQ2xhc3NGaWVsZENvbmZpZyA9PiB7XG4vLyAgICAgICByZXR1cm4gaW5kZXhlZFtrZXkoe1xuLy8gICAgICAgICBma19wcm9wZXJ0eTogbGlzdERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5LFxuLy8gICAgICAgICBma19kb21haW5fY2xhc3M6IGxpc3REZWYuaXNPdXRnb2luZyA/IGxpc3REZWYuc291cmNlQ2xhc3MgOiBudWxsLFxuLy8gICAgICAgICBma19yYW5nZV9jbGFzczogbGlzdERlZi5pc091dGdvaW5nID8gbnVsbCA6IGxpc3REZWYuc291cmNlQ2xhc3MsXG4vLyAgICAgICB9KV1cbi8vICAgICB9XG5cbi8vICAgICAvLyBDcmVhdGUgbGlzdCBkZWZpbml0aW9uc1xuLy8gICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKGluZ29pbmcsIGZhbHNlKSxcbi8vICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRnb2luZywgdHJ1ZSlcbi8vICAgICApLnBpcGUoXG4vLyAgICAgICBtYXAoKFtpbmdvaW5nTGlzdERlZnMsIG91dGdvaW5nTGlzdERlZnNdKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IGxpc3REZWZpbml0aW9ucyA9IFsuLi5pbmdvaW5nTGlzdERlZnMsIC4uLm91dGdvaW5nTGlzdERlZnNdO1xuXG4vLyAgICAgICAgIC8vIENyZWF0ZSBmaWVsZCBkZWZpbml0aW9uc1xuLy8gICAgICAgICBjb25zdCBmaWVsZERlZnM6IHsgW2tleTogc3RyaW5nXTogRmllbGQgfSA9IHt9XG4vLyAgICAgICAgIGxpc3REZWZpbml0aW9ucy5mb3JFYWNoKGxpc3REZWYgPT4ge1xuXG4vLyAgICAgICAgICAgY29uc3QgayA9IGxpc3REZWYucHJvcGVydHkucGtQcm9wZXJ0eSArICdfJyArIGxpc3REZWYuaXNPdXRnb2luZztcblxuLy8gICAgICAgICAgIGlmICghZmllbGREZWZzW2tdKSB7XG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10gPSB7XG4vLyAgICAgICAgICAgICAgIC4uLmxpc3REZWYsXG4vLyAgICAgICAgICAgICAgIHBsYWNlT2ZEaXNwbGF5OiB7fSxcbi8vICAgICAgICAgICAgICAgYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2UsXG4vLyAgICAgICAgICAgICAgIGZpZWxkQ29uZmlnOiBnZXRGaWVsZENvbmZpZyhsaXN0RGVmKSxcbi8vICAgICAgICAgICAgICAgbGlzdERlZmluaXRpb25zOiBbbGlzdERlZl0sXG4vLyAgICAgICAgICAgICAgIHRhcmdldENsYXNzZXM6IFtsaXN0RGVmLnRhcmdldENsYXNzXVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBmaWVsZERlZnNba10ubGlzdERlZmluaXRpb25zLnB1c2gobGlzdERlZilcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXS50YXJnZXRDbGFzc2VzLnB1c2gobGlzdERlZi50YXJnZXRDbGFzcylcbi8vICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAvLyB9XG5cbi8vICAgICAgICAgfSlcbi8vICAgICAgICAgLy8gT3JkZXIgdGhlIGZpZWxkcyBhY2NvcmRpbmcgdG8gb3JkX251bSAoZnJvbSBwcm9qZWN0J3MgY29uZmlnLCBrbGVpb2xhYidzIGNvbmZpZykgb3IgcHV0IGl0IGF0IGVuZCBvZiBsaXN0LlxuLy8gICAgICAgICByZXR1cm4gc29ydChcbi8vICAgICAgICAgICAoYSwgYikgPT4ge1xuLy8gICAgICAgICAgICAgY29uc3QgZ2V0T3JkTnVtID0gKGl0ZW06IEZpZWxkKSA9PiB7XG4vLyAgICAgICAgICAgICAgIGlmIChpdGVtICYmIGl0ZW0uZmllbGRDb25maWcpIHJldHVybiBpdGVtLmZpZWxkQ29uZmlnLm9yZF9udW07XG4vLyAgICAgICAgICAgICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBjb25zdCBvcmROdW1BID0gZ2V0T3JkTnVtKGEpO1xuLy8gICAgICAgICAgICAgY29uc3Qgb3JkTnVtQiA9IGdldE9yZE51bShiKTtcbi8vICAgICAgICAgICAgIHJldHVybiBvcmROdW1BIC0gb3JkTnVtQjtcbi8vICAgICAgICAgICB9LFxuLy8gICAgICAgICAgIHZhbHVlcyhmaWVsZERlZnMpKVxuLy8gICAgICAgfSlcbi8vICAgICApXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLyoqXG4gKiBQaXBlIHRoZSBmaWVsZHMgZm9yIGlkZW50aWZpY2F0aW9uIG9mIGdpdmVuIGNsYXNzXG4gKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVEZWZhdWx0RmllbGREZWZpbml0aW9ucyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcblxuXG4vLyAvKipcbi8vICAqIFBpcGUgdGhlIGdlbmVyaWMgZmllbGQgaGFzIGFwcGVsbGF0aW9uXG4vLyAgKiB3aXRoIHRoZSBnaXZlbiBjbGFzcyBhcyByYW5nZVxuLy8gICovXG4vLyBjb25zdCBoYXNBcHBlUHJvcDogRGZoUHJvcGVydHlTdGF0dXMgPSB7XG4vLyAgIGhhc19kb21haW46IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UsXG4vLyAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSVNfQVBQRUxMQVRJT05fT0YsXG4vLyAgIGhhc19yYW5nZTogcGtDbGFzcyxcbi8vICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogLTEsXG4vLyAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDAsXG4vLyAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbi8vICAgcmFuZ2VfaW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuLy8gICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ2hpc3RQOScsXG4vLyAgIGlkZW50aXR5X2RlZmluaW5nOiB0cnVlLFxuLy8gICBpc19pbmhlcml0ZWQ6IHRydWUsXG4vLyAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbi8vICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2UsXG4vLyAgIHByb2ZpbGVzOiBbXVxuLy8gfVxuLy8gY29uc3QgaGFzQXBwZUxpc3REZWYkID0gdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFtoYXNBcHBlUHJvcF0sIGZhbHNlKS5waXBlKFxuLy8gICBmaWx0ZXIobGlzdERlZnMgPT4gISFsaXN0RGVmcyAmJiAhIWxpc3REZWZzWzBdKSxcbi8vICAgbWFwKGxpc3REZWZzID0+IGxpc3REZWZzWzBdKVxuLy8gKTtcblxuLy8gLyoqXG4vLyAgKiBQaXBlIHRoZSBnZW5lcmljIGZpZWxkIGhhcyB0eXBlXG4vLyAgKiB3aXRoIHRoZSBnaXZlbiBjbGFzcyBhcyByYW5nZVxuLy8gICovXG4vLyBjb25zdCBoYXNUeXBlTGlzdERlZiQgPSB0aGlzLnBpcGVIYXNUeXBlU3ViZmllbGQocGtDbGFzcylcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICBoYXNBcHBlTGlzdERlZiQsXG4vLyAgIGhhc1R5cGVMaXN0RGVmJCxcbi8vICAgdGhpcy5zLmRmaCQuY2xhc3MkLmJ5X3BrX2NsYXNzJC5rZXkocGtDbGFzcykucGlwZShmaWx0ZXIoYyA9PiAhIWMpKVxuLy8gKS5waXBlKFxuLy8gICBtYXAoKFtoYXNBcHBlTGlzdERlZiwgaGFzVHlwZUxpc3REZWZzLCBrbGFzc10pID0+IHtcbi8vICAgICBjb25zdCBmaWVsZHM6IEZpZWxkW10gPSBbXVxuXG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICAqIEFkZCAnc2hvcnQgdGl0bGUnIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAgKlxuLy8gICAgIC8vICAqIE1hbmlmZXN0YXRpb24gUHJvZHVjdCBUeXBlIOKAkyBGMywgMjE5XG4vLyAgICAgLy8gICogTWFuaWZlc3RhdGlvbiBTaW5nbGV0b24g4oCTIEY0LCAyMjBcbi8vICAgICAvLyAgKiBJdGVtIOKAkyBGNSwgMjIxXG4vLyAgICAgLy8gICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gICovXG4vLyAgICAgLy8gaWYgKFtcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1NJTkdMRVRPTixcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19JVEVNLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNUXS5pbmNsdWRlcyhwa0NsYXNzKSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfU0hPUlRfVElUTEUpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdoYXMgYXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0UDknIHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIGNsYXNzZXMgZXhjZXB0ICdBcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RDMTAnLCAzNjVcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4vLyAgICAgLy8gICBjb25zdCBhcHBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNBcHBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzQXBwZUxpc3REZWZdIH1cbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKGFwcGVGaWVsZCk7XG4vLyAgICAgLy8gfVxuXG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdoYXNUeXBlJyBmaWVsZHNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChoYXNUeXBlTGlzdERlZnMgJiYgaGFzVHlwZUxpc3REZWZzLmxlbmd0aCA+IDApIHtcbi8vICAgICAvLyAgIGhhc1R5cGVMaXN0RGVmcy5mb3JFYWNoKChoYXNUeXBlTGlzdERlZikgPT4ge1xuLy8gICAgIC8vICAgICBjb25zdCB0eXBlRmllbGQ6IEZpZWxkID0geyAuLi5oYXNUeXBlTGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbaGFzVHlwZUxpc3REZWZdIH1cbi8vICAgICAvLyAgICAgZmllbGRzLnB1c2godHlwZUZpZWxkKTtcbi8vICAgICAvLyAgIH0pXG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnZW50aXR5IGRlZmluaXRpb24nIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgY2xhc3NlcyBleGNlcHQgJ0FwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdEMxMCcsIDM2NVxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VOVElUWV9ERUZJTklUSU9OKSk7XG4vLyAgICAgLy8gfVxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2lkZW50aWZpZXIgLyBleGFjdCByZWZlcmVuY2UgLyB1cmwgLyAuLi4nIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1QgPT09IHBrQ2xhc3MpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VYQUNUX1JFRkVSRU5DRSkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2NvbW1lbnQnIHRleHQtcHJvcGVydHkgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBNYW5pZmVzdGF0aW9uIFByb2R1Y3QgVHlwZSDigJMgRjMsIDIxOVxuLy8gICAgIC8vICogTWFuaWZlc3RhdGlvbiBTaW5nbGV0b24g4oCTIEY0LCAyMjBcbi8vICAgICAvLyAqIEl0ZW0g4oCTIEY1LCAyMjFcbi8vICAgICAvLyAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICogRXhwcmVzc2lvbiBwb3J0aW9uIOKAkyBnZW92QzUsIDUwM1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKFtcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1BST0RVQ1RfVFlQRSxcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19NQU5JRkVTVEFUSU9OX1NJTkdMRVRPTixcbi8vICAgICAvLyAgIERmaENvbmZpZy5DTEFTU19QS19JVEVNLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX1dFQl9SRVFVRVNULFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0VYUFJFU1NJT05fUE9SVElPTl0uaW5jbHVkZXMocGtDbGFzcykpIHtcbi8vICAgICAvLyAgIGZpZWxkcy5wdXNoKHRoaXMuZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24oU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQpKTtcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICd0aW1lLXNwYW4nIGZpZWxkIHRvXG4vLyAgICAgLy8gKlxuLy8gICAgIC8vICogYWxsIHRlbXBvcmFsIGVudGl0eSBjbGFzc2VzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoa2xhc3MuYmFzaWNfdHlwZSA9PT0gOSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTikpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIHJldHVybiBmaWVsZHNcblxuLy8gICB9KVxuLy8gKVxuLy8gfVxuXG5cbi8vIHByaXZhdGUgcGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzOiBudW1iZXIpIHtcbi8vICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3MsIHRydWUpLnBpcGUoXG4vLyAgICAgLy8gY2hlY2sgaWYgdGhpcyBjbGFzcyBoYXMgJ2hhcyB0eXBlJyBzdWJwcm9wZXJ0eVxuLy8gICAgIG1hcChvdXRnb2luZyA9PiB7XG4vLyAgICAgICByZXR1cm4gb3V0Z29pbmcuZmlsdGVyKChwcm9wKSA9PiBwcm9wLmlzX2hhc190eXBlX3N1YnByb3BlcnR5KTtcbi8vICAgICB9KSwgc3dpdGNoTWFwKGhhc1R5cGVQcm9wcyA9PiBjb21iaW5lTGF0ZXN0T3JFbXB0eShoYXNUeXBlUHJvcHMubWFwKGRmaFByb3AgPT4ge1xuLy8gICAgICAgcmV0dXJuIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhbZGZoUHJvcF0sIHRydWUpLnBpcGUoZmlsdGVyKGxpc3REZWZzID0+ICEhbGlzdERlZnMgJiYgISFsaXN0RGVmc1swXSksIG1hcChsaXN0RGVmcyA9PiB7XG4vLyAgICAgICAgIGNvbnN0IGxpc3REZWYgPSBsaXN0RGVmc1swXTtcbi8vICAgICAgICAgbGlzdERlZi5saXN0VHlwZSA9IHsgdHlwZUl0ZW06ICd0cnVlJyB9O1xuLy8gICAgICAgICByZXR1cm4gbGlzdERlZjtcbi8vICAgICAgIH0pKTtcbi8vICAgICB9KSkpKTtcbi8vIH1cblxuLy8gZ2V0Q2xhc3NGaWVsZFN1YmZpZWxkKHBrQ2xhc3NGaWVsZDogbnVtYmVyKTogU3ViZmllbGQge1xuLy8gICBjb25zdCB0ZW1wbGF0ZSA9IHtcbi8vICAgICBwcm9wZXJ0eToge30sXG4vLyAgICAgc291cmNlQ2xhc3M6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VDbGFzc0xhYmVsOiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0Q2xhc3M6IHVuZGVmaW5lZCxcbi8vICAgICBpc091dGdvaW5nOiB1bmRlZmluZWQsXG4vLyAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogdW5kZWZpbmVkLFxuLy8gICAgIGlkZW50aXR5RGVmaW5pbmdGb3JUYXJnZXQ6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRNYXhRdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldE1pblF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgc291cmNlTWF4UXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VNaW5RdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGZhbHNlXG4vLyAgIH1cbi8vICAgc3dpdGNoIChwa0NsYXNzRmllbGQpIHtcbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiB7IHRpbWVTcGFuOiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdXaGVuJyxcbi8vICAgICAgICAgaXNPdXRnb2luZzogdHJ1ZSxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQNCcsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzQnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VOVElUWV9ERUZJTklUSU9OOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0Rlc2NyaXB0aW9uJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBjYXNlIFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9DT01NRU5UOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0NvbW1lbnRzJyxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0VYQUNUX1JFRkVSRU5DRTpcbi8vICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgIC4uLnRlbXBsYXRlLFxuLy8gICAgICAgICBsaXN0VHlwZTogIHsgdGV4dFByb3BlcnR5OiAndHJ1ZScgfSxcbi8vICAgICAgICAgbGFiZWw6ICdFeGFjdCBSZWZlcmVuY2UnLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1NIT1JUX1RJVExFOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ1Nob3J0IFRpdGxlJyxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBwa0NsYXNzRmllbGQsXG4vLyAgICAgICAgIG9udG9JbmZvTGFiZWw6ICdQMycsXG4vLyAgICAgICAgIG9udG9JbmZvVXJsOiAnaHR0cHM6Ly9vbnRvbWUuZGF0YWZvcmhpc3Rvcnkub3JnL3Byb3BlcnR5LzMnLFxuLy8gICAgICAgICB0YXJnZXRNYXhRdWFudGl0eTogLTFcbi8vICAgICAgIH1cbi8vICAgICBkZWZhdWx0OlxuLy8gICAgICAgYnJlYWs7XG4vLyAgIH1cbi8vIH1cblxuLy8gZ2V0Q2xhc3NGaWVsZERlZmluaXRpb24ocGtDbGFzc0ZpZWxkOiBudW1iZXIpOiBGaWVsZCB7XG4vLyAgIGNvbnN0IGxpc3REZWYgPSB0aGlzLmdldENsYXNzRmllbGRTdWJmaWVsZChwa0NsYXNzRmllbGQpXG4vLyAgIHJldHVybiB7IC4uLmxpc3REZWYsIGxpc3REZWZpbml0aW9uczogW2xpc3REZWZdIH1cbi8vIH1cblxuXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc1JlcXVpcmVkKCkge1xuLy8gICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZCQua2V5KCd0cnVlJylcbi8vICAgICAucGlwZShtYXAoYyA9PiB2YWx1ZXMoYykubWFwKGsgPT4gay5ma19jbGFzcykpKVxuLy8gfVxuXG5cblxuLy8gLyoqXG4vLyAgKiBQaXBlcyBhbGwgdGhlIGVuYWJsZWQgcHJvcGVydGllcyBvZiBhIGNsYXNzXG4vLyAgKi9cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzOiBudW1iZXIsIGlzT3V0Z29pbmc6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPERmaFByb3BlcnR5U3RhdHVzW10+IHtcblxuXG4vLyAgIGxldCAkOiBPYnNlcnZhYmxlPEJ5UGs8RGZoUHJvcGVydHk+PlxuLy8gICBpZiAoaXNPdXRnb2luZykge1xuLy8gICAgICQgPSB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaGFzX2RvbWFpbiQua2V5KHBrQ2xhc3MpXG4vLyAgIH1cbi8vICAgZWxzZSB7XG4vLyAgICAgJCA9IHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfcmFuZ2UkLmtleShwa0NsYXNzKVxuLy8gICB9XG5cbi8vICAgLy8gZmlsdGVyIHByb3BlcnRpZXMgdGhhdCBhcmUgaW4gYXQgbGVhc3Qgb25lIHByb2ZpbGUgZW5hYmxlZCBieSBwcm9qZWN0XG4vLyAgIGNvbnN0IHByb2ZpbGVzJCA9IHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG5cblxuLy8gICAvLyBGaWx0ZXIgb3V0IG9ubHkgdGhlIHByb3BlcnRpZXMgZm9yIHdoaWNoIHRhcmdldCBjbGFzcyBpcyBhbGxvd2VkXG4vLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KCQsIHByb2ZpbGVzJClcbi8vICAgICAucGlwZShcbi8vICAgICAgIG1hcCgoW3Byb3BzLCBwcm9maWxlc10pID0+IHtcbi8vICAgICAgICAgY29uc3QgcDogRGZoUHJvcGVydHlTdGF0dXNbXSA9IFtdXG5cbi8vICAgICAgICAgdmFsdWVzKHByb3BzKS5mb3JFYWNoKHByb3AgPT4ge1xuXG5cbi8vICAgICAgICAgICBjb25zdCBwcm9wUHJvZmlsZVJlbCA9IHByb3AucHJvZmlsZXMgYXMgUHJvZmlsZXNcblxuLy8gICAgICAgICAgIGxldCBlbmFibGVkSW5BUHJvZmlsZSA9IGZhbHNlO1xuXG4vLyAgICAgICAgICAgbGV0IHJlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSB0cnVlO1xuXG4vLyAgICAgICAgICAgcHJvcFByb2ZpbGVSZWwuZm9yRWFjaChpdGVtID0+IHtcbi8vICAgICAgICAgICAgIGlmIChwcm9maWxlcy5pbmNsdWRlcyhpdGVtLmZrX3Byb2ZpbGUpKSB7XG4vLyAgICAgICAgICAgICAgIGVuYWJsZWRJbkFQcm9maWxlID0gdHJ1ZTtcbi8vICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmVtb3ZlZF9mcm9tX2FwaSA9PT0gZmFsc2UpIHtcbi8vICAgICAgICAgICAgICAgICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gZmFsc2Vcbi8vICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgIH0pXG5cbi8vICAgICAgICAgICBpZiAoZW5hYmxlZEluQVByb2ZpbGUpIHtcbi8vICAgICAgICAgICAgIHAucHVzaCh7XG4vLyAgICAgICAgICAgICAgIC4uLnByb3AsXG4vLyAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICB9KVxuXG4vLyAgICAgICAgIHJldHVybiBwXG4vLyAgICAgICB9KVxuLy8gICAgIClcblxuLy8gfVxuXG5cbi8vIC8qKlxuLy8gICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIENsYXNzZXNcbi8vICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3Rcbi8vICAqIC0gb3IgYmVjYXVzZSB0aGUgY2xhc3MgaXMgZW5hYmxlZCBieSBjbGFzc19wcm9qX3JlbFxuLy8gICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyByZXF1aXJlZCBieSBzb3VyY2VzIG9yIGJ5IGJhc2ljc1xuLy8gICpcbi8vICAqIHRoaXMgaXMgdXNlZnVsbCB0byBjaGVjayBpZiBhIGNsYXNzIGlzIGF2YWlsYWJsZSBhdCBhbGxcbi8vICAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNJbkVudGl0ZXNPclJlcXVpcmVkKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuLy8gICByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgICB0aGlzLnBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSxcbi8vICAgICB0aGlzLnBpcGVDbGFzc2VzUmVxdWlyZWQoKVxuLy8gICApLnBpcGUoXG4vLyAgICAgbWFwKChbYSwgYl0pID0+IGluZGV4QnkoKHgpID0+IHgudG9TdHJpbmcoKSwgdW5pcShbLi4uYSwgLi4uYl0pKSksXG4vLyAgICAgc3RhcnRXaXRoKHt9KVxuLy8gICApXG4vLyB9XG4iXX0=