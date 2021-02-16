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
    // @spyTag
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
    // @spyTag
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
    // @spyTag
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
    // @spyTag
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
    // @spyTag
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
    // @spyTag
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
    tslib_1.__metadata("design:paramtypes", [Object, Number, Number]),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi1waXBlcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGtsZWlvbGFiL2xpYi1xdWVyaWVzL3NyYy9saWIvcXVlcmllcy8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2NvbmZpZ3VyYXRpb24tcGlwZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxzQ0FBc0MsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXJILE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQU14RCxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7Ozs7OztBQU1wRSx1Q0FHQzs7O0lBREMsbURBQStCOztBQWNqQzs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLHlCQUF5Qjs7Ozs7SUFFcEMsWUFDVSxDQUE0QixFQUM1QixDQUF5QjtRQUR6QixNQUFDLEdBQUQsQ0FBQyxDQUEyQjtRQUM1QixNQUFDLEdBQUQsQ0FBQyxDQUF3QjtJ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QUFDLEVBQUU7WUFDaEUsUUFBUSxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzNFO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZmhDb25maWcsIFByb0NvbmZpZywgU3lzQ29uZmlnIH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1jb25maWcnO1xuaW1wb3J0IHsgZGZoTGFiZWxCeUZrc0tleSwgcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXksIHRleHRQcm9wZXJ0eUJ5RmtzS2V5IH0gZnJvbSAnQGtsZWlvbGFiL2xpYi1yZWR1eCc7XG5pbXBvcnQgeyBDbGFzc0NvbmZpZywgRGZoQ2xhc3MsIERmaExhYmVsLCBEZmhQcm9wZXJ0eSwgSW5mTGFuZ3VhZ2UsIFByb0NsYXNzRmllbGRDb25maWcsIFByb1RleHRQcm9wZXJ0eSwgUmVsYXRlZFByb2ZpbGUsIFN5c0NvbmZpZ0ZpZWxkRGlzcGxheSwgU3lzQ29uZmlnU3BlY2lhbEZpZWxkcywgU3lzQ29uZmlnVmFsdWUgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgY29tYmluZUxhdGVzdE9yRW1wdHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXV0aWxzJztcbmltcG9ydCB7IGZsYXR0ZW4sIGluZGV4QnksIHVuaXEsIHZhbHVlcyB9IGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9tZXRob2QtZGVjb3JhdG9ycyc7XG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gJy4uL21vZGVscy9GaWVsZCc7XG5pbXBvcnQgeyBGaWVsZFBsYWNlT2ZEaXNwbGF5IH0gZnJvbSAnLi4vbW9kZWxzL0ZpZWxkUG9zaXRpb24nO1xuaW1wb3J0IHsgU3BlY2lhbEZpZWxkVHlwZSB9IGZyb20gJy4uL21vZGVscy9TcGVjaWFsRmllbGRUeXBlJztcbmltcG9ydCB7IFN1YmZpZWxkIH0gZnJvbSAnLi4vbW9kZWxzL1N1YmZpZWxkJztcbmltcG9ydCB7IFN1YmZpZWxkVHlwZSB9IGZyb20gJy4uL21vZGVscy9TdWJmaWVsZFR5cGUnO1xuaW1wb3J0IHsgQWN0aXZlUHJvamVjdFBpcGVzU2VydmljZSB9IGZyb20gJy4vYWN0aXZlLXByb2plY3QtcGlwZXMuc2VydmljZSc7XG5pbXBvcnQgeyBTY2hlbWFTZWxlY3RvcnNTZXJ2aWNlIH0gZnJvbSAnLi9zY2hlbWEtc2VsZWN0b3JzLnNlcnZpY2UnO1xuXG5cbi8vIHRoaXMgaXMgdGhlXG5leHBvcnQgdHlwZSBUYWJsZU5hbWUgPSAnYXBwZWxsYXRpb24nIHwgJ2xhbmd1YWdlJyB8ICdwbGFjZScgfCAndGltZV9wcmltaXRpdmUnIHwgJ2xhbmdfc3RyaW5nJyB8ICdkaW1lbnNpb24nIHwgJ3BlcnNpc3RlbnRfaXRlbScgfCAndGVtcG9yYWxfZW50aXR5J1xuXG5leHBvcnQgaW50ZXJmYWNlIERmaFByb3BlcnR5U3RhdHVzIGV4dGVuZHMgRGZoUHJvcGVydHkge1xuICAvLyB0cnVlLCBpZiByZW1vdmVkIGZyb20gYWxsIHByb2ZpbGVzIG9mIHRoZSBjdXJyZW50IHByb2plY3RcbiAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogYm9vbGVhblxufVxuXG50eXBlIExhYmVsT3JpZ2luID0gJ29mIHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gcHJvamVjdCBsYW5nJyB8ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCcgfCAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgfCAnb2Ygb250b21lIGluIGVuZ2xpc2gnXG50eXBlIFByb2ZpbGVzID0ge1xuICBma19wcm9maWxlOiBudW1iZXI7XG4gIHJlbW92ZWRfZnJvbV9hcGk6IGJvb2xlYW47XG59W107XG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5cbi8qKlxuICogVGhpcyBTZXJ2aWNlIHByb3ZpZGVzIGEgY29sbGVjdGlvbiBvZiBwaXBlcyB0aGF0IGFnZ3JlZ2F0ZSBvciB0cmFuc2Zvcm0gY29uZmlndXJhdGlvbiBkYXRhLlxuICogV2hlbiB0YWxraW5nIGFib3V0IGNvbmZpZ3VyYXRpb24sIHdlIG1lYW4gdGhlIGNvbmNlcHR1YWwgcmVmZXJlbmNlIG1vZGVsIGFuZCB0aGUgYWRkaXRpb25hbFxuICogY29uZmlndXJhdGlvbnMgb24gc3lzdGVtIGFuZCBwcm9qZWN0IGxldmVsLlxuICogRm9yIEV4YW1wbGVcbiAqIC0gdGhlIGZpZWxkcyBvZiBhIGNsYXNzXG4gKiAtIHRoZSBsYWJlbHMgb2YgY2xhc3NlcyBhbmQgcHJvcGVydGllc1xuICovXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblBpcGVzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhOiBBY3RpdmVQcm9qZWN0UGlwZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgczogU2NoZW1hU2VsZWN0b3JzU2VydmljZSxcbiAgKSB7IH1cblxuXG4gIC8qKlxuICAqIHJldHVybnMgb2JzZXJ2YWJsZSBudW1iZXJbXSB3aGVyIHRoZSBudW1iZXJzIGFyZSB0aGUgcGtfcHJvZmlsZVxuICAqIG9mIGFsbCBwcm9maWxlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0LlxuICAqIFRoZSBhcnJheSB3aWxsIGFsd2F5cyBpbmNsdWRlIFBLX1BST0ZJTEVfR0VPVklTVE9SWV9CQVNJQ1xuICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KVxuICBwdWJsaWMgcGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9wcm9maWxlX3Byb2pfcmVsJC5ieV9ma19wcm9qZWN0X19lbmFibGVkJFxuICAgICAgICAua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpLnBpcGUoXG4gICAgICAgICAgbWFwKHByb2plY3RQcm9maWxlUmVscyA9PiB2YWx1ZXMocHJvamVjdFByb2ZpbGVSZWxzKVxuICAgICAgICAgICAgLmZpbHRlcihyZWwgPT4gcmVsLmVuYWJsZWQpXG4gICAgICAgICAgICAubWFwKHJlbCA9PiByZWwuZmtfcHJvZmlsZSlcbiAgICAgICAgICApLFxuICAgICAgICAgIG1hcChlbmFibGVkID0+IFsuLi5lbmFibGVkLCBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXSksXG4gICAgICAgICkpLFxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBQaXBlIGFsbCBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAgICogVGhlIEZpZWxkcyBhcmUgbm90IG9yZGVyZWQgYW5kIG5vdCBmaWx0ZXJlZFxuICAgKiBJZiB5b3Ugd2FudCBzcGVjaWZpYyBzdWJzZXRzIG9mIEZpZWxkcyBhbmQvb3Igb3JkZXJlZCBGaWVsZHMsIHVzZSB0aGUgcGlwZXNcbiAgICogdGhhdCBidWlsZCBvbiB0aGlzIHBpcGUuXG4gICAqL1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHMocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIHBpcGUgc291cmNlIGNsYXNzXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKSxcbiAgICAgIC8vIHBpcGUgb3V0Z29pbmcgcHJvcGVydGllc1xuICAgICAgdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19kb21haW4kLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBpbmdvaW5nIHByb3BlcnRpZXNcbiAgICAgIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfcmFuZ2UkLmtleShwa0NsYXNzKS5waXBlKG1hcChpbmRleGVkID0+IHZhbHVlcyhpbmRleGVkKSkpLFxuICAgICAgLy8gcGlwZSBzeXMgY29uZmlnXG4gICAgICB0aGlzLnMuc3lzJC5jb25maWckLm1haW4kLnBpcGUoZmlsdGVyKHggPT4gISF4KSksXG4gICAgICAvLyBwaXBlIGVuYWJsZWQgcHJvZmlsZXNcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpLFxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW3NvdXJjZUtsYXNzLCBvdXRnb2luZ1Byb3BzLCBpbmdvaW5nUHJvcHMsIHN5c0NvbmZpZywgZW5hYmxlZFByb2ZpbGVzXSkgPT4ge1xuXG4gICAgICAgIC8vIGlmIGNsYXNzIGlzIG5vdCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UsIGFkZCBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2UgKDExMTEpIHByb3BlcnR5XG4gICAgICAgIGlmIChwa0NsYXNzICE9PSBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFKSB7XG4gICAgICAgICAgaW5nb2luZ1Byb3BzLnB1c2goY3JlYXRlQXBwZWxsYXRpb25Qcm9wZXJ0eShwa0NsYXNzKSlcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBpcyB0ZW1wb3JhbCBlbnRpdHksIGFkZCBoYXMgdGltZSBzcGFuIHByb3BlcnR5XG4gICAgICAgIGlmIChzb3VyY2VLbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4gICAgICAgICAgb3V0Z29pbmdQcm9wcy5wdXNoKGNyZWF0ZUhhc1RpbWVTcGFuUHJvcGVydHkocGtDbGFzcykpXG4gICAgICAgIH1cblxuICAgICAgICBvdXRnb2luZ1Byb3BzLnB1c2goY3JlYXRlSGFzRGVmaW5pdGlvblByb3BlcnR5KHBrQ2xhc3MpKVxuXG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucGlwZVByb3BlcnRpZXNUb1N1YmZpZWxkcyhvdXRnb2luZ1Byb3BzLCB0cnVlLCBlbmFibGVkUHJvZmlsZXMsIHN5c0NvbmZpZyksXG4gICAgICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKGluZ29pbmdQcm9wcywgZmFsc2UsIGVuYWJsZWRQcm9maWxlcywgc3lzQ29uZmlnKSxcbiAgICAgICAgICB0aGlzLnBpcGVGaWVsZENvbmZpZ3MocGtDbGFzcylcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcCgoW3N1YmZpZWxkczEsIHN1YmZpZWxkczIsIGZpZWxkQ29uZmlnc10pID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN1YmZpZWxkcyA9IFsuLi5zdWJmaWVsZHMxLCAuLi5zdWJmaWVsZHMyXVxuXG4gICAgICAgICAgICBjb25zdCBmaWVsZENvbmZpZ0lkeCA9IGluZGV4QnkoKHgpID0+IFtcbiAgICAgICAgICAgICAgKHguZmtfZG9tYWluX2NsYXNzIHx8IHguZmtfcmFuZ2VfY2xhc3MpLFxuICAgICAgICAgICAgICB4LmZrX3Byb3BlcnR5LFxuICAgICAgICAgICAgICAhIXguZmtfZG9tYWluX2NsYXNzXG4gICAgICAgICAgICBdLmpvaW4oJ18nKSwgZmllbGRDb25maWdzKVxuXG4gICAgICAgICAgICBjb25zdCB1bmlxRmllbGRzOiB7IFt1aWQ6IHN0cmluZ106IEZpZWxkIH0gPSB7fVxuICAgICAgICAgICAgY29uc3QgdW5pcVN1YmZpZWxkQ2FjaGU6IHsgW3VpZDogc3RyaW5nXTogdHJ1ZSB9ID0ge31cblxuXG4gICAgICAgICAgICAvLyBncm91cCBieSBzb3VyY2UsIHBrUHJvcGVydHkgYW5kIGlzT3V0Z29pbmdcbiAgICAgICAgICAgIGZvciAoY29uc3QgcyBvZiBzdWJmaWVsZHMpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmllbGRJZCA9IFtzLnNvdXJjZUNsYXNzLCBzLnByb3BlcnR5LnBrUHJvcGVydHksIHMuaXNPdXRnb2luZ10uam9pbignXycpXG4gICAgICAgICAgICAgIGNvbnN0IHN1YmZpZWxkSWQgPSBbcy5zb3VyY2VDbGFzcywgcy5wcm9wZXJ0eS5wa1Byb3BlcnR5LCBzLmlzT3V0Z29pbmcsIHMudGFyZ2V0Q2xhc3NdLmpvaW4oJ18nKVxuICAgICAgICAgICAgICBjb25zdCBmaWVsZENvbmZpZzogUHJvQ2xhc3NGaWVsZENvbmZpZyB8IHVuZGVmaW5lZCA9IGZpZWxkQ29uZmlnSWR4W2ZpZWxkSWRdO1xuICAgICAgICAgICAgICAvLyB0aGUgZmlyc3QgdGltZSB0aGUgZ3JvdXAgaXMgZXN0YWJsaXNoZWRcbiAgICAgICAgICAgICAgaWYgKCF1bmlxRmllbGRzW2ZpZWxkSWRdKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlzU3BlY2lhbEZpZWxkOiBTcGVjaWFsRmllbGRUeXBlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIYXNUeXBlRmllbGQpIGlzU3BlY2lhbEZpZWxkID0gJ2hhcy10eXBlJztcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnByb3BlcnR5LnBrUHJvcGVydHkgPT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOKSBpc1NwZWNpYWxGaWVsZCA9ICd0aW1lLXNwYW4nO1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0gPSB7XG4gICAgICAgICAgICAgICAgICBzb3VyY2VDbGFzczogcy5zb3VyY2VDbGFzcyxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZUNsYXNzTGFiZWw6IHMuc291cmNlQ2xhc3NMYWJlbCxcbiAgICAgICAgICAgICAgICAgIHNvdXJjZU1heFF1YW50aXR5OiBzLnNvdXJjZU1heFF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgc291cmNlTWluUXVhbnRpdHk6IHMuc291cmNlTWluUXVhbnRpdHksXG4gICAgICAgICAgICAgICAgICB0YXJnZXRNaW5RdWFudGl0eTogcy50YXJnZXRNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiBzLnRhcmdldE1heFF1YW50aXR5LFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IHMubGFiZWwsXG4gICAgICAgICAgICAgICAgICBpc0hhc1R5cGVGaWVsZDogcy5pc0hhc1R5cGVGaWVsZCxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnR5OiBzLnByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgaXNPdXRnb2luZzogcy5pc091dGdvaW5nLFxuICAgICAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclNvdXJjZTogcy5pZGVudGl0eURlZmluaW5nRm9yU291cmNlLFxuICAgICAgICAgICAgICAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogcy5pZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgb250b0luZm9MYWJlbDogcy5vbnRvSW5mb0xhYmVsLFxuICAgICAgICAgICAgICAgICAgb250b0luZm9Vcmw6IHMub250b0luZm9VcmwsXG4gICAgICAgICAgICAgICAgICBhbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBzLnJlbW92ZWRGcm9tQWxsUHJvZmlsZXMsXG4gICAgICAgICAgICAgICAgICB0YXJnZXRDbGFzc2VzOiBbcy50YXJnZXRDbGFzc10sXG4gICAgICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbnM6IFtzXSxcbiAgICAgICAgICAgICAgICAgIGZpZWxkQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgcGxhY2VPZkRpc3BsYXk6IGdldFBsYWNlT2ZEaXNwbGF5KHN5c0NvbmZpZy5zcGVjaWFsRmllbGRzLCBzLCBmaWVsZENvbmZpZyksXG4gICAgICAgICAgICAgICAgICBpc1NwZWNpYWxGaWVsZFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG1hcmsgc3ViZmllbGQgYXMgYWRkZWRcbiAgICAgICAgICAgICAgICB1bmlxU3ViZmllbGRDYWNoZVtzdWJmaWVsZElkXSA9IHRydWU7XG5cblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIC8vIGlnbm9yZSBkdXBsaWNhdGlvbnMgb2Ygc3ViZmllbGRzXG4gICAgICAgICAgICAgIGVsc2UgaWYgKCF1bmlxU3ViZmllbGRDYWNoZVtzdWJmaWVsZElkXSkge1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0uYWxsU3ViZmllbGRzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9PT0gZmFsc2UgP1xuICAgICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gZmFsc2UgOlxuICAgICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5hbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzID0gcy5yZW1vdmVkRnJvbUFsbFByb2ZpbGVzO1xuICAgICAgICAgICAgICAgIHVuaXFGaWVsZHNbZmllbGRJZF0udGFyZ2V0Q2xhc3Nlcy5wdXNoKHMudGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICAgICAgdW5pcUZpZWxkc1tmaWVsZElkXS5saXN0RGVmaW5pdGlvbnMucHVzaChzKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXModW5pcUZpZWxkcylcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG5cblxuICAvKipcbiAgICogcGlwZSBhbGwgdGhlIHNwZWNpZmljIGZpZWxkcyBvZiBhIGNsYXNzLFxuICAgKiBvcmRlcmVkIGJ5IHRoZSBwb3NpdGlvbiBvZiB0aGUgZmllbGQgd2l0aGluIHRoZSBzcGVjaWZpYyBmaWVsZHNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxGaWVsZFtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MpLnBpcGUoXG4gICAgICBtYXAoZmllbGRzID0+IGZpZWxkc1xuICAgICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgICAuZmlsdGVyKGZpZWxkID0+IGZpZWxkLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzKVxuICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uIC0gYi5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcy5wb3NpdGlvbilcbiAgICAgIClcbiAgICApXG4gIH1cblxuICAvKipcbiAgICAqIHBpcGUgYWxsIHRoZSBiYXNpYyBmaWVsZHMgb2YgYSBjbGFzcyxcbiAgICAqIG9yZGVyZWQgYnkgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaWVsZCB3aXRoaW4gdGhlIGJhc2ljIGZpZWxkc1xuICAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHB1YmxpYyBwaXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLnBpcGVGaWVsZHMocGtDbGFzcykucGlwZShcbiAgICAgIG1hcChmaWVsZHMgPT4gZmllbGRzXG4gICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gYmFzaWMgZmllbGRzXG4gICAgICAgIC5maWx0ZXIoZmllbGQgPT4gZmllbGQucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMpXG4gICAgICAgIC8vIHNvcnQgZmllbGRzIGJ5IHRoZSBwb3NpdGlvbiBkZWZpbmVkIGluIHRoZSBiYXNpYyBmaWVsZHNcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuYmFzaWNGaWVsZHMucG9zaXRpb24gLSBiLnBsYWNlT2ZEaXNwbGF5LmJhc2ljRmllbGRzLnBvc2l0aW9uKVxuICAgICAgKVxuICAgIClcbiAgfVxuXG5cblxuXG4gIC8qKlxuICAgICAqIFBpcGVzIHRoZSBmaWVsZHMgZm9yIHRlbXBvcmFsIGVudGl0eSBmb3Jtc1xuICAgICAqIC0gdGhlIHNwZWNpZmljIGZpZWxkc1xuICAgICAqIC0gdGhlIHdoZW4gZmllbGRcbiAgICAgKiAtIGlmIGF2YWlsYWJsZTogdGhlIHR5cGUgZmllbGRcbiAgICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcHVibGljIHBpcGVGaWVsZHNGb3JUZUVuRm9ybShwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5waXBlRmllbGRzKHBrQ2xhc3MpLnBpcGUoXG4gICAgICAvLyBmaWx0ZXIgZmllbGRzIHRoYXQgYXJlIGRpc3BsYXlkIGluIHNwZWNpZmljIGZpZWxkc1xuICAgICAgbWFwKGFsbEZpZWxkcyA9PiB7XG4gICAgICAgIGNvbnN0IGZpZWxkcyA9IGFsbEZpZWxkc1xuICAgICAgICAgIC8vIGZpbHRlciBmaWVsZHMgdGhhdCBhcmUgZGlzcGxheWQgaW4gc3BlY2lmaWMgZmllbGRzXG4gICAgICAgICAgLmZpbHRlcihmaWVsZCA9PiBmaWVsZC5wbGFjZU9mRGlzcGxheS5zcGVjaWZpY0ZpZWxkcylcbiAgICAgICAgICAvLyBzb3J0IGZpZWxkcyBieSB0aGUgcG9zaXRpb24gZGVmaW5lZCBpbiB0aGUgc3BlY2lmaWMgZmllbGRzXG4gICAgICAgICAgLnNvcnQoKGEsIGIpID0+IGEucGxhY2VPZkRpc3BsYXkuc3BlY2lmaWNGaWVsZHMucG9zaXRpb24gLSBhLnBsYWNlT2ZEaXNwbGF5LnNwZWNpZmljRmllbGRzLnBvc2l0aW9uKVxuXG4gICAgICAgIGNvbnN0IHdoZW5GaWVsZCA9IGFsbEZpZWxkcy5maW5kKGZpZWxkID0+IGZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHkgPT09IERmaENvbmZpZy5QUk9QRVJUWV9QS19IQVNfVElNRV9TUEFOKVxuICAgICAgICBpZiAod2hlbkZpZWxkKSBmaWVsZHMucHVzaCh3aGVuRmllbGQpXG5cbiAgICAgICAgY29uc3QgdHlwZUZpZWxkID0gYWxsRmllbGRzLmZpbmQoZmllbGQgPT4gZmllbGQuaXNIYXNUeXBlRmllbGQpXG4gICAgICAgIGlmICh0eXBlRmllbGQpIGZpZWxkcy5wdXNoKHR5cGVGaWVsZClcblxuICAgICAgICByZXR1cm4gZmllbGRzO1xuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG5cblxuXG5cbiAgLyoqXG4gICAqIFBpcGVzIHRoZSBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3MgaW4gdGhpcyBvcmRlcjpcbiAgICogLSBiYXNpYyBmaWVsZHNcbiAgICogLSBzcGVjaWZpYyBmaWVsZHNcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVCYXNpY0FuZFNwZWNpZmljRmllbGRzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQmFzaWNGaWVsZHNPZkNsYXNzKHBrQ2xhc3MpLFxuICAgICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzcylcbiAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbYSwgYl0pID0+IFsuLi5hLCAuLi5iXSlcbiAgICAgIClcbiAgfVxuXG4gIC8qKlxuICAqIFBpcGVzIHRoZSBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3MgaW4gdGhpcyBvcmRlcjpcbiAgKiAtIHNwZWNpZmljIGZpZWxkc1xuICAqIC0gYmFzaWMgZmllbGRzXG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTcGVjaWZpY0FuZEJhc2ljRmllbGRzKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZE9mQ2xhc3MocGtDbGFzcyksXG4gICAgICB0aGlzLnBpcGVCYXNpY0ZpZWxkc09mQ2xhc3MocGtDbGFzcyksXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoW2EsIGJdKSA9PiBbLi4uYSwgLi4uYl0pXG4gICAgICApXG4gIH1cblxuXG5cblxuXG5cblxuXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwcml2YXRlIHBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoXG4gICAgcHJvcGVydGllczogRGZoUHJvcGVydHlbXSxcbiAgICBpc091dGdvaW5nOiBib29sZWFuLFxuICAgIGVuYWJsZWRQcm9maWxlczogbnVtYmVyW10sXG4gICAgc3lzQ29uZmlnOiBTeXNDb25maWdWYWx1ZVxuICApOiBPYnNlcnZhYmxlPFN1YmZpZWxkW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdE9yRW1wdHkoXG4gICAgICBwcm9wZXJ0aWVzLm1hcChwID0+IHtcblxuICAgICAgICBjb25zdCBvID0gaXNPdXRnb2luZztcbiAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBvID8gcC5oYXNfcmFuZ2UgOiBwLmhhc19kb21haW47XG4gICAgICAgIGNvbnN0IHNvdXJjZUNsYXNzID0gbyA/IHAuaGFzX2RvbWFpbiA6IHAuaGFzX3JhbmdlO1xuICAgICAgICBjb25zdCB0YXJnZXRNYXhRdWFudGl0eSA9IG8gP1xuICAgICAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyIDpcbiAgICAgICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI7XG5cbiAgICAgICAgY29uc3Qgc291cmNlTWF4UXVhbnRpdHkgPSBvID9cbiAgICAgICAgICBwLmRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXIgOlxuICAgICAgICAgIHAucmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyO1xuXG4gICAgICAgIGNvbnN0IHRhcmdldE1pblF1YW50aXR5ID0gbyA/XG4gICAgICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXIgOlxuICAgICAgICAgIHAuZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjtcblxuICAgICAgICBjb25zdCBzb3VyY2VNaW5RdWFudGl0eSA9IG8gP1xuICAgICAgICAgIHAuZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllciA6XG4gICAgICAgICAgcC5yYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI7XG5cbiAgICAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdGhpcy5waXBlQ2xhc3NMYWJlbChzb3VyY2VDbGFzcyksXG4gICAgICAgICAgdGhpcy5waXBlQ2xhc3NMYWJlbCh0YXJnZXRDbGFzcyksXG4gICAgICAgICAgdGhpcy5waXBlU3ViZmllbGRUeXBlT2ZDbGFzcyhzeXNDb25maWcsIHRhcmdldENsYXNzLCB0YXJnZXRNYXhRdWFudGl0eSksXG4gICAgICAgICAgdGhpcy5waXBlRmllbGRMYWJlbChcbiAgICAgICAgICAgIHAucGtfcHJvcGVydHksXG4gICAgICAgICAgICBpc091dGdvaW5nID8gcC5oYXNfZG9tYWluIDogbnVsbCxcbiAgICAgICAgICAgIGlzT3V0Z29pbmcgPyBudWxsIDogcC5oYXNfcmFuZ2UsXG4gICAgICAgICAgKVxuICAgICAgICApLnBpcGUoXG4gICAgICAgICAgbWFwKChbc291cmNlQ2xhc3NMYWJlbCwgdGFyZ2V0Q2xhc3NMYWJlbCwgbGlzdFR5cGUsIGxhYmVsXSkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBub2RlOiBTdWJmaWVsZCA9IHtcbiAgICAgICAgICAgICAgbGlzdFR5cGUsXG4gICAgICAgICAgICAgIHNvdXJjZUNsYXNzLFxuICAgICAgICAgICAgICBzb3VyY2VDbGFzc0xhYmVsLFxuICAgICAgICAgICAgICBzb3VyY2VNYXhRdWFudGl0eSxcbiAgICAgICAgICAgICAgc291cmNlTWluUXVhbnRpdHksXG4gICAgICAgICAgICAgIHRhcmdldENsYXNzLFxuICAgICAgICAgICAgICB0YXJnZXRDbGFzc0xhYmVsLFxuICAgICAgICAgICAgICB0YXJnZXRNaW5RdWFudGl0eSxcbiAgICAgICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHksXG4gICAgICAgICAgICAgIGxhYmVsLFxuICAgICAgICAgICAgICBpc0hhc1R5cGVGaWVsZDogbyAmJiBwLmlzX2hhc190eXBlX3N1YnByb3BlcnR5LFxuICAgICAgICAgICAgICBwcm9wZXJ0eTogeyBwa1Byb3BlcnR5OiBwLnBrX3Byb3BlcnR5IH0sXG4gICAgICAgICAgICAgIGlzT3V0Z29pbmc6IG8sXG4gICAgICAgICAgICAgIGlkZW50aXR5RGVmaW5pbmdGb3JTb3VyY2U6IG8gPyBwLmlkZW50aXR5X2RlZmluaW5nIDogZmFsc2UsIC8vIHJlcGxhY2UgZmFsc2Ugd2l0aCBwLmlkZW50aXR5X2RlZmluaW5nX2Zvcl9yYW5nZSB3aGVuIGF2YWlsYWJsZVxuICAgICAgICAgICAgICBpZGVudGl0eURlZmluaW5nRm9yVGFyZ2V0OiBvID8gZmFsc2UgOiBwLmlkZW50aXR5X2RlZmluaW5nLCAvLyByZXBsYWNlIGZhbHNlIHdpdGggcC5pZGVudGl0eV9kZWZpbmluZ19mb3JfcmFuZ2Ugd2hlbiBhdmFpbGFibGVcbiAgICAgICAgICAgICAgb250b0luZm9MYWJlbDogcC5pZGVudGlmaWVyX2luX25hbWVzcGFjZSxcbiAgICAgICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvJyArIHAucGtfcHJvcGVydHksXG4gICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXM6IGlzUmVtb3ZlZEZyb21BbGxQcm9maWxlcyhlbmFibGVkUHJvZmlsZXMsIChwLnByb2ZpbGVzIHx8IFtdKSksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQaXBlcyB0aGUgdHlwZSBvZiBTdWJmaWVsZCBmb3IgYSBnaXZlbiBjbGFzc1xuICAgKiBDdXJyZW50bHkgKHRvIGJlIHJldmlzZWQgaWYgZ29vZCkgc3VibGNhc3NlcyBvZiBFNTUgVHlwZSxcbiAgICogdGhhdCBhcmUgdGhlIHRhcmdldCBvZiBhIGZpZWxkIHdpdGggdGFyZ2V0TWF4UWFudGl0eT0xLFxuICAgKiBnZXQgU3ViZmllbGQgdHlwZSAnaGFzVHlwZScuXG4gICAqIFRoZXJlZm9yZSB0YXJnZXRNYXhRdWFudGl0eSBpcyBuZWVkZWQuXG4gICAqXG4gICAqIFRoaXMgYmVoYXZpb3IgaGFzIHRvIGJlIHJldmlzZWQsIGJlY2F1c2UgaXQgY2FuIGxlYWQgdG8gcHJvYmxlbXNcbiAgICogd2hlbiB0aGUgU3ViZmllbGQgYmVsb25ncyB0byBhIEZpZWxkIHdpdGggbXVsdGlwbGUgdGFyZ2V0IGNsYXNzZXNcbiAgICogKGFuZCB0aHVzIFN1YmZpZWxkcykgYmVjYXVzZSB0aGUgVUkgdGhlbiBkb2VzIG5vdCBhbGxvdyB0byBjaG9vc2VcbiAgICogdGhlIHJpZ2h0IHRhcmdldCBjbGFzcy5cbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVTdWJmaWVsZFR5cGVPZkNsYXNzKGNvbmZpZzogU3lzQ29uZmlnVmFsdWUsIHBrQ2xhc3M6IG51bWJlciwgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlcik6IE9ic2VydmFibGU8U3ViZmllbGRUeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KHBrQ2xhc3MpLnBpcGUoXG4gICAgICBmaWx0ZXIoaSA9PiAhIWkpLFxuICAgICAgbWFwKChrbGFzcykgPT4gZ2V0U3ViZmllbGRUeXBlKGNvbmZpZywga2xhc3MsIHRhcmdldE1heFF1YW50aXR5KSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiBHZXRzIGNsYXNzIGZpZWxkIGNvbmZpZ3Mgb2YgZ2l2ZW4gcGtDbGFzc1xuICAgKlxuICAgKiAtIG9mIGFjdGl2ZSBwcm9qZWN0LCBpZiBhbnksIGVsc2VcbiAgICogLSBvZiBkZWZhdWx0IGNvbmZpZyBwcm9qZWN0LCBlbHNlXG4gICAqIC0gZW1wdHkgYXJyYXlcbiAgICpcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZENvbmZpZ3MocGtDbGFzczogbnVtYmVyKTogT2JzZXJ2YWJsZTxQcm9DbGFzc0ZpZWxkQ29uZmlnW10+IHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZmtQcm9qZWN0KSA9PiB7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlUHJvamVjdGtleSA9IHByb0NsYXNzRmllbGRDb25mZ0J5UHJvamVjdEFuZENsYXNzS2V5KHtcbiAgICAgICAgICBma19jbGFzc19mb3JfY2xhc3NfZmllbGQ6IHBrQ2xhc3MsXG4gICAgICAgICAgZmtfcHJvamVjdDogZmtQcm9qZWN0XG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0a2V5ID0gcHJvQ2xhc3NGaWVsZENvbmZnQnlQcm9qZWN0QW5kQ2xhc3NLZXkoe1xuICAgICAgICAgIGZrX2NsYXNzX2Zvcl9jbGFzc19maWVsZDogcGtDbGFzcyxcbiAgICAgICAgICBma19wcm9qZWN0OiBQcm9Db25maWcuUEtfUFJPSkVDVF9PRl9ERUZBVUxUX0NPTkZJR19QUk9KRUNUXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgICAgIHRoaXMucy5wcm8kLmNsYXNzX2ZpZWxkX2NvbmZpZyQuYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MkLmtleShhY3RpdmVQcm9qZWN0a2V5KSxcbiAgICAgICAgICB0aGlzLnMucHJvJC5jbGFzc19maWVsZF9jb25maWckLmJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJC5rZXkoZGVmYXVsdFByb2plY3RrZXkpXG4gICAgICAgIClcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCgoW2FjdGl2ZVByb2plY3RGaWVsZHMsIGRlZmF1bHRQcm9qZWN0RmllbGRzXSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoYWN0aXZlUHJvamVjdEZpZWxkcyAmJiB2YWx1ZXMoYWN0aXZlUHJvamVjdEZpZWxkcykubGVuZ3RoKSByZXR1cm4gYWN0aXZlUHJvamVjdEZpZWxkcztcblxuICAgICAgICAgICAgICByZXR1cm4gZGVmYXVsdFByb2plY3RGaWVsZHNcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChpdGVtcykgPT4gdmFsdWVzKGl0ZW1zKS5zb3J0KChhLCBiKSA9PiAoYS5vcmRfbnVtID4gYi5vcmRfbnVtID8gMSA6IC0xKSkpLFxuICAgICAgICAgIClcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBjbGFzcyBsYWJlbCBmb3IgYWN0aXZlIHByb2plY3RcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc0xhYmVsKHBrQ2xhc3M/OiBudW1iZXIpOiBPYnNlcnZhYmxlPHN0cmluZz4ge1xuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKHsgcGtDbGFzcywgZmtQcm9qZWN0LCBsYW5ndWFnZSwgdHlwZTogJ2xhYmVsJyB9KVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoaXRlbXMgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBpID0gaXRlbXMuZmluZChpdGVtID0+ICEhaXRlbSlcbiAgICAgICAgICAgIHJldHVybiBpID8gaS50ZXh0IDogYCogbm8gbGFiZWwgKGlkOiAke3BrQ2xhc3N9KSAqYFxuICAgICAgICAgIH0pXG4gICAgICAgICkpXG4gICAgKVxuICB9XG5cblxuICAvKipcbiAgICogRGVsaXZlcnMgYXJyYXkgb2Ygb2JqZWN0cyB3aXRoXG4gICAqIHRleHQgfiB0aGUgdGV4dCBvZiB0aGUgcHJvcGVydHlcbiAgICogb3JpZ2luLCBpbiB0aGlzIG9yZGVyOlxuICAgKiAtIG9yaWdpbiA9PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnICAgICAgICAgKGZyb20gcHJvamVjdHMudGV4dF9wcm9wZXJ0eSlcbiAgICogLSBvcmlnaW4gPT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIChmcm9tIHByb2plY3RzLnRleHRfcHJvcGVydHkpXG4gICAqIC0gb3JpZ2luID09ICdvZiBkZWZhdWx0IHByb2plY3QgaW4gZW5nbGlzaCcgICAgICAoZnJvbSBwcm9qZWN0cy50ZXh0X3Byb3BlcnR5KVxuICAgKiAtIG9yaWdpbiA9PSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZycgICAgICAgICAgKGZyb20gZGF0YV9mb3JfaGlzdG9yeS5sYWJlbClcbiAgICogLSBvcmlnaW4gPT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJyAgICAgICAgICAgICAgIChmcm9tIGRhdGFfZm9yX2hpc3RvcnkubGFiZWwpXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlTGFiZWxzKGQ6IHtcbiAgICBma1Byb2plY3Q6IG51bWJlcixcbiAgICB0eXBlOiAnbGFiZWwnIHwgJ2RlZmluaXRpb24nIHwgJ3Njb3BlTm90ZScsXG4gICAgbGFuZ3VhZ2U6IEluZkxhbmd1YWdlLFxuICAgIHBrQ2xhc3M/OiBudW1iZXIsXG4gICAgZmtQcm9wZXJ0eT86IG51bWJlcixcbiAgICBma1Byb3BlcnR5RG9tYWluPzogbnVtYmVyLFxuICAgIGZrUHJvcGVydHlSYW5nZT86IG51bWJlcixcbiAgfSk6IE9ic2VydmFibGU8e1xuICAgIG9yaWdpbjogTGFiZWxPcmlnaW5cbiAgICB0ZXh0OiBzdHJpbmdcbiAgfVtdPiB7XG4gICAgbGV0IGZrX3N5c3RlbV90eXBlOiBudW1iZXI7XG5cbiAgICBpZiAoZC5wa0NsYXNzKSB7XG4gICAgICBzd2l0Y2ggKGQudHlwZSkge1xuICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgZmtfc3lzdGVtX3R5cGUgPSBTeXNDb25maWcuUEtfU1lTVEVNX1RZUEVfX1RFWFRfUFJPUEVSVFlfX0xBQkVMXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS53YXJuKCdma19zeXN0ZW1fdHlwZSBub3QgZm91bmQnKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChkLmZrUHJvcGVydHkpIHtcbiAgICAgIHN3aXRjaCAoZC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xhYmVsJzpcbiAgICAgICAgICBma19zeXN0ZW1fdHlwZSA9IFN5c0NvbmZpZy5QS19TWVNURU1fVFlQRV9fVEVYVF9QUk9QRVJUWV9fTEFCRUxcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ2ZrX3N5c3RlbV90eXBlIG5vdCBmb3VuZCcpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIC8vIGxhYmVsIG9mIHByb2plY3QgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVQcm9UZXh0UHJvcGVydHkoe1xuICAgICAgICBma19wcm9qZWN0OiBkLmZrUHJvamVjdCxcbiAgICAgICAgZmtfbGFuZ3VhZ2U6IGQubGFuZ3VhZ2UucGtfZW50aXR5LFxuICAgICAgICBma19zeXN0ZW1fdHlwZSxcbiAgICAgICAgZmtfZGZoX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eTogZC5ma1Byb3BlcnR5LFxuICAgICAgICBma19kZmhfcHJvcGVydHlfZG9tYWluOiBkLmZrUHJvcGVydHlEb21haW4sXG4gICAgICAgIGZrX2RmaF9wcm9wZXJ0eV9yYW5nZTogZC5ma1Byb3BlcnR5UmFuZ2VcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiBkLmxhbmd1YWdlLnBrX2VudGl0eSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5zdHJpbmcgfVxuICAgICAgfSkpLFxuXG4gICAgICAvLyBsYWJlbCBvZiBkZWZhdWx0IHByb2plY3RcbiAgICAgIHRoaXMucGlwZVByb1RleHRQcm9wZXJ0eSh7XG4gICAgICAgIGZrX3Byb2plY3Q6IFByb0NvbmZpZy5QS19QUk9KRUNUX09GX0RFRkFVTFRfQ09ORklHX1BST0pFQ1QsXG4gICAgICAgIGZrX2xhbmd1YWdlOiAxODg4OSxcbiAgICAgICAgZmtfc3lzdGVtX3R5cGUsXG4gICAgICAgIGZrX2RmaF9jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19kZmhfcHJvcGVydHk6IGQuZmtQcm9wZXJ0eSxcbiAgICAgICAgZmtfZGZoX3Byb3BlcnR5X2RvbWFpbjogZC5ma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICBma19kZmhfcHJvcGVydHlfcmFuZ2U6IGQuZmtQcm9wZXJ0eVJhbmdlXG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2YgZGVmYXVsdCBwcm9qZWN0IGluIGVuZ2xpc2gnO1xuICAgICAgICByZXR1cm4geyBvcmlnaW4sIHRleHQ6IGl0ZW0uc3RyaW5nIH1cbiAgICAgIH0pKSxcblxuICAgICAgLy8gbGFiZWwgZnJvbSBvbnRvbWUgaW4gZGVmYXVsdCBsYW5ndWFnZSBvZiBwcm9qZWN0XG4gICAgICB0aGlzLnBpcGVEZmhMYWJlbCh7XG4gICAgICAgIGxhbmd1YWdlOiBkLmxhbmd1YWdlLmlzbzYzOTEudHJpbSgpLFxuICAgICAgICB0eXBlOiAnbGFiZWwnLFxuICAgICAgICBma19jbGFzczogZC5wa0NsYXNzLFxuICAgICAgICBma19wcm9wZXJ0eTogZC5ma1Byb3BlcnR5XG4gICAgICB9KS5waXBlKG1hcCgoaXRlbSkgPT4ge1xuICAgICAgICBpZiAoIWl0ZW0pIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IG9yaWdpbjogTGFiZWxPcmlnaW4gPSAnb2Ygb250b21lIGluIHByb2plY3QgbGFuZyc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG5cbiAgICAgIC8vIGxhYmVsIGZyb20gb250b21lIGluIGVuZ2xpc2hcbiAgICAgIHRoaXMucGlwZURmaExhYmVsKHtcbiAgICAgICAgbGFuZ3VhZ2U6ICdlbicsXG4gICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgIGZrX2NsYXNzOiBkLnBrQ2xhc3MsXG4gICAgICAgIGZrX3Byb3BlcnR5OiBkLmZrUHJvcGVydHlcbiAgICAgIH0pLnBpcGUobWFwKChpdGVtKSA9PiB7XG4gICAgICAgIGlmICghaXRlbSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3Qgb3JpZ2luOiBMYWJlbE9yaWdpbiA9ICdvZiBvbnRvbWUgaW4gZW5nbGlzaCc7XG4gICAgICAgIHJldHVybiB7IG9yaWdpbiwgdGV4dDogaXRlbS5sYWJlbCB9XG4gICAgICB9KSksXG4gICAgKVxuICB9XG5cbiAgLyoqXG4gICAqIFBpcGVzIFByb1RleHRQcm9wZXJ0eVxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb1RleHRQcm9wZXJ0eShkOiB7XG4gICAgZmtfcHJvamVjdDogbnVtYmVyLFxuICAgIGZrX3N5c3RlbV90eXBlOiBudW1iZXIsXG4gICAgZmtfbGFuZ3VhZ2U6IG51bWJlcixcbiAgICBma19kZmhfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5PzogbnVtYmVyLFxuICAgIGZrX2RmaF9wcm9wZXJ0eV9kb21haW4/OiBudW1iZXIsXG4gICAgZmtfZGZoX3Byb3BlcnR5X3JhbmdlPzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxQcm9UZXh0UHJvcGVydHk+IHtcbiAgICBjb25zdCBrZXkgPSB0ZXh0UHJvcGVydHlCeUZrc0tleShkKVxuICAgIHJldHVybiB0aGlzLnMucHJvJC50ZXh0X3Byb3BlcnR5JC5ieV9ma3MkLmtleShrZXkpXG4gIH1cblxuICAvKipcbiAgICogUGlwZXMgRGZoTGFiZWxcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVEZmhMYWJlbChkOiB7XG4gICAgdHlwZTogJ2xhYmVsJyB8ICdkZWZpbml0aW9uJyB8ICdzY29wZU5vdGUnLFxuICAgIGxhbmd1YWdlOiBzdHJpbmcsXG4gICAgZmtfY2xhc3M/OiBudW1iZXIsXG4gICAgZmtfcHJvZmlsZT86IG51bWJlcixcbiAgICBma19wcm9wZXJ0eT86IG51bWJlcixcbiAgICBma19wcm9qZWN0PzogbnVtYmVyLFxuICB9KTogT2JzZXJ2YWJsZTxEZmhMYWJlbD4ge1xuICAgIGNvbnN0IGtleSA9IGRmaExhYmVsQnlGa3NLZXkoZClcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQubGFiZWwkLmJ5X2ZrcyQua2V5KGtleSlcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWxpdmVycyBiZXN0IGZpdHRpbmcgZmllbGQgbGFiZWwgZm9yIGFjdGl2ZSBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVGaWVsZExhYmVsKGZrUHJvcGVydHk6IG51bWJlciwgZmtQcm9wZXJ0eURvbWFpbjogbnVtYmVyLCBma1Byb3BlcnR5UmFuZ2U6IG51bWJlcik6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgY29uc3QgaXNPdXRnb2luZyA9ICEhZmtQcm9wZXJ0eURvbWFpbjtcbiAgICAvLyBjb25zdCBzeXN0ZW1fdHlwZSA9IGlzT3V0Z29pbmcgPyAoc2luZ3VsYXIgPyAxODAgOiAxODEpIDogKHNpbmd1bGFyID8gMTgyIDogMTgzKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLmEucGtQcm9qZWN0JCxcbiAgICAgIHRoaXMuYS5waXBlQWN0aXZlRGVmYXVsdExhbmd1YWdlKClcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKFtma1Byb2plY3QsIGxhbmd1YWdlXSkgPT4gdGhpcy5waXBlTGFiZWxzKFxuICAgICAgICB7XG4gICAgICAgICAgZmtQcm9qZWN0LFxuICAgICAgICAgIHR5cGU6ICdsYWJlbCcsXG4gICAgICAgICAgbGFuZ3VhZ2UsXG4gICAgICAgICAgZmtQcm9wZXJ0eSxcbiAgICAgICAgICBma1Byb3BlcnR5RG9tYWluLFxuICAgICAgICAgIGZrUHJvcGVydHlSYW5nZVxuICAgICAgICB9XG4gICAgICApXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChpdGVtcyA9PiB7XG4gICAgICAgICAgICBsZXQgbGFiZWwgPSBgKiBubyBsYWJlbCAoaWQ6ICR7ZmtQcm9wZXJ0eX0pICpgO1xuICAgICAgICAgICAgaXRlbXMuc29tZSgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaXRlbSAmJlxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIGl0ZW0ub3JpZ2luID09PSAnb2YgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIGRlZmF1bHQgcHJvamVjdCBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpdGVtLnRleHRcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIGl0ZW0gJiZcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBwcm9qZWN0IGxhbmcnIHx8XG4gICAgICAgICAgICAgICAgICBpdGVtLm9yaWdpbiA9PT0gJ29mIG9udG9tZSBpbiBlbmdsaXNoJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBpc091dGdvaW5nID8gaXRlbS50ZXh0IDogJyogcmV2ZXJzZSBvZjogJyArIGl0ZW0udGV4dCArICcqJ1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gbGFiZWxcbiAgICAgICAgICB9KVxuICAgICAgICApKVxuICAgIClcblxuICB9XG5cblxuICAvKipcbiAgICogbWFwcyB0aGUgY2xhc3MgdG8gdGhlIGNvcnJlc3BvbmRpbmcgbW9kZWwgKGRhdGFiYXNlIHRhYmxlKVxuICAgKiB0aGlzIGlzIHVzZWQgYnkgRm9ybXMgdG8gY3JlYXRlIG5ldyBkYXRhIGluIHRoZSBzaGFwZSBvZlxuICAgKiB0aGUgZGF0YSBtb2RlbFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVRhYmxlTmFtZU9mQ2xhc3ModGFyZ2V0Q2xhc3NQazogbnVtYmVyKTogT2JzZXJ2YWJsZTxUYWJsZU5hbWU+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChcbiAgICAgIHRoaXMucy5zeXMkLmNvbmZpZyQubWFpbiQsXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleSh0YXJnZXRDbGFzc1BrKVxuICAgICkucGlwZShcbiAgICAgIGZpbHRlcihpID0+ICFpLmluY2x1ZGVzKHVuZGVmaW5lZCkpLFxuICAgICAgbWFwKChbY29uZmlnLCBrbGFzc10pID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3NDb25maWc6IENsYXNzQ29uZmlnID0gY29uZmlnLmNsYXNzZXNbdGFyZ2V0Q2xhc3NQa107XG4gICAgICAgIGlmIChjbGFzc0NvbmZpZyAmJiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpIHtcblxuICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUpXG4gICAgICAgICAgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5hcHBlbGxhdGlvbikgcmV0dXJuXG4gICAgICAgICAgY29uc3Qga2V5ID0ga2V5c1swXTtcbiAgICAgICAgICBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLmFwcGVsbGF0aW9uKSByZXR1cm4gJ2FwcGVsbGF0aW9uJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUubGFuZ3VhZ2UpIHJldHVybiAnbGFuZ3VhZ2UnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5wbGFjZSkgcmV0dXJuICdwbGFjZSc7XG4gICAgICAgICAgZWxzZSBpZiAoY2xhc3NDb25maWcudmFsdWVPYmplY3RUeXBlLnRpbWVQcmltaXRpdmUpIHJldHVybiAndGltZV9wcmltaXRpdmUnO1xuICAgICAgICAgIGVsc2UgaWYgKGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZS5sYW5nU3RyaW5nKSByZXR1cm4gJ2xhbmdfc3RyaW5nJztcbiAgICAgICAgICBlbHNlIGlmIChjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGUuZGltZW5zaW9uKSByZXR1cm4gJ2RpbWVuc2lvbic7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ3Vuc3VwcG9ydGVkIGxpc3QgdHlwZScpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDggfHwga2xhc3MuYmFzaWNfdHlwZSA9PT0gMzApIHtcbiAgICAgICAgICByZXR1cm4gJ3BlcnNpc3RlbnRfaXRlbSdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJ3RlbXBvcmFsX2VudGl0eSdcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuICAgKiB1c2VkIGJ5IHRoZSBnaXZlbiBwcm9qZWN0OlxuICAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIGVuYWJsZWQgYnkgY2xhc3NfcHJval9yZWxcbiAgICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqXG4gICAqIFRoaXMgaXMgdXNlZnVsbCB0byBjcmVhdGUgc2VsZWN0IGRyb3Bkb3ducyBvZiBjbGFzc2VzIHVzZXJzIHdpbGwga25vd1xuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNJbkVudGl0aWVzT3JTb3VyY2VzKCk6IE9ic2VydmFibGU8eyBba2V5OiBzdHJpbmddOiBudW1iZXIgfT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuICAgICAgdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKVxuICAgICkucGlwZShcbiAgICAgIG1hcCgoW2EsIGJdKSA9PiBpbmRleEJ5KCh4KSA9PiB4LnRvU3RyaW5nKCksIHVuaXEoWy4uLmEsIC4uLmJdKSkpLFxuICAgICAgc3RhcnRXaXRoKHt9KVxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWRCeVNvdXJjZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMucy5zeXMkLnN5c3RlbV9yZWxldmFudF9jbGFzcyQuYnlfcmVxdWlyZWRfYnlfc291cmNlcyQua2V5KCd0cnVlJylcbiAgICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4gIH1cblxuICAvKipcbiAgICogcmV0dXJucyBvYnNlcnZhYmxlIG51bWJlcltdIHdoZXIgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICAqIG9mIHRodGUgZ2l2ZW4gcHJvamVjdFxuICAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUNsYXNzZXNFbmFibGVkQnlQcm9qZWN0UHJvZmlsZXMoKTogT2JzZXJ2YWJsZTxEZmhDbGFzc1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQuYWxsJCxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IGtsYXNzLnByb2ZpbGVzLnNvbWUocHJvZmlsZSA9PiBwcm9maWxlc01hcFtwcm9maWxlLmZrX3Byb2ZpbGVdKSlcbiAgICAgIH0pXG4gICAgKVxuICAgICkpXG4gIH1cblxuICAvKipcbiAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlciB0aGUgbnVtYmVycyBhcmUgdGhlIHBrX2NsYXNzXG4gICogb2YgYWxsIHR5cGUgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGF0IGxlYXN0IG9uZSBvZiB0aGUgYWN0aXZhdGVkIHByb2ZpbGVzXG4gICogb2YgdGh0ZSBnaXZlbiBwcm9qZWN0XG4gICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQ2xhc3Nlc0VuYWJsZWRCeVByb2plY3RQcm9maWxlcygpOiBPYnNlcnZhYmxlPERmaENsYXNzW10+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfYmFzaWNfdHlwZSQua2V5KDMwKSxcbiAgICAgIHRoaXMucGlwZVByb2ZpbGVzRW5hYmxlZEJ5UHJvamVjdCgpXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2NsYXNzZXNCeVBrLCBlbmFibGVkUHJvZmlsZXNdKSA9PiB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVzTWFwID0gaW5kZXhCeSgoaykgPT4gay50b1N0cmluZygpLCB2YWx1ZXMoZW5hYmxlZFByb2ZpbGVzKSlcbiAgICAgICAgcmV0dXJuIHZhbHVlcyhjbGFzc2VzQnlQaylcbiAgICAgICAgICAuZmlsdGVyKGtsYXNzID0+IHtcbiAgICAgICAgICAgIHJldHVybiBrbGFzcy5wcm9maWxlcy5zb21lKHByb2ZpbGUgPT4gcHJvZmlsZXNNYXBbcHJvZmlsZS5ma19wcm9maWxlXSkgJiZcbiAgICAgICAgICAgICAgLy8gRXhjbHVkZSBNYW5pZmVzdGF0aW9uIHByb2R1Y3QgdHlwZSBhbmQgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgIVtcbiAgICAgICAgICAgICAgICBEZmhDb25maWcuQ0xBU1NfUEtfTEFOR1VBR0UsXG4gICAgICAgICAgICAgICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFXG4gICAgICAgICAgICAgIF0uaW5jbHVkZXMoa2xhc3MucGtfY2xhc3MpXG4gICAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cblxuXG4gIC8qKlxuICAgKiByZXR1cm5zIG9ic2VydmFibGUgbnVtYmVyW10gd2hlcmUgdGhlIG51bWJlcnMgYXJlIHRoZSBwa19jbGFzc1xuICAgKiBvZiBhbGwgY2xhc3NlcyB0aGF0IGFyZSBlbmFibGVkIGJ5IGFjdGl2ZSBwcm9qZWN0ICh1c2luZyBjbGFzc19wcm9qX3JlbClcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzRW5hYmxlZEluRW50aXRpZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuYS5wa1Byb2plY3QkLnBpcGUoc3dpdGNoTWFwKHBrUHJvamVjdCA9PiB0aGlzLnMucHJvJC5kZmhfY2xhc3NfcHJval9yZWwkLmJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkLmtleShwa1Byb2plY3QgKyAnX3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVscykgPT4gdmFsdWVzKHJlbHMpLm1hcChyZWwgPT4gcmVsLmZrX2NsYXNzKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICogcmV0dXJucyBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBwa3Mgb2YgdGhlIFRlRW4gQ2xhc3Nlc1xuICAqIHVzZWQgYnkgdGhlIGdpdmVuIHByb2plY3RcbiAgKi9cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNlbGVjdGVkVGVFbkNsYXNzZXNJblByb2plY3QoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKCksXG4gICAgICB0aGlzLnBpcGVUZUVuQ2xhc3Nlc1JlcXVpcmVkQnlTb3VyY2VzKClcbiAgICApLnBpcGUoXG4gICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbiAgICAgIHN0YXJ0V2l0aCh7fSlcbiAgICApXG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyBlbmFibGVkIGluIGVudGl0aWVzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpIHtcbiAgICByZXR1cm4gdGhpcy5hLnBrUHJvamVjdCQucGlwZShzd2l0Y2hNYXAocGtQcm9qZWN0ID0+IHRoaXMucy5wcm8kLmRmaF9jbGFzc19wcm9qX3JlbCQuYnlfZmtfcHJvamVjdF9fZW5hYmxlZF9pbl9lbnRpdGllcyQua2V5KHBrUHJvamVjdCArICdfdHJ1ZScpXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChjcykgPT4gY29tYmluZUxhdGVzdChcbiAgICAgICAgICB2YWx1ZXMoY3MpLm1hcChjID0+IHRoaXMucy5kZmgkLmNsYXNzJC5ieV9wa19jbGFzcyQua2V5KGMuZmtfY2xhc3MpLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoaXRlbSA9PiAhIWl0ZW0pXG4gICAgICAgICAgKSlcbiAgICAgICAgKS5waXBlKFxuICAgICAgICAgIG1hcChkZmhDbGFzc2VzID0+IHRoaXMuZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzKSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgICApKVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgYXJyYXkgb2YgRGZoQ2xhc3MgZm9yIFRlRW4gQ2xhc3NlcyBhbmQgcmV0dXJucyBhcnJheSBvZiBwa19jbGFzc1xuICAgKiBAcGFyYW0gZGZoQ2xhc3NlcyBhcnJheSBvZiBEZmhDbGFzc1xuICAgKiBAcmV0dXJucyByZXR1cm5zIGFycmF5IG9mIHBrX2NsYXNzIHdoZXJlIGNsYXNzIGlzIFRlRW4gY2xhc3NcbiAgICovXG4gIHByaXZhdGUgZmlsdGVyVGVFbkNhc3NlcyhkZmhDbGFzc2VzOiBEZmhDbGFzc1tdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHBrczogbnVtYmVyW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRmaENsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGMgPSBkZmhDbGFzc2VzW2ldO1xuICAgICAgaWYgKGMuYmFzaWNfdHlwZSA9PT0gOSkgcGtzLnB1c2goYy5wa19jbGFzcyk7XG4gICAgfVxuICAgIHJldHVybiBwa3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhcnJheSBvZiBwa19jbGFzcyB3aXRoIHRlRW4gY2xhc3NlcyByZXF1aXJlZCBieSBzb3VyY2VzXG4gICAqL1xuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGVFbkNsYXNzZXNSZXF1aXJlZEJ5U291cmNlcygpIHtcbiAgICByZXR1cm4gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoY3MpID0+IGNvbWJpbmVMYXRlc3QoXG4gICAgICAgICAgdmFsdWVzKGNzKS5tYXAoYyA9PiB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShjLmZrX2NsYXNzKS5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKGl0ZW0gPT4gISFpdGVtKVxuICAgICAgICAgICkpXG4gICAgICAgICkucGlwZShcbiAgICAgICAgICBtYXAoZGZoQ2xhc3NlcyA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXJUZUVuQ2Fzc2VzKGRmaENsYXNzZXMpXG4gICAgICAgICAgfSlcbiAgICAgICAgKSlcbiAgICAgIClcbiAgfVxuXG5cblxuXG5cblxuICAvKipcbiAgICpcbiAgICovXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzKGVuYWJsZWRJbj86ICdlbnRpdGllcycgfCAnc291cmNlcycpOiBPYnNlcnZhYmxlPHsgdHlwZWRDbGFzczogbnVtYmVyLCB0eXBlQ2xhc3M6IG51bWJlciB9W10+IHtcblxuICAgIGxldCBwa3MkOiBPYnNlcnZhYmxlPG51bWJlcltdPltdO1xuXG4gICAgY29uc3QgZnJvbVNvdXJjZXMkID0gdGhpcy5zLnN5cyQuc3lzdGVtX3JlbGV2YW50X2NsYXNzJC5ieV9yZXF1aXJlZF9ieV9zb3VyY2VzJC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKGNsYXNzZXMgPT4gdmFsdWVzKGNsYXNzZXMpLm1hcChrID0+IGsuZmtfY2xhc3MpKSxcbiAgICApXG5cbiAgICBjb25zdCBmcm9tRW50aXRpZXMkID0gdGhpcy5waXBlQ2xhc3Nlc0VuYWJsZWRJbkVudGl0aWVzKClcblxuICAgIGlmIChlbmFibGVkSW4gPT09ICdzb3VyY2VzJykge1xuICAgICAgcGtzJCA9IFtmcm9tU291cmNlcyRdO1xuICAgIH0gZWxzZSBpZiAoZW5hYmxlZEluID09PSAnZW50aXRpZXMnKSB7XG4gICAgICBwa3MkID0gW2Zyb21FbnRpdGllcyRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBwa3MkID0gW2Zyb21Tb3VyY2VzJCwgZnJvbUVudGl0aWVzJF1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChwa3MkKS5waXBlKFxuICAgICAgbWFwKGFycmF5T2ZQa0FycmF5cyA9PiB1bmlxKGZsYXR0ZW48bnVtYmVyPihhcnJheU9mUGtBcnJheXMpKSksXG4gICAgICBzd2l0Y2hNYXAocGtzID0+IHRoaXMucGlwZVR5cGVBbmRUeXBlZENsYXNzZXNPZlR5cGVkQ2xhc3Nlcyhwa3MpKVxuICAgIClcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlQW5kVHlwZWRDbGFzc2VzT2ZUeXBlZENsYXNzZXMocGtUeXBlZENsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTx7IHR5cGVkQ2xhc3M6IG51bWJlciwgdHlwZUNsYXNzOiBudW1iZXIgfVtdPiB7XG5cbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgYnlEb21haW4gPSBpbmRleEJ5KGsgPT4gay5oYXNfZG9tYWluLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZWRDbGFzc2VzLm1hcChwayA9PiAoe1xuICAgICAgICAgIHR5cGVkQ2xhc3M6IHBrLFxuICAgICAgICAgIHR5cGVDbGFzczogYnlEb21haW5bcGtdID8gYnlEb21haW5bcGtdLmhhc19yYW5nZSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSlcbiAgICAgIH0pKVxuICB9XG5cbiAgLy8gQHNweVRhZ1xuICBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVR5cGVDbGFzc09mVHlwZWRDbGFzcyhwa1R5cGVkQ2xhc3MpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfaXNfaGFzX3R5cGVfc3VicHJvcGVydHkkLmtleSgndHJ1ZScpLnBpcGUoXG4gICAgICBtYXAoKGFsbEhhc1R5cGVQcm9wcykgPT4ge1xuICAgICAgICBjb25zdCBieURvbWFpbiA9IGluZGV4QnkoayA9PiBrLmhhc19kb21haW4udG9TdHJpbmcoKSwgdmFsdWVzKGFsbEhhc1R5cGVQcm9wcykpO1xuICAgICAgICByZXR1cm4gYnlEb21haW5bcGtUeXBlZENsYXNzXSA/IGJ5RG9tYWluW3BrVHlwZWRDbGFzc10uaGFzX3JhbmdlIDogdW5kZWZpbmVkXG4gICAgICB9KSlcbiAgfVxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlZENsYXNzZXNPZlR5cGVDbGFzc2VzKHBrVHlwZUNsYXNzZXM6IG51bWJlcltdKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuXG4gICAgcmV0dXJuIHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9pc19oYXNfdHlwZV9zdWJwcm9wZXJ0eSQua2V5KCd0cnVlJykucGlwZShcbiAgICAgIG1hcCgoYWxsSGFzVHlwZVByb3BzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ5RG9tYWluID0gaW5kZXhCeShrID0+IGsuaGFzX3JhbmdlLnRvU3RyaW5nKCksIHZhbHVlcyhhbGxIYXNUeXBlUHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIHBrVHlwZUNsYXNzZXMubWFwKHBrID0+IGJ5RG9tYWluW3BrXSA/IGJ5RG9tYWluW3BrXS5oYXNfZG9tYWluIDogdW5kZWZpbmVkKVxuICAgICAgfSkpXG4gIH1cblxuXG4gIC8vIEBzcHlUYWdcbiAgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVUeXBlUHJvcGVydHlPZlR5cGVkQ2xhc3MocGtUeXBlZENsYXNzKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2lzX2hhc190eXBlX3N1YnByb3BlcnR5JC5rZXkoJ3RydWUnKS5waXBlKFxuICAgICAgbWFwKChhbGxIYXNUeXBlUHJvcHMpID0+IHtcbiAgICAgICAgY29uc3QgdHlwZVByb3AgPSB2YWx1ZXMoYWxsSGFzVHlwZVByb3BzKS5maW5kKHAgPT4gcC5oYXNfZG9tYWluID09PSBwa1R5cGVkQ2xhc3MpXG4gICAgICAgIHJldHVybiB0eXBlUHJvcCA/IHR5cGVQcm9wLnBrX3Byb3BlcnR5IDogdW5kZWZpbmVkO1xuICAgICAgfSkpXG4gIH1cblxuICAvLyBAc3B5VGFnXG4gIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlVGFyZ2V0Q2xhc3Nlc09mUHJvcGVydGllcyhwa1Byb3BlcnRpZXM6IG51bWJlcltdLCBpc091dGdvaW5nOiBib29sZWFuKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLnMuZGZoJC5wcm9wZXJ0eSQuYnlfcGtfcHJvcGVydHkkLmFsbCQucGlwZShcbiAgICAgIG1hcCh4ID0+IHtcbiAgICAgICAgaWYgKCFwa1Byb3BlcnRpZXMgfHwgIXBrUHJvcGVydGllcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgICAgICBjb25zdCByZXMgPSBbXVxuICAgICAgICBjb25zdCB0YXJnZXRDbGFzc2VzID0ge307XG4gICAgICAgIHBrUHJvcGVydGllcy5mb3JFYWNoKHBrUHJvcCA9PiB7XG4gICAgICAgICAgY29uc3QgcHJvcHMgPSB2YWx1ZXMoeFtwa1Byb3BdKTtcbiAgICAgICAgICBwcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2xhc3MgPSBpc091dGdvaW5nID8gcHJvcC5oYXNfcmFuZ2UgOiBwcm9wLmhhc19kb21haW47XG4gICAgICAgICAgICBpZiAoIXRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdKSB7XG4gICAgICAgICAgICAgIHRhcmdldENsYXNzZXNbdGFyZ2V0Q2xhc3NdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcmVzLnB1c2godGFyZ2V0Q2xhc3MpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cblxuZnVuY3Rpb24gZ2V0U3ViZmllbGRUeXBlKGNvbmZpZzogU3lzQ29uZmlnVmFsdWUsIGtsYXNzOiBEZmhDbGFzcywgdGFyZ2V0TWF4UXVhbnRpdHk6IG51bWJlcik6IFN1YmZpZWxkVHlwZSB7XG5cbiAgbGV0IGNsYXNzQ29uZmlnOiBDbGFzc0NvbmZpZ1xuICBpZiAoY29uZmlnKSBjbGFzc0NvbmZpZyA9IGNvbmZpZy5jbGFzc2VzW2tsYXNzLnBrX2NsYXNzXTtcbiAgaWYgKGNsYXNzQ29uZmlnICYmIGNsYXNzQ29uZmlnLnZhbHVlT2JqZWN0VHlwZSkge1xuICAgIHJldHVybiBjbGFzc0NvbmZpZy52YWx1ZU9iamVjdFR5cGVcbiAgfVxuXG4gIGVsc2UgaWYgKGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwICYmIHRhcmdldE1heFF1YW50aXR5ID09IDEpIHtcbiAgICByZXR1cm4geyB0eXBlSXRlbTogJ3RydWUnIH1cbiAgfVxuICBlbHNlIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA4IHx8IGtsYXNzLmJhc2ljX3R5cGUgPT09IDMwKSB7XG4gICAgcmV0dXJuIHsgZW50aXR5UHJldmlldzogJ3RydWUnIH1cbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4geyB0ZW1wb3JhbEVudGl0eTogJ3RydWUnIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUhhc0RlZmluaXRpb25Qcm9wZXJ0eShkb21haW5DbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cblxuICBjb25zdCBoYXNEZWZpbml0aW9uOiBEZmhQcm9wZXJ0eSA9IHtcbiAgICBoYXNfZG9tYWluOiBkb21haW5DbGFzcyxcbiAgICBwa19wcm9wZXJ0eTogRGZoQ29uZmlnLlBST1BFUlRZX1BLX1AxOF9IQVNfREVGSU5JVElPTixcbiAgICBoYXNfcmFuZ2U6IDc4NSxcbiAgICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdQMTgnLFxuICAgIGlkZW50aXR5X2RlZmluaW5nOiBmYWxzZSxcbiAgICBpc19pbmhlcml0ZWQ6IHRydWUsXG4gICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuICAgIHByb2ZpbGVzXG4gIH1cbiAgcmV0dXJuIGhhc0RlZmluaXRpb25cbn1cblxuXG5mdW5jdGlvbiBjcmVhdGVBcHBlbGxhdGlvblByb3BlcnR5KHJhbmdlQ2xhc3M6IG51bWJlcikge1xuICBjb25zdCBwcm9maWxlczogUHJvZmlsZXMgPSBbXG4gICAge1xuICAgICAgcmVtb3ZlZF9mcm9tX2FwaTogZmFsc2UsXG4gICAgICBma19wcm9maWxlOiBEZmhDb25maWcuUEtfUFJPRklMRV9HRU9WSVNUT1JZX0JBU0lDXG4gICAgfVxuICBdXG4gIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eSA9IHtcbiAgICBoYXNfZG9tYWluOiBEZmhDb25maWcuQ0xBU1NfUEtfQVBQRUxMQVRJT05fRk9SX0xBTkdVQUdFLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSVNfQVBQRUxMQVRJT05fT0YsXG4gICAgaGFzX3JhbmdlOiByYW5nZUNsYXNzLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWF4X3F1YW50aWZpZXI6IC0xLFxuICAgIGRvbWFpbl9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDAsXG4gICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMSxcbiAgICBpZGVudGlmaWVyX2luX25hbWVzcGFjZTogJ2hpc3RQOScsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IHRydWUsXG4gICAgaXNfaW5oZXJpdGVkOiB0cnVlLFxuICAgIGlzX2hhc190eXBlX3N1YnByb3BlcnR5OiBmYWxzZSxcbiAgICBwcm9maWxlc1xuICB9XG4gIHJldHVybiBoYXNBcHBlUHJvcFxufVxuXG5cblxuZnVuY3Rpb24gY3JlYXRlSGFzVGltZVNwYW5Qcm9wZXJ0eShkb21haW5DbGFzczogbnVtYmVyKSB7XG4gIGNvbnN0IHByb2ZpbGVzOiBQcm9maWxlcyA9IFtcbiAgICB7XG4gICAgICByZW1vdmVkX2Zyb21fYXBpOiBmYWxzZSxcbiAgICAgIGZrX3Byb2ZpbGU6IERmaENvbmZpZy5QS19QUk9GSUxFX0dFT1ZJU1RPUllfQkFTSUNcbiAgICB9XG4gIF1cbiAgY29uc3QgaGFzQXBwZVByb3A6IERmaFByb3BlcnR5ID0ge1xuICAgIGhhc19kb21haW46IGRvbWFpbkNsYXNzLFxuICAgIHBrX3Byb3BlcnR5OiBEZmhDb25maWcuUFJPUEVSVFlfUEtfSEFTX1RJTUVfU1BBTixcbiAgICBoYXNfcmFuZ2U6IERmaENvbmZpZy5DbEFTU19QS19USU1FX1NQQU4sXG4gICAgZG9tYWluX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICBkb21haW5faW5zdGFuY2VzX21pbl9xdWFudGlmaWVyOiAxLFxuICAgIHJhbmdlX2luc3RhbmNlc19tYXhfcXVhbnRpZmllcjogMSxcbiAgICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDAsXG4gICAgaWRlbnRpZmllcl9pbl9uYW1lc3BhY2U6ICdQNCcsXG4gICAgaWRlbnRpdHlfZGVmaW5pbmc6IGZhbHNlLFxuICAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbiAgICBpc19oYXNfdHlwZV9zdWJwcm9wZXJ0eTogZmFsc2UsXG4gICAgcHJvZmlsZXNcbiAgfVxuICByZXR1cm4gaGFzQXBwZVByb3Bcbn1cblxuXG5mdW5jdGlvbiBpc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMoZW5hYmxlZFByb2ZpbGVzOiBudW1iZXJbXSwgcHJvZmlsZXM6IFJlbGF0ZWRQcm9maWxlW10pOiBib29sZWFuIHtcbiAgcmV0dXJuICFwcm9maWxlcy5zb21lKHAgPT4gcC5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSAmJiBlbmFibGVkUHJvZmlsZXMuaW5jbHVkZXMocC5ma19wcm9maWxlKSlcblxufVxuXG5mdW5jdGlvbiBnZXRQbGFjZU9mRGlzcGxheShzcGVjaWFsRmllbGRzOiBTeXNDb25maWdTcGVjaWFsRmllbGRzLCBzdWJmaWVsZDogU3ViZmllbGQsIHByb2plY3RGaWVsZENvbmZpZz86IFByb0NsYXNzRmllbGRDb25maWcpOiBGaWVsZFBsYWNlT2ZEaXNwbGF5IHtcbiAgbGV0IHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXk7XG5cbiAgc2V0dGluZ3MgPSBnZXRTZXR0aW5nc0Zyb21TeXNDb25maWcoc3ViZmllbGQsIHNwZWNpYWxGaWVsZHMsIHNldHRpbmdzKTtcblxuICAvLyBpZiB0aGlzIGlzIGEgc3BlY2lhbCBmaWVsZCwgY3JlYXRlIGNvcnJlc3BvbmRpbmcgZGlzcGxheSBzZXR0aW5ncyBhbmQgcmV0dXJuIGl0XG4gIGlmIChzZXR0aW5ncykge1xuICAgIGlmIChzZXR0aW5ncy5kaXNwbGF5SW5CYXNpY0ZpZWxkcykge1xuICAgICAgcmV0dXJuIHsgYmFzaWNGaWVsZHM6IHsgcG9zaXRpb246IHNldHRpbmdzLmRpc3BsYXlJbkJhc2ljRmllbGRzLnBvc2l0aW9uIH0gfVxuICAgIH0gZWxzZSBpZiAoc2V0dGluZ3MuaGlkZGVuKSB7XG4gICAgICByZXR1cm4geyBoaWRkZW46IHRydWUgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG90aGVyd2lzZSBkaXNwbGF5IHRoZSBmaWVsZCBpbiBzcGVjaWZpYyBmaWVsZHMgKGRlZmF1bHQpXG4gIGxldCBwb3NpdGlvbiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgaWYgKHByb2plY3RGaWVsZENvbmZpZykgcG9zaXRpb24gPSBwcm9qZWN0RmllbGRDb25maWcub3JkX251bVxuICByZXR1cm4geyBzcGVjaWZpY0ZpZWxkczogeyBwb3NpdGlvbiB9IH1cblxufVxuZnVuY3Rpb24gZ2V0U2V0dGluZ3NGcm9tU3lzQ29uZmlnKFxuICBzdWJmaWVsZDogU3ViZmllbGQsIHNwZWNpYWxGaWVsZHM6IFN5c0NvbmZpZ1NwZWNpYWxGaWVsZHMsIHNldHRpbmdzOiBTeXNDb25maWdGaWVsZERpc3BsYXkpIHtcbiAgaWYgKHN1YmZpZWxkLmlzT3V0Z29pbmcpIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgaGFzLXR5cGUtc3VicHJvcGVydHlcbiAgICBpZiAoc3ViZmllbGQuaXNIYXNUeXBlRmllbGQgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaGFzVHlwZVN1YnByb3BlcnRpZXMpIHtcbiAgICAgIHNldHRpbmdzID0gc3BlY2lhbEZpZWxkcy5oYXNUeXBlU3VicHJvcGVydGllcztcbiAgICB9XG4gICAgLy8gZ2V0IHNldHRpbmdzIGJ5IHNvdXJjZSBjbGFzcyBhbmQgcHJvcGVydHlcbiAgICBlbHNlIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10ub3V0Z29pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLm91dGdvaW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5vdXRnb2luZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMub3V0Z29pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICAvLyBnZXQgc2V0dGluZ3MgYnkgc291cmNlIGNsYXNzIGFuZCBwcm9wZXJ0eVxuICAgIGlmIChzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3MgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10gJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuYnlTb3VyY2VDbGFzc1tzdWJmaWVsZC5zb3VyY2VDbGFzc10uaW5jb21pbmdQcm9wZXJ0aWVzICYmXG4gICAgICBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XSkge1xuICAgICAgc2V0dGluZ3MgPSBzcGVjaWFsRmllbGRzLmJ5U291cmNlQ2xhc3Nbc3ViZmllbGQuc291cmNlQ2xhc3NdLmluY29taW5nUHJvcGVydGllc1tzdWJmaWVsZC5wcm9wZXJ0eS5wa1Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gZ2V0IHNlZXRpbmdzIGJ5IHByb3BlcnR5XG4gICAgZWxzZSBpZiAoc3BlY2lhbEZpZWxkcy5pbmNvbWluZ1Byb3BlcnRpZXMgJiZcbiAgICAgIHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldKSB7XG4gICAgICBzZXR0aW5ncyA9IHNwZWNpYWxGaWVsZHMuaW5jb21pbmdQcm9wZXJ0aWVzW3N1YmZpZWxkLnByb3BlcnR5LnBrUHJvcGVydHldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2V0dGluZ3M7XG59XG5cblxuXG5cblxuXG4vKipcbiAqIFBpcGVzIHRoZSBmaWVsZHMgZm9yIHRlbXBvcmFsIGVudGl0eSBmb3Jtc1xuICogLSB0aGUgc3BlY2lmaWMgZmllbGRzXG4gKiAtIHRoZSB3aGVuIGZpZWxkXG4gKiAtIGlmIGF2YWlsYWJsZTogdGhlIHR5cGUgZmllbGRcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZUZpZWxkRGVmaW5pdGlvbnNGb3JUZUVuRm9ybShwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vICAgcmV0dXJuIG9mKFtdKVxuLy8gY29uc3QgaGFzVHlwZUxpc3REZWYkID0gdGhpcy5waXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3MpXG4vLyByZXR1cm4gY29tYmluZUxhdGVzdChcbi8vICAgdGhpcy5waXBlU3BlY2lmaWNGaWVsZERlZmluaXRpb25zKHBrQ2xhc3MpXG4vLyAgICAgLnBpcGUoXG4vLyAgICAgICBtYXAoZmllbGRzID0+IGZpZWxkcy5maWx0ZXIoZiA9PiBmLmFsbFN1YmZpZWxkc1JlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPT09IGZhbHNlKSlcbi8vICAgICApXG4vLyAgICxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gKS5waXBlKFxuLy8gICBtYXAoKFtmaWVsZHMsIGhhc1R5cGVMaXN0RGVmc10pID0+IHtcbi8vICAgICBjb25zdCB3aGVuID0gdGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfV0hFTilcbi8vICAgICByZXR1cm4gW1xuLy8gICAgICAgLi4uZmllbGRzLFxuLy8gICAgICAgd2hlbixcbi8vICAgICAgIC4uLmhhc1R5cGVMaXN0RGVmcy5tYXAoKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgICAgICByZXR1cm4gdHlwZUZpZWxkO1xuLy8gICAgICAgfSlcbi8vICAgICBdXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLyoqXG4gKiBQaXBlIHRoZSBzcGVjaWZpYyBmaWVsZHMgb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVNwZWNpZmljRmllbGREZWZpbml0aW9ucyhwa0NsYXNzOiBudW1iZXIpOiBPYnNlcnZhYmxlPEZpZWxkW10+IHtcbi8vIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICB0aGlzLnBpcGVQcm9wZXJ0aWVzT2ZDbGFzcyhwa0NsYXNzLCB0cnVlKS5waXBlKFxuLy8gICAgIC8vIGZpbHRlciBvdXQgdGhlICdoYXMgdHlwZScgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKG91dGdvaW5nID0+IG91dGdvaW5nLmZpbHRlcihvID0+ICFvLmlzX2hhc190eXBlX3N1YnByb3BlcnR5KSlcbi8vICAgKSxcbi8vICAgdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgZmFsc2UpLnBpcGUoXG4vLyAgICAgLy8gZmlsdGVyIG91dCB0aGUgJ2hhcyBhcHBlbGxhdGlvbicgcHJvcGVydHksIHNpbmNlIGl0IGlzIHBhcnQgb2YgdGhlIGRlZmF1bHQgZmllbGRzXG4vLyAgICAgbWFwKGluZ29pbmcgPT4gaW5nb2luZy5maWx0ZXIoaSA9PlxuLy8gICAgICAgaS5wa19wcm9wZXJ0eSAhPT0gRGZoQ29uZmlnLlBST1BFUlRZX1BLX0lTX0FQUEVMTEFUSU9OX09GXG4vLyAgICAgICAmJiBpLnBrX3Byb3BlcnR5ICE9PSBEZmhDb25maWcuUFJPUEVSVFlfUEtfR0VPVlAxX0lTX1JFUFJPRFVDVElPTl9PRlxuLy8gICAgICkpXG4vLyAgICksXG4vLyAgIHRoaXMucGlwZUZpZWxkQ29uZmlncyhwa0NsYXNzKVxuLy8gKS5waXBlKFxuLy8gICBzd2l0Y2hNYXAoKFtvdXRnb2luZywgaW5nb2luZywgZmllbGRDb25maWdzXSkgPT4ge1xuXG4vLyAgICAgY29uc3Qga2V5ID0gKGZjOiBQYXJ0aWFsPFByb0NsYXNzRmllbGRDb25maWc+KSA9PiBgJHtmYy5ma19wcm9wZXJ0eX1fJHtmYy5ma19kb21haW5fY2xhc3N9XyR7ZmMuZmtfcmFuZ2VfY2xhc3N9YDtcbi8vICAgICBjb25zdCBpbmRleGVkID0gaW5kZXhCeSgoZmMpID0+IGAke2ZjLmZrX3Byb3BlcnR5fV8ke2ZjLmZrX2RvbWFpbl9jbGFzc31fJHtmYy5ma19yYW5nZV9jbGFzc31gLCBmaWVsZENvbmZpZ3MpXG4vLyAgICAgY29uc3QgZ2V0RmllbGRDb25maWcgPSAobGlzdERlZjogU3ViZmllbGQpOiBQcm9DbGFzc0ZpZWxkQ29uZmlnID0+IHtcbi8vICAgICAgIHJldHVybiBpbmRleGVkW2tleSh7XG4vLyAgICAgICAgIGZrX3Byb3BlcnR5OiBsaXN0RGVmLnByb3BlcnR5LnBrUHJvcGVydHksXG4vLyAgICAgICAgIGZrX2RvbWFpbl9jbGFzczogbGlzdERlZi5pc091dGdvaW5nID8gbGlzdERlZi5zb3VyY2VDbGFzcyA6IG51bGwsXG4vLyAgICAgICAgIGZrX3JhbmdlX2NsYXNzOiBsaXN0RGVmLmlzT3V0Z29pbmcgPyBudWxsIDogbGlzdERlZi5zb3VyY2VDbGFzcyxcbi8vICAgICAgIH0pXVxuLy8gICAgIH1cblxuLy8gICAgIC8vIENyZWF0ZSBsaXN0IGRlZmluaXRpb25zXG4vLyAgICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgICAgICB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoaW5nb2luZywgZmFsc2UpLFxuLy8gICAgICAgdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKG91dGdvaW5nLCB0cnVlKVxuLy8gICAgICkucGlwZShcbi8vICAgICAgIG1hcCgoW2luZ29pbmdMaXN0RGVmcywgb3V0Z29pbmdMaXN0RGVmc10pID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZmluaXRpb25zID0gWy4uLmluZ29pbmdMaXN0RGVmcywgLi4ub3V0Z29pbmdMaXN0RGVmc107XG5cbi8vICAgICAgICAgLy8gQ3JlYXRlIGZpZWxkIGRlZmluaXRpb25zXG4vLyAgICAgICAgIGNvbnN0IGZpZWxkRGVmczogeyBba2V5OiBzdHJpbmddOiBGaWVsZCB9ID0ge31cbi8vICAgICAgICAgbGlzdERlZmluaXRpb25zLmZvckVhY2gobGlzdERlZiA9PiB7XG5cbi8vICAgICAgICAgICBjb25zdCBrID0gbGlzdERlZi5wcm9wZXJ0eS5wa1Byb3BlcnR5ICsgJ18nICsgbGlzdERlZi5pc091dGdvaW5nO1xuXG4vLyAgICAgICAgICAgaWYgKCFmaWVsZERlZnNba10pIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXSA9IHtcbi8vICAgICAgICAgICAgICAgLi4ubGlzdERlZixcbi8vICAgICAgICAgICAgICAgcGxhY2VPZkRpc3BsYXk6IHt9LFxuLy8gICAgICAgICAgICAgICBhbGxTdWJmaWVsZHNSZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgICAgICAgICAgICAgZmllbGRDb25maWc6IGdldEZpZWxkQ29uZmlnKGxpc3REZWYpLFxuLy8gICAgICAgICAgICAgICBsaXN0RGVmaW5pdGlvbnM6IFtsaXN0RGVmXSxcbi8vICAgICAgICAgICAgICAgdGFyZ2V0Q2xhc3NlczogW2xpc3REZWYudGFyZ2V0Q2xhc3NdXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGZpZWxkRGVmc1trXS5saXN0RGVmaW5pdGlvbnMucHVzaChsaXN0RGVmKVxuLy8gICAgICAgICAgICAgZmllbGREZWZzW2tdLnRhcmdldENsYXNzZXMucHVzaChsaXN0RGVmLnRhcmdldENsYXNzKVxuLy8gICAgICAgICAgIH1cblxuLy8gICAgICAgICAgIC8vIH1cblxuLy8gICAgICAgICB9KVxuLy8gICAgICAgICAvLyBPcmRlciB0aGUgZmllbGRzIGFjY29yZGluZyB0byBvcmRfbnVtIChmcm9tIHByb2plY3QncyBjb25maWcsIGtsZWlvbGFiJ3MgY29uZmlnKSBvciBwdXQgaXQgYXQgZW5kIG9mIGxpc3QuXG4vLyAgICAgICAgIHJldHVybiBzb3J0KFxuLy8gICAgICAgICAgIChhLCBiKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zdCBnZXRPcmROdW0gPSAoaXRlbTogRmllbGQpID0+IHtcbi8vICAgICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5maWVsZENvbmZpZykgcmV0dXJuIGl0ZW0uZmllbGRDb25maWcub3JkX251bTtcbi8vICAgICAgICAgICAgICAgcmV0dXJuIE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGNvbnN0IG9yZE51bUEgPSBnZXRPcmROdW0oYSk7XG4vLyAgICAgICAgICAgICBjb25zdCBvcmROdW1CID0gZ2V0T3JkTnVtKGIpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIG9yZE51bUEgLSBvcmROdW1CO1xuLy8gICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgdmFsdWVzKGZpZWxkRGVmcykpXG4vLyAgICAgICB9KVxuLy8gICAgIClcbi8vICAgfSlcbi8vIClcbi8vIH1cblxuXG4vKipcbiAqIFBpcGUgdGhlIGZpZWxkcyBmb3IgaWRlbnRpZmljYXRpb24gb2YgZ2l2ZW4gY2xhc3NcbiAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZURlZmF1bHRGaWVsZERlZmluaXRpb25zKHBrQ2xhc3M6IG51bWJlcik6IE9ic2VydmFibGU8RmllbGRbXT4ge1xuXG5cbi8vIC8qKlxuLy8gICogUGlwZSB0aGUgZ2VuZXJpYyBmaWVsZCBoYXMgYXBwZWxsYXRpb25cbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc0FwcGVQcm9wOiBEZmhQcm9wZXJ0eVN0YXR1cyA9IHtcbi8vICAgaGFzX2RvbWFpbjogRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSxcbi8vICAgcGtfcHJvcGVydHk6IERmaENvbmZpZy5QUk9QRVJUWV9QS19JU19BUFBFTExBVElPTl9PRixcbi8vICAgaGFzX3JhbmdlOiBwa0NsYXNzLFxuLy8gICBkb21haW5faW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAtMSxcbi8vICAgZG9tYWluX2luc3RhbmNlc19taW5fcXVhbnRpZmllcjogMCxcbi8vICAgcmFuZ2VfaW5zdGFuY2VzX21heF9xdWFudGlmaWVyOiAxLFxuLy8gICByYW5nZV9pbnN0YW5jZXNfbWluX3F1YW50aWZpZXI6IDEsXG4vLyAgIGlkZW50aWZpZXJfaW5fbmFtZXNwYWNlOiAnaGlzdFA5Jyxcbi8vICAgaWRlbnRpdHlfZGVmaW5pbmc6IHRydWUsXG4vLyAgIGlzX2luaGVyaXRlZDogdHJ1ZSxcbi8vICAgaXNfaGFzX3R5cGVfc3VicHJvcGVydHk6IGZhbHNlLFxuLy8gICByZW1vdmVkRnJvbUFsbFByb2ZpbGVzOiBmYWxzZSxcbi8vICAgcHJvZmlsZXM6IFtdXG4vLyB9XG4vLyBjb25zdCBoYXNBcHBlTGlzdERlZiQgPSB0aGlzLnBpcGVQcm9wZXJ0aWVzVG9TdWJmaWVsZHMoW2hhc0FwcGVQcm9wXSwgZmFsc2UpLnBpcGUoXG4vLyAgIGZpbHRlcihsaXN0RGVmcyA9PiAhIWxpc3REZWZzICYmICEhbGlzdERlZnNbMF0pLFxuLy8gICBtYXAobGlzdERlZnMgPT4gbGlzdERlZnNbMF0pXG4vLyApO1xuXG4vLyAvKipcbi8vICAqIFBpcGUgdGhlIGdlbmVyaWMgZmllbGQgaGFzIHR5cGVcbi8vICAqIHdpdGggdGhlIGdpdmVuIGNsYXNzIGFzIHJhbmdlXG4vLyAgKi9cbi8vIGNvbnN0IGhhc1R5cGVMaXN0RGVmJCA9IHRoaXMucGlwZUhhc1R5cGVTdWJmaWVsZChwa0NsYXNzKVxuLy8gcmV0dXJuIGNvbWJpbmVMYXRlc3QoXG4vLyAgIGhhc0FwcGVMaXN0RGVmJCxcbi8vICAgaGFzVHlwZUxpc3REZWYkLFxuLy8gICB0aGlzLnMuZGZoJC5jbGFzcyQuYnlfcGtfY2xhc3MkLmtleShwa0NsYXNzKS5waXBlKGZpbHRlcihjID0+ICEhYykpXG4vLyApLnBpcGUoXG4vLyAgIG1hcCgoW2hhc0FwcGVMaXN0RGVmLCBoYXNUeXBlTGlzdERlZnMsIGtsYXNzXSkgPT4ge1xuLy8gICAgIGNvbnN0IGZpZWxkczogRmllbGRbXSA9IFtdXG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gICogQWRkICdzaG9ydCB0aXRsZScgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICAqXG4vLyAgICAgLy8gICogTWFuaWZlc3RhdGlvbiBQcm9kdWN0IFR5cGUg4oCTIEYzLCAyMTlcbi8vICAgICAvLyAgKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICAqIEl0ZW0g4oCTIEY1LCAyMjFcbi8vICAgICAvLyAgKiBXZWIgUmVxdWVzdCDigJMgZ2VvdkM0LCA1MDJcbi8vICAgICAvLyAgKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1RdLmluY2x1ZGVzKHBrQ2xhc3MpKSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9TSE9SVF9USVRMRSkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhcyBhcHBlbGxhdGlvbiBmb3IgbGFuZ3VhZ2Ug4oCTIGhpc3RQOScgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgY2xhc3NlcyBleGNlcHQgJ0FwcGVsbGF0aW9uIGZvciBsYW5ndWFnZSDigJMgaGlzdEMxMCcsIDM2NVxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKHBrQ2xhc3MgIT09IERmaENvbmZpZy5DTEFTU19QS19BUFBFTExBVElPTl9GT1JfTEFOR1VBR0UpIHtcbi8vICAgICAvLyAgIGNvbnN0IGFwcGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc0FwcGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNBcHBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgZmllbGRzLnB1c2goYXBwZUZpZWxkKTtcbi8vICAgICAvLyB9XG5cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ2hhc1R5cGUnIGZpZWxkc1xuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKGhhc1R5cGVMaXN0RGVmcyAmJiBoYXNUeXBlTGlzdERlZnMubGVuZ3RoID4gMCkge1xuLy8gICAgIC8vICAgaGFzVHlwZUxpc3REZWZzLmZvckVhY2goKGhhc1R5cGVMaXN0RGVmKSA9PiB7XG4vLyAgICAgLy8gICAgIGNvbnN0IHR5cGVGaWVsZDogRmllbGQgPSB7IC4uLmhhc1R5cGVMaXN0RGVmLCBsaXN0RGVmaW5pdGlvbnM6IFtoYXNUeXBlTGlzdERlZl0gfVxuLy8gICAgIC8vICAgICBmaWVsZHMucHVzaCh0eXBlRmllbGQpO1xuLy8gICAgIC8vICAgfSlcbi8vICAgICAvLyB9XG5cbi8vICAgICAvLyAvKlxuLy8gICAgIC8vICogQWRkICdlbnRpdHkgZGVmaW5pdGlvbicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIGFsbCBjbGFzc2VzIGV4Y2VwdCAnQXBwZWxsYXRpb24gZm9yIGxhbmd1YWdlIOKAkyBoaXN0QzEwJywgMzY1XG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAocGtDbGFzcyAhPT0gRGZoQ29uZmlnLkNMQVNTX1BLX0FQUEVMTEFUSU9OX0ZPUl9MQU5HVUFHRSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT04pKTtcbi8vICAgICAvLyB9XG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnaWRlbnRpZmllciAvIGV4YWN0IHJlZmVyZW5jZSAvIHVybCAvIC4uLicgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIFdlYiBSZXF1ZXN0IOKAkyBnZW92QzQsIDUwMlxuLy8gICAgIC8vICovXG4vLyAgICAgLy8gaWYgKERmaENvbmZpZy5DTEFTU19QS19XRUJfUkVRVUVTVCA9PT0gcGtDbGFzcykge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgLy8gLypcbi8vICAgICAvLyAqIEFkZCAnY29tbWVudCcgdGV4dC1wcm9wZXJ0eSB0b1xuLy8gICAgIC8vICpcbi8vICAgICAvLyAqIE1hbmlmZXN0YXRpb24gUHJvZHVjdCBUeXBlIOKAkyBGMywgMjE5XG4vLyAgICAgLy8gKiBNYW5pZmVzdGF0aW9uIFNpbmdsZXRvbiDigJMgRjQsIDIyMFxuLy8gICAgIC8vICogSXRlbSDigJMgRjUsIDIyMVxuLy8gICAgIC8vICogV2ViIFJlcXVlc3Qg4oCTIGdlb3ZDNCwgNTAyXG4vLyAgICAgLy8gKiBFeHByZXNzaW9uIHBvcnRpb24g4oCTIGdlb3ZDNSwgNTAzXG4vLyAgICAgLy8gKi9cbi8vICAgICAvLyBpZiAoW1xuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fUFJPRFVDVF9UWVBFLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX01BTklGRVNUQVRJT05fU0lOR0xFVE9OLFxuLy8gICAgIC8vICAgRGZoQ29uZmlnLkNMQVNTX1BLX0lURU0sXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfV0VCX1JFUVVFU1QsXG4vLyAgICAgLy8gICBEZmhDb25maWcuQ0xBU1NfUEtfRVhQUkVTU0lPTl9QT1JUSU9OXS5pbmNsdWRlcyhwa0NsYXNzKSkge1xuLy8gICAgIC8vICAgZmllbGRzLnB1c2godGhpcy5nZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCkpO1xuLy8gICAgIC8vIH1cblxuLy8gICAgIC8vIC8qXG4vLyAgICAgLy8gKiBBZGQgJ3RpbWUtc3BhbicgZmllbGQgdG9cbi8vICAgICAvLyAqXG4vLyAgICAgLy8gKiBhbGwgdGVtcG9yYWwgZW50aXR5IGNsYXNzZXNcbi8vICAgICAvLyAqL1xuLy8gICAgIC8vIGlmIChrbGFzcy5iYXNpY190eXBlID09PSA5KSB7XG4vLyAgICAgLy8gICBmaWVsZHMucHVzaCh0aGlzLmdldENsYXNzRmllbGREZWZpbml0aW9uKFN5c0NvbmZpZy5QS19DTEFTU19GSUVMRF9XSEVOKSk7XG4vLyAgICAgLy8gfVxuXG4vLyAgICAgcmV0dXJuIGZpZWxkc1xuXG4vLyAgIH0pXG4vLyApXG4vLyB9XG5cblxuLy8gcHJpdmF0ZSBwaXBlSGFzVHlwZVN1YmZpZWxkKHBrQ2xhc3M6IG51bWJlcikge1xuLy8gICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc09mQ2xhc3MocGtDbGFzcywgdHJ1ZSkucGlwZShcbi8vICAgICAvLyBjaGVjayBpZiB0aGlzIGNsYXNzIGhhcyAnaGFzIHR5cGUnIHN1YnByb3BlcnR5XG4vLyAgICAgbWFwKG91dGdvaW5nID0+IHtcbi8vICAgICAgIHJldHVybiBvdXRnb2luZy5maWx0ZXIoKHByb3ApID0+IHByb3AuaXNfaGFzX3R5cGVfc3VicHJvcGVydHkpO1xuLy8gICAgIH0pLCBzd2l0Y2hNYXAoaGFzVHlwZVByb3BzID0+IGNvbWJpbmVMYXRlc3RPckVtcHR5KGhhc1R5cGVQcm9wcy5tYXAoZGZoUHJvcCA9PiB7XG4vLyAgICAgICByZXR1cm4gdGhpcy5waXBlUHJvcGVydGllc1RvU3ViZmllbGRzKFtkZmhQcm9wXSwgdHJ1ZSkucGlwZShmaWx0ZXIobGlzdERlZnMgPT4gISFsaXN0RGVmcyAmJiAhIWxpc3REZWZzWzBdKSwgbWFwKGxpc3REZWZzID0+IHtcbi8vICAgICAgICAgY29uc3QgbGlzdERlZiA9IGxpc3REZWZzWzBdO1xuLy8gICAgICAgICBsaXN0RGVmLmxpc3RUeXBlID0geyB0eXBlSXRlbTogJ3RydWUnIH07XG4vLyAgICAgICAgIHJldHVybiBsaXN0RGVmO1xuLy8gICAgICAgfSkpO1xuLy8gICAgIH0pKSkpO1xuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkU3ViZmllbGQocGtDbGFzc0ZpZWxkOiBudW1iZXIpOiBTdWJmaWVsZCB7XG4vLyAgIGNvbnN0IHRlbXBsYXRlID0ge1xuLy8gICAgIHByb3BlcnR5OiB7fSxcbi8vICAgICBzb3VyY2VDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZUNsYXNzTGFiZWw6IHVuZGVmaW5lZCxcbi8vICAgICB0YXJnZXRDbGFzczogdW5kZWZpbmVkLFxuLy8gICAgIGlzT3V0Z29pbmc6IHVuZGVmaW5lZCxcbi8vICAgICBpZGVudGl0eURlZmluaW5nRm9yU291cmNlOiB1bmRlZmluZWQsXG4vLyAgICAgaWRlbnRpdHlEZWZpbmluZ0ZvclRhcmdldDogdW5kZWZpbmVkLFxuLy8gICAgIHRhcmdldE1heFF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgdGFyZ2V0TWluUXVhbnRpdHk6IHVuZGVmaW5lZCxcbi8vICAgICBzb3VyY2VNYXhRdWFudGl0eTogdW5kZWZpbmVkLFxuLy8gICAgIHNvdXJjZU1pblF1YW50aXR5OiB1bmRlZmluZWQsXG4vLyAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlczogZmFsc2Vcbi8vICAgfVxuLy8gICBzd2l0Y2ggKHBrQ2xhc3NGaWVsZCkge1xuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX1dIRU46XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6IHsgdGltZVNwYW46ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ1doZW4nLFxuLy8gICAgICAgICBpc091dGdvaW5nOiB0cnVlLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1A0Jyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvNCcsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAxXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRU5USVRZX0RFRklOSVRJT046XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnRGVzY3JpcHRpb24nLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGNhc2UgU3lzQ29uZmlnLlBLX0NMQVNTX0ZJRUxEX0NPTU1FTlQ6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgLy8gZmtDbGFzc0ZpZWxkOiBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfQ09NTUVOVCxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnQ29tbWVudHMnLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfRVhBQ1RfUkVGRVJFTkNFOlxuLy8gICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLi4udGVtcGxhdGUsXG4vLyAgICAgICAgIGxpc3RUeXBlOiAgeyB0ZXh0UHJvcGVydHk6ICd0cnVlJyB9LFxuLy8gICAgICAgICBsYWJlbDogJ0V4YWN0IFJlZmVyZW5jZScsXG4vLyAgICAgICAgIC8vIGZrQ2xhc3NGaWVsZDogcGtDbGFzc0ZpZWxkLFxuLy8gICAgICAgICBvbnRvSW5mb0xhYmVsOiAnUDMnLFxuLy8gICAgICAgICBvbnRvSW5mb1VybDogJ2h0dHBzOi8vb250b21lLmRhdGFmb3JoaXN0b3J5Lm9yZy9wcm9wZXJ0eS8zJyxcbi8vICAgICAgICAgdGFyZ2V0TWF4UXVhbnRpdHk6IC0xXG4vLyAgICAgICB9XG4vLyAgICAgY2FzZSBTeXNDb25maWcuUEtfQ0xBU1NfRklFTERfU0hPUlRfVElUTEU6XG4vLyAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAuLi50ZW1wbGF0ZSxcbi8vICAgICAgICAgbGlzdFR5cGU6ICB7IHRleHRQcm9wZXJ0eTogJ3RydWUnIH0sXG4vLyAgICAgICAgIGxhYmVsOiAnU2hvcnQgVGl0bGUnLFxuLy8gICAgICAgICAvLyBma0NsYXNzRmllbGQ6IHBrQ2xhc3NGaWVsZCxcbi8vICAgICAgICAgb250b0luZm9MYWJlbDogJ1AzJyxcbi8vICAgICAgICAgb250b0luZm9Vcmw6ICdodHRwczovL29udG9tZS5kYXRhZm9yaGlzdG9yeS5vcmcvcHJvcGVydHkvMycsXG4vLyAgICAgICAgIHRhcmdldE1heFF1YW50aXR5OiAtMVxuLy8gICAgICAgfVxuLy8gICAgIGRlZmF1bHQ6XG4vLyAgICAgICBicmVhaztcbi8vICAgfVxuLy8gfVxuXG4vLyBnZXRDbGFzc0ZpZWxkRGVmaW5pdGlvbihwa0NsYXNzRmllbGQ6IG51bWJlcik6IEZpZWxkIHtcbi8vICAgY29uc3QgbGlzdERlZiA9IHRoaXMuZ2V0Q2xhc3NGaWVsZFN1YmZpZWxkKHBrQ2xhc3NGaWVsZClcbi8vICAgcmV0dXJuIHsgLi4ubGlzdERlZiwgbGlzdERlZmluaXRpb25zOiBbbGlzdERlZl0gfVxuLy8gfVxuXG5cbi8vIEBzcHlUYWcgQGNhY2hlKHsgcmVmQ291bnQ6IGZhbHNlIH0pIHBpcGVDbGFzc2VzUmVxdWlyZWQoKSB7XG4vLyAgIHJldHVybiB0aGlzLnMuc3lzJC5zeXN0ZW1fcmVsZXZhbnRfY2xhc3MkLmJ5X3JlcXVpcmVkJC5rZXkoJ3RydWUnKVxuLy8gICAgIC5waXBlKG1hcChjID0+IHZhbHVlcyhjKS5tYXAoayA9PiBrLmZrX2NsYXNzKSkpXG4vLyB9XG5cblxuXG4vLyAvKipcbi8vICAqIFBpcGVzIGFsbCB0aGUgZW5hYmxlZCBwcm9wZXJ0aWVzIG9mIGEgY2xhc3Ncbi8vICAqL1xuLy8gQHNweVRhZyBAY2FjaGUoeyByZWZDb3VudDogZmFsc2UgfSkgcGlwZVByb3BlcnRpZXNPZkNsYXNzKHBrQ2xhc3M6IG51bWJlciwgaXNPdXRnb2luZzogYm9vbGVhbik6IE9ic2VydmFibGU8RGZoUHJvcGVydHlTdGF0dXNbXT4ge1xuXG5cbi8vICAgbGV0ICQ6IE9ic2VydmFibGU8QnlQazxEZmhQcm9wZXJ0eT4+XG4vLyAgIGlmIChpc091dGdvaW5nKSB7XG4vLyAgICAgJCA9IHRoaXMucy5kZmgkLnByb3BlcnR5JC5ieV9oYXNfZG9tYWluJC5rZXkocGtDbGFzcylcbi8vICAgfVxuLy8gICBlbHNlIHtcbi8vICAgICAkID0gdGhpcy5zLmRmaCQucHJvcGVydHkkLmJ5X2hhc19yYW5nZSQua2V5KHBrQ2xhc3MpXG4vLyAgIH1cblxuLy8gICAvLyBmaWx0ZXIgcHJvcGVydGllcyB0aGF0IGFyZSBpbiBhdCBsZWFzdCBvbmUgcHJvZmlsZSBlbmFibGVkIGJ5IHByb2plY3Rcbi8vICAgY29uc3QgcHJvZmlsZXMkID0gdGhpcy5waXBlUHJvZmlsZXNFbmFibGVkQnlQcm9qZWN0KClcblxuXG4vLyAgIC8vIEZpbHRlciBvdXQgb25seSB0aGUgcHJvcGVydGllcyBmb3Igd2hpY2ggdGFyZ2V0IGNsYXNzIGlzIGFsbG93ZWRcbi8vICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoJCwgcHJvZmlsZXMkKVxuLy8gICAgIC5waXBlKFxuLy8gICAgICAgbWFwKChbcHJvcHMsIHByb2ZpbGVzXSkgPT4ge1xuLy8gICAgICAgICBjb25zdCBwOiBEZmhQcm9wZXJ0eVN0YXR1c1tdID0gW11cblxuLy8gICAgICAgICB2YWx1ZXMocHJvcHMpLmZvckVhY2gocHJvcCA9PiB7XG5cblxuLy8gICAgICAgICAgIGNvbnN0IHByb3BQcm9maWxlUmVsID0gcHJvcC5wcm9maWxlcyBhcyBQcm9maWxlc1xuXG4vLyAgICAgICAgICAgbGV0IGVuYWJsZWRJbkFQcm9maWxlID0gZmFsc2U7XG5cbi8vICAgICAgICAgICBsZXQgcmVtb3ZlZEZyb21BbGxQcm9maWxlcyA9IHRydWU7XG5cbi8vICAgICAgICAgICBwcm9wUHJvZmlsZVJlbC5mb3JFYWNoKGl0ZW0gPT4ge1xuLy8gICAgICAgICAgICAgaWYgKHByb2ZpbGVzLmluY2x1ZGVzKGl0ZW0uZmtfcHJvZmlsZSkpIHtcbi8vICAgICAgICAgICAgICAgZW5hYmxlZEluQVByb2ZpbGUgPSB0cnVlO1xuLy8gICAgICAgICAgICAgICBpZiAoaXRlbS5yZW1vdmVkX2Zyb21fYXBpID09PSBmYWxzZSkge1xuLy8gICAgICAgICAgICAgICAgIHJlbW92ZWRGcm9tQWxsUHJvZmlsZXMgPSBmYWxzZVxuLy8gICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgfSlcblxuLy8gICAgICAgICAgIGlmIChlbmFibGVkSW5BUHJvZmlsZSkge1xuLy8gICAgICAgICAgICAgcC5wdXNoKHtcbi8vICAgICAgICAgICAgICAgLi4ucHJvcCxcbi8vICAgICAgICAgICAgICAgcmVtb3ZlZEZyb21BbGxQcm9maWxlc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pXG5cbi8vICAgICAgICAgcmV0dXJuIHBcbi8vICAgICAgIH0pXG4vLyAgICAgKVxuXG4vLyB9XG5cblxuLy8gLyoqXG4vLyAgKiByZXR1cm5zIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIHBrcyBvZiB0aGUgQ2xhc3Nlc1xuLy8gICogdXNlZCBieSB0aGUgZ2l2ZW4gcHJvamVjdFxuLy8gICogLSBvciBiZWNhdXNlIHRoZSBjbGFzcyBpcyBlbmFibGVkIGJ5IGNsYXNzX3Byb2pfcmVsXG4vLyAgKiAtIG9yIGJlY2F1c2UgdGhlIGNsYXNzIGlzIHJlcXVpcmVkIGJ5IHNvdXJjZXMgb3IgYnkgYmFzaWNzXG4vLyAgKlxuLy8gICogdGhpcyBpcyB1c2VmdWxsIHRvIGNoZWNrIGlmIGEgY2xhc3MgaXMgYXZhaWxhYmxlIGF0IGFsbFxuLy8gICovXG4vLyBAc3B5VGFnIEBjYWNoZSh7IHJlZkNvdW50OiBmYWxzZSB9KSBwaXBlQ2xhc3Nlc0luRW50aXRlc09yUmVxdWlyZWQoKTogT2JzZXJ2YWJsZTx7IFtrZXk6IHN0cmluZ106IG51bWJlciB9PiB7XG4vLyAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNFbmFibGVkSW5FbnRpdGllcygpLFxuLy8gICAgIHRoaXMucGlwZUNsYXNzZXNSZXF1aXJlZCgpXG4vLyAgICkucGlwZShcbi8vICAgICBtYXAoKFthLCBiXSkgPT4gaW5kZXhCeSgoeCkgPT4geC50b1N0cmluZygpLCB1bmlxKFsuLi5hLCAuLi5iXSkpKSxcbi8vICAgICBzdGFydFdpdGgoe30pXG4vLyAgIClcbi8vIH1cbiJdfQ==