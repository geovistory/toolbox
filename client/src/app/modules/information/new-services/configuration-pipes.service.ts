
import { Injectable } from '@angular/core';
import { ActiveProjectService, DfhClass, DfhPropertyView, limitTo, ProClassFieldConfig, ProPropertyLabel, SysConfig } from 'app/core';
import { DfhConfig } from 'app/modules/information/shared/dfh-config';
import { flatten, indexBy, uniq, values, keys } from 'ramda';
import { combineLatest, Observable, of } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';
import * as Config from '../../../../../../common/config/Config';
import { cache, spyTag } from '../../../shared';
import { FieldDefinition, ListDefinition, ListType } from '../new-components/properties-tree/properties-tree.models';
import { ByPk } from 'app/core/store/model';
import { objectToQuery } from 'cesium';

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
  * Groups inherited properties by property of origin
  *
  * TODO: once identity of fk_property is changed, so that dfh_class_field_config only contains fk_property of original properties
  *  - Simplify this function by removing the whole merge map part and taking just the values of the by_fk_class__fk_app_context$.key()
  */
  @spyTag @cache({ refCount: false }) pipeClassFieldConfigs(pkClass: number, appContext: number, limit?: number): Observable<ProClassFieldConfig[]> {
    return this.p.pro$.class_field_config$.by_fk_class__fk_app_context$.key(pkClass + '_' + appContext)
      .pipe(
        // switchMap(ds => combineLatestOrEmpty(values(ds).map(d => {
        //   if (!d.fk_property) return of({ ...d, fk_property_of_origin: undefined });
        //   // Join the fk_property_of_origin
        //   return this.p.dfh$.property_view$.by_dfh_pk_property$.key(d.fk_property).pipe(filter(i => !!i)).pipe(map(p => ({
        //     ...d,
        //     fk_property_of_origin: p.fk_property
        //   })))

        // }))
        // .pipe(
        map((items) => values(items).sort((a, b) => (a.ord_num > b.ord_num ? 1 : -1))),
        limitTo(limit),
        map((items: ProClassFieldConfig[]) => {
          const o = {}
          const fields = []
          items.forEach(d => {
            const k = d.fk_property || d.fk_class_field;
            if (!o[k]) {
              fields.push(d)
              o[k] = true
            }
          })
          return fields;
        }),
        // ))
      )
  }

  /**
   * Pipes all the properties of a field, where the target class is enabled
   */
  @spyTag @cache({ refCount: false }) pipePropertiesOfFieldItemWhereTargetEnabled(field: ProClassFieldConfig): Observable<DfhPropertyView[]> {

    const o = !!field.fk_domain_class;

    let $: Observable<ByPk<DfhPropertyView>>
    if (field.fk_domain_class) {
      $ = this.p.dfh$.property_view$.by_dfh_has_domain__fk_property$
        .key(field.fk_domain_class + '_' + field.fk_property)
    }
    else if (field.fk_range_class) {
      $ = this.p.dfh$.property_view$.by_dfh_has_range__fk_property$
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
          !!allowedClasses[prop.dfh_has_range] :
          !!allowedClasses[prop.dfh_has_domain];
      })),
    )
  }


  /**
 * input: a property of origin
 * observable: a
 */
  @spyTag @cache({ refCount: false }) pipeInheritedPropertyPks(pkProperty: number): Observable<number[]> {
    return this.p.dfh$.property_view$.by_fk_property$.key(pkProperty).pipe(
      filter(i => !!i),
      map((x) => Object.keys(x).map(k => parseInt(k, 10)))
    )
  }


  @spyTag @cache({ refCount: false }) pipeLabelOfClass(pkClass: number): Observable<string> {
    return combineLatest(
      this.p.dfh$.class$.by_dfh_pk_class$.key(pkClass).pipe(
        map(c => (c ? c.dfh_standard_label : '')),
        startWith('')
      ),
      this.p.dfh$.label$.by_dfh_fk_class$.key(pkClass).pipe(
        filter(l => !!l && Object.keys(l).length > 0),
        map(l => values(l)[0].dfh_label),
        startWith('')
      ),
    ).pipe(
      map(([c, l]) => (l ? l : c))
    );
  }

  /**
   * TODO: When changing identity of properties, add optional paramaters for domain and range classes
   *
   */
  @spyTag @cache({ refCount: false }) pipeLabelOfProperty(fkProperty: number, fkDomainClass: number, fkRangeClass: number, singular: boolean): Observable<string> {
    const isOutgoing = !!fkDomainClass;
    const system_type = isOutgoing ? (singular ? 180 : 181) : (singular ? 182 : 183)
    return combineLatest(
      this.pipeDefaultLabelsOfPropertyAndSystemType(fkProperty, fkDomainClass, fkRangeClass, system_type).pipe(
        map(l => !l || l.length < 1 ? null : l[0].label),
        startWith('')
      ),
      this.p.dfh$.property_view$.by_fk_property$.key(fkProperty).pipe(
        map(p => values(p)),
        map(c => {
          if (!c || !c.length) return '';
          else return isOutgoing ? c[0].dfh_standard_label : 'reverse of: ' + c[0].dfh_standard_label
        }),
        startWith('')
      ),
    ).pipe(
      map(([l, p]) => (l ? l : p)),
      distinctUntilChanged()
    );
  }


  @spyTag @cache({ refCount: false }) pipeDefaultLabelsOfPropertyAndSystemType(fkProperty: number, fkRangeClass: number | null, fkDomainClass: number | null, system_type): Observable<ProPropertyLabel[]> {
    return this.p.pro$.property_label$.by_fk_project__fk_property__fk_domain_class__fk_range_class__fk_system_type$
      .key([Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT, fkProperty, fkRangeClass, fkDomainClass, system_type])
      .pipe(
        map(x => values(x)),
        startWith([])
      )
  }


  @spyTag @cache({ refCount: false }) pipeDefaultLabelsOfProperty(fkProperty: number, fkRangeClass: number | null, fkDomainClass: number | null): Observable<ProPropertyLabel[]> {
    return this.p.pro$.property_label$.by_fk_project__fk_property__fk_domain_class__fk_range_class$
      .key([Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT, fkProperty, fkRangeClass, fkDomainClass])
      .pipe(
        map(x => values(x)),
        startWith([])
      )
  }

  @spyTag @cache({ refCount: false }) pipeProjectLabelsOfProperty(fkProperty: number, fkRangeClass: number | null, fkDomainClass: number | null): Observable<ProPropertyLabel[]> {
    return this.p.pkProject$.pipe(
      switchMap(pkProject => this.p.pro$.property_label$.by_fk_project__fk_property__fk_domain_class__fk_range_class$
        .key([pkProject, fkProperty, fkRangeClass, fkDomainClass])
        .pipe(
          map(x => values(x)),
          startWith([])
        )
      )
    )
  }

  /**
   * pipes the dfh_standard_label of the property with the given pk_property (of origin)
   */
  @spyTag @cache({ refCount: false }) pipeDfhProperyStandardLabel(fkOriginalProperty): Observable<string> {
    return this.p.dfh$.property_view$.by_fk_property$.key(fkOriginalProperty).pipe(
      filter(i => !!i),
      map(p => values(p)[0].dfh_standard_label)
    )
  }


  @spyTag @cache({ refCount: false }) pipeListTypeOfClass(targetClassPk: number): Observable<ListType> {
    return this.p.dfh$.class$.by_dfh_pk_class$.key(targetClassPk).pipe(
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
        else if (klass.dfh_fk_system_type === 8) {
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
    return this.p.dfh$.class$.by_dfh_pk_class$.all$.pipe(
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
   * returns observable number[] wher the numbers are the pk_entity
   * of all classes that are enabled by active project (using class_proj_rel)
   */
  @spyTag @cache({ refCount: false }) pipeClassesEnabledInEntities() {
    return this.p.pkProject$.pipe(switchMap(pkProject => this.p.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
      .pipe(
        switchMap((cs) => combineLatest(
          values(cs).map(c => this.p.dfh$.class$.by_pk_entity$.key(c.fk_entity).pipe(
            filter(item => !!item),
            map(dfhc => values(dfhc)[0].dfh_pk_class)
          ))
        ))
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
          values(cs).map(c => this.p.dfh$.class$.by_pk_entity$.key(c.fk_entity).pipe(
            filter(item => !!item),
            map(dfhc => values(dfhc)[0])
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
      if (c.dfh_fk_system_type === 9) pks.push(c.dfh_pk_class);
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
          values(cs).map(c => this.p.dfh$.class$.by_dfh_pk_class$.key(c.fk_class).pipe(
            filter(item => !!item)
          ))
        ).pipe(
          map(dfhClasses => {
            return this.filterTeEnCasses(dfhClasses)
          })
        ))
      )
  }


  @spyTag @cache({ refCount: false }) pipeListDefinitionsOfField(field: ProClassFieldConfig): Observable<ListDefinition[]> {
    if (field.fk_property) {
      return this.pipePropertiesOfFieldItemWhereTargetEnabled(field).pipe(
        switchMap(ps => combineLatest(
          ps.map(p => {
            // TODO once pkProperty concept is changed, simplify this.

            const o = !!field.fk_domain_class;
            const targetClass = o ? p.dfh_has_range : p.dfh_has_domain;
            const sourceClass = o ? p.dfh_has_domain : p.dfh_has_range;
            const targetMaxQuantity = o ?
              p.dfh_range_instances_max_quantifier :
              p.dfh_domain_instances_max_quantifier;

            return combineLatest(
              this.pipeLabelOfClass(targetClass),
              this.pipeListTypeOfClass(targetClass),
              this.pipeLabelOfProperty(
                field.fk_property,
                field.fk_domain_class,
                field.fk_range_class,
                (targetMaxQuantity === 1)
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
                  pkProperty: p.fk_property,
                  // fkPropertyOfOrigin: field.fk_property_of_origin,
                  fkClassField: undefined,
                  isOutgoing: o,
                  isIdentityDefining: p.identity_defining,
                  ontoInfoLabel: p.dfh_identifier_in_namespace,
                  ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/' + p.fk_property
                }
                return node
              }),
              startWith(undefined)
            )
          })

        ).pipe(
          filter(x => !x.includes(undefined)),
          startWith([])
        ))
      )
    } else {
      return of([this.getClassFieldListDefinition(field.fk_class_field)])
    }
  }


  getClassFieldListDefinition(pkClassField): ListDefinition {
    const template = {
      pkProperty: undefined,
      fkPropertyOfOrigin: undefined,
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
          label: 'Entity Definition',
          fkClassField: pkClassField,
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



  /**
   * Pipe the fields of given class for given app context
   */
  @spyTag @cache({ refCount: false }) pipeFieldDefinitions(pkClass: number, appContext: number): Observable<FieldDefinition[]> {
    return this.pipeClassFieldConfigs(pkClass, appContext).pipe(
      switchMap(fields => combineLatest(fields.map(field => this.pipeFieldDefinition(field))))
    )
  }

  /**
   * Pipe the field definition with label, links to ontoMe, max quantity etc for given class-field-config
   */
  @spyTag @cache({ refCount: false }) pipeFieldDefinition(field: ProClassFieldConfig): Observable<FieldDefinition> {
    if (field.fk_class_field) {
      const classField = this.getClassFieldListDefinition(field.fk_class_field);
      return of({ ...classField, listDefinitions: [classField], fkPropertyOfOrigin: undefined })
    }
    else {

      // return this.pipePropertyOfOriginOrInherited(field.fk_property_of_origin, field.fk_property)
      return this.p.dfh$.property_view$.by_fk_property$.key(field.fk_property)
        .pipe(
          map(byPk => values(byPk)),
          filter(ps => !!ps && ps.length > 0),
          map(ps => ps[0]),
          switchMap((p) => {
            const maxQ = field.fk_domain_class ? p.dfh_range_instances_max_quantifier : p.dfh_domain_instances_max_quantifier;
            const isOutgoing = !!field.fk_domain_class
            return combineLatest(
              this.pipeListDefinitionsOfField(field),
              this.pipeLabelOfProperty(
                field.fk_property,
                field.fk_domain_class,
                field.fk_range_class,
                (maxQ === 1)
              )
            ).pipe(
              filter(([listDefinitions, label]) => (!!listDefinitions && listDefinitions.length > 0)),
              map(([listDefinitions, label]) => {
                const fieldDefinition: FieldDefinition = {
                  listType: listDefinitions[0].listType,
                  isOutgoing,
                  label,
                  listDefinitions,
                  ontoInfoLabel: p.dfh_identifier_in_namespace,
                  ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/' + p.fk_property,
                  pkProperty: field.fk_property,
                  targetClasses: listDefinitions.map(l => l.targetClass),
                  targetMaxQuantity: maxQ,
                  isIdentityDefining: listDefinitions.some(l => l.isIdentityDefining)
                }
                return fieldDefinition;
              })
            )
          }
          )
        )
    }
  }

  // /**
  //  * Gets the property of origin, if existing in the data, else take
  //  * the fkProperty
  //  *
  //  * @param fkOropertyOfOrigin: this always references an original property
  //  * @param fkProperty: this can reference an original or an inherited property
  //  *
  //  * TODO this function will become superflous, once identity of properties is changed. This will be enough:
  //  * - this.p.dfh$.property_view$.by_dfh_pk_property$.key(field.fk_property_of_origin)
  //  */
  // @spyTag @cache({ refCount: false }) pipePropertyOfOriginOrInherited(fkOropertyOfOrigin: number, fkProperty: number): Observable<DfhPropertyView> {
  //   return this.p.dfh$.property_view$.by_fk_property$.key(fkOropertyOfOrigin)
  //     .pipe(
  //       filter(i => !!i),
  //       map(ps => {
  //         // if original property exists, return this one
  //         if (ps[fkOropertyOfOrigin]) return ps[fkOropertyOfOrigin];
  //         // else return the first
  //         else return ps[fkProperty]
  //       })
  //     )
  // }

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
    return combineLatest(
      pkTypedClasses.map(pk => this.p.sys$.class_has_type_property$.by_pk_typed_class$.key(pk).pipe(
        map(x => ({
          typedClass: pk,
          typeClass: !x ? undefined : values(x)[0].pk_type_class
        }))
      ))
    )
  }

  @spyTag @cache({ refCount: false }) pipeTypeClassOfTypedClass(pkTypedClass): Observable<number> {
    return this.p.sys$.class_has_type_property$.by_pk_typed_class$.key(pkTypedClass).pipe(
      map(x => {
        if (!x || Object.keys(x).length < 1) return undefined;
        else return values(x)[0].pk_type_class
      })
    )
  }

  @spyTag @cache({ refCount: false }) pipeTypedClassesOfTypeClasses(pkTypeClasses: number[]): Observable<number[]> {
    return this.p.sys$.class_has_type_property$.by_pk_type_class$.all$.pipe(
      map(x => {
        if (!pkTypeClasses || pkTypeClasses.length == 0) {
          return []
        }
        const typeClasses = {}
        const a = []
        pkTypeClasses.forEach(pkTypeClass => {
          if (!typeClasses[pkTypeClass] && x && Object.keys(x).length > 0) {
            typeClasses[pkTypeClass] = true;
            const typedClass = values(x[pkTypeClass])[0].pk_typed_class
            a.push(typedClass)
          }
        })
        return a;
      })
    )
  }


  @spyTag @cache({ refCount: false }) pipeTypePropertyOfTypedClass(pkTypedClass): Observable<number> {
    return this.p.sys$.class_has_type_property$.by_pk_typed_class$.key(pkTypedClass).pipe(
      map(x => {
        if (!x || Object.keys(x).length < 1) return undefined;
        else return values(x)[0].dfh_pk_property
      })
    )
  }

  @spyTag @cache({ refCount: false }) pipeTargetClassesOfPropertiesOfOrigin(pkOrigProperties: number[], isOutgoing: boolean): Observable<number[]> {
    return this.p.dfh$.property_view$.by_fk_property$.all$.pipe(
      map(x => {
        if (!pkOrigProperties || !pkOrigProperties.length) return [];

        const res = []
        const targetClasses = {};
        pkOrigProperties.forEach(pkProp => {
          const p = x[pkProp];
          if (p && Object.keys(p).length > 0) {
            const prop = values(p)[0];
            const targetClass = isOutgoing ? prop.dfh_has_range : prop.dfh_has_domain;
            if (!targetClasses[targetClass]) {
              targetClasses[targetClass] = true;
              res.push(targetClass)
            }
          }
        })
        return res;
      })
    )
  }

  @spyTag @cache({ refCount: false }) pipeTargetClassesOfProperties(pkProperties: number[], isOutgoing: boolean): Observable<number[]> {
    return this.p.dfh$.property_view$.by_fk_property$.all$.pipe(
      map(x => {
        if (!pkProperties || !pkProperties.length) return [];

        const res = []
        const targetClasses = {};
        pkProperties.forEach(pkProp => {
          const props = values(x[pkProp]);
          props.forEach(prop => {
            const targetClass = isOutgoing ? prop.dfh_has_range : prop.dfh_has_domain;
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
