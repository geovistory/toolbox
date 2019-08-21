import { Injectable } from "@angular/core";
import { DfhPropertyView, ProPropertyLabel, SysConfig, ActiveProjectService, limitTo, switchMapOr } from "app/core";
import { DfhConfig } from "app/modules/information/shared/dfh-config";
import { indexBy, uniq, values, intersection } from "ramda";
import { combineLatest, Observable, of } from "rxjs";
import { distinctUntilChanged, filter, map, startWith, switchMap, tap } from "rxjs/operators";
import * as Config from "../../../../../../common/config/Config";
import { ClassFieldConfig, FieldDefinition, ListDefinition, ListType } from "../new-components/properties-tree/properties-tree.models";
import { InformationBasicPipesService } from "./information-basic-pipes.service";
import { cache } from "../../../shared";

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
    private b: InformationBasicPipesService,
    private p: ActiveProjectService,
  ) { }

  /**
  * Groups inherited properties by property of origin
  *
  * TODO: once identity of fk_property is changed, so that dfh_class_field_config only contains fk_property of original properties
  *  - Simplify this function by removing the whole merge map part and taking just the values of the by_fk_class__fk_app_context$.key()
  */
  @cache pipeClassFieldConfigs(pkClass: number, appContext: number, limit?: number): Observable<ClassFieldConfig[]> {
    return this.p.pro$.class_field_config$.by_fk_class__fk_app_context$.key(pkClass + '_' + appContext).pipe(
      switchMap(ds => combineLatest(values(ds).map(d => {
        if (!d.fk_property) return of({ ...d, fk_property_of_origin: undefined });
        // Join the fk_property_of_origin
        return this.p.dfh$.property_view$.by_dfh_pk_property$.key(d.fk_property).pipe(filter(i => !!i)).map(p => ({
          ...d,
          fk_property_of_origin: p.fk_property
        }))

      })).pipe(
        map((ds) => ds.sort((a, b) => (a.ord_num > b.ord_num ? 1 : -1))),
        limitTo(limit),
        map((ds: ClassFieldConfig[]) => {
          const o = {}
          const fields = []
          ds.forEach(d => {
            if (!o[d.fk_property_of_origin]) {
              fields.push(d)
              o[d.fk_property_of_origin] = true
            }
          })
          return fields;
        }),
      ))
    )
  }

  /**
   * Todo: once the pk_property of inherited properties is gone
   * change this
   */
  @cache pipeEnabledInheritedPropertiesOfPropertyField(field: ClassFieldConfig): Observable<DfhPropertyView[]> {
    return combineLatest(field.property_is_outgoing ?
      this.p.dfh$.property_view$.by_dfh_has_domain__fk_property$.key(field.fk_class + '_' + field.fk_property_of_origin) :
      this.p.dfh$.property_view$.by_dfh_has_range__fk_property$.key(field.fk_class + '_' + field.fk_property_of_origin),
      this.p.pro$.class_field_config$.by_fk_property__property_is_outgoing__fk_app_context$.all$
    )
      .pipe(
        filter(([props]) => !!props),
        map(([props, fields]) => {
          return values(props).filter(prop => fields[prop.dfh_pk_property + '_' + field.property_is_outgoing + '_' + field.fk_app_context])
        }),
        startWith([])
      )
  }


  /**
 * input: a property of origin
 * observable: a
 */
  @cache pipeInheritedPropertyPks(pkProperty: number): Observable<number[]> {
    return this.p.dfh$.property_view$.by_fk_property$.key(pkProperty).pipe(
      filter(i => !!i),
      map((x) => Object.keys(x).map(k => parseInt(k)))
    )
  }


  @cache pipeLabelOfClass(pkClass: number): Observable<string> {
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
  @cache pipeLabelOfProperty(fkProperty: number, fkDomainClass: number, fkRangeClass: number, isOutgoing: boolean, singular: boolean): Observable<string> {
    const system_type = isOutgoing ? (singular ? 180 : 181) : (singular ? 182 : 183)
    return combineLatest(
      this.pipeDefaultLabelsOfPropertyAndSystemType(fkProperty, fkDomainClass, fkRangeClass, system_type).pipe(
        map(l => !l || l.length < 1 ? null : l[0].label),
        startWith('')
      ),
      this.p.dfh$.property_view$.by_dfh_pk_property$.key(fkProperty).pipe(
        filter(i => !!i),
        map(c => (isOutgoing ? c.dfh_standard_label : 'reverse of: ' + c.dfh_standard_label)),
        startWith('')
      ),
    ).pipe(
      map(([l, p]) => (l ? l : p)),
      distinctUntilChanged()
    );
  }


  @cache pipeDefaultLabelsOfPropertyAndSystemType(fkProperty: number, fkRangeClass: number | null, fkDomainClass: number | null, system_type): Observable<ProPropertyLabel[]> {
    return this.p.pro$.property_label$.by_fk_project__fk_property__fk_domain_class__fk_range_class__fk_system_type$
      .key([Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT, fkProperty, fkRangeClass, fkDomainClass, system_type])
      .pipe(
        map(x => values(x)),
        startWith([])
      )
  }


  @cache pipeDefaultLabelsOfProperty(fkProperty: number, fkRangeClass: number | null, fkDomainClass: number | null): Observable<ProPropertyLabel[]> {
    return this.p.pro$.property_label$.by_fk_project__fk_property__fk_domain_class__fk_range_class$
      .key([Config.PK_PROJECT_OF_DEFAULT_CONFIG_PROJECT, fkProperty, fkRangeClass, fkDomainClass])
      .pipe(
        map(x => values(x)),
        startWith([])
      )
  }

  @cache pipeProjectLabelsOfProperty(fkProperty: number, fkRangeClass: number | null, fkDomainClass: number | null): Observable<ProPropertyLabel[]> {
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
  @cache pipeDfhProperyStandardLabel(fkOriginalProperty): Observable<string> {
    return this.p.dfh$.property_view$.by_fk_property$.key(fkOriginalProperty).pipe(
      filter(i => !!i),
      map(p => values(p)[0].dfh_standard_label)
    )
  }


  @cache pipeListTypeOfClass(targetClassPk: number): Observable<ListType> {
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
   * used by the given project
   */
  @cache pipeSelectedClassesInProject(): Observable<{ [key: string]: any }> {
    return combineLatest(
      this.pipeClassesEnabledInEntities(),
      this.pipeClassesRequiredBySources()
    ).pipe(
      map(([a, b]) => indexBy((x) => x.toString(), uniq([...a, ...b]))),
      startWith({})
    )
  }

  @cache pipeClassesRequiredBySources() {
    return this.p.sys$.system_relevant_class$.by_required$.key('true')
      .pipe(map(c => values(c).map(k => k.fk_class)))
  }

  @cache pipeClassesEnabledInEntities() {
    return this.p.pkProject$.switchMap(pkProject => this.p.pro$.dfh_class_proj_rel$.by_fk_project__enabled_in_entities$.key(pkProject + '_true')
      .pipe(
        switchMap((cs) => combineLatest(
          values(cs).map(c => this.p.dfh$.class$.by_pk_entity$.key(c.fk_entity).pipe(
            map(dfhc => values(dfhc)[0].dfh_pk_class),
            // startWith(0)
          ))
        ))
      )
    )
  }

  @cache pipeListDefinitionsOfField(field: ClassFieldConfig): Observable<ListDefinition[]> {
    if (field.fk_property) {
      const o = field.property_is_outgoing;
      return combineLatest(
        this.pipeEnabledInheritedPropertiesOfPropertyField(field)
      ).pipe(
        switchMap(([ps]) => combineLatest(
          ps
            .map(p => {
              const targetClass = o ? p.dfh_has_range : p.dfh_has_domain;
              const sourceClass = o ? p.dfh_has_domain : p.dfh_has_range;
              const maxQ = field.property_is_outgoing ? p.dfh_range_instances_max_quantifier : p.dfh_domain_instances_max_quantifier;

              return combineLatest(
                this.pipeLabelOfClass(targetClass),
                this.pipeListTypeOfClass(targetClass),
                this.pipeLabelOfProperty(
                  field.fk_property_of_origin,
                  field.property_is_outgoing ? field.fk_class : null,
                  field.property_is_outgoing ? null : field.fk_class,
                  field.property_is_outgoing,
                  (maxQ === 1)
                )
              ).pipe(
                map(([targetClassLabel, listType, label]) => {

                  const node: ListDefinition = {
                    listType,
                    targetClass,
                    sourceClass,
                    targetClassLabel,
                    targetMaxQuantity: o ? p.dfh_range_instances_max_quantifier : p.dfh_domain_instances_max_quantifier,
                    label,
                    pkProperty: p.dfh_pk_property,
                    fkPropertyOfOrigin: field.fk_property_of_origin,
                    fkClassField: undefined,
                    isOutgoing: o,
                    isIdentityDefining: p.identity_defining,
                    ontoInfoLabel: p.dfh_identifier_in_namespace,
                    ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/' + p.dfh_pk_property
                  }
                  return node
                })
              )
            })
        ).pipe(
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
          fkClassField: pkClassField,
          ontoInfoLabel: 'P4',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/4'
        }
      case SysConfig.PK_CLASS_FIELD_ENTITY_DEFINITION:
        return {
          ...template,
          listType: 'text-property',
          label: 'Entity Definition',
          fkClassField: pkClassField,
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3'
        }
      case SysConfig.PK_CLASS_FIELD_EXACT_REFERENCE:
        return {
          ...template,
          listType: 'text-property',
          label: 'Exact Reference',
          fkClassField: pkClassField,
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3'
        }
      case SysConfig.PK_CLASS_FIELD_SHORT_TITLE:
        return {
          ...template,
          listType: 'text-property',
          label: 'Short Title',
          fkClassField: pkClassField,
          ontoInfoLabel: 'P3',
          ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/3'
        }
      default:
        break;
    }
  }



  /**
   * Pipe the fields of given class for given app context
   */
  @cache pipeFieldDefinitions(pkClass: number, appContext: number): Observable<FieldDefinition[]> {
    return this.pipeClassFieldConfigs(pkClass, appContext).pipe(
      switchMap(fields => combineLatest(fields.map(field => this.pipeFieldDefinition(field))))
    )
  }

  /**
   * Pipe the field definition with label, links to ontoMe, max quantity etc for given class-field-config
   */
  @cache pipeFieldDefinition(field: ClassFieldConfig): Observable<FieldDefinition> {
    if (field.fk_class_field) {
      const classField = this.getClassFieldListDefinition(field.fk_class_field);
      return of({ ...classField, listDefinitions: [classField], fkPropertyOfOrigin: undefined })
    }
    else {
      return this.pipePropertyOfOriginOrInherited(field.fk_property_of_origin, field.fk_property)
        .pipe(
          switchMap((p) => {
            const maxQ = field.property_is_outgoing ? p.dfh_range_instances_max_quantifier : p.dfh_domain_instances_max_quantifier;
            return combineLatest(
              this.pipeListDefinitionsOfField(field),
              this.pipeLabelOfProperty(
                field.fk_property_of_origin,
                field.property_is_outgoing ? field.fk_class : null,
                field.property_is_outgoing ? null : field.fk_class,
                field.property_is_outgoing,
                (maxQ === 1)
              )
            ).pipe(
              filter(([listDefinitions, label]) => (!!listDefinitions && listDefinitions.length > 0)),
              map(([listDefinitions, label]) => {
                const fieldDefinition: FieldDefinition = {
                  listType: listDefinitions[0].listType,
                  isOutgoing: field.property_is_outgoing,
                  label,
                  listDefinitions,
                  ontoInfoLabel: p.dfh_identifier_in_namespace,
                  ontoInfoUrl: 'http://ontologies.dataforhistory.org/property/' + p.dfh_pk_property,
                  pkProperty: field.fk_property_of_origin,
                  targetClasses: listDefinitions.map(l => l.targetClass),
                  targetMaxQuantity: maxQ
                }
                return fieldDefinition;
              })
            )
          }
          )
        )
    }
  }

  /**
   * Gets the property of origin, if existing in the data, else take
   * the fkProperty
   *
   * @param fkOropertyOfOrigin: this always references an original property
   * @param fkProperty: this can reference an original or an inherited property
   *
   * TODO this function will become superflous, once identity of properties is changed. This will be enough:
   * - this.p.dfh$.property_view$.by_dfh_pk_property$.key(field.fk_property_of_origin)
   */
  @cache pipePropertyOfOriginOrInherited(fkOropertyOfOrigin: number, fkProperty: number): Observable<DfhPropertyView> {
    return this.p.dfh$.property_view$.by_fk_property$.key(fkOropertyOfOrigin)
      .pipe(
        filter(i => !!i),
        map(ps => {
          // if original property exists, return this one
          if (ps[fkOropertyOfOrigin]) return ps[fkOropertyOfOrigin];
          // else return the first
          else return ps[fkProperty]
        })
      )
  }

  /**
   *
   */
  @cache pipeTypeAndTypedClasses(enabledIn?: 'entities' | 'sources'): Observable<{ typedClass: number, typeClass: number }[]> {
    let classesByPk$: Observable<number[]>;

    if (enabledIn === 'sources') {
      classesByPk$ = this.p.sys$.system_relevant_class$.by_required_by_sources$.key('true').pipe(
        map(classes => values(classes).map(k => k.fk_class)),

      )
    } else if (enabledIn === 'entities') {
      classesByPk$ = this.pipeClassesEnabledInEntities()
    }

    return classesByPk$.pipe(
      tap((x) => {

      }),
      switchMap(pks => combineLatest(
        pks.map(pk => this.p.sys$.class_has_type_property$.by_pk_typed_class$.key(pk).pipe(
          map(x => ({
            typedClass: pk,
            typeClass: !x ? undefined : values(x)[0].pk_type_class
          }))
        ))
      ))
    )
  }

  @cache pipeTypeClassOfTypedClass(pkTypedClass): Observable<number> {
    return this.p.sys$.class_has_type_property$.by_pk_typed_class$.key(pkTypedClass).pipe(
      map(x => {
        if (!x || Object.keys(x).length < 1) return undefined;
        else return values(x)[0].pk_type_class
      })
    )
  }


  @cache pipeTypePropertyOfTypedClass(pkTypedClass): Observable<number> {
    return this.p.sys$.class_has_type_property$.by_pk_typed_class$.key(pkTypedClass).pipe(
      map(x => {
        if (!x || Object.keys(x).length < 1) return undefined;
        else return values(x)[0].dfh_pk_property
      })
    )
  }

}
