
import { Injectable } from '@angular/core';
import { DfhConfig, ProConfig, SysConfig } from '@kleiolab/lib-config';
import { dfhLabelByFksKey, proClassFieldConfgByProjectAndClassKey, textPropertyByFksKey } from '@kleiolab/lib-redux';
import { ClassConfig, DfhClass, DfhLabel, DfhProperty, GvSubentitFieldPageReq, GvSubentityFieldTargets, GvSubentityTargetType, GvTargetType, InfLanguage, ProClassFieldConfig, ProTextProperty, RelatedProfile, SysConfigFieldDisplay, SysConfigSpecialFields, SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { flatten, indexBy, uniq, values } from 'ramda';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { Field } from '../models/Field';
import { FieldPlaceOfDisplay } from '../models/FieldPosition';
import { Profiles } from '../models/Profiles';
import { SpecialFieldType } from '../models/SpecialFieldType';
import { Subfield } from '../models/Subfield';
import { ActiveProjectPipesService } from './active-project-pipes.service';
import { PipeCache } from './PipeCache';
import { SchemaSelectorsService } from './schema-selectors.service';


// this is the
export type TableName = 'appellation' | 'language' | 'place' | 'time_primitive' | 'lang_string' | 'dimension' | 'persistent_item' | 'temporal_entity'

export interface DfhPropertyStatus extends DfhProperty {
  // true, if removed from all profiles of the current project
  removedFromAllProfiles: boolean
}

type LabelOrigin = 'of project in project lang' | 'of default project in project lang' | 'of default project in english' | 'of ontome in project lang' | 'of ontome in english'

@Injectable({
  providedIn: 'root'
})
/**
 * This Service provides a collection of pipes that aggregate or transform configuration data.
 * When talking about configuration, we mean the conceptual reference model and the additional
 * configurations on system and project level.
 * For Example
 * - the fields of a class
 * - the labels of classes and properties
 */
export class ConfigurationPipesService extends PipeCache<ConfigurationPipesService> {
  constructor(
    private a: ActiveProjectPipesService,
    private s: SchemaSelectorsService,
  ) { super() }


  /**
  * returns observable number[] wher the numbers are the pk_profile
  * of all profiles that are enabled by the given project.
  * The array will always include PK_PROFILE_GEOVISTORY_BASIC
  */
  // @spyTag
  // @cache({ refCount: false })
  public pipeProfilesEnabledByProject(): Observable<number[]> {
    return this.a.pkProject$.pipe(
      switchMap(pkProject => this.s.pro$.dfh_profile_proj_rel$.by_fk_project__enabled$
        .key(pkProject + '_true').pipe(
          map(projectProfileRels => values(projectProfileRels)
            .filter(rel => rel.enabled)
            .map(rel => rel.fk_profile)
          ),
          map(enabled => [...enabled, DfhConfig.PK_PROFILE_GEOVISTORY_BASIC]),
        )),
      shareReplay()
    )
  }

  /**
   * Pipe all fields of given class
   * The Fields are not ordered and not filtered
   * If you want specific subsets of Fields and/or ordered Fields, use the pipes
   * that build on this pipe.
   */
  public pipeFields(pkClass: number, noNesting = false): Observable<Field[]> {
    const obs$ = combineLatest(
      // pipe source class
      this.s.dfh$.class$.by_pk_class$.key(pkClass),
      // pipe outgoing properties
      this.s.dfh$.property$.by_has_domain$.key(pkClass).pipe(map(indexed => values(indexed))),
      // pipe ingoing properties
      this.s.dfh$.property$.by_has_range$.key(pkClass).pipe(map(indexed => values(indexed))),
      // pipe sys config
      this.s.sys$.config$.main$.pipe(filter(x => !!x)),
      // pipe enabled profiles
      this.pipeProfilesEnabledByProject(),
    ).pipe(
      switchMap(([sourceKlass, outgoingProps, ingoingProps, sysConfig, enabledProfiles]) => {
        const isEnabled = (prop: DfhProperty): boolean => enabledProfiles.some(
          (enabled) => prop.profiles.map(p => p.fk_profile).includes(enabled)
        );
        const outP = outgoingProps.filter((prop) => isEnabled(prop))
        let inP = ingoingProps.filter((prop) => isEnabled(prop))

        if (pkClass === DfhConfig.ClASS_PK_TIME_SPAN) {
          // remove the has time span property
          inP = []

        } else {
          // // if class is not appellation for language, add appellation for language (1111) property
          // if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
          //   ingoingProps.push(createAppellationProperty(pkClass))
          // }

          // if is temporal entity, add has time span property
          if (
            sourceKlass.basic_type !== 8 && sourceKlass.basic_type !== 30
            // sourceKlass.basic_type === 9
          ) {
            outP.push(createHasTimeSpanProperty(pkClass))
          }

          outP.push(createHasDefinitionProperty(pkClass))
        }
        return combineLatest(
          this.pipePropertiesToSubfields(outP, true, enabledProfiles, sysConfig, noNesting),
          this.pipePropertiesToSubfields(inP, false, enabledProfiles, sysConfig, noNesting),
          this.pipeFieldConfigs(pkClass)
        ).pipe(
          map(([subfields1, subfields2, fieldConfigs]) => {
            const subfields = [...subfields1, ...subfields2]

            const fieldConfigIdx = indexBy((x) => [
              (x.fk_domain_class || x.fk_range_class),
              x.fk_property,
              !!x.fk_domain_class
            ].join('_'), fieldConfigs)

            const uniqFields: { [uid: string]: Field } = {}
            const uniqSubfieldCache: { [uid: string]: true } = {}


            // group by source, pkProperty and isOutgoing
            for (const s of subfields) {
              const fieldId = [s.sourceClass, s.property.fkProperty, s.isOutgoing].join('_')
              const subfieldId = [s.sourceClass, s.property.fkProperty, s.isOutgoing, s.targetClass].join('_')
              const fieldConfig: ProClassFieldConfig | undefined = fieldConfigIdx[fieldId];
              // the first time the group is established
              if (!uniqFields[fieldId]) {
                let isSpecialField: SpecialFieldType = false;
                if (s.isHasTypeField) isSpecialField = 'has-type';
                // else if (s.property.fkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN) isSpecialField = 'time-span';
                else if (s.targetClass === DfhConfig.ClASS_PK_TIME_SPAN) isSpecialField = 'time-span';
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
                }

                // mark subfield as added
                uniqSubfieldCache[subfieldId] = true;


              }
              // ignore duplications of subfields
              else if (!uniqSubfieldCache[subfieldId]) {
                uniqFields[fieldId].allSubfieldsRemovedFromAllProfiles === false ?
                  uniqFields[fieldId].allSubfieldsRemovedFromAllProfiles = false :
                  uniqFields[fieldId].allSubfieldsRemovedFromAllProfiles = s.removedFromAllProfiles;
                uniqFields[fieldId].targetClasses.push(s.targetClass)
                uniqFields[fieldId].targets[s.targetClass] = {
                  listType: s.listType,
                  removedFromAllProfiles: s.removedFromAllProfiles,
                  targetClass: s.targetClass,
                  targetClassLabel: s.targetClassLabel
                }
              }
            }

            return values(uniqFields)
          })
        )
      })
    )
    return this.cache('pipeFields', obs$, ...arguments)
  }



  /**
   * pipe all the specific fields of a class,
   * ordered by the position of the field within the specific fields
   */
  // @spyTag
  // @cache({ refCount: false })
  public pipeSpecificFieldOfClass(pkClass: number, noNesting = false): Observable<Field[]> {

    const obs$ = this.pipeFields(pkClass, noNesting).pipe(
      map(fields => fields
        // filter fields that are displayd in specific fields
        .filter(field => field.placeOfDisplay.specificFields)
        // sort fields by the position defined in the specific fields
        .sort((a, b) => a.placeOfDisplay.specificFields.position - b.placeOfDisplay.specificFields.position)
      )
    )
    return this.cache('pipeSpecificFieldOfClass', obs$, ...arguments)

  }

  /**
    * pipe all the basic fields of a class,
    * ordered by the position of the field within the basic fields
    */
  // @spyTag
  // @cache({ refCount: false })
  public pipeBasicFieldsOfClass(pkClass: number, noNesting = false): Observable<Field[]> {
    const obs$ = this.pipeFields(pkClass, noNesting).pipe(
      map(fields => fields
        // filter fields that are displayd in basic fields
        .filter(field => field.placeOfDisplay.basicFields)
        // sort fields by the position defined in the basic fields
        .sort((a, b) => a.placeOfDisplay.basicFields.position - b.placeOfDisplay.basicFields.position)
      )
    )
    return this.cache('pipeBasicFieldsOfClass', obs$, ...arguments)
  }




  /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     */
  // @spyTag
  // @cache({ refCount: false })
  public pipeFieldsForTeEnForm(pkClass: number, noNesting = false): Observable<Field[]> {
    const obs$ = this.pipeFields(pkClass, noNesting).pipe(
      // filter fields that are displayd in specific fields
      map(allFields => {
        const fields = allFields
          // filter fields that are displayd in specific fields and not removed from all profiles
          .filter(field => (field.placeOfDisplay.specificFields && field.allSubfieldsRemovedFromAllProfiles === false))
          // sort fields by the position defined in the specific fields
          .sort((a, b) => a.placeOfDisplay.specificFields.position - a.placeOfDisplay.specificFields.position)

        const whenField = allFields.find(field => field.property.fkProperty === DfhConfig.PROPERTY_PK_HAS_TIME_SPAN)
        if (whenField) fields.push(whenField)

        const typeField = allFields.find(field => field.isHasTypeField)
        if (typeField) fields.push(typeField)

        return fields;
      })
    )
    return this.cache('pipeFieldsForTeEnForm', obs$, ...arguments)

  }






  /**
   * Pipes the fields of given class in this order:
   * - basic fields
   * - specific fields
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeBasicAndSpecificFields(pkClass: number, noNesting = false): Observable<Field[]> {
    const obs$ = combineLatest(
      this.pipeBasicFieldsOfClass(pkClass, noNesting),
      this.pipeSpecificFieldOfClass(pkClass, noNesting)
    )
      .pipe(
        map(([a, b]) => [...a, ...b])
      )
    return this.cache('pipeBasicAndSpecificFields', obs$, ...arguments)

  }

  /**
  * Pipes the fields of given class in this order:
  * - specific fields
  * - basic fields
  */
  // @spyTag
  // @cache({ refCount: false })
  pipeSpecificAndBasicFields(pkClass: number, noNesting = false): Observable<Field[]> {
    const obs$ = combineLatest(
      this.pipeSpecificFieldOfClass(pkClass, noNesting),
      this.pipeBasicFieldsOfClass(pkClass, noNesting),
    )
      .pipe(
        map(([a, b]) => [...a, ...b])
      )
    return this.cache('pipeSpecificAndBasicFields', obs$, ...arguments)
  }


  // @cache({ refCount: false })
  pipePropertiesToSubfields(
    properties: DfhProperty[],
    isOutgoing: boolean,
    enabledProfiles: number[],
    sysConfig: SysConfigValue,
    noNesting = false
  ): Observable<Subfield[]> {
    const obs$ = combineLatestOrEmpty(
      properties.map(p => {
        return this.pipeSubfield(isOutgoing, p, sysConfig, enabledProfiles, noNesting);
      })
    )
    return this.cache('pipePropertiesToSubfields', obs$, ...arguments)

  }


  // @cache({ refCount: false })
  pipeSubfieldIdToSubfield(sourceClass: number, property: number, targetClass: number, isOutgoing: boolean, noNesting = false): Observable<Subfield> {
    const domain = isOutgoing ? sourceClass : targetClass;
    const range = isOutgoing ? targetClass : sourceClass;
    const obs$ = combineLatest(
      this.s.dfh$.property$.pk_property__has_domain__has_range$.key([property, domain, range].join('_'))
        .pipe(filter(x => {
          return !!x
        })),
      this.s.sys$.config$.main$.pipe(filter(x => {
        return !!x
      })),
      this.pipeProfilesEnabledByProject().pipe(filter(x => {
        return !!x
      })),
    ).pipe(
      switchMap(([dfhProp, sysConf, enabledProfiles]) => this.pipeSubfield(
        isOutgoing,
        dfhProp,
        sysConf,
        enabledProfiles,
        noNesting
      ))
    )
    return this.cache('pipeSubfieldIdToSubfield', obs$, ...arguments)

  }


  private pipeSubfield(
    isOutgoing: boolean,
    p: DfhProperty,
    sysConfig: SysConfigValue,
    enabledProfiles: number[],
    noNesting = false
  ): Observable<Subfield> {
    const o = isOutgoing;
    const targetClass = o ? p.has_range : p.has_domain;
    const sourceClass = o ? p.has_domain : p.has_range;
    const targetMaxQuantity = o ?
      p.range_instances_max_quantifier :
      p.domain_instances_max_quantifier;
    const sourceMaxQuantity = o ?
      p.domain_instances_max_quantifier :
      p.range_instances_max_quantifier;
    const targetMinQuantity = o ?
      p.range_instances_min_quantifier :
      p.domain_instances_min_quantifier;
    const sourceMinQuantity = o ?
      p.domain_instances_min_quantifier :
      p.range_instances_min_quantifier;

    // console.log('pppp wanted: ', [sourceClass, p.pk_property, targetClass, isOutgoing])

    return combineLatest(
      this.pipeClassLabel(sourceClass).pipe(tap(x => {
        // console.log('pppp found sourceClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])

        return x
      })),
      this.pipeClassLabel(targetClass).pipe(tap(x => {
        // console.log('pppp found targetClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])

        return x
      })),
      this.pipeSubfieldTypeOfClass(sysConfig, targetClass, targetMaxQuantity, p.pk_property, noNesting).pipe(tap(x => {
        // console.log('pppp found subfieldType: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
        return x
      })),
      this.pipeFieldLabel(p.pk_property, isOutgoing ? p.has_domain : null, isOutgoing ? null : p.has_range).pipe(tap(x => {
        // console.log('pppp found fieldLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing])
        return x
      })),
    )
      .pipe(map(([sourceClassLabel, targetClassLabel, listType, label]
      ) => {

        // console.log('pppp found: ', [sourceClass, p.pk_property, targetClass, isOutgoing])

        const node: Subfield = {
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
          property: { fkProperty: p.pk_property },
          isOutgoing: o,
          identityDefiningForSource: o ? p.identity_defining : false,
          identityDefiningForTarget: o ? false : p.identity_defining,
          ontoInfoLabel: p.identifier_in_namespace,
          ontoInfoUrl: 'https://ontome.dataforhistory.org/property/' + p.pk_property,
          removedFromAllProfiles: isRemovedFromAllProfiles(enabledProfiles, (p.profiles || [])),
        };
        return node;
      }));
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
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeSubfieldTypeOfClass(config: SysConfigValue, pkClass: number, targetMaxQuantity: number, parentProperty?: number, noNesting = false): Observable<GvTargetType> {
    const obs$ = this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(
      filter(i => !!i),
      switchMap((klass) => this.pipeSubfieldType(config, klass, targetMaxQuantity, parentProperty, noNesting))
    )
    return this.cache('pipeSubfieldTypeOfClass', obs$, ...arguments)

  }


  pipeSubfieldType(config: SysConfigValue, klass: DfhClass, targetMaxQuantity: number, parentProperty?: number, noNesting = false): Observable<GvTargetType> {

    const res = (x: GvTargetType) => new BehaviorSubject(x)
    let classConfig: ClassConfig
    if (config) classConfig = config.classes[klass.pk_class];
    if (classConfig && classConfig.valueObjectType) {
      return res(classConfig.valueObjectType)
    }


    else if (klass.basic_type === 30 && targetMaxQuantity == 1) {
      return res({ typeItem: 'true' })
    }
    // TODO add this to sysConfigValue
    else if (klass.pk_class === DfhConfig.ClASS_PK_TIME_SPAN) {
      return res({ timeSpan: 'true' })
    }
    else if (klass.basic_type === 8 || klass.basic_type === 30 || noNesting) {
      return res({ entityPreview: 'true' })
    }
    else {
      // pipe the subfields of the temporalEntity class
      const noNest = true;
      return this.pipeSpecificAndBasicFields(klass.pk_class, noNest).pipe(
        map(fields => {
          const subentitySubfieldPage: GvSubentitFieldPageReq[] = []
          for (const field of fields) {
            // for each of these subfields
            // create page:GvSubfieldPage

            const nestedTargets: GvSubentityFieldTargets = {};
            for (const key in field.targets) {
              if (Object.prototype.hasOwnProperty.call(field.targets, key)) {
                const listType = field.targets[key].listType;
                // put temporalEntity to entityPreview
                const subTargetType: GvSubentityTargetType = listType.temporalEntity ?
                  { entityPreview: 'true' } :
                  listType
                nestedTargets[key] = subTargetType
              }
            }
            let isCircular = false;
            if (
              parentProperty &&
              field.property.fkProperty == parentProperty &&
              field.targetMaxQuantity === 1
            ) {
              isCircular = true
            }
            const nestedPage: GvSubentitFieldPageReq = {
              targets: nestedTargets,
              page: {
                property: field.property,
                isOutgoing: field.isOutgoing,
                limit: 1,
                offset: 0,
                isCircular
              }
            }
            subentitySubfieldPage.push(nestedPage)
          }
          return { temporalEntity: subentitySubfieldPage }
        }),

      )
    }
  }


  /**
   * Gets class field configs of given pkClass
   *
   * - of active project, if any, else
   * - of default config project, else
   * - empty array
   *
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeFieldConfigs(pkClass: number): Observable<ProClassFieldConfig[]> {
    const obs$ = this.a.pkProject$.pipe(
      switchMap((fkProject) => {

        const activeProjectkey = proClassFieldConfgByProjectAndClassKey({
          fk_class_for_class_field: pkClass,
          fk_project: fkProject
        })
        const defaultProjectkey = proClassFieldConfgByProjectAndClassKey({
          fk_class_for_class_field: pkClass,
          fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT
        })
        return combineLatest(
          this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(activeProjectkey),
          this.s.pro$.class_field_config$.by_fk_project__fk_class$.key(defaultProjectkey)
        )
          .pipe(
            map(([activeProjectFields, defaultProjectFields]) => {
              if (activeProjectFields && values(activeProjectFields).length) return activeProjectFields;

              return defaultProjectFields
            }),
            map((items) => values(items).sort((a, b) => (a.ord_num > b.ord_num ? 1 : -1))),
          )
      })
    )
    return this.cache('pipeFieldConfigs', obs$, ...arguments)

  }

  /********************************************** */


  /**
   * Delivers class label for active project
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeClassLabel(pkClass?: number): Observable<string> {
    const obs$ = combineLatest(
      this.a.pkProject$,
      this.a.pipeActiveDefaultLanguage()
    ).pipe(
      switchMap(([fkProject, language]) => this.pipeLabels({ pkClass, fkProject, language, type: 'label' })
        .pipe(
          map(items => {

            const i = items.find(item => !!item)
            return i ? i.text : `* no label (id: ${pkClass}) *`
          })
        ))
    )
    return this.cache('pipeClassLabel', obs$, ...arguments)
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
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeLabels(d: {
    fkProject: number,
    type: 'label' | 'definition' | 'scopeNote',
    language: InfLanguage,
    pkClass?: number,
    fkProperty?: number,
    fkPropertyDomain?: number,
    fkPropertyRange?: number,
  }): Observable<{
    origin: LabelOrigin
    text: string
  }[]> {
    let fk_system_type: number;

    if (d.pkClass) {
      switch (d.type) {
        case 'label':
          fk_system_type = SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL
          break;
        default:
          console.warn('fk_system_type not found')
          break;
      }
    }
    else if (d.fkProperty) {
      switch (d.type) {
        case 'label':
          fk_system_type = SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL
          break;
        default:
          console.warn('fk_system_type not found')
          break;
      }
    }


    const obs$ = combineLatest(
      // label of project in default language of project
      this.pipeProTextProperty({
        fk_project: d.fkProject,
        fk_language: d.language.pk_entity,
        fk_system_type,
        fk_dfh_class: d.pkClass,
        fk_dfh_property: d.fkProperty,
        fk_dfh_property_domain: d.fkPropertyDomain,
        fk_dfh_property_range: d.fkPropertyRange
      }).pipe(map((item) => {
        if (!item) return undefined;
        const origin: LabelOrigin = 'of project in project lang';
        return { origin, text: item.string }
      })),

      // label of default project
      this.pipeProTextProperty({
        fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
        fk_language: d.language.pk_entity,
        fk_system_type,
        fk_dfh_class: d.pkClass,
        fk_dfh_property: d.fkProperty,
        fk_dfh_property_domain: d.fkPropertyDomain,
        fk_dfh_property_range: d.fkPropertyRange
      }).pipe(map((item) => {
        if (!item) return undefined;
        const origin: LabelOrigin = 'of default project in project lang';
        return { origin, text: item.string }
      })),

      // label of default project
      this.pipeProTextProperty({
        fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
        fk_language: 18889,
        fk_system_type,
        fk_dfh_class: d.pkClass,
        fk_dfh_property: d.fkProperty,
        fk_dfh_property_domain: d.fkPropertyDomain,
        fk_dfh_property_range: d.fkPropertyRange
      }).pipe(map((item) => {
        if (!item) return undefined;
        const origin: LabelOrigin = 'of default project in english';
        return { origin, text: item.string }
      })),

      // label from ontome in default language of project
      this.pipeDfhLabel({
        language: d.language.iso6391.trim(),
        type: 'label',
        fk_class: d.pkClass,
        fk_property: d.fkProperty
      }).pipe(map((item) => {
        if (!item) return undefined;
        const origin: LabelOrigin = 'of ontome in project lang';
        return { origin, text: item.label }
      })),

      // label from ontome in english
      this.pipeDfhLabel({
        language: 'en',
        type: 'label',
        fk_class: d.pkClass,
        fk_property: d.fkProperty
      }).pipe(map((item) => {
        if (!item) return undefined;
        const origin: LabelOrigin = 'of ontome in english';
        return { origin, text: item.label }
      })),
    )
    return this.cache('pipeLabels', obs$, ...arguments)

  }

  /**
   * Pipes ProTextProperty
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeProTextProperty(d: {
    fk_project: number,
    fk_system_type: number,
    fk_language: number,
    fk_dfh_class?: number,
    fk_dfh_property?: number,
    fk_dfh_property_domain?: number,
    fk_dfh_property_range?: number,
  }): Observable<ProTextProperty> {
    const key = textPropertyByFksKey(d)
    return this.s.pro$.text_property$.by_fks$.key(key)
  }

  /**
   * Pipes DfhLabel
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeDfhLabel(d: {
    type: 'label' | 'definition' | 'scopeNote',
    language: string,
    fk_class?: number,
    fk_profile?: number,
    fk_property?: number,
    fk_project?: number,
  }): Observable<DfhLabel> {
    const key = dfhLabelByFksKey(d)
    return this.s.dfh$.label$.by_fks$.key(key)
  }

  /**
   * Delivers best fitting field label for active project
  */
  // @spyTag
  // @cache({ refCount: false })
  pipeFieldLabel(fkProperty: number, fkPropertyDomain: number, fkPropertyRange: number): Observable<string> {
    const isOutgoing = !!fkPropertyDomain;
    // const system_type = isOutgoing ? (singular ? 180 : 181) : (singular ? 182 : 183)

    const obs$ = combineLatest(
      this.a.pkProject$,
      this.a.pipeActiveDefaultLanguage()
    ).pipe(
      switchMap(([fkProject, language]) => this.pipeLabels(
        {
          fkProject,
          type: 'label',
          language,
          fkProperty,
          fkPropertyDomain,
          fkPropertyRange
        }
      )
        .pipe(
          map(items => {
            let label = `* no label (id: ${fkProperty}) *`;
            items.some((item) => {
              if (
                item &&
                (
                  item.origin === 'of project in project lang' ||
                  item.origin === 'of default project in project lang' ||
                  item.origin === 'of default project in english'
                )
              ) {
                label = item.text
                return true
              }
              else if (
                item &&
                (
                  item.origin === 'of ontome in project lang' ||
                  item.origin === 'of ontome in english'
                )
              ) {
                label = isOutgoing ? item.text : '* reverse of: ' + item.text + '*'
                return true
              }
            })
            return label
          })
        ))
    )
    return this.cache('pipeFieldLabel', obs$, ...arguments)

  }


  /**
   * maps the class to the corresponding model (database table)
   * this is used by Forms to create new data in the shape of
   * the data model
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeTableNameOfClass(targetClassPk: number): Observable<TableName> {
    const obs$ = combineLatest(
      this.s.sys$.config$.main$,
      this.s.dfh$.class$.by_pk_class$.key(targetClassPk)
    ).pipe(
      filter(i => !i.includes(undefined)),
      map(([config, klass]) => {
        const classConfig: ClassConfig = config.classes[targetClassPk];
        if (classConfig && classConfig.valueObjectType) {

          const keys = Object.keys(classConfig.valueObjectType)
          if (classConfig.valueObjectType.appellation) return
          const key = keys[0];
          if (classConfig.valueObjectType.appellation) return 'appellation';
          else if (classConfig.valueObjectType.language) return 'language';
          else if (classConfig.valueObjectType.place) return 'place';
          else if (classConfig.valueObjectType.timePrimitive) return 'time_primitive';
          else if (classConfig.valueObjectType.langString) return 'lang_string';
          else if (classConfig.valueObjectType.dimension) return 'dimension';
          else {
            console.warn('unsupported list type')
          }
        }
        else if (klass.basic_type === 8 || klass.basic_type === 30) {
          return 'persistent_item'
        }
        else {
          return 'temporal_entity'
        }
      })
    )
    return this.cache('pipeTableNameOfClass', obs$, ...arguments)

  }


  /**
   * returns an object where the keys are the pks of the Classes
   * used by the given project:
   * - or because the class is enabled by class_proj_rel
   * - or because the class is required by sources
   *
   * This is usefull to create select dropdowns of classes users will know
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeClassesInEntitiesOrSources(): Observable<{ [key: string]: number }> {
    const obs$ = combineLatest(
      this.pipeClassesEnabledInEntities(),
      this.pipeClassesRequiredBySources()
    ).pipe(
      map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
      startWith({})
    )
    return this.cache('pipeClassesInEntitiesOrSources', obs$, ...arguments)

  }

  // @spyTag
  // @cache({ refCount: false })
  pipeClassesRequiredBySources() {
    const obs$ = this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
      .pipe(map(c => values(c).map(k => k.fk_class)))
    return this.cache('pipeClassesRequiredBySources', obs$, ...arguments)
  }

  /**
   * returns observable number[] wher the numbers are the pk_class
   * of all classes that are enabled by at least one of the activated profiles
   * of thte given project
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeClassesEnabledByProjectProfiles(): Observable<DfhClass[]> {
    const obs$ = this.a.pkProject$.pipe(switchMap(pkProject => combineLatest([
      this.s.dfh$.class$.by_pk_class$.all$,
      this.pipeProfilesEnabledByProject()
    ]).pipe(
      map(([classesByPk, enabledProfiles]) => {
        const profilesMap = indexBy((k) => k.toString(), values(enabledProfiles))
        return values(classesByPk)
          .filter(klass => klass.profiles.some(profile => profilesMap[profile.fk_profile]))
      })
    )
    ))
    return this.cache('pipeClassesEnabledByProjectProfiles', obs$, ...arguments)

  }

  /**
  * returns observable number[] wher the numbers are the pk_class
  * of all type classes that are enabled by at least one of the activated profiles
  * of thte given project
  */
  // @spyTag
  // @cache({ refCount: false })
  pipeTypeClassesEnabledByProjectProfiles(): Observable<DfhClass[]> {
    const obs$ = combineLatest([
      this.s.dfh$.class$.by_basic_type$.key(30),
      this.pipeProfilesEnabledByProject()
    ]).pipe(
      map(([classesByPk, enabledProfiles]) => {
        const profilesMap = indexBy((k) => k.toString(), values(enabledProfiles))
        return values(classesByPk)
          .filter(klass => {
            return klass.profiles.some(profile => profilesMap[profile.fk_profile]) &&
              // Exclude Manifestation product type and language
              ![
                DfhConfig.CLASS_PK_LANGUAGE,
                DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE
              ].includes(klass.pk_class)
          })
      })
    )
    return this.cache('pipeTypeClassesEnabledByProjectProfiles', obs$, ...arguments)

  }

  /**
   * returns observable number[] where the numbers are the pk_class
   * of all classes that are enabled by active project (using class_proj_rel)
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeClassesEnabledInEntities() {
    const obs$ = this.a.pkProject$.pipe(
      switchMap(pkProject => this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
        .pipe(
          map((rels) => values(rels).map(rel => rel.fk_class))
        )
      ))
    return this.cache('pipeClassesEnabledInEntities', obs$, ...arguments)
  }



  /**
  * returns an object where the keys are the pks of the TeEn Classes
  * used by the given project
  */
  // @spyTag
  // @cache({ refCount: false })
  pipeSelectedTeEnClassesInProject(): Observable<{ [key: string]: number }> {
    const obs$ = combineLatest(
      this.pipeTeEnClassesEnabledInEntities(),
      this.pipeTeEnClassesRequiredBySources()
    ).pipe(
      map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
      startWith({})
    )
    return this.cache('pipeSelectedTeEnClassesInProject', obs$, ...arguments)
  }

  /**
   * Gets array of pk_class with teEn classes enabled in entities
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeTeEnClassesEnabledInEntities() {
    const obs$ = this.a.pkProject$.pipe(
      switchMap(pkProject => this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
        .pipe(
          switchMap((cs) => combineLatest(
            values(cs).map(c => this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(
              filter(item => !!item)
            ))
          ).pipe(
            map(dfhClasses => this.filterTeEnCasses(dfhClasses))
          ))
        )
      ))
    return this.cache('pipeTeEnClassesEnabledInEntities', obs$, ...arguments)

  }

  /**
   * Filters array of DfhClass for TeEn Classes and returns array of pk_class
   * @param dfhClasses array of DfhClass
   * @returns returns array of pk_class where class is TeEn class
   */
  private filterTeEnCasses(dfhClasses: DfhClass[]): number[] {
    const pks: number[] = [];
    for (let i = 0; i < dfhClasses.length; i++) {
      const c = dfhClasses[i];
      if (c.basic_type === 9) pks.push(c.pk_class);
    }
    return pks;
  }

  /**
   * Gets array of pk_class with teEn classes required by sources
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeTeEnClassesRequiredBySources() {
    const obs$ = this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
      .pipe(
        switchMap((cs) => combineLatest(
          values(cs).map(c => this.s.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(
            filter(item => !!item)
          ))
        ).pipe(
          map(dfhClasses => {
            return this.filterTeEnCasses(dfhClasses)
          })
        ))
      )
    return this.cache('pipeTeEnClassesRequiredBySources', obs$, ...arguments)

  }






  /**
   *
   */
  // @spyTag
  // @cache({ refCount: false })
  pipeTypeAndTypedClasses(enabledIn?: 'entities' | 'sources'): Observable<{ typedClass: number, typeClass: number }[]> {

    let pks$: Observable<number[]>[];

    const fromSources$ = this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true').pipe(
      map(classes => values(classes).map(k => k.fk_class)),
    )

    const fromEntities$ = this.pipeClassesEnabledInEntities()

    if (enabledIn === 'sources') {
      pks$ = [fromSources$];
    } else if (enabledIn === 'entities') {
      pks$ = [fromEntities$];
    } else {
      pks$ = [fromSources$, fromEntities$]
    }

    const obs$ = combineLatest(pks$).pipe(
      map(arrayOfPkArrays => uniq(flatten<number>(arrayOfPkArrays))),
      switchMap(pks => this.pipeTypeAndTypedClassesOfTypedClasses(pks))
    )
    return this.cache('pipeTypeAndTypedClasses', obs$, ...arguments)

  }

  // @spyTag
  // @cache({ refCount: false })
  pipeTypeAndTypedClassesOfTypedClasses(pkTypedClasses: number[]): Observable<{ typedClass: number, typeClass: number }[]> {

    const obs$ = this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(
      map((allHasTypeProps) => {
        const byDomain = indexBy(k => k.has_domain.toString(), values(allHasTypeProps));
        return pkTypedClasses.map(pk => ({
          typedClass: pk,
          typeClass: byDomain[pk] ? byDomain[pk].has_range : undefined
        }))
      }))
    return this.cache('pipeTypeAndTypedClassesOfTypedClasses', obs$, ...arguments)
  }

  // @spyTag
  // @cache({ refCount: false })
  pipeTypeClassOfTypedClass(pkTypedClass): Observable<number> {
    const obs$ = this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(
      map((allHasTypeProps) => {
        const byDomain = indexBy(k => k.has_domain.toString(), values(allHasTypeProps));
        return byDomain[pkTypedClass] ? byDomain[pkTypedClass].has_range : undefined
      }))
    return this.cache('pipeTypeClassOfTypedClass', obs$, ...arguments)
  }

  // @spyTag
  // @cache({ refCount: false })
  pipeTypedClassesOfTypeClasses(pkTypeClasses: number[]): Observable<number[]> {

    const obs$ = this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(
      map((allHasTypeProps) => {
        const byDomain = indexBy(k => k.has_range.toString(), values(allHasTypeProps));
        return pkTypeClasses.map(pk => byDomain[pk] ? byDomain[pk].has_domain : undefined)
      }))
    return this.cache('pipeTypedClassesOfTypeClasses', obs$, ...arguments)

  }


  // @spyTag
  // @cache({ refCount: false })
  pipeTypePropertyOfTypedClass(pkTypedClass): Observable<number> {
    const obs$ = this.s.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(
      map((allHasTypeProps) => {
        const typeProp = values(allHasTypeProps).find(p => p.has_domain === pkTypedClass)
        return typeProp ? typeProp.pk_property : undefined;
      }))
    return this.cache('pipeTypePropertyOfTypedClass', obs$, ...arguments)

  }

  // @spyTag
  // @cache({ refCount: false })
  pipeTargetClassesOfProperties(pkProperties: number[], isOutgoing: boolean): Observable<number[]> {
    const obs$ = this.s.dfh$.property$.by_pk_property$.all$.pipe(
      map(x => {
        if (!pkProperties || !pkProperties.length) return [];

        const res = []
        const targetClasses = {};
        pkProperties.forEach(pkProp => {
          const props = values(x[pkProp]);
          props.forEach(prop => {
            const targetClass = isOutgoing ? prop.has_range : prop.has_domain;
            if (!targetClasses[targetClass]) {
              targetClasses[targetClass] = true;
              res.push(targetClass)
            }
          })
        })
        return res;
      })
    )
    return this.cache('pipeTargetClassesOfProperties', obs$, ...arguments)

  }
}



function createHasDefinitionProperty(domainClass: number) {
  const profiles: Profiles = [
    {
      removed_from_api: false,
      fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
    }
  ]

  const hasDefinition: DfhProperty = {
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
  }
  return hasDefinition
}



export function createHasTimeSpanProperty(domainClass: number) {
  const profiles: Profiles = [
    {
      removed_from_api: false,
      fk_profile: DfhConfig.PK_PROFILE_GEOVISTORY_BASIC
    }
  ]
  const hasAppeProp: DfhProperty = {
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
  }
  return hasAppeProp
}


function isRemovedFromAllProfiles(enabledProfiles: number[], profiles: RelatedProfile[]): boolean {
  return !profiles.some(p => p.removed_from_api === false && enabledProfiles.includes(p.fk_profile))

}

function getPlaceOfDisplay(specialFields: SysConfigSpecialFields, subfield: Subfield, projectFieldConfig?: ProClassFieldConfig): FieldPlaceOfDisplay {
  let settings: SysConfigFieldDisplay;

  settings = getSettingsFromSysConfig(subfield, specialFields, settings);

  // if this is a special field, create corresponding display settings and return it
  if (settings) {
    if (settings.displayInBasicFields) {
      return { basicFields: { position: settings.displayInBasicFields.position } }
    } else if (settings.hidden) {
      return { hidden: true }
    }
  }

  // otherwise display the field in specific fields (default)
  let position = Number.POSITIVE_INFINITY;
  if (projectFieldConfig) position = projectFieldConfig.ord_num
  return { specificFields: { position } }

}
function getSettingsFromSysConfig(
  subfield: Subfield, specialFields: SysConfigSpecialFields, settings: SysConfigFieldDisplay) {
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






/**
 * Pipes the fields for temporal entity forms
 * - the specific fields
 * - the when field
 * - if available: the type field
 */
// @spyTag @cache({ refCount: false }) pipeFieldDefinitionsForTeEnForm(pkClass: number): Observable<Field[]> {
//   return of([])
// const hasTypeListDef$ = this.pipeHasTypeSubfield(pkClass)
// return combineLatest(
//   this.pipeSpecificFieldDefinitions(pkClass)
//     .pipe(
//       map(fields => fields.filter(f => f.allSubfieldsRemovedFromAllProfiles === false))
//     )
//   ,
//   hasTypeListDef$,
// ).pipe(
//   map(([fields, hasTypeListDefs]) => {
//     const when = this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_WHEN)
//     return [
//       ...fields,
//       when,
//       ...hasTypeListDefs.map((hasTypeListDef) => {
//         const typeField: Field = { ...hasTypeListDef, listDefinitions: [hasTypeListDef] }
//         return typeField;
//       })
//     ]
//   })
// )
// }


/**
 * Pipe the specific fields of given class
 */
// @spyTag @cache({ refCount: false }) pipeSpecificFieldDefinitions(pkClass: number): Observable<Field[]> {
// return combineLatest(
//   this.pipePropertiesOfClass(pkClass, true).pipe(
//     // filter out the 'has type' property, since it is part of the default fields
//     map(outgoing => outgoing.filter(o => !o.is_has_type_subproperty))
//   ),
//   this.pipePropertiesOfClass(pkClass, false).pipe(
//     // filter out the 'has appellation' property, since it is part of the default fields
//     map(ingoing => ingoing.filter(i =>
//       i.pk_property !== DfhConfig.PROPERTY_PK_IS_APPELLATION_OF
//       && i.pk_property !== DfhConfig.PROPERTY_PK_GEOVP1_IS_REPRODUCTION_OF
//     ))
//   ),
//   this.pipeFieldConfigs(pkClass)
// ).pipe(
//   switchMap(([outgoing, ingoing, fieldConfigs]) => {

//     const key = (fc: Partial<ProClassFieldConfig>) => `${fc.fk_property}_${fc.fk_domain_class}_${fc.fk_range_class}`;
//     const indexed = indexBy((fc) => `${fc.fk_property}_${fc.fk_domain_class}_${fc.fk_range_class}`, fieldConfigs)
//     const getFieldConfig = (listDef: Subfield): ProClassFieldConfig => {
//       return indexed[key({
//         fk_property: listDef.property.pkProperty,
//         fk_domain_class: listDef.isOutgoing ? listDef.sourceClass : null,
//         fk_range_class: listDef.isOutgoing ? null : listDef.sourceClass,
//       })]
//     }

//     // Create list definitions
//     return combineLatest(
//       this.pipePropertiesToSubfields(ingoing, false),
//       this.pipePropertiesToSubfields(outgoing, true)
//     ).pipe(
//       map(([ingoingListDefs, outgoingListDefs]) => {
//         const listDefinitions = [...ingoingListDefs, ...outgoingListDefs];

//         // Create field definitions
//         const fieldDefs: { [key: string]: Field } = {}
//         listDefinitions.forEach(listDef => {

//           const k = listDef.property.pkProperty + '_' + listDef.isOutgoing;

//           if (!fieldDefs[k]) {
//             fieldDefs[k] = {
//               ...listDef,
//               placeOfDisplay: {},
//               allSubfieldsRemovedFromAllProfiles: false,
//               fieldConfig: getFieldConfig(listDef),
//               listDefinitions: [listDef],
//               targetClasses: [listDef.targetClass]
//             }
//           } else {
//             fieldDefs[k].listDefinitions.push(listDef)
//             fieldDefs[k].targetClasses.push(listDef.targetClass)
//           }

//           // }

//         })
//         // Order the fields according to ord_num (from project's config, kleiolab's config) or put it at end of list.
//         return sort(
//           (a, b) => {
//             const getOrdNum = (item: Field) => {
//               if (item && item.fieldConfig) return item.fieldConfig.ord_num;
//               return Number.POSITIVE_INFINITY;
//             }
//             const ordNumA = getOrdNum(a);
//             const ordNumB = getOrdNum(b);
//             return ordNumA - ordNumB;
//           },
//           values(fieldDefs))
//       })
//     )
//   })
// )
// }


/**
 * Pipe the fields for identification of given class
 */
// @spyTag @cache({ refCount: false }) pipeDefaultFieldDefinitions(pkClass: number): Observable<Field[]> {


// /**
//  * Pipe the generic field has appellation
//  * with the given class as range
//  */
// const hasAppeProp: DfhPropertyStatus = {
//   has_domain: DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE,
//   pk_property: DfhConfig.PROPERTY_PK_IS_APPELLATION_OF,
//   has_range: pkClass,
//   domain_instances_max_quantifier: -1,
//   domain_instances_min_quantifier: 0,
//   range_instances_max_quantifier: 1,
//   range_instances_min_quantifier: 1,
//   identifier_in_namespace: 'histP9',
//   identity_defining: true,
//   is_inherited: true,
//   is_has_type_subproperty: false,
//   removedFromAllProfiles: false,
//   profiles: []
// }
// const hasAppeListDef$ = this.pipePropertiesToSubfields([hasAppeProp], false).pipe(
//   filter(listDefs => !!listDefs && !!listDefs[0]),
//   map(listDefs => listDefs[0])
// );

// /**
//  * Pipe the generic field has type
//  * with the given class as range
//  */
// const hasTypeListDef$ = this.pipeHasTypeSubfield(pkClass)
// return combineLatest(
//   hasAppeListDef$,
//   hasTypeListDef$,
//   this.s.dfh$.class$.by_pk_class$.key(pkClass).pipe(filter(c => !!c))
// ).pipe(
//   map(([hasAppeListDef, hasTypeListDefs, klass]) => {
//     const fields: Field[] = []


//     // /*
//     //  * Add 'short title' text-property to
//     //  *
//     //  * Manifestation Product Type – F3, 219
//     //  * Manifestation Singleton – F4, 220
//     //  * Item – F5, 221
//     //  * Web Request – geovC4, 502
//     //  */
//     // if ([
//     //   DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE,
//     //   DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON,
//     //   DfhConfig.CLASS_PK_ITEM,
//     //   DfhConfig.CLASS_PK_WEB_REQUEST].includes(pkClass)) {
//     //   fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_SHORT_TITLE));
//     // }

//     // /*
//     // * Add 'has appellation for language – histP9' to
//     // *
//     // * all classes except 'Appellation for language – histC10', 365
//     // */
//     // if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
//     //   const appeField: Field = { ...hasAppeListDef, listDefinitions: [hasAppeListDef] }
//     //   fields.push(appeField);
//     // }


//     // /*
//     // * Add 'hasType' fields
//     // */
//     // if (hasTypeListDefs && hasTypeListDefs.length > 0) {
//     //   hasTypeListDefs.forEach((hasTypeListDef) => {
//     //     const typeField: Field = { ...hasTypeListDef, listDefinitions: [hasTypeListDef] }
//     //     fields.push(typeField);
//     //   })
//     // }

//     // /*
//     // * Add 'entity definition' text-property to
//     // *
//     // * all classes except 'Appellation for language – histC10', 365
//     // */
//     // if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
//     //   fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION));
//     // }
//     // /*
//     // * Add 'identifier / exact reference / url / ...' text-property to
//     // *
//     // * Web Request – geovC4, 502
//     // */
//     // if (DfhConfig.CLASS_PK_WEB_REQUEST === pkClass) {
//     //   fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE));
//     // }

//     // /*
//     // * Add 'comment' text-property to
//     // *
//     // * Manifestation Product Type – F3, 219
//     // * Manifestation Singleton – F4, 220
//     // * Item – F5, 221
//     // * Web Request – geovC4, 502
//     // * Expression portion – geovC5, 503
//     // */
//     // if ([
//     //   DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE,
//     //   DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON,
//     //   DfhConfig.CLASS_PK_ITEM,
//     //   DfhConfig.CLASS_PK_WEB_REQUEST,
//     //   DfhConfig.CLASS_PK_EXPRESSION_PORTION].includes(pkClass)) {
//     //   fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_COMMENT));
//     // }

//     // /*
//     // * Add 'time-span' field to
//     // *
//     // * all temporal entity classes
//     // */
//     // if (klass.basic_type === 9) {
//     //   fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_WHEN));
//     // }

//     return fields

//   })
// )
// }


// private pipeHasTypeSubfield(pkClass: number) {
//   return this.pipePropertiesOfClass(pkClass, true).pipe(
//     // check if this class has 'has type' subproperty
//     map(outgoing => {
//       return outgoing.filter((prop) => prop.is_has_type_subproperty);
//     }), switchMap(hasTypeProps => combineLatestOrEmpty(hasTypeProps.map(dfhProp => {
//       return this.pipePropertiesToSubfields([dfhProp], true).pipe(filter(listDefs => !!listDefs && !!listDefs[0]), map(listDefs => {
//         const listDef = listDefs[0];
//         listDef.listType = { typeItem: 'true' };
//         return listDef;
//       }));
//     }))));
// }

// getClassFieldSubfield(pkClassField: number): Subfield {
//   const template = {
//     property: {},
//     sourceClass: undefined,
//     sourceClassLabel: undefined,
//     targetClass: undefined,
//     isOutgoing: undefined,
//     identityDefiningForSource: undefined,
//     identityDefiningForTarget: undefined,
//     targetMaxQuantity: undefined,
//     targetMinQuantity: undefined,
//     sourceMaxQuantity: undefined,
//     sourceMinQuantity: undefined,
//     removedFromAllProfiles: false
//   }
//   switch (pkClassField) {
//     case SysConfig.PK_CLASS_FIELD_WHEN:
//       return {
//         ...template,
//         listType: { timeSpan: 'true' },
//         label: 'When',
//         isOutgoing: true,
//         // fkClassField: pkClassField,
//         ontoInfoLabel: 'P4',
//         ontoInfoUrl: 'https://ontome.dataforhistory.org/property/4',
//         targetMaxQuantity: 1
//       }
//     case SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION:
//       return {
//         ...template,
//         listType:  { textProperty: 'true' },
//         label: 'Description',
//         // fkClassField: pkClassField,
//         ontoInfoLabel: 'P3',
//         ontoInfoUrl: 'https://ontome.dataforhistory.org/property/3',
//         targetMaxQuantity: -1
//       }
//     case SysConfig.PK_CLASS_FIELD_COMMENT:
//       return {
//         ...template,
//         // fkClassField: SysConfig.PK_CLASS_FIELD_COMMENT,
//         listType:  { textProperty: 'true' },
//         label: 'Comments',
//         ontoInfoLabel: 'P3',
//         ontoInfoUrl: 'https://ontome.dataforhistory.org/property/3',
//         targetMaxQuantity: -1
//       }
//     case SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE:
//       return {
//         ...template,
//         listType:  { textProperty: 'true' },
//         label: 'Exact Reference',
//         // fkClassField: pkClassField,
//         ontoInfoLabel: 'P3',
//         ontoInfoUrl: 'https://ontome.dataforhistory.org/property/3',
//         targetMaxQuantity: -1
//       }
//     case SysConfig.PK_CLASS_FIELD_SHORT_TITLE:
//       return {
//         ...template,
//         listType:  { textProperty: 'true' },
//         label: 'Short Title',
//         // fkClassField: pkClassField,
//         ontoInfoLabel: 'P3',
//         ontoInfoUrl: 'https://ontome.dataforhistory.org/property/3',
//         targetMaxQuantity: -1
//       }
//     default:
//       break;
//   }
// }

// getClassFieldDefinition(pkClassField: number): Field {
//   const listDef = this.getClassFieldSubfield(pkClassField)
//   return { ...listDef, listDefinitions: [listDef] }
// }


// @spyTag @cache({ refCount: false }) pipeClassesRequired() {
//   return this.s.sys$.system_relevant_class$.by_required$.key('true')
//     .pipe(map(c => values(c).map(k => k.fk_class)))
// }



// /**
//  * Pipes all the enabled properties of a class
//  */
// @spyTag @cache({ refCount: false }) pipePropertiesOfClass(pkClass: number, isOutgoing: boolean): Observable<DfhPropertyStatus[]> {


//   let $: Observable<ByPk<DfhProperty>>
//   if (isOutgoing) {
//     $ = this.s.dfh$.property$.by_has_domain$.key(pkClass)
//   }
//   else {
//     $ = this.s.dfh$.property$.by_has_range$.key(pkClass)
//   }

//   // filter properties that are in at least one profile enabled by project
//   const profiles$ = this.pipeProfilesEnabledByProject()


//   // Filter out only the properties for which target class is allowed
//   return combineLatest($, profiles$)
//     .pipe(
//       map(([props, profiles]) => {
//         const p: DfhPropertyStatus[] = []

//         values(props).forEach(prop => {


//           const propProfileRel = prop.profiles as Profiles

//           let enabledInAProfile = false;

//           let removedFromAllProfiles = true;

//           propProfileRel.forEach(item => {
//             if (profiles.includes(item.fk_profile)) {
//               enabledInAProfile = true;
//               if (item.removed_from_api === false) {
//                 removedFromAllProfiles = false
//               }
//             }
//           })

//           if (enabledInAProfile) {
//             p.push({
//               ...prop,
//               removedFromAllProfiles
//             })
//           }
//         })

//         return p
//       })
//     )

// }


// /**
//  * returns an object where the keys are the pks of the Classes
//  * used by the given project
//  * - or because the class is enabled by class_proj_rel
//  * - or because the class is required by sources or by basics
//  *
//  * this is usefull to check if a class is available at all
//  */
// @spyTag @cache({ refCount: false }) pipeClassesInEntitesOrRequired(): Observable<{ [key: string]: number }> {
//   return combineLatest(
//     this.pipeClassesEnabledInEntities(),
//     this.pipeClassesRequired()
//   ).pipe(
//     map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
//     startWith({})
//   )
// }
