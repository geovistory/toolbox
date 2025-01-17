/* eslint-disable prefer-rest-params */

import { Injectable } from '@angular/core';
import { DfhConfig, ProConfig, SysConfig } from '@kleiolab/lib-config';
import { ClassConfig, DfhClass, DfhProperty, GvFieldTargetViewType, GvSubentitFieldPageReq, InfLanguage, ProClassFieldConfig, RelatedProfile, SysConfigClassCategoryBelonging, SysConfigFieldDisplay, SysConfigFormCtrlType, SysConfigSpecialFields, SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { flatten, indexBy, values } from 'ramda';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';
import { filterNullish } from '../../_helpers/filterNullish';
import { DataFacade } from '../../redux-store/data/data.facade';
import { UiFacade } from '../../redux-store/ui/ui.facade';
import { PipeCache } from '../PipeCache';
import { ActiveProjectPipesService } from '../active-project/active-project-pipes.service';
import { AddMenuClassItem } from './models/AddMenuClassItem';
import { DfhClassEnriched } from './models/DfhClassEnriched';
import { DfhClassEnrichedWithLabel } from './models/DfhClassEnrichedWithLabel';
import { DisplayType } from './models/DisplayType';
import { Field } from './models/Field';
import { GvFieldTargets } from './models/FieldTargets';
import { HasTypePropertyInfo } from './models/HasTypePropertyInfo';
import { SectionName } from './models/SectionName';
import { SpecialFieldType } from './models/SpecialFieldType';
import { Subfield } from './models/Subfield';
import { TableName } from './models/TableName';

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
    private activeProject: ActiveProjectPipesService,
    private dataFacade: DataFacade,
    private uiFacade: UiFacade
  ) { super() }


  /**
  * returns observable number[] wher the numbers are the pk_profile
  * of all profiles that are enabled by the given project.
  * The array will always include PK_PROFILE_GEOVISTORY_BASIC
  */
  public pipeProfilesEnabledByProject(): Observable<number[]> {
    return combineLatest([
      this.uiFacade.activeProject.projectId$,
      this.dataFacade.sys.config.sysConfig$.pipe(filter(x => !!x))
    ]).pipe(
      switchMap(([pkProject, sysConfig]) => this.dataFacade.pro.dfhProfileProjRel.getDfhProfileProjRel.byFkProjectEnabled$(pkProject, true).pipe(
        map(projectProfileRels => values(projectProfileRels)
          .filter(rel => rel.enabled)
          .map(rel => rel.fk_profile)
        ),
        map(enabled => [...enabled, ...(sysConfig?.ontome?.requiredOntomeProfiles ?? [])]),
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
    // console.log('pipeFields(' + pkClass + ',' + noNesting + ')');

    const obs$ = combineLatest([
      this.dataFacade.dfh.property.getDfhProperty.byDomain(pkClass).pipe(map(indexed => values(indexed))),
      // freezing bug log
      // .pipe(tap(x => console.log('aaa this.s.dfh$.property$.by_has_domain$$'))),
      // pipe ingoing properties
      this.dataFacade.dfh.property.getDfhProperty.byRange(pkClass).pipe(map(indexed => values(indexed))),
      // freezing bug log
      // .pipe(tap(x => console.log('aaa  this.s.dfh$.property$.by_has_range$$'))),
      // pipe sys config
      this.dataFacade.sys.config.sysConfig$.pipe(filter(x => !!x)),
      // freezing bug log
      // .pipe(tap(x => console.log('aaa   this.dataFacade.sys.config.sysConfig$$'))),
      // pipe enabled profiles
      this.pipeProfilesEnabledByProject(),
      // freezing bug log
      // .pipe(tap(x => console.log('aaa pipeProfilesEnabledByProject$'))),
    ]).pipe(
      switchMap(([outgoingProps, ingoingProps, sysConfig, enabledProfiles]) => {

        // console.log('aaa is it crazy?') // freezing bug log

        const platformVocabularyClasses = sysConfig.platformVocabularies ?
          sysConfig.platformVocabularies.map(c => c.parentOrAncestorClassId) : [];

        const isEnabled = (prop: DfhProperty): boolean => enabledProfiles.some(
          (enabled) => prop.profiles.map(p => p.fk_profile).includes(enabled)
        );

        const removedFromAllProfilesLast = (a: DfhProperty) => {
          // if this property is not removed from all profiles, return a negative number to sort it first
          return a.profiles?.some(p => !p?.removed_from_api) ? -1 : 1;
        }

        const outP = outgoingProps.filter((prop) => isEnabled(prop)).sort(removedFromAllProfilesLast)
        const inP = ingoingProps.filter((prop) => isEnabled(prop)).sort(removedFromAllProfilesLast)

        return combineLatest([
          this.pipePropertiesToSubfields(outP, true, enabledProfiles, platformVocabularyClasses, noNesting),
          // freezing bug log
          // .pipe(tap(x => console.log('aaa   pipePropertiesToSubfields out'))),
          this.pipePropertiesToSubfields(inP, false, enabledProfiles, platformVocabularyClasses, noNesting),
          // freezing bug log
          // .pipe(tap(x => console.log('aaa   pipePropertiesToSubfields in'))),
          this.pipeFieldConfigs(pkClass),
          // freezing bug log
          // .pipe(tap(x => console.log('aaa   pipeFieldConfigs'))),
        ]).pipe(
          map(([subfields1, subfields2, fieldConfigs]) => {
            const subfields = [...subfields1, ...subfields2]
            // console.log('aaa is it crazy? 2') // freezing bug log


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
                else if (s.isTimeSpanShortCutField) isSpecialField = 'time-span';
                uniqFields[fieldId] = {
                  sourceClass: s.sourceClass,
                  sourceClassLabel: s.sourceClassLabel,
                  sourceMaxQuantity: s.sourceMaxQuantity,
                  sourceMinQuantity: s.sourceMinQuantity,
                  targetMinQuantity: s.targetMinQuantity,
                  targetMaxQuantity: s.targetMaxQuantity,
                  label: s.label,
                  isHasTypeField: s.isHasTypeField,
                  isTimeSpanShortCutField: s.isTimeSpanShortCutField,
                  property: s.property,
                  isOutgoing: s.isOutgoing,
                  identityDefiningForSource: s.identityDefiningForSource,
                  identityDefiningForTarget: s.identityDefiningForTarget,
                  ontoInfoLabel: s.ontoInfoLabel,
                  ontoInfoUrl: s.ontoInfoUrl,
                  allSubfieldsRemovedFromAllProfiles: s.removedFromAllProfiles,
                  targetClasses: [s.targetClass],
                  fieldConfig,
                  display: getFieldDisplay(sysConfig.specialFields, s, fieldConfig),
                  isSpecialField,
                  targets: {
                    [s.targetClass]: {
                      viewType: s.viewType,
                      formControlType: s.formControlType,
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
                  viewType: s.viewType,
                  formControlType: s.formControlType,
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
    * pipe all the basic fields of a class,
    * ordered by the position of the field within the basic/metadata/specific fields
    */
  public pipeSection(pkClass: number, displayType: DisplayType, section: SectionName, noNesting = false): Observable<Field[]> {

    // console.log('PipeSection:', pkClass, displayType, section, noNesting) // freezing bug log

    const obs$ = this.pipeFields(pkClass, noNesting).pipe(
      map(fields => fields
        // filter the fields that are deprecated
        .filter(field => !field.allSubfieldsRemovedFromAllProfiles)
        // filter by the right section of the right DisplayType
        .filter(field => {
          if (displayType === DisplayType.form) return field.display.formSections?.[section]
          if (displayType === DisplayType.view) return field.display.viewSections?.[section]
          return false
        })
        // filter fields that should be hidden
        .filter(field => {
          if (displayType === DisplayType.form) return !field.display.formSections?.[section]?.hidden
          if (displayType === DisplayType.view) return !field.display.viewSections?.[section]?.hidden
          return false
        })
        // sort fields by the position defined in the section
        .sort((a, b) => {
          if (displayType === DisplayType.form) {
            return a.display.formSections?.[section]?.position - b.display.formSections?.[section]?.position
          }
          if (displayType === DisplayType.view) {
            return a.display.viewSections?.[section]?.position - b.display.viewSections?.[section]?.position
          }
          return 0;
        })
      )
    )
    return this.cache('pipeSection', obs$, ...arguments)
  }


  /**
     * Pipes the fields for simple form
     * - the specific fields + simple form for TeEn
     * - the basic fields + simple form for PeIt
     */
  public pipeSimpleForm(pkClass: number, basicType: 'TeEn' | 'PeIt'): Observable<Field[]> {

    // console.log('pipeSimpleForm:', pkClass, basicType) // freezing bug log

    const sectionName = basicType == 'PeIt' ? SectionName.basic : SectionName.specific;
    const fields1$ = this.pipeSection(pkClass, DisplayType.form, sectionName);
    const fields2$ = this.pipeSection(pkClass, DisplayType.form, SectionName.simpleForm);

    const obs$ = combineLatestOrEmpty([fields1$, fields2$]).pipe(
      map(([fields1, fields2]) => {
        const uniqFields = indexBy(i => i.property.fkProperty + '_' + i.isOutgoing, fields1.concat(fields2))
        return values(uniqFields)
          .filter(elt => !elt.display.formSections?.simpleForm?.hidden)
          .sort((a, b) => {
            const aPos = a.display.formSections?.simpleForm?.position ?? a.display.formSections?.[sectionName]?.position;
            const bPos = b.display.formSections?.simpleForm?.position ?? b.display.formSections?.[sectionName]?.position;
            return aPos - bPos;
          })
      })
    )
    return this.cache('pipeSimpleForm', obs$, ...arguments)
  }

  /**
     * Pipes the fields for temporal entity forms
     * - the specific fields
     * - the when field
     * - if available: the type field
     */
  public pipeFieldsForTeEnForm(pkClass: number, noNesting = false): Observable<Field[]> {
    const obs$ = this.pipeFields(pkClass, noNesting).pipe(
      // filter fields that are displayd in specific fields
      map(allFields => {
        const fields = allFields
          // filter fields that are displayd in specific fields and not removed from all profiles
          .filter(field => (field.display.formSections.specific && field.allSubfieldsRemovedFromAllProfiles === false))
          // sort fields by the position defined in the specific fields
          .sort((a, b) => a.display.formSections.specific.position - b.display.formSections.specific.position)

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
  * - metadata fields
  * - specific fields
  * - timeSpan fields
  */
  pipeAllSections(pkClass: number, displayType: DisplayType, noNesting = false): Observable<Field[]> {
    const obs$ = combineLatest([
      this.pipeSection(pkClass, displayType, SectionName.basic, noNesting),
      this.pipeSection(pkClass, displayType, SectionName.metadata, noNesting),
      this.pipeSection(pkClass, displayType, SectionName.specific, noNesting),
      this.pipeSection(pkClass, displayType, SectionName.linkedSources, noNesting),
      this.pipeSection(pkClass, displayType, SectionName.linkedEntities, noNesting),
      this.pipeSection(pkClass, displayType, SectionName.timeSpan, noNesting),
    ])
      .pipe(
        map(([a, b, c, d, e, f]) => [...a, ...b, ...c, ...d, ...e, ...f])
      )
    return this.cache('pipeAllSections', obs$, ...arguments)
  }

  pipeSections(pkClass: number, displayType: DisplayType, sectionNames: SectionName[], noNesting = false): Observable<Field[]> {
    if (sectionNames.length === 0) return of([]);
    const obs$ = combineLatest(
      sectionNames.map(sectionName => this.pipeSection(pkClass, displayType, sectionName, noNesting))
    ).pipe(
      map((x) => flatten<Field>(x))
    )
    return this.cache('pipeSections', obs$, ...arguments)
  }

  pipePropertiesToSubfields(
    properties: DfhProperty[],
    isOutgoing: boolean,
    enabledProfiles: number[],
    platformVocabularyClasses: number[],
    noNesting = false
  ): Observable<Subfield[]> {
    const obs$ = combineLatestOrEmpty(
      properties.map(p => {
        return this.pipeSubfield(isOutgoing, p, enabledProfiles, platformVocabularyClasses, noNesting);
      })
    )
    return this.cache('pipePropertiesToSubfields', obs$, ...arguments)

  }




  private pipeSubfield(
    isOutgoing: boolean,
    p: DfhProperty,
    enabledProfiles: number[],
    platformVocabularyClasses: number[],
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

    const hasTypeProperty = 2
    const isHasTypeField = o && p.parent_properties.includes(hasTypeProperty)
    const identifyingDomainProperty = 1376
    const identifyingRangeProperty = 1766
    const identityDefiningForDomain = p.parent_properties.includes(identifyingDomainProperty)
    const identityDefiningForRange = p.parent_properties.includes(identifyingRangeProperty)
    const identityDefiningForSource = o ? identityDefiningForDomain : identityDefiningForRange
    const identityDefiningForTarget = o ? identityDefiningForRange : identityDefiningForDomain
    // console.log('pppp wanted: ', [sourceClass, p.pk_property, targetClass, isOutgoing])

    // const first = of('field not piped after 10s').pipe(
    //   delay(1000),
    //   map(_ => {
    //     throw new Error(`Error: the `);
    //   })
    // );

    return combineLatest([
      this.pipeClassLabel(sourceClass),
      //        .pipe(tap(x => {
      //          console.log('pppp found sourceClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing, x])
      //
      //          return x
      //        })),
      this.pipeClassLabel(targetClass),
      //        .pipe(tap(x => {
      //          console.log('pppp found targetClassLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing, x])
      //
      //          return x
      //        })),
      this.pipeTargetTypesOfClass(targetClass, targetMaxQuantity, p.pk_property, isOutgoing, noNesting),
      //        .pipe(tap(x => {
      //          console.log('pppp found targetTypeOfClass: ', [sourceClass, p.pk_property, targetClass, isOutgoing, x])
      //          return x
      //        })),
      this.pipeFieldLabel(sourceClass, isOutgoing, p.pk_property),
      //        .pipe(tap(x => {
      //          console.log('pppp found fieldLabel: ', [sourceClass, p.pk_property, targetClass, isOutgoing, x])
      //          return x
      //        })),
      this.dataFacade.dfh.klass.select.byPkClass(sourceClass)
    ])
      .pipe(map(([sourceClassLabel, targetClassLabel, targetTypes, label, dfhClass]
      ) => {

        // console.log('pppp Subfield complete: ', [sourceClass, p.pk_property, targetClass, isOutgoing])

        const node: Subfield = {
          viewType: targetTypes.viewType,
          formControlType: targetTypes.formControlType,
          sourceClass,
          sourceSuperClasses: [...dfhClass.parent_classes, ...dfhClass.ancestor_classes],
          sourceClassLabel,
          sourceMaxQuantity,
          sourceMinQuantity,
          targetClass,
          targetClassLabel,
          targetMinQuantity,
          targetMaxQuantity,
          label,
          isHasTypeField,
          isTimeSpanShortCutField: false,
          property: { fkProperty: p.pk_property },
          isOutgoing: o,
          identityDefiningForSource,
          identityDefiningForTarget,
          ontoInfoLabel: p.identifier_in_namespace,
          ontoInfoUrl: SysConfig.ONTOME_URL + '/property/' + p.pk_property,
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
  pipeTargetTypesOfClass(
    pkClass: number,
    targetMaxQuantity = -1,
    pkProperty?: number,
    isOutgoing?: boolean,
    noNesting = false
  ): Observable<{ viewType: GvFieldTargetViewType, formControlType: SysConfigFormCtrlType }> {
    const obs$ = combineLatest([
      this.dataFacade.sys.config.sysConfig$.pipe(filter(x => !!x)),
      // freezing bug log
      // .pipe(tap(x => console.log('aaa .sys$.config$.main$'))),
      this.dataFacade.dfh.klass.select.byPkClass(pkClass).pipe(filter(i => !!i)),
      // freezing bug log
      // .pipe(tap(x => console.log('aaa dfh$.class$.by_pk_class$'))),
    ]).pipe(
      switchMap(([sysConfig, klass]) => this.pipeTargetTypes(sysConfig, klass, targetMaxQuantity, pkProperty, isOutgoing, noNesting),
        // freezing bug log
        // .pipe(tap(x => console.log('aaa pipeTargetTypes'))),

      )
    )
    return this.cache('pipeTargetTypesOfClass', obs$, ...arguments)

  }


  pipeTargetTypes(
    s: SysConfigValue,
    klass: DfhClass,
    targetMaxQuantity?: number,
    pkProperty?: number,
    isOutgoing?: boolean,
    noNesting = false
  ): Observable<{ viewType: GvFieldTargetViewType, formControlType: SysConfigFormCtrlType }> {

    // console.log('pppp found: ', [undefined, pkProperty, klass.pk_class, isOutgoing])
    const res = (
      v: GvFieldTargetViewType,
      f: SysConfigFormCtrlType
    ) => new BehaviorSubject({ viewType: v, formControlType: f })
    const classId = klass.pk_class
    const basicType = klass.basic_type

    /*
    * get form control type (for display on create form)
    */
    const formControlType: SysConfigFormCtrlType =
      s?.classes?.[classId]?.formControlType ??
      s?.classesByBasicType?.[basicType]?.formControlType ??
      s?.classesDefault?.formControlType ??
      { entity: 'true' }; // <- fallback

    /**
     * get view type (for display on entity card)
     */
    const viewType: GvFieldTargetViewType =
      s?.classes?.[classId]?.viewType ??
      s?.classesByBasicType?.[basicType]?.viewType ??
      s?.classesDefault?.viewType ??
      { entityPreview: 'true' }; // <- fallback

    /**
    * If the view wants a nestedResource, but the nested fields are not yet defined, do it.
    * If noNesting is true, this is skipped
    */
    if (viewType?.nestedResource?.length === 0 && noNesting !== true) {

      return this.pipeNestedResource(classId, pkProperty).pipe(map(nestedResource => ({
        viewType: { nestedResource },
        formControlType
      })));
    }

    /**
    * Else return the trargets retrieved from system config / fallbacks
    */
    return res(viewType, formControlType)

  }


  // pipe the subfields of the entity
  public pipeNestedResource(classId: number, contextPkProperty?: number): Observable<GvSubentitFieldPageReq[]> {
    const noNest = true;
    return this.pipeAllSections(classId, DisplayType.view, noNest).pipe(
      map(fields => {
        const subentitySubfieldPage: GvSubentitFieldPageReq[] = [];
        for (const field of fields) {
          // for each of these subfields
          // create page:GvSubfieldPage
          const nestedTargets: GvFieldTargets = {};
          for (const key in field.targets) {
            if (Object.prototype.hasOwnProperty.call(field.targets, key)) {
              const listType = field.targets[key].viewType;
              const subTargetType: GvFieldTargetViewType = listType.nestedResource ?
                { entityPreview: 'true' } :
                listType;
              nestedTargets[key] = subTargetType;
            }
          }
          let isCircular = false;
          if (contextPkProperty &&
            field.property.fkProperty == contextPkProperty &&
            field.targetMaxQuantity === 1) {
            isCircular = true;
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
          };
          subentitySubfieldPage.push(nestedPage);
        }
        return subentitySubfieldPage
      })

    );
  }

  /**
   * Gets class field configs of given pkClass
   *
   * - of active project, if any, else
   * - of default config project, else
   * - empty array
   *
   */
  pipeFieldConfigs(pkClass: number): Observable<ProClassFieldConfig[]> {
    const obs$ = this.uiFacade.activeProject.projectId$.pipe(
      switchMap((fkProject) => {

        const activeProjectkey = {
          fk_class_for_class_field: pkClass,
          fk_project: fkProject
        }
        const defaultProjectkey = {
          fk_class_for_class_field: pkClass,
          fk_project: ProConfig.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT
        }
        return combineLatest([
          this.dataFacade.pro.classFieldConfig.getClassFieldConfig.byFkClassFkProject$(activeProjectkey),
          this.dataFacade.pro.classFieldConfig.getClassFieldConfig.byFkClassFkProject$(defaultProjectkey),
        ])
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
  pipeClassLabel(pkClass?: number): Observable<string> {
    const obs$ = combineLatest([
      this.uiFacade.activeProject.projectId$,
      this.activeProject.language$.pipe(filter(l => !!l)),
    ]).pipe(
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
  pipeLabels(d: {
    fkProject: number,
    type: 'label' | 'inverse_label' | 'definition' | 'scope_note',
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
        case 'inverse_label':
          fk_system_type = SysConfig.PK_SYSTEM_TYPE__TEXT_PROPERTY__LABEL
          break;
        default:
          console.warn('fk_system_type not found')
          break;
      }
    }


    const obs$ = combineLatest([
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
        // console.log('aaa pipeProTextProperty 1') // freezing bug log
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
        // console.log('aaa pipeProTextProperty 2') // freezing bug log

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
        // console.log('aaa pipeProTextProperty 3') // freezing bug log

        return { origin, text: item.string }
      })),

      // label from ontome in default language of project
      this.pipeDfhLabel({
        language: d.language.iso6391.trim(),
        type: d.type,
        fk_class: d.pkClass,
        fk_property: d.fkProperty
      }).pipe(map((item) => {
        if (!item) return undefined;
        const origin: LabelOrigin = 'of ontome in project lang';
        // console.log('aaa pipeDfhLabel 1') // freezing bug log

        return { origin, text: item.label }
      })),

      // label from ontome in english
      this.pipeDfhLabel({
        language: 'en',
        type: d.type,
        fk_class: d.pkClass,
        fk_property: d.fkProperty
      }).pipe(map((item) => {
        if (!item) return undefined;
        const origin: LabelOrigin = 'of ontome in english';
        // console.log('aaa pipeDfhLabel 2') // freezing bug log

        return { origin, text: item.label }
      })),
    ])
    return this.cache('pipeLabels', obs$, ...arguments)

  }


  pipeProTextProperty = this.dataFacade.pro.textProperty.getTextProperty.byFks$



  pipeDfhLabel = this.dataFacade.dfh.label.getDfhLabel.byFks

  /**
   * Delivers best fitting field label for active project
  */
  pipeFieldLabel(fkSource: number, isOutgoing: boolean, fkProperty: number): Observable<string> {
    const fkPropertyDomain = isOutgoing ? fkSource : undefined;
    const fkPropertyRange = isOutgoing ? undefined : fkSource;
    const type = isOutgoing ? 'label' : 'inverse_label'
    const obs$ = combineLatest([
      this.uiFacade.activeProject.projectId$,
      this.activeProject.language$.pipe(filter(l => !!l))
    ]).pipe(
      switchMap(([fkProject, language]) => this.pipeLabels(
        {
          fkProject,
          type,
          language,
          fkProperty,
          fkPropertyDomain,
          fkPropertyRange
        }
      )
        .pipe(
          map(items => {
            const item = items.find((i) => (i && i.text))
            return (item && item.text) ? item.text : `[${isOutgoing ? '' : 'inverse '}property label missing for ${fkProperty}]`;
          })
        ))
    )
    return this.cache('pipeFieldLabel', obs$, ...arguments)

  }




  /** Pipes about classes */

  /**
   * DEPRECATED this function is only used by form-create-entity.component,
   * but actually not nedded, since caller always receives return val 'resource'
   *
   * maps the class to the corresponding model (database table)
   * this is used by Forms to create new data in the shape of
   * the data model
   */
  pipeTableNameOfClass(targetClassPk: number): Observable<TableName> {
    const obs$ =
      this.dataFacade.sys.config.sysConfig$
        .pipe(
          filterNullish(),
          map((config) => {
            const classConfig: ClassConfig = config.classes[targetClassPk];
            if (classConfig && classConfig.valueObjectType) {

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

            return 'resource'
          })
        )
    return this.cache('pipeTableNameOfClass', obs$, ...arguments)

  }

  /**
 * returns observable number[] wher the numbers are the pk_class
 * of all classes that are enabled by at least one of the activated profiles
 * of thte given project
 */
  pipeClassesEnabledByProjectProfiles(): Observable<DfhClass[]> {
    const obs$ = combineLatest([
      this.dataFacade.dfh.klass.dfhClass$,
      this.pipeProfilesEnabledByProject()
    ]).pipe(
      map(([classesByPk, enabledProfiles]) => {
        const profilesMap = indexBy((k) => k + '', values(enabledProfiles))
        return values(classesByPk)
          .filter(klass => klass.profiles.some(profile => profilesMap[profile.fk_profile]))
      })
    )
    return this.cache('pipeClassesEnabledByProjectProfiles', obs$, ...arguments)

  }

  /**
   * Pipes all classes enabled by the current project and
   * enriches them with
   * - category of belonging (from system config)
   * - classConfig (from system config)
   * - project relation (from project config)
   * @returns
   */
  pipeClassesOfProject(): Observable<DfhClassEnriched[]> {
    const obs$ = this.uiFacade.activeProject.projectId$.pipe(switchMap(pkProject => {
      return combineLatest([
        this.pipeClassesEnabledByProjectProfiles(),
        this.dataFacade.pro.dfhClassProjRel.getDfhClassProjRel.byFkProject$(pkProject),
        this.dataFacade.sys.config.sysConfig$.pipe(filter(x => !!x))
      ])
        .pipe(map(([dfhClasses, classProjRels, sysConfig]) => {
          const platformVocabConfigs = sysConfig?.platformVocabularies || [];
          return dfhClasses.map(dfhClass => {
            const belongsToCategory = getClassCategoryBelonging(sysConfig, dfhClass.pk_class, dfhClass.basic_type)
            const icon = getClassIconType(sysConfig, dfhClass.pk_class, dfhClass.basic_type)
            const detailPage = getClassDetailPageType(sysConfig, dfhClass.pk_class, dfhClass.basic_type)
            const classConfig = getClassConfig(sysConfig, dfhClass.pk_class, dfhClass.basic_type)
            const projectRel = classProjRels?.[pkProject + '_' + dfhClass.pk_class]

            const superclasses = dfhClass.ancestor_classes.concat(dfhClass.parent_classes);
            const restrictedToProjects: number[] = []
            for (const c of platformVocabConfigs || []) {
              if (superclasses.includes(c.parentOrAncestorClassId)) {
                restrictedToProjects.push(c.projectId)
              }
            }
            let restrictedToOtherProjects = false;
            if (restrictedToProjects.length > 0 && !restrictedToProjects.includes(pkProject)) {
              restrictedToOtherProjects = true
            }
            const classEnriched: DfhClassEnriched = {
              icon,
              detailPage,
              belongsToCategory,
              classConfig,
              dfhClass,
              projectRel,
              restrictedToOtherProjects
            }
            return classEnriched;
          })
        }))
    }))
    return this.cache('pipeClassesOfProject', obs$, ...arguments)

  }

  pipeClassEnriched(pkClass: number): Observable<DfhClassEnriched> {
    return this.pipeClassesOfProject().pipe(map(classes => classes.find(klass => klass.dfhClass.pk_class === pkClass)))
  }

  // /**
  //  * returns an object where the keys are the pks of the Classes
  //  * used by the given project:
  //  * - or because the class is enabled by class_proj_rel
  //  * - or because the class is required by sources
  //  *
  //  * This is usefull to create select dropdowns of classes users will know
  //  */
  // pipeClassesInEntitiesOrSources(): Observable<{ [key: string]: number }> {
  //   const obs$ = combineLatest([
  //     this.pipeClassesEnabledInEntities(),
  //     this.pipeClassesRequiredBySources()
  //   ]).pipe(
  //     map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
  //     startWith({})
  //   )
  //   return this.cache('pipeClassesInEntitiesOrSources', obs$, ...arguments)

  // }

  // pipeClassesRequiredBySources() {
  //   const obs$ = this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
  //     .pipe(map(c => values(c).map(k => k.fk_class)))
  //   return this.cache('pipeClassesRequiredBySources', obs$, ...arguments)
  // }



  /**
  * returns observable number[] wher the numbers are the pk_class
  * of all type classes that are enabled by at least one of the activated profiles
  * of thte given project
  */
  pipeTypeClassesEnabledByProjectProfiles(): Observable<DfhClassEnriched[]> {
    const obs$ = this.pipeClassesOfProject().pipe(
      map(items => items
        .filter(item => item.dfhClass.basic_type === 30 &&
          ![
            DfhConfig.CLASS_PK_LANGUAGE,
            DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE
          ].includes(item.dfhClass.pk_class)
        )
      )
    )

    return this.cache('pipeTypeClassesEnabledByProjectProfiles', obs$, ...arguments)

  }

  // /**
  //  * returns observable number[] where the numbers are the pk_class
  //  * of all classes that are enabled by active project (using class_proj_rel)
  //  */
  // pipeClassesEnabledInEntities() {
  //   const obs$ = this.a.pkProject$.pipe(
  //     switchMap(pkProject => this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
  //       .pipe(
  //         map((rels) => values(rels).map(rel => rel.fk_class))
  //       )
  //     ))
  //   return this.cache('pipeClassesEnabledInEntities', obs$, ...arguments)
  // }



  // /**
  // * returns an object where the keys are the pks of the TeEn Classes
  // * used by the given project
  // */
  // pipeSelectedTeEnClassesInProject(): Observable<{ [key: string]: number }> {
  //   const obs$ = combineLatest([
  //     this.pipeTeEnClassesEnabledInEntities(),
  //     this.pipeTeEnClassesRequiredBySources()
  //   ]).pipe(
  //     map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
  //     startWith({})
  //   )
  //   return this.cache('pipeSelectedTeEnClassesInProject', obs$, ...arguments)
  // }

  // /**
  //  * Gets array of pk_class with teEn classes enabled in entities
  //  */
  // pipeTeEnClassesEnabledInEntities() {
  //   const obs$ = this.a.pkProject$.pipe(
  //     switchMap(pkProject => this.s.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
  //       .pipe(
  //         switchMap((cs) => combineLatest(
  //           values(cs).map(c => this.dataFacade.dfh.klass.select.byPkClass(c.fk_class).pipe(
  //             filter(item => !!item)
  //           ))
  //         ).pipe(
  //           map(dfhClasses => this.filterTeEnCasses(dfhClasses))
  //         ))
  //       )
  //     ))
  //   return this.cache('pipeTeEnClassesEnabledInEntities', obs$, ...arguments)

  // }

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

  // /**
  //  * Gets array of pk_class with teEn classes required by sources
  //  */
  // pipeTeEnClassesRequiredBySources() {
  //   const obs$ = this.s.sys$.system_relevant_class$.by_required_by_sources$.key('true')
  //     .pipe(
  //       switchMap((cs) => combineLatest(
  //         values(cs).map(c => this.dataFacade.dfh.klass.select.byPkClass(c.fk_class).pipe(
  //           filter(item => !!item)
  //         ))
  //       ).pipe(
  //         map(dfhClasses => {
  //           return this.filterTeEnCasses(dfhClasses)
  //         })
  //       ))
  //     )
  //   return this.cache('pipeTeEnClassesRequiredBySources', obs$, ...arguments)

  // }






  /**
   *
   */
  pipeTypeAndTypedClassesShownInAddMenu(enabledIn?: keyof SysConfigClassCategoryBelonging): Observable<AddMenuClassItem[]> {

    const obs$ = this.pipeClassesOfProject()
      .pipe(
        map(items => {
          return items
            .filter(item => item.belongsToCategory?.[enabledIn]?.showInAddMenu && !item.restrictedToOtherProjects)
            .filter(item => {
              if (enabledIn === 'entities') {
                return item.projectRel?.enabled_in_entities
              }
              return true
            })
        }),
        // pipe class label
        switchMap(enrichedClasses => combineLatestOrEmpty(enrichedClasses.map(enrichedClass =>
          this.pipeClassLabel(enrichedClass.dfhClass.pk_class).pipe(
            map<string, DfhClassEnrichedWithLabel>(classLabel => ({
              ...enrichedClass,
              classLabel,
            }))
          )
        ))),
        // sort 0-1 AZ
        map(items => {
          return items
            .map(item => ({
              item: item,
              position: item.belongsToCategory?.[enabledIn]?.positionInAddMenu?.toString() || item.classLabel.toLowerCase()
            }))
            .sort((a, b) => {
              if (a.position.toLowerCase() < b.position.toLowerCase()) {
                return -1;
              }
              if (a.position.toLowerCase() > b.position.toLowerCase()) {
                return 1;
              }
              return 0;
            })
            .map(sorted => sorted.item)
        }),
        // pipe add menu class item
        switchMap(items => this.pipeAddMenuClassItem(items.map(item => item)))
      )
    return this.cache('pipeTypeAndTypedClassesShownInAddMenu', obs$, ...arguments)

  }

  pipeAddMenuClassItem(enrichedClasses: DfhClassEnrichedWithLabel[]): Observable<AddMenuClassItem[]> {

    const obs$ = this.dataFacade.dfh.property.getDfhProperty.byHasTypeSubproperty(true).pipe(
      map((allHasTypeProps) => {
        const byDomain = indexBy(k => k.has_domain.toString(), values(allHasTypeProps));
        return enrichedClasses.map(enrichedClass => ({
          typedClass: enrichedClass,
          hasTypeProperty: byDomain[enrichedClass.dfhClass.pk_class]?.pk_property,
          isOutgoing: true,
          typeClass: byDomain[enrichedClass.dfhClass.pk_class]?.has_range
        }))
      }))
    return this.cache('pipeAddMenuClassItem', obs$, ...arguments)
  }

  pipeTypeAndTypedClassesOfTypedClasses(pkTypedClasses: number[]): Observable<HasTypePropertyInfo[]> {

    const obs$ = this.dataFacade.dfh.property.getDfhProperty.byHasTypeSubproperty(true).pipe(
      map((allHasTypeProps) => {
        const byDomain = indexBy(k => k.has_domain.toString(), values(allHasTypeProps));
        return pkTypedClasses.map(pk => ({
          typedClass: pk,
          hasTypeProperty: byDomain[pk]?.pk_property,
          isOutgoing: true,
          typeClass: byDomain[pk]?.has_range
        }))
      }))
    return this.cache('pipeTypeAndTypedClassesOfTypedClasses', obs$, ...arguments)
  }

  // pipeTypeClassOfTypedClass(pkTypedClass): Observable<number> {
  //   const obs$ = this.dataFacade.dfh.property.getDfhProperty.byHasTypeSubproperty(true).pipe(
  //     map((allHasTypeProps) => {
  //       const byDomain = indexBy(k => k.has_domain.toString(), values(allHasTypeProps));
  //       return byDomain[pkTypedClass] ? byDomain[pkTypedClass].has_range : undefined
  //     }))
  //   return this.cache('pipeTypeClassOfTypedClass', obs$, ...arguments)
  // }

  pipeTypedClassesOfTypeClasses(pkTypeClasses: number[]): Observable<number[]> {

    const obs$ = this.dataFacade.dfh.property.getDfhProperty.byHasTypeSubproperty(true).pipe(
      map((allHasTypeProps) => {
        const byDomain = indexBy(k => k.has_range.toString(), values(allHasTypeProps));
        return pkTypeClasses.map(pk => byDomain[pk] ? byDomain[pk].has_domain : undefined)
      }))
    return this.cache('pipeTypedClassesOfTypeClasses', obs$, ...arguments)

  }


  pipeTypePropertyOfTypedClass(pkTypedClass): Observable<number> {
    const obs$ = this.dataFacade.dfh.property.getDfhProperty.byHasTypeSubproperty(true).pipe(
      map((allHasTypeProps) => {
        const typeProp = values(allHasTypeProps).find(p => p.has_domain === pkTypedClass)
        return typeProp ? typeProp.pk_property : undefined;
      }))
    return this.cache('pipeTypePropertyOfTypedClass', obs$, ...arguments)

  }

  pipeTargetClassesOfProperties(pkProperties: number[], isOutgoing: boolean): Observable<number[]> {
    const obs$ = this.dataFacade.dfh.property.byPropertyIndexed$.pipe(
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

  // /**
  //  * gets the icon type for the class
  //  * @param pkClass
  //  */
  // pipeIconTypeFromClass(pkClass: number): Observable<IconType> {
  //   if (pkClass === DfhConfig.CLASS_PK_EXPRESSION_PORTION) {
  //     return of('expression-portion')
  //   } else if (DfhConfig.CLASS_PKS_SOURCE_PE_IT.includes(pkClass)) {
  //     return of('source')
  //   }
  //   const obs$ = combineLatest([
  //     this.dataFacade.sys.config.sysConfig$,
  //     this.dataFacade.dfh.klass.select.byPkClass(pkClass)
  //   ]).pipe(
  //     filter(i => !i.includes(undefined)),
  //     map(([config, klass]) => {
  //       const classConfig: ClassConfig = config.classes[pkClass];
  //       if (classConfig?.valueObjectType) {
  //         return 'value'
  //       }
  //       else {
  //         if (klass.basic_type === 9) {
  //           return 'temporal-entity'
  //         }
  //         return 'persistent-entity'
  //       }
  //     })
  //   )

  //   return obs$
  // }
}



function isRemovedFromAllProfiles(enabledProfiles: number[], profiles: RelatedProfile[]): boolean {
  return !profiles.some(p => p.removed_from_api === false && enabledProfiles.includes(p.fk_profile))

}

function getFieldDisplay(
  specialFields: SysConfigSpecialFields,
  subfield: Subfield,
  projectFieldConfig?: ProClassFieldConfig
): SysConfigFieldDisplay {
  const settings: SysConfigFieldDisplay = getSettingsFromSysConfig(subfield, specialFields);

  // if this is a special field, create corresponding display settings and return it
  let thePos = Number.POSITIVE_INFINITY;
  if (projectFieldConfig) thePos = projectFieldConfig.ord_num

  // returns form/view sections of config if exists, else add to specific fields
  return {
    formSections: settings?.formSections ?? { specific: { position: thePos } },
    viewSections: settings?.viewSections ?? { specific: { position: thePos } }
  }

}

function getSettingsFromSysConfig(
  subfield: Subfield, specialFields: SysConfigSpecialFields) {
  let settings: SysConfigFieldDisplay;
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
    // get settings by source super class and property
    else if (specialFields
      ?.bySourceSuperClass
      ?.find(x => subfield.sourceSuperClasses.some(y => x.pkSuperClass === y))
      ?.outgoingProperties
      ?.[subfield.property.fkProperty]
    ) {

      settings = specialFields
        .bySourceSuperClass
        .find(x => subfield.sourceSuperClasses.some(y => x.pkSuperClass === y))
        .outgoingProperties
      [subfield.property.fkProperty];
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
    // get settings by source super class and property
    else if (specialFields
      ?.bySourceSuperClass
      ?.find(x => subfield.sourceSuperClasses.some(y => x.pkSuperClass === y))
      ?.incomingProperties
      ?.[subfield.property.fkProperty]
    ) {

      settings = specialFields
        .bySourceSuperClass
        .find(x => subfield.sourceSuperClasses.some(y => x.pkSuperClass === y))
        .incomingProperties
      [subfield.property.fkProperty];
    }
    // get seetings by property
    else if (specialFields.incomingProperties &&
      specialFields.incomingProperties[subfield.property.fkProperty]) {
      settings = specialFields.incomingProperties[subfield.property.fkProperty];
    }
  }
  return settings;
}

function getClassCategoryBelonging(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number): SysConfigClassCategoryBelonging {
  return sysConfig?.classes?.[pkClass]?.belongsToCategory ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.belongsToCategory ??
    sysConfig?.classesDefault?.belongsToCategory ??
    { entities: { showInAddMenu: true } };
}

function getClassConfig(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number): ClassConfig {
  return sysConfig?.classes?.[pkClass] ??
    sysConfig?.classesByBasicType?.[basicTypeId] ??
    sysConfig?.classesDefault;
}

function getClassDetailPageType(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number): ClassConfig.DetailPageEnum {
  return sysConfig?.classes?.[pkClass]?.detailPage ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.detailPage ??
    sysConfig?.classesDefault?.detailPage ??
    ClassConfig.DetailPageEnum.Entity;
}

function getClassIconType(sysConfig: SysConfigValue, pkClass: number, basicTypeId: number): ClassConfig.IconEnum {
  return sysConfig?.classes?.[pkClass]?.icon ??
    sysConfig?.classesByBasicType?.[basicTypeId]?.icon ??
    sysConfig?.classesDefault?.icon ??
    ClassConfig.IconEnum.PersistentItem;
}
