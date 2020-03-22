
import { Injectable } from '@angular/core';
import { ActiveProjectService, DfhClass, DfhLabel, DfhProperty, InfLanguage, limitTo, ProClassFieldConfig, ProTextProperty, SysConfig, switchMapOr } from 'app/core';
import { ByPk } from 'app/core/store/model';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { flatten, indexBy, keys, uniq, values } from 'ramda';
import { combineLatest, Observable, of, zip } from 'rxjs';
import { filter, map, startWith, switchMap, mapTo } from 'rxjs/operators';
import { cache, spyTag } from '../../../shared';
import { FieldDefinition, ListDefinition, ListType } from '../new-components/properties-tree/properties-tree.models';
import * as Config from '../../../../../../common/config/Config';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';
import { textPropertyByFksKey, proClassFieldConfgByProjectAndClassKey } from 'app/core/pro/pro.config';
import { dfhLabelByFksKey } from 'app/core/dfh/dfh.config';
import { DfhPropertyActionFactory } from 'app/core/dfh/dfh.actions';

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
export class ConfigurationPipesService {

  constructor(
    // private b: InformationBasicPipesService,
    private p: ActiveProjectService,
  ) { }

  /**
  * Gets class field configs of given pkClass
  *
  * - of active project, if any, else
  * - of default config project, else
  * - empty array
  *
  */
  @spyTag @cache({ refCount: false }) pipeClassFieldConfigs(pkClass: number, limit?: number): Observable<ProClassFieldConfig[]> {
    return this.p.pkProject$.pipe(
      switchMap((fkProject) => {

        const activeProjectkey = proClassFieldConfgByProjectAndClassKey({
          fk_class_for_class_field: pkClass,
          fk_project: fkProject
        })
        const defaultProjectkey = proClassFieldConfgByProjectAndClassKey({
          fk_class_for_class_field: pkClass,
          fk_project: Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT
        })
        return combineLatest(
          this.p.pro$.class_field_config$.by_fk_project__fk_class$.key(activeProjectkey),
          this.p.pro$.class_field_config$.by_fk_project__fk_class$.key(defaultProjectkey)
        )
          .pipe(
            map(([activeProjectFields, defaultProjectFields]) => {
              if (activeProjectFields && values(activeProjectFields).length) return activeProjectFields;
              return defaultProjectFields
            }),
            map((items) => values(items).sort((a, b) => (a.ord_num > b.ord_num ? 1 : -1))),
            limitTo(limit),
            map((items: ProClassFieldConfig[]) => {
              const o = {}
              const fields = []
              items.forEach(item => {
                const k = item.fk_property || item.fk_class_field;
                if (!o[k]) {
                  fields.push(item)
                  o[k] = true
                }
              })
              return fields;
            }),
            // ))
          )
      })
    )
  }

  /**
   * Pipes all the properties of a field, where the target class is enabled
   */
  @spyTag @cache({ refCount: false }) pipePropertiesOfFieldItemWhereTargetEnabled(field: ProClassFieldConfig): Observable<DfhProperty[]> {

    const o = !!field.fk_domain_class;

    let $: Observable<ByPk<DfhProperty>>
    if (field.fk_domain_class) {
      $ = this.p.dfh$.property$.by_has_domain__pk_property$
        .key(field.fk_domain_class + '_' + field.fk_property)
    }
    else if (field.fk_range_class) {
      $ = this.p.dfh$.property$.by_has_range__pk_property$
        .key(field.fk_range_class + '_' + field.fk_property)
    }
    const allowedClasses$ = this.pipeClassesAvailableInCache()

    // It may make sense to add a second parameter 'appContext' to this function
    // and restrict the number of propertyFields by restricting
    // allowed target classes only to enabled in entity or required classes:
    //    const allowedClasses$ = this.pipeClassesInEntitesOrRequired()
    // ... for create screens.

    // Filter out only the properties for which target class is allowed
    // remark: may be depending on appContext in future
    return combineLatest($, allowedClasses$).pipe(
      map(([props, allowedClasses]) => values(props).filter(prop => {
        return o ?
          !!allowedClasses[prop.has_range] :
          !!allowedClasses[prop.has_domain];
      })),
    )
  }

  /**
   * Pipes all the properties of a class, where the target class is enabled
   */
  @spyTag @cache({ refCount: false }) pipePropertiesOfClassWhereTargetEnabled(pkClass: number, isOutgoing: boolean): Observable<DfhProperty[]> {


    let $: Observable<ByPk<DfhProperty>>
    if (isOutgoing) {
      $ = this.p.dfh$.property$.by_has_domain$.key(pkClass)
    }
    else {
      $ = this.p.dfh$.property$.by_has_range$.key(pkClass)
    }
    const allowedClasses$ = this.pipeClassesAvailableInCache()

    // It may make sense to add a second parameter 'appContext' to this function
    // and restrict the number of propertyFields by restricting
    // allowed target classes only to enabled in entity or required classes:
    //    const allowedClasses$ = this.pipeClassesInEntitesOrRequired()
    // ... for create screens.

    // Filter out only the properties for which target class is allowed
    // remark: may be depending on appContext in future
    return combineLatest($, allowedClasses$).pipe(
      map(([props, allowedClasses]) => values(props).filter(prop => {
        return isOutgoing ?
          !!allowedClasses[prop.has_range] :
          !!allowedClasses[prop.has_domain];
      })),
    )
  }

  /**
 * input: a property of origin
 * observable: a
 */
  @spyTag @cache({ refCount: false }) pipeInheritedPropertyPks(pkProperty: number): Observable<number[]> {
    return this.p.dfh$.property$.pk_property__has_domain__has_range$.key(pkProperty).pipe(
      filter(i => !!i),
      map((x) => Object.keys(x).map(k => parseInt(k, 10)))
    )
  }

  /**
   * Delivers class label for active project
   */
  @spyTag @cache({ refCount: false }) pipeClassLabel(pkClass?: number): Observable<string> {

    return combineLatest(
      this.p.pkProject$,
      this.p.pipeActiveDefaultLanguage()
    ).pipe(
      switchMap(([fkProject, language]) => this.pipeTextProperty({ pkClass, fkProject, language, type: 'label' })
        .pipe(
          map(items => {
            const i = items.find(item => !!item)
            return i ? i.text : `* no label (id: ${pkClass}) *`
          })
        ))
    )
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
  @spyTag @cache({ refCount: false }) pipeTextProperty(d: {
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
      }).pipe(map((item) => {
        if (!item) return undefined;
        const origin: LabelOrigin = 'of project in project lang';
        return { origin, text: item.string }
      })),

      // label of default project
      this.pipeProTextProperty({
        fk_project: Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
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
        fk_project: Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT,
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
  }

  /**
   * Pipes ProTextProperty
   */
  @spyTag @cache({ refCount: false }) pipeProTextProperty(d: {
    fk_project: number,
    fk_system_type: number,
    fk_language: number,
    fk_dfh_class?: number,
    fk_dfh_property?: number,
    fk_dfh_property_domain?: number,
    fk_dfh_property_range?: number,
  }): Observable<ProTextProperty> {
    const key = textPropertyByFksKey(d)
    return this.p.pro$.text_property$.by_fks$.key(key)
  }

  /**
   * Pipes DfhLabel
   */
  @spyTag @cache({ refCount: false }) pipeDfhLabel(d: {
    type: 'label' | 'definition' | 'scopeNote',
    language: string,
    fk_class?: number,
    fk_profile?: number,
    fk_property?: number,
    fk_project?: number,
  }): Observable<DfhLabel> {
    const key = dfhLabelByFksKey(d)
    return this.p.dfh$.label$.by_fks$.key(key)
  }

  /**
   * Delivers best fitting property field label for active project
  */
  @spyTag @cache({ refCount: false }) pipeLabelOfPropertyField(fkProperty: number, fkPropertyDomain: number, fkPropertyRange: number): Observable<string> {
    const isOutgoing = !!fkPropertyDomain;
    // const system_type = isOutgoing ? (singular ? 180 : 181) : (singular ? 182 : 183)

    return combineLatest(
      this.p.pkProject$,
      this.p.pipeActiveDefaultLanguage()
    ).pipe(
      switchMap(([fkProject, language]) => this.pipeTextProperty(
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

    // return combineLatest(
    //   this.pipeDefaultLabelsOfPropertyAndSystemType(fkProperty, fkDomainClass, fkRangeClass, system_type).pipe(
    //     map(l => !l || l.length < 1 ? null : l[0].label),
    //     startWith('')
    //   ),
    //   this.p.dfh$.label$.by_fk_profile__type$.key(fkProperty + '_label').pipe(
    //     map(p => values(p)),
    //     map(dfhLabel => {
    //       if (!dfhLabel || !dfhLabel.length) return '';
    //       // TODO: Pick best language here
    //       else return isOutgoing ? dfhLabel[0].label : 'reverse of: ' + dfhLabel[0].label
    //     }),
    //     startWith('')
    //   ),
    // ).pipe(
    //   map(([l, p]) => (l ? l : p)),
    //   distinctUntilChanged()
    // );
  }


  // @spyTag @cache({ refCount: false }) pipeDefaultLabelsOfPropertyAndSystemType(fkProperty: number, fkRangeClass: number | null, fkDomainClass: number | null, system_type): Observable<ProPropertyLabel[]> {
  //   return this.p.pro$.text_property$.by_fk_project__fk_property__fk_domain_class__fk_range_class__fk_system_type$
  //     .key([Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT, fkProperty, fkRangeClass, fkDomainClass, system_type])
  //     .pipe(
  //       map(x => values(x)),
  //       startWith([])
  //     )
  // }


  // @spyTag @cache({ refCount: false }) pipeDefaultLabelsOfProperty(fkProperty: number, fkRangeClass: number | null, fkDomainClass: number | null): Observable<ProPropertyLabel[]> {
  //   return this.p.pro$.text_property$.by_fk_project__fk_property__fk_domain_class__fk_range_class$
  //     .key([Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT, fkProperty, fkRangeClass, fkDomainClass])
  //     .pipe(
  //       map(x => values(x)),
  //       startWith([])
  //     )
  // }

  // @spyTag @cache({ refCount: false }) pipeProjectLabelsOfProperty(fkProperty: number, fkRangeClass: number | null, fkDomainClass: number | null): Observable<ProPropertyLabel[]> {
  //   return this.p.pkProject$.pipe(
  //     switchMap(pkProject => this.p.pro$.text_property$.by_fk_project__fk_property__fk_domain_class__fk_range_class$
  //       .key([pkProject, fkProperty, fkRangeClass, fkDomainClass])
  //       .pipe(
  //         map(x => values(x)),
  //         startWith([])
  //       )
  //     )
  //   )
  // }


  @spyTag @cache({ refCount: false }) pipeListTypeOfClass(targetClassPk: number): Observable<ListType> {
    return this.p.dfh$.class$.by_pk_class$.key(targetClassPk).pipe(
      filter(i => !!i),
      map(klass => {

        if (targetClassPk == DfhConfig.CLASS_PK_APPELLATION) {
          return 'appellation'
        }
        else if (targetClassPk == DfhConfig.CLASS_PK_LANGUAGE) {
          return 'language'
        }
        else if (targetClassPk == DfhConfig.CLASS_PK_PLACE) {
          return 'place'
        }
        else if (targetClassPk == DfhConfig.CLASS_PK_TIME_PRIMITIVE) {
          return 'time-primitive'
        }
        else if (klass.basic_type === 8 || klass.basic_type === 30) {
          return 'entity-preview'
        }
        else {
          return 'temporal-entity'
        }
      })
    )

  }
  /**
   * returns an object where the keys are the pks of the Classes
   * loaded and available in store, independent of their actual use
   *
   * compared to this.pipeClassesInEntitesOrRequired() this function
   * also may return classPks for classes disabled in Entities, for
   * which the properties and information (instances) are still
   * to be displayed.
   *
   *
   * this is usefull to check if a class is available at all
   */
  @spyTag @cache({ refCount: false }) pipeClassesAvailableInCache(): Observable<{ [key: string]: number }> {
    return this.p.dfh$.class$.by_pk_class$.all$.pipe(
      map(all => keys(all).map(x => typeof x == 'string' ? parseInt(x, 10) : x)),
      map((all) => indexBy((x) => x.toString(), all)),
      startWith({})
    )
  }


  /**
   * returns an object where the keys are the pks of the Classes
   * used by the given project
   * - or because the class is enabled by class_proj_rel
   * - or because the class is required by sources or by basics
   *
   * this is usefull to check if a class is available at all
   */
  @spyTag @cache({ refCount: false }) pipeClassesInEntitesOrRequired(): Observable<{ [key: string]: number }> {
    return combineLatest(
      this.pipeClassesEnabledInEntities(),
      this.pipeClassesRequired()
    ).pipe(
      map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
      startWith({})
    )
  }

  /**
   * returns an object where the keys are the pks of the Classes
   * used by the given project:
   * - or because the class is enabled by class_proj_rel
   * - or because the class is required by sources
   *
   * This is usefull to create select dropdowns of classes users will know
   */
  @spyTag @cache({ refCount: false }) pipeClassesInEntitiesOrSources(): Observable<{ [key: string]: number }> {
    return combineLatest(
      this.pipeClassesEnabledInEntities(),
      this.pipeClassesRequiredBySources()
    ).pipe(
      map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
      startWith({})
    )
  }

  @spyTag @cache({ refCount: false }) pipeClassesRequiredBySources() {
    return this.p.sys$.system_relevant_class$.by_required_by_sources$.key('true')
      .pipe(map(c => values(c).map(k => k.fk_class)))
  }


  @spyTag @cache({ refCount: false }) pipeClassesRequired() {
    return this.p.sys$.system_relevant_class$.by_required$.key('true')
      .pipe(map(c => values(c).map(k => k.fk_class)))
  }

  /**
   * returns observable number[] wher the numbers are the pk_profile
   * of all profiles that are enabled by the given project
   */
  @spyTag @cache({ refCount: false }) pipeProfilesEnabledByProject(): Observable<number[]> {
    return this.p.pkProject$.pipe(
      switchMap(pkProject => this.p.pro$.dfh_profile_proj_rel$.by_fk_project__enabled$
        .key(pkProject + '_true').pipe(
          map(projectProfileRels => values(projectProfileRels)
            .filter(rel => rel.enabled)
            .map(rel => rel.fk_profile)
          ),
          map(enabled => [...enabled, DfhConfig.PK_PROFILE_GEOVISTORY_BASIC]),
        ))
    )
  }

  /**
   * returns observable number[] wher the numbers are the pk_class
   * of all classes that are enabled by at least one of the activated profiles
   * of thte given project
   */
  @spyTag @cache({ refCount: false }) pipeClassesEnabledByProjectProfiles(): Observable<DfhClass[]> {
    return this.p.pkProject$.pipe(switchMap(pkProject => combineLatest([
      this.p.dfh$.class$.by_pk_class$.all$,
      this.pipeProfilesEnabledByProject()
    ]).pipe(
      map(([classesByPk, enabledProfiles]) => {
        const profilesMap = indexBy((k) => k.toString(), values(enabledProfiles))
        return values(classesByPk)
          .filter(klass => klass.profiles.some(profile => profilesMap[profile.fk_profile]))
      })
    )
    ))
  }

  /**
 * returns observable number[] wher the numbers are the pk_class
 * of all type classes that are enabled by at least one of the activated profiles
 * of thte given project
 */
  @spyTag @cache({ refCount: false }) pipeTypeClassesEnabledByProjectProfiles(): Observable<DfhClass[]> {
    return combineLatest([
      this.p.dfh$.class$.by_basic_type$.key(30),
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
  }



  /**
   * returns observable number[] wher the numbers are the pk_class
   * of all classes that are enabled by active project (using class_proj_rel)
   */
  @spyTag @cache({ refCount: false }) pipeClassesEnabledInEntities() {
    return this.p.pkProject$.pipe(switchMap(pkProject => this.p.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
      .pipe(
        map((rels) => values(rels).map(rel => rel.fk_class))
      )
    ))
  }

  /**
  * returns an object where the keys are the pks of the TeEn Classes
  * used by the given project
  */
  @spyTag @cache({ refCount: false }) pipeSelectedTeEnClassesInProject(): Observable<{ [key: string]: number }> {
    return combineLatest(
      this.pipeTeEnClassesEnabledInEntities(),
      this.pipeTeEnClassesRequiredBySources()
    ).pipe(
      map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
      startWith({})
    )
  }

  /**
   * Gets array of pk_class with teEn classes enabled in entities
   */
  @spyTag @cache({ refCount: false }) pipeTeEnClassesEnabledInEntities() {
    return this.p.pkProject$.pipe(switchMap(pkProject => this.p.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
      .pipe(
        switchMap((cs) => combineLatest(
          values(cs).map(c => this.p.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(
            filter(item => !!item)
          ))
        ).pipe(
          map(dfhClasses => this.filterTeEnCasses(dfhClasses))
        ))
      )
    ))
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
  @spyTag @cache({ refCount: false }) pipeTeEnClassesRequiredBySources() {
    return this.p.sys$.system_relevant_class$.by_required_by_sources$.key('true')
      .pipe(
        switchMap((cs) => combineLatest(
          values(cs).map(c => this.p.dfh$.class$.by_pk_class$.key(c.fk_class).pipe(
            filter(item => !!item)
          ))
        ).pipe(
          map(dfhClasses => {
            return this.filterTeEnCasses(dfhClasses)
          })
        ))
      )
  }

  @cache({ refCount: false }) pipeListDefinitionsOfProperties(properties: DfhProperty[], isOutgoing: boolean): Observable<ListDefinition[]> {
    return combineLatestOrEmpty(
      properties.map(p => {

        const o = isOutgoing;
        const targetClass = o ? p.has_range : p.has_domain;
        const sourceClass = o ? p.has_domain : p.has_range;
        const targetMaxQuantity = o ?
          p.range_instances_max_quantifier :
          p.domain_instances_max_quantifier;

        return combineLatest(
          this.pipeClassLabel(targetClass),
          this.pipeListTypeOfClass(targetClass),
          this.pipeLabelOfPropertyField(
            p.pk_property,
            isOutgoing ? p.has_domain : null,
            isOutgoing ? null : p.has_range,
          )
        ).pipe(
          map(([targetClassLabel, listType, label]) => {

            const node: ListDefinition = {
              listType,
              targetClass,
              sourceClass,
              targetClassLabel,
              targetMaxQuantity,
              label,
              pkProperty: p.pk_property,
              fkClassField: undefined,
              isOutgoing: o,
              isIdentityDefining: p.identity_defining,
              ontoInfoLabel: p.identifier_in_namespace,
              ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/' + p.pk_property
            }
            return node
          }),
          // startWith(undefined)
        )
      })

    )
    // .pipe(
    //   filter(x => !x.includes(undefined)),
    //   startWith([])
    // )


  }


  getClassFieldListDefinition(pkClassField: number): ListDefinition {
    const template = {
      pkProperty: undefined,
      sourceClass: undefined,
      targetClass: undefined,
      isOutgoing: undefined,
      isIdentityDefining: undefined,
    }
    switch (pkClassField) {
      case SysConfig.PK_CLASS_FIELD_WHEN:
        return {
          ...template,
          listType: 'time-span',
          label: 'When',
          isOutgoing: true,
          fkClassField: pkClassField,
          ontoInfoLabel: 'P4',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/4',
          targetMaxQuantity: 1
        }
      case SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION:
        return {
          ...template,
          listType: 'text-property',
          label: 'Description',
          fkClassField: pkClassField,
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3',
          targetMaxQuantity: -1
        }
      case SysConfig.PK_CLASS_FIELD_COMMENT:
        return {
          ...template,
          fkClassField: SysConfig.PK_CLASS_FIELD_COMMENT,
          listType: 'text-property',
          label: 'Comments',
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3',
          targetMaxQuantity: -1
        }
      case SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE:
        return {
          ...template,
          listType: 'text-property',
          label: 'Exact Reference',
          fkClassField: pkClassField,
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3',
          targetMaxQuantity: -1
        }
      case SysConfig.PK_CLASS_FIELD_SHORT_TITLE:
        return {
          ...template,
          listType: 'text-property',
          label: 'Short Title',
          fkClassField: pkClassField,
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3',
          targetMaxQuantity: -1
        }
      default:
        break;
    }
  }

  getClassFieldDefinition(pkClassField: number): FieldDefinition {
    const listDef = this.getClassFieldListDefinition(pkClassField)
    return { ...listDef, listDefinitions: [listDef] }
  }


  @spyTag @cache({ refCount: false }) pipeFieldDefinitions(pkClass: number): Observable<FieldDefinition[]> {
    return combineLatest(
      this.pipeDefaultFieldDefinitions(pkClass),
      this.pipeSpecificFieldDefinitions(pkClass)
    )
      .pipe(
        map(([a, b]) => [...a, ...b])
      )
  }

  @spyTag @cache({ refCount: false }) pipeFieldDefinitionsSpecificFirst(pkClass: number): Observable<FieldDefinition[]> {
    return combineLatest(
      this.pipeSpecificFieldDefinitions(pkClass),
      this.pipeDefaultFieldDefinitions(pkClass),
    )
      .pipe(
        map(([a, b]) => [...a, ...b])
      )
  }

  /**
   * Pipes the fields for temporal entity forms
   * - the specific fields
   * - the when field
   * - if available: the type field
   */
  @spyTag @cache({ refCount: false }) pipeFieldDefinitionsForTeEnForm(pkClass: number): Observable<FieldDefinition[]> {
    const hasTypeListDef$ = this.pipeHasTypeListDefinition(pkClass)
    return combineLatest(
      this.pipeSpecificFieldDefinitions(pkClass),
      hasTypeListDef$,
    ).pipe(
      map(([fields, hasTypeListDefs]) => {
        const when = this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_WHEN)
        return [
          ...fields,
          when,
          ...hasTypeListDefs.map((hasTypeListDef) => {
            const typeField: FieldDefinition = { ...hasTypeListDef, listDefinitions: [hasTypeListDef] }
            return typeField;
          })
        ]
      })
    )
  }


  /**
   * Pipe the specific fields of given class
   */
  @spyTag @cache({ refCount: false }) pipeSpecificFieldDefinitions(pkClass: number): Observable<FieldDefinition[]> {
    return combineLatest(
      this.pipePropertiesOfClassWhereTargetEnabled(pkClass, true).pipe(
        // filter out the 'has type' property, since it is part of the default fields
        map(outgoing => outgoing.filter(o => !o.is_has_type_subproperty))
      ),
      this.pipePropertiesOfClassWhereTargetEnabled(pkClass, false).pipe(
        // filter out the 'has appellation' property, since it is part of the default fields
        map(ingoing => ingoing.filter(i =>
          i.pk_property !== DfhConfig.PROPERTY_PK_IS_APPELLATION_OF
          && i.pk_property !== DfhConfig.PROPERTY_PK_GEOVP1_IS_REPRODUCTION_OF
        ))
      ),
      this.pipeClassFieldConfigs(pkClass)
    ).pipe(
      switchMap(([outgoing, ingoing, fieldConfigs]) => {

        const key = (fc: Partial<ProClassFieldConfig>) => `${fc.fk_property}_${fc.fk_domain_class}_${fc.fk_range_class}`;
        const indexed = indexBy((fc) => `${fc.fk_property}_${fc.fk_domain_class}_${fc.fk_range_class}`, fieldConfigs)
        const getFieldConfig = (listDef: ListDefinition): ProClassFieldConfig => {
          return indexed[key({
            fk_property: listDef.pkProperty,
            fk_domain_class: listDef.isOutgoing ? listDef.sourceClass : null,
            fk_range_class: listDef.isOutgoing ? null : listDef.sourceClass,
          })]
        }

        // Create list definitions
        return combineLatest(
          this.pipeListDefinitionsOfProperties(ingoing, false),
          this.pipeListDefinitionsOfProperties(outgoing, true)
        ).pipe(
          map(([ingoingListDefs, outgoingListDefs]) => {
            const listDefinitions = [...ingoingListDefs, ...outgoingListDefs];

            // Create field definitions
            const fieldDefs: { [key: string]: FieldDefinition } = {}
            listDefinitions.forEach(listDef => {
              // if (!(listDef.pkProperty === DfhConfig.PROPERTY_PK_IS_APPELLATION_OF && !listDef.isOutgoing)) {
              const k = listDef.pkProperty + '_' + listDef.isOutgoing;

              if (!fieldDefs[k]) {
                fieldDefs[k] = {
                  ...listDef,
                  fieldConfig: getFieldConfig(listDef),
                  listDefinitions: [listDef],
                  targetClasses: [listDef.targetClass]
                }
              } else {
                fieldDefs[k].listDefinitions.push(listDef)
                fieldDefs[k].targetClasses.push(listDef.targetClass)
              }

              // }

            })
            // Order the fields according to ord_num (from project's config, kleiolab's config) or put it at end of list.
            return values(fieldDefs).sort((a, b) => (
              (a.fieldConfig || { ord_num: Number.POSITIVE_INFINITY }).ord_num >
                (b.fieldConfig || { ord_num: Number.POSITIVE_INFINITY }).ord_num ?
                1 : -1
            ))
          })
        )
      })
    )

  }

  /**
   * Pipe the fields for identification of given class
   */
  @spyTag @cache({ refCount: false }) pipeDefaultFieldDefinitions(pkClass: number): Observable<FieldDefinition[]> {


    /**
     * Pipe the generic field has appellation
     * with the given class as range
     */
    const hasAppeProp: DfhProperty = {
      has_domain: DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE,
      pk_property: DfhConfig.PROPERTY_PK_IS_APPELLATION_OF,
      has_range: pkClass,
      domain_instances_max_quantifier: -1,
      domain_instances_min_quantifier: 0,
      range_instances_max_quantifier: 1,
      range_instances_min_quantifier: 1,
      identifier_in_namespace: 'histP9',
      identity_defining: true,
      is_inherited: true,
      is_has_type_subproperty: false,
      profiles: []
    }
    const hasAppeListDef$ = this.pipeListDefinitionsOfProperties([hasAppeProp], false).pipe(
      filter(listDefs => !!listDefs && !!listDefs[0]),
      map(listDefs => listDefs[0])
    );

    /**
     * Pipe the generic field has type
     * with the given class as range
     */
    const hasTypeListDef$ = this.pipeHasTypeListDefinition(pkClass)
    return combineLatest(
      hasAppeListDef$,
      hasTypeListDef$,
      this.p.dfh$.class$.by_pk_class$.key(pkClass).pipe(filter(c => !!c))
    ).pipe(
      map(([hasAppeListDef, hasTypeListDefs, klass]) => {
        const fields: FieldDefinition[] = []


        /*
         * Add 'short title' text-property to
         *
         * Manifestation Product Type – F3, 219
         * Manifestation Singleton – F4, 220
         * Item – F5, 221
         * Web Request – geovC4, 502
         * Web Request – geovC4, 502
         */
        if ([
          DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE,
          DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON,
          DfhConfig.CLASS_PK_ITEM,
          DfhConfig.CLASS_PK_WEB_REQUEST].includes(pkClass)) {
          fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_SHORT_TITLE));
        }

        /*
        * Add 'has appellation for language – histP9' to
        *
        * all classes except 'Appellation for language – histC10', 365
        */
        if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
          const appeField: FieldDefinition = { ...hasAppeListDef, listDefinitions: [hasAppeListDef] }
          fields.push(appeField);
        }


        /*
        * Add 'hasType' fields
        */
        if (hasTypeListDefs && hasTypeListDefs.length > 0) {
          hasTypeListDefs.forEach((hasTypeListDef) => {
            const typeField: FieldDefinition = { ...hasTypeListDef, listDefinitions: [hasTypeListDef] }
            fields.push(typeField);
          })
        }

        /*
        * Add 'entity definition' text-property to
        *
        * all classes except 'Appellation for language – histC10', 365
        */
        if (pkClass !== DfhConfig.CLASS_PK_APPELLATION_FOR_LANGUAGE) {
          fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION));
        }
        /*
        * Add 'identifier / exact reference / url / ...' text-property to
        *
        * Web Request – geovC4, 502
        */
        if (DfhConfig.CLASS_PK_WEB_REQUEST === pkClass) {
          fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE));
        }

        /*
        * Add 'comment' text-property to
        *
        * Manifestation Product Type – F3, 219
        * Manifestation Singleton – F4, 220
        * Item – F5, 221
        * Web Request – geovC4, 502
        * Expression portion – geovC5, 503
        */
        if ([
          DfhConfig.CLASS_PK_MANIFESTATION_PRODUCT_TYPE,
          DfhConfig.CLASS_PK_MANIFESTATION_SINGLETON,
          DfhConfig.CLASS_PK_ITEM,
          DfhConfig.CLASS_PK_WEB_REQUEST,
          DfhConfig.CLASS_PK_EXPRESSION_PORTION].includes(pkClass)) {
          fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_COMMENT));
        }

        /*
        * Add 'time-span' field to
        *
        * all temporal entity classes
        */
        if (klass.basic_type === 9) {
          fields.push(this.getClassFieldDefinition(SysConfig.PK_CLASS_FIELD_WHEN));
        }

        return fields

      })
    )
  }


  private pipeHasTypeListDefinition(pkClass: number) {
    return this.p.dfh$.property$.by_has_domain$.key(pkClass).pipe(
      // check if this class has 'has type' subproperty
      map(outgoing => {
        return values(outgoing).filter((prop) => prop.is_has_type_subproperty);
      }), switchMap(hasTypeProps => combineLatestOrEmpty(hasTypeProps.map(dfhProp => {
        return this.pipeListDefinitionsOfProperties([dfhProp], true).pipe(filter(listDefs => !!listDefs && !!listDefs[0]), map(listDefs => {
          const listDef = listDefs[0];
          listDef.listType = 'has-type';
          return listDef;
        }));
      }))));
  }

  /**
   *
   */
  @spyTag @cache({ refCount: false }) pipeTypeAndTypedClasses(enabledIn?: 'entities' | 'sources'): Observable<{ typedClass: number, typeClass: number }[]> {

    let pks$: Observable<number[]>[];

    const fromSources$ = this.p.sys$.system_relevant_class$.by_required_by_sources$.key('true').pipe(
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

    return combineLatest(pks$).pipe(
      map(arrayOfPkArrays => uniq(flatten<number>(arrayOfPkArrays))),
      switchMap(pks => this.pipeTypeAndTypedClassesOfTypedClasses(pks))
    )
  }

  @spyTag @cache({ refCount: false }) pipeTypeAndTypedClassesOfTypedClasses(pkTypedClasses: number[]): Observable<{ typedClass: number, typeClass: number }[]> {

    return this.p.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(
      map((allHasTypeProps) => {
        const byDomain = indexBy(k => k.has_domain.toString(), values(allHasTypeProps));
        return pkTypedClasses.map(pk => ({
          typedClass: pk,
          typeClass: byDomain[pk] ? byDomain[pk].has_range : undefined
        }))
      }))
  }

  @spyTag @cache({ refCount: false }) pipeTypeClassOfTypedClass(pkTypedClass): Observable<number> {
    return this.p.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(
      map((allHasTypeProps) => {
        const byDomain = indexBy(k => k.has_domain.toString(), values(allHasTypeProps));
        return byDomain[pkTypedClass] ? byDomain[pkTypedClass].has_range : undefined
      }))
  }

  @spyTag @cache({ refCount: false }) pipeTypedClassesOfTypeClasses(pkTypeClasses: number[]): Observable<number[]> {

    return this.p.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(
      map((allHasTypeProps) => {
        const byDomain = indexBy(k => k.has_range.toString(), values(allHasTypeProps));
        return pkTypeClasses.map(pk => byDomain[pk] ? byDomain[pk].has_domain : undefined)
      }))
  }


  @spyTag @cache({ refCount: false }) pipeTypePropertyOfTypedClass(pkTypedClass): Observable<number> {
    return this.p.dfh$.property$.by_is_has_type_subproperty$.key('true').pipe(
      map((allHasTypeProps) => {
        const typeProp = values(allHasTypeProps).find(p => p.has_domain === pkTypedClass)
        return typeProp ? typeProp.pk_property : undefined;
      }))
  }

  @spyTag @cache({ refCount: false }) pipeTargetClassesOfProperties(pkProperties: number[], isOutgoing: boolean): Observable<number[]> {
    return this.p.dfh$.property$.by_pk_property$.all$.pipe(
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
  }
}
